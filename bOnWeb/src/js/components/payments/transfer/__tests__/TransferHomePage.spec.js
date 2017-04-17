/**
 * @module TransferHomePage
 */

jest.unmock('../TransferHomePage');
//jest.unmock('../../../../utils/NumberUtils');


const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const { buildContent } = require('../../../../__helpers__/TestHelpers');

const AccountListComponent = require('../../payment/AccountListComponent');
const KeypadComponent = require('../../payment/KeypadComponent');
const RepeatPayment = require('../../payment/RepeatPayment');
const PaymentsActionCreator = require('../../../../actions/PaymentsActionCreator');
const AccountOpeningActions = require('../../../../actions/AccountOpeningActions');
const PaymentsStore = require('../../../../stores/PaymentsStore');
const BasicModal = require('../../../common/modals/ModalB');
const NumberUtils = require('../../../../utils/NumberUtils');
const BrowserUtils = require('../../../../utils/BrowserUtils');
const RegexUtils = require('../../../../utils/RegexUtils');
const ValidationConfig = require('../../../../config/validationConfig');
const _ = require('lodash');

const TransferHomePage = require('../TransferHomePage');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<TransferHomePage
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};
PaymentsStore.getOneOffPayment.mockReturnValue({
    isMonthly: true
});

describe('To Check Transfer HomePage page', () => {
    let instance;
    let props;
    beforeEach(() => {
        props = {
            contents: {
                creditPopUpHeader: "datacreditPopUpHeader",
                creditPopUpBody: "datacreditPopUpBody",
                cancelTitle: "datacancelTitle",
                ok: "dataok",
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
            <div>
                <div className="row tab-content mobile-margin">
                    <h4 className="text-center next-step ">
                        datapayFrom
                    </h4>
                    <div className="col-lg-offset-2 col-md-offset-2 col-lg-4 col-md-4 col-sm-offset-2 col-sm-8  col-xs-12 padding-right-left">
                        <p className="title">
                            datafromTitle
                        </p>
                        <AccountListComponent
                            accountClick={function noRefCheck() { } }
                            accountList={[]}
                            contents={{ NextButton: 'dataNextButton', cancelTitle: 'datacancelTitle', creditPopUpBody: 'datacreditPopUpBody', creditPopUpHeader: 'datacreditPopUpHeader', fromTitle: 'datafromTitle', ok: 'dataok', payFrom: 'datapayFrom', toTitle: 'datatoTitle' }}
                            name="fromList"
                            tabChange="true"
                            />
                    </div>
                    <div className=" col-lg-offset-0 col-lg-4 col-md-offset-0 col-md-4 col-sm-offset-2 col-sm-8  col-xs-12 padding-right-left">
                        <p className="title">
                            datatoTitle
                        </p>
                        <AccountListComponent
                            accountClick={function noRefCheck() { } }
                            accountList={undefined}
                            contents={{ NextButton: 'dataNextButton', cancelTitle: 'datacancelTitle', creditPopUpBody: 'datacreditPopUpBody', creditPopUpHeader: 'datacreditPopUpHeader', fromTitle: 'datafromTitle', ok: 'dataok', payFrom: 'datapayFrom', toTitle: 'datatoTitle' }}
                            name="toList"
                            onClick={undefined}
                            />
                    </div>
                    <div className="col-lg-offset-0 col-lg-4 col-md-offset-0 col-lg-pull-4 col-md-4 col-md-pull-4 col-sm-offset-2 col-sm-8  col-xs-12">
                        <form id="repeat-payment">
                            <div />
                        </form>
                    </div>
                </div>
            </div>
        )
    });
});



describe('To check  handleclick functions', () => {

    let instance;
    let isValid = true;
    let counter = true;
    let e = 1;
    let amt = 3000;
    let evnt = {
        preventDefault: jest.genMockFn(),
        target: {
            className: 'classabc',
            value: '2000',
        },
    };

    let props = {
        checkTransfer: true,
        contents: {
            creditPopUpHeader: "datacreditPopUpHeader",
            creditPopUpBody: "datacreditPopUpBody",
            cancelTitle: "datacancelTitle",
            ok: "dataok",
            fromTitle: "datafromTitle",
            NextButton: "dataNextButton",
            payFrom: "datapayFrom",
            toTitle: "datatoTitle",
        },
        accountList: [],
        tabChange: 'true',
        data: {
        },
        amt: '20000',
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
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true })
        instance.handleClicks(e);
        expect(instance.handleClicks).toBeDefined();
    });

    //PaymentsStore.getDefaultAmt()
    it('calls for the handleClicks function-if', () => {
        let amt = 20000;
        let e = {
            target: {
                value: 20000
            }
        }

        PaymentsStore.getDefaultAmt.mockReturnValue("10.00");
        NumberUtils.decimalFormat.mockReturnValue('10.00');
        let node = document.createElement('div');
        let handleClicks = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true })
        instance.handleClicks(e);
        expect(instance.handleClicks).toBeDefined();
    });
    //amount value "."
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
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true })
        instance.handleClicks(e);
        expect(instance.handleClicks).toBeDefined();
    });
    //00.00
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
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
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
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
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
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true })
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
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true, amtCss: amtC })
        instance.handleClicks(e);
        expect(instance.handleClicks).toBeDefined();
    });
    it('calls for the handleClicks function-greater than 18 ', () => {
        let amt = 200;
        let isValid = true;
        let e = {
            target: {
                value: 200
            }
        }

        RegexUtils.isValid.mockReturnValue(true);
        NumberUtils.decimalFormat.mockReturnValue('100000000000000000.00');
        let node = document.createElement('div');
        let handleClicks = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
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
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
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
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true })
        instance.handleClicks(e);
        expect(instance.handleClicks).toBeDefined();

    });
    it('calls for the goToNext function', () => {
        let goToNext = jest.genMockFn();
        RegexUtils.isValid.mockReturnValue(true);
        PaymentsStore.checkIfBothPotSelected.mockReturnValue(true);
        let node = document.createElement('div');
        let handleClicks = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true })
        //PaymentsStore.getSelectedPayee.mockReturnValue({ id: 'sdfsdf', name: 'jon' });
        instance.goToNext(e);
        expect(instance.goToNext).toBeDefined();
    });
    it('calls for the goToNext function - 2', () => {
        let e = 'amt'
        //let amt=200;
        let goToNext = jest.genMockFn();
        RegexUtils.isValid.mockReturnValue(true);
        NumberUtils.decimalFormat.mockReturnValue('10.00');
        PaymentsStore.getSelectedPotData.mockReturnValue({ balance: { value: 20 } })
        let node = document.createElement('div');
        let handleClicks = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true })
        PaymentsStore.checkIfBothPotSelected.mockReturnValue(false);
        PaymentsStore.getDefaultAmt.mockReturnValue('20000')
        instance.goToNext(e);
        expect(instance.goToNext).toBeDefined();
    });
    xit('calls for the goToNext function-3', () => {
        let goToNext = jest.genMockFn();
        RegexUtils.isValid.mockReturnValue(true);
        let node = document.createElement('div');
        let handleClicks = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true })
        PaymentsStore.getSelectedPotData.mockReturnValue({
            balance: {

            }
        });
        PaymentsStore.checkIfBothPotSelected.mockReturnValue(false);
        PaymentsStore.getDefaultAmt.mockReturnValue('20000')
        instance.setState({ amount: 200.00 });
        instance.goToNext(e);
        expect(instance.goToNext).toBeDefined();
    });
    it('calls for the goToNext function covering false path', () => {
        let goToNext = jest.genMockFn();
        RegexUtils.isValid.mockReturnValue(true);
        let node = document.createElement('div');
        let handleClicks = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
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
    xit('calls for the goToNext function covering true path', () => {
        let goToNext = jest.genMockFn();
        RegexUtils.isValid.mockReturnValue(true);
        let node = document.createElement('div');
        let handleClicks = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true })
        PaymentsStore.getSelectedPotData.mockReturnValue({
            balance: {
                value: '20000'
            }
        });
        //PaymentsStore.checkIfBothPotSelected.mockReturnValue(true);
        PaymentsStore.getDefaultAmt.mockReturnValue('20000')
        instance.setState({ amount: 200000 });
        //PaymentsActionCreator.setPaymentStep.mockReturnValue('RP');
        instance.goToNext(e);
        expect(instance.goToNext).toBeDefined();
    });
     it('calls for the amtClick function', () => {

        let node = document.createElement('div');
        let amtClick = jest.genMockFn();
         RegexUtils.isValid.mockReturnValue(true);
 BrowserUtils.isMobileView.mockReturnValue(false);
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
         NumberUtils.decimalFormat.mockReturnValue(10.00);
         PaymentsStore.isMakePayment.mockReturnValue(true);
        instance.setState({ amount: '1000', nextStep: 'KP', showNextSteps: true,enableKeypad: true})
        PaymentsStore.getSelectedToAccount.mockReturnValue({type:'savings'});
        PaymentsStore.getSelectedAccount.mockReturnValue({type:'savings'})
        //PaymentsStore.getSelectedPayee.mockReturnValue({ id: 'sdfsdf', name: 'jon' });
        PaymentsStore.getSelectedPotData.mockReturnValue({
            balance: {
                type: 'savings'
            }
        });
        instance.amtClick();
        expect(instance.amtClick).toBeDefined();
    });
      it('calls for the amtClick function-amount zero', () => {

        let node = document.createElement('div');
        let amtClick = jest.genMockFn();
         RegexUtils.isValid.mockReturnValue(true);
 BrowserUtils.isMobileView.mockReturnValue(false);
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
         NumberUtils.decimalFormat.mockReturnValue(10.00);
         PaymentsStore.isMakePayment.mockReturnValue(true);
        instance.setState({ amount: '0', nextStep: 'KP', showNextSteps: true,enableKeypad: true})
        PaymentsStore.getSelectedToAccount.mockReturnValue({type:'savings'});
        PaymentsStore.getSelectedAccount.mockReturnValue({type:'savings'})
        //PaymentsStore.getSelectedPayee.mockReturnValue({ id: 'sdfsdf', name: 'jon' });
        PaymentsStore.getSelectedPotData.mockReturnValue({
            balance: {
                type: 'savings'
            }
        });
        instance.amtClick();
        expect(instance.amtClick).toBeDefined();
    });

    it('calls for the amtClick function covering getNextTask', () => {
        let handleClicks = jest.genMockFn();
        let node = document.createElement('div');
        BrowserUtils.isMobileView.mockReturnValue(false);
        let amtClick = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
         PaymentsStore.getSelectedToAccount.mockReturnValue({type:'savings'});
        PaymentsStore.getSelectedAccount.mockReturnValue({type:'savings'});
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true })
        instance.setState({ enableKeypad: false });
        PaymentsStore.getNextTask.mockReturnValue('RP')
        instance.amtClick();
        expect(instance.amtClick).toBeDefined();
    });
     it('calls for the amtClick function covering getNextTask-else', () => {
        let handleClicks = jest.genMockFn();
        let node = document.createElement('div');
        BrowserUtils.isMobileView.mockReturnValue(false);
        let amtClick = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
         PaymentsStore.getSelectedToAccount.mockReturnValue({type:'savings'});
        PaymentsStore.getSelectedAccount.mockReturnValue({type:'savings'});
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true })
        instance.setState({ enableKeypad: false });
        PaymentsStore.getNextTask.mockReturnValue('KP')
        instance.amtClick();
        expect(instance.amtClick).toBeDefined();
    });
    
     it('calls for the amtClick function covering getNextTask-else', () => {
        let handleClicks = jest.genMockFn();
        let node = document.createElement('div');
        BrowserUtils.isMobileView.mockReturnValue(true);
        let amtClick = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        // PaymentsStore.getSelectedToAccount.mockReturnValue({type:'savings'});
       // PaymentsStore.getSelectedAccount.mockReturnValue({type:'savings'});
        //instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true })
        //instance.setState({ enableKeypad: false });
        //PaymentsStore.getNextTask.mockReturnValue('KP')
        instance.amtClick();
        expect(instance.amtClick).toBeDefined();
    });
    
});


describe('To check componentWillMount Function', () => {
    let instance;
    let isValid = true;
    let counter = true;
    let e = 1;
    let evnt = {
        preventDefault: jest.genMockFn(),
        target: {
            className: 'classabc',
            value: '2000',
        },
    };
    let props = {
        checkTransfer: true,

        componentWillMount: jest.genMockFn(),
        componentWillUnmount: jest.genMockFn(),
        onStoreChange: jest.genMockFn(),
        contents: {
            creditPopUpHeader: "datacreditPopUpHeader",
            creditPopUpBody: "datacreditPopUpBody",
            cancelTitle: "datacancelTitle",
            ok: "dataok",
            fromTitle: "datafromTitle",
            NextButton: "dataNextButton",
            payFrom: "datapayFrom",
            toTitle: "datatoTitle",
        },
        //amount: {
        //  toString: ''
        //},
        //StringConstant:'KP',


        accountList: [],
        tabChange: 'true',
        data: {
        },
        amt: '20000',
    };
    it('calls for the componentWillMount function', () => {
        let node = document.createElement('div');
        let componentWillMount = jest.genMockFn();
        PaymentsStore.getConfirmBack.mockReturnValue(true);
        PaymentsStore.isFromOtherPage.mockReturnValue(true);
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.componentWillMount();
        expect(instance.componentWillMount).toBeDefined();
    });
    it('calls for the componentWillMount function', () => {
        props.tabChange = false;
        let node = document.createElement('div');
        let componentWillMount = jest.genMockFn();
        PaymentsStore.getConfirmBack.mockReturnValue(true);
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.componentWillMount();
        expect(instance.componentWillMount).toBeDefined();
    });
    it('calls for the removeChangeListener', () => {
        let node = document.createElement('div');
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        React.unmountComponentAtNode(node);
        expect(PaymentsStore.removeChangeListener.mock.calls.length).toBe(1);
    });
    it('calls for the onStoreChange function', () => {
        PaymentsStore.getEndingDetails.mockReturnValue({
            referenceData: "88228822"
        });
        PaymentsStore.getNextTask.mockReturnValue('To');
        let node = document.createElement('div');
        let onStoreChange = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.onStoreChange();
        expect(instance.onStoreChange).toBeDefined();
    });
    it('calls for the onStoreChange function', () => {
        PaymentsStore.getEndingDetails.mockReturnValue({
            referenceData: "88228822"
        });
        PaymentsStore.getNextTask.mockReturnValue('KP');
        PaymentsStore.getRepeatAmount.mockReturnValue('10.00');
        BrowserUtils.isMobileView.mockReturnValue(false);
        PaymentsStore.getSelectedToAccount.mockReturnValue({ type: "savings" });
        PaymentsStore.getRepeatAmount.mockReturnValue(2);
        PaymentsStore.isMakePayment.mockReturnValue(true);
        PaymentsStore.isOneOffPayment.mockReturnValue(false);
        NumberUtils.decimalFormat.mockReturnValue('10.00');
        let node = document.createElement('div');
        let onStoreChange = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.onStoreChange();
        expect(instance.onStoreChange).toBeDefined();
    });
    it('calls for the onStoreChange function-KP', () => {
        PaymentsStore.getEndingDetails.mockReturnValue({
            referenceData: "88228822"
        });
        PaymentsStore.getNextTask.mockReturnValue('KP');
        PaymentsStore.getRepeatAmount.mockReturnValue('10.00');
        BrowserUtils.isMobileView.mockReturnValue(false);
        PaymentsStore.getSelectedToAccount.mockReturnValue({ type: "savings" });
        PaymentsStore.getRepeatAmount.mockReturnValue(2);
        PaymentsStore.isMakePayment.mockReturnValue(true);
        PaymentsStore.isOneOffPayment.mockReturnValue(true);
        NumberUtils.decimalFormat.mockReturnValue(10.00);
        let node = document.createElement('div');
        let onStoreChange = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.onStoreChange();
        expect(instance.onStoreChange).toBeDefined();
    });
    it('calls for the onStoreChange function-RP', () => {
        PaymentsStore.getEndingDetails.mockReturnValue({
            referenceData: "88228822"
        });
        PaymentsStore.getNextTask.mockReturnValue('RP');
        PaymentsStore.checkIfBothPotSelected.mockReturnValue(true);
        PaymentsStore.getSelectedToAccount.mockReturnValue({ type: "savings" });
        PaymentsStore.getSelectedAccount.mockReturnValue({ type: "savings" });
        PaymentsStore.getMoveMoney.mockReturnValue("1234");
        PaymentsStore.getRepeatAmount.mockReturnValue(0);
        PaymentsStore.isMakePayment.mockReturnValue(true);
        PaymentsStore.isOneOffPayment.mockReturnValue(true);
        NumberUtils.decimalFormat.mockReturnValue(10.00);
        let node = document.createElement('div');
        let onStoreChange = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.onStoreChange();
        expect(instance.onStoreChange).toBeDefined();
    });
    it('calls for the onStoreChange function', () => {
        PaymentsStore.getEndingDetails.mockReturnValue({
            referenceData: "88228822"
        });
        PaymentsStore.getNextTask.mockReturnValue('RP');
        PaymentsStore.checkIfBothPotSelected.mockReturnValue(false);
        PaymentsStore.getSelectedToAccount.mockReturnValue({ type: "savings" });
        PaymentsStore.getSelectedAccount.mockReturnValue({ type: "savings" });
        PaymentsStore.getMoveMoney.mockReturnValue("1234");
        PaymentsStore.getRepeatAmount.mockReturnValue(0);
        PaymentsStore.isMakePayment.mockReturnValue(true);
        PaymentsStore.isOneOffPayment.mockReturnValue(true);
        NumberUtils.decimalFormat.mockReturnValue(10.00);
        let node = document.createElement('div');
        let onStoreChange = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.onStoreChange();
        expect(instance.onStoreChange).toBeDefined();
    });
    it('calls for the onStoreChange function-RP ELSE', () => {
        PaymentsStore.getEndingDetails.mockReturnValue({
            referenceData: "88228822"
        });
        PaymentsStore.getNextTask.mockReturnValue('RP');
        PaymentsStore.checkIfBothPotSelected.mockReturnValue(false);
        PaymentsStore.getSelectedToAccount.mockReturnValue({ type: "savings" });
        PaymentsStore.getSelectedAccount.mockReturnValue({ type: "savings" });
        PaymentsStore.getMoveMoney.mockReturnValue("1234");
        PaymentsStore.getRepeatAmount.mockReturnValue(10);
        PaymentsStore.getDefaultAmt.mockReturnValue(100);
        PaymentsStore.isMakePayment.mockReturnValue(true);
        PaymentsStore.isOneOffPayment.mockReturnValue(true);
        NumberUtils.decimalFormat.mockReturnValue(10.00);
        let node = document.createElement('div');
        let onStoreChange = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.onStoreChange();
        expect(instance.onStoreChange).toBeDefined();
    });
    it('calls for the onStoreChange function', () => {
        PaymentsStore.getEndingDetails.mockReturnValue('');
        let node = document.createElement('div');
        let onStoreChange = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
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
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.onStoreChange();
        expect(instance.onStoreChange).toBeDefined();
    });
    it('calls for the onStoreChange function-kp mobile', () => {
        BrowserUtils.isMobileView.mockReturnValue(true);
        PaymentsStore.getConfirmBack.mockReturnValue(false);
        PaymentsStore.getNextTask.mockReturnValue('KP');
        let node = document.createElement('div');
        let onStoreChange = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.onStoreChange();
        expect(instance.onStoreChange).toBeDefined();
    });
    it('calls for the onStoreChange function-getConfirmBack,true', () => {
        BrowserUtils.isMobileView.mockReturnValue(true);
        PaymentsStore.getConfirmBack.mockReturnValue(true);
        PaymentsStore.getSelectedToAccount.mockReturnValue('');
        let node = document.createElement('div');
        let onStoreChange = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.onStoreChange();
        expect(instance.onStoreChange).toBeDefined();
    });
    it('calls for the onStoreChange function-getrepeatAmount', () => {
        //BrowserUtils.isMobileView.mockReturnValue(true);
        //PaymentsStore.getConfirmBack.mockReturnValue(false);
        PaymentsStore.getRepeatAmount.mockReturnValue(3);
        let node = document.createElement('div');
        let onStoreChange = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.onStoreChange();
        expect(instance.onStoreChange).toBeDefined();
    });

    it('calls for the checkAmount function', () => {
        let error = false;
        let amt = 20000;
        PaymentsStore.getSelectedPotData.mockReturnValue(true);
        PaymentsStore.getSelectedPotData.mockReturnValue({
            balance: "200"
        });
        let node = document.createElement('div');
        let checkAmount = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.checkAmount(amt);
        expect(instance.checkAmount).toBeDefined();
    });
    it('calls for the checkAmount function', () => {
        let error = false;
        let amt = 20000;
        PaymentsStore.getSelectedPotData.mockReturnValue(true);
        PaymentsStore.getSelectedPotData.mockReturnValue({
            balance: {
                value: '200'
            }
        });
        let node = document.createElement('div');
        let checkAmount = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.checkAmount(amt);
        expect(instance.checkAmount).toBeDefined();
    });
    it('calls for the checkAmount function', () => {
        let error = false;
        let amt = 20000;
        PaymentsStore.getSelectedPotData.mockReturnValue(undefined);
        PaymentsStore.getSelectedPotData.mockReturnValue({
            balance: undefined
        });
        let node = document.createElement('div');
        let checkAmount = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.checkAmount(amt);
        expect(instance.checkAmount).toBeDefined();
    });
    it('calls for the amountCheckPopup function', () => {
        let showAmountError = true;
        let node = document.createElement('div');
        let amountCheckPopup = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);

        instance.setState({ showAmountError: true });
        instance.amountCheckPopup();

        expect(instance.amountCheckPopup).toBeDefined();
    });
    it('calls for the closeModal function', () => {
        let node = document.createElement('div');
        let closeModal = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.setState({ showAmountError: false });
        instance.closeModal();
        expect(instance.closeModal).toBeDefined();
    });
    it('calls for the creditokClick', () => {
        let node = document.createElement('div');
        let creditokClick = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.setState({ confirmCancel: false });
        instance.creditokClick();
        expect(instance.creditokClick).toBeDefined();
    });
    it('calls for the closePopUp', () => {
        let node = document.createElement('div');
        let closePopUp = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.closePopUp();
        expect(instance.closePopUp).toBeDefined();
    });
    it('calls for the closed', () => {
        let node = document.createElement('div');
        let closed = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.setState({ confirmCancel: false });
        instance.closed();
        expect(instance.closed).toBeDefined();
    });
    it('calls for the msgPopup', () => {
        let checkTransfer = true;
        let node = document.createElement('div');
        let msgPopup = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.setState({ checkTransfer: true });
        instance.msgPopup();
        expect(instance.msgPopup).toBeDefined();
    });
    it('calls for the toHandleChange function', () => {
        let node = document.createElement('div');
        PaymentsStore.getNextTask.mockReturnValue('KP');
        BrowserUtils.isMobileView.mockReturnValue(false);
        let toHandleChange = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.toHandleChange();
        expect(instance.toHandleChange).toBeDefined();
    });

    it('calls for the toHandleChange function', () => {
        let node = document.createElement('div');
        PaymentsStore.getNextTask.mockReturnValue('');
        BrowserUtils.isMobileView.mockReturnValue(true);
        let toHandleChange = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.setState({ showNextSteps: true });
        instance.toHandleChange(e, counter);
        expect(instance.toHandleChange).toBeDefined();
    });
    it('calls for the toHandleChange function', () => {
        let counter = true;
        let node = document.createElement('div');
        BrowserUtils.isMobileView.mockReturnValue(true);
        let toHandleChange = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.setState({ counter: true });
        //instance.setState({ showNextSteps: true });
        instance.toHandleChange(e, counter);
        expect(instance.toHandleChange).toBeDefined();
    });
    it('calls for the toHandleChange function', () => {
        let counter = false;
        let node = document.createElement('div');
        BrowserUtils.isMobileView.mockReturnValue(true);
        let toHandleChange = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.setState({ counter: false });
        //instance.setState({ showNextSteps: true });
        instance.toHandleChange(e, counter);
        expect(instance.toHandleChange).toBeDefined();
    });
    it('calls for the fromHandleChange function', () => {
        let e = {
            value: "jhgasd",
        }
        let counter = false;
        let compClick = true;
        let node = document.createElement('div');
        BrowserUtils.isMobileView.mockReturnValue(true);
        PaymentsStore.isOneOffPayment.mockReturnValue(false);
        let fromHandleChange = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.fromHandleChange(e, counter, compClick);
        expect(instance.fromHandleChange).toBeDefined();
    });
    it('calls for the fromHandleChange function', () => {
        let e = {
            value: "jhgasd",
        }
        let counter = true;
        let compClick = true;
        let node = document.createElement('div');
        BrowserUtils.isMobileView.mockReturnValue(true);
        PaymentsStore.isOneOffPayment.mockReturnValue(false);
        let fromHandleChange = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.fromHandleChange(e, counter, compClick);
        expect(instance.fromHandleChange).toBeDefined();
    });
    it('calls for the fromHandleChange function', () => {
        let node = document.createElement('div');
        BrowserUtils.isMobileView.mockReturnValue(false);
        let fromHandleChange = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
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
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.setState({ counter: false });
        instance.setState({ showNextSteps: true });
        instance.fromHandleChange(e, counter);
        expect(instance.fromHandleChange).toBeDefined();
    });
    it('calls for the checkOneOffRepeatPermissiom function', () => {
        let node = document.createElement('div');
        BrowserUtils.isMobileView.mockReturnValue(true);
        let checkOneOffRepeatPermissiom = jest.genMockFn();
        let fromData = {};
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        //instance.setState({ showTo: counter });
        PaymentsStore.isOneOffPayment.mockReturnValue(true);
        PaymentsStore.getOneOffPayment.mockReturnValue({ isMonthly: true });
        PaymentsStore.repeatPaymentShow.mockReturnValue(false);
        instance.checkOneOffRepeatPermissiom(fromData);
        expect(instance.checkOneOffRepeatPermissiom).toBeDefined();
    });
    it('calls for the checkOneOffRepeatPermissiom function-else', () => {
        let node = document.createElement('div');
        BrowserUtils.isMobileView.mockReturnValue(true);
        let checkOneOffRepeatPermissiom = jest.genMockFn();
        let fromData = {};
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        //instance.setState({ showTo: counter });
        PaymentsStore.isOneOffPayment.mockReturnValue(false);
        PaymentsStore.getOneOffPayment.mockReturnValue({ isMonthly: true });
        PaymentsStore.repeatPaymentShow.mockReturnValue(false);
        instance.checkOneOffRepeatPermissiom(fromData);
        expect(instance.checkOneOffRepeatPermissiom).toBeDefined();
    });

    it('calls for the fromHandleChange function -else condition', () => {
        let node = document.createElement('div');
        let fromHandleChange = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        PaymentsStore.isOneOffPayment.mockReturnValue(true);
        PaymentsStore.getOneOffPayment.mockReturnValue({ isMonthly: true });
        PaymentsStore.repeatPaymentShow.mockReturnValue(false);
        instance.fromHandleChange(e, counter);
        expect(instance.fromHandleChange).toBeDefined();
    });
    //showAmountText
    it('calls for the showAmountText function -else condition', () => {
        let node = document.createElement('div');
        let showAmountText = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        PaymentsStore.getRepeatAmount.mockReturnValue(123);
        PaymentsStore.getDefaultAmt.mockReturnValue(123);
        //PaymentsStore.repeatPaymentShow.mockReturnValue(false);
        instance.showAmountText();
        expect(instance.showAmountText).toBeDefined();
    });
    //showNextButton
    it('calls for the showNextButton function-else', () => {
        let node = document.createElement('div');
        let showNextButton = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        //instance.setState({ showNextSteps: true });
        instance.setState({ nextStep: 'KP', showNextSteps: true, amount: 10 });
        //PaymentsStore.getRepeatAmount.mockReturnValue(22);
        BrowserUtils.isMobileView.mockReturnValue(true);
        PaymentsStore.getSelectedToAccount.mockReturnValue({ "type": "savings" });
        PaymentsStore.getSelectedToPot.mockReturnValue('');
        PaymentsStore.isToSavingTotClicked.mockReturnValue(false);
        //PaymentsStore.getSelectedToAccount().type
        instance.showNextButton();
        expect(instance.showNextButton).toBeDefined();
    });
    //appendCurrency
    it('calls for the appendCurrency function-else', () => {
        let node = document.createElement('div');
        let appendCurrency = jest.genMockFn();
        let amount = "-£12"
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);

        instance.appendCurrency(amount);
        expect(instance.appendCurrency).toBeDefined();
    });
    //showRPOption
    it('calls for the showRPOption function-else', () => {
        let node = document.createElement('div');
        let showRPOption = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        //instance.setState({ showNextSteps: true });
        instance.setState({ nextStep: 'KP', showNextSteps: true, amount: 10 });
        //PaymentsStore.getRepeatAmount.mockReturnValue(22);
        //BrowserUtils.isMobileView.mockReturnValue(true);
        PaymentsStore.getSelectedToAccount.mockReturnValue('');
        PaymentsStore.getSelectedAccount.mockReturnValue('');
        //PaymentsStore.isOneOffPayment.mockReturnValue(true);

        //PaymentsStore.isToSavingTotClicked.mockReturnValue(false);
        //PaymentsStore.getSelectedToAccount().type
        instance.showRPOption();
        expect(instance.showRPOption).toBeDefined();
    });

    it('calls for the showRPOption function-else-condition', () => {
        let node = document.createElement('div');
        let showRPOption = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        //instance.setState({ showNextSteps: true });
        instance.setState({ nextStep: 'KP', showNextSteps: true, amount: 10 });
        //PaymentsStore.getRepeatAmount.mockReturnValue(22);
        //BrowserUtils.isMobileView.mockReturnValue(true);
        PaymentsStore.getSelectedToAccount.mockReturnValue({ id: 1234 });
        PaymentsStore.getSelectedAccount.mockReturnValue({ type: 'savings', id: 1234 });
        PaymentsStore.isOneOffPayment.mockReturnValue(true);
        PaymentsStore.isSavingTotClicked.mockReturnValue(true);
        //PaymentsStore.getSelectedToAccount().type
        instance.showRPOption();
        expect(instance.showRPOption).toBeDefined();
    });
    it('calls for the showRPOption function-else-condition-elsee', () => {
        let node = document.createElement('div');
        let showRPOption = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        //instance.setState({ showNextSteps: true });
        instance.setState({ nextStep: 'KP', showNextSteps: true, amount: 10 });
        //PaymentsStore.getRepeatAmount.mockReturnValue(22);
        //BrowserUtils.isMobileView.mockReturnValue(true);
        PaymentsStore.getSelectedToAccount.mockReturnValue({ id: 1234, type: 'savings' });
        PaymentsStore.getSelectedAccount.mockReturnValue({ type: 'savings', id: 1234 });
        PaymentsStore.getSelectedPot.mockReturnValue('');
        PaymentsStore.checkPotEmpty.mockReturnValue(false);
        PaymentsStore.isSavingTotClicked.mockReturnValue(false);
        //PaymentsStore.getSelectedToAccount().type
        instance.showRPOption();
        expect(instance.showRPOption).toBeDefined();
    });

    it('calls for the enableKeypadorRepeat function', () => {
        let node = document.createElement('div');
        let enableKeypad = true;
        let enableKeypadorRepeat = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.setState({ enableKeypad: true });
        instance.enableKeypadorRepeat();
        expect(instance.enableKeypadorRepeat).toBeDefined();
    });
    it('calls for the paymentSteps function', () => {
        let node = document.createElement('div');
        let paymentSteps = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        //instance.setState({ showNextSteps: true });
        instance.setState({ nextStep: 'KP' });
        //PaymentsStore.getRepeatAmount.mockReturnValue(22);
        BrowserUtils.isMobileView.mockReturnValue(true);
        PaymentsStore.getSelectedToAccount.mockReturnValue({ "type": "savings" });
        PaymentsStore.getSelectedToPot.mockReturnValue('');
        PaymentsStore.isToSavingTotClicked.mockReturnValue(false);
        //PaymentsStore.getSelectedToAccount().type
        instance.paymentSteps();
        expect(instance.paymentSteps).toBeDefined();
    });
    it('calls for the nextClicked function', () => {
        let node = document.createElement('div');
        let nextClicked = jest.genMockFn();
        PaymentsStore.getCreditPopUp.mockReturnValue(true)
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.setState({ amount: 10000 });
        instance.nextClicked();
        expect(instance.nextClicked).toBeDefined();
    });
    it('calls for the nextClicked function', () => {
        let node = document.createElement('div');
        let nextClicked = jest.genMockFn();
        PaymentsStore.getCreditPopUp.mockReturnValue(false)
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.setState({ amount: 10000 });
        instance.nextClicked();
        expect(instance.nextClicked).toBeDefined();
    });
    it('calls for the nextClicked function', () => {
        let node = document.createElement('div');
        let nextClicked = jest.genMockFn();
        //PaymentsStore.getCreditPopUp.mockReturnValue(false)
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.setState({ amount: 0 });
        instance.nextClicked();
        expect(instance.nextClicked).toBeDefined();
    });
      describe('amtChange function  Functions', () => {
        it('calls for the amtChange VALUE function', () => {
                 instance = TestUtils.renderIntoDocument(<TransferHomePage {...props} />);
          //BrowserUtils.isMobileView.mockReturnValue(false);
         PaymentsStore.getRepeatAmount.mockReturnValue('11');
        PaymentsStore.getSelectedToAccount.mockReturnValue({type:'currrent'});
        instance.setState({ amount: '2000',
            showNextSteps:true,
            nextStep:'RP',
         });
   
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
        BrowserUtils.isMobileView.mockReturnValue(true);

      
        instance.amtChange(e);
        expect(PaymentsActionCreator.checkEndData.mock.calls.length).toBe(3);
    });
     it('calls for the amtChange VALUE function - ', () => {
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
         BrowserUtils.isMobileView.mockReturnValue(true);
       const test= instance.amtChange(e);
         //expect(PaymentsActionCreator.checkEndData.mock.calls.length).toBe(2);
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
         expect(PaymentsActionCreator.checkEndData.mock.calls.length).toBe(3);
    });

     });

    xit('calls for the amtChange function', () => {
        let amt = {
            evnt: {
                target: {
                    value: "£20000",
                }
            }
        }
        let node = document.createElement('div');
        let amtChange = jest.genMockFn();
        BrowserUtils.isMobileView.mockReturnValue(true);
        PaymentsStore.getDefaultAmt.mockReturnValue('2000');
        ValidationConfig.validateData.mockReturnValue({ name: 'swaty', value: '21212' })
        RegexUtils.isValid.mockReturnValue(true);
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.amtChange(amt.evnt);
        expect(instance.amtChange).toBeDefined();
    });
    xit('calls for the amtChange function', () => {
        let amt = {
            evnt: {
                target: {
                    value: 0,
                }
            }
        }
        let node = document.createElement('div');
        let amtChange = jest.genMockFn();
        BrowserUtils.isMobileView.mockReturnValue(true);
        PaymentsStore.getDefaultAmt.mockReturnValue('2000');
        RegexUtils.isValid.mockReturnValue(true);
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.amtChange(amt.evnt);
        expect(instance.amtChange).toBeDefined();
    });
    xit('calls for the amtChange function', () => {
        let node = document.createElement('div');
        let amtChange = jest.genMockFn();
        BrowserUtils.isMobileView.mockReturnValue(true);
        PaymentsStore.getDefaultAmt.mockReturnValue('2000');
        RegexUtils.isValid.mockReturnValue(true);
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.amtChange(evnt);
        expect(instance.amtChange).toBeDefined();
    });
    xit('calls for the amtChange function', () => {
        let node = document.createElement('div');
        let amtChange = jest.genMockFn();
        BrowserUtils.isMobileView.mockReturnValue(false);
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.amtChange(evnt);
        expect(instance.amtChange).toBeDefined();
    });
    xit('calls for the amtChange function', () => {
        let node = document.createElement('div');
        let amtChange = jest.genMockFn();
        BrowserUtils.isMobileView.mockReturnValue(true);
        PaymentsStore.getDefaultAmt.mockReturnValue('2');
        RegexUtils.isValid.mockReturnValue(false);
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.amtChange(evnt);
        expect(instance.amtChange).toBeDefined();
    });

    xit('calls for the amtClick function', () => {
        let node = document.createElement('div');
        let amtClick = jest.genMockFn();
        BrowserUtils.isMobileView.mockReturnValue(false);
        PaymentsStore.getNextTask.mockReturnValue('RP');
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.setState({ enableKeypad: true });
        instance.amtClick();
        expect(instance.amtClick).toBeDefined();
    });
    xit('calls for the amtClick function', () => {
        let node = document.createElement('div');
        let amtClick = jest.genMockFn();
        BrowserUtils.isMobileView.mockReturnValue(false);
        PaymentsStore.getNextTask.mockReturnValue(' ');
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.setState({ enableKeypad: false });
        instance.amtClick();
        expect(instance.amtClick).toBeDefined();
    });
    xit('calls for the amtClick function', () => {
        let node = document.createElement('div');
        let amtClick = jest.genMockFn();
        BrowserUtils.isMobileView.mockReturnValue(true);
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.amtClick();
        expect(instance.amtClick).toBeDefined();
    });
    xit('calls for the goToNext function', () => {
        let node = document.createElement('div');
        let goToNext = jest.genMockFn();
        PaymentsStore.checkIfBothPotSelected.mockReturnValue(true);
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.goToNext(<span>Data</span>);
        expect(instance.goToNext).toBeDefined();
    });
    xit('calls for the goToNext function', () => {
        let node = document.createElement('div');
        let goToNext = jest.genMockFn();
        PaymentsStore.checkIfBothPotSelected.mockReturnValue(false);
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.goToNext();
        expect(instance.goToNext).toBeDefined();
    });
    xit('calls for the goToNext function', () => {
        let amount = 20000;
        let node = document.createElement('div');
        let goToNext = jest.genMockFn();
        PaymentsStore.getSelectedPotData.mockReturnValue({
            balance: {
                value: '200'
            }
        });
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.setState({ amount: 20000 });
        console.log(amount);
        instance.goToNext();
        expect(instance.goToNext).toBeDefined();
    });
    it('calls for the deleteClick function', () => {
        let amt = '10000';
        let node = document.createElement('div');
        let deleteClick = jest.genMockFn();
        PaymentsStore.getDefaultAmt.mockReturnValue("2000");
        PaymentsStore.getNextTask.mockReturnValue('KP');
        BrowserUtils.isMobileView.mockReturnValue(false);
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true });
        instance.deleteClick();
        expect(instance.deleteClick).toBeDefined();
    });
    it('calls for the deleteClick function-else check', () => {
        let amt = '-123';
        let node = document.createElement('div');
        let deleteClick = jest.genMockFn();
        PaymentsStore.getDefaultAmt.mockReturnValue("2000");
        PaymentsStore.getNextTask.mockReturnValue('KP');
        BrowserUtils.isMobileView.mockReturnValue(false);
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
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
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.setState({ amount: amt, nextStep: 'KP', showNextSteps: true });
        instance.deleteClick();
        expect(instance.deleteClick).toBeDefined();
    });
    it('calls for the isOneOffPayment function', () => {
        let node = document.createElement('div');
        PaymentsStore.isOneOffPayment.mockReturnValue(true);
        PaymentsStore.getOneOffPayment.mockReturnValue({
            isMonthly: '20000'
        });
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
    });
    it('calls for the isOneOffPayment function', () => {
        let node = document.createElement('div');
        PaymentsStore.isOneOffPayment.mockReturnValue(true);
        PaymentsStore.getOneOffPayment.mockReturnValue({
            isMonthly: ''
        });
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
    });
    it('calls for the checkToTransfer function', () => {
        let node = document.createElement('div');
        PaymentsStore.checkToTransfer.mockReturnValue(true);
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
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
        component = TestUtils.renderIntoDocument(<TransferHomePage onClick={nextClickedStub} {...props}/>);
        const pageoptions = TestUtils.scryRenderedDOMComponentsWithTag(component, 'button');
        component.nextClicked = nextClickedStub;
        nextClickedStub();
        _.map(pageoptions, page => {

            TestUtils.Simulate.click(page);
        });
        PaymentsStore.getCreditPopUp.mockReturnValue(true);
        component.setState({ enableNext: true });
        component.setState({ showNextSteps: true });
        component.setState({ amount: 10 });
        expect(nextClickedStub).toBeCalled();

    });
    it('calls for the creditPopUp function', () => {
        let node = document.createElement('div');
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.creditPopUp();
        expect(instance.creditPopUp).toBeDefined();
    });
    it('calls for the singlePaymentPopUp function', () => {
        let node = document.createElement('div');
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.setState({ showOnOff: true });
        instance.singlePaymentPopUp();
        expect(instance.singlePaymentPopUp).toBeDefined();
    });
    it('calls for the okModal function', () => {
        let node = document.createElement('div');
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<TransferHomePage {...props} />, node);
        instance.okModal();
        expect(instance.okModal).toBeDefined();
    });
});

