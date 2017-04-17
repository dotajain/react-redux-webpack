/**
 * AccountsActionCreator
 * @class AccountsActionCreator
 */

const AppDispatcher = require('../dispatcher/AppDispatcher');
const AccountConstants = require('../constants/AccountConstants');

const AccountsActionCreator = {
	/**
	 * Action to get all accounts from API
	 */
	getAccountsList() {
		AppDispatcher.handleViewAction({
			actionType: AccountConstants.REQUEST_ACCOUNTS_LIST,
		});
	},
		/**
	 * Action to get accounts with Ids from API
	 */
	getAccountDetails(accountId) {
		AppDispatcher.handleServerAction({
			actionType: AccountConstants.REQUEST_ACCOUNT_DETAILS,
			data: accountId,
		});
	},

	// TO HANDLE SERVER ACTIONS
	/**
	 * Action to handle an API call success
	 * @param  {object} response getCases api response
	 */
	handleAccountsListSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: AccountConstants.REQUEST_ACCOUNTS_LIST_SUCCESS,
			data: response,
		});

		response.accounts.map(account => {
			if (account.actions_available['/account/read']) {
				AccountsActionCreator.getAccountDetails(account.id);
			}
			return false;
		});
	},
			/**
	 * Action to handle an API accounts deatils success
	 */
	handleAccountsDetailsSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: AccountConstants.REQUEST_ACCOUNT_DETAILS_SUCCESS,
			data: response,
		});
	},

	/**
	* Action to handle error in API call of account details
	*/

	handleAccountsDetailsError(id, error, status) {
		console.log('in error action');
		AppDispatcher.handleServerAction({
			actionType: AccountConstants.REQUEST_ACCOUNT_DETAILS_ERROR,
			data: error,
			errCode: status,
			id: id,
		});
	},

	getTermsAndConditions() {
		AppDispatcher.handleServerAction({
			actionType: AccountConstants.REQUEST_TERMS_AND_CONDITIONS,
		});
	},
	handleAcceptTcSuccess() {
		AppDispatcher.handleServerAction({
			actionType: AccountConstants.REQUEST_ACCEPT_TC_SUCCESS,
		});
	},
	handleAccountsListError(error) {
		AppDispatcher.handleServerAction({
			actionType: AccountConstants.REQUEST_ACCOUNTS_LIST_ERROR,
			error: error,
		});
	},
	resetErrorFlag() {
		AppDispatcher.handleServerAction({
			actionType: AccountConstants.REQUEST_ACCOUNTS_RESET_ERROR,
		});
	},
};

module.exports = AccountsActionCreator;
