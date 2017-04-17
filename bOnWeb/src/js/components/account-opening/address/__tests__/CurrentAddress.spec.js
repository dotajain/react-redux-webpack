jest.unmock('../CurrentAddress');
jest.unmock('../AddressContainer');
jest.unmock('../DomesticAddress');
jest.unmock('../NonEditableAddress');
jest.unmock('../../../common/questionsets/DropdownQuestion');
jest.unmock('../../../common/mixins/InputMixin');

// React & Test Utils
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var _ = require('lodash');

// Components
var CurrentAddress = require('../CurrentAddress');
var PostcodeSearch = require('../PostcodeSearch');
var NonEditableAddress = require('../NonEditableAddress');
var DropdownQuestion = require('../../../common/questionsets/DropdownQuestion');
var DatePickerQuestion = require('../../../common/questionsets/DatePickerQuestion');

var ErrorMessage = require('../../../common/ErrorMessage');

// Mocks
var AccountOpeningActions = require('../../../../actions/AccountOpeningActions');
var DomesticAddress = require('../../address/DomesticAddress');

describe('CurrentAddress' , () => {
	let postcodeData = [];
	let appData = {};
	let content = {
		postcodeQuestion: 'Postcode',
		residentialStatusQuestion: 'Residential Status',
		dateMovedQuestion: 'Date Moved',
	};
	let currentAddress = {};

	let defaultProps = {
		addressId: 1, // Do we still need this?
		appData:  appData,
		arrayName: 'testaddresses',
		content: content,
		data: currentAddress,
		isExistingCustomer: false,
		key: 'current-address',
		group: 'test',
		name: 'address_1_section',
		hasError: false,
		postcodeData,
		residentialStatus: 'Tenant',
		arrayIndex: 0,
	}

	let render = props => TestUtils.renderIntoDocument(<CurrentAddress {...props}/>);

	describe('when rendering', () => {
		let instance;

		beforeEach(() => {
			instance = render(defaultProps)
		});

		it('should show a DomesticAddress', () => {
			TestUtils.findRenderedComponentWithType(instance, DomesticAddress);
		});

		describe('when an address has been selected', () => {
			beforeEach(() => {
				instance = render(_.extend({}, defaultProps, {
					data: {
						id: '123'
					}
				}));
			});

			it('should show a residentialStatus question', () => {
				let residentialStatus = TestUtils.findRenderedComponentWithType(instance, DropdownQuestion);
				expect(residentialStatus.props.name).toBe('residentialStatus');
			});

			it('should show a dateMoved question', () => {
				let dateMoved = TestUtils.findRenderedComponentWithType(instance, DatePickerQuestion);
				expect(dateMoved.props.name).toBe('dateMoved_1');
			});

			it('should validate dateMoved question correctly', () => {
				let dateMoved = TestUtils.findRenderedComponentWithType(instance, DatePickerQuestion);
				expect(dateMoved.props.validateBeforeToday).toBe(true);
			});

			describe('when a residentialStatus is selected', () => {
				beforeEach(() => {
					AccountOpeningActions.updateFormValue.mockClear();
					let residentialStatus = TestUtils.findRenderedComponentWithType(instance, DropdownQuestion);
					residentialStatus.props.onChange('residentialStatus', 'Tenant');
				});

				it('should correctly set the value', () => {
					expect(AccountOpeningActions.updateFormValue.mock.calls[0]).toEqual(['residentialStatus', 'Tenant']);
				});
			});

			describe('when a dateMoved is selected', () => {
				beforeEach(() => {
					AccountOpeningActions.updateFormValue.mockClear();
					let dateMoved = TestUtils.findRenderedComponentWithType(instance, DatePickerQuestion);
					dateMoved.props.onChange('dateMoved_1', '01-01-1970');
				});

				it('should correctly set the value', () => {
					expect(AccountOpeningActions.updateFormValue.mock.calls[0]).toEqual(['dateMoved', '01-01-1970', 'testaddresses', 0]);
				});
			});
		});
	});
});
