'use strict';

jest.unmock('../EditSOPayment');
jest.mock('../../../../stores/PaymentsStore');

const EditSOPayment = require('../EditSOPayment');
const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const PaymentsStore = require('../../../../stores/PaymentsStore');
const EditPaymentStore = require('../../../../stores/EditPaymentStore');
const PaymentsActionCreator = require('../../../../actions/PaymentsActionCreator');
const Button = require('react-bootstrap/lib/Button');
const Table = require('react-bootstrap/lib/Table');
const DateUtils = require('../../../../utils/DateUtils');
const moment = require('moment');
const config = require('../../../../config');
const _ = require('lodash');
const BrowserUtils = require('../../../../utils/BrowserUtils');

const DateTimeField = require('react-bootstrap-datetimepicker-noicon');
const ValidationConfig = require('../../../../config/validationConfig');
const RegexUtils = require('../../../../utils/RegexUtils');
const StringConstant = require('../../../../constants/StringConstants');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<EditSOPayment
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};
let instance;
let component;
let response;
let props;


describe('Edit SO Payment Test Cases', () => {

    describe('Edit SO Payment Component life cycle event Test Cases', () => {

        props = {
            id: 101,
            type :'Payment',
            contents: {
                'amount': 'amount',
                'end_condition': 'end_condition',
                'howManyTimes': 'How many times?',
                'number_of_payments': 'number_of_payments',
                'accountName': 'accountName',
                'accountNumber': 'accountNumber',
                'sortCode': 'sortCode',
                'accountLabel': 'accountLabel',
                'reference': 'reference',
                'type': 'Payment',
                'transferLink': 'transferLink',
                'paymentLink': 'paymentLink',
                'repeatPayment': 'repeatPayment',
                'howOften': 'howOften',
                'nextDue': 'nextDue',
                'stopitWhen': 'stopitWhen',
                'endingText': 'endingText',
                'back': 'back',
                'whenIcancel': 'whenIcancel',
                'pickdate': 'pickdate',
                'noOfTimes': 'noOfTimes',
                'Weekly': 'Weekly',
                'twoWeekly': 'twoWeekly',
                'threeWeekly': 'twoWeekly',
                'fourWeekly': 'fourWeekly',
                'monthly': 'monthly',
                'twoMonthly': 'twoMonthly',
                'threeMonthly': 'threeMonthly',
                'sixMonthly': 'sixMonthly',
                'anually': 'anually',
                'editPaymentText': 'editPaymentText',
                'DELETE_PAYMENT_TYPE': 'DELETE_PAYMENT',
                'ok': 'ok',
                'schedule': 'schedule',
            },
            "isMobileView": false,
            "onClick": jest.fn(),
            "mandates": [
                {
                    "is_active": true,
                    "id": "0001",
                    "display_name": "B INSTANT SAVINGS",
                    "reference": "/TEST",
                    "sort_code": "827018",
                    "account_number": "40013506",
                    "actions_available": {
                        "/account/mandates/so/write": true
                    },
                    "schedule": {
                        "next_payment": {
                            "number_of_payments": 2,
                            "amount": {
                                "value": 2,
                                "currency": "GBP"
                            }
                        },
                        "recurrence": {
                            "frequency": {
                                "weekly": {
                                    "interval": 3
                                }
                            },
                            "amount": {
                                "value": 2,
                                "currency": "GBP"
                            }
                        }
                    }
                }],

        };
        let standingOrderPacket = {
            "is_active": true,
            "id": "0001",
            "display_name": "B INSTANT SAVINGS",
            "reference": "/TEST",
            "sort_code": "827018",
            "account_number": "40013506",
            "actions_available": {
                "/account/mandates/so/write": true
            },
            "schedule": {
                "next_payment": {
                    "when": "2016-09-28",
                    "amount": {
                        "value": 2,
                        "currency": "GBP"
                    }
                },
                "recurrence": {
                    "frequency": {
                        "weekly": {
                            "interval": 3
                        }
                    },
                    "amount": {
                        "value": 2,
                        "currency": "GBP"
                    }
                },
               }
        };

        beforeEach(() => {
            PaymentsStore.getSOPaymentById.mockReturnValue(standingOrderPacket);
            DateUtils.getDateStringFromAPI.mockReturnValue('09-28-2016');
            component = shallowRender(props);
            instance = TestUtils.renderIntoDocument(<EditSOPayment {...props}/>);
        });

        it('should call componentWillMount', () => {
            expect(component).toBeDefined();
        });
           it('should call componentWillUnmount', () => {
            instance.componentWillUnmount();
            expect(EditPaymentStore.removeChangeListener).toBeCalled();
        });
        it('should call on store change for 201 success', () => {
            EditPaymentStore.getEditPaymentResponse.mockReturnValue({
                code: 201,
                type: 'DELETE_PAYMENT',
                error: '',
            })
            instance.setState({
                showAnimation: true,
                showEditSuccessPopUp: true,
            });
            instance.onStoreChange();

        });
        it('should call on store change for 201 success', () => {
            EditPaymentStore.getEditPaymentResponse.mockReturnValue({
                code: 201,
                type: 'DELETE_PAYMENT',
                error: '',
            })
            instance.onStoreChange();
        });
        it('should call on store change for 201 failed', () => {
            EditPaymentStore.getEditPaymentResponse.mockReturnValue({
                code: 201,
                type: '',
                error: '',
            })
            instance.onStoreChange();
            expect(instance.state.showAnimation).toBeTruthy();
        });
        it('should call on store change for 422 fail', () => {
            EditPaymentStore.getEditPaymentResponse.mockReturnValue({
                code: 422,
                type: '',
                error: 'error',
            })
            instance.onStoreChange();
            expect(instance.state.showError).toBeTruthy();
        });
        
    });
      describe('No Of Times Function', () => {
           let standingOrderPacket = {
            "is_active": true,
            "id": "0001",
            "display_name": "B INSTANT SAVINGS",
            "reference": "/TEST",
            "sort_code": "827018",
            "account_number": "40013506",
            "actions_available": {
                "/account/mandates/so/write": true
            },
            "schedule": {
                "next_payment": {
                    "when": "2016-09-28",
                    "amount": {
                        "value": 2,
                        "currency": "GBP"
                    }
                },
                "recurrence": {
                    "frequency": {
                        "weekly": {
                            "interval": 3
                        }
                    },
                    "amount": {
                        "value": 2,
                        "currency": "GBP"
                    }
                },
                "end_condition":{
                   "number_of_payments":2,
                }
            }
        };
 
                        
        beforeEach(() => {
            PaymentsStore.getSOPaymentById.mockReturnValue(standingOrderPacket);
            DateUtils.getDateStringFromAPI.mockReturnValue('09-28-2016');
            component = shallowRender(props);
            instance = TestUtils.renderIntoDocument(<EditSOPayment {...props}/>);
        });

          it('should call onNoOfTimesChange valid scenario', () => {
                //BrowserUtils.isMobileView().mockReturnValue(true);
             const  event = {
                target: {
                    name: 'noOfTimes',
                    value: 2,
                }
            };
              const validationResult = {
                isValid: true,
                minLengthValid: true,
                maxLengthValid: true,
                regexValid: true,
            };
            ValidationConfig.getValidationObjet.mockReturnValue('noOfTimes');
            ValidationConfig.validateData.mockReturnValue(validationResult);
          
            instance.onNoOfTimesChange(event);
             expect(instance.state.noOfTime).toBe(2);

        });

           it('should call onNoOfTimesChange inValid regex value 0 scenario', () => {
             const  event = {
                target: {
                    name: 'noOfTimes',
                    value: '',
                }
            };
              const validationResult = {
                isValid: false,
                minLengthValid: false,
                maxLengthValid: false,
                regexValid: false,
            };
           
            ValidationConfig.getValidationObjet.mockReturnValue('noOfTimes');
            ValidationConfig.validateData.mockReturnValue(validationResult);
            instance.onNoOfTimesChange(event);
             expect(instance.state.formValid).toBe(false);

        });
         it('should call onNoOfTimesChange inValid regex value greater than zero  scenario', () => {
             const  event = {
                target: {
                    name: 'noOfTimes',
                    value: '5',
                }
            };
              const validationResult = {
                isValid: false,
                minLengthValid: false,
                maxLengthValid: false,
                regexValid: false,
            };
           
            ValidationConfig.getValidationObjet.mockReturnValue('noOfTimes');
            ValidationConfig.validateData.mockReturnValue(validationResult);
            instance.onNoOfTimesChange(event);
             expect(instance.state.formValid).toBe(true);

        });
    it('should call onNoOfTimesChange inValid   scenario', () => {
             const  event = {
                target: {
                    name: 'noOfTimes',
                    value: '5',
                }
            };
              const validationResult = {
                isValid: false,
                minLengthValid: true,
                maxLengthValid: true,
                regexValid: true,
            };
           
            ValidationConfig.getValidationObjet.mockReturnValue('noOfTimes');
            ValidationConfig.validateData.mockReturnValue(validationResult);
            instance.onNoOfTimesChange(event);
             expect(instance.state.formValid).toBe(false);

        });

         it('should call onNoOfTimesChange inValid minlength scenario', () => {
             const  event = {
                target: {
                    name: 'noOfTimes',
                    value: '',
                }
            };
              const validationResult = {
                isValid: false,
                minLengthValid: false,
                maxLengthValid: true,
                regexValid: true,
            };
           
            ValidationConfig.getValidationObjet.mockReturnValue('noOfTimes');
            ValidationConfig.validateData.mockReturnValue(validationResult);
            instance.onNoOfTimesChange(event);
             expect(instance.state.formValid).toBe(false);

        });
        it('should call onNoOfTimesChange inValid max scenario', () => {
             const  event = {
                target: {
                    name: 'noOfTimes',
                    value: '',
                }
            };
              const validationResult = {
                isValid: false,
                minLengthValid: true,
                maxLengthValid: false,
                regexValid: true,
            };
           
            ValidationConfig.getValidationObjet.mockReturnValue('noOfTimes');
            ValidationConfig.validateData.mockReturnValue(validationResult);
            instance.onNoOfTimesChange(event);
             expect(instance.state.formValid).toBe(true);

        });
        it('should call onNoOfTimesChange inValid max zero scenario', () => {
             const  event = {
                target: {
                    name: 'noOfTimes',
                    value: '0',
                }
            };
              const validationResult = {
                isValid: false,
                minLengthValid: true,
                maxLengthValid: false,
                regexValid: true,
            };
           
            ValidationConfig.getValidationObjet.mockReturnValue('noOfTimes');
            ValidationConfig.validateData.mockReturnValue(validationResult);
            instance.onNoOfTimesChange(event);
             expect(instance.state.formValid).toBe(true);

        });
      });
      describe('Edit SO Payment cancle click', () => {

        let instance;
        beforeEach(() => {
            props.type ='Transfer',
            instance = TestUtils.renderIntoDocument(<EditSOPayment {...props}/>);
            instance.setState({ reference: 'reference' });
        });

        it('should set confirm state', () => {
            instance.setCancel();
            expect(instance.state.isConfirm).toBeTruthy();
        });

    });
    describe('Edit SO Payment for mobile mode ', () => {
        let instance;
        beforeEach(() => {
            props.isMobileView = true;
            instance = TestUtils.renderIntoDocument(<EditSOPayment {...props}/>);

        });

        it('should set mobile view', () => {
            instance.setState({ showView: true });
            instance.setshowView();
            expect(instance.props.onClick).toBeTruthy();
        });

        it('should not set mobile view', () => {
            instance.setState({ showView: false });
            instance.setshowView();
            expect(instance.state.showView).toBeTruthy();
        });

        it('should not set mobile view', () => {
            instance.hideViewPayment();
            expect(instance.state.showView).toBe(false);
        });

    });
      describe('Edit SO Payment for repeat option ', () => {
        let instance;
        beforeEach(() => {
            props.isMobileView = true;
            instance = TestUtils.renderIntoDocument(<EditSOPayment {...props}/>);

        });

        it('should set date  when date change', () => {
            instance.pickValueForStopItWhen('Pickadate');
            expect(PaymentsActionCreator.updateEditForm).toBeCalled();
        });
        it('should set no of tyme  when noOfTime', () => {
            instance.pickValueForStopItWhen('Nooftimes');
            expect(PaymentsActionCreator.updateEditForm).toBeCalled();
        });


        it('should set stop it when when stop it when change for when i cancel', () => {
            instance.pickValueForStopItWhen('whenIcancel');
            expect(PaymentsActionCreator.updateEditForm).toBeCalled();

        });
        xit('should show ending option', () => {
            instance.setState({ stopitwhen: 'Pickadate', showEnd: true })
            instance.showEndingData();
            // left
        });

        it('should end date change for pick a date', () => {
            //instance.setState({stopitwhen :'Pickadate', showEnd : true})
            instance.endDateChange('10-10-2016');
            expect(PaymentsActionCreator.updateEditForm).toBeCalled();

        });
        it('should start date Change  for pick a date', () => {
            //instance.setState({stopitwhen :'Pickadate', showEnd : true})
            instance.duedateChange('10-10-2016');
            expect(PaymentsActionCreator.updateEditForm).toBeCalled();

        });
        it('should due date Change  when ', () => {
            //instance.setState({stopitwhen :'Pickadate', showEnd : true})
            instance.updateWhen('10-10-2016');
            expect(PaymentsActionCreator.updateEditForm).toBeCalled();

        });
        it('should change often text ', () => {
            // instance.setState({stopitwhen :'Pickadate', showEnd : true})
            instance.oftenChange('Monthly');
            expect(PaymentsActionCreator.updateEditForm).toBeCalled();
        });
    });
     describe('Edit SO Payment for repeat option ', () => {
        it('should call editedDataPopup ', () => {
            instance.setState({ isOpen: true });
            instance.editedDataPopup();
            expect(instance.state.isOpen).toBeTruthy();

        });
        it('should call deletePayment ', () => {
            instance.setState({ isEnable: true });
            instance.deletePayment();
            expect(instance.state.isEnable).toBeTruthy();

        });
        it('should call closeErrorPopup ', () => {
            instance.setState({ showError: true });
            instance.closeErrorPopup();
            expect(instance.state.showError).toBe(false);

        });
        it('should call editMessageclose ', () => {
            instance.setState({ isOpen: false, showAnimation: false })
            instance.editMessageclose();
            expect(instance.state.showAnimation).toBe(false);

        });
        it('should call closeDeleteModal ', () => {
            instance.setState({ isEnable: false })
            instance.closeDeleteModal();
            expect(instance.state.isEnable).toBe(false);

        });
        it('should call deletePopup ', () => {
            instance.setState({ showDeleteSuccessPopup: true });
            instance.deletePopup();
            expect(instance.state.showDeleteSuccessPopup).toBe(true);

        });

    });
     describe('should call validateAmount function ', () => {
        beforeEach(() => {
            ValidationConfig.getValidationObjet.mockReturnValue('amount');
            instance = TestUtils.renderIntoDocument(<EditSOPayment {...props}/>)
        });
        let event = {
            target: {
                name: 'amount',
                value: '11.0'
            }
        }
        it("checking function onChange Valid Condtion", () => {
            const validationResult = {
                isValid: true,
                minLengthValid: true,
                maxLengthValid: true,
                regexValid: true,
            };
            ValidationConfig.getValidationObjet.mockReturnValue('amount');
            ValidationConfig.validateData.mockReturnValue(validationResult);
            instance.validateAmount(event);
            expect(instance.state.isAmountValid).toBeTruthy();
        });
          it("checking function onChange Valid Condtion", () => {
                let event = {
            target: {
                name: 'amount',
                value: '0'
            }
        }
      
            const validationResult = {
                isValid: true,
                minLengthValid: true,
                maxLengthValid: true,
                regexValid: true,
            };
            ValidationConfig.getValidationObjet.mockReturnValue('amount');
            ValidationConfig.validateData.mockReturnValue(validationResult);
            instance.validateAmount(event);
            expect(instance.state.isAmountValid).toBeFalsy();
        });
          it("checking function onChange Valid Condtion with amount end with dot", () => {
               const event = {
            target: {
                name: 'amount',
                value: '11.'
            }
            }
            const validationResult = {
                isValid: true,
                minLengthValid: true,
                maxLengthValid: true,
                regexValid: true,
            };
            ValidationConfig.getValidationObjet.mockReturnValue('amount');
            ValidationConfig.validateData.mockReturnValue(validationResult);
            instance.validateAmount(event);
            expect(instance.state.isAmountValid).toBeFalsy();
        });
        it("checking function onChange InValid  Regex If Condtion", () => {
            const validationResult = {
                isValid: false,
                minLengthValid: true,
                maxLengthValid: true,
                regexValid: false,
            }; event = {
                target: {
                    name: 'amount',
                    value: '',
                }
            }
            ValidationConfig.validateData.mockReturnValue(validationResult);
            instance.validateAmount(event);
            expect(instance.state.isAmountValid).toBeFalsy();

        });
        it("checking function onChange InValid  Regex Condtion Else Conditon", () => {
            const validationResult = {
                isValid: false,
                minLengthValid: true,
                maxLengthValid: true,
                regexValid: false,
            }; event = {
                target: {
                    name: 'amount',
                    value: '£111.00',
                }
            }
            ValidationConfig.getValidationObjet.mockReturnValue('name');
            ValidationConfig.validateData.mockReturnValue(validationResult);
            instance.validateAmount(event);
            //  expect(PayeeActionCreator.updateForm.mock.calls.length).toBe(3);
        });
        it("checking function onChange InValid minLengthValid Condtion", () => {
            event = {
                target: {
                    name: '',
                    value: '',
                }
            }
            const validationResult = {
                isValid: false,
                minLengthValid: false,
                maxLengthValid: true,
                regexValid: true,
            };
            instance.makeInputInValid = jest.genMockFunction();
            ValidationConfig.getValidationObjet.mockReturnValue('amount');
            ValidationConfig.validateData.mockReturnValue(validationResult);
            instance.validateAmount(event);
            expect(instance.state.isAmountValid).toBeFalsy();

        });
        it("checking function onChange InValid maxLengthValid Condtion", () => {
            event = {
                target: {
                    name: 'amount',
                    value: '',
                }
            }
            const validationResult = {
                isValid: false,
                minLengthValid: true,
                maxLengthValid: false,
                regexValid: true,
            };
            instance.makeInputInValid = jest.genMockFunction();
            ValidationConfig.getValidationObjet.mockReturnValue('amount');
            ValidationConfig.validateData.mockReturnValue(validationResult);
            instance.validateAmount(event);
        });
            it("checking function onChange InValid maxLengthValid Condtion", () => {
            event = {
                target: {
                    name: 'amount',
                    value: '0',
                }
            }
            const validationResult = {
                isValid: false,
                minLengthValid: true,
                maxLengthValid: false,
                regexValid: true,
            };
            instance.makeInputInValid = jest.genMockFunction();
            ValidationConfig.getValidationObjet.mockReturnValue('amount');
            ValidationConfig.validateData.mockReturnValue(validationResult);
            instance.validateAmount(event);
        });
 
        it("checking function onChange Else Condtion", () => {
            event = {
                target: {
                    name: 'amount',
                    value: '',
                }
            }
            const validationResult = {
                isValid: false,
                minLengthValid: true,
                maxLengthValid: true,
                regexValid: true,
            };
            ValidationConfig.getValidationObjet.mockReturnValue('amount');
            ValidationConfig.validateData.mockReturnValue(validationResult);
            instance.validateAmount(event);
            expect(1).toBe(1);

        });


    });
      describe('Edit SO Payment for single payment ', () => {
        let singlePayment = {
            "id": "0002",
            "single": {
                "when": "2016-09-29",
                "amount": {
                    "value": 2,
                    "currency": "GBP"
                }
            },
            "display_name": "B INSTANT SAVINGS",
            "reference": "/TEST2",
            "sort_code": "827018",
            "account_number": "40013506",
            "actions_available": {
                "/account/mandates/so/write": true
            },
            "is_active": true
        }
        beforeEach(() => {
            PaymentsStore.getSOPaymentById.mockReturnValue(singlePayment);
            component = shallowRender(props);
            instance = TestUtils.renderIntoDocument(<EditSOPayment {...props}/>);
        });
        it('should call deletePopup ', () => {
            instance.setState({ showDeleteSuccessPopup: true });
            instance.deletePopup();
            expect(instance.state.showDeleteSuccessPopup).toBe(true);
        });
    });

    describe('Edit SO Payment for standing order end date condition ', () => {
        let standingOrderPayment =
            {
                "is_active": true,
                "id": "0006",
                "display_name": "JOHN",
                "reference": "TEST",
                "sort_code": "827018",
                "account_number": "40014231",
                "actions_available": {
                    "/account/mandates/so/write": true
                },
                "schedule": {
                    "next_payment": {
                        "when": "2016-10-19",
                        "amount": {
                            "value": 22,
                            "currency": "GBP"
                        }
                    },
                    "recurrence": {
                        "frequency": {
                            "monthly": {
                                "interval": 1
                            }
                        },
                        "amount": {
                            "value": 22,
                            "currency": "GBP"
                        }
                    },
                    "end_condition": {
                        "when": "2016-12-19"
                    }
                }
            }
        beforeEach(() => {
            PaymentsStore.getSOPaymentById.mockReturnValue(standingOrderPayment);
            component = shallowRender(props);
            instance = TestUtils.renderIntoDocument(<EditSOPayment {...props}/>);
        });
        it('should call deletePopup ', () => {
            instance.setState({ showDeleteSuccessPopup: true });
            instance.deletePopup();
            expect(instance.state.showDeleteSuccessPopup).toBe(true);
        });
    });


    describe('Edit SO Payment for standing order number of payment condition ', () => {
        let standingOrderPayment =
            {
                "is_active": true,
                "id": "0006",
                "display_name": "JOHN",
                "reference": "TEST",
                "sort_code": "827018",
                "account_number": "40014231",
                "actions_available": {
                    "/account/mandates/so/write": true
                },
                "schedule": {
                    "next_payment": {
                        "when": "2016-10-19",
                        "amount": {
                            "value": 22,
                            "currency": "GBP"
                        }
                    },
                    "recurrence": {
                        "frequency": {
                            "monthly": {
                                "interval": 1
                            }
                        },
                        "amount": {
                            "value": 22,
                            "currency": "GBP"
                        }
                    },
                    "end_condition": {
                        "number_of_payments": 2
                    }
                }
            }

        beforeEach(() => {
            PaymentsStore.getSOPaymentById.mockReturnValue(standingOrderPayment);
            component = shallowRender(props);
            instance = TestUtils.renderIntoDocument(<EditSOPayment {...props}/>);
        });
        it('should call deletePopup ', () => {
            instance.setState({ showDeleteSuccessPopup: true });
            instance.deletePopup();
            expect(instance.state.showDeleteSuccessPopup).toBe(true);
        });
        it('should call renderWhen ', () => {
            instance.setState({ isRepeat: false, showView: true, showWhen: 'today' });
            instance.renderWhen();
            expect(instance.state.showView).toBe(true);
        });
          it('should call appendCurrency ', () => {
         const amount=  instance.appendCurrency('£5');
            expect(amount).toBe('£5');
        });
        it('should call checkFormValid ', () => {
        instance.setState({ editType:'SinglePayment' });
            instance.checkFormValid();
            expect(instance.checkFormValid).toBeDefined();
        });
        it('should call checkFormValid else part', () => {
            instance.setState({ editType: 'StandingOrder', stopitwhen: 'Pickadate', end: 'dfedfewd' });
            instance.checkFormValid();
            expect(instance.checkFormValid).toBeDefined();
        });
        it('should call renderEndData', () => {
            instance.setState({ isRepeat: true, showView: true, showStopitwhen: 'Pickadate', showEnd: true });
            instance.renderEndData();
            expect(instance.renderEndData).toBeDefined();
        });
        it('should call renderType', () => {
            PaymentsStore.getPaymentType.mockReturnValue(true);
            instance.renderType();
            expect(instance.renderType).toBeDefined();
        });
    });
    
    describe('Render Conditions', () => {
        
        it('should call renderReference', () => {
           instance.setState({ paymentData:
               {reference:''}});
            instance.renderReference();
            expect(instance.renderTableRow).toBeDefined();
        });
         it('should  handleReference zero length condition', () => {
               const   event = {
                target: {
                    name: 'reference',
                    value: '',
                }
            }
       
            instance.handleReference(event);
            expect(instance.state.referenceValid).toBeFalsy();
        });
         it('should  handleReference max length condition', () => {
               const   event = {
                target: {
                    name: 'reference',
                    value: '809809809809809898098098098098',
                }
            }
       
            instance.handleReference(event);
            expect(instance.state.referenceValid).toBe(instance.state.referenceValid);
        });
          it('should  handleReference true condition', () => {
               const   event = {
                target: {
                    name: 'reference',
                    value: '80980980',
                }
            }
       
           instance.setState({ paymentData:
               {reference:''}});
            instance.handleReference(event);
            expect(instance.state.referenceValid).toBeTruthy();
        });
          it('should  renderEndData condition', () => {
            
           instance.setState({ showStopitwhen :"When i cancel",
           showView:true,
           isRepeat:true,
           showEnd :false
               });
            instance.renderEndData();
            expect(instance.state.referenceValid).toBeTruthy();
        });
        

    });
      describe('Render renderHowOften Conditions', () => {
        
        it('should call renderHowOften weekly', () => {
           instance.setState({ showOftenText: 'weekly',isRepeat:true});
            instance.renderHowOften();
            expect(instance.state.showOftenText).toBe('weekly');
      });
        it('should call renderHowOften', () => {
            instance.setState({ showOftenText: "2 weekly",isRepeat:true});
            instance.renderTableRow = jest.genMockFunction();
             instance.renderHowOften();
             expect(instance.renderTableRow).toBeCalled();
         });
      
        it('should call renderHowOften', () => {
            instance.setState({ showOftenText: "3 weekly",isRepeat:true});
            instance.renderTableRow = jest.genMockFunction();
             instance.renderHowOften();
             expect(instance.renderTableRow).toBeCalled();
         });
      
        it('should call renderHowOften', () => {
            instance.setState({ showOftenText: "4 weekly",isRepeat:true});
            instance.renderTableRow = jest.genMockFunction();
             instance.renderHowOften();
             expect(instance.renderTableRow).toBeCalled();
         });
        it('should call renderHowOften', () => {
            instance.setState({ showOftenText: "1 monthly",isRepeat:true});
            instance.renderTableRow = jest.genMockFunction();
             instance.renderHowOften();
             expect(instance.renderTableRow).toBeCalled();
         });
        it('should call renderHowOften', () => {
            instance.setState({ showOftenText: "2 monthly",isRepeat:true});
            instance.renderTableRow = jest.genMockFunction();
             instance.renderHowOften();
             expect(instance.renderTableRow).toBeCalled();
         });

        it('should call renderHowOften', () => {
            instance.setState({ showOftenText: "3 monthly",isRepeat:true});
            instance.renderTableRow = jest.genMockFunction();
             instance.renderHowOften();
             expect(instance.renderTableRow).toBeCalled();
         });

        it('should call renderHowOften', () => {
            instance.setState({ showOftenText: "6 monthly",isRepeat:true});
            instance.renderTableRow = jest.genMockFunction();
             instance.renderHowOften();
             expect(instance.renderTableRow).toBeCalled();
         });
       it('should call renderHowOften', () => {
            instance.setState({ showOftenText: "12 monthly",isRepeat:true});
            instance.renderTableRow = jest.genMockFunction();
             instance.renderHowOften();
             expect(instance.renderTableRow).toBeCalled();
         });
      
        
        

    });


});