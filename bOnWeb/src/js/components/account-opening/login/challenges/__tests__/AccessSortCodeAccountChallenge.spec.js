jest.unmock('../../../../common/questionsets/TextQuestion');
jest.unmock('../AccessSortCodeAccountChallenge');
jest.unmock('../../../../../utils/EncryptionUtils');

const React = require('react');
const TestUtils = require('react-addons-test-utils');

const SessionActionCreator = require('../../../../../actions/SessionActionCreator');

const TextQuestion = require('../../../../common/questionsets/TextQuestion');
const AccessSortCodeAccountChallenge = require('../AccessSortCodeAccountChallenge');

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<AccessSortCodeAccountChallenge
						   {...props}
						/>);
	return shallowRenderer.getRenderOutput();
};

describe('when a user has security question challenge', () => {

	let component;
	let props;

	beforeEach(() => {
		props = {
			content: {
				accessCodeValidationMessage: 'access_validation',
				accessCodeHelpMessage: 'access_help',
				telephoneAuthAccessCode: 'access_telephone',

				sortCodeValidationMessage: 'sortcode_validation',
				sortCodeHelpMessage: 'sortcode_help',
				telephoneAuthSortCode: 'sortcode_telephone',

				accountNumberValidationMessage: 'account_validation',
				accountNumberHelpMessage: 'account_help',
				telephoneAuthAccountNumber: 'account_telephone',
			},
			session: {
				challenge: {
					auth_scheme: {
						challenges: {
							acn: {
							},
						}
					},
					auth_session_id: {
					},
					public_key: {
					}
				}
			},
			encryptAnswer: jest.fn(),
			requestAuthenticationUpdate: jest.fn(),
		};

		component = shallowRender(props);
	});

	it('should render list of TextQuestion', () => {
		expect(component).toEqualJSX(<span><TextQuestion
				name="access_code"
				key="access_code"
				group="GROUP_LOGIN"
				mainColumnSize={12}
				mainColumnSizeMD={12}
				minLength={4}
				maxLength={4}
				validateType="number"
				validationText="access_validation"
				helpText="access_help"
				onChange={() => {}}
				dataAnchor="auth-challenge-acn-input"
				required>
				access_telephone
			</TextQuestion>
			<TextQuestion
				name="sort_code"
				key="sort_code"
				group="GROUP_LOGIN"
				mainColumnSize={12}
				mainColumnSizeMD={12}
				minLength={6}
				maxLength={6}
				validateType="number"
				validationText="sortcode_validation"
				helpText="sortcode_help"
				onChange={() => {}}
				dataAnchor="auth-challenge-sort-code-input"
				required>
				sortcode_telephone
			</TextQuestion>
			<TextQuestion
				name="account_number"
				key="account_number"
				group="GROUP_LOGIN"
				mainColumnSize={12}
				mainColumnSizeMD={12}
				minLength={8}
				maxLength={8}
				validateType="number"
				validationText="account_validation"
				helpText="account_help"
				onChange={() => {}}
				dataAnchor="auth-challenge-account-number-input"
				required>
				account_telephone
			</TextQuestion></span>);
	});

	describe('and answering the security question', () => {

		beforeEach(() => {
			component.props.children[0].props.onChange('test', 'test', 'test');
		});

		it('should create authentication answers update', () => {
			expect(props.requestAuthenticationUpdate.mock.calls.length).toBe(1);
		});
	});
});
