
jest.unmock('../../config');
jest.unmock('../ProductUtils');

const config = require('../../config');
const MaskingUtils = require('../ProductUtils');

describe('ProductUtils', () => {

	const productCode = 'IM540';

	beforeEach(() => {
		// Stop the test from logging un-necessarily.
		console.error = () => {};

		config.productData = {
			IM540: {
				eligibilityQuestions: ['q1', 'q2', 'q3'],
				offerItems: ['o1', 'o2'],
				offerRestrictions: ['or1', 'or2'],
				keyFeatureItems: ['k1', 'k2'],
				additionalDocumentItems: ['d1'],
				monthlyFee: 5,
				minimumAge: 18,
				maximumAge: 99,
				name: 'Product Name',
				description: 'Product description.',
				productLink: 'productLinkIM540'
			}
		};
	});

	describe('getEligibilityQuestions', () => {
		it('returns an array of questions', () => {
			const result = MaskingUtils.getEligibilityQuestions(productCode);
			expect(result).toBeDefined();
			expect(result.length).toEqual(3);
			expect(result[0]).toEqual('q1');
			expect(result[1]).toEqual('q2');
			expect(result[2]).toEqual('q3');
		});

		it('returns an empty list if product not found', () => {
			const result = MaskingUtils.getEligibilityQuestions();
			expect(result).toBeDefined();
			expect(result.length).toEqual(0);
		});
	});

	describe('getOfferItems', () => {
		it('returns an array of items', () => {
			const result = MaskingUtils.getOfferItems(productCode);
			expect(result).toBeDefined();
			expect(result.length).toEqual(2);
			expect(result[0]).toEqual('o1');
			expect(result[1]).toEqual('o2');
		});

		it('returns an empty list if product not found', () => {
			const result = MaskingUtils.getOfferItems();
			expect(result).toBeDefined();
			expect(result.length).toEqual(0);
		});
	});

	describe('getOfferRestrictionsItems', () => {
		it('returns an array of items', () => {
			const result = MaskingUtils.getOfferRestrictionsItems(productCode);
			expect(result).toBeDefined();
			expect(result.length).toEqual(2);
			expect(result[0]).toEqual('or1');
			expect(result[1]).toEqual('or2');
		});

		it('returns an empty list if product not found', () => {
			const result = MaskingUtils.getOfferRestrictionsItems();
			expect(result).toBeDefined();
			expect(result.length).toEqual(0);
		});
	});


	describe('getKeyFeatures', () => {
		it('returns an array of features', () => {
			const result = MaskingUtils.getKeyFeatures(productCode);
			expect(result).toBeDefined();
			expect(result.length).toEqual(2);
			expect(result[0]).toEqual('k1');
			expect(result[1]).toEqual('k2');
		});

		it('returns an empty list if product not found', () => {
			const result = MaskingUtils.getKeyFeatures();
			expect(result).toBeDefined();
			expect(result.length).toEqual(0);
		});
	});

	describe('getDocuments', () => {
		it('returns an array of documents', () => {
			const result = MaskingUtils.getDocuments(productCode);
			expect(result).toBeDefined();
			expect(result.length).toEqual(1);
			expect(result[0]).toEqual('d1');
		});

		it('returns an empty list if product not found', () => {
			const result = MaskingUtils.getDocuments();
			expect(result).toBeDefined();
			expect(result.length).toEqual(0);
		});
	});

	describe('getMonthlyFee', () => {
		it('returns the monthly fee', () => {
			const result = MaskingUtils.getMonthlyFee(productCode);
			expect(result).toEqual(5);
		});

		it('returns undefined if product not found', () => {
			const result = MaskingUtils.getMonthlyFee();
			expect(result).toBeUndefined();
		});
	});

	describe('getMinAge', () => {
		it('returns the minimum age', () => {
			const result = MaskingUtils.getMinAge(productCode);
			expect(result).toEqual(18);
		});

		it('returns undefined product not found', () => {
			const result = MaskingUtils.getMinAge();
			expect(result).toBeUndefined();
		});
	});

	describe('getMaxAge', () => {
		it('returns the max age', () => {
			const result = MaskingUtils.getMaxAge(productCode);
			expect(result).toEqual(99);
		});

		it('returns if product not found', () => {
			const result = MaskingUtils.getMaxAge();
			expect(result).toBeUndefined();
		});
	});

	describe('getName', () => {
		it('returns the name', () => {
			const result = MaskingUtils.getName(productCode);
			expect(result).toEqual('Product Name');
		});

		it('returns if product not found', () => {
			const result = MaskingUtils.getName();
			expect(result).toBeUndefined();
		});
	});

	describe('getDescription', () => {
		it('returns the description', () => {
			const result = MaskingUtils.getDescription(productCode);
			expect(result).toEqual('Product description.');
		});

		it('returns if product not found', () => {
			const result = MaskingUtils.getDescription();
			expect(result).toBeUndefined();
		});
	});

	describe('getLink', () => {
		it('returns the link', () => {
			const result = MaskingUtils.getLink(productCode);
			expect(result).toEqual('productLinkIM540');
		});

		it('returns if product not found', () => {
			const result = MaskingUtils.getLink();
			expect(result).toBeUndefined();
		});
	});

	describe('getSavingAccountItems', () => {

		it('returns null WHEN there are no offers ', () => {
			const result = MaskingUtils.getSavingAccountItems([]);
			expect(result).toBe(null);
		});

		it('returns all saving products WHEN there are saving products ', () => {
			const offers = [{
				"offer_id": "OFFER-1",
				"products": [{
					"product_type": "SAVINGS ACCOUNT",
					"product_code": "125",
					"bank_code": "CB",
					"debit_card_offered": "DUAL FUNCTION"
				}, {
					"product_type": "CURRENT ACCOUNT",
					"product_code": "136",
					"bank_code": "CB",
					"debit_card_offered": "DUAL FUNCTION"
				}]
			}];

			const result = MaskingUtils.getSavingAccountItems(offers);
			expect(result).toEqual([{
				"product_type": "SAVINGS ACCOUNT",
				"product_code": "125",
				"bank_code": "CB",
				"debit_card_offered": "DUAL FUNCTION"
			}]);
		});

		it('returns null WHEN there are NO saving products', () => {
			const offers = [{
				"offer_id": "OFFER-1",
				"products": [{
					"product_type": "CURRENT ACCOUNT",
					"product_code": "136",
					"bank_code": "CB",
					"debit_card_offered": "DUAL FUNCTION"
				}]
			}];

			const result = MaskingUtils.getSavingAccountItems(offers);
			expect(result.length).toBe(0);
		});
	});

});
