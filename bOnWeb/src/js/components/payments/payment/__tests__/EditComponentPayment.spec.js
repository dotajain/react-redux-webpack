/**
 * @module EditComponentPayment
 */
jest.unmock('../EditComponentPayment');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const { buildContent } = require('../../../../__helpers__/TestHelpers');

const PaymentsStore = require('../../../../stores/PaymentsStore');
const PaymentsActionCreator = require('../../../../actions/PaymentsActionCreator');
const EditPayment = require('../EditPayment');
const Popover = require('react-bootstrap/lib/Popover');
const Overlay = require('react-bootstrap/lib/OverlayTrigger');
const Button = require('react-bootstrap/lib/Button');
const Measure = require('react-measure');
const DateUtils = require('../../../../utils/DateUtils');
const moment = require('moment');
const config = require('../../../../config');

const EditComponentPayment = require('../EditComponentPayment');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<EditComponentPayment
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};

describe('Edit Component Payment page', () => {
    let instance;
    let props;
    beforeEach(() => {
        let show = false;
        let rootClose = true;
        let onHide = jest.genMockFn();
        props = {
            content: {
                edit: 'editdata',
            },
            metadata: {
                columnName: '',
            }
        };
        instance = shallowRender(props);
    });
    it('render a standard modal with child elements', () => {
        instance = shallowRender(props);
        expect(instance).toEqualJSX(
            <div>
                <Overlay
                    defaultOverlayShown={false}
                    onEnter={function noRefCheck() {}}
                    onExit={function noRefCheck() {}}
                    overlay={<span id="blank" />}
                    placement="left"
                    rootClose={true}
                    trigger="click"
                    >
                    <span
                        ref="span"
                        onClick={function noRefCheck() { } }
                        />
                </Overlay>
            </div>
        )
    });
});
describe('To check closed Function', () => {
    let instance;
    let props = {
        closed: jest.genMockFn(),
        rowData: {
            id: "2121221",
        },
        metadata: {
            columnName: '',
        },
        confirmCancel: false,
        show: false,
        cellClick: false,
        content: {
        },
    };
    it('calls for the closed function', () => {
        let node = document.createElement('div');
        let closed = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<EditComponentPayment {...props} />, node);
        instance.closed();
    });
});
describe('To check onEntered Function', () => {
    let instance;
    let e=<div/>
    let props = {
        onEnter: jest.genMockFn(),
        rowData: {
            id: "2121221",
        },
        metadata: {
            columnName: '',
        },
        confirmCancel: false,
        show: false,
        cellClick: false,
        content: {
        },
    };
    it('calls for the closed function', () => {
        let node = document.createElement('div');
        let onEnter = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<EditComponentPayment {...props} />, node);
         let span = TestUtils.renderIntoDocument(<span>john</span>);
        instance.onEnter(span);
    });
});

describe('To check onExit Function', () => {
    let instance;
    let e=<div/>
    let props = {
        onExit: jest.genMockFn(),
        rowData: {
            id: "2121221",
        },
        metadata: {
            columnName: '',
        },
        confirmCancel: false,
        show: false,
        cellClick: false,
        content: {
        },
    };
    it('calls for the closed function', () => {
        let node = document.createElement('div');
        let onExit = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<EditComponentPayment {...props} />, node);
         let span = TestUtils.renderIntoDocument(<span>john</span>);
        instance.onExit(span);
    });
});

describe('To check cellClick Function', () => {
    let instance;
    let props = {
        cellClick: jest.genMockFn(),
        showView: true,
        event: 1,
        rowData: {
            id: "2121221",
        },
        metadata: {
            columnName: '',
        },
        content: {
        },
    };
    it('calls for the cellClick function', () => {
        let node = document.createElement('div');
        let cellClick = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<EditComponentPayment {...props} />, node);
        instance.cellClick(1);
    });
});
describe('To check handleResize Function', () => {
    let instance;
    let e = {
        target: {
            innerWidth: 10,
        }
    };
    let props = {
        handleResize: jest.genMockFn(),
        showView: true,
        e: {
            target: {
                innerWidth: 10,
            }
        },
        rowData: {
            id: "2121221",
        },
        metadata: {
            columnName: '',
        },
        content: {
        },
    };
    instance = TestUtils.renderIntoDocument(
        <EditComponentPayment {...props}/>
    );
    it('calls for the handleResize function', () => {
        let node = document.createElement('div');
        let handleResize = jest.genMockFn();
        instance.setState({ e: 10 });
        instance.setState({ windowWidth: 10 });
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance.handleResize(e);
    });
});
describe('To check handleResize Function else path', () => {
    let instance;
    let e = {
        target: {
            innerWidth: 1,
        }
    };
    let props = {
        handleResize: jest.genMockFn(),
        showView: true,
        e: {
            target: {
                innerWidth: 1,
            }
        },
        rowData: {
            id: "2121221",
        },
        metadata: {
            columnName: '',
        },
        content: {
        },
    };
    instance = TestUtils.renderIntoDocument(
        <EditComponentPayment {...props}/>
    );
    it('calls for the handleResize function', () => {
        let node = document.createElement('div');
        let handleResize = jest.genMockFn();
        instance.setState({ e: 1 });
        instance.setState({ windowWidth: 10 });
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance.handleResize(e);
    });
});

describe('To chcek the columnName case', () => {
    let instance;
    let props;
    beforeEach(() => {
        props = {
            content: {
            },
            rowData: {
                "from": 'a',
                "type": "current",
                "to": 'abc',
                "amount": 54.0,
                "when": undefined,
            },
            metadata: {
                columnName: 'edit',
            }
        };

    });
    it('check the functionality of switch case', () => {
        instance = TestUtils.renderIntoDocument(
            <EditComponentPayment   {...props}	/>
        );
        expect(props.metadata.columnName).toBe('edit')
    });
});

describe('To chcek the columnName case', () => {
    let instance;
    let props;
    beforeEach(() => {
        props = {
            content: {
            },
            rowData: {
                "from": 'a',
                "type": "current",
                "to": 'abc',
                "amount": 54.0,
                "when": undefined,
            },
            metadata: {
                columnName: 'when',
            }
        };

    });
    it('check the functionality of switch case', () => {
        instance = TestUtils.renderIntoDocument(
            <EditComponentPayment   {...props}	/>
        );
        expect(props.metadata.columnName).toBe('when')
    });
});
describe('To chcek the columnName case', () => {
    let instance;
    let props;
    beforeEach(() => {
        props = {
            content: {
            },
            rowData: {
                "from": 'a',
                "type": "current",
                "to": 'abc',
                "amount": 54.0,
                "when": undefined,
            },
            metadata: {
                columnName: 'from',
            }
        };

    });
    it('check the functionality of switch case', () => {
        instance = TestUtils.renderIntoDocument(
            <EditComponentPayment   {...props}	/>
        );
        expect(props.metadata.columnName).toBe('from')
    });
});
describe('To chcek the renderCell case', () => {
    let instance;
    let props;
    beforeEach(() => {
        props = {
             data:12,
            content: {
            },
            rowData: {
                "from": 'a',
                "type": "current",
                "to": 'abc',
                "amount": 54.0,
                "when": undefined,
            },
            metadata: {
                columnName: 'amount',
            }
        };

    });
    it('check the functionality renderCell switch case', () => {
        instance = TestUtils.renderIntoDocument(
            <EditComponentPayment   {...props}	/>
        );
        expect(props.metadata.columnName).toBe('amount')
    });
});
describe('To chcek the columnName case', () => {
    let instance;
    let props;
    beforeEach(() => {
        props = {
            content: {
            },
            rowData: {
                "from": 'a',
                "type": "current",
                "to": 'abc',
                "amount": 54.0,
                "when": undefined,
            },
            metadata: {
                columnName: 'to',
            }
        };

    });
    it('check the functionality of switch case', () => {
        instance = TestUtils.renderIntoDocument(
            <EditComponentPayment   {...props}	/>
        );
        expect(props.metadata.columnName).toBe('to')
    });
});