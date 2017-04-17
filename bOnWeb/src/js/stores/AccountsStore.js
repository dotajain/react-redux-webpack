/**
 * @module AccountsStore
 */

const AppDispatcher = require('../dispatcher/AppDispatcher');
const assign = require('object-assign');
const EventEmitter = require('events').EventEmitter;
const AccountConstants = require('../constants/AccountConstants');
const AccountsApiUtils = require('../utils/AccountsApiUtils');
const _ = require('lodash');
const CHANGE_EVENT = 'change';
let _accountList = {	
	accounts: [],
	error: undefined,
};
let _accountDetails = [];
let _termsAndConditionsFlag = false;
const _accountTypeColor = [
	{
		accntId: '',
		accntClass: '',
	},
];
let _load = false;
let _showError = false;
let _error = '';

const AccountsStore = assign({}, EventEmitter.prototype, {
	emitChange() {
		this.emit(CHANGE_EVENT);
	},

	/**
	* @param {function} callback
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

	// to get all acoount list
	getAll() {
		return _accountList || [];
	},

	// to get the Account Detail
	getAccountDetail(id) {
		return _.find(_accountDetails, { id: id }) || {};
	},

	// to get the type of accounts
    getAccountType(id) {
		return _.find(_accountTypeColor, { accntId: id });
	},

	// to get the list of accountIds
	getAccountIdList() {
		const _accounts = [];
		_accountList.accounts.map(account => {
		if (account.actions_available['/account/transactions/read']) {
			_accounts.push(account.id);
		}
			return false;
		});
		return _accounts;
	},
	// to get the terms and conditions for user
	getTermsAndConditions() {
		return _termsAndConditionsFlag;
	},

	getLoad() {
		return _load;
	},
	getError() {
		return _error;
	},
	getErrorFlag() {
		return _showError;
	},
});

AccountsStore.dispatchToken = AppDispatcher.register(payload => {
	const action = payload.action;

	switch (action.actionType) {

		case AccountConstants.REQUEST_ACCOUNTS_LIST:
			_load = false;
			_accountList = {
				accounts: [],
			};
			_accountDetails = [];
			AccountsApiUtils.getAccountsList(_termsAndConditionsFlag);
			break;

		case AccountConstants.REQUEST_ACCOUNTS_LIST_SUCCESS:
			_load = true;
			_showError = false;
			if (_termsAndConditionsFlag) {
				_termsAndConditionsFlag = false;
			}
			action.data.accounts.map(account => {
				if (account.actions_available['/account/read']) {
					_accountList.accounts.push(account);
				}
				return false;
				});
			if (_accountList !== undefined && _accountList.accounts.length > 0) {
				_accountList.accounts.map((account, index) => {
					_accountTypeColor.push({
						accntId: account.id,
						accntClass: `account-${index + 1}`,
					});
					return false;
				});
			}
			break;

		case AccountConstants.REQUEST_ACCOUNT_DETAILS:
			AccountsApiUtils.getAccountDetails(action.data);
			break;

		case AccountConstants.REQUEST_ACCOUNT_DETAILS_SUCCESS:
			const index = _.findIndex(_accountDetails, { id: action.data.id });
			if (index !== -1) {
				_accountDetails[index] = action.data;
			} else {
				_accountDetails.push(action.data);
			}
			if (_accountDetails.length === _accountList.accounts.length) {
				AccountsStore.emitChange();
			}
			break;

		case AccountConstants.REQUEST_ACCOUNT_DETAILS_ERROR:
			const error = { id: action.id, errCode: action.errCode };
			const _index = _.findIndex(_accountDetails, { id: action.id });
			if (_index !== -1) {
				_accountDetails[index] = error;
			} else {
				_accountDetails.push(error);
			}
			if (_accountDetails.length === _accountList.accounts.length) {
				AccountsStore.emitChange();
			}
			break;

		case AccountConstants.REQUEST_TERMS_AND_CONDITIONS:
			_termsAndConditionsFlag = true;
			AccountsStore.emitChange();
		break;

		case AccountConstants.REQUEST_ACCEPT_TC_SUCCESS:
			_termsAndConditionsFlag = true;
			AccountsApiUtils.getAccountsList(_termsAndConditionsFlag);
			AccountsStore.emitChange();
		break;

		case AccountConstants.REQUEST_ACCOUNTS_LIST_ERROR:
			if (!_.isEmpty(action.error)) {
				_error = action.error.error;
			}
			_showError = true;
			AccountsStore.emitChange();
		break;

		case AccountConstants.REQUEST_ACCOUNTS_RESET_ERROR:
			_showError = false;
			AccountsStore.emitChange();
		break;
	}
});

module.exports = AccountsStore;
