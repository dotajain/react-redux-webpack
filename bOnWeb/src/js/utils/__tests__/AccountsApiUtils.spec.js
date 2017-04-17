'use strict';
jest.unmock('../AccountsApiUtils');
//jest.unmock('../../../static/config');
jest.unmock('../../config');
// /jest.unmock('../../../static/config');

const AccountsApiUtils = require('../AccountsApiUtils');
const envConfig = require('../../../static/config');
const ApiUtils = require('../ApiUtils');
const config = require('../../config');

const AccountsActionCreator = require('../../actions/AccountsActionCreator');
describe('Accounts Api Utils Test Cases', () => {
	beforeEach(() => {
		ApiUtils.makeAjaxCall.mockClear();
	});
	describe('getAccountsList', () => {
		beforeEach(() => {
			//AccountsApiUtils.getAccountsList();
		});
		describe('Request Arguments of getAccountsList', () => {
			let args = '';
			beforeEach(() => {
				AccountsApiUtils.getAccountsList();
				args = ApiUtils.makeAjaxCall.mock.calls[0][0];
			});
			it('should make Ajax call', () => {
				expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
			});
			it('should have set the correct method', () => {
				expect(args.method).toBe('GET');
			});
			it('should construct the correct url', () => {
				expect(args.url).toContain('/banks/{bank-id}/accounts/default');
			});
		});
		
		describe('it was success', () => {
			let success;
			beforeEach(() => {
				AccountsActionCreator.handleAccountsListSuccess.mockClear();
				AccountsApiUtils.getAccountsList();
				success = ApiUtils.makeAjaxCall.mock.calls[0][1];
				success({
					accounts: []
				});
			});
			it('should make action call', () => {
				expect(AccountsActionCreator.handleAccountsListSuccess.mock.calls[0][0]).toBeDefined();
			});
		});
		describe('it has error with true', () => {
			let failure;
			beforeEach(() => {
				AccountsActionCreator.handleAccountsListSuccess.mockClear();
				AccountsApiUtils.getAccountsList(true);
				failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
				const resp = {
					headers: {
						'www-authenticate': 'Bearer realm error=tsandcs',
					}

				};
				failure(resp, 401);
			});
			it('should make action call', () => {
				//expect(TimelineActionCreator.handleTransactionError.mock.calls[0][0]).toBeDefined();
			});
		});
		describe('it has error in the body', () => {
			let failure;
			beforeEach(() => {
				AccountsActionCreator.handleAccountsDetailsError.mockClear();
				AccountsApiUtils.getAccountDetails(true);
				failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
				const resp = {
					headers: {
						'www-authenticate': 'Bearer realm error=tsandcs',
					}

				};
				failure(resp, 422);
			});
			it('should make action call', () => {
				//expect(TimelineActionCreator.handleTransactionError.mock.calls[0][0]).toBeDefined();
			});
		});

		describe('it has error with false', () => {
			let failure;
			beforeEach(() => {
				AccountsActionCreator.handleAccountsListSuccess.mockClear();
				AccountsApiUtils.getAccountsList(false);
				failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
				const resp = {
					headers: {
						'www-authenticate': 'Bearer realm error=tsandcs',
					}

				};
				failure(resp, 401);
			});
			it('should make action call', () => {
				//expect(TimelineActionCreator.handleTransactionError.mock.calls[0][0]).toBeDefined();
			});
		});
		describe('it has error with status 402', () => {
			let failure;
			beforeEach(() => {
				AccountsActionCreator.handleAccountsListSuccess.mockClear();
				AccountsApiUtils.getAccountsList(false);
				failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
				const resp = {
					headers: {
						'www-authenticate': 'Bearer realm error=tsandcs',
					}

				};
				failure(resp, 402);
			});
			it('should make action call', () => {
				//expect(TimelineActionCreator.handleTransactionError.mock.calls[0][0]).toBeDefined();
			});
		});


	});

	describe('getAccountDetails', () => {
		beforeEach(() => {
			let accountNumber = '12345678';
			AccountsApiUtils.getAccountDetails(accountNumber);
		});
		describe('Request Arguments of getAccountDetails', () => {
			let args = '';
			beforeEach(() => {
				args = ApiUtils.makeAjaxCall.mock.calls[0][0];
			});
			it('should make Ajax call', () => {
				expect(ApiUtils.makeAjaxCall.mock.calls.length).toBeTruthy();
			});
			it('should have set the correct method', () => {
				expect(args.method).toBe('GET');
			});
			it('should construct the correct url', () => {
				expect(args.url).toContain('banks/{bank-id}/accounts/default/12345678');
			});
		});
		describe('it was success', () => {
			let success;
			beforeEach(() => {
				AccountsActionCreator.handleAccountsDetailsSuccess.mockClear();
				success = ApiUtils.makeAjaxCall.mock.calls[0][1];
				success({
					id: '123456',
					product: {},
					metadata: {},
				});
			});
			it('should make action call', () => {
				expect(AccountsActionCreator.handleAccountsDetailsSuccess.mock.calls[0][0]).toBeDefined();
			});
		});
	});

});
