jest.unmock('../ChallengeError');
jest.unmock('../../../../../utils/EncryptionUtils');

const React = require('react');
const TestUtils = require('react-addons-test-utils');

const ChallengeError = require('../ChallengeError');

const shallowRender = (key, props) => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<ChallengeError type={key}
						   {...props}
						/>);
	return shallowRenderer.getRenderOutput();
};

describe('when a user has a challenge error', () => {

	let component;
	const content = {
		cannotBeLoggedIn: 'Error Answer',
		goneWrongMessage: 'Error Token',
	};

	describe('and it\'s a incorrect answer', () => {
		const session = {
			challenge: {
				error: true,
			},
			token: {
				error: false,
			},
		};

		beforeEach(() => {
			component = shallowRender('cannotBeLoggedIn', {
				content: content,
				session: session,
			});
		});

		it('should render correct markup', () => {
			expect(component).toEqualJSX(<p className="error" key="cannotBeLoggedIn">Error Answer</p>)
		});
	});

	describe('and it\'s a token error', () => {
		const session = {
			challenge: {
				error: false,
			},
			token: {
				error: true,
			},
		};

		beforeEach(() => {
			component = shallowRender('goneWrongMessage', {
				content: content,
				session: session,
			});
		});

		it('should render correct markup', () => {
			expect(component).toEqualJSX(<p className="error" key="goneWrongMessage">Error Token</p>)
		});
	});

});
