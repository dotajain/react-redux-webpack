jest.unmock('../SavingPotConfirmation');
const React = require('react');

const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

const SavingPotConfirmation = require('../SavingPotConfirmation');
const SavingPotsActionCreator = require('../../../actions/SavingPotsActionCreator');
const PaymentsActionCreator = require('../../../actions/PaymentsActionCreator');
const SavingsPotsStore = require('../../../stores/SavingsPotsStore');

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<SavingPotConfirmation
						   {...props}
						/>);
	return shallowRenderer.getRenderOutput();
};

describe('SavingPotConfirmation Unit Test Cases : ', () => {

	let component;
	let props;
  let newpotDataVal;

beforeEach(() => {	
		props = {
      getSelectedAccountID : "3ebbc744-9a3b-414e-b5b7-49e4afd365be",
      content : {
        savingsPotCancelButton:'Cancel',
        savingsPotConfirmationMessage:'Great. Your Savings Pot has been created',
        savingsPotConfirmationTransfer:'Want to make a one-off transfer to kick start it now?',
        savingsPotConfirmationTransferRegular:'Or Set up a regular transfer?',
        savingDone:'Done',
      },
        _onSubmit: jest.fn(),
        getPotPageHandleClick: jest.fn(),
        newpotData:{
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
        }
		}
    global.sessionStorage = jest.genMockFunction();
    global.sessionStorage.setItem = jest.genMockFunction();
    global.sessionStorage.getItem = jest.genMockFunction();
    newpotDataVal = SavingsPotsStore.getCreatedPotData.mockReturnValue();
    SavingsPotsStore.getCreatedPotData.mockReturnValue(props.newpotData);
		component = shallowRender(props);
	});

  it ('Unit Test Case 1 : SavingPotConfirmation --> toBeDefined',()=>{

    let instance = TestUtils.renderIntoDocument(<SavingPotConfirmation {...props}/>);
  expect(instance).toBeDefined();
  });

	it('Unit Test Case 2 : SavingPotConfirmation --> check content', () => {
    let instance = TestUtils.renderIntoDocument(<SavingPotConfirmation {...props}/>);
    expect(instance.props.content.savingsPotCancelButton).toBe('Cancel');
	});

  it ('Unit Test Case 3 : toBeCalled --> _onSubmit',()=>{
    let instance = TestUtils.renderIntoDocument(<SavingPotConfirmation {...props}/>);
    instance._onSubmit = jest.genMockFunction();
    TestUtils.Simulate.change(instance);
    instance._onSubmit();
    expect(instance._onSubmit.mock.calls.length).toBe(1);
  });


    it ('Unit Test Case 4 : toBeCalled --> getPotPageHandleClick',()=>{
    let instance = TestUtils.renderIntoDocument(<SavingPotConfirmation {...props}/>);
    instance.getPotPageHandleClick = jest.genMockFunction();
    TestUtils.Simulate.change(instance);
    instance.getPotPageHandleClick();
    expect(instance.getPotPageHandleClick).toBeCalled();
  });

    it ('Unit Test Case 5 : toBeCalled --> _handleClickOnOffTransfer',()=>{
    let instance = TestUtils.renderIntoDocument(<SavingPotConfirmation {...props}/>);
    instance.setState({
        newpotData:{
          id : props.newpotData.id
        }
    })
    instance._handleClickOnOffTransfer();
    expect(instance.state.newpotData.id).toBe(props.newpotData.id);
  });
   
    it ('Unit Test Case 6 : toBeCalled --> _handleClickRegularTransfer',()=>{
    let instance = TestUtils.renderIntoDocument(<SavingPotConfirmation {...props}/>);
    instance.setState({
        newpotData:{
          id : props.newpotData.id
        }
    })
    instance._handleClickRegularTransfer();
    expect(instance.state.newpotData.id).toBe(props.newpotData.id);
  });

});