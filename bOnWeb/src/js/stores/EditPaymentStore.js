/**
 * @module EditPaymentStore
 */

const AppDispatcher = require('../dispatcher/AppDispatcher');
const assign = require('object-assign');
const EventEmitter = require('events').EventEmitter;
const PaymentsConstants = require('../constants/PaymentsConstants');
const PayeeConstants = require('../constants/PayeeConstants');
const PaymentApiUtils = require('../utils/PaymentApiUtils');
const PayeeApiUtils = require('../utils/PayeeApiUtils');
const CHANGE_EVENT = 'change';
const StringConstant = require('../constants/StringConstants');

let _editedData = {};
let _editPaymentResponse = {};
let _editPaymentData = {};
let _fieldValue = {
    single_use: false,
    name: StringConstant.EmptyString,
    display_name: StringConstant.EmptyString,
};
let account_Id = null;
let benificiaryId = null;

const EditPaymentStore = assign({}, EventEmitter.prototype, {
    emitChange() {
        this.emit(CHANGE_EVENT);
    },
	/**
	* @param {function} callback
	*/
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    getEditPayeeFieldValue(name) {
        return _fieldValue[name];
    },

	/**
	 * Allow views to unbind listeners before dismounting.
	 *
	 * @param  {Function} callback    Function to unbind.
	 */
    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
    // returns edited data of standing order
    getEditRepeatData() {
        return _editedData;
    },
    getEditPaymentData() {
        return _editPaymentData;
    },
    getEditPaymentResponse() {
        return _editPaymentResponse;
    },

});

EditPaymentStore.dispatchToken = AppDispatcher.register(payload => {
    const action = payload.action;

    switch (action.actionType) {
        case PaymentsConstants.SET_EDIT_PAYMENT_DATA:
            _editedData = action.data;
            break;
        case PaymentsConstants.UPDATE_ALL_EDIT_PAYMENT_FORM_VALUES:
            _editPaymentData = action.data;
            break;
        case PaymentsConstants.EDIT_SO_PAYMENT_SERVICECALL:
            const accountId = action.data.accountId;
            const mandateId = action.data.mandateId;
            const paymentData = action.data.editPaymentRequest;
            _editPaymentResponse = {};
            PaymentApiUtils.editPayment(paymentData, accountId, mandateId);

            break;
        // case PaymentsConstants.SET_REPEAT_DATA:

        //     switch (action.data.type) {
        //         case 'stop':
        //             _editedData.ending = '';
        //             _editedData.stopitwhen = action.data.value;
        //             break;
        //         case 'stopValue':
        //             _editedData.ending = action.data.value;
        //             break;
        //         case 'often':
        //             _editedData.often = action.data.value;
        //             break;
        //         case 'dueDate':
        //             _editedData.dueDate = action.data.value;
        //             break;
        //         case 'amountChanged':
        //             _editedData.schedule.recurrence.amount.value = action.data.value;
        //             break;
        //     }
        //     EditPaymentStore.emitChange();
        //     break;
        // call delete payee service
        case PayeeConstants.DELETE_PAYEE_DETAILS:
            PayeeApiUtils.deletePayee(action.data);
            break;
        // handle deleted payee success response
        case PayeeConstants.DELETE_PAYEE_SUCCESS:
            PaymentApiUtils.getPayeeList();
            _editPaymentResponse = action.data;
            _editPaymentResponse.type = StringConstant.DELETE_PAYEE;
            EditPaymentStore.emitChange();
            break;
        case PaymentsConstants.DELETE_PAYMENT_SUCCESS:
            _editPaymentResponse = action.data;
            _editPaymentResponse.type = StringConstant.DELETE_PAYMENT;
            EditPaymentStore.emitChange();
            break;
        case PayeeConstants.UPDATE_ALL_EDIT_FORM_VALUES:
            _fieldValue = action.data.fieldValue;
            account_Id = action.data.accountId;
            benificiaryId = action.data.benificiaryId;
            break;
        case PayeeConstants.UPDATE_EDIT_PAYEE_FORM:
            _fieldValue[action.data.name] = action.data.value;
            break;
        case PayeeConstants.UPDATE_ALL_EDIT_FORM_VALUES_FROM_SHOW_VIEW:
            _fieldValue = action.data;
            break;
        case PayeeConstants.EDIT_PAYEE_SERVICECALL:
            PayeeApiUtils.editPayee(_fieldValue, account_Id, benificiaryId);
            break;
        case PayeeConstants.UPDATE_BENIFICIARY_ID:
            benificiaryId = action.data;
            break;
        case PayeeConstants.DELETE_PAYEE_FAILED:
            _editPaymentResponse = action.data;
            EditPaymentStore.emitChange();
            break;
        case PayeeConstants.EDIT_PAYEE_PARTIAL_SUCCESS:
            _editPaymentResponse = action.data;
            _editPaymentResponse.type = StringConstant.EDIT_PARTIAL;
            EditPaymentStore.emitChange();
            break;
        case PaymentsConstants.DELETE_PAYMENT_DETAILS:
            PaymentApiUtils.deletePaymentList(action.data);
            break;
        // update payee form value
        case PaymentsConstants.UPDATE_EDIT_PAYMENT_FORM:
            _editPaymentData[action.data.name] = action.data.value;
            break;

        case PaymentsConstants.EDIT_PAYMENT_SERVICE_MESSAGE:
            _editPaymentResponse = action.data;
            EditPaymentStore.emitChange();
            break;
        default:
    }
});

module.exports = EditPaymentStore;

