jest.unmock('../TransactionScreen');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const TransactionScreen = require('../TransactionScreen');
const Modal = require('react-bootstrap/lib/Modal');
const SpendingsActionCreator = require('../../../actions/SpendingsActionCreator');
let component;
let props;
let instance;
const shallowRender = props => {
 const shallowRenderer = TestUtils.createRenderer();
 shallowRenderer.render(<TransactionScreen
         {...props}
      />);
 return shallowRenderer.getRenderOutput();
};
describe('TransactionScreen Test Cases', () => {
 beforeEach(()=>{
  props = {
      customClick:jest.genMockFunction(),
      content:{
          spendingTransitionHeaderText1:'',
          spendingTransitionHeaderText2:'',
          spendingTableLoading1:'',
      },
  transactionListData :   {
                    "hits": {
                        "total": 1,
                        "hits": [
                            {
                                "_type": "transaction",
                                "_index": "transactions_2016_09_19",
                                "_id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                "_source": {
                                    "other_account": {
                                        "number": null,
                                        "sort_code": null,
                                        "bank": null,
                                        "name": "RT 1 C WIEC MHZAPG",
                                        "uuid": null
                                    },
                                    "details": {
                                        "balances": {
                                            "current": {
                                                "value": 1400,
                                                "currency": "GBP"
                                            }
                                        },
                                        "cashback": {
                                            "value": 0,
                                            "currency": "GBP"
                                        },
                                        "timestamps": {
                                            "settled": 1473980400000,
                                            "local_transacted": null
                                        },
                                        "amount": {
                                            "value": -570,
                                            "currency": "GBP"
                                        },
                                        "reference": null,
                                        "fx": {
                                            "fee": {
                                                "international": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                },
                                                "processing": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                }
                                            },
                                            "local_amount": {
                                                "value": -0.5,
                                                "currency": "GBP"
                                            },
                                            "rate": 1
                                        },
                                        "posted": false,
                                        "debit_credit": "debit",
                                        "when": "2016-09-19T08:05:00.000Z",
                                        "type": "Direct Debit",
                                        "narrative": {
                                            "medium": "RBS Edinburgh",
                                            "additional_medium": null,
                                            "large": "RBS Edinburgh",
                                            "legacy": null,
                                            "small": "RBS Edinburgh",
                                            "additional_large": null,
                                            "additional_short": null
                                        }
                                    },
                                    "ordinal": "20152090000000000000000001",
                                    "id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                    "archived": false,
                                    "suggested_terms": "RBS Edinburgh",
                                    "mandate": {
                                        "sequence_number": "6877"
                                    },
                                    "metadata": {
                                        "payment_method": {
                                            "pan_masked": null,
                                            "cheque_number": null
                                        },
                                        "categories": [
                                            {
                                                "path": "\/eating out",
                                                "value": "Eating out",
                                                "id": 34130,
                                                "archived": false,
                                                "scheme": "NAG Categories"
                                            }
                                        ],
                                        "tags": null,
                                        "where": {
                                            "county": null,
                                            "geo_location": {
                                                "longitude": 0,
                                                "latitude": 0
                                            },
                                            "country": {
                                                "name": null,
                                                "code": null
                                            },
                                            "city": null
                                        }
                                    },
                                    "this_account": {
                                        "number": "40012813",
                                        "sort_code": "827018",
                                        "bank": null,
                                        "name": null,
                                        "uuid": "5dcfa751-6350-429a-acf3-0bc876fd219d"
                                    }
                                },
                                "sort": [
                                    1474272300000,
                                    "20152090000000000000000001"
                                ],
                                "_score": null
                            },
                            {
                                "_type": "transaction",
                                "_index": "transactions_2016_09_19",
                                "_id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                "_source": {
                                    "other_account": {
                                        "number": null,
                                        "sort_code": null,
                                        "bank": null,
                                        "name": "RT 1 C WIEC MHZAPG",
                                        "uuid": null
                                    },
                                    "details": {
                                        "balances": {
                                            "current": {
                                                "value": 1400,
                                                "currency": "GBP"
                                            }
                                        },
                                        "cashback": {
                                            "value": 0,
                                            "currency": "GBP"
                                        },
                                        "timestamps": {
                                            "settled": 1473980400000,
                                            "local_transacted": null
                                        },
                                        "amount": {
                                            "value": -12570,
                                            "currency": "GBP"
                                        },
                                        "reference": null,
                                        "fx": {
                                            "fee": {
                                                "international": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                },
                                                "processing": {
                                                    "value": 0,
                                                    "currency": "GBP"
                                                }
                                            },
                                            "local_amount": {
                                                "value": -0.5,
                                                "currency": "GBP"
                                            },
                                            "rate": 1
                                        },
                                        "posted": true,
                                        "debit_credit": "debit",
                                        "when": "2016-09-19T08:05:00.000Z",
                                        "type": "Direct Debit",
                                        "narrative": {
                                            "medium": "RBS Edinburgh",
                                            "additional_medium": null,
                                            "large": "RBS Edinburgh",
                                            "legacy": null,
                                            "small": "RBS Edinburgh",
                                            "additional_large": null,
                                            "additional_short": null
                                        }
                                    },
                                    "ordinal": "20152090000000000000000001",
                                    "id": "76d868eb-7438-2e21-821e-0d7cf75b3ec2",
                                    "archived": false,
                                    "suggested_terms": "RBS Edinburgh",
                                    "mandate": {
                                        "sequence_number": "6877"
                                    },
                                    "metadata": {
                                        "payment_method": {
                                            "pan_masked": null,
                                            "cheque_number": null
                                        },
                                        "categories": null,
                                        "tags": [
                                            {
                                                "path": "\/eating out",
                                                "value": "Eating out",
                                                "id": 34130,
                                                "archived": false,
                                                "scheme": "NAG Categories"
                                            }
                                        ],
                                        "where": {
                                            "county": null,
                                            "geo_location": {
                                                "longitude": 0,
                                                "latitude": 0
                                            },
                                            "country": {
                                                "name": null,
                                                "code": null
                                            },
                                            "city": 'Glasgow'
                                        }
                                    },
                                    "this_account": {
                                        "number": "40012814",
                                        "sort_code": "827018",
                                        "bank": null,
                                        "name": null,
                                        "uuid": "5dcfa751-6350-429a-acf3-0bc876fd219d"
                                    }
                                },
                                "sort": [
                                    1474272300000,
                                    "20152090000000000000000001"
                                ],
                                "_score": null
                            }
                        ]
                    }
                },
   	accountList : {
    "accounts": [
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
        "number": "650000-40012814",
        "metadata": {
            "display_name": "Loan Account"
        }
        },
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
        "number": "654321-12345678",
        "metadata": {
            "display_name": "B Current"
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
        "number": "650000-11223344",
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
        "number": "123456-41381167",
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
        "number": "654321-44224422",
        "metadata": {
            "display_name": "B Instant Savings"
        }
        },
        {
        "id": "05985dae-d2de-4ebc-ab0a-79093081bde5",
        "type": "loan-new",
        "product": {
            "code": "901",
            "name": "Personal-Loan",
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
        "number": "650000-22446699",
        "metadata": {
            "display_name": "Loan Account"
        }
        }
    ]
},

  }
  component = shallowRender(props);
  instance = TestUtils.renderIntoDocument(<TransactionScreen {...props}/>);
 });
 it('TransactionScreen : Unit Test Case 1 : toBedefined',()=>{
  expect(component).toBeDefined();
 });
 it('TransactionScreen : Unit Test Case 2 : _goBack',()=>{
  instance._goBack();
  expect(instance._goBack).toBeTruthy();
 });
  it('TransactionScreen : Unit Test Case 3 : _onRowClick',()=>{
      instance.setState({
          isModal : true,
      });
  instance._onRowClick();
  expect(instance.state.isModal).toBe(true);
 });
 
   it('TransactionScreen : Unit Test Case 4 : _onHide',()=>{
      instance.setState({
          isModal : false,
      });
  instance._onHide();
  expect(instance.state.isModal).toBe(false);
 });

});
