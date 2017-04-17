// SavingPotsActions.js
const AppDispatcher = require('../dispatcher/AppDispatcher');
const SavingsPotsConstants = require('../constants/SavingsPotsConstants');

const SavingPotsActionCreator = {
	/**
	 * Action to get all accounts from API
	 */
	getAccountsList() {
		AppDispatcher.handleViewAction({
			actionType: SavingsPotsConstants.REQUEST_POT_ACCOUNTS_LIST,
		});
	},
	// TO HANDLE SERVER ACTIONS
	/**
	 * Action to handle an API call success
	 * @param  {object} response getCases api response
	 */
	handleAccountsListSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: SavingsPotsConstants.REQUEST_POT_ACCOUNTS_LIST_SUCCESS,
			data: response,
		});
	},
	handleAccountsListError (error) {
		AppDispatcher.handleViewAction({
			actionType: SavingsPotsConstants.REQUEST_POT_ACCOUNTS_LIST_ERROR,
			data: error,
		});
	},
    /**
     * Action to get show details in pot modal
     */
    getPotData() {
		AppDispatcher.handleViewAction({
			actionType: SavingsPotsConstants.REQUEST_POT_DATA,
		});
    },
	getPotDataError (error) {
		AppDispatcher.handleServerAction({
			actionType: SavingsPotsConstants.REQUEST_POT_DETAIL_DATA_ERROR,
			data: error,
		});
	},
    // TO HANDLE SERVER ACTIONS
	/**
	 * Action to handle an API call success
	 * @param  {object} response getCases api response
	 */
	handlePotDataSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: SavingsPotsConstants.REQUEST_POT_DATA_SUCCESS,
			data: response,
		});
	},
	handlePotDataError(error) {
		AppDispatcher.handleServerAction({
			actionType: SavingsPotsConstants.REQUEST_POT_DATA_ERROR,
			data: error,
		});
	},
	getPotDetail(response) {
		AppDispatcher.handleServerAction({
			actionType: SavingsPotsConstants.REQUEST_POT_DETAIL_PAGE,
			data: response,
		});
	},
	handleSinglePotDataSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: SavingsPotsConstants.REQUEST_SINGLE_POT_DATA_SUCCESS,
			data: response,
		});
	},
	handleSinglePotDataError(error, status) {
		AppDispatcher.handleServerAction({
			actionType: SavingsPotsConstants.REQUEST_SINGLE_POT_DATA_ERROR,
			data: error,
			status: status,
		});
	},
    getClickedAccount(accindex, response) {
		AppDispatcher.handleServerAction({
			actionType: SavingsPotsConstants.REQUEST_SELECTED_ACCOUNT,
			data: response,
			index: accindex,
		});
	},
	getCreateSavingPotPage(response) {
		AppDispatcher.handleServerAction({
			actionType: SavingsPotsConstants.REQUEST_CREATE_PAGE,
			data: response,
		});
	},
	handleCreatedPotDataSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: SavingsPotsConstants.REQUEST_CREATED_POT_DATA_SUCCESS,
			data: response,
		});
	},
	handleCreatedPotDataError(error, status) {
		AppDispatcher.handleServerAction({
			actionType: SavingsPotsConstants.REQUEST_CREATED_POT_DATA_ERROR,
			data: error,
			status: status,
		});
	},
	deletePotConnection(response) {
		AppDispatcher.handleServerAction({
			actionType: SavingsPotsConstants.REQUEST_DELETE_POT_CONNECTION,
			data: response,
		});
	},
	handleDeletePotSuccess() {
		AppDispatcher.handleServerAction({
			actionType: SavingsPotsConstants.REQUEST_DELETE_POT_CONNECTION_SUCCESS,
		});
	},
	getReducePotPage(response) {
		AppDispatcher.handleServerAction({
			actionType: SavingsPotsConstants.REQUEST_REDUCE_POT_PAGE,
			data: response,
		});
	},
	getPotConfirmation(response) {
		AppDispatcher.handleServerAction({
			actionType: SavingsPotsConstants.REQUEST_NEW_POT_CONFIRMATION,
			data: response,
		});
	},
	getEditedPotData(id, requestData) {
		AppDispatcher.handleServerAction({
			actionType: SavingsPotsConstants.REQUEST_EDITED_POT_DATA,
			id: id,
			data: requestData,
		});
	},
	getInterPotData(response) {
		AppDispatcher.handleServerAction({
			actionType: SavingsPotsConstants.REQUEST_INTERPOT_DATA,
			data: response,
		});
	},
	getInterPotDataSuccess() {
		AppDispatcher.handleServerAction({
			actionType: SavingsPotsConstants.REQUEST_INTERPOT_DATA_SUCCESS,
		});
	},
	getInterPotDataError(error) {
		AppDispatcher.handleServerAction({
			actionType: SavingsPotsConstants.REQUEST_INTERPOT_DATA_ERROR,
			data: error,
		});
	},
	closetErrorModal () {
		AppDispatcher.handleViewAction({
			actionType: SavingsPotsConstants.REQUEST_CLOSE_ERROR_MODAL,
		});
	},
	handleMoveMoney(response) {
		AppDispatcher.handleServerAction({
			actionType: SavingsPotsConstants.SPENDING_MOVE_MONEY,
			data: response,
		});
	},
	handleTransferMoney(response) {
		AppDispatcher.handleServerAction({
			actionType: SavingsPotsConstants.SPENDING_TRANSFER_MONEY,
			data: response,
		});
	},
};
module.exports = SavingPotsActionCreator;
