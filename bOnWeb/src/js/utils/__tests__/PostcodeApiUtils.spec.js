

jest.unmock('../PostcodeApiUtils');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const PostcodeApiUtils = require('../PostcodeApiUtils');

describe('PostcodeApiUtils test', function() {

	describe('parameters', function() {

		it('should work without a house number', function() {
			expect(PostcodeApiUtils.formatQuery('sw15 2ds')).toEqual('/SW152DS');
		});

		it('should be empty if no postcode is provided', function() {
			expect(PostcodeApiUtils.formatQuery()).toEqual('');
		});

	});

	describe('casing', function() {

		it('should be uppercase', function() {
			expect(PostcodeApiUtils.formatQuery('sw15 2ds', '18')).toEqual('/SW152DS/18');
		});
	});

	describe('spacing', function() {

		it('should not have any spacing', function() {
			expect(PostcodeApiUtils.formatQuery('sw15 2ds', '18')).toEqual('/SW152DS/18');
		});
	});
});
