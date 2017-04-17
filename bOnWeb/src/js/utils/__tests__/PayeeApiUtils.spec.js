/**
 * @module PayeeApiUtils
 */

'use strict';
jest.unmock('../PayeeApiUtils');
jest.unmock('../../../static/config');
jest.unmock('../../config');
const PayeeApiUtils = require('../PayeeApiUtils');
const envConfig = require('../../../static/config');
const ApiUtils = require('../ApiUtils');
const PayeeActionCreator = require('../../actions/PayeeActionCreator');

describe('Payee Api Utils Test Cases', () => {
    beforeEach(() => {
        ApiUtils.makeAjaxCall.mockClear();
    });
    describe('getPayeeList', () => {
        beforeEach(() => {
            PayeeApiUtils.getPayeeList();
        });
        describe('Request Arguments of getPayeeList', () => {
            let args = '';
            beforeEach(() => {
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
                PayeeActionCreator.handlePayeesListSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    accounts: []
                });
            });
            it('should make action call', () => {
                expect(PayeeActionCreator.handlePayeesListSuccess.mock.calls[0][0]).toBeDefined();
            });
        });
        describe('it has error', () => {
            let failure;
            beforeEach(() => {
                PayeeActionCreator.handlePayeeServiceCall.mockClear();
                failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
                failure({
                    error: "Something went wrong"
                });
            });
            it('should make action call', () => {
                // expect(PayeeActionCreator.handlePayeeServiceCall.mock.calls[0][0]).toBeDefined();
            });
        });
    });
    describe('editPayee', () => {
        beforeEach(() => {
            let _fieldValue = '12345678';
            PayeeApiUtils.editPayee(_fieldValue);
        });
        describe('Request Arguments of editPayee', () => {
            let args = '';
            beforeEach(() => {
                args = ApiUtils.makeAjaxCall.mock.calls[0][0];
            });
            it('should make Ajax call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
            });
            it('should have set the correct method', () => {
                expect(args.method).toBe('Post');
            });
            it('should construct the correct url', () => {
                expect(args.url).toContain('undefined/banks/{bank-id}/accounts/default/undefined/beneficiaries/account');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                PayeeActionCreator.handlePayeeServiceCall.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    error: {
                        code: '422',
                    }
                });
            });
            it('should make action call', () => {
                expect(PayeeActionCreator.handlePayeeServiceCall.mock.calls).toBeDefined();
            });
        });
        describe('it has error', () => {
            let failure;
            beforeEach(() => {
                PayeeActionCreator.handlePayeeServiceCall.mockClear();
                failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
                failure({
                    error: "Something went wrong"
                });
            });
            it('should make action call', () => {
                expect(PayeeActionCreator.handlePayeeServiceCall.mock.calls[0][0]).toBeDefined();
            });
        });
    });
    describe('addPayee', () => {
        beforeEach(() => {
            let accountNumber = '12345678';
            let accountid = '05985dae-d2de-4ebc-ab0a-79093081bde5'
            PayeeApiUtils.addPayee(accountNumber, accountid);
        });
        describe('Request Arguments of editPayee', () => {
            let args = '';
            beforeEach(() => {
                args = ApiUtils.makeAjaxCall.mock.calls[0][0];
            });
            it('should make Ajax call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
            });
            it('should have set the correct method', () => {
                expect(args.method).toBe('Post');
            });
            it('should construct the correct url', () => {
                expect(args.url).toContain('undefined/banks/{bank-id}/accounts/default/05985dae-d2de-4ebc-ab0a-79093081bde5/beneficiaries/account');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                PayeeActionCreator.handleAddPayeeServiceCall.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    body: {
                        code: '201',
                    }
                });
            });
            it('should make action call', () => {
                expect(PayeeActionCreator.handleAddPayeeServiceCall.mock.calls).toBeDefined();
            });
        });
        describe('it has error', () => {
            let failure;
            beforeEach(() => {
                PayeeActionCreator.handleAddPayeeServiceCall.mockClear();
                failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
                failure({
                    error: "Something went wrong"
                });
            });
            it('should make action call', () => {
                expect(PayeeActionCreator.handleAddPayeeServiceCall.mock.calls[0][0]).toBeDefined();
            });
        });
    });
    describe('deletePayee', () => {
        beforeEach(() => {
            let deletePayeeRequest = true;
            PayeeApiUtils.deletePayee(deletePayeeRequest);
        });
        describe('Request Arguments of editPayee', () => {
            let args = '';
            beforeEach(() => {
                args = ApiUtils.makeAjaxCall.mock.calls[0][0];
            });
            it('should make Ajax call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
            });
            it('should have set the correct method', () => {
                expect(args.method).toBe('DELETE');
            });
            it('should construct the correct url', () => {
                expect(args.url).toContain('undefined/banks/{bank-id}/accounts/default/undefined/beneficiaries/undefined');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                PayeeActionCreator.handleDeletePayeeSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    accounts: []
                });
            });
            it('should make action call', () => {
                expect(PayeeActionCreator.handleDeletePayeeSuccess.mock.calls[0][0]).toBeDefined();
            });
        });
        describe('it has error', () => {
            let failure;
            beforeEach(() => {
                PayeeActionCreator.handlePayeeServiceCall.mockClear();
                failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
                failure({
                    error: "Something went wrong"
                });
            });
            it('should make action call', () => {
                expect(PayeeActionCreator.handlePayeeServiceCall.mock.calls[0][0]).toBeDefined();
            });
        });
        // describe('it has error as undefined', () => {
        //     let failure;
        //     beforeEach(() => {
        //         PayeeActionCreator.handlePayeeServiceCall.mockClear();
        //         failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
        //         // failure({
        //         //     error: undefined,
        //         // });
        //         let error = undefined;
        //     });
        //     it('should make action call', () => {
        //         expect(PayeeActionCreator.handlePayeeServiceCall.mock.calls[0][0]).toBeDefined();
        //     });
        // });
        // describe('it was failure', () => {
        //     let failure;
        //     beforeEach(() => {
        //         PayeeActionCreator.handlePayeeServiceCall.mockClear();
        //         failure = ApiUtils.makeAjaxCall.mock.calls[0][1];
        //         failure({
        //             error: 'undefined'
        //         });
        //     });
        //     it('should make action call', () => {
        //         //expect(PayeeActionCreator.handlePayeeServiceCall.mock.calls[0][0]).toBeDefined();
        //     });
        // });
    });
});