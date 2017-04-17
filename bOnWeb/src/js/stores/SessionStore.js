/**
 * @module SessionStore
 */

const _ = require('lodash');
const envConfig = require('../../static/config');

const AppDispatcher = require('../dispatcher/AppDispatcher');
const AccountOpeningActions = require('../actions/AccountOpeningActions');
const assign = require('object-assign');
const EventEmitter = require('events').EventEmitter;
const SessionConstants = require('../constants/SessionConstants');
const SessionApiUtils = require('../utils/SessionApiUtils');
const EncryptionUtils = require('../utils/EncryptionUtils');
const GenericMapperUtils = require('../utils/GenericMapperUtils');

const CHANGE_EVENT = 'change';
let _challenge = {};
let _challengeMissingDetailsError = false;
const _authentication = {};
let _targetScope;
let _passwordForAutoLogin; // Use only when auto-logging in the user after registration.
let _usernameForAutoLogin;
let _genericPublicKey; // Populated by the getPublicKey call (which does NOT use a user id)
let _genericPublicKeyDatetime;
let _allowRetry = true; // Whether to allow the user to retry authentication
let _requireStepupAuthentication = false;
let _stepupCallback;
let _isRequestingOtp = false;
let _isMakingOtpRequest = false;
let _otpRequestError = false;
let _isPreparingStepupAuthentication = false;
let _isStepupAuthenticationComplete = false;
let _authenticated = false;
let _callingGetCurrentUser = false;
let _retrievedUser = false;
let _userDetails = {};
let _sessionTimeout = false;

let _token = {};

let _accountLockedErrorID = '';

// Timer ID.
let _tokenInactivityTimeout;

const SessionStore = assign({}, EventEmitter.prototype, {

	emitChange() {
		this.emit(CHANGE_EVENT);
	},

	/**
	* @param {function} callback
	*/
	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	/**
	 * Create a new challenge request. User can then respond with the appropriate info.
	 *
	 * @param  {String|UUID|Object} userIdentity 	userIdentity to send the the API.
	 * @param  {Number} scope    	Level to step up to.
	 * @param {Function} callback 		Optional. Callback to run on completion.
	 */
	createAuthChallenge(userIdentity, scope, callback) {
		_challenge = {};
		_targetScope = scope;

		SessionApiUtils.createAuthChallenge(userIdentity, _targetScope, callback);
	},

	/**
	 * Respond to a challenge (i.e. step up the user) with the data
	 * we currently have.
	 *
	 * @param  {String} username 		userIdentity to be sent to the API.
	 * @param  {Function} callback 		An optional callback for on success of token create
	 */
	createAuthToken(userIdentity, callback) {
		const data = {
			userIdentity,
			challengeResponse: _challenge,
			authData: _authentication,
		};

		SessionApiUtils.createAuthToken(data, _targetScope, callback);
	},

	/**
	 * Allow views to unbind listeners before dismounting.
	 *
	 * @param  {Function} callback    Function to unbind.
	 */
	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	/**
	 * Automatically log the user in, with the given username
	 * and password.
	 *
	 * @param  {String} username 	As entered by the user.
	 * @param  {String} password 	As entered by the user.
	 */
	startUserAutoLogin(username, password) {
		this.resetAccessToken(true);
		this.createAuthChallenge(username, envConfig.targetScope.login);

		_usernameForAutoLogin = username;
		_passwordForAutoLogin = password;
	},

	/**
	 * Stage 2 of auto-login. Challenge should now have been created.
	 * Respond to it, using the saved password.
	 */
	completeUserAutoLogin() {
		const password = `${_passwordForAutoLogin}`;
		const username = `${_usernameForAutoLogin}`;

		_passwordForAutoLogin = undefined;
		_usernameForAutoLogin = undefined;

		const sessionId = _challenge['auth_session_id'];

		// Get the 3 random characters.
		_authentication['partial-password'] = _.map(_challenge['auth_schemes'][0].challenges['partial_password'].positions, pos => {
			const char = password.charAt(pos - 1);
			return EncryptionUtils.encrypt(_challenge['public_key'], `${sessionId}:${char}`);
		});

		this.createAuthToken(username);
	},

	/**
	 * Save a new access token.
	 *
	 * @param  {Object} data 		API response.
	 */
	saveNewAccessToken(data) {
		_token = data;
		_token.error = false;

		this.restartInactivityTimer();

		document.onkeydown = this.restartInactivityTimer.bind(this);
		document.onclick = this.restartInactivityTimer.bind(this);
	},

	/**
	 * Expire tokens after a set period of inactivity.
	 * Clears any current timeout.
	 *
	 */
	restartInactivityTimer() {
		if (_tokenInactivityTimeout) {
			clearTimeout(_tokenInactivityTimeout);
		}

		_tokenInactivityTimeout = setTimeout(() => {
			this.resetAccessTokenOnInactivity();
		}, envConfig.tokenInactivityTimeout);
	},

	/**
	* Delete Token on session inactivity
	*/

	resetAccessTokenOnInactivity(deleteLocalTokenOnly) {
		_authenticated = false;
		if (!_.isEmpty(_token)) {
			if (!deleteLocalTokenOnly && _token['access_token']) {
				SessionApiUtils.deleteAccessTokenOnInactivity(_token['access_token']);
			}

			_token = {};
			SessionStore.emitChange();
		}
	},

	/**
	 * Clear any existing access token we currently hold.
	 *
	 * @param {Boolean} deleteLocalTokenOnly 		Optional. Is the API call un-necessary here? Default false.
	 */
	resetAccessToken(deleteLocalTokenOnly) {
		_authenticated = false;
		if (!_.isEmpty(_token)) {
			if (!deleteLocalTokenOnly && _token['access_token']) {
				SessionApiUtils.deleteAccessToken(_token['access_token']);
			}

			_token = {};
			SessionStore.emitChange();
		}
	},

	getCurrentUser(userDetails, retrievedUser, callingGetCurrentUser) {
		// Stop mutiple calls if we already have this.
		if (retrievedUser || callingGetCurrentUser) {
			return null;
		}
		_callingGetCurrentUser = callingGetCurrentUser;

		SessionApiUtils.getCurrentUser(data => {
			if (!data) {
				return false;
			}

			_userDetails = data;
			_retrievedUser = true;

			AccountOpeningActions.updateUserName(this.getUserName(_userDetails));
			SessionStore.emitChange();
		});
	},

	/**
	 * Set allow retry flag
	 *
	 * @param  {String} allowRetry 		Allow Retry
	 */
	setAllowRetry(allowRetry) {
		_allowRetry = allowRetry;
	},

	getChallenge() {
		return _challenge || {};
	},

	getToken() {
		return _token || {};
	},

	getAuthentication() {
		return _authentication || '';
	},

	getAllowRetry() {
		return _allowRetry;
	},

	getAccountLockedQuoteID() {
		return _accountLockedErrorID;
	},

	getAll() {
		return {
			authenticated: _authenticated,
			accessToken: _token['access_token'],
			allowRetry: this.getAllowRetry(),
			authentication: this.getAuthentication(),
			challenge: this.getChallenge(),
			challengeMissingDetailsError: _challengeMissingDetailsError,
			genericPublicKey: _genericPublicKey,
			genericPublicKeyDatetime: _genericPublicKeyDatetime,
			isPreparingStepupAuthentication: _isPreparingStepupAuthentication,
			isRequestingOtp: _isRequestingOtp,
			isMakingOtpRequest: _isMakingOtpRequest,
			otpRequestError: _otpRequestError,
			isStepupAuthenticationComplete: _isStepupAuthenticationComplete,
			publicKey: _challenge['public_key'],
			requireStepupAuthentication: _requireStepupAuthentication,
			scope: _token.scope,
			token: this.getToken(),
			retrievedUser: _retrievedUser,
			currentUserPhoneNumber: this.getOTPNumber(_userDetails.contactDetails),
			userName: this.getUserName(_userDetails),
		};
	},

	getOTPNumber(data) {
		if (!_.isPlainObject(data)) {
			return null;
		}

		if (data.phone.mobile) {
			return data.phone.mobile;
		}

		return null;
	},

	getSessionTimeout() {
		return _sessionTimeout;
	},

	getUserName(data) {
		if (!_.isPlainObject(data)) {
			return null;
		}

		return data.userName;
	},
});

SessionStore.dispatchToken = AppDispatcher.register(payload => {
	const action = payload.action;
	const data = action.data;
	let changeWillOccur;

	switch (action.actionType) {

		case SessionConstants.REQUEST_ACCESS_TOKEN_CREATE:
			_sessionTimeout = false;
			SessionStore.createAuthToken(data.username, data.callback);
			break;
		case SessionConstants.REQUEST_ACCESS_TOKEN_CREATE_SUCCESS:
			SessionStore.saveNewAccessToken(data);

			_requireStepupAuthentication = false;
			_authenticated = true;

			if (action.callback) {
				action.callback(GenericMapperUtils.mapObject(data, {}, _.camelCase));
			}

			SessionStore.emitChange();
			break;
		case SessionConstants.REQUEST_ACCESS_TOKEN_CREATE_ERROR:

			switch (action.errorType) {
				case SessionConstants.REQUEST_ACCESS_TOKEN_MULTIPLE_ATTEMPTS_ERROR:
					SessionStore.setAllowRetry(false);
					break;
				default:
					_token = {
						..._token,
						error: true,
					};
					SessionStore.emitChange();
					break;
			}

			break;
		case SessionConstants.REQUEST_ACCESS_TOKEN_MULTIPLE_ATTEMPTS_ERROR:
			SessionStore.setAllowRetry(false);
			break;

		case SessionConstants.REQUEST_ACCESS_TOKEN_RESET:
			SessionStore.resetAccessToken(data.localOnly);
			break;

		case SessionConstants.REQUEST_AUTHENTICATION_UPDATE:

			// If we have an index position, we need to update a specific entry and not overwrite the whole array
			if (data.authIndex >= 0 || _.isString(data.authIndex)) {
				// We can't update a specific entry if the array hasn't yet been defined or if it's not an array
				if (!_.isArray(_authentication[data.authType])) {
					_authentication[data.authType] = [];
				}

				// Update the specific entry with the authData value
				_authentication[data.authType][data.authIndex] = data.authData;
			} else { // No index specified then set the array to the authData value
				_authentication[data.authType] = data.authData;
			}

			SessionStore.emitChange();
			break;

		case SessionConstants.REQUEST_ACCESS_CHALLENGE_CREATE:
			SessionStore.createAuthChallenge(data.userIdentity, data.targetScope, data.callback);
			break;

		case SessionConstants.REQUEST_ACCESS_CHALLENGE_CREATE_SUCCESS:
			_challenge = data;
			_challenge.error = false;

			// Are we trying to automatically log the user in?
			if (_passwordForAutoLogin) {
				SessionStore.completeUserAutoLogin();
			}

			SessionStore.emitChange();
			break;

		case SessionConstants.REQUEST_ACCESS_CHALLENGE_CREATE_ERROR:
			_challenge.error = true;
			SessionStore.emitChange();
			break;

		case SessionConstants.REQUEST_ACCESS_CHALLENGE_MISSING_DETAILS_ERROR:
			_challengeMissingDetailsError = true;
			SessionStore.emitChange();
			break;

		case SessionConstants.REQUEST_ACCESS_CHALLENGE_RESET:
			changeWillOccur = !_.isEmpty(_challenge);
			if (changeWillOccur) {
				_challenge = {};
				SessionStore.emitChange();
			}
			break;

		case SessionConstants.REQUEST_OTP_ERROR:
			_otpRequestError = true;
			SessionStore.emitChange();
			break;
		case SessionConstants.REQUEST_OTP_SUCCESS:
			_otpRequestError = false;
			_isMakingOtpRequest = false;
			SessionStore.emitChange();
			break;
		case SessionConstants.REQUEST_OTP_AUTHENTICATION_RESET:
			_isRequestingOtp = false;

			// eslint-disable-next-line no-unused-vars
			const { error, ...rest } = _token;
			_token = rest;
			SessionStore.emitChange();
			break;
		case SessionConstants.REQUEST_OTP_AUTHENTICATION:
			if (!_isRequestingOtp) {
				SessionApiUtils.createOTP(data.username, SessionStore.getAll().accessToken);
				_isRequestingOtp = true;
				_isMakingOtpRequest = true;
				SessionStore.emitChange();
			}
			break;

		case SessionConstants.REQUEST_CURRENT_USER_PHONE_NUMBER:
			SessionApiUtils.requestCurrentUserPhoneNumber(SessionStore.getAll().accessToken, data.callback);
			SessionStore.emitChange();
			break;

		case SessionConstants.REQUEST_CURRENT_USER_PHONE_NUMBER_SUCCESS:
			_userDetails = data.userDetails;
			SessionStore.emitChange();
			break;

		case SessionConstants.LOG_USER_IN:
			SessionStore.startUserAutoLogin(data.username, data.password);
			break;

		case SessionConstants.REQUEST_PUBLIC_KEY:
			SessionApiUtils.requestPublicKey(SessionStore.getToken()['access_token'], data.callback);
			break;

		case SessionConstants.REQUEST_PUBLIC_KEY_SUCCESS:
			_genericPublicKey = data.publicKey;
			_genericPublicKeyDatetime = data.datetime;

			setTimeout(() => {
				_genericPublicKey = undefined;
				_genericPublicKeyDatetime = undefined;
				SessionStore.emitChange();
			}, envConfig.publicKeyExpiry);

			data.callback && data.callback(_genericPublicKey, _genericPublicKeyDatetime);

			SessionStore.emitChange();
			break;

		case SessionConstants.REQUEST_BANK_ID:
			SessionApiUtils.requestBankId(data.username, data.callback);
			break;

		case SessionConstants.UPDATE_BANK_ID:
			envConfig.apiBankId = data.bankId;
			SessionStore.emitChange();

			if (data.callback) {
				data.callback();
			}

			break;

		case SessionConstants.GET_CURRENT_USER:
			SessionStore.getCurrentUser(_userDetails, _retrievedUser, _callingGetCurrentUser);
			break;

		case SessionConstants.PREPARE_STEPUP_AUTHENTICATION:
			_isPreparingStepupAuthentication = true;
			SessionStore.emitChange();
			break;

		case SessionConstants.REQUEST_STEPUP_AUTHENTICATION:
			_isPreparingStepupAuthentication = false;
			_isStepupAuthenticationComplete = false;
			_requireStepupAuthentication = true;
			_stepupCallback = action.callback;
			SessionStore.emitChange();
			break;

		case SessionConstants.REQUEST_STEPUP_AUTHENTICATION_CALLBACK:
			_isStepupAuthenticationComplete = true;
			SessionStore.emitChange();

			if (_stepupCallback && _stepupCallback()) {
				_stepupCallback = undefined;
			}
			break;

		case SessionConstants.ACCOUNT_LOCKED_ERROR:
			_accountLockedErrorID = action.quoteId;
			break;

		case SessionConstants.SESSION_TIMEOUT:
			_sessionTimeout = true;
			SessionStore.emitChange();
			break;

		case SessionConstants.RESET_SESSION_TIMEOUT:
			_sessionTimeout = false;
			SessionStore.emitChange();
			break;

		default:
			// Do nothing.
	}
});

if (envConfig.enableWindowStubs) {
	/**
	 * For testing only, lets you force in an arbitrary token.
	 * e.g. expired tokens.
	 *
	 * @param  {String} token 	Token to set.
	 */
	window.injectAccessToken = token => {
		_token['access_token'] = token;
		SessionStore.emitChange();
	};
}

module.exports = SessionStore;
