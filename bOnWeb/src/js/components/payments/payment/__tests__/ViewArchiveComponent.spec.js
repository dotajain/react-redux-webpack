/**
 * @module ViewArchiveComponent
 */

jest.unmock('../ViewArchiveComponent');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const { buildContent } = require('../../../../__helpers__/TestHelpers');
const StringConstant = require('../../../../constants/StringConstants');

const Button = require('react-bootstrap/lib/Button');
const Table = require('react-bootstrap/lib/Table');
const _ = require('lodash');

const ViewArchiveComponent = require('../ViewArchiveComponent');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<ViewArchiveComponent
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};

describe('customer View Archive Component page', () => {
    let instance;
    let props;
    beforeEach(() => {
        props = {
            contents: {
                managePayment: 'managePaymentdata',
                cancel: 'canceldata',
                edit: 'editdata',
                accountLabel: 'accountLabeldata',
                reference: 'referencedata',
                type: 'typedata',
                repeatPayment: 'repeatPaymentdata',

            },
            archieveData: {
                "from": 'a',
                "type": "current",
                "to": 'abc',
                "reference": 54.0,
            }
        };
        instance = shallowRender(props);
    });
    it('render a standard modal with child elements', () => {

        instance = shallowRender(props);

        expect(instance).toEqualJSX(
            <div>
                <div className="row no-gutters pay-Header">
                    <div className="col-xs-3" />
                    <div className="col-xs-6 text-center">
                        <h6 className="ModelHeader">
                            managePaymentdata
                        </h6>
                    </div>
                    <div className="col-xs-3 text-right">
                        <a
                            className="page-options opt-green inactive"
                            disabled={true}
                            >
                            editdata
                        </a>
                    </div>
                </div>
                <div className="edit-table">
                    <ul>
                        <li className="first-part">
                            <section>
                                Name
                            </section>
                            <section>
                                abc

                            </section>
                        </li>
                        <li className="first-part">
                            <section>
                                accountLabeldata
                            </section>
                            <section>
                                a

                            </section>
                        </li>
                        <li>
                            <section>
                                referencedata
                            </section>
                            <section>
                                54
                            </section>
                        </li>
                        <li>
                            <section>
                                typedata
                            </section>
                            <section>
                                current
                            </section>
                        </li>
                        <li className="second-part">
                            <section>
                                repeatPaymentdata
                            </section>
                            <section>
                                Yes
                            </section>
                        </li>
                    </ul>
                </div>
            </div>
        )
    });
});

describe('To check closeMobileView Function', () => {
    let instance;
    let props = {
        closeMobileView: jest.genMockFn(),
        onClick: jest.genMockFn(),
        contents: {
            managePayment: 'managePaymentdata',
            cancel: 'canceldata',
            edit: 'editdata',
            accountLabel: 'accountLabeldata',
            reference: 'referencedata',
            type: 'typedata',
            repeatPayment: 'repeatPaymentdata',
        },
        archieveData: {
            "from": 'a',
            "type": "current",
            "to": 'abc',
            "reference": 54.0,
        }
    };
    it('calls for the closeMobileView function', () => {
        let node = document.createElement('div');
        let closeMobileView = jest.genMockFn();
        let onClick = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<ViewArchiveComponent {...props} />, node);
        instance.closeMobileView(false);
    });
});
describe('To check checkRepeat Function', () => {
    let instance;
    let props = {
        checkRepeat: jest.genMockFn(),

        contents: {
            managePayment: 'managePaymentdata',
            cancel: 'canceldata',
            edit: 'editdata',
            accountLabel: 'accountLabeldata',
            reference: 'referencedata',
            type: 'typedata',
            repeatPayment: 'repeatPaymentdata',
        },
        archieveData: {
            "from": 'a',
            "type": "Standing order",
            "to": 'abc',
            "reference": 54.0,
        }
    };
    it('calls for the checkRepeat function', () => {
        let node = document.createElement('div');
        let checkRepeat = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<ViewArchiveComponent {...props} />, node);
        instance.checkRepeat(true);
    });

});

describe('To check checkRepeat Function', () => {
    let instance;
    let props = {
        checkRepeat: jest.genMockFn(),

        contents: {
            managePayment: 'managePaymentdata',
            cancel: 'canceldata',
            edit: 'editdata',
            accountLabel: 'accountLabeldata',
            reference: 'referencedata',
            type: 'typedata',
            repeatPayment: 'repeatPaymentdata',
        },
        archieveData: {
            "from": 'a',
            "type": "Standing order",
            "to": 'abc',
            "reference": 54.0,
            "category": 'SO',
        }
    };
    it('calls for the checkRepeat function', () => {
        let node = document.createElement('div');
        let checkRepeat = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<ViewArchiveComponent {...props} />, node);
        instance.checkRepeat();
    });

});
// describe('To Check closeMobileView function', () => {
//     let closeClickStub;
//     let component;
//     beforeEach(() => {

//     });
//     it('should run onClick event', () => {
//         closeClickStub = jest.genMockFn();
//         let props = {
//             contents: {
//                 managePayment: 'managePaymentdata',
//             },
//             archieveData: {
//                 to: ''
//             },
//             onClick: jest.genMockFn(),
//             isMobileView: true,
//         }
//         component = TestUtils.renderIntoDocument(<ViewArchiveComponent onClick={closeClickStub} {...props}/>
//         );


//         const pageoptions = TestUtils.scryRenderedDOMComponentsWithTag(component, 'button');
//         component.closeMobileView = closeClickStub;

//         closeClickStub();
//         _.map(pageoptions, page => {

//             TestUtils.Simulate.click(page);
//         });

//         expect(closeClickStub).toBeCalled();
//     });
// });
describe('To check Function', () => {
    let instance;
    let props = {
        renderLastReference: jest.genMockFn(),
        contents: {
            managePayment: 'managePaymentdata',
            cancel: 'canceldata',
            edit: 'editdata',
            accountLabel: 'accountLabeldata',
            reference: 'referencedata',
            type: 'typedata',
            repeatPayment: 'repeatPaymentdata',
            payeeRequestPacket_reference: 'payeeRequestPacket_reference',
        },
        archieveData: {
            "from": 'a',
            "type": "Standing order",
            "to": 'abc',
            "reference": 54.0,
            "category": 'SO',
        }
    };
    it('calls for the renderLastReference function', () => {
        let node = document.createElement('div');
        let renderLastReference = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<ViewArchiveComponent {...props} />, node);
        instance.renderLastReference();
    });
    it('calls for the renderAmount function', () => {
        let node = document.createElement('div');
        let renderAmount = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<ViewArchiveComponent {...props} />, node);
        instance.renderAmount();
    });
    it('calls for the renderDirectDebit function', () => {
        let node = document.createElement('div');
        let renderDirectDebit = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<ViewArchiveComponent {...props} />, node);
        instance.renderDirectDebit();
    });
    it('calls for the renderDirectAmount function', () => {
        let node = document.createElement('div');
        let renderDirectAmount = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<ViewArchiveComponent {...props} />, node);
        instance.renderDirectAmount();
    });
    it('calls for the renderLastPayment function', () => {
        let node = document.createElement('div');
        let renderLastPayment = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<ViewArchiveComponent {...props} />, node);
        instance.renderLastPayment();
    });
});
describe('to check the render', () => {
    let instance;
    let props = {
        archieveData: {

            "from": 'a',
            "type": "Standing order",
            "to": 'abc',
            "reference": 54.0,
            category: 'DD',
        },
        StringConstant: {
            DDPayment: 'DD',
        },
        contents: {
            managePayment: 'managePaymentdata',
            cancel: 'canceldata',
            edit: 'editdata',
            accountLabel: 'accountLabeldata',
            reference: 'referencedata',
            type: 'typedata',
            repeatPayment: 'repeatPaymentdata',

        },
    };
    it('calls for the function', () => {
        let node = document.createElement('div');
        let renderLastReference = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<ViewArchiveComponent {...props} />, node);

    });
});
describe('to check the renderReference with empty reference', () => {
    let instance;
    let props = {
        archieveData: {
            "from": 'a',
            "type": "Standing order",
            "to": 'abc',
            "reference": [],
            category: 'DD',
        },
        StringConstant: {
            DDPayment: 'DD',
        },
        contents: {
            managePayment: 'managePaymentdata',
            cancel: 'canceldata',
            edit: 'editdata',
            accountLabel: 'accountLabeldata',
            reference: 'referencedata',
            type: 'typedata',
            repeatPayment: 'repeatPaymentdata',

        },
    };
    it('calls for the function', () => {
        let node = document.createElement('div');
        let renderReference = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<ViewArchiveComponent {...props} />, node);
        instance.renderReference();
    });
});
describe('to check the renderStandingOrder  with empty amount', () => {
    let instance;
    let props = {
        archieveData: {
            "from": 'a',
            "type": "Standing order",
            "to": 'abc',
            "reference": [],
            category: 'DD',
            amount: 200,
        },
        StringConstant: {
            DDPayment: 'DD',
        },
        contents: {
            managePayment: 'managePaymentdata',
            cancel: 'canceldata',
            edit: 'editdata',
            accountLabel: 'accountLabeldata',
            reference: 'referencedata',
            type: 'typedata',
            repeatPayment: 'repeatPaymentdata',

        },
    };
    it('calls for the function', () => {
        let node = document.createElement('div');
        let renderStandingOrder = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<ViewArchiveComponent {...props} />, node);
        instance.renderStandingOrder();
    });
});
describe('to check the renderDirectDebit  with when ', () => {
    let instance;
    let props = {
        archieveData: {
            "from": 'a',
            "type": "Standing order",
            "to": 'abc',
            "reference": [],
            category: 'DD',
            amount: 200,
            when: '08-02-1993',
        },
        StringConstant: {
            DDPayment: 'DD',
        },
        contents: {
            managePayment: 'managePaymentdata',
            cancel: 'canceldata',
            edit: 'editdata',
            accountLabel: 'accountLabeldata',
            reference: 'referencedata',
            type: 'typedata',
            repeatPayment: 'repeatPaymentdata',

        },
    };
    it('calls for the function', () => {
        let node = document.createElement('div');
        let renderDirectDebit = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<ViewArchiveComponent {...props} />, node);
        instance.renderDirectDebit();
    });
});
describe('to check the renderHeader  with when ', () => {
    let instance;
    let props = {
        isMobileView: true,
        archieveData: {
            "from": 'a',
            "type": "Standing order",
            "to": 'abc',
            "reference": [],
            category: 'DD',
            amount: 200,
            when: '08-02-1993',
        },
        StringConstant: {
            DDPayment: 'DD',
        },
        contents: {
            managePayment: 'managePaymentdata',
            cancel: 'canceldata',
            edit: 'editdata',
            accountLabel: 'accountLabeldata',
            reference: 'referencedata',
            type: 'typedata',
            repeatPayment: 'repeatPaymentdata',

        },
    };
    it('calls for the function', () => {
        let node = document.createElement('div');
        let renderHeader = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<ViewArchiveComponent {...props} />, node);
        instance.renderHeader();
    });
});