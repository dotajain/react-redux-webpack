/**
 * @class UserServicesApiUtils
 */

const envConfig = require('../../static/config');
const config = require('../config');

// Actions
const AccountOpeningActions = require('../actions/AccountOpeningActions');

// Utils
const ApiUtils = require('./ApiUtils');

const _getCredentialsEndpoint = '/banks/{bank-id}/user/credentials';
const _getSecurityQuestionsEndpoint = '/banks/{bank-id}/ref/credentials/security_questions';
const _postSecurityQuestionsEndpoint = '/banks/{bank-id}/user/credentials';
const _getTermsAndConditionsEndpoint = '/ref/content/tandcs/B/latest';
const _userAcceptedTandCEndpoint = '/user/tandcs/{service-name}/{version}/accept';

const UserServicesApiUtils = {

	/**
	 * What services is this user registered for?
	 */
	getCredentials() {
		let url = envConfig.apiBaseUrl + _getCredentialsEndpoint;
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.authenticationStub.GetCredentialsConnection;
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.userCredentialServices,
			method: 'GET',
			url,
			addAuthToken: true,
		}, body => {
			AccountOpeningActions.updateFormValue('credentials', body.credentials);
		});
	},

	/**
	 * Get the security questions from the user services API.
	 */
	requestSecurityQuestions() {
		let url = envConfig.apiBaseUrl + _getSecurityQuestionsEndpoint;
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.authenticationStub.GetSecurityQuestionsConnection;
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.userCredentialServices,
			method: 'GET',
			url,
			addAuthToken: true,

		}, body => {
			console.log(body.security_questions);
			AccountOpeningActions.updateFormValue('securityQuestions', body.security_questions);
		});
	},

	/**
	 * Submit the security questions, answers, and telephone pin
	 *
	 * @param  {Object} securityQuestions		The security questions, answers, and telephone pin
	 * @param {String} nextWebTask 				Next web task based on product post registration task.

	 */
	submitSecurityQuestions(options, nextWebTask) {
		let url = envConfig.apiBaseUrl + _postSecurityQuestionsEndpoint;
		let method = 'PUT';
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.authenticationStub.GetCredentialsConnection;
			method = 'GET';
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.userCredentialServices,
			method: method,
			url,
			addAuthToken: true,
			requestData: options.registrationData,
			publicKeyMethod: options.publicKeyMethod,
		}, () => {
			// Currently this only sends back a 200 so all we can do for now is go to next web task frmo product.
			AccountOpeningActions.navigateToWebTask(nextWebTask);
		}, (body, status) => {
			if (options.errorCallback && status === 409) {
				options.errorCallback(body);
			} else {
				AccountOpeningActions.navigateToWebTask('WEB-ERROR');
			}
		});
	},

	getTermsAndConditionsDetails() {
		const url = envConfig.apiBaseUrl + _getTermsAndConditionsEndpoint;
		const method = 'GET';
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.userServices,
			method: method,
			url,
			addAuthToken: true,
		}, body => {
			AccountOpeningActions.handleTermsAndConditionsSuccess(body);
		}, error => {
			AccountOpeningActions.navigateToWebTask('WEB-ERROR');
		});
	},

	acceptedTermsAndConditions(serviceName, version) {
		let url = envConfig.apiBaseUrl + _userAcceptedTandCEndpoint;
		url = url.replace('{service-name}', serviceName);
		url = url.replace('{version}', version);
		const method = 'PUT';
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.userServices,
			method: method,
			url,
			addAuthToken: true,
		}, body => {
			// Currently this only sends back a 200 so all we can do for now is go to next web task frmo product.
		}, error => {
			AccountOpeningActions.navigateToWebTask('WEB-ERROR');
			// }
		});
	},
};

module.exports = UserServicesApiUtils;
