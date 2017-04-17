jest.unmock('../../../../common/questionsets/TextQuestion');
jest.unmock('../SecurityQuestionsChallenge');
jest.unmock('../../../../../utils/EncryptionUtils');

const React = require('react');
const TestUtils = require('react-addons-test-utils');

const SessionActionCreator = require('../../../../../actions/SessionActionCreator');

const TextQuestion = require('../../../../common/questionsets/TextQuestion');
const SecurityQuestionsChallenge = require('../SecurityQuestionsChallenge');

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<SecurityQuestionsChallenge
						   {...props}
						/>);
	return shallowRenderer.getRenderOutput();
};

describe('when a user has security question challenge', () => {

	let component;
	let props;

	beforeEach(() => {
		props = {
			session: {
				challenge: {
					auth_schemes: [{
						challenges: {
							security_questions: {
								questions: ['question1', 'question2'],
							},
						}
					}],
					auth_session_id: {
					},
					public_key: {
					}
				}
			},
			encryptAnswer: jest.fn(),
			requestAuthenticationUpdate: jest.fn(),
		};

		props.encryptAnswer.mockReturnValueOnce('hashed');
		component = shallowRender(props);
	});

	it('should render list of TextQuestion', () => {
		expect(component).toEqualJSX(<span>
			<TextQuestion
				name="security-question-0"
				key="security-question-0"
				groupValidationName={'authChallengeSecurityQuestion'}
				group="GROUP_LOGIN"
				dataAnchor="security-question-0"
				onChange={() => {}}
				mainColumnSize={12}
				mainColumnSizeMD={12}
				required>
				question1
			</TextQuestion><TextQuestion
				name="security-question-1"
				key="security-question-1"
				groupValidationName={'authChallengeSecurityQuestion'}
				group="GROUP_LOGIN"
				dataAnchor="security-question-1"
				onChange={() => {}}
				mainColumnSize={12}
				mainColumnSizeMD={12}
				required>
				question2
			</TextQuestion></span>);
	});

	describe('and answering the security question', () => {

		beforeEach(() => {
			component.props.children[0].props.onChange('test', 'test', 'test');
		});

		it('should create authentication answers update', () => {
			expect(props.requestAuthenticationUpdate.mock.calls.length).toBe(1);
		});

		it('should construct a valid authentication update', () => {
			expect(props.requestAuthenticationUpdate.mock.calls[0][0].authType).toEqual('security-questions');
		});
	});
});
