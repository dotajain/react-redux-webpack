jest.unmock('../../../../common/questionsets/MultiTextQuestion');
jest.unmock('../../../../common/questionsets/TextQuestion');
jest.unmock('../DebitCardChallenge');
jest.unmock('../../../../../utils/EncryptionUtils');

const React = require('react');
const TestUtils = require('react-addons-test-utils');

const SessionActionCreator = require('../../../../../actions/SessionActionCreator');

const TextQuestion = require('../../../../common/questionsets/TextQuestion');
const DebitCardChallenge = require('../DebitCardChallenge');

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<DebitCardChallenge
						   {...props}
						/>);
	return shallowRenderer.getRenderOutput();
};

describe('when a user has partial password challenge', () => {

	let component;
	let props;

	beforeEach(() => {
		props = {
			content: {

				panValidationMessage: 'validation_pan',
				panHelpMessage: 'help_pan',
				debitCardAuthPan: 'auth_pan',

				sortCodeValidationMessage: 'validation_sortcode',
				sortCodeHelpMessage: 'help_sortcode',
				debitCardAuthSortCode: 'debit_sortcode',

				accountNumberValidationMessage: 'validation_account',
				accountNumberHelpMessage: 'help_account',
				debitCardAuthAccountNumber: 'debit_account',
			},
			session: {
				challenge: {
					auth_scheme: {
						challenges: {
							debit_card: {
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

	it('should render multiple TextQuestion', () => {

		expect(component).toEqualJSX(<span><TextQuestion
			name="pan"
			key="pan"
			group="GROUP_LOGIN"
			mainColumnSize={12}
			mainColumnSizeMD={12}
			minLength={16}
			maxLength={16}
			validateType="number"
			validationText="validation_pan"
			helpText="help_pan"
			onChange={() => {}}
			dataAnchor="auth-challenge-pan-input"
			required>
			auth_pan
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
			validationText="validation_sortcode"
			helpText="help_sortcode"
			onChange={() => {}}
			dataAnchor="auth-challenge-sort-code-input"
			required>
			debit_sortcode
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
			validationText="validation_account"
			helpText="help_account"
			onChange={() => {}}
			dataAnchor="auth-challenge-account-number-input"
			required>
			debit_account
		</TextQuestion></span>);
	});

	describe('and answering the security question', () => {
		const encryptValues = [0,3,5];

		beforeEach(() => {
			component.props.children[0].props.onChange('test', encryptValues);
		});

		it('should create authentication answers update', () => {
			expect(props.encryptAnswer.mock.calls[0][0]).toEqual(encryptValues);
			expect(props.requestAuthenticationUpdate.mock.calls.length).toBe(1);
		});
	});
});
