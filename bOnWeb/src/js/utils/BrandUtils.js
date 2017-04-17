/**
 * @module BrandUtils
 * @requires lodash
 * @requires envConfig
 * @requires config
 */

// Packages
const _ = require('lodash');
const envConfig = require('../../static/config');

// Utils
const PathUtils = require('./PathUtils');
const UrlUtils = require('./UrlUtils');

const branding = [{
	brands: ['CB', 'YB'],
	components: [
		'page-header-with-text',
		'progress-bar',
		'review-flat',
		'submission-page-with-image',
		'offer-page-with-image',
		'deferred-page-with-image',
		'id-deferred-page-with-image',
		'declined-page-with-image',
		'decline-page-with-image',
		'switch-page-with-image',
		'registration-page-with-image',
		'account-opened-page-with-image',
		'page-wrapper-without-margin',
		'account-opened-page-bullets',
		'portal-page-multiple-columns',
		'md-view-aligned-with-lg',
		'offer-page-with-separate-offer-and-debit-sections',
		'initial-questions-radio-buttons-right',
		'authentication-page-details-title',
		'contact-bank-page-with-image',
		'authentication-page',
	],
}, {
	brands: ['DYB'],
	components: [
		'eligibility-device-question',
		'page-header-without-text',
		'side-progress-bar',
		'review-paper',
		'page-wrapper-with-margin',
		'result-pages-header',
		'page-footer',
		'security-page-with-descriptive-question-number',
		'portal-page-case-columns',
		'sidebar-collapsible',
		'login-page-full-width',
		'login-page-title',
		'auth-page-full-width',
		'md-view-semi-aligned-with-xs',
		'offer-page-with-joined-offer-and-debit-sections',
		'contains-additional-savings-account-payment-info',
		'requires-phone-number-to-be-mobile',
		'select-your-bank-section',
		'unified-login',
		'authentication-page',
		'app-links',
	],
}];

/**
 * @class
 */
const BrandUtils = {
	branding,
	loadAdditionalOverrides: _.memoize(() => UrlUtils.getParam('addFeatures')),
	loadSubtractedOverrides: _.memoize(() => UrlUtils.getParam('removeFeatures')),
	/**
	 * Append the name of the brand to a given string
	 *
	 * @param {String} value 		The string to append
	 * @param {String} bankId 		The optional bankId to override the environment
	 */
	appendBrand(value, bankId) {
		return PathUtils.getPath(value.replace('{}', (bankId || envConfig.bankId).toLowerCase()));
	},

	/**
	 * Get the default column size for inputs. Do we want the label next to the input or above?
	 *
	 */
	defaultColumnSize() {
		return _.includes(['CB', 'YB'], envConfig.bankId) ? 8 : 12;
	},

	/**
	 * Returns whether to display a given component based on the config brand
	 *
	 * @param {String} component 		The component being put forth for display
	 */
	isAbleToDisplay(component) {
		return _.chain(this.branding)
			.find(item => {
				return _.includes(item.brands, envConfig.bankId);
			})
			.result('components')
			.thru(c => this.addOverrides(c))
			.thru(c => this.removeOverrides(c))
			.includes(component)
			.value();
	},

	addOverrides(components) {
		const filter = (comps, featuresArray) => comps.concat(featuresArray);

		return this.processOverrides(components, () => this.loadAdditionalOverrides(), filter);
	},

	removeOverrides(components) {
		const filter = (comps, featuresArray) => _.filter(comps, component => {
			return _.indexOf(featuresArray, component) === -1;
		});

		return this.processOverrides(components, () => this.loadSubtractedOverrides(), filter);
	},

	processOverrides(components, fetcher, processor) {
		if (process.env.NODE_ENV === 'production') {
			return components;
		}

		const features = fetcher();

		if (!features) {
			return components;
		}

		const featuresArray = features.split(',');

		return processor(components, featuresArray);
	},

	getResultImage(component, imageName) {
		let result;

		if (this.isAbleToDisplay(component)) {
			result = this.appendBrand(`images/{}/${imageName}`);
		}

		return result;
	},

};

module.exports = BrandUtils;
