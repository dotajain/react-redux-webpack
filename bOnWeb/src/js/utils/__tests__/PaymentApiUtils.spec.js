/**
 * @module PaymentApiUtils
 */

'use strict';
jest.unmock('../PaymentApiUtils');
jest.unmock('../../../static/config');
jest.unmock('../../config');
const PaymentApiUtils = require('../PaymentApiUtils');
const envConfig = require('../../../static/config');
const ApiUtils = require('../ApiUtils');
const HashcodeUtils = require('../HashcodeUtils');
const PaymentsActionCreator = require('../../actions/PaymentsActionCreator');

describe('Payee Api Utils Test Cases', () => {
    beforeEach(() => {
        ApiUtils.makeAjaxCall.mockClear();
    });
    describe('getAccountsList', () => {
        beforeEach(() => {
            PaymentApiUtils.getAccountsList();
        });
        describe('Request Arguments of getAccountsList', () => {
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
                PaymentsActionCreator.handleAccountsListSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    accounts: []
                });
            });
            it('should make action call', () => {
                expect(PaymentsActionCreator.handleAccountsListSuccess.mock.calls[0][0]).toBeDefined();
            });
        });
    });
    describe('getPayeeList', () => {
        beforeEach(() => {
            PaymentApiUtils.getPayeeList();
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
                expect(args.url).toContain('/banks/{bank-id}/accounts/default/beneficiaries');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                PaymentsActionCreator.handlePayeesListSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    accounts: []
                });
            });
            it('should make action call', () => {
                expect(PaymentsActionCreator.handlePayeesListSuccess.mock.calls[0][0]).toBeDefined();
            });
        });
    });
    describe('getStandingOrderPaymentList', () => {
        beforeEach(() => {
            let accountname = 'loan';
            let accountid = '05985dae-d2de-4ebc-ab0a-79093081bde5';
            let accounttype = 'current';
            PaymentApiUtils.getStandingOrderPaymentList(accountname, accountid, accounttype);
        });
        describe('Request Arguments of getPayeeList', () => {
            let args = '';
            const _getPaymentUrl = '/banks/{bank-id}/accounts/default/{account_id}/mandates/';
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
                expect(args.url).toContain('undefined/banks/{bank-id}/accounts/default/loan/mandates/so');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                PaymentsActionCreator.getPaymentSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    body: {
                        accountname: '',
                        accountid: '',
                        accounttype: '',
                    }
                });
            });
            it('should make action call', () => {
                expect(PaymentsActionCreator.getPaymentSuccess.mock.calls).toBeDefined();
            });
        });
        		describe('it has error', () => {
			let failure;
			beforeEach(() => {
				PaymentsActionCreator.getPaymentError.mockClear();
				failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
				failure({
					error : "Something went wrong"
				});
			});
			it('should make action call', () => {
				expect(PaymentsActionCreator.getPaymentError.mock.calls[0][0]).toBeDefined();
			});
		});

    });
    describe('getDirectDebitPaymentList', () => {
        beforeEach(() => {
            let accountname = 'loan';
            let accountid = '05985dae-d2de-4ebc-ab0a-79093081bde5';
            let accounttype = 'current';
            PaymentApiUtils.getDirectDebitPaymentList(accountid, accountname, accounttype);
        });
        describe('Request Arguments of getDirectDebitPaymentList', () => {
            let args = '';
            //const _getPaymentUrl = '/banks/{bank-id}/accounts/default/{account_id}/mandates/';
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
                expect(args.url).toContain('undefined/banks/{bank-id}/accounts/default/05985dae-d2de-4ebc-ab0a-79093081bde5/mandates/dd');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                PaymentsActionCreator.getDDPaymentSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    body: {
                        accountname: '',
                        accountid: '',
                        accounttype: '',
                    }
                });
            });
            it('should make action call', () => {
                expect(PaymentsActionCreator.getDDPaymentSuccess.mock.calls[0][0]).toBeDefined();
            });
        });
                describe('it has error', () => {
            let failure;
            beforeEach(() => {
                PaymentsActionCreator.getDDPaymentFailure.mockClear();
                //PaymentsActionCreator.handleMakePaymentServiceCall.mockClear();
                failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
                failure({
                    error: "Something went wrong"
                });
            });
            it('should make action call', () => {
                expect( PaymentsActionCreator.getDDPaymentFailure.mock.calls[0][0]).toBeDefined();
            });
        });
    });
    describe('getPotList', () => {
        beforeEach(() => {
            PaymentApiUtils.getPotList();
        });
        describe('Request Arguments of getPotList', () => {
            let args = '';
            //const _getPaymentUrl = '/banks/{bank-id}/accounts/default/{account_id}/mandates/';
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
                expect(args.url).toContain('undefined/banks/{bank-id}/accounts/default');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                PaymentsActionCreator.handlePotListSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    body: {

                    }
                });
            });
            it('should make action call', () => {
                expect(PaymentsActionCreator.handlePotListSuccess.mock.calls[0][0]).toBeDefined();
            });
        });
                describe('it has error', () => {
            let failure;
            beforeEach(() => {
                PaymentsActionCreator.getDDPaymentFailure.mockClear();
                failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
                failure({
                    error: "Something went wrong"
                });
            });
            it('should make action call', () => {
                // expect(PayeeActionCreator.getDDPaymentFailure.mock.calls[0][0]).toBeDefined();
            });
        });
    });
    describe('makeSingleUsePayee', () => {
        beforeEach(() => {
            let requestBody = true;
            PaymentApiUtils.makeSingleUsePayee(requestBody);
        });
        describe('Request Arguments of makeSingleUsePayee', () => {
            let args = '';
            //const _getPaymentUrl = '/banks/{bank-id}/accounts/default/{account_id}/mandates/';
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
                expect(args.url).toContain('undefined/banks/{bank-id}/accounts/default');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                PaymentsActionCreator.handleSingleUsePayee.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    body: {
                        code: '201',
                    }
                });
            });
            it('should make action call', () => {
                expect(PaymentsActionCreator.handleSingleUsePayee.mock.calls[0][0]).toBeDefined();
            });
        });
        describe('it has error', () => {
            let failure;
            beforeEach(() => {
                PaymentsActionCreator.handleMakePaymentServiceCall.mockClear();
                failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
                failure({
                    error: "Something went wrong"
                });
            });
            it('should make action call', () => {
                expect(PaymentsActionCreator.handleMakePaymentServiceCall.mock.calls[0][0]).toBeDefined();
            });
        });
    });
    describe('makeInterPotTransfer', () => {
        beforeEach(() => {
            const props = {
                requestBody: {
                    requestData: {
                        source_id: "11221122",
                    }
                }
            }
            PaymentApiUtils.makeInterPotTransfer(props.requestBody);
        });
        describe('Request Arguments of makeInterPotTransfer', () => {
            let args = '';
            //const _getPaymentUrl = '/banks/{bank-id}/accounts/default/{account_id}/mandates/';
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
                expect(args.url).toContain('undefined/banks/{bank-id}/accounts/default');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                PaymentsActionCreator.handleMakePaymentServiceCall.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    body: {
                        code: '202',
                    }
                });
            });
            it('should make action call', () => {
                expect(PaymentsActionCreator.handleMakePaymentServiceCall.mock.calls[0][0]).toBeDefined();
            });
        });
        describe('it has error', () => {
            let failure;
            beforeEach(() => {
                PaymentsActionCreator.handleMakePaymentServiceCall.mockClear();
                failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
                failure({
                    error: "Something went wrong"
                });
            });
            it('should make action call', () => {
                expect(PaymentsActionCreator.handleMakePaymentServiceCall.mock.calls[0][0]).toBeDefined();
            });
        });
    });
    describe('makePayment', () => {
        beforeEach(() => {
            let requestBody = true;
            PaymentApiUtils.makePayment(requestBody);
        });
        describe('Request Arguments of makePayment', () => {
            let args = '';
            //const _getPaymentUrl = '/banks/{bank-id}/accounts/default/{account_id}/mandates/';
            beforeEach(() => {
                args = ApiUtils.makeAjaxCall.mock.calls[0][0];
            });
            it('should make Ajax call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
            });
            it('should have set the correct method', () => {
                expect(args.method).toBe('Get');
            });
            it('should construct the correct url', () => {
                expect(args.url).toContain('undefined/banks/{bank-id}/accounts/default');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                PaymentsActionCreator.handleMakePaymentServiceCall.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    body: {
                        code: '202',
                    }
                });
            });
            it('should make action call', () => {
                expect(PaymentsActionCreator.handleMakePaymentServiceCall.mock.calls[0][0]).toBeDefined();
            });
        });
        describe('it has error', () => {
            let failure;
            beforeEach(() => {
                PaymentsActionCreator.handleMakePaymentServiceCall.mockClear();
                failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
                failure({
                    error: "Something went wrong"
                });
            });
            it('should make action call', () => {
                expect(PaymentsActionCreator.handleMakePaymentServiceCall.mock.calls[0][0]).toBeDefined();
            });
        });
    });
    describe('makeSOPayment', () => {
        beforeEach(() => {
            const props = {
                requestBody: {
                    makePaymentRequest: {
                        requestData: {
                            source_id: "11221122",
                        }
                    }
                }
            }
            PaymentApiUtils.makeSOPayment(props.requestBody);
        });
        describe('Request Arguments of makeSOPayment', () => {
            let args = '';
            //const _getPaymentUrl = '/banks/{bank-id}/accounts/default/{account_id}/mandates/';
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
                expect(args.url).toContain('undefined/banks/{bank-id}/accounts/default');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                PaymentsActionCreator.handleMakePaymentServiceCall.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    body: {
                        code: '202',
                    }
                });
            });
            it('should make action call', () => {
                expect(PaymentsActionCreator.handleMakePaymentServiceCall.mock.calls[0][0]).toBeDefined();
            });
        });
        describe('it has error', () => {
            let failure;
            beforeEach(() => {
                PaymentsActionCreator.handleMakePaymentServiceCall.mockClear();
                failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
                failure({
                    error: "Something went wrong"
                });
            });
            it('should make action call', () => {
                expect(PaymentsActionCreator.handleMakePaymentServiceCall.mock.calls[0][0]).toBeDefined();
            });
        });
    });
    describe('makeDDPayment', () => {
        beforeEach(() => {
            const props = {
                requestBody: {
                    makePaymentRequestDD: {
                        requestData: {
                            source_id: "11221122",
                            tags: [
                                '11111111-2222-3333-4444-555555555555',
                            ]
                        }
                    }
                }
            }
            PaymentApiUtils.makeDDPayment(props.requestBody);
        });
        describe('Request Arguments of makeDDPayment', () => {
            let args = '';
            //const _getPaymentUrl = '/banks/{bank-id}/accounts/default/{account_id}/mandates/';
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
                expect(args.url).toContain('undefined/banks/{bank-id}/accounts/default');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                PaymentsActionCreator.handleMakePaymentServiceCall.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    body: {
                        code: '202',
                    }
                });
            });
            it('should make action call', () => {
                expect(PaymentsActionCreator.handleMakePaymentServiceCall.mock.calls).toBeDefined();
            });
        });
        describe('it has error', () => {
            let failure;
            beforeEach(() => {
                PaymentsActionCreator.handleMakePaymentServiceCall.mockClear();
                failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
                failure({
                    error: "Something went wrong"
                });
            });
            it('should make action call', () => {
                expect(PaymentsActionCreator.handleMakePaymentServiceCall.mock.calls[0][0]).toBeDefined();
            });
        });
    });
    describe('getDirectDebitList', () => {
        beforeEach(() => {
            PaymentApiUtils.getDirectDebitList();
        });
        describe('Request Arguments of getDirectDebitList', () => {
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
                expect(args.url).toContain('undefined/banks/{bank-id}/accounts/default/{account_id}/mandates/dd');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                PaymentsActionCreator.handleDirectDebitListSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    accounts: []
                });
            });
            it('should make action call', () => {
                expect(PaymentsActionCreator.handleDirectDebitListSuccess.mock.calls[0][0]).toBeDefined();
            });
        });
    });
    describe('getStandingOrderList', () => {
        beforeEach(() => {
            PaymentApiUtils.getStandingOrderList();
        });
        describe('Request Arguments of getStandingOrderList', () => {
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
                expect(args.url).toContain('undefined/banks/{bank-id}/accounts/default/{account_id}/mandates/so');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                PaymentsActionCreator.handleStandingOrderListSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    accounts: []
                });
            });
            it('should make action call', () => {
                expect(PaymentsActionCreator.handleStandingOrderListSuccess.mock.calls[0][0]).toBeDefined();
            });
        });
    });
    describe('deletePaymentList', () => {
        beforeEach(() => {
            let deletePaymentRequest = true;
            PaymentApiUtils.deletePaymentList(deletePaymentRequest);
        });
        describe('Request Arguments of deletePaymentList', () => {
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
                expect(args.url).toContain('undefined/banks/{bank-id}/accounts/default/undefined/mandates/undefined/undefined');
            });
        });
                describe('it was success', () => {
            let success;
            beforeEach(() => {
                PaymentsActionCreator.handleDeletePaymentSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    accounts: []
                });
            });
            it('should make action call', () => {
                expect(PaymentsActionCreator.handleDeletePaymentSuccess.mock.calls[0][0]).toBeDefined();
            });
        });
                describe('it has error', () => {
            let failure;
            beforeEach(() => {
                PaymentsActionCreator.updateEditPaymentStatus.mockClear();
                failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
                failure({
                    error: "Something went wrong"
                });
            });
            it('should make action call', () => {
                expect(PaymentsActionCreator.updateEditPaymentStatus.mock.calls[0][0]).toBeDefined();
            });
        });
    });
    describe('deletePayeeList', () => {
        beforeEach(() => {
            PaymentApiUtils.deletePayeeList();
        });
        describe('Request Arguments of deletePayeeList', () => {
            let args = '';
            beforeEach(() => {
                args = ApiUtils.makeAjaxCall.mock.calls[0][0];
            });
            it('should make Ajax call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
            });
            it('should have set the correct method', () => {
                expect(args.method).toBe('Get');
            });
            it('should construct the correct url', () => {
                expect(args.url).toContain('/banks/{bank-id}/accounts/default');
            });
        });

        // describe('it was success', () => {
        //     let success;
        //     beforeEach(() => {
        //         PaymentsActionCreator.handleDeletePayeeListSuccess.mockClear();
        //         success = ApiUtils.makeAjaxCall.mock.calls[0][1];
        //         success({
        //             accounts: []
        //         });
        //     });
        //     it('should make action call', () => {
        //         expect(PaymentsActionCreator.handleDeletePayeeListSuccess.mock.calls[0][0]).toBeDefined();
        //     });
        // });

    });
    describe('postEditedData', () => {
        beforeEach(() => {
            const props = {
                editPaymentData: {
                    data: {
                        requestData: {
                            source_id: '11221122'
                        }
                    }
                }
            }
            let mandateId = '444444'
            PaymentApiUtils.postEditedData(props.editPaymentData, mandateId);
        });
        describe('Request Arguments of postEditedData', () => {
            let args = '';
            beforeEach(() => {
                args = ApiUtils.makeAjaxCall.mock.calls[0][0];
            });
            it('should make Ajax call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
            });
            it('should have set the correct method', () => {
                expect(args.method).toBe('PUT');
            });
            it('should construct the correct url', () => {
                expect(args.url).toContain('undefined/banks/{bank-id}/accounts/default/undefined/mandates/so//444444');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                PaymentsActionCreator.updateSOPaymentStatus.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    accounts: []
                });
            });
            it('should make action call', () => {
                expect(PaymentsActionCreator.updateSOPaymentStatus.mock.calls[0][0]).toBeDefined();
            });
        });
    });

    describe('getAccountDetails', () => {
        beforeEach(() => {
            let accountNumber = '12345678';
            PaymentApiUtils.getAccountDetails(accountNumber);
        });
        describe('Request Arguments of getAccountDetails', () => {
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
                expect(args.url).toContain('banks/{bank-id}/accounts/default/12345678');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                PaymentsActionCreator.handleAccountsDetailsSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    id: '123456',
                    product: {},
                    metadata: {},
                });
            });
            it('should make action call', () => {
                expect(PaymentsActionCreator.handleAccountsDetailsSuccess.mock.calls[0][0]).toBeDefined();
            });
        });
        describe('it has error', () => {
            let failure;
            beforeEach(() => {
                PaymentsActionCreator.handleAccountsDetailsSuccess.mockClear();
                failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
                failure({
                    error: "Something went wrong"
                });
            });
            it('should make action call', () => {
                expect(PaymentsActionCreator.handleAccountsDetailsSuccess.mock.calls[0][0]).toBeDefined();
            });
        });
    });
    describe('getPotDetails', () => {
        beforeEach(() => {
            let accountNumber = '12345678';
            PaymentApiUtils.getPotDetails(accountNumber);
        });
        describe('Request Arguments of getPotDetails', () => {
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
                expect(args.url).toContain('undefined/banks/{bank-id}/accounts/default/12345678/pots');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                PaymentsActionCreator.handlePotsDetailsSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    id: '123456',
                    product: {},
                    metadata: {},
                });
            });
            it('should make action call', () => {
                expect(PaymentsActionCreator.handlePotsDetailsSuccess.mock.calls[0][0]).toBeDefined();
            });
        });
                        describe('it has error', () => {
            let failure;
            beforeEach(() => {
                PaymentsActionCreator.getDDPaymentFailure.mockClear();
                failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
                failure({
                    error: "Something went wrong"
                });
            });
            it('should make action call', () => {
                // expect(PayeeActionCreator.getDDPaymentFailure.mock.calls[0][0]).toBeDefined();
            });
        });
    });


    describe('editPayment', () => {
        beforeEach(() => {
            const props = {
                    data: {
                        requestData: {
                            source_id: '11221122'
                        }
                    }
            }
            let mandateId = '444444'
            let accountid = '05985dae-d2de-4ebc-ab0a-79093081bde5';
            PaymentApiUtils.editPayment(props.data, accountid, mandateId);
        });
        describe('Request Arguments of editPayment', () => {
            let args = '';
            beforeEach(() => {
                args = ApiUtils.makeAjaxCall.mock.calls[0][0];
            });
            it('should make Ajax call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
            });
            it('should have set the correct method', () => {
                expect(args.method).toBe('PUT');
            });
            it('should construct the correct url', () => {
                expect(args.url).toContain('undefined/banks/{bank-id}/accounts/default/05985dae-d2de-4ebc-ab0a-79093081bde5/mandates/so/444444');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                PaymentsActionCreator.updateEditPaymentStatus.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    id: '123456',
                    product: {},
                    metadata: {},
                });
            });
            it('should make action call', () => {
                expect(PaymentsActionCreator.updateEditPaymentStatus.mock.calls[0][0]).toBeDefined();
            });
        });
                        describe('it has error', () => {
            let failure;
            beforeEach(() => {
                PaymentsActionCreator.updateEditPaymentStatus.mockClear();
                failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
                failure({
                    error: "Something went wrong"
                });
            });
            it('should make action call', () => {
                // expect(PaymentsActionCreator.updateEditPaymentStatus.mock.calls[0][0]).toBeDefined();
            });
        });
    });

});