/**
 * @class SessionApiUtils
 */

const envConfig = require('../../static/config');
const config = require('../config');
const _ = require('lodash');

// Actions
const AccountOpeningActions = require('../actions/AccountOpeningActions');
const SessionServerActionCreator = require('../actions/SessionServerActionCreator');

// Constants
const SessionConstants = require('../constants/SessionConstants');

// Utils
const ApiUtils = require('./ApiUtils');
const GenericMapperUtils = require('./GenericMapperUtils');
const UserIdentityBuilder = require('./UserIdentityBuilder');
const GenericMapper = require('./GenericMapperUtils');

const _createAuthToken = '/banks/{bank-id}/auth/provider/oauth2/token';
const _createAuthChallenge = '/banks/{bank-id}/auth/provider/oauth2/token/challenges';
const _createOTP = '/banks/{bank-id}/auth/provider/otp/otps';
const _deleteAccessTokenEndpoint = '/banks/{bank-id}/auth/provider/oauth2/token/{token-id}';
const _getPublicKeyEndpoint = '/banks/{bank-id}/auth/provider/rsa/public_key';
const _getUsersEndpoint = '/users/{username}';
const _getUserEndpoint = '/user';

const authSchema = { userIdentity: { userInfo: { dateOfBirth: 'dob', postcode: 'post_code' } } };

const SessionApiUtils = {

	/**
	 * Builds the challenge response (for the get token api).
	 * This function does not support composite methods of authentication (i.e Should have 1 challenge at a time)
	 * @param  {Object} userIdentity                User Identity. Please refer
	 * here: https://abouthere.atlassian.net/wiki/display/DYB/User+Authentication#UserAuthentication-Identity
	 * @param  {Object} challengeResponse       From create challenge request API.
	 * @param  {Object} authData 				What the user entered, e.g. partial passcode answers or OTP.
	 * @return {Object}                         Object to send to API.
	 */
	buildChallengeResponse(userIdentity, challengeResponse, authData) {
		const response = {};
		response.auth_session_id = challengeResponse.auth_session_id;
		response.auth_schemes = [];

		if (!challengeResponse.auth_schemes) {
			return response;
		}

		const userIdentityValue = UserIdentityBuilder.build(userIdentity);

		_.each(challengeResponse.auth_schemes, scheme => {
			let challengeResponses = {};
			const nextChallengeResponse = _.partial(_.assign, {}, challengeResponses);

			if (scheme.challenges.partial_password) {
				const partialPassword = {};
				_.each(scheme.challenges.partial_password.positions, (pos, index) => {
					partialPassword[pos] = authData['partial-password'][index];
				});

				challengeResponses = nextChallengeResponse({ partialPassword });
			}

			if (scheme.challenges.security_questions) {
				const securityQuestions = {
					answers: _.clone(authData['security-questions']),
				};
				challengeResponses = nextChallengeResponse({ securityQuestions });
			}

			if (scheme.challenges.acn) {
				const acn = _.pick(authData.acn, ['access_code', 'sort_code', 'account_number']);
				challengeResponses = nextChallengeResponse({ acn });
			}

			if (scheme.challenges.debit_card) {
				const debitCard = _.pick(authData.debit_card, ['pan', 'sort_code', 'account_number']);
				challengeResponses = nextChallengeResponse({ debitCard });
			}

			if (scheme.challenges.otp) {
				const otp = _.clone(authData.otp.otp);
				challengeResponses = nextChallengeResponse({ otp });
			}

			const newData = _.assign({}, userIdentityValue, {
				id: scheme.id,
				challengeResponses,
			});

			const newSchemeData = GenericMapperUtils.mapObject(newData, authSchema);

			response.auth_schemes.push(newSchemeData);
		});

		return response;
	},

	/**
	 * Calls the create auth token api to log the user in.
	 *
	 * @param  {Object} tokenData 	An object containing the data for the auth token request
	 */
	createAuthToken(data, scope, callback) {
		const requestData = `grant_type=client_credentials&scope=${SessionApiUtils.prepareScope(scope)}`;
		let url = envConfig.apiBaseUrl + _createAuthToken;
		let method = 'POST';
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.authenticationStub.GetToken;
			method = 'GET';
		}
		const authorizationHeader = JSON.stringify(
			this.buildChallengeResponse(data.userIdentity, data.challengeResponse, data.authData)
		);

		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.authServices,
			method: method,
			url,
			authorizationHeader: `Basic ${btoa(authorizationHeader)}`,
			requestData,
			contentType: 'application/x-www-form-urlencoded',

		}, body => {
			const retryAllowed = body.retry_allowed;

			if (retryAllowed && retryAllowed.toLowerCase() === 'n') {
				SessionServerActionCreator
					.handleAccessTokenCreateError(
						SessionConstants.REQUEST_ACCESS_TOKEN_MULTIPLE_ATTEMPTS_ERROR
					);
			}

			if (!body.access_token) {
				SessionServerActionCreator.handleAccessTokenCreateError();
			} else {
				SessionServerActionCreator.handleAccessTokenCreateSuccess(body, callback);
			}
		}, () => {
			SessionServerActionCreator.handleAccessTokenCreateError();
		});
	},

	/**
	 * Calls the create auth challenge api to log the user in.
	 *
	 * @param  {string|UUID|Oject}   userData 		userData to be send to the api.
	 * Can be any of the values defined in the SD
	 * @param {Number} scope 		Scope level to jump to, e.g. 20
	 * @param {Function} callback 		Optional. Callback to run on completion.
	 */
	createAuthChallenge(userIdentity, scope, callback) {
		let url = envConfig.apiBaseUrl + _createAuthChallenge;
		let method = 'POST';
		const requestData = _.assign({}, UserIdentityBuilder.build(userIdentity), {
			scope: SessionApiUtils.prepareScope(scope),
		});

		if (envConfig.stubConfig) {
			switch (userIdentity) {
				case 'testdob' :
					url = envConfig.stubConfig.authenticationStub.GetChallengesConnection_EnrolmentDateOfBirth;
					break;

				case 'testpartial' :
					url = envConfig.stubConfig.authenticationStub.GetChallengesConnection_EnrolmentPartialPassword;
					break;

				case 'testacn' :
					url = envConfig.stubConfig.authenticationStub.GetChallengesConnection_EnrolmentAcn;
					break;

				case 'testdebit' :
					url = envConfig.stubConfig.authenticationStub.GetChallengesConnection_DebitCard;
					break;

				case 'testotp':
					url = envConfig.stubConfig.authenticationStub.GetChallengesConnection_EnrolmentOTP;
					break;

				case 'testpps':
					url = envConfig.stubConfig.authenticationStub.GetChallengesConnection_EnrolmentPPSecurityQuestion;
					break;


				default:
					url = envConfig.stubConfig.authenticationStub.GetChallengesConnection_SecurityQuestion;
					break;

			}
			method = 'GET';
		}

		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.authServices,
			method: method,
			url,
			requestData: GenericMapperUtils.mapObject(requestData, authSchema),
			addAuthToken: true,
		}, body => {
			SessionServerActionCreator.handleAccessChallengeCreateSuccess(body);

			if (callback) {
				callback();
			}
		}, body => {
			if (body.error && body.error.code === '1013') {
				SessionServerActionCreator.handleAccessChallengeMissingDetailsError();
				return;
			}
			if (body.error && body.error.code === '1002') {
				SessionServerActionCreator.handleAccountLockedError(body.error.quoteId);
				AccountOpeningActions.navigateToWebTask('WEB-ACCOUNT-LOCKED');
				return;
			}

			SessionServerActionCreator.handleAccessChallengeCreateError();
		});
	},

	prepareScope(scope) {
		const defaultValue = envConfig.targetScope.unknown.toString();
		if (_.isUndefined(scope) || _.isNull(scope)) {
			return defaultValue;
		}

		const numReg = new RegExp(/^-?[0-9]+$/);

		if (numReg.test(scope)) {
			return scope.toString();
		}

		return defaultValue;
	},

	/**
	 * Delete the access token.
	 *
	 * @param  {String} token 	Token to delete.
	 */
	deleteAccessToken(token) {
		const url = envConfig.apiBaseUrl + _deleteAccessTokenEndpoint
			.replace('{token-id}', token);

		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.authServices,
			method: 'DELETE',
			url,
			addAuthToken: true,
			authToken: token,

		}, (body) => {
			AccountOpeningActions.navigateToWebTask('WEB-AUTHENTICATION');
		}, (error) => {
			AccountOpeningActions.navigateToWebTask('WEB-ERROR');
		});
	},

	deleteAccessTokenOnInactivity(token) {
		const url = envConfig.apiBaseUrl + _deleteAccessTokenEndpoint
			.replace('{token-id}', token);

		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.authServices,
			method: 'DELETE',
			url,
			addAuthToken: true,
			authToken: token,

		}, (body) => {
			SessionServerActionCreator.handleSessionTimedOut();
		}, (error) => {
			AccountOpeningActions.navigateToWebTask('WEB-ERROR');
		});
	},

	/**
	 * Calls the create OTP api to lsend a one time password.
	 *
	 * @param  {string}  username   Username
	 * @param {String} accessToken 		Optional. Currently access token for this user, if any.
	 */
	createOTP(username, accessToken) {
		let url = envConfig.apiBaseUrl + _createOTP;
		let method = 'POST';
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.authenticationStub.GetChallengesConnection_EnrolmentOTP;
			method = 'GET';
		}

		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.authServices,
			method: method,
			url,
			authToken: accessToken,
			addAuthToken: true,
		}, () => {
			SessionServerActionCreator.handleRequestCreateOTPSuccess();
		}, () => {
			SessionServerActionCreator.handleRequestCreateOTPError();
			AccountOpeningActions.navigateToWebTask('WEB-ERROR');
		});
	},

	/**
	 * Request the generic public key (i.e. not specific to a particular user)
	 *
	 * @param {String} accessToken 		Optional. Currently access token for this user, if any.
	 */
	requestPublicKey(accessToken, callback) {
		let url = envConfig.apiBaseUrl + _getPublicKeyEndpoint;
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.authenticationStub.GetPublicKeyConnection;
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.authServices,
			method: 'GET',
			url,
			authToken: accessToken,
		}, body => {
			SessionServerActionCreator
				.handleRequestPublicKeySuccess(body.public_key, body.date_time, callback);
		});
	},

	/**
	 * Request Bank ID specific to a specific username
	 * @param  {String} username Username or User ID
	 * @param {Function} callback Success callback
	 */
	requestBankId(username, callback) {
		let url = envConfig.apiBaseUrl + _getUsersEndpoint.replace('{username}', username);
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.authenticationStub.GetBankIDConnection;
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.userServices,
			method: 'GET',
			url,
		}, body => {
			SessionServerActionCreator.handleRequestBankId(body.bank_id, callback);
		});
	},

	getCurrentUser(callback) {
		const url = [envConfig.apiBaseUrl, _getUserEndpoint].join('');
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.userServices,
			method: 'GET',
			url,
			addAuthToken: true,
		}, body => {
			const data = GenericMapper.mapObject(body, {}, _.camelCase);
			callback(data);
		});
	},

	requestCurrentUserPhoneNumber(accessToken, callback) {
		let url = envConfig.apiBaseUrl + _getUserEndpoint;
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.authenticationStub.GetCurrentUserdata;
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.authServices,
			method: 'GET',
			url,
			authToken: accessToken,
			addAuthToken: true,
		}, body => {
			const data = GenericMapper.mapObject(body, {}, _.camelCase);
			SessionServerActionCreator.handleRequestCurrentUserPhoneNumber(data, callback);
		}, () => {
			// failing silently as this is not business critical
			// https://abouthere.atlassian.net/browse/DYB-16002?focusedCommentId=157851&page=com.atlassian.jira.plugin.system.issuetabpanels:comment-tabpanel#comment-157851
		});
	},
};

module.exports = SessionApiUtils;
