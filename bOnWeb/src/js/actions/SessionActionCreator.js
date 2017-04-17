/**
 * @class PostcodeActions
 */

const AppDispatcher = require('../dispatcher/AppDispatcher');
const SessionConstants = require('../constants/SessionConstants');

const SessionActionCreator = {

	/**
	 * Automatically log the user in, with the given username
	 * and password.
	 *
	 * @param  {String} username 	As entered by the user.
	 * @param  {String} password 	As entered by the user.
	 */
	logUserIn(username, password) {
		AppDispatcher.handleViewAction({
			actionType: SessionConstants.LOG_USER_IN,
			data: {
				username,
				password,
			},
		});
	},

	/**
	 * Initiates retrieving current user
	 *
	 */
	getCurrentUser() {
		AppDispatcher.handleViewAction({
			actionType: SessionConstants.GET_CURRENT_USER,
		});
	},

	/**
	 * An access challenge is responded to to create a token and initiate the session.
	 * This is Step 2 of the authentication process.
	 * @param  {string} username 		The username as entered on the login screen
	 * @param  {Function} callback 		A callback function to be called after we receive a token
	 */
	requestAccessTokenCreate(username, callback) {
		AppDispatcher.handleViewAction({
			actionType: SessionConstants.REQUEST_ACCESS_TOKEN_CREATE,
			data: {
				username,
				callback,
			},
		});
	},

	/**
	 * Clear the token response data from the store and emit change if necessary.
	 *
	 * @param {Boolean} localOnly		Optional. Should the token only be deleted in the browser? (No API call)
	 */
	requestAccessTokenReset(localOnly) {
		AppDispatcher.handleViewAction({
			actionType: SessionConstants.REQUEST_ACCESS_TOKEN_RESET,
			data: {
				localOnly: !!localOnly,
			},
		});
	},

	/**
	 * An initial call is made to request challenge options for the user.
	 * This is Step 1 of the authentication process.
	 * @param  {string|UUID|object} userIdentity Please refer to {@link https://abouthere.atlassian.net/wiki/display/DYB/User+Authentication#UserAuthentication-Identity}
	 * @param  {number} targetScope Target Scope for next level of authentication requested.
	 */
	requestAccessChallengeCreate(userIdentity, targetScope, callback) {
		AppDispatcher.handleViewAction({
			actionType: SessionConstants.REQUEST_ACCESS_CHALLENGE_CREATE,
			data: {
				userIdentity,
				targetScope,
				callback,
			},
		});
	},

	/**
	 * Clear the challenge response data from the store and emit change if necessary.
	 */
	requestAccessChallengeReset() {
		AppDispatcher.handleViewAction({
			actionType: SessionConstants.REQUEST_ACCESS_CHALLENGE_RESET,
		});
	},

	/**
	 * Store answers within the store in ecrypted form ONLY!
	 * @param {Object} object of authorization data
	 */
	requestAuthenticationUpdate(authObj) {
		AppDispatcher.handleViewAction({
			actionType: SessionConstants.REQUEST_AUTHENTICATION_UPDATE,
			data: {
				authType: authObj.authType,
				authData: authObj.authData,
				authIndex: authObj.authIndex,
			},
		});
	},

	/**
	 * An call is made to request that a one time password is sent to the user's phone.
	 * This is Step 1-a of the authentication process.
	 * @param  {string} username The username as entered on the login screen.
	 */
	requestOTPAuthentication(username) {
		AppDispatcher.handleViewAction({
			actionType: SessionConstants.REQUEST_OTP_AUTHENTICATION,
			data: {
				username,
			},
		});
	},

	/**
	 * Reset our current OTP so the user can request a new one
	 */
	handleOTPAuthenticationReset() {
		AppDispatcher.handleServerAction({
			actionType: SessionConstants.REQUEST_OTP_AUTHENTICATION_RESET,
		});
	},

	/**
	 * Request the generic public key (i.e. not specific to a particular user)
	 */
	requestPublicKey(callback) {
		AppDispatcher.handleViewAction({
			actionType: SessionConstants.REQUEST_PUBLIC_KEY,
			data: {
				callback,
			},
		});
	},

	/**
	 * Request Bank ID for a username / userId
	 * @param  {String} username Username or user ID
	 * @param {Function} callback Success callback
	 */
	requestBankId(username, callback) {
		AppDispatcher.handleViewAction({
			actionType: SessionConstants.REQUEST_BANK_ID,
			data: {
				username,
				callback,
			},
		});
	},

	requestCurrentUserPhoneNumber(callback) {
		AppDispatcher.handleViewAction({
			actionType: SessionConstants.REQUEST_CURRENT_USER_PHONE_NUMBER,
			data: { callback },
		});
	},

	/**
	 * Notify the app that a stepup authentication is coming
	 */
	prepareForStepupAuthentication() {
		AppDispatcher.handleViewAction({
			actionType: SessionConstants.PREPARE_STEPUP_AUTHENTICATION,
		});
	},

	resetSessionTimeOutFlag() {
		AppDispatcher.handleViewAction({
			actionType: SessionConstants.RESET_SESSION_TIMEOUT,
		});
	},
};

module.exports = SessionActionCreator;
