/**
 * @module PaymentsActionCreator
 */

jest.mock('../../stores/PaymentsStore');
jest.unmock('../PaymentsActionCreator');

jest.mock('../../stores/PaymentsStore');
jest.unmock('../PaymentsActionCreator');

const PaymentsStore = require('../../stores/PaymentsStore');
const PaymentsActionCreator = require('../PaymentsActionCreator');
const AppDispatcher = require('../../dispatcher/AppDispatcher');
const AppConstants = require('../../constants/AppConstants');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

describe('Action To raise view action', () => {
    it('Action To check the accoun type and data', () => {
        PaymentsActionCreator.raise('Mortgage', 'data1');
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
        PaymentsActionCreator.raiseServerAction(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(1);
    });
});

describe('Action To navigate To WebTask base on taskId', () => {

    it('Action To check the taskId', () => {
        PaymentsActionCreator.navigateToWebTask('11211');
        //expect(PayeeActionCreator.navigateToWebTask.mock.calls.length).toBe(1);
    });
});

describe('Action To get From AccountList', () => {

    it('Action To handle get FromAccountList', () => {
        PaymentsActionCreator.getFromAccountList('11211');
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(3);
    });
});

describe('Action To handle Accounts List Success', () => {

    let response = {
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
            },
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
                "sort_code": "650000",
                "number": "22446699",
                "metadata": {
                    "display_name": "Loan Account"
                }
            },
            {
                "id": "084c7a11-c91a-45ef-baea-2fd0e9556e16",
                "type": "credit_card",
                "product": {
                    "code": "901",
                    "name": "Gold MasterCard",
                    "description": "Gold MasterCard credit card"
                },
                "actions_available": {
                    "/account/pots": false,
                    "/account/alerts": false,
                    "/account/projections": false,
                    "/account/sweeps": false,
                    "/account/sweeps/transfer/out": false,
                    "/account/transactions/read": true,
                    "/account/payments/transfer/in": false,
                    "/account/payments/transfer/out": true,
                    "/account/payments/uk/default/out": true,
                    "/account/mandates/so/read": false,
                    "/account/mandates/dd/read": false,
                    "/account/mandates/so/write": false,
                    "/account/mandates/dd/write": false
                },
                "bank_id": "CB",
                "sort_code": null,
                "number": "************1234",
                "metadata": {
                    "display_name": "My Credit Card"
                }
            },
            {
                "id": "3420d6c1-fb60-4ac5-a226-0d741f498ad2",
                "type": "mortgage",
                "product": {
                    "code": "901",
                    "name": "2 year fixed rate",
                    "description": "2 year fixed rate mortgage"
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
                "sort_code": "650000",
                "number": "11223344",
                "metadata": {
                    "display_name": "Mortgage"
                }
            },
            {
                "id": "ee8948b5-e443-408a-a2cd-1af9b29fdd5f",
                "type": "savings",
                "product": {
                    "code": "901",
                    "name": "B Savings Account",
                    "description": "B Savings Account"
                },
                "actions_available": {
                    "/account/pots": true,
                    "/account/alerts": false,
                    "/account/projections": false,
                    "/account/sweeps": false,
                    "/account/sweeps/transfer/out": true,
                    "/account/transactions/read": true,
                    "/account/payments/transfer/in": true,
                    "/account/payments/transfer/out": true,
                    "/account/payments/uk/default/out": true,
                    "/account/mandates/so/read": false,
                    "/account/mandates/dd/read": false,
                    "/account/mandates/so/write": false,
                    "/account/mandates/dd/write": false
                },
                "bank_id": "CB",
                "sort_code": "123456",
                "number": "41381167",
                "metadata": {
                    "display_name": "B Instant Savings"
                }
            },
            {
                "id": "a91fe657-4605-42c7-96f1-3e1cc8555276",
                "type": "savings",
                "product": {
                    "code": "901",
                    "name": "B Savings Account",
                    "description": "B Savings Account"
                },
                "actions_available": {
                    "/account/pots": true,
                    "/account/alerts": false,
                    "/account/projections": false,
                    "/account/sweeps": false,
                    "/account/sweeps/transfer/out": true,
                    "/account/transactions/read": true,
                    "/account/payments/transfer/in": true,
                    "/account/payments/transfer/out": true,
                    "/account/payments/uk/default/out": true,
                    "/account/mandates/so/read": false,
                    "/account/mandates/dd/read": false,
                    "/account/mandates/so/write": false,
                    "/account/mandates/dd/write": false
                },
                "bank_id": "CB",
                "sort_code": "654321",
                "number": "44224422",
                "metadata": {
                    "display_name": "B Instant Savings"
                }
            }
        ]
    }
    it('Action  To send the handleAccountsListSuccess data store', () => {
        PaymentsActionCreator.handleAccountsListSuccess(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(8);
    });
});

describe('Action To get From PayeeList', () => {

    it('Action To check the PayeeList', () => {
        PaymentsActionCreator.getFromPayeeList();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(4);
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
    it('Action To send the handlePayeesListSuccess data store', () => {
        PaymentsActionCreator.handlePayeesListSuccess(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(9);
    });
});
describe('Action To handle Payees List Error', () => {

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
    it('Action To send the handlePayeeListError data store', () => {
        PaymentsActionCreator.handlePayeeListError(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(10);
    });
});
describe('Action To get From PotList', () => {

    it('Action To check from pot list based on bank Id', () => {
        PaymentsActionCreator.getFromPotList();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(5);
    });
});

describe('Action To handle Pot List Success', () => {

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
    it('Action To send the handlePotListSuccess data store', () => {
        PaymentsActionCreator.handlePotListSuccess(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(11);
    });
});

describe('Action To put Selected Account', () => {

    it('Action To store selected account from account list', () => {
        PaymentsActionCreator.putSelectedAccount();
        //expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(5);
    });
});

describe('Action To put Selected Payee', () => {

    it('Action To store selected account from account list', () => {
        PaymentsActionCreator.putSelectedPayee();
        //expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(5);
    });
});

describe('Action To get All paymentList', () => {

    it('Action getAllpaymentList will dispatch two action for getting SO list and Direct Debit list', () => {
        PaymentsActionCreator.getAllpaymentList();
        //expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(5);
    });
});
describe('Action To selected Payment Type', () => {

    it('Action To store the payment type i.e payment ot transfer', () => {
        PaymentsActionCreator.selectedPaymentType();
        //expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(5);
    });
});

describe('Action To get All payment List', () => {
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

    it('Action To check payment List', () => {
        PaymentsActionCreator.getPaymentSuccess(response);
        //expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(5);
    });
});
describe('handle get PaymentError', () => {

    it('Action  to send the paymentError for  SO Payment', () => {
        PaymentsActionCreator.getPaymentError('error');
        //expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(2);
    });
});
describe('handle getDDPaymentSuccess', () => {

    it('Action to send the paymentSuccess for DD Payment', () => {
        PaymentsActionCreator.getDDPaymentSuccess('succes');
        //expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(2);
    });
});
describe('handle getDDPaymentFailure', () => {

    it('Action to send the paymentError for  DD Payment', () => {
        PaymentsActionCreator.getDDPaymentFailure('eroorfailure');
        //expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(2);
    });
});
xdescribe('handle getDDPaymentFailure', () => {
    let response = {
        id: "ee8948b5-e443-408a-a2cd-1af9b29fdd5f"
    }
    it('Action to send the paymentError for  DD Payment', () => {
        PaymentsActionCreator.makeTransfer(response);
        //expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(2);
    });
});

describe('Action To handle Add Payee Service Call', () => {
    it('Action To handle Add Payee Service Call', () => {
        let requestpacket = {
            details: {
                isRepeat: false,
                when: true,
                oftenText: "weekly",
            },
            split: {

            },

            payeeDetails: {
                "reference": "88228822",
            },
            paymentType: 'TRANSFER',
        }
        PaymentsActionCreator.makePayment(requestpacket);
        //expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(2);
    });
    it('Action To handle Add Payee Service Call', () => {
        let requestpacket = {
            details: {
                isRepeat: false,
                when: true,
                oftenText: "weekly",
            },

            split: {

            },

            payeeDetails: {
                "reference": "88228822",
            },
            paymentType: 'PAYMENT',
        }
        PaymentsActionCreator.makePayment(requestpacket);
        //expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(2);
    });
    it('Action To handle Add Payee Service Call-2', () => {
        let requestpacket = {
            details: {
                isRepeat: false,
                when: "Tomorrow",
                oftenText: "weekly",
            },

            split: {

            },

            payeeDetails: {
                "reference": "88228822",
            },
            paymentType: 'PAYMENT',
        }
        PaymentsActionCreator.makePayment(requestpacket);
        //expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(2);
    });
    it('Action To handle Add Payee Service Call', () => {
        //let toUpperCase;
        //;
        let requestpacket = {
            details: {
                isRepeat: true,
                when: false,
                oftenText: "weekly",
            },

            payeeDetails: {
                "reference": "88228822",
            },
            paymentType: 'TRANSFER',

        }
        PaymentsActionCreator.makePayment(requestpacket);
        //expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(2);
    });
    it('Action To handle Add Payee Service Call', () => {
        let requestpacket = {
            details: {
                isRepeat: false,
                when: 'Today',

                oftenText: "weekly",
            },
            split: {

            },
            payeeDetails: {
                "reference": "88228822",
            },
            paymentType: true,
        }
        PaymentsActionCreator.makePayment(requestpacket);
        //expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(2);
    });
    xit('Action To handle Add Payee Service Call', () => {
        let requestpacket = {
            details: {
                isRepeat: false,
                when: 'Today',
            },
            split: {

            },
            payeeDetails: {
                "reference": "88228822",
            },
            paymentType: true,
        }
        PaymentsActionCreator.makePayment(requestpacket);
        //expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(2);
    });
});

describe('handle to get Direct DebitList', () => {

    it('Action To get DirectDebitList data', () => {
        PaymentsActionCreator.getDirectDebitList();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(20);
    });
});

describe('Action to handle Direct Debit List Success', () => {
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

    it('Action send DirectDebitListSuccess data to store', () => {
        PaymentsActionCreator.handleDirectDebitListSuccess(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(12);
    });
});

describe('handle to get Standing Order List', () => {

    it('Action To get DirectDebitList data', () => {
        PaymentsActionCreator.getStandingOrderList();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(21);
    });
});

describe('Action to handle Standing Order List Success', () => {
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

    it('Action send DirectDebitListSuccess data to store', () => {
        PaymentsActionCreator.handleStandingOrderListSuccess(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(13);
    });
});

describe('Action To handle Make Payment Service Call', () => {
    it('Action To handle Make Payment Service Call', () => {
        let response = {
            code: 202,
        }
        PaymentsActionCreator.handleMakePaymentServiceCall(response);
        //expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(2);
    });
    it('Action To handle Make Payment Service Call', () => {
        let response = {
            code: 422,
        }
        PaymentsActionCreator.handleMakePaymentServiceCall(response);
        //expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(2);
    });
    it('Action To handle Make Payment Service Call', () => {
        let response = {
            code: '',
        }
        PaymentsActionCreator.handleMakePaymentServiceCall(response);
        //expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(2);
    });
});

describe('Action To post Repeat Payment Data', () => {
    let result = {

    }

    it('Action To check post Repeat Payment Data', () => {
        PaymentsActionCreator.postRepeatPaymentData(result);
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(22);
    });
});
describe('Action To send Delete Payment', () => {
    let data = {
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

    it('Action To check Delete Payment', () => {
        PaymentsActionCreator.sendDeletePayment(data);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(16);
    });
});
describe('Action To handle Delete Payment ListSuccess', () => {
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

    it('Action To check Delete Payment ListSuccess', () => {
        PaymentsActionCreator.handleDeletePaymentListSuccess(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(17);
    });
});
describe('Action To put SelectedAccount', () => {
    let account = {
    }

    it('Action To check post Repeat Payment Data', () => {
        PaymentsActionCreator.putToSelectedAccount(account);
        //expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(20);
    });
});
// describe('Action To send DeletePayee', () => {
//     let account = {
//     }

//     it('Action To check DeletePayee', () => {
//         PaymentsActionCreator.sendDeletePayee(account);
//         expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(22);
//     });
// });
// describe('Action handle Delete Payee List Success', () => {
//     let response = {
//         "beneficiaries": [
//             {
//                 "id": "f07a634d-1f9f-4297-8988-d10fb1f447e8",
//                 "code": "9384",
//                 "message": "Payee Deleted",
//                 "metadata": {
//                     "available_funds": 7.30
//                 }
//             }

//         ]
//     }
//     it('Action To check Delete Payee List Success', () => {
//         PaymentsActionCreator.handleDeletePayeeListSuccess(response);
//         expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(17);
//     });
// });

describe('Action To send confrimPayment', () => {
    it('Action To check confrimPayment', () => {
        PaymentsActionCreator.confrimPayment();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(24);
    });
    it('Action To check getArchivedFilterData', () => {
        let data = {
        }
        PaymentsActionCreator.getArchivedFilterData();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(25);
    });
    it('Action To check getPaymentFilterData', () => {
        let data = {
        }
        PaymentsActionCreator.getPaymentFilterData();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(26);
    });
    it('Action To check getArchivedData', () => {
        PaymentsActionCreator.getArchivedData();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(27);
    });
    it('Action To check selectedPot', () => {
        PaymentsActionCreator.selectedPot();
        //expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(23);
    });
    it('Action To check selectedToPot', () => {
        PaymentsActionCreator.selectedToPot();
        //expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(23);
    });
    // it('Action To check postEditedPaymentData', () => {
    //     PaymentsActionCreator.postEditedPaymentData();
    //     expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(29);
    // });
});
describe('Action to get PaymentDetails ById', () => {
    it('Action to check all PaymentDetails ById', () => {
        PaymentsActionCreator.getPaymentDetailsById("05985dae-d2de-4ebc-ab0a-79093081bde5");
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(30);
    });
    it('Action To check assignRepeatData', () => {
        let data = {

        }
        PaymentsActionCreator.assignRepeatData(data);
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(31);
    });
    it('Action To check postEditeDataToPaymentStore', () => {
        let data = {

        }
        PaymentsActionCreator.postEditeDataToPaymentStore(data);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(18);
    });
    it('Action To check potClicked', () => {
        let data = {

        }
        PaymentsActionCreator.potClicked(data);
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(32);
    });
    it('Action To check setPaymentEditId', () => {
        let data = {

        }
        PaymentsActionCreator.setPaymentEditId(data);
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(33);
    });
    it('Action To check getPotDetails', () => {
        let data = {

        }
        PaymentsActionCreator.getPotDetails(data);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(19);
    });
    it('Action To check checkEndData', () => {
        let data = {

        }
        PaymentsActionCreator.checkEndData(data);
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(34);
    });
    it('Action To check goBackToRepeatPayment', () => {
        let data = {

        }
        PaymentsActionCreator.goBackToRepeatPayment(data);
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(35);
    });
    it('Action To check setEditPayment', () => {
        let data = {

        }
        PaymentsActionCreator.setEditPayment(data);
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(36);
    });

    it('Action To check setPaymentStep', () => {
        let data = {

        }
        PaymentsActionCreator.setPaymentStep(data);
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(37);
    });
    it('Action To check setLeftMarginOverlay', () => {
        let data = {

        }
        PaymentsActionCreator.setLeftMarginOverlay(data);
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(38);
    });
    it('Action To check refreshSavingComponent', () => {
        PaymentsActionCreator.refreshSavingComponent();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(39);
    });
    it('Action To check set Back Confirm', () => {
        let data = {

        }
        PaymentsActionCreator.setBackConfirm(data);
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(40);
    });
    it('Action To check clearToList', () => {
        PaymentsActionCreator.clearToList();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(41);
    });

});
describe('Action handle updateSOPaymentStatus', () => {
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
    it('Action To check update SOPayment Status', () => {
        PaymentsActionCreator.updateSOPaymentStatus(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(20);
    });
    it('Action To check AccountsDetailsSuccess', () => {
        PaymentsActionCreator.handleAccountsDetailsSuccess(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(21);
    });
    it('Action To check PotsDetailsSuccess', () => {
        PaymentsActionCreator.handlePotsDetailsSuccess(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(22);
    });
});
describe('Action To send savingTotalClick', () => {
    let isClick = {
    }
    it('Action To check savingTotalClick', () => {
        PaymentsActionCreator.savingTotalClick(isClick);
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(44);
    });
});
describe('Action To handle to set reccurence data', () => {

    it('Action To check reccurence data', () => {
        let recursiveDate = {
            oftenText: 'Weekly',
        }
        PaymentsActionCreator.setRecurrenceData(recursiveDate);
        //expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(2);
    });
    it('Action To check reccurence data', () => {
        let recursiveDate = {
            oftenText: '2 weekly',
        }
        PaymentsActionCreator.setRecurrenceData(recursiveDate);
        //expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(2);
    });
    it('Action To check reccurence data', () => {
        let recursiveDate = {
            oftenText: '1 monthly',
        }
        PaymentsActionCreator.setRecurrenceData(recursiveDate);
        //expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(2);
    });
    it('Action To check reccurence data', () => {
        let recursiveDate = {
            oftenText: '1 monthly',
        }
        PaymentsActionCreator.setRecurrenceData(recursiveDate);
        //expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(2);
    });
    it('Action To check reccurence data', () => {
        let recursiveDate = {
            stopitwhenText: 'Pickadate',
            end:'Tomorrow',
            oftenText: ' ',
        }
        PaymentsActionCreator.setRecurrenceData(recursiveDate);
        //expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(2);
    });
     it('Action To check reccurence data', () => {
        let recursiveDate = {
            stopitwhenText: 'Pickadate',
            oftenText: ' ',
        }
        PaymentsActionCreator.setRecurrenceData(recursiveDate);
        //expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(2);
    });
    it('Action To check reccurence data', () => {
        let recursiveDate = {
            stopitwhenText: 'Nooftimes',
            oftenText: ' ',
        }
        PaymentsActionCreator.setRecurrenceData(recursiveDate);
        //expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(2);
    });
    it('Action To check reccurence data', () => {
        let recursiveDate = {
            stopitwhenText: 'UntilICancel',
            oftenText: ' ',
        }
        PaymentsActionCreator.setRecurrenceData(recursiveDate);
        //expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(2);
    });
});
describe('Action To handle to send data when click on make transfer', () => {
    it('Action To check makeTransfer', () => {
        let response = {
            fromSelectedAccount: {
                type: 'savings',

            },
            toSelectedAccount: {
                number: '1222-522',
                type: 'savings',
                product: {
                    name: 'current'
                },
            },
            fromSelectedPot: {

            },
            toSelectedPot: {

            },
            paymentRequestPacket: {
                details: {
                    reference: 'ATM',
                }
            },
        }
        PaymentsActionCreator.makeTransfer(response.fromSelectedAccount, response.toSelectedAccount, response.fromSelectedPot, response.toSelectedPot, response.paymentRequestPacket);
        //expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(2);
    });
    // it('Action To check makeTransfer', () => {
    //     let response = {
    //         fromSelectedAccount: {
    //             type: 'savings',
    //             id: "05985dae-d2de-4ebc-ab0a-79093081bde5",

    //         },
    //         toSelectedAccount: {
    //             number: '1222-522',
    //             id: "05985dae-d2de-4ebc-ab0a-79093081bde5",
    //             product: {
    //                 name: 'current'
    //             },
    //         },
    //         fromSelectedPot: "12345dae-d2de-4ebc-ab0a-79093081lmn4",
    //         toSelectedPot: "05985dae-d2de-4ebc-ab0a-79093081bde5",
    //         paymentRequestPacket: {
    //             details: {
    //                 reference: 'ATM',
    //             }
    //         },
    //     }
    //     PaymentsActionCreator.makeTransfer(response.fromSelectedAccount, response.toSelectedAccount, response.fromSelectedPot, response.toSelectedPot, response.paymentRequestPacket);
    //     //expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(2);
    // });

    it('Action To check makeTransfer', () => {

        let props = {
            fromSelectedAccount: {
                type: 'savings',
                id: "05985dae-d2de-4ebc-ab0a-79093081bde5",
            },
            toSelectedAccount: {
                id: "05985dae-d2de-4ebc-ab0a-79093081bde5",
                type: 'savings',
                number: '1222-522',
                product: {
                    name: 'current'
                },
            },
            fromSelectedPot: {
                id: "05985dae-d2de-4ebc-ab0a-79093081bde6",
            },
            toSelectedPot: {
            },
            paymentRequestPacket: {
            },
        }
        PaymentsActionCreator.makeTransfer(props.fromSelectedAccount, props.toSelectedAccount, props.fromSelectedPot, props.toSelectedPot, props.paymentRequestPacket);
    });

    it('Action To check makeTransfer', () => {

        let props = {
            fromSelectedAccount: {
                type: 'savings',
                id: "05985dae-d2de-4ebc-ab0a-79093081bde5",
            },
            toSelectedAccount: {
                id: "05985dae-d2de-4ebc-ab0a-79093081bde5",
                type: 'savings',
                number: '1222-522',
                product: {
                    name: 'current'
                },
            },
            fromSelectedPot: "05985dae-d2de-4ebc-ab0a-79093081bde5",

            toSelectedPot: {
            },
            paymentRequestPacket: {
            },
        }
        PaymentsActionCreator.makeTransfer(props.fromSelectedAccount, props.toSelectedAccount, props.fromSelectedPot, props.toSelectedPot, props.paymentRequestPacket);
    });
    it('Action To check makeTransfer', () => {

        let props = {
            fromSelectedAccount: {
                type: 'savings',
                id: "05985dae-d2de-4ebc-ab0a-79093081bde5",
            },
            toSelectedAccount: {
                id: "05985dae-d2de-4ebc-ab0a-79093081bde6",
                type: 'savings',
                number: '1222-522',
                product: {
                    name: 'current'
                },
            },
            fromSelectedPot: "05985dae-d2de-4ebc-ab0a-79093081bde5",

            toSelectedPot: "05985dae-d2de-4ebc-ab0a-79093081bde6",

            paymentRequestPacket: {
                details: {
                    reference: 'ATM',
                }
            },
        }
        PaymentsActionCreator.makeTransfer(props.fromSelectedAccount, props.toSelectedAccount, props.fromSelectedPot, props.toSelectedPot, props.paymentRequestPacket);
    });
    it('Action To check makeTransfer for default values', () => {

        let props = {
            fromSelectedAccount: {
                type: '',
                id: "",
            },
            toSelectedAccount: {
                id: "",
                type: '',
                number: '',
                product: {
                    name: ''
                },
            },
            fromSelectedPot: "",

            toSelectedPot: "",

            paymentRequestPacket: {
                details: {
                    reference: 'ATM',
                }
            },
        }
        PaymentsActionCreator.makeTransfer(props.fromSelectedAccount, props.toSelectedAccount, props.fromSelectedPot, props.toSelectedPot, props.paymentRequestPacket);
    });

    it('Action To check makeTransfer for both saving account', () => {

        let props = {
            fromSelectedAccount: {
                type: 'savings',
                id: "05985dae-d2de-4ebc-ab0a-79093081bde5",
            },
            toSelectedAccount: {
                id: "05985dae-d2de-4ebc-ab0a-79093081bde5",
                type: 'savings',
                number: '1222-522',
                product: {
                    name: 'current'
                },
            },
            fromSelectedPot: "05985dae-d2de-4ebc-ab0a-79093081bde5",

            toSelectedPot: "05985dae-d2de-4ebc-ab0a-79093081bde6",

            paymentRequestPacket: {
                details: {
                    reference: 'ATM',
                }
            },
        }
        PaymentsActionCreator.makeTransfer(props.fromSelectedAccount, props.toSelectedAccount, props.fromSelectedPot, props.toSelectedPot, props.paymentRequestPacket);
    });

    it('Action To check makeTransfer for both one saving account & toSelectedAccount accounts', () => {

        let props = {
            fromSelectedAccount: {
                type: 'savings',
                id: "05985dae-d2de-4ebc-ab0a-79093081bde5",
            },
            toSelectedAccount: {
                id: "05985dae-d2de-4ebc-ab0a-79093081bde5",
                type: 'accounts',
                number: '1222-522',
                product: {
                    name: 'current'
                },
            },
            fromSelectedPot: "05985dae-d2de-4ebc-ab0a-79093081bde5",

            toSelectedPot: "05985dae-d2de-4ebc-ab0a-79093081bde6",

            paymentRequestPacket: {
                details: {
                    reference: 'ATM',
                }
            },
        }
        PaymentsActionCreator.makeTransfer(props.fromSelectedAccount, props.toSelectedAccount, props.fromSelectedPot, props.toSelectedPot, props.paymentRequestPacket);
    });

    it('Action To check makeTransfer for both one saving account & toSelectedAccount accounts', () => {

        let props = {
            fromSelectedAccount: {
                type: 'savings',
                id: "05985dae-d2de-4ebc-ab0a-79093081bde6",
            },
            toSelectedAccount: {
                id: "05985dae-d2de-4ebc-ab0a-79093081bde6",
                type: 'savings',
                number: '1222-522',
                product: {
                    name: 'current'
                },
            },
            fromSelectedPot: "05985dae-d2de-4ebc-ab0a-79093081bde5",

            toSelectedPot: "05985dae-d2de-4ebc-ab0a-79093081bde6",

            paymentRequestPacket: {
                details: {
                    reference: 'ATM',
                }
            },
        }
        PaymentsActionCreator.makeTransfer(props.fromSelectedAccount, props.toSelectedAccount, props.fromSelectedPot, props.toSelectedPot, props.paymentRequestPacket);
    });


});
describe('undefined thing', () => {
    it('Action To check makeTransfer for both two saving account & from selected pot is undefined ', () => {

        let props = {
            fromSelectedAccount: {
                type: 'savings',
                id: "05985dae-d2de-4ebc-ab0a-79093081bde5",
            },
            toSelectedAccount: {
                id: "05985dae-d2de-4ebc-ab0a-79093081bde5",
                type: 'savings',
                number: '1222-522',
                product: {
                    name: 'current'
                },
            },
            fromSelectedPot: undefined,

            toSelectedPot: "05985dae-d2de-4ebc-ab0a-79093081bde6",

            paymentRequestPacket: {
                details: {
                    reference: 'ATM',
                }
            },
        }
        console.log("dd" + props.fromSelectedPot)
        PaymentsActionCreator.makeTransfer(props.fromSelectedAccount, props.toSelectedAccount, props.fromSelectedPot, props.toSelectedPot, props.paymentRequestPacket);
    });
});
describe('Action To handle single use payee', () => {
    it('Action To check the single use payee', () => {
        let response = {
            requestData: {
                paymentRequestPacket: {
                    payeeDetails: {
                        reference: '',
                        account_number: '',
                        sort_code: '',
                        display_name: '',
                        id: '',
                    },

                },
            },
        }
        PaymentsActionCreator.handleSingleUsePayee(response.requestData.paymentRequestPacket.payeeDetails, response.requestData);
        //expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(1);
    });
});
describe('Action To handle spendingTransferMoney', () => {

    let spending = {
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

    it('Action To check spendingTransferMoney', () => {
        PaymentsActionCreator.spendingTransferMoney(spending);
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(53);
    });
});
describe('Action To updateEditForm', () => {

    beforeEach(() => {

    });
    it('Action To check updateEditForm', () => {
        PaymentsActionCreator.updateEditForm('abcd', '12121');
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(23);
    });
    it('Action To check isEditPaymentExit', () => {
        PaymentsActionCreator.isEditPaymentExit('abcd');
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(23);
    });
});
describe('Action To handle updateEditPaymentStatus and handleDeletePaymentSuccess', () => {

    let spending = {
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

    it('Action To check updateEditPaymentStatus', () => {
        PaymentsActionCreator.updateEditPaymentStatus(spending);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(24);
    });

    it('Action To check handleDeletePaymentSuccess', () => {
        PaymentsActionCreator.handleDeletePaymentSuccess(spending);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(25);
    });
});
describe('Action To handle updateEditPaymentStatus and handleDeletePaymentSuccess', () => {

    let updateFields = {
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

    it('Action To check setUpdateEditFormField', () => {
        PaymentsActionCreator.setUpdateEditFormField(updateFields);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(26);
    });
});
describe('Action To set edited payment data in store', () => {
    it('Action To check editPayment', () => {
        let response = {
            accountId: "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
            editPaymentData: {
                id: '1222-522',
                display_name: "B Instant Savings",
                sort_code: "654321",
                reference: 'ATM',
                account_number: '',
                amount: '',
                currency: '',
                isRepeat: true,
                oftenText: "WEEKLY",
            },
        }
        PaymentsActionCreator.editPayment(response.accountId, response.editPaymentData);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(26);
    });
    it('Action To check editPayment', () => {
        let response = {
            accountId: "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
            editPaymentData: {
                id: '1222-522',
                display_name: "B Instant Savings",
                sort_code: "654321",
                reference: 'ATM',
                account_number: '',
                amount: '',
                currency: '',
                isRepeat: false,
            },
        }
        PaymentsActionCreator.editPayment(response.accountId, response.editPaymentData);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(26);
    });
});
describe('Action To handle setRecurrenceData', () => {
    let response = {
        recursiveDate: {
            dtStart: 'Tomorrow',
            oftenText: "WEEKLY",
        }
    };

    it('Action To check setRecurrenceData', () => {
        PaymentsActionCreator.setRecurrenceData(response.recursiveDate);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(26);
    });
});
describe('Action To handle setRecurrenceData', () => {
    let response = {
        recursiveDate: {
            oftenText: "ssdf",
        }
    };

    it('Action To check setRecurrenceData', () => {

        PaymentsActionCreator.setRecurrenceData(response.recursiveDate);
        //expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(25);
    });
});

describe('Action To set To list total click', () => {
    it('Action To set total click flag', () => {

        PaymentsActionCreator.toSavingTotalClick(true);
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBeTruthy();
    });
});

describe('Action To set set OneOff Payment', () => {
    it('Action To set set OneOff Payment flag', () => {

        PaymentsActionCreator.setOneOffPayment(true);
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBeTruthy();
    });
});

describe('Action To set Tabs Changed ', () => {
    it('Action To set Tab Changed flag', () => {

        PaymentsActionCreator.setTabChanged(true);
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBeTruthy();
    });
});
describe('Action To clear From Account', () => {
    it('Action To clear From Account', () => {

        PaymentsActionCreator.clearFromAccount(true);
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBeTruthy();
    });
});
describe('Action  to check setLeftMarginArchivedOverlay function', () => {
    it('Action setLeftMarginArchivedOverlay', () => {

        PaymentsActionCreator.setLeftMarginArchivedOverlay(true);
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBeTruthy();
    });
});