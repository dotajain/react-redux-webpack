/**
 * @module AccountConstants
 * @requires keyMirror
 */

const keyMirror = require('keymirror');

/**
 * @const AccountConstants
 */
module.exports = keyMirror({
	REQUEST_ACCOUNTS_LIST: null,
	REQUEST_ACCOUNTS_LIST_SUCCESS: null,
	REQUEST_ACCOUNT_DETAILS: null,
	REQUEST_ACCOUNT_DETAILS_SUCCESS: null,
	REQUEST_ACCOUNTS_LIST_ERROR: null,
	REQUEST_ACCOUNT_DETAILS_ERROR: null,
	REQUEST_TERMS_AND_CONDITIONS: null,
	REQUEST_ACCEPT_TC_SUCCESS: null,
	REQUEST_ACCOUNTS_RESET_ERROR: null,
});
