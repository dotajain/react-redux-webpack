

jest.unmock('../MaskingUtils');

const MaskingUtils = require('../MaskingUtils');

describe('MaskingUtils', function() {

	describe('applyMask', function() {

		const results = [
			{value: '07411167094', numberOfMasks: 5, startPosition: 3, maskedValue: '074•••••094'},
			{value: '07411167094', numberOfMasks: 5, startPosition: 0, maskedValue: '•••••167094'},
			{value: '07411167094', numberOfMasks: 10, startPosition: 0, maskedValue: '••••••••••4'},
			{value: '07411167094', numberOfMasks: 10, startPosition: 1, maskedValue: '0••••••••••'},
			{value: '07411167094', numberOfMasks: 5, startPosition: 6, maskedValue: '074111•••••'},
			{value: '07411167094', numberOfMasks: 0, startPosition: 6, maskedValue: '07411167094'},
			{value: '07411167094', numberOfMasks: 5, startPosition: -1, maskedValue: '07411167094'}, // Start pos less than zero
			{value: '07411167094', numberOfMasks: -1, startPosition: 0, maskedValue: '07411167094'}, // Num masks less than zero
			{value: '07411167094', numberOfMasks: 99, startPosition: 3, maskedValue: '074••••••••'}, // Start pos higher than string length
		];

		it('should apply the appropriate mask', () => {
			for (let i = 0, numResults = results.length; i < numResults; i++) {
				const mask = MaskingUtils.applyMask(results[i].value, results[i].startPosition, results[i].numberOfMasks);
				expect(results[i].maskedValue).toEqual(mask);
			};
		});

		it('should hide the masked characters', () => {

			const results = [
				{value: '07411167094', numberOfMasks: 7, startPosition: 0, maskedValue: '7094', maskChar: ''},
				{value: '07411167094', numberOfMasks: 7, startPosition: 0, maskedValue: 'fffffff7094', maskChar: 'f'},
				{value: '07411167094', numberOfMasks: 7, startPosition: 0, maskedValue: '-------7094', maskChar: '-'},
			];

			for (let i = 0, numResults = results.length; i < numResults; i++) {
				const mask = MaskingUtils.applyMask(results[i].value, results[i].startPosition, results[i].numberOfMasks, results[i].maskChar);
				expect(results[i].maskedValue).toEqual(mask);
			};
		});
	});
});
