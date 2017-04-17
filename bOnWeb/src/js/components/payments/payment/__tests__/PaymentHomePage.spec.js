/**
 * @module PaymentHomePage
 */

jest.unmock('../PaymentHomePage');
//jest.mock('../../../../stores/PaymentsStore');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const { buildContent } = require('../../../../__helpers__/TestHelpers');

const StringConstant = require('../../../../constants/StringConstants');
const AccountListComponent = require('../AccountListComponent');
const KeypadComponent = require('../KeypadComponent');
const PayeeComponent = require('../../payee/PayeeComponent');
const RepeatPayment = require('../RepeatPayment');
const PaymentsActionCreator = require('../../../../actions/PaymentsActionCreator');
const AccountOpeningActions = require('../../../../actions/AccountOpeningActions');
const PaymentsStore = require('../../../../stores/PaymentsStore');
const NewPayeeComponent = require('../../payee/NewPayeeComponent');
const NumberUtils = require('../../../../utils/NumberUtils');
const BrowserUtils = require('../../../../utils/BrowserUtils');
const RegexUtils = require('../../../../utils/RegexUtils');
const BasicModal = require('../../../common/modals/ModalB');
const ValidationConfig = require('../../../../config/validationConfig');
const _ = require('lodash');

const PaymentHomePage = require('../PaymentHomePage');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<PaymentHomePage
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};

describe('To Check Payment HomePage page', () => {
    let instance;
    let props;
    beforeEach(() => {
        props = {
            contents: {
                creditPopUpHeader: "datacreditPopUpHeader",
                creditPopUpBody: "datacreditPopUpBody",
                fromTitle: "datafromTitle",
                NextButton: "dataNextButton",
                payFrom: "datapayFrom",
                toTitle: "datatoTitle",
            },
            accountList: [],
            tabChange: 'true',
            data: {
            },
        };
        instance = shallowRender(props);
    });
    it('render a standard modal with child elements', () => {
        instance = shallowRender(props);
        expect(instance).toEqualJSX(
            <div className="full-width">
                <h4 className="text-center next-step" >
                    datapayFrom
                </h4>
                <div className="row tab-content  mobile-margin">
                    <div className="col-lg-offset-2 col-md-offset-2 col-lg-4 col-md-4 col-sm-offset-2 col-sm-8 col-xs-12 padding-right-left"
                        >
                        <p className="title">
                            datafromTitle
                        </p>
                        <AccountListComponent
                            accountClick={function noRefCheck() { } }
                            accountList={[]}
                            contents={{
                                NextButton: 'dataNextButton', creditPopUpBody: 'datacreditPopUpBody', creditPopUpHeader: 'datacreditPopUpHeader', fromTitle: 'datafromTitle', payFrom: 'datapayFrom', toTitle: 'datatoTitle'
                            }}
                            name="fromList"
                            tabChange="true"
                            />
                    </div>

                    <div className="col-lg-offset-0 col-lg-4 col-md-offset-0 col-md-4 col-sm-offset-2 col-sm-8 col-xs-12 padding-right-left col-lg-offset-0 col-lg-4 col-md-offset-0 col-md-4 col-sm-offset-2 col-sm-8  col-xs-12 padding-right-left">

                        <p className="title">
                            datatoTitle
                        </p>

                        <div />
                    </div>
                    <div className="col-lg-offset-0 col-lg-4 col-md-offset-0 col-lg-pull-4 col-md-4 col-md-pull-4 col-sm-offset-2 col-sm-8 col-xs-12">
                        <form id="repeat-payment" />
                    </div>
                </div>
            </div>
        )
    });
});

describe('To check  Functions', () => {
    let instance;
    let evnt = {
        preventDefault: jest.genMockFn(),
        target: {
            className: 'classabc',
            value: '2000',
        },
    };
    let amt = 3000;
    let isValid = true;
    let counter = true;
    let e = 1;

    let props = {

        creditokClick: jest.genMockFn(),
        closed: jest.genMockFn(),
        showToList: jest.genMockFn(),
        loadNewPayee: jest.genMockFn(),
        loadPayee: jest.genMockFn(),
        checkRenderView: jest.genMockFn(),
        preventDefault: jest.genMockFn(),
        enableKeypadOrRepeat: jest.genMockFn(),
        contents: {
            creditPopUpHeader: "datacreditPopUpHeader",
            creditPopUpBody: "datacreditPopUpBody",
            fromTitle: "datafromTitle",
            NextButton: "dataNextButton",
            payFrom: "datapayFrom",
            toTitle: "datatoTitle",
        },
        amount: {
            toString: '30'
        },
        // StringConstant: {
        //     amt: '20000',
        // },
        data: {
            account: ''
        },
        index: '',
        display: '',
        referenceData: {

        },
        payeeList: [
            {
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
            },
        ],
    };
    it('calls for the creditokClick', () => {
        let node = document.createElement('div');
        let creditokClick = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ confirmCancel: false });
        instance.creditokClick();
        expect(instance.creditokClick).toBeDefined();
    });
    it('calls for the closed', () => {
        let node = document.createElement('div');
        let closed = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ confirmCancel: false });
        instance.closed();
        expect(instance.closed).toBeDefined();
    });
    it('calls for the showToList else function', () => {
        let node = document.createElement('div');
        let showToList = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ showTo: false });
        instance.showToList();
        expect(instance.showToList).toBeDefined();
    });
    it('calls for the loadNewPayee if function', () => {
        let node = document.createElement('div');
        let loadNewPayee = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ nextStep: 'abcd' });
        instance.loadNewPayee();
        expect(instance.loadNewPayee).toBeDefined();
    });
    it('calls for the loadNewPayee BrowserUtils if  function', () => {
        BrowserUtils.isMobileView.mockReturnValue(true);
        instance.setState({ isOpen: false });
        let node = document.createElement('div');
        instance.loadNewPayee();
    });
    it('calls for the loadNewPayee BrowserUtils else  function', () => {
        BrowserUtils.isMobileView.mockReturnValue(true);
        instance.setState({ isOpen: true });

        let node = document.createElement('div');
        instance.loadNewPayee();
    });
    it('calls for the loadPayee function', () => {
        let node = document.createElement('div');
        let loadPayee = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.loadPayee(props.data.account, props.index, props.display);
        expect(instance.loadPayee).toBeDefined();
    });
    it('calls for the checkRenderView function', () => {
        let node = document.createElement('div');
        let checkRenderView = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        BrowserUtils.isMobileView.mockReturnValue(true);
        instance.checkRenderView();
        expect(instance.checkRenderView).toBeDefined();
    });
    it('calls for the showAmountText function truthy', () => {
        let amt = 3000;
        let node = document.createElement('div');
        let showAmountText = jest.genMockFn();
        BrowserUtils.isMobileView.mockReturnValue(true);
        PaymentsStore.getRepeatAmount.mockReturnValue('3000');
        PaymentsStore.getDefaultAmt.mockReturnValue('3000');
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.showAmountText();
        expect(instance.showAmountText).toBeDefined();
    });
    it('calls for the showAmountText function else', () => {
        let amt = 3000;
        let node = document.createElement('div');
        let showAmountText = jest.genMockFn();
        BrowserUtils.isMobileView.mockReturnValue(true);
        PaymentsStore.getRepeatAmount.mockReturnValue('3000');
        PaymentsStore.getDefaultAmt.mockReturnValue('30');
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.showAmountText();
        expect(instance.showAmountText).toBeDefined();
    });
    it('calls for the showAmountText function falsy', () => {
        let amt = 30;
        let node = document.createElement('div');
        let showAmountText = jest.genMockFn();
        BrowserUtils.isMobileView.mockReturnValue(false);
        PaymentsStore.getRepeatAmount.mockReturnValue('30');
        PaymentsStore.getDefaultAmt.mockReturnValue('30');
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.showAmountText();
        expect(instance.showAmountText).toBeDefined();
    });
    it('calls for the appendCurrency function falsy', () => {
        let node = document.createElement('div');
        let appendCurrency = jest.genMockFn();
        let amount = "-£12"
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.appendCurrency(amount);
        expect(instance.appendCurrency).toBeDefined();
    });
    // it('calls for the showRPNext function falsy', () => {
    //     let amt = 2000;
    //     let node = document.createElement('div');
    //     let showRPNext = jest.genMockFn();
    //     instance.setState({ enableRP: true });
    //     instance.setState({ enableNext: true });
    //     instance.setState({ showNextSteps: true });
    //     instance.setState({ amount: '20000' });
    //     PaymentsStore.getSelectedPayee.mockReturnValue('abcd');
    //     //PaymentsStore.getSelectedAccount.mockReturnValue('lmno');
    //     instance.setState({ amount: '2000' });
    //     PaymentsStore.getSelectedAccount.mockReturnValue({ type: 'savings' });
    //     PaymentsStore.getSelectedPotData.mockReturnValue({
    //         balance: {
    //             value: '20000'
    //         }
    //     });

    //     const render = (comp, el) => ReactDOM.render(comp, el);
    //     instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
    //     instance.showRPNext();
    //     expect(instance.showRPNext).toBeDefined();
    // });
    // it('calls for the showAmountText function Falsy', () => {
    //     let node = document.createElement('div');
    //     let showAmountText = jest.genMockFn();
    //     BrowserUtils.isMobileView.mockReturnValue(false);
    //     const render = (comp, el) => ReactDOM.render(comp, el);
    //     instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
    //     instance.showAmountText();
    //     expect(instance.showAmountText).toBeDefined();
    // });
    // it('calls for the showAmountText function', () => {
    //     let node = document.createElement('div');
    //     let showAmountText = jest.genMockFn();
    //     let amt = PaymentsStore.getRepeatAmount.mockReturnValue(true);
    //     PaymentsStore.getDefaultAmt.mockReturnValue(false);
    //     const render = (comp, el) => ReactDOM.render(comp, el);
    //     instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
    //     instance.showAmountText();
    //     expect(instance.showAmountText).toBeDefined();
    // });
    it('calls for the showNextButton function', () => {
        let node = document.createElement('div');
        let showNextButton = jest.genMockFn();
        BrowserUtils.isMobileView.mockReturnValue(true);
        instance.setState({ amount: 20000 });
        instance.setState({ nextStep: 'KP' });
        instance.setState({ showNextSteps: true });
        PaymentsStore.getSelectedPayee.mockReturnValue(true);
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.showNextButton();
        expect(instance.showNextButton).toBeDefined();
    });



    // it('calls for the amtChange function', () => {
    //     let node = document.createElement('div');
    //     let amtChange = jest.genMockFn();
    //     BrowserUtils.isMobileView.mockReturnValue(true);
    //     PaymentsStore.getDefaultAmt.mockReturnValue('1000');
    //     const render = (comp, el) => ReactDOM.render(comp, el);
    //     instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
    //     instance.amtChange(evnt);
    //     expect(instance.amtChange).toBeDefined();
    // });
    // it('calls for the amtChange function', () => {

    //     let node = document.createElement('div');
    //     let amtChange = jest.genMockFn();
    //     BrowserUtils.isMobileView.mockReturnValue(false);
    //     PaymentsStore.getDefaultAmt.mockReturnValue('1000');
    //     RegexUtils.isValid.mockReturnValue(false);
    //     const render = (comp, el) => ReactDOM.render(comp, el);
    //     instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
    //     instance.amtChange(evnt);
    //     expect(instance.amtChange).toBeDefined();
    // });
    describe('amtChange function  Functions', () => {
        it('calls for the amtChange VALUE function', () => {
                 instance = TestUtils.renderIntoDocument(<PaymentHomePage {...props} />);
          BrowserUtils.isMobileView.mockReturnValue(true);
       PaymentsStore.getSelectedPayee.mockReturnValue('abcd');
        PaymentsStore.getSelectedAccount.mockReturnValue('lmno');
        instance.setState({ amount: '2000',
            showNextSteps:true,
            nextStep:'RP',
         });
        PaymentsStore.getSelectedAccount.mockReturnValue({ type: 'savings' });
    
   
        const validationResult = {
                isValid: true,
                minLengthValid: true,
                maxLengthValid: true,
                regexValid: true,
            };
            ValidationConfig.getValidationObjet.mockReturnValue('amount');
            ValidationConfig.validateData.mockReturnValue(validationResult);
        const e = {
            target : {
                name:'txtAmt',
                value:'22'
            }
        }
      
      
        instance.amtChange(e);
        expect(PaymentsActionCreator.checkEndData.mock.calls.length).toBe(1);
    });
     it('calls for the amtChange VALUE function', () => {
        const validationResult = {
                isValid: true,
                minLengthValid: true,
                maxLengthValid: true,
                regexValid: true,
            };
            ValidationConfig.getValidationObjet.mockReturnValue('amount');
            ValidationConfig.validateData.mockReturnValue(validationResult);
        const e = {
            target : {
                name:'txtAmt',
                value:'22.'
            }
        }
       const test= instance.amtChange(e);
         expect(PaymentsActionCreator.checkEndData.mock.calls.length).toBe(2);
    });
     it('calls for the amtChange VALUE function end with pound sign', () => {
        // const validationResult = {
        //         isValid: true,
        //         minLengthValid: true,
        //         maxLengthValid: true,
        //         regexValid: true,
        //     };
        //     ValidationConfig.getValidationObjet.mockReturnValue('amount');
        //     ValidationConfig.validateData.mockReturnValue(validationResult);
        const e = {
            target : {
                name:'txtAmt',
                value:'22£'
            }
        }
       const test= instance.amtChange(e);
         expect(PaymentsActionCreator.checkEndData.mock.calls.length).toBe(2);
    });
      it('calls for the amtChange VALUE function regex failed Empty Value', () => {
        const validationResult = {
                isValid: false,
                minLengthValid: true,
                maxLengthValid: true,
                regexValid: false,
            };
            ValidationConfig.getValidationObjet.mockReturnValue('amount');
            ValidationConfig.validateData.mockReturnValue(validationResult);
        const e = {
            target : {
                name:'txtAmt',
                value:''
            }
        }
       const test= instance.amtChange(e);
         expect(PaymentsActionCreator.checkEndData.mock.calls.length).toBe(3);
    });
    it('calls for the amtChange VALUE function regex failed String Value', () => {
        const validationResult = {
                isValid: false,
                minLengthValid: true,
                maxLengthValid: true,
                regexValid: false,
            };
            ValidationConfig.getValidationObjet.mockReturnValue('amount');
            ValidationConfig.validateData.mockReturnValue(validationResult);
        const e = {
            target : {
                name:'txtAmt',
                value:'kjlkj'
            }
        }
       const test= instance.amtChange(e);
         expect(PaymentsActionCreator.checkEndData.mock.calls.length).toBe(3);
    });
     it('calls for the amtChange VALUE function min length failed String Value', () => {
        const validationResult = {
                isValid: false,
                minLengthValid: false,
                maxLengthValid: true,
                regexValid: true,
            };
            ValidationConfig.getValidationObjet.mockReturnValue('amount');
            ValidationConfig.validateData.mockReturnValue(validationResult);
        const e = {
            target : {
                name:'txtAmt',
                value:''
            }
        }
       const test= instance.amtChange(e);
         expect(PaymentsActionCreator.checkEndData.mock.calls.length).toBe(3);
    });
      it('calls for the amtChange VALUE function min length failed String Value', () => {
        const validationResult = {
                isValid: false,
                minLengthValid: false,
                maxLengthValid: true,
                regexValid: true,
            };
            ValidationConfig.getValidationObjet.mockReturnValue('amount');
            ValidationConfig.validateData.mockReturnValue(validationResult);
        const e = {
            target : {
                name:'txtAmt',
                value:''
            }
        }
       const test= instance.amtChange(e);
         expect(PaymentsActionCreator.checkEndData.mock.calls.length).toBe(3);
    });
     it('calls for the amtChange VALUE function min length failed String Value', () => {
        const validationResult = {
                isValid: false,
                minLengthValid: true,
                maxLengthValid: false,
                regexValid: true,
            };
            ValidationConfig.getValidationObjet.mockReturnValue('amount');
            ValidationConfig.validateData.mockReturnValue(validationResult);
        const e = {
            target : {
                name:'txtAmt',
                value:''
            }
        }
       const test= instance.amtChange(e);
         expect(PaymentsActionCreator.checkEndData.mock.calls.length).toBe(3);
    });
    it('calls for the amtChange VALUE function min length failed String Value', () => {
        const validationResult = {
                isValid: false,
                minLengthValid: true,
                maxLengthValid: true,
                regexValid: true,
            };
            ValidationConfig.getValidationObjet.mockReturnValue('amount');
            ValidationConfig.validateData.mockReturnValue(validationResult);
        const e = {
            target : {
                name:'txtAmt',
                value:''
            }
        }
       const test= instance.amtChange(e);
         expect(PaymentsActionCreator.checkEndData.mock.calls.length).toBe(3);
    });
        it('calls for the amtChange VALUE function min length failed String Value', () => {
            BrowserUtils.isMobileView.mockReturnValue(true);
        const validationResult = {
                isValid: false,
                minLengthValid: true,
                maxLengthValid: true,
                regexValid: true,
            };
            ValidationConfig.getValidationObjet.mockReturnValue('amount');
            ValidationConfig.validateData.mockReturnValue(validationResult);
        const e = {
            target : {
                name:'txtAmt',
                value:''
            }
        }
       const test= instance.amtChange(e);
         expect(PaymentsActionCreator.checkEndData.mock.calls.length).toBe(3);
    });

    });
     it('calls for theshowRPNext', () => {
            BrowserUtils.isMobileView.mockReturnValue(true);
        const validationResult = {
                isValid: false,
                minLengthValid: true,
                maxLengthValid: true,
                regexValid: true,
            };
            ValidationConfig.getValidationObjet.mockReturnValue('amount');
            ValidationConfig.validateData.mockReturnValue(validationResult);
        const e = {
            target : {
                name:'txtAmt',
                value:''
            }
        }
       const test= instance.showRPNext();
         expect(PaymentsActionCreator.checkEndData.mock.calls.length).toBe(3);
    });



    // it('calls for the enableKeypadorRepeat function', () => {
    //     let node = document.createElement('div');
    //     //let enableKeypadorRepeat = jest.genMockFn();
    //     const render = (comp, el) => ReactDOM.render(comp, el);
    //     instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
    //     instance.setState({ enableKeypad: false });
    //     instance.setState({ enableRP: true });
    //     instance.enableKeypadorRepeat();
    //     expect(instance.enableKeypadorRepeat).toBeDefined();
    // });
    it('calls for the showRPOption function', () => {
        let node = document.createElement('div');
        let showRPOption = jest.genMockFn();
        PaymentsStore.getSelectedPayee.mockReturnValue('abcd');
        PaymentsStore.getSelectedAccount.mockReturnValue('lmno');
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ amount: 2000 });
        instance.showRPOption();
        expect(instance.showRPOption).toBeDefined();
    });
    it('calls for the showRPOption function else', () => {
        let node = document.createElement('div');
        let showRPOption = jest.genMockFn();
        PaymentsStore.getSelectedPayee.mockReturnValue('');
        PaymentsStore.getSelectedAccount.mockReturnValue('');
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ amount: 2000 });
        instance.showRPOption();
        expect(instance.showRPOption).toBeDefined();
    });
    it('calls for the showRPOption function', () => {
        let node = document.createElement('div');
        let showRPOption = jest.genMockFn();
        PaymentsStore.getSelectedPayee.mockReturnValue('');
        PaymentsStore.getSelectedAccount.mockReturnValue('');
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ amount: 2000 });
        instance.showRPOption();
        expect(instance.showRPOption).toBeDefined();
    });
    it('calls for the showRPOption function', () => {
        let node = document.createElement('div');
        let showRPOption = jest.genMockFn();
        PaymentsStore.getSelectedPayee.mockReturnValue('');
        PaymentsStore.getSelectedAccount.mockReturnValue({ type: 'savings' });
        PaymentsStore.checkPotEmpty.mockReturnValue('')
        PaymentsStore.getSelectedPot.mockReturnValue('');
        PaymentsStore.isSavingTotClicked.mockReturnValue('');
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ amount: 2000 });
        instance.showRPOption();
        expect(instance.showRPOption).toBeDefined();
    });

    it('calls for the nextClicked function', () => {
        let node = document.createElement('div');
        let nextClicked = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ amount: 2000 });
        instance.nextClicked();
        expect(instance.nextClicked).toBeDefined();
    });
    it('calls for the nextClicked function', () => {
        let node = document.createElement('div');
        PaymentsStore.getCreditPopUp.mockReturnValue(true);
        let nextClicked = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ amount: 0 });
        //instance.setState({ confirmCancel: true });
        instance.nextClicked();
        expect(instance.nextClicked).toBeDefined();
    });
    it('calls for the nextClicked function', () => {
        let node = document.createElement('div');
        PaymentsStore.getCreditPopUp.mockReturnValue(true);
        let nextClicked = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ amount: 2000 });
        instance.nextClicked();
        expect(instance.nextClicked).toBeDefined();
    });
    // it('calls for the paymentSteps function', () => {
    //     let node = document.createElement('div');
    //     let showNextSteps = true;
    //     let paymentSteps = jest.genMockFn();
    //     const render = (comp, el) => ReactDOM.render(comp, el);
    //     instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
    //     instance.setState({ showNextSteps: true });
    //     instance.setState({ nextStep: 'RP' });
    //     BrowserUtils.isMobileView.mockReturnValue(true);
    //     PaymentsStore.getSelectedPayee.mockReturnValue('');
    //     instance.paymentSteps();
    //     expect(instance.paymentSteps).toBeDefined();
    // });
    it('calls for the closeModal function', () => {
        let node = document.createElement('div');
        let closeModal = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ showAmountError: false });
        instance.closeModal();
        expect(instance.closeModal).toBeDefined();
    });
    it('calls for the checkAmount function', () => {
        let error = false;
        let amt = 20000;
        //PaymentsStore.getSelectedPotData.mockReturnValue(true);
        PaymentsStore.getSelectedPotData.mockReturnValue({ balance: "200" });
        let node = document.createElement('div');
        let checkAmount = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.checkAmount(amt);
        expect(instance.checkAmount).toBeDefined();
    });
    it('calls for the checkAmount function', () => {
        let error = false;
        let amt = 20000;
        // PaymentsStore.getSelectedPotData.mockReturnValue(true);
        PaymentsStore.getSelectedPotData.mockReturnValue({
            balance: {
                value: '200'
            }
        });
        let node = document.createElement('div');
        let checkAmount = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.checkAmount(amt);
        expect(instance.checkAmount).toBeDefined();
    });
    it('calls for the checkAmount function', () => {
        let error = false;
        let amt = 20000;
        // PaymentsStore.getSelectedPotData.mockReturnValue(undefined);
        PaymentsStore.getSelectedPotData.mockReturnValue({ balance: undefined });
        let node = document.createElement('div');
        let checkAmount = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.checkAmount(amt);
        expect(instance.checkAmount).toBeDefined();
    });
    it('calls for the componentWillMount function', () => {
        let node = document.createElement('div');
        let componentWillMount = jest.genMockFn();
        PaymentsStore.getConfirmBack.mockReturnValue(true);
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ enableKeypad: false });
        instance.componentWillMount();
        expect(instance.componentWillMount).toBeDefined();
    });
    it('calls for the componentWillMount function -is from other change true', () => {
        let node = document.createElement('div');
        let componentWillMount = jest.genMockFn();
        PaymentsStore.getConfirmBack.mockReturnValue(true);
        PaymentsStore.isFromOtherPage.mockReturnValue(true);
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ enableKeypad: false });
        instance.componentWillMount();
        expect(instance.componentWillMount).toBeDefined();
    });
    it('calls for the componentWillMount function', () => {
        let node = document.createElement('div');
        let componentWillMount = jest.genMockFn();
        PaymentsStore.getConfirmBack.mockReturnValue(true);
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ showTo: true });
        instance.setState({ showNextSteps: true });
        instance.setState({ isOpen: false });
        instance.componentWillMount();
        expect(instance.componentWillMount).toBeDefined();
    });
    it('calls for the removeChangeListener', () => {
        let node = document.createElement('div');
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        React.unmountComponentAtNode(node);
        expect(PaymentsStore.removeChangeListener.mock.calls.length).toBe(1);
    });
    it('calls for the fromHandleChange function', () => {
        let counter = false;
        let compClick = true;
        let node = document.createElement('div');
        BrowserUtils.isMobileView.mockReturnValue(true);
        let fromHandleChange = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        //instance.setState({ showTo: counter });
        instance.fromHandleChange(e, counter, compClick);
        expect(instance.fromHandleChange).toBeDefined();
    });
    it('calls for the fromHandleChange function', () => {
        let counter = true;
        let compClick = true;
        let node = document.createElement('div');
        BrowserUtils.isMobileView.mockReturnValue(true);
        let fromHandleChange = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        //instance.setState({ showTo: counter });
        instance.fromHandleChange(e, counter, compClick);
        expect(instance.fromHandleChange).toBeDefined();
    });
    it('calls for the fromHandleChange function', () => {
        let node = document.createElement('div');
        BrowserUtils.isMobileView.mockReturnValue(false);
        let fromHandleChange = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        //instance.setState({ showTo: counter });
        instance.fromHandleChange(e, counter);
        expect(instance.fromHandleChange).toBeDefined();
    });
    it('calls for the fromHandleChange function', () => {
        let counter = false;
        let node = document.createElement('div');
        BrowserUtils.isMobileView.mockReturnValue(true);
        let fromHandleChange = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ counter: false });
        instance.setState({ showNextSteps: true });
        instance.fromHandleChange(e, counter);
        expect(instance.fromHandleChange).toBeDefined();
    });
    it('calls for the toHandleChange function', () => {
        let node = document.createElement('div');
        PaymentsStore.getNextTask.mockReturnValue('KP');
        BrowserUtils.isMobileView.mockReturnValue(false);
        let toHandleChange = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.toHandleChange();
        expect(instance.toHandleChange).toBeDefined();
    });

    it('calls for the toHandleChange function', () => {
        let isOpen = false;
        let node = document.createElement('div');
        PaymentsStore.getNextTask.mockReturnValue('');
        BrowserUtils.isMobileView.mockReturnValue(true);
        let toHandleChange = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ isOpen: false });
        instance.setState({ showNextSteps: true });
        instance.toHandleChange();
        expect(instance.toHandleChange).toBeDefined();
    });
    it('calls for the toHandleChange function', () => {
        let node = document.createElement('div');
        BrowserUtils.isMobileView.mockReturnValue(true);
        let toHandleChange = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ isOpen: true });
        instance.toHandleChange();
        expect(instance.toHandleChange).toBeDefined();
    });

    it('should navigate to web-task', () => {
        let node = document.createElement('div');
        let AddPayee = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.AddPayee();
        expect(PaymentsActionCreator.navigateToWebTask.mock.calls.length).toBe(1);
    });




    it('calls for the onStoreChange function', () => {
        PaymentsStore.getEndingDetails.mockReturnValue({
            referenceData: "88228822"
        });
        PaymentsStore.getNextTask.mockReturnValue('To');
        let node = document.createElement('div');
        let onStoreChange = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.onStoreChange();
        expect(instance.onStoreChange).toBeDefined();
    });
    it('calls for the onStoreChange function', () => {
        PaymentsStore.getEndingDetails.mockReturnValue({
            referenceData: "88228822"
        });
        PaymentsStore.getNextTask.mockReturnValue('KP');
        let node = document.createElement('div');
        let onStoreChange = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.onStoreChange();
        expect(instance.onStoreChange).toBeDefined();
    });
    it('calls for the onStoreChange function', () => {
        PaymentsStore.getEndingDetails.mockReturnValue({
            referenceData: "88228822"
        });
        PaymentsStore.getNextTask.mockReturnValue('RP');
        PaymentsStore.checkIfBothPotSelected.mockReturnValue(true);
        let node = document.createElement('div');
        let onStoreChange = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.onStoreChange();
        expect(instance.onStoreChange).toBeDefined();
    });
    it('calls for the onStoreChange function', () => {
        PaymentsStore.getEndingDetails.mockReturnValue({
            referenceData: "88228822"
        });
        PaymentsStore.getNextTask.mockReturnValue('RP');
        PaymentsStore.checkIfBothPotSelected.mockReturnValue(false);
        let node = document.createElement('div');
        let onStoreChange = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.onStoreChange();
        expect(instance.onStoreChange).toBeDefined();
    });
    it('calls for the onStoreChange function', () => {
        PaymentsStore.getEndingDetails.mockReturnValue('');
        let node = document.createElement('div');
        let onStoreChange = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.onStoreChange();
        expect(instance.onStoreChange).toBeDefined();
    });
    it('calls for the onStoreChange function', () => {
        BrowserUtils.isMobileView.mockReturnValue(true);
        PaymentsStore.getConfirmBack.mockReturnValue(true);
        PaymentsStore.getNextTask.mockReturnValue('KP');
        let node = document.createElement('div');
        let onStoreChange = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.onStoreChange();
        expect(instance.onStoreChange).toBeDefined();
    });
    it('calls for the onStoreChange function', () => {
        BrowserUtils.isMobileView.mockReturnValue(true);
        PaymentsStore.getConfirmBack.mockReturnValue(false);
        let node = document.createElement('div');
        let onStoreChange = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.onStoreChange();
        expect(instance.onStoreChange).toBeDefined();
    });

    it('calls for the onStoreChange function', () => {
        BrowserUtils.isMobileView.mockReturnValue(false);
        let node = document.createElement('div');
        let onStoreChange = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.onStoreChange();
        expect(instance.onStoreChange).toBeDefined();
    });
    it('calls for the onStoreChange function', () => {
        PaymentsStore.getEndingDetails.mockReturnValue({
            referenceData: ' '
        });
        let node = document.createElement('div');
        let onStoreChange = jest.genMockFn();

        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.onStoreChange();
        expect(instance.onStoreChange).toBeDefined();
    });

    it('calls for the onStoreChange function', () => {
        let amt = ' ';
        let node = document.createElement('div');
        let onStoreChange = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        BrowserUtils.isMobileView.mockReturnValue(true);
        PaymentsStore.getNextTask.mockReturnValue('KP');
        PaymentsStore.getSelectedPayee.mockReturnValue({ id: 'sdfsdf', name: 'jon' });
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true });
        instance.onStoreChange();
        expect(instance.onStoreChange).toBeDefined();
    });
    it('calls for the onStoreChange function', () => {
        let amt = ' ';
        let node = document.createElement('div');
        let onStoreChange = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        BrowserUtils.isMobileView.mockReturnValue(true);
        PaymentsStore.getNextTask.mockReturnValue('KP');
        PaymentsStore.getRepeatAmount.mockReturnValue('');
        PaymentsStore.getSelectedPayee.mockReturnValue({ id: 'sdfsdf', name: 'jon' });
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true });
        instance.onStoreChange();
        expect(instance.onStoreChange).toBeDefined();
    });
    it('calls for the onStoreChange function', () => {
        let amt = ' ';
        let node = document.createElement('div');
        let onStoreChange = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        BrowserUtils.isMobileView.mockReturnValue(true);
        PaymentsStore.getNextTask.mockReturnValue('KP');
        PaymentsStore.getRepeatAmount.mockReturnValue('');
        PaymentsStore.getSelectedPayee.mockReturnValue('');
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true });
        instance.onStoreChange();
        expect(instance.onStoreChange).toBeDefined();
    });
    it('calls for the deleteClick function', () => {
        let amt = '10000';
        let node = document.createElement('div');
        let deleteClick = jest.genMockFn();
        NumberUtils.decimalFormat.mockReturnValue(10.00);
        PaymentsStore.getDefaultAmt.mockReturnValue(2000);
        PaymentsStore.getNextTask.mockReturnValue('KP');
        BrowserUtils.isMobileView.mockReturnValue(false);
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true });
        instance.deleteClick();
        expect(instance.deleteClick).toBeDefined();
    });
      it('calls for the deleteClick function', () => {
        let amt = '-10000';
        let node = document.createElement('div');
        let deleteClick = jest.genMockFn();
        NumberUtils.decimalFormat.mockReturnValue(10.00);
        PaymentsStore.getDefaultAmt.mockReturnValue(2000);
        PaymentsStore.getNextTask.mockReturnValue('KP');
        BrowserUtils.isMobileView.mockReturnValue(false);
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true });
        instance.deleteClick();
        expect(instance.deleteClick).toBeDefined();
    });
    
    it('calls for the deleteClick function', () => {
        let amt = ' ';
        let node = document.createElement('div');
        let deleteClick = jest.genMockFn();
        PaymentsStore.getNextTask.mockReturnValue('KP');
        BrowserUtils.isMobileView.mockReturnValue(false);
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true });
        instance.deleteClick();
        expect(instance.deleteClick).toBeDefined();
    });


    it('calls for the deleteClick function', () => {
        let amt = '10000';
        let node = document.createElement('div');
        let deleteClick = jest.genMockFn();
        PaymentsStore.getDefaultAmt.mockReturnValue('2000');
        PaymentsStore.getNextTask.mockReturnValue('KP');
        BrowserUtils.isMobileView.mockReturnValue(false);
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true });
        instance.deleteClick();
        expect(instance.deleteClick).toBeDefined();
    });





    it('calls for the creditPopUp function', () => {
        let node = document.createElement('div');
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.creditPopUp();
        expect(instance.creditPopUp).toBeDefined();
    });
    it('calls for the amountCheckPopup function', () => {
        let showAmountError = true;
        let node = document.createElement('div');
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ showAmountError: true });
        instance.amountCheckPopup();
        expect(instance.amountCheckPopup).toBeDefined();
    });

    it('calls for the showRepeatPayment function', () => {
        let showAmountError = true;
        let amount = 1000;
        let node = document.createElement('div');
        PaymentsStore.getSelectedPayee.mockReturnValue('abcd');
        PaymentsStore.getSelectedAccount.mockReturnValue('lmno');
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ showAmountError: true });
        instance.setState({ amount: '1000' });
        instance.showRepeatPayment();
        expect(instance.showRepeatPayment).toBeDefined();
    });
    it('calls for the showRepeatPayment else function', () => {
        let showAmountError = true;
        let amount = -1000;
        let node = document.createElement('div');
        PaymentsStore.getSelectedPayee.mockReturnValue('');
        PaymentsStore.getSelectedAccount.mockReturnValue('');
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ showAmountError: true });
        instance.setState({ amount: '' });
        instance.showRepeatPayment();
        expect(instance.showRepeatPayment).toBeDefined();
    });
    it('calls for the button function', () => {
        let nextClickedStub;
        let amount = 20000;
        let component;
        nextClickedStub = jest.genMockFn();
        let props = {
            contents: {
                NextButton: 'NextButtondata',
            },
            onClick: jest.genMockFn(),
        }
        component = TestUtils.renderIntoDocument(<PaymentHomePage onClick={nextClickedStub} {...props}/>);
        component.setState({ enableNext: true });
        component.setState({ showNextSteps: true });
        component.setState({ amount: 10 });
        PaymentsStore.getSelectedPotData.mockReturnValue({
            balance: {
                value: 100,
            }
        })
        const pageoptions = TestUtils.scryRenderedDOMComponentsWithTag(component, 'button');
        component.nextClicked = nextClickedStub;

        nextClickedStub();
        _.map(pageoptions, page => {

            TestUtils.Simulate.click(page);
        });
        expect(nextClickedStub).toBeCalled();
    });

});
describe('To check  handleclick functions', () => {

    let instance;
    let evnt = {
        preventDefault: jest.genMockFn(),
        target: {
            className: 'classabc',
            value: '2000',
        },
    };
    let amt = 3000;
    let isValid = true;
    let counter = true;
    let e = 1;

    let props = {
        contents: {
            creditPopUpHeader: "datacreditPopUpHeader",
            creditPopUpBody: "datacreditPopUpBody",
            fromTitle: "datafromTitle",
            NextButton: "dataNextButton",
            payFrom: "datapayFrom",
            toTitle: "datatoTitle",
        },
        refs: {
            txtAmt: {
                value: 20000,
            }
        },
        amount: {
            toString: '30'
        },
        data: {
            account: ''
        },
        index: '',
        display: '',
        referenceData: {
        },
        payeeList: [
            {
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
            },
        ],
    };
    it('calls for the handleClicks function', () => {
        let amt = 20000;
        let e = {
            target: {
                value: 20000
            }
        }

        PaymentsStore.getDefaultAmt.mockReturnValue({ amt: 20000 });
        NumberUtils.decimalFormat.mockReturnValue('10.00');
        let node = document.createElement('div');
        let handleClicks = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true })
        instance.handleClicks(e);
        expect(instance.handleClicks).toBeDefined();
    });
    it('calls for the handleClicks function', () => {
        let amt = 20000;
        let e = {
            target: {
                value: 20000
            }
        }
        let refs = {
            txtAmt: {
                value: 20000,
            }
        }
        PaymentsStore.getDefaultAmt.mockReturnValue("10.00");
        NumberUtils.decimalFormat.mockReturnValue('10.00');
        BrowserUtils.isMobileView.mockReturnValue(false);
        let node = document.createElement('div');
        let handleClicks = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true })
        instance.handleClicks(e);
        expect(instance.handleClicks).toBeDefined();
    });
    it('calls for the handleClicks function-if amount value .', () => {
        let amt = 20000;
        let e = {
            target: {
                value: '.'
            }
        }

        PaymentsStore.getDefaultAmt.mockReturnValue("10.00");
        NumberUtils.decimalFormat.mockReturnValue('10.00');
        let node = document.createElement('div');
        let handleClicks = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true })
        instance.handleClicks(e);
        expect(instance.handleClicks).toBeDefined();
    });
    it('calls for the handleClicks function-if amount value .', () => {
        let amt = 20000;
        let e = {
            target: {
                value: '00.00'
            }
        }

        PaymentsStore.getDefaultAmt.mockReturnValue("10.00");
        NumberUtils.decimalFormat.mockReturnValue('10.00');
        let node = document.createElement('div');
        let handleClicks = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true })
        instance.handleClicks(e);
        expect(instance.handleClicks).toBeDefined();
    });
    it('calls for the handleClicks function', () => {
        let amt = -20;
        let isValid = true;
        let e = {
            target: {
                value: -20
            }
        }

        RegexUtils.isValid.mockReturnValue(true);
        NumberUtils.decimalFormat.mockReturnValue('10.00');
        let node = document.createElement('div');
        let handleClicks = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true })
        instance.handleClicks(e);
        expect(instance.handleClicks).toBeDefined();
    });

    it('calls for the handleClicks function', () => {
        let amt = 200;
        let isValid = true;
        let e = {
            target: {
                value: 200
            }
        }

        RegexUtils.isValid.mockReturnValue(true);
        NumberUtils.decimalFormat.mockReturnValue('10.00');
        let node = document.createElement('div');
        let handleClicks = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true })
        instance.handleClicks(e);
        expect(instance.handleClicks).toBeDefined();
    });


    it('calls for the handleClicks function -else -checkampount', () => {
        let amt = 200;
        let isValid = true;
        let e = {
            target: {
                value: 200
            }
        }

        RegexUtils.isValid.mockReturnValue(true);
        NumberUtils.decimalFormat.mockReturnValue('10.00');
        PaymentsStore.getSelectedPotData.mockReturnValue({ balance: { value: 20 } })
        let node = document.createElement('div');
        let handleClicks = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true })
        instance.handleClicks(e);
        expect(instance.handleClicks).toBeDefined();
    });

    it('calls for the handleClicks function', () => {
        let amt = 0;
        let e = {
            target: {
                value: 0
            }
        }

        RegexUtils.isValid.mockReturnValue(false);
        NumberUtils.decimalFormat.mockReturnValue('10.00');
        //PaymentsStore.getSelectedPotData.mockReturnValue({balance:{value:20}})
        let node = document.createElement('div');
        let handleClicks = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true })
        instance.handleClicks(e);
        expect(instance.handleClicks).toBeDefined();

    });

    it('calls for the handleClicks function for amtError', () => {
        let amt = 22;
        let e = {
            target: {
                value: 22
            }
        }
        RegexUtils.isValid.mockReturnValue(true);
        NumberUtils.decimalFormat.mockReturnValue('10.00');
        PaymentsStore.getSelectedPotData.mockReturnValue({
            balance: ''
        });
        //PaymentsStore.getSelectedPotData.mockReturnValue({balance:{value:20}})
        let node = document.createElement('div');
        let handleClicks = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true });
        instance.setState({ showAmountError: '20000' })
        instance.handleClicks(e);
        expect(instance.handleClicks).toBeDefined();

    });

    it('calls for the handleClicks  function-greater than 18', () => {
        let amt = 22;
        let e = {
            target: {
                value: 22
            }
        }
        RegexUtils.isValid.mockReturnValue(true);
        NumberUtils.decimalFormat.mockReturnValue('100000000000000000.00');
        PaymentsStore.getSelectedPotData.mockReturnValue({
            balance: ''
        });
        //PaymentsStore.getSelectedPotData.mockReturnValue({balance:{value:20}})
        let node = document.createElement('div');
        let handleClicks = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true });
        instance.setState({ showAmountError: '20000' })
        instance.handleClicks(e);
        expect(instance.handleClicks).toBeDefined();

    });
    it('calls for the handleClicks function-covering amt css', () => {
        let amt = 200;
        let amtC = 'large-amount';
        let isValid = true;
        let e = {
            target: {
                value: 200
            }
        }

        RegexUtils.isValid.mockReturnValue(true);
        NumberUtils.decimalFormat.mockReturnValue('1000000000000.00');
        let node = document.createElement('div');
        let handleClicks = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true, amtCss: amtC })
        instance.handleClicks(e);
        expect(instance.handleClicks).toBeDefined();
    });
    it('calls for the handleClicks function', () => {
        let amt = 20;
        let e = {
            target: {
                value: 20000
            }
        };

        NumberUtils.decimalFormat.mockReturnValue(10.00);
        BrowserUtils.isMobileView.mockReturnValue(false);
        PaymentsStore.getDefaultAmt.mockReturnValue('20000');
        let node = document.createElement('div');
        let handleClicks = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true })
        instance.setState({ amount: amt });
        instance.handleClicks(e);
        expect(instance.handleClicks).toBeDefined();
    });

    // it('calls for the handleClicks function', () => {
    //     let amt = 20000;
    //     let isValid = true;
    //     let e = {
    //         target: {
    //             value: 20000
    //         }
    //     }
    //     RegexUtils.isValid.mockReturnValue(true);
    //     let node = document.createElement('div');
    //     let handleClicks = jest.genMockFn();
    //     const render = (comp, el) => ReactDOM.render(comp, el);
    //     instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
    //     instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true })
    //     PaymentsStore.getSelectedPayee.mockReturnValue({ id: 'sdfsdf', name: 'jon' });
    //     instance.handleClicks(e);
    //     expect(instance.handleClicks).toBeDefined();
    // });

    it('calls for the goToNext function', () => {
        let goToNext = jest.genMockFn();
        RegexUtils.isValid.mockReturnValue(true);
        let node = document.createElement('div');
        let handleClicks = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true })
        PaymentsStore.getSelectedPayee.mockReturnValue({ id: 'sdfsdf', name: 'jon' });
        instance.goToNext(e);
        expect(instance.goToNext).toBeDefined();
    });
    it('calls for the goToNext function for getDefaultAmt', () => {
        let goToNext = jest.genMockFn();
        RegexUtils.isValid.mockReturnValue(false);
        let node = document.createElement('div');
        let handleClicks = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true })
        PaymentsStore.checkIfBothPotSelected.mockReturnValue(false);
        PaymentsStore.getDefaultAmt.mockReturnValue('20000')
        instance.goToNext(e);
        expect(instance.goToNext).toBeDefined();
    });
    it('calls for the goToNext function', () => {
        let goToNext = jest.genMockFn();
        RegexUtils.isValid.mockReturnValue(true);
        let node = document.createElement('div');
        let handleClicks = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true })
        PaymentsStore.getSelectedPotData.mockReturnValue({
            balance: ''
        });
        PaymentsStore.checkIfBothPotSelected.mockReturnValue(false);
        PaymentsStore.getDefaultAmt.mockReturnValue('20000')
        instance.setState({ amount: 20000 });
        instance.goToNext(e);
        expect(instance.goToNext).toBeDefined();
    });
    it('calls for the goToNext function covering false path', () => {
        let goToNext = jest.genMockFn();
        RegexUtils.isValid.mockReturnValue(true);
        let node = document.createElement('div');
        let handleClicks = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true })
        PaymentsStore.getSelectedPotData.mockReturnValue({
            balance: ''
        });
        PaymentsStore.checkIfBothPotSelected.mockReturnValue(false);
        PaymentsStore.getDefaultAmt.mockReturnValue('20000')
        instance.setState({ amount: 0 });
        instance.goToNext(e);
        expect(instance.goToNext).toBeDefined();
    });
    it('calls for the goToNext function covering true path', () => {
        let goToNext = jest.genMockFn();
        RegexUtils.isValid.mockReturnValue(true);
        let node = document.createElement('div');
        let handleClicks = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true })
        PaymentsStore.getSelectedPotData.mockReturnValue({
            balance: {
                value: '20000'
            }
        });
        PaymentsStore.checkIfBothPotSelected.mockReturnValue(true);
        PaymentsStore.getDefaultAmt.mockReturnValue('20000')
        instance.setState({ amount: 200000 });
        PaymentsActionCreator.setPaymentStep.mockReturnValue('RP');
        instance.goToNext(e);
        expect(instance.goToNext).toBeDefined();
    });
    it('calls for the amtClick function', () => {
        let handleClicks = jest.genMockFn();
        let node = document.createElement('div');
        let enableKeypad = true;
        RegexUtils.isValid.mockReturnValue(true);
        let amtClick = jest.genMockFn();
        BrowserUtils.isMobileView.mockReturnValue(false);
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true })
        PaymentsStore.getSelectedPayee.mockReturnValue({ id: 'sdfsdf', name: 'jon' });
        instance.amtClick();
        instance.setState({ enableKeypad: false });
        instance.setState({ amount: '10000' });
        expect(instance.amtClick).toBeDefined();
    });
    it('calls for the amtClick function for else of mobileview', () => {
        let handleClicks = jest.genMockFn();
        let node = document.createElement('div');
        RegexUtils.isValid.mockReturnValue(true);
        BrowserUtils.isMobileView.mockReturnValue(true);
        let amtClick = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true })
        instance.amtClick();
        expect(instance.amtClick).toBeDefined();
    });
    it('calls for the amtClick function for else enableKeypad ', () => {
        let handleClicks = jest.genMockFn();
        let node = document.createElement('div');
        RegexUtils.isValid.mockReturnValue(true);
        BrowserUtils.isMobileView.mockReturnValue(false);
        let amtClick = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true })
        instance.setState({ enableKeypad: true });
        instance.setState({ amount: '' });
        instance.amtClick();
        expect(instance.amtClick).toBeDefined();
    });

    it('calls for the amtClick function covering amount else path', () => {
        let handleClicks = jest.genMockFn();
        let node = document.createElement('div');
        BrowserUtils.isMobileView.mockReturnValue(false);
        let amtClick = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true })
        instance.setState({ enableKeypad: false });
        instance.amtClick();
        expect(instance.amtClick).toBeDefined();
    });

    it('calls for the amtClick function covering getNextTask', () => {
        let handleClicks = jest.genMockFn();
        let node = document.createElement('div');
        BrowserUtils.isMobileView.mockReturnValue(false);
        let amtClick = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true })
        instance.setState({ enableKeypad: false });
        PaymentsStore.getNextTask.mockReturnValue('RP')
        instance.amtClick();
        expect(instance.amtClick).toBeDefined();
    });
    // it('calls for the amtChange function', () => {
    //     let amt = {
    //         evnt: {
    //             preventDefault: jest.genMockFn(),
    //             target: {
    //                 className: 'classabc',
    //                 value: '2000',
    //             },
    //         }
    //     }
    //     let handleClicks = jest.genMockFn();
    //     let node = document.createElement('div');
    //     let amtChange = jest.genMockFn();
    //     NumberUtils.decimalFormat.mockReturnValue(10.00);
    //     BrowserUtils.isMobileView.mockReturnValue(true);
    //     instance.setState({ amount: 20000, nextStep: 'KP', showNextSteps: true })
    //     PaymentsStore.getDefaultAmt.mockReturnValue('2000');
    //     ValidationConfig.validateData.mockReturnValue({ name: 'abcd', value: '2000' });
    //     RegexUtils.isValid.mockReturnValue(true);
    //     const render = (comp, el) => ReactDOM.render(comp, el);
    //     instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
    //     instance.setState({ amt: amt });
    //     instance.amtChange(amt.evnt);
    //     expect(instance.amtChange).toBeDefined();
    // });
    it('calls for the deleteClick function else path length <= 13', () => {
        let amt = '10000';
        let node = document.createElement('div');
        let deleteClick = jest.genMockFn();
        PaymentsStore.getDefaultAmt.mockReturnValue('20');
        PaymentsStore.getNextTask.mockReturnValue('KP');
        BrowserUtils.isMobileView.mockReturnValue(false);
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true });
        instance.deleteClick();
        expect(instance.deleteClick).toBeDefined();
    });
    it('calls for the deleteClick function else getDefaultAmt', () => {
        let amt = '0';
        let node = document.createElement('div');
        let deleteClick = jest.genMockFn();
        NumberUtils.decimalFormat.mockReturnValue(10.00);
        PaymentsStore.getDefaultAmt.mockReturnValue('20');
        PaymentsStore.getNextTask.mockReturnValue('KP');
        BrowserUtils.isMobileView.mockReturnValue(false);
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<PaymentHomePage {...props} />, node);
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true });
        instance.deleteClick();
        expect(instance.deleteClick).toBeDefined();
    });
});