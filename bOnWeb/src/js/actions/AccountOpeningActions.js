/**
 * @module AccountOpeningActions
 * @requires AccountOpeningConstants
 * @requires AppDispatcher
 * @requires appConstants
 */

const AccountOpeningConstants = require('../constants/AccountOpeningConstants');
const AppDispatcher = require('../dispatcher/AppDispatcher');
const AppConstants = require('../constants/AppConstants');

/**
 * @class AccountOpeningActions
 */
const AccountOpeningActions = {

	/**
	 * Setts the product code
	 *
	 * @param {String} productCode Product code to set
	 *
	 */
	setProductCode(productCode) {
		AccountOpeningActions.raise(AccountOpeningConstants.SET_PRODUCT_CODE, { productCode });
	},

	raise(actionType, data) {
		AppDispatcher.handleViewAction({
			actionType,
			data,
		});
	},

	/**
	 * User has been given an offer and we need to retrieve the details.
	 *
	 * @param {String} caseId 			The caseId for the application.
	 */
	requestProductOffer(caseId) {
		AccountOpeningActions.raise(AccountOpeningConstants.REQUEST_PRODUCT_OFFER, { caseId });
	},

	/**
	 * Accept/decline a product offer.
	 * When multiple products are offered in future, this should
	 * be extended to take arrays of yes / no.
	 *
	 * @param  {String} productId 			Product to accept.
	 * @param  {String} offerProductCode 	code of chosen product offer
	 */
	respondToProductOffer(offerId, isDecline, offerProductCode) {
		AccountOpeningActions.raise(AccountOpeningConstants.RESPOND_TO_PRODUCT_OFFER, { offerId, isDecline, offerProductCode });
	},

	/**
	 * User has changed a value in the form.
	 *
	 * @param  {String} key   		Which value was changed?
	 * @param  {Any} value 			What is the new value?
	 * @param  {String} arrayName 	Optional value, used if the value should be stored in an array
	 * @param  {String}  arrayIndex	Optional value, specifies the index within the array to update
	 */
	updateFormValue(key, value, arrayName, arrayIndex) {
		AccountOpeningActions.raise(AccountOpeningConstants.UPDATE_FORM_VALUE, {
			key,
			value,
			arrayName,
			arrayIndex,
		}
		);
	},

	/**
	 * User has changed a value in the form.
	 *
	 * @param  {Array} data 	List of objects, each with a "key" and "value" pair.
	 */
	updateFormValues(data) {
		AccountOpeningActions.raise(AccountOpeningConstants.UPDATE_FORM_VALUES, data);
	},

	/**
	 * Responsible for raising the action to clear supplied addresses
	 *
	 * @param  {Array} addressIndexes 	Array of address indexes to be removed
	 *
	 */
	clearAddress(addressIndexes) {
		AccountOpeningActions.raise(AccountOpeningConstants.CLEAR_ADDRESS, { addressIndexes });
	},

	/**
	 * Responsible for raising the action to reset supplied address
	 *
	 * @param  {Array} addressIndex Index of the address to reset
	 *
	 */
	resetAddress(addressIndex) {
		AccountOpeningActions.raise(AccountOpeningConstants.RESET_ADDRESS, { addressIndex });
	},

	/**
	 * User has entered a new value Is it valid?
	 *
	 * @param  {String}  group   	Inputs are grouped by form.
	 * @param  {String}  key     	Name of the input.
	 * @param  {Boolean} isValid 	True if the value passes validation.
	 */
	updateValidation(group, key, isValid) {
		AccountOpeningActions.raise(AccountOpeningConstants.UPDATE_VALIDATION, {
			group,
			key,
			isValid,
		});
	},

	/**
	 * User removed a question. Is the form valid?
	 *
	 * @param  {String}  group   	Inputs are grouped by form.
	 * @param  {String}  key     	Name of the input.
	 */
	removeValidation(group, key) {
		AccountOpeningActions.raise(AccountOpeningConstants.REMOVE_VALIDATION, {
			group,
			key,
		});
	},

	/**
	 * The given field can now be visibly validated (i.e. show error messages)
	 *
	 * @param  {String}  group   	Inputs are grouped by form.
	 * @param  {String}  key     	Name of the input.
	 */
	enableValidation(group, key) {
		AccountOpeningActions.raise(AccountOpeningConstants.ENABLE_VALIDATION, {
			group,
			key,
		});
	},

	/**
	 * Send all data captured in the "data capture" phase of account opening.
	 *
	 * @param {Boolean} formComplete		Has the user finished the form now?
	 */
	sendFormData(formComplete) {
		AccountOpeningActions.raise(AccountOpeningConstants.SEND_FORM_DATA, {
			formComplete: !!formComplete,
		});
	},

	/**
	 * Fetch the user's form data, including account numbers if the account
	 * has now been setup.
	 *
	 * @param {String} caseId 		Id of the case to fetch.
	 * @param {String} productType 		Type of product we are fetching
	 */
	getCase(caseId, productType) {
		AccountOpeningActions.raise(AccountOpeningConstants.GET_CASE, { caseId, productType });
	},

	/**
	 * What screen should the user be on?
	 *
	 * @param {String} caseId 		User case ID.
	 */
	getNextTask(caseId) {
		AccountOpeningActions.raise(AppConstants.GET_NEXT_TASK, { caseId });
	},

	/**
	 * Take the user to the URL represented by the given task ID.
	 *
	 * This should never be called with CSAP tasks. They should be fetched
	 * only from the API (via AccountOpeningActions.getNextTask) so that
	 * we are never out of sync with CSAP.
	 */
	navigateToWebTask(taskId) {
		AccountOpeningActions.raise(AppConstants.NAVIGATE_TO_WEB_TASK, { taskId });
	},

	/**
	 * Clear stored task IDs.
	 */
	clearTasks() {
		AccountOpeningActions.raise(AppConstants.CLEAR_TASKS);
	},

	/**
	 * Clear stored web task ID.
	 */
	clearWebTask() {
		AccountOpeningActions.raise(AppConstants.CLEAR_WEB_TASK);
	},

	/**
	 * Track when the user is/isn't editing a field in the form.
	 *
	 * @param {Boolean} isEditing Are they currently editing a field?
	 */
	setUserIsEditingField(isEditing) {
		AccountOpeningActions.raise(AccountOpeningConstants.SET_USER_IS_EDITING_FIELD, { isEditing });
	},

	/**
	 * Submit a CAS application.
	 */
	submitSwitchingApplication() {
		AccountOpeningActions.raise(AccountOpeningConstants.SUBMIT_SWITCHING_APPLICATION);
	},

	/**
	 * Submit the registration page.
	 *
	 * @param {String} publicKey 		For encryption.
	 * @param {String} keyDatetime 		Timestamp when the key was generated.
	 * @param {String} nextWebTask 		Next web task based on product post registration task
	 */
	submitRegistrationPage(publicKey, keyDatetime, nextWebTask) {
		AccountOpeningActions.raise(AccountOpeningConstants.SUBMIT_REGISTRATION_PAGE, {
			publicKey,
			keyDatetime,
			nextWebTask,
		});
	},

	/**
	 * Force autosaving of the user's data to start.
	 * Successful save calls automatically trigger the next autosave timer, so this
	 * is only needed for the initial kick-off.
	 */
	startAutosaveTimer() {
		AccountOpeningActions.raise(AccountOpeningConstants.START_AUTOSAVE_TIMER);
	},

	/**
	 * Update offer status.
	 * @param  {Event} isAltProduct is offer downgraded or not
	 */
	updateOfferStatus(isAltProduct) {
		AccountOpeningActions.raise(AccountOpeningConstants.UPDATE_OFFER_STATUS, { isAltProduct });
	},

	/**
	 * Update username
	 * @param  {username}
	 */
	updateUserName(userName) {
		AccountOpeningActions.raise(AccountOpeningConstants.UPDATE_USERNAME, { userName });
	},

	/**
	 * Bank ID may or may not be present in the data store from app start
	 * @param  {bankId}
	 */
	setBankId(bankID) {
		AccountOpeningActions.raise(AccountOpeningConstants.SET_BANK_ID, { bankID });
	},

	/**
	 * Clear any bankID that has been set
	 */
	resetBankId() {
		AccountOpeningActions.raise(AccountOpeningConstants.RESET_BANK_ID);
	},

	/**
	 * Clear any username that has been set
	 */
	resetUsername() {
		AccountOpeningActions.raise(AccountOpeningConstants.CLEAR_USERNAME);
	},

	/**
	 * Clear any userInfo that has been set
	 */
	resetUserInfo(userInfo) {
		AccountOpeningActions.raise(AccountOpeningConstants.CLEAR_USERINFO, { userInfo });
	},

	/**
	 * Receives Http get response body
	 * @param  {object} result Http response body
	 */
	receiveGetResult(result) {
		AccountOpeningActions.raise(AccountOpeningConstants.RECEIVE_GET_RESULT, { result });
	},

	/**
	 * Records that a task has been completed
	 * @param  {string} taskId Id of the task that has just been completed
	 */
	recordTaskComplete(taskId) {
		AccountOpeningActions.raise(AccountOpeningConstants.RECORD_TASK_COMPLETE, { taskId });
	},

	getTermsAndConditions() {
		AccountOpeningActions.raise(AccountOpeningConstants.REQUEST_TERMSANDCONDITIONS_DETAILS);
	},

	handleTermsAndConditionsSuccess(response) {
		AccountOpeningActions.raise(AccountOpeningConstants.REQUEST_TERMSANDCONDITIONS_DETAILS_SUCCESS, { response });
	},
};

module.exports = AccountOpeningActions;
