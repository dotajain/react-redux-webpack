/**
 * @module AccountOpeningDataStore
 */
// Packages
const _ = require('lodash');
const envConfig = require('../../static/config');
const config = require('../config');
const assign = require('object-assign');

// Actions
const AccountOpeningActions = require('../actions/AccountOpeningActions');

// Constants
const CredentialsConstants = require('../constants/CredentialsConstants');
const AccountOpeningConstants = require('../constants/AccountOpeningConstants');
const SessionConstants = require('../constants/SessionConstants');

// Dispatcher
const AppDispatcher = require('../dispatcher/AppDispatcher');
const EventEmitter = require('events').EventEmitter;

// Stores
const AccountOpeningContentStore = require('./AccountOpeningContentStore');

// Utils
const AccountOpeningApiUtils = require('../utils/AccountOpeningApiUtils');
const UserServicesApiUtils = require('../utils/UserServicesApiUtils');
const EncryptionUtils = require('../utils/EncryptionUtils');
const AddressTransformer = require('../utils/AddressTransformer');
const MappingUtils = require('../utils/MappingUtils');
const ProductUtils = require('../utils/ProductUtils');

// Private vars
const CHANGE_EVENT = 'change';

//Terms and conditions service name and version
let _tandCserviceName = '';
let _tandCversion = '';


// All possible account opening values. Default values for each are specified here.
const _fields = {
	productCode: '',
	completedTasks: {},
	contactMethods: [],  // Opt out of all methods by default.
	isExistingCustomer: 'No', // Existing customer is false by default
};

const getProduct = productCode => productCode && ProductUtils.getProduct(productCode) || { productType: { name: 'empty' } };

const AccountOpeningDataStore = assign({}, EventEmitter.prototype, {

	/**
	 * Alert listeners that the Store has changed.
	 */
	emitChange() {
		this.emit(CHANGE_EVENT);
	},

	/**
	 * Allow views to specify functions to run when this store changes.
	 *
	 * @param {function} callback		Function to run on change.
	*/
	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	/**
	 * Allow views to unbind listeners before dismounting.
	 *
	 * @param  {Function} callback 		Function to unbind.
	 */
	removeChangeListener(callback) {
		this.removeListener('change', callback);
	},

	/**
	 * Submit the form data.
	 *
	 * @param {Boolean} formComplete		Has the user finished the form now? Default false.
	 */
	sendFormData(formComplete) {
		// Only send if the user is not currently editing a field.
		this.waitingToSendFormData = this.userIsEditingField;

		if (!this.waitingToSendFormData) {
			this.formComplete = !!formComplete;

			// Cancel any existing autosave timer.
			if (this.timeoutId) {
				clearTimeout(this.timeoutId);
				delete this.timeoutId;
			}

			const addAuthToken = _fields.isExistingCustomer === 'Yes' || !_.isUndefined(_fields.caseId);

			const formOptions = {
				callback: this.onSendFormDataComplete.bind(this),
				errorCallBack: code => {
					this.handleSendError(code, formComplete);
				},
				store: this, // TODO : Remove this
				content: AccountOpeningContentStore.getAll(),
				caseId: _fields.caseId,
				product: getProduct(_fields.productCode),
				productCode: _fields.productCode,
				formComplete,
				addAuthToken,
			};

			const requestData = MappingUtils.mapPostEnquiry(this, AccountOpeningContentStore.getAll());

			AccountOpeningApiUtils.sendFormData(formOptions, requestData);
		}
	},

	/**
	 * Responsible for controlling the error handling flow when a 409 has been thrown
	 *
	 * @param {String} code Error code returned from the API
	 * @param {Boolean} formComplete Defines if the form has been completed
	 *
	 */
	handleSendError(code, formComplete) {
		const errorHandled = this.onSendFormDataCompleteWithBusinessError(code);

		if (!errorHandled) {
			AccountOpeningActions.navigateToWebTask('WEB-ERROR');
			return;
		}

		if (formComplete) {
			AccountOpeningActions.navigateToWebTask('WEB-REVIEW-DETAILS');
			return;
		}
	},

	/**
	 * Responsible for updating data based on returned error codes
	 *
	 * @param  {String} code     Error code
	 *
	 * @return {Boolean} True if the error was handled
	 */
	onSendFormDataCompleteWithBusinessError(code) {
		const errors = {
			1036: () => _fields.usernameAlreadyInUse = true,
			318: () => _fields.personalDetailsFound = true,
		};

		const handler = errors[code];

		if (!_.isFunction(handler)) {
			return false;
		}

		handler();
		this.emitChange();

		return true;
	},

	/**
	 * Called when data has been submitted to the account opening update (create case) service.
	 *
	 * @param  {String} caseId     Case ID.
	 */
	onSendFormDataComplete(caseId) {
		let dataChanged = false;

		// Case ID
		if (caseId && (_fields.caseId !== caseId)) {
			_fields.caseId = caseId;

			dataChanged = true;
		}

		// Username
		if (!_fields.username) {
			_fields.usernameAlreadyInUse = false;
			_fields.username = _fields.unsavedUsername;
			delete _fields.unsavedUsername;
			dataChanged = true;
		}

		if (_fields.personalDetailsFound) {
			_fields.personalDetailsFound = false;
			dataChanged = true;
		}

		// User-entered password.
		if (_fields.encryptedPassword) {
			delete _fields.encryptedPassword;
			dataChanged = true;
		}

		if (dataChanged) {
			this.emitChange();
		}

		// Automatically continue saving data as we go.
		this.startAutoSaveTimer();
	},

	/**
	 * Start the autosave timer for the user's form data.
	 *
	 * @param {Boolean} useShortDelay 		Optional. Should the autosave happen sooner than the default? Default is false.
	 */
	startAutoSaveTimer(useShortDelay) {
		// Has the form been completed? Or is a timer already running?
		if (this.formComplete || (_.isNumber(this.timeoutId) && this.timeoutId >= 0)) {
			return;
		}

		const delay = useShortDelay ? envConfig.shortAutoSaveInterval : envConfig.defaultAutoSaveInterval;

		this.timeoutId = setTimeout(() => {
			this.sendFormData(false);
		}, delay);
	},

	/**
	 * Fire off a CAS request.
	 */
	submitSwitchingApplication() {
		AccountOpeningApiUtils.submitSwitchingApplication(errorCode => {
			if (_.isUndefined(errorCode)) {
				_fields.isSwitchApplicationSuccessful = true;
				_fields.switchApplicationErrorCode = undefined;
			} else {
				_fields.isSwitchApplicationSuccessful = false;
				_fields.switchApplicationErrorCode = errorCode;
			}
			this.emitChange();
		}, this.getAll());
	},

	/**
	 * Submit the registration page questions, answers, and telephone pin
	 *
	 * @param {String} publicKey 		For encryption.
	 * @param {String} keyDatetime 		Timestamp when the key was generated.
	 * @param {String} nextWebTask 		Next web task based on product post registration task
	 */
	submitRegistrationPage(publicKey, keyDatetime, nextWebTask) {
		const options = {
			registrationData: {},
			errorCallback: this.submitRegistrationPageErrorCallback,
			publicKeyMethod: (k, t) => this.submitRegistrationPage(k, t, nextWebTask),
		};
		const questions = [];
		const answers = [];

		// RIB registration to be done?
		if (_fields.securityQuestion1) {
			for (let i = 1; i <= config.numSecurityQuestions; i++) {
				const formattedAnswer = `${keyDatetime}:${_fields[`securityQuestion${i}Answer`]}`;

				questions.push(_fields[`securityQuestion${i}`]);
				answers.push(EncryptionUtils.encrypt(publicKey, formattedAnswer));
			}

			options.registrationData['security_questions'] = { questions, answers };
		}

		// Telephone banking registration?
		if (_fields.telephonePin) {
			options.registrationData.acn = EncryptionUtils.encrypt(publicKey, `${keyDatetime}:${_fields.telephonePin}`);
		}

		// User Password registration ?
		if (_fields.password1) {
			options.registrationData.password = EncryptionUtils.encrypt(publicKey, `${keyDatetime}:${_fields.password1}`);
		}
		UserServicesApiUtils.acceptedTermsAndConditions(_tandCserviceName, _tandCversion);
		UserServicesApiUtils.submitSecurityQuestions(options, nextWebTask);
	},

	submitRegistrationPageErrorCallback(body) {
		_fields.registrationPageErrorCallbackMessage = body.message;
		_fields.registrationPageErrorCallbackCredential = body.metadata.credential;

		AccountOpeningDataStore.emitChange();
	},

	/**
	 * Track when a user is editing a field.
	 * If they have now stopped editing a field and we're waiting
	 * to autosave the form, go for it now.
	 *
	 * @param {Boolean} isEditing 		Are they currently editing?
	 */
	setUserIsEditingField(isEditing) {
		this.userIsEditingField = isEditing;

		if (this.waitingToSendFormData) {
			this.sendFormData();
		}
	},

	/**
	 * Fetch a value from the Store.
	 *
	 * @param  {String} key 		Key of the value to get.
	 * @param {Any} defaultVal 		Used if the request key is undefined.
	 * @return {Any}    		The corresponding value.
	 */
	getValue(key, defaultVal) {
		return _.isUndefined(_fields[key]) ? defaultVal : _fields[key];
	},

	/**
	 * Fetch all values in the store.
	 *
	 * @return {Object} 		All stored values.
	 */
	getAll() {
		const product = getProduct(_fields.offerProductCode || _fields.productCode);

		return _.cloneDeep(_.extend({ product }, _fields)); // Ensures that components never edit the _fields object in this store directly.
	},
});

const updateFormValues = data => {
	let fieldChanged = false;
	_.each(data, item => {
		if (_.isObject(item.value) || _.isArray(item.value) || _fields[item.key] !== item.value) {
			// User has entered a new value.
			_fields[item.key] = item.value;
			fieldChanged = true;
		}
	});

	return fieldChanged;
};

/**
 * Listen for dispatcher events.
 *
 * @param  {Object} payload 			Data attached to a dispatcher action.
 */
AccountOpeningDataStore.dispatchToken = AppDispatcher.register(payload => {
	const action = payload.action;
	const data = action.data;
	switch (action.actionType) {
		case AccountOpeningConstants.SET_PRODUCT_CODE:
			_fields.productCode = data.productCode;
			AccountOpeningDataStore.emitChange();
			break;
		case AccountOpeningConstants.UPDATE_FORM_VALUE:
			if (_.isObject(data.value) || _.isArray(data.value) || _fields[data.key] !== data.value || !_.isUndefined(data.arrayName)) {
					// User has entered a new value.
					// Check if that value should be stored as part of an array
				if (!_.isUndefined(data.arrayName) && !_.isUndefined(data.arrayIndex)) {
						// Has the array been initialized?
					if (_.isUndefined(_fields[data.arrayName])) {
						_fields[data.arrayName] = [];
					}

						// Has the object at array index been initialized?
					if (_.isUndefined(_fields[data.arrayName][data.arrayIndex])) {
						_fields[data.arrayName][data.arrayIndex] = {};
					}

						// Store the value
					_fields[data.arrayName][data.arrayIndex][data.key] = data.value;
				} else {
					_fields[data.key] = data.value;
				}
				AccountOpeningDataStore.emitChange();
			}
			break;
			// Update multiple values at once. Should pass an array of objects, holding "key" and "value" combos.
		case AccountOpeningConstants.UPDATE_FORM_VALUES:
			const fieldChanged = updateFormValues(data);

			if (fieldChanged) {
				AccountOpeningDataStore.emitChange();
			}

			break;
		case AccountOpeningConstants.CLEAR_ADDRESS:
			if (!_fields.addresses) {
				return;
			}

			let { addressIndexes } = data;

			if (!_.isArray(addressIndexes)) {
				addressIndexes = [addressIndexes];
			}

			_fields.addresses = _.filter(_fields.addresses, (item, index) => !_.includes(addressIndexes, index));

			AccountOpeningDataStore.emitChange();

			break;
		case AccountOpeningConstants.RESET_ADDRESS:
			if (!_fields.addresses) {
				return;
			}

			const { addressIndex } = data;

			if (!_fields.addresses[addressIndex]) {
				return;
			}

			_fields.addresses[addressIndex] = { addressType: _fields.addresses[addressIndex].addressType };

			AccountOpeningDataStore.emitChange();

			break;
		case AccountOpeningConstants.REQUEST_FULL_ADDRESSES_SUCCESS:

			if (_.isUndefined(_fields.addresses)) {
				_fields.addresses = [];
			}

			const currentAddressIndex = data.addressId - 1;
			const current = _fields.addresses[currentAddressIndex] || AddressTransformer.empty();

			const address = AddressTransformer.fromPostcodeResult(data, { addressType: current.addressType });

			_fields.addresses[currentAddressIndex] = address;

			AccountOpeningDataStore.emitChange();
			break;

		case AccountOpeningConstants.REQUEST_FULL_ADDRESSES_ERROR:
			_fields.addresses[data.addressId - 1] = { id: 'error' };
			AccountOpeningDataStore.emitChange();
			break;

		case AccountOpeningConstants.SEND_FORM_DATA:
			AccountOpeningDataStore.sendFormData(data.formComplete);
			break;

		case AccountOpeningConstants.REQUEST_PRODUCT_OFFER:
			AccountOpeningApiUtils.requestProductOffer(data.caseId);
			break;

		case AccountOpeningConstants.REQUEST_PRODUCT_OFFER_SUCCESS:
			_fields.productOffer = data;
			AccountOpeningDataStore.emitChange();
			break;

		case AccountOpeningConstants.RESPOND_TO_PRODUCT_OFFER:
			_fields.offerProductCode = data.offerProductCode;

			AccountOpeningApiUtils.respondToProductOffer(_fields.caseId, data.offerId, data.isDecline);
			break;

		case AccountOpeningConstants.SET_USER_IS_EDITING_FIELD:
			AccountOpeningDataStore.setUserIsEditingField(data.isEditing);
			break;

		case AccountOpeningConstants.GET_CASE:
			const caseId = _fields.caseId || data.caseId;
			const productType = _fields.productType || data.productType;
			AccountOpeningApiUtils.getCase(caseId, productType);
			break;

		case AccountOpeningConstants.SUBMIT_SWITCHING_APPLICATION:
			AccountOpeningDataStore.submitSwitchingApplication();
			break;

		case AccountOpeningConstants.SUBMIT_REGISTRATION_PAGE:
			AccountOpeningDataStore.submitRegistrationPage(data.publicKey, data.keyDatetime, data.nextWebTask);
			break;

		case AccountOpeningConstants.START_AUTOSAVE_TIMER:
			AccountOpeningDataStore.startAutoSaveTimer();
			break;

		case CredentialsConstants.GET_CREDENTIALS:
			UserServicesApiUtils.getCredentials();
			break;

		case SessionConstants.UPDATE_BANK_ID:
			_fields.bankID = data.bankId;

			AccountOpeningDataStore.emitChange();
			break;
		case AccountOpeningConstants.UPDATE_USERNAME:
			if (!data.userName) {
				if (process.env.NODE_ENV === 'development') {
					console.warn('Attempted to set username to null');
				}
				return;
			}
			_fields.username = data.userName;

			AccountOpeningDataStore.emitChange();
			break;

		case AccountOpeningConstants.UPDATE_CASE_ERROR:
			AccountOpeningDataStore.startAutoSaveTimer(true);
			break;
		case AccountOpeningConstants.UPDATE_OFFER_STATUS:
			_fields.isAltProduct = data.isAltProduct;
			AccountOpeningDataStore.emitChange();
			break;
	case AccountOpeningConstants.SET_BANK_ID:
		_fields.bankID = data.bankID;
		AccountOpeningDataStore.emitChange();
		break;
	case AccountOpeningConstants.RESET_BANK_ID:
		_fields.bankID = undefined;
		AccountOpeningDataStore.emitChange();
		break;
	case AccountOpeningConstants.CLEAR_USERNAME:
		_fields.username = undefined;
		AccountOpeningDataStore.emitChange();
		break;
	case AccountOpeningConstants.CLEAR_USERINFO:
		_fields.username = undefined;
		data.userInfo.forEach(key => {
			_fields[key] = undefined;
		});
		AccountOpeningDataStore.emitChange();
		break;
	case AccountOpeningConstants.RECEIVE_GET_RESULT:
		if (!_fields.productCode && data.result.products) {
			_fields.productCode = `IM${data.result.products.code}`;
		}

		const product = getProduct(_fields.productCode);
		if (!_.isEmpty(product) && product.productType.name === 'empty') {
			if (process.env.NODE_ENV === 'development') {
				console.log('Invalid product');
			}
			AccountOpeningActions.navigateToWebTask('WEB-ERROR');
			return;
		}

		const resultData = MappingUtils.mapGetEnquiry(data.result, product.productType.name);
		updateFormValues(resultData);
		AccountOpeningDataStore.emitChange();
		break;
	case AccountOpeningConstants.RECORD_TASK_COMPLETE:
		_fields.completedTasks[data.taskId] = true;
		AccountOpeningDataStore.emitChange();
		break;
	case AccountOpeningConstants.REQUEST_TERMSANDCONDITIONS_DETAILS:
		UserServicesApiUtils.getTermsAndConditionsDetails();
		break;
	case AccountOpeningConstants.REQUEST_TERMSANDCONDITIONS_DETAILS_SUCCESS:
		_tandCserviceName = data.response.service;
		_tandCversion = data.response.version;
		break;
	default:
		// Do nothing.
	}
});

module.exports = AccountOpeningDataStore;
