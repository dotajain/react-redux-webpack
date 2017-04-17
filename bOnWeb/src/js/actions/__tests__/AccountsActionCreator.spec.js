/**
 * AccountsActionCreator
 * @class AccountsActionCreator
 */
jest.mock('../../stores/AccountsStore');
jest.unmock('../AccountsActionCreator');


const AccountsStore = require('../../stores/AccountsStore');
const AccountsActionCreator = require('../AccountsActionCreator');
const AppDispatcher = require('../../dispatcher/AppDispatcher');
const AccountConstants = require('../../constants/AccountConstants');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

describe('AccountActionCreator', () => {

    beforeEach(() => {

    });
    it('Action to get all accounts from API', () => {
        AccountsActionCreator.getAccountDetails("05985dae-d2de-4ebc-ab0a-79093081bde5");
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(1);
    });
});


describe('AccountActionCreator', () => {
    it('to check the function', () => {
        AccountsActionCreator.getAccountsList();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(1);
    });
});

describe('handleAccountsListSuccess', () => {
    it('to check the function', () => {
        let response = {
            "accounts": [
                {
                    "id": "05985dae-d2de-4ebc-ab0a-79093081bde5",
                    "type": "loan",
                    "product": {
                        "code": "901",
                        "name": "Personal Loan",
                        "description": "Personal Loan"
                    },
                    "actions_available": {
                        "/account/read": true,
                        "/account/pots": false,
                        "/account/alerts": false,
                        "/account/projections": false,
                        "/account/sweeps": false,
                        "/account/sweeps/transfer/out": false,
                        "/account/transactions/read": false,
                        "/account/payments/transfer/in": false,
                        "/account/payments/transfer/out": false,
                        "/account/payments/uk/default/out": false,
                        "/account/mandates/so/read": false,
                        "/account/mandates/dd/read": false,
                        "/account/mandates/so/write": false,
                        "/account/mandates/dd/write": false
                    },
                    "bank_id": "CB",
                    "number": "650000-22446699",
                    "metadata": {
                        "display_name": "Loan Account"
                    }
                }]
        }
        AccountsActionCreator.handleAccountsListSuccess(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(3);
    });
});
describe('handleAccountsListSuccess else path', () => {
    it('to check the function', () => {
        let response = {
            "accounts": [
                {
                    "id": "05985dae-d2de-4ebc-ab0a-79093081bde5",
                    "type": "loan",
                    "product": {
                        "code": "901",
                        "name": "Personal Loan",
                        "description": "Personal Loan"
                    },
                    "actions_available": {
                        "/account/read": false,
                        "/account/pots": false,
                        "/account/alerts": false,
                        "/account/projections": false,
                        "/account/sweeps": false,
                        "/account/sweeps/transfer/out": false,
                        "/account/transactions/read": false,
                        "/account/payments/transfer/in": false,
                        "/account/payments/transfer/out": false,
                        "/account/payments/uk/default/out": false,
                        "/account/mandates/so/read": false,
                        "/account/mandates/dd/read": false,
                        "/account/mandates/so/write": false,
                        "/account/mandates/dd/write": false
                    },
                    "bank_id": "CB",
                    "number": "650000-22446699",
                    "metadata": {
                        "display_name": "Loan Account"
                    }
                }]
        }
        AccountsActionCreator.handleAccountsListSuccess(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(4);
    });
});

describe('handleAccountsDetailsSuccess', () => {
    let response = {
        "id": "084c7a11-c91a-45ef-baea-2fd0e9556e16",
        "product": {
            "code": "901",
            "name": "Gold MasterCard",
            "description": "Gold MasterCard credit card"
        },
    }
    it('to check the function', () => {
        AccountsActionCreator.handleAccountsDetailsSuccess(response);
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(1);
    });
});
describe('resetErrorFlag', () => {
    let response = {
        "id": "084c7a11-c91a-45ef-baea-2fd0e9556e16",
        "product": {
            "code": "901",
            "name": "Gold MasterCard",
            "description": "Gold MasterCard credit card"
        },
    }
    it('to check the function', () => {
        AccountsActionCreator.resetErrorFlag(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(6);
    });
});
describe('handleAccountsListError', () => {
    let response = {
        "id": "084c7a11-c91a-45ef-baea-2fd0e9556e16",
        "product": {
            "code": "901",
            "name": "Gold MasterCard",
            "description": "Gold MasterCard credit card"
        },
    }
    it('to check the function', () => {
        AccountsActionCreator.handleAccountsListError(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(7);
    });
});
describe('handleAccountsListError', () => {
    let response = {
        "id": "084c7a11-c91a-45ef-baea-2fd0e9556e16",
        "product": {
            "code": "901",
            "name": "Gold MasterCard",
            "description": "Gold MasterCard credit card"
        },
    }
    it('to check the function', () => {
        AccountsActionCreator.handleAccountsListError(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(8);
    });
});
describe('handleAcceptTcSuccess', () => {
    let response = {
        "id": "084c7a11-c91a-45ef-baea-2fd0e9556e16",
        "product": {
            "code": "901",
            "name": "Gold MasterCard",
            "description": "Gold MasterCard credit card"
        },
    }
    it('to check the function', () => {
        AccountsActionCreator.handleAcceptTcSuccess(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(9);
    });
});
describe('getTermsAndConditions', () => {
    let response = {
        "id": "084c7a11-c91a-45ef-baea-2fd0e9556e16",
        "product": {
            "code": "901",
            "name": "Gold MasterCard",
            "description": "Gold MasterCard credit card"
        },
    }
    it('to check the function', () => {
        AccountsActionCreator.getTermsAndConditions(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(10);
    });
});
describe('handleAccountsDetailsError', () => {
    let response = {
        "id": "084c7a11-c91a-45ef-baea-2fd0e9556e16",
        "product": {
            "code": "901",
            "name": "Gold MasterCard",
            "description": "Gold MasterCard credit card"
        },
    }
    it('to check the function', () => {
        AccountsActionCreator.handleAccountsDetailsError(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(11);
    });
});














