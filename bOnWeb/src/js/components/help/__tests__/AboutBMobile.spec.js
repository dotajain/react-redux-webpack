jest.unmock('../AboutBMobile');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const AboutBMobile = require('../AboutBMobile');
const { buildContent } = require('../../../__helpers__/TestHelpers');

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<AboutBMobile content={this.props.content}/>);
	return shallowRenderer.getRenderOutput();
};

describe('when a user clicked on AboutB Panel', () => {
	const contentAboutBHead = buildContent(['AboutBHead']);
	let instance;
	const content = {
		AboutBHead: 'PropTypes.string.isRequired',
	};

	beforeEach(() => {
		instance = TestUtils.renderIntoDocument(
			<AboutBMobile
				content={content}
			/>
		);
	});

	it('email pop will be open with with heading', () => {
		expect(contentAboutBHead.AboutBHead.length).toBe(10);
	});
});