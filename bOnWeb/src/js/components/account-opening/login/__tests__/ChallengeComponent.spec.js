jest.unmock('../ChallengeComponent');
jest.unmock('../../../../utils/ChallengeUtils');
jest.unmock('../challenges/SecurityQuestionsChallenge');
jest.unmock('../challenges/PartialPasswordChallenge');
jest.unmock('../challenges/OTPChallenge');
jest.unmock('../challenges/AccessSortCodeAccountChallenge');
jest.unmock('../challenges/index');

const React = require('react');
const TestUtils = require('react-addons-test-utils');

const _ = require('lodash');
const ChallengeComponent = require('../ChallengeComponent');
const MultiTextQuestion = require('../../../common/questionsets/MultiTextQuestion');

const {
	PartialPasswordChallenge,
	SecurityQuestionsChallenge,
	AccessSortCodeAccountChallenge,
	DebitCardChallenge,
	OTPChallenge,
	ChallengeError,
} = require('../challenges');


const AccountOpeningActions = require('../../../../actions/AccountOpeningActions');

const container = document.createElement('div');
const render = (comp, el) => ReactDOM.render(comp, el || container);
const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<ChallengeComponent
						   {...props}
						/>);
	return shallowRenderer.getRenderOutput();
};

function getTestData(challenge = {}, content = {}, challengeError = false, tokenError = false) {

	let data = {
		session: {
			challenge: {
				error: challengeError,
				auth_schemes: [{
					challenges: challenge
				}]
			},
			token: {
				error: tokenError,
			}
		},
		content: content,
		data: {},
		encryptAnswer: jest.fn(),
		requestAuthenticationUpdate: jest.fn(),
	};

	if(_.isEmpty(challenge) && !challengeError && !tokenError) {
		delete data.session.challenge;
	}

	return data;
}

const executeTests = (testCase) => {
	it(testCase.desc, () => {
		const props = getTestData(testCase.challenge, testCase.content, testCase.challengeError, testCase.tokenError);
		const actual = shallowRender(props);
		const expected = testCase.expected(props);
		expect(actual)[testCase.matcher || 'toEqualJSX'](expected);
	});
}

describe('ChallengeComponent', () => {
	let instance;
	let session;
	let content;
	let data;
	let encryptAnswer;
	let requestAuthenticationUpdate;

	const testCases = [{
		desc: 'should render null when there is no challenge',
		matcher: 'toEqual',
		expected: () => null
	}, {
		desc: 'should render a challenge error message',
		content: {cannotBeLoggedIn: 'Error'},
		challengeError: true,
		expected: (props) => (<div><ChallengeError type="cannotBeLoggedIn" {...props} /></div>)
	}, {
		desc: 'should render a token error message',
		content: {cannotBeLoggedIn: 'Error', goneWrongMessage: 'Error'},
		challengeError: false,
		tokenError: true,
		expected: (props) => (<div><ChallengeError type="goneWrongMessage" {...props} /></div>)
	}, {
		desc: 'should render a partial password challenge',
		challenge: { partial_password: { positions: [1,2,3] }},
		content: { cannotBeLoggedIn: 'Error', goneWrongMessage: 'Error', passwordLabel: 'Password' },
		expected: (props) => (<div><PartialPasswordChallenge {...props} /></div>)
	}, {
		desc: 'should render a securty question challenge',
		challenge: { security_questions: { questions: ['question'] }},
		content: { cannotBeLoggedIn: 'Error', goneWrongMessage: 'Error', passwordLabel: 'Password' },
		expected: (props) => (<div><SecurityQuestionsChallenge {...props} /></div>)
	}, {
		desc: 'should render an ACN challenge',
		challenge: { acn: {}},
		content: { cannotBeLoggedIn: 'Error', goneWrongMessage: 'Error', passwordLabel: 'Password' },
		expected: (props) => (<div><AccessSortCodeAccountChallenge {...props} /></div>)
	}, {
		desc: 'should render a debit card challenge',
		challenge: { debit_card: {}},
		content: { cannotBeLoggedIn: 'Error', goneWrongMessage: 'Error', passwordLabel: 'Password' },
		expected: (props) => (<div><DebitCardChallenge {...props} /></div>)
	}, {
		desc: 'should render an OTP challenge',
		challenge: { otp: {}},
		content: { cannotBeLoggedIn: 'Error', goneWrongMessage: 'Error', passwordLabel: 'Password' },
		expected: (props) => (<div><OTPChallenge {...props} /></div>)
	},];

	testCases.forEach(executeTests);

	describe('setCustomerType', () => {
		describe('WHEN a security_questions challenge is returned', () => {
			beforeEach(() => {
				AccountOpeningActions.updateFormValue.mockClear();

				({session, content, data, encryptAnswer, requestAuthenticationUpdate} = getTestData({
					'security_questions': {
						questions: ['question']
					}
				}));

				instance = TestUtils.renderIntoDocument(
					<ChallengeComponent
						data={data}
						session={session}
						content={content}
						encryptAnswer={encryptAnswer}
						requestAuthenticationUpdate={requestAuthenticationUpdate}
					/>);
			});

			it('should set the user as RIB', () => {
				expect(AccountOpeningActions.updateFormValue.mock.calls[0][0]).toBe('isRibCustomer');
				expect(AccountOpeningActions.updateFormValue.mock.calls[0][1]).toBe(true);
			});

		});

		describe('WHEN a acn challenge is returned', () => {
			beforeEach(() => {
				AccountOpeningActions.updateFormValue.mockClear();

				({session, content, data, encryptAnswer, requestAuthenticationUpdate} = getTestData({
					'acn': {
					}
				}, {
					accessCodeValidationMessage: 'validationMessage',
				}));

				instance = TestUtils.renderIntoDocument(
					<ChallengeComponent
						data={data}
						session={session}
						content={content}
						encryptAnswer={encryptAnswer}
						requestAuthenticationUpdate={requestAuthenticationUpdate}
					/>);
			});

			it('should set the user as TB', () => {
				expect(AccountOpeningActions.updateFormValue.mock.calls[0][0]).toBe('isTbCustomer');
				expect(AccountOpeningActions.updateFormValue.mock.calls[0][1]).toBe(true);
			});
		});
	});
});
