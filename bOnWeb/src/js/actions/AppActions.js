/**
 * @module AppActions
 * @requires AppConstants
 * @requires AppDispatcher
 */

const AppConstants = require('../constants/AppConstants');
const AppDispatcher = require('../dispatcher/AppDispatcher');

/**
 * @class AppActions
 */
const AppActions = {

	/**
	 * Log that an API call has begun.
	 *
	 * @param  {String} url
	 */
	trackApiCallStarted(url) {
		AppDispatcher.handleViewAction({
			actionType: AppConstants.TRACK_API_CALL_STARTED,
			data: { url },
		});
	},

	/**
	 * Log that an API call has finished.
	 *
	 * @param  {String} url
	 */
	trackApiCallComplete(url) {
		AppDispatcher.handleViewAction({
			actionType: AppConstants.TRACK_API_CALL_COMPLETE,
			data: { url },
		});
	},

	/**
	 * Notify the app that a stepup authentication is now happening
	 *
	 * @param  {Function} callback
	 */
	requireStepupAuthentication(callback) {
		AppDispatcher.handleViewAction({
			actionType: AppConstants.REQUEST_STEPUP_AUTHENTICATION,
			callback,
		});
	},

	/**
	 * Execute the callback (e.g. - continue what we were trying to do before stepup)
	 */
	callStepupAuthenticationCallback() {
		AppDispatcher.handleViewAction({
			actionType: AppConstants.REQUEST_STEPUP_AUTHENTICATION_CALLBACK,
		});
	},
};

module.exports = AppActions;
