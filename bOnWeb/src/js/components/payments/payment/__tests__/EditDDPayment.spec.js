'use strict';

jest.unmock('../EditDDPayment');

const EditDDPayment = require('../EditDDPayment');
const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const PaymentsStore = require('../../../../stores/PaymentsStore');
const Button = require('react-bootstrap/lib/Button');
const Table = require('react-bootstrap/lib/Table');
const DateUtils = require('../../../../utils/DateUtils');
const moment = require('moment');
const config = require('../../../../config');
const EditPaymentStore = require('../../../../stores/EditPaymentStore');
const _ = require('lodash');
const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<EditDDPayment
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};
// PaymentsStore.getDirectDebitDataById.mockReturnValue('c9760a4e-87f6-4b0a-819d-f682a44f957c');

PaymentsStore.getDirectDebitDataById.mockReturnValue({
    'previous_payment': {
        'reference': '112233',
        'when': '2016-03-03',
        'amount': {
            'value': 45.0,
            'currency': 'GBP',
        },
    },

});

describe('Edit DD Component Test Cases', () => {
    let instance;
    //  let deletePaymentFunc;
    let setCancelFunc;

    beforeEach(() => {
        //  let deletePaymentFunc = jest.genMockFn();
        // let deletePaymentFunc = jest.genMockFn();
        setCancelFunc = jest.genMockFn();
        instance = TestUtils.renderIntoDocument(<EditDDPayment {...props}/>);
    });

    const props = {
        'contents': {
            'cancel': 'cancel',
            'inactive': 'inactive',
            'deletePaymentText': 'deletePaymentTex',
            'DELETE_PAYMENT_TYPE': 'DELETE_PAYMENT',
            'lastAmount ': 'Last Amount',
            'accountName ': 'sdfg',
            'accountLabel': 'wddw',
        },
        'isMobileView': true,
        'onClick': jest.genMockFn(),
        'mandates': [
            {
                'id': 'c9760a4e-87f6-4b0a-819d-f682a44f957c',
                'display_name': 'UK Gas Co',
                'reference': '112233',
                'is_active': true,
                'last_updated_on': '2016-04-03T13:00:00.000+01:00',
                'previous_payment': {
                    'reference': '112233',
                    'when': '2016-03-03',
                    'amount': {
                        'value': 45.0,
                        'currency': 'GBP',
                    },
                },
            },
            {
                'id': '1765ed90-9f72-4e5c-83ba-a377581dc773',
                'display_name': 'UK Electric Co',
                'reference': '98712345',
                'is_active': true,
                'last_updated_on': '2016-04-04T13:00:00.000+01:00',
                'previous_payment': {
                    'reference': '98712345',
                    'when': '2016-03-04',
                    'amount': {
                        'value': 54.0,
                        'currency': 'GBP',
                    },
                },
            },
            {
                'id': '0a53583b-5dbb-48e4-9556-3968a7a38294',
                'display_name': 'Broadband & Cable TV',
                'reference': 'TVBB121INT',
                'is_active': true,
                'last_updated_on': '2016-04-06T13:00:00.000+01:00',
                'previous_payment': {
                    'reference': 'TVBB121INT',
                    'when': '2016-03-06',
                    'amount': {
                        'value': 45.0,
                        'currency': 'GBP',
                    },
                },
            },
            {
                'id': '4e061f01-6aa3-488f-b63b-17462f3d5e81',
                'display_name': 'CYB Mortgage 11223344',
                'reference': '11223344 - Brown',
                'is_active': true,
                'last_updated_on': '2016-04-09T13:00:00.000+01:00',
                'previous_payment': {
                    'reference': '11223344 - Brown',
                    'when': '2016-03-09',
                    'amount': {
                        'value': 317.21,
                        'currency': 'GBP',
                    },
                },
            },
            {
                'id': '683af6d3-61df-48d9-8aca-7beeea6ba95c',
                'display_name': 'Leafyville Borough Council Tax',
                'reference': '785785785',
                'is_active': false,
                'last_updated_on': '2016-04-10T13:00:00.000+01:00',
                'previous_payment': {
                    'reference': '785785785',
                    'when': '2016-03-10',
                    'amount': {
                        'value': 119.89,
                        'currency': 'GBP',
                    },
                },
            },
        ],

    };
    it('should run cancel click event', () => {

        let deletePaymentFunc = jest.genMockFn();
        let setCancelFunc = jest.genMockFn();
        instance = TestUtils.renderIntoDocument(<EditDDPayment onClick={deletePaymentFunc}{...props}/>);
        const pageoptions = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'a');
        instance.deletePayment = deletePaymentFunc;
        // instance.setCancel = deletePaymentFunc;
        deletePaymentFunc();
        TestUtils.Simulate.click(pageoptions[0]);
        TestUtils.Simulate.click(pageoptions[1]);

        expect(deletePaymentFunc).toBeCalled();
    });
    //let node = document.createElement('div');
    // let deletePayment = jest.genMockFn();
    // const render = (comp, el) => ReactDOM.render(comp, el);
    //let instanc = ReactDOM.render(<EditDDPayment {...props} />, node);
    //instanc.deletePayment();

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
         expect(instance.state.showAnimation).toBeTruthy();
    });
    it('should call on store change for 201 success', () => {
        EditPaymentStore.getEditPaymentResponse.mockReturnValue({
            code: 201,
            type: 'DELETE_PAYMENT',
            error: '',
        })
        instance.onStoreChange();
        expect(instance.onStoreChange).toBeDefined();
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
    it('should call componentWillUnmount', () => {
        instance.componentWillUnmount();
        expect(EditPaymentStore.removeChangeListener).toBeCalled();
    });

    it('should have isConfirm state as false', () => {
        instance = TestUtils.renderIntoDocument(<EditDDPayment {...props}/>);
        instance.renderButton();
        expect(instance.state.isConfirm).toBe(false);
    });
    it('should have renderCancelButton state as false', () => {
        instance = TestUtils.renderIntoDocument(<EditDDPayment {...props}/>);
        PaymentsStore.getPaymentType.mockReturnValue(true);
        instance.renderCancelButton();
       // expect(instance.state.isConfirm).toBe(false);
    });
    it('should have isConfirm state as true', () => {
        instance = TestUtils.renderIntoDocument(<EditDDPayment {...props}/>);
        instance.setCancel();
        expect(instance.state.isConfirm).toBe(true);
    });
    it('should have showView state as false', () => {
        instance = TestUtils.renderIntoDocument(<EditDDPayment {...props}/>);
        instance.hideViewPayee();
        expect(instance.state.showView).toBe(false);
    });
    it('should have isEnable state as false', () => {
        instance = TestUtils.renderIntoDocument(<EditDDPayment {...props}/>);
        instance.closeDeleteModal();
        expect(instance.state.isEnable).toBe(false);
    });
    it('should have isEnable state as true', () => {
        instance = TestUtils.renderIntoDocument(<EditDDPayment {...props}/>);
        instance.setState({ showView: true });
        instance.setshowView();
        expect(instance.state.showView).toBe(true);
    });
    it('it should have deletePayment state as true', () => {
        instance = TestUtils.renderIntoDocument(<EditDDPayment {...props}/>);
        instance.setState({ isEnable: true });
        instance.deletePayment();
        expect(instance.state.isEnable).toBe(true);
    });
    it('should call closeErrorPopup ', () => {
        instance.setState({ showError: true })
        instance.closeErrorPopup();
        expect(instance.state.showError).toBe(false);
    });
    it('should call renderPaymentType ', () => {
        instance.renderPaymentType();
        expect(instance.renderPaymentType).toBeDefined(false);
    });

    it('should call renderStatus ', () => {
        PaymentsStore.getDirectDebitDataById.mockReturnValue({
            'is_active': true,
            'previous_payment': {
                'reference': '112233',
                'when': '2016-03-03',
                'amount': {
                    'value': 45.0,
                    'currency': 'GBP',
                },
            },

        });
        instance = TestUtils.renderIntoDocument(<EditDDPayment {...props}/>);
        instance.renderStatus();
        expect(instance.renderStatus).toBeDefined();
    });
    it('should call renderStatus false part', () => {
        PaymentsStore.getDirectDebitDataById.mockReturnValue({
            'is_active': false,
            'previous_payment': {
                'reference': '112233',
                'when': '2016-03-03',
                'amount': {
                    'value': 45.0,
                    'currency': 'GBP',
                },
            },

        });
        instance = TestUtils.renderIntoDocument(<EditDDPayment {...props}/>);
        instance.renderStatus();
        expect(instance.renderStatus).toBeDefined();
    });
    it('should call renderTableRow', () => {
        PaymentsStore.getDirectDebitDataById.mockReturnValue({
            'is_active': false,
            'previous_payment': {
                'reference': '112233',
                'when': '2016-03-03',
                'amount': {
                    'value': 45.0,
                    'currency': 'GBP',
                },
            },

        });
        instance = TestUtils.renderIntoDocument(<EditDDPayment {...props}/>);
        instance.renderStatus();
        expect(instance.renderStatus).toBeDefined();
    });
    
       it('should call renderTableRow', () => {
           let name="surya";
           let label="label";
        PaymentsStore.getDirectDebitDataById.mockReturnValue({
            'is_active': false,
            'previous_payment': {
                'reference': '112233',
                'when': '2016-03-03',
                'amount': {
                    'value': 45.0,
                    'currency': 'GBP',
                },
            },

        });
        instance = TestUtils.renderIntoDocument(<EditDDPayment {...props}/>);
        instance.renderTableRow(name,label);
        expect(instance.renderTableRow).toBeDefined();
    });

    it('should return EditDD jsx', () => {
        // props.mandates.previous_payment.when="2016-03-03";
        const component = shallowRender(props);
        const date = moment(new Date()).format(config.dateFormatTimeline);
        //component.setState({ isEnable: true });
        expect(component).toEqualJSX(
            <div className="main-container from-top">
                <div className="row no-gutters pay-Header">
                    <div className="col-xs-3">
                        <a
                            className="page-options opt-green float-left"
                            onClick={function noRefCheck() { } }
                            >
                            cancel
                        </a>
                    </div>
                    <div className="col-xs-6 text-center">
                        <h6 className="ModelHeader" />
                    </div>
                    <div className="col-xs-3 text-right">
                        <a
                            className="page-options opt-green"
                            onClick={undefined}
                            />
                    </div>
                </div>
                <div className="scroll-wrapper">
                    <div className="edit-table payment-table">
                        <ul>
                            <li className="first-part">
                                <section />
                                <section />
                            </li>
                            <li className="first-part">

                                <section>
                                    wddw
                                </section>
                                <section/>

                            </li>
                            <li className="first-part">
                                <section />
                                <section>
                                    £45

                                </section>
                            </li>
                            <li className="first-part">
                                <section />
                                <section>
                                    {date}

                                </section>
                            </li>
                            <li className="first-part">
                                <section />
                                <section>
                                    112233
                                </section>

                            </li>
                            <li className="first-part">
                                <section />
                                <section />
                            </li>
                        </ul>
                    </div>
                    <div className="row">

                        <div className="col-xs-12 text-center padding-top padding-bottom">
                            <div>
                                <a
                                     className="payeeOverlayBtn"
                                    onClick={function noRefCheck() { } }
                                    />

                            </div>
                        </div>
                    </div>
                </div>
            </div>


        );
    });
});
