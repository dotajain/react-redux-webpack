jest.unmock('../SpendingsLandingScreen');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const moment = require('moment');
const SpendingsLandingScreen = require('../SpendingsLandingScreen');
const SpendingsStore = require('../../../stores/SpendingsStore');

let component;
let props;
let instance;

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<SpendingsLandingScreen
						   {...props}
						/>);
	return shallowRenderer.getRenderOutput();
};

describe('SpendingsLandingScreen Test Cases', () => {

	beforeEach(()=>{
		props = {
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
			earningsError : true,
			earnings:{
				period : {
					net_income:{
						value : null
					}
				}
			},
    		budgetPageData: {
    			  "target_amount" : 50,
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
				    },
				     {
				      "tag": {
				        "value": "Hello",
				        "id": "4a3136d9-07fe-48e0-bc1d-d9a7749b3d2g",
				        "archived": false,
				        "path" : true
				      },
				      "target_amount": {
				        "value": 50.0,
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
    		transactionListData: {},
    		isTransactionPage: true,
    		accountList :{},
    		hasBudgetData : true,
    		isEarningPage : true,
    		isCreateBudgetPage : true,
    		loadSpendingPage: true,
		}
		let monthPageData = {
			monthPageData : {
				spendPageSortedData : '',
				last_month : '',
				current_month : '',
			}
		};
		let spendListData = {
			spendListData : {
				earningValueFromSpend : '',
			}
		}
		SpendingsStore.spendMonthPageData.mockReturnValue(monthPageData);
		SpendingsStore.spendBudgetPageData.mockReturnValue(props.budgetPageData);
		SpendingsStore.getSpendListConnectionData.mockReturnValue(spendListData);
		component = shallowRender(props);
		instance = TestUtils.renderIntoDocument(<SpendingsLandingScreen {...props}/>);

	});

	it('Test Case : 1 : check ToBedefined',()=>{
			expect(component).toBeDefined();
	});

	it('Test Case : 2 : check ToBedefined',()=>{
			props = {
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
    		transactionListData: {},
    		isTransactionPage: true,
    		accountList :{},
    		hasBudgetData : true,
    		isEarningPage : true,
    		isCreateBudgetPage : true,
    		loadSpendingPage: true,
		}	
			component = shallowRender(props);
			expect(component).toBeDefined();
	});

	it('Test Case : 3 : check ToBedefined',()=>{
			props = {
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
    		budgetData: {},
    		spendListData:{

				  "aggregations": {
				    "other_accounts": {
				      "tags": {
				        "buckets": [
				          {
				            "key": "4a3136d9-07fe-48e0-bc1d-d9a7749b3d2f",
				            "doc_count": 5,
				            "month": {
				              "buckets": []
				            },
				          }
				        ]
				      },
				      "categories": {
				        "buckets": [
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
				              "buckets": []
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
				        ]
				      }
				    }
				  }
    		},
    		tagList : {},
    		transactionListData: {},
    		isTransactionPage: true,
    		accountList :{},
    		hasBudgetData : true,
    		isEarningPage : true,
    		isCreateBudgetPage : true,
    		loadSpendingPage: true,
		}	
			component = shallowRender(props);
			expect(component).toBeDefined();
	});

	it('Test Case : 4 : check isCreateBudgetPage',()=>{
			props.isCreateBudgetPage = false;
			instance = TestUtils.renderIntoDocument(<SpendingsLandingScreen {...props}/>);
			expect(instance.props.isCreateBudgetPage).toBe(false);
	});

	it('Test Case : 5 : check isEarningPage',()=>{
			props.isCreateBudgetPage = false;
			props.isEarningPage = false;
			instance = TestUtils.renderIntoDocument(<SpendingsLandingScreen {...props}/>);
			expect(instance.props.isCreateBudgetPage).toBe(false);
			expect(instance.props.isEarningPage).toBe(false);			
	});

	it('Test Case : 6 : check isTransactionPage',()=>{
			props.isCreateBudgetPage = false;
			props.isEarningPage = false;
			props.isTransactionPage = false;
			instance = TestUtils.renderIntoDocument(<SpendingsLandingScreen {...props}/>);
			expect(instance.props.isCreateBudgetPage).toBe(false);
			expect(instance.props.isEarningPage).toBe(false);	
			expect(instance.props.isTransactionPage).toBe(false);		
	});

	it('Test Case : 7 : check tagList',()=>{
			props.tagList  =  {
					  "tags": [
					    {
					      "value": "Earnings",
					      "id": "4a3136d9-07fe-48e0-bc1d-d9a7749b3d2f",
					      "archived": false
					    }
					  ],
				}
			instance = TestUtils.renderIntoDocument(<SpendingsLandingScreen {...props}/>);
			expect(instance.props.tagList.tags[0].value).toBe('Earnings');
	});

	it('Test Case : 8 : check budgetData',()=>{
			props.budgetData = {
				  "tag_budgets": [
				    {
				      "tag": {
				        "value": "Earnings",
				        "id": "4a3136d9-07fe-48e0-bc1d-d9a7749b3d2f",
				        "archived": false,
				      },
				      "target_amount": {
				        "value": 40.0,
				        "currency": "GBP"
				      }
				    }
				  ],
				}
			instance = TestUtils.renderIntoDocument(<SpendingsLandingScreen {...props}/>);
			expect(instance.props.budgetData.tag_budgets[0].tag.value).toBe('Earnings');
	});
	
	it('Test Case : 9 : check budgetData path',()=>{
			props.budgetData = {
				  "tag_budgets": [
				    {
				      "tag": {
				        "value": "Shoes",
				        "id": "4a3136d9-07fe-48e0-bc1d-d9a7749b3d2f",
				        "archived": false,
				        "path": false,
				      },
				      "target_amount": {
				        "value": 40.0,
				        "currency": "GBP"
				      }
				    }
				  ],
				}
			instance = TestUtils.renderIntoDocument(<SpendingsLandingScreen {...props}/>);
			expect(instance.props.budgetData.tag_budgets[0].tag.path).toBe(false);
	});

	it('Test Case : 10 : check budgetData path',()=>{
			props.budgetData = {
				  "tag_budgets": [
				    {
				      "tag": {
				        "value": "Shoes",
				        "id": "4a3136d9-07fe-48e0-bc1d-d9a7749b3d2f",
				        "archived": false,
				        "path": false,
				      },
				      "target_amount": {
				        "value": 40.0,
				        "currency": "GBP"
				      }
				    }
				  ],
				}
			instance = TestUtils.renderIntoDocument(<SpendingsLandingScreen {...props}/>);
			expect(instance.props.budgetData.tag_budgets[0].tag.path).toBe(false);
	});

	it('Test Case : 11 : check category_budgets path',()=>{
			props.budgetData = {
				  "category_budgets": [
				    {
				      "category": {
				        "value": "Entertainment",
				        "path": false,
				        "scheme": "NAG Categories",
				        "id": 2,
				        "archived": false
				      },
				      "target_amount": {
				        "value": 30.0,
				        "currency": "GBP"
				      }
				    },
				    ]
				}
			instance = TestUtils.renderIntoDocument(<SpendingsLandingScreen {...props}/>);
			expect(instance.props.budgetData.category_budgets[0].category.path).toBe(false);
	});

	it('Test Case : 12 : check category_budgets path',()=>{
			props.spendListData = {
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
				                  "key_as_string": moment(moment().format('YYYY-MM')).subtract(1, 'months').format('YYYY-MM'),
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
				              ]
				            },
				            "tag_name": {
				              "buckets": [
				                {
				                  "key": "Shoes"
				                }
				              ]
				            }
				          }
				        ]
				      },
					}
				}
			}
			instance = TestUtils.renderIntoDocument(<SpendingsLandingScreen {...props}/>);
			expect(instance.props.spendListData.aggregations.other_accounts.tags.buckets[0].month.buckets[0].key_as_string).toBe(
				moment(moment().format('YYYY-MM')).subtract(1, 'months').format('YYYY-MM'));
	});


	it('Test Case : 13 : check tag_name',()=>{
			props.spendListData = {
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
				                  "key_as_string": moment(moment().format('YYYY-MM')).subtract(1, 'months').format('YYYY-MM'),
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
				              ]
				            },
				            "cat_name": 'Hello'
				          }
				        ]
				      },
					}
				}
			}
			instance = TestUtils.renderIntoDocument(<SpendingsLandingScreen {...props}/>);
			expect(instance.props.spendListData.aggregations.other_accounts.tags.buckets[0].cat_name).toBe('Hello');
	});	

	it('Test Case : 14 : check cat_name',()=>{
			props.spendListData = {
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
				                  "key_as_string": moment(moment().format('YYYY-MM')).subtract(1, 'months').format('YYYY-MM'),
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
					}
				}
			}
			instance = TestUtils.renderIntoDocument(<SpendingsLandingScreen {...props}/>);
			expect(instance.props.spendListData.aggregations.other_accounts.tags.buckets[0].tag_name.buckets[0].key).toBe('Shoes');
	});	

	it('Test Case : 15 : check creditCardSpends',()=>{
			props.spendListData = {
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
				                  "key_as_string": "2016-05-01T00:00:00.000+01:00",
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
				                  "key_as_string": moment().format('YYYY-MM'),
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
				        ]
				      }
				    }
				  }
				};
			instance = TestUtils.renderIntoDocument(<SpendingsLandingScreen {...props}/>);
			expect(instance.props.spendListData.aggregations.credit_cards.categories.buckets[0].tag_name.buckets[0].key).toBe(
				'Pets');
	});	
	
	it('Test Case : 16 : check creditCardSpends Else',()=>{
			props.spendListData = {
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
				                  "key_as_string": "2016-05-01T00:00:00.000+01:00",
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
				                  "key_as_string": moment().format('YYYY-MM'),
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
				            "tag_name": '',
				            "cat_name": ''
				          },
				        ]
				      }
				    }
				  }
				};
			instance = TestUtils.renderIntoDocument(<SpendingsLandingScreen {...props}/>);
			expect(instance.props.spendListData.aggregations.credit_cards.categories.buckets[0].tag_name).toBe(
				'');
	});	

	it('Test Case : 17 : check creditCardSpends lastmonth',()=>{
			props.spendListData = {
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
				                  "key_as_string": "2016-05-01T00:00:00.000+01:00",
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
				                  "key_as_string": moment(moment().format('YYYY-MM')).subtract(1, 'months').format('YYYY-MM'),
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
				        ]
				      }
				    }
				  }
				};
			instance = TestUtils.renderIntoDocument(<SpendingsLandingScreen {...props}/>);
			expect(instance.props.spendListData.aggregations.credit_cards.categories.buckets[0].tag_name.buckets[0].key).toBe(
				'Pets');
	});	

	it('Test Case : 18 : check creditCardSpends lastmonth Else',()=>{
			props.spendListData = {
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
				                  "key_as_string": "2016-05-01T00:00:00.000+01:00",
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
				                  "key_as_string": moment(moment().format('YYYY-MM')).subtract(1, 'months').format('YYYY-MM'),
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
				            "tag_name": '',
				            "cat_name": ''
				          },
				        ]
				      }
				    }
				  }
				};
			instance = TestUtils.renderIntoDocument(<SpendingsLandingScreen {...props}/>);
			expect(instance.props.spendListData.aggregations.credit_cards.categories.buckets[0].tag_name).toBe(
				'');
	});

	it('Test Case : 19 : check creditCardSpends cat_name Else',()=>{
			props.spendListData = {
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
				                  "key_as_string": "2016-05-01T00:00:00.000+01:00",
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
				            "tag_name": '',
				            "cat_name": ''
				          },
				        ]
				      }
				    }
				  }
				};
			instance = TestUtils.renderIntoDocument(<SpendingsLandingScreen {...props}/>);
			expect(instance.props.spendListData.aggregations.credit_cards.categories.buckets[0].tag_name).toBe(
				'');
	});
	
	it('Test Case : 20 : check budgetData map',()=>{
			props.budgetData = {
				  "tag_budgets": [
				    {
				      "tag": {
				        "value": "Shoes",
				        "id": "1",
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
				};
			props.spendListData = {
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
				                  "key_as_string": "2016-05-01T00:00:00.000+01:00",
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
				            "key": "1",
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
				            "tag_name": '',
				            "cat_name": ''
				          },
				        ]
				      }
				    }
				  }
				};
			instance = TestUtils.renderIntoDocument(<SpendingsLandingScreen {...props}/>);
			expect(instance.props.spendListData.aggregations.credit_cards.categories.buckets[0].key).toBe(
				instance.props.budgetData.tag_budgets[0].tag.id);
	});
	
	it('Test Case : 21 : check tagList map',()=>{
			props.tagList  = {
				  "tags": [
				    {
				      "value": "Shoes",
				      "id": "1",
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
				};
			props.spendListData = {
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
				                  "key_as_string": "2016-05-01T00:00:00.000+01:00",
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
				            "key": "1",
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
				            "tag_name": '',
				            "cat_name": ''
				          },
				        ]
				      }
				    }
				  }
				};
			instance = TestUtils.renderIntoDocument(<SpendingsLandingScreen {...props}/>);
			expect(instance.props.spendListData.aggregations.credit_cards.categories.buckets[0].key).toBe(
				instance.props.tagList.tags[0].id);
	});
	
	it('Test Case : 22 : check potValue',()=>{
		instance.setState({
			potValue : 100
		});
		expect(instance.state.potValue).toBe(100);
	});

	it('Test Case : 23 : check budgetData map',()=>{
			props.budgetData = [
				{
				"target_amount": 40.0
				},{
				"target_amount": 50.0
				},{
				"target_amount": 60.0
				}
			];
			props.spendListData = {
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
				                  "key_as_string": "2016-05-01T00:00:00.000+01:00",
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
				            "key": "1",
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
				            "tag_name": '',
				            "cat_name": ''
				          },
				        ]
				      }
				    }
				  }
				};
			instance = TestUtils.renderIntoDocument(<SpendingsLandingScreen {...props}/>);
			instance.setState({
				budgetPageData : props.budgetData,
			})
			expect(instance.state.budgetPageData.target_amount).toBe();
	});

});