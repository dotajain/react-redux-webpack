'use strict';

const PaymentsStore = jest.genMockFromModule('../PaymentsStore');
const _ = require('lodash')
let getallMock = {
    accountsList: {
        accounts: "loan"
    },
};
let task = '';
let confirm = false;
let datas='';
let payment=true;
let AccountsToData='';

let accountdetails = [{
    "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
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
    "limits": [

    ],
    "bank_id": "CB",
    "number": "650000-22446699",
    "metadata": {
        "display_name": "Loan Account"
    },
    "owners": [
        {
            "id": "2",
            "provider": "CB",
            "display_name": "Bob Brown"
        }
    ],
    "balances": [
        {
            "type": "current",
            "amount": {
                "value": 1517.44,
                "currency": "GBP"
            },
            "at": "2016-05-16T15:07:50.832+00:00"
        },
        {
            "type": "available",
            "amount": {
                "value": 3482.56,
                "currency": "GBP"
            },
            "at": "2016-05-16T15:07:50.832+00:00"
        }
    ]
},
    {
        "id": "084c7a11-c91a-45ef-baea-2fd0e9556e16",
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
        "limits": [
            {
                "type": "credit",
                "amount": {
                    "value": 5000.0,
                    "currency": "GBP"
                }
            }
        ],
        "statements": {
            "last": {
                "at": "2016-04-04T23:59:59.000+01:00",
                "balance": {
                    "type": "current",
                    "amount": {
                        "value": 1056.0,
                        "currency": "GBP"
                    }
                },
                "payment": {
                    "minimum_amount": {
                        "value": 211.2,
                        "currency": "GBP"
                    },
                    "when": "2016-05-04T23:59:59.000+01:00"
                }
            }
        },
        "bank_id": "CB",
        "number": "-************1234",
        "metadata": {
            "display_name": "My Credit Card"
        },
        "owners": [
            {
                "id": "2",
                "provider": "CB",
                "display_name": "Bob Brown"
            }
        ],
        "balances": [
            {
                "type": "current",
                "amount": {
                    "value": 1517.44,
                    "currency": "GBP"
                },
                "at": "2016-05-16T15:07:50.832+00:00"
            },
            {
                "type": "available",
                "amount": {
                    "value": 3482.56,
                    "currency": "GBP"
                },
                "at": "2016-05-16T15:07:50.832+00:00"
            }
        ]
    }]

const potList =  [
        {
        id: "ee8948b5-e443-408a-a2cd-1af9b29fdd5f",
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
                    "goal": {
                        "amount": {
                            "value": 2000.0,
                            "currency": "GBP"
                        },
                        "when": "2017-01-16"
                    },
                    "schedule": {
                        "recurrence": {
                            "frequency": {
                                "monthly": {
                                    "interval": 1,
                                    "day_of_month": 12
                                }
                            },
                            "amount": {
                                "value": 50.0,
                                "currency": "GBP"
                            }
                        },
                        "next_payment": {
                            "when": "2016-06-16",
                            "amount": {
                                "value": 50.0,
                                "currency": "GBP"
                            }
                        }
                    }
                },
            ]
        }
    }]

    let AccountData={
    
    "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
    "type":"savings",
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
    "limits": [

    ],
    "bank_id": "CB",
    "number": "650000-22446699",
    "metadata": {
        "display_name": "Loan Account"
    },
    "owners": [
        {
            "id": "2",
            "provider": "CB",
            "display_name": "Bob Brown"
        }
    ],
    "balances": [
        {
            "type": "current",
            "amount": {
                "value": 1517.44,
                "currency": "GBP"
            },
            "at": "2016-05-16T15:07:50.832+00:00"
        },
        {
            "type": "available",
            "amount": {
                "value": 3482.56,
                "currency": "GBP"
            },
            "at": "2016-05-16T15:07:50.832+00:00"
        }
    ]
}

let AccountToData={
    
    "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
    "type":"savings",
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
    "limits": [

    ],
    "bank_id": "CB",
    "number": "650000-22446699",
    "metadata": {
        "display_name": "Loan Account"
    },
    "owners": [
        {
            "id": "2",
            "provider": "CB",
            "display_name": "Bob Brown"
        }
    ],
    "balances": [
        {
            "type": "current",
            "amount": {
                "value": 1517.44,
                "currency": "GBP"
            },
            "at": "2016-05-16T15:07:50.832+00:00"
        },
        {
            "type": "available",
            "amount": {
                "value": 3482.56,
                "currency": "GBP"
            },
            "at": "2016-05-16T15:07:50.832+00:00"
        }
    ]
}

let PayeeData= {
    data:{
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
    }
    }
    

function getAccountDetail(id) {
    let accountDetail = _.find(accountdetails, { id: id });
    return accountDetail;
}

function getAll() {
    return getallMock.accountsList;
}

function getColorFromAccount(id) {
    let accountDetail = _.find(accountdetails, { id: id });
    if (accountDetail != undefined) {
        return 'account-2'
    }
}

function setNextTask(nexttask) {
    task = nexttask;
}

function getNextTask() {
    return task;
}

function IsToAccountSame(id) {

    return id === "b80e95a0-6b60-45b2-8b0f-77f2355f3061";
}

function IsAccountSame(id) {


    return id === "b80e95a0-6b60-45b2-8b0f-77f2355f3061";
}
function setPaymentType(type)
{
   payment=type;
}
function getPaymentType() {
    return payment;
}

function setConfirmBack(data) {

    confirm = data;
}

function getConfirmBack() {

    return confirm;
}

function getPotDetails(id) {

    let accountDetail = _.find(potList, { id: id });
    return accountDetail;
}

function getSelectedPotData()
{
    return potList;
}

function getSelectedToPotData()
{
    return potList;
}

function getSelectedToPot()
{
    return "3ebbc744-9a3b-414e-b5b7-49e4afd365be";
}

function setSelectedPot(data)
{
    datas=data;
}


function getSelectedPot()
{
    return datas;
}
function getSelectedSavingAccountId()
{
    return "ee8948b5-e443-408a-a2cd-1af9b29fdd5f";
}
function getSelectedAccount()
{
    return AccountData;
}


/*function getSelectedToAccount()
{
    return AccountToData;
}

function getSelectedPayee()
{
    return PayeeData;
}*/



 //PaymentsStore.getAccountDetail = getAccountDetail;
// PaymentsStore.getAll = getAll;
 PaymentsStore.getColorFromAccount = getColorFromAccount;
// PaymentsStore.getNextTask = getNextTask;
// PaymentsStore.setNextTask = setNextTask;
// PaymentsStore.IsToAccountSame = IsToAccountSame;
// PaymentsStore.IsAccountSame = IsAccountSame;
// PaymentsStore.getPaymentType = getPaymentType;
// PaymentsStore.setPaymentType = setPaymentType;
// PaymentsStore.getConfirmBack = getConfirmBack;
// PaymentsStore.setConfirmBack = setConfirmBack;
 PaymentsStore.getPotDetails = getPotDetails;
// PaymentsStore.getSelectedPotData = getSelectedPotData;
// PaymentsStore.getSelectedToPotData = getSelectedToPotData;
// PaymentsStore.getSelectedToPot = getSelectedToPot;
// PaymentsStore.getSelectedPot=getSelectedPot;
// PaymentsStore.setSelectedPot=setSelectedPot;
// PaymentsStore.getSelectedSavingAccountId=getSelectedSavingAccountId;
// PaymentsStore.getSelectedAccount=getSelectedAccount;
//PaymentsStore.getSelectedToAccount=getSelectedToAccount;
//PaymentsStore.getSelectedPayee=getSelectedPayee;




module.exports = PaymentsStore;
