/**
 * @class PostcodeActions
 */

const AppDispatcher = require('../dispatcher/AppDispatcher');
const SessionConstants = require('../constants/SessionConstants');

const SessionServerActionCreator = {

	/**
	 * Handle success of get an auth token from API
	 * @param  {object} response  		response as given from the api
	 * @param  {Function} callback 		A callback function to be called after we receive a token
	 */
	handleAccessTokenCreateSuccess(response, callback) {
		AppDispatcher.handleServerAction({
			actionType: SessionConstants.REQUEST_ACCESS_TOKEN_CREATE_SUCCESS,
			data: response,
			callback,
		});
	},

	/**
	 * Handle error of get an auth token from API
	 * @param  {object} error 	error as given by the api
	 */
	handleAccessTokenCreateError(errorType) {
		AppDispatcher.handleServerAction({
			actionType: SessionConstants.REQUEST_ACCESS_TOKEN_CREATE_ERROR,
			errorType,
		});
	},

	/**
	 * Handle success of create auth challenge from API
	 * @param  {object} response  response as given from the api
	 */
	handleAccessChallengeCreateSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: SessionConstants.REQUEST_ACCESS_CHALLENGE_CREATE_SUCCESS,
			data: response,
		});
	},

	/**
	 * Handle error of create auth challenge from API
	 * @param  {object} error 	error as given by the api
	 */
	handleAccessChallengeCreateError() {
		AppDispatcher.handleServerAction({
			actionType: SessionConstants.REQUEST_ACCESS_CHALLENGE_CREATE_ERROR,
		});
	},

	/**
	 * Handle error of missing details during auth challenge from API
	 */
	handleAccessChallengeMissingDetailsError() {
		AppDispatcher.handleServerAction({
			actionType: SessionConstants.REQUEST_ACCESS_CHALLENGE_MISSING_DETAILS_ERROR,
		});
	},

	/**
	 * Handle error of create OTP from API
	 */
	handleRequestCreateOTPError() {
		AppDispatcher.handleServerAction({
			actionType: SessionConstants.REQUEST_OTP_ERROR,
		});
	},

	/**
	 * Handle success of create OTP from API
	 */
	handleRequestCreateOTPSuccess() {
		AppDispatcher.handleServerAction({
			actionType: SessionConstants.REQUEST_OTP_SUCCESS,
		});
	},

	/**
	 * Public key retrieved successfully.
	 *
	 * @param  {String} publicKey
	 * @param  {String} datetime
	 */
	handleRequestPublicKeySuccess(publicKey, datetime, callback) {
		AppDispatcher.handleServerAction({
			actionType: SessionConstants.REQUEST_PUBLIC_KEY_SUCCESS,
			data: {
				publicKey,
				datetime,
				callback,
			},
		});
	},

	/**
	 * Bank ID retireved successfully
	 * @param  {String} bankId Bank ID ['CB'|'YB']
	 * @param {Function} callback Success callback
	 */
	handleRequestBankId(bankId, callback) {
		AppDispatcher.handleServerAction({
			actionType: SessionConstants.UPDATE_BANK_ID,
			data: {
				bankId,
				callback,
			},
		});
	},

	/**
	 * Current user phone number retrieved successfully
	 * @param {Object}		userDetails 	the contact details for the current user
	 * @param {Function}	callback		Success callback
	 */
	handleRequestCurrentUserPhoneNumber(userDetails, callback) {
		AppDispatcher.handleServerAction({
			actionType: SessionConstants.REQUEST_CURRENT_USER_PHONE_NUMBER_SUCCESS,
			data: {
				userDetails,
				callback,
			},
		});
	},

	handleAccountLockedError(error) {
		AppDispatcher.handleServerAction({
			actionType: SessionConstants.ACCOUNT_LOCKED_ERROR,
			quoteId: error,
		});
	},

	handleSessionTimedOut() {
		AppDispatcher.handleServerAction({
			actionType: SessionConstants.SESSION_TIMEOUT,
		});
	},
};

module.exports = SessionServerActionCreator;
