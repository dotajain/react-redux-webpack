
jest.unmock('../CountryUtils');
jest.unmock('lodash');
jest.unmock('../MaskingUtils');
jest.unmock('../AddressTransformer');

// Packages
const React = require('react');
const TestUtils = require('react-addons-test-utils');

// Components
const CountryUtils = require('../CountryUtils');

describe('CountryUtils', function() {

	describe('getAddressString', () => {
		it('should render a international address string based on the data supplied', ()=> {
			const data = {
				addressType: 'international',
				addressLine1: '2/2',
				addressLine2: '52',
				addressLine3: 'Test lane',
				addressLine4: 'Glasgow',
				country: 'GER'
			};

			let result = CountryUtils.getAddressString(data);
			expect(result).toMatch('2/2, 52, Test lane, Glasgow, Ger');
		});

		it('should render a domestic address string based on the data supplied', ()=> {
			let data = {
				addressType: 'domestic',
				addressPrefix: '2/2',
				houseNumber: '52',
				streetName: 'Test lane',
				city: 'Glasgow',
				postcode: 'UK'
			};

			const result = CountryUtils.getAddressString(data);
			expect(result).toMatch('2/2, 52, Test lane, Glasgow, UK');
		});

		it('should return an empty string if address data is undefined', ()=> {
			const result = CountryUtils.getAddressString(undefined);
			expect(result).toMatch('');
		});

		it('should mask the postcode if requested', () => {
			const data = {
				addressType: 'domestic',
				addressPrefix: '2/2',
				houseNumber: '52',
				streetName: 'Test lane',
				city: 'Glasgow',
				postcode: 'X9 9BF'
			};

			const result = CountryUtils.getAddressString(data, true);
			expect(result).toEqual('2/2, 52, Test lane, Glasgow, X9 •••');
		});

		it('should not mask the postcode if not requested', () => {
			const data = {
				addressType: 'domestic',
				addressPrefix: '2/2',
				houseNumber: '52',
				streetName: 'Test lane',
				city: 'Glasgow',
				postcode: 'X9 9BF'
			};

			const result = CountryUtils.getAddressString(data, false);
			expect(result).toEqual('2/2, 52, Test lane, Glasgow, X9 9BF');
		});

		it('should not fail if there is no postcode to mask', () => {
			const data = {
				addressType: 'domestic',
				addressPrefix: '2/2',
				houseNumber: '52',
				streetName: 'Test lane',
				city: 'Glasgow',
			};

			const result = CountryUtils.getAddressString(data, true);
			expect(result).toEqual('2/2, 52, Test lane, Glasgow');
		});
	});

	describe('withCountryNames', function() {
		it('Should have country names as values', function() {
			const countries = CountryUtils.withCountryNames();
			for (let i = 0; i < countries.length; i++) {
				expect(countries[i].label).toEqual(countries[i].value);
			};
		});

		it('should can filter our UK', function() {
			var countries = CountryUtils.withCountryNames(data => data.code !== 'GB');
			expect(countries[0].label).not.toBe('United Kingdom');
		});
	});

	describe('withCountryCodes', function() {
		it('Should have country codes as values', function() {
			const countries = CountryUtils.withCountryCodes();
			for (let i = 0; i < countries.length; i++) {
				expect(countries[i].value.length).toEqual(2);
			};
		});
	});

	describe('withNationalityLabels', function() {
		it('should have nationalities as labels and codes as values', function() {
			const countries = CountryUtils.withNationalityLabels();
			for (let i = 0; i < countries.length; i++) {
				expect(countries[i].value.length).toEqual(2);

				if (countries[i].value === 'IE') {
					expect(countries[i].label).toBe('Irish');
				}
			};
		});

		it('should use the country name for countries with no nationality defined', function() {
			const countries = CountryUtils.withNationalityLabels();
			for (let i = 0; i < countries.length; i++) {
				expect(countries[i].label.length > 0).toBeTruthy();
			};
		});
	});

	describe('withNationalityLabelsAndCountryNames', function() {
		it('should have nationalities as labels and codes as values', function() {
			const countries = CountryUtils.withNationalityLabelsAndCountryNames();

			expect(countries[0].label).toBe('British');
			expect(countries[0].value).toBe('United Kingdom');

			expect(countries[1].label).toBe('Afghani');
			expect(countries[1].value).toBe('Afghanistan');

			expect(countries[2].label).toBe('Alandic');
			expect(countries[2].value).toBe('Aland Islands');
		});

		it('should use the country name for countries with no nationality defined', function() {
			const countries = CountryUtils.withNationalityLabelsAndCountryNames();
			for (let i = 0; i < countries.length; i++) {
				expect(countries[i].label.length > 0).toBeTruthy();
			};
		});
	});

	describe('getCodeFromName', function() {
		it('should return the right code', function() {
			expect(CountryUtils.getCodeFromName('Afghanistan')).toBe('AF');
			expect(CountryUtils.getCodeFromName('Cook Islands')).toBe('CK');
			expect(CountryUtils.getCodeFromName('Mexico')).toBe('MX');
			expect(CountryUtils.getCodeFromName('Zimbabwe')).toBe('ZW');
		});

		it('should return undefined if the country is not found', function() {
			expect(CountryUtils.getCodeFromName('Westeros')).toBeUndefined();
		});
	});

	describe('getNameFromCode', function() {
		it('should return the right code', function() {
			expect(CountryUtils.getNameFromCode('AF')).toBe('Afghanistan');
			expect(CountryUtils.getNameFromCode('CK')).toBe('Cook Islands');
			expect(CountryUtils.getNameFromCode('MX')).toBe('Mexico');
			expect(CountryUtils.getNameFromCode('ZW')).toBe('Zimbabwe');
		});

		it('should return undefined if the country is not found', function() {
			expect(CountryUtils.getNameFromCode('Westeros')).toBeUndefined();
		});
	});

	describe('getNationalityFromName', function() {
		it('should return the right nationality', function() {
			expect(CountryUtils.getNationalityFromName('Ireland')).toBe('Irish');
			expect(CountryUtils.getNationalityFromName('Cook Islands')).toBe('Cook Islander');
			expect(CountryUtils.getNationalityFromName('United Kingdom')).toBe('British');
			expect(CountryUtils.getNationalityFromName('Sao Tome and Principe')).toBe('Sao Tomean');
		});

		it('should return undefined if the country is not found', function() {
			expect(CountryUtils.getNationalityFromName('Westeros')).toBeUndefined();
		});
	});
});
