/**
 * @module PostcodeApiUtils
 */

const envConfig = require('../../static/config');
const config = require('../config');

const Api = require('./Api');

const _endpointSearch = '/ref/address/search';
const _endpointSelected = '/ref/address/{addressRef}';
const _postcode = '/{postcode}';
const _houseNumber = '/{houseNumber}';

module.exports = {
	apiVersion: config.apiVersions.referenceServices,

	/**
	 * Call the postcode api and look up the addresses for a UK postcode.
	 *
	 * @param {String} postcode 		The postcode entered by the user.
	 * @param {String} houseNumber 		The house number entered by the user (optional, not used in this application).
	 */
	search(postcode, houseNumber) {
		const { apiVersion } = this;

		const url = [envConfig.apiBaseUrl, _endpointSearch, this.formatQuery(postcode, houseNumber)].join('');

		return Api.get(url).setupWith({ apiVersion });
	},

	/**
	 * Call the postcode api and look up the addresses an address reference
	 *
	 * @param {String} addressRef 		The addressRef (given back from the search api request).
	 */
	load(addressRef) {
		const { apiVersion } = this;

		const url = [envConfig.apiBaseUrl, _endpointSelected].join('').replace('{addressRef}', addressRef);

		return Api.get(url).setupWith({ apiVersion });
	},

	/**
	 * Format the request query for searching for postcode.
	 *
	 * @param {String} postcode 		The postcode entered by the user.
	 * @param {String} houseNumber 		The house number entered by the user (optional, not used in this application).
	 */
	formatQuery(postcode, houseNumber) {
		let url = '';

		if (postcode) {
			url += _postcode.replace('{postcode}', postcode.replace(' ', '').toUpperCase());
		}

		if (postcode && houseNumber) {
			url += _houseNumber.replace('{houseNumber}', houseNumber.replace(' ', '').toUpperCase());
		}

		return url;
	},
};
