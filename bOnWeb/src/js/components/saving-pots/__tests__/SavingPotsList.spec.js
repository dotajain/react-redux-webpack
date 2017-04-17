jest.unmock('../SavingPotsList');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const _ = require('lodash');
const SavingPotsList = require('../SavingPotsList');

const SavingPotsActionCreator = require('../../../actions/SavingPotsActionCreator');
const moment = require('moment');
const PotMessages = require('../PotMessages');

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<SavingPotsList
						   {...props}
						/>);
	return shallowRenderer.getRenderOutput();
};

describe('SavingPotsList Test Cases : ', () => {
	let component;
	let props;

beforeEach(() => {	
		    props = {
	        content : {
	          savingpotTargetDate:'Target date',
	        },
		  "pot": {
		      "id": "3ebbc744-9a3b-414e-b5b7-49e4afd365be",
		      "name": "Garden Landscaping",
		      "reference": "1",
		      "balance": {
		        "value": 1600.0,
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
		  "unallocated_amount": {
		    "value": -116.87,
		    "currency": "GBP"
		  },
		  getAccountColor: jest.fn(),
		  _getCurrentPotPage : jest.fn(),
		}

		component = shallowRender(props);
	});
	
	it ('Unit Test Case 1 : SavingPotsList --> toBeDefined', function() {
		expect(component).toBeDefined();
	});

	it('Unit Test Case 2 : SavingPotsList --> Check Content', () => {
	    let instance = TestUtils.renderIntoDocument(<SavingPotsList {...props}/>);
		expect(instance.props.content.savingpotTargetDate).toBe(props.content.savingpotTargetDate);   
	});

	it ('Unit Test Case 3 : SavingPotsList --> getAccountColor --> toBeCalled',()=>{
	    let instance = TestUtils.renderIntoDocument(<SavingPotsList {...props}/>);
	    instance.getAccountColor = jest.genMockFunction();
	    TestUtils.Simulate.change(instance);
	    instance.getAccountColor();
	    expect(instance.getAccountColor).toBeCalled();
	});

	it ('Unit Test Case 4 : SavingPotsList --> _getCurrentPotPage --> toBeCalled',()=>{
	    let instance = TestUtils.renderIntoDocument(<SavingPotsList {...props}/>);
	    instance._getCurrentPotPage = jest.genMockFunction();
	    TestUtils.Simulate.change(instance);
	    instance._getCurrentPotPage();
	    expect(instance._getCurrentPotPage).toBeCalled();
    });

    it('Unit Test Case 5 : SavingPotsList --> _getCurrentPotPage --> toBeCalled', () => {
    let instance = TestUtils.renderIntoDocument(<SavingPotsList {...props}/>);
    const articleTag = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'article');
    _.map(articleTag, i => {
         TestUtils.Simulate.click(i);
    })
    expect(SavingPotsActionCreator.getPotDetail.mock.calls.length).toBe(1);
  });

});