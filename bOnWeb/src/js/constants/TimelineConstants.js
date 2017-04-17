/**
 * @module TimelineConstants
 * @requires keyMirror
 */

const keyMirror = require('keymirror');

/**
 * @const TimelineConstants
 */
module.exports = keyMirror({
	REQUEST_TRANSACTION_LIST: null,
	REQUEST_TRANSACTION_LIST_SUCCESS: null,
	REQUEST_SEARCH_TRANSACTION_SUGGEST: null,
	REQUEST_SEARCH_TRANSACTION_DATA: null,
	REQUEST_TRANSACTION_LIST_ERROR: null,
	RESET_SEARCH_INFO: null,
});
