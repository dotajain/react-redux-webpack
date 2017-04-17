// React & Test Utils
var React = require('react');
var TestUtils = require('react-addons-test-utils');;

// Components
var AddressPrefix = require('../AddressPrefix');
var HouseNumber = require('../HouseNumber');
var HouseName = require('../HouseName');
var StreetName = require('../StreetName');
var City = require('../City');
var Country = require('../Country');
var CountryUtils = require('../../../../../utils/CountryUtils');
var AddressLine = require('../AddressLine');

var {TextQuestion,DropdownQuestion} = require('../../../../common/questionsets');

let data = {
	addressPrefix: 'AddressPrefix',
	houseNumber: 'houseNumber',
	houseName: 'houseName',
	streetName: 'streetName',
	countries: [],
	group: 'group',
	name: 'name',
	addressId: 2,
	arrayName: 'addresses',
	arrayIndex: 1,
}

describe('addressParts', () => {
	beforeEach(() => {
		TextQuestion.mockClear();
		DropdownQuestion.mockClear();
	});

	describe('AddressPrefix', function() {
		let instance;
		let onChange = jest.fn();

		beforeEach(() => {
			instance = TestUtils.renderIntoDocument(
				<AddressPrefix {...data}
				onChange={onChange}>
					AddressPrefix
				</AddressPrefix>
			);
		});

		it('should render a textbox', () => {
			expect(TextQuestion.mock.calls.length).toBe(1);
		})
	});

	describe('HouseNumber', function() {
		let instance;
		let onChange = jest.fn();

		beforeEach(() => {
			instance = TestUtils.renderIntoDocument(
				<HouseNumber {...data}
				onChange={onChange}>
					HouseNumber
				</HouseNumber>
			);
		});

		it('should render a textbox', () => {
			expect(TextQuestion.mock.calls.length).toBe(1);
		})
	});

	describe('HouseName', function() {
		let instance;
		let onChange = jest.fn();

		beforeEach(() => {
			instance = TestUtils.renderIntoDocument(
				<HouseName {...data}
				onChange={onChange}>
					HouseName
				</HouseName>
			);
		});

		it('should render a textbox', () => {
			expect(TextQuestion.mock.calls.length).toBe(1);
		})
	});

	describe('StreetName', function() {
		let instance;
		let onChange = jest.fn();

		beforeEach(() => {
			instance = TestUtils.renderIntoDocument(
				<StreetName {...data}
				onChange={onChange}>
					StreetName
				</StreetName>
			);
		});

		it('should render a textbox', () => {
			expect(TextQuestion.mock.calls.length).toBe(1);
		})
	});

	describe('AddressLine', function() {
		let instance;
		let onChange = jest.fn();

		beforeEach(() => {
			instance = TestUtils.renderIntoDocument(
				<AddressLine {...data}
				index={1}
				onChange={onChange}>
					AddressLine
				</AddressLine>
			);
		});

		it('should render a textbox', () => {
			expect(TextQuestion.mock.calls.length).toBe(1);
		})
	});

	describe('City', function() {
		let instance;
		let onChange = jest.fn();

		beforeEach(() => {
			instance = TestUtils.renderIntoDocument(
				<City {...data}
				editable={true}
				onChange={onChange}>
					City
				</City>
			);
		});

		it('should render a textbox', () => {
			expect(TextQuestion.mock.calls.length).toBe(1);
		});

		describe('when not editable', () => {
			beforeEach(() => {
				TextQuestion.mockClear();
				instance = TestUtils.renderIntoDocument(
					<City {...data}
					editable={false}
					onChange={onChange}>
						City
					</City>
				);
			});

			it('should render a textbox', () => {
				expect(TextQuestion.mock.calls.length).toBe(0);
			});
		});
	});

	describe('Country', function() {
		let instance;
		let onChange = jest.fn();

		beforeEach(() => {
			instance = TestUtils.renderIntoDocument(
				<Country {...data}
				editable={true}
				onChange={onChange}>
					Country
				</Country>
			);
		});

		it('should render a textbox', () => {
			expect(DropdownQuestion.mock.calls.length).toBe(1);
		});

		describe('when not editable', () => {
			beforeEach(() => {
				DropdownQuestion.mockClear();
				instance = TestUtils.renderIntoDocument(
					<Country {...data}
					editable={false}
					onChange={onChange}>
						City
					</Country>
				);
			});

			it('should render a textbox', () => {
				expect(DropdownQuestion.mock.calls.length).toBe(0);
			});
		})
	});
});


