jest.unmock('../../../../common/questionsets/MultiTextQuestion');
jest.unmock('../../../../common/questionsets/TextQuestion');
jest.unmock('../PartialPasswordChallenge');
jest.unmock('../../../../../utils/EncryptionUtils');

const React = require('react');
const TestUtils = require('react-addons-test-utils');

const SessionActionCreator = require('../../../../../actions/SessionActionCreator');

const MultiTextQuestion = require('../../../../common/questionsets/MultiTextQuestion');
const PartialPasswordChallenge = require('../PartialPasswordChallenge');

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<PartialPasswordChallenge
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
				passwordCharacterPrefix: '123',
				passwordLabel: 'abc'
			},
			session: {
				challenge: {
					auth_schemes: [{
						challenges: {
							partial_password: {
								positions: [0,3,5],
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

		component = shallowRender(props);
	});

	it('should render MultiTextQuestion', () => {
		expect(component).toEqualJSX(<MultiTextQuestion
			name="password"
			key="password"
			group="GROUP_LOGIN"
			data={[0,3,5]}
			itemPrefix="123"
			onChange={() => {}}
			mainColumnSize={4}
			mainColumnSizeMD={4}
			inputsMaxLength={1}
			inputType="password"
			autoTab
			required>
			abc
		</MultiTextQuestion>);
	});

	describe('and answering the security question', () => {

		beforeEach(() => {
			component.props.onChange('test', [0,3,5]);
		});

		it('should create authentication answers update', () => {
			expect(props.requestAuthenticationUpdate.mock.calls.length).toBe(1);
		});
	});
});
