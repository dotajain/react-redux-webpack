/**
 * @module MobileViewArchievedGrid
 */

jest.unmock('../MobileViewArchievedGrid');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const { buildContent } = require('../../../../__helpers__/TestHelpers');

const MobileViewArchievedGrid = require('../MobileViewArchievedGrid');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<MobileViewArchievedGrid
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};

describe('customer Manage Payment page', () => {
    let instance;
    let props;
    beforeEach(() => {
        props = {
            content: {
            },
            data: [{
                "from": 'a',
                "type": "current",
                "to": 'abc',
                "amount": 54.0,
                "when": "2016-03-03",
            }]
        };
        instance = shallowRender(props);
    });
    it('render a standard modal with child elements', () => {

        instance = shallowRender(props);

         expect(instance).toBeDefined(); 
    });
});


describe('To check rowClick Function', () => {
    let instance;
    let props = {
        rowClick: jest.genMockFn(),
        e: 1,
        content: {
        },
        data: [{
            "from": 'a',
            "type": "current",
            "to": 'abc',
            "amount": 54.0,
            "when": "2016-03-03",
        }]
    };
    it('calls for the rowClick function', () => {
        let node = document.createElement('div');
        let rowClick = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<MobileViewArchievedGrid {...props} />, node);
        instance.setState({ show: true })
        instance.rowClick(1);
       
    });
});