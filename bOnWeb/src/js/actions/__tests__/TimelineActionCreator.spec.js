/**
 * TimelineActionCreator
 * @class TimelineActionCreator
 */

jest.mock('../../stores/TransactionsStore');
jest.unmock('../TimelineActionCreator');


const TransactionsStore = require('../../stores/TransactionsStore');
const TimelineActionCreator = require('../TimelineActionCreator');
const AppDispatcher = require('../../dispatcher/AppDispatcher');
const TimelineConstants = require('../../constants/TimelineConstants');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

describe('TimelineActionCreator', () => {

    beforeEach(() => {

    });
    it('Action to get all TransactionsList from API', () => {
        TimelineActionCreator.getTransactionsList();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(1);
    });
});
describe('Action to get all Search TransactionSuggest', () => {

    beforeEach(() => {

    });
    it('Action to get all accounts from API', () => {
        TimelineActionCreator.getSearchTransactionSuggest('Mortgage');
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(2);
    });
});
describe('Action to get all Transaction Search Data', () => {

    beforeEach(() => {

    });
    it('Action to get all accounts from API', () => {
        TimelineActionCreator.getTransactionSearchData('Mortgage Payment');
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(3);
    });
});
describe('Action to get reset info of Search Data', () => {

    beforeEach(() => {

    });
    it('Action to get all accounts from API', () => {
        TimelineActionCreator.resetSearchInfo('Mortgage Payment');
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(4);
    });
});
describe('handle ransaction Success', () => {
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
        TimelineActionCreator.handleTransactionSuccess(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(1);
    });
});
describe('handle Transaction Error', () => {
    beforeEach(() => {
        
    });
    it('Action to  handle Transaction Error from API', () => {
        TimelineActionCreator.handleTransactionError('error');
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(2);
    });
});
describe('handle Transaction Search Suggestion Success', () => {
    let response = {
        "id": "084c7a11-c91a-45ef-baea-2fd0e9556e16",
        "product": {
            "code": "901",
            "name": "Gold MasterCard",
            "description": "Gold MasterCard credit card"
        },
    }
    it('to check the function', () => {
        TimelineActionCreator.handleTransactionSearchSuggestionSuccess(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(3);
    });
});
