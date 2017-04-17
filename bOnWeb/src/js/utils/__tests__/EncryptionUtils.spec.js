

jest.unmock('../EncryptionUtils');
jest.unmock('lodash');

const EncryptionUtils = require('../EncryptionUtils');

describe('EncryptionUtils', function() {

	describe('encrypt', function() {

		it('returns undefined if given an invalid input', function() {
			expect(EncryptionUtils.encrypt(false)).toBeUndefined();
			expect(EncryptionUtils.encrypt(null)).toBeUndefined();
			expect(EncryptionUtils.encrypt()).toBeUndefined();
		});
	});
});
