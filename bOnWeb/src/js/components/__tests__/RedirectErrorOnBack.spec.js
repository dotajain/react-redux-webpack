jest.unmock('../RedirectErrorOnBack');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const RedirectErrorOnBack = require('../RedirectErrorOnBack');
const AccountOpeningActions = require('../../actions/AccountOpeningActions');

const WrappedComponent = props => {
	return (<h1>WrappedComponent</h1>);
};

const shallowRenderer = props => {
	const renderer = TestUtils.createRenderer();
	const HOC = RedirectErrorOnBack(WrappedComponent);
	renderer.render(<HOC {...props} />)
	return renderer.getRenderOutput();
};

describe('given RedirectErrorOnBack', () => {
	let instance;

	beforeEach(() => {
		AccountOpeningActions.clearWebTask.mockClear();
		AccountOpeningActions.navigateToWebTask.mockClear();
	})

	describe('and user authenticates then moves back and forward', () => {
		beforeEach(() => {
			const props = {
				pushState: {
					action: 'pop',
				},
				session: {
					authenticated: false,
				},
				customer: {
					customerNumber: '1234'
				},
			};

			instance = shallowRenderer(props);
		});

		it('then it should web tacks and redirect to error', () => {
			expect(AccountOpeningActions.clearWebTask.mock.calls.length).toBe(1);
			expect(AccountOpeningActions.navigateToWebTask.mock.calls.length).toBe(1);
		});
	})

	describe('and user authenticates then moves back onto page', () => {
		beforeEach(() => {
			const props = {
				pushState: {
					action: 'pop',
				},
				session: {
					authenticated: true,
				},
				customer: {
					customerNumber: '1234'
				},
			};

			instance = shallowRenderer(props);
		});

		it('then it should web tacks and redirect to error', () => {
			expect(AccountOpeningActions.clearWebTask.mock.calls.length).toBe(0);
			expect(AccountOpeningActions.navigateToWebTask.mock.calls.length).toBe(0);
		});
	})
});
