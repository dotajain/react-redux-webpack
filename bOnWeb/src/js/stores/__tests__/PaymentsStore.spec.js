/**
 * @module PaymentsStore
 */
'use strict';

jest.unmock('../../constants/PaymentsConstants');
jest.unmock('../PaymentsStore');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const _ = require('lodash');
const EventEmitter = require('events').EventEmitter;

const AppDispatcher = require('../../dispatcher/AppDispatcher');
const PaymentApiUtils = require('../../utils/PaymentApiUtils');
const PaymentsConstants = require('../../constants/PaymentsConstants');
const AccountConstants = require('../../constants/AccountConstants');
const AppConstants = require('../../constants/AppConstants');
const PaymentsStore = require('../PaymentsStore');
const AccountsStore = require('../AccountsStore');
const PaymentsActionCreator = require('../../actions/PaymentsActionCreator');
const AccountsActionCreator = require('../../actions/AccountsActionCreator');

describe('EditPayment Store test cases', () => {
    let callback = AppDispatcher.register.mock.calls[0][0];
    let result;
    let getFromAccountList = (data) => ({
        action: {
            actionType: PaymentsConstants.GET_FROM_ACCOUNTS,
            data
        }
    });
    let handleAccountsDetailsSuccess = (data) => ({
        action: {
            actionType: PaymentsConstants.REQUEST_ACCOUNT_DETAIL_SUCCESS,
            data
        }
    });
    let handleAccountsListSuccess = (data) => ({
        action: {
            actionType: PaymentsConstants.GET_FROM_ACCOUNTS_SUCCESS,
            data
        }
    });
    let getAccountDetails = (data) => ({
        action: {
            actionType: PaymentsConstants.REQUEST_ACCOUNT_DETAIL,
            data
        }
    });
    let handleAccountsListSuccess1 = (data) => ({
        action: {
            actionType: AccountConstants.REQUEST_ACCOUNTS_LIST_SUCCESS,
            data
        }
    });
    let handleAccountsDetailsSuccess1 = (data, type) => ({
        action: {
            actionType: type,
            data
        }
    });
    let setPaymentType = (data) => ({
        action: {
            actionType: PaymentsConstants.SELECT_PAYMENT_TYPE,
            data
        }
    });
    let getFromPayeeList = () => ({
        action: {
            actionType: PaymentsConstants.GET_FROM_PAYEES
        }
    });
    let handlePayeesListSuccess = () => ({
        action: {
            actionType: PaymentsConstants.GET_FROM_PAYEES_SUCCESS
        }
    });
    let getFromPotList = () => ({
        action: {
            actionType: PaymentsConstants.GET_FROM_POTS
        }
    });
    let handlePotListSuccess = (data, type) => ({
        action: {
            actionType: type,
            data
        }
    });
    let handleMakePaymentServiceCall = (data, type) => ({
        action: {
            actionType: type,
            data
        }
    });
    let makePayment = (data, type) => ({
        action: {
            actionType: type,
            data
        }
    });
    let makeTransfer = (data, type) => ({
        action: {
            actionType: type,
            data
        }
    });
    let putSelectedPayee = (data, type) => ({
        action: {
            actionType: type,
            data
        }
    });
    let handleDeletePaymentListSuccess = (data) => ({
        action: {
            actionType: PaymentsConstants.DELETE_PAYMENT_DETAILS_SUCCESS,
            data
        }
    });
    let sendDeletePayee = (data) => ({
        action: {
            actionType: PaymentsConstants.DELETE_PAYEE_DETAILS,
            data
        }
    });
    let handleDeletePayeeListSuccess = (data) => ({
        action: {
            actionType: PaymentsConstants.DELETE_PAYEE_DETAILS_SUCCESS,
            data
        }
    });
    let confrimPayment = (data) => ({
        action: {
            actionType: PaymentsConstants.CONFIRM_PAYMENT,
            data
        }
    });
    let getDirectDebitList = (data) => ({
        action: {
            actionType: PaymentsConstants.GET_DIRECT_DEBIT_LIST,
            data
        }
    });
    let sendDeletePayment = (data) => ({
        action: {
            actionType: PaymentsConstants.DELETE_PAYMENT_DETAILS,
            data
        }
    });
    let postRepeatPaymentData = (data) => ({
        action: {
            actionType: PaymentsConstants.POST_TO_STORE,
            data
        }
    });
    let getAllpaymentList = (data, type) => ({
        action: {
            actionType: type,
            data: data
        }
    });
    let navigateToWebTask = (data) => ({
        action: {
            actionType: AppConstants.NAVIGATE_TO_WEB_TASK,
            data
        }
    });
    let refreshSavingComponent = () => ({
        action: {
            actionType: PaymentsConstants.SAVING_REFRESH,

        }
    });
    let savingTotalClick = (data) => ({
        action: {
            actionType: PaymentsConstants.SAVING_TOT_CLICK,
            data
        }
    });
    let setLeftMarginOverlay = (data) => ({
        action: {
            actionType: PaymentsConstants.SET_LEFT_MARGIN,
            data
        }
    });
    let setPaymentStep = (data) => ({
        action: {
            actionType: PaymentsConstants.SET_TO_RP,
            data
        }
    });
    let postEditeDataToPaymentStore = (data) => ({
        action: {
            actionType: PaymentsConstants.SET_EDIT_PAYMENT_DATA_FROM_EDITSTORE,
            data: data
        }
    });
    let goBackToRepeatPayment = (data) => ({
        action: {
            actionType: PaymentsConstants.GO_BACK_TO_RP,
            data
        }
    });
    let checkEndData = (data) => ({
        action: {
            actionType: PaymentsConstants.SET_ENDING_DETAILS,
            data
        }
    });
    let getPotDetails = (data) => ({
        action: {
            actionType: PaymentsConstants.REQUEST_POT_DETAIL,
            data
        }
    });
    let handlePotsDetailsSuccess = (data) => ({
        action: {
            actionType: PaymentsConstants.REQUEST_POT_DETAIL_SUCCESS,
            data
        }
    });
    let setPaymentEditId = (data) => ({
        action: {
            actionType: PaymentsConstants.SET_PAYMENT_ID,
            data: data
        }
    });
    let potClicked = (data) => ({
        action: {
            actionType: PaymentsConstants.POT_CLICKED,
            data: data
        }
    });
    let selectedToPot = (data) => ({
        action: {
            actionType: PaymentsConstants.SELECTED_TO_POT,
            data: data
        }
    });
    let selectedPot = (data) => ({
        action: {
            actionType: PaymentsConstants.SELECTED_POT,
            data: data
        }
    });
    let updateSOPaymentStatus = (data) => ({
        action: {
            actionType: PaymentsConstants.UPDATE_PAYMENT_SO_LIST,
            data: data
        }
    });
    let postEditedPaymentData = (data) => ({
        action: {
            actionType: PaymentsConstants.POST_EDITPAYMENTDATA,
            data: data
        }
    });
    let getPaymentDetailsById = (data) => ({
        action: {
            actionType: PaymentsConstants.GET_PAYMENTDETAILS_BYID,
            data
        }
    });
    let getStandingOrderList = (data) => ({
        action: {
            actionType: PaymentsConstants.GET_STANDING_ORDER_LIST,
            data: data
        }
    });
    let getDDPaymentFailure = (data) => ({
        action: {
            actionType: PaymentsConstants.GET_DIRECT_DEBIT_LIST_ERROR,
            data: data
        }
    });
    let putSelectedAccount = (data) => ({
        action: {
            actionType: PaymentsConstants.PUT_SELECTED_ACCOUNT,
            data: data
        }
    });
    let putToSelectedAccount = (data, type) => ({
        action: {
            actionType: type,
            data: data
        }
    });
    let getDDPaymentSuccess = (mandates) => ({
        action: {
            actionType: PaymentsConstants.GET_DIRECT_DEBIT_LIST_SUCCESS,
            data: mandates
        }
    });
    let spendingTransferMoney = (spending) => ({
        action: {
            actionType: PaymentsConstants.SPENDING_TRANSFER_MONEY,
            data: spending,
            fromPayment: true
        }
    });
    let spendingTransferMoneyPot = (spending) => ({
        action: {
            actionType: PaymentsConstants.SPENDING_TRANSFER_MONEY,
            data: spending,
        }
    });

    let isEditPaymentExit = (isExit) => ({
        action: {
            actionType: PaymentsConstants.EDIT_PAYMENT_EXIT,
            data: isExit,

        }
    });
    let clearToList = (clearlist) => ({
        action: {
            actionType: PaymentsConstants.MOBILE_CLEAR_TOLIST,
            data: clearlist,

        }
    });
    let setBackConfirm = (data) => ({
        action: {
            actionType: PaymentsConstants.GO_BACK_HIDE_KEYPAD,
            data: data,

        }
    });
    let goToPayments = (data) => ({
        action: {
            actionType: PaymentsConstants.SPENDING_MOVE_MONEY,
            data: data,

        }
    });
    let spendingdata = (data) => ({
        action: {
            actionType: PaymentsConstants.FROM_SPENDING,
            data: data,

        }
    });
    let assignRepeatData = (data) => ({
        action: {
            actionType: PaymentsConstants.SET_REPEAT_DATA,
            data: data,

        }
    });
    let getPaymentFilterData = (data) => ({
        action: {
            actionType: PaymentsConstants.GET_PAYMENT_FILTER,
            data: data,

        }
    });
    let getArchivedFilterData = (data) => ({
        action: {
            actionType: PaymentsConstants.GET_ARCHIVED_FILTER,
            data: data,

        }
    });
    let getPaymentSuccess = (mandates) => ({
        action: {
            actionType: PaymentsConstants.GET_STANDING_ORDER_LIST_SUCCESS,
            data: mandates,

        }
    });
    let getdebitpaymentsuccess = (data) => ({
        action: {
            actionType: PaymentsConstants.GET_DIRECT_DEBITS_PAYMENT_SUCCESS,
            data: data,

        }
    });
    let clearFromAccount = (data) => ({
        action: {
            actionType: PaymentsConstants.CLEAR_FROM_SELECTED,
            data: data,

        }
    });
    let toSavingTotalClick = (data) => ({
        action: {
            actionType: PaymentsConstants.SAVING_TO_TOT_CLICK,
            data: data,

        }
    });
    let setLeftMarginArchivedOverlay = (data) => ({
        action: {
            actionType: PaymentsConstants.SET_ARCHIVED_LEFT_MARGIN,
            data: data,

        }
    });


    describe('Payments List Test cases', () => {
        it('calls for the getSOPaymentById function', () => {
            PaymentsStore.getSOPaymentById();
            expect(PaymentsStore.getSOPaymentById).toBeDefined();
        });
        it('calls for the getSOPaymentById function else part', () => {
            PaymentsStore.getStandingOrderList();
            PaymentsStore.getSOPaymentById();
            expect(PaymentsStore.getSOPaymentById).toBeDefined();
        });
        xit('calls for the getSelectedPayeeStyle', () => {
            // PaymentsStore.getStandingOrderList();
            PaymentsStore.getSelectedPayeeStyle();
            expect(PaymentsStore.getSelectedPayeeStyle).toBeDefined();
        });

        xit('calls for the updatePayeeList function', () => {
            let payeeDetails = {
                type: 'credit_card',
                account: {
                    id: '20037855-f07c-4298-80c6-9f5a9a5e966a',
                    sort_code: '111111',
                    account_number: '852963',
                }
            };
            // PaymentsStore.getStandingOrderList();
            PaymentsStore.getAllPayees();
            PaymentsStore.updatePayeeList(payeeDetails);
            expect(PaymentsStore.updatePayeeList).toBeDefined();
        });
        xit('calls for the getAccIDByAccNumber function', () => {
            let payeeDetails = {
                "accounts": [
                    {
                        "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
                        "type": "current",
                        "product": {
                            "code": "901",
                            "name": "B Current Account",
                            "description": "Current Account"
                        },
                        "actions_available": {
                            "/account/pots": false,
                            "/account/alerts": true,
                            "/account/projections": true,
                            "/account/sweeps": true,
                            "/account/sweeps/transfer/out": false,
                            "/account/transactions/read": true,
                            "/account/payments/transfer/in": true,
                            "/account/payments/transfer/out": true,
                            "/account/payments/uk/default/out": true,
                            "/account/mandates/so/read": true,
                            "/account/mandates/dd/read": true,
                            "/account/mandates/so/write": true,
                            "/account/mandates/dd/write": true
                        },
                        "bank_id": "CB",
                        "sort_code": "654321",
                        "number": "12345678",
                        "metadata": {
                            "display_name": "B Current"
                        }
                    }],
            };
            // PaymentsStore.getStandingOrderList();
            PaymentsStore.getAll();
            PaymentsStore.getAccIDByAccNumber('12345678');
            expect(PaymentsStore.getAccIDByAccNumber).toBeDefined();
        });

        it('calls for the getAll function ', () => {
            // PaymentsStore.getStandingOrderList();
            PaymentsStore.getAll();
            expect(PaymentsStore.getAll).toBeDefined();
        });
        xit('calls for the getPaymentDetails function ', () => {
            // PaymentsStore.getStandingOrderList();
            PaymentsStore.getPaymentDetails();
            expect(PaymentsStore.getPaymentDetails).toBeDefined();
        });
        it('calls for the IsPayeeSame function if path', () => {
            let data = {
                data: {
                    "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                    "name": "John 'Bulldog' Bloggs",
                    "reference": "ATM",
                }
            };
            callback(putSelectedPayee(data, PaymentsConstants.SELECT_PAYEE));
            PaymentsStore.IsPayeeSame();
            expect(PaymentsStore.IsPayeeSame).toBeDefined();
        });
        it('calls for the IsPayeeSame function else path', () => {
            PaymentsStore.emptyPayeeList();
            //callback(putSelectedPayee(data, PaymentsConstants.SELECT_PAYEE));
            PaymentsStore.IsPayeeSame();
            expect(PaymentsStore.IsPayeeSame).toBeDefined();
        });

        it('calls for the getCreditPopUp function else condition ', () => {
            let data = {
                type: 'credit_card',
                schedule: {
                    recurrence: {
                        amount: {
                            value: '200000',
                        }
                    }
                }
            };

            callback(putSelectedAccount(data, PaymentsConstants.PUT_SELECTED_ACCOUNT));
            PaymentsStore.getCreditPopUp();
            expect(PaymentsStore.getCreditPopUp).toBeDefined();
        });
        it('calls for the getCreditPopUp function else condition ', () => {
            let data = {
                type: '',
                schedule: {
                    recurrence: {
                        amount: {
                            value: '200000',
                        }
                    }
                }
            };

            callback(putSelectedAccount(data, PaymentsConstants.PUT_SELECTED_ACCOUNT));
            PaymentsStore.getCreditPopUp();
            expect(PaymentsStore.getCreditPopUp).toBeDefined();
        });

        it('calls for the repeatPaymentShow function if condition ', () => {

            let data = {
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
                type: 'payments',
                "actions_available":
                {
                    "/account/mandates/so/write": true,
                }
            };

            callback(putSelectedAccount(data, PaymentsConstants.PUT_SELECTED_ACCOUNT));
            PaymentsStore.repeatPaymentShow();
            expect(PaymentsStore.repeatPaymentShow).toBeDefined();
        });
        it('calls for the repeatPaymentShow function else condition ', () => {

            let data = {
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
                type: 'payments',
                "actions_available":
                {
                    "/account/mandates/so/write": false,
                }
            };

            callback(putSelectedAccount(data, PaymentsConstants.PUT_SELECTED_ACCOUNT));
            PaymentsStore.repeatPaymentShow();
            expect(PaymentsStore.repeatPaymentShow).toBeDefined();
        });

        xit('calls for the getToAccounts function if condition ', () => {
            let accounts = {
                "accounts": undefined
            };
            callback(handleAccountsListSuccess(accounts, PaymentsConstants.GET_FROM_ACCOUNTS_SUCCESS));
            callback(setPaymentType(false, PaymentsConstants.SELECT_PAYMENT_TYPE));
            PaymentsStore.getToAccounts();
            expect(PaymentsStore.getToAccounts).toBeDefined();
        });
        it('calls for the getToAccounts function _isTransfer false', () => {
            let accounts = {
                "accounts": [{
                    "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                    "name": "John 'Bulldog' Bloggs",
                    "type": "loan,",

                }]
            };
            callback(handleAccountsListSuccess(accounts, PaymentsConstants.GET_FROM_ACCOUNTS_SUCCESS));
            callback(setPaymentType(false, PaymentsConstants.SELECT_PAYMENT_TYPE));
            PaymentsStore.getToAccounts();
            expect(PaymentsStore.getToAccounts).toBeDefined();
        });
        it('calls for the getToAccounts function _isTransfer true', () => {
            let accounts = {
                "accounts": [{
                    "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                    "name": "John 'Bulldog' Bloggs",
                    "type": "loan,",
                    "actions_available":
                    {
                        "/account/payments/transfer/in": true,
                    }
                }]
            };
            callback(handleAccountsListSuccess(accounts, PaymentsConstants.GET_FROM_ACCOUNTS_SUCCESS));
            callback(setPaymentType(true, PaymentsConstants.SELECT_PAYMENT_TYPE));
            PaymentsStore.getToAccounts();
            expect(PaymentsStore.getToAccounts).toBeDefined();
        });
        it('calls for the getToAccounts function _isTransfer true', () => {
            let accounts = {
                "accounts": [{
                    "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                    "name": "John 'Bulldog' Bloggs",
                    "type": "loan,",
                    "actions_available":
                    {
                        "/account/payments/transfer/in": false,
                    }
                }]
            };
            callback(handleAccountsListSuccess(accounts, PaymentsConstants.GET_FROM_ACCOUNTS_SUCCESS));
            callback(setPaymentType(true, PaymentsConstants.SELECT_PAYMENT_TYPE));
            PaymentsStore.getToAccounts();
            expect(PaymentsStore.getToAccounts).toBeDefined();
        });


        xit('calls for the getFromAccounts function if condition ', () => {
            let accounts = {
                "accounts": undefined
            };
            callback(handleAccountsListSuccess(accounts, PaymentsConstants.GET_FROM_ACCOUNTS_SUCCESS));
            PaymentsStore.getFromAccounts();
            expect(PaymentsStore.getFromAccounts).toBeDefined();
        });

        it('calls for the getFromAccounts function ', () => {
            let accounts = {
                "accounts": [{
                    "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                    "name": "John 'Bulldog' Bloggs",
                    "type": "loan,",
                    "actions_available":
                    {
                        "/account/payments/uk/default/out": true,
                    }
                }]
            };
            callback(setPaymentType(false, PaymentsConstants.SELECT_PAYMENT_TYPE));
            callback(handleAccountsListSuccess(accounts, PaymentsConstants.GET_FROM_ACCOUNTS_SUCCESS));
            PaymentsStore.getFromAccounts();
            expect(PaymentsStore.getFromAccounts).toBeDefined();
        });
        it('calls for the getFromAccounts function actions_available false', () => {
            let accounts = {
                "accounts": [{
                    "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                    "name": "John 'Bulldog' Bloggs",
                    "type": "loan,",
                    "actions_available":
                    {
                        "/account/payments/uk/default/out": false,
                    }
                }]
            };
            callback(setPaymentType(false, PaymentsConstants.SELECT_PAYMENT_TYPE));
            callback(handleAccountsListSuccess(accounts, PaymentsConstants.GET_FROM_ACCOUNTS_SUCCESS));
            PaymentsStore.getFromAccounts();
            expect(PaymentsStore.getFromAccounts).toBeDefined();
        });
        it('calls for the getFromAccounts function _isTransfer true and actions_available true', () => {
            let accounts = {
                "accounts": [{
                    "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                    "name": "John 'Bulldog' Bloggs",
                    "type": "loan,",
                    "actions_available":
                    {
                        "/account/payments/transfer/out": true,
                    }
                }]
            };
            callback(setPaymentType(true, PaymentsConstants.SELECT_PAYMENT_TYPE));
            callback(handleAccountsListSuccess(accounts, PaymentsConstants.GET_FROM_ACCOUNTS_SUCCESS));
            PaymentsStore.getFromAccounts();
            expect(PaymentsStore.getFromAccounts).toBeDefined();
        });
        it('calls for the getFromAccounts function _isTransfer true and actions_available true', () => {
            let accounts = {
                "accounts": [{
                    "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                    "name": "John 'Bulldog' Bloggs",
                    "type": "loan,",
                    "actions_available":
                    {
                        "/account/payments/transfer/out": false,
                    }
                }]
            };
            callback(setPaymentType(true, PaymentsConstants.SELECT_PAYMENT_TYPE));
            callback(handleAccountsListSuccess(accounts, PaymentsConstants.GET_FROM_ACCOUNTS_SUCCESS));
            PaymentsStore.getFromAccounts();
            expect(PaymentsStore.getFromAccounts).toBeDefined();
        });
        it('calls for the getReadMandateAccount function if path true', () => {
            let accounts = {
                "accounts": [{
                    "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                    "name": "John 'Bulldog' Bloggs",
                    "type": "loan,",
                    "actions_available":
                    {
                        "/account/mandates/so/read": true,
                    }
                }]
            };
            callback(handleAccountsListSuccess(accounts, PaymentsConstants.GET_FROM_ACCOUNTS_SUCCESS));
            PaymentsStore.getReadMandateAccount();
            expect(PaymentsStore.getReadMandateAccount).toBeDefined();
        });
        it('calls for the getReadMandateAccount function if path false', () => {
            let accounts = {
                "accounts": [{
                    "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                    "name": "John 'Bulldog' Bloggs",
                    "type": "loan,",
                    "actions_available":
                    {
                        "/account/mandates/so/read": false,
                    }
                }]
            };
            callback(handleAccountsListSuccess(accounts, PaymentsConstants.GET_FROM_ACCOUNTS_SUCCESS));
            PaymentsStore.getReadMandateAccount();
            expect(PaymentsStore.getReadMandateAccount).toBeDefined();
        });

        xit('calls for the getReadMandateAccount function ', () => {
            let accounts = {
                "accounts": undefined,
            };
            callback(handleAccountsListSuccess(accounts));
            PaymentsStore.getReadMandateAccount();
            expect(PaymentsStore.getReadMandateAccount).toBeDefined();
        });


        it('calls for the setPotVisbility function if undefined', () => {
            let toPot = {
                pots: {
                    "pots": [
                    ],
                }
            };
            let savingId = "5a131a32-2483-45f2-91c1-074878410lmn";
            let fromPot = toPot;
            let pot = {

                pots: {
                    "pots": [

                    ],
                }
            };
            callback(handlePotsDetailsSuccess(pot, PaymentsConstants.REQUEST_POT_DETAIL_SUCCESS));
            //callback(putToSelectedAccount(toPot, PaymentsConstants.PUT_TO_SELECTED_ACCOUNT));
            callback(putSelectedAccount(fromPot, PaymentsConstants.PUT_SELECTED_ACCOUNT));
            PaymentsStore.setPotVisbility("4a131a32-2483-45f2-91c1-074878410dcf");
            PaymentsStore.isOneOffPayment();
            expect(PaymentsStore.setPotVisbility).toBeDefined();
        });

        it('calls for the setPotVisbility function', () => {
            let toPot = {
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                pots: {
                    "pots": [
                        {
                            "id": "3ebbc744-9a3b-414e-b5b7-49e4afd365be",
                            "name": "Garden Landscaping",
                            "reference": "1",
                            "balance": {
                                "value": 600.0,
                                "currency": "GBP"
                            },
                        }
                    ],
                    "unallocated_amount": {
                        "value": -116.87,
                        "currency": "GBP"
                    }
                }
            };
            let savingId = "5a131a32-2483-45f2-91c1-074878410lmn";
            let fromPot = toPot;
            let pot = {
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                pots: {
                    "pots": [
                        {
                            "id": "3ebbc744-9a3b-414e-b5b7-49e4afd365be",
                            "name": "Garden Landscaping",
                            "reference": "1",
                            "balance": {
                                "value": 600.0,
                                "currency": "GBP"
                            },
                        }
                    ],
                    "unallocated_amount": {
                        "value": -116.87,
                        "currency": "GBP"
                    }
                }
            };
            callback(handlePotsDetailsSuccess(pot, PaymentsConstants.REQUEST_POT_DETAIL_SUCCESS));
            callback(putToSelectedAccount(toPot, PaymentsConstants.PUT_TO_SELECTED_ACCOUNT));
            callback(putSelectedAccount(fromPot, PaymentsConstants.PUT_SELECTED_ACCOUNT));
            PaymentsStore.setPotVisbility("4a131a32-2483-45f2-91c1-074878410dcf");

            expect(PaymentsStore.setPotVisbility).toBeDefined();
        });

        it('calls for the checkPotEmpty function ', () => {
            let pot = {
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                pots: {
                    "pots": [
                        {
                            "id": "3ebbc744-9a3b-414e-b5b7-49e4afd365be",
                            "name": "Garden Landscaping",
                            "reference": "1",
                            "balance": {
                                "value": 600.0,
                                "currency": "GBP"
                            },
                        }
                    ],
                    "unallocated_amount": {
                        "value": -116.87,
                        "currency": "GBP"
                    }
                }
            };
            callback(handlePotsDetailsSuccess(pot, PaymentsConstants.REQUEST_POT_DETAIL_SUCCESS));
            PaymentsStore.checkPotEmpty("20037855-f07c-4298-80c6-9f5a9a5e966a");
            expect(PaymentsStore.setMakePaymentResponse).toBeDefined();
        });
        it('calls for the checkPotEmpty function with empty pots', () => {
            let pot = {
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                pots: {
                    "pots": [
                    ],
                    "unallocated_amount": {
                        "value": -116.87,
                        "currency": "GBP"
                    }
                }
            };
            callback(handlePotsDetailsSuccess(pot, PaymentsConstants.REQUEST_POT_DETAIL_SUCCESS));
            PaymentsStore.checkPotEmpty("20037855-f07c-4298-80c6-9f5a9a5e966a");
            expect(PaymentsStore.setMakePaymentResponse).toBeDefined();
        });

        it('calls for the checkSavingUnallocatedAmount function', () => {
            let pot = {
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                pots: {
                    "pots": [
                        {
                            "id": "3ebbc744-9a3b-414e-b5b7-49e4afd365be",
                            "name": "Garden Landscaping",
                            "reference": "1",
                            "balance": {
                                "value": 600.0,
                                "currency": "GBP"
                            },
                        }],
                    "unallocated_amount": {
                        "value": -116.87,
                        "currency": "GBP"
                    }
                }
            };
            callback(handlePotsDetailsSuccess(pot, PaymentsConstants.REQUEST_POT_DETAIL_SUCCESS));
            PaymentsStore.checkSavingUnallocatedAmount("20037855-f07c-4298-80c6-9f5a9a5e966a");
            expect(PaymentsStore.setMakePaymentResponse).toBeDefined();
        });
        it('calls for the checkSavingUnallocatedAmount function with value greater then 0', () => {
            let pot = {
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                pots: {
                    "pots": [
                        {
                            "id": "3ebbc744-9a3b-414e-b5b7-49e4afd365be",
                            "name": "Garden Landscaping",
                            "reference": "1",
                            "balance": {
                                "value": 600.0,
                                "currency": "GBP"
                            },
                        }],
                    "unallocated_amount": {
                        "value": 116.87,
                        "currency": "GBP"
                    }
                }
            };
            callback(handlePotsDetailsSuccess(pot, PaymentsConstants.REQUEST_POT_DETAIL_SUCCESS));
            PaymentsStore.checkSavingUnallocatedAmount("20037855-f07c-4298-80c6-9f5a9a5e966a");
            expect(PaymentsStore.setMakePaymentResponse).toBeDefined();
        });

        it('calls for the setMakePaymentResponse function', () => {
            PaymentsStore.setMakePaymentResponse();
            expect(PaymentsStore.setMakePaymentResponse).toBeDefined();
        });
        it('calls for the setMakePaymentResponse function', () => {
            PaymentsStore.getAddPayeeResponse();
            expect(PaymentsStore.getAddPayeeResponse).toBeDefined();
        });
        it('calls for the getSelectedAccount function', () => {
            PaymentsStore.getSelectedAccount();
            expect(PaymentsStore.getSelectedAccount).toBeDefined();
        });
        it('calls for the showRepeatPaymentData function', () => {
            PaymentsStore.showRepeatPaymentData();
            expect(PaymentsStore.showRepeatPaymentData).toBeDefined();
        });
        it('calls for the showRepeatPaymentData function', () => {
            PaymentsStore.showRepeatPaymentData();
            expect(PaymentsStore.showRepeatPaymentData).toBeDefined();
        });
        it('calls for the getSelectedToAccount function', () => {
            PaymentsStore.getSelectedToAccount();
            expect(PaymentsStore.getSelectedToAccount).toBeDefined();
        });
        it('calls for the IsAccountSame function', () => {
            PaymentsStore.IsAccountSame();
            expect(PaymentsStore.IsAccountSame).toBeDefined();
        });
        it('calls for the IsToAccountSame function', () => {
            PaymentsStore.IsToAccountSame();
            expect(PaymentsStore.IsToAccountSame).toBeDefined();
        });
        it('calls for the IsToAccountSame function else part', () => {
            PaymentsStore.emptyToList();
            PaymentsStore.IsToAccountSame();
            expect(PaymentsStore.IsToAccountSame).toBeDefined();
        });
        it('calls for the isToSavingTotClicked function', () => {
            PaymentsStore.isToSavingTotClicked();
            expect(PaymentsStore.isToSavingTotClicked).toBeDefined();
        });
        it('calls for the getResetOneOff function', () => {
            // PaymentsStore.getResetOneOff();
            // expect(PaymentsStore.getResetOneOff).toBeDefined();
        });
        it('calls for the getFilteredArchivedData function', () => {
            PaymentsStore.getFilteredArchivedData();
            expect(PaymentsStore.getFilteredArchivedData).toBeDefined();
        });

        it('calls for the getEditedData function', () => {
            PaymentsStore.getEditedData();
            expect(PaymentsStore.getEditedData).toBeDefined();
        });
        it('calls for the getUpdatedPaymentList function', () => {
            PaymentsStore.getUpdatedPaymentList();
            expect(PaymentsStore.getUpdatedPaymentList).toBeDefined();
        });
        it('calls for the getSelectedPot function', () => {
            PaymentsStore.getSelectedPot();
            expect(PaymentsStore.getSelectedPot).toBeDefined();
        });
        it('calls for the getSelectedToPotData function', () => {
            PaymentsStore.getSelectedToPotData();
            expect(PaymentsStore.getSelectedToPotData).toBeDefined();
        });
        it('calls for the IsPotSame function', () => {
            PaymentsStore.IsPotSame();
            expect(PaymentsStore.IsPotSame).toBeDefined();
        });
        it('calls for the isToPotSame function', () => {
            PaymentsStore.isToPotSame();
            expect(PaymentsStore.isToPotSame).toBeDefined();
        });
        it('calls for the getSelectedSavingAccountId function', () => {
            PaymentsStore.getSelectedSavingAccountId();
            expect(PaymentsStore.getSelectedSavingAccountId).toBeDefined();
        });
        it('calls for the getSelectedToSavingAccountId function', () => {
            PaymentsStore.getSelectedToSavingAccountId();
            expect(PaymentsStore.getSelectedToSavingAccountId).toBeDefined();
        });
        it('calls for the isRepeatOn function', () => {
            PaymentsStore.isRepeatOn();
            expect(PaymentsStore.isRepeatOn).toBeDefined();
        });
        it('calls for the getRepeatAmount function', () => {
            PaymentsStore.getRepeatAmount();
            expect(PaymentsStore.getRepeatAmount).toBeDefined();
        });
        it('calls for the getColorFromAccount function', () => {
            PaymentsStore.getColorFromAccount();
            expect(PaymentsStore.getColorFromAccount).toBeDefined();
        });
        it('calls for the checkToTransfer function', () => {
            PaymentsStore.checkToTransfer();
            expect(PaymentsStore.checkToTransfer).toBeDefined();
        });
        it('calls for the emptyPayeeList function', () => {
            PaymentsStore.emptyPayeeList();
            expect(PaymentsStore.emptyPayeeList).toBeDefined();
        });
        it('calls for the emptyToList function', () => {
            PaymentsStore.emptyToList();
            expect(PaymentsStore.emptyToList).toBeDefined();
        });
        it('calls for the emptyToPotList function', () => {
            PaymentsStore.emptyToPotList();
            expect(PaymentsStore.emptyToPotList).toBeDefined();
        });
        it('calls for the checkIfBothPotSelected function', () => {
            let data = {
                type: 'amountChanged',
                schedule: {
                    recurrence: {
                        amount: {
                            value: '200000',
                        }
                    }
                }
            };

            callback(selectedPot(data, PaymentsConstants.SELECTED_POT));
            callback(selectedToPot(data, PaymentsConstants.SELECTED_TO_POT));
            PaymentsStore.checkIfBothPotSelected();

            expect(PaymentsStore.checkIfBothPotSelected).toBeDefined();
        });
        it('calls for the isMakePayment function', () => {
            PaymentsStore.resetPaymentData();
            PaymentsStore.isMakePayment();
            expect(PaymentsStore.isMakePayment).toBeDefined();
        });
        xit('calls for the isMakePayment function for else condition', () => {
            PaymentsStore.resetPaymentData();
            PaymentsStore.isMakePayment();
            expect(PaymentsStore.isMakePayment).toBeDefined();
        });
        xit('calls for the getRepeatAmount function for else condition', () => {
            PaymentsStore.resetPaymentData();
            PaymentsStore.getDefaultAmt();
            PaymentsStore.getRepeatAmount();
            expect(PaymentsStore.getRepeatAmount).toBeDefined();
        });

        it('calls for the checkPotEmpty function', () => {
            PaymentsStore.checkPotEmpty();
            expect(PaymentsStore.checkPotEmpty).toBeDefined();
        });
        it('calls for the getTabChanged function', () => {
            PaymentsStore.getTabChanged();
            expect(PaymentsStore.getTabChanged).toBeDefined();
        });
        it('calls for the getWhenEnable function', () => {
            PaymentsStore.getWhenEnable();
            expect(PaymentsStore.getWhenEnable).toBeDefined();
        });
        it('calls for the getReferenceFlag function', () => {
            PaymentsStore.getReferenceFlag();
            expect(PaymentsStore.getReferenceFlag).toBeDefined();
        });
        it('calls for the isSameSavingSelectedPots function', () => {
            PaymentsStore.isSameSavingSelectedPots();
            expect(PaymentsStore.isSameSavingSelectedPots).toBeDefined();
        });


        describe('getResetOneOff', () => {


            PaymentsStore.getResetOneOff();
            it('should call getResetOneOff', () => {
                expect(PaymentsStore.getResetOneOff).toBeDefined();
            });
        });

        describe('GET_DIRECT_DEBITS_PAYMENT_SUCCESS', () => {

            let data = {

            };
            callback(getdebitpaymentsuccess(data, PaymentsConstants.GET_DIRECT_DEBITS_PAYMENT_SUCCESS));
            //let result = PaymentsStore.getMergeData();
            it('should be equal to data', () => {
                //expect(result).toEqual(data);
            });
        });

        describe('GET_STANDING_ORDER_LIST_SUCCESS', () => {
            let mandates = {

                "mandates": [{
                    "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                    "accountName": "John 'Bulldog' Bloggs",
                    "accountId": "22121221",
                    "display_name": "abcdd",
                    "is_active": true,
                    "reference": "ATM",
                    "schedule": {
                        next_payment: {
                            "when": "Today",
                            amount: {
                                value: 100
                            }
                        }
                    },
                    previous_payment: {
                        when: "weekly",
                        amount: {
                            value: 100
                        }
                    },

                }]

            };
            callback(getPaymentSuccess(mandates));
            let result = PaymentsStore.getStandingOrderList();
            it('should be equal to data', () => {
                //expect(result).toEqual(data);
            });
        });


        describe('GET_STANDING_ORDER_LIST_SUCCESS isactive false', () => {
            let mandates = {

                "mandates": [{
                    "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                    "accountName": "John 'Bulldog' Bloggs",
                    "accountId": "22121221",
                    "display_name": "abcdd",
                    "is_active": false,
                    "reference": "ATM",
                    "schedule": {
                        next_payment: {
                            "when": "Today",
                            amount: {
                                value: 100
                            }
                        }
                    },
                    previous_payment: {
                        when: "weekly",
                        amount: {
                            value: 100
                        }
                    },

                }]

            };
            callback(getPaymentSuccess(mandates));
            let result = PaymentsStore.getStandingOrderList();
            it('should be equal to data', () => {
                //expect(result).toEqual(data);
            });
        });

        describe('GET_STANDING_ORDER_LIST_SUCCESS without schedule', () => {
            let mandates = {

                "mandates": [{
                    "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                    "accountName": "John 'Bulldog' Bloggs",
                    "accountId": "22121221",
                    "display_name": "abcdd",
                    "is_active": true,
                    "type": 'Single payment',
                    "reference": "ATM",
                    single: {
                        when: "weekly",
                        amount: {
                            value: 100
                        }
                    },

                }]

            };
            callback(getPaymentSuccess(mandates));
            let result = PaymentsStore.getStandingOrderList();
            it('should be equal to data', () => {
                //expect(result).toEqual(data);
            });
        });

        describe('GET_PAYMENT_FILTER for payment', () => {

            let data = 'dd';
            callback(getPaymentFilterData(data, PaymentsConstants.GET_PAYMENT_FILTER));
            let result = PaymentsStore.getMergeData();
            it('should be equal to data', () => {
                //expect(result).toEqual(data);
            });
        });
        describe('GET_PAYMENT_FILTER for payment', () => {

            let data = 'transfer';
            callback(getPaymentFilterData(data, PaymentsConstants.GET_PAYMENT_FILTER));
            let result = PaymentsStore.getMergeData();
            it('should be equal to data', () => {
                //expect(result).toEqual(data);
            });
        });

        describe('GET_ARCHIVED_FILTER for dd ', () => {

            let data = 'dd';
            callback(getArchivedFilterData(data, PaymentsConstants.GET_ARCHIVED_FILTER));
            let result = PaymentsStore.getArchivedData();
            it('should be equal to data', () => {
                //expect(result).toEqual(data);
            });
        });

        describe('GET_ARCHIVED_FILTER for transfer ', () => {

            let data = 'transfer';
            callback(getArchivedFilterData(data, PaymentsConstants.GET_ARCHIVED_FILTER));
            let result = PaymentsStore.getArchivedData();
            it('should be equal to data', () => {
                //expect(result).toEqual(data);
            });
        });

        describe('GET_ARCHIVED_FILTER for payment ', () => {

            let data = 'payment';
            callback(getArchivedFilterData(data, PaymentsConstants.GET_ARCHIVED_FILTER));
            let result = PaymentsStore.getArchivedData();
            it('should be equal to data', () => {
                //expect(result).toEqual(data);
            });
        });

        describe('GET_ARCHIVED_FILTER for all ', () => {

            let data = 'all';
            callback(getArchivedFilterData(data, PaymentsConstants.GET_ARCHIVED_FILTER));
            let result = PaymentsStore.getArchivedData();
            it('should be equal to data', () => {
                //expect(result).toEqual(data);
            });
        });


        describe('GET_ARCHIVED_FILTER for transfer paytype', () => {

            let data = 'transfer';
            let mandates = {

                "mandates": [{
                    "id": "05985dae-d2de-4ebc-ab0a-79093081bde5",
                    "accountName": "John 'Bulldog' Bloggs",
                    "accountId": "22121221",
                    "display_name": "abcdd",
                    "is_active": false,
                    "sort_code": '111111',
                    "account_number": "852963",
                    "reference": "ATM",
                    previous_payment: {
                        when: "weekly",
                        amount: {
                            value: 100
                        }
                    },

                }]

            };
            let accountList = {
                accounts: [
                    {
                        "id": "05985dae-d2de-4ebc-ab0a-79093081bde5",
                        "number": '111111-852963',
                        "product": {
                            "code": "901",
                            "name": "Personal Loan",
                            "description": "Personal Loan"
                        }
                    }]
            };
            callback(handleAccountsListSuccess(accountList));

            callback(getPaymentSuccess(mandates));
            callback(getArchivedFilterData(data, PaymentsConstants.GET_ARCHIVED_FILTER));
            let result = PaymentsStore.getMergeData();
            it('should be equal to data', () => {
                //expect(result).toEqual(data);
            });
        });
        describe('GET_ARCHIVED_FILTER for transfer category', () => {

            let data = 'dd';
            /* let mandates = {
     
                 "mandates": [{
                     "id": "15985dae-d2de-4ebc-ab0a-79093081bde5",
                     "accountName": "John 'Bulldog' Bloggs",
                     "accountId": "22121221",
                     "display_name": "abcdd",
                     "is_active": false,
                     "sort_code": '111111',
                     "account_number": "852963",
                     "reference": "ATM",
                     "category": 'DD',
                     previous_payment: {
                         when: "weekly",
                         amount: {
                             value: 100
                         }
                     },
     
                 }]
     
             };
             let accountList = {
                 accounts: [
                     {
                         "id": "05985dae-d2de-4ebc-ab0a-79093081bde5",
                         "number": '111111-852963',
                         "product": {
                             "code": "901",
                             "name": "Personal Loan",
                             "description": "Personal Loan"
                         }
                     }]
             };*/
            // callback(handleAccountsListSuccess(accountList));

            // callback(getPaymentSuccess(mandates));
            let mandates = {

                "mandates": [{
                    "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                    "accountName": "John 'Bulldog' Bloggs",
                    "accountId": "22121221",
                    "display_name": "abcdd",
                    "is_active": true,
                    "reference": "ATM",
                    "when": "weekly",
                    previous_payment: {
                        amount: {
                            value: 100
                        }
                    },

                }]

            };
            callback(getDDPaymentSuccess(mandates, PaymentsConstants.GET_DIRECT_DEBIT_LIST_SUCCESS));
            callback(getArchivedFilterData(data, PaymentsConstants.GET_ARCHIVED_FILTER));
            let result = PaymentsStore.getMergeData();
            it('should be equal to data', () => {
                //expect(result).toEqual(data);
            });
        });

        // describe('GET_PAYMENT_FILTER for payment', () => {
        //     let data = 'payment';
        //     callback(getPaymentFilterData(data, PaymentsConstants.GET_PAYMENT_FILTER));
        //     let result = PaymentsStore.getMergeData();
        //     it('should be equal to data', () => {
        //         //expect(result).toEqual(data);
        //     });
        // });
        // describe('GET_PAYMENT_FILTER', () => {
        //     let data = 'all';
        //     callback(getPaymentFilterData(data, PaymentsConstants.GET_PAYMENT_FILTER));
        //     let result = PaymentsStore.getMergeData();
        //     it('should be equal to data', () => {
        //         //expect(result).toEqual(data);
        //     });
        // });


        describe('SET_REPEAT_DATA', () => {
            let data = {
                type: 'stop',
            };
            callback(assignRepeatData(data, PaymentsConstants.SET_REPEAT_DATA));
            let result = PaymentsStore.getEndingDetails();
            it('should be equal to data', () => {
                //expect(result).toEqual(data);
            });
        });
        describe('SET_REPEAT_DATA', () => {
            let data = {
                type: 'stopValue',
            };
            callback(assignRepeatData(data, PaymentsConstants.SET_REPEAT_DATA));
            let result = PaymentsStore.getEndingDetails();
            it('should be equal to data', () => {
                //expect(result).toEqual(data);
            });
        });
        describe('SET_REPEAT_DATA', () => {
            let data = {
                type: 'often',
            };
            callback(assignRepeatData(data, PaymentsConstants.SET_REPEAT_DATA));
            let result = PaymentsStore.getEndingDetails();
            it('should be equal to data', () => {
                //expect(result).toEqual(data);
            });
        });
        describe('SET_REPEAT_DATA', () => {
            let data = {
                type: 'dueDate',
            };
            callback(assignRepeatData(data, PaymentsConstants.SET_REPEAT_DATA));
            let result = PaymentsStore.getEndingDetails();
            it('should be equal to data', () => {
                //expect(result).toEqual(data);
            });
        });
        describe('SET_REPEAT_DATA', () => {
            let data = {
                type: 'amountChanged',
                schedule: {
                    recurrence: {
                        amount: {
                            value: '200000',
                        }
                    }
                }
            };
            callback(postEditeDataToPaymentStore(data, PaymentsConstants.SET_EDIT_PAYMENT_DATA_FROM_EDITSTORE));
            callback(assignRepeatData(data, PaymentsConstants.SET_REPEAT_DATA));
            let result = PaymentsStore.getEndingDetails();
            it('should be equal to data', () => {
                //expect(result).toEqual(data);
            });
        });
        describe('SET_ENDING_DETAILS', () => {
            let data = {
                type: 'stop',
                value: 'Nooftimes',
            };
            callback(checkEndData(data, PaymentsConstants.SET_ENDING_DETAILS));
            let result = PaymentsStore.getEndingDetails();
            it('should be equal to data', () => {
                //expect(result).toEqual(data);
            });
        });
        describe('SET_ENDING_DETAILS', () => {
            let data = {
                type: 'stop',
                value: 'Pickadate',
            };
            callback(checkEndData(data, PaymentsConstants.SET_ENDING_DETAILS));
            let result = PaymentsStore.getEndingDetails();
            it('should be equal to data', () => {
                //expect(result).toEqual(data);
            });
        });
        describe('SET_ENDING_DETAILS', () => {
            let data = {
                type: 'stop',
                value: 'whenicancel',
            };
            callback(checkEndData(data, PaymentsConstants.SET_ENDING_DETAILS));
            let result = PaymentsStore.getEndingDetails();
            it('should be equal to data', () => {
                //expect(result).toEqual(data);
            });
        });
        describe('SET_ENDING_DETAILS case setSelOften', () => {
            let data = {
                type: 'setSelOften',
            };
            callback(checkEndData(data, PaymentsConstants.SET_ENDING_DETAILS));
            let result = PaymentsStore.getEndingDetails();
            it('should be equal to data', () => {
                //expect(result).toEqual(data);
            });
        });
        describe('SET_ENDING_DETAILS case end', () => {
            let data = {
                type: 'end',
            };
            callback(checkEndData(data, PaymentsConstants.SET_ENDING_DETAILS));
            let result = PaymentsStore.getEndingDetails();
            it('should be equal to data', () => {
                //expect(result).toEqual(data);
            });
        });
        describe('SET_ENDING_DETAILS case amt', () => {
            let data = {
                type: 'amt',
            };
            callback(checkEndData(data, PaymentsConstants.SET_ENDING_DETAILS));
            let result = PaymentsStore.getEndingDetails();
            it('should be equal to data', () => {
                //expect(result).toEqual(data);
            });
        });
        describe('SET_ENDING_DETAILS case isRepeat', () => {
            let data = {
                type: 'isRepeat',
            };
            callback(checkEndData(data, PaymentsConstants.SET_ENDING_DETAILS));
            let result = PaymentsStore.getEndingDetails();
            it('should be equal to data', () => {
                //expect(result).toEqual(data);
            });
        });
        describe('SET_ENDING_DETAILS case noOfTimes', () => {
            let data = {
                type: 'noOfTimes',
            };
            callback(checkEndData(data, PaymentsConstants.SET_ENDING_DETAILS));
            let result = PaymentsStore.getEndingDetails();
            it('should be equal to data', () => {
                //expect(result).toEqual(data);
            });
        });
        describe('SET_ENDING_DETAILS case dtWhen', () => {
            let data = {
                type: 'dtWhen',
            };
            callback(checkEndData(data, PaymentsConstants.SET_ENDING_DETAILS));
            let result = PaymentsStore.getEndingDetails();
            it('should be equal to data', () => {
                //expect(result).toEqual(data);
            });
        });
        describe('SET_ENDING_DETAILS case reference', () => {
            let data = {
                type: 'reference',
            };
            callback(checkEndData(data, PaymentsConstants.SET_ENDING_DETAILS));
            let result = PaymentsStore.getEndingDetails();
            it('should be equal to data', () => {
                //expect(result).toEqual(data);
            });
        });
        describe('SET_ENDING_DETAILS case dtStart', () => {
            let data = {
                type: 'dtStart',
                stopitwhenText: ' ',
                oftenText: '',
                dtStart: '',
                dtEndText: '',
                end: '',
                amount: '',
                isRepeat: '',
                when: '',
                reference: '',
                endingText: ''
            };
            callback(checkEndData(data, PaymentsConstants.SET_ENDING_DETAILS));
            let result = PaymentsStore.getEndingDetails();
            it('should be equal to data', () => {
                //expect(result).toEqual(data);
            });
        });

        describe('NAVIGATE_TO_WEB_TASK', () => {
            let data = {
                taskId: 'WEB-PAYMENT-BACK'
            };
            callback(navigateToWebTask(data, PaymentsConstants.NAVIGATE_TO_WEB_TASK));
            let result = PaymentsStore.getSpendingFlag();
            it('should make an API call', () => {
                //expect(result.taskId).toEqual(data.taskId);
            });
        });
        describe('NAVIGATE_TO_WEB_TASK for default', () => {
            let data = {
                taskId: ' '
            };
            callback(navigateToWebTask(data, PaymentsConstants.NAVIGATE_TO_WEB_TASK));
            let result = PaymentsStore.getSpendingFlag();
            it('should make an API call', () => {
                //expect(result.taskId).toEqual(data.taskId);
            });
        });
        describe('REQUEST_ACCOUNT_DETAILS_SUCCESS', () => {
            let data = {
                code: '401',
            };
            callback(handleAccountsDetailsSuccess1(data, PaymentsConstants.REQUEST_ACCOUNT_DETAILS_SUCCESS));
            //let result = action.data.code
            let result = PaymentsStore.getAccountDetail();
            it('should make an API call', () => {
                //expect(result).toEqual(data.code);
            });
        });




        // describe('SET_EDIT_PAYMENT_DATA_FROM_EDITSTORE', () => {
        //     let data = {
        //         data: {
        //             "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
        //             "name": "John 'Bulldog' Bloggs",
        //             "schedule": 'next_payment',
        //         }
        //     };

        //     callback(postEditeDataToPaymentStore(data, PaymentsConstants.SET_EDIT_PAYMENT_DATA_FROM_EDITSTORE));
        //     result = PaymentsStore.getEditRepeatData();

        //     it('should be equal to data', () => {
        //         expect(result.id).toEqual(data.id);
        //     });
        // });
        describe('FROM_SPENDING', () => {
            let data = [{
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            }];
            callback(spendingdata(data, PaymentsConstants.FROM_SPENDING));
            let result = PaymentsStore.getSpendingFlag();
            it('should make an API call', () => {
                //expect(result[0].id).toEqual(data[0].id);
            });
        });
        describe('SPENDING_MOVE_MONEY', () => {
            let data = [{
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            }];
            callback(goToPayments(data, PaymentsConstants.SPENDING_MOVE_MONEY));
            let result = PaymentsStore.getOneOffPayment();
            it('should make an API call', () => {
                //expect(result[0].id).toEqual(data[0].id);
            });
        });
        describe('SELECTED_POT', () => {
            let data = [{
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            }];
            callback(setPaymentType(true, PaymentsConstants.SELECT_PAYMENT_TYPE));
            callback(selectedPot(data, PaymentsConstants.SELECTED_POT));
            let result = PaymentsStore.getSelectedPotData();
            it('should make an API call', () => {
                // expect(result[0].id).toEqual(data[0].id);
            });
        });
        describe('GO_BACK_HIDE_KEYPAD', () => {
            let data = [{
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            }];
            callback(setBackConfirm(data, PaymentsConstants.GO_BACK_HIDE_KEYPAD));
            let result = PaymentsStore.getConfirmBack();
            it('should make an API call', () => {
                //expect(result[0].id).toEqual(isExit[0].id);
            });
        });
        describe('MOBILE_CLEAR_TOLIST', () => {
            let clearlist = [{
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            }];
            callback(setPaymentType(true, PaymentsConstants.SELECT_PAYMENT_TYPE));
            callback(clearToList(clearlist, PaymentsConstants.MOBILE_CLEAR_TOLIST));
            let result = PaymentsStore.getPaymentType();
            it('should make an API call', () => {
                // expect(result[0].id).toEqual(isExit[0].id);
            });
        });
        describe('MOBILE_CLEAR_TOLIST', () => {
            let clearlist = [];
            callback(setPaymentType(false, PaymentsConstants.SELECT_PAYMENT_TYPE));
            callback(clearToList(clearlist, PaymentsConstants.MOBILE_CLEAR_TOLIST));
            let result = PaymentsStore.getPaymentType();
            it('should make an API call', () => {
                // expect(result[0].id).toEqual(isExit[0].id);
            });
        });
        describe('EDIT_PAYMENT_EXIT', () => {
            let isExit = [{
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            }];
            callback(isEditPaymentExit(isExit, PaymentsConstants.EDIT_PAYMENT_EXIT));
            let result = PaymentsStore.isPaymentExit();
            it('should make an API call', () => {
                // expect(result[0].id).toEqual(isExit[0].id);
            });
        });
        describe('EDIT_PAYMENT_EXIT empty', () => {
            let isExit = false;
            callback(isEditPaymentExit(isExit, PaymentsConstants.EDIT_PAYMENT_EXIT));
            let result = PaymentsStore.isPaymentExit();
            PaymentsStore.emitChange();
            it('should make an API call', () => {
                // expect(result[0]).toEqual(isExit[0]);
            });
        });
        describe('SPENDING_TRANSFER_MONEY', () => {
            let spending = {
                data: {
                    "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                    "name": "John 'Bulldog' Bloggs",
                    "potId": "3ebbc744-9a3b-414e-b5b7-49e4afd365be",

                }
            };
            callback(spendingTransferMoney(spending, PaymentsConstants.SPENDING_TRANSFER_MONEY));

            it('should make an API call', () => {
                let result = PaymentsStore.getOneOffPayment();
                //expect(result[0].id).toEqual(spending[0].id);
            });
        });
        describe('SPENDING_TRANSFER_MONEY for pot', () => {
            let spending = {

                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
                "potId": "3ebbc744-9a3b-414e-b5b7-49e4afd365be",
            };
            callback(spendingTransferMoney(spending, PaymentsConstants.SPENDING_TRANSFER_MONEY));
            it('should make an API call', () => {

                let result = PaymentsStore.getOneOffPayment();
                //expect(result[0].id).toEqual(spending[0].id);
            });
        });

        describe('SPENDING_TRANSFER_MONEY for pot 1', () => {
            let spending = {
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
                "potId": "3ebbc744-9a3b-414e-b5b7-49e4afd365be",
            };

            let pot = {
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                pots: {
                    "pots": [
                        {
                            "id": "3ebbc744-9a3b-414e-b5b7-49e4afd365be",
                            "name": "Garden Landscaping",
                            "reference": "1",
                            "balance": {
                                "value": 600.0,
                                "currency": "GBP"
                            },
                        }],
                    "unallocated_amount": {
                        "value": -116.87,
                        "currency": "GBP"
                    }
                }
            };

            callback(handlePotsDetailsSuccess(pot, PaymentsConstants.REQUEST_POT_DETAIL_SUCCESS));
            callback(spendingTransferMoney(spending, PaymentsConstants.SPENDING_TRANSFER_MONEY));

            it('should make an API call', () => {

                let result = PaymentsStore.getOneOffPayment();
                //expect(result[0].id).toEqual(spending[0].id);
            });

        });
        describe('SPENDING_TRANSFER_MONEY for empty pot', () => {
            let spending = {
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
                "potId": "3ebbc744-9a3b-414e-b5b7-49e4afd365be",
            };

            let pot = {
                //"id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                pots: {
                    "pots": [
                    ],
                }
            };
            callback(handlePotsDetailsSuccess(pot, PaymentsConstants.REQUEST_POT_DETAIL_SUCCESS));
            callback(spendingTransferMoney(spending, PaymentsConstants.SPENDING_TRANSFER_MONEY));

            it('should make an API call', () => {

                let result = PaymentsStore.getOneOffPayment();
                //expect(result.id).toEqual(spending.id);
            });

        });
        describe('SPENDING_TRANSFER_MONEY to check amount', () => {
            let spending = {

                "amt": "200000",
                "isMonthly": " ",
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            };
            callback(spendingTransferMoney(spending, PaymentsConstants.SPENDING_TRANSFER_MONEY));

            it('should make an API call', () => {
                let result = PaymentsStore.getOneOffPayment();
                //expect(result[0].id).toEqual(spending[0].id);
            });

        });
        describe('GET_STANDING_ORDERS_PAYMENT_ERROR', () => {
            let account = [{
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            }];
            callback(getAllpaymentList(account, PaymentsConstants.GET_STANDING_ORDERS_PAYMENT_ERROR));
            let result = PaymentsStore.getDirectDebitList();
            it('should make an API call', () => {
                // expect(result[0].id).toEqual(account[0].id);
            });
        });
        describe('GET_DIRECT_DEBIT_LIST_SUCCESS', () => {
            let mandates = {

                "mandates": [{
                    "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                    "accountName": "John 'Bulldog' Bloggs",
                    "accountId": "22121221",
                    "display_name": "abcdd",
                    "is_active": true,
                    "reference": "ATM",
                    "when": "weekly",
                    previous_payment: {
                        amount: {
                            value: 100
                        }
                    },

                }]

            };
            callback(getDDPaymentSuccess(mandates, PaymentsConstants.GET_DIRECT_DEBIT_LIST_SUCCESS));
            let result = PaymentsStore.getDirectDebitList();
            it('should make an API call', () => {
                //expect(result[0].id).toEqual(mandates[0].id);
            });
        });
        describe('GET_STANDING_ORDERS_PAYMENT_LIST', () => {
            let account = [{
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            }];
            callback(getAllpaymentList(account, PaymentsConstants.GET_STANDING_ORDERS_PAYMENT_LIST));
            let result = PaymentsStore.getDirectDebitList();
            it('should make an API call', () => {
                //expect(result[0].id).toEqual(account[0].id);
            });
        });
        describe('GET_DIRECT_DEBITS_PAYMENT_LIST', () => {
            let accounts = {
                "accounts": [{
                    "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                    "name": "John 'Bulldog' Bloggs",
                    "type": "loan,"
                }]
            };
            callback(getAllpaymentList(accounts, PaymentsConstants.GET_DIRECT_DEBITS_PAYMENT_LIST));
            let result = PaymentsStore.getDirectDebitList();
            it('should make an API call', () => {
                //expect(result[0].id).toEqual(accounts[0].id);
            });
        });
        describe('SELECT_PAYEE', () => {
            let data = {
                data: {
                    "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                    "name": "John 'Bulldog' Bloggs",
                    "reference": "ATM",
                }
            };
            callback(postRepeatPaymentData('To', PaymentsConstants.SET_TO_RP));
            callback(putSelectedPayee(data, PaymentsConstants.SELECT_PAYEE));
            let result = PaymentsStore.getSelectedPayee();
            it('should make an API call', () => {
                //expect(result[0].id).toEqual(account[0].id);
            });
        });
        // describe('PUT_TO_SELECTED_ACCOUNT', () => {
        //     let data = {

        //         pots: {
        //             "pots": [
        //                 {
        //                     "id": "3ebbc744-9a3b-414e-b5b7-49e4afd365be",
        //                     "name": "Garden Landscaping",
        //                     "reference": "1",
        //                     "balance": {
        //                         "value": 600.0,
        //                         "currency": "GBP"
        //                     },
        //                 }],
        //             "unallocated_amount": {
        //                 "value": -116.87,
        //                 "currency": "GBP"
        //             }
        //         }


        //     };
        //     callback(putToSelectedAccount(data, PaymentsConstants.PUT_TO_SELECTED_ACCOUNT));
        //     let result = PaymentsStore.getSelectedToAccount();
        //     it('should make an API call', () => {
        //         //expect(result[0].id).toEqual(account[0].id);
        //     });
        // });
        describe('Payments switch cases List API Call', () => {
            let data = [{
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            }];
            callback(getFromAccountList(data, PaymentsConstants.GET_FROM_ACCOUNTS));
            let result = PaymentsStore.getAccountDetail();
            xit('should make an API call', () => {
                expect(result[0].id).toEqual(data[0].id);
            });
        });
        describe('Payments switch cases List API Call', () => {
            let accountList = {
                accounts: [
                    {
                        "id": "05985dae-d2de-4ebc-ab0a-79093081bde5",
                        "product": {
                            "code": "901",
                            "name": "Personal Loan",
                            "description": "Personal Loan"
                        }
                    }]
            };
            let data = {
                "id": "05985dae-d2de-4ebc-ab0a-79093081bde5",
                "product": {
                    "code": "901",
                    "name": "Personal Loan",
                    "description": "Personal Loan"
                }
            };
            callback(handleAccountsListSuccess(accountList));
            PaymentsStore.getAll();
            callback(handleAccountsDetailsSuccess(data))
            let result = PaymentsStore.getAccountDetail(data.id);
            it('should make an API call', () => {
                //expect(result).toEqual(data);
            });
        });
        describe('get list functions test cases', () => {
            let data = {
                accounts: [{ id: 1 }, { id: 2 }]
            };
            let color = {
                accntId: 2,
                accntClass: `account-2`,
            };
            let idList = [1, 2];
            callback(handleAccountsListSuccess1(data));
            result = PaymentsStore.getAll();
            let accType = AccountsStore.getAccountType(data.accounts[1].id);
            let accountIdList = AccountsStore.getAccountIdList();
            xit('should be equal to data', () => {
                expect(result).toEqual(data);
            });
        });

        describe('Payments Account Details API Call', () => {
            let acid = '1'
            callback(getAccountDetails(acid));
            let result = PaymentsStore.getAccountDetail(acid);
            it('should make an API call', () => {
                expect(PaymentApiUtils.getAccountDetails.mock.calls.length).toBe(1);
            });
        });
        describe('Account Details success with same length ', () => {
            let accountList = {
                accounts: [
                    {
                        "id": "05985dae-d2de-4ebc-ab0a-79093081bde5",
                        "product": {
                            "code": "901",
                            "name": "Personal Loan",
                            "description": "Personal Loan"
                        }
                    }]
            };
            let data = {
                "id": "05985dae-d2de-4ebc-ab0a-79093081bde5",
                "product": {
                    "code": "901",
                    "name": "Personal Loan",
                    "description": "Personal Loan"
                }
            };
            callback(handleAccountsListSuccess1(accountList));
            PaymentsStore.getAll();
            callback(handleAccountsDetailsSuccess1(data))
            let result = PaymentsStore.getAccountDetail(data.id)
            PaymentsStore.emitChange();
            xit('should be equal to data', () => {
                expect(result.length).toEqual(data.length);
            });
        });
        describe('confirm payment detalsfunctions test cases success', () => {
            let data = [{
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            }];

            callback(confrimPayment(data, PaymentsConstants.CONFIRM_PAYMENT));
            result = PaymentsStore.resetPaymentData();

            it('should be equal to data', () => {
                //expect(result).toEqual(data);
            });
        });
        describe('Put selected account function', () => {
            let data = [{
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
                type: 'payments',
                //nextStep: 'To'
            }];
            callback(goBackToRepeatPayment('From', PaymentsConstants.GO_BACK_TO_RP));
            callback(putSelectedAccount(data, PaymentsConstants.PUT_SELECTED_ACCOUNT));
            //result = action.data.type;

            it('should be equal to data', () => {
                //expect(result.nextStep).toEqual(data.nextStep);
            });
        });
        // describe('PUT SELECTED ACCOUNT when savings', () => {
        //     let data = [{
        //         "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
        //         "name": "John 'Bulldog' Bloggs",
        //         type: 'savings',
        //     }];

        //     //callback(goBackToRepeatPayment('From', PaymentsConstants.GO_BACK_TO_RP));
        //     //callback(potClicked(true, PaymentsConstants.POT_CLICKED));
        //     callback(updateSOPaymentStatus(data, PaymentsConstants.PUT_SELECTED_ACCOUNT));
        //     //result = PaymentsStore.getStandingOrderList();
        //     it('should be equal to data', () => {
        //         //expect(result.id).toEqual(data.id);
        //     });
        // });
        // describe('PUT SELECTED ACCOUNT when nextstep TO', () => {
        //     let data = [{
        //         "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
        //         "name": "John 'Bulldog' Bloggs",
        //         type: 'savings',
        //     }];

        //     callback(goBackToRepeatPayment('To', PaymentsConstants.GO_BACK_TO_RP));
        //     callback(spendingdata(true, PaymentsConstants.FROM_SPENDING));
        //     callback(updateSOPaymentStatus(data, PaymentsConstants.PUT_SELECTED_ACCOUNT));

        //     //result = PaymentsStore.resetPaymentData();
        //     it('should be equal to data', () => {
        //         //expect(result.id).toEqual(data.id);
        //     });
        // });
        describe('get direct debit list function test cases success', () => {
            let data = [{
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            }];

            callback(getDirectDebitList(data, PaymentsConstants.GET_DIRECT_DEBIT_LIST));
            result = PaymentsStore.getDirectDebitList();

            it('should be equal to data', () => {
                //expect(result[0].id).toEqual(data[0].id);
            });
        });
        describe('delete payment details detalsfunctions test cases success', () => {
            let data = [{
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            }];

            callback(sendDeletePayment(data, PaymentsConstants.DELETE_PAYMENT_DETAILS));
            result = PaymentsStore.getDeletePaymentList();

            it('should be equal to data', () => {
                //expect(result[0].id).toEqual(data[0].id);
            });
        });
        describe('get payee List API Call', () => {
            let data = [{
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            }];

            callback(getFromPayeeList(data, PaymentsConstants.GET_FROM_PAYEES));
            result = PaymentsStore.getAllPayees();
            xit('should be equal to data', () => {
                expect(result[0].id).toEqual(data[0].id);
            });
        });
        describe('get payee List API Call success', () => {
            let data = [{
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            }];

            callback(handlePayeesListSuccess(data, PaymentsConstants.GET_FROM_PAYEES_SUCCESS));
            result = PaymentsStore.getAllPayees();
            it('should be equal to data', () => {
                expect(result.id).toEqual(data.id);
            });
        });
        describe('saving refresh functions test cases ServiceCall', () => {
            callback(refreshSavingComponent(PaymentsConstants.SAVING_REFRESH));
            let result = PaymentsStore.emitChange();
            it('should be equal to data', () => {
            });
        });
        describe('get pot List API Call', () => {
            let data = [{
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            }];

            callback(getFromPotList(data, PaymentsConstants.GET_FROM_POTS));
            result = PaymentsStore.getAllPots();
            it('should be equal to data', () => {
                expect(result.id).toEqual(data.id);
            });
        });
        describe('get post List API Call Success', () => {
            let data = [{
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            }];

            callback(handlePotListSuccess(data, PaymentsConstants.GET_FROM_POTS_SUCCESS));
            result = PaymentsStore.getAllPots();
            it('should be equal to data', () => {
                expect(result.id).toEqual(data.id);
            });
        });
        describe('get post List API Call Success', () => {
            let data = [{
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            }];

            callback(handlePotListSuccess(data, PaymentsConstants.GET_TO_ACCOUNTS));
            result = PaymentsStore.getAll();
            it('should be equal to data', () => {
                //expect(result[0].id).toEqual(data[0].id);
            });
        });
        describe('GET_TO_PAYEES', () => {
            let data = [{
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            }];

            callback(handlePotListSuccess(data, PaymentsConstants.GET_TO_PAYEES));
            result = PaymentsStore.getAllPayees();
            it('should be equal to data', () => {
                // expect(result[0].id).toEqual(data[0].id);
            });
        });
        describe('Set Payment Id function', () => {
            let data = [{
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            }];

            callback(setPaymentEditId(data, PaymentsConstants.SET_PAYMENT_ID));
            result = PaymentsStore.resetPaymentData();
            it('should be equal to data', () => {
                expect(result.id).toEqual(data.id);
            });
        });
        describe('get order list function', () => {
            let data = [{
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            }];

            callback(getDDPaymentFailure(data, PaymentsConstants.GET_DIRECT_DEBIT_LIST_ERROR));
            result = PaymentsStore.getStandingOrderList();
            it('should be equal to data', () => {
                expect(result.id).toEqual(data.id);
            });
        });
        describe('get order list function', () => {
            let data = [{
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            }];

            callback(getStandingOrderList(data, PaymentsConstants.GET_STANDING_ORDER_LIST));
            result = PaymentsStore.getStandingOrderList();
            it('should be equal to data', () => {
                expect(result.id).toEqual(data.id);
            });
        });
        describe('get Payment details by Id function', () => {
            let data = [{
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            }];

            callback(getPaymentDetailsById(data, PaymentsConstants.GET_PAYMENTDETAILS_BYID));
            result = PaymentsStore.getDirectDebitDataById();
            it('should be equal to data', () => {
                expect(result.id).toEqual(data.id);
            });
        });
        describe('Post ediit Payment data function', () => {
            let data = [{
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            }];

            callback(postEditedPaymentData(data, PaymentsConstants.POST_EDITPAYMENTDATA));
            result = PaymentsStore.getEditRepeatData();
            it('should be equal to data', () => {
                expect(result.id).toEqual(data.id);
            });
        });
        describe('Selected Pot function', () => {
            let data = [{
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            }];

            callback(selectedToPot(data, PaymentsConstants.SELECTED_TO_POT));
            result = PaymentsStore.getSelectedToPot();
            it('should be equal to data', () => {
                expect(result.id).toEqual(data.id);
            });
        });
        describe('Selected Pot function', () => {
            let data = [{
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            }];

            callback(updateSOPaymentStatus(data, PaymentsConstants.UPDATE_PAYMENT_SO_LIST));
            result = PaymentsStore.getStandingOrderList();
            it('should be equal to data', () => {
                expect(result.id).toEqual(data.id);
            });
        });

        describe('POT CLICKED function', () => {
            let data = {
                data: false,
            };
            callback(savingTotalClick(true, PaymentsConstants.SAVING_TOT_CLICK));
            callback(potClicked(data, PaymentsConstants.POT_CLICKED));
            let result = PaymentsStore.isPotClicked();
            it('should be equal to data', () => {
                expect(result.data).toEqual(data.data);
            });
        });

        describe('saving tot click function', () => {
            let data = {
                data: true,
            };
            callback(setPaymentType({ data: true }, PaymentsConstants.SELECT_PAYMENT_TYPE));
            callback(savingTotalClick(data, PaymentsConstants.SAVING_TOT_CLICK));
            let result = PaymentsStore.isSavingTotClicked();
            PaymentsStore.emitChange();

            it('should be equal to data', () => {
                expect(result).toEqual(data);
            });
        });
        describe('set the left margin function', () => {
            let data = {
                data: true,
            };
            callback(setLeftMarginOverlay(data, PaymentsConstants.SET_LEFT_MARGIN));
            let result = PaymentsStore.getLeftMargin();
            it('should be equal to data', () => {
                expect(result).toEqual(data);
            });
        });

        describe('get the next task function', () => {
            let data = {
                data: true,
            };
            callback(setPaymentStep(data, PaymentsConstants.SET_TO_RP));
            let result = PaymentsStore.getNextTask();
            it('should be equal to data', () => {
                expect(result).toEqual(data);
            });
        });
        describe('go back to repeat payment function', () => {
            let data = {
                data: true,
            };
            callback(goBackToRepeatPayment(data, PaymentsConstants.GO_BACK_TO_RP));
            let result = PaymentsStore.getNextTask();
            it('should be equal to data', () => {
                expect(result).toEqual(data);
            });
        });


        describe('get pot details function which match the Id', () => {
            let data = {
                data: true,
            };
            callback(getPotDetails(data, PaymentsConstants.REQUEST_POT_DETAIL));
            let result = PaymentsStore.getPotDetails();
            xit('should be equal to data', () => {
                expect(result).toEqual(data);
            });
        });

        describe('make payment list functions test cases success', () => {
            let data = [{
                "code": 202,
                "message": "pass"
            }];

            callback(handleMakePaymentServiceCall(data, PaymentsConstants.MAKE_PAYMENT_SUCCESS));
            let result = PaymentsStore.getMakePaymentResponse();

            it('should be equal to data', () => {
                expect(result[0].message).toEqual(data[0].message);
            });
        });
        describe('make payment list functions test cases failure', () => {
            let data = [{
                "code": 422,
                "message": "failure"
            }];

            callback(handleMakePaymentServiceCall(data, PaymentsConstants.MAKE_PAYMENT_FAILURE));
            let result = PaymentsStore.getMakePaymentResponse();

            it('should be equal to data', () => {
                expect(result[0].message).toEqual(data[0].message);
            });
        });
        describe('make DD payment functions test cases ServiceCall', () => {
            let data = [{
                "code": 422,
                "message": "failure"
            }];

            callback(makePayment(data, PaymentsConstants.MAKE_DD_PAYMENT_SERVICECALL));
            let result = PaymentsStore.getMakePaymentResponse();

            it('should be equal to data', () => {
                expect(result[0].message).toEqual(data[0].message);
            });
        });
        describe('make SO payment functions test cases ServiceCall', () => {
            let data = [{
                "code": 422,
                "message": "failure"
            }];

            callback(makePayment(data, PaymentsConstants.MAKE_SO_PAYMENT_SERVICECALL));
            let result = PaymentsStore.getMakePaymentResponse();

            it('should be equal to data', () => {
                expect(result[0].message).toEqual(data[0].message);
            });
        });
        describe('make Inter_Pot Transfer payment functions test cases ServiceCall', () => {
            let data = [{
                "code": 422,
                "message": "failure"
            }];

            callback(makeTransfer(data, PaymentsConstants.MAKE_INTER_POT_TRASNFER_SERVICECALL));
            let result = PaymentsStore.getMakePaymentResponse();

            it('should be equal to data', () => {
                expect(result[0].message).toEqual(data[0].message);
            });
        });
        describe('make payment functions test cases ServiceCall', () => {
            let data = [{
                "code": 422,
                "message": "failure"
            }];

            callback(makeTransfer(data, PaymentsConstants.MAKE_PAYMENT_SERVICECALL));
            let result = PaymentsStore.getMakePaymentResponse();

            it('should be equal to data', () => {
                expect(result[0].message).toEqual(data[0].message);
            });
        });

        describe('create single use payee functions test cases ServiceCall', () => {
            let data = [{
                "code": 422,
                "message": "failure"
            }];

            callback(makeTransfer(data, PaymentsConstants.CREATE_SINGLE_USE_PAYEE_SERVICECALL));
            let result = PaymentsStore.getMakePaymentResponse();

            it('should be equal to data', () => {
                expect(result[0].message).toEqual(data[0].message);
            });
        });

        describe('delete payment details functions test cases success', () => {
            let data = [{
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            }];

            callback(handleDeletePaymentListSuccess(data, PaymentsConstants.DELETE_PAYMENT_DETAILS_SUCCESS));
            result = PaymentsStore.getDeletePaymentList();

            it('should be equal to data', () => {
                //expect(result[0].id).toEqual(data[0].id);
            });
        });
        describe('delete payee details functions test cases', () => {
            let data = [{
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            }];

            callback(sendDeletePayee(data, PaymentsConstants.DELETE_PAYEE_DETAILS));
            result = PaymentsStore.getDeletePaymentList();

            it('should be equal to data', () => {
                // expect(result[0].id).toEqual(data[0].id);
            });
        });
        describe('delete payee details detalsfunctions test cases success', () => {
            let data = [{
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            }];

            callback(handleDeletePayeeListSuccess(data, PaymentsConstants.DELETE_PAYEE_DETAILS_SUCCESS));
            result = PaymentsStore.getDeletePaymentList();

            it('should be equal to data', () => {
                //expect(result[0].id).toEqual(data[0].id);
            });
        });
        describe('ACTION TO CHECK CLEAR_FROM_SELECTED function', () => {
            let data = {
                data: true,
            };
            callback(goBackToRepeatPayment({ _nextStep: 'From' }, PaymentsConstants.GO_BACK_TO_RP));
            callback(clearFromAccount(data, PaymentsConstants.CLEAR_FROM_SELECTED));
            let result = PaymentsStore.getSelectedAccount();
            PaymentsStore.emitChange();

            it('should be equal to data', () => {
                //expect(result).toEqual(data);
            });
        });
        describe('ACTION TO CHECK SAVING_TO_TOT_CLICK function', () => {
            let data = {
                data: true,
            };
            callback(toSavingTotalClick(data, PaymentsConstants.SAVING_TO_TOT_CLICK));
            let result = PaymentsStore.isToSavingTotClicked();

            it('should be equal to data', () => {
                //expect(result).toEqual(data);
            });
        });
        describe('ACTION TO CHECK SET_ARCHIVED_LEFT_MARGIN function', () => {
            let data = {
                data: true,
            };
            callback(setLeftMarginArchivedOverlay(data, PaymentsConstants.SET_ARCHIVED_LEFT_MARGIN));
            let result = PaymentsStore.getArchivedLeftMargin();

            it('should be equal to data', () => {
                //expect(result).toEqual(data);
            });
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
            PaymentsStore.removeChangeListener(jest.fn())
            expect(EventEmitter.listenerCount.length).toBe(2);
        });
    });
    describe('addChangeListener', () => {
        const props = {
            content: {
            },
        };
        it('calls for the addChangeListener', () => {
            PaymentsStore.addChangeListener(jest.fn())
            expect(EventEmitter.listenerCount.length).toBe(2);
        });
    });
});