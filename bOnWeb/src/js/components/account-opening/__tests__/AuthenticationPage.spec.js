/**
 * @test AuthenticationPage
 * @tickets DYB-8381
 */

jest.unmock('../AuthenticationPage');
jest.unmock('react-bootstrap-datetimepicker');
// Not mocking the below to help easing testing
// could access the kids with mock.calls[0][0].children[0].mock.calls[0][0]
// but that feels... very brittle
jest.unmock('../../common/PageColumnWrapper');
jest.unmock('../../common/SectionCentered');
jest.unmock('../../../utils/BrandUtils');
jest.unmock('../../../config/BrandConfig');
jest.unmock('../../../config');
jest.unmock('../../../stores/CustomerStore');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

const { buildFindMockByNameFilter } = require('../../../__helpers__/TestHelpers');

const _ = require('lodash');
const config = require('../../../config');;

// SUT
const AuthenticationPage = require('../AuthenticationPage');

// Mocks
const FindDetailsComponent = require('../findDetails/FindDetailsComponent');
const LoginComponent = require('../login/LoginComponent');
const ComponentHeader = require('../../common/ComponentHeader');
const BrandUtils = require('../../../utils/BrandUtils');

describe('AuthenticationPage', () => {

	const data = {
		username: 'username',
	};

	const content = {
		firstNameQuestion: 'PropTypes.string.isRequired',
		lastNameQuestion: 'PropTypes.string.isRequired',
		dateOfBirthQuestion: 'PropTypes.string.isRequired',
		genderQuestion: 'PropTypes.string.isRequired',
		addressLineQuestion: 'PropTypes.string.isRequired',
		postcodeQuestion: 'PropTypes.string.isRequired',
	};

	const session = {
		isRequestingOtp: false,
	};

	let instance;

	const container = document.createElement('div');
	const render = (comp, el) => ReactDOM.render(comp, el);

	beforeEach(() => {
		envConfig.bankId = 'DYB';
		instance = render(
			<AuthenticationPage
				data={data}
				content={content}
				session={session}
			/>,
			container);

	});

	describe('GIVEN I have selected I am an existing customer on the application form', () => {
		describe('WHEN I select I do not know my customer number', () => {
			beforeEach(() => {
				LoginComponent.mockClear();
				ComponentHeader.mockClear();
				// Simulate selecting No
				const newData = _.assign({}, instance.props.data, {
					hasCustomerName: 'No'
				});

				instance = render(<AuthenticationPage
					data={newData}
					content={content}
					session={session}
				/>, container);

				instance.setState({
					customer: {
						customerId: '1234'
					}
				});
			});

			it('I will be asked to provide my details', () => {
				expect(FindDetailsComponent.mock.calls.length).toBeTruthy();
			});

			it('should not render the Login option', () => {
				expect(LoginComponent.mock.calls.length).toBeFalsy();
			});

			it('should NOT render the Component Header on DYB', () => {
				expect(ComponentHeader.mock.calls.length).toBe(0);
			});

			it('should NOT render the Component Header on CYB', () => {
				global.envConfig.bankId = 'YB';
				ComponentHeader.mockClear();
				instance = TestUtils.renderIntoDocument(
					<AuthenticationPage
						data={{hasCustomerName: 'No'}}
						content={content}
						session={session}
					/>
				);
				expect(ComponentHeader.mock.calls.length).toBe(0);
			});
		});

		describe('WHEN I select I do know my customer number', () => {
			beforeEach(() => {
				FindDetailsComponent.mockClear();
				// Simulate selecting Yes
				const newData = _.assign({}, instance.props.data, {
					hasCustomerName: 'Yes'
				});

				instance = render(<AuthenticationPage
					data={newData}
					content={content}
					session={session}
				/>, container);
			});

			it('I will be asked to provide my username', () => {
				expect(LoginComponent.mock.calls.length).toBeTruthy();
			});

			it('should not render the Find By Details option', () => {
				expect(FindDetailsComponent.mock.calls.length).toBeFalsy();
			});

		});
	});
});
