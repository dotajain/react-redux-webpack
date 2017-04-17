/**
 * @module PayeeStore
 */
'use strict';

jest.unmock('../../constants/PayeeConstants');
jest.unmock('../PayeeStore');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const _ = require('lodash');
const EventEmitter = require('events').EventEmitter;

const AppDispatcher = require('../../dispatcher/AppDispatcher');
const PayeeApiUtils = require('../../utils/PayeeApiUtils');
const PaymentApiUtils = require('../../utils/PaymentApiUtils');
const PayeeConstants = require('../../constants/PayeeConstants');
const PaymentsConstants = require('../../constants/PaymentsConstants');
const PayeeStore = require('../PayeeStore');
const PaymentsStore = require('../PaymentsStore');
const PayeeActionCreator = require('../../actions/PayeeActionCreator');
const PaymentsActionCreator = require('../../actions/PaymentsActionCreator');

describe('Payee Store test cases', () => {
    let callback = AppDispatcher.register.mock.calls[0][0];
    let result;
    let abc = (data) => ({
        action: {
            actionType: PayeeConstants.AB,
            data
        }
    })
    let addPayee = (fieldValue, selectedaccountid) => ({
        action: {
            actionType: PayeeConstants.ADD_PAYEE_SERVICECALL,
            fieldValue,
            selectedaccountid
        }
    });
    let deletePayee = (data) => ({
        action: {
            actionType: PayeeConstants.DELETE_PAYEE_DETAILS,
            data
        }
    });
    let raise = (actionType, data) => ({
        action: {
            actionType,
            data
        }
    });
    let raiseServerAction = (actionType, data) => ({
        action: {
            actionType,
            data
        }
    });
    let navigateToWebTask = (taskId) => ({
        action: {
            actionType,
            data
        }
    });
    let handlePayeesListSuccess = (data) => ({
        action: {
            actionType: PayeeConstants.ADD_PAYEE_SUCCESS,
            data
        }
    });
    let handleDeletePayeeSuccess = (data) => ({
        action: {
            actionType: PayeeConstants.DELETE_PAYEE_SUCCESS,
            data
        }
    });
    let updateAllFiled = (data) => ({
        action: {
            actionType: PayeeConstants.UPDATE_ALL_FORM_VALUES,
            data
        }
    });
    let updateForm = (data) => ({
        action: {
            actionType: PayeeConstants.UPDATE_ADD_PAYEE_FORM,
            data,

        }
    });
    let handleAddPayeeServiceCall = (data, type) => ({
        action: {
            actionType: type,
            data
        }
    });
    let putSelectedAccount = (data) => ({
        action: {
            actionType: PaymentsConstants.PUT_SELECTED_ACCOUNT,
            data
        }
    });
    let isEditPayeeExit = (data) => ({
        action: {
            actionType: PayeeConstants.EDIT_PAYEE_EXIT,
            data
        }
    });
    describe('Payee List Test cases', () => {
        let result;
        describe('Payee List API Call', () => {
            afterEach(() => {
                result = '';
            });
            callback(addPayee());
            result = PayeeStore.getAllPayees();
            it('should make an API call', () => {
                expect(PayeeApiUtils.addPayee.mock.calls.length).toBe(2);
            });
        });

        describe('EDIT PAYEE EXIT', () => {
            let data = [{
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            }];

            callback(isEditPayeeExit(data, PayeeConstants.EDIT_PAYEE_EXIT));
            let result = PayeeStore.isPayeeExit();

            it('should be equal to data', () => {
                expect(result[0].id).toEqual(data[0].id);
            });
        });

        describe('get payee list functions test cases success', () => {
            let data = [{
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            }];

            callback(handlePayeesListSuccess(data, PayeeConstants.ADD_PAYEE_SUCCESS));
            let result = PayeeStore.getAddPayeeResponse();

            it('should be equal to data', () => {
                expect(result[0].id).toEqual(data[0].id);
            });
        });
        describe('get payee list functions test cases failure', () => {
            let data = [{
                "code": 422,
                "message": "failed"
            }];

            callback(handleAddPayeeServiceCall(data, PayeeConstants.ADD_PAYEE_FAILURE));
            let result = PayeeStore.getAddPayeeResponse();

            it('should be equal to data', () => {
                expect(result[0].message).toEqual(data[0].message);
            });
        });
        describe('get payee list functions test cases failure', () => {
            let data = [{
                "code": 422,
                "message": "failed"
            }];

            callback(putSelectedAccount(data, PaymentsConstants.PUT_SELECTED_ACCOUNT));
            let result = PayeeStore.getAddPayeeResponse();

            it('should be equal to data', () => {
                expect(result[0].message).toEqual(data[0].message);
            });
        });
        describe('get payee list functions To update add payee form', () => {
            let data = [{
                "name": "John 'Bulldog' Bloggs",
                "value": "212121",
            }];

            callback(updateForm(data, PayeeConstants.UPDATE_ADD_PAYEE_FORM));
            let result = PayeeStore.getFieldValue();

            xit('should To update add payee form', () => {
                expect(result[0].name).toEqual(data[0].name);
            });
        });
        describe('Delete Payee List API Call', () => {
            afterEach(() => {
                result = '';
            });
            callback(deletePayee());
            result = PayeeStore.getAllPayees();
            it('should make an API call', () => {
                expect(PayeeApiUtils.deletePayee.mock.calls.length).toBe(0);
            });
        });
        describe('delete payee list functions test cases success', () => {
            let data = [{
                "id": "20037855-f07c-4298-80c6-9f5a9a5e966a",
                "name": "John 'Bulldog' Bloggs",
            }];

            callback(handleDeletePayeeSuccess(data, PayeeConstants.DELETE_PAYEE_SUCCESS));
            let result = PayeeStore.getAllPayees();

            xit('should be equal to data', () => {
                expect(result[0].id).toEqual(data[0].id);
            });
        });
        describe('update form value functions test cases ', () => {
            let data = [{
                "code": 422,
                "message": "failed"
            }];

            callback(updateAllFiled(data, PayeeConstants.UPDATE_ALL_FORM_VALUES));
            let result = PayeeStore.getFieldValue();

            xit('should be equal to data', () => {
                expect(result[0].message).toEqual(data[0].message);
            });
        });
        xdescribe('put selected account functions test cases ', () => {
            let data = [{
                "code": 422,
                "message": "failed"
            }];

            callback(addPayee(data, PayeeConstants.ADD_PAYEE_SERVICECALL));
            let result = PayeeStore.getFieldValue();

            it('should be equal to data', () => {
                expect(result[0].message).toEqual(data[0].message);
            });
        });
        describe('default functions test cases ', () => {
            let data = [{
            }];

            callback(abc(data, PayeeConstants.AB));
            let result = PayeeStore.getAllPayees();

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
            PayeeStore.removeChangeListener(jest.fn())
            expect(EventEmitter.listenerCount.length).toBe(2);
        });
    });
    describe('addChangeListener', () => {
        const props = {
            content: {
            },
        };
        it('calls for the addChangeListener', () => {
            PayeeStore.addChangeListener(jest.fn())
            expect(EventEmitter.listenerCount.length).toBe(2);
        });
    });
});