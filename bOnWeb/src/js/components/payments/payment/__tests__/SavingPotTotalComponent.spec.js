'use strict';
jest.unmock('../SavingPotTotalComponent');
jest.mock('../../../../stores/PaymentsStore');
jest.unmock('../../../../utils/NumberUtils');
const React = require('react');
const PaymentsStore = require('../../../../stores/PaymentsStore');
const SavingPotTotalComponent = require('../SavingPotTotalComponent');
const NumberUtils = require('../../../../utils/NumberUtils');
const TestUtils = require('react-addons-test-utils');

PaymentsStore.getSelectedToAccount.mockReturnValue({
    id: "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
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

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<SavingPotTotalComponent
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};
describe('Saving Pot Total Component Test Cases', () => {
    describe('SavingPottotal Jsx render', () => {
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
                currentTitle: 'current',
                available: 'available',
            }
        };
        it('Jsx compare', () => {
            PaymentsStore.checkPotEmpty.mockReturnValue(true);
            let instance = shallowRender(props);
            expect(instance).toEqualJSX(
                <div>
                    <div className="loader-amount" />
                </div>
            );
        });
    });

    describe('Handle on radio Click ', () => {

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
                <SavingPotTotalComponent {...props}  contents={props.contents} index={1}  />

            );



        });

        it('should handle radio click fxn', () => {

            let event = {
                target: {
                    value: false,
                }
            };

            let totalComp = TestUtils.renderIntoDocument(
                <SavingPotTotalComponent {...props}  contents={props.contents} index={1}  />

            );
            let onChange = jest.fn();

            component.onRadioClick(event);
            totalComp.onChange = onChange;
            TestUtils.Simulate.change(totalComp);
            onChange(props.datas);
            expect(onChange).toBeCalled();

        });
    });

    describe('Is Saving total Checked ', () => {

        let component;
        const props = {
            isSavingChecked: jest.fn(),
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
                <SavingPotTotalComponent {...props}  contents={props.contents} index={1}  />

            );



        });

        it('should handle test cases fxn', () => {

            props.data.id = "b80e95a0-6b60-45b2-8b0f-77f2355f3061";

            let totalComp = TestUtils.renderIntoDocument(
                <SavingPotTotalComponent {...props}  contents={props.contents} index={1} name='toList'  />

            );
            PaymentsStore.getSelectedAccount();

            totalComp.isSavingChecked();



        });
    });

    describe('get Radio Button Click', () => {
        let component;
        const props = {
            showTotal: '',
            open:false,
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
                currentTitle: 'current',
                available: 'available',
            }
        };
        it('Next Step-CNFRM,name-frmList,getSelectedPot-Empty,getSelectedSavingAccountId()-true', () => {
            component = TestUtils.renderIntoDocument(
                <SavingPotTotalComponent {...props}  contents={props.contents} index={1} name='fromList'  />)

            PaymentsStore.getNextTask.mockReturnValue("CNFRM");

            component.getRadioButton();

        });

        it('Next Step-CNFRM,name-toList,getSelectedPot-Empty,getSelectedSavingAccountId()-true', () => {
            component = TestUtils.renderIntoDocument(
                <SavingPotTotalComponent {...props}  contents={props.contents} index={1} name='toList'  />)
            // BrowserUtils.isMobileView.mockReturnValue(true);
            // PaymentsStore.getSelectedPot.mockReturnValue();
            //PaymentsStore.setSelectedPot("");
            PaymentsStore.getSelectedPot.mockReturnValue("");

            PaymentsStore.getSelectedSavingAccountId();
            PaymentsStore.getNextTask.mockReturnValue("CNFRM");

            component.getRadioButton();
        });
        it('Next Step-To,name-frmList,getSelectedPot-Empty,getSelectedSavingAccountId()-true-showTotal true', () => {
            //props.showTotal=true;
            component = TestUtils.renderIntoDocument(
                <SavingPotTotalComponent {...props}  contents={props.contents} index={1} name='fromList'  />)
            PaymentsStore.getSelectedAccount.mockReturnValue({

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
            })
            // BrowserUtils.isMobileView.mockReturnValue(true);
            // PaymentsStore.getAccountDetail.mockReturnValue("");

            PaymentsStore.getNextTask.mockReturnValue("To");
            component.setState({enableRadio:false})

            component.getRadioButton();
        });
        it('Next Step-CNFRM,name-frmList,getSelectedPot-not empty,getSelectedSavingAccountId()-true', () => {
            props.showTotal=false;
            component = TestUtils.renderIntoDocument(
                <SavingPotTotalComponent {...props}  contents={props.contents} index={1} name='fromList'  />)
            //PaymentsStore.getSelectedPot.mockReturnValue("sdfsdfsdfsdf");
            PaymentsStore.getNextTask.mockReturnValue("To");


            component.getRadioButton();
        });
        it('Next Step-CNFRM,name-frmList,getSelectedPot-not empty,getSelectedSavingAccountId()-true', () => {
            component = TestUtils.renderIntoDocument(
                <SavingPotTotalComponent {...props}  contents={props.contents} index={1} name='fromList'  />)
            PaymentsStore.getSelectedPot.mockReturnValue("sdfsdfsdfsdf");
            PaymentsStore.getNextTask.mockReturnValue("CNFRM");


            component.getRadioButton();
        });
        it('Next Step-To,name-toList,getSelectedPot-Empty,getSelectedSavingAccountId()-true', () => {
            component = TestUtils.renderIntoDocument(
                <SavingPotTotalComponent {...props}  contents={props.contents} index={1} name='toList'  />)


            PaymentsStore.getNextTask.mockReturnValue("To");

            component.getRadioButton();
        });

        it('Next Step-CNFRM,name-toList,getSelectedPot-Empty,getSelectedSavingAccountId()-true', () => {
            props.showTotal = true
            component = TestUtils.renderIntoDocument(
                <SavingPotTotalComponent {...props}  contents={props.contents} index={1} name='toList'  />)


            PaymentsStore.getNextTask.mockReturnValue("CNFRM");

            component.getRadioButton();
        });

        it('Next Step-CNFRM,name-toList,getSelectedPot-Empty,getSelectedSavingAccountId()-true NEW', () => {
            props.showTotal = true;
            props.data.id = "1234567";

            component = TestUtils.renderIntoDocument(
                <SavingPotTotalComponent {...props}  contents={props.contents} index={1} name='fromList'  />)
            PaymentsStore.getSelectedPot.mockReturnValue('');
            //PaymentsStore.getSelectedSavingAccountId() === this.props.data.id
            PaymentsStore.getSelectedSavingAccountId.mockReturnValue("1234567");

            PaymentsStore.getNextTask.mockReturnValue("CNFRM");

            component.getRadioButton();
        });

        it('Next Step-To,name-fromList,getSelectedPot-Empty,getSelectedSavingAccountId()-true', () => {
            props.showTotal = false;
            component = TestUtils.renderIntoDocument(
                <SavingPotTotalComponent {...props}  contents={props.contents} index={1} name='fromList'  />)
            PaymentsStore.getSelectedAccount.mockReturnValue({

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
            })

            PaymentsStore.getNextTask.mockReturnValue("To");

            component.getRadioButton();
        });

        it('get the account detaiils ', () => {
            props.showTotal = true;
            props.data.id = "1234567";
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
                <SavingPotTotalComponent {...props}  contents={props.contents} index={1} name='fromList'  />)
            PaymentsStore.getSelectedPot.mockReturnValue('');
            //PaymentsStore.getSelectedSavingAccountId() === this.props.data.id
            PaymentsStore.getSelectedSavingAccountId.mockReturnValue("1234567");

            PaymentsStore.getNextTask.mockReturnValue("CNFRM");

            component.getRadioButton();
        });
        it('get the account detaiils for current amount 0', () => {
            props.showTotal = true;
            props.data.id = "1234567";
            props.open = false;
            PaymentsStore.getAccountDetail.mockReturnValue({
                balances: []
            });
            component = TestUtils.renderIntoDocument(
                <SavingPotTotalComponent {...props}  contents={props.contents} index={1} name='fromList'  />)

            component.getRadioButton();
        });
        it('get the account detaiils ', () => {
            props.showTotal = true;
            props.data.id = "1234567";
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
            component = TestUtils.renderIntoDocument(
                <SavingPotTotalComponent {...props}  contents={props.contents} index={1} name='fromList'  />)
            PaymentsStore.getSelectedPot.mockReturnValue('');
            //PaymentsStore.getSelectedSavingAccountId() === this.props.data.id
            PaymentsStore.getSelectedSavingAccountId.mockReturnValue("1234567");

            PaymentsStore.getNextTask.mockReturnValue("CNFRM");

            component.getRadioButton();
        });
    });

});

