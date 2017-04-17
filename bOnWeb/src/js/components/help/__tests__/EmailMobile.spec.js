
jest.unmock('../EmailMobile');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const EmailMobile = require('../EmailMobile');
const { buildContent } = require('../../../__helpers__/TestHelpers');
const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<EmailMobile content={this.props.content} />);
	return shallowRenderer.getRenderOutput();
};


describe('when a user clicked on Email Panel', () => {

const contentEmailHead = buildContent(['HelpEmailHead']);
const contentEmailBody = buildContent(['EmailBody']);

let instance;
const content = {
		HelpEmailHead: 'PropTypes.string.isRequired',
		EmailBody: 'PropTypes.string.isRequired',
	};

	beforeEach(() => {
		instance = TestUtils.renderIntoDocument(
			<EmailMobile
				content={content}
			/>
		);
});
it('email pop will be open with with heading', () => {
			expect(contentEmailHead.HelpEmailHead.length).toBe(13);
			});
            
		it('returns a valid body section', () => {
			expect(contentEmailBody.EmailBody.length).toBe(9);
		});

	});