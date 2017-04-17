jest.unmock('../CreateSavingsPot');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const moment = require('moment');
const DateTimeField = require('react-bootstrap-datetimepicker');
const _ = require('lodash');
const CreateSavingsPot = require('../CreateSavingsPot');
const PotMessages = require('../PotMessages');
const AccountsStore = require('../../../stores/AccountsStore');
const SavingPotsActionCreator = require('../../../actions/SavingPotsActionCreator');
const SavingsPotsStore = require('../../../stores/SavingsPotsStore');

let component;
let props;
let accountsList;
let seletedAccountData;
let disabledVal;
let instance;

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<CreateSavingsPot
						   {...props}
						/>);
	return shallowRenderer.getRenderOutput();
};

describe('CreateSavingsPot Test Cases', () => {

	beforeEach(() => {	
		props = {
			content:{
			},
			pots:[
				    {
				      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
				      "name": "Family Holiday",
				      "reference": "Reference",
				      "balance": {
				        "value": "1200.0",
				        "currency": "GBP"
				      },
				      "goal": {
				        "amount": {
				          "value": "18000.0",
				          "currency": "GBP"
				        },
				        "when": "2017-08-16"
				      },
				      "schedule": {
				        "recurrence": {
				          "frequency": {
				            "monthly": {
				              "interval": "1",
				              "day_of_month": "1"
				            }
				          },
				          "amount": {
				            "value": "270.0",
				            "currency": "GBP"
				          }
				        },
				        "next_payment": {
				          "when": "2016-05-19",
				          "amount": {
				            "value": "270.0",
				            "currency": "GBP"
				          }
				        }
				      }
				    }
				  ],
				  "unallocated_amount": {
				    "value": "8818.9",
				    "currency": "GBP"
				  },
			potDetailsData :
				    {
				      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
				      "name": "Family Holiday",
				      "reference": "Reference",
				      "balance": {
				        "value": "1200.0",
				        "currency": "GBP"
				      },
				      "goal": {
				        "amount": {
				          "value": "18000.0",
				          "currency": "GBP"
				        },
				        "when": "2017-08-16"
				      },
				      "schedule": {
				        "recurrence": {
				          "frequency": {
				            "monthly": {
				              "interval": "1",
				              "day_of_month": "1"
				            }
				          },
				          "amount": {
				            "value": "270.0",
				            "currency": "GBP"
				          }
				        },
				        "next_payment": {
				          "when": "2016-05-19",
				          "amount": {
				            "value": "270.0",
				            "currency": "GBP"
				          }
				        }
				      }
				    },
				editError : {"error":
							{"id":"e6eee4df-9e02-45d4-8827-1f71684a7ee8","code":"9007",
							 "message":"You're putting in more than the limit you set up for this Pot. Try changing the limit or transferring a little less."
							}},
			accountClass : 'account-1',
			getPotPageHandleClick : jest.fn(),
			getSelectedAccountID: '05985dae-d2de-4ebc-ab0a-79093081bde5',
		},
		//accountsList = {},
		disabledVal = {
			disabled : true
		},
		seletedAccountData = AccountsStore.getAccountDetail.mockReturnValue(props.getSelectedAccountID);
		global.sessionStorage = jest.genMockFunction();
        global.sessionStorage.setItem = jest.genMockFunction();
        global.sessionStorage.getItem = jest.genMockFunction();
		component = shallowRender(props);
	});

	it('Unit Test Case 1 : toBeDefined',()=>{
		expect(component).toBeDefined();
	});

	it('Unit Test Case 1.1 : error',()=>{
		props.editError = {};
    	let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
    	expect(instance.props.editError).toBe(props.editError);
	});
	
	it('Unit Test Case 1.2 : potDetailsData',()=>{
    	let event = {
    		target : {
    			value : '123',
    		}
    	}
    	props.potDetailsData = null;
    	let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
    	instance._handlePotGoalChange(event);
    	expect(instance.state.isDisabled).toBe(true);
	});

	it('Unit Test Case 2 : startMinDate',()=>{
		props.potDetailsData = null;
		let checkminDate = moment();
    	let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
		
		instance.setState({
			startMinDate : checkminDate,
		})
		expect(instance.state.startMinDate).toBe(checkminDate);

	});


	it ('Unit Test Case 3 : _getExpectedMonth',()=>{
		let expMonth;
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
		instance.setState({
			pots:{
					      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
					      "name": "Family Holiday",
					      "reference": "Reference",
					      "balance": {
					        "value": "1200.0",
					        "currency": "GBP"
					      },
					      "goal": {
					        "amount": {
					          "value": "2000",
					          "currency": "GBP"
					        },
					        "when": "2017-08-16"
					      },
					      "schedule": {
					        "recurrence": {
					          "frequency": {
					            "monthly": {
					              "interval": "1",
					              "day_of_month": "1"
					            }
					          },
					          "amount": {
					            "value": "270.0",
					            "currency": "GBP"
					          }
					        },
					        "next_payment": {
					          "when": "2016-05-19",
					          "amount": {
					            "value": "270.0",
					            "currency": "GBP"
					          }
					        }
					      }
					 },

		});
	    expMonth=instance._getExpectedMonth();
	    expect(instance.state.pots.goal.amount.value).toBe('2000');
	  });

	  it ('Unit Test Case 3.1 : _getExpectedMonth',()=>{
		let expMonth;
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
		instance.setState({
			pots:{
					      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
					      "name": "Family Holiday",
					      "reference": "Reference",
					      "balance": {
					        "value": "1200.0",
					        "currency": "GBP"
					      },
					      "goal": {
					        "amount": {
					          "value": "",
					          "currency": "GBP"
					        },
					        "when": "2017-08-16"
					      },
					      "schedule": {
					        "recurrence": {
					          "frequency": {
					            "monthly": {
					              "interval": "1",
					              "day_of_month": "1"
					            }
					          },
					          "amount": {
					            "value": "270.0",
					            "currency": "GBP"
					          }
					        },
					        "next_payment": {
					          "when": "2016-05-19",
					          "amount": {
					            "value": "270.0",
					            "currency": "GBP"
					          }
					        }
					      }
					 },

		});
	    expMonth=instance._getExpectedMonth();
	    expect(instance.state.pots.goal.amount.value).toBe('');
	  });

	  it ('Unit Test Case 3.2 : _getExpectedMonth',()=>{
		let expMonth;
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
		instance.setState({
			pots:{
					      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
					      "name": "Family Holiday",
					      "reference": "Reference",
					      "balance": {
					        "value": "1200.0",
					        "currency": "GBP"
					      },
					      "goal": {
					        "amount": {
					          "value": "",
					          "currency": "GBP"
					        },
					        "when": "2017-08-16"
					      },
					      "schedule": {
					        "recurrence": {
					          "frequency": {
					            "monthly": {
					              "interval": "1",
					              "day_of_month": "1"
					            }
					          },
					          "amount": {
					            "value": "270.0",
					            "currency": "GBP"
					          }
					        },
					        "next_payment": {
					          "when": "2016-05-19",
					          "amount": {
					            "value": "270.0",
					            "currency": "GBP"
					          }
					        }
					      }
					 },

		});
		instance.setState({
			potBalanceValue : "",
		})
	    expMonth=instance._getExpectedMonth();
	    expect(instance.state.potBalanceValue).toBe("");
	  });

	  it ('Unit Test Case 3.3 : _getExpectedMonth',()=>{
		let expMonth;
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
		instance.setState({
			pots:{
					      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
					      "name": "Family Holiday",
					      "reference": "Reference",
					      "balance": {
					        "value": "1200.0",
					        "currency": "GBP"
					      },
					      "goal": {
					        "amount": {
					          "value": "abcd",
					          "currency": "GBP"
					        },
					        "when": "2017-08-16"
					      },
					      "schedule": {
					        "recurrence": {
					          "frequency": {
					            "monthly": {
					              "interval": "1",
					              "day_of_month": "1"
					            }
					          },
					          "amount": {
					            "value": "",
					            "currency": "GBP"
					          }
					        },
					        "next_payment": {
					          "when": "2016-05-19",
					          "amount": {
					            "value": "270.0",
					            "currency": "GBP"
					          }
					        }
					      }
					 },
		});
	    expMonth=instance._getExpectedMonth();
	    expect(instance.state.pots.schedule.recurrence.amount.value).toBe("");
	  });

	describe('Unit Test Case 4 : CreateSavingsPot --> _handlePotBalanceChange', () => {
		it('Unit Test Case 4', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
			pots:{
					      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
					      "name": "Family Holiday",
					      "reference": "Reference",
					      "balance": {
					        "value": "1200.0",
					        "currency": "GBP"
					      },
					      "goal": {
					        "amount": {
					          "value": "abcd",
					          "currency": "GBP"
					        },
					        "when": "2017-08-16"
					      },
					      "schedule": {
					        "recurrence": {
					          "frequency": {
					            "monthly": {
					              "interval": "1",
					              "day_of_month": "1"
					            }
					          },
					          "amount": {
					            "value": "0",
					            "currency": "GBP"
					          }
					        },
					        "next_payment": {
					          "when": "2016-05-19",
					          "amount": {
					            "value": "270.0",
					            "currency": "GBP"
					          }
					        }
					      }
					 },
		});
	    const event = {target:{value:'2000000ab00'}}
	    instance._handlePotBalanceChange(event);
	    expect(instance.state.potBalanceValue).toBe('£1200.0');
	  });
	});

	describe('Unit Test Case 5 : CreateSavingsPot --> _handlePotBalanceChange', () => {
		it('Unit Test Case 5', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
			pots:{
					      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
					      "name": "Family Holiday",
					      "reference": "Reference",
					      "balance": {
					        "value": "1200.0",
					        "currency": "GBP"
					      },
					      "goal": {
					        "amount": {
					          "value": "1223",
					          "currency": "GBP"
					        },
					        "when": "2017-08-16"
					      },
					      "schedule": {
					        "recurrence": {
					          "frequency": {
					            "monthly": {
					              "interval": "1",
					              "day_of_month": "1"
					            }
					          },
					          "amount": {
					            "value": "0",
					            "currency": "GBP"
					          }
					        },
					        "next_payment": {
					          "when": "2016-05-19",
					          "amount": {
					            "value": "270.0",
					            "currency": "GBP"
					          }
					        }
					      }
					 },
		});
	    const event = {target:{value:'1000'}}
	    instance._handlePotBalanceChange(event);
	    expect(instance.state.potBalanceValue).toBe('£1000');
	  });
	});

	describe('Unit Test Case 6 : CreateSavingsPot --> _handlePotBalanceChange', () => {
		it('Unit Test Case 6', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
			pots:{
					      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
					      "name": "Family Holiday",
					      "reference": "Reference",
					      "balance": {
					        "value": "1200.0",
					        "currency": "GBP"
					      },
					      "goal": {
					        "amount": {
					          "value": "",
					          "currency": "GBP"
					        },
					        "when": "2017-08-16"
					      },
					      "schedule": {
					        "recurrence": {
					          "frequency": {
					            "monthly": {
					              "interval": "1",
					              "day_of_month": "1"
					            }
					          },
					          "amount": {
					            "value": "0",
					            "currency": "GBP"
					          }
					        },
					        "next_payment": {
					          "when": "2016-05-19",
					          "amount": {
					            "value": "270.0",
					            "currency": "GBP"
					          }
					        }
					      }
					 },
		});
	    const event = {target:{value:""}}
	    instance._handlePotBalanceChange(event);
	    expect(instance.state.potBalanceValue).toBe('£');
	  });
	});

	describe('Unit Test Case 7 : CreateSavingsPot --> _handlePotNameChange', () => {
		it('Unit Test Case 7', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    const event = {target:{value:'Family'}}
	    instance._handlePotNameChange(event);
	    expect(instance.state.pots.name).toBe('Family');
	  });
	});

	describe('Unit Test Case 8 : CreateSavingsPot --> _handlePotGoalChange', () => {
		it('Unit Test Case 8', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    const event = {target:{value:'-100'}}
	    instance._handlePotGoalChange(event);
	    expect(instance.state.pots.goal.amount.value).toBe('£100');
	  });
	});

	describe('Unit Test Case 9 : CreateSavingsPot --> _handlePotGoalChange', () => {
		it('Unit Test Case 9', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
			pots:{
					      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
					      "name": "Family Holiday",
					      "reference": "Reference",
					      "balance": {
					        "value": "1200.0",
					        "currency": "GBP"
					      },
					      "goal": {
					        "amount": {
					          "value": '0',
					          "currency": "GBP"
					        },
					        "when": "2017-08-16"
					      },
					      "schedule": {
					        "recurrence": {
					          "frequency": {
					            "monthly": {
					              "interval": "1",
					              "day_of_month": "1"
					            }
					          },
					          "amount": {
					            "value": '0',
					            "currency": "GBP"
					          }
					        },
					        "next_payment": {
					          "when": "2016-05-19",
					          "amount": {
					            "value": "270.0",
					            "currency": "GBP"
					          }
					        }
					      }
					 },
		});
	    const event = {target:{value:'0'}}
	    instance._handlePotGoalChange(event);
	    expect(instance.state.isDisabledSubmit).toBe(true);
	  });

		it('Unit Test Case 9.1', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
			pots:{
					      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
					      "name": "Family Holiday",
					      "reference": "Reference",
					      "balance": {
					        "value": "1200.0",
					        "currency": "GBP"
					      },
					      "goal": {
					        "amount": {
					          "value": '0',
					          "currency": "GBP"
					        },
					        "when": "2017-08-16"
					      },
					      "schedule": {
					        "recurrence": {
					          "frequency": {
					            "monthly": {
					              "interval": "1",
					              "day_of_month": "1"
					            }
					          },
					          "amount": {
					            "value": '0',
					            "currency": "GBP"
					          }
					        },
					        "next_payment": {
					          "when": "2016-05-19",
					          "amount": {
					            "value": "270.0",
					            "currency": "GBP"
					          }
					        }
					      }
					 },
		});
	    const event = {target:{value:'2000'}}
	    instance._handlePotGoalChange(event);
	    expect(instance.state.isDisabledSubmit).toBe(true);
	  });

		it('Unit Test Case 9.2', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
			pots:{
					      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
					      "name": "Family Holiday",
					      "reference": "Reference",
					      "balance": {
					        "value": "1200.0",
					        "currency": "GBP"
					      },
					      "goal": {
					        "amount": {
					          "value": '0',
					          "currency": "GBP"
					        },
					        "when": "2017-08-16"
					      },
					      "schedule": {
					        "recurrence": {
					          "frequency": {
					            "monthly": {
					              "interval": "1",
					              "day_of_month": "1"
					            }
					          },
					          "amount": {
					            "value": '123',
					            "currency": "GBP"
					          }
					        },
					        "next_payment": {
					          "when": "2016-05-19",
					          "amount": {
					            "value": "270.0",
					            "currency": "GBP"
					          }
					        }
					      }
					 },
			potGoalForEditPot : '2000',
			potMonthlyContributionForEditPot: '100',
		});
	    const event = {target:{value:'2000'}}
	    instance._handlePotGoalChange(event);
	    expect(instance.state.isDisabledSubmit).toBe(false);
	  });

		it('Unit Test Case 9.3', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
			pots:{
					      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
					      "name": "Family Holiday",
					      "reference": "Reference",
					      "balance": {
					        "value": "1200.0",
					        "currency": "GBP"
					      },
					      "goal": {
					        "amount": {
					          "value": '0',
					          "currency": "GBP"
					        },
					        "when": "2017-08-16"
					      },
					      "schedule": {
					        "recurrence": {
					          "frequency": {
					            "monthly": {
					              "interval": "1",
					              "day_of_month": "1"
					            }
					          },
					          "amount": {
					            "value": '123',
					            "currency": "GBP"
					          }
					        },
					        "next_payment": {
					          "when": "2016-05-19",
					          "amount": {
					            "value": "270.0",
					            "currency": "GBP"
					          }
					        }
					      }
					 },
			potGoalForEditPot : '2000',
			potMonthlyContributionForEditPot: '123',
		});
	    const event = {target:{value:'2000'}}
	    instance._handlePotGoalChange(event);
	    expect(instance.state.isDisabledSubmit).toBe(true);
	  });

		it('Unit Test Case 9.4', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
			pots:{
					      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
					      "name": "Family Holiday",
					      "reference": "Reference",
					      "balance": {
					        "value": "1200.0",
					        "currency": "GBP"
					      },
					      "goal": {
					        "amount": {
					          "value": '0',
					          "currency": "GBP"
					        },
					        "when": "2017-08-16"
					      },
					      "schedule": {
					        "recurrence": {
					          "frequency": {
					            "monthly": {
					              "interval": "1",
					              "day_of_month": "1"
					            }
					          },
					          "amount": {
					            "value": '123',
					            "currency": "GBP"
					          }
					        },
					        "next_payment": {
					          "when": "2016-05-19",
					          "amount": {
					            "value": "270.0",
					            "currency": "GBP"
					          }
					        }
					      }
					 },
			potGoalForEditPot : '2000',
			potMonthlyContributionForEditPot: '123',
		});
	    const event = {target:{value:''}}
	    instance._handlePotGoalChange(event);
	    expect(instance.state.isDisabledSubmit).toBe(true);
	  });

		it('Unit Test Case 9.5', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
			pots:{
					      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
					      "name": "Family Holiday",
					      "reference": "Reference",
					      "balance": {
					        "value": "1200.0",
					        "currency": "GBP"
					      },
					      "goal": {
					        "amount": {
					          "value": '0',
					          "currency": "GBP"
					        },
					        "when": "2017-08-16"
					      },
					      "schedule": {
					        "recurrence": {
					          "frequency": {
					            "monthly": {
					              "interval": "1",
					              "day_of_month": "1"
					            }
					          },
					          "amount": {
					            "value": '123',
					            "currency": "GBP"
					          }
					        },
					        "next_payment": {
					          "when": "2016-05-19",
					          "amount": {
					            "value": "270.0",
					            "currency": "GBP"
					          }
					        }
					      }
					 },
			potGoalForEditPot : '2000',
			potMonthlyContributionForEditPot: '123',
		});
	    const event = {target:{value:'.'}}
	    instance._handlePotGoalChange(event);
	    expect(instance.state.isDisabledSubmit).toBe(true);
	  });

		it('Unit Test Case 9.6', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
			pots:{
					      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
					      "name": "Family Holiday",
					      "reference": "Reference",
					      "balance": {
					        "value": "1200.0",
					        "currency": "GBP"
					      },
					      "goal": {
					        "amount": {
					          "value": '0',
					          "currency": "GBP"
					        },
					        "when": "2017-08-16"
					      },
					      "schedule": {
					        "recurrence": {
					          "frequency": {
					            "monthly": {
					              "interval": "1",
					              "day_of_month": "1"
					            }
					          },
					          "amount": {
					            "value": '123',
					            "currency": "GBP"
					          }
					        },
					        "next_payment": {
					          "when": "2016-05-19",
					          "amount": {
					            "value": "270.0",
					            "currency": "GBP"
					          }
					        }
					      }
					 },
			potGoalForEditPot : '2000',
			potMonthlyContributionForEditPot: '123',
		});
	    const event = {target:{value:'0.0'}}
	    instance._handlePotGoalChange(event);
	    expect(instance.state.isDisabledSubmit).toBe(true);
	  });

		it('Unit Test Case 9.7', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
			pots:{
					      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
					      "name": "Family Holiday",
					      "reference": "Reference",
					      "balance": {
					        "value": "1200.0",
					        "currency": "GBP"
					      },
					      "goal": {
					        "amount": {
					          "value": '0',
					          "currency": "GBP"
					        },
					        "when": "2017-08-16"
					      },
					      "schedule": {
					        "recurrence": {
					          "frequency": {
					            "monthly": {
					              "interval": "1",
					              "day_of_month": "1"
					            }
					          },
					          "amount": {
					            "value": '123',
					            "currency": "GBP"
					          }
					        },
					        "next_payment": {
					          "when": "2016-05-19",
					          "amount": {
					            "value": "270.0",
					            "currency": "GBP"
					          }
					        }
					      }
					 },
			potGoalForEditPot : '2000',
			potMonthlyContributionForEditPot: '123',
		});
	    const event = {target:{value:'0.00'}}
	    instance._handlePotGoalChange(event);
	    expect(instance.state.isDisabledSubmit).toBe(true);
	  });

		it('Unit Test Case 9.8', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
			pots:{
					      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
					      "name": "Family Holiday",
					      "reference": "Reference",
					      "balance": {
					        "value": "1200.0",
					        "currency": "GBP"
					      },
					      "goal": {
					        "amount": {
					          "value": '123456',
					          "currency": "GBP"
					        },
					        "when": "2017-08-16"
					      },
					      "schedule": {
					        "recurrence": {
					          "frequency": {
					            "monthly": {
					              "interval": "1",
					              "day_of_month": "1"
					            }
					          },
					          "amount": {
					            "value": '123',
					            "currency": "GBP"
					          }
					        },
					        "next_payment": {
					          "when": "2016-05-19",
					          "amount": {
					            "value": "270.0",
					            "currency": "GBP"
					          }
					        }
					      }
					 },
			potGoalForEditPot : '2000',
			potMonthlyContributionForEditPot: '123',
		});
	    const event = {target:{value:'£123456'}}
	    instance._handlePotGoalChange(event);
	    expect(instance.state.isDisabledSubmit).toBe(false);
	  });

	it('Unit Test Case 9.9', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
			pots:{
					      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
					      "name": "Family Holiday",
					      "reference": "Reference",
					      "balance": {
					        "value": "1200.0",
					        "currency": "GBP"
					      },
					      "goal": {
					        "amount": {
					          "value": 123,
					          "currency": "GBP"
					        },
					        "when": "2017-08-16"
					      },
					      "schedule": {
					        "recurrence": {
					          "frequency": {
					            "monthly": {
					              "interval": "1",
					              "day_of_month": "1"
					            }
					          },
					          "amount": {
					            "value": '123',
					            "currency": "GBP"
					          }
					        },
					        "next_payment": {
					          "when": "2016-05-19",
					          "amount": {
					            "value": "270.0",
					            "currency": "GBP"
					          }
					        }
					      }
					 },
			potGoalForEditPot : '2000',
			potMonthlyContributionForEditPot: '123',
		});
	    const event = {target:{value:'1234'}}
	    instance._handlePotGoalChange(event);
	    expect(instance.state.pots.goal.amount.value).toBe('£1234');
	  });

	it('Unit Test Case 9.10', () => {
		props.potDetailsData = {
					      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
					      "name": "Family Holiday",
					      "reference": "Reference",
					      "balance": {
					        "value": "1200.0",
					        "currency": "GBP"
					      },
					      "goal": {
					        "amount": {
					          "value": '0',
					          "currency": "GBP"
					        },
					        "when": "2017-08-16"
					      },
					      "schedule": {
					        "recurrence": {
					          "frequency": {
					            "monthly": {
					              "interval": "1",
					              "day_of_month": "1"
					            }
					          },
					          "amount": {
					            "value": '0',
					            "currency": "GBP"
					          }
					        },
					        "next_payment": {
					          "when": "2016-05-19",
					          "amount": {
					            "value": "270.0",
					            "currency": "GBP"
					          }
					        }
					      }
					 
		};
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
			pots:{
					      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
					      "name": "Family Holiday",
					      "reference": "Reference",
					      "balance": {
					        "value": "1200.0",
					        "currency": "GBP"
					      },
					      "goal": {
					        "amount": {
					          "value": '0',
					          "currency": "GBP"
					        },
					        "when": "2017-08-16"
					      },
					      "schedule": {
					        "recurrence": {
					          "frequency": {
					            "monthly": {
					              "interval": "1",
					              "day_of_month": "1"
					            }
					          },
					          "amount": {
					            "value": '0',
					            "currency": "GBP"
					          }
					        },
					        "next_payment": {
					          "when": "2016-05-19",
					          "amount": {
					            "value": "270.0",
					            "currency": "GBP"
					          }
					        }
					      }
					 },
			potGoalForEditPot : '2000',
			potMonthlyContributionForEditPot: '123',
		});
	    const event = {target:{value:'1234'}}
	    instance._handlePotGoalChange(event);
	    expect(instance.state.potGoalForEditPot).toBe('2000');
	  });

	it('Unit Test Case 9.11', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
			pots:{
					      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
					      "name": "Family Holiday",
					      "reference": "Reference",
					      "balance": {
					        "value": "1200.0",
					        "currency": "GBP"
					      },
					      "goal": {
					        "amount": {
					          "value": 123,
					          "currency": "GBP"
					        },
					        "when": "2017-08-16"
					      },
					      "schedule": {
					        "recurrence": {
					          "frequency": {
					            "monthly": {
					              "interval": "1",
					              "day_of_month": "1"
					            }
					          },
					          "amount": {
					            "value": '123',
					            "currency": "GBP"
					          }
					        },
					        "next_payment": {
					          "when": "2016-05-19",
					          "amount": {
					            "value": "270.0",
					            "currency": "GBP"
					          }
					        }
					      }
					 },
			potGoalForEditPot : '2000',
			potMonthlyContributionForEditPot: '123',
			potBalanceValue : '55555',
		});
	    const event = {target:{value:'abc£££'}};
	    instance._handlePotGoalChange(event);
	    expect(instance.state.pots.goal.amount.value).toBe('£');
	  });


	});

	describe('Unit Test Case 10 : CreateSavingsPot --> _handlePotScheduleValueChange', () => {
		it('Unit Test Case 10', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    const event = {target:{value:'-100'}}
	    instance._handlePotScheduleValueChange(event);
	    expect(instance.state.pots.schedule.recurrence.amount.value).toBe('£100');
	  });
	});

	describe('Unit Test Case 11 : CreateSavingsPot --> _handlePotScheduleValueChange', () => {
		it('Unit Test Case 11 If', () => {
			//props.pots.schedule.recurrence.amount.value = 0 ;
			//props.pots.goal.amount.value = 0;
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
			pots:{
					      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
					      "name": "Family Holiday",
					      "reference": "Reference",
					      "balance": {
					        "value": "1200.0",
					        "currency": "GBP"
					      },
					      "goal": {
					        "amount": {
					          "value": "0",
					          "currency": "GBP"
					        },
					        "when": "2017-08-16"
					      },
					      "schedule": {
					        "recurrence": {
					          "frequency": {
					            "monthly": {
					              "interval": "1",
					              "day_of_month": "1"
					            }
					          },
					          "amount": {
					            "value": "0",
					            "currency": "GBP"
					          }
					        },
					        "next_payment": {
					          "when": "2016-05-19",
					          "amount": {
					            "value": "270.0",
					            "currency": "GBP"
					          }
					        }
					      }
					 },
		});
	    const event = {target:{value:'100'}}
	    instance._handlePotScheduleValueChange(event);
	    expect(instance.state.isDisabledSubmit).toBe(true);
	  });

		it('Unit Test Case 11 Else', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    const event = {target:{value:'9'}}
	    instance._handlePotScheduleValueChange(event);
	    expect(instance.state.isDisabledDecrease).toBe(false);
	  });

		it('Unit Test Case 11.2', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
			pots:{
					      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
					      "name": "Family Holiday",
					      "reference": "Reference",
					      "balance": {
					        "value": "1200.0",
					        "currency": "GBP"
					      },
					      "goal": {
					        "amount": {
					          "value": '0',
					          "currency": "GBP"
					        },
					        "when": "2017-08-16"
					      },
					      "schedule": {
					        "recurrence": {
					          "frequency": {
					            "monthly": {
					              "interval": "1",
					              "day_of_month": "1"
					            }
					          },
					          "amount": {
					            "value": '123',
					            "currency": "GBP"
					          }
					        },
					        "next_payment": {
					          "when": "2016-05-19",
					          "amount": {
					            "value": "270.0",
					            "currency": "GBP"
					          }
					        }
					      }
					 },
			potGoalForEditPot : '2000',
			potMonthlyContributionForEditPot: '100',
		});
	    const event = {target:{value:'2000'}}
	    instance._handlePotScheduleValueChange(event);
	    expect(instance.state.isDisabledSubmit).toBe(true);
	  });

		it('Unit Test Case 11.3', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
			pots:{
					      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
					      "name": "Family Holiday",
					      "reference": "Reference",
					      "balance": {
					        "value": "1200.0",
					        "currency": "GBP"
					      },
					      "goal": {
					        "amount": {
					          "value": '0',
					          "currency": "GBP"
					        },
					        "when": "2017-08-16"
					      },
					      "schedule": {
					        "recurrence": {
					          "frequency": {
					            "monthly": {
					              "interval": "1",
					              "day_of_month": "1"
					            }
					          },
					          "amount": {
					            "value": '123',
					            "currency": "GBP"
					          }
					        },
					        "next_payment": {
					          "when": "2016-05-19",
					          "amount": {
					            "value": "270.0",
					            "currency": "GBP"
					          }
					        }
					      }
					 },
			potGoalForEditPot : '2000',
			potMonthlyContributionForEditPot: '123',
		});
	    const event = {target:{value:'2000'}}
	    instance._handlePotScheduleValueChange(event);
	    expect(instance.state.isDisabledSubmit).toBe(true);
	  });

		it('Unit Test Case 11.4', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
			pots:{
					      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
					      "name": "Family Holiday",
					      "reference": "Reference",
					      "balance": {
					        "value": "1200.0",
					        "currency": "GBP"
					      },
					      "goal": {
					        "amount": {
					          "value": '0',
					          "currency": "GBP"
					        },
					        "when": "2017-08-16"
					      },
					      "schedule": {
					        "recurrence": {
					          "frequency": {
					            "monthly": {
					              "interval": "1",
					              "day_of_month": "1"
					            }
					          },
					          "amount": {
					            "value": '123',
					            "currency": "GBP"
					          }
					        },
					        "next_payment": {
					          "when": "2016-05-19",
					          "amount": {
					            "value": "270.0",
					            "currency": "GBP"
					          }
					        }
					      }
					 },
			potGoalForEditPot : '2000',
			potMonthlyContributionForEditPot: '123',
		});
	    const event = {target:{value:''}}
	    instance._handlePotScheduleValueChange(event);
	    expect(instance.state.isDisabledSubmit).toBe(true);
	  });

		it('Unit Test Case 11.5', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
			pots:{
					      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
					      "name": "Family Holiday",
					      "reference": "Reference",
					      "balance": {
					        "value": "1200.0",
					        "currency": "GBP"
					      },
					      "goal": {
					        "amount": {
					          "value": '0',
					          "currency": "GBP"
					        },
					        "when": "2017-08-16"
					      },
					      "schedule": {
					        "recurrence": {
					          "frequency": {
					            "monthly": {
					              "interval": "1",
					              "day_of_month": "1"
					            }
					          },
					          "amount": {
					            "value": '123',
					            "currency": "GBP"
					          }
					        },
					        "next_payment": {
					          "when": "2016-05-19",
					          "amount": {
					            "value": "270.0",
					            "currency": "GBP"
					          }
					        }
					      }
					 },
			potGoalForEditPot : '2000',
			potMonthlyContributionForEditPot: '123',
		});
	    const event = {target:{value:'.'}}
	    instance._handlePotScheduleValueChange(event);
	    expect(instance.state.isDisabledSubmit).toBe(true);
	  });

		it('Unit Test Case 11.6', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
			pots:{
					      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
					      "name": "Family Holiday",
					      "reference": "Reference",
					      "balance": {
					        "value": "1200.0",
					        "currency": "GBP"
					      },
					      "goal": {
					        "amount": {
					          "value": '0',
					          "currency": "GBP"
					        },
					        "when": "2017-08-16"
					      },
					      "schedule": {
					        "recurrence": {
					          "frequency": {
					            "monthly": {
					              "interval": "1",
					              "day_of_month": "1"
					            }
					          },
					          "amount": {
					            "value": '123',
					            "currency": "GBP"
					          }
					        },
					        "next_payment": {
					          "when": "2016-05-19",
					          "amount": {
					            "value": "270.0",
					            "currency": "GBP"
					          }
					        }
					      }
					 },
			potGoalForEditPot : '2000',
			potMonthlyContributionForEditPot: '123',
		});
	    const event = {target:{value:'0.0'}}
	    instance._handlePotScheduleValueChange(event);
	    expect(instance.state.isDisabledSubmit).toBe(true);
	  });

		it('Unit Test Case 11.7', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
			pots:{
					      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
					      "name": "Family Holiday",
					      "reference": "Reference",
					      "balance": {
					        "value": "1200.0",
					        "currency": "GBP"
					      },
					      "goal": {
					        "amount": {
					          "value": '0',
					          "currency": "GBP"
					        },
					        "when": "2017-08-16"
					      },
					      "schedule": {
					        "recurrence": {
					          "frequency": {
					            "monthly": {
					              "interval": "1",
					              "day_of_month": "1"
					            }
					          },
					          "amount": {
					            "value": '123',
					            "currency": "GBP"
					          }
					        },
					        "next_payment": {
					          "when": "2016-05-19",
					          "amount": {
					            "value": "270.0",
					            "currency": "GBP"
					          }
					        }
					      }
					 },
			potGoalForEditPot : '2000',
			potMonthlyContributionForEditPot: '123',
		});
	    const event = {target:{value:'0.00'}}
	    instance._handlePotScheduleValueChange(event);
	    expect(instance.state.isDisabledSubmit).toBe(true);
	  });

		it('Unit Test Case 11.8', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
			pots:{
					      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
					      "name": "Family Holiday",
					      "reference": "Reference",
					      "balance": {
					        "value": "1200.0",
					        "currency": "GBP"
					      },
					      "goal": {
					        "amount": {
					          "value": '123456',
					          "currency": "GBP"
					        },
					        "when": "2017-08-16"
					      },
					      "schedule": {
					        "recurrence": {
					          "frequency": {
					            "monthly": {
					              "interval": "1",
					              "day_of_month": "1"
					            }
					          },
					          "amount": {
					            "value": '123',
					            "currency": "GBP"
					          }
					        },
					        "next_payment": {
					          "when": "2016-05-19",
					          "amount": {
					            "value": "270.0",
					            "currency": "GBP"
					          }
					        }
					      }
					 },
			potGoalForEditPot : '2000',
			potMonthlyContributionForEditPot: '123',
		});
	    const event = {target:{value:'£123456'}}
	    instance._handlePotScheduleValueChange(event);
	    expect(instance.state.isDisabledSubmit).toBe(false);
	  });

	/*it('Unit Test Case 11.9', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
			pots:{
					      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
					      "name": "Family Holiday",
					      "reference": "Reference",
					      "balance": {
					        "value": "1200.0",
					        "currency": "GBP"
					      },
					      "goal": {
					        "amount": {
					          "value": 123,
					          "currency": "GBP"
					        },
					        "when": "2017-08-16"
					      },
					      "schedule": {
					        "recurrence": {
					          "frequency": {
					            "monthly": {
					              "interval": "1",
					              "day_of_month": "1"
					            }
					          },
					          "amount": {
					            "value": '123',
					            "currency": "GBP"
					          }
					        },
					        "next_payment": {
					          "when": "2016-05-19",
					          "amount": {
					            "value": "270.0",
					            "currency": "GBP"
					          }
					        }
					      }
					 },
			potGoalForEditPot : '2000',
			potMonthlyContributionForEditPot: '123',
		});
	    const event = {target:{value:'1234'}}
	    instance._handlePotScheduleValueChange(event);
	    expect(instance.state.pots.goal.amount.value).toBe('£1234');
	  });*/

	it('Unit Test Case 11.10', () => {
		props.potDetailsData = {
					      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
					      "name": "Family Holiday",
					      "reference": "Reference",
					      "balance": {
					        "value": "1200.0",
					        "currency": "GBP"
					      },
					      "goal": {
					        "amount": {
					          "value": '0',
					          "currency": "GBP"
					        },
					        "when": "2017-08-16"
					      },
					      "schedule": {
					        "recurrence": {
					          "frequency": {
					            "monthly": {
					              "interval": "1",
					              "day_of_month": "1"
					            }
					          },
					          "amount": {
					            "value": '0',
					            "currency": "GBP"
					          }
					        },
					        "next_payment": {
					          "when": "2016-05-19",
					          "amount": {
					            "value": "270.0",
					            "currency": "GBP"
					          }
					        }
					      }
					 
		};
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
			pots:{
					      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
					      "name": "Family Holiday",
					      "reference": "Reference",
					      "balance": {
					        "value": "1200.0",
					        "currency": "GBP"
					      },
					      "goal": {
					        "amount": {
					          "value": '0',
					          "currency": "GBP"
					        },
					        "when": "2017-08-16"
					      },
					      "schedule": {
					        "recurrence": {
					          "frequency": {
					            "monthly": {
					              "interval": "1",
					              "day_of_month": "1"
					            }
					          },
					          "amount": {
					            "value": '0',
					            "currency": "GBP"
					          }
					        },
					        "next_payment": {
					          "when": "2016-05-19",
					          "amount": {
					            "value": "270.0",
					            "currency": "GBP"
					          }
					        }
					      }
					 },
			potGoalForEditPot : '2000',
			potMonthlyContributionForEditPot: '123',
		});
	    const event = {target:{value:'1234'}}
	    instance._handlePotScheduleValueChange(event);
	    expect(instance.state.potGoalForEditPot).toBe('2000');
	  });

	/*it('Unit Test Case 11.11', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
			pots:{
					      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
					      "name": "Family Holiday",
					      "reference": "Reference",
					      "balance": {
					        "value": "1200.0",
					        "currency": "GBP"
					      },
					      "goal": {
					        "amount": {
					          "value": 123,
					          "currency": "GBP"
					        },
					        "when": "2017-08-16"
					      },
					      "schedule": {
					        "recurrence": {
					          "frequency": {
					            "monthly": {
					              "interval": "1",
					              "day_of_month": "1"
					            }
					          },
					          "amount": {
					            "value": '123',
					            "currency": "GBP"
					          }
					        },
					        "next_payment": {
					          "when": "2016-05-19",
					          "amount": {
					            "value": "270.0",
					            "currency": "GBP"
					          }
					        }
					      }
					 },
			potGoalForEditPot : '2000',
			potMonthlyContributionForEditPot: '123',
			potBalanceValue : '55555',
		});
	    const event = {target:{value:'abc£££'}};
	    instance._handlePotScheduleValueChange(event);
	    expect(instance.state.pots.goal.amount.value).toBe('£');
	  });*/



	});
	
	describe('Unit Test Case 12 : CreateSavingsPot --> _handlePotScheduleValueBlur', () => {
		it('Unit Test Case 12', () => {
		let checkDate = moment().format('YYYY-MM-DD');
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
	    	pots : {
				      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
				      "name": "Family Holiday",
				      "reference": "Reference",
				      "balance": {
				        "value": "1200.0",
				        "currency": "GBP"
				      },
				      "goal": {
				        "amount": {
				          "value": "2000",
				          "currency": "GBP"
				        },
				        "when": checkDate
				      },
				      "schedule": {
				        "recurrence": {
				          "frequency": {
				            "monthly": {
				              "interval": "1",
				              "day_of_month": "1"
				            }
				          },
				          "amount": {
				            "value": "270.0",
				            "currency": "GBP"
				          }
				        },
				        "next_payment": {
				          "when": "2016-05-19",
				          "amount": {
				            "value": "270.0",
				            "currency": "GBP"
				          }
				        }
				      }
				    }
	    });
	    instance._handlePotScheduleValueBlur();
	    let insDate = instance._getExpectedMonth();
	    expect(instance.state.pots.goal.when).toBe(moment(insDate).format('YYYY-MM-DD'));
	  });
	});

	describe('Unit Test Case 13 : CreateSavingsPot --> _handlePotScheduleValueBlur', () => {
		it('Unit Test Case 13', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
	    	pots : {
				      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
				      "name": "Family Holiday",
				      "reference": "Reference",
				      "balance": {
				        "value": "1200.0",
				        "currency": "GBP"
				      },
				      "goal": {
				        "amount": {
				          "value": "2000",
				          "currency": "GBP"
				        },
				        "when": '2016-05-19'
				      },
				      "schedule": {
				        "recurrence": {
				          "frequency": {
				            "monthly": {
				              "interval": "1",
				              "day_of_month": "1"
				            }
				          },
				          "amount": {
				            "value": "270.0",
				            "currency": "GBP"
				          }
				        },
				        "next_payment": {
				          "when": "2016-05-19",
				          "amount": {
				            "value": "270.0",
				            "currency": "GBP"
				          }
				        }
				      }
				    }
	    });
	    instance._handlePotScheduleValueBlur();
	    expect(instance.state.pots.goal.when).toBe('2016-05-19');
	  });
	});


	describe('Unit Test Case 14 : CreateSavingsPot --> _increment', () => {
	    it('Unit Test Case 14 condition 1', () => {
	    	let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
	    	pots : {
				      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
				      "name": "Family Holiday",
				      "reference": "Reference",
				      "balance": {
				        "value": "1200.0",
				        "currency": "GBP"
				      },
				      "goal": {
				        "amount": {
				          "value": "2000",
				          "currency": "GBP"
				        },
				        "when": '2016-05-19'
				      },
				      "schedule": {
				        "recurrence": {
				          "frequency": {
				            "monthly": {
				              "interval": "1",
				              "day_of_month": "1"
				            }
				          },
				          "amount": {
				            "value": "450.0",
				            "currency": "GBP"
				          }
				        },
				        "next_payment": {
				          "when": "2016-05-19",
				          "amount": {
				            "value": "270.0",
				            "currency": "GBP"
				          }
				        }
				      }
				    }
	    });
	    instance._increment();
	    expect(instance.state.pots.schedule.recurrence.amount.value).toBe("£460");
	  });

	    it('Unit Test Case 14 condition 2', () => {
	    	let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
	    	pots : {
				      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
				      "name": "Family Holiday",
				      "reference": "Reference",
				      "balance": {
				        "value": "1200.0",
				        "currency": "GBP"
				      },
				      "goal": {
				        "amount": {
				          "value": "2000",
				          "currency": "GBP"
				        },
				        "when": '2016-05-19'
				      },
				      "schedule": {
				        "recurrence": {
				          "frequency": {
				            "monthly": {
				              "interval": "1",
				              "day_of_month": "1"
				            }
				          },
				          "amount": {
				            "value": "550.0",
				            "currency": "GBP"
				          }
				        },
				        "next_payment": {
				          "when": "2016-05-19",
				          "amount": {
				            "value": "270.0",
				            "currency": "GBP"
				          }
				        }
				      }
				    }
	    });
	    instance._increment();
	    expect(instance.state.pots.schedule.recurrence.amount.value).toBe('£600');
	  });

	  it('Unit Test Case 14 condition 3', () => {
	    	let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
	    	pots : {
				      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
				      "name": "Family Holiday",
				      "reference": "Reference",
				      "balance": {
				        "value": "1200.0",
				        "currency": "GBP"
				      },
				      "goal": {
				        "amount": {
				          "value": "2000",
				          "currency": "GBP"
				        },
				        "when": '2016-05-19'
				      },
				      "schedule": {
				        "recurrence": {
				          "frequency": {
				            "monthly": {
				              "interval": "1",
				              "day_of_month": "1"
				            }
				          },
				          "amount": {
				            "value": "1100.0",
				            "currency": "GBP"
				          }
				        },
				        "next_payment": {
				          "when": "2016-05-19",
				          "amount": {
				            "value": "270.0",
				            "currency": "GBP"
				          }
				        }
				      }
				    }
	    });
	    instance._increment();
	    expect(instance.state.pots.schedule.recurrence.amount.value).toBe('£1200');
	  });

	  it('Unit Test Case 14 condition 4', () => {
	    	let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
	    	pots : {
				      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
				      "name": "Family Holiday",
				      "reference": "Reference",
				      "balance": {
				        "value": "1200.0",
				        "currency": "GBP"
				      },
				      "goal": {
				        "amount": {
				          "value": "2000",
				          "currency": "GBP"
				        },
				        "when": '2016-05-19'
				      },
				      "schedule": {
				        "recurrence": {
				          "frequency": {
				            "monthly": {
				              "interval": "1",
				              "day_of_month": "1"
				            }
				          },
				          "amount": {
				            "value": "11000.0",
				            "currency": "GBP"
				          }
				        },
				        "next_payment": {
				          "when": "2016-05-19",
				          "amount": {
				            "value": "270.0",
				            "currency": "GBP"
				          }
				        }
				      }
				    }
	    });
	    instance._increment();
	    expect(instance.state.pots.schedule.recurrence.amount.value).toBe('£12000');
	  });

	  it('Unit Test Case 14 condition 5', () => {
	    	let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
	    	pots : {
				      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
				      "name": "Family Holiday",
				      "reference": "Reference",
				      "balance": {
				        "value": "1200.0",
				        "currency": "GBP"
				      },
				      "goal": {
				        "amount": {
				          "value": "2000",
				          "currency": "GBP"
				        },
				        "when": '2016-05-19'
				      },
				      "schedule": {
				        "recurrence": {
				          "frequency": {
				            "monthly": {
				              "interval": "1",
				              "day_of_month": "1"
				            }
				          },
				          "amount": {
				            "value": "",
				            "currency": "GBP"
				          }
				        },
				        "next_payment": {
				          "when": "2016-05-19",
				          "amount": {
				            "value": "270.0",
				            "currency": "GBP"
				          }
				        }
				      }
				    }
	    });
	    instance._increment();
	    expect(instance.state.pots.schedule.recurrence.amount.value).toBe('£10');
	  });

	   it('Unit Test Case 14 condition 6', () => {
	    	let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
	    	pots : {
				      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
				      "name": "Family Holiday",
				      "reference": "Reference",
				      "balance": {
				        "value": "1200.0",
				        "currency": "GBP"
				      },
				      "goal": {
				        "amount": {
				          "value": "2000",
				          "currency": "GBP"
				        },
				        "when": '2016-05-19'
				      },
				      "schedule": {
				        "recurrence": {
				          "frequency": {
				            "monthly": {
				              "interval": "1",
				              "day_of_month": "1"
				            }
				          },
				          "amount": {
				            "value": "12345",
				            "currency": "GBP"
				          }
				        },
				        "next_payment": {
				          "when": "2016-05-19",
				          "amount": {
				            "value": "270.0",
				            "currency": "GBP"
				          }
				        }
				      }
				    }
	    });
	    instance._increment();
	    expect(instance.state.pots.schedule.recurrence.amount.value).toBe('£12350');
	  });

	   it('Unit Test Case 14 condition 7', () => {
	    	let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
	    	pots : {
				      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
				      "name": "Family Holiday",
				      "reference": "Reference",
				      "balance": {
				        "value": "1200.0",
				        "currency": "GBP"
				      },
				      "goal": {
				        "amount": {
				          "value": "0",
				          "currency": "GBP"
				        },
				        "when": '2016-05-19'
				      },
				      "schedule": {
				        "recurrence": {
				          "frequency": {
				            "monthly": {
				              "interval": "1",
				              "day_of_month": "1"
				            }
				          },
				          "amount": {
				            "value": "0",
				            "currency": "GBP"
				          }
				        },
				        "next_payment": {
				          "when": "2016-05-19",
				          "amount": {
				            "value": "270.0",
				            "currency": "GBP"
				          }
				        }
				      }
				    }
	    });
	    instance._increment();
	    expect(instance.state.isDisabledSubmit).toBe(true);
	  });

	    it('Unit Test Case 14 condition 8', () => {
	    	let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
	    	pots : {
				      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
				      "name": "Family Holiday",
				      "reference": "Reference",
				      "balance": {
				        "value": "1200.0",
				        "currency": "GBP"
				      },
				      "goal": {
				        "amount": {
				          "value": "0",
				          "currency": "GBP"
				        },
				        "when": '2016-05-19'
				      },
				      "schedule": {
				        "recurrence": {
				          "frequency": {
				            "monthly": {
				              "interval": "1",
				              "day_of_month": "1"
				            }
				          },
				          "amount": {
				            "value": "1000000",
				            "currency": "GBP"
				          }
				        },
				        "next_payment": {
				          "when": "2016-05-19",
				          "amount": {
				            "value": "270.0",
				            "currency": "GBP"
				          }
				        }
				      }
				    }
	    });
	    instance._increment();
	    expect(instance.state.isDisabledSubmit).toBe(true);
	  });

	});

	
	describe('Unit Test Case 15 : CreateSavingsPot --> _decrement', () => {
	    it('Unit Test Case 15 condition 1', () => {
	    	let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
	    	pots : {
				      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
				      "name": "Family Holiday",
				      "reference": "Reference",
				      "balance": {
				        "value": "1200.0",
				        "currency": "GBP"
				      },
				      "goal": {
				        "amount": {
				          "value": "2000",
				          "currency": "GBP"
				        },
				        "when": '2016-05-19'
				      },
				      "schedule": {
				        "recurrence": {
				          "frequency": {
				            "monthly": {
				              "interval": "1",
				              "day_of_month": "1"
				            }
				          },
				          "amount": {
				            "value": "450.0",
				            "currency": "GBP"
				          }
				        },
				        "next_payment": {
				          "when": "2016-05-19",
				          "amount": {
				            "value": "270.0",
				            "currency": "GBP"
				          }
				        }
				      }
				    }
	    });
	    instance._decrement();
	    expect(instance.state.pots.schedule.recurrence.amount.value).toBe("£440");
	  });

	    it('Unit Test Case 15 condition 2', () => {
	    	let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
	    	pots : {
				      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
				      "name": "Family Holiday",
				      "reference": "Reference",
				      "balance": {
				        "value": "1200.0",
				        "currency": "GBP"
				      },
				      "goal": {
				        "amount": {
				          "value": "2000",
				          "currency": "GBP"
				        },
				        "when": '2016-05-19'
				      },
				      "schedule": {
				        "recurrence": {
				          "frequency": {
				            "monthly": {
				              "interval": "1",
				              "day_of_month": "1"
				            }
				          },
				          "amount": {
				            "value": "550.0",
				            "currency": "GBP"
				          }
				        },
				        "next_payment": {
				          "when": "2016-05-19",
				          "amount": {
				            "value": "270.0",
				            "currency": "GBP"
				          }
				        }
				      }
				    }
	    });
	    instance._decrement();
	    expect(instance.state.pots.schedule.recurrence.amount.value).toBe('£500');
	  });

	  it('Unit Test Case 15 condition 3', () => {
	    	let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
	    	pots : {
				      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
				      "name": "Family Holiday",
				      "reference": "Reference",
				      "balance": {
				        "value": "1200.0",
				        "currency": "GBP"
				      },
				      "goal": {
				        "amount": {
				          "value": "2000",
				          "currency": "GBP"
				        },
				        "when": '2016-05-19'
				      },
				      "schedule": {
				        "recurrence": {
				          "frequency": {
				            "monthly": {
				              "interval": "1",
				              "day_of_month": "1"
				            }
				          },
				          "amount": {
				            "value": "1100.0",
				            "currency": "GBP"
				          }
				        },
				        "next_payment": {
				          "when": "2016-05-19",
				          "amount": {
				            "value": "270.0",
				            "currency": "GBP"
				          }
				        }
				      }
				    }
	    });
	    instance._decrement();
	    expect(instance.state.pots.schedule.recurrence.amount.value).toBe('£1000');
	  });

	  it('Unit Test Case 15 condition 4', () => {
	    	let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
	    	pots : {
				      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
				      "name": "Family Holiday",
				      "reference": "Reference",
				      "balance": {
				        "value": "1200.0",
				        "currency": "GBP"
				      },
				      "goal": {
				        "amount": {
				          "value": "2000",
				          "currency": "GBP"
				        },
				        "when": '2016-05-19'
				      },
				      "schedule": {
				        "recurrence": {
				          "frequency": {
				            "monthly": {
				              "interval": "1",
				              "day_of_month": "1"
				            }
				          },
				          "amount": {
				            "value": "11000.0",
				            "currency": "GBP"
				          }
				        },
				        "next_payment": {
				          "when": "2016-05-19",
				          "amount": {
				            "value": "270.0",
				            "currency": "GBP"
				          }
				        }
				      }
				    }
	    });
	    instance._decrement();
	    expect(instance.state.pots.schedule.recurrence.amount.value).toBe('£10000');
	  });

	  it('Unit Test Case 15 condition 5', () => {
	    	let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
	    	pots : {
				      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
				      "name": "Family Holiday",
				      "reference": "Reference",
				      "balance": {
				        "value": "1200.0",
				        "currency": "GBP"
				      },
				      "goal": {
				        "amount": {
				          "value": "2000",
				          "currency": "GBP"
				        },
				        "when": '2016-05-19'
				      },
				      "schedule": {
				        "recurrence": {
				          "frequency": {
				            "monthly": {
				              "interval": "1",
				              "day_of_month": "1"
				            }
				          },
				          "amount": {
				            "value": "",
				            "currency": "GBP"
				          }
				        },
				        "next_payment": {
				          "when": "2016-05-19",
				          "amount": {
				            "value": "270.0",
				            "currency": "GBP"
				          }
				        }
				      }
				    }
	    });
	    instance._decrement();
	    expect(instance.state.pots.schedule.recurrence.amount.value).toBe('£0');
	  });

	   it('Unit Test Case 15 condition 6', () => {
	    	let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
	    	pots : {
				      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
				      "name": "Family Holiday",
				      "reference": "Reference",
				      "balance": {
				        "value": "1200.0",
				        "currency": "GBP"
				      },
				      "goal": {
				        "amount": {
				          "value": "2000",
				          "currency": "GBP"
				        },
				        "when": '2016-05-19'
				      },
				      "schedule": {
				        "recurrence": {
				          "frequency": {
				            "monthly": {
				              "interval": "1",
				              "day_of_month": "1"
				            }
				          },
				          "amount": {
				            "value": "12345",
				            "currency": "GBP"
				          }
				        },
				        "next_payment": {
				          "when": "2016-05-19",
				          "amount": {
				            "value": "270.0",
				            "currency": "GBP"
				          }
				        }
				      }
				    }
	    });
	    instance._decrement();
	    expect(instance.state.pots.schedule.recurrence.amount.value).toBe('£12340');
	  });

	   it('Unit Test Case 15 condition 7', () => {
	    	let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
	    	pots : {
				      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
				      "name": "Family Holiday",
				      "reference": "Reference",
				      "balance": {
				        "value": "1200.0",
				        "currency": "GBP"
				      },
				      "goal": {
				        "amount": {
				          "value": "0",
				          "currency": "GBP"
				        },
				        "when": '2016-05-19'
				      },
				      "schedule": {
				        "recurrence": {
				          "frequency": {
				            "monthly": {
				              "interval": "1",
				              "day_of_month": "1"
				            }
				          },
				          "amount": {
				            "value": "0",
				            "currency": "GBP"
				          }
				        },
				        "next_payment": {
				          "when": "2016-05-19",
				          "amount": {
				            "value": "270.0",
				            "currency": "GBP"
				          }
				        }
				      }
				    }
	    });
	    instance._decrement();
	    expect(instance.state.isDisabledSubmit).toBe(true);
	  });

	   it('Unit Test Case 15 condition 8', () => {
	    	let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
	    	pots : {
				      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
				      "name": "Family Holiday",
				      "reference": "Reference",
				      "balance": {
				        "value": "1200.0",
				        "currency": "GBP"
				      },
				      "goal": {
				        "amount": {
				          "value": "0",
				          "currency": "GBP"
				        },
				        "when": '2016-05-19'
				      },
				      "schedule": {
				        "recurrence": {
				          "frequency": {
				            "monthly": {
				              "interval": "1",
				              "day_of_month": "1"
				            }
				          },
				          "amount": {
				            "value": "10",
				            "currency": "GBP"
				          }
				        },
				        "next_payment": {
				          "when": "2016-05-19",
				          "amount": {
				            "value": "270.0",
				            "currency": "GBP"
				          }
				        }
				      }
				    }
	    });
	    instance._decrement();
	    expect(instance.state.isDisabledDecrease).toBe(true);
	  });

	});
	
	describe('Unit Test Case 16 : CreateSavingsPot --> _getExpectedScheduleValue', () => {
	    it('Unit Test Case 16 condition 1', () => {
	    	let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
	    	pots : {
				      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
				      "name": "Family Holiday",
				      "reference": "Reference",
				      "balance": {
				        "value": "1200.0",
				        "currency": "GBP"
				      },
				      "goal": {
				        "amount": {
				          "value": "2000",
				          "currency": "GBP"
				        },
				        "when": '2016-05-19'
				      },
				      "schedule": {
				        "recurrence": {
				          "frequency": {
				            "monthly": {
				              "interval": "1",
				              "day_of_month": "1"
				            }
				          },
				          "amount": {
				            "value": "450.0",
				            "currency": "GBP"
				          }
				        },
				        "next_payment": {
				          "when": "2016-05-19",
				          "amount": {
				            "value": "270.0",
				            "currency": "GBP"
				          }
				        }
				      }
				    }
	    });
	    let retValue = instance._getExpectedScheduleValue();
	    expect(instance.state.pots.goal.amount.value).toBe("2000");
	  });

	  it('Unit Test Case 16 condition 2', () => {
	    	let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
	    	pots : {
				      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
				      "name": "Family Holiday",
				      "reference": "Reference",
				      "balance": {
				        "value": "1200.0",
				        "currency": "GBP"
				      },
				      "goal": {
				        "amount": {
				          "value": "",
				          "currency": "GBP"
				        },
				        "when": '2016-05-19'
				      },
				      "schedule": {
				        "recurrence": {
				          "frequency": {
				            "monthly": {
				              "interval": "1",
				              "day_of_month": "1"
				            }
				          },
				          "amount": {
				            "value": "450.0",
				            "currency": "GBP"
				          }
				        },
				        "next_payment": {
				          "when": "2016-05-19",
				          "amount": {
				            "value": "270.0",
				            "currency": "GBP"
				          }
				        }
				      }
				    }
	    });
	    let retValue = instance._getExpectedScheduleValue();
	    expect(instance.state.pots.goal.amount.value).toBe("");
	  });

	  it('Unit Test Case 16 condition 3', () => {
	    	let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
	    	potBalanceValue : ""
	    });
	    let retValue = instance._getExpectedScheduleValue();
	    expect(instance.state.potBalanceValue).toBe("");
	  });

	});

	describe('Unit Test Case 17 : CreateSavingsPot --> _handleDateChange', () => {
	    it('Unit Test Case 17 condition 1', () => {
	    	let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
	    	pots : {
				      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
				      "name": "Family Holiday",
				      "reference": "Reference",
				      "balance": {
				        "value": "1200.0",
				        "currency": "GBP"
				      },
				      "goal": {
				        "amount": {
				          "value": "2000",
				          "currency": "GBP"
				        },
				        "when": '2016-05-19'
				      },
				      "schedule": {
				        "recurrence": {
				          "frequency": {
				            "monthly": {
				              "interval": "1",
				              "day_of_month": "1"
				            }
				          },
				          "amount": {
				            "value": "0",
				            "currency": "GBP"
				          }
				        },
				        "next_payment": {
				          "when": "2016-05-19",
				          "amount": {
				            "value": "270.0",
				            "currency": "GBP"
				          }
				        }
				      }
				    }
	    });
	    let retValue = moment().format('YYYY-MM-DD');
	    instance._handleDateChange(retValue);
	    instance._getExpectedScheduleValue();
	    expect(instance.state.pots.goal.when).toBe(retValue);
	    expect(instance.state.pots.schedule.recurrence.amount.value).toBe('£'+instance._getExpectedScheduleValue());
	  });

	   it('Unit Test Case 17 condition 2', () => {
	    	let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
	    	pots : {
				      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
				      "name": "Family Holiday",
				      "reference": "Reference",
				      "balance": {
				        "value": "1200.0",
				        "currency": "GBP"
				      },
				      "goal": {
				        "amount": {
				          "value": "2000",
				          "currency": "GBP"
				        },
				        "when": '2016-05-19'
				      },
				      "schedule": {
				        "recurrence": {
				          "frequency": {
				            "monthly": {
				              "interval": "1",
				              "day_of_month": "1"
				            }
				          },
				          "amount": {
				            "value": "100",
				            "currency": "GBP"
				          }
				        },
				        "next_payment": {
				          "when": "2016-05-19",
				          "amount": {
				            "value": "270.0",
				            "currency": "GBP"
				          }
				        }
				      }
				    }
	    });
	    let retValue = moment().format('YYYY-MM-DD');
	    instance._handleDateChange(retValue);
	    instance._getExpectedScheduleValue();
	    expect(instance.state.pots.goal.when).toBe(retValue);
	    expect(instance.state.pots.schedule.recurrence.amount.value).toBe('100');
	  });
	});

	describe('Unit Test Case 18 : CreateSavingsPot --> _getCurrentPotPage', () => {
	    it('Unit Test Case 18 condition 1', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance._getCurrentPotPage();
	    expect(SavingPotsActionCreator.getPotDetail.mock.calls.length).toBe(1);
	  });
	});

	describe('Unit Test Case 19 : CreateSavingsPot --> _onSubmit', () => {
		it('Unit Test Case 19 condition 1 ', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
	    	pots : {
				      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
				      "name": "Holiday",
				      "reference": "Reference",
				      "balance": {
				        "currency": "GBP",
				        "value": "1200.0",
				      },
				      "goal": {
				        "amount": {
				          "value": "",
				          "currency": "GBP"
				        },
				        "when": '2016-05-19'
				      },
				      "schedule": {
				        "recurrence": {
				          "frequency": {
				            "monthly": {
				              "interval": "1",
				              "day_of_month": "1"
				            }
				          },
				          "amount": {
				            "value": "",
				            "currency": "GBP"
				          }
				        },
				        "next_payment": {
				          "when": "2016-05-19",
				          "amount": {
				            "value": "270.0",
				            "currency": "GBP"
				          }
				        }
				      }
				    }
	    });
	    const event = {preventDefault: jest.fn()};
	    instance._onSubmit(event);
	    expect(instance.state.pots.goal.amount.value).toBe(0);
	  });

	  it('Unit Test Case 19 condition 2 ', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
	    	pots : {
				      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
				      "name": "Holiday",
				      "reference": "Reference",
				      "balance": {
				        "currency": "GBP",
				        "value": "1200.0",
				      },
				      "goal": {
				        "amount": {
				          "value": "100",
				          "currency": "GBP"
				        },
				        "when": '2016-05-19'
				      },
				      "schedule": {
				        "recurrence": {
				          "frequency": {
				            "monthly": {
				              "interval": "1",
				              "day_of_month": "1"
				            }
				          },
				          "amount": {
				            "value": "100",
				            "currency": "GBP"
				          }
				        },
				        "next_payment": {
				          "when": "2016-05-19",
				          "amount": {
				            "value": "270.0",
				            "currency": "GBP"
				          }
				        }
				      }
				    }
	    });
	    const event = {preventDefault: jest.fn()};
	    instance._onSubmit(event);
	    expect(instance.state.pots.goal.amount.value).toBe(100);
	  });

	  it('Unit Test Case 19 condition 3 ', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
	    	pots : {
				      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
				      "name": "Family Holiday",
				      "reference": "Reference",
				      "balance": {
				        "currency": "GBP",
				        "value": "1200.0",
				      },
				      "goal": {
				        "amount": {
				          "value": "100",
				          "currency": "GBP"
				        },
				        "when": '2016-05-19'
				      },
				      "schedule": {
				        "recurrence": {
				          "frequency": {
				            "monthly": {
				              "interval": "1",
				              "day_of_month": "1"
				            }
				          },
				          "amount": {
				            "value": "100",
				            "currency": "GBP"
				          }
				        },
				        "next_payment": {
				          "when": "2016-05-19",
				          "amount": {
				            "value": "270.0",
				            "currency": "GBP"
				          }
				        }
				      }
				    }
	    });
	    const event = {preventDefault: jest.fn()};
	    instance._onSubmit(event);
	    expect(instance.state.pots.name).toBe('Family Holiday');
	  });

	  it('Unit Test Case 19 condition 4 ', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
	    	pots : {
				      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
				      "name": "",
				      "reference": "Reference",
				      "balance": {
				        "currency": "GBP",
				        "value": "1200.0",
				      },
				      "goal": {
				        "amount": {
				          "value": 2000,
				          "currency": "GBP"
				        },
				        "when": '2016-05-19'
				      },
				      "schedule": {
				        "recurrence": {
				          "frequency": {
				            "monthly": {
				              "interval": "1",
				              "day_of_month": "1"
				            }
				          },
				          "amount": {
				            "value": 1234,
				            "currency": "GBP"
				          }
				        },
				        "next_payment": {
				          "when": "2016-05-19",
				          "amount": {
				            "value": "270.0",
				            "currency": "GBP"
				          }
				        }
				      }
				    },
			potBalanceValue : 1234,
	    });
	    const event = {preventDefault: jest.fn()};
	    instance._onSubmit(event);
	    expect(instance.state.pots.goal.amount.value).toBe(2000);
	  });

	});

	describe('Unit Test Case 20 : CreateSavingsPot --> _onSave', () => {
		it('Unit Test Case 20 condition 1', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
	    	pots : {
				      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
				      "name": "Holiday",
				      "reference": "Reference",
				      "balance": {
				        "currency": "GBP",
				        "value": "1200.0",
				      },
				      "goal": {
				        "amount": {
				          "value": "2000",
				          "currency": "GBP"
				        },
				        "when": '2016-05-19'
				      },
				      "schedule": {
				        "recurrence": {
				          "frequency": {
				            "monthly": {
				              "interval": "1",
				              "day_of_month": "1"
				            }
				          },
				          "amount": {
				            "value": "100",
				            "currency": "GBP"
				          }
				        },
				        "next_payment": {
				          "when": "2016-05-19",
				          "amount": {
				            "value": "270.0",
				            "currency": "GBP"
				          }
				        }
				      }
				    }
	    });
	    const event = {preventDefault: jest.fn()};
	    instance._onSave(event);
	    expect(event.preventDefault.mock.calls.length).toBe(1);
	  });

	  it('Unit Test Case 20 condition 2', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
	    	pots : {
				      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
				      "name": "Holiday",
				      "reference": "Reference",
				      "balance": {
				        "currency": "GBP",
				        "value": "1200.0",
				      },
				      "goal": {
				        "amount": {
				          "value": "",
				          "currency": "GBP"
				        },
				        "when": '2016-05-19'
				      },
				      "schedule": {
				        "recurrence": {
				          "frequency": {
				            "monthly": {
				              "interval": "1",
				              "day_of_month": "1"
				            }
				          },
				          "amount": {
				            "value": "",
				            "currency": "GBP"
				          }
				        },
				        "next_payment": {
				          "when": "2016-05-19",
				          "amount": {
				            "value": "270.0",
				            "currency": "GBP"
				          }
				        }
				      }
				    }
	    });
	    const event = {preventDefault: jest.fn()};
	    instance._onSave(event);
	    expect(instance.state.pots.goal.amount.value).toBe(0);
	  });

	  it('Unit Test Case 20 condition 3', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
	    	pots : {
				      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
				      "name": "Holiday",
				      "reference": "Reference",
				      "balance": {
				        "currency": "GBP",
				        "value": "1200.0",
				      },
				      "goal": {
				        "amount": {
				          "value": 1234,
				          "currency": "GBP"
				        },
				        "when": '2016-05-19'
				      },
				      "schedule": {
				        "recurrence": {
				          "frequency": {
				            "monthly": {
				              "interval": "1",
				              "day_of_month": "1"
				            }
				          },
				          "amount": {
				            "value": 1000,
				            "currency": "GBP"
				          }
				        },
				        "next_payment": {
				          "when": "2016-05-19",
				          "amount": {
				            "value": "270.0",
				            "currency": "GBP"
				          }
				        }
				      }
				    }
	    });
	    const event = {preventDefault: jest.fn()};
	    instance._onSave(event);
	    expect(instance.state.pots.goal.amount.value).toBe(1234);
	  });

	});

	describe('Unit Test Case 21 : CreateSavingsPot --> _closeAlertModal', () => {
		it('Unit Test Case 21 condition 1', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance._closeAlertModal();
	    expect(instance.state.isDuplicateModal).toBe(false);
	  });

	});


	describe('Unit Test Case 22 : CreateSavingsPot --> render', () => {
		it('Unit Test Case 22 condition 1', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
	    	pots : {
				      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
				      "name": "Holiday",
				      "reference": "Reference",
				      "balance": {
				        "currency": "GBP",
				        "value": "1200.0",
				      },
				      "goal": {
				        "amount": {
				          "value": 2000,
				          "currency": "GBP"
				        },
				        "when": '2016-05-19'
				      },
				      "schedule": {
				        "recurrence": {
				          "frequency": {
				            "monthly": {
				              "interval": "1",
				              "day_of_month": "1"
				            }
				          },
				          "amount": {
				            "value": 100,
				            "currency": "GBP"
				          }
				        },
				        "next_payment": {
				          "when": "2016-05-19",
				          "amount": {
				            "value": "270.0",
				            "currency": "GBP"
				          }
				        }
				      }
				    }
	    });
	    instance.setState({
	    	potBalanceValue : "12342",
	    })
	    expect(instance.state.pots.goal.amount.value).toBe(2000);
	  });

	  it('Unit Test Case 22 condition 2', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
	    	pots : {
				      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
				      "name": "Holiday",
				      "reference": "Reference",
				      "balance": {
				        "currency": "GBP",
				        "value": "1200.0",
				      },
				      "goal": {
				        "amount": {
				          "value": 2000,
				          "currency": "GBP"
				        },
				        "when": '2016-05-19'
				      },
				      "schedule": {
				        "recurrence": {
				          "frequency": {
				            "monthly": {
				              "interval": "1",
				              "day_of_month": "1"
				            }
				          },
				          "amount": {
				            "value": 100,
				            "currency": "GBP"
				          }
				        },
				        "next_payment": {
				          "when": "2016-05-19",
				          "amount": {
				            "value": "270.0",
				            "currency": "GBP"
				          }
				        }
				      }
				    }
	    });
	    instance.setState({
	    	potBalanceValue : 12342,
	    })
	    expect(instance.state.pots.goal.amount.value).toBe(2000);
	  });

	});


	describe('Unit Test Case 23 : CreateSavingsPot --> checkNumber', () => {
	it('Unit Test Case 23 condition 1', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    let e = '1000000.123';
	    expect(instance.checkNumber(e)).toBe(false);
	  });

	it('Unit Test Case 23 condition 2', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    let e = '1000.12';
	    expect(instance.checkNumber(e)).toBe(true);
	  });

	it('Unit Test Case 23 condition 3', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    let e = '1000000.12.13';
	    expect(instance.checkNumber(e)).toBe(false);
	  });
	});

	describe('Unit Test Case 24 : CreateSavingsPot --> _onKeyDown', () => {
	it('Unit Test Case 24 condition 1', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance._onKeyDown();
	    expect(instance.state.isGoalShaked).toBe('');
	  });
	});

	describe('Unit Test Case 25 : CreateSavingsPot --> _onBalanceKeyDown', () => {
	it('Unit Test Case 25 condition 1', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance._onBalanceKeyDown();
	    expect(instance.state.isBalanceShaked).toBe('');
	  });
	});

	describe('Unit Test Case 26 : CreateSavingsPot --> _onMonthlyContributionKeyDown', () => {
	it('Unit Test Case 26 condition 1', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance._onMonthlyContributionKeyDown();
	    expect(instance.state.isBalanceShaked).toBe('');
	  });
	});

	describe('Unit Test Case 27 : CreateSavingsPot --> _handlePotGoalBlur', () => {
	it('Unit Test Case 27 condition 1', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance._handlePotGoalBlur();
	    expect(instance.state.isBalanceShaked).toBe('');
	  });
	});

	describe('Unit Test Case 28 : CreateSavingsPot --> _handlePotGoalBlur', () => {
	it('Unit Test Case 28 condition 1', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
			pots:{
					      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
					      "name": "Family Holiday",
					      "reference": "Reference",
					      "balance": {
					        "value": "1200.0",
					        "currency": "GBP"
					      },
					      "goal": {
					        "amount": {
					          "value": '123',
					          "currency": "GBP"
					        },
					        "when": moment().format('YYYY-MM-DD')
					      },
					      "schedule": {
					        "recurrence": {
					          "frequency": {
					            "monthly": {
					              "interval": "1",
					              "day_of_month": "1"
					            }
					          },
					          "amount": {
					            "value": '123',
					            "currency": "GBP"
					          }
					        },
					        "next_payment": {
					          "when": "2016-05-19",
					          "amount": {
					            "value": "270.0",
					            "currency": "GBP"
					          }
					        }
					      }
					 },
			isChanged : true,
		});
	    instance._handlePotGoalBlur();
	    expect(instance.state.isChanged).toBe(true);
	  });
	});


	describe('Unit Test Case 29 : CreateSavingsPot --> _handlePotBalanceChange', () => {
	it('Unit Test Case 29 condition 1', () => {
		let event = {target:{value:'.'}}
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance._handlePotBalanceChange(event);
	    expect(instance.state.isBalanceShaked).toBe('animated shake');
	  });
	});

	describe('Unit Test Case 30 : CreateSavingsPot --> _handlePotBalanceChange', () => {
	it('Unit Test Case 30 condition 1', () => {
		let event = {target:{value:'.'}}
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
	    	potBalanceValue : '0.',
	    })
	    instance._handlePotBalanceChange(event);
	    expect(instance.state.isBalanceShaked).toBe('animated shake');
	  });
	});

	describe('Unit Test Case 31 : CreateSavingsPot --> _handlePotBalanceChange', () => {
	it('Unit Test Case 31 condition 1', () => {
		let event = {target:{value:'0.0'}}
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
	    	potBalanceValue : '0.0',
	    })
	    instance._handlePotBalanceChange(event);
	    expect(instance.state.potBalanceValue).toBe('£0.0');
	  });
	});

	describe('Unit Test Case 32 : CreateSavingsPot --> _handlePotBalanceChange', () => {
	it('Unit Test Case 32 condition 1', () => {
		let event = {target:{value:'0.00'}}
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
	    	potBalanceValue : '0.00',
	    })
	    instance._handlePotBalanceChange(event);
	    expect(instance.state.potBalanceValue).toBe('£0.00');
	  });
	});

	describe('Unit Test Case 33 : CreateSavingsPot --> _handlePotBalanceChange', () => {
	it('Unit Test Case 33 condition 1', () => {
		let event = {target:{value:'0'}}
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
	    	potBalanceValue : '0.00',
	    })
	    instance._handlePotBalanceChange(event);
	    expect(instance.state.potBalanceValue).toBe('£0');
	  });
	it('Unit Test Case 33 condition 2', () => {
		let event = {target:{value:'0'}}
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
	    	potBalanceValue : '1234',
	    })
	    instance._handlePotBalanceChange(event);
	    expect(instance.state.isBalanceShaked).toBe('animated shake');
	  });
	});
 	

	describe('Unit Test Case 34 : CreateSavingsPot --> checkNumberForBalance', () => {
	it('Unit Test Case 34 condition 1', () => {
	    let instance = TestUtils.renderIntoDocument(<CreateSavingsPot {...props}/>);
	    instance.setState({
			pots:{
					      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
					      "name": "Family Holiday",
					      "reference": "Reference",
					      "balance": {
					        "value": "1200.0",
					        "currency": "GBP"
					      },
					      "goal": {
					        "amount": {
					          "value": "123",
					          "currency": "GBP"
					        },
					        "when": moment().format('YYYY-MM-DD')
					      },
					      "schedule": {
					        "recurrence": {
					          "frequency": {
					            "monthly": {
					              "interval": "1",
					              "day_of_month": "1"
					            }
					          },
					          "amount": {
					            "value": "1234",
					            "currency": "GBP"
					          }
					        },
					        "next_payment": {
					          "when": "2016-05-19",
					          "amount": {
					            "value": "270.0",
					            "currency": "GBP"
					          }
					        }
					      }
					 },
		});
		let event = "12345.12.12";
	    instance.checkNumberForBalance(event);
	    expect(instance.state.pots.goal.amount.value).toBe('123');
	  });

	});
});
