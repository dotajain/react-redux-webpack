/**
 * @test RegistrationPage
 */
jest.unmock('../DemoGo');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const { buildContent } = require('../../../__helpers__/TestHelpers');
const ReactDOM = require('react-dom');
const DemoGo = require('../DemoGo');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<DemoGo {...props} />);
    return shallowRenderer.getRenderOutput();
};

describe('customer registration page', () => {
const contentHeader = buildContent(['DemoReadyGo']);
const contentBody = buildContent(['DemoDone']);
let instance;
const content = {
		DemoReadyGo: 'PropTypes.string.isRequired',
		DemoDone: 'PropTypes.string.isRequired',
	};
beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
        <DemoGo
            content={content}
            />
    );
});

it('it returns the DemoReadyGo', () => {
    expect(contentHeader.DemoReadyGo.length).toBe(11);
});

it('returns DemoDone', () => {
    expect(contentBody.DemoDone.length).toBe(8);
});
});


