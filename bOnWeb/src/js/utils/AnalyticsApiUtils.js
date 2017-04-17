/**
 * @module AnalyticsApiUtils
 */

const AnalyticsServerActionCreator = require('../actions/AnalyticsActionServerCreator');
const config = require('../config');
const envConfig = require('../../static/config');

// Utils
const ApiUtils = require('./ApiUtils');
const BrowserUtils = require('../utils/BrowserUtils');
const UrlUtils = require('../utils/UrlUtils');

// Stores
const SessionStore = require('../stores/SessionStore');

// Endpoints
const _eventsEndpoint = '/banks/{bank-id}/user/events';

module.exports = {

	getCommonAttributes(store) {
		return {
			userAgent: BrowserUtils.getUserAgent(),
			channelID: config.analytics.channelID,
			selectedProduct: this.getStoreValue(store, 'productCode'),
			url: UrlUtils.getFullUrl(),
			firstName: this.getStoreValue(store, 'firstName'),
			middleName: this.getStoreValue(store, 'middleName'),
			lastName: this.getStoreValue(store, 'lastName'),
		};
	},

	getCommonMetrics() {
		const _screenSize = BrowserUtils.getScreenSize();
		return {
			screenWidth: _screenSize ? _screenSize.x : undefined,
			screenHeight: _screenSize ? _screenSize.y : undefined,
		};
	},

	getViewContext() {
		return UrlUtils.getPathName();
	},

	getStoreValue(store, key) {
		if (store.getValue(key)) {
			return store.getValue(key);
		} else {
			return undefined;
		}
	},

	/**
	 * Sends the event messages queue to the Analytics API. This method also
	 * converts the array into a JSON to conform to the API standard.
	 *
	 * @param  {array} messages
	 *
	 */
	send(messages) {
		const sessionData = SessionStore.getAll();

		const requestData = messages;

		const url = envConfig.apiBaseUrl + _eventsEndpoint;

		if (!envConfig.disableAnalytics) {
			ApiUtils.makeAjaxCall({
				apiVersion: config.apiVersions.eventServices,
				method: 'POST',
				url,
				bankID: config.analytics.defaultBankID,
				requestData,
				authToken: sessionData ? sessionData.accessToken : undefined,
				doNotTrackCallProgress: true,

			}, () => {
				AnalyticsServerActionCreator.handleDispatchSuccess();
			}, () => {
				AnalyticsServerActionCreator.handleDispatchError();
			});
		}
	},
};
