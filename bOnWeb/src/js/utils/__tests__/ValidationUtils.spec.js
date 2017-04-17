

jest.unmock('lodash');
jest.unmock('../ValidationUtils');

const ValidationUtils = require('../ValidationUtils');

describe('ValidationUtils', function() {

	let data;

	beforeEach(function() {
		data = {
			testGroup: {
				item1: {
					isValid: true,
					isEnabled: true
				},
				item2: {
					isValid: false,
					isEnabled: false
				},
				item3: {
					isValid: true,
					isEnabled: true
				}
			}
		};
	});

	afterEach(function() {
		data = null;
	});

	describe('isGroupValid', function() {
		it('returns true only when all items in the group are valid and enabled', function() {
			expect(ValidationUtils.isGroupValid(data, 'testGroup')).toBe(false);

			data.testGroup.item2.isEnabled = true;
			data.testGroup.item2.isValid = false;
			expect(ValidationUtils.isGroupValid(data, 'testGroup')).toBe(false);

			data.testGroup.item2.isEnabled = false;
			data.testGroup.item2.isValid = false;
			expect(ValidationUtils.isGroupValid(data, 'testGroup')).toBe(false);

			data.testGroup.item2.isEnabled = true;
			data.testGroup.item2.isValid = true;
			expect(ValidationUtils.isGroupValid(data, 'testGroup')).toBe(true);
		});

		it('ignores disabled items when instructed', function() {
			data.testGroup.item2.isEnabled = false;
			data.testGroup.item2.isValid = false;

			expect(ValidationUtils.isGroupValid(data, 'testGroup')).toBe(false);
			expect(ValidationUtils.isGroupValid(data, 'testGroup', true)).toBe(true);
		});

		it('returns true if the group has no validations to test', function() {
			expect(ValidationUtils.isGroupValid(data, 'madeUpGroup')).toBe(true);
		});

		it('returns false if given invalid inputs', function() {
			expect(ValidationUtils.isGroupValid(false, 'testGroup')).toBe(false);
			expect(ValidationUtils.isGroupValid(null, 'testGroup')).toBe(false);
			expect(ValidationUtils.isGroupValid('hey', 'testGroup')).toBe(false);
		});
	});

	describe('isKeyValid', function() {
		it('returns true if the given key is valid or not enabled', function() {
			expect(ValidationUtils.isKeyValid(data, 'testGroup', 'item1')).toBe(true);
			expect(ValidationUtils.isKeyValid(data, 'testGroup', 'item2')).toBe(true);
			expect(ValidationUtils.isKeyValid(data, 'testGroup', 'item3')).toBe(true);

			data.testGroup.item2.isEnabled = true;
			expect(ValidationUtils.isKeyValid(data, 'testGroup', 'item2')).toBe(false);
		});

		it('returns false if the given key is not found, or bad inputs are given', function() {
			expect(ValidationUtils.isGroupValid(false, 'testGroup', 'item1')).toBe(false);
			expect(ValidationUtils.isGroupValid(null, 'testGroup', 'item1')).toBe(false);
			expect(ValidationUtils.isGroupValid('hey', 'testGroup', 'item1')).toBe(false);

			expect(ValidationUtils.isKeyValid(data, 'fakeGroup', 'item2')).toBe(false);
			expect(ValidationUtils.isKeyValid(data, 'testGroup', 'fakeItem')).toBe(false);
		});
	});
});
