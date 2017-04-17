'use strict';

jest.unmock('../ConfirmPayment');
jest.mock('../../../stores/PaymentsStore');
const ConfirmPayment = require('../ConfirmPayment');
const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
//const PaymentsActionCreator = require('../../../actions/PaymentsActionCreator');
const PaymentsStore = require('../../../stores/PaymentsStore');
const moment = require('moment');
const config = require('../../../config');
const HelmetWrapper = require('react-helmet');
const HeaderInnerComponent = require('../../common/HeaderInnerComponent');
const BasicModal = require('../../common/modals/ModalB');
const NumberUtils = require('../../../utils/NumberUtils');
const AccountComponent = require('../payment/AccountComponent');
//const PayeeListComponent = require('../payee/PayeeListComponent');
const SavingComponent = require('../payment/SavingComponent');
const PaymentsActionCreator = require('../../../actions/PaymentsActionCreator');
const BrowserUtils = require('../../../utils/BrowserUtils');
const DateUtils = require('../../../utils/DateUtils');
const PayeeComponent = require('../payee/PayeeComponent');


const shallowRender = props => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<ConfirmPayment
    {...props}
    />);
  return shallowRenderer.getRenderOutput();
};

PaymentsStore.getEndingDetails.mockReturnValue({
  amount: "55"

});

PaymentsStore.getSelectedToAccount.mockReturnValue({
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

PaymentsStore.getSelectedAccount.mockReturnValue({
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

PaymentsStore.getSelectedPayee.mockReturnValue({
  data: {
    "id": "4bbcfd9d-c1b4-4a65-a694-b347711612e7",
    "account": {
      "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
      "sort_code": "654321",
      "account_number": "12345678"
    },
    "to_account": {
      "sort_code": "654321",
      "account_number": "43214321",
      "name": "John Black"
    },
    "display_name": "John Black ",
    "reference": "88228822",
    "permissions": {
      "can_edit_reference": true,
      "can_set_date_in_future": true,
      "can_delete": true
    }
  }
});

describe('ConfirmPayment Test Cases', () => {
  let props = {
    handleDoneClick: jest.fn(),
    //data:'data',
    content: {
      'cancelTitle': 'cancelTitle',
      'sureTitle': 'sureTitle',
      'fromTitle': 'fromTitle',
      'toTitle': 'toTitle',
      'amount': 'amount',
      'reference': 'reference',
      'when': 'when',
      'Yes': 'Yes',
      'No': 'No',
      'howOften': 'howOften',
      'startDate': 'startDate',
      'stopitWhen': 'stopitWhen',
      'makeTransfer': 'makeTransfer',
      'makePayment': 'makePayment',
    }
  }

  it('should return confirm payment page jsx', () => {
    let component = shallowRender(props);
    //PaymentsStore.getSelectedAccount().id;


    expect(component).toEqualJSX(
      <div className="b container-fluid-full">
        <HelmetWrapper title="Payments" />
        <HeaderInnerComponent
          cancelClick={function noRefCheck() { } }
          cancelTitle="cancelTitle"
          title="sureTitle"
          />
        <div className="main-container inner">
          <div className="scroll-wrapper">
            <div className="payments content-wrapper">
              <div className="row tab-content confirm-payment">
                <div className="col-lg-offset-0 col-lg-4 col-md-offset-0 col-md-4 col-sm-offset-2 col-sm-8 col-xs-offset-0 col-xs-12 padding-right-left">
                  <p className="title text-center">
                    fromTitle
                  </p>
                  <AccountComponent
                    contents={{
                      No: 'No', Yes: 'Yes', amount: 'amount', cancelTitle: 'cancelTitle', fromTitle: 'fromTitle', howOften: 'howOften', makePayment: 'makePayment', makeTransfer: 'makeTransfer', reference: 'reference', startDate: 'startDate', stopitWhen: 'stopitWhen', sureTitle: 'sureTitle',
                      toTitle: 'toTitle', when: 'when'
                    }}
                    data={{
                      Acntdata: {
                        actions_available: {
                          '/account/alerts': false, '/account/mandates/dd/read': false, '/account/mandates/dd/write': false, '/account/mandates/so/read': false, '/account/mandates/so/write': false, '/account/payments/transfer/in': false,
                          '/account/payments/transfer/out': false, '/account/payments/uk/default/out': false, '/account/pots': false, '/account/projections': false, '/account/sweeps': false, '/account/sweeps/transfer/out': false, '/account/transactions/read': false
                        }, balances: [{ amount: { currency: 'GBP', value: 1517.44 }, at: '2016-05-16T15:07:50.832+00:00', type: 'current' }, {
                          amount: {
                            currency: 'GBP', value:
                              3482.56
                          }, at: '2016-05-16T15:07:50.832+00:00', type: 'available'
                        }], bank_id: 'CB', id: 'b80e95a0-6b60-45b2-8b0f-77f2355f306', limits: [], metadata: { display_name: 'Loan Account' }, number: '650000-22446699', owners: [{ display_name: 'Bob Brown', id: '2', provider: 'CB' }], product: { code: '901', description: 'Personal Loan', name: 'Personal Loan' }, type: 'savings'
                      }
                    }}
                    name="fromList"
                    nextStep={undefined}
                    />
                </div>
                <div className="col-lg-offset-0 col-lg-4 col-md-offset-0 col-md-4 col-md-push-4 col-sm-offset-2 col-sm-8 col-xs-offset-0 col-xs-12 padding-right-left">
                  <p className="title text-right">
                    toTitle
                  </p>
                  <PayeeComponent
                    contents={{ No: 'No', Yes: 'Yes', amount: 'amount', cancelTitle: 'cancelTitle', fromTitle: 'fromTitle', howOften: 'howOften', makePayment: 'makePayment', makeTransfer: 'makeTransfer', reference: 'reference', startDate: 'startDate', stopitWhen: 'stopitWhen', sureTitle: 'sureTitle', toTitle: 'toTitle', when: 'when' }}
                    data={{
                      account: { account_number: '12345678', id: 'b80e95a0-6b60-45b2-8b0f-77f2355f3061', sort_code: '654321' }, display_name: 'John Black ', id:
                        '4bbcfd9d-c1b4-4a65-a694-b347711612e7', permissions: { can_delete: true, can_edit_reference: true, can_set_date_in_future: true }, reference: '88228822', to_account:
                      { account_number: '43214321', name: 'John Black', sort_code: '654321' }
                    }}
                    disabled={true}
                    nextStep={undefined}
                    />
                </div>
                <div className="col-lg-offset-0 col-lg-4 col-md-offset-0 col-lg-pull-4 col-md-4 col-md-pull-4 col-sm-offset-2 col-sm-8 col-xs-offset-0 col-xs-12">
                  <form id="repeat-payment">
                    <div className="keypad">
                      <label className="amount-title">
                        amount
                      </label>
                      <input
                        className="value confirm-value"
                        defaultValue={undefined}
                        readOnly={true}
                        type="text"
                        />
                      <ul className="form-wrapper">
                        <li>
                          <section>
                            Repeat this payment
                          </section>
                          <section>
                            No
                          </section>
                        </li>
                      </ul>
                    </div>
                    <button
                      className="pay-btn-success"
                      onClick={function noRefCheck() { } }
                      type="button"
                      >
                      makePayment
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  });

  it('handles componentWillUnmount click', () => {
    let instance = TestUtils.renderIntoDocument(
      <ConfirmPayment
        {...props}
        />
    );
    instance.setState({
      ToAcntdata: {
        "type": "accounts",

      }
    })

    instance.componentWillUnmount();
    expect(instance.componentWillUnmount).toBeDefined();

  });

  it('handles onStore Change -getMakePayment -202', () => {
    let instance = TestUtils.renderIntoDocument(
      <ConfirmPayment
        {...props}
        />
    );

    PaymentsStore.getMakePaymentResponse.mockReturnValue({
      code: 202

    });
    PaymentsStore.getMakePaymentResponse().code;
    instance.onStoreChange();
    expect(instance.onStoreChange).toBeDefined();

  });

  it('handles onStore Change -getMakePayment -422', () => {
    let instance = TestUtils.renderIntoDocument(
      <ConfirmPayment
        {...props}
        />
    );
    PaymentsStore.getMakePaymentResponse.mockReturnValue({
      code: 422,
      error: "Error",

    });
    PaymentsStore.getMakePaymentResponse().code;
    instance.onStoreChange();
    expect(instance.onStoreChange).toBeDefined();

  });
  it('handles onStore Change -getMakePayment -432-satisfing else condition', () => {
    let instance = TestUtils.renderIntoDocument(
      <ConfirmPayment
        {...props}
        />
    );
    PaymentsStore.getMakePaymentResponse.mockReturnValue({
      code: 432,
      error: "Error",

    });
    PaymentsStore.getMakePaymentResponse().code;
    instance.onStoreChange();
    expect(instance.onStoreChange).toBeDefined();

  });
  it('handles onStore Change -getMakePaymentResponse -undefined-satisfing else condition ', () => {
    let instance = TestUtils.renderIntoDocument(
      <ConfirmPayment
        {...props}
        />
    );
    PaymentsStore.getMakePaymentResponse.mockReturnValue();
    instance.onStoreChange();
    expect(instance.onStoreChange).toBeDefined();

  });
  it('handles getAccount -assigning ToaccntData type accounts ', () => {
    let instance = TestUtils.renderIntoDocument(
      <ConfirmPayment
        {...props}
        />
    );
    instance.setState({
      ToAcntdata: {

        "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
        "type": "accounts",
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
      }, nextStep: 'RP'
    })
    //PaymentsStore.getMakePaymentResponse.mockReturnValue();
    instance.getAccount();
    expect(instance.getAccount).toBeDefined();

  });

  it('handles getAccount -assigning ToaccntData type accounts ', () => {
    let instance = TestUtils.renderIntoDocument(
      <ConfirmPayment
        {...props}
        />
    );
    instance.setState({
      ToAcntdata: {

        "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
        "type": "savings",
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
      }, nextStep: 'RP'
    })
    //PaymentsStore.getMakePaymentResponse.mockReturnValue();
    instance.getAccount();
    expect(instance.getAccount).toBeDefined();

  });

  it('handles close Error pop up', () => {
    let instance = TestUtils.renderIntoDocument(
      <ConfirmPayment
        {...props}
        />
    );
    //PaymentsStore.getMakePaymentResponse.mockReturnValue();
    instance.closeErrorPopup();
    expect(instance.closeErrorPopup).toBeDefined();

  });
  it('handles done click', () => {
    let instance = TestUtils.renderIntoDocument(
      <ConfirmPayment
        {...props}
        />
    );
    //PaymentsStore.getMakePaymentResponse.mockReturnValue();
    PaymentsStore.getPaymentType.mockReturnValue(true);
    instance.handleDoneClick();
    expect(instance.handleDoneClick).toBeDefined();

  });
  it('handles done click-get Payment type false', () => {
    let instance = TestUtils.renderIntoDocument(
      <ConfirmPayment
        {...props}
        />
    );
    PaymentsStore.getPaymentType.mockReturnValue(false);
    instance.handleDoneClick();
    expect(instance.handleDoneClick).toBeDefined();

  });
  it('handles back click', () => {
    let instance = TestUtils.renderIntoDocument(
      <ConfirmPayment
        {...props}
        />
    );
    instance.handleBackClick();
    expect(instance.handleBackClick).toBeDefined();

  });
  it('setting state for keypaddata to satisfy conditions', () => {
    let instance = TestUtils.renderIntoDocument(
      <ConfirmPayment
        {...props}
        />
    );
    PaymentsStore.isOneOffPayment.mockReturnValue(true);
    instance.setState({
      keypaddata: {
        dtStart: 'Choose a date',
        stopitwhenText: 'Pickadate',
        when: 'Today',
        
      }, Acntdata: {
        "type": "accounts"
      }
    });
     BrowserUtils.isMobileView.mockReturnValue(true);
    instance.render();
    expect(instance.render).toBeDefined();

  });
  // end:'Tomorrow',
  it('setting state for keypaddata to satisfy conditions-tomm', () => {
    let instance = TestUtils.renderIntoDocument(
      <ConfirmPayment
        {...props}
        />
    );
    PaymentsStore.isOneOffPayment.mockReturnValue(true);
    instance.setState({
      keypaddata: {
        dtStart: 'Choose a date',
        stopitwhenText: 'Pickadate',
        when: 'Today',
        end:'Tomorrow',
        
      }, Acntdata: {
        "type": "accounts"
      }
    });
     BrowserUtils.isMobileView.mockReturnValue(true);
    instance.render();
    expect(instance.render).toBeDefined();

  });

  it('setting state for keypaddata to satisfy conditions', () => {
    let instance = TestUtils.renderIntoDocument(
      <ConfirmPayment
        {...props}
        />
    );
    instance.setState({
      Acntdata: {
        "type": "savings"
      }
    });
    // console.log("asd"+this.state.Acntdata.type);
    instance.render();
    expect(instance.render).toBeDefined();

  });


  it('setting state for keypaddata to satisfy conditions', () => {
    PaymentsStore.getEndingDetails.mockReturnValue({ oftenText: 'weekly' });
    let instance = TestUtils.renderIntoDocument(
      <ConfirmPayment
        {...props}
        />
    );
    instance.renderOftenText();
  });

  it('should cover renderOftenText fxn', () => {

    PaymentsStore.getEndingDetails.mockReturnValue({ oftenText: '2 weekly' });
    let instance = TestUtils.renderIntoDocument(
      <ConfirmPayment
        {...props}
        />
    );
    instance.renderOftenText();
    expect(instance.renderOftenText).toBeDefined();
  });

   it('should cover renderOftenText fxn', () => {

    PaymentsStore.getEndingDetails.mockReturnValue({ oftenText: '2 weekly' });
    let instance = TestUtils.renderIntoDocument(
      <ConfirmPayment
        {...props}
        />
    );
    instance.renderOftenText();
    expect(instance.renderOftenText).toBeDefined();
  });

   it('should cover renderOftenText fxn', () => {

    PaymentsStore.getEndingDetails.mockReturnValue({ oftenText: '3 weekly' });
    let instance = TestUtils.renderIntoDocument(
      <ConfirmPayment
        {...props}
        />
    );
    instance.renderOftenText();
    expect(instance.renderOftenText).toBeDefined();
  });

   it('should cover renderOftenText fxn', () => {

    PaymentsStore.getEndingDetails.mockReturnValue({ oftenText: '4 weekly' });
    let instance = TestUtils.renderIntoDocument(
      <ConfirmPayment
        {...props}
        />
    );
    instance.renderOftenText();
    expect(instance.renderOftenText).toBeDefined();
  });

   it('should cover renderOftenText fxn', () => {

    PaymentsStore.getEndingDetails.mockReturnValue({ oftenText: '1 monthly' });
    let instance = TestUtils.renderIntoDocument(
      <ConfirmPayment
        {...props}
        />
    );
    instance.renderOftenText();
    expect(instance.renderOftenText).toBeDefined();
  });

   it('should cover renderOftenText fxn', () => {

    PaymentsStore.getEndingDetails.mockReturnValue({ oftenText: '2 monthly' });
    let instance = TestUtils.renderIntoDocument(
      <ConfirmPayment
        {...props}
        />
    );
    instance.renderOftenText();
    expect(instance.renderOftenText).toBeDefined();
  });

   it('should cover renderOftenText fxn', () => {

    PaymentsStore.getEndingDetails.mockReturnValue({ oftenText: '3 monthly' });
    let instance = TestUtils.renderIntoDocument(
      <ConfirmPayment
        {...props}
        />
    );
    instance.renderOftenText();
    expect(instance.renderOftenText).toBeDefined();
  });

   it('should cover renderOftenText fxn', () => {

    PaymentsStore.getEndingDetails.mockReturnValue({ oftenText: '6 monthly' });
    let instance = TestUtils.renderIntoDocument(
      <ConfirmPayment
        {...props}
        />
    );
    instance.renderOftenText();
    expect(instance.renderOftenText).toBeDefined();
  });

  it('should cover renderOftenText fxn', () => {

    PaymentsStore.getEndingDetails.mockReturnValue({ oftenText: '12 monthly' });
    let instance = TestUtils.renderIntoDocument(
      <ConfirmPayment
        {...props}
        />
    );
    instance.renderOftenText();
    expect(instance.renderOftenText).toBeDefined();
  });

  it('should cover renderOftenText fxn', () => {

    PaymentsStore.getEndingDetails.mockReturnValue({ oftenText: 'hello' });
    let instance = TestUtils.renderIntoDocument(
      <ConfirmPayment
        {...props}
        />
    );
    instance.renderOftenText();
    expect(instance.renderOftenText).toBeDefined();
  });

  it('should cover renderOftenText fxn', () => {

    PaymentsStore.getEndingDetails.mockReturnValue({ stopitwhenText: 'Nooftimes' });
    let instance = TestUtils.renderIntoDocument(
      <ConfirmPayment
        {...props}
        />
    );
    instance.render();
    expect(instance.render).toBeDefined();
  });

});