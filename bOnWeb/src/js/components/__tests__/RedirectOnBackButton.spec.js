jest.unmock('../RedirectOnBackButton');
jest.unmock('react-bootstrap-datetimepicker');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

const RedirectOnBackButton = require('../RedirectOnBackButton');
const AccountOpeningActions = require('../../actions/AccountOpeningActions');

const WrappedComponent = props => {
	return (<h1>WrappedComponent</h1>);
};

const HOC = RedirectOnBackButton(WrappedComponent);

const container = document.createElement('div');

describe('RedirectOnBackButton', () => {

	let instance;

	const renderComponent = pushState => {
		return TestUtils.renderIntoDocument(<HOC pushState={pushState} />, container)
	};

	describe('when pushState is empty', () => {
		beforeEach(() => {
			renderComponent({});
		});

		it('does nothing', () => {
			expect(AccountOpeningActions.navigateToWebTask.mock.calls.length).toBe(0);
		});
	});

	describe('when pushState is provided', () => {

		it('does nothing when user navigates forward', () => {
			renderComponent({
				action: 'push'
			});

			expect(AccountOpeningActions.navigateToWebTask.mock.calls.length).toBe(0);
		});

		it('redirects on back button', () => {
			instance = renderComponent({
			});

			instance = renderComponent({
				action: 'pop',
			});

			instance.setState({
				isRedirecting: false,
			});

			expect(AccountOpeningActions.navigateToWebTask.mock.calls.length).toBe(1);
		});
	});
});
