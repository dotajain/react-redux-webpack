/**
 * @module AnalyticsConstants
 * @requires keyMirror
 */

const keyMirror = require('keymirror');

/**
 * @const AnalyticsConstants
 */
module.exports = keyMirror({

	TRACK_EVENT: null,

	REQUEST_IMMEDIATE_DISPATCH: null,

	REQUEST_CHECKLOOP_START: null,
	REQUEST_CHECKLOOP_TERMINATION: null,

	REQUEST_DISPATCH_SUCCESS: null,
	REQUEST_DISPATCH_ERROR: null,

});
