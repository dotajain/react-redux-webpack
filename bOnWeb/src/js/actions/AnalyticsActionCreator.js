
const AppDispatcher = require('../dispatcher/AppDispatcher');
const AnalyticsConstants = require('../constants/AnalyticsConstants');
const AnalyticsStore = require('../stores/AnalyticsStore');

/**
 * @class AnalyticsActionCreator
 */
const AnalyticsActionCreator = {

	/**
	 * This function can be used to record events within the
	 * analytics store. An event can be composed of a category, action
	 * label and value.
	 *
	 * @param  {string}   eventName
	 * @param  {object}   attributes
	 * @param  {object}   metrics
	 * @param  {function}	callback
	 */
	track(type = {}, attributes = {}, metrics = {}, callback) {
		AppDispatcher.handleViewAction({
			actionType: AnalyticsConstants.TRACK_EVENT,
			data: {
				type,
				data: {
					attributes,
					metrics,
				},
			},
		});

		// Wait for dispatcher execution to avoid sending before appending message
		if (typeof callback === 'function') {
			if (AppDispatcher.isDispatching()) {
				AppDispatcher.waitFor(AnalyticsStore.dispatchToken);
			}
			callback();
		}
	},

	/**
	 * This function is to be used directly to request an immediate
	 * dispatch of all the Analytics messages to the server.
	 *
	 */
	requestImmediateDispatch() {
		AppDispatcher.handleViewAction({
			actionType: AnalyticsConstants.REQUEST_IMMEDIATE_DISPATCH,
		});
	},

	/**
	 * This function is used to start the dispatch cycle.
	 *
	 */
	requestCheckLoopStart() {
		AppDispatcher.handleViewAction({
			actionType: AnalyticsConstants.REQUEST_CHECKLOOP_START,
		});
	},

	/**
	 * This function is used to terminate the dispatch cycle
	 *
	 */
	requestCheckLoopTermination() {
		AppDispatcher.handleViewAction({
			actionType: AnalyticsConstants.REQUEST_DCHECKLOOP_TERMINATION,
		});
	},

};

module.exports = AnalyticsActionCreator;
