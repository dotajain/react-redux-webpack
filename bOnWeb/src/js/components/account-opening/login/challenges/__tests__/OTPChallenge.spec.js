jest.unmock('../../../../common/questionsets/MultiTextQuestion');
jest.unmock('../../../../common/questionsets/TextQuestion');
jest.unmock('../OTPChallenge');
jest.unmock('../../../../../utils/MaskingUtils');
jest.unmock('../../../../../utils/EncryptionUtils');

const React = require('react');
const TestUtils = require('react-addons-test-utils');

const SessionActionCreator = require('../../../../../actions/SessionActionCreator');

const TextQuestion = require('../../../../common/questionsets/TextQuestion');
const LoadingSpinner = require('../../../../LoadingSpinner');
const OTPChallenge = require('../OTPChallenge');

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<OTPChallenge
						   {...props}
						/>);
	return shallowRenderer.getRenderOutput();
};

describe('when a user has an OTPChallenge', () => {

	let component;
	let props;

	beforeEach(() => {
		props = {
			data: {
				phoneNumber: '121212',
			},
			content: {
				passwordCharacterPrefix: '123',
				passwordLabel: 'abc',
				OTPAuthenticationSubTitle: 'sub-title',
				OTPAuthenticationAltSubTitle: 'alt-sub-title',
			},
			session: {
				isStepupAuthenticationComplete: false,
				challenge: {
					auth_scheme: {
						challenges: {
							otp: {
							},
						},
					},
					auth_session_id: {
					},
					public_key: {
					},
				},
			},
			encryptAnswer: jest.fn(),
			requestAuthenticationUpdate: jest.fn(),
		};

		component = shallowRender(props);
	});

	it('should render TextQuestion', () => {
		expect(component).toEqualJSX(
			<div>
				<TextQuestion
					name="otp"
					key="otp"
					labelSpan={<div className="otp-resend-button-container"><button onClick={() => {}} className="otp-text-question-resend-button" data-anchor="auth-challenge-otp-resend">Resend</button></div>}
					containerClassName="otp-text-question-container"
					labelContainerClassName="otp-text-question-label-container"
					labelClassName="otp-text-question-label"
					group="GROUP_LOGIN"
					mainColumnSize={12}
					mainColumnSizeMD={12}
					minLength={10}
					maxLength={10}
					validateType="number"
					onChange={() => {}}
					helpText="sub-title"
					dataAnchor="auth-challenge-otp-input"
					required>
				</TextQuestion>
			</div>
		);
	});

	describe('and answering the security question', () => {

		beforeEach(() => {
			component.props.children.props.onChange('test', [0,3,5]);
		});

		it('should create authentication answers update', () => {
			expect(props.requestAuthenticationUpdate.mock.calls.length).toBe(1);
		});
	});

	describe('maskPartialPhoneNumber', () => {

		describe('when the phoneNumber is populated', () => {
			beforeEach(() => {
				props = {
					data: {
						phoneNumber: '07719318129',
					},
					content: {
						passwordCharacterPrefix: '123',
						passwordLabel: 'abc',
						OTPAuthenticationSubTitle: '{partial-phone-number}',
						OTPAuthenticationAltSubTitle: 'alt-sub-title',
						OTPAuthenticationTitle: '{partial-phone-number}',
						OTPAuthenticationAltTitle: 'otp alt',
					},
					session: {
						isStepupAuthenticationComplete: false,
						challenge: {
							auth_scheme: {
								challenges: {
									otp: {
									},
								},
							},
							auth_session_id: {
							},
							public_key: {
							},
						},
					},
					encryptAnswer: jest.fn(),
					requestAuthenticationUpdate: jest.fn(),
				};

				component = shallowRender(props);
			});

			it('should correctly mask the number', () => {
				expect(component).toEqualJSX(
					<div>
						<TextQuestion
							name="otp"
							key="otp"
							labelSpan={<div className="otp-resend-button-container"><button onClick={() => {}} className="otp-text-question-resend-button" data-anchor="auth-challenge-otp-resend">Resend</button></div>}
							containerClassName="otp-text-question-container"
							labelContainerClassName="otp-text-question-label-container"
							labelClassName="otp-text-question-label"
							group="GROUP_LOGIN"
							mainColumnSize={12}
							mainColumnSizeMD={12}
							minLength={10}
							maxLength={10}
							validateType="number"
							onChange={() => {}}
							helpText="*******8129"
							dataAnchor="auth-challenge-otp-input"
							required>
							*******8129
						</TextQuestion>
					</div>
				);
			});
		});

		describe('when the currentUserPhoneNumber is populated', () => {
			beforeEach(() => {
				props = {
					data: {
					},
					content: {
						passwordCharacterPrefix: '123',
						passwordLabel: 'abc',
						OTPAuthenticationSubTitle: '{partial-phone-number}',
						OTPAuthenticationAltSubTitle: 'alt-sub-title',
						OTPAuthenticationTitle: '{partial-phone-number}',
						OTPAuthenticationAltTitle: 'otp alt',
					},
					session: {
						isStepupAuthenticationComplete: false,
						currentUserPhoneNumber: '07719318129',
						challenge: {
							auth_scheme: {
								challenges: {
									otp: {
									},
								},
							},
							auth_session_id: {
							},
							public_key: {
							},
						},
					},
					encryptAnswer: jest.fn(),
					requestAuthenticationUpdate: jest.fn(),
				};

				component = shallowRender(props);
			});

			it('should correctly mask the number', () => {
				expect(component).toEqualJSX(
					<div>
						<TextQuestion
							name="otp"
							key="otp"
							labelSpan={<div className="otp-resend-button-container"><button onClick={() => {}} className="otp-text-question-resend-button" data-anchor="auth-challenge-otp-resend">Resend</button></div>}
							containerClassName="otp-text-question-container"
							labelContainerClassName="otp-text-question-label-container"
							labelClassName="otp-text-question-label"
							group="GROUP_LOGIN"
							mainColumnSize={12}
							mainColumnSizeMD={12}
							minLength={10}
							maxLength={10}
							validateType="number"
							onChange={() => {}}
							helpText="*******8129"
							dataAnchor="auth-challenge-otp-input"
							required>
							*******8129
						</TextQuestion>
					</div>
				);
			});
		})

		describe('when the no number data is populated', () => {
			beforeEach(() => {
				props = {
					data: {
					},
					content: {
						passwordCharacterPrefix: '123',
						passwordLabel: 'abc',
						OTPAuthenticationSubTitle: '{partial-phone-number}',
						OTPAuthenticationAltSubTitle: 'alt-sub-title',
						OTPAuthenticationTitle: '{partial-phone-number}',
						OTPAuthenticationAltTitle: 'otp alt',
					},
					session: {
						isStepupAuthenticationComplete: false,
						challenge: {
							auth_scheme: {
								challenges: {
									otp: {
									},
								},
							},
							auth_session_id: {
							},
							public_key: {
							},
						},
					},
					encryptAnswer: jest.fn(),
					requestAuthenticationUpdate: jest.fn(),
				};

				component = shallowRender(props);
			});

			it('should correctly mask the number', () => {
				expect(component).toEqualJSX(
					<div>
						<TextQuestion
							name="otp"
							key="otp"
							labelSpan={<div className="otp-resend-button-container"><button onClick={() => {}} className="otp-text-question-resend-button" data-anchor="auth-challenge-otp-resend">Resend</button></div>}
							containerClassName="otp-text-question-container"
							labelContainerClassName="otp-text-question-label-container"
							labelClassName="otp-text-question-label"
							group="GROUP_LOGIN"
							mainColumnSize={12}
							mainColumnSizeMD={12}
							minLength={10}
							maxLength={10}
							validateType="number"
							onChange={() => {}}
							helpText="alt-sub-title"
							dataAnchor="auth-challenge-otp-input"
							required>
							otp alt
						</TextQuestion>
					</div>
				);
			});
		});
	});
	describe('when requesting OTP', () => {
		beforeEach(() => {
			props = {
				data: {
				},
				content: {
					passwordCharacterPrefix: '123',
					passwordLabel: 'abc',
					OTPAuthenticationSubTitle: '{partial-phone-number}',
					OTPAuthenticationAltSubTitle: 'alt-sub-title',
					OTPAuthenticationTitle: '{partial-phone-number}',
					OTPAuthenticationAltTitle: 'otp alt',
				},
				session: {
					isStepupAuthenticationComplete: false,
					isMakingOtpRequest: true,
					challenge: {
						auth_scheme: {
							challenges: {
								otp: {
								},
							},
						},
						auth_session_id: {
						},
						public_key: {
						},
					},
				},
				encryptAnswer: jest.fn(),
				requestAuthenticationUpdate: jest.fn(),
			};

			component = shallowRender(props);
		});

		it('should show loading spinner', () => {
			expect(component).toEqualJSX(
				<div>
					<LoadingSpinner imgSize={30} />
				</div>
			);
		});
	});

});