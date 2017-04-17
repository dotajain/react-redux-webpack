/**
 * @module TransactionHistoryApiUtils
 */

'use strict';
jest.unmock('../TransactionHistoryApiUtils');
jest.unmock('../../../static/config');
jest.unmock('../../config');

const TransactionHistoryApiUtils = require('../TransactionHistoryApiUtils');
const envConfig = require('../../../static/config');
const ApiUtils = require('../ApiUtils');
const FinancialStoriesActionCreator = require('../../actions/FinancialStoriesActionCreator');
const FinancialStoriesConstants = require('../../constants/FinancialStoriesConstants');

describe('Payee Api Utils Test Cases', () => {
    beforeEach(() => {
        ApiUtils.makeAjaxCall.mockClear();
    });
    describe('getTransactionHistoryList', () => {
        beforeEach(() => {

            const props = {
                filterData: {
                    template: {
                        file: '1212121',
                    }
                }
            };
            let tabKey = '1'
            TransactionHistoryApiUtils.getTransactionHistoryList(props.filterData, tabKey);
        });
        describe('Request Arguments of getTransactionHistoryList', () => {
            let args = '';
            beforeEach(() => {
                args = ApiUtils.makeAjaxCall.mock.calls[0][0];
            });
            it('should make Ajax call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
            });
            it('should have set the correct method', () => {
                expect(args.method).toBe('POST');
            });
            it('should construct the correct url', () => {
                expect(args.url).toContain('/banks/{bank-id}/accounts/default');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                FinancialStoriesActionCreator.handleTransactionHistoryListSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    accounts: []
                });
            });
            it('should make action call', () => {
                expect(FinancialStoriesActionCreator.handleTransactionHistoryListSuccess.mock.calls[0][0]).toBeDefined();
            });
        });
    });
    describe('getTransactionHistorySearchList', () => {
        beforeEach(() => {

            const props = {
                stubConfig: {
                    financialStoresStub: 'TransactionHistoryList',
                },
                tabKey: 'all',
                filterData: {
                    account_list: 'ee8948b5-e443-408a-a2cd-1af9b29fdd5f',
                    template: {
                        file: '1212121',
                    }
                }
            };

            TransactionHistoryApiUtils.getTransactionHistorySearchList(props.filterData);
        });
        describe('Request Arguments of getTransactionHistorySearchList', () => {
            let args = '';
            beforeEach(() => {
                args = ApiUtils.makeAjaxCall.mock.calls[0][0];
            });
            it('should make Ajax call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
            });
            it('should have set the correct method', () => {
                expect(args.method).toBe('POST');
            });
            it('should construct the correct url', () => {
                expect(args.url).toContain('/banks/{bank-id}/accounts/default');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                FinancialStoriesActionCreator.handleTransactionHistoryListSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    accounts: []
                });
            });
            it('should make action call', () => {
                expect(FinancialStoriesActionCreator.handleTransactionHistoryListSuccess.mock.calls[0][0]).toBeDefined();
            });
        });
    });
});
