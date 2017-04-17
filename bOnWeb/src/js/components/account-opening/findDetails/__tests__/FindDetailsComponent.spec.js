
jest.unmock('../FindDetailsComponent');
jest.unmock('react-bootstrap-datetimepicker');
jest.unmock('../../../../utils/ChallengeUtils');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const _ = require('lodash');

const FindDetailsComponent = require('../FindDetailsComponent');

const ChallengeUtils = require('../../../../utils/ChallengeUtils');

const { buildFindMockByNameFilter } = require('../../../../__helpers__/TestHelpers');

// Mocks
const { TextQuestion, DatePickerQuestion, DropdownQuestion, RadioQuestion } = require('../../../common/questionsets');
const BottomNavigationBox = require('../../../common/BottomNavigationBox');
const SessionActionCreator = require('../../../../actions/SessionActionCreator');
const ErrorMessage = require('../../../common/ErrorMessage');
const AccountOpeningActions = require('../../../../actions/AccountOpeningActions');
const ChallengeComponent = require('../../login/ChallengeComponent');

DatePickerQuestion.prototype.shouldComponentUpdate = jest.fn(() => {
	return true;
});

describe('FindDetailsComponent', () => {
	let content = {
		authBankQuestion: 'authBankQuestion',
		authFirstNameQuestion: 'authFirstNameQuestion',
		authLastNameQuestion: 'authLastNameQuestion',
		authDateOfBirthQuestion: 'authDateOfBirthQuestion',
		authGenderQuestion: 'authGenderQuestiond',
		authHouseNumberQuestion: 'authHouseNumberQuestion',
		authStreetQuestion: 'authStreetQuestion',
		authPostcodeQuestion: 'authPostcodeQuestion',
		authCheckDetailsError: 'authCheckDetailsError',
		authNextButtonText: 'Next',
	};

	const data = {
		firstName: 'firstName',
		lastName: 'lastName',
		dateOfBirth: 'dateOfBirth',
		gender: 'gender',
		addressLine: 'addressLine',
		postcode: 'postcode',
		username: undefined,
	};

	let instance;
	let container;

	let button;
	let textboxes;
	let dropdowns;
	let datePicker;
	let radio;

	const session = {
		allowRetry: true,
		token: {}
	};

	const envConfig = {
		bankId: 'DYB',
	}

	const targetScope = 1;

	const onSuccess = jest.fn();

	const render = (comp, el) => ReactDOM.render(comp, el);

	beforeEach(() => {
		container = document.createElement('div');
		instance = render(
			<FindDetailsComponent
				targetScope={targetScope}
				data={data}
				session={session}
				content={content}
				onSuccess={onSuccess}
				validations={{}}
				envConfig={envConfig}
			/>, container
		);
	});

	afterEach(() => {
		instance = undefined;
		AccountOpeningActions.updateFormValue.mockClear();
		TextQuestion.mockClear();
		DropdownQuestion.mockClear();
		DatePickerQuestion.mockClear();
		RadioQuestion.mockClear();
	});

	describe('componentWillMount', () => {
		const defaultProps = update => _.defaults(update, {
				session: {
					token: {},
					challenge: {}
				},
				data: {
					username: {},
				},
				content,
				validations: {},
				targetScope: 40,
				envConfig: { bankId: 'DYB' },
				onSuccess: () => {},
			});

		const testCases = [{
			desc: 'should reset bank id if set and we are B',
			props: defaultProps({
				data: { bankID: 'DYB', },
				envConfig: { bankId: 'DYB' }
			}),
			action: AccountOpeningActions.resetBankId,
			expect: action => action.toBeCalled(),
		}, {
			desc: 'should not reset bank id if set and we are not on B',
			props: defaultProps({
				data: { bankID: 'DYB', },
				envConfig: { bankId: 'CB' }
			}),
			action: AccountOpeningActions.resetBankId,
			expect: action => action.not.toBeCalled(),
		}, {
			desc: 'should reset token if set',
			props: defaultProps({
				session: {
					token: {
						hash: '121212',
					}
				}
			}),
			action: SessionActionCreator.requestAccessTokenReset,
			expect: action => action.toBeCalled(),
		}, {
			desc: 'should not reset token if unset',
			props: defaultProps(),
			action: SessionActionCreator.requestAccessTokenReset,
			expect: action => action.not.toBeCalled(),
		}, {
			desc: 'should reset challenge if set',
			props: defaultProps({
				session: {
					challenge: {
						security_questions: ['']
					}
				}
			}),
			action: SessionActionCreator.requestAccessChallengeReset,
			expect: action => action.toBeCalled(),
		}, {
			desc: 'should not reset challenge if unset',
			props: defaultProps({
				session: {
					challenge: {},
				}
			}),
			action: SessionActionCreator.requestAccessChallengeReset,
			expect: action => action.not.toBeCalled(),
		}, {
			desc: 'should reset username if set',
			props: defaultProps({
				data: {
					username: 'test',
				}
			}),
			action: AccountOpeningActions.resetUsername,
			expect: action => action.toBeCalled(),
		}, {
			desc: 'should reset username if unset',
			props: defaultProps({
				data: {
					username: '',
				}
			}),
			action: AccountOpeningActions.resetUsername,
			expect: action => action.not.toBeCalled(),
		}, {
			desc: 'should clear user info if any field set',
			props: defaultProps({
				data: {
					authFirstName: 'test',
				}
			}),
			action: AccountOpeningActions.resetUserInfo,
			expect: action => action.toBeCalled(),
		}];

		const executeTest = testCase => {

			afterEach(() => {
				testCase.action.mockClear();
			});

			it(testCase.desc, () => {
				instance = render(<FindDetailsComponent {...testCase.props} />, document.createElement('div'));
				testCase.expect(expect(testCase.action));
			});
		};

		testCases.forEach(executeTest);
	});

	describe('componentDidMount', () => {
		it('sets the bank ID on mount when on CYB', () => {
			instance = render(
				<FindDetailsComponent
					targetScope={targetScope}
					data={data}
					session={session}
					content={content}
					onSuccess={onSuccess}
					validations={{}}
					envConfig={{
						bankId: 'YB',
					}}
				/>, document.createElement('div')
			);
			expect(AccountOpeningActions.updateFormValue).toBeCalledWith('bankID', 'YB');
		});

		it('Does NOT set the bank ID on mount when on DYB', () => {
			instance = render(
				<FindDetailsComponent
					targetScope={targetScope}
					data={data}
					session={session}
					content={content}
					onSuccess={onSuccess}
					validations={{}}
					envConfig={{
						bankId: 'DYB',
					}}
				/>, document.createElement('div')
			);
			expect(AccountOpeningActions.updateFormValue.mock.calls.length).toBe(0);
		});
	});


	describe('WHEN I select I do not know my customer number', () => {
		beforeEach(() => {
			textboxes = buildFindMockByNameFilter(TextQuestion.mock.calls);
			dropdowns = buildFindMockByNameFilter(DropdownQuestion.mock.calls);
			datePicker = buildFindMockByNameFilter(DatePickerQuestion.mock.calls);
			radio = buildFindMockByNameFilter(RadioQuestion.mock.calls);
		});

		it('should show bank id question if on DYB', () => {
			expect(radio('authBankId')).toBeTruthy();
		});

		it('should NOT show bank id question WHEN on CYB', () => {
			global.envConfig.bankId = 'YB';
			RadioQuestion.mockClear();
			instance.renderForm();

			expect(RadioQuestion.mock.calls.length).toBe(0);
		});

		it('I will be asked to provide my First name', () => {
			expect(textboxes('authFirstName')).toBeTruthy();
		});

		it('I will be asked to provide my Last name', () => {
			expect(textboxes('authLastName')).toBeTruthy();
		});

		it('I will be asked to provide my DOB', () => {
			expect(datePicker('authDateOfBirth')).toBeTruthy();
		});

		it('I will be asked to provide my gender', () => {
			expect(dropdowns('authGender')).toBeTruthy();
		});

		it('I will be asked to provide my house number', () => {
			expect(textboxes('authHouseNumber')).toBeTruthy();
		});

		it('I will be asked to provide my street', () => {
			expect(textboxes('authStreet')).toBeTruthy();
		});

		it('I will be asked to provide my post code', () => {
			expect(textboxes('authPostcode')).toBeTruthy();
		});

		describe('GIVEN I have provided additional information to be recognised', () => {
			describe('WHEN I select a gender', () => {
				beforeEach(() => {
					AccountOpeningActions.updateFormValue.mockClear()
					dropdowns('authGender').onChange('gender', 'Male');
				});

			   it('should set the correct value', () => {
				  expect(AccountOpeningActions.updateFormValue.mock.calls[0][1]).toBe('M');
			   });
			});

			describe('WHEN I submit my information', () => {
				beforeEach(() => {
					// Simulate the click
					BottomNavigationBox.mock.calls[0][0]
						.onClickNext({
							preventDefault: jest.fn(),
						});

				});

				it('should submit my details', () => {
					expect(SessionActionCreator.requestAccessChallengeCreate.mock.calls).toBeTruthy();
				});

				describe('when challenges has been set', () => {
					let requestAccessChallengeCreate;

					beforeEach(() => {
						BottomNavigationBox.mockClear();
						ChallengeComponent.mockClear();
						TextQuestion.mockClear();

						const session = _.assign({}, instance.props.session, {
							challenge: {
									'challenge' : 'challenge'
								},
						});

						instance = render(
							<FindDetailsComponent
								targetScope={targetScope}
								data={data}
								session={session}
								content={content}
								onSuccess={onSuccess}
								validations={{}}
								envConfig={envConfig}
							/>, container
						);
					});

					it('should not render the personal details form', () => {
						expect(TextQuestion.mock.calls.length).toBe(0);
					});

					it('it should render a next button', () => {
						expect(TestUtils.findRenderedComponentWithType(instance, BottomNavigationBox)).toBeTruthy();
					});

					it('should render the challenge component', () => {
						expect(ChallengeComponent.mock.calls.length).toBe(1);
					});

					describe('when submitting challenge questions', () => {
						let requestAccessTokenCreate;

						beforeEach(() => {
							requestAccessTokenCreate = jest.fn();
							SessionActionCreator.requestAccessTokenCreate = requestAccessTokenCreate;

							const e = {
								preventDefault: jest.fn()
							};

							instance._onSubmitHandler(e)
						});

						it('should requestAccessTokenCreate', () => {
							expect(requestAccessTokenCreate.mock.calls[0][0]).toBeTruthy();
						});

						it('should supply a callback', () => {
							expect(_.isFunction(requestAccessTokenCreate.mock.calls[0][1])).toBe(true);
						});
					});
				});

				describe('AND MULTIPLE matches are made', () => {
					let errors;

					beforeEach(() => {
						ErrorMessage.mockClear();
						const session = _.assign({}, instance.props.session, {
							error: true
						});

						instance = render(
							<FindDetailsComponent
								targetScope={targetScope}
								data={data}
								session={session}
								content={content}
								onSuccess={onSuccess}
								validations={{}}
								envConfig={envConfig}
							/>, container
						);

						errors = ErrorMessage.mock.calls;
					});

					it('will inform me to check my details', () => {
						expect(errors[0][0].text).toBe(content.authCheckDetailsError);
					});
				});
			});
		});
	});


	describe('when authentication is preparing to stepup', () => {
		let isCurrentGroupValid;

		beforeEach(() => {
			BottomNavigationBox.mockClear();

			isCurrentGroupValid = instance.isCurrentGroupValid;
			instance.isCurrentGroupValid = () => true;

			const session = _.extend({}, instance.props.session, {isPreparingStepupAuthentication: true});


			instance = render(
				<FindDetailsComponent
					targetScope={targetScope}
					data={data}
					session={session}
					content={content}
					onSuccess={onSuccess}
					validations={{}}
					envConfig={envConfig}
				/>, container
			);
		});

		afterEach(() => {
			instance.isCurrentGroupValid = isCurrentGroupValid;
		});

		it('should not be possible to click the submit buttons', () => {
			expect(TestUtils.findRenderedComponentWithType(instance, BottomNavigationBox).props.disabled).toBe(true);
		});
	});

	describe('when authentication is not preparing to stepup', () => {
		let isCurrentGroupValid;

		beforeEach(() => {
			BottomNavigationBox.mockClear();

			isCurrentGroupValid = instance.isCurrentGroupValid;
			instance.isCurrentGroupValid = () => true;

			const session = _.extend({}, instance.props.session, {isPreparingStepupAuthentication: false});
			instance = render(
				<FindDetailsComponent
					targetScope={targetScope}
					data={data}
					session={session}
					content={content}
					onSuccess={onSuccess}
					validations={{}}
					envConfig={envConfig}
				/>, container
			);
		});

		it('should be possible to click the submit buttons', () => {
			expect(TestUtils.findRenderedComponentWithType(instance, BottomNavigationBox).props.disabled).toBe(false);
		});
	});
});
