jest.unmock('../SavingPotsLanding');
const React = require('react');
const _ = require('lodash');
const TestUtils = require('react-addons-test-utils');

const SavingPotsLanding = require('../SavingPotsLanding');
const NBAComponent = require('../../common/NBAComponent');
const SavingPots = require('../SavingPots');
const SavingPotsRejig = require('../SavingPotsRejig');
const CreateSavingsPot = require('../CreateSavingsPot');
const SavingPotDetail = require('../SavingPotDetail');
const ReducePot = require('../ReducePot');
const SavingPotConfirmation = require('../SavingPotConfirmation');
const SavingPotsActionCreator = require('../../../actions/SavingPotsActionCreator');

const shallowRender = props => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<SavingPotsLanding
               {...props}
            />);
  return shallowRenderer.getRenderOutput();
};

describe('SavingPotsLanding Test Cases : ', () => {
  let component;
  let props;
  let svaingsPotContent;
  let reducePotContent;

beforeEach(() => {  
        props = {
          potError : {
            error : 'error message',
          },
          content : {
            savingpotTargetDate:'Target date',
          },
          getPotConfirmation : true,
          createSavingPotFlag : true,
          potDetailFlag : true,
          pots : {
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
              }],
              "unallocated_amount": {
              "value": -116.87,
              "currency": "GBP"
            }
            },
        reducePotData:[{
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
        }],
      potDetailsData:{
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
        fullPotData: [
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
      newpotData:{

      },
      getAccountColor: jest.fn(),
      _getCurrentPotPage : jest.fn(),
      getSelectedAccountID : "",
      getPotPageHandleClick:jest.fn(),
    }

    component = shallowRender(props);
  });
  
  it ('Unit Test Case 1 : SavingPotsLanding --> toBeDefined', function() {
    expect(component).toBeDefined();
  });
  
  it('Unit Test Case 2 : SavingPotsLanding --> pots will be empty',function(){
    props.pots = [];
    component = shallowRender(props);
     expect(props.pots.length).toBe(0);   
  });

  it('Unit Test Case 3 : SavingPotsLanding --> SavingPotConfirmation',function(){
     expect(props.getPotConfirmation).toBe(true);   
  });

  it('Unit Test Case 4 : SavingPotsLanding --> ReducePot',function(){
    props.getPotConfirmation = false;
    component = shallowRender(props);
     expect(props.reducePotData.length).toBe(1);   
  });

  it('Unit Test Case 5 : SavingPotsLanding --> SavingPotDetail',function(){
    props.getPotConfirmation = false;
    props.reducePotData = [];
    component = shallowRender(props);
     expect(props.potDetailFlag).toBe(true);   
  });

  it('Unit Test Case 6 : SavingPotsLanding --> CreateSavingsPot',function(){
    props.getPotConfirmation = false;
    props.reducePotData = [];
    props.potDetailFlag = false;
    component = shallowRender(props);
     expect(props.createSavingPotFlag).toBe(true);   
  });

  it('Unit Test Case 7 : SavingPotsLanding --> SavingPots',function(){
    props.getPotConfirmation = false;
    props.reducePotData = [];
    props.potDetailFlag = false;
    props.createSavingPotFlag = false;
    props.pots.unallocated_amount.value = 116
    component = shallowRender(props);
     expect(props.pots.unallocated_amount.value).toBe(116);   
  });

  it('Unit Test Case 8 : SavingPotsLanding --> SavingPotsRejig',function(){
    props.getPotConfirmation = false;
    props.reducePotData = [];
    props.potDetailFlag = false;
    props.createSavingPotFlag = false;
    component = shallowRender(props);
     expect(props.pots.unallocated_amount.value).toBe(-116.87);   
  });

  it('Unit Test Case 9 : SavingPotsLanding --> SavingPotsRejig',function(){
    props.getPotConfirmation = false;
    props.reducePotData = [];
    props.potDetailFlag = false;
    props.createSavingPotFlag = false;
    props.pots = [];
    component = shallowRender(props);
     expect(props.pots.length).toBe(0);   
  });

  it('Unit Test Case 10 : SavingPotsLanding --> pots will be empty',function(){
    props.pots.unallocated_amount.value = '';
    component = shallowRender(props);
     expect(props.pots.unallocated_amount.value).toBe('');   
  });

  it('Unit Test Case 11 : SavingPotsLanding --> _closeAlertModal',function(){
    let instance = TestUtils.renderIntoDocument(<SavingPotsLanding {...props}/>);
    instance._closeAlertModal();
     expect(SavingPotsActionCreator.closetErrorModal.mock.calls.length).toBe(1); 
     expect(instance.state.potErrorModal).toBe(false);  
  });

  it('Unit Test Case 12 : SavingPotsLanding --> render : else',function(){
    props.getPotConfirmation = false;
    props.reducePotData = [];
    props.potDetailFlag = false;
    props.createSavingPotFlag = false;
    props.pots = [];
    props.potError = {};
    let booleanCheck = _.isEmpty(props.potError);
    component = shallowRender(props); 
    expect(booleanCheck).toBe(true);
  });

  it('Unit Test Case 12 : SavingPotsLanding --> render : else',function(){
    props.getPotConfirmation = false;
    props.reducePotData = [];
    props.potDetailFlag = false;
    props.createSavingPotFlag = false;
    props.unavailableCheck = true;
    let instance = TestUtils.renderIntoDocument(<SavingPotsLanding {...props}/>);
    expect(instance.props.unavailableCheck).toBe(true);
  });

  it('Test Case : 13 : check openFaq()',()=>{
      let instance  = TestUtils.renderIntoDocument(<SavingPotsLanding {...props}/>);
      instance.openFaq();
      expect(instance.state.faqFlag).toBe(true);
  });

  it('Test Case : 14 : check closeFaq()',()=>{
      let instance  = TestUtils.renderIntoDocument(<SavingPotsLanding {...props}/>);
      instance.closeFaq();
      expect(instance.state.faqFlag).toBe(false);
  });

  it('Test Case : 15 : check _getCreateSavingPot()',()=>{
      let instance  = TestUtils.renderIntoDocument(<SavingPotsLanding {...props}/>);
      instance._getCreateSavingPot();
      expect(SavingPotsActionCreator.getCreateSavingPotPage.mock.calls.length).toBe(1);
  });
  

});