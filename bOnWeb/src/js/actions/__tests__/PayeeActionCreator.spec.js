/**
 * @module PayeeActionCreator
 */

jest.mock('../../stores/PayeeStore');
jest.unmock('../PayeeActionCreator');

const PayeeStore = require('../../stores/PayeeStore');
const PayeeActionCreator = require('../PayeeActionCreator');
const AppDispatcher = require('../../dispatcher/AppDispatcher');
const AppConstants = require('../../constants/AppConstants');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

describe('Action To raise view action', () => {

    beforeEach(() => {

    });
    it('Action To check the accoun type and data', () => {
        PayeeActionCreator.raise('Mortgage', 'data1');
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(1);
    });
});

describe('Action To raise server action', () => {

    let response = {
        "beneficiaries": [
            {
                "id": "4bbcfd9d-c1b4-4a65-a694-b347711612e7",
                "account": {
                    "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
                    "sort_code": "654321",
                    "account_number": "12345678"
                },
                "to_account": {
                    "sort_code": "654321",
                    "account_number": "43214321",
                    "name": "John Black"
                },
                "display_name": "John Black ",
                "reference": "88228822",
                "permissions": {
                    "can_edit_reference": true,
                    "can_set_date_in_future": true,
                    "can_delete": true
                }
            },
            {
                "id": "4cccfd9d-c1b4-4a65-a694-b347711612e7",
                "account": {
                    "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
                    "sort_code": "987654",
                    "account_number": "987634"
                },
                "to_account": {
                    "sort_code": "987654",
                    "account_number": "43214322",
                    "name": "John white"
                },
                "display_name": "John white ",
                "reference": "882423434",
                "permissions": {
                    "can_edit_reference": true,
                    "can_set_date_in_future": true,
                    "can_delete": true
                }
            }
        ]
    }
    it('Action To check the accoun type and data in server action ', () => {
        PayeeActionCreator.raiseServerAction(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(1);
    });
});
describe('Action To navigate To WebTask base on taskId', () => {

    beforeEach(() => {

    });
    it('Action To check the taskId', () => {
        PayeeActionCreator.navigateToWebTask('11211');
        //expect(PayeeActionCreator.navigateToWebTask.mock.calls.length).toBe(1);
    });
});

describe('Action To handle Payees List Success', () => {

    let response = {
        "beneficiaries": [
            {
                "id": "6302e720-03e3-4832-bd93-2b5faa7479d5",
                "source_id": "f07a634d-1f9f-4297-8988-d10fb1f447e8",
                "status": "success",
                "code": "000",
                "message": "Your payment has been successful and may take up to 2 hours to complete."
            }
        ]
    }
    it('Action  To send the handlePayeesListSuccess data store', () => {
        PayeeActionCreator.handlePayeesListSuccess(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(2);
    });
});
describe('Action To handle Payee Service Call', () => {

    let response = {
        "beneficiaries": [
            {
                "id": "6302e720-03e3-4832-bd93-2b5faa7479d5",
                "source_id": "f07a634d-1f9f-4297-8988-d10fb1f447e8",
                "status": "success",
                "code": "000",
                "message": "Your payment has been successful and may take up to 2 hours to complete."
            }
        ]
    }
    it('Action  To send the handlePayeeServiceCall data store', () => {
        PayeeActionCreator.handlePayeeServiceCall(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(3);
    });
});


describe('Action To delete Payee', () => {

    beforeEach(() => {

    });
    it('Action To get deletePayee based on deletePayeeRequestPacket', () => {
        PayeeActionCreator.deletePayee('payeename');
        //expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(1);
    });
});

describe('Action To handle DeletePayee Success', () => {

    let response = {
        "beneficiaries": [
            {
                "id": "f07a634d-1f9f-4297-8988-d10fb1f447e8",
                "code": "9384",
                "message": "Payee Deleted",
                "metadata": {
                    "available_funds": 7.30
                }
            }

        ]
    }
    it('Action To send the handle Delete Payee Success data store', () => {
        PayeeActionCreator.handleDeletePayeeSuccess(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(4);
    });
});

describe('Action To update Form', () => {

    beforeEach(() => {

    });
    it('Action To update add payee form', () => {
        PayeeActionCreator.updateForm('abcd', '12121');
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(3);
    });
});
describe('Action To update Edit Form', () => {

    beforeEach(() => {

    });
    it('Action To update edit add payee form', () => {
        PayeeActionCreator.updateEditForm('abcd', '12121');
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(3);
    });
});

describe('Action To update All fields', () => {

    beforeEach(() => {

    });
    it('Action To update all form values', () => {
        PayeeActionCreator.updateAllFiled('abcde');
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(3);
    });
});
describe('Action To update All Edit fields', () => {

    beforeEach(() => {

    });
    it('Action To update All Edit fields', () => {
        PayeeActionCreator.updateAllEditFiled('abcde');
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(3);
    });
});

describe('Action To handle Add Payee Service Call', () => {


    it('Action To handle Add Payee Service Call', () => {
        let response = {
            code: 201,
        }
        PayeeActionCreator.handleAddPayeeServiceCall(response);
        //expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(2);
    });
    it('Action To handle Add Payee Service Call', () => {
        let response = {
            code: 422,
        }
        PayeeActionCreator.handleAddPayeeServiceCall(response);
        //expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(2);
    });
    it('Action To handle default function', () => {
        let response = {
            code: '',
        }
        PayeeActionCreator.handleAddPayeeServiceCall(response);
        //expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(2);
    });

});
describe('Action To Edit and Add Payee', () => {

    beforeEach(() => {

    });
    it('Action To check Edit Payee', () => {
        PayeeActionCreator.editPayee();
        //expect(AppDispatcher.raiseServerAction.mock.calls.length).toBe(3);
    });
    it('Action To check Add Payee', () => {
        PayeeActionCreator.addPayee();
        //expect(AppDispatcher.raiseServerAction.mock.calls.length).toBe(3);
    });
});
describe('Action To check is Edit Payee Exit', () => {

    beforeEach(() => {

    });

    it('Action To check Edit Payee Exit', () => {
        PayeeActionCreator.isEditPayeeExit('abcd');
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(6);
    });
});
describe('Action To handle EditPayeePartialSuccessCall', () => {

    let response = {
        "beneficiaries": [
            {
                "id": "f07a634d-1f9f-4297-8988-d10fb1f447e8",
                "code": "9384",
                "message": "Payee Deleted",
                "metadata": {
                    "available_funds": 7.30
                }
            }

        ]
    }

    it('Action To check EditPayeePartialSuccessCall', () => {
        PayeeActionCreator.handleEditPayeePartialSuccessCall(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(11);
    });
});
describe('Action To check updateBenificiaryId', () => {

    beforeEach(() => {

    });
    it('Action To update BenificiaryId', () => {
        PayeeActionCreator.updateBenificiaryId('abcde');
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(6);
    });
});



