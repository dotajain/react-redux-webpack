'use strict';

jest.unmock('../../constants/AccountConstants');
jest.unmock('../AccountsStore');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const _ = require('lodash');
const EventEmitter = require('events').EventEmitter;

const AppDispatcher = require('../../dispatcher/AppDispatcher');
const AccountsApiUtils = require('../../utils/AccountsApiUtils');
const AccountConstants = require('../../constants/AccountConstants');
const AccountsStore = require('../AccountsStore');
const AccountsActionCreator = require('../../actions/AccountsActionCreator');

describe('Account Store Test Cases', () => {
	let callback = AppDispatcher.register.mock.calls[0][0];
	let getAccountsList = () => ({
		action: {
			actionType: AccountConstants.REQUEST_ACCOUNTS_LIST
		}
	});
	let getAccountDetails = (accountid) => ({
		action: {
			actionType: AccountConstants.REQUEST_ACCOUNT_DETAILS,
			accountid
		}
	});
	let handleAccountsListSuccess = (data) => ({
		action: {
			actionType: AccountConstants.REQUEST_ACCOUNTS_LIST_SUCCESS,
			data
		}
	});
	let handleAccountsDetailsSuccess = (data) => ({
		action: {
			actionType: AccountConstants.REQUEST_ACCOUNT_DETAILS_SUCCESS,
			data
		}
	});
	let handleAccountsDetailsError = (id, error, status) => ({
		action: {
			actionType: AccountConstants.REQUEST_ACCOUNT_DETAILS_ERROR,
			data: error,
			errCode: status,
			id: id,
		}
	});
	let getTermsAndConditions = () => ({
		action: {
			actionType: AccountConstants.REQUEST_TERMS_AND_CONDITIONS,
		}
	});
	let handleAcceptTcSuccess = () => ({
		action: {
			actionType: AccountConstants.REQUEST_ACCEPT_TC_SUCCESS,
		}
	});
	let handleAccountsListError = (error) => ({
		action: {
			actionType: AccountConstants.REQUEST_ACCOUNTS_LIST_ERROR,
			error: error,
		}
	})
	let resetErrorFlag = () =>({
		action: {
			actionType: AccountConstants.REQUEST_ACCOUNTS_RESET_ERROR,
		}
	})
	describe('Account List Test cases', () => {
		let result;
		describe('Account List API Call', () => {
			AccountsApiUtils.getAccountsList.mockClear();
			callback(getAccountsList());
			result = AccountsStore.getAll();
			it('should make an API call', () => {
				expect(AccountsApiUtils.getAccountsList.mock.calls.length).toBe(1);
			});
		});
		describe('get list functions test cases', () => {
			let data = {
				accounts: [{ id: 1, actions_available : {'/account/read': true, '/account/transactions/read': true } }, { id: 2, actions_available: { '/account/read': true, '/account/transactions/read': true }}],
			};
			let color = {
				accntId: 2,
				accntClass: `account-2`,
			};
			let idList = [1, 2];
			callback(getAccountsList());
			callback(handleAccountsListSuccess(data));
			result = AccountsStore.getAll();
			console.log(result);
			let accType = AccountsStore.getAccountType(data.accounts[1].id);
			let accountIdList = AccountsStore.getAccountIdList();
			it('should be equal to data', () => {
				expect(result).toEqual(data);
			});
			it('should check for account color', () => {
				expect(accType).toEqual(color);
			});
			it('should have account id list', () => {
				expect(accountIdList).toEqual(idList);
			})
		});
	});

	describe('Account Details Test Cases', () => {
		describe('Account Details API Call', () => {
			let acid = '1'
			callback(getAccountDetails(acid));
			let result = AccountsStore.getAccountDetail(acid);
			it('should make an API call', () => {
				expect(AccountsApiUtils.getAccountDetails.mock.calls.length).toBe(1);
			});
		});
		describe('Account Details success', () => {
			let accountList = {
				accounts: [
					{
						"id": "05985dae-d2de-4ebc-ab0a-79093081bde5",
						actions_available : {'/account/read': true, '/account/transactions/read': true },
						"product": {
							"code": "901",
							"name": "Personal Loan",
							"description": "Personal Loan"
						}
					}]
			};
			let data = {
				"id": "05985dae-d2de-4ebc-ab0a-79093081bde5",
				actions_available : {'/account/read': true, '/account/transactions/read': true },
				"product": {
					"code": "901",
					"name": "Personal Loan",
					"description": "Personal Loan"
				}
			};
			callback(getAccountsList());
			callback(handleAccountsListSuccess(accountList));
			AccountsStore.getAll();
			callback(handleAccountsDetailsSuccess(data))
			let result = AccountsStore.getAccountDetail(data.id)

			it('should be equal to data', () => {
				expect(result).toEqual(data);
			});
		});

		describe('Account Details success with same length ', () => {
			let accountList = {
				accounts: [
					{
						"id": "05985dae-d2de-4ebc-ab0a-79093081bde5",
						actions_available : {'/account/read': true, '/account/transactions/read': true },
						"product": {
							"code": "901",
							"name": "Personal Loan",
							"description": "Personal Loan"
						}
					}]
			};
			let data = {
				"id": "05985dae-d2de-4ebc-ab0a-79093081bde5",
				actions_available : {'/account/read': true, '/account/transactions/read': true },
				"product": {
					"code": "901",
					"name": "Personal Loan",
					"description": "Personal Loan"
				}
			};
			callback(getAccountsList());
			callback(handleAccountsListSuccess(accountList));
			AccountsStore.getAll();
			callback(handleAccountsDetailsSuccess(data))
			let result = AccountsStore.getAccountDetail(data.id)
			it('should be equal to data', () => {
				expect(result.length).toEqual(data.length);
			});
		});

		describe('Account list with undefined ', () => {
			let accountList = {accounts: [],};
			callback(getAccountsList());	
			callback(handleAccountsListSuccess(accountList));
			let result=AccountsStore.getAll();			
			it('should be equal to data', () => {
				expect(result.accounts.length).toEqual(1);
			});
		});

		describe('removeChangeListener', () => {
			const props = {
				content: {

				},
			};
			it('calls for the removeChangeListener', () => {
				let node = document.createElement('div');

				const render = (comp, el) => ReactDOM.render(comp, el);
				//component = ReactDOM.render(<NBAStore />, node);
				AccountsStore.removeChangeListener(jest.fn())

				expect(EventEmitter.listenerCount.length).toBe(2);
			});
		});

		describe('addChangeListener', () => {
			const props = {
				content: {

				},
			};
			it('calls for the addChangeListener', () => {

				AccountsStore.addChangeListener(jest.fn())
				expect(EventEmitter.listenerCount.length).toBe(2);
			});


		});
		describe('handleAcceptTcSuccess', () => {
			AccountsApiUtils.getAccountsList.mockClear();
			callback(handleAcceptTcSuccess())
			it('calls for the handleAcceptTcSuccess', () => {
				expect(AccountsApiUtils.getAccountsList.mock.calls.length).toEqual(1);
			});


		});

		describe('handleAccountsListError', () => {
			let error = {error: { id: 1}};
			callback(handleAccountsListError(error))
			it('calls for the error', () => {
				expect(AccountsStore.getError()).toEqual(error.error);
			});
			it('calls for the load', () => {
				expect(AccountsStore.getLoad()).toBeTruthy();
			});
			it('calls for the errorFlag to be true', () => {
				let value = AccountsStore.getErrorFlag();
				expect(value).toBeFalsy();
			});

		});

		describe('resetErrorFlag', () => {
			callback(resetErrorFlag())
			it('calls for the errorFlag to be False', () => {
				expect(AccountsStore.getErrorFlag()).toBeFalsy();
			});
		});

		describe('Account details with error ', () => {
			let accountList= {
				accounts: [{ id: 1, actions_available : {'/account/read': true, '/account/transactions/read': true }}],
			};
			let data = { id: 1, errCode: 500 };
			let error = {
			};
			callback(handleAccountsListSuccess(accountList));
			callback(handleAccountsDetailsError(1, error, 500));
			let result=AccountsStore.getAccountDetail(1);	
			it('should be equal to data', () => {
				expect(result).toEqual(data);
			});
		});

		describe('getTermsAndConditions', () => {
			callback(getTermsAndConditions())
			it('calls for the getTermsAndConditions', () => {

				let result = AccountsStore.getTermsAndConditions()
				expect(result).toBeTruthy();
			});


		});

	});
});

