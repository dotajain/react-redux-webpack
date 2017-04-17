
jest.unmock('../SavingPotDetail');
jest.unmock('../PotMessages');
jest.unmock('../DeleteModal');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const _ = require('lodash');
const SavingPotDetail = require('../SavingPotDetail');
const PotMessages = require('../PotMessages');
const Button = require('react-bootstrap/lib/Button');
const moment = require('moment');
const DeleteModal = require('../DeleteModal');
const CircularProgress = require('../CircularProgress');
const PotDetailMessages = require('../PotDetailMessages');
const SavingPotsActionCreator = require('../../../actions/SavingPotsActionCreator');

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<SavingPotDetail
						   {...props}
						/>);
	return shallowRenderer.getRenderOutput();
};

describe('SavingPotDetail Test Cases', () => {

	let component;
	let props;

	beforeEach(()=>{
		props = {
			  potDetailsData: {
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
			  },
			  "unallocated_amount": {
			    "value": 8818.9,
			    "currency": "GBP"
			  },
			  showModal : false,
			  content:{
			  		savingPotRejigDeletMessage1: 'Are you sure you want ot delete this Savings Pot? You won\'t be able to cancel the deletion afterwards.',
         			savingPotRejigDeletMessage2: 'Deleting this pot will not cancel any associated standing orders; please do this manually.',
          			savingpotAimingBal:' You\'re aming for',
					savingpotByBal:'by',
					savingpotByputtingAway:'by putting away',
					savingpotAmonth:'a month',
			  },
			  getPotPageHandleClick : jest.fn(),
			  _editPot: jest.fn(),
			}
		component = shallowRender(props);
	});
	
	it ('Unit Test Case 1 : SavingPotDetail --> toBeDefined',()=>{
	   expect(component).toBeDefined();
	});

	it ('Unit Test Case 2 : SavingPotDetail --> Check Content',()=>{
    let instance = TestUtils.renderIntoDocument(<SavingPotDetail {...props}/>);
    expect(instance.props.content.savingPotRejigDeletMessage1).toBe(props.content.savingPotRejigDeletMessage1);

 	});

   it('Unit Test Case 3 : SavingPotDetail --> Button Click', () => {
    let instance = TestUtils.renderIntoDocument(<SavingPotDetail {...props}/>);
    const buttons = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button');
    _.map(buttons, i => {
         TestUtils.Simulate.click(i);
    })
    expect(SavingPotsActionCreator.getCreateSavingPotPage.mock.calls.length).toBe(1);
  });

  it ('Unit Test Case 4 : SavingPotDetail --> _smClose  --> showModal',()=>{
    let instance = TestUtils.renderIntoDocument(<SavingPotDetail {...props}/>);
    instance.setState({
      showModal: false,
    });
    instance._smClose();
    expect(instance.state.showModal).toBe(false);
  });

  it ('Unit Test Case 5 : SavingPotDetail --> _smShow  --> showModal',()=>{
    let instance = TestUtils.renderIntoDocument(<SavingPotDetail {...props}/>);
    instance.setState({
      showModal: false,
    });
    instance._smShow();
    expect(instance.state.showModal).toBe(true);
  });


  it ('Unit Test Case 6 : SavingPotDetail --> _onDelete  --> showModal',()=>{
    let instance = TestUtils.renderIntoDocument(<SavingPotDetail {...props}/>);
    instance.setState({
      showModal: false,
    });
    instance._onDelete();
    expect(instance.state.showModal).toBe(false);
  });
});