'use strict';
jest.unmock('../SavingsPotsUtils');
jest.unmock('../../../static/config');
jest.unmock('../../config');
const SavingsPotsUtils = require('../SavingsPotsUtils');
const envConfig = require('../../../static/config');
const ApiUtils = require('../ApiUtils');
const SavingPotsActionCreator = require('../../actions/SavingPotsActionCreator');
const PaymentsActionCreator = require('../../actions/PaymentsActionCreator');

describe('SavingsPotsUtils Test cases',()=> {
    beforeEach(() => {
        ApiUtils.makeAjaxCall.mockClear();
    });

    describe('getAccountsList',() => {
        beforeEach(() => {
            SavingsPotsUtils.getAccountsList();
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
                expect(args.url).toContain('/banks/{bank-id}/accounts/default');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                SavingPotsActionCreator.handleAccountsListSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    body:{
                        code: '200',
                        }
                });
            });
            it('should make action call', () => {
                expect(SavingPotsActionCreator.handleAccountsListSuccess.mock.calls[0][0]).toBeDefined();
            });
        });
        describe('it has error', () => {
            let failure;
            beforeEach(() => {
               SavingPotsActionCreator.handleAccountsListError.mockClear();
                failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
                failure({
                    error :"Something went wrong",
                });
            });
            it('should make action call', () => {
                expect(SavingPotsActionCreator.handleAccountsListError.mock.calls[0][0]).toBeDefined();
            });
       
        });
    });

    describe('getPotsData',() => {
        beforeEach(() => {
            SavingsPotsUtils.getPotsData();
        });
        describe('Request Arguments of getPotsData',() => {
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
                expect(args.url).toContain('/banks/{bank-id}/accounts/default/undefined/pots');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                SavingPotsActionCreator.handlePotDataSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    body:{
                        code: '200',
                        }
                });
            });
            it('should make action call', () => {
                expect(SavingPotsActionCreator.handlePotDataSuccess.mock.calls[0][0]).toBeDefined();
            });
        });
        describe('it has error', () => {
            let failure;
            beforeEach(() => {
               SavingPotsActionCreator.handlePotDataError.mockClear();
                failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
                failure({
                    error :"Something went wrong",
                });
            });
            it('should make action call', () => {
                expect(SavingPotsActionCreator.handlePotDataError.mock.calls[0][0]).toBeDefined();
            });
       
        });
    });

    describe('getSinglePotData',() => {
        beforeEach(() => {
            SavingsPotsUtils.getSinglePotData();
        });
        describe('Request Arguments of getSinglePotData',() => {
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
                expect(args.url).toContain('/banks/{bank-id}/accounts/default/undefined/pots/undefined');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                SavingPotsActionCreator.handleSinglePotDataSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    body:{
                        code: '200',
                        }
                });
            });
            it('should make action call', () => {
                expect(SavingPotsActionCreator.handleSinglePotDataSuccess.mock.calls[0][0]).toBeDefined();
            });
        });
        describe('it has error', () => {
            let failure;
            beforeEach(() => {
               SavingPotsActionCreator.handleSinglePotDataError.mockClear();
                failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
                failure({
                    error :"Something went wrong",
                });
            });
            it('should make action call', () => {
                expect(SavingPotsActionCreator.handleSinglePotDataError.mock.calls[0][0]).toBeDefined();
            });
        });
    });
    describe('getCreatePotData',() => {
        beforeEach(() => {
            SavingsPotsUtils.getCreatePotData();
        });
        describe('Request Arguments of getCreatePotData',() => {
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
                expect(args.url).toContain('/banks/{bank-id}/accounts/default/undefined/pots');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                SavingPotsActionCreator.handleCreatedPotDataSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    body:{
                        code: '200',
                        }
                });
            });
            it('should make action call', () => {
                expect(SavingPotsActionCreator.handleCreatedPotDataSuccess.mock.calls[0][0]).toBeDefined();
            });
        });
        describe('it has error', () => {
            let failure;
            beforeEach(() => {
               SavingPotsActionCreator.handleCreatedPotDataError.mockClear();
                failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
                failure({
                    error :"Something went wrong",
                });
            });
            it('should make action call', () => {
                expect(SavingPotsActionCreator.handleCreatedPotDataError.mock.calls[0][0]).toBeDefined();
            });
       
        });
    });

    describe('deletePotConnection',() => {
        beforeEach(() => {
            SavingsPotsUtils.deletePotConnection();
        });
        describe('Request Arguments of deletePotConnection',() => {
            let args = '';
            beforeEach(() => {
                args = ApiUtils.makeAjaxCall.mock.calls[0][0];
            });
            it('should make Ajax call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
            });
            it ('should have set the correct method', () => {
                expect(args.method).toBe('DELETE');
            });
            it ('should construct the correct url', () => {
                console.log(args.url);
                expect(args.url).toContain('/banks/{bank-id}/accounts/default/undefined/pots/undefined');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                SavingPotsActionCreator.getPotData.mockClear();
                PaymentsActionCreator.getPotDetails.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    body:{
                        code: '200',
                        }
                });
            });
            it('should make action call', () => {
                expect(SavingPotsActionCreator.getPotData.mock.calls).toBeDefined();
                expect(PaymentsActionCreator.getPotDetails.mock.calls).toBeDefined();
            });
        });
    });

    describe('editPotConnection',() => {
        beforeEach(() => {
            SavingsPotsUtils.editPotConnection();
        });
        describe('Request Arguments of editPotConnection',() => {
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
                expect(args.url).toContain('/banks/{bank-id}/accounts/default/undefined/pots');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                SavingPotsActionCreator.handleSinglePotDataSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    body:{
                        code: '200',
                        }
                });
            });
            it('should make action call', () => {
                expect(SavingPotsActionCreator.handleSinglePotDataSuccess.mock.calls[0][0]).toBeDefined();
            });
           
        });
        describe('it was error', () => {
            
            let failure;
            beforeEach(() => {
                SavingPotsActionCreator.handleSinglePotDataError.mockClear();
                failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
                failure({
                    error :"Something went wrong",
                });
            });
             it('should make action call', () => {
                expect(SavingPotsActionCreator.handleSinglePotDataError.mock.calls[0][0]).toBeDefined();
            });
             });
    });
    describe('getInterPotData',() => {
        beforeEach(() => {
            SavingsPotsUtils.getInterPotData();
        });
        describe('Request Arguments of getInterPotData',() => {
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
                expect(args.url).toContain('/banks/{bank-id}/accounts/default/undefined/pots/transactions');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                SavingPotsActionCreator.getInterPotDataSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    body:{
                        code: '200',
                        }
                });
            });
            it('should make action call', () => {
                expect(SavingPotsActionCreator.getInterPotDataSuccess.mock.calls).toBeDefined();
            });
           
        });
        describe('it was error', () => {
            
            let failure;
            beforeEach(() => {
                SavingPotsActionCreator.getInterPotDataError.mockClear();
                failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
                failure({
                    error :"Something went wrong",
                });
            });
             it('should make action call', () => {
                expect(SavingPotsActionCreator.getInterPotDataError.mock.calls[0][0]).toBeDefined();
            });
        });
    });
});
 
