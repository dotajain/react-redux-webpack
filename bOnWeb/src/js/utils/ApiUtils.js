/**
 * @class ApiUtils
 */

// Packages
const superagent = require('superagent');

const config = require('../config');
const _ = require('lodash');
const envConfig = require('../../static/config');

// Actions
const AccountOpeningActions = require('../actions/AccountOpeningActions');
const SessionActionCreator = require('../actions/SessionActionCreator');
const AppActions = require('../actions/AppActions');

// Stores
const AppStore = require('../stores/AppStore');
const AccountOpeningContentStore = require('../stores/AccountOpeningContentStore');

// Utils
const BrowserUtils = require('../utils/BrowserUtils');

const getClientContext = () => {
	// Default object
	const clientContext = {
		client: {},
		env: {
			// jscs: disable
			// jshint ignore:start
			platform_version: BrowserUtils.getBrowserVersion(),
			// jshint ignore:end
			// jscs: enable
			make: BrowserUtils.getPlatform(),

			locale: BrowserUtils.getUserLocale(),
			// For Payment Services BOW-36
			model: 'x86_64',
			geo_location: {
				longitude: -122.406417,
				latitude: 37.785834,
			},
			device_lock_enabled: true,
			screen_size: {
				width: 1024,
				height: 768,
			},
			device_name: 'iPad%20Simulator',
		},
	};

	// Appstore will contain the session id (generated uuid)
	// so that it doesn't change through-out
	clientContext.client['user_tracking_id'] = AppStore.getValue('sessionId');
	clientContext.client['app_title'] = AccountOpeningContentStore.get('documentTitle');
	clientContext.client['app_package_name'] = config.appPackageName;
	clientContext.client['app_version_code'] = config.version;
	clientContext.client['app_version_name'] = config.versionName;
	clientContext.env.platform = config.platform;

	// const clientMobRequest={client:{"app_title":"B Web","app_version_code":"1.0.0","app_package_name":"BWEB","client_id":"9hRoAp\/jvkvToEs7x26XUYVHb41sJPNYVbASD+BldebAJ1smmCDfySZzPeYnfQCxyyn5IF\/7H6dieGeobGlQvg","app_version_name":"Milestone_1","user_tracking_id":"30BA8FF8-613E-457F-A3DB-A11E3CBC2849"},"env":{"locale":"en_US","geo_location":{"longitude":-122.406417,"latitude":37.785834},"make":"Apple","platform_version":"9.3.0","model":"x86_64","platform":"B Web","device_lock_enabled":true,"screen_size":{"width":1024,"height":768},"device_name":"iPad%20Simulator"}};
	// return JSON.stringify(clientMobRequest);
	return JSON.stringify(clientContext);
};

const _urlReplacements = {
	'{bank-id}': data => {
		const AccountOpeningDataStore = require('../stores/AccountOpeningDataStore');
		// The bankID chain
		// AccountOpeningDataStore.getValue('bankID') 			used for DYB NTB
		// data.bankID 											used for analytics
		// envConfig.apiBankId 									used for existing DYB user
		// envConfig.bankId 									hardcoded fallback
		const bankId = AccountOpeningDataStore.getValue('bankID') || data.bankID || envConfig.apiBankId || envConfig.bankId;

		if (bankId.toUpperCase() === 'DYB') {
			throw new Error('Invalid bank id');
		}

		return bankId;
	},
	'{case-subtype}': () => {
		const AccountOpeningDataStore = require('../stores/AccountOpeningDataStore');
		return (AccountOpeningDataStore.getValue('isExistingCustomer') === 'Yes') ? 'existing' : 'ntb';
	},
};

const ApiUtils = {
	/**
	 * replace a placeholder in the URL
	 * @param  {Object} 			data          Data coming from api call
	 * @param  {String} 			replaceString A string that is to be replaced
	 * @param  {return|String} 	replaceWith   Value that replaces replaceString occurances
	 * @return {String}               			  Modified string
	 */
	replaceUriString(data, replaceString, replaceWith) {
		if (data.url && data.url.indexOf(replaceString) > -1) {
			const value = (_.isFunction(replaceWith) === true) ? replaceWith(data) : replaceWith;

			if (!value) {
				return data.url;
			}

			const regex = new RegExp(replaceString, 'g');

			return data.url.replace(regex, value);
		}

		return data.url;
	},

	/**
	 * Make an API call.
	 *
	 * @param  {Object} callData 		All data about the call.
	 * @param {Function} onSuccess 	Optional. No default. Callback when API call completes successfully.
	 * @param {Function} onFail 	Optional. Default navigates user to error page. Callback when the API call fails.
	 */
	makeAjaxCall(callData, onSuccess, onFail) {
		const data = callData;

		if (!data.apiVersion) {
			console.warn('API call requires a version for endpoint', data.url);
		}

		const contentType = data.contentType === 'N' ? null : data.contentType || 'application/json';

		// replace all placeholders in the url
		_.each(_urlReplacements, (replaceWith, replaceString) => {
			data.url = this.replaceUriString(data, replaceString, replaceWith);
		});

		const request = superagent(data.method, data.url)
			.set('Accept', 'application/json')
			.set('x-bpi-version', data.apiVersion)
			.set('x-bpi-service-context', config.authentication.context);

		if (contentType !== null) {
			request.set('Content-Type', contentType);
		}

		// Auth token present?
		if (data.addAuthToken) {
			const SessionStore = require('../stores/SessionStore');
			const authToken = data.authToken || SessionStore.getToken()['access_token'];
			if (authToken) {
				request.set('Authorization', `Bearer ${authToken}`);
			}
		} else if (data.authorizationHeader) {
			request.set('Authorization', data.authorizationHeader);
		}

		request.set('x-bpi-client-context', getClientContext());

		// By default, alert the app any time we are making an API call.
		if (!data.doNotTrackCallProgress) {
			AppActions.trackApiCallStarted(data.url);
		}

		// Data to send?
		if (data.requestData) {
			request.send(data.requestData);
		}

		request.end((err, res) => {
			// Now log that the request is finished.
			if (!data.doNotTrackCallProgress) {
				AppActions.trackApiCallComplete(data.url);
			}
			
			if (err) {
				let authHeader;
				let errorResponse;
				const errorStatus = err.status;

				if (err.response) {
					authHeader = err.response.headers[config.authenticateHeaderName];
					if (authHeader == undefined && errorStatus === 401 && data.url.search('oauth2/token') < 0) {
						authHeader = 'Bearer realm scope=40';
					}
					errorResponse = err.response.body || err.response.text;
				}
				// if (authHeader == undefined &&) {
					
				// }
				if (authHeader === 'Bearer realm error=tsandcs' && errorStatus === 401) {
					authHeader = undefined;
					errorResponse = err.response;
				}

				// Check for the auth header to see if the error requires step up authentication
				if (authHeader) {
					// If there is an authHeader, handle it and then exit.
					console.log(authHeader);
					this.handleAuthHeader(authHeader, data, onSuccess, onFail);
					return;
				} else if (onFail) {
					if (errorResponse !== undefined && errorResponse.error !== undefined) {
						if (errorResponse.error.hasOwnProperty('id')) {
							errorResponse.error.quoteId = this.getQuoteId(errorResponse.error.id);
						} else {
							errorResponse.error.quoteId = ' ';
						}
					}
					onFail(errorResponse, errorStatus);
				} else {
					this.handleAjaxError(errorResponse, errorStatus);
				}

				return;
			}

			if (onSuccess) {
				onSuccess(res.body, res.status, res.text);
			}
		});
	},

	/**
	 * Default event handler for API errors.
	 * Log and redirect to error page.
	 *
	 * @param  {String} error 		Description of the error.
	 */
	handleAjaxError(body, status) {
		console.warn(status, body);
		AccountOpeningActions.navigateToWebTask('WEB-ERROR');
	},

	handleAuthHeader(authHeader, data, onSuccess, onFail) {
		const isInvalidToken = (authHeader.indexOf('invalid_token') >= 0);
		if (isInvalidToken) {
			SessionActionCreator.requestAccessTokenReset(true);
			AccountOpeningActions.navigateToWebTask('WEB-AUTHENTICATION');
			return;
		}

		const requiredScope = this.getRequiredScope(authHeader);
		const AccountOpeningDataStore = require('../stores/AccountOpeningDataStore');
		let stepupAuthenticationCallback;

		// We are going to be waiting around for a bit. Is this a method that requires a fresh public key? If so...
		if (data.publicKeyMethod && _.isFunction(data.publicKeyMethod)) {
			stepupAuthenticationCallback = () => SessionActionCreator.requestPublicKey(data.publicKeyMethod);
		} else {
			stepupAuthenticationCallback = () => this.makeAjaxCall(data, onSuccess, onFail);
		}
		SessionActionCreator.prepareForStepupAuthentication();
		const accessChallengeCallback = () => AppActions.requireStepupAuthentication(stepupAuthenticationCallback);
		SessionActionCreator.requestAccessChallengeCreate(AccountOpeningDataStore.getValue('username'), requiredScope, accessChallengeCallback);
	},

	/**
	 * Extract the required scope from the WWW-Authenticate header
	 *
	 * @param  {String} header 		Value of WWW-Authenticate header
	 *
	 * @return {Number} the extracted scope or -1 if there isn't a parseable value
	 */
	getRequiredScope(header) {
		if (header) {
			const numbersMatch = header.match(/(\d+)/);
			if (_.isArray(numbersMatch)) {
				return parseInt(numbersMatch[0]);
			}
		}

		if (process.env.NODE_ENV === 'development') {
			console.error('!! Response returned no scope, returning -1, possibly not a valid 403.  Value returned: ', header);
		}

		return -1;
	},
	/**
	 * Extract the quoteId from the error packet
	 *
	 * @param  {String} id from the error packet
	 *
	 * @return {String} the extracted last 6 digit of the id
	 */
	getQuoteId(id) {
		if (id.length >= 6) {
			return id.slice(-6);
		}
		else {
			return id;
		}
	},
};

module.exports = ApiUtils;
