jest.unmock('../ProductBlacklist');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const Router = require('react-router');
const Route = Router.Route;
const TestLocation = require('react-router/lib/locations/TestLocation');
const ProductBlacklist = require('../ProductBlacklist');
const AccountOpeningActions = require('../../actions/AccountOpeningActions');

const getProps = (testCase) => {
	return {
		product: {
			existingCustomersOnly: testCase.existingCustomersOnly,
			blackListedProduct: testCase.blackListedProduct,
		},
		...testCase
	};
};

const WrappedComponent = props => {
	return (<h1>WrappedComponent</h1>);
};

const HOC = ProductBlacklist(WrappedComponent);

const container = document.createElement('div');

const renderComponent = (data, pathname, query) => {
	return TestUtils.renderIntoDocument(<HOC data={data} pushState={{query: query, pathname: pathname}} />, container)
};

describe('when using ProductBlacklist', () => {
	let routes;
	let location;
	let instance;

	const testCases = [{
		description: 'should raise error when a product is blacklisted',
		productCode: 'IM800',
		blackListedProduct: true,
		isExstingCustomer: 'No',
		location: '/',
		expected: 1,
	},
	{
		description: 'should not raise error when a product is blacklisted and isAltProduct',
		productCode: 'IM800',
		blackListedProduct: true,
		isAltProduct: true,
		location: '/registration',
		expected: 0,
	},
	{
		description: 'should raise error when a product cannot be applied for directly',
		productCode: 'IM803',
		existingCustomersOnly: true,
		location: '/',
		expected: 1,
	}, {
		description: 'should not raise an error when a product is not blacklisted',
		productCode: 'IM136',
		isExstingCustomer: 'Yes',
		location: '/',
		expected: 0,
	}, {
		description: 'should not raise an error when a product is blacklisted but allowed through authentication route',
		productCode: 'IM803',
		existingCustomersOnly: true,
		isExstingCustomer: 'Yes',
		location: '/authentication',
		expected: 0,
	}]

	beforeEach(() => {
		routes = [
			<Route name="productBlacklist" path="/" handler={ProductBlacklist}/>
		];
		location = new TestLocation([ '/' ]);
	});

	const executeTests = (testCase) => {
		it(testCase.description, () => {
			AccountOpeningActions.navigateToWebTask.mockClear();
			const data = getProps(testCase);
			renderComponent(data, testCase.location, {applyFor: testCase.productCode});
			expect(AccountOpeningActions.navigateToWebTask.mock.calls.length).toEqual(testCase.expected);
		});
	};

	testCases.forEach(executeTests);
});
