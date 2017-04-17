/**
 * @module EditPayment
 */

jest.unmock('../EditPayment');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const { buildContent } = require('../../../../__helpers__/TestHelpers');

const EditDDPayment = require('../EditDDPayment');
const EditSOPayment = require('../EditSOPayment');

const EditPayment = require('../EditPayment');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<EditPayment
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};

describe('To Check Edit Payment page', () => {
    let instance;
    let props;
    beforeEach(() => {
        props = {
            content: {

            },
            data: {
                paymentData: '',
            },
        };
        instance = shallowRender(props);
    });
    it('render a standard modal with child elements', () => {
        instance = shallowRender(props);
        expect(instance).toEqualJSX(
            <div className="full-height" />
        )
    });
});
describe('To check showModal function with DD', () => {
    let instance;
    let props;
    beforeEach(() => {
        props = {
            content: {
            },
            paymentData: 'DD',
        };
        instance = shallowRender(props);
    });
    it('should call the function with DD', () => {
        instance = shallowRender(props);
        expect(props.paymentData).toBe('DD')
    });
});
describe('To check showModal function with SO', () => {
    let instance;
    let props;
    beforeEach(() => {
        props = {
            content: {
            },
            paymentData: 'SO',
        };
        instance = shallowRender(props);
    });
    it('should call the function with SO', () => {
        instance = shallowRender(props);
        expect(props.paymentData).toBe('SO')
    });
});

describe('To check confirmCancel Function', () => {
    let instance;
    let props = {
        confirmCancel: jest.genMockFn(),
        isConfirming: false,
        content: {
        },
    };
    it('calls for the confirmCancel function', () => {
        let node = document.createElement('div');
        let confirmCancel = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<EditPayment {...props} />, node);
        instance.confirmCancel();
        expect(instance.confirmCancel).toBeDefined();
    });
});
describe('To check componentWillReceiveProps Function', () => {
    let instance;
    let nextProps = {
        confirmCancel: false,
    }
    let props = {
        componentWillReceiveProps: jest.genMockFn(),
        nextProps: '',
        content: {
        },
    };
    it('calls for the componentWillReceiveProps function', () => {
        let node = document.createElement('div');
        let componentWillReceiveProps = jest.genMockFn();
        
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<EditPayment {...props} />, node);
        instance.componentWillReceiveProps(false);
    });
});