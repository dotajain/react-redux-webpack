
jest.unmock('../NumberUtils');

const NumberUtils = require('../NumberUtils');

describe('NumberUtils', function() {
	describe('appendCurrency', function() {
		it('replaces the string and corrects decimals given 1 decimal', function() {
			const string = 'Give me {}';
			const value = 7.5;
			const expectedString = 'Give me £ 7.50';
			expect(NumberUtils.appendCurrency(string, value)).toBe(expectedString);
		});

		it('replaces the string and does not correct decimals given 2 decimals', function() {
			const string = 'Give me {}';
			const value = 7.55;
			const expectedString = 'Give me £ 7.55';
			expect(NumberUtils.appendCurrency(string, value)).toBe(expectedString);
		});

		it('does not replace the string', function() {
			const string = 'It\'s all free!';
			const value = 7.5;
			expect(NumberUtils.appendCurrency(string, value)).toBe(string);
		});
	});
});
