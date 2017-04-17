/**
 * @module AnalyticsActionServerCreator
 */

const AppDispatcher = require('../dispatcher/AppDispatcher');
const AnalyticsConstants = require('../constants/AnalyticsConstants');

/**
 * @class AnalyticsActionServerCreator
 */
const AnalyticsActionServerCreator = {

	/**
	 * This function will be called once data from the analytics queue has
	 * been sent successfully to the server API.
	 *
	 * @param  {json} superagent response
	 */
	handleDispatchSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: AnalyticsConstants.REQUEST_DISPATCH_SUCCESS,
			data: response,
		});
	},

	/**
	 * This function will be called if sending the analytics data queue to the
	 * server has resulted in an error. The error should be logged.
	 *
	 * @param  {json} superagent response
	 */
	handleDispatchError() {
		AppDispatcher.handleServerAction({
			actionType: AnalyticsConstants.REQUEST_DISPATCH_ERROR,
		});
	},
};

module.exports = AnalyticsActionServerCreator;
