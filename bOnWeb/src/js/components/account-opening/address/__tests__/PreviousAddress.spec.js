jest.unmock('../PreviousAddress');
jest.unmock('../PostcodeSearch');
jest.unmock('../DomesticAddress');
jest.unmock('../InternationalAddress');
jest.unmock('../AddressTypeSelector');
jest.unmock('../AddressContainer');
jest.unmock('../../../common/questionsets/DropdownQuestion');
jest.unmock('../../../common/questionsets/DatePickerQuestion');
jest.unmock('../../../common/mixins/InputMixin');

var React = require('react');
var TestUtils = require('react-addons-test-utils');
var ReactDOM = require('react-dom');
var _ = require('lodash');

// Components
var PreviousAddress = require('../PreviousAddress');
//var {PreviousAddressHeader} = PreviousAddress;
//var PostcodeSearch = require('../PostcodeSearch');
//var DomesticAddress = require('../DomesticAddress');
//var InternationalAddress = require('../InternationalAddress');
//var AddressTypeSelector = require('../AddressTypeSelector');
//var DropdownQuestion = require('../../../common/questionsets/DropdownQuestion');
//var DatePickerQuestion = require('../../../common/questionsets/DatePickerQuestion');

//var ErrorMessage = require('../../../common/ErrorMessage');

// Mocks
//var AccountOpeningActions = require('../../../../actions/AccountOpeningActions');
//var PostcodeInput = require('../../address/PostcodeInput');

/*
describe('PreviousAddress' , () => {
	let postcodeData = [];
	let appData = {};
	let content = {
		previousAddressTitle: 'Previous Address',
		previousAddressSubtitle: 'Subtitle!',
	};
	let data = {
		isManual: false
	};

	let defaultProps = {
		addressId: 1,
		appData:  appData,
		arrayName: 'testaddresses',
		arrayIndex: 0,
		content: content,
		data: data,
		isExistingCustomer: false,
		key: 'current-address',
		group: 'test',
		name: 'address_1_section',
		hasError: false,
		postcodeData,
		residentialStatus: 'Tenant',
	}

	const container = document.createElement('div');

	let render = props =>  ReactDOM.render(<PreviousAddress {...props}/>, container);

	describe('when rendering', () => {
		let instance;

		beforeEach(() => {
			instance = render(defaultProps);
		});

		it('should show an AddressTypeSelector', () => {
			//TestUtils.findRenderedComponentWithType(instance, AddressTypeSelector);
		});

		it('should not show a DomesticAddress', () => {
			//expect(TestUtils.scryRenderedComponentsWithType(instance, DomesticAddress).length).toBe(0);
		});

		it('should not show a InternationalAddress', () => {
			expect(TestUtils.scryRenderedComponentsWithType(instance, InternationalAddress).length).toBe(0);
		});

		describe('when the domestic addressType has been set', () => {
			let data;

			beforeEach(() => {
				data = {
					addressType: 'domestic',
				};

				instance = render(_.extend({}, defaultProps, {data}));
			});

			it('should show a DomesticAddress', () => {
				TestUtils.findRenderedComponentWithType(instance, DomesticAddress);
			});
		});

		describe('when the international addressType has been set', () => {
			let data;

			beforeEach(() => {
				data = {
					addressType: 'international',
					addressLine1: 'The',
					addressLine2: 'Batcave',
					addressLine3: 'Gotham City',
					addressLine4: 'DC',
					country: 'USA',
				};

				instance = render(_.extend({}, defaultProps, {data}));
			});

			it('should show an InternationalAddress', () => {
				TestUtils.findRenderedComponentWithType(instance, InternationalAddress);
			});
		});
	});
});*/
