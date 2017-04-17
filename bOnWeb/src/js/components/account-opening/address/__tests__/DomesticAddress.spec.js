jest.unmock('../DomesticAddress');
jest.unmock('../PostcodeSearch');
jest.unmock('../NonEditableAddress');
jest.unmock('../EditableDomesticAddress');
jest.unmock('../../../common/questionsets/DropdownQuestion');
jest.unmock('../../../common/questionsets/DatePickerQuestion');
jest.unmock('../../../common/mixins/InputMixin');

// React & Test Utils
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var _ = require('lodash');

// Components
var DomesticAddress = require('../DomesticAddress');
var EditableDomesticAddress = require('../EditableDomesticAddress');
var PostcodeSearch = require('../PostcodeSearch');
var NonEditableAddress = require('../NonEditableAddress');
var DropdownQuestion = require('../../../common/questionsets/DropdownQuestion');
var DatePickerQuestion = require('../../../common/questionsets/DatePickerQuestion');

var ErrorMessage = require('../../../common/ErrorMessage');

// Mocks
var AccountOpeningActions = require('../../../../actions/AccountOpeningActions');
var PostcodeInput = require('../../address/PostcodeInput');

describe('DomesticAddress' , () => {
	let postcodeData = [];
	let appData = {};
	let content = {};
	let currentAddress = {
		addressPrefix: '1/2',
		houseNumber: '1',
		houseName: 'A House',
		streetName: 'Some Place',
		addressLine2: 'Not A Dark Alley',
		addressLine3: 'Really Not A Dark Alley',
		city: 'Glasgow',
		country: 'UK',
	};

	let defaultProps = {
		addressId: 1,
		appData:  appData,
		arrayName: 'testaddresses',
		arrayIndex: 0,
		content: content,
		data: currentAddress,
		isExistingCustomer: false,
		key: 'current-address',
		group: 'test',
		name: 'address_1_section',
		hasError: false,
		postcodeData,
		residentialStatus: 'Tenant',
		onSearch: jest.fn(),
	}

	let render = props => TestUtils.renderIntoDocument(<DomesticAddress {...props}/>);

	describe('when rendering', () => {
		let instance;

		beforeEach(() => {
			instance = render(defaultProps)
		});

		it('should show a postcode look up', () => {
			TestUtils.findRenderedComponentWithType(instance, PostcodeSearch);
		});

		describe('when an address has been selected', () => {
			beforeEach(() => {
				instance = render(_.extend({}, defaultProps, {
					data: {
						id: '123'
					},
					editable: true,
				}));
			});

			it('should show a EditableDomesticAddress', () => {
				TestUtils.findRenderedComponentWithType(instance, EditableDomesticAddress);
			});
		});

		describe('when a search is executed with the same postcode', () => {
			beforeEach(() => {
				instance = render(_.extend({}, defaultProps, { data: { postcode: 'IP17 1TS'}}));
				let postcodeSearch = TestUtils.findRenderedComponentWithType(instance, PostcodeSearch);
				AccountOpeningActions.resetAddress.mockClear();
				postcodeSearch.props.onSearch('postcode', 'IP17 1TS');
			});

			it('should reset the current selected address', () => {
				expect(AccountOpeningActions.resetAddress.mock.calls[0][0]).toEqual(0);
			});
		});

		describe('when a search is executed with a different postcode', () => {
			beforeEach(() => {
				instance = render(_.extend({}, defaultProps, { data: { postcode: 'IP17 1T'}}));
				let postcodeSearch = TestUtils.findRenderedComponentWithType(instance, PostcodeSearch);
				AccountOpeningActions.resetAddress.mockClear();
				postcodeSearch.props.onSearch('postcode', 'IP17 1TS');
			});

			it('should not reset the current selected address', () => {
				expect(AccountOpeningActions.resetAddress.mock.calls.length).toEqual(0);
			});
		});

		describe('when an address is selected', () => {
			beforeEach(() => {
				instance = render(_.extend({}, defaultProps, { data: { postcode: 'IP17 1TS'}}));
				let postcodeSearch = TestUtils.findRenderedComponentWithType(instance, PostcodeSearch);
				AccountOpeningActions.updateFormValue.mockClear();
				postcodeSearch.props.onChange('postcode_1', '1');
			});

			it('should select an address', () => {
				expect(AccountOpeningActions.updateFormValue.mock.calls[0]).toEqual(['postcode', '1', 'testaddresses', 0]);
			});
		});
	});
});

