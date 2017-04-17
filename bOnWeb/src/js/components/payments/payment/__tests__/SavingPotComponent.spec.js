'use strict';
jest.unmock('../SavingPotComponent');
jest.mock('../../../../stores/PaymentsStore');
jest.unmock('../../../../utils/NumberUtils');
const React = require('react');
const SavingPotComponent = require('../SavingPotComponent');
const PaymentsStore = require('../../../../stores/PaymentsStore');
const NumberUtils = require('../../../../utils/NumberUtils');
const TestUtils = require('react-addons-test-utils');
const StringConstant = require('../../../../constants/StringConstants');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<SavingPotComponent {...props} />);
    return shallowRenderer.getRenderOutput();
};

describe('Jsx render', () => {
    const props = {
        innerData:
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
        contents: {
            current: 'current',
            available: 'available',
        }
    };
    it('Saving Pot Jsx comparision', () => {
        StringConstant.myGroupName_ = 'myGroupName_';
        let instance = shallowRender(props);
        expect(instance).toEqualJSX(<li>
            <div className="option-select">
                <input
                    defaultChecked={false}
                    id="3ebbc744-9a3b-414e-b5b7-49e4afd365be undefined"
                    name="myGroupName_undefined"
                    onChange={function noRefCheck() { } }
                    type="radio"
                    value={600}
                    />
                <label htmlFor="3ebbc744-9a3b-414e-b5b7-49e4afd365be undefined" />
            </div>
            <h5>
                Garden Landscaping
            </h5>
            <h3>
                £600.
                <sub>
                    00
                </sub>
            </h3>
        </li>);
    });

    describe('to handle on change click', () => {
        const props = {
            onChange: jest.fn(),
            innerData:
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
            contents: {
                current: 'current',
                available: 'available',
            }
        };
        it('handles onChange click ', () => {
            // props1.data.metadata.display_name = null;

            let instance = TestUtils.renderIntoDocument(
                <SavingPotComponent {...props} name='toList' />
            );

            instance.onChange();

            let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h5');
            expect(header.textContent).toBe('Garden Landscaping')
        });

        it('handles onChange click from list', () => {
            // props1.data.metadata.display_name = null;

            let instance = TestUtils.renderIntoDocument(
                <SavingPotComponent {...props} name='fromList' />
            );

            instance.onChange();

            let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h5');
            expect(header.textContent).toBe('Garden Landscaping')
        });



    });

    describe('to handle get radio button click', () => {
        const props = {
            onChange: jest.fn(),
            innerData:
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
            contents: {
                current: 'current',
                available: 'available',
            }
        };
        it('handles radioButton click ', () => {
            // props1.data.metadata.display_name = null;
            PaymentsStore.getNextTask.mockReturnValue("CNFRM");

            let instance = TestUtils.renderIntoDocument(
                <SavingPotComponent {...props} name='toList' />
            );

            instance.getRadioButton();

            let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h5');
            expect(header.textContent).toBe('Garden Landscaping')
        });

        it('NextTask-Cnfrm,ToList,getSelectedToPot-true', () => {
            // props1.data.metadata.display_name = null;
            PaymentsStore.getNextTask.mockReturnValue("CNFRM");

            let instance = TestUtils.renderIntoDocument(
                <SavingPotComponent {...props} name='toList' />
            );
            PaymentsStore.getSelectedToPot();
            instance.getRadioButton();

            let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h5');
            expect(header.textContent).toBe('Garden Landscaping')
        });
        it('NextTask-Cnfrm,ToList,getSelectedToPot-false', () => {
            props.innerData.id = "3ebbc744-9a3b-414e-b5b7-49e4afd365";
            PaymentsStore.getNextTask.mockReturnValue("CNFRM");

            let instance = TestUtils.renderIntoDocument(
                <SavingPotComponent {...props} name='toList' />
            );
            PaymentsStore.getSelectedToPot();
            instance.getRadioButton();

            let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h5');
            expect(header.textContent).toBe('Garden Landscaping')
        });
        it('NextTask-Cnfrm,from List,getSelectedPot.mockReturnValue.mockReturnValue-true', () => {
            // props1.data.metadata.display_name = null;
            PaymentsStore.getNextTask.mockReturnValue("CNFRM");

            let instance = TestUtils.renderIntoDocument(
                <SavingPotComponent {...props} name='fromList' />
            );
            PaymentsStore.getSelectedPot.mockReturnValue("3ebbc744-9a3b-414e-b5b7-49e4afd365be");
            props.innerData.id = "3ebbc744-9a3b-414e-b5b7-49e4afd365be";
            //console.log("sdf"+ PaymentsStore.getSelectedPot.mockReturnValue.mockReturnValue());
            instance.getRadioButton();

            let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h5');
            expect(header.textContent).toBe('Garden Landscaping')
        });

        it('Nexttask-To,to List,getSelectedPot true', () => {
            // props1.data.metadata.display_name = null;
            PaymentsStore.getNextTask.mockReturnValue("To");

            let instance = TestUtils.renderIntoDocument(
                <SavingPotComponent {...props} name='toList' />
            );
            PaymentsStore.setPotVisbility.mockReturnValue(true);
            instance.getRadioButton();

            let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h5');
            expect(header.textContent).toBe('Garden Landscaping')
        });
        it('Next task -To,from List-getSelectedPot true condition ', () => {
            props.innerData.id = "3ebbc744-9a3b-414e-b5b7-49e4afd365be";
            PaymentsStore.getNextTask.mockReturnValue("To");

            let instance = TestUtils.renderIntoDocument(
                <SavingPotComponent {...props} name='fromList' />
            );

            PaymentsStore.getSelectedPot.mockReturnValue("3ebbc744-9a3b-414e-b5b7-49e4afd365be");
            instance.getRadioButton();

            let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h5');
            expect(header.textContent).toBe('Garden Landscaping')
        });
        it('Next task -To,from List-getSelectedPot true condition-get one off payment true ', () => {
            props.innerData.id = "3ebbc744-9a3b-414e-b5b7-49e4afd365be";
            PaymentsStore.getNextTask.mockReturnValue("To");
            let instance = TestUtils.renderIntoDocument(
                <SavingPotComponent {...props} name='fromList' />
            );
            PaymentsStore.getOneOffPayment.mockReturnValue(true);
            PaymentsStore.getSelectedPot.mockReturnValue("3ebbc744-9a3b-414e-b5b7-49e4afd365be");
            instance.getRadioButton();
            let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h5');
            expect(header.textContent).toBe('Garden Landscaping')
        });
        it('Next task -To,from List-getSelectedToPot true condition-get one off payment true ', () => {
            props.innerData.id = "3ebbc744-9a3b-414e-b5b7-49e4afd365be";
            PaymentsStore.getNextTask.mockReturnValue("To");
            let instance = TestUtils.renderIntoDocument(
                <SavingPotComponent {...props} name='fromList' />
            );
            PaymentsStore.getOneOffPayment.mockReturnValue(true);
            PaymentsStore.getSelectedToPot.mockReturnValue("3ebbc744-9a3b-414e-b5b7-49e4afd365be");
            instance.getRadioButton();
            let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h5');
            expect(header.textContent).toBe('Garden Landscaping')
        });
    });



    describe('to handle get radio button click', () => {
        const props = {
            onChange: jest.fn(),
            innerData:
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
            contents: {
                current: 'current',
                available: 'available',
            }
        };
        it('Next task -Cnfrm,to List', () => {
            // props1.data.metadata.display_name = null;
            PaymentsStore.getNextTask.mockReturnValue("CNFRM");

            let instance = TestUtils.renderIntoDocument(
                <SavingPotComponent {...props} name='toList' />
            );

            instance.getRadioButton();

            let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h5');
            expect(header.textContent).toBe('Garden Landscaping')
        });
        it('Next task -Cnfrm,to List same pot', () => {
            // props1.data.metadata.display_name = null;
            PaymentsStore.getNextTask.mockReturnValue("CNFRM");
            PaymentsStore.getSelectedToPot.mockReturnValue("3ebbc744-9a3b-414e-b5b7-49e4afd365be");
            props.innerData.id = '3ebbc744-9a3b-414e-b5b7-49e4afd365be';

            let instance = TestUtils.renderIntoDocument(
                <SavingPotComponent {...props} name='toList' />
            );

            instance.getRadioButton();

            let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h5');
            expect(header.textContent).toBe('Garden Landscaping')
        });
        it('Next task -CNFRM,from List', () => {
            // props1.data.metadata.display_name = null;
            PaymentsStore.getNextTask.mockReturnValue("CNFRM");

            let instance = TestUtils.renderIntoDocument(
                <SavingPotComponent {...props} name='fromList' />
            );

            instance.getRadioButton();

            let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h5');
            expect(header.textContent).toBe('Garden Landscaping')
        });
        it('Next task -CNFRM,from List', () => {
            // props1.data.metadata.display_name = null;
            props.innerData.id = '12345'
            PaymentsStore.getOneOffPayment.mockReturnValue(true)
            // PaymentsStore.getSelectedToPot.mockReturnValue("12345");

            let instance = TestUtils.renderIntoDocument(
                <SavingPotComponent {...props} name='fromList' />
            );

            instance.getRadioButton();

            let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h5');
            expect(header.textContent).toBe('Garden Landscaping')
        });
        it('Next task -CNFRM,from List', () => {
            // props1.data.metadata.display_name = null;
            props.innerData.id = '12345'
            PaymentsStore.getOneOffPayment.mockReturnValue(false)
            PaymentsStore.getSelectedToPot.mockReturnValue("912345");

            let instance = TestUtils.renderIntoDocument(
                <SavingPotComponent {...props} name='fromList' />
            );

            instance.getRadioButton();

            let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h5');
            expect(header.textContent).toBe('Garden Landscaping')
        });

        it('Next task -CNFRM,from List', () => {
            // props1.data.metadata.display_name = null;
            props.innerData.id = '12345'
            PaymentsStore.getOneOffPayment.mockReturnValue(true)
            PaymentsStore.getSelectedToPot.mockReturnValue("12345");

            let instance = TestUtils.renderIntoDocument(
                <SavingPotComponent {...props} name='fromList' />
            );

            instance.getRadioButton();

            let header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h5');
            expect(header.textContent).toBe('Garden Landscaping')
        });
    });


});

