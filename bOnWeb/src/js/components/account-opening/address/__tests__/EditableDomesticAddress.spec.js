jest.unmock('../EditableDomesticAddress');

// React & Test Utils
const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const _ = require('lodash');

// Components
const EditableDomesticAddress = require('../EditableDomesticAddress');

const {AddressPrefix, HouseNumber, HouseName, AddressLine, StreetName, County, City} = require('../AddressParts');

const container = document.createElement('div');

describe('EditableDomesticAddress' , () => {
	let postcodeData = {};
	let appData = {};
	let content = {};

	let defaultProps = {
		group: 'test',
		addressId: 1,
		onChange: jest.fn(),
		arrayName: 'addresses',
		arrayIndex: 1,
	}

	const Component = props => <EditableDomesticAddress {...props} />;

	let render = props => ReactDOM.render(<EditableDomesticAddress {...props} />, container);

	describe('when rendering with no data', () => {
		it('should render', () => {
			expect(render(defaultProps)).not.toBe(false);
		});
	});

	describe('when rendering with full address', () => {
		let instance;

		beforeEach(() => {
			instance = render(_.extend({}, defaultProps, {data: {addressPrefix: '1/2', houseNumber: '1', houseName: 'Bat Cave', streetName: 'Gotham Street', addressLine1: 'Dark Alley', addressLine2: 'DC', city: 'Gotham City', county: 'County' }}))
		});

		it('should render an AddressPrefix', () => {
			TestUtils.findRenderedComponentWithType(instance, AddressPrefix);
		})

		it('should render an HouseNumber', () => {
			TestUtils.findRenderedComponentWithType(instance, HouseNumber);
		})

		it('should render an HouseName', () => {
			TestUtils.findRenderedComponentWithType(instance, HouseName);
		})

		it('should render an StreetName', () => {
			TestUtils.findRenderedComponentWithType(instance, StreetName);
		})

		it('should render an County', () => {
			TestUtils.findRenderedComponentWithType(instance, County);
		})

		it('should render an City', () => {
			TestUtils.findRenderedComponentWithType(instance, City);
		})

		it('should render a AddressLines', () => {
			expect(TestUtils.scryRenderedComponentsWithType(instance, AddressLine).length).toBe(1);
		})
	});
});


