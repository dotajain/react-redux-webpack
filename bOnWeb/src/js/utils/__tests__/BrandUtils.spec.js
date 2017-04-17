

jest.unmock('../BrandUtils');
jest.unmock('../PathUtils');
jest.unmock('lodash');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const BrandUtils = require('../BrandUtils');
var UrlUtils = require('../UrlUtils');

const _ = require('lodash');

// Mocks
const envConfig = require('../../../static/config');
const config = require('../../config/BrandConfig');

let originalBankId;
let originalBranding;

UrlUtils.getParam.mockImplementation((flag) => {
	if (flag === 'addFeatures') {
		return 'add-me,another-cool-feature'
	}

	if (flag === 'removeFeatures') {
		return 'something-test'
	}
});

describe('BrandUtils', function() {
	describe('isAbleToDisplay', function() {

		beforeEach(function() {

			// Ensure the global bank ID is always what we want for this test.
			originalBankId = envConfig.bankId;
			envConfig.bankId = 'YB';

			BrandUtils.branding = [
				{
					brands: ['CB', 'YB'],
					components: [
						'only-cyb',
						'something-test',
						'cyb-and-dyb'
					],
				}, {
					brands: ['DYB'],
					components: [
						'only-dyb',
						'cyb-and-dyb'
					]
				}
			];
		});

		// Revent the global envConfig back to original state.
		afterEach(function() {
			envConfig.bankId = originalBankId;
		})

		it('returns true if the key is present in only this brand list', function() {
			expect(BrandUtils.isAbleToDisplay('only-cyb')).toBe(true);
		});

		it('returns true if the key is present in both brand lists', function() {
			expect(BrandUtils.isAbleToDisplay('cyb-and-dyb')).toBe(true);
		});

		it('returns false if the key is not present in this brand list', function() {
			expect(BrandUtils.isAbleToDisplay('only-dyb')).toBe(false);
		});

		describe('add/remove new features', () => {

			it('should add features', () => {
				expect(BrandUtils.isAbleToDisplay('add-me')).toBe(true);
				expect(BrandUtils.isAbleToDisplay('another-cool-feature')).toBe(true);
			});

			it('should add features', () => {
				expect(BrandUtils.isAbleToDisplay('something-test')).toBe(false);
			});

			it('should keep previous flags', () => {
				expect(BrandUtils.isAbleToDisplay('only-cyb')).toBe(true);
				expect(BrandUtils.isAbleToDisplay('cyb-and-dyb')).toBe(true);
			});
		});


		describe('addOverride', () => {
			it('should not break with null', () => {
				BrandUtils.loadAdditionalOverrides = () => null;
				expect(BrandUtils.isAbleToDisplay('only-dyb')).toBe(false);
			});

			it('should work with 1 item', () => {
				BrandUtils.loadAdditionalOverrides = () => 'only-dyb';
				expect(BrandUtils.isAbleToDisplay('only-dyb')).toBe(true);
			});

			it('should work with multiple items', () => {
				BrandUtils.loadAdditionalOverrides = () => 'only-dyb,some,thing,else';
				expect(BrandUtils.isAbleToDisplay('only-dyb')).toBe(true);
			});
		});

		describe('removeOverrides', () => {
			it('should not break with null', () => {
				BrandUtils.loadSubtractedOverrides = () => null;
				expect(BrandUtils.isAbleToDisplay('only-cyb')).toBe(true);
			});

			it('should work with 1 item', () => {
				BrandUtils.loadSubtractedOverrides = () => 'only-cyb';
				expect(BrandUtils.isAbleToDisplay('only-cyb')).toBe(false);
			});

			it('should work with multiple items', () => {
				BrandUtils.loadSubtractedOverrides = () => 'only-cyb,something-test';
				expect(BrandUtils.isAbleToDisplay('only-cyb')).toBe(false);
				expect(BrandUtils.isAbleToDisplay('something-test')).toBe(false);
			});
		})
	});

	describe('appendBrand', function() {

		beforeEach(function() {
			envConfig.bankId = 'YB';
		});

		it('returns the passed in path merged with the environment bankId', function() {
			expect(_.includes(BrandUtils.appendBrand('/dummy/{}/path'), '/dummy/{}/path')).toBe(false);
			expect(_.includes(BrandUtils.appendBrand('/dummy/{}/path'), '/dummy/yb/path')).toBe(true);
		});

		it('returns the passed in bank Id in the path if supplied', function() {
			expect(_.includes(BrandUtils.appendBrand('/dummy/{}/path', 'dyb'), 'dummy/yb/path')).toBe(false);
			expect(_.includes(BrandUtils.appendBrand('/dummy/{}/path', 'dyb'), 'dummy/dyb/path')).toBe(true);
		});

	});
});
