jest.unmock('../RequiresProductCode');
jest.unmock('react-bootstrap-datetimepicker');
// React
const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const Router = require('react-router');
const Route = Router.Route;

const TestLocation = require('react-router/lib/locations/TestLocation');
const RequiresProductCode = require('../RequiresProductCode');

const AccountOpeningActions = require('../../actions/AccountOpeningActions');
const UrlUtils = require('../../utils/UrlUtils');

describe('RequiresProductCode', () => {

	const WrappedComponent = props => {
		return (<h1>WrappedComponent</h1>);
	};

	const HOC = RequiresProductCode(WrappedComponent);

	describe('action tests', () => {

		const container = document.createElement('div');

		const executeActionTest = (testCase) => {

			it(testCase.desc, () => {
				AccountOpeningActions[testCase.mock].mockClear();

				const props = {
					data: {
						productCode: undefined,
					},
					query: {
						applyFor: testCase.productCode,
					},
				};

				const instance = TestUtils.renderIntoDocument(<HOC {...props} />, container)

				expect(AccountOpeningActions[testCase.mock].mock.calls.length).toBe(testCase.expected);
			});
		};

		const actionTestCases = [{
			desc: 'when no product code is present but exist in URL then should set from URL',
			productCode: 'IM123',
			mock: 'setProductCode',
			expected: 1,
		}, {
			desc: 'when no product code is present and not in URL then should raise an error',
			productCode: null,
			mock: 'navigateToWebTask',
			expected: 1,
		},];

		actionTestCases.forEach(executeActionTest);
	});

	describe('render tests', () => {
		const executeRenderTest = (testCase) => {
			it(testCase.desc, () => {
				const renderer = TestUtils.createRenderer();
				const props = {
					data: {
						productCode: testCase.productCode,
						product: testCase.product,
					},
				};

				renderer.render(
					<HOC data={props.data} />
				);

				expect(renderer.getRenderOutput()).toEqual(testCase.expected(props));
			});
		};

		const renderTestCases = [{
			desc: 'when a product is availble then should render WrappedComponent',
			productCode: 'IM803',
			product: {
				productType: {
					name: 'current',
				},
			},
			expected: (props) => <WrappedComponent {...props} />,
		}, {
			desc: 'when no product available then should render null',
			productCode: null,
			product: null,
			expected: () => null,
		},, {
			desc: 'when no product available then should render null',
			productCode: null,
			product: {
				productType: {
					name: 'empty',
				},
			},
			expected: () => null,
		},];

		renderTestCases.forEach(executeRenderTest);
	});
});
