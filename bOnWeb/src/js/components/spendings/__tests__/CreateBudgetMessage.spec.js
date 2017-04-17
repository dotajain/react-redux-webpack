/**
 * @module CreateBudgetMessage
*/

jest.unmock('../CreateBudgetMessage');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const { buildContent } = require('../../../__helpers__/TestHelpers');

const NumberUtils = require('../../../utils/NumberUtils');

const CreateBudgetMessage = require('../CreateBudgetMessage');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<CreateBudgetMessage
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};

describe('To Check CreateBudgetMessage page', () => {
    let instance;
    let component;
    let props;
    beforeEach(() => {
        props = {
            content: {

            },
            totalBudgetValue: 50,
            potValue: 50,
            earning: 100,
            data: {

            },
        };
        component = shallowRender(props);
        instance = TestUtils.renderIntoDocument(<CreateBudgetMessage {...props}/>);
    });
    it('CreateBudgetMessage : Unit Test Case 1 : toBedefined', () => {
        expect(component).toBeDefined();
    });

    it('CreateBudgetMessage : Unit Test Case 2 : earning', () => {
        props = {
            content: {

            },
            totalBudgetValue: 100,
            potValue: 50,
            earning: 50,
            data: {

            },
        };
        instance = TestUtils.renderIntoDocument(<CreateBudgetMessage {...props}/>);
        expect(instance.props.earning).toBe(50);
    });
});