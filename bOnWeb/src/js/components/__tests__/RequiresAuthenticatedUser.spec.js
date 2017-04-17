
jest.unmock('../RequiresAuthenticatedUser');

// React
const React = require('react');
const ReactDOM = require('react-dom');

const RequiresAuthenticatedUser = require('../RequiresAuthenticatedUser');
const AccountOpeningActions = require('../../actions/AccountOpeningActions');

const TestUtils = require('react-addons-test-utils');

const ChildComponent = (props) => {
		return (<h1>Child Component</h1>);
}

describe('RequiresAuthenticatedUser', () => {
	const setPropsData = data => {
		let HOC = RequiresAuthenticatedUser(ChildComponent);
		let renderer = TestUtils.createRenderer();
		let props = {
			pushState: {
				action: 'push',
			},
			session : { authenticated : data}
		};
		renderer.render(<HOC {...props}/>);
		return renderer.getRenderOutput();
	};

	const executeTest = (testCase) => {
		it(testCase.desc, () => {
			AccountOpeningActions[testCase.mock].mockClear();
			setPropsData(testCase.data);
			expect(AccountOpeningActions[testCase.mock].mock.calls.length).toBe(testCase.expected);
		});
	};

	const testCases = [{
		desc : 'when user is not authenticated and try to open url then should navigate to login',
		mock : 'navigateToWebTask',
		expected : 1,
	}, {
		desc : 'when user is authenticated and try to open url then should not navigate to login',
		mock : 'navigateToWebTask',
		data : true ,
		expected : 0,
	}];

	testCases.forEach(executeTest);

	describe('when user trys to open portal', () => {
		let instance;
		let props;

		describe('and is not authenticated', () => {
			beforeEach(() => {
				instance = setPropsData(false);
			});

			it('should not render WrappedComponent', () => {
				expect(instance).toEqual(null);
			});
		});

		describe('and is authenticated', () => {
			beforeEach(() => {
				let props = {
					pushState: {
						action: 'push',
					},
					session : { authenticated : true}
				};
				instance = setPropsData(true);
			});

			it('should not render WrappedComponent', () => {
				expect(instance).toBeDefined();
			});
		});
	});
});
