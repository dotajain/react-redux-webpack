
jest.unmock('../LoginComponent');
jest.unmock('../../../../utils/ChallengeUtils');
jest.unmock('classnames');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

const _ = require('lodash');

const LoginComponent = require('../LoginComponent');

const ChallengeUtils = require('../../../../utils/ChallengeUtils');

// Mocks
const ChallengeComponent = require('../ChallengeComponent');
const TextQuestion = require('../../../common/questionsets/TextQuestion');
const StaticParagraphQuestion = require('../../../common/questionsets/StaticParagraphQuestion');
const BottomNavigationBox = require('../../../common/BottomNavigationBox');
const SessionActionCreator = require('../../../../actions/SessionActionCreator');
const ValidationUtils = require('../../../../utils/ValidationUtils');

const { buildFindMockByDataAnchorFilter } = require('../../../../__helpers__/TestHelpers');

const container = document.createElement('div');
const render = (comp) => ReactDOM.render(comp, container);
const shallowRenderer = TestUtils.createRenderer();
let instance;

describe('LoginComponent', () => {

	const data = {
		username: 'username',
	};

	const content = {
	};

	let session = {
		allowRetry: true,
		token: {},
		authenticated: false,
		challenge:{}
	};

	const appData = {isApiCallInProgress: false};

	const targetScope = 1;

	const onSuccess = jest.fn();

	let result;

	const component = (
		<LoginComponent
			appData={appData}
			targetScope={targetScope}
			data={data}
			session={session}
			content={content}
			onSuccess={onSuccess}/>
	);

	beforeEach(() => {
		StaticParagraphQuestion.mockClear();
		BottomNavigationBox.mockClear();
		TextQuestion.mockClear();

		instance = render(
			component
		);

		shallowRenderer.render(component);
		result = shallowRenderer.getRenderOutput();

	});

	describe('when first rendered', () => {

		it('should contain the right components', () => {
			expect(result).toEqualJSX(
				<div>
					<div
						aria-live="assertive"
						role="alert"
					/>
					<TextQuestion
						containerClassName=""
						dataAnchor="username"
						defaultValue="username"
						group="GROUP_LOGIN"
						inputContainerClassName=""
						inputType="text"
						labelClassName=""
						labelContainerClassName=""
						mainColumnSize={12}
						mainColumnSizeMD={12}
						name="username"
						onBlur={() => {}}
						onChange={() => {}}
						required={true}
						validateType="username"
						valueFormatter={() => {}}
					/>
					<div className="" aria-hidden={false}>
						<ChallengeComponent
							appData={{isApiCallInProgress: false}}
							content={{}}
							data={{username: 'username'}}
							encryptAnswer={() => {}}
							onSuccess={() => {}}
							requestAuthenticationUpdate={() => {}}
							session={{allowRetry: true, authenticated: false, challenge: {}, token: {}}}
							targetScope={1}
						/>
					</div>
					<BottomNavigationBox
						className="col-xs-12 text-center"
						dataAnchorNext="username-next"
						disabled={true}
						isLoading={false}
						nextButtonLabel="Next"
						onClickNext={() => {}}
					/>
				</div>
			);
		});

		describe('when the username is set and submitted', () => {
			let e;
			let requestBankId;

			beforeEach(() => {
				requestBankId = jest.fn();

				SessionActionCreator.requestBankId = requestBankId;

				e = {
					preventDefault: jest.fn()
				};

				instance.onSubmitHandler(e)
			});

			it('should stop the event', () => {
				expect(e.preventDefault.mock.calls.length).toBe(1);
			});

			it('should request bank id', () => {
				expect(requestBankId.mock.calls.length).toBe(1);
			});

			describe('when the callback is executded', () => {
				let requestAccessChallengeCreate;
				let requestAccessTokenReset;

				beforeEach(() => {
					requestAccessChallengeCreate = jest.fn();
					requestAccessTokenReset = jest.fn();

					SessionActionCreator.requestAccessChallengeCreate = requestAccessChallengeCreate;
					SessionActionCreator.requestAccessTokenReset = requestAccessTokenReset

					requestBankId.mock.calls[0][1]();
				})

				it('should requestAccessChallengeCreate', () => {
					expect(requestAccessChallengeCreate.mock.calls[0][0]).toBe(data.username);
				});

				it('should requestAccessTokenReset', () => {
					expect(requestAccessTokenReset.mock.calls.length).toBe(1);
				});
			})
		})
	});

	describe('when challenges has been set', () => {
		let requestAccessChallengeCreate;

		beforeEach(() => {
			session = _.assign({}, instance.props.session, {
				challenge: {
						'challenge' : 'challengessss'
					},
			});
			instance = render(
				<LoginComponent
					appData={appData}
					targetScope={targetScope}
					data={data}
					session={session}
					content={content}
					onSuccess={onSuccess}/>
				);

		});

		it('it should render a challenge questions', () => {
			expect(StaticParagraphQuestion.mock.calls.length).toBe(1);
		});

		it('it should render a next button', () => {

			const BottomNav = TestUtils.findRenderedComponentWithType(instance, BottomNavigationBox);
			expect(BottomNav.props.dataAnchorNext).toBe('portal-next');
		});

		describe('when submitting challenge questions', () => {
			let requestAccessTokenCreate;

			beforeEach(() => {
				requestAccessTokenCreate = jest.fn();
				SessionActionCreator.requestAccessTokenCreate = requestAccessTokenCreate;

				const e = {
					preventDefault: jest.fn()
				};

				instance.onSubmitHandler(e)
			});

			it('should requestAccessTokenCreate', () => {
				expect(requestAccessTokenCreate.mock.calls[0][0]).toBe(data.username);
			});

			describe('when there is a token error', () => {
				let requestAccessChallengeReset;

				beforeEach(() => {
					requestAccessChallengeReset = jest.fn();

					SessionActionCreator.requestAccessChallengeReset = requestAccessChallengeReset

					session = _.assign({}, instance.props.session, {
						allowRetry: true,
						token: {
							error: 'error'
						},
						challenges: {}
					});
					instance = render(
						<LoginComponent
							appData={appData}
							targetScope={targetScope}
							data={data}
							session={session}
							content={content}
							onSuccess={onSuccess}/>
						);

				});

				it('should show an error', () => {
					TestUtils.findRenderedDOMComponentWithClass(instance, 'api-error-message')
				});

				it('should requestAccessChallengeReset', () => {
					expect(requestAccessChallengeReset.mock.calls.length).toBe(1);
				});
			});
		});
	});

	describe('WHEN challenges have NOT been set', () => {

		beforeEach(() => {
			session = _.assign({}, instance.props.session, {
				challenge: {},
			});
			instance = render(
				<LoginComponent
					appData={appData}
					targetScope={targetScope}
					data={data}
					session={session}
					content={content}
					onSuccess={onSuccess}/>
				);

		});


		it('it should render a next button', () => {

			const BottomNav = TestUtils.findRenderedComponentWithType(instance, BottomNavigationBox);
			expect(BottomNav.props.dataAnchorNext).toBe('username-next');
		});
	});

	describe('when allowRetry is false', () => {
		beforeEach(() => {
			session = _.assign({}, instance.props.session, {
				allowRetry: false,
			});
			instance = render(
				<LoginComponent
					appData={appData}
					targetScope={targetScope}
					data={data}
					session={session}
					content={content}
					onSuccess={onSuccess}/>
				);

		});

		it('should show an error', () => {
			TestUtils.findRenderedDOMComponentWithClass(instance, 'api-error-message')
		});
	});

	describe('when a access_token is set on session.token ', () => {
		describe('and there is a bank id', () => {
			beforeEach(() => {
				onSuccess.mockClear();

				session = _.assign({}, instance.props.session, {
						token: {
							'access_token': 'access_token'
						},
						challenges: []
					});

				instance = render(
					<LoginComponent
						appData={appData}
						targetScope={targetScope}
						data={{bankID: 'DYB'}}
						session={session}
						content={content}
						onSuccess={onSuccess}/>
					);
			});
			it('should call onSuccess', () => {
				expect(onSuccess.mock.calls.length).toBe(1);
			});
		});

		describe('and there is no bank id', () => {
			beforeEach(() => {
				onSuccess.mockClear();

				const session = _.assign({}, instance.props.session, {
						token: {
							'access_token': 'access_token'
						},
						challenges: []
					});

				instance = render(
					<LoginComponent
						appData={appData}
						targetScope={targetScope}
						data={data}
						session={session}
						content={content}
						onSuccess={onSuccess}/>
					);
			});

			it('should not call onSuccess', () => {
				expect(onSuccess.mock.calls.length).toBe(0);
			});
		});
	});

	describe('when _hasRealBankId is called', () => {
		it('should return true for CB and YB', () => {
			const testCases = [
				{bankId: 'CB', result: true},
				{bankId: 'YB', result: true},
				{bankId: 'DYB', result: false},
				{bankId: undefined, result: false}
			];

			testCases.map((testCase) => {
				expect(instance._hasRealBankId(testCase.bankId)).toBe(testCase.result);
			});
		});
	});

	describe('when _hasApiBankId is called', () => {
		it('should return true when apiBankId value is present', () => {
			const testCases = [
				{apiBankId: 'CB', result: true},
				{apiBankId: 'YB', result: true},
				{apiBankId: null, result: false},
				{apiBankId: undefined, result: false}
			];

			testCases.map((testCase) => {
				expect(instance._hasApiBankId(testCase.apiBankId)).toBe(testCase.result);
			});
		});
	});

	describe('when _hasApiBankId is called', () => {
		it('should return true when apiBankId value is present', () => {
			const testCases = [
				{apiBankId: 'CB', result: true},
				{apiBankId: 'YB', result: true},
				{apiBankId: null, result: false},
				{apiBankId: undefined, result: false}
			];

			testCases.map((testCase) => {
				expect(instance._hasApiBankId(testCase.apiBankId)).toBe(testCase.result);
			});
		});
	});

	describe('when _canDeleteRemoteToken is called', () => {
		it('should return true when hasApiBankId or hasRealBankId values are tru thy', () => {
			const hasApiBankId = jest.fn();
			const hasRealBankId = jest.fn();

			const testCases = [
				{hasApiBankId: true, hasRealBankId: true, result: true},
				{hasApiBankId: false, hasRealBankId: true, result: true},
				{hasApiBankId: false, hasRealBankId: false, result: false},
				{hasApiBankId: true, hasRealBankId: false, result: true},
				{hasApiBankId: undefined, hasRealBankId: undefined, result: false}
			];

			testCases.map((testCase) => {
				hasApiBankId.mockReturnValue(testCase.hasApiBankId);
				hasRealBankId.mockReturnValue(testCase.hasRealBankId);

				instance._hasApiBankId = hasApiBankId;
				instance._hasRealBankId = hasRealBankId;

				expect(instance._canDeleteRemoteToken()).toBe(testCase.result);
			});
		});
	});

	describe('when authentication is preparing to stepup', () => {
		beforeEach(() => {
			BottomNavigationBox.mockClear();

			ValidationUtils.isGroupValid.mockReturnValue(true);

			session = _.extend({}, instance.props.session, {isPreparingStepupAuthentication: true})

			instance = render(
				<LoginComponent
					appData={appData}
					targetScope={targetScope}
					data={data}
					session={session}
					content={content}
					onSuccess={onSuccess}/>
				);
		});

		it('should not be possible to click the submit buttons', () => {
			expect(TestUtils.findRenderedComponentWithType(instance, BottomNavigationBox).props.disabled).toBe(true);
		});
	});

	describe('when authentication is not preparing to stepup', () => {
		beforeEach(() => {
			BottomNavigationBox.mockClear();

			ValidationUtils.isGroupValid.mockReturnValue(true);

			session = _.extend({}, instance.props.session, {isPreparingStepupAuthentication: false})

			instance = render(
				<LoginComponent
					appData={appData}
					targetScope={targetScope}
					data={data}
					session={session}
					content={content}
					onSuccess={onSuccess}/>
				);
		});

		it('should be possible to click the submit buttons', () => {
			expect(TestUtils.findRenderedComponentWithType(instance, BottomNavigationBox).props.disabled).toBe(false);
		});
	});

	describe('when a user is auhenticated', () => {
		beforeEach(() => {
			shallowRenderer.render(<LoginComponent
					appData={appData}
					targetScope={targetScope}
					data={data}
					session={{
						allowRetry: true,
						token: {},
						authenticated: true,
						challenge: {},
					}}
					content={content}
					onSuccess={onSuccess}/>);

			result = shallowRenderer.getRenderOutput();
		});

		it('should hide challenge component', () => {
			expect(result).toEqualJSX(
				<div>
					<div
						aria-live="assertive"
						role="alert"
					/>
					<TextQuestion
						containerClassName=""
						dataAnchor="username"
						defaultValue="username"
						group="GROUP_LOGIN"
						inputContainerClassName=""
						inputType="text"
						labelClassName=""
						labelContainerClassName=""
						mainColumnSize={12}
						mainColumnSizeMD={12}
						name="username"
						onBlur={() => {}}
						onChange={() => {}}
						required={true}
						validateType="username"
						valueFormatter={() => {}}
					/>
					<div className="hidden" aria-hidden={true}>
						<ChallengeComponent
							appData={{isApiCallInProgress: false}}
							content={{}}
							data={{username: 'username'}}
							encryptAnswer={() => {}}
							onSuccess={() => {}}
							requestAuthenticationUpdate={() => {}}
							session={{allowRetry: true, authenticated: true, challenge: {}, token: {}}}
							targetScope={1}
						/>
					</div>
					<BottomNavigationBox
						className="col-xs-12 text-center"
						dataAnchorNext="username-next"
						disabled={undefined}
						isLoading={false}
						nextButtonLabel="Next"
						onClickNext={() => {}}
					/>
				</div>
			);
		});
	});

	describe('when a token is being reset', () => {

		beforeEach(() => {
			const testSession = {
				...session,
				token: {
					'access_token': 'access_token'
				},
				challenges: [],
				challenge: {
					debit_card: 'debit_card'
				}
			};

			const testData = {
				...data,
				bankID: 'CB',
			};

			instance = ReactDOM.render(
				<LoginComponent
					appData={appData}
					targetScope={targetScope}
					data={testData}
					session={testSession}
					content={content}
					onSuccess={onSuccess}/>
				, document.createElement('div'));
		});

		it('should not call onSuccess handler', () => {
			expect(onSuccess.mock.calls.length).toBe(0);
		});
	});
});
