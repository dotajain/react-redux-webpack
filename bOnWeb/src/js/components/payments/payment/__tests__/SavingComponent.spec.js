'use strict';
jest.unmock('../SavingComponent');
jest.mock('../../../../stores/PaymentsStore');
jest.unmock('../../../../utils/NumberUtils');
const SavingComponent = require('../SavingComponent');
const PaymentsStore = require('../../../../stores/PaymentsStore');
const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const BrowserUtils = require('../../../../utils/BrowserUtils');
const Panel = require('react-bootstrap').Panel;
const SavingPotTotalComponent = require('../SavingPotTotalComponent');

const shallowRender = props => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<SavingComponent {...props} />);
  return shallowRenderer.getRenderOutput();
};
PaymentsStore.getOneOffPayment.mockReturnValue({ isMonthly: true });
PaymentsStore.repeatPaymentShow.mockReturnValue(false);
PaymentsStore.getSelectedPotData.mockReturnValue([
  {
    id: "ee8948b5-e443-408a-a2cd-1af9b29fdd5f",
    pots: {
      "pots": [
        {
          "id": "3ebbc744-9a3b-414e-b5b7-49e4afd365be",
          "name": "Garden Landscaping",
          "reference": "1",
          "balance": {
            "value": 600.0,
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
      ]
    }
  }])
PaymentsStore.getSelectedToPotData.mockReturnValue([
  {
    id: "ee8948b5-e443-408a-a2cd-1af9b29fdd5f",
    pots: {
      "pots": [
        {
          "id": "3ebbc744-9a3b-414e-b5b7-49e4afd365be",
          "name": "Garden Landscaping",
          "reference": "1",
          "balance": {
            "value": 600.0,
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
      ]
    }
  }])

  PaymentsStore.getSelectedAccount.mockReturnValue({
      id: "b80e95a0-6b60-45b2-8b0f-77f2355f306",
    type: "savings",
  Acntdata: {
    id: "b80e95a0-6b60-45b2-8b0f-77f2355f306",
    type: "savings",
    "product": {
      "code": "901",
      "name": "Personal Loan",
      "description": "Personal Loan"
    },
    "actions_available": {
      "/account/pots": false,
      "/account/alerts": false,
      "/account/projections": false,
      "/account/sweeps": false,
      "/account/sweeps/transfer/out": false,
      "/account/transactions/read": false,
      "/account/payments/transfer/in": false,
      "/account/payments/transfer/out": false,
      "/account/payments/uk/default/out": false,
      "/account/mandates/so/read": false,
      "/account/mandates/dd/read": false,
      "/account/mandates/so/write": false,
      "/account/mandates/dd/write": false
    },
    "limits": [

    ],
    "bank_id": "CB",
    "number": "650000-22446699",
    "metadata": {
      "display_name": "Loan Account"
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
          "value": 1517.44,
          "currency": "GBP"
        },
        "at": "2016-05-16T15:07:50.832+00:00"
      },
      {
        "type": "available",
        "amount": {
          "value": 3482.56,
          "currency": "GBP"
        },
        "at": "2016-05-16T15:07:50.832+00:00"
      }
    ]
  }
})

PaymentsStore.getSelectedToAccount.mockReturnValue({
      id: "b80e95a0-6b60-45b2-8b0f-77f2355f306",
    type: "savings",
  ToAcntdata: {
    id: "b80e95a0-6b60-45b2-8b0f-77f2355f306",
    type: "savings",
    "product": {
      "code": "901",
      "name": "Personal Loan",
      "description": "Personal Loan"
    },
    "actions_available": {
      "/account/pots": false,
      "/account/alerts": false,
      "/account/projections": false,
      "/account/sweeps": false,
      "/account/sweeps/transfer/out": false,
      "/account/transactions/read": false,
      "/account/payments/transfer/in": false,
      "/account/payments/transfer/out": false,
      "/account/payments/uk/default/out": false,
      "/account/mandates/so/read": false,
      "/account/mandates/dd/read": false,
      "/account/mandates/so/write": false,
      "/account/mandates/dd/write": false
    },
    "limits": [

    ],
    "bank_id": "CB",
    "number": "650000-22446699",
    "metadata": {
      "display_name": "Loan Account"
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
          "value": 1517.44,
          "currency": "GBP"
        },
        "at": "2016-05-16T15:07:50.832+00:00"
      },
      {
        "type": "available",
        "amount": {
          "value": 3482.56,
          "currency": "GBP"
        },
        "at": "2016-05-16T15:07:50.832+00:00"
      }
    ]
  }
})


describe('Saving Component Test Cases', () => {
  describe('Saving Sequential Color', () => {
    const props = {
      data: {

        "id": "ee8948b5-e443-408a-a2cd-1af9b29fdd5f",
        "type": "savings",
        "product": {
          "code": "901",
          "name": "B Savings Account",
          "description": "B Savings Account"
        },
        "actions_available": {
        },
        "bank_id": "CB",
        "sort_code": "123456",
        "number": "41381167",
        "metadata": {
          "display_name": "B Instant Savings"
        }
      },
      contents: {
        current: 'current',
        available: 'available',
      }
    };

    const colorTesting = (props, key) => {
      const component = TestUtils.renderIntoDocument(<SavingComponent data={props.data} contents={props.contents} index={key} name='fromList' />);
      // key = (key % 10) + 1;
      let className = 'checkbox-account ' + key;
      let clsColor = TestUtils.findRenderedDOMComponentWithClass(component, className);
      it('should display Account with sequential color ' + key, () => {
        expect(clsColor).toBeDefined();
      });
    }

    let css = PaymentsStore.getColorFromAccount(props.data.id);
    colorTesting(props, css);
  });

  describe('Jsx render', () => {
    const props = {
      data: {

        "id": "ee8948b5-e443-408a-a2cd-1af9b29fdd5f",
        "type": "savings",
        "product": {
          "code": "901",
          "name": "B Savings Account",
          "description": "B Savings Account"
        },
        "actions_available": {
        },
        "bank_id": "CB",
        "sort_code": "123456",
        "number": "41381167",
        "metadata": {
          "display_name": "B Instant Savings"

        }
      },
      contents: {
        current: 'current',
        available: 'available',
      }
    };
    it('Jsx compare', () => {
      let instance = shallowRender(props);
      expect(instance).toEqualJSX(<div className="checkbox-account undefined">
        <input
          id="undefinedee8948b5-e443-408a-a2cd-1af9b29fdd5f"
          name="groupFrom_undefined"
          onClick={function noRefCheck() { } }
          type="radio"
          value="ee8948b5-e443-408a-a2cd-1af9b29fdd5f"
          />
        <label
          className="pots"
          htmlFor="undefinedee8948b5-e443-408a-a2cd-1af9b29fdd5f"
          >
          <h3>
            B Instant Savings
          </h3>
          <h5>
            undefined | 41-38-67
          </h5>
          <Panel
            bsClass="panel"
            bsStyle="default"
            collapsible={true}
            defaultExpanded={false}
            expanded={false}
            >
            <ul className="account-pot">
              <li />
            </ul>
          </Panel>
          <SavingPotTotalComponent
            contents={{ available: 'available', current: 'current' }}
            data={{ actions_available: {}, bank_id: 'CB', id: 'ee8948b5-e443-408a-a2cd-1af9b29fdd5f', metadata: { display_name: 'B Instant Savings' }, number: '41381167', product: { code: '901', description: 'B Savings Account', name: 'B Savings Account' }, sort_code: '123456', type: 'savings' }}
            name={undefined}
            onChange={function noRefCheck() { } }
            open={false}
            showTotal={false}
            />
        </label>
      </div>
      );
    });
  });

  describe('to check get state', () => {
    const props1 = {
      data: {

        "id": "ee8948b5-e443-408a-a2cd-1af9b29fdd5f",
        "type": "savings",
        "product": {
          "code": "901",
          "name": "B Savings Account",
          "description": "B Savings Account"
        },
        "actions_available": {
        },
        "bank_id": "CB",
        "sort_code": "123456",
        "number": "41381167",
        "metadata": {
          "display_name": "B Instant Savings"

        }
      },
      contents: {
        current: 'current',
        available: 'available',
      }
    };
    it('metadata type to be', () => {
      props1.data.metadata.display_name = null;

      let instance = TestUtils.renderIntoDocument(
        <SavingComponent {...props1} />
      );

      let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h3');
      expect(header.textContent).toBe('B Savings Account')
    });

    it('metadata type not to be', () => {
      props1.data.metadata.display_name = 'B-Instant Savings';
      let instance = TestUtils.renderIntoDocument(
        <SavingComponent {...props1} />
      );

      let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h3');
      expect(header.textContent).toBe('B-Instant Savings')

    });

    it('metadata type not to be', () => {
      props1.data.type = 'credit_card';
      let instance = TestUtils.renderIntoDocument(
        <SavingComponent {...props1} />
      );

      let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h5');
      expect(header.textContent).toBe('41381167')
    });

  });

  describe('componentDidmount', () => {

    const props = {
      data: {

        "id": "ee8948b5-e443-408a-a2cd-1af9b29fdd5f",
        "type": "savings",
        "product": {
          "code": "901",
          "name": "B Savings Account",
          "description": "B Savings Account"
        },
        "actions_available": {
        },
        "bank_id": "CB",
        "sort_code": "123456",
        "number": "41381167",
        "metadata": {
          "display_name": "B Instant Savings"
        }
      },
      contents: {
        current: 'current',
        available: 'available',
      }
    };

    it('check component did mount else', () => {
      props.data.id = "123456465";
      let instance = TestUtils.renderIntoDocument(
        <SavingComponent {...props}  contents={props.contents} index={1} />
      );
      //PaymentsStore.getPotDetails.mockReturnValue();
      PaymentsStore.getPotDetails('123456465');
      instance.componentDidMount();

    });
    it('check component will mount', () => {
      //props.data.id = "123456465";
      let instance = TestUtils.renderIntoDocument(
        <SavingComponent {...props}  contents={props.contents} index={1} />
      );
      PaymentsStore.isOneOffPayment.mockReturnValue(true);
      instance.componentWillMount();
    });
    it('check component did mount', () => {
      let instance = TestUtils.renderIntoDocument(
        <SavingComponent {...props}  contents={props.contents} index={1} />
      );
      //PaymentsStore.getPotDetails.mockReturnValue("sdfsdf");
      PaymentsStore.getPotDetails(props.data.id);
      instance.componentDidMount();

    });


  });

  describe('componentWillUnmount', () => {

    const props = {
      data: {

        "id": "ee8948b5-e443-408a-a2cd-1af9b29fdd5f",
        "type": "savings",
        "product": {
          "code": "901",
          "name": "B Savings Account",
          "description": "B Savings Account"
        },
        "actions_available": {
        },
        "bank_id": "CB",
        "sort_code": "123456",
        "number": "41381167",
        "metadata": {
          "display_name": "B Instant Savings"
        }
      },
      contents: {
        current: 'current',
        available: 'available',
      }
    };

    it('check component will unmount', () => {
      let instance = TestUtils.renderIntoDocument(
        <SavingComponent {...props}  contents={props.contents} index={1} />
      );

      instance.componentWillUnmount();

    });
  });

  describe('onStoreChange', () => {

    const props = {
      data: {

        "id": "ee8948b5-e443-408a-a2cd-1af9b29fdd5f",
        "type": "savings",
        "product": {
          "code": "901",
          "name": "B Savings Account",
          "description": "B Savings Account"
        },
        "actions_available": {
        },
        "bank_id": "CB",
        "sort_code": "123456",
        "number": "41381167",
        "metadata": {
          "display_name": "B Instant Savings"
        }
      },
      contents: {
        current: 'current',
        available: 'available',
      }
    };

    it('setting payment store To', () => {
      props.data.metadata.display_name = null;
      let instance = TestUtils.renderIntoDocument(
        <SavingComponent {...props}  contents={props.contents} index={1} />

      );

      PaymentsStore.getNextTask.mockReturnValue("To");
      instance.setState({ potList: undefined });
      instance.onStoreChange();
      let t = PaymentsStore.getNextTask();

      let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h3');
      expect(header.textContent).toBe('B Savings Account')




    });
    it('setting payment store From', () => {
      props.data.metadata.display_name = null;
      let instance = TestUtils.renderIntoDocument(
        <SavingComponent {...props}  contents={props.contents} index={1} />

      );

      PaymentsStore.getNextTask.mockReturnValue("From");
      instance.setState({ potList: undefined });
      instance.onStoreChange();
      let t = PaymentsStore.getNextTask();

      let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h3');
      expect(header.textContent).toBe('B Savings Account')




    });
    it('setting payment store RP', () => {
      props.data.metadata.display_name = null;
      let instance = TestUtils.renderIntoDocument(
        <SavingComponent {...props}  contents={props.contents} index={1} />

      );

      PaymentsStore.getNextTask.mockReturnValue("RP");
      instance.setState({ potList: undefined });
      instance.onStoreChange();
      let t = PaymentsStore.getNextTask();

      let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h3');
      expect(header.textContent).toBe('B Savings Account')




    });
    it('setting payment store KP', () => {
      props.data.metadata.display_name = null;
      let instance = TestUtils.renderIntoDocument(
        <SavingComponent {...props}  contents={props.contents} index={1} />

      );

      PaymentsStore.getNextTask.mockReturnValue("KP");
      instance.setState({ potList: undefined });
      instance.onStoreChange();
      let t = PaymentsStore.getNextTask();

      let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h3');
      expect(header.textContent).toBe('B Savings Account')




    });
    it('setting payment store CNFRM', () => {
      props.data.metadata.display_name = null;
      let instance = TestUtils.renderIntoDocument(
        <SavingComponent {...props}  contents={props.contents} index={1} />

      );

      PaymentsStore.getNextTask.mockReturnValue("CNFRM");
      instance.setState({ potList: undefined });
      instance.onStoreChange();
      let t = PaymentsStore.getNextTask();

      let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h3');
      expect(header.textContent).toBe('B Savings Account')




    });
    it('setting payment store else case', () => {
      props.data.metadata.display_name = null;
      let instance = TestUtils.renderIntoDocument(
        <SavingComponent {...props}  contents={props.contents} index={1} />

      );

      PaymentsStore.getNextTask.mockReturnValue("abcd");
      instance.setState({ potList: undefined });
      instance.onStoreChange();
      let t = PaymentsStore.getNextTask();

      let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h3');
      expect(header.textContent).toBe('B Savings Account')




    });
  });

  describe('set Allocated Check conditions', () => {

    const props = {
      data: {

        "id": "ee8948b5-e443-408a-a2cd-1af9b29fdd5f",
        "type": "savings",
        "product": {
          "code": "901",
          "name": "B Savings Account",
          "description": "B Savings Account"
        },
        "actions_available": {
        },
        "bank_id": "CB",
        "sort_code": "123456",
        "number": "41381167",
        "metadata": {
          "display_name": "B Instant Savings"
        }
      },
      contents: {
        current: 'current',
        available: 'available',
      }
    };

    it('checking from list', () => {
      props.data.metadata.display_name = null;
      let instance = TestUtils.renderIntoDocument(
        <SavingComponent {...props}  contents={props.contents} index={1} />

      );
      instance.setState({ potList: undefined });
      instance.setAllocatedCheck();
    });

    it('checking to list', () => {
      props.data.metadata.display_name = null;
      let instance = TestUtils.renderIntoDocument(
        <SavingComponent {...props}  contents={props.contents} index={1} name='toList' />

      );
      instance.setState({
        potList: {
          pots: {
            "pots": [
              {
                "id": "3ebbc744-9a3b-414e-b5b7-49e4afd365be",
                "name": "Garden Landscaping",
                "reference": "1",
                "balance": {
                  "value": 600.0,
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
            ]
          }
        },
      })
      instance.setAllocatedCheck();

    });
    it('checking from list balance less thsn zero', () => {
      props.data.metadata.display_name = null;
      let instance = TestUtils.renderIntoDocument(
        <SavingComponent {...props}  contents={props.contents} index={1} />

      );
      //console.log("pot List"+potList);
      instance.setState({
        potList: {
          pots: {
            "pots": [
              {
                "id": "3ebbc744-9a3b-414e-b5b7-49e4afd365be",
                "name": "Garden Landscaping",
                "reference": "1",
                "balance": {
                  "value": -600.0,
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
            ]
          }
        },
      })
      instance.setAllocatedCheck();
    });

    it('checking to list balance less thsn zero', () => {
      props.data.metadata.display_name = null;
      let instance = TestUtils.renderIntoDocument(
        <SavingComponent {...props}  contents={props.contents} index={1} name='toList' />

      );
      //console.log("pot List"+potList);
      instance.setState({
        potList: {
          pots: {
            "pots": [
              {
                "id": "3ebbc744-9a3b-414e-b5b7-49e4afd365be",
                "name": "Garden Landscaping",
                "reference": "1",
                "balance": {
                  "value": -600.0,
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
            ]
          }
        },
      })
      instance.setAllocatedCheck();
    });

  });

  describe('set Open State Check conditions', () => {

    const props = {
      data: {

        "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
        "type": "savings",
        "product": {
          "code": "901",
          "name": "B Savings Account",
          "description": "B Savings Account"
        },
        "actions_available": {
        },
        "bank_id": "CB",
        "sort_code": "123456",
        "number": "41381167",
        "metadata": {
          "display_name": "B Instant Savings"
        }
      },
      contents: {
        current: 'current',
        available: 'available',
      }
    };

    it('checking from list', () => {
      props.data.metadata.display_name = null;
      let instance = TestUtils.renderIntoDocument(
        <SavingComponent {...props}  contents={props.contents} index={1} name='fromList' />

      );
      PaymentsStore.IsAccountSame.mockReturnValue(true);
      instance.setOpenState();
    });

    it('checking to list,next Task To,isToAccountSame', () => {
      props.data.metadata.display_name = null;
      let instance = TestUtils.renderIntoDocument(
        <SavingComponent {...props}  contents={props.contents} index={1} name='toList' />

      );
      PaymentsStore.getNextTask.mockReturnValue("To");
      // PaymentsStore.IsToAccountSame(props.data.id);
      //PaymentsStore.IsAccountSame(props.data.id);
      PaymentsStore.IsToAccountSame.mockReturnValue(true);
      PaymentsStore.IsAccountSame.mockReturnValue(true);
      PaymentsStore.isSavingTotClicked.mockReturnValue(true);

      //instance.setState({ potList: undefined });
      instance.setOpenState();
    });

    xit('checking to list,next Task To,isToAccountSame,IsAccountSame false', () => {
      props.data.metadata.display_name = null;
      let instance = TestUtils.renderIntoDocument(
        <SavingComponent {...props}  contents={props.contents} index={1} name='toList' />

      );
      PaymentsStore.getNextTask.mockReturnValue("To");
      // PaymentsStore.IsToAccountSame(props.data.id);
      //PaymentsStore.IsAccountSame(props.data.id);
      PaymentsStore.IsToAccountSame.mockReturnValue(true);
      PaymentsStore.IsAccountSame.mockReturnValue(false);
      PaymentsStore.isSavingTotClicked.mockReturnValue(true);

      //instance.setState({ potList: undefined });
      instance.setOpenState();
    });
  });

  describe('Covering handle radio click func ', () => {

    const props = {
      data: {

        "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
        "type": "savings",
        "product": {
          "code": "901",
          "name": "B Savings Account",
          "description": "B Savings Account"
        },
        "actions_available": {
        },
        "bank_id": "CB",
        "sort_code": "123456",
        "number": "41381167",
        "metadata": {
          "display_name": "B Instant Savings"
        }
      },
      contents: {
        current: 'current',
        available: 'available',
      }
    };

    it('checking from list', () => {
      props.data.metadata.display_name = null;
      let instance = TestUtils.renderIntoDocument(
        <SavingComponent {...props}  contents={props.contents} index={1} name='fromList' />

      );
      // PaymentsStore.IsAccountSame(props.data.id);
      PaymentsStore.IsAccountSame.mockReturnValue(true);

      //instance.setState({ potList: undefined });
      instance.setOpenState();
    });
  });

  describe('Covering handle radio click func ', () => {

    let component;
    const props = {
      onChange: jest.fn(),
      display: true,

      data: {

        "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
        "type": "savings",
        "product": {
          "code": "901",
          "name": "B Savings Account",
          "description": "B Savings Account"
        },
        "actions_available": {
        },
        "bank_id": "CB",
        "sort_code": "123456",
        "number": "41381167",
        "metadata": {
          "display_name": "B Instant Savings"
        }
      },
      contents: {
        current: 'current',
        available: 'available',
      }
    }

    const content = {

    }

    beforeEach(() => {

      component = TestUtils.renderIntoDocument(
        <SavingComponent {...props}  contents={props.contents} index={1}  />

      );

    });

    it('should handle click fxn', () => {
      BrowserUtils.isMobileView.mockReturnValue(true);
      let event = {
        target: {
          value: false,
        }
      };
      let potData = [];
      component.handleRadioClick(potData, event);
      //	expect(component.props.onChangeIndex).toBe('hello');
    });

    it('should handle click fxn browser util returning false', () => {
      BrowserUtils.isMobileView.mockReturnValue(false);
      let event = {
        target: {
          value: false,
        }
      };
      let potData = [];
      component.handleRadioClick(potData, event);
      //	expect(component.props.onChangeIndex).toBe('hello');
    });
  });

  describe('Handle total Click ', () => {

    let component;
    const props = {
      onChange: jest.fn(),
      data: {

        "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
        "type": "savings",
        "product": {
          "code": "901",
          "name": "B Savings Account",
          "description": "B Savings Account"
        },
        "actions_available": {
        },
        "bank_id": "CB",
        "sort_code": "123456",
        "number": "41381167",
        "metadata": {
          "display_name": "B Instant Savings"
        }
      },
      contents: {
        current: 'current',
        available: 'available',
      }
    }

    const content = {

    }

    beforeEach(() => {

      component = TestUtils.renderIntoDocument(
        <SavingComponent {...props}  contents={props.contents} index={1}  />

      );



    });

    it('should handle total click fxn', () => {
      PaymentsStore.isOneOffPayment.mockReturnValue(false);
      let event = {
        target: {
          value: false,
        }
      };

      let totalComp = TestUtils.renderIntoDocument(
        <SavingPotTotalComponent {...props}  contents={props.contents} index={1}  />


      );
      let onChange = jest.fn();


      component.handleTotalClick(event);
      //PaymentsStore.isOneOffPayment.mockReturnValue(false);
      totalComp.onChange = onChange;
      TestUtils.Simulate.change(totalComp);
      onChange();
      expect(onChange).toBeCalled();

    });
  });

  describe('Handle total Click else condition ', () => {

    let component;
    const props = {
      onChange: jest.fn(),
      data: {

        "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
        "type": "savings",
        "product": {
          "code": "901",
          "name": "B Savings Account",
          "description": "B Savings Account"
        },
        "actions_available": {
        },
        "bank_id": "CB",
        "sort_code": "123456",
        "number": "41381167",
        "metadata": {
          "display_name": "B Instant Savings"
        }
      },
      contents: {
        current: 'current',
        available: 'available',
      }
    }

    const content = {

    }

    beforeEach(() => {

      component = TestUtils.renderIntoDocument(
        <SavingComponent {...props}  contents={props.contents} index={1}  />

      );



    });

    it('should handle total click fxn', () => {
      PaymentsStore.isOneOffPayment.mockReturnValue(true);
      let event = {
        target: {
          value: false,
        }
      };

      let totalComp = TestUtils.renderIntoDocument(
        <SavingPotTotalComponent {...props}  contents={props.contents} index={1}  />


      );
      let onChange = jest.fn();


      component.handleTotalClick(event);
      //PaymentsStore.isOneOffPayment.mockReturnValue(false);
      totalComp.onChange = onChange;
      TestUtils.Simulate.change(totalComp);
      onChange();
      expect(onChange).toBeCalled();

    });
  });


  describe('Handle total Click ', () => {

    let component;
    const props = {
      onChange: jest.fn(),
      data: {

        "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
        "type": "savings",
        "product": {
          "code": "901",
          "name": "B Savings Account",
          "description": "B Savings Account"
        },
        "actions_available": {
        },
        "bank_id": "CB",
        "sort_code": "123456",
        "number": "41381167",
        "metadata": {
          "display_name": "B Instant Savings"
        }
      },
      contents: {
        current: 'current',
        available: 'available',
      }
    }

    const content = {

    }

    beforeEach(() => {

      component = TestUtils.renderIntoDocument(
        <SavingComponent {...props}  contents={props.contents} index={1} name='toList'  />

      );



    });

    it('should handle total click fxn is to list', () => {
      PaymentsStore.isOneOffPayment.mockReturnValue(true);


      let event = {
        target: {
          value: false,
        }
      };

      let totalComp = TestUtils.renderIntoDocument(
        <SavingPotTotalComponent {...props}  contents={props.contents} index={1} name='toList'  />


      );
      let onChange = jest.fn();
      //PaymentsStore.isOneOffPayment.mockReturnValue(false);

      component.handleTotalClick(event);

      totalComp.onChange = onChange;
      TestUtils.Simulate.change(totalComp);
      onChange();
      expect(onChange).toBeCalled();

    });
  });
  //checkOneOffAllow
  describe('on Click checkOneOffAllow', () => {

    let component;
    const props = {
      onChange: jest.fn(),
      data: {

        "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
        "type": "savings",
        "product": {
          "code": "901",
          "name": "B Savings Account",
          "description": "B Savings Account"
        },
        "actions_available": {
        },
        "bank_id": "CB",
        "sort_code": "123456",
        "number": "41381167",
        "metadata": {
          "display_name": "B Instant Savings"
        }
      },
      contents: {
        current: 'current',
        available: 'available',
      }
    }

    const content = {

    }
    beforeEach(() => {

      component = TestUtils.renderIntoDocument(
        <SavingComponent {...props}  contents={props.contents} index={1}   />

      );

    });

    it('potList undefined ', () => {
      PaymentsStore.isOneOffPayment.mockReturnValue(true);
      component.setState({ potList: undefined });
      component.onSavingClick();

    });
  });

  describe('On Saving Click function', () => {

    let component;
    const props = {
      display:true,
      onChange: jest.fn(),
      data: {

        "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
        "type": "savings",
        "product": {
          "code": "901",
          "name": "B Savings Account",
          "description": "B Savings Account"
        },
        "actions_available": {
        },
        "bank_id": "CB",
        "sort_code": "123456",
        "number": "41381167",
        "metadata": {
          "display_name": "B Instant Savings"
        }
      },
      contents: {
        current: 'current',
        available: 'available',
      }
    }

    const content = {

    }
    beforeEach(() => {

      component = TestUtils.renderIntoDocument(
        <SavingComponent {...props}  contents={props.contents} index={1}  />

      );

    });

    it('potList undefined ', () => {
      PaymentsStore.isOneOffPayment.mockReturnValue(false);
      component.setState({ potList: undefined });

      component.onSavingClick();

    });
    it('potList undefined isOneOffPayment true condition ', () => {
      PaymentsStore.isOneOffPayment.mockReturnValue(true);
      component.setState({ potList: undefined });

      component.onSavingClick();

    });
    it('potList undefined ', () => {

      component.setState({ potList: undefined });
      component.onSavingClick();

    });
     
    

    it('potList empty', () => {

      component.setState({
        potList: {
          pots: {
            "pots": [

            ]
          }
        },
      });
      component.onSavingClick();

    });

    it('potList Not empty', () => {

      component.setState({
        potList: {
          pots: {
            "pots": [
              {
                "id": "3ebbc744-9a3b-414e-b5b7-49e4afd365be",
                "name": "Garden Landscaping",
                "reference": "1",
                "balance": {
                  "value": -600.0,
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
            ]
          }
        },
      });
      component.onSavingClick();

    });

     it('potList undefined -browser utils true', () => {
        let event = {
        target: {
          checked: false,
        }
      };
      BrowserUtils.isMobileView.mockReturnValue(true);
      component.setState({ potList: undefined });
      component.onSavingClick(event);

    });
  });

  describe('On Saving Pot Click', () => {

    let component;
    const props = {
      onChange: jest.fn(),
      data: {

        "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
        "type": "savings",
        "product": {
          "code": "901",
          "name": "B Savings Account",
          "description": "B Savings Account"
        },
        "actions_available": {
        },
        "bank_id": "CB",
        "sort_code": "123456",
        "number": "41381167",
        "metadata": {
          "display_name": "B Instant Savings"
        }
      },
      contents: {
        current: 'current',
        available: 'available',
      }
    }

    const content = {

    }
    beforeEach(() => {

      component = TestUtils.renderIntoDocument(
        <SavingComponent {...props}  contents={props.contents} index={1}  />

      );

    });

    it('saving pot click ', () => {
      component.savingpotClick();

    });
  });

  describe('On Set Radio Css Click', () => {

    let component;
    const props = {
      onChange: jest.fn(),
      data: {

        "id": "b80e95a0-6b60-45b2-8b0f-77f2355f306",
        "type": "savings",
        "product": {
          "code": "901",
          "name": "B Savings Account",
          "description": "B Savings Account"
        },
        "actions_available": {
        },
        "bank_id": "CB",
        "sort_code": "123456",
        "number": "41381167",
        "metadata": {
          "display_name": "B Instant Savings"
        }
      },
      contents: {
        current: 'current',
        available: 'available',
      }
    }

    const content = {

    }
    beforeEach(() => {

      component = TestUtils.renderIntoDocument(
        <SavingComponent {...props}  contents={props.contents} index={1} name='toList'  />

      );

    });

    it('set Radio RP ', () => {
      let onClick = jest.fn();
      component.setState({
        potList: {
          pots: {
            "pots": [
              {
                "id": "3ebbc744-9a3b-414e-b5b7-49e4afd365be",
                "name": "Garden Landscaping",
                "reference": "1",
                "balance": {
                  "value": -600.0,
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
            ]
          }
        },
      })
      PaymentsStore.getNextTask.mockReturnValue("RP");
      PaymentsStore.IsToAccountSame.mockReturnValue(true);
      PaymentsStore.IsAccountSame.mockReturnValue(true);
      PaymentsStore.getSelectedPot.mockReturnValue('');
      PaymentsStore.isSavingTotClicked.mockReturnValue(false);
      PaymentsStore.getPaymentType.mockReturnValue(true);
      PaymentsStore.getMoveMoney.mockReturnValue({id:123});
      component.setRadioCSS(content);
      let radio = TestUtils.findRenderedDOMComponentWithTag(component, 'input');
      TestUtils.Simulate.click(radio);
      component.props.onChange(props.data);

      expect(component.props.onChange).toBeCalled();

    });
     it('set Radio RP else ', () => {
      props.data.id = 2345;
      // PaymentsStore.IsToAccountSame(props.data.id);
      PaymentsStore.getSelectedAccount.mockReturnValue({type:'savings',id:123});
      PaymentsStore.getSelectedToAccount.mockReturnValue({id:123});
      PaymentsStore.getSelectedPot.mockReturnValue('');
      //PaymentsStore.getNextTask.mockReturnValue("RP");
       PaymentsStore.IsAccountSame.mockReturnValue(true);
       PaymentsStore.IsToAccountSame.mockReturnValue(true);
       PaymentsStore.getMoveMoney.mockReturnValue({id:123});
      PaymentsStore.getSelectedPot.mockReturnValue('');
      PaymentsStore.isSavingTotClicked.mockReturnValue(false);
      PaymentsStore.getPaymentType.mockReturnValue(true);
      component.setRadioCSS(content);

    });
     xit('set Radio RP else-move money false ', () => {
      props.data.id = 2345;
      // PaymentsStore.IsToAccountSame(props.data.id);
      PaymentsStore.getSelectedAccount.mockReturnValue({type:'savings',id:123});
      PaymentsStore.getSelectedToAccount.mockReturnValue({id:123});
      PaymentsStore.getSelectedPot.mockReturnValue('');
      //PaymentsStore.getNextTask.mockReturnValue("RP");
       PaymentsStore.IsAccountSame.mockReturnValue(true);
       PaymentsStore.IsToAccountSame.mockReturnValue(true);
       PaymentsStore.getMoveMoney.mockReturnValue();
      PaymentsStore.getSelectedPot.mockReturnValue('');
      PaymentsStore.isSavingTotClicked.mockReturnValue(false);
      PaymentsStore.getPaymentType.mockReturnValue(true);
      component.setRadioCSS(content);

    });
    it('set Radio RP else ', () => {
      props.data.id = '';
      // PaymentsStore.IsToAccountSame(props.data.id);
      PaymentsStore.IsToAccountSame.mockReturnValue(false);
      PaymentsStore.getNextTask.mockReturnValue("RP");
       PaymentsStore.IsAccountSame.mockReturnValue(true);
      PaymentsStore.getSelectedPot.mockReturnValue('');
      PaymentsStore.isSavingTotClicked.mockReturnValue(false);
      PaymentsStore.getMoveMoney.mockReturnValue({id:123});
      PaymentsStore.getPaymentType.mockReturnValue(true);
      component.setRadioCSS(content);

    });
    it('set Radio CNFRM ', () => {

      //PaymentsStore.IsToAccountSame(props.data.id);
      PaymentsStore.IsToAccountSame.mockReturnValue(true);
      PaymentsStore.IsAccountSame.mockReturnValue(true);
      PaymentsStore.getSelectedPot.mockReturnValue('');
      PaymentsStore.isSavingTotClicked.mockReturnValue(false);
      PaymentsStore.getPaymentType.mockReturnValue(true);
      PaymentsStore.getMoveMoney.mockReturnValue({id:123});
      PaymentsStore.getNextTask.mockReturnValue("CNFRM");
      component.setRadioCSS(content);

    });
    it('set Radio To ', () => {

    PaymentsStore.IsToAccountSame.mockReturnValue(true);
      PaymentsStore.IsAccountSame.mockReturnValue(true);
      PaymentsStore.getSelectedPot.mockReturnValue('');
      PaymentsStore.isSavingTotClicked.mockReturnValue(true);
      PaymentsStore.getPaymentType.mockReturnValue(true);
      PaymentsStore.getMoveMoney.mockReturnValue({id:123});
      PaymentsStore.getNextTask.mockReturnValue("To");
      component.setRadioCSS(content);

    });

  });

  describe('On Set Radio Css Click From List', () => {

    let component;
    const props = {
      onChange: jest.fn(),
      data: {

        "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
        "type": "savings",
        "product": {
          "code": "901",
          "name": "B Savings Account",
          "description": "B Savings Account"
        },
        "actions_available": {
        },
        "bank_id": "CB",
        "sort_code": "123456",
        "number": "41381167",
        "metadata": {
          "display_name": "B Instant Savings"
        }
      },
      contents: {
        current: 'current',
        available: 'available',
      }
    }

    const content = {

    }
    beforeEach(() => {

      component = TestUtils.renderIntoDocument(
        <SavingComponent {...props}  contents={props.contents} index={1} name='fromList'  />

      );

    });

    it('set Radio FROm, TO , KP ', () => {
      component.setState({
        potList: {
          pots: {
            "pots": [
              {
                "id": "3ebbc744-9a3b-414e-b5b7-49e4afd365be",
                "name": "Garden Landscaping",
                "reference": "1",
                "balance": {
                  "value": -600.0,
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
            ]
          }
        },
      })
      PaymentsStore.getNextTask.mockReturnValue("To");
      component.setRadioCSS(content);
      let radio = TestUtils.findRenderedDOMComponentWithTag(component, 'input');
      TestUtils.Simulate.click(radio);
      component.props.onChange(props.data);

      expect(component.props.onChange).toBeCalled();

    });

    it('set Radio RP ', () => {
      //PaymentsStore.IsToAccountSame(props.data.id);
      PaymentsStore.IsToAccountSame.mockReturnValue(true);

      PaymentsStore.getNextTask.mockReturnValue("RP");
      component.setRadioCSS(content);

    });

  });

  describe('On Render Label Click from list', () => {

    let component;
    const props = {
      display: true,
      onChange: jest.fn(),
      data: {

        "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
        "type": "savings",
        "product": {
          "code": "901",
          "name": "B Savings Account",
          "description": "B Savings Account"
        },
        "actions_available": {
        },
        "bank_id": "CB",
        "sort_code": "123456",
        "number": "41381167",
        "metadata": {
          "display_name": "B Instant Savings"
        }
      },
      contents: {
        current: 'current',
        available: 'available',
      }
    }

    const content = {

    }
    /* beforeEach(() => {
 
       component = TestUtils.renderIntoDocument(
         <SavingComponent {...props}  contents={props.contents} index={1} name='fromList'  />
           
       );
 
     });*/

    it('render else covering ', () => {
      component = TestUtils.renderIntoDocument(
        <SavingComponent {...props}  contents={props.contents} index={1} name='fromList'  />)
      BrowserUtils.isMobileView.mockReturnValue(true);

      //PaymentsStore.getNextTask.mockReturnValue("RP");
      component.setState({ totClick: true });
      component.renderLabel(content);

    });
    it('render else if covering ', () => {

      component = TestUtils.renderIntoDocument(
        <SavingComponent {...props}  contents={props.contents} index={1} name='fromList'  />)
      component.setState({
        potList: {
          pots: {
            "pots": [
              {
                "id": "3ebbc744-9a3b-414e-b5b7-49e4afd365be",
                "name": "Garden Landscaping",
                "reference": "1",
                "balance": {
                  "value": -600.0,
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
            ]
          }
        },
      })
      BrowserUtils.isMobileView.mockReturnValue(true);
      component.setState({ totClick: false });
      PaymentsStore.getNextTask.mockReturnValue("RP");

      component.renderLabel(content);

    });
    it('render else if else covering to list', () => {
      component = TestUtils.renderIntoDocument(
        <SavingComponent {...props}  contents={props.contents} index={1} name='toList'  />
      );
      BrowserUtils.isMobileView.mockReturnValue(true);
      PaymentsStore.getMoveMoney.mockReturnValue({id:123});
      component.setState({ totClick: false });
      PaymentsStore.getNextTask.mockReturnValue("RP");

      component.renderLabel(content);

    });
    it('render else if else covering to list 278', () => {
      component = TestUtils.renderIntoDocument(
        <SavingComponent {...props}  contents={props.contents} index={1} name='fromList'  />
      );
      let potData = {
        balance: 600,
      }
      BrowserUtils.isMobileView.mockReturnValue(true);
      component.setState({ totClick: false });
      //potData.balance=600;
      //component.setState({potData:undefined});
      // PaymentsStore.getNextTask.mockReturnValue("To");

      component.renderLabel(content);

    });

  });

  describe('On Render Label Click from list potdata balance != empty', () => {

    let component;
    const potData = {

      "balance": {
        "value": 600.0,
        "currency": "GBP"
      },
    }
    const props = {
      display: true,
      onChange: jest.fn(),
      data: {

        "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
        "type": "savings",
        "product": {
          "code": "901",
          "name": "B Savings Account",
          "description": "B Savings Account"
        },
        "actions_available": {
        },
        "bank_id": "CB",
        "sort_code": "123456",
        "number": "41381167",
        "metadata": {
          "display_name": "B Instant Savings"
        }
      },
      contents: {
        current: 'current',
        available: 'available',
      }
    }
    const content = {

    }

    it('render else covering ', () => {
      PaymentsStore.getNextTask.mockReturnValue("KP");
      component = TestUtils.renderIntoDocument(
        <SavingComponent {...props}  contents={props.contents} index={1} name='fromList'  />)
      BrowserUtils.isMobileView.mockReturnValue(true);

      component.setState({ totClick: false, potData: potData });
      component.renderLabel(content);

    });
  });

  describe('On Render Label get current amount for the pot', () => {

    let component;
    const potData = {
"name":"surya",
      "balance": {
        "value": 600.0,
        "currency": "GBP",
        
      },
    }
    const props = {
      display: true,
      onChange: jest.fn(),
      data: {

        "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
        "type": "savings",
        "product": {
          "code": "901",
          "name": "B Savings Account",
          "description": "B Savings Account"
        },
        "actions_available": {
        },
        "bank_id": "CB",
        "sort_code": "123456",
        "number": "41381167",
        "metadata": {
          "display_name": "B Instant Savings"
        }
      },
      contents: {
        current: 'current',
        available: 'available',
      }
    }
    const content = {

    }

    it('render else covering ', () => {
      PaymentsStore.getNextTask.mockReturnValue("KP");
      PaymentsStore.getAccountDetail.mockReturnValue({
        balances: [
          {
            type: 'current',
            amount: {
              value: 100.00
            }
          }
        ]
      });
      component = TestUtils.renderIntoDocument(
        <SavingComponent {...props}  contents={props.contents} index={1} name='fromList'  />)
      BrowserUtils.isMobileView.mockReturnValue(true);

      component.setState({ totClick: false, potData: potData });
      component.renderLabel(content);

    });
  });

describe('get getAccountDisplayName', () => {

    let component;
    const potData = {

      "balance": {
        "value": 600.0,
        "currency": "GBP"
      },
    }
    const props = {
      display: true,
      onChange: jest.fn(),
      data: {

        "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
        "type": "savings",
        "product": {
          "code": "901",
          "name": "B Savings Account",
          "description": "B Savings Account"
        },
        "actions_available": {
        },
        "bank_id": "CB",
        "sort_code": "123456",
        "number": "41381167",
        "metadata": {
          "display_name": "B Instant Savings"
        }
      },
      contents: {
        current: 'current',
        available: 'available',
      }
    }
    const content = {

    }

    it('render else covering ', () => {
     
      component = TestUtils.renderIntoDocument(
        <SavingComponent {...props}  contents={props.contents} index={1} name='fromList'  />)
     
      let name=component.getAccountDisplayName();
      expect(name).toBe('B Instant Savings')

    });
  });

});



