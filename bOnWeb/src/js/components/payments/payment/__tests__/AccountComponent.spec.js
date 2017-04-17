'use strict';
jest.unmock('../AccountComponent');
jest.mock('../../../../stores/PaymentsStore');
jest.unmock('../../../../utils/NumberUtils');
const AccountComponent = require('../AccountComponent');
const PaymentsStore = require('../../../../stores/PaymentsStore');
const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const BrowserUtils = require('../../../../utils/BrowserUtils');

/*const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<AccountComponent
		{...props}
		/>);
	return shallowRenderer.getRenderOutput();
};*/

describe('Account Component Test Cases', () => {
  describe('Account Sequential Color', () => {
    const props = {
      data: {

        "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
        "type": "current",
        "product": {
          "code": "901",
          "name": "B current",
          "description": "B current"
        },
        "actions_available": {
        },
        "bank_id": "CB",
        "sort_code": "650000",
        "number": "22446699",
        "metadata": {
          "display_name": "B current"
        }
      },
      contents: {
        current: 'current',
        available: 'available',
      }
    };

    const colorTesting = (props, key) => {
      const component = TestUtils.renderIntoDocument(<AccountComponent data={props.data} contents={props.contents} index={key} name='fromList' />);
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



  describe('to check get state', () => {
    const props1 = {
      data: {

        "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
        "type": "current",
        "product": {
          "code": "901",
          "name": "B current",
          "description": "B current"
        },
        "actions_available": {
        },
        "bank_id": "CB",
        "sort_code": "650000",
        "number": "22446699",
        "metadata": {
          "display_name": ""
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
        <AccountComponent {...props1} />
      );

      let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h3');
      expect(header.textContent).toBe('B current')
    });

    it('metadata type not to be', () => {
      props1.data.metadata.display_name = 'B-current';
      let instance = TestUtils.renderIntoDocument(
        <AccountComponent {...props1} />
      );

      let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h3');
      expect(header.textContent).toBe('B-current')

    });

    it('metadata type not to be', () => {
      props1.data.type = 'credit_card';
      let instance = TestUtils.renderIntoDocument(
        <AccountComponent {...props1} />
      );

      let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h5');
      expect(header.textContent).toBe('2244 6699  6699')
    });

  });

  describe('onclick function ', () => {

    let component;
    const props = {
      onClick: jest.fn(),
      display: true,
      data: {

        "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
        "type": "current",
        "product": {
          "code": "901",
          "name": "B current",
          "description": "B current"
        },
        "actions_available": {
        },
        "bank_id": "CB",
        "sort_code": "650000",
        "number": "22446699",
        "metadata": {
          "display_name": ""
        }
      },
      contents: {
        current: 'current',
        available: 'available',
      }
    };

    const content = {

    }

    beforeEach(() => {

      component = TestUtils.renderIntoDocument(
        <AccountComponent {...props}
          />
      );

    });

    it('should handle click fxn', () => {
      BrowserUtils.isMobileView.mockReturnValue(true);
      let event = {
        target: {
          value: false,
        }
      };
      component.onClick(event);
      //	expect(component.props.onChangeIndex).toBe('hello');
    });

    it('should handle click fxn browser util returning false', () => {
      BrowserUtils.isMobileView.mockReturnValue(false);
      let event = {
        target: {
          value: false,
        }
      };
      component.onClick(event);
      //	expect(component.props.onChangeIndex).toBe('hello');
    });
  });

  describe('componentwillMount', () => {

    const props = {
      data: {

        "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
        "type": "current",
        "product": {
          "code": "901",
          "name": "B current",
          "description": "B current"
        },
        "actions_available": {
        },
        "bank_id": "CB",
        "sort_code": "650000",
        "number": "22446699",
        "metadata": {
          "display_name": ""
        }
      },
      contents: {
        current: 'current',
        available: 'available',
      }
    };

    xit('check current amount', () => {
      let instance = TestUtils.renderIntoDocument(
        <AccountComponent {...props}  contents={props.contents} index={1} name='fromList'/>

      );
      //instance.componentWillMount();
      instance.setState({ curAmount: '1.00' })
      PaymentsStore.getNextTask.mockReturnValue("To");


      let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h2');
      expect(header.textContent).toBe('£1.00 current');

    });


    it('check current amount blank', () => {
      props.data.id = "0855dae-d2de-4ebc-ab0a-2fd0e9556e16";
      let instance = TestUtils.renderIntoDocument(
        <AccountComponent {...props}  contents={props.contents} index={1} name='fromList'/>
      );
      instance.componentWillMount();
      PaymentsStore.getNextTask.mockReturnValue("To");

      let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h3');
      expect(header.textContent).toBe('');

    });


  });

  describe('componentwillMount To list', () => {

    const props = {
      data: {

        "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
        "type": "current",
        "product": {
          "code": "901",
          "name": "B current",
          "description": "B current"
        },
        "actions_available": {
        },
        "bank_id": "CB",
        "sort_code": "650000",
        "number": "22446699",
        "metadata": {
          "display_name": ""
        }
      },
      contents: {
        current: 'current',
        available: 'available',
      }
    };
    it('check current amount tolist', () => {


      let instance = TestUtils.renderIntoDocument(
        <AccountComponent {...props}  contents={props.contents} index={1} name='toList'/>


      );
      PaymentsStore.getNextTask.mockReturnValue("To");
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
      instance.componentWillMount();

      let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h2');
      expect(header.textContent).toBe('£100.00 current');

    });

it('check current amount tolist available', () => {


      let instance = TestUtils.renderIntoDocument(
        <AccountComponent {...props}  contents={props.contents} index={1} name='toList'/>


      );
      PaymentsStore.getNextTask.mockReturnValue("To");
      PaymentsStore.getAccountDetail.mockReturnValue({
        balances: [
          {
            type: 'available',
            amount: {
              value: 100.00
            }
          }
        ]
      });
      instance.componentWillMount();

      let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h4');
      expect(header.textContent).toBe('£100.00 available');

    });


    it('check current amount blank tolist', () => {
      props.data.id = "0855dae-d2de-4ebc-ab0a-2fd0e9556e16";
      let instance = TestUtils.renderIntoDocument(
        <AccountComponent {...props}  contents={props.contents} index={1} name='toList'/>
      );
      instance.componentWillMount();
      PaymentsStore.getNextTask.mockReturnValue("RP");
      let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h3');
      expect(header.textContent).toBe('');

    });


  });

  describe('onStoreChange', () => {

    const props = {
      data: {

        "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
        "type": "current",
        "product": {
          "code": "901",
          "name": "B current",
          "description": "B current"
        },
        "actions_available": {
        },
        "bank_id": "CB",
        "sort_code": "650000",
        "number": "22446699",
        "metadata": {
          "display_name": ""
        }
      },
      contents: {
        current: 'current',
        available: 'available',
      }
    };

    it('check current amount', () => {
      let instance = TestUtils.renderIntoDocument(
        <AccountComponent {...props}  contents={props.contents} index={1} />

      );
      PaymentsStore.getAccountDetail.mockReturnValue({
        balances: [
          {
            type: 'current',
            amount: {
              value: 200.00
            }
          }
        ]
      });

      instance.onStoreChange();


      let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h2');
      expect(header.textContent).toBe('£200.00 current');

    });
    it('check available amount for store change', () => {
      let instance = TestUtils.renderIntoDocument(
        <AccountComponent {...props}  contents={props.contents} index={1} />

      );
      PaymentsStore.getAccountDetail.mockReturnValue({
        balances: [
          {
            type: 'available',
            amount: {
              value: 200.00
            }
          }
        ]
      });

      instance.onStoreChange();


      let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h4');
      expect(header.textContent).toBe('£200.00 available');

    });

    it('check accunt details undefined', () => {
      let instance = TestUtils.renderIntoDocument(
        <AccountComponent {...props}  contents={props.contents} index={1} />

      );
      PaymentsStore.getAccountDetail.mockReturnValue();

      instance.onStoreChange();
     
    });

    it('check current amount to List', () => {
      let instance = TestUtils.renderIntoDocument(
        <AccountComponent {...props}  contents={props.contents} index={1} />
      );

      PaymentsStore.getAccountDetail.mockReturnValue({
        balances: [
          {
            type: 'current',
            amount: {
              value: 300.00
            }
          }
        ]
      });
      instance.onStoreChange();

      // PaymentsStore.task = "RP";


      let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h2');
      expect(header.textContent).toBe('£300.00 current');

    });

    it('check current amount blank', () => {
      props.data.id = "0855dae-d2de-4ebc-ab0a-2fd0e9556e16";
      let instance = TestUtils.renderIntoDocument(
        <AccountComponent {...props}  contents={props.contents} index={1} />
      );
      instance.onStoreChange();

      let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h3');
      expect(header.textContent).toBe('');

    });


  });


  describe('componentWillUnmount', () => {

    const props = {
      data: {

        "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
        "type": "current",
        "product": {
          "code": "901",
          "name": "B current",
          "description": "B current"
        },
        "actions_available": {
        },
        "bank_id": "CB",
        "sort_code": "650000",
        "number": "22446699",
        "metadata": {
          "display_name": ""
        }
      },
      contents: {
        current: 'current',
        available: 'available',
      }
    };

    it('check component will unmount', () => {
      let instance = TestUtils.renderIntoDocument(
        <AccountComponent {...props}  contents={props.contents} index={1} />
      );

      instance.componentWillUnmount();

    });
  });


  describe('Set Radio CSS', () => {

    const props = {
      data: {

        "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
        "type": "current",
        "product": {
          "code": "901",
          "name": "B current",
          "description": "B current"
        },
        "actions_available": {
        },
        "bank_id": "CB",
        "sort_code": "650000",
        "number": "22446699",
        "metadata": {
          "display_name": ""
        }
      },
      contents: {
        current: 'current',
        available: 'available',
      }
    };


    describe('For To List', () => {

      it('case Next Task -IsAccountSame IsToAccountSame true - To,KP', () => {
        PaymentsStore.getNextTask.mockReturnValue("To");
        let s = PaymentsStore.IsAccountSame(props.data.id);
        PaymentsStore.getPaymentType();
        let t = PaymentsStore.IsToAccountSame(props.data.id);


        let instance = TestUtils.renderIntoDocument(
          <AccountComponent {...props}  contents={props.contents} index={1} name='toList'/>
        );

        let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'input');
        expect(header).toBeDefined();

      });

      it('case Next Task -IsAccountSame true - RP', () => {
        //PaymentsStore.setNextTask("RP");
        PaymentsStore.getNextTask.mockReturnValue("RP");
        //console.log("DDD"+PaymentsStore.IsAccountSame(props.data.id))
        let instance = TestUtils.renderIntoDocument(
          <AccountComponent {...props}  contents={props.contents} index={1} name='toList'/>
        );


        let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'input');
        expect(header).toBeDefined();

      });
      it('case Next Task -IsAccountSame false- To,KP', () => {
        props.data.id = '';
        //PaymentsStore.setNextTask("To");
        PaymentsStore.getNextTask.mockReturnValue("To");
        PaymentsStore.IsAccountSame.mockReturnValue('133333');
        let instance = TestUtils.renderIntoDocument(
          <AccountComponent {...props}  contents={props.contents} index={1} name='toList'/>
        );

        let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'input');
        expect(header).toBeDefined();

      });

     it('case next To, to account same for payment', () => {
        props.data.id = '';
        PaymentsStore.getPaymentType.mockReturnValue(true);
        PaymentsStore.getNextTask.mockReturnValue("KP");
        PaymentsStore.getSelectedAccount.mockReturnValue({type:"savings"});
        PaymentsStore.getSelectedPot.mockReturnValue('');
        PaymentsStore.isSavingTotClicked.mockReturnValue(false);
        PaymentsStore.getMoveMoney.mockReturnValue({id:1234})
        PaymentsStore.IsToAccountSame.mockReturnValue(true);
        //PaymentsStore.IsAccountSame.mockReturnValue('133333');
        let instance = TestUtils.renderIntoDocument(
          <AccountComponent {...props}  contents={props.contents} index={1} name='toList'/>
        );

        let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'input');
        expect(header).toBeDefined();

      });
      it('case next To, to account same for payment-else', () => {
        props.data.id = '';
        PaymentsStore.getPaymentType.mockReturnValue(true);
        PaymentsStore.getNextTask.mockReturnValue("KP");
        PaymentsStore.getSelectedAccount.mockReturnValue({type:"accounts"});
        PaymentsStore.getSelectedPot.mockReturnValue('');
        PaymentsStore.isSavingTotClicked.mockReturnValue(false);
        PaymentsStore.getMoveMoney.mockReturnValue('')
        PaymentsStore.IsToAccountSame.mockReturnValue(true);
        //PaymentsStore.IsAccountSame.mockReturnValue('133333');
        let instance = TestUtils.renderIntoDocument(
          <AccountComponent {...props}  contents={props.contents} index={1} name='toList'/>
        );

        let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'input');
        expect(header).toBeDefined();

      });


      it('case Next Task -IsAccountSame false- RP', () => {
        props.data.id = '';
        //PaymentsStore.setNextTask("RP");
        PaymentsStore.getNextTask.mockReturnValue("RP");
         PaymentsStore.getSelectedAccount.mockReturnValue({type:"savings"});
        PaymentsStore.getSelectedPot.mockReturnValue('');
        PaymentsStore.isSavingTotClicked.mockReturnValue(false);
        let s = PaymentsStore.IsAccountSame(props.data.id);
        let instance = TestUtils.renderIntoDocument(
          <AccountComponent {...props}  contents={props.contents} index={1} name='toList'/>
        );

        let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'input');
        expect(header).toBeDefined();

      });
       it('case Next Task -IsAccountSame true- RP', () => {
        props.data.id = '12345';
        //PaymentsStore.setNextTask("RP");
         PaymentsStore.IsAccountSame.mockReturnValue(true);
        PaymentsStore.getNextTask.mockReturnValue("RP");
       
        let instance = TestUtils.renderIntoDocument(
          <AccountComponent {...props}  contents={props.contents} index={1} name='toList'/>
        );

        let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'input');
        expect(header).toBeDefined();

      });


      it('case Next Task - CNFRM', () => {
        //PaymentsStore.setNextTask("CNFRM");
        PaymentsStore.getNextTask.mockReturnValue("CNFRM");
        let instance = TestUtils.renderIntoDocument(
          <AccountComponent {...props}  contents={props.contents} index={1} name='toList'/>
        );

        let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'input');
        expect(header).toBeDefined();

      });

       it('case Next Task default', () => {
        
        //PaymentsStore.setNextTask("RP");
        PaymentsStore.getNextTask.mockReturnValue("from");
        let instance = TestUtils.renderIntoDocument(
          <AccountComponent {...props}  contents={props.contents} index={1} name='toList'/>
        );

        let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'input');
        expect(header).toBeDefined();

      });


    });
    describe('For From List', () => {

      it('case Next Task -IsAccountSame true - To,KP,RP,CNFRM', () => {
        //PaymentsStore.setNextTask("To");
        PaymentsStore.getNextTask.mockReturnValue("To");
        let s = PaymentsStore.IsAccountSame(props.data.id);

        let instance = TestUtils.renderIntoDocument(
          <AccountComponent {...props}  contents={props.contents} index={1} name='fromList'/>
        );

        let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'input');
        expect(header).toBeDefined();

      });

      it('case Next Task - From', () => {
        //PaymentsStore.setNextTask("From");
        PaymentsStore.getNextTask.mockReturnValue("From");
        let s = PaymentsStore.IsAccountSame(props.data.id);

        let instance = TestUtils.renderIntoDocument(
          <AccountComponent {...props}  contents={props.contents} index={1} name='fromList'/>
        );

        let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'input');
        expect(header).toBeDefined();

      });







    });



  });

});

