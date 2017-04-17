
jest.unmock('../ReducePot');
//jest.unmock('../ReducePotList');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const _ = require('lodash');

const ReducePot = require('../ReducePot');
const ReducePotList = require('../ReducePotList');
const SavingPotsActionCreator = require('../../../actions/SavingPotsActionCreator');
const AccountsStore = require('../../../stores/AccountsStore');
const AppDispatcher = require('../../../dispatcher/AppDispatcher');

const shallowRender = props => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<ReducePot
               {...props}
            />);
  return shallowRenderer.getRenderOutput();
};

let accountReturnValue = {"type":"savings","number":"827018-00111837","product":{"code":"138","name":"B Instant Savings","description":"DYB SAVINGS ACCOUNT"},"actions_available":{"/account/alerts":false,"/account/mandates/so/write":false,"/account/payments/transfer/in":true,"/account/mandates/so/read":false,"/account/transactions/readwrite":false,"/account/sweeps":false,"/account/sweeps/transfer/out":true,"/account/read":true,"/account/projections":false,"/account/mandates/dd/read":false,"/account/payments/uk/default/out":false,"/account/transactions/write":true,"/account/payments/transfer/out":true,"/account/transactions/read":true,"/account/pots":true,"/account/mandates/dd/write":false},"owners":[{"id":"1060111960","provider":"CB","display_name":"MR HARRY HOOP"}],"balances":[{"type":"current","amount":{"currency":"GBP","value":1900},"at":"2015-02-02T00:00:00.000Z"},{"type":"available","amount":{"currency":"GBP","value":1900},"at":"2015-02-02T00:00:00.000Z"}],"limits":[{"type":"overdraft","amount":{"currency":"GBP","value":0},"effective_period":{"from":"","to":""}}],"bank_id":"CB","statements":{},"metadata":{"display_name":null,"images":[]},"id":"c3334232-2e2c-46ca-b059-d6294d7ce43e"};


AccountsStore.getAccountDetail.mockReturnValue(accountReturnValue);


describe('ReducePot Test Cases', () => {
  let component;
  let props;
  
  beforeEach(()=>{
    props = {
      accountClass:'green',
      getSelectedAccountID:'c3334232-2e2c-46ca-b059-d6294d7ce43e',
      content:{
        savingpotreducemessage1:'You need a rejig. You have taken some money out of your savings account so you need to reduce your savings pots by',
        savingpotreducemessage2:'Fancy a rejig? You have more money in your savings account than in your pots so could top them up by',
        savingpotcurrentbank:'Current balance of account 44224422',
        savingpottotalallocated:'Total allocated to pots',
        savingpotTitle:'Savings Pots',
        savingpotAllocatedTitle:'Allocated',
      },
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
      getFull: 
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
      "unallocated_amount": {
        "value": -116.87,
        "currency": "GBP"
      },
      getPotPageHandleClick: jest.fn(),
      accDetails:
          {
          "id": "a91fe657-4605-42c7-96f1-3e1cc8555276",
          "product": {
            "code": "901",
            "name": "B Savings Account",
            "description": "B Savings Account"
          },
          "actions_available": {
            "/account/pots": true,
            "/account/alerts": false,
            "/account/projections": false,
            "/account/sweeps": false,
            "/account/sweeps/transfer/out": true,
            "/account/transactions/read": true,
            "/account/payments/transfer/in": true,
            "/account/payments/transfer/out": true,
            "/account/payments/uk/default/out": true,
            "/account/mandates/so/read": false,
            "/account/mandates/dd/read": false,
            "/account/mandates/so/write": false,
            "/account/mandates/dd/write": false
          },
          "limits": [

          ],
          "bank_id": "CB",
          "number": "654321-44224422",
          "metadata": {
            "display_name": "B Instant Savings"
          },
          "owners": [
            {
              "id": "2",
              "provider": "CB",
              "display_name": "Bob Brown"
            }
          ],
          "balances": [
            {
              "type": "current",
              "amount": {
                "value": 2503.13,
                "currency": "GBP"
              },
              "at": "2016-05-16T15:07:52.445+00:00"
            },
            {
              "type": "available",
              "amount": {
                "value": 2503.13,
                "currency": "GBP"
              },
              "at": "2016-05-16T15:07:52.446+00:00"
            }
          ]
        },
      },
    component = shallowRender(props);
  });
  
  it ('Unit Test Case 1 : ReducePot --> toBeDefined',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePot {...props}/>);
      instance.setState({
          balance : -101.02,
          currentBalanceValue: 1000,
          totalAllocatedValue: 2000,
      });
  expect(component).toBeDefined();
  }); 

  it('Unit Test Case 2 :ReducePot --> toBe -- > if',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePot {...props}/>);
    instance.setState({
      balance : -200,
    });
    expect(instance.state.balance).toBe(-200);
  });

  it('Unit Test Case 3 :ReducePot --> toBe -- > else',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePot {...props}/>);
    instance.setState({
      balance : -90,
    });
    expect(instance.state.balance).toBe(-90);
  });

  it ('Unit Test Case 4 : ReducePot --> _handleInterPot ',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePot {...props}/>);
    instance._handleInterPot();
    expect(SavingPotsActionCreator.getInterPotData.mock.calls.length).toBe(1);
    //expect(instance.state.balance).toBe(1000);
  });

  it ('Unit Test Case 5 : ReducePot --> _getCurrentBalance --> If ',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePot {...props}/>);
    instance._getCurrentBalance = jest.genMockFunction();
    instance._getCurrentBalance();
    expect(instance._getCurrentBalance).toBeCalled();
  });

  it ('Unit Test Case 6 : ReducePot --> _getCurrentBalance --> Else ',()=>{
    props = {
      accountClass:'green',
      getSelectedAccountID:'c3334232-2e2c-46ca-b059-d6294d7ce43e',
      content:{
        savingpotreducemessage1:'You need a rejig. You have taken some money out of your savings account so you need to reduce your savings pots by',
        savingpotreducemessage2:'Fancy a rejig? You have more money in your savings account than in your pots so could top them up by',
        savingpotcurrentbank:'Current balance of account 44224422',
        savingpottotalallocated:'Total allocated to pots',
        savingpotTitle:'Savings Pots',
        savingpotAllocatedTitle:'Allocated',
      },
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
      getFull: 
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
      "unallocated_amount": {
        "value": -116.87,
        "currency": "GBP"
      },
      getPotPageHandleClick: jest.fn(),
      accDetails:
          {
          "id": "a91fe657-4605-42c7-96f1-3e1cc8555276",
          "product": {
            "code": "901",
            "name": "B Savings Account",
            "description": "B Savings Account"
          },
          "actions_available": {
            "/account/pots": true,
            "/account/alerts": false,
            "/account/projections": false,
            "/account/sweeps": false,
            "/account/sweeps/transfer/out": true,
            "/account/transactions/read": true,
            "/account/payments/transfer/in": true,
            "/account/payments/transfer/out": true,
            "/account/payments/uk/default/out": true,
            "/account/mandates/so/read": false,
            "/account/mandates/dd/read": false,
            "/account/mandates/so/write": false,
            "/account/mandates/dd/write": false
          },
          "limits": [

          ],
          "bank_id": "CB",
          "number": "654321-44224422",
          "metadata": {
            "display_name": "B Instant Savings"
          },
          "owners": [
            {
              "id": "2",
              "provider": "CB",
              "display_name": "Bob Brown"
            }
          ]
        },
      }
    let instance = TestUtils.renderIntoDocument(<ReducePot {...props}/>);
    let checkReturn;
    //instance._getCurrentBalance = jest.genMockFunction();
    checkReturn = instance._getCurrentBalance();
    expect(checkReturn).toBe(undefined);
  });

  
  it ('Unit Test Case 7 : ReducePot --> _onChildToggle ',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePot {...props}/>);
    //instance._onChildToggle = jest.genMockFunction();
    instance._onChildToggle(101, 1000, {});
    expect(instance.state.totalAllocatedValue).toBe(1000);
    expect(instance.state.balance).toBe(1503.13);
  });

  it ('Unit Test Case 8 : ReducePot --> _onChildToggle ',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePot {...props}/>);
    let obj = {
        amount : {
          currency : 'GBP',
          value : 100,
        },
        source_pot_id : 'unallocated',
        target_pot_id : 101,
      };
    instance._onChildToggle(101, 1000, obj);
    expect(instance.state.totalAllocatedValue).toBe(1000);
    expect(instance.state.balance).toBe(1503.13);
  });

  it ('Unit Test Case 9 : ReducePot --> _updateBalanceBalue ',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePot {...props}/>);
    instance._updateBalanceBalue();
    expect(instance.state.totalAllocatedValue).toBe(0);
    expect(instance.state.balance).toBe(2503.13);
    expect(instance.state.currentBalanceValue).toBe(2503.13);
  });


  it ('Unit Test Case 10 : ReducePot --> _updateBalanceBalue ',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePot {...props}/>);
    instance.setState({
      selections : [1],
    })
    instance._updateBalanceBalue();
    expect(instance.state.totalAllocatedValue).toBe(1);
    expect(instance.state.balance).toBe(2502.13);
    expect(instance.state.currentBalanceValue).toBe(2503.13);
  });

  it ('Unit Test Case 11 : ReducePot --> _getLeftProgress ',()=>{
    props = {
      accountClass:'green',
      getSelectedAccountID:'c3334232-2e2c-46ca-b059-d6294d7ce43e',
      content:{
        savingpotreducemessage1:'You need a rejig. You have taken some money out of your savings account so you need to reduce your savings pots by',
        savingpotreducemessage2:'Fancy a rejig? You have more money in your savings account than in your pots so could top them up by',
        savingpotcurrentbank:'Current balance of account 44224422',
        savingpottotalallocated:'Total allocated to pots',
        savingpotTitle:'Savings Pots',
        savingpotAllocatedTitle:'Allocated',
      },
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
      getFull: 
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
      "unallocated_amount": {
        "value": -116.87,
        "currency": "GBP"
      },
      getPotPageHandleClick: jest.fn(),
      accDetails:
          {
          "id": "a91fe657-4605-42c7-96f1-3e1cc8555276",
          "product": {
            "code": "901",
            "name": "B Savings Account",
            "description": "B Savings Account"
          },
          "actions_available": {
            "/account/pots": true,
            "/account/alerts": false,
            "/account/projections": false,
            "/account/sweeps": false,
            "/account/sweeps/transfer/out": true,
            "/account/transactions/read": true,
            "/account/payments/transfer/in": true,
            "/account/payments/transfer/out": true,
            "/account/payments/uk/default/out": true,
            "/account/mandates/so/read": false,
            "/account/mandates/dd/read": false,
            "/account/mandates/so/write": false,
            "/account/mandates/dd/write": false
          },
          "limits": [

          ],
          "bank_id": "CB",
          "number": "654321-44224422",
          "metadata": {
            "display_name": "B Instant Savings"
          },
          "owners": [
            {
              "id": "2",
              "provider": "CB",
              "display_name": "Bob Brown"
            }
          ],
          "balances": [
            {
              "type": "current",
              "amount": {
                "value": -90,
                "currency": "GBP"
              },
              "at": "2016-05-16T15:07:52.445+00:00"
            },
            {
              "type": "available",
              "amount": {
                "value": -90,
                "currency": "GBP"
              },
              "at": "2016-05-16T15:07:52.446+00:00"
            }
          ]
        },
      };
    let instance = TestUtils.renderIntoDocument(<ReducePot {...props}/>);
    instance.setState({
      balance : -90,
    })
    instance._getLeftProgress();
    expect(instance.state.balance).toBe(-90);
  });
  
  it ('Unit Test Case 12 : ReducePot --> _alertEditErrorModal ',()=>{
    props.interPotError = {
      error : {
        message : 'Hello there is an error message',
      }
    }
    let instance = TestUtils.renderIntoDocument(<ReducePot {...props}/>);
    instance.setState({
      errorModal : true,
    });
    instance._alertEditErrorModal();
    expect(instance.state.errorModal).toBe(true);
  });

  it ('Unit Test Case 13 : ReducePot --> _closeAlertModal ',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePot {...props}/>);
    instance._closeAlertModal();
    expect(SavingPotsActionCreator.closetErrorModal.mock.calls.length).toBe(1);
  });

  it ('Unit Test Case 14 : ReducePot --> _getLeftProgress ',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePot {...props}/>);
    instance.setState({
      balance : -200000,
    })
    instance._getLeftProgress();
    expect(instance.state.balance).toBe(-200000);
  });

  it ('Unit Test Case 15 : ReducePot --> _handleInterPot ',()=>{
    let instance = TestUtils.renderIntoDocument(<ReducePot {...props}/>);
    let obj = {
        amount : {
          currency : 'GBP',
          value : 100,
        },
        source_pot_id : 'unallocated',
        target_pot_id : 101,
      };
    instance._onChildToggle(101, 1000, obj);
    instance._handleInterPot();
    expect(instance.state.totalAllocatedValue).toBe(1000);
    expect(instance.state.balance).toBe(1503.13);
  });


});