

jest.unmock('../DateUtils');
jest.unmock('moment');
jest.unmock('lodash');

const DateUtils = require('../DateUtils');
const moment = require('moment');
const _ = require('lodash');

// Mocks
const config = require('../../config');

describe('DateUtils', function() {
	beforeEach(function() {
		config.dateFormat = 'DD-MM-YYYY';
		config.dateFormatInAPI = 'YYYY-MM-DD';
	});

	afterEach(function() {
		delete config.dateFormat;
		delete config.dateFormatInAPI;
	});

	describe('getMomentFromTimestamp', function() {
		it('returns a moment based on the given input', function() {

			const result = DateUtils.getMomentFromTimestamp(1429611073000);
			expect(result.isValid()).toBe(true);
			expect(result.date()).toEqual(21);
			expect(result.month()).toEqual(3);
			expect(result.year()).toEqual(2015);
		});
	});

	describe('getMomentFromDateString', function() {
		it('returns a moment based on the given input', function() {

			const result = DateUtils.getMomentFromDateString('03-05-1990');
			expect(result.isValid()).toBe(true);
			expect(result.date()).toEqual(3);
			expect(result.month()).toEqual(4);
			expect(result.year()).toEqual(1990);
		});
	});

	describe('getShortString', function() {
		it('returns a string representing the given moment', function() {
			const day = moment('1995-12-25');
			expect(DateUtils.getShortString(day)).toEqual('25-12-1995');
		});

		it('returns a string representing the current moment if given invalid or no inputs', function() {
			_.forEach([undefined, false, null, 'hey'], function(item) {
				const result = DateUtils.getShortString(item);
				expect(_.isString(result)).toBe(true);
				expect(result.length).toBe(10);
				expect(result.substr(-4)).toBe(new Date().getFullYear().toString());
			});
		});
	});

	describe('getAPIDateString', function() {
		it('takes a date string in the app format, and returns one in API format', function() {
			expect(DateUtils.getAPIDateString('03-05-1990')).toEqual('1990-05-03');
			expect(DateUtils.getAPIDateString('01-12-1900')).toEqual('1900-12-01');

			config.dateFormatInAPI = 'YYYY-DD-MM';
			expect(DateUtils.getAPIDateString('31-01-2015')).toEqual('2015-31-01');
		});

		it('returns an empty string if given invalid inputs', function() {
			expect(DateUtils.getAPIDateString(false)).toEqual('');
			expect(DateUtils.getAPIDateString(null)).toEqual('');
			expect(DateUtils.getAPIDateString('hey')).toEqual('');
		});
	});

	describe('getDateStringFromAPI', function() {
		it('takes a date string in the app format, and returns one in API format', function() {
			expect(DateUtils.getDateStringFromAPI('1990-05-03')).toEqual('03-05-1990');
			expect(DateUtils.getDateStringFromAPI('1900-12-01')).toEqual('01-12-1900');

			config.dateFormatInAPI = 'YYYY-DD-MM';
			expect(DateUtils.getDateStringFromAPI('2015-31-01')).toEqual('31-01-2015');
		});

		it('returns an empty string if given invalid inputs', function() {
			expect(DateUtils.getAPIDateString(false)).toEqual('');
			expect(DateUtils.getAPIDateString(null)).toEqual('');
			expect(DateUtils.getAPIDateString('hey')).toEqual('');
		});
	});

	describe('getShortStringFromHTML5Date', function() {
		it('takes a date string in the API format, and returns one in the app format', function() {
			expect(DateUtils.getShortStringFromHTML5Date('1990-05-03')).toEqual('03-05-1990');
			expect(DateUtils.getShortStringFromHTML5Date('1900-12-01')).toEqual('01-12-1900');

			config.dateFormatInAPI = 'YYYY-DD-MM';
			expect(DateUtils.getShortStringFromHTML5Date('2015-31-01')).toEqual('31-01-2015');
		});

		it('returns an empty string if given invalid inputs', function() {
			expect(DateUtils.getShortStringFromHTML5Date(false)).toEqual('');
			expect(DateUtils.getShortStringFromHTML5Date(null)).toEqual('');
			expect(DateUtils.getShortStringFromHTML5Date('hey')).toEqual('');
		});
	});
});
