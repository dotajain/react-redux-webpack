/**
 * @module EditComponentArchive
 */

jest.unmock('../EditComponentArchive');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const { buildContent } = require('../../../../__helpers__/TestHelpers');

const PaymentsStore = require('../../../../stores/PaymentsStore');
const ViewArchiveComponent = require('../ViewArchiveComponent');
const Popover = require('react-bootstrap/lib/Popover');
const Overlay = require('react-bootstrap/lib/OverlayTrigger');

const EditComponentArchive = require('../EditComponentArchive');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<EditComponentArchive
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};

describe('customer Archived Payment page', () => {
    let instance;
    let props;
    beforeEach(() => {
        let show = false;
        let rootClose = true;
        let onHide = jest.genMockFn();
        props = {
            metadata:{
           "columnName":"columnName",
        },

        };
        instance = shallowRender(props);
    });
    it('render a standard modal with child elements', () => {
        instance = shallowRender(props);
        expect(instance).toEqualJSX(<Overlay
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
             onClick={function noRefCheck() {}}
           />
         </Overlay>
        )
    });
});
describe('To check handleClick Function', () => {
    let instance;
    let props = {
        handleClick: jest.genMockFn(),
        e: 1,
        rowData: {
            id: "2121221",
        },
        metadata:{
           "columnName":"when",
        },
        content: {
        },
    };
    it('calls for the handleClick function', () => {
        let node = document.createElement('div');
        let handleClick = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<EditComponentArchive {...props} />, node);
        instance.handleClick(1);
    });
});
describe('To check cellClick Function', () => {
    let instance;
    let props = {
        cellClick: jest.genMockFn(),
        event: 1,
        rowData: {
            id: "2121221",
            amount:'20',
            when: "2006-05-27",
        },
         metadata:{
           "columnName":"when",
        },
        content: {
        },
    };
    it('calls for the cellClick function', () => {
        let node = document.createElement('div');
        let cellClick = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<EditComponentArchive {...props} />, node);
        instance.cellClick(1);
    });
});
describe('To check rowClick Function', () => {
    let instance;
    let props = {
        rowClick: jest.genMockFn(),
        rowData: {
            id: "2121221",
        },
         metadata:{
           "columnName":"when",
        },
        confirmCancel: true,
        show: true,
        rootClose: true,
        content: {
        },
    };
    it('calls for the rowClick function', () => {
        let node = document.createElement('div');
        let rowClick = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<EditComponentArchive {...props} />, node);
        instance.rowClick();
    });
});
describe('To check closed Function', () => {
    let instance;
    let props = {
        closed: jest.genMockFn(),
        rowData: {
            id: "2121221",
             amount:'20',
             fromAccId:'5657656',
             accNumber:'88989988',
        },
         metadata:{
           "columnName":"amount",
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
        instance = ReactDOM.render(<EditComponentArchive {...props} />, node);
        instance.closed();
    });
});
describe('To check closed Function2', () => {
    let instance;
    let props = {
        closed: jest.genMockFn(),
        rowData: {
            id: "2121221",
             amount:'20',
             fromAccId:'5657656',
             accNumber:'88989988',
        },
         metadata:{
           "columnName":"from",
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
        instance = ReactDOM.render(<EditComponentArchive {...props} />, node);
        instance.closed();
    });
});
describe('To check closed Function2', () => {
    let instance;
    let props = {
        closed: jest.genMockFn(),
        rowData: {
            id: "2121221",
             amount:'20',
             fromAccId:'5657656',
             accNumber:'88989988',
        },
         metadata:{
           "columnName":"to",
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
        instance = ReactDOM.render(<EditComponentArchive {...props} />, node);
        instance.closed();
    });
});
describe('To check closed Function3', () => {
    let instance;
    let props = {
        closed: jest.genMockFn(),
        rowData: {
            id: "2121221",
             amount:'20',
             fromAccId:'5657656',
             accNumber:'88989988',
        },
         metadata:{
           "columnName":"type",
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
        instance = ReactDOM.render(<EditComponentArchive {...props} />, node);
        instance.closed();
    });
});
// let span = TestUtils.renderIntoDocument(<span>john</span>);

describe('To check onEnter Function', () => {
    let instance;
    let props = {
        onEnter: jest.genMockFn(),
        onExit:jest.genMockFn(),
        rowData: {
            id: "2121221",
        },
         metadata:{
           "columnName":"amount",
        },
        confirmCancel: false,
        show: false,
        cellClick: false,
        content: {
        },
    };
    it('calls for the onEnter function', () => {
        let node = document.createElement('div');
        let onEnter = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<EditComponentArchive {...props} />, node);
        let span = TestUtils.renderIntoDocument(<span>john</span>);
        instance.onEnter(span);
    });
    it('calls for the onExit function', () => {
        let node = document.createElement('div');
        let onExit = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<EditComponentArchive {...props} />, node);
        let span = TestUtils.renderIntoDocument(<span>john</span>);
        instance.onExit(span);
    });
});
describe('To check editClick1 Function', () => {
    let instance;
    let event = {
        target: 1
    }
    let props = {
        editClick1: jest.genMockFn(),
        event: 1,
        rowData: {
            id: "2121221",
        },
         metadata:{
           "columnName":"amount",
        },
        confirmCancel: true,
        show: true,
        cellClick: false,
        showView: false,

        content: {
        },
    };

    instance = TestUtils.renderIntoDocument(
        <EditComponentArchive {...props}/>
    );
    it('calls for the editClick1 function', () => {
        let node = document.createElement('div');
        let editClick1 = jest.genMockFn();
        instance.setState({ target: event.target });
        const render = (comp, el) => ReactDOM.render(comp, el);
        //instance = ReactDOM.render(<EditComponentArchive {...props} />, node);
        instance.editClick1(event);
    });
    describe('To check editClick1 Function-rowdata else case', () => {
    let instance;
    let event = {
        target: 1
    }
    let props = {
        editClick1: jest.genMockFn(),
        event: 1,
        rowData: {
            id: "2121221",
        },
         metadata:{
           "columnName":"amount",
        },
        confirmCancel: true,
        show: true,
        cellClick: false,
        showView: false,

        content: {
        },
    };

    instance = TestUtils.renderIntoDocument(
        <EditComponentArchive {...props}/>
    );
    it('calls for the editClick1 function', () => {
        let node = document.createElement('div');
        let editClick1 = jest.genMockFn();
        instance.setState({ target: event.target });
        const render = (comp, el) => ReactDOM.render(comp, el);
        //instance = ReactDOM.render(<EditComponentArchive {...props} />, node);
        instance.editClick1(event);
    });
});
});
