
jest.unmock('../TalkMobile');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const TalkMobile = require('../TalkMobile');
const { buildContent } = require('../../../__helpers__/TestHelpers');
const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<TalkMobile content={this.props.content} />);
	return shallowRenderer.getRenderOutput();
};

describe('when a user clicked on Talk Panel', () => {

const contentHeader = buildContent(['TalkHead']);
const contentBody = buildContent(['TalkData']);

let instance;
const content = {
		TalkHead: 'PropTypes.string.isRequired',
		TalkData: 'PropTypes.string.isRequired',
	};

	beforeEach(() => {
		instance = TestUtils.renderIntoDocument(
			<TalkMobile
				content={content}
			/>
		);
});
	it('Contact Details of Bank will be open with with heading', () => {
		expect(contentHeader.TalkHead.length).toBe(8);
	});

	it('returns a valid body section', () => {
		expect(contentBody.TalkData.length).toBe(8);
	});

	});
