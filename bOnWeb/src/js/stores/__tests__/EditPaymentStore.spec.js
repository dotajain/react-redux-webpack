/**
 * @module EditPaymentStore
 */
'use strict';

jest.unmock('../../constants/PaymentsConstants');
jest.unmock('../EditPaymentStore');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const _ = require('lodash');
const EventEmitter = require('events').EventEmitter;

const AppDispatcher = require('../../dispatcher/AppDispatcher');
const PaymentApiUtils = require('../../utils/PaymentApiUtils');
const PayeeApiUtils = require('../../utils/PayeeApiUtils');
const PaymentsConstants = require('../../constants/PaymentsConstants');
const PayeeConstants = require('../../constants/PayeeConstants');
const EditPaymentStore = require('../EditPaymentStore');
const PaymentsActionsCreator = require('../../actions/PaymentsActionCreator');

describe('EditPayment Store test cases', () => {
    let callback = AppDispatcher.register.mock.calls[0][0];
    let result;
    let abc = (data) => ({
        action: {
            actionType: PaymentsConstants.AB,
            data
        }
    })
    let postEditedPaymentData = () => ({
        action: {
            actionType: PaymentsConstants.POST_EDITPAYMENTDATA
        }
    });

    let setEditPayment = (data) => ({
        action: {
            actionType: PaymentsConstants.SET_EDIT_PAYMENT_DATA,
            data
        }
    });
    let updateSOPaymentStatus = (data) => ({
        action: {
            actionType: PaymentsConstants.UPDATE_PAYMENT_SO_LIST,
            data
        }
    });
    let assignRepeatData = (data) => ({
        action: {
            actionType: PaymentsConstants.SET_REPEAT_DATA,
            data
        }
    });
    let checkEndData = (data) => ({
        action: {
            actionType: PaymentsConstants.SET_ENDING_DETAILS,
            data
        }
    });
    let deletePayee = (data) => ({
        action: {
            actionType: PayeeConstants.DELETE_PAYEE_DETAILS,
            data
        }
    });
    let handleDeletePayeeSuccess = (data) => ({
        action: {
            actionType: PayeeConstants.DELETE_PAYEE_SUCCESS,
            data
        }
    });
    let updateAllEditFiled = (data) => ({
        action: {
            actionType: PayeeConstants.UPDATE_ALL_EDIT_FORM_VALUES,
            data
        }
    });
    let editPayee = () => ({
        action: {
            actionType: PayeeConstants.EDIT_PAYEE_SERVICECALL,
        }
    });
    let handlePayeeServiceCall = (data, type) => ({
        action: {
            actionType: type,
            data
        }
    });
    let setUpdateEditFormField = (updateFields) => ({
        action: {
            actionType: PaymentsConstants.UPDATE_ALL_EDIT_PAYMENT_FORM_VALUES,
            updateFields
        }
    });
    let handleDeletePaymentSuccess = (data) => ({
        action: {
            actionType: PaymentsConstants.DELETE_PAYMENT_SUCCESS,
            data
        }
    });
    let sendDeletePayment = (data) => ({
        action: {
            actionType: PaymentsConstants.DELETE_PAYMENT_DETAILS,
            data
        }
    });
    let updateEditForm = (data, type) => ({
        action: {
            actionType: type,
            data
        }
    });
    let updateEditPaymentStatus = (data) => ({
        action: {
            actionType: PaymentsConstants.EDIT_PAYMENT_SERVICE_MESSAGE,
            data
        }
    });
    let editPayment = (data) => ({
        action: {
            actionType: PaymentsConstants.EDIT_SO_PAYMENT_SERVICECALL,
            data
        }
    });
    let handleEditPayeePartialSuccessCall = (data) => ({
        action: {
            actionType: PayeeConstants.EDIT_PAYEE_PARTIAL_SUCCESS,
            data
        }
    });
    let updatebenificiaryId = (data) => ({
        action: {
            actionType: PayeeConstants.UPDATE_BENIFICIARY_ID,
            data
        }
    });
    describe('EditPayment List Test cases', () => {
        let result;
        describe('EDIT PAYEE PARTIAL SUCCESS ', () => {
            let data = [{
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            }];
            callback(handleEditPayeePartialSuccessCall(data, PayeeConstants.EDIT_PAYEE_PARTIAL_SUCCESS));
            result = EditPaymentStore.getEditPaymentResponse();
            it('should be equal to data', () => {
                expect(result[0].id).toEqual(data[0].id);
            });
        });
        describe('UPDATE EDIT PAYMENT FORM', () => {
            let data = [{
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            }];
            callback(updateEditForm(data, PaymentsConstants.UPDATE_EDIT_PAYMENT_FORM));
            result = EditPaymentStore.getEditPaymentData();
            it('should be equal to data', () => {
                expect(result[0].id).toEqual(data[0].id);
            });
        });
        describe('EDIT SO PAYMENT SERVICECALL', () => {
            let data = [{
                "accountId": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "mandateId": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                editPaymentRequest: true,
            }];
            callback(editPayment(data, PaymentsConstants.EDIT_SO_PAYMENT_SERVICECALL));
            result = EditPaymentStore.getEditPaymentResponse();
            it('should be equal to data', () => {
                expect(result[0].id).toEqual(data[0].accountId);
            });
        });
        describe('DELETE PAYMENT FAILED', () => {
            let data = [{
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            }];
            callback(handlePayeeServiceCall(data, PayeeConstants.DELETE_PAYEE_FAILED));
            result = EditPaymentStore.getEditPaymentResponse();
            it('should be equal to data', () => {
                expect(result[0].id).toEqual(data[0].id);
            });
        });
        describe('DELETE PAYMENT SUCCESS', () => {
            let data = [{
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            }];
            callback(updateEditPaymentStatus(data, PaymentsConstants.EDIT_PAYMENT_SERVICE_MESSAGE));
            result = EditPaymentStore.getEditPaymentResponse();
            it('should be equal to data', () => {
                expect(result[0].id).toEqual(data[0].id);
            });
        });
        describe('DELETE PAYMENT SUCCESS', () => {
            let data = [{
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            }];

            callback(sendDeletePayment(data, PaymentsConstants.DELETE_PAYMENT_DETAILS));
            result = EditPaymentStore.getEditPaymentData();
            it('should be equal to data', () => {
                expect(result[0].id).toEqual(data[0].id);
            });
        });
        describe('DELETE PAYMENT SUCCESS', () => {
            let data = [{
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            }];

            callback(handleDeletePaymentSuccess(data, PaymentsConstants.DELETE_PAYMENT_SUCCESS));
            result = EditPaymentStore.getEditPaymentResponse();
            it('should be equal to data', () => {
                expect(result[0].id).toEqual(data[0].id);
            });
        });
        describe('UPDATE ALL EDIT PAYMENT FORM VALUES', () => {
            let data = [{
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            }];

            callback(setUpdateEditFormField(data, PaymentsConstants.UPDATE_ALL_EDIT_PAYMENT_FORM_VALUES));
            result = EditPaymentStore.getEditPaymentData();
            it('should be equal to data', () => {
                expect(result[0].id).toEqual(data[0].id);
            });
        });
        describe('Edit List API Call', () => {
            let data = [{
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            }];

            callback(setEditPayment(data, PaymentsConstants.SET_EDIT_PAYMENT_DATA));
            result = EditPaymentStore.getEditRepeatData();
            it('should be equal to data', () => {
                expect(result[0].id).toEqual(data[0].id);
            });
        });
        xdescribe('Edit List API Call', () => {
            let data = [{
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            }];

            callback(postEditedPaymentData(data, PaymentsConstants.POST_EDITPAYMENTDATA));
            result = EditPaymentStore.getEditRepeatData();
            it('should be equal to data', () => {
                expect(result[0].id).toEqual(data[0].id);
            });
        });
        describe('set Repeat data  for stope', () => {
            let data = {
                type: 'stop',
                value: undefined,
            }
            callback(assignRepeatData(data, PaymentsConstants.SET_REPEAT_DATA));
            result = EditPaymentStore.getEditRepeatData();
            it('should set repeat for stop', () => {
                expect(result.stopitwhen).toEqual(data.value);
            });
        });
        describe('set Repeat data for stop value', () => {
            let data = {
                type: 'stopValue',
                value: undefined,
            }

            callback(assignRepeatData(data, PaymentsConstants.SET_REPEAT_DATA));
            result = EditPaymentStore.getEditRepeatData();
            it('should set repeat data for stop value', () => {
                expect(result.ending).toEqual(data.value);
            });
        });
        describe('set Repeat data for often', () => {
            let data = {
                type: 'often',
                value: undefined,
            }

            callback(assignRepeatData(data, PaymentsConstants.SET_REPEAT_DATA));
            result = EditPaymentStore.getEditRepeatData();
            it('should set repeat data for often', () => {
                expect(result.often).toEqual(data.value);
            });
        });
        describe('set Repeat data for dueDate', () => {
            let data = {
                type: 'dueDate',
                value: undefined,
            }

            callback(assignRepeatData(data, PaymentsConstants.SET_REPEAT_DATA));
            result = EditPaymentStore.getEditRepeatData();
            it('should set repeat data for dueDate', () => {
                expect(result.dueDate).toEqual(data.value);
            });
        });

        xdescribe('set Repeat data for amountChanged', () => {
            let data = {
                type: 'amountChanged',
                value: '212121'
            }
            callback(assignRepeatData(data, PaymentsConstants.SET_REPEAT_DATA));
            result = EditPaymentStore.getEditRepeatData();
            it('should set repeat data for amountChanged', () => {
            });
        });
        describe('delete payee details functions test cases', () => {
            let data = {
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            };

            callback(deletePayee(data, PayeeConstants.DELETE_PAYEE_DETAILS));
            result = EditPaymentStore.getEditRepeatData();

            xit('should be equal to data', () => {
                expect(result.id).toEqual(data.id);
            });
        });
        describe('delete payee details functions test cases11111111111', () => {
            let data = {
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            };

            callback(handleDeletePayeeSuccess(data, PayeeConstants.DELETE_PAYEE_SUCCESS));
            //PaymentApiUtils.getPayeeList();
            result = EditPaymentStore.getEditRepeatData();

            xit('should be equal to data', () => {
                expect(result.id).toEqual(data.id);
            });
        });
        describe('delete payee details functions test cases222222', () => {
            let data = {
                fieldValue: {
                    "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                    "name": "John Bloggs",
                }
            };

            callback(updateAllEditFiled(data, PayeeConstants.UPDATE_ALL_EDIT_FORM_VALUES));
            result = EditPaymentStore.getEditPayeeFieldValue();

            it('should be equal to data1111', () => {
                // expect(result.id).toEqual(data.id);
            });
        });
        describe('delete payee details functions test cases', () => {
            let data = {
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            };

            callback(updateEditForm(data, PayeeConstants.UPDATE_EDIT_PAYEE_FORM));
            result = EditPaymentStore.getEditRepeatData();

            it('should be equal to data1111', () => {
                // expect(result.id).toEqual(data.id);
            });
        });
        describe('delete payee details functions test cases', () => {
            let data = {
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            };

            callback(editPayee(PayeeConstants.EDIT_PAYEE_SERVICECALL));
            result = EditPaymentStore.getEditRepeatData();

            xit('should be equal to data', () => {
                expect(result.id).toEqual(data.id);
            });
        });
        describe('delete payee details functions test cases', () => {
            let data = {
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            };

            callback(handlePayeeServiceCall(PayeeConstants.MANAGE_PAYEE_SERVICE_SUCCESS));
            result = EditPaymentStore.getEditRepeatData();

            xit('should be equal to data', () => {
                expect(result.id).toEqual(data.id);
            });
        });


        describe('Action to check UPDATE BENIFICIARY ID', () => {
            let data = {
                benificiaryId: {
                    "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                    "name": "John 'Bulldog' Bloggs",
                }
            }

            callback(updatebenificiaryId(data, PayeeConstants.UPDATE_BENIFICIARY_ID));
            let result = EditPaymentStore.getEditRepeatData();

            it('should be equal to Update data', () => {
                //expect(result[0].id).toEqual(data[0].id);
            });
        });


        describe('default functions test cases ', () => {
            let data = [{
            }];

            callback(abc(data, PaymentsConstants.AB));
            let result = EditPaymentStore.getEditRepeatData();

            xit('should be equal to data', () => {
                expect(result[0]).toEqual(data[0]);
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
            EditPaymentStore.removeChangeListener(jest.fn())
            expect(EventEmitter.listenerCount.length).toBe(2);
        });
    });
    describe('addChangeListener', () => {
        const props = {
            content: {
            },
        };
        it('calls for the addChangeListener', () => {
            EditPaymentStore.addChangeListener(jest.fn())
            expect(EventEmitter.listenerCount.length).toBe(2);
        });
    });
});