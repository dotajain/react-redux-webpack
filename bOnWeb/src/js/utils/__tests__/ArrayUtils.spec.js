

jest.unmock('../ArrayUtils');
jest.unmock('lodash');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const ArrayUtils = require('../ArrayUtils');

describe('ArrayUtils', function() {
	describe('getRange', function() {
		it('creates an array of numbers', function() {
			let result = ArrayUtils.getRange(0, 3);
			expect(result.length).toEqual(4);
			expect(result[0]).toEqual(0);
			expect(result[1]).toEqual(1);
			expect(result[2]).toEqual(2);
			expect(result[3]).toEqual(3);

			result = ArrayUtils.getRange(5, 10);
			expect(result.length).toEqual(6);
			expect(result[0]).toEqual(5);
			expect(result[1]).toEqual(6);
			expect(result[2]).toEqual(7);
			expect(result[3]).toEqual(8);
			expect(result[4]).toEqual(9);
			expect(result[5]).toEqual(10);
		});

		it('returns an empty array when given invalid inputs', function() {
			let result = ArrayUtils.getRange();
			expect(result.length).toEqual(0);

			result = ArrayUtils.getRange(1);
			expect(result.length).toEqual(0);

			result = ArrayUtils.getRange(2, false);
			expect(result.length).toEqual(0);

			result = ArrayUtils.getRange(4, 0);
			expect(result.length).toEqual(0);
		});
	});

	describe('getCommaString', function() {
		it('returns the array values, separated by commas', function() {
			expect(ArrayUtils.getCommaString([1, 2, 3])).toEqual('1, 2, 3');
			expect(ArrayUtils.getCommaString([0, 5, 8])).toEqual('0, 5, 8');
			expect(ArrayUtils.getCommaString(['hello', 'there', 'you'])).toEqual('hello, there, you');
		});

		it('returns an empty string when given an invalid input', function() {
			expect(ArrayUtils.getCommaString(false)).toEqual('');
			expect(ArrayUtils.getCommaString(null)).toEqual('');
			expect(ArrayUtils.getCommaString('hey')).toEqual('');
		});
	});

	describe('getDropdownLabelFromValue', ()=> {
		it('returns the label for the given value', ()=> {
			expect(ArrayUtils.getDropdownLabelFromValue('TEST', [{label: 'test data', value: 'TEST'}])).toMatch('test data');
		});

		it('returns the original value if not found in array', () => {
			expect(ArrayUtils.getDropdownLabelFromValue('OTHER', [{label: 'test data', value: 'TEST'}])).toMatch('OTHER');
		});

		it('returns the original value if values array is undefined', () => {
			expect(ArrayUtils.getDropdownLabelFromValue('TEST', undefined)).toMatch('TEST');
		});

		it('is undefined if the currentValue is not a string', () => {
			expect(ArrayUtils.getDropdownLabelFromValue(['one', 'two'],  [{label: 'test data', value: 'TEST'}])).toBeUndefined();
		});

		it('is undefined if the currentValue is undefined', () => {
			expect(ArrayUtils.getDropdownLabelFromValue(undefined,  [{label: 'test data', value: 'TEST'}])).toBeUndefined();
		});
	});
});
