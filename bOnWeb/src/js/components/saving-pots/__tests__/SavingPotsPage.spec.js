
jest.unmock('../SavingPotsPage');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

const SavingPotsPage = require('../SavingPotsPage');
const SavingPotsLanding = require('../SavingPotsLanding');
const AccountsStore = require('../../../stores/AccountsStore');
const SavingsPotsStore = require('../../../stores/SavingsPotsStore');
const SavingPotsActionCreator = require('../../../actions/SavingPotsActionCreator');
const AccountsActionCreator = require('../../../actions/AccountsActionCreator');

const _ = require('lodash');

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<SavingPotsPage
						   {...props}
						/>);
	return shallowRenderer.getRenderOutput();
};

describe('SavingPotsPage Unit Test Cases : ', () => {
	let component;
	let props;
	let accountsList;
	let potData;
	let content;
	let potPage;
	let instance;

	beforeEach(() => {
		props = {
			 content:{
			 		savingPotLoading:'loading...'
			 }
		},
		accountsList = {"accounts": [
			    {
			      "id": "05985dae-d2de-4ebc-ab0a-79093081bde5",
			      "type": "loan",
			      "product": {
			        "code": "901",
			        "name": "Personal Loan",
			        "description": "Personal Loan"
			      },
			      "actions_available": {
			        "/account/pots": false
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
			  ]},
		potData = [{
			  "pots": [
			    {
			      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
			      "name": "Family Holiday",
			      "reference": "Reference",
			      "balance": {
			        "value": 1200.0,
			        "currency": "GBP"
			      },
			      "goal": {
			        "amount": {
			          "value": 18000.0,
			          "currency": "GBP"
			        },
			        "when": "2017-08-16"
			      },
			      "schedule": {
			        "recurrence": {
			          "frequency": {
			            "monthly": {
			              "interval": 1,
			              "day_of_month": 1
			            }
			          },
			          "amount": {
			            "value": 270.0,
			            "currency": "GBP"
			          }
			        },
			        "next_payment": {
			          "when": "2016-05-19",
			          "amount": {
			            "value": 270.0,
			            "currency": "GBP"
			          }
			        }
			      }
			    }
			  ],
			  "unallocated_amount": {
			    "value": 8818.9,
			    "currency": "GBP"
			  }
			}],
		//AccountsStore.getAll();
		AccountsStore.getAll.mockReturnValue(accountsList);
		SavingsPotsStore.getPotData.mockReturnValue(potData);
		component = shallowRender(props);
    	instance = TestUtils.renderIntoDocument(<SavingPotsPage {...props}/>);
	});


	it('Unit Test Case 1 : SavingPotsPage --> toBeDefined',()=> {
		expect(component).toBeDefined();

	});

	it('Unit Test Case 2 : SavingPotsPage --> SavingPotsLanding', ()=>{
		accountsList = {"accounts": [
			    {
			      "id": "05985dae-d2de-4ebc-ab0a-79093081bde5",
			      "type": "loan",
			      "product": {
			        "code": "901",
			        "name": "Personal Loan",
			        "description": "Personal Loan"
			      },
			      "actions_available": {
			        "/account/pots": true
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
			        "/account/pots": true
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
			        "/account/pots": true
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
			        "/account/pots": true
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
			        "/account/pots": true
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
			        "/account/pots": true
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
			        "/account/pots": true
			      }
			    }
			  ]}
    	instance = TestUtils.renderIntoDocument(<SavingPotsPage {...props}/>);
    	instance.setState({
    		accountsList : accountsList,
    		hasAccountList : true,
    		displayLoading : false,
    		checkpotFlag : true,
    	});
		expect(instance.state.accountsList.accounts.length).toBe(7);
	});


	it('Unit Test Case 3 : SavingPotsPage --> NoSavingPotsEnable', ()=>{
		accountsList = {"accounts": [
			    {
			      "id": "05985dae-d2de-4ebc-ab0a-79093081bde5",
			      "type": "loan",
			      "product": {
			        "code": "901",
			        "name": "Personal Loan",
			        "description": "Personal Loan"
			      },
			      "actions_available": {
			        "/account/pots": false
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
			  ]}
    	instance = TestUtils.renderIntoDocument(<SavingPotsPage {...props}/>);
    	instance.setState({
    		accountsList : accountsList,
    	});
    	expect(instance.state.accountsList.accounts.length).toBe(7);
	});

	it('Unit Test Case 4 : SavingPotsPage --> AccountsList is empty', ()=>{
		let checkCondition;
		accountsList = {"accounts": []}
    	instance = TestUtils.renderIntoDocument(<SavingPotsPage {...props}/>);
    	instance.setState({
    		accountsList : accountsList,
    	});
		expect(instance.state.accountsList.accounts.length).toBe(0);
	});

  it ('Unit Test Case 5 : SavingPotsPage --> _getAccountList  --> if',()=>{
    instance = TestUtils.renderIntoDocument(<SavingPotsPage {...props}/>);
    instance.setState({
      hasAccountList: true,
      accountsList: accountsList,
    });
    instance._getAccountList();
    expect(instance.state.hasAccountList).toBe(true);
  });

  it ('Unit Test Case 6 : SavingPotsPage --> _getAccountList  --> else',()=>{
    instance = TestUtils.renderIntoDocument(<SavingPotsPage {...props}/>);
    instance.setState({
      hasAccountList: false,
    });
    instance._getAccountList();
    expect(instance.state.hasAccountList).toBe(false);
  });

  it ('Unit Test Case 7 : SavingPotsPage --> _onStoreChange',()=>{
    instance = TestUtils.renderIntoDocument(<SavingPotsPage {...props}/>);
    instance.setState({
      hasAccountList: false,
    });
    instance._onStoreChange();
    expect(instance.state.hasAccountList).toBe(true);
  });

  it ('Unit Test Case 8 : SavingPotsPage --> _getPotPage',()=>{
    instance = TestUtils.renderIntoDocument(<SavingPotsPage {...props}/>);
    instance._getPotPage();
	expect(SavingPotsActionCreator.getPotData.mock.calls.length).toBe(1);

  });

  it ('Unit Test Case 9 : SavingPotsPage --> componentWillUnmount',()=>{
    instance = TestUtils.renderIntoDocument(<SavingPotsPage {...props}/>);
    instance.componentWillUnmount();
	expect(SavingsPotsStore.removeChangeListener.mock.calls.length).toBe(1);

  });

   it('Unit Test Case 10 : SavingPotsPage --> isError', ()=>{
		accountsList = {"accounts": [
			    {
			      "id": "05985dae-d2de-4ebc-ab0a-79093081bde5",
			      "type": "loan",
			      "product": {
			        "code": "901",
			        "name": "Personal Loan",
			        "description": "Personal Loan"
			      },
			      "actions_available": {
			        "/account/pots": true
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
			        "/account/pots": true
			      }
			    }
			  ]}
    	instance = TestUtils.renderIntoDocument(<SavingPotsPage {...props}/>);
    	instance.setState({
    		accountsList : accountsList,
    		hasAccountList : true,
    		displayLoading : false,
    		checkpotFlag : false,
    		isError : true,
    	});
		expect(instance.state.accountsList.accounts.length).toBe(2);
	});

   it('Unit Test Case 11 : SavingPotsPage --> _reload', ()=>{
			instance._reload();
			expect(SavingPotsActionCreator.getAccountsList.mock.calls.length).toBe(32);
			expect(AccountsActionCreator.getAccountsList.mock.calls.length).toBe(32);
	});

   it('Unit Test Case 12 : SavingPotsPage --> openFaq()',()=>{
			instance  = TestUtils.renderIntoDocument(<SavingPotsPage {...props}/>);
			instance.openFaq();
			expect(instance.state.faqFlag).toBe(true);
	});

	it('Unit Test Case 13 : SavingPotsPage --> closeFaq()',()=>{
			instance  = TestUtils.renderIntoDocument(<SavingPotsPage {...props}/>);
			instance.closeFaq();
			expect(instance.state.faqFlag).toBe(false);
	});

	it('Unit Test Case 14 : SavingPotsPage --> isNetworkError',()=>{
    let instance = TestUtils.renderIntoDocument(<SavingPotsPage {...props}/>);
    instance.setState({
    	checkpotFlag : false,
    	unavailableCheck : false,
    	isError : false,
    	isNetworkError : true,
    })
    expect(instance.state.isNetworkError).toBe(true);
  });

});