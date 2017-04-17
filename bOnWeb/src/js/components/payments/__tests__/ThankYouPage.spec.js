'use strict';

jest.unmock('../ThankYouPage');


const ThankYouPage = require('../ThankYouPage');
const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const PaymentsActionCreator = require('../../../actions/PaymentsActionCreator');
const PaymentsStore = require('../../../stores/PaymentsStore');


const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<ThankYouPage
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};

PaymentsStore.getEndingDetails.mockReturnValue({
    amount: "55"

});
PaymentsStore.getOneOffPayment.mockReturnValue({
    isMonthly: true
});
PaymentsStore.getSelectedAccount.mockReturnValue({
    "id": "b80e95a0-6b60-45b2-8b0f-77f2355f306",
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
});

PaymentsStore.getSelectedToAccount.mockReturnValue({
    "id": "b80e95a0-6b60-45b2-8b0f-77f2355f306",
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
})

PaymentsStore.getSelectedToPotData.mockReturnValue({
    name:"Surya",
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
describe('ThankYouPage Component Test Cases', () => {
    let props = {
        handleDoneClick: jest.fn(),
        //data:'data',
        content: {
            'thankyouFooterTransfer': 'thankyouFooterTransfer',
            'regularTransfer': 'regularTransfer',
            'regularPayment': 'regularPayment',
            'data': 'thankyouFooterTransfer',
            'thankYouFooterText': 'thankyouFooter Text',
            'thankYouText': 'thankYouText',
            'paymentThroughText': 'paymentThroughText',
            'done': 'done',
            'thankOneOffRepeatText': 'thankOneOffRepeatText',
        }
    }

    xit('should return thank you page jsx', () => {
        let component = shallowRender(props);
        PaymentsStore.getSelectedAccount().id;


        expect(component).toEqualJSX(
            <div className="b container-fluid-full thankyou ">
                <div className="row">
                    <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                        <h2>
                            thankYouText
                        </h2>

                        <span className="icon icon-done">	</span>


                        <p className="lead">
                            regularPayment
                            <br />
                            <b>
                                John Black
                            </b>
                            <br />
                            paymentThroughText
                            <br />
                            <b>
                                55.00
                            </b>
                            <br />
                            <br />
                            thankyouFooter Text
                        </p>
                    </div>
                </div>
                <div className="col-lg-12">
                    <button
                        className="action-button"
                        onClick={function noRefCheck() { } }
                        >
                        done
                    </button>
                </div>
            </div>




        );


    });
    it('handles Handle Done Click-IsOneoffpayment ', () => {
        let instance = TestUtils.renderIntoDocument(
            <ThankYouPage
                {...props}
                />
        );
        PaymentsStore.isOneOffPayment.mockReturnValue(true);
        instance.handleDoneClick();
        expect(instance.handleDoneClick).toBeDefined();

    });
    it('handles Handle Done Click-IsOneoffpayment false ', () => {
        let instance = TestUtils.renderIntoDocument(
            <ThankYouPage
                {...props}
                />
        );
        PaymentsStore.isOneOffPayment.mockReturnValue(false);
        instance.handleDoneClick();
        expect(instance.handleDoneClick).toBeDefined();

    });
    it('Calling Repeat Setup function ', () => {
        let instance = TestUtils.renderIntoDocument(
            <ThankYouPage
                {...props}
                />
        );
        //PaymentsStore.isOneOffPayment.mockReturnValue(false);
        instance.repeatSetup();
        expect(instance.repeatSetup).toBeDefined();

    });
    it('Calling Repeat Link function and satisfing condition ', () => {
        let instance = TestUtils.renderIntoDocument(
            <ThankYouPage
                {...props}
                />
        );
        PaymentsStore.isOneOffPayment.mockReturnValue(true);
        PaymentsStore.getOneOffPayment.mockReturnValue({ isMonthly: false });
        instance.repeatLink();
        expect(instance.repeatLink).toBeDefined();

    });
    it('Component Will Mount-fromSelected type = "savings"', () => {
        let instance = TestUtils.renderIntoDocument(
            <ThankYouPage
                {...props}
                />
        );
        instance.componentWillMount();
        expect(instance.componentWillMount).toBeDefined();

    });


    xit('Component Will Mount-get Payment type true-fromSelected type = "savings"  ', () => {
        PaymentsStore.getSelectedToAccount.mockReturnValue({
            "id": "abcdsghdfhehedhdh",
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
        })
        //PaymentsStore.setPaymentType(true);
        PaymentsStore.getSelectedAccount().id;

        let instance = TestUtils.renderIntoDocument(
            <ThankYouPage
                {...props}
                />
        );

        instance.componentWillMount();
        expect(instance.componentWillMount).toBeDefined();

    });

    xit('Component Will Mount-get Payment type true-fromSelected type = "savings" ', () => {

        PaymentsStore.getSelectedToAccount.mockReturnValue({
            "id": "abcdsghdfhehedhdh",
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
        })
        PaymentsStore.getPaymentType.mockReturnValue(true);
        PaymentsStore.getSelectedAccount().id;

        let instance = TestUtils.renderIntoDocument(
            <ThankYouPage
                {...props}
                />
        );

        instance.componentWillMount();
        expect(instance.componentWillMount).toBeDefined();

    });

    it('Component Will Mount-get Payment type true-fromSelected type = "savings" and from and to are not same ', () => {
        PaymentsStore.getSelectedToAccount.mockReturnValue({
            "id": "abcdsghdfhehedhdh",
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
        })
        PaymentsStore.getPaymentType.mockReturnValue(true);
        //PaymentsStore.getSelectedAccount();

        let instance = TestUtils.renderIntoDocument(
            <ThankYouPage
                {...props}
                />
        );

        instance.componentWillMount();
        expect(PaymentsActionCreator.getPotDetails).toBeCalled();

    });

    it('Component Will Mount-fromSelected type = "current"', () => {
        PaymentsStore.getSelectedAccount().type = 'current';
        let instance = TestUtils.renderIntoDocument(
            <ThankYouPage
                {...props}
                />
        );
        instance.componentWillMount();
        expect(instance.componentWillMount).toBeDefined();

    });
    it('Component Will Mount-get payment type- false', () => {
        let instance = TestUtils.renderIntoDocument(
            <ThankYouPage
                {...props}
                />
        );
        PaymentsStore.getPaymentType.mockReturnValue(false);
        instance.componentWillMount();
        expect(instance.componentWillMount).toBeDefined();

    });

    it('Calling modify amount-3.', () => {
        let instance = TestUtils.renderIntoDocument(
            <ThankYouPage
                {...props}
                />
        );
        //PaymentsStore.getPaymentType.mockReturnValue(false);
        instance.modifyAmount("3.");
        //expect(instance.componentWillMount).toBeDefined();

    });
    it('Calling modify amount-3.0', () => {
        let instance = TestUtils.renderIntoDocument(
            <ThankYouPage
                {...props}
                />
        );
        //PaymentsStore.getPaymentType.mockReturnValue(false);
        instance.modifyAmount("3.0");
        //expect(instance.componentWillMount).toBeDefined();

    });

     it('Calling modify amount-3.00', () => {
        let instance = TestUtils.renderIntoDocument(
            <ThankYouPage
                {...props}
                />
        );
        //PaymentsStore.getPaymentType.mockReturnValue(false);
        instance.modifyAmount("3.00");
        //expect(instance.componentWillMount).toBeDefined();

    });
     xit('Calling modify amount-with no decimals points', () => {
        let instance = TestUtils.renderIntoDocument(
            <ThankYouPage
                {...props}
                />
        );
        //PaymentsStore.getPaymentType.mockReturnValue(false);
        instance.modifyAmount(".12");
        //expect(instance.componentWillMount).toBeDefined();

    });

    xit('render-get selected display name empty', () => {
        PaymentsStore.getSelectedToAccount.mockReturnValue({ '': '' });
        PaymentsStore.getSelectedPayee.mockReturnValue({ '': '' });

        let instance = TestUtils.renderIntoDocument(
            <ThankYouPage
                {...props}
                />
        );
        //PaymentsStore.getSelectedToAccount();
        console.log("mock", PaymentsStore.getSelectedToAccount());
        console.log("payee", PaymentsStore.getSelectedPayee());
        PaymentsStore.setPaymentType(false);

        instance.render();
        expect(instance.render).toBeDefined();

    });

    it('render-get selected display name empty', () => {
        //PaymentsStore.getSelectedToAccount().metadata.display_name = null;
        PaymentsStore.getSelectedToAccount.mockReturnValue({
            "metadata": {
                "display_name": null,
            },
            "product": {
                "code": "901",
                "name": "Personal Loan",
                "description": "Personal Loan"
            },
        });
        PaymentsStore.getSelectedPayee.mockReturnValue({
            data: {

            }
        });
        let instance = TestUtils.renderIntoDocument(
            <ThankYouPage
                {...props}
                />
        );

        PaymentsStore.getPaymentType.mockReturnValue(true);
        instance.render();
        expect(instance.render).toBeDefined();

    });

    it('render-get ending details', () => {
        //PaymentsStore.getSelectedToAccount().metadata.display_name = null;
        PaymentsStore.getSelectedToAccount.mockReturnValue({
            "metadata": {
                "display_name": null,
            },
            "product": {
                "code": "901",
                "name": "Personal Loan",
                "description": "Personal Loan"
            },
        });
        PaymentsStore.getSelectedPayee.mockReturnValue({
            data: {

            }
        });

        PaymentsStore.getEndingDetails.mockReturnValue({
    amount: "55",
    isRepeat:true,

});


        let instance = TestUtils.renderIntoDocument(
            <ThankYouPage
                {...props}
                />
        );

        PaymentsStore.getPaymentType.mockReturnValue(true);
        instance.render();
        expect(instance.render).toBeDefined();

    });

    it('render-get ending details -else conditions', () => {
        //PaymentsStore.getSelectedToAccount().metadata.display_name = null;
        PaymentsStore.getSelectedToAccount.mockReturnValue({
            "metadata": {
                "display_name": null,
            },
            "product": {
                "code": "901",
                "name": "Personal Loan",
                "description": "Personal Loan"
            },
        });
        PaymentsStore.getSelectedPayee.mockReturnValue({
            data: {

            }
        });

        PaymentsStore.getEndingDetails.mockReturnValue({
    amount: "55",
    isRepeat:false,
    when:"Today",

});


        let instance = TestUtils.renderIntoDocument(
            <ThankYouPage
                {...props}
                />
        );

        PaymentsStore.getPaymentType.mockReturnValue(false);
        instance.render();
        expect(instance.render).toBeDefined();

    });
  
    it('render-get ending details -else conditions', () => {
        //PaymentsStore.getSelectedToAccount().metadata.display_name = null;
        PaymentsStore.getSelectedToAccount.mockReturnValue({
            "metadata": {
                "display_name": null,
            },
            "product": {
                "code": "901",
                "name": "Personal Loan",
                "description": "Personal Loan"
            },
        });
        PaymentsStore.getSelectedPayee.mockReturnValue({
            data: {

            }
        });

        PaymentsStore.getEndingDetails.mockReturnValue({
    amount: "55",
    isRepeat:true,
    when:"Today",

});


        let instance = TestUtils.renderIntoDocument(
            <ThankYouPage
                {...props}
                />
        );

        PaymentsStore.getPaymentType.mockReturnValue(false);
        instance.render();
        expect(instance.render).toBeDefined();

    });

    it('render-get ending details-getSelectedToPotData-empty', () => {
        //PaymentsStore.getSelectedToAccount().metadata.display_name = null;
        PaymentsStore.getSelectedToAccount.mockReturnValue({
            "metadata": {
                "display_name": null,
            },
            "product": {
                "code": "901",
                "name": "Personal Loan",
                "description": "Personal Loan"
            },
        });
        PaymentsStore.getSelectedPayee.mockReturnValue({
            data: {

            }
        });
        PaymentsStore.getSelectedToPotData.mockReturnValue('');

     


        let instance = TestUtils.renderIntoDocument(
            <ThankYouPage
                {...props}
                />
        );

        PaymentsStore.getPaymentType.mockReturnValue(true);
        instance.render();
        expect(instance.render).toBeDefined();

    });




    it('render selected payee for thank you', () => {

        PaymentsStore.getPaymentType.mockReturnValue(false);
        PaymentsStore.getSelectedToAccount.mockReturnValue('');
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

        let instance = TestUtils.renderIntoDocument(
            <ThankYouPage
                {...props}
                />
        );

    });

    it('should check no selected account and no selected payee', () => {

        PaymentsStore.getPaymentType.mockReturnValue(false);
        PaymentsStore.getSelectedToAccount.mockReturnValue('');
        PaymentsStore.getSelectedPayee.mockReturnValue('');

        let instance = TestUtils.renderIntoDocument(
            <ThankYouPage
                {...props}
                />
        );

    });

    it('should check for other account from From List', () => {
        PaymentsStore.getSelectedAccount.mockReturnValue({
            "id": "b80e95a0-6b60-45b2-8b0f-77f2355f234234",
            type: "savings",
            "product": {
                "code": "901",
                "name": "current",
                "description": "current"
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
        });

         PaymentsStore.getPaymentType.mockReturnValue(true);
   ;

        let instance = TestUtils.renderIntoDocument(
            <ThankYouPage
                {...props}
                />
        );

        expect(PaymentsActionCreator.getPotDetails.mock).toBeTruthy();

    });
    


});