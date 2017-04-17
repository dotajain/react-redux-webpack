jest.unmock('../SavingPotsRejig');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const _ = require('lodash');

const SavingPotsRejig = require('../SavingPotsRejig');
const SavingPotsActionCreator = require('../../../actions/SavingPotsActionCreator');
const NBAComponent = require('../../common/NBAComponent');
const NumberUtils = require('../../../utils/NumberUtils');
let component;
	let props;
const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<SavingPotsRejig
						   {...props}
						/>);
	return shallowRenderer.getRenderOutput();
};

describe('SavingPotsRejig Unit Test Cases : ', () => {

	beforeEach(() => {	
		props = {
      pots:[{
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
      }],
      content:{
        savingPotRejigTitle:'Uh oh, fancy a rejig?',
        savingpotRejigMessage2:'more for your Savings Pot(s) than you have in this account. To make sure things add up, please do one of the following:',
        savingPotReduceRejigButton:'Reduce or delete Savings Pots',
        savingPotMoveMoneyButton2:'Move money into my savings account',
      },
      unallocatedAmount : -116,
      _getReducePotPage : jest.genMockFunction(),
      _handleMoveMoney : jest.genMockFunction(),
		}

		component = shallowRender(props);
		
	});


  it('SavingPotsRejig --> Unit Test Case 1 : ToBeDefined',()=>{
    expect(component).toBeDefined();
  });


	it('SavingPotsRejig --> Unit Test Case 2 : Check content',()=>{
    let instance = TestUtils.renderIntoDocument(<SavingPotsRejig {...props}/>);
    expect(instance.props.content.savingPotRejigTitle).toBe(props.content.savingPotRejigTitle);
    
	});

  it('SavingPotsRejig --> Unit Test Case 3 : _getReducePotPage event', () => {
    let instance = TestUtils.renderIntoDocument(<SavingPotsRejig {...props}/>);
    const buttons = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button');
    _.map(buttons, i => {
         TestUtils.Simulate.click(i);
    })
    expect(SavingPotsActionCreator.getReducePotPage.mock.calls.length).toBe(1);
  });
  

});
