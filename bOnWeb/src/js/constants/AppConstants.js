/**
 * @module AccountOpeningConstants
 * @requires keyMirror
 * @requires lodash
 */

const keyMirror = require('keymirror');
const _ = require('lodash');

const payloadSources = {
	PayloadSources: keyMirror({
		SERVER_ACTION: null,
		VIEW_ACTION: null,
	}),
};

/**
 * @const appConstants
 */
const appConstants = keyMirror({

	// DEPRECATED?
	SHOW_SPINNER: null,
	HIDE_SPINNER: null,

	HEADER_COLLAPSE: null,
	HEADER_EXPAND: null,

	GET_NEXT_TASK: null,
	NAVIGATE_TO_TASK: null,
	CLEAR_TASKS: null,
	CLEAR_WEB_TASK: null,
	NAVIGATE_TO_WEB_TASK: null,

	TRACK_API_CALL_STARTED: null,
	TRACK_API_CALL_COMPLETE: null,

	REQUEST_STEPUP_AUTHENTICATION: null,
	REQUEST_STEPUP_AUTHENTICATION_CALLBACK: null,

});

module.exports = _.merge(payloadSources, appConstants);
