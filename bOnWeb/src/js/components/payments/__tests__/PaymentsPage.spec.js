'use strict';

jest.unmock('../PaymentsPage');
jest.mock('../payment/PaymentHomePage');
jest.mock('../transfer/TransferHomePage');
//jest.mock('../../../stores/PaymentsStore');
jest.unmock('../../../../static/config');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const Helmet = require('react-helmet');
const PaymentsStore = require('../../../stores/PaymentsStore');
const PaymentsActionCreator = require('../../../actions/PaymentsActionCreator');
const PaymentsPage = require('../PaymentsPage');
const PaymentHomePage = require('../payment/PaymentHomePage');
const TransferHomePage = require('../transfer/TransferHomePage');
const HeaderComponent = require('../../common/HeaderComponent');
const MobileOverlay = require('../../common/MobileOverlay');
const Nav = require('react-bootstrap/lib/Nav');
const NavItem = require('react-bootstrap/lib/NavItem');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<PaymentsPage
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};
PaymentsStore.getFromAccounts.mockReturnValue({ accounts: 'undefined' });
describe('PaymentsPage Cases', () => {
    describe('PaymentsPage render method', () => {
        let instance;
        let props;

        beforeEach(() => {
            props = {
                content: {
                    managePayments: 'managePayments',
                    managePayeeLink: 'managePayee',
                    paymentLink: 'payment',
                    transferLink: 'transfer',
                },
                data: {
                },
            };

            instance = shallowRender(props);
        });

        xit('should render the PaymentsPage', () => {

            expect(instance).toEqualJSX(
                <div className="b container-fluid-full">
                    <Helmet title="Payments" />
                    <HeaderComponent selectedTab="payments" {...props} openFaq={function noRefCheck() {}}/>
                    <div className="main-container ">
                        <div className="scroll-wrapper">
                            <div className="payments content-wrapper">
                                <MobileOverlay
                                   content={{managePayeeLink: 'managePayee', managePayments: 'managePayments', paymentLink: 'payment', transferLink: 'transfer'}}
                                   managePayeeClick={function noRefCheck() {}}
                                   managePaymentClick={function noRefCheck() {}}
                                   openFaq={function noRefCheck() {}}
                                   selectedTab="payments"
                                 />
                                <div className="row  line-seperator">
                                    <div className="col-lg-4 col-md-4 col-sm-0 col-xs-0">

                                        <a className="page-options opt-green float-left" onClick={jest.fn() }>
                                            <span className="icon icon-your-payments"></span>managePayments</a>
                                    </div>

                                     <div className="col-lg-4 col-lg-offset-0 col-md-4 col-md-offset-0 col-sm-6 col-sm-offset-3 col-xs-12  col-xs-offset-0 text-center">

                                        <a className="page-options opt-green float-right" onClick={jest.fn() }>
                                            <span className="icon icon-payees"></span>managePayee</a>
                                    </div>

                                    <div className="col-lg-4 col-lg-pull-4 col-md-4 col-md-pull-4 col-sm-4 col-sm-pull-4 text-center">
                                        <Nav justified activeKey={1} onSelect={jest.fn() }>
                                            <NavItem eventKey={1} href="#payment">payment</NavItem>
                                            <NavItem eventKey={2} href="#transfer">transfer</NavItem>
                                        </Nav>
                                            <a
                                             className="page-options opt-green float-right"
                                             onClick={function noRefCheck() {}}
                                           >
                                             <span className="icon icon-payees" />
                                             managePayee
                                           </a>
                                         </div>
                                         <div className="col-lg-4 col-lg-pull-4 col-md-4 col-md-pull-4 col-sm-4 col-sm-pull-4 text-center">
    

   content={{managePayeeLink: 'managePayee', managePayments: 'managePayments', paymentLink: 'payment', transferLink: 'transfer'}}
   managePayeeClick={function noRefCheck() {}}
   managePaymentClick={function noRefCheck() {}}
   openFaq={function noRefCheck() {}}
   selectedTab="payments"
 />

                                    </div>


                                </div>
                                <div />
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    });

    describe('PaymentsPage life cycle event ', () => {
        let props, component;
        let renderImage = jest.genMockFn();

        beforeEach(() => {
            props = {
                content: {
                    managePayments: 'managePayments',
                    managePayeeLink: 'managePayee',
                    paymentLink: 'payment',
                    transferLink: 'transfer',
                },
                data: {
                },
            };

            component = TestUtils.renderIntoDocument(
                <PaymentsPage  {...props}	/>
            );
        });

        xit('should call Will Mount method', () => {
            component.setState({ accountList: [] })
            component.componentWillMount();
            expect(PaymentsActionCreator.getFromAccountList).toBeCalled();
        });

        it('handles componentWillUnmount click', () => {
            component = TestUtils.renderIntoDocument(
                <PaymentsPage  {...props}	/>
            );
            component.componentWillUnmount();
            expect(PaymentsStore.removeChangeListener).toBeCalled();

        });
        //openFaq
        it('handles openFaq click', () => {
            component = TestUtils.renderIntoDocument(
                <PaymentsPage  {...props}	/>
            );
            component.openFaq();
            //expect(PaymentsStore.removeChangeListener).toBeCalled();

        });

         it('handles openFaq click', () => {
            component = TestUtils.renderIntoDocument(
                <PaymentsPage  {...props}	/>
            );
            component.closeFaq();
            //expect(PaymentsStore.removeChangeListener).toBeCalled();

        });

        it('handles onStore Change ', () => {
            component = TestUtils.renderIntoDocument(
                <PaymentsPage  {...props}	/>
            );

            PaymentsStore.getFromAccounts.mockReturnValue({
                accounts: []
            });
            PaymentsStore.getAllPayees.mockReturnValue({
                beneficiaries: []
            });
            PaymentsStore.getToAccounts.mockReturnValue({
                accounts: []
            });

            component.onStoreChange();
            expect(component.state.pageLoad).toBeTruthy();

        });

        it('handles onStore Change else condition', () => {
            component = TestUtils.renderIntoDocument(
                <PaymentsPage  {...props}	/>
            );

            PaymentsStore.getFromAccounts.mockReturnValue({
                accounts: []
            });
            PaymentsStore.getAllPayees.mockReturnValue({
                beneficiaries: []
            });
            PaymentsStore.getToAccounts.mockReturnValue({
                accounts: []
            });

            // PaymentsStore.setPaymentType(false);
            PaymentsStore.getPaymentType.mockReturnValue(false);

            component.onStoreChange();
            expect(component.state.pageLoad).toBeTruthy();

        });
        it('handles onStore Change tab change ', () => {
            component = TestUtils.renderIntoDocument(
                <PaymentsPage  {...props}	/>
            );

            PaymentsStore.getFromAccounts.mockReturnValue({
                accounts: []
            });
            PaymentsStore.getAllPayees.mockReturnValue({
                beneficiaries: []
            });
            PaymentsStore.getToAccounts.mockReturnValue({
                accounts: []
            });

            PaymentsStore.getTabChanged.mockReturnValue(false);
            PaymentsStore.getNextTask.mockReturnValue('From');

            component.onStoreChange();
            expect(component.state.tabChange).not.toBeTruthy();

        });
        it('handles onStore Change set active key', () => {
            component = TestUtils.renderIntoDocument(
                <PaymentsPage  {...props}	/>
            );

            PaymentsStore.getFromAccounts.mockReturnValue({
                accounts: []
            });
            PaymentsStore.getAllPayees.mockReturnValue({
                beneficiaries: []
            });
            PaymentsStore.getToAccounts.mockReturnValue({
                accounts: []
            });

            PaymentsStore.getPaymentType.mockReturnValue(true);

            component.onStoreChange();
            expect(component.state.activeKey).toBe(2);

        });
    });
    describe('PaymentsPage header click  ', () => {
        let props, component;
        let renderImage = jest.genMockFn();

        beforeEach(() => {
            props = {
                content: {
                    managePayments: 'managePayments',
                    managePayeeLink: 'managePayee',
                    paymentLink: 'payment',
                    transferLink: 'transfer',
                },
                data: {
                },
            };

            component = TestUtils.renderIntoDocument(
                <PaymentsPage  {...props}	/>
            );
        });

        it('should open manage payee', () => {
            component.managePayeeClick();
            expect(PaymentsActionCreator.navigateToWebTask).toBeCalled();
        });

        it('should open manage payment and call navigateToWebTask', () => {
            component.managePaymentClick();
            expect(PaymentsActionCreator.navigateToWebTask).toBeCalled();
        });
        it('should open manage payment and call getReadMandateAccount', () => {
            component.managePaymentClick();
            expect(PaymentsStore.getReadMandateAccount).toBeCalled();
        });

    });

    describe('PaymentsPage payment/tarnsfer tab click  ', () => {
        let props, component;
        let renderImage = jest.genMockFn();

        beforeEach(() => {
            props = {
                content: {
                    managePayments: 'managePayments',
                    managePayeeLink: 'managePayee',
                    paymentLink: 'payment',
                    transferLink: 'transfer',
                },
                data: {
                },
            };

            component = TestUtils.renderIntoDocument(
                <PaymentsPage  {...props}	/>
            );
        });

        it('should select payment', () => {

            component.handleSelect(1);
            expect(PaymentsActionCreator.selectedPaymentType).toBeCalled();
        });

        it('should select tarnsfer', () => {
            component.handleSelect(2);
            expect(PaymentsActionCreator.selectedPaymentType).toBeCalled();
        });
        it('should select transfer for From step', () => {
            PaymentsStore.getNextTask.mockReturnValue('From');
            //PaymentsStore.getNextTask();
            component.handleSelect(2);
            expect(PaymentsActionCreator.selectedPaymentType).toBeCalled();
        });

        it('should select transfer other then From step', () => {
            PaymentsStore.getNextTask.mockReturnValue('To');
            PaymentsStore.isOneOffPayment.mockReturnValue(true)
            //PaymentsStore.getNextTask();
            component.handleSelect(2);
            expect(PaymentsActionCreator.setTabChanged).toBeCalled();
        });

    });


    describe('PaymentsPage backToSavingsPot', () => {
        let props, component;
        let renderImage = jest.genMockFn();

        beforeEach(() => {
            props = {
                content: {
                    managePayments: 'managePayments',
                    managePayeeLink: 'managePayee',
                    paymentLink: 'payment',
                    transferLink: 'transfer',
                },
                data: {
                },
            };

            component = TestUtils.renderIntoDocument(
                <PaymentsPage  {...props}	/>
            );
        });

        it('should navigate to saving pot', () => {
            component.backToSavingsPot()
            expect(PaymentsActionCreator.navigateToWebTask).toBeCalled();
        });

    });

    describe('check oneOff payment scenario', () => {
        let props, component;
        let renderImage = jest.genMockFn();

        beforeEach(() => {
            props = {
                content: {
                    managePayments: 'managePayments',
                    managePayeeLink: 'managePayee',
                    paymentLink: 'payment',
                    transferLink: 'transfer',
                },
                data: {
                },
            };

            component = TestUtils.renderIntoDocument(
                <PaymentsPage  {...props}	/>
            );
        });

        it('should renderPageLinks for one of payment', () => {
            PaymentsStore.isOneOffPayment.mockReturnValueOnce({ spendingData: {} })
            component.renderPageLinks();
            expect(PaymentsActionCreator.navigateToWebTask).toBeCalled();
        });

        it('should not renderPageLinks for one of payment', () => {
            PaymentsStore.isOneOffPayment.mockReturnValueOnce({})
            component.renderPageLinks();
            expect(PaymentsActionCreator.navigateToWebTask).toBeCalled();
        });

    });

    describe('to get payee list', () => {
        let props, component;
        let renderImage = jest.genMockFn();

        beforeEach(() => {
            props = {
                content: {
                    managePayments: 'managePayments',
                    managePayeeLink: 'managePayee',
                    paymentLink: 'payment',
                    transferLink: 'transfer',
                },
                data: {
                },
            };

            component = TestUtils.renderIntoDocument(
                <PaymentsPage  {...props}	/>
            );
        });

        it('should return payee list', () => {
            PaymentsStore.getAllPayees.mockReturnValue({
                beneficiaries: []
            });
            component.getPayeeList();
            expect(PaymentsActionCreator.getFromPayeeList).toBeCalled();
        });

    });

    describe('to getInitialState', () => {
        let props, component;
        let renderImage = jest.genMockFn();

        beforeEach(() => {
            props = {
                content: {
                    managePayments: 'managePayments',
                    managePayeeLink: 'managePayee',
                    paymentLink: 'payment',
                    transferLink: 'transfer',
                },
                data: {
                },
            };

            component = TestUtils.renderIntoDocument(
                <PaymentsPage  {...props}	/>
            );
        });

        it('intial state should be called', () => {
            component = TestUtils.renderIntoDocument(
                <PaymentsPage  {...props}	/>
            );

            PaymentsStore.getFromAccounts.mockReturnValue({
                accounts: []
            });
            PaymentsStore.getAllPayees.mockReturnValue({
                beneficiaries: []
            });
            PaymentsStore.getToAccounts.mockReturnValue({
                accounts: []
            });

            // PaymentsStore.setPaymentType(false);
            PaymentsStore.getPaymentType.mockReturnValue(false);
            component.getInitialState();

            expect(component.state.nextStep).toBe('From');

        });
    });

    describe('type of payment load', () => {
        let props, component;
        let renderImage = jest.genMockFn();

        beforeEach(() => {
            props = {
                content: {
                    managePayments: 'managePayments',
                    managePayeeLink: 'managePayee',
                    paymentLink: 'payment',
                    transferLink: 'transfer',
                    loadingPaymentText: 'payments loading...'
                },
                data: {
                },
            };

            component = TestUtils.renderIntoDocument(
                <PaymentsPage  {...props}	/>
            );
        });

        xit('should be render transfer component', () => {
            component = TestUtils.renderIntoDocument(
                <PaymentsPage  {...props}	/>
            );
            component.setState({ pageLoad: true, transfer: true })

            let transferHomePage = TestUtils.renderIntoDocument(
                <TransferHomePage  {...props}	/>
            );


            expect(transferHomePage).toBeDefined();

        });

        xit('should be render payment component', () => {
            component = TestUtils.renderIntoDocument(
                <PaymentsPage  {...props}	/>
            );

            component.setState({ pageLoad: true, transfer: false })

            let paymentHomePage = TestUtils.renderIntoDocument(
                <PaymentHomePage   {...props}	/>
            );


            expect(paymentHomePage).toBeDefined();

        });

        it('should run closeModal fxn', () => {
            component = TestUtils.renderIntoDocument(
                <PaymentsPage  {...props}	/>
            );

            // component.setState({ pageLoad: true, transfer: false })

            // let paymentHomePage = TestUtils.renderIntoDocument(
            //     <PaymentHomePage   {...props}	/>
            // );

            component.closeModal();

            //  expect(paymentHomePage).toBeDefined();

        });

        it('should run showPayeePopUp fxn', () => {


            component = TestUtils.renderIntoDocument(
                <PaymentsPage  {...props}	/>
            );
            component.setState({ showPayee: true });

            component.showPayeePopUp();
        });

        xit('calls for the removeChangeListener', () => {
            let node = document.createElement('div');
            const render = (comp, el) => ReactDOM.render(comp, el);
            component = ReactDOM.render(<PaymentsPage {...props} />, node);
            React.unmountComponentAtNode(node);
            expect(PaymentsStore.removeChangeListener.mock.calls.length).toBe(1);
        });

    });


});