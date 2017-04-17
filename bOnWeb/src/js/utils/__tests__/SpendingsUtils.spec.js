'use strict';
jest.unmock('../SpendingsUtils');
jest.unmock('../../../static/config');
jest.unmock('../../config');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const SpendingsUtils = require('../SpendingsUtils');
const envConfig = require('../../../static/config');
const ApiUtils = require('../ApiUtils');
const SpendingsActionCreator = require('../../actions/SpendingsActionCreator');

describe('SpendingsUtils Test cases',()=> {
    beforeEach(() => {
        ApiUtils.makeAjaxCall.mockClear();
    });
    describe('getSpendListConnectionData',() => {
        beforeEach(() => {
            SpendingsUtils.getSpendListConnectionData();
        });
        describe('Request Arguments of getSpendListConnectionData',() => {
            let args = '';
            beforeEach(() => {
                args = ApiUtils.makeAjaxCall.mock.calls[0][0];
            });
            it('should make Ajax call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
            });
            it ('should have set the correct method', () => {
                expect(args.method).toBe('POST');
            });
            it ('should construct the correct url', () => {
                expect(args.url).toContain('/banks/{bank-id}/accounts/default');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                SpendingsActionCreator.handleGetSpendListConnectionSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    body:{
                        code: '200',
                        }
                });
            });
            it('should make action call', () => {
                expect(SpendingsActionCreator.handleGetSpendListConnectionSuccess.mock.calls[0][0]).toBeDefined();
            });
        });
        describe('it has error', () => {
            let failure;
            beforeEach(() => {
                SpendingsActionCreator.handleGetSpendListConnectionError.mockClear();
                failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
                failure({
                    error : true
                });
            });
            it('should make action call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls[0][2]).toBeDefined();
            });
       
        });
    });


    describe('getAccountsList',() => {
        beforeEach(() => {
            SpendingsUtils.getAccountsList();
        });
        describe('Request Arguments of getAccountsList',() => {
            let args = '';
            beforeEach(() => {
                args = ApiUtils.makeAjaxCall.mock.calls[0][0];
            });
            it('should make Ajax call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
            });
            it ('should have set the correct method', () => {
                expect(args.method).toBe('GET');
            });
            it ('should construct the correct url', () => {
                expect(args.url).toContain('/banks/{bank-id}/accounts/');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                SpendingsActionCreator.handleAccountsListSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    body:{
                        code: '200',
                        }
                });
            });
            it('should make action call', () => {
                expect(SpendingsActionCreator.handleAccountsListSuccess.mock.calls[0][0]).toBeDefined();
            });
        });
        describe('it has error', () => {
            let failure;
            beforeEach(() => {
                SpendingsActionCreator.handleAccountsListError.mockClear();
                failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
                failure({
                    error : true
                });
            });
            it('should make action call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls[0][2]).toBeDefined();
            });
       
        });
    });

    describe('getPotsDataSpendings',() => {
        beforeEach(() => {
            SpendingsUtils.getPotsDataSpendings();
        });
        describe('Request Arguments of getPotsDataSpendings',() => {
            let args = '';
            beforeEach(() => {
                args = ApiUtils.makeAjaxCall.mock.calls[0][0];
            });
            it('should make Ajax call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
            });
            it ('should have set the correct method', () => {
                expect(args.method).toBe('GET');
            });
            it ('should construct the correct url', () => {
                expect(args.url).toContain('/banks/{bank-id}/accounts/');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                SpendingsActionCreator.handlePotDataSpendingsSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    body:{
                        code: '200',
                        }
                });
            });
            it('should make action call', () => {
                expect(SpendingsActionCreator.handlePotDataSpendingsSuccess.mock.calls[0][0]).toBeDefined();
            });
        });
        describe('it has error', () => {
            let failure;
            beforeEach(() => {
                SpendingsActionCreator.handlePotDataSpendingsError.mockClear();
                failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
                failure({
                    error : true
                });
            });
            it('should make action call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls[0][2]).toBeDefined();
            });
       
        });
    });

    describe('getTagListConnectionData',() => {
        beforeEach(() => {
            SpendingsUtils.getTagListConnectionData();
        });
        describe('Request Arguments of getTagListConnectionData',() => {
            let args = '';
            beforeEach(() => {
                args = ApiUtils.makeAjaxCall.mock.calls[0][0];
            });
            it('should make Ajax call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
            });
            it ('should have set the correct method', () => {
                expect(args.method).toBe('GET');
            });
            it ('should construct the correct url', () => {
                expect(args.url).toContain('/banks/{bank-id}/tags/active');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                SpendingsActionCreator.handleGetTagListConnectionSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    body:{
                        code: '200',
                        }
                });
            });
            it('should make action call', () => {
                expect(SpendingsActionCreator.handleGetTagListConnectionSuccess.mock.calls[0][0]).toBeDefined();
            });
        });
        describe('it has error', () => {
            let failure;
            beforeEach(() => {
                SpendingsActionCreator.handleGetTagListConnectionError.mockClear();
                failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
                failure({
                    error : true
                });
            });
            it('should make action call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls[0][2]).toBeDefined();
            });
       
        });
    });

    describe('getBudgetConnectionData',() => {
        beforeEach(() => {
            SpendingsUtils.getBudgetConnectionData();
        });
        describe('Request Arguments of getBudgetConnectionData',() => {
            let args = '';
            beforeEach(() => {
                args = ApiUtils.makeAjaxCall.mock.calls[0][0];
            });
            it('should make Ajax call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
            });
            it ('should have set the correct method', () => {
                expect(args.method).toBe('GET');
            });
            it ('should construct the correct url', () => {
                expect(args.url).toContain('/banks/{bank-id}/budget');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                SpendingsActionCreator.handleGetBudgetConnectionSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    body:{
                        code: '200',
                        }
                });
            });
            it('should make action call', () => {
                expect(SpendingsActionCreator.handleGetBudgetConnectionSuccess.mock.calls[0][0]).toBeDefined();
            });
        });
        describe('it has error', () => {
            let failure;
            beforeEach(() => {
                SpendingsActionCreator.handleGetBudgetConnectionError.mockClear();
                failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
                failure({
                    error : true
                });
            });
            it('should make action call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls[0][2]).toBeDefined();
            });
       
        });
    });

    describe('updateBudgetConnectionData',() => {
        beforeEach(() => {
            SpendingsUtils.updateBudgetConnectionData();
        });
        describe('Request Arguments of updateBudgetConnectionData',() => {
            let args = '';
            beforeEach(() => {
                args = ApiUtils.makeAjaxCall.mock.calls[0][0];
            });
            it('should make Ajax call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
            });
            it ('should have set the correct method', () => {
                expect(args.method).toBe('PUT');
            });
            it ('should construct the correct url', () => {
                expect(args.url).toContain('/banks/{bank-id}/budget');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                SpendingsActionCreator.handleUpdateBudgetConnectionSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    body:{
                        code: '200',
                        }
                });
            });
            it('should make action call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls[0][1]).toBeDefined();
            });
        });
        describe('it has error', () => {
            let failure;
            beforeEach(() => {
                SpendingsActionCreator.handleUpdateBudgetConnectionError.mockClear();
                failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
                failure({
                    error : true
                });
            });
            it('should make action call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls[0][2]).toBeDefined();
            });
       
        });
    });


    describe('getBudgetPreferencesConnectionData',() => {
        beforeEach(() => {
            SpendingsUtils.getBudgetPreferencesConnectionData();
        });
        describe('Request Arguments of getBudgetPreferencesConnectionData',() => {
            let args = '';
            beforeEach(() => {
                args = ApiUtils.makeAjaxCall.mock.calls[0][0];
            });
            it('should make Ajax call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
            });
            it ('should have set the correct method', () => {
                expect(args.method).toBe('GET');
            });
            it ('should construct the correct url', () => {
                expect(args.url).toContain('/user/budget/preferences');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                SpendingsActionCreator.handleGetBudgetPreferencesConnectionSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    body:{
                        code: '200',
                        }
                });
            });
            it('should make action call', () => {
                expect(SpendingsActionCreator.handleGetBudgetPreferencesConnectionSuccess.mock.calls[0][0]).toBeDefined();
            });
        });
        describe('it has error', () => {
            let failure;
            beforeEach(() => {
                SpendingsActionCreator.handleGetBudgetPreferencesConnectionError.mockClear();
                failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
                failure({
                    error : true
                });
            });
            it('should make action call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls[0][2]).toBeDefined();
            });
       
        });
    });

    describe('updateBudgetPreferencesConnectionData',() => {
        beforeEach(() => {
            SpendingsUtils.updateBudgetPreferencesConnectionData();
        });
        describe('Request Arguments of updateBudgetPreferencesConnectionData',() => {
            let args = '';
            beforeEach(() => {
                args = ApiUtils.makeAjaxCall.mock.calls[0][0];
            });
            it('should make Ajax call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
            });
            it ('should have set the correct method', () => {
                expect(args.method).toBe('PUT');
            });
            it ('should construct the correct url', () => {
                expect(args.url).toContain('/user/budget/preferences');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                SpendingsActionCreator.updateBudgetPreferencesConnectionSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                });
            });
            it('should make action call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls[0][1]).toBeDefined();
            });
        });
        describe('it has error', () => {
            let failure;
            beforeEach(() => {
                failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
                failure({
                    error : true
                });
            });
            it('should make action call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls[0][2]).toBeDefined();
            });
       
        });
    });

    describe('transactionData',() => {
        beforeEach(() => {
            SpendingsUtils.transactionData();
        });
        describe('Request Arguments of transactionData',() => {
            let args = '';
            beforeEach(() => {
                args = ApiUtils.makeAjaxCall.mock.calls[0][0];
            });
            it('should make Ajax call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
            });
            it ('should have set the correct method', () => {
                expect(args.method).toBe('POST');
            });
            it ('should construct the correct url', () => {
                expect(args.url).toContain('/banks/{bank-id}/accounts/default/transactions/searches/matchAllWithFilter');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                SpendingsActionCreator.handleTransactionDetailsSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    body:{
                        code: '200',
                        }
                });
            });
            it('should make action call', () => {
                expect(SpendingsActionCreator.handleTransactionDetailsSuccess.mock.calls[0][0]).toBeDefined();
            });
        });
        describe('it has error', () => {
            let failure;
            beforeEach(() => {
                SpendingsActionCreator.handleTransactionDetailsError.mockClear();
                failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
                failure({
                    error : true
                });
            });
            it('should make action call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls[0][2]).toBeDefined();
            });
       
        });

    });

     describe('numberValidation',() => {
        let retValue;
        let value ;
        it('Check numberValidation 1', () => {
            value = '1000.12'
            retValue = SpendingsUtils.numberValidation(value);
            expect(retValue).toBe(true);
        });

        it('Check numberValidation 2', () => {
            value = '1234567.1234'
            retValue = SpendingsUtils.numberValidation(value);
            expect(retValue).toBe(false);
        });

        it('Check numberValidation 3', () => {
            value = '1234567'
            retValue = SpendingsUtils.numberValidation(value);
            expect(retValue).toBe(false);
        });
    });

     describe('numberValidationForCreateEditBudget',() => {
        let retValue;
        let value ;
        it('Check numberValidationForCreateEditBudget 1', () => {
            value = '1000.12'
            retValue = SpendingsUtils.numberValidationForCreateEditBudget(value);
            expect(retValue).toBe(true);
        });

        it('Check numberValidationForCreateEditBudget 2', () => {
            value = '1234567.1234'
            retValue = SpendingsUtils.numberValidationForCreateEditBudget(value);
            expect(retValue).toBe(false);
        });

        it('Check numberValidationForCreateEditBudget 3', () => {
            value = '1234567'
            retValue = SpendingsUtils.numberValidationForCreateEditBudget(value);
            expect(retValue).toBe(false);
        });

        it('Check numberValidationForCreateEditBudget 4', () => {
            value = '1234567.23.23'
            retValue = SpendingsUtils.numberValidationForCreateEditBudget(value);
            expect(retValue).toBe(false);
        });

        it('Check numberValidationForCreateEditBudget 5', () => {
            value = '99999.'
            retValue = SpendingsUtils.numberValidationForCreateEditBudget(value);
            expect(retValue).toBe(false);
        });

        it('Check numberValidationForCreateEditBudget 5', () => {
            value = '09999.'
            retValue = SpendingsUtils.numberValidationForCreateEditBudget(value);
            expect(retValue).toBe(true);
        });
    });


     
});

