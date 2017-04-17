
jest.unmock('../AddressTransformer');
jest.unmock('../RegexUtils');
jest.unmock('../GenericMapperUtils');
jest.unmock('../DateUtils');
jest.unmock('../../config');

var _ = require('lodash');
var moment = require('moment');

var AddressTransformer = require('../AddressTransformer');
var DateUtils = require('../DateUtils');

let yearsAgo = seed => moment().subtract(seed, 'years').format('DD-MM-YYYY')

let result;

describe('AddressTransformer', () => {

	describe('fromGet', () => {
		it('deletes address object when invalid', () => {
			let invalidAddress = [{
				"uk_address": {
					"postal_code": "ZZZ",
				},
				"effective_period": {
					"from": "2010-02-02T00:00:00.001Z"
				}
			}, {
				"uk_address": {
					"postal_code": "",
				},
				"effective_period": {
					"from": "2010-02-02T00:00:00.001Z"
				}
			}];

			result = AddressTransformer.fromGet(invalidAddress);

			expect(result.length).toBe(0);
		});

		it('current address is international', () => {
			let invalidAddress = [{
				"international_address": {
					"country": "Spain",
					// We do not test what happens when
					// a postcode is present because we do
					// not get one back
					// @ticket DYB-32575
				},
				"effective_period": {
					"from": "2010-02-02T00:00:00.001Z"
				}
			}];

			result = AddressTransformer.fromGet(invalidAddress);

			expect(result.length).toBe(0);
		});

		it('maps address object when valid', () => {
			let validAddress = [{
				"uk_address": {
					"postal_code": "G73 4JR",
				},
				"effective_period": {
					"from": "2010-02-02T00:00:00.001Z"
				}
			}];

			result = AddressTransformer.fromGet(validAddress);

			expect(result.length).toBe(1);
		});

	});

	describe('fromPostcodeResult', () => {
		describe('DGW2AO-375: when address_line2 has a comma', () => {
			beforeEach(() => {
				result = AddressTransformer.fromPostcodeResult({
					'address_line2': 'something, with,commas',
				});
			});

			it('should remove them correctly', () => {
				expect(result.addressLine2).toBe('something with commas');
			});
		});
	});

	describe('forPost', () => {
		beforeEach(() => {
			result = AddressTransformer.toPost([{
				addressType: 'domestic',
				addressPrefix: '1/2',
				houseNumber : '39',
				houseName: 'Batcave',
				streetName : 'High Street',
				addressLine1: '2/1, 39 High Street, Glasgow, G11 1CB',
				addressLine2: 'addressLine2',
				city: 'Glasgow',
				postcode : 'G11 1CB',
				id: '1234',
				isManual: true,
				dateMoved: yearsAgo(1),
			}, {
				addressType: 'domestic',
				addressPrefix: '1/2',
				houseNumber : '39',
				houseName: 'Batcave',
				streetName : 'High Street',
				addressLine1: '2/1, 39 High Street, Glasgow, G11 1CB',
				addressLine2: 'addressLine2',
				city: 'Glasgow',
				postcode : 'G11 1CB',
				dateMoved: yearsAgo(2),
			}, {
				addressType: 'international',
				addressLine1: 'addressLine1',
				addressLine2: 'addressLine2',
				addressLine3: 'addressLine3',
				addressLine4: 'addressLine4',
				country: 'GER',
				dateMoved: yearsAgo(3),
			}]);
		});

		it('should map correctly', () => {
			expect(result).toEqual([{
				uk_address: {
					address_prefix: '1/2',
					house_number: '39',
					house_name: 'Batcave',
					street: 'High Street',
					address_line1: '1/2, Batcave, 39 High Street',
					address_line2: 'addressLine2',
					address_reference: '1234',
					city: 'Glasgow',
					postal_code: 'G11 1CB' },
					effective_period: { from: DateUtils.getAPIDateString(yearsAgo(1)) }
			}, {
				uk_address: {
					address_prefix: '1/2',
					house_number: '39',
					house_name: 'Batcave',
					street: 'High Street',
					address_line1: '1/2, Batcave, 39 High Street',
					address_line2: 'addressLine2',
					city: 'Glasgow',
					postal_code: 'G11 1CB' },
					effective_period: { from: DateUtils.getAPIDateString(yearsAgo(2)), to: DateUtils.getAPIDateString(yearsAgo(1))}
			}, {
				international_address: {
					address_line1: 'addressLine1',
					address_line2: 'addressLine2',
					address_line3: 'addressLine3',
					address_line4: 'addressLine4',
					country: 'GER', },
					effective_period: { from: DateUtils.getAPIDateString(yearsAgo(3)), to: DateUtils.getAPIDateString(yearsAgo(2))}
			}]);
		});
	});
});
