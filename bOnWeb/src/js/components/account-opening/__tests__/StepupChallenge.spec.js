
jest.unmock('../StepupChallenge');
jest.unmock('../../common/SectionCentered');
jest.unmock('../../common/ComponentHeader');

const _ = require('lodash');

// React
const React = require('react');
const ReactDOM = require('react-dom');

// React Addons
const TestUtils = require('react-addons-test-utils');

// Component
const StepupChallenge = require('../StepupChallenge');

// Mocks
const BottomNavigationBox = require('../../common/BottomNavigationBox');
const ValidationUtils = require('../../../utils/ValidationUtils');
const SessionActionCreator = require('../../../actions/SessionActionCreator');

//Test helpers
const { buildFindMockByDataAnchorFilter } = require('../../../__helpers__/TestHelpers');
const container = document.createElement('div');
const render = (comp) => ReactDOM.render(comp, container);


describe('Stepup Challenge', function() {

	const appData = {

	};

	const content = {
	};

	const data = {
	};

	const session = {
		requireStepupAuthentication: true
	};

	// Render an instance of the component
	let instance, buttons;

	describe("render",() =>{
		beforeEach(() => {
			ValidationUtils.isGroupValid.mockReturnValue(true);
			instance = render(<StepupChallenge
				data={data}
				content={content}
				session={session}
				appData={appData} />
			);
		});

		describe('WHEN OTP create API gets called ', () => {

			it('AND fails should not render', () => {
				instance = render(<StepupChallenge
					data={data}
					content={content}
					session={{
						otpRequestError: true,
						requireStepupAuthentication: true
					}}
					appData={appData} />
				);
				expect(instance.render()).toBeFalsy();
			});

			it('AND doesn\'t fail should render', () => {
				instance = render(<StepupChallenge
					data={data}
					content={content}
					session={{
						otpRequestError: false,
						requireStepupAuthentication: true
					}}
					appData={appData} />
				);

				expect(instance.render()).not.toBeFalsy();
			});
		});

		it('should not disable the next button', () => {
			expect(BottomNavigationBox.mock.calls[0][0].disabled).toBeFalsy();
		});

		describe('WHEN the button is submitted', () => {
			beforeEach(() => {
				const button = TestUtils.findRenderedComponentWithType(instance, BottomNavigationBox);

				button.props.onClickNext({
					preventDefault: jest.fn()
				});
			});

			it('should submit the details', () => {
				expect(SessionActionCreator.requestAccessTokenCreate.mock.calls.length).toBeTruthy();
			});

			describe('WHEN the API call is in progress', () => {
				beforeEach(() => {
					instance = render(<StepupChallenge
						data={data}
						content={content}
						session={session}
						appData={{isApiCallInProgress: true}} />
					);
				});

				it('should disable the button', () => {
					expect(TestUtils.findRenderedComponentWithType(instance, BottomNavigationBox).props.disabled).toBeTruthy();
				});
			});
		});
	});
});
