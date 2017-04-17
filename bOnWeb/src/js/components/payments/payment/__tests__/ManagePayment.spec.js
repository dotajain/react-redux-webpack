/**
 * @module ManagePayment
 */

jest.unmock('../ManagePayment');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const { buildContent } = require('../../../../__helpers__/TestHelpers');


const Helmet = require('react-helmet');
const PaymentsStore = require('../../../../stores/PaymentsStore');
const PaymentsActionCreator = require('../../../../actions/PaymentsActionCreator');
const Nav = require('react-bootstrap/lib/Nav');
const NavItem = require('react-bootstrap/lib/NavItem');
const BDataGrid = require('../../../common/datagrid/BDataGrid');
const EditComponentPayment = require('../EditComponentPayment');
const BrowserUtils = require('../../../../utils/BrowserUtils');
const MobileViewPaymentGrid = require('../MobileViewPaymentGrid');
const { PropTypes } = React;
const HeaderWithoutTitleComponent = require('../../../common/HeaderWithoutTitleComponent');
const EditPayment = require('../EditPayment');
const ManagePayment = require('../ManagePayment');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<ManagePayment
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};

describe('customer Manage Payment page', () => {
    let instance;
    let props;
    beforeEach(() => {
        PaymentsStore.getMergeData.mockReturnValue({
            "id": "0001",
            "from": "B Current",
            "fromAccId": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
            "to": "SITB P CROPPER1",
            "reference": "",
            "isActive": true,
            "payType": "Payment",
            "category": "SO",
            "accNumber": "70292990",
            "when": "2006-05-27",
            "type": "Standing order",
            "amount": 121


        }),
            props = {
                content: {

                },
                data: {
                },
            };
        instance = shallowRender(props);
    });

    xit('render a standard modal with child elements', () => {
        instance = shallowRender(props);
        expect(instance).toEqualJSX(
            <div className="b container-fluid-full">
                <div className="full-height">
                    <Helmet title="Payments" />
                    <HeaderWithoutTitleComponent
                        archivedClick={function noRefCheck() { } }
                        archivedTitle={undefined}
                        backClick={function noRefCheck() { } }
                        backTitle={undefined}
                        />
                    <div className="main-container noheader">
                        <div className="scroll-wrapper">
                            <div className="payments payment-header content-wrapper">
                                <div className="row line-seperator">
                                    <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1 text-center topMargin">
                                        <span className="icon icon-your-payments imageDisplay" />
                                        <h5 className="paymentLbl" />
                                    </div>
                                </div>
                                <div className="row line-seperator-light">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div className="panel-content text-center">
                                            <Nav
                                                activeKey="all"
                                                bsClass="nav"
                                                className="nav manage-nav nav-justified"
                                                justified={false}
                                                onSelect={function noRefCheck() { } }
                                                pullLeft={false}
                                                pullRight={false}
                                                stacked={false}
                                                >
                                                <NavItem
                                                    active={false}
                                                    disabled={false}
                                                    eventKey="all"
                                                    />
                                                <NavItem
                                                    active={false}
                                                    disabled={false}
                                                    eventKey="payment"
                                                    />
                                                <NavItem
                                                    active={false}
                                                    disabled={false}
                                                    eventKey="transfer"
                                                    />
                                                <NavItem
                                                    active={false}
                                                    disabled={false}
                                                    eventKey="dd"
                                                    />
                                            </Nav>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <h6 className="title-repeat">
                                        Repeating
                                    </h6>
                                </div>
                                <div className="row">
                                    <div className="col-lg-2  col-md-2 col-sm-2  col-xs-2" />
                                    <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12 text-center">
                                        <p className="padding-top-max" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    });
});

describe('To check handleSelect Function', () => {
     PaymentsStore.getMergeData.mockReturnValue({
            "id": "0001",
            "from": "B Current",
            "fromAccId": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
            "to": "SITB P CROPPER1",
            "reference": "",
            "isActive": true,
            "payType": "Payment",
            "category": "SO",
            "accNumber": "70292990",
            "when": "2006-05-27",
            "type": "Standing order",
            "amount": 121


        });
    let instance;
    let props = {
        handleSelect: jest.genMockFn(),
        selectedKey: 1,
        content: {

        },
    };
    it('calls for the handleSelect function', () => {
        let node = document.createElement('div');
        let handleSelect = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<ManagePayment {...props} />, node);
        instance.handleSelect(1);
    });
});

describe('To check rowClick Function', () => {
     PaymentsStore.getMergeData.mockReturnValue({
            "id": "0001",
            "from": "B Current",
            "fromAccId": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
            "to": "SITB P CROPPER1",
            "reference": "",
            "isActive": true,
            "payType": "Payment",
            "category": "SO",
            "accNumber": "70292990",
            "when": "2006-05-27",
            "type": "Standing order",
            "amount": 121


        });
    let instance;
    let props = {
        rowClick: jest.genMockFn(),
        e: 1,
        content: {
        },
    };
    it('calls for the rowClick function', () => {
        let node = document.createElement('div');
        let rowClick = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<ManagePayment {...props} />, node);
        instance.rowClick(1);
    });
});

describe('To check closed Function', () => {
     PaymentsStore.getMergeData.mockReturnValue({
            "id": "0001",
            "from": "B Current",
            "fromAccId": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
            "to": "SITB P CROPPER1",
            "reference": "",
            "isActive": true,
            "payType": "Payment",
            "category": "SO",
            "accNumber": "70292990",
            "when": "2006-05-27",
            "type": "Standing order",
            "amount": 121


        });
    let instance;
    let props = {
        closed: jest.genMockFn(),
        confirmCancel: false,
        showEditPayment: false,
        paymentData: '',

        content: {

        },
    };
    it('calls for the rowClick function', () => {
        let node = document.createElement('div');
        let closed = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<ManagePayment {...props} />, node);
        instance.setState({ confirmCancel: false })
        instance.setState({ showEditPayment: false })
        instance.setState({ paymentData: '' })
        instance.closed();
    });
});

describe('To check editClick Function', () => {
     PaymentsStore.getMergeData.mockReturnValue({
            "id": "0001",
            "from": "B Current",
            "fromAccId": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
            "to": "SITB P CROPPER1",
            "reference": "",
            "isActive": true,
            "payType": "Payment",
            "category": "SO",
            "accNumber": "70292990",
            "when": "2006-05-27",
            "type": "Standing order",
            "amount": 121


        });
    let instance;
    let payment = {
        id: "11122112121"
    }
    let props = {
        editClick: jest.genMockFn(),
        payment: {
            id: "11122112121"
        },
        content: {

        },
    };
    it('calls for the rowClick function', () => {
        let node = document.createElement('div');
        let editClick = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<ManagePayment {...props} />, node);
        instance.setState({ confirmCancel: false })
        instance.setState({ paymentData: 'payment.category' })
        instance.editClick(payment);
    });
});
describe('To check filterData Function', () => {
     PaymentsStore.getMergeData.mockReturnValue({
            "id": "0001",
            "from": "B Current",
            "fromAccId": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
            "to": "SITB P CROPPER1",
            "reference": "",
            "isActive": true,
            "payType": "Payment",
            "category": "SO",
            "accNumber": "70292990",
            "when": "2006-05-27",
            "type": "Standing order",
            "amount": 121


        });
    let instance;
    let event = {
        target: {
            name: 'loan'
        }
    }
    let props = {
        filterData: jest.genMockFn(),
        event: {
            target: {
                name: 'loan'
            }
        },
        content: {
        },
    };
    it('calls for the filterData function', () => {
        let node = document.createElement('div');
        let filterData = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<ManagePayment {...props} />, node);
        instance.filterData(event);
    });
});

describe('WHEN NAVIGATE BACK TO archieved payment', () => {
     PaymentsStore.getMergeData.mockReturnValue({
            "id": "0001",
            "from": "B Current",
            "fromAccId": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
            "to": "SITB P CROPPER1",
            "reference": "",
            "isActive": true,
            "payType": "Payment",
            "category": "SO",
            "accNumber": "70292990",
            "when": "2006-05-27",
            "type": "Standing order",
            "amount": 121


        });
    let instance;
    let props = {
        archieved: jest.genMockFn(),
        content: {
        },
    };
    it('should navigate to web-task', () => {
        let node = document.createElement('div');
        let archieved = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<ManagePayment {...props} />, node);
        instance.archieved();
        expect(PaymentsActionCreator.navigateToWebTask.mock.calls.length).toBe(1);
    });
});
describe('WHEN NAVIGATE BACK TO PAYMENT', () => {
     PaymentsStore.getMergeData.mockReturnValue({
            "id": "0001",
            "from": "B Current",
            "fromAccId": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
            "to": "SITB P CROPPER1",
            "reference": "",
            "isActive": true,
            "payType": "Payment",
            "category": "SO",
            "accNumber": "70292990",
            "when": "2006-05-27",
            "type": "Standing order",
            "amount": 121


        });
    let instance;
    let props = {
        back: jest.genMockFn(),
        content: {
        },
    };
    it('should navigate to web-task', () => {
        let node = document.createElement('div');
        let back = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<ManagePayment {...props} />, node);
        instance.back();
        expect(PaymentsActionCreator.navigateToWebTask.mock.calls.length).toBe(2);
    });
});
describe('To check onClick Function', () => {
     PaymentsStore.getMergeData.mockReturnValue({
            "id": "0001",
            "from": "B Current",
            "fromAccId": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
            "to": "SITB P CROPPER1",
            "reference": "",
            "isActive": true,
            "payType": "Payment",
            "category": "SO",
            "accNumber": "70292990",
            "when": "2006-05-27",
            "type": "Standing order",
            "amount": 121


        });
    let instance;
    let props = {
        onClick: jest.genMockFn(),
        e: '1',
        content: {
        },
    };
    it('calls for the onClick function', () => {
        let node = document.createElement('div');
        let onClick = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<ManagePayment {...props} />, node);
        instance.onClick(1);
        //expect(PaymentsActionCreator.navigateToWebTask.mock.calls.length).toBe(2);
    });
});
describe('To check onStoreChange Function', () => {
     PaymentsStore.getMergeData.mockReturnValue({
            "id": "0001",
            "from": "B Current",
            "fromAccId": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
            "to": "SITB P CROPPER1",
            "reference": "",
            "isActive": true,
            "payType": "Payment",
            "category": "SO",
            "accNumber": "70292990",
            "when": "2006-05-27",
            "type": "Standing order",
            "amount": 121


        });
    let instance;
    let props = {
        onStoreChange: jest.genMockFn(),
        e: '1',
        content: {
        },
    };
    it('calls for the onStoreChange function', () => {
        let node = document.createElement('div');
        let onStoreChange = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<ManagePayment {...props} />, node);
        instance.onStoreChange();
        //expect(PaymentsActionCreator.navigateToWebTask.mock.calls.length).toBe(2);
    });
});
describe('To check componentWillUnmount Function', () => {
     PaymentsStore.getMergeData.mockReturnValue({
            "id": "0001",
            "from": "B Current",
            "fromAccId": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
            "to": "SITB P CROPPER1",
            "reference": "",
            "isActive": true,
            "payType": "Payment",
            "category": "SO",
            "accNumber": "70292990",
            "when": "2006-05-27",
            "type": "Standing order",
            "amount": 121


        });
    let component;
    const props = {
        content: {
        },
    };
    it('calls for the removeChangeListener', () => {
        let node = document.createElement('div');
        const render = (comp, el) => ReactDOM.render(comp, el);
        component = ReactDOM.render(<ManagePayment {...props} />, node);
        React.unmountComponentAtNode(node);
        expect(PaymentsStore.removeChangeListener.mock.calls.length).toBe(1);
    });
});
describe('To check componentWillMount Function', () => {
     PaymentsStore.getMergeData.mockReturnValue({
            "id": "0001",
            "from": "B Current",
            "fromAccId": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
            "to": "SITB P CROPPER1",
            "reference": "",
            "isActive": true,
            "payType": "Payment",
            "category": "SO",
            "accNumber": "70292990",
            "when": "2006-05-27",
            "type": "Standing order",
            "amount": 121


        });
    let component;
    beforeEach(() => {
        let props = {
            _mergeList: 'undefined',
            content: {
                back: 'abcd'
            }
        };

        component = TestUtils.renderIntoDocument(
            <ManagePayment {...props}/>
        );

    });
    it('calls for the componentWillMount', () => {
        component.setState({ _mergeList: [] });
        let node = document.createElement('div');
        component.componentWillMount();
        expect(PaymentsActionCreator.getAllpaymentList).toBeCalled();
    });
    it('calls for the componentWillMount', () => {
        BrowserUtils.isMobileView.mockReturnValue(true);
        component.setState({ custGrid: true });
        let node = document.createElement('div');
        component.componentWillMount();
    });
    it('calls for the componentWillMount', () => {
        BrowserUtils.isMobileView.mockReturnValue(true);
        PaymentsStore.isPaymentExit.mockReturnValue(true)
        component.setState({ custGrid: true });
        let node = document.createElement('div');
        component.componentWillMount();
    });
      it('calls for the componentWillMount', () => {
        BrowserUtils.isMobileView.mockReturnValue(true);
        PaymentsStore.isPaymentExit.mockReturnValue(true)
        component.setState({ custGrid: true });
        let node = document.createElement('div');
        component.showMore();
    });
    it('calls for the componentWillMount', () => {
        BrowserUtils.isMobileView.mockReturnValue(true);
        PaymentsStore.isPaymentExit.mockReturnValue(true);
        PaymentsStore.getPaymentDataLoad.mockReturnValue(true);
        component.setState({ custGrid: true ,showError:true });
        let node = document.createElement('div');
        component.loadGrid();
    });
    
    
});


