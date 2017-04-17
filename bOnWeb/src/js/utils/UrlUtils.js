/**
 * @module UrlUtils
 */

const _ = require('lodash');

module.exports = {

	getParam(name) {
		if (!_.isString(name)) {
			return '';
		}

		const regexName = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
		const regex = new RegExp(`[\\?&]${regexName}=([^&#]*)`);
		const results = regex.exec(this.retrieveSearch());

		return _.escape(results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' ')));
	},

	retrieveSearch() {
		return window.location.search;
	},

	/**
	 * A wrapper method for window location pathname
	 * @return {string} window.location.pathname
	 */
	getPathName() {
		return window.location.pathname;
	},

	/**
	 * A wrapper method for window.location.href
	 * @return string [window url
	 */
	getFullUrl() {
		return window.location.href;
	},
};
