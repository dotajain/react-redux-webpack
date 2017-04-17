/**
 * @module MobileViewPaymentGrid
 */

jest.unmock('../MobileViewPaymentGrid');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const { buildContent } = require('../../../../__helpers__/TestHelpers');

const MobileViewPaymentGrid = require('../MobileViewPaymentGrid');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<MobileViewPaymentGrid
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
    const contentloadingPaymentText = buildContent(['loadingPaymentText']);
    let props = {
        rowClick: jest.genMockFn(),
        e: 1,
        content: {
            loadingPaymentText: 'PropTypes.string.isRequired',
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
        instance = ReactDOM.render(<MobileViewPaymentGrid {...props} />, node);
        instance.setState({ show: true })
        instance.rowClick(1);
      
    });
    it('Contact Details of Bank will be open with with loadingPaymentText', () => {
        let node = document.createElement('div');
        let props1 = {
            content: {
                'loadingPaymentText': 'loadingPaymentText',
            },
            data: [],
        };
        const render = (comp, el) => ReactDOM.render(comp, el);
        let inst = ReactDOM.render(<MobileViewPaymentGrid {...props1} />, node);
        //expect(contentloadingPaymentText.loadingPaymentText.length).toBe(18);
    });
});
