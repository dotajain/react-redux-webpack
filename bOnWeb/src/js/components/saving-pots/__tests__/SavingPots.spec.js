
jest.unmock('../SavingPots');
jest.unmock('../SavingPotsList');

const React = require('react');
const TestUtils = require('react-addons-test-utils');

const SavingPots = require('../SavingPots');
const SavingPotsList = require('../SavingPotsList');
const SavingPotsActionCreator = require('../../../actions/SavingPotsActionCreator');

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<SavingPots
						   {...props}
						/>);
	return shallowRenderer.getRenderOutput();
};

describe('SavingPots Test Cases', () => {

	let component;
	let props;

	beforeEach(()=>{
		props = {
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
			  },
			  content:{
			  	savingpotMainPageTitle1:'You have',
				savingpotMainPageTitle2:'that could go in a Savings Pot',
			  },
			  _getCreateSavingPot: jest.fn(),
			  unallocatedAmount: -116,
			}
		component = shallowRender(props);
	});
	
	it ('Unit Test Case 1 : SavingPots  -->  toBeDefined',()=>{
	expect(component).toBeDefined();
	});


	it ('Unit Test Case 2 : SavingPots  -->  If',()=>{
    	expect(props.pots.length).toBe(1);
	});


	it ('Unit Test Case 3 : SavingPots  -->  Else',()=>{
		props = {
			  "pots": [
			  ],
			  "unallocated_amount": {
			    "value": 8818.9,
			    "currency": "GBP"
			  },
			  content:{
			  	savingpotMainPageTitle1:'You have',
				savingpotMainPageTitle2:'that could go in a Savings Pot',
			  },
			  _getCreateSavingPot: jest.fn(),
			  unallocatedAmount: -116,
			}
		component = shallowRender(props);
    	expect(props.pots.length).toBe(0);
	});

	it ('Unit Test Case 4 : SavingPots --> _getCreateSavingPot',()=>{
	    let instance = TestUtils.renderIntoDocument(<SavingPots {...props}/>);
	    instance._getCreateSavingPot = jest.genMockFunction();
	    TestUtils.Simulate.change(instance);
	    instance._getCreateSavingPot();
	    expect(instance._getCreateSavingPot).toBeCalled();
	});

  it ('Unit Test Case 5 : toBeCalled --> onClick',()=>{
	    let instance = TestUtils.renderIntoDocument(<SavingPots {...props}/>);
	    const button = TestUtils.findRenderedDOMComponentWithClass(instance, 'btn btn-link');
	    button.props.onClick({});
	    expect(SavingPotsActionCreator.getCreateSavingPotPage.mock.calls.length).toBe(1);
	});
});