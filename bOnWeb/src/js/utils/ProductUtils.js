/**
 * @module ProductUtils
 */

const config = require('../config');
const _ = require('lodash');

/**
 * Private method to get the object for a particular product.
 * Log an error if not found.
 *
 * @param  {String} productCode 	What product is the user looking for?
 * @return {Object}             	Data, or empty object if none found (allows
 *                                  public utils to return a sensible default easily)
 */
const getProduct = productCode => {
	const result = config.productData[productCode];

	if (process.env.NODE_ENV === 'development') {
		if (!productCode || !result) {
			console.error(`No product found for code: ${productCode}`);
		}
	}

	return result || {};
};

const ProductUtils = {

	getProduct,

	getEligibilityQuestions(productCode) {
		return getProduct(productCode).eligibilityQuestions || [];
	},

	getOfferItems(productCode) {
		return getProduct(productCode).offerItems || [];
	},

	getOfferRestrictionsItems(productCode) {
		return getProduct(productCode).offerRestrictions || [];
	},

	getKeyFeatures(productCode) {
		return getProduct(productCode).keyFeatureItems || [];
	},

	getDocuments(productCode) {
		return getProduct(productCode).additionalDocumentItems || [];
	},

	getMonthlyFee(productCode) {
		return getProduct(productCode).monthlyFee;
	},

	getMinAge(productCode) {
		return getProduct(productCode).minimumAge;
	},

	getMaxAge(productCode) {
		return getProduct(productCode).maximumAge;
	},

	getName(productCode) {
		return getProduct(productCode).name;
	},

	getDescription(productCode) {
		return getProduct(productCode).description;
	},

	getLink(productCode) {
		return getProduct(productCode).productLink;
	},

	/**
	 * Return account opened contnet sections based off productCode
	 * @param {productCode} productCode 	Product Code
	 * @return {Array}						Content mapping config for sections
	 */
	getAccountOpenedSections(productCode) {
		return getProduct(productCode) && getProduct(productCode).accountOpenedSections;
	},

	/**
	 * Filter offers returning products which are saving related
	 * @param {Array} offer items.
	 * @return {Array} Of savings products elements.
	 */
	getSavingAccountItems(offers) {
		if (_.isUndefined(offers) || _.isEmpty(offers)) {
			return null;
		}

		return _.chain(offers)
			.first()
			.thru(offer => {
				return offer.products;
			})
			.filter(product => {
				return product['product_type'] === 'SAVINGS ACCOUNT';
			})
			.value();
	},
};

module.exports = ProductUtils;
