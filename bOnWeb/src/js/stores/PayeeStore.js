/**
 * @module PayeeStore
 */

// packages
const assign = require('object-assign');
const EventEmitter = require('events').EventEmitter;
const AppDispatcher = require('../dispatcher/AppDispatcher');
const PayeeConstants = require('../constants/PayeeConstants');
const PaymentsConstants = require('../constants/PaymentsConstants');
const PayeeApiUtils = require('../utils/PayeeApiUtils');
const PaymentStore = require('./PaymentsStore');
const _ = require('lodash');


// all variables
const CHANGE_EVENT = 'change';
const _payeeList = [];
let _addPayeeResponse = [];
let _toSelectedAccount = {};
let _isPayeeExit = false;
let _fieldValue = {
	single_use: true,
	name: '',
	display_name: '',
};


const PayeeStore = assign({}, EventEmitter.prototype, {
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
	 * @param  {Function} callback    Function to unbind.
	 */
	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},
	/**
	 * get the added payee response
	 *
	 * @return {Any}    		payee response.
	*/
	getAddPayeeResponse() {
		return _addPayeeResponse || {};
	},
	/**
	 * get the all payee
	 *
	 * @return {Any}    		payee list.
	*/
	getAllPayees() {
		return _payeeList || [];
	},
	/**
	 * get the filed value for name
	 * @param {name}  name of form field
	 * @return {Any}    The corresponding value
	*/
	getFieldValue(name) {
		return _fieldValue[name];
	},
	/**
	 * validate whether payee can be submitted
	 *
	 * @return {Any}    	The corresponding value
	*/
	isPayeeSubmit() {
		let isValid = true;
		Object.keys(_fieldValue).forEach(function (key) {
			const value = _.toString(_fieldValue[key]);
			if ((value.trim()).length < 1) {
				isValid = false;
			}
		});
		return isValid;
	},

	/**
	 * check whether edit payee overlay exited
	 *
	 * @return {Any}    	The corresponding value
	*/
	isPayeeExit() {
		return _isPayeeExit;
	},
});

/**
 * Listen for dispatcher events.
 *
 * @param  {Object} payload 			Data attached to a dispatcher action.
 */
PayeeStore.dispatchToken = AppDispatcher.register(payload => {
	const action = payload.action;
	const data = action.data;
	switch (action.actionType) {
		// call add payee service
		case PayeeConstants.ADD_PAYEE_SERVICECALL:
			PayeeApiUtils.addPayee(_fieldValue, _toSelectedAccount.id);
			break;
		// handle add payee success response
		case PayeeConstants.ADD_PAYEE_SUCCESS:
			_addPayeeResponse = data;
			const payeeDetails = {
				id: data.id,
				'display_name': data.display_name,
				'reference': data.reference,
			};
			payeeDetails.account = {
				id: _toSelectedAccount.id,
			};
			payeeDetails.to_account = {
				name: data.name,
				sort_code: data.sort_code,
				account_number: data.account_number,
			};
			PaymentStore.updatePayeeList(payeeDetails);
			_fieldValue = {
				single_use: true,
				display_name: '',
			};
			PayeeStore.emitChange();
			break;
		// handle add payee failure response
		case PayeeConstants.ADD_PAYEE_FAILURE:
			_addPayeeResponse = data;
			PayeeStore.emitChange();
			break;
		// update payee form value
		case PayeeConstants.UPDATE_ADD_PAYEE_FORM:
			_fieldValue[data.name] = data.value;
			break;
		// update all payee form value
		case PayeeConstants.UPDATE_ALL_FORM_VALUES:
			_fieldValue = data;
			break;
		// set From selected account for payee
		case PaymentsConstants.PUT_SELECTED_ACCOUNT:
			_toSelectedAccount = action.data;
			break;
		case PayeeConstants.EDIT_PAYEE_EXIT:
			_isPayeeExit = data;
			if (_isPayeeExit) {
				PayeeStore.emitChange();
			}
			break;
		default:
			break;
	}
});

module.exports = PayeeStore;

