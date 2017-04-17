/**
 * @module MobileViewPayeeGrid
 */

jest.unmock('../MobileViewPayeeGrid');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const { buildContent } = require('../../../../__helpers__/TestHelpers');

const MobileViewPayeeGrid = require('../MobileViewPayeeGrid');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<MobileViewPayeeGrid
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
                to_account: {
                    sort_code: '121212',
                    account_number: '2121211212121'
                },
                "display_name": 'abcd',
                "reference": '1',
                "type": "current",
            }]
        };
        //instance = shallowRender(props);
    });
    it('render a standard modal with child elements', () => {

        instance = shallowRender(props);

        expect(instance).toEqualJSX(
            <div>
                <div

                    className="custom-row-card manage-payee"
                    onClick={function noRefCheck() { } }
                    >

                    <div>
                        <h5 className="payee-name">
                            abcd
                        </h5>
                    </div>

                    <div className="payee-acc">
                        2121211212121 |
                    </div>
                    <div>
                        <span className="payee-ref">
                            Ref
                        </span>
                        1
                    </div>
                </div>
            </div>
        )
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
            to_account: {
                sort_code: '121212',
                account_number: '2121211212121'
            },
            "display_name": 'abcd',
            "reference": '1',
            "type": "current",
        }]
    };
    it('calls for the rowClick function', () => {
        let node = document.createElement('div');
        let rowClick = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<MobileViewPayeeGrid {...props} />, node);
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
        let inst = ReactDOM.render(<MobileViewPayeeGrid {...props1} />, node);
        //expect(contentloadingPaymentText.loadingPaymentText.length).toBe(18);
    });
});