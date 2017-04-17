
jest.unmock('../ResetTasksOnBackButton');
jest.unmock('react-bootstrap-datetimepicker');

// React
const React = require('react');
const ReactDOM = require('react-dom');
const _ = require('lodash');
const TestUtils = require('react-addons-test-utils');

const ResetTasksOnBackButton = require('../ResetTasksOnBackButton');
const AccountOpeningActions = require('../../actions/AccountOpeningActions');
const Router = require('react-router');
const Route = Router.Route;
const TestLocation = require('react-router/lib/locations/TestLocation');

describe('ResetTasksOnBackButton', () => {


	const WrappedComponent = props => (<h1>WrappedComponent</h1>);
	const HOC = ResetTasksOnBackButton(WrappedComponent);

	const getProps = (action) => ({
		pushState: {
			action: action,
		},
		appData: {
			webTaskId: 'test',
		},
	});

	const executeActionTest = (testCase) => {
		it(testCase.desc, () => {
			const props = getProps(testCase.action);
			const instance = TestUtils.renderIntoDocument(<HOC {...props} />, document.createElement('div'));

			instance.setState({
				test: 'value'
			});

			expect(AccountOpeningActions.clearWebTask.mock.calls.length).toBe(testCase.expected);
		});
	};

	const actionTestCases = [{
		desc: 'when push state is empty then we wont clear web tasks',
		action: '',
		expected: 0,
	}, {
		desc: 'when user navigates forwards then we should clear web tasks',
		action: 'push',
		expected: 0,
	}, {
		desc: 'when user navigates backwards then we should clear web tasks',
		action: 'pop',
		expected: 1,
	}];

	actionTestCases.forEach(executeActionTest);

	const executeComponentTest = (testCase) => {
		it(testCase.desc, () => {
			const props = getProps(testCase.action);
			const instance = TestUtils.renderIntoDocument(<HOC {...props} />, document.createElement('div'));

			const component = TestUtils.scryRenderedComponentsWithType(instance, HOC);
			expect(component[0].hasTasksOnBackButton()).toBe(testCase.expected);
		});
	}

	const componentTestCases = [{
		desc: 'when user navigates backwards then should have webtasks set',
		action: 'pop',
		expected: true
	}];

	componentTestCases.forEach(executeComponentTest);
});
