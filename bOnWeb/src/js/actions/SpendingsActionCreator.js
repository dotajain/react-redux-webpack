// SpendingsActionCreator
const AppDispatcher = require('../dispatcher/AppDispatcher');
const SpendingsConstants = require('../constants/SpendingsConstants');

const SpendingsActionCreator = {
	/**
	 * Action to get all accounts from API
	 */
	getAccountsList() {
		AppDispatcher.handleViewAction({
			actionType: SpendingsConstants.REQUEST_ALL_ACCOUNTS,
		});
	},
	// TO HANDLE SERVER ACTIONS
	/**
	 * Action to handle an API call success
	 * @param  {object} response getCases api response
	 */
	handleAccountsListSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: SpendingsConstants.REQUEST_ALL_ACCOUNTS_SUCCESS,
			data: response,
		});
	},
	handleAccountsListError(error) {
		AppDispatcher.handleViewAction({
			actionType: SpendingsConstants.REQUEST_ALL_ACCOUNTS_ERROR,
			data: error,
		});
	},
	getSpendingPageWithKey(key) {
		AppDispatcher.handleViewAction({
			actionType: SpendingsConstants.REQUEST_SPENDING_PAGE_ON_TOGGLE,
			data: key,
		});
	},
	loadSpendingPage(key) {
		AppDispatcher.handleViewAction({
			actionType: SpendingsConstants.REQUEST_SPENDING_PAGE,
			data: key,
		});
	},
	goBackToSpendings(key) {
		AppDispatcher.handleServerAction({
			actionType: SpendingsConstants.REQUEST_SPENDING_PAGE_ON_BACK,
			data: key,
		});
	},
	loadEarningPage() {
		AppDispatcher.handleServerAction({
			actionType: SpendingsConstants.REQUEST_EARNING_PAGE,
		});
	},
    /**
     * Action to get BudgetConnection Data
     */
    getBudgetConnection() {
		AppDispatcher.handleViewAction({
			actionType: SpendingsConstants.REQUEST_BUDGET_CONNECTION,
		});
    },
    // TO HANDLE SERVER ACTIONS
	/**
	 * Action to handle an API call success
	 * @param  {object} response BudgetConnection Data api response
	 */
	handleGetBudgetConnectionSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: SpendingsConstants.REQUEST_BUDGET_CONNECTION_SUCCESS,
			data: response,
		});
	},
	handleGetBudgetConnectionError(error) {
		AppDispatcher.handleViewAction({
			actionType: SpendingsConstants.REQUEST_BUDGET_CONNECTION_ERROR,
			data: error,
		});
	},
	updateBudgetConnection(response) {
		AppDispatcher.handleViewAction({
			actionType: SpendingsConstants.UPDATE_BUDGET_CONNECTION,
			data: response,
		});
	},
	handleUpdateBudgetConnectionSuccess() {
		AppDispatcher.handleViewAction({
			actionType: SpendingsConstants.UPDATE_BUDGET_CONNECTION_SUCCESS,
		});
	},
	handleUpdateBudgetConnectionError(error) {
		AppDispatcher.handleViewAction({
			actionType: SpendingsConstants.UPDATE_BUDGET_CONNECTION_ERROR,
			data: error,
		});
	},

    /**
     * Action to get SpendListConnection Data
     */
    getSpendListConnection(response) {
		AppDispatcher.handleServerAction({
			actionType: SpendingsConstants.REQUEST_SPEND_LIST_CONNECTION,
			data: response,
		});
    },
    // TO HANDLE SERVER ACTIONS
	/**
	 * Action to handle an API call success
	 * @param  {object} response SpendListConnection Data api response
	 */
	handleGetSpendListConnectionSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: SpendingsConstants.REQUEST_SPEND_LIST_CONNECTION_SUCCESS,
			data: response,
		});
	},

	handleGetSpendListConnectionError() {
		AppDispatcher.handleViewAction({
			actionType: SpendingsConstants.REQUEST_SPEND_LIST_CONNECTION_ERROR,
		});
	},

     /**
     * Action to get BudgetPreferencesConnection Data
     */
    getBudgetPreferencesConnection() {
		AppDispatcher.handleViewAction({
			actionType: SpendingsConstants.REQUEST_BUDGET_PREFERENCES_CONNECTION,
		});
    },
	/**
     * Action to get BudgetPreferencesConnection Data
     */
    updateBudgetPreferencesConnection(response) {
		AppDispatcher.handleServerAction({
			actionType: SpendingsConstants.UPDATE_BUDGET_PREFERENCES_CONNECTION,
			data: response,
		});
    },
	updateBudgetPreferencesConnectionSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: SpendingsConstants.UPDATE_BUDGET_PREFERENCES_CONNECTION_SUCCESS,
			data: response,
		});
	},
	updateBudgetPreferencesConnectionError(error) {
		AppDispatcher.handleViewAction({
			actionType: SpendingsConstants.UPDATE_BUDGET_PREFERENCES_CONNECTION_ERROR,
			data: error,
		});
	},
    // TO HANDLE SERVER ACTIONS
	/**
	 * Action to handle an API call success
	 * @param  {object} response BudgetPreferencesConnection Data api response
	 */
	handleGetBudgetPreferencesConnectionSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: SpendingsConstants.REQUEST_BUDGET_PREFERENCES_CONNECTION_SUCCESS,
			data: response,
		});
	},
	handleGetBudgetPreferencesConnectionError(error) {
		AppDispatcher.handleViewAction({
			actionType: SpendingsConstants.REQUEST_BUDGET_PREFERENCES_CONNECTION_ERROR,
			data: error,
		});
	},
	requestEditBudgetPage() {
		AppDispatcher.handleViewAction({
			actionType: SpendingsConstants.REQUEST_EDIT_BUDGET_PAGE,
		});
	},
     /**
     * Action to get TagListConnection Data
     */
    getTagListConnection() {
		AppDispatcher.handleViewAction({
			actionType: SpendingsConstants.REQUEST_TAG_LIST_CONNECTION,
		});
    },
    // TO HANDLE SERVER ACTIONS
	/**
	 * Action to handle an API call success
	 * @param  {object} response TagListConnection Data api response
	 */
	handleGetTagListConnectionSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: SpendingsConstants.REQUEST_TAG_LIST_CONNECTION_SUCCESS,
			data: response,
		});
	},
	handleGetTagListConnectionError(error) {
		AppDispatcher.handleViewAction({
			actionType: SpendingsConstants.REQUEST_TAG_LIST_CONNECTION_ERROR,
			data: error,
		});
	},
	/**
	 * Action to get TransactionList
	 */
	getTransactionDetails(data) {
		AppDispatcher.handleViewAction({
			actionType: SpendingsConstants.REQUEST_TRANSACTIONS,
			data: data,
		});
    },
	getTransactionDetailsOnNext(data) {
		AppDispatcher.handleViewAction({
			actionType: SpendingsConstants.REQUEST_NEXT_TRANSACTIONS,
			data: data,
		});
	},
	getTransactionDetailsOnSort(data) {
		AppDispatcher.handleViewAction({
			actionType: SpendingsConstants.REQUEST_TRANSACTIONS_ON_SORT,
			data: data,
		});
	},
	// TO HANDLE SERVER ACTIONS
	/**
	 * Action to handle an API call success
	 * @param  {object} response TagListConnection Data api response
	 */
	handleTransactionDetailsSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: SpendingsConstants.REQUEST_TRANSACTIONS_SUCCESS,
			data: response,
		});
	},
	handleTransactionDetailsError(error) {
		AppDispatcher.handleViewAction({
			actionType: SpendingsConstants.REQUEST_TRANSACTIONS_ERROR,
			data: error,
		});
	},
	getAllSelectedAccountNumnber() {
		AppDispatcher.handleViewAction({
			actionType: SpendingsConstants.REQUEST_ALL_SELECTED_ACCOUNTS,
		});
	},
	closeAccountModal() {
		AppDispatcher.handleViewAction({
			actionType: SpendingsConstants.REQUEST_CLOSE_ACCOUNT_MODAL,
		});
	},
	handlePotDataSpendings() {
		AppDispatcher.handleViewAction({
			actionType: SpendingsConstants.REQUEST_POT_DATA_SPENDINGS,
		});
	},
	handlePotDataSpendingsSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: SpendingsConstants.REQUEST_POT_DATA_SPENDINGS_SUCCESS,
			data: response,
		});
	},
	handlePotDataSpendingsError() {
		AppDispatcher.handleViewAction({
			actionType: SpendingsConstants.REQUEST_POT_DATA_SPENDINGS_ERROR,
		});
	},
	handleUpdatedBudgetData (data) {
		AppDispatcher.handleViewAction({
			actionType: SpendingsConstants.UPDATED_CREATE_BUDGET_DATA,
			data: data,
		});
	},
};

module.exports = SpendingsActionCreator;
