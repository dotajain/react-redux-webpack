

jest.unmock('../ScreenshotUtils');

const config = require('../../config');

const ScreenshotUtils = require('../ScreenshotUtils');

describe('ScreenshotUtils', function() {

	let originalConfigMaxLength;

	beforeEach(function() {
		originalConfigMaxLength = config.apiStringFieldMaxLength;
		config.apiStringFieldMaxLength = 3;
	});

	afterEach(function() {
		config.apiStringFieldMaxLength = originalConfigMaxLength;
	});

	describe('splitImageIntoParts', function() {
		it('returns an empty array when given invalid inputs', function() {
			expect(ScreenshotUtils.splitImageIntoParts(false).length).toEqual(0);
			expect(ScreenshotUtils.splitImageIntoParts(15).length).toEqual(0);
			expect(ScreenshotUtils.splitImageIntoParts(undefined).length).toEqual(0);
		});

		it('returns a single part when the image is under the max size', function() {
			const result = ScreenshotUtils.splitImageIntoParts('ab');
			expect(result.length).toEqual(1);
			expect(result[0]).toEqual('ab');
		});

		it('returns multiple parts when the image is over the max size', function() {
			const result = ScreenshotUtils.splitImageIntoParts('abcdefgh');
			expect(result.length).toEqual(3);
			expect(result[0]).toEqual('abc');
			expect(result[1]).toEqual('def');
			expect(result[2]).toEqual('gh');
		});
	});
});
