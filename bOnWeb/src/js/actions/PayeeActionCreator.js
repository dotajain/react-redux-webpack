/**
 * @module PayeeActionCreator
 */

const PayeeConstants = require('../constants/PayeeConstants');
const AppDispatcher = require('../dispatcher/AppDispatcher');
const AppConstants = require('../constants/AppConstants');

const PayeeActionCreator = {
	/*
		To raise view action to update the store and view
		 @param {String} actionType		action type.
		@param {object} data		data passed to action type.
	*/
	raise(actionType, data) {
		AppDispatcher.handleViewAction({
			actionType,
			data,
		});
	},

	/*
		To raise servcer action to call API and update the view and store
		@param {String} actionType		action type.
		@param {object} data		data passed to action type.
	*/
	raiseServerAction(actionType, data) {
		AppDispatcher.handleServerAction({
			actionType,
			data,
		});
	},

	/*
		Navigate To WebTask base on taskId
		@param {String} taskId		navigation task Id
	*/
	navigateToWebTask(taskId) {
		PayeeActionCreator.raise(AppConstants.NAVIGATE_TO_WEB_TASK, { taskId });
	},

	/*
		handle the success response for list of payee service call
		@param {Object} response		payee success response
	*/
    handlePayeesListSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: PayeeConstants.GET_FROM_PAYEES_SUCCESS,
			data: response,
		});
	},
	/*
		handle the success response for edit and payee service call
		@param {Object} response payee success
	*/
	handlePayeeServiceCall(response) {
		AppDispatcher.handleServerAction({
			actionType: PayeeConstants.DELETE_PAYEE_FAILED,
			data: response,
		});
	},

	/*
		call the delete payee service
		@param {Object} deletePayeeRequestPacket		delete payee request
	*/
	deletePayee(deletePayeeRequestPacket) {
		this.raise(PayeeConstants.DELETE_PAYEE_DETAILS, deletePayeeRequestPacket);
	},

	/*
		handle deleted payee success response
		@param {Object} response		deleted payee response
	*/
	handleDeletePayeeSuccess(response) {
	//	PayeeActionCreator.getPayeeList();
		AppDispatcher.handleServerAction({
			actionType: PayeeConstants.DELETE_PAYEE_SUCCESS,
			data: response,
		});
	},
	handleEditPayeePartialSuccessCall(response) {
		AppDispatcher.handleServerAction({
			actionType: PayeeConstants.EDIT_PAYEE_PARTIAL_SUCCESS,
			data: response,
		});
	},

	/*
		update the value of passed name for add payee
		@param {String} name		name of key
		@param {String} value		value of passed name
	*/
	updateForm(name, value) {
		// calling action to update the form value
		PayeeActionCreator.raiseServerAction(PayeeConstants.UPDATE_ADD_PAYEE_FORM, { name, value });
	},
	/*
		update the value of passed name for Edit payee
		@param {String} name		name of key
		@param {String} value		value of passed name
	*/
	updateEditForm(name, value) {
		PayeeActionCreator.raiseServerAction(PayeeConstants.UPDATE_EDIT_PAYEE_FORM, { name, value });
	},
	updateBenificiaryId(benificiaryId) {
				PayeeActionCreator.raiseServerAction(PayeeConstants.UPDATE_BENIFICIARY_ID, benificiaryId);
	},
	/*
		update the all values of payee
		@param {Object} updateFields		object of key, value pair
	*/
	updateAllFiled(updateFields) {
		PayeeActionCreator.raiseServerAction(PayeeConstants.UPDATE_ALL_FORM_VALUES, updateFields);
	},
	updateAllEditFiled(updateFields) {
		PayeeActionCreator.raiseServerAction(PayeeConstants.UPDATE_ALL_EDIT_FORM_VALUES, updateFields);
	},
	// Update the form field when user select the show view
	updateEditPayeeDataShowView(updateFields) {
		PayeeActionCreator.raiseServerAction(PayeeConstants.UPDATE_ALL_EDIT_FORM_VALUES_FROM_SHOW_VIEW, updateFields);
	},

	/*
		call edit payee service
	*/
	editPayee() {
		this.raise(PayeeConstants.EDIT_PAYEE_SERVICECALL, {});
	},

	/*
	call add payee service
	*/
	addPayee() {
		// raise action  for add Payee
		this.raise(PayeeConstants.ADD_PAYEE_SERVICECALL, {});
	},

	/*
		handle response of newly added payee for succes/failure
		@param {Object} response		added payee response
	*/
	handleAddPayeeServiceCall(response) {
		switch (response.code) {
			case 201:
				// raising action for add payee success
				this.raiseServerAction(PayeeConstants.ADD_PAYEE_SUCCESS, response);
				break;
			case 422:
				// raising action for add payee failure
				this.raiseServerAction(PayeeConstants.ADD_PAYEE_FAILURE, response);
				break;
			default:

		}
	},

	/*
		set whether is edit payee overlay exited
		@param {Boolean} isExit		true|false
	*/
	isEditPayeeExit(isExit) {
		this.raise(PayeeConstants.EDIT_PAYEE_EXIT, isExit);
	},
};


module.exports = PayeeActionCreator;
