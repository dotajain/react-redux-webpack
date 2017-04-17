/**
 * @test RegistrationPage
 */
jest.unmock('../RegistrationPage');
jest.unmock('../../common/ComponentHeader');
jest.unmock('../../common/PageColumnWrapper');
jest.unmock('../../common/SectionFullWidth');
jest.unmock('../../common/BottomNavigationBox');
jest.unmock('../../common/questionsets/TextQuestion');
jest.unmock('../../common/questionsets/CheckBoxQuestion')
//jest.unmock('../../../actions/AccountOpeningActions')
// jest.unmock('../../../utils/UserServicesApiUtils')

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const ReactDOM = require('react-dom');
const Helmet = require('react-helmet');

const config = require('../../../config');
const RegistrationPage = require('../RegistrationPage');
const PageHeader = require('../../common/PageHeader');
const SectionFullWidth = require('../../common/SectionFullWidth');
const ErrorMessage = require('../../common/ErrorMessage');
const BottomNavigationBox = require('../../common/BottomNavigationBox');
const AccountOpeningActions = require('../../../actions/AccountOpeningActions');
const shallowRenderer = TestUtils.createRenderer();
const ComponentHeader = require('../../common/ComponentHeader');
const SessionActionCreator = require('../../../actions/SessionActionCreator');
const TextQuestion = require('../../common/questionsets/TextQuestion');
const CheckBoxQuestion = require('../../common/questionsets/CheckBoxQuestion');
const ValidationUtils = require('../../../utils/ValidationUtils');
const TimelinePage = require('../../timeline/TimelinePage');
const UserServicesApiUtils = require('../../../utils/UserServicesApiUtils');
let props = {
	content: {
		registrationPageHeader: 'expectedPageHead',
		loginPageTitle: 'loginPageTitle',
		registrationPageErrorMessage: 'form not submitted'
	},
	data: {
		credentials: {
			security_questions: true,
			password: true,
		},
		registrationPageErrorCallbackCredential: true,
		registrationPageErrorCallbackMessage: true,
	},
	appData: {
		isApiCallInProgress: true
	},
	session: {
		genericPublicKey: false,
		genericPublicKeyDatetime: false,
		challengeMissingDetailsError: false,
	},
};

describe('customer registration page', () => {

	let component, expectedPageHead, loginPageTitle;

	beforeEach(() => {
		expectedPageHead = 'A page title';
		loginPageTitle = ''
		const props = {
			content: {
				registrationPageHeader: expectedPageHead,
				loginPageTitle: loginPageTitle,
			},
			data: {
			},
			appData: {
				isApiCallInProgress: true,
			},
			session: {},
		};

		shallowRenderer.render(<RegistrationPage {...props} />);
		component = shallowRenderer.getRenderOutput();
	});

	it('should have a helmet', () => {
		const parent = component.props.children;
		const helmetUT = parent.props.children.filter(items => items.type === Helmet);
		expect(helmetUT).toBeDefined();
	});
	it('should render Registation Page with SectionFullWidth', () => {
		ValidationUtils.isGroupValid.mockReturnValue(true)

		const props = {
			content: {
				registrationPageHeader: expectedPageHead,
				loginPageTitle: loginPageTitle,
			},
			data: {
			},
			appData: {
				isApiCallInProgress: true
			},
			session: {},
		};

		shallowRenderer.render(<RegistrationPage {...props}  appData={props.appData}/>);
		let instance = shallowRenderer.getRenderOutput();

		expect(instance).toEqualJSX(
			<div className="authentication-page">
				<div className="account-opening container-fluid">
					<Helmet title='A page title' />
					<PageHeader
						content={{ loginPageTitle: '', registrationPageHeader: 'A page title' }}
						title=""
						visible={true}
						/>
					<div
						className="registration-page container"
						role="main"
						>
						<div className="white-board">
							<SectionFullWidth
								className=""
								id={undefined}
								/>
							<div
								aria-live="assertive"
								role="alert"
								>
								<ErrorMessage
									extraClasses="error padding-bottom"
									text={undefined}
									visible={true}
									/>
							</div>
							<BottomNavigationBox
								className="text-center"
								dataAnchorNext="registration-next"
								disabled={true}
								nextButtonLabel="Proceed"
								onClickNext={jest.fn() }

								/>
						</div>
					</div>
				</div>
			</div>
		);
	});

	it('should check the security question', () => {
		const props = {
			content: {
				registrationPageHeader: 'A page title',
				loginPageTitle: 'loginPageTitle',
			},
			data: {
				credentials: {
					security_questions: 'false',
				}
			},
			appData: {
				isApiCallInProgress: true
			},
			session: {},
		};
		let instance = TestUtils.renderIntoDocument(
			<RegistrationPage {...props} />
		);

		shallowRenderer.render(<RegistrationPage {...props} />);
		component = shallowRenderer.getRenderOutput();

		expect(component).toEqualJSX(<div className="authentication-page">
			<div className="account-opening container-fluid">
				<Helmet title='A page title' />
				<PageHeader
					content={{ loginPageTitle: 'loginPageTitle', registrationPageHeader: 'A page title' }}
					title="loginPageTitle"
					visible={true}
					/>
				<div
					className="registration-page container"
					role="main"
					>
					<div className="white-board">
						<SectionFullWidth
							className=""
							id={undefined}
							>
							<ComponentHeader
								hasSeparator={false}
								title={undefined}
								titleLevel={2}
								wrapperClass="form-spacing"
								>
								<TextQuestion
									containerClassName=""
									dataAnchor="password"
									defaultValue={undefined}
									group="GROUP_REGISTRATION"
									inputContainerClassName=""
									inputType="password"
									label="Password"
									labelClassName=""
									labelContainerClassName=""
									mainColumnSize={undefined}
									mainColumnSizeMD={undefined}
									name="password1"
									onBlur={function noRefCheck() { } }
									onChange={function noRefCheck() { } }
									required={true}
									validateType="password"
									valueFormatter={function noRefCheck() { } }
									/>
								<TextQuestion
									containerClassName=""
									dataAnchor="password-confirm"
									defaultValue={undefined}
									group="GROUP_REGISTRATION"
									inputContainerClassName=""
									inputType="password"
									label="Password (confirm)"
									labelClassName=""
									labelContainerClassName=""
									mainColumnSize={undefined}
									mainColumnSizeMD={undefined}
									name="password2"
									onBlur={function noRefCheck() { } }
									onChange={function noRefCheck() { } }
									required={true}
									validateEqualTo={undefined}
									valueFormatter={function noRefCheck() { } }
									/>
							</ComponentHeader>
							<p />
							<ComponentHeader
								hasSeparator={false}
								subTitle={undefined}
								title={undefined}
								titleLevel={2}
								wrapperClass="form-spacing"
								>
								<TextQuestion
									containerClassName=""
									dataAnchor="telephone-pin1"
									defaultValue={undefined}
									group="GROUP_REGISTRATION"
									inputContainerClassName=""
									inputType="password"
									labelClassName=""
									labelContainerClassName=""
									mainColumnSize={undefined}
									mainColumnSizeMD={undefined}
									maxLength={4}
									minLength={4}
									name="telephonePin"
									onBlur={function noRefCheck() { } }
									onChange={function noRefCheck() { } }
									required={true}
									validateType="telephonePin"
									valueFormatter={function noRefCheck() { } }
									>
									Telephone PIN
								</TextQuestion>
								<TextQuestion
									containerClassName=""
									dataAnchor="telephone-pin2"
									defaultValue={undefined}
									group="GROUP_REGISTRATION"
									inputContainerClassName=""
									inputType="password"
									labelClassName=""
									labelContainerClassName=""
									mainColumnSize={undefined}
									mainColumnSizeMD={undefined}
									maxLength={4}
									minLength={4}
									name="telephonePin2"
									onBlur={function noRefCheck() { } }
									onChange={function noRefCheck() { } }
									required={true}
									validateEqualTo={undefined}
									validateType="telephonePin"
									valueFormatter={function noRefCheck() { } }
									>
									Confirm telephone PIN
								</TextQuestion>
							</ComponentHeader>
							<ComponentHeader
								hasSeparator={true}
								subTitle=" "
								title={undefined}
								titleLevel={3}
								wrapperClass=""
								>
								<p className="terms-and-conditions-checkbox">
									<a
										aria-label={undefined}
										href={undefined}
										target="_blank"
										title={undefined}
										>
										<span className="screenreader" />
									</a>(Version) </p>
								<div className="terms-and-conditions-checkbox">
									<CheckBoxQuestion
										dataAnchor="registration-terms-and-conditions"
										defaultValue={undefined}
										group="GROUP_REGISTRATION"
										name="registrationAcceptTCs"
										onChange={function noRefCheck() { } }
										required={true}
										/>
								</div>
							</ComponentHeader>
						</SectionFullWidth>
						<div
							aria-live="assertive"
							role="alert"
							>
							<ErrorMessage
								extraClasses="error padding-bottom"
								text={undefined}
								visible={true}
								/>
						</div>
						<BottomNavigationBox
							className="text-center"
							dataAnchorNext="registration-next"
							disabled={true}
							nextButtonLabel="Proceed"
							onClickNext={function noRefCheck() { } }
							/>
					</div>
				</div>
			</div>
		</div>);
	});

	it('should check the password', () => {
		const props = {
			content: {
				registrationPageHeader: 'expectedPageHead',
				loginPageTitle: 'loginPageTitle',
			},
			data: {
				credentials: {
					password: false,
				},
			},
			appData: {
				isApiCallInProgress: true
			}
		};
		let instance = TestUtils.renderIntoDocument(
			<RegistrationPage {...props} />
		);

		expect(instance.props.data.credentials['password']).toEqualJSX;
	});

	it('should check the telephone banking', () => {
		const props = {
			content: {
				registrationPageHeader: 'expectedPageHead',
				loginPageTitle: 'loginPageTitle',
			},
			data: {
				credentials: {
					acn: 'false',
				}
			},
			appData: {
				isApiCallInProgress: true
			}
		};

		let instance = TestUtils.renderIntoDocument(
			<RegistrationPage {...props} />
		);
		expect(instance.props.data.credentials['acn']).toBe("false");
	});

	it('should show error message for unsucessful submit', () => {

		let instance = TestUtils.renderIntoDocument(
			<RegistrationPage {...props} />
		);
		const error = TestUtils.findRenderedComponentWithType(instance, ErrorMessage);
		expect(error).toBeDefined();
	});

	describe('get TnC ', () => {
		let instance = TestUtils.renderIntoDocument(
			<RegistrationPage {...props} />
		);
		beforeEach(() => {
			props.data.credentials.acn = true;
			props.data.credentials.password = false;
			props.session.genericPublicKey = true;
			props.session.genericPublicKeyDatetime = true;
		});

		it('should submit the details with session', () => {
			expect(instance.props.data.credentials['password']).toBe(false);
		});
	});

	describe('WHEN the API call is in progress', () => {
		let instance;
		beforeEach(() => {
			instance = TestUtils.renderIntoDocument(<RegistrationPage {...props} />
			);
		});

		it('should disable the button', () => {
			const props = {
				content: {
					registrationPageHeader: 'expectedPageHead',
					loginPageTitle: 'loginPageTitle',
				},
			};

			expect(TestUtils.findRenderedComponentWithType(instance, BottomNavigationBox).props.disabled).toBeTruthy();
		});
	});

	describe('WHEN the button is submitted without session', () => {


		let instance = TestUtils.renderIntoDocument(
			<RegistrationPage {...props} />
		);
		beforeEach(() => {
			props.session.genericPublicKey = false;
			props.session.genericPublicKeyDatetime = false;
			const button = TestUtils.findRenderedComponentWithType(instance, BottomNavigationBox);

			button.props.onClickNext({
				preventDefault: jest.fn()
			});
		});
		it('should submit the details without session', () => {
			expect(SessionActionCreator.requestPublicKey.mock.calls.length).toBeTruthy();
		});
	});


	describe('WHEN the button is submitted with session', () => {

		let instance = TestUtils.renderIntoDocument(
			<RegistrationPage {...props} />
		);
		beforeEach(() => {
			props.session.genericPublicKey = true;
			props.session.genericPublicKeyDatetime = true;


			const button = TestUtils.findRenderedComponentWithType(instance, BottomNavigationBox);

			button.props.onClickNext({
				preventDefault: jest.fn()
			});
		});

		it('should submit the details with session', () => {
			expect(AccountOpeningActions.submitRegistrationPage.mock.calls.length).toBeTruthy();
		});

		describe('WHEN the button submitted render to timeline', () => {
			let instance = TestUtils.renderIntoDocument(
				<RegistrationPage {...props} />
			);
			beforeEach(() => {
				props.data.credentials.acn = true;
				props.data.credentials.password = true;

				props.session.genericPublicKey = true;
				props.session.genericPublicKeyDatetime = true;


				const button = TestUtils.findRenderedComponentWithType(instance, BottomNavigationBox);

				button.props.onClickNext({
					preventDefault: jest.fn()
				});
			});

			it('should navigate to web-task', () => {

				expect(AccountOpeningActions.navigateToWebTask.mock.calls.length).toBe(1);
			});

			it('should submit the details navigate to web-task', () => {

				expect(AccountOpeningActions.submitRegistrationPage.mock.calls.length).toBeTruthy()
			});

		});
		describe('WHEN SIGN UP submitted ', () => {

			let instance, props1 = props;
			beforeEach(() => {
				props1.data.credentials.acn = true;
				props1.data.credentials.security_questions = true;
				props1.data.credentials.password = true;

				props1.session.genericPublicKey = true;
				props1.session.genericPublicKeyDatetime = true;

			});

			it('it show TnC', () => {
				instance = TestUtils.renderIntoDocument(
					<RegistrationPage {...props1} />
				);
				expect(instance.props.data.credentials.acn).toBe(true);
			});
		});

		describe('componentDidUpdate', () => {
			const props = {
				content: {
					registrationPageHeader: 'expectedPageHead',
					loginPageTitle: 'loginPageTitle',
				},
				data: {
					credentials: {
						security_questions: false,
					}
				},
				appData: {
					isApiCallInProgress: true
				}
			};
			it('calls for the SecurityQuestions', () => {
				let node = document.createElement('div');
				const render = (comp, el) => ReactDOM.render(comp, el);
				instance = ReactDOM.render(<RegistrationPage {...props} />, node);
				instance.setState({ 'requestedSecurityQuestions': false })
				expect(UserServicesApiUtils.requestSecurityQuestions.mock.calls.length).toBe(1);
			});
		});
	});

});

