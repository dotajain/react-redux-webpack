jest.unmock('../../constants/SpendingsConstants');
jest.unmock('../SpendingsStore');

const AppDispatcher = require('../../dispatcher/AppDispatcher');
const assign = require('object-assign');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const EventEmitter = require('events').EventEmitter;
const SpendingsConstants = require('../../constants/SpendingsConstants');
const SpendingsUtils = require('../../utils/SpendingsUtils');
const SpendingsStore = require('../SpendingsStore');
const _ = require('lodash');
const moment = require('moment');
const AccountsStore = require('../../stores/AccountsStore');
const AccountConstants = require('../../constants/AccountConstants');
const CHANGE_EVENT = 'change';
const _collectAccountID = [];

let component;
let props = {
      content: {
        spendingTableMessage1 : 'Hello',
        spendingTableMessage2 : 'Hello',
        spendingTableMessage3 : 'Hello',
        spendingTableMessage4 : 'Hello',
        spendingTableMessage5 : 'Hello',
        spendingTableMessage8 : 'Hello',
        spendingTableMessage6 : 'Hello',
        spendingTableMessage7 : 'Hello',
      },
        budgetData: {
          "tag_budgets": [
            {
              "tag": {
                "value": "Shoes",
                "id": "4a3136d9-07fe-48e0-bc1d-d9a7749b3d2f",
                "archived": false,
                "path" : true
              },
              "target_amount": {
                "value": 40.0,
                "currency": "GBP"
              }
            }
          ],
          "category_budgets": [
            {
              "category": {
                "value": "Entertainment",
                "path": "/entertainment",
                "scheme": "NAG Categories",
                "id": 2,
                "archived": false
              },
              "target_amount": {
                "value": 30.0,
                "currency": "GBP"
              }
            },
            {
              "category": {
                "value": "Earnings",
                "path": "/earnings",
                "scheme": "NAG Categories",
                "id": 22,
                "archived": false
              },
              "target_amount": {
                "value": 2200.0,
                "currency": "GBP"
              }
            }
          ]
        },
        spendListData:{
          "aggregations": {
            "other_accounts": {
              "tags": {
                "buckets": [
                  {
                    "key": "4a3136d9-07fe-48e0-bc1d-d9a7749b3d2f",
                    "doc_count": 5,
                    "month": {
                      "buckets": [
                        {
                          "key_as_string": moment().format('YYYY-MM'),
                          "doc_count": 4,
                          "spend": {
                            "buckets": [
                              {
                                "key": "GBP",
                                "amount": {
                                  "value": -270.14
                                },
                                "aggs": {
                                  "buckets": [
                                    {
                                      "key": "F"
                                    }
                                  ]
                                }
                              }
                            ]
                          }
                        },
                        {
                          "key_as_string": "2016-05-01T00:00:00.000+01:00",
                          "doc_count": 1,
                          "spend": {
                            "buckets": [
                              {
                                "key": "GBP",
                                "amount": {
                                  "value": -27.99
                                },
                                "aggs": {
                                  "buckets": [
                                    {
                                      "key": "F"
                                    }
                                  ]
                                }
                              }
                            ]
                          }
                        }
                      ]
                    },
                    "tag_name": {
                      "buckets": [
                        {
                          "key": "Shoes"
                        }
                      ]
                    },
                    "cat_name": {
                      "buckets": [
                        {
                          "key": "Fuel"
                        }
                      ]
                    }
                  }
                ]
              },
              "categories": {
                "buckets": [
                  {
                    "key": "19",
                    "doc_count": 17,
                    "month": {
                      "buckets": [
                        {
                          "key_as_string": "2016-06-01T00:00:00.000+01:00",
                          "doc_count": 7,
                          "spend": {
                            "buckets": [
                              {
                                "key": "GBP",
                                "amount": {
                                  "value": 64.07999999999996
                                },
                                "aggs": {
                                  "buckets": [
                                    {
                                      "key": "F"
                                    }
                                  ]
                                }
                              }
                            ]
                          }
                        },
                        {
                          "key_as_string": "2016-05-01T00:00:00.000+01:00",
                          "doc_count": 10,
                          "spend": {
                            "buckets": [
                              {
                                "key": "GBP",
                                "amount": {
                                  "value": -334.0799999999999
                                },
                                "aggs": {
                                  "buckets": [
                                    {
                                      "key": "F"
                                    }
                                  ]
                                }
                              }
                            ]
                          }
                        }
                      ]
                    },
                    "cat_name": {
                      "buckets": [
                        {
                          "key": "Untagged"
                        }
                      ]
                    }
                  },
                  {
                    "key": "4",
                    "doc_count": 1,
                    "month": {
                      "buckets": [
                        {
                          "key_as_string": "2016-06-01T00:00:00.000+01:00",
                          "doc_count": 0,
                          "spend": {
                            "buckets": [
                              {
                                "key": "GBP",
                                "amount": {
                                  "value": 0.0
                                },
                                "aggs": {
                                  "buckets": [
                                    {
                                      "key": "F"
                                    }
                                  ]
                                }
                              }
                            ]
                          }
                        },
                        {
                          "key_as_string": "2016-05-01T00:00:00.000+01:00",
                          "doc_count": 1,
                          "spend": {
                            "buckets": [
                              {
                                "key": "GBP",
                                "amount": {
                                  "value": -23.32
                                },
                                "aggs": {
                                  "buckets": [
                                    {
                                      "key": "F"
                                    }
                                  ]
                                }
                              }
                            ]
                          }
                        }
                      ]
                    },
                    "cat_name": {
                      "buckets": [
                        {
                          "key": "Fuel"
                        }
                      ]
                    }
                  }
                ]
              }
            },
            "credit_cards": {
              "tags": {
                "buckets": [

                ]
              },
              "categories": {
                "buckets": [
                  {
                    "key": "15",
                    "doc_count": 2,
                    "month": {
                      "buckets": [
                        {
                          "key_as_string": "2016-06-01T00:00:00.000+01:00",
                          "doc_count": 1,
                          "spend": {
                            "buckets": [
                              {
                                "key": "GBP",
                                "amount": {
                                  "value": 31.0
                                },
                                "aggs": {
                                  "buckets": [
                                    {
                                      "key": "F"
                                    }
                                  ]
                                }
                              }
                            ]
                          }
                        },
                      ]
                    },
                    "tag_name": {
                      "buckets": [
                        {
                          "key": "Pets"
                        }
                      ]
                    },
                    "cat_name": {
                      "buckets": [
                        {
                          "key": "Pets"
                        }
                      ]
                    }
                  },
                  {
                    "key": "4",
                    "doc_count": 1,
                    "month": {
                      "buckets": [
                        {
                          "key_as_string": "2016-06-01T00:00:00.000+01:00",
                          "doc_count": 0,
                          "spend": {
                            "buckets": [
                              {
                                "key": "GBP",
                                "amount": {
                                  "value": 0.0
                                },
                                "aggs": {
                                  "buckets": [
                                    {
                                      "key": "F"
                                    }
                                  ]
                                }
                              }
                            ]
                          }
                        },
                        {
                          "key_as_string": "2016-05-01T00:00:00.000+01:00",
                          "doc_count": 1,
                          "spend": {
                            "buckets": [
                              {
                                "key": "GBP",
                                "amount": {
                                  "value": 56.0
                                },
                                "aggs": {
                                  "buckets": [
                                    {
                                      "key": "F"
                                    }
                                  ]
                                }
                              }
                            ]
                          }
                        }
                      ]
                    },
                    "cat_name": {
                      "buckets": [
                        {
                          "key": "Fuel"
                        }
                      ]
                    }
                  }
                ]
              }
            }
          }
        },
        tagList : {
          "tags": [
            {
              "value": "Shoes",
              "id": "4a3136d9-07fe-48e0-bc1d-d9a7749b3d2f",
              "archived": false
            }
          ],
          "categories": [
            {
              "value": "Entertainment",
              "path": "/entertainment",
              "scheme": "NAG Categories",
              "id": 2,
              "archived": false
            },
            {
              "value": "Earnings",
              "path": "/earnings",
              "scheme": "NAG Categories",
              "id": 22,
              "archived": false
            }
          ]
        },
        transactionListData: {
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
                    }
                ]
            }
        },
        isTransactionPage: true,
        accountList :{
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
          },
        hasBudgetData : true,
        isEarningPage : true,
        isCreateBudgetPage : true,
        loadSpendingPage: true,
    };
let instance;
const shallowRender = props => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<SpendingsStore
               {...props}
            />);
  return shallowRenderer.getRenderOutput();
};



describe('Spendings Store Test Cases', () => {
  beforeEach(()=>{
    //component = shallowRender(props);
    instance = TestUtils.renderIntoDocument(<SpendingsStore {...props}/>);

  });
    
});
describe('Spendings Store Test Cases 1', () => {
    
    let callback = AppDispatcher.register.mock.calls[0][0];

    let loadSpendingPage = (data) => ({
        action: {
            actionType: SpendingsConstants.REQUEST_BUDGET_CONNECTION_SUCCESS,
            data: '',
        }
    });
    let getBudgetConnection = (data) => ({
        action: {
            actionType: SpendingsConstants.REQUEST_BUDGET_CONNECTION,
            data,
        }
    });
    let isCreateBudgetPage = (data) => ({
        action: {
            actionType: SpendingsConstants.REQUEST_BUDGET_PREFERENCES_CONNECTION_SUCCESS,
            data: false,
        }
    });
    let getBudgetPreferencesConnectionData = (data) => ({
        action: {
            actionType: SpendingsConstants.REQUEST_BUDGET_PREFERENCES_CONNECTION_ERROR,
            data: false,
        }
    });
    let getBudgetPreferencesConnectionData1 = (data) => ({
        action: {
            actionType: SpendingsConstants.REQUEST_BUDGET_PREFERENCES_CONNECTION_ERROR,
            data: true,
        }
    });
    let getBudgetPreferencesConnectionDa = (data) => ({
        action: {
            actionType: SpendingsConstants.UPDATE_BUDGET_PREFERENCES_CONNECTION_SUCCESS,
            data: true,
        }

    });

    let spendingPage = (data) => ({
        action: {
            actionType: SpendingsConstants.REQUEST_SPEND_LIST_CONNECTION_SUCCESS,
            data: true,
        }

    });
    let spendingPage1 = (data) => ({
        action: {
            actionType: SpendingsConstants.REQUEST_SPEND_LIST_CONNECTION_ERROR,
            data: false,
        }

    });
    let spendingPage11 = (data) => ({
        action: {
            actionType: SpendingsConstants.REQUEST_SPENDING_PAGE,
            data: true,
        }

    });
    let spendingPageupdate = (data) => ({
        action: {
            actionType: SpendingsConstants.UPDATE_BUDGET_PREFERENCES_CONNECTION_ERROR,
            data: false,
        }

    });

    let _showAccountModal = (data) => ({
        action: {
            actionType: SpendingsConstants.REQUEST_ALL_SELECTED_ACCOUNTS,
            data: true,
        }

    });
    let _showAccountModalSpend = (data) => ({
        action: {
            actionType: SpendingsConstants.REQUEST_SPEND_LIST_CONNECTION,
            data: false,
        }
    });
    let showAccountModalSpend = (data) => ({
        action: {
            actionType: SpendingsConstants.REQUEST_TAG_LIST_CONNECTION_SUCCESS,
            data: false,
        }
    });
    let showAccountModalTag = (data) => ({
        action: {
            actionType: SpendingsConstants.REQUEST_TAG_LIST_CONNECTION_ERROR,
            data: false,
        }
    });
    let showAccountModalTag1 = (data) => ({
        action: {
            actionType: SpendingsConstants.REQUEST_BUDGET_CONNECTION_ERROR,
            data: false,
        }
    });
    let showAccountModalBudget = (data) => ({
        action: {
            actionType: SpendingsConstants.REQUEST_EDIT_BUDGET_PAGE,
            data: false,
        }
    });
    let showAccountModalBudget1 = (data) => ({
        action: {
            actionType: SpendingsConstants.REQUEST_TRANSACTIONS_SUCCESS,
            data: false,
        }
    });
    let Updatebudgetconnection = (data) => ({
        action: {
            actionType: SpendingsConstants.UPDATE_BUDGET_CONNECTION_SUCCESS,
            data,
        }
    });
    let Updatebudgetconnections = (data) => ({
        action: {
            actionType: SpendingsConstants.UPDATE_BUDGET_CONNECTION,
            data,
        }
    });
    let UpdateBudgetconnectionsError = (data) => ({
        action: {
            actionType: SpendingsConstants.UPDATE_BUDGET_CONNECTION_ERROR,
            data,
        }
    });
    let UpdateBudgetconnectionsError1 = (data) => ({
        action: {
            actionType: SpendingsConstants.UPDATE_BUDGET_CONNECTION_ERROR,
            data : false,
        }
    });
    let UpdateBudgetconnectionsPreferences = (data) => ({
        action: {
            actionType: SpendingsConstants.UPDATE_BUDGET_PREFERENCES_CONNECTION,
            data,
        }
    });
    let getTransactionDetails = (data) => ({
        action: {
            actionType: SpendingsConstants.REQUEST_TRANSACTIONS_SUCCESS,
            data,
        }
    });
    let getBudgetPreferencesConnectionDatas = (data) => ({
        action: {
            actionType: SpendingsConstants.REQUEST_BUDGET_PREFERENCES_CONNECTION,
            data: false,
        }
    });
    let isTransactionPage = (data) => ({
        action: {
            actionType: SpendingsConstants.REQUEST_SPENDING_PAGE,
            data: false,
        }
    });
    let _getSpendListConnectionData = (data) => ({
        action: {
            actionType: SpendingsConstants.REQUEST_SPEND_LIST_CONNECTION_SUCCESS,
            data,
        }
    });

    let _getBudgetPreferencesConnectionData = (data) => ({
        action: {
            actionType: SpendingsConstants.REQUEST_BUDGET_PREFERENCES_CONNECTION_SUCCESS,
            data,
        }
    });
    let isSpendError = (data) => ({
        action: {
            actionType: SpendingsConstants.REQUEST_SPEND_LIST_CONNECTION_SUCCESS,
            data: false,
        }
    });
    let _hasTagList = (data) => ({
        action: {
            actionType: SpendingsConstants.REQUEST_TAG_LIST_CONNECTION_SUCCESS,
            data: false,

        }
    });
    let _hasTagListError = (data) => ({
        action: {
            actionType: SpendingsConstants.REQUEST_TAG_LIST_CONNECTION,
            data: false,

        }
    });
    let _hasBudgetData = (data) => ({
        action: {
            actionType: SpendingsConstants.REQUEST_BUDGET_CONNECTION,
            data: false,

        }
    });
    let _hasBudgetPreferenceData = (data) => ({
        action: {
            actionType: SpendingsConstants.REQUEST_BUDGET_PREFERENCES_CONNECTION,
            data: false,

        }
    });
    let updatedAccountIds = (data) => ({
        action: {
            actionType: AccountConstants.REQUEST_SPEND_LIST_CONNECTION_SUCCESS,
            data: false,

        }
    });
      let spendMonthPageData = (data) => ({
        action: {
            actionType: AccountConstants.REQUEST_ACCOUNTS_LIST_SUCCESS,
            data: false,

        }
    });
    let budgetPreferenceConnection = (data) => ({
        action: {
            actionType: SpendingsConstants.REQUEST_BUDGET_PREFERENCES_CONNECTION,
            data,
        }
    });


    let requestAccountsListSuccess = (data) => ({
        action: {
            actionType: AccountConstants.REQUEST_ACCOUNTS_LIST_SUCCESS,
            data
        }
    });

    let requestAccountsListSuccess1 = (data) => ({
        action: {
            actionType: AccountConstants.REQUEST_ACCOUNTS_LIST_SUCCESS,
            data: ''
        }
    });
    let getTagListConnectionData = (data) => ({
        action: {
            actionType: AccountConstants.REQUEST_TAG_LIST_CONNECTION_SUCCESS,
            data,
        }
    });
     let getAll  = (data) => ({
        action: {
            actionType: SpendingsConstants.REQUEST_ALL_ACCOUNTS_SUCCESS,
            data: false,
        }
    });
     let getAllData  = (data) => ({
        action: {
            actionType: SpendingsConstants.REQUEST_ALL_ACCOUNTS_SUCCESS,
            data,
        }
    });
    let spendingPageToLoad  = (data) => ({
        action: {
            actionType: SpendingsConstants.REQUEST_ALL_ACCOUNTS,
            data: false,
        }
    });
    let spendingPageToLoad1  = (data) => ({
        action: {
            actionType: SpendingsConstants.REQUEST_SPENDING_PAGE_ON_TOGGLE,
            data: false,
        }
    });
     let isBudgetSuccess   = (data) => ({
        action: {
            actionType: SpendingsConstants.REQUEST_BUDGET_CONNECTION_SUCCESS,
            data: false,
        }
    });
     let budgetDataSuccess   = (data) => ({
        action: {
            actionType: SpendingsConstants.REQUEST_BUDGET_CONNECTION_SUCCESS,
            data,
        }
    });
     let isAccountModal    = (data) => ({
        action: {
            actionType: SpendingsConstants.REQUEST_CLOSE_ACCOUNT_MODAL,
            data: false,
        }
    });
     let isAccountModal1    = (data) => ({
        action: {
            actionType: SpendingsConstants.REQUEST_ALL_SELECTED_ACCOUNTS,
            data: false,
        }
    });
     let transactionPageSize = (data) => ({
        action: {
            actionType: SpendingsConstants.REQUEST_NEXT_TRANSACTIONS,
            data: false,
        }
    });
    let isTransitionPageLoad = (data) => ({
        action: {
            actionType: SpendingsConstants.REQUEST_TRANSACTIONS_ON_SORT,
            data: false,
        }
    });
    
     let isNetworkError = (data) => ({
        action: {
            actionType: SpendingsConstants.REQUEST_TRANSACTIONS_ON_SORT,
            data: false,
        }
    });
     let isNetworkError1 = (data) => ({
        action: {
            actionType: SpendingsConstants.REQUEST_BUDGET_CONNECTION_ERROR,
            data: false,
        }
    });
     let isNetworkError11 = (data) => ({
        action: {
            actionType: SpendingsConstants.REQUEST_BUDGET_CONNECTION_ERROR,
            data: true,
        }
    });
    let emitChange = (data) => ({
        action: {
            actionType: SpendingsConstants.REQUEST_ALL_ACCOUNTS_ERROR,
            data: false,
        }
    });
    let _hasBudgetPreferencesError = (data) => ({
        action: {
            actionType: SpendingsConstants.REQUEST_BUDGET_PREFERENCES_CONNECTION_SUCCESS,
            data: true,
        }
    });
     let isEarningPage1 = (data) => ({
        action: {
            actionType: SpendingsConstants.REQUEST_EARNING_PAGE,
            data: true,
        }
    });
    let isError = (data) => ({
        action: {
            data: true,
        }
    });
    let isLoadPage = (data) => ({
        action: {
            data: true,
        }
    });
    let _transactionsTagName = (data) => ({
        action: {
             actionType: SpendingsConstants.REQUEST_TRANSACTIONS,
            data: true,
        }
    });
    
     let isEarningPage = (data) => ({
        action: {
             actionType: SpendingsConstants.REQUEST_POT_DATA_SPENDINGS,
             data: false,
        }
    });
    let isEarningPage12 = (data) => ({
        action: {
             actionType: SpendingsConstants.REQUEST_POT_DATA_SPENDINGS_SUCCESS,
             data: false,
        }
    });
     let isEarningPage11 = (data) => ({
        action: {
             actionType: SpendingsConstants.REQUEST_POT_DATA_SPENDINGS_SUCCESS,
             data: 3,
        }
    });
     let getmonthlyContributionPots = (data) => ({
        action: {
             actionType: SpendingsConstants.REQUEST_POT_DATA_SPENDINGS_SUCCESS,
             data,
        }
    });
    let isEarningPage123 = (data) => ({
        action: {
             actionType: SpendingsConstants.REQUEST_POT_DATA_SPENDINGS_ERROR,
             data: false,
        }
    });
    let updatedCreateBudgetData = (data) => ({
        action: {
             actionType: SpendingsConstants.UPDATED_CREATE_BUDGET_DATA,
             data: false,
        }
    });
    let hasBudgetPreferences = (data) => ({
        action: {
             actionType: SpendingsConstants.UPDATE_BUDGET_PREFERENCES_CONNECTION,
             data: false,
        }
    });
     let hasBudgetPreferences1 = (data) => ({
        action: {
             actionType: SpendingsConstants.UPDATE_BUDGET_PREFERENCES_CONNECTION_ERROR,
             data: false,
        }
    });
     let hasBudgetPreferences12 = (data) => ({
        action: {
             actionType: SpendingsConstants.REQUEST_TRANSACTIONS_ERROR,
             data: false,
        }
    });
     let hasBudgetPreferences123 = (data) => ({
        action: {
             actionType: SpendingsConstants.UPDATED_CREATE_BUDGET_DATA,
             data: false,
        }
    });
    let hasBudgetPreferences11 = (data) => ({
        action: {
             actionType: SpendingsConstants.REQUEST_SPENDING_PAGE_ON_BACK,
             data,
        }
    });
     let hasBudgetPreferences112 = (data) => ({
        action: {
             actionType: SpendingsConstants.REQUEST_SPEND_LIST_CONNECTION_ERROR,
             data: false,
        }
    });
    let hasBudgetPreferences111 = (data) => ({
        action: {
             actionType: SpendingsConstants.REQUEST_TAG_LIST_CONNECTION,
             data: false,
        }
    });    
    //  let createBudgetPageData = (data) => ({
    //     action: {
    //          actionType: SpendingsConstants.REQUEST_TAG_LIST_CONNECTION,
    //          data: false,
    //     }
    // });    
        
    
    describe('Unit Test Case 1 : get requestAccountsListSuccess cases', () => {
        let _accountID;
        let data = {
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
                        "/account/pots": true,
                        "/account/transactions/read": true
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
                        "/account/pots": false
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
                        "/account/pots": false
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
                        "/account/pots": false
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
                        "/account/pots": false
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
                        "/account/pots": false
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
                        "/account/pots": false
                    }
                }
            ]
        };
        let _accountList;
        callback(requestAccountsListSuccess(data));
        _accountID = AccountsStore.getAll();
        it('should be equal to data', () => {
            expect(SpendingsUtils.getSpendListConnectionData.mock.calls.length).toBe(5);
        });

    });
    // describe('Unit Test Case 2.1 : get requestAccountsListSuccess Else cases', () => {
    //     let _accountID;
    //     let data = false;
    //     callback(createBudgetPageData(data));
    //     _accountID = SpendingsStore.createBudgetPageData();    
       
    // });
    
    // describe('Unit Test Case 2.1 : get requestAccountsListSuccess Else cases', () => {
    //     let _accountID;
    //     let data = false;
    //     callback(updatedCreateBudgetData(data));
    //     _accountID = SpendingsStore.updatedCreateBudgetData();
       
       
    // });
      describe('Unit Test Case 2.1 : get requestAccountsListSuccess Else cases', () => {
        let _accountID;
        let data = false;
        callback(hasBudgetPreferences111(data));
        _accountID = SpendingsStore.emitChange();
       
       
    });
      describe('Unit Test Case 2.1 : get requestAccountsListSuccess Else cases', () => {
        let _accountID;
        let data = false;
        callback(hasBudgetPreferences112(data));
        _accountID = SpendingsStore.emitChange();
       
       
    });
     describe('Unit Test Case 2.1 : get requestAccountsListSuccess Else cases', () => {
        let _accountID;
        let data = false;
        callback(hasBudgetPreferences11(data));
        _accountID = SpendingsStore.emitChange();
       
        
    });
     describe('Unit Test Case 2.1 : get requestAccountsListSuccess Else cases', () => {
        let _accountID;
        let data = 'from-createbudget';
        callback(hasBudgetPreferences11('from-createbudget'));
        // _accountID = SpendingsStore.emitChange();
       
        
    });
     describe('Unit Test Case 2.1 : get requestAccountsListSuccess Else cases', () => {
        let _accountID;
        let data = false;
        callback(hasBudgetPreferences123(data));
        _accountID = SpendingsStore.emitChange();
       
        
    });
    describe('Unit Test Case 2.1 : get requestAccountsListSuccess Else cases', () => {
        let _accountID;
        let data = false;
        callback(hasBudgetPreferences12(data));
        _accountID = SpendingsStore.emitChange();
       
       
    });

     describe('Unit Test Case 2.1 : get requestAccountsListSuccess Else cases', () => {
        let _accountID;
        let data = false;
        callback(hasBudgetPreferences1(data));
        _accountID = SpendingsStore.emitChange();
       
       
    });
    describe('Unit Test Case 2.1 : get requestAccountsListSuccess Else cases', () => {
        let _accountID;
        let data = false;
        callback(hasBudgetPreferences(data));
        _accountID = SpendingsStore.hasBudgetPreferences();
       
      
    });
    
    describe('Unit Test Case 2.1 : get requestAccountsListSuccess Else cases', () => {
        let _accountID;
        let data = false;
        callback(isEarningPage123(data));
        _accountID = SpendingsStore.isEarningPage();
        let result = SpendingsStore.spendingPageToLoad();
        it('should be equal to data 111', () => {
            expect(result).toBe(1)
        });
    });
     describe('Unit Test Case 2.1 : get requestAccountsListSuccess Else cases', () => {
        let _accountID;
        let data = false;
        callback(isEarningPage12(data));
        _accountID = SpendingsStore.isEarningPage();
      
    });
     describe('Unit Test Case 2.1 : get requestAccountsListSuccess Else cases', () => {
        let _accountID;
        let data = 3;
        callback(isEarningPage11(3));
        _accountID = SpendingsStore.spendingPageToLoad ();
      
    });
    describe('Unit Test Case 2.1 : get requestAccountsListSuccess Else cases', () => {
        let _accountID;
        let data = false;
        callback(isEarningPage(data));
        _accountID = SpendingsStore.isEarningPage();
       
    });
  
    
    describe('Unit Test Case 2.1 : get requestAccountsListSuccess Else cases', () => {
        let _accountID;
        let data = false;
        callback(isNetworkError1(data));
        _accountID = SpendingsStore.isNetworkError();
       
    });
    describe('Unit Test Case 2.1 : get requestAccountsListSuccess Else cases', () => {
        let _accountID;
        let data = true;
        callback(isNetworkError11(data));
        _accountID = SpendingsStore.isNetworkError();
       
    });
     describe('Unit Test Case 2.1 : get requestAccountsListSuccess Else cases', () => {
        let _accountID;
        let data = {

        };
        callback(_transactionsTagName(data));
        _accountID = SpendingsStore.transactionsTagName();
       
    });
     describe('Unit Test Case 2.1 : get requestAccountsListSuccess Else cases', () => {
        let _accountID;
        let data = {

        };
        let _accountList;
        callback(isLoadPage(data));
        _accountID = SpendingsStore.isLoadPage();
        
    });
      describe('Unit Test Case 2.1 : get requestAccountsListSuccess Else cases', () => {
        let _accountID;
        let data = {

        };
        let _accountList;
        callback(isError(data));
        _accountID = SpendingsStore.isError();
       
    });
        describe('Unit Test Case 2.1 : get requestAccountsListSuccess Else cases', () => {
        let _accountID;
        let data = {

        };
        let _accountList;
        callback(emitChange(data));
        _accountID = SpendingsStore.emitChange();
       
    });
     describe('Unit Test Case 2.1 : get requestAccountsListSuccess Else cases', () => {
        let _accountID;
        let data = {

        };
        let _accountList;
        callback(spendingPageToLoad1(data));
        _accountID = SpendingsStore.spendingPageToLoad();
        
    });
    describe('Unit Test Case 2.1 : get requestAccountsListSuccess Else cases', () => {
        let _accountID;
        let data = {

        };
        let _accountList;
        callback(_hasBudgetPreferencesError(data));
        _accountID = SpendingsStore.hasBudgetPreferencesError();
        
    });
     describe('Unit Test Case 2.1 : get requestAccountsListSuccess Else cases', () => {
        let _accountID;
        let data = {

        };
        let _accountList;
        callback(isNetworkError(data));
        _accountID = SpendingsStore.isNetworkError();
       
    });
     describe('Unit Test Case 2.1 : get requestAccountsListSuccess Else cases', () => {
        let _accountID;
        let data = {

        };
        let _accountList;
        callback(transactionPageSize(data));
        _accountID = SpendingsStore.transactionPageSize();
        
    });
     describe('Unit Test Case 2.1 : get requestAccountsListSuccess Else cases', () => {
        let _accountID;
        let data = {

        };
        let _accountList;
        callback(isTransitionPageLoad(data));
        _accountID = SpendingsStore.isTransitionPageLoad();
       
    });
    describe('Unit Test Case 2.1 : get requestAccountsListSuccess Else cases', () => {
        let _accountID;
        let data = {

        };
        let _accountList;
        callback(isAccountModal(data));
        _accountID = SpendingsStore.isAccountModal();
        
    });
    describe('Unit Test Case 2.1 : get requestAccountsListSuccess Else cases', () => {
        let _accountID;
        let data = {

        };
        let _accountList;
        callback(isAccountModal1(data));
        _accountID = SpendingsStore.isAccountModal();
      
    });
    describe('Unit Test Case 2.1 : get requestAccountsListSuccess Else cases', () => {
        let _accountID;
        let data = {

        };
        let _accountList;
        callback(getAll(data));
        _accountID = SpendingsStore.getAll();
       
    });
      describe('Unit Test Case 2.2 : get requestAccountsListSuccess Else cases', () => {
        let _accountID;
        let data = {

        };
        let _accountList;
        callback(isBudgetSuccess(data));
        _accountID = SpendingsStore.isBudgetSuccess();
        
    });

     describe('Unit Test Case 2.2 : get requestAccountsListSuccess Else cases', () => {
        let _accountID;
        let data = {

        };
        let _accountList;
        callback(isBudgetSuccess(data));
        _accountID = SpendingsStore.isBudgetSuccess();
       
    });
    describe('Unit Test Case 2.1 : get requestAccountsListSuccess Else cases', () => {
        let _accountID;
        let data = {

        };
        let _accountList;
        callback(getAll(data));
        _accountID = SpendingsStore.getAll();
       
    });
    describe('Unit Test Case 2 : get requestAccountsListSuccess Else cases', () => {
        let _accountID;
        let data = {

        };
        let _accountList;
        callback(spendingPageToLoad(data));
        _accountID = SpendingsStore.spendingPageToLoad();
       
    });
     describe('Unit Test Case 2 : get requestAccountsListSuccess Else cases', () => {
        let _accountID;
        let data = {

        };
        let _accountList;
        callback(requestAccountsListSuccess1(data));
        _accountID = AccountsStore.getAll();
       
    });

    describe('Unit Test Case 3 : get budgetPreferenceConnection test cases', () => {
        let result;
        let data = false;
        callback(budgetPreferenceConnection(data));
        result = SpendingsStore.getBudgetPreferencesConnectionData();
        it('should be equal to data', () => {
            expect(result).toEqual(true);
        });
    });

    describe('Unit Test Case 4 : addChangeListener', () => {
        const props = {
            content: {
            },
        };
        it('calls for the addChangeListener', () => {
            SpendingsStore.addChangeListener(jest.fn())
            expect(EventEmitter.listenerCount.length).toBe(2);
        });

    });
    describe('Unit Test Case 5 : get isSpendingPage test cases', () => {
        let result;
        let data = false;
        callback(updatedAccountIds(data));
        result = SpendingsStore.updatedAccountIds();
        it('should be equal to data', () => {
            expect(result).toEqual([]);
        });
    });

   
    describe('Unit Test Case 5 : get isSpendingPage test cases : []', () => {
        let result;
        let data = ['Hello'];
        callback(updatedAccountIds(data));
        result = SpendingsStore.updatedAccountIds();
        it('should be equal to data', () => {
            expect(result).toEqual([]);
        });
    });

    
    describe('Unit Test Case 12 : getSpendListConnectionData : Pummy', () => {
        let result;
        callback(_getSpendListConnectionData(props.spendListData));
        callback(getBudgetConnection(props.budgetData));
        callback(getTagListConnectionData(props.tagList));
        result = SpendingsStore.getSpendListConnectionData();
        it('should be equal to data', () => {
            expect(result.other_accounts[0].key).toBe('4a3136d9-07fe-48e0-bc1d-d9a7749b3d2f');
        });
    });

    describe('Unit Test Case 12.1 : spendMonthPageData : Pummy', () => {
        let result;
        callback(_getSpendListConnectionData(props.spendListData));
        result = SpendingsStore.spendMonthPageData();
        it('should be equal to data', () => {
            expect(result.spendPageSortedData[0].key).toBe('19');
        });
    });

    describe('Unit Test Case 12.2 : spendMonthPageData : Pummy', () => {
        let result;
        props.spendListData = {
          "aggregations": {
            "other_accounts": {},
            "credit_cards": {}
          }
        };
        callback(_getSpendListConnectionData(props.spendListData));
        result = SpendingsStore.spendMonthPageData();
        it('should be equal to data', () => {
            expect(result.spendPageSortedData[0].key).toBe(1);
        });
    });

    describe('Unit Test Case 12.3 : getAll : Pummy', () => {
        let result;
        callback(getAllData(props.accountList));
        result = SpendingsStore.getAll();
        it('should be equal to data', () => {
            expect(result.accounts.length).toBe(6);
        });
    });

    describe('Unit Test Case 12.4 : getBudgetConnectionData : Pummy', () => {
        let result;
        callback(budgetDataSuccess(props.budgetData));
        result = SpendingsStore.getBudgetConnectionData();
        it('should be equal to data', () => {
            expect(result[0].key).toBe('4a3136d9-07fe-48e0-bc1d-d9a7749b3d2f');
        });
    });

    

    

    describe('Unit Test Case 13 : get isSpendingPage test cases', () => {
        let result;
        let data = false;
        callback(isTransactionPage(data));
        result = SpendingsStore.isTransactionPage();
        it('should be equal to data', () => {
            expect(result).toEqual(false);
        });
    });

    describe('Unit Test Case 14 : removeChangeListener', () => {
        const props = {

        };
        it('calls for the removeChangeListener', () => {
            let node = document.createElement('div');
            const render = (comp, el) => ReactDOM.render(comp, el);
            //component = ReactDOM.render(<NBAStore />, node);
            SpendingsStore.removeChangeListener(jest.fn())
            expect(EventEmitter.listenerCount.length).toBe(2);
        });
    });

    
    describe('Unit Test Case 16 : get getBudgetConnection test cases', () => {
        let result;
        let data = false;
        callback(getBudgetConnection(data));
        result = SpendingsStore.getBudgetConnectionData();
        it('should be equal to data', () => {
            expect(result[0].key).toEqual('4a3136d9-07fe-48e0-bc1d-d9a7749b3d2f');
        });
    });

    describe('Unit Test Case 17 : get isCreateBudgetPage test cases', () => {
        let result;
        let data = false;
        callback(isCreateBudgetPage(data));
        result = SpendingsStore.isCreateBudgetPage();
        it('should be equal to data', () => {
            expect(result).toEqual(false);
        });
    });

    describe('Unit Test Case 18 : get isCreateBudgetPage test cases', () => {
        let result;
        let data = false;
        callback(getBudgetPreferencesConnectionData(data));
        result = SpendingsStore.isCreateBudgetPage();
        it('should be equal to data', () => {
            expect(result).toEqual(false);
        });
    });
    describe('Unit Test Case 18 : get isCreateBudgetPage test cases', () => {
        let result;
        let data = true;
        callback(getBudgetPreferencesConnectionData1(data));
        result = SpendingsStore.isCreateBudgetPage();
        it('should be equal to data', () => {
            expect(result).toEqual(false);
        });
    });
    describe('Unit Test Case 19 : get isCreateBudgetPage test cases', () => {
        let result;
        let data = true;
        callback(getBudgetPreferencesConnectionDa(data));
        result = SpendingsStore.isCreateBudgetPage();
        it('should be equal to data', () => {
            expect(result).toEqual(false);
        });
    });
 
    describe('Unit Test Case 27 : get isSpendingPage test cases', () => {
        let result;
        let data = false;
        callback(isEarningPage1(data));
        result = SpendingsStore.isEarningPage();
        it('should be equal to data', () => {
            expect(result).toEqual(true);
        });

    });
    describe('Unit Test Case 27 : get isSpendingPage test cases', () => {
        let result;
        let data = false;
        callback(_showAccountModalSpend(data));
        result = SpendingsStore.isEarningPage();
        it('should be equal to data', () => {
            expect(result).toEqual(true);
        });

    });
    describe('Unit Test Case 28 : get isSpendingPage test cases', () => {
        let result;
        let data = false;
        callback(showAccountModalSpend(data));
        result = SpendingsStore.isEarningPage();
        it('should be equal to data', () => {
            expect(result).toEqual(true);
        });
    });
    describe('Unit Test Case 29 : get isSpendingPage test cases', () => {
        let result;
        let data = false;
        callback(showAccountModalTag(data));
        result = SpendingsStore.isEarningPage();
        it('should be equal to data', () => {
            expect(result).toEqual(true);
        });

    });
    describe('Unit Test Case 30 : get isSpendingPage test cases', () => {
        let result;
        let data = false;
        callback(showAccountModalTag1(data));
        result = SpendingsStore.isEarningPage();
        it('should be equal to data', () => {
            expect(result).toEqual(true);
        });
    });
    describe('Unit Test Case 31 : get isSpendingPage test cases', () => {
        let result;
        let data = false;
        callback(showAccountModalBudget(data));
        result = SpendingsStore.isEarningPage();
        it('should be equal to data', () => {
            expect(result).toEqual(false);
        });

    });
    describe('Unit Test Case 32 : get isSpendingPage test cases', () => {
        let result;
        let data = false;
        callback(showAccountModalBudget1(data));
        result = SpendingsStore.isEarningPage();
        it('should be equal to data', () => {
            expect(result).toEqual(false);
        });
    });
    describe('Unit Test Case 33 : get isSpendingPage test cases', () => {
        let result;
        let data;
        callback(Updatebudgetconnection(data));
        result = SpendingsStore.getBudgetConnectionData();
        it('should be equal to data', () => {
            expect(result).toEqual([]);
        });
    });
     describe('Unit Test Case 34 : get isSpendingPage test cases', () => {
        let result;
        let data;
        callback(Updatebudgetconnections(data));
        result = SpendingsStore.getBudgetConnectionData();
        it('should be equal to data', () => {
            expect(result).toEqual([]);
        });
    });
    describe('Unit Test Case 34 : get isSpendingPage test cases', () => {
        let result;
        let data;
        callback(Updatebudgetconnections(data));
        result = SpendingsStore.getBudgetConnectionData();
        it('should be equal to data', () => {
            expect(result).toEqual([]);
        });
    });
    describe('Unit Test Case 35 : get isSpendingPage test cases', () => {
        let result;
        let data;
        callback(UpdateBudgetconnectionsError(data));
        result = SpendingsStore.getBudgetConnectionData();
        it('should be equal to data', () => {
            expect(result).toEqual([]);
        });
    });
      describe('Unit Test Case 35 : get isSpendingPage test cases', () => {
        let result;
        let data = false;
        callback(UpdateBudgetconnectionsError1(data));
        result = SpendingsStore.isNetworkError ();
        it('should be equal to data', () => {
            expect(result).toEqual(true);
        });
        
    });
    describe('Unit Test Case 36 : get isSpendingPage test cases', () => {
        let result;
        let data;
        callback(UpdateBudgetconnectionsPreferences(data));
        result = SpendingsStore.getBudgetConnectionData();
        it('should be equal to data', () => {
            expect(result).toEqual([]);
        });
    });
 
    describe('Unit Test Case 38 : get isSpendingPage test cases', () => {
        let result;
        let data = false;
        callback(getTagListConnectionData(data));
        result = SpendingsStore.getTagListConnectionData();
        it('should be equal to data', () => {
            expect(result).toEqual([]);
        });
    });

    describe('Unit Test Case 12.5 : getmonthlyContributionPots : Pummy', () => {
        let result;
        let potDataSpending = {
              pot :{
              schedule: { 
                recurrence: {
                    amount: {
                      value : 1000,
                    }
                }
              }
            }
            }
        callback(getmonthlyContributionPots(potDataSpending));
        result = SpendingsStore.getmonthlyContributionPots();
        it('should be equal to data', () => {
            expect(result).toBe(0);
        });
    });

    describe('Unit Test Case 39 : spendBudgetPageData : Pummy', () => {
        let result;
        callback(_getSpendListConnectionData(props.spendListData));
        callback(getBudgetConnection(props.budgetData));
        callback(getTagListConnectionData(props.tagList));
        result = SpendingsStore.spendBudgetPageData();
        it('should be equal to data', () => {
            expect(result[0].key).toBe(1);
        });
    });

    describe('Unit Test Case 40 : spendBudgetPageData : Pummy', () => {
        let result;
        callback(getTransactionDetails(props.transactionListData));
        callback(getAllData(props.accountList));
        result = SpendingsStore.getTransactionDetails();
        it('should be equal to data', () => {
            expect(result.tableData[0].description).toBe('RBS Edinburgh');
        });
    });



});
