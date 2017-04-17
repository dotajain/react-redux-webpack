jest.unmock('../ReducePotList');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

const DeleteModal = require('../DeleteModal');
const Button = require('react-bootstrap/lib/Button');
const moment = require('moment');

const ReducePotList = require('../ReducePotList');
const CircularProgress = require('../CircularProgress');
const SavingPotsActionCreator = require('../../../actions/SavingPotsActionCreator');

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<ReducePotList
						   {...props}
						/>);
	return shallowRenderer.getRenderOutput();
};

describe('ReducePotList Test Cases', () => {

	let component;
	let props;
  let instance;

	beforeEach(()=>{
		props = {
      content : {
          savingPotRejigDeletMessage1: 'Are you sure you want ot delete this Savings Pot? You won\'t be able to cancel the deletion afterwards.',
          savingPotRejigDeletMessage2: 'Deleting this pot will not cancel any associated standing orders; please do this manually.',
          savingpotTargetDate:'Target date',
      },
      key:1,
      getKey : 1,
      getAccountColor: "green",
      id : 1,
      selected : 1,
        getFull: {
            "pots": [
              {
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
              {
                "id": "c24003fa-ddd8-4de7-afe1-5ae4b46aeaa7",
                "name": "Bathroom Improvements",
                "reference": "2",
                "balance": {
                  "value": 1020.0,
                  "currency": "GBP"
                },
                "goal": {
                  "amount": {
                    "value": 3000.0,
                    "currency": "GBP"
                  },
                  "when": "2017-08-01"
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
                      "value": 60.0,
                      "currency": "GBP"
                    }
                  },
                  "next_payment": {
                    "when": "2016-06-16",
                    "amount": {
                      "value": 60.0,
                      "currency": "GBP"
                    }
                  }
                }
              }
            ],
            "unallocated_amount": {
              "value": -116.87,
              "currency": "GBP"
            }
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
      onToggle : jest.fn(),
    }   
    instance = TestUtils.renderIntoDocument(<ReducePotList   {...props}/>);
		component = shallowRender(props);
	});
	
    describe('Unit Test Case 1', () => {
  	it ('Unit Test Case 1 : ReducePotList --> toBeDefined',()=>{
  	   expect(component).toBeDefined();
  	});
  });
    describe('Unit Test Case 2', () => {
    it ('Unit Test Case 2 : ReducePotList --> Check Balance',()=>{
    expect(props.pot.balance.value).toBe(1600.0);
  });
});


  describe('Unit Test Case 3', () => {
  it ('Unit Test Case 3 : ReducePotList --> _onChange --> toBeCalled',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePotList {...props}/>);
    instance._onChange = jest.genMockFunction();
    TestUtils.Simulate.change(instance);
    instance._onChange();
    expect(instance._onChange).toBeCalled();
  });
});
  
    describe('Unit Test Case 4', () => {
  it ('Unit Test Case 4 : ReducePotList --> _decrement --> toBeCalled',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePotList {...props}/>);
    instance._decrement = jest.genMockFunction();
    TestUtils.Simulate.change(instance);
    instance._decrement();
    expect(instance._decrement).toBeCalled();
  });
});

    describe('Unit Test Case 5', () => {
   it ('Unit Test Case 5 : ReducePotList --> _increment --> toBeCalled',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePotList {...props}/>);
    instance._increment = jest.genMockFunction();
    TestUtils.Simulate.change(instance);
    instance._increment();
    expect(instance._increment).toBeCalled();
  });
});

    describe('Unit Test Case 6', () => {
   it ('Unit Test Case 6 : ReducePotList --> _potPercentage --> toBeCalled',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePotList {...props}/>);
    instance._potPercentage = jest.genMockFunction();
    TestUtils.Simulate.change(instance);
    instance._potPercentage();
    expect(instance._potPercentage).toBeCalled();
  });
});

    describe('Unit Test Case 7', () => {
   it ('Unit Test Case 7 : ReducePotList --> _smClose  --> showModal',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePotList {...props}/>);
    instance.setState({
      showModal: false,
    });
    instance._smClose();
    expect(instance.state.showModal).toBe(false);
  });
});

    describe('Unit Test Case 8', () => {
  it ('Unit Test Case 8 : ReducePotList --> _smShow  --> showModal',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePotList {...props}/>);
    instance.setState({
      showModal: false,
    });
    instance._smShow();
    expect(instance.state.showModal).toBe(true);
  });
});

    describe('Unit Test Case 9', () => {
  it ('Unit Test Case 9 : ReducePotList --> _validateNumber  --> true',()=>{
    let numVar = 2000.23;
    let returnNum;
    let instance = TestUtils.renderIntoDocument(<ReducePotList {...props}/>);
    returnNum = instance._validateNumber(numVar);
    expect(returnNum).toBe(true);
  });
});

    describe('Unit Test Case 10', () => {
  it ('Unit Test Case 10 : ReducePotList --> _validateNumber  --> false',()=>{
    let numVar = "20ab00.23";
    let returnNum;
    let instance = TestUtils.renderIntoDocument(<ReducePotList {...props}/>);
    returnNum = instance._validateNumber(numVar);
    expect(returnNum).toBe(false);
  });
});

    describe('Unit Test Case 11', () => {
  it ('Unit Test Case 11 : ReducePotList --> _potPercentage  --> balanceValue',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePotList {...props}/>);
    instance.setState({
      balanceValue: "2001",
    });
    instance._potPercentage = jest.genMockFunction();
    TestUtils.Simulate.change(instance);
    instance._potPercentage();
    expect(instance._potPercentage).toBeCalled();
  });
});

    describe('Unit Test Case 12', () => {
  it ('Unit Test Case 12 : ReducePotList --> _increment  --> if',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePotList {...props}/>);
    instance.setState({
      balanceValue: "2001",
    });
    instance._increment();
    expect(instance.state.balanceValue).toBe("2001");
  });
});

    describe('Unit Test Case 13', () => {
  it ('Unit Test Case 13 : ReducePotList --> _increment  --> else',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePotList {...props}/>);
    instance.setState({
      balanceValue: "200",
    });
    instance._increment();
    expect(instance.state.balanceValue).toBe("£210");
  });
});

    describe('Unit Test Case 14', () => {
  it ('Unit Test Case 14 : ReducePotList --> _increment  --> else',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePotList {...props}/>);
    instance.setState({
      balanceValue: "123",
    });
    instance._increment();
    expect(instance.state.balanceValue).toBe("£130");
  });
});

    describe('Unit Test Case 15', () => {
  it ('Unit Test Case 15 : ReducePotList --> _incrementCountCal  --> else',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePotList {...props}/>);
    instance.setState({
      balanceValue: "500",
    });
    instance._incrementCountCal();
    expect(instance.state.balanceValue).toBe("£510");
  });
});

    describe('Unit Test Case 16', () => {
  it ('Unit Test Case 16 : ReducePotList --> _incrementCountCal  --> else',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePotList {...props}/>);
    instance.setState({
      balanceValue: "1000",
    });
    instance._incrementCountCal();
    expect(instance.state.balanceValue).toBe("£1050");
  });
});

    describe('Unit Test Case 17', () => {
  it ('Unit Test Case 17 : ReducePotList --> _incrementCountCal  --> else',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePotList {...props}/>);
    instance.setState({
      balanceValue: "10000",
    });
    instance._incrementCountCal();
    expect(instance.state.balanceValue).toBe("£10100");
  });
});

    describe('Unit Test Case 18', () => {
  it ('Unit Test Case 18 : ReducePotList --> _incrementCountCal  --> else',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePotList {...props}/>);
    instance.setState({
      balanceValue: "20000",
    });
    instance._incrementCountCal();
    expect(instance.state.balanceValue).toBe("£21000");
  });

});

    describe('Unit Test Case 19', () => {
  it ('Unit Test Case 19 : ReducePotList --> _decrement  --> if',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePotList {...props}/>);
    instance.setState({
      balanceValue: "2000",
    });
    instance._decrement();
    expect(instance.state.balanceValue).toBe("£1900");
  });
});

    describe('Unit Test Case 20', () => {
  it ('Unit Test Case 20 : ReducePotList --> _decrement  --> else',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePotList {...props}/>);
    instance.setState({
      balanceValue: "123",
    });
    instance._decrement();
    expect(instance.state.balanceValue).toBe("£120");
  });
});

    describe('Unit Test Case 21', () => {
  it ('Unit Test Case 21 : ReducePotList --> _decrement  --> else',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePotList {...props}/>);
    instance.setState({
      balanceValue: "0",
    });
    instance._decrement();
    expect(instance.state.balanceValue).toBe("0");
  });
});

    describe('Unit Test Case 22', () => {
  it ('Unit Test Case 22 : ReducePotList --> _decrementCountCal  --> else',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePotList {...props}/>);
    instance.setState({
      balanceValue: "450",
    });
    instance._decrementCountCal();
    expect(instance.state.balanceValue).toBe("£440");
  });
});

    describe('Unit Test Case 23', () => {
  it ('Unit Test Case 23 : ReducePotList --> _decrementCountCal  --> else',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePotList {...props}/>);
    instance.setState({
      balanceValue: "900",
    });
    instance._decrementCountCal();
    expect(instance.state.balanceValue).toBe("£850");
  });
});

    describe('Unit Test Case 24', () => {
  it ('Unit Test Case 24 : ReducePotList --> _decrementCountCal  --> else',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePotList {...props}/>);
    instance.setState({
      balanceValue: "10000",
    });
    instance._decrementCountCal();
    expect(instance.state.balanceValue).toBe("£9900");
  });

});

    describe('Unit Test Case 25', () => {
  it ('Unit Test Case 25 : ReducePotList --> _decrementCountCal  --> else',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePotList {...props}/>);
    instance.setState({
      balanceValue: "20000",
    });
    instance._decrementCountCal();
    expect(instance.state.balanceValue).toBe("£19000");
  });
});

    describe('Unit Test Case 26', () => {
  it ('Unit Test Case 26 : ReducePotList --> _onChange --> if',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePotList {...props}/>);
    const event = {
      target:{
        value : "0"
      }
    }
    instance._onChange(event);
    expect(instance.state.balanceValue).toBe("£0");
  });
});

    describe('Unit Test Case 27', () => {
  it ('Unit Test Case 27 : ReducePotList --> _onChange  --> else  100',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePotList {...props}/>);
    const event = {
      target:{
        value : "100"
      }
    }
    instance._onChange(event);
    expect(instance.state.balanceValue).toBe("£100");
  });
});

    describe('Unit Test Case 28', () => {
  it ('Unit Test Case 28 : ReducePotList --> _onChange  --> else  1000000 ',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePotList {...props}/>);
    const event = {
      target:{
        value : "1000000"
      }
    }
    instance._onChange(event);
    expect(instance.state.balanceValue).toBe("£1600");
  });
});

    describe('Unit Test Case 29', () => {
  it ('Unit Test Case 29 : ReducePotList --> _onChange  --> else  2000 ',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePotList {...props}/>);
    const event = {
      target:{
        value : "2000"
      }
    }
    instance._onChange(event);
    expect(instance.state.balanceValue).toBe("£2000");
  });
});

    describe('Unit Test Case 30', () => {
  it ('Unit Test Case 30 : ReducePotList --> _onChange  --> else  1600 ',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePotList {...props}/>);
    const event = {
      target:{
        value : "1600"
      }
    }
    instance._onChange(event);
    expect(instance.state.balanceValue).toBe("£1600");
  });
});

    describe('Unit Test Case 31', () => {
  it ('Unit Test Case 31 : ReducePotList --> _onDelete',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePotList {...props}/>);
    instance._onDelete();
    expect(SavingPotsActionCreator.deletePotConnection.mock.calls.length).toBe(1);
  });
});

    describe('Unit Test Case 32', () => {
  it ('Unit Test Case 32 : ReducePotList --> checkNumber',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePotList {...props}/>);
    let event = '123114545.222.235'
    instance.checkNumber(event);
    expect(instance.checkNumber(event)).toBe(false);
  });
});

    describe('Unit Test Case 33', () => {
  it ('Unit Test Case 33 : ReducePotList --> checkNumber',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePotList {...props}/>);
    let event = '123.222235'
    instance.checkNumber(event);
    expect(instance.checkNumber(event)).toBe(false);
  });
});

    describe('Unit Test Case 34', () => {
  it ('Unit Test Case 34 : ReducePotList --> checkNumber',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePotList {...props}/>);
    let event = '123.2'
    instance.checkNumber(event);
    expect(instance.checkNumber(event)).toBe(true);
  });
});

    describe('Unit Test Case 35', () => {
  it ('Unit Test Case 35 : ReducePotList --> checkNumber',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePotList {...props}/>);
    let event = '2002.2'
    instance.checkNumber(event);
    expect(instance.checkNumber(event)).toBe(false);
  });
});

    describe('Unit Test Case 36', () => {
  it ('Unit Test Case 36 : ReducePotList --> _onChange  --> else  100',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePotList {...props}/>);
    const event = {
      target:{
        value : "."
      }
    }
    instance._onChange(event);
    expect(instance.state.balanceValue).toBe("£0.");
  });
});

    describe('Unit Test Case 37', () => {
  it ('Unit Test Case 37 : ReducePotList --> _onChange  --> else  100',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePotList {...props}/>);
    const event = {
      target:{
        value : "0."
      }
    }
    instance._onChange(event);
    expect(instance.state.balanceValue).toBe("£0.");
  });
});
    describe('Unit Test Case 38', () => {
  it ('Unit Test Case 38 : ReducePotList --> _onChange  --> else  100',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePotList {...props}/>);
    const event = {
      target:{
        value : "0.0"
      }
    }
    instance._onChange(event);
    expect(instance.state.balanceValue).toBe("£0.0");
  });
});
    describe('Unit Test Case 39', () => {
  it ('Unit Test Case 39 : ReducePotList --> _onChange  --> else  100',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePotList {...props}/>);
    const event = {
      target:{
        value : "0.00"
      }
    }
    instance._onChange(event);
    expect(instance.state.balanceValue).toBe("£0.00");
  });
});

    describe('Unit Test Case 40', () => {
  it ('Unit Test Case 40 : ReducePotList --> _onChange  --> else  100',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePotList {...props}/>);
    const event = {
      target:{
        value : ""
      }
    }
    instance._onChange(event);
    expect(instance.state.balanceValue).toBe("£");
  });
});

    describe('Unit Test Case 41', () => {
  it ('Unit Test Case 41 : ReducePotList --> _onPaste',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePotList {...props}/>);
    const event = {
      preventDefault : jest.genMockFunction(),
    }
    instance._onPaste(event);
    expect(instance._onPaste).toBeTruthy();
  });
});

});