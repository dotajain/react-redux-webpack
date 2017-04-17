/**
 * @class AccountOpeningApiUtils
 */

const envConfig = require('../../static/config');
const config = require('../config');

const AccountOpeningActions = require('../actions/AccountOpeningActions');
const AccountOpeningServerActionCreator = require('../actions/AccountOpeningServerActionCreator');
const CallValidate3DServerActionCreator = require('../actions/CallValidate3DServerActionCreator');
const PortalServerActionCreator = require('../actions/PortalServerActionCreator');

const ApiUtils = require('./ApiUtils');
const MappingUtils = require('./MappingUtils');
const RequestOptionsBuilder = require('../api/RequestOptionsBuilder');

const _getOffersEndpoint = '/banks/{bank-id}/cases/{case-type}/{case-subtype}/{case-id}/tasks/offers';
const _acceptOffersEndpoint = '/banks/{bank-id}/cases/{case-type}/{case-subtype}/{case-id}/tasks/offers/actions/decision';
const _getNextTaskEndpoint = '/banks/{bank-id}/cases/{case-type}/{case-subtype}/{case-id}/tasks/next';
const _getChallengeEndpoint = '/banks/{bank-id}/cases/{case-type}/{case-subtype}/{case-id}/tasks/verify/actions/challenge';
const _getAuthenticateChallengeEndpoint = '/banks/{bank-id}/cases/{case-type}/{case-subtype}/{case-id}/tasks/verify/actions/submit';
const _getCasesEndpoint = '/banks/{bank-id}/cases';
const _submitSwitchEndpoint = '/banks/{bank-id}/cases/{case-type}';

const AccountOpeningApiUtils = {

	/**
	 * API call for getCases in account-opening-services.
	 * Retrieves the list of cases for a customer.
	 * @param  {string} customerId CustomerId
	 */
	getCases() {
		const url = envConfig.apiBaseUrl + _getCasesEndpoint;

		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.caseServices,
			method: 'GET',
			url,
			addAuthToken: true,

		}, body => {
			PortalServerActionCreator.handlePortalCasesSuccess(body);
		});
	},

	/**
	 * API call for challenge in account-opening-services.
	 * Retrieves the list of questions used in callValidate3D.
	 * @param  {string} caseId CaseId
	 */
	getChallenges(caseId) {
		const url = envConfig.apiBaseUrl + _getChallengeEndpoint.replace('{case-type}', 'csap')
			.replace('{case-id}', caseId);

		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.csapCaseServices,
			method: 'PUT',
			url,
			addAuthToken: true,

		}, body => {
			CallValidate3DServerActionCreator.handleCallValidate3DQuestionsSuccess(body);
		}, body => {
			const taskId = (body.error && body.error.code === '1000') ? 'idcheckcannotbedone' : 'WEB-ERROR';
			AccountOpeningActions.navigateToWebTask(taskId);
		});
	},

	/**
	 * API call for authenticate-challenge in account-opening-services.
	 * Submits the list of answers for CallValidate3D.
	 * @param  {string} caseId CaseId
	 */
	postAuthenticateChallenges(caseId, answers) {
		const url = envConfig.apiBaseUrl + _getAuthenticateChallengeEndpoint.replace('{case-type}', 'csap')
			.replace('{case-id}', caseId);

		const requestData = {
			challenges: answers,
		};

		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.csapCaseServices,
			method: 'PUT',
			url,
			addAuthToken: true,
			requestData,

		}, body => {
			CallValidate3DServerActionCreator.handleCallValidate3DAuthenticationSuccess(body);
		});
	},

	/**
	 * Send the user's form data.
	 * Will PUT if we have a case ID already, or POST if not.
	 *
	 * @param  {object} options	Contains callbacks and object necessary for the call.
	 */
	sendFormData(options, requestData) {
		const { callback, errorCallBack, formComplete, caseId, product, addAuthToken } = options;

		const { url, method } = RequestOptionsBuilder
			.saveCase(product.productType, caseId);

		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.csapCaseServices,
			addAuthToken,
			method,
			url,
			requestData,
		}, body => {
			const caseId = body['reference_id'];

			if (formComplete) {
				this.postFormSubmit({ ...options, caseId });
			} else if (callback) {
				callback(caseId);
			}
		},
		(body, status) => {
			if (errorCallBack && status === 409) {
				errorCallBack(body.error.code, body.message);
			} else if (caseId) {
				// Fail silently. Allow user to continue. DYB-15245
				AccountOpeningServerActionCreator.handleCaseUpdateError(body);
			} else {
				AccountOpeningActions.navigateToWebTask('WEB-ERROR');
			}
		});
	},

	/**
	 * Submit application
	 * @param  {Object} options Contains callbacks and object necessary for the call.
	 * @return {void}
	 */
	postFormSubmit(options) {
		const { errorCallBack, caseId, product } = options;

		const { url, method } = RequestOptionsBuilder
			.submitCase(product.productType, caseId);

		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.csapCaseServices,
			method,
			addAuthToken: true,
			requestData: {},
			url,
		}, () => {
			if (options.callback) {
				options.callback(options.caseId);
			}
		}, (body, status) => {
			if (errorCallBack && status === 409) {
				errorCallBack(body.error.code, body.message);
			} else {
				AccountOpeningActions.navigateToWebTask('WEB-ERROR');
			}
		});
	},

	/**
	 * Call the gateway services api and look up the offer for a case id
	 *
	 * @param {String} caseId 			The caseId for the application.
	 */
	requestProductOffer(caseId) {
		const url = envConfig.apiBaseUrl + _getOffersEndpoint.replace('{case-type}', 'csap').replace('{case-id}', caseId);

		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.csapCaseServices,
			method: 'GET',
			url,
			addAuthToken: true,

		}, body => {
			AccountOpeningServerActionCreator.handleProductOfferSuccess(body);
		});
	},

	/**
	 * Accept a product offer.
	 *
	 * @param  {String} offerId 		Offer to accept.
	 */
	respondToProductOffer(caseId, offerId, isDecline) {
		const url = envConfig.apiBaseUrl + _acceptOffersEndpoint.replace('{case-id}', caseId).replace('{case-type}', 'csap');

		const offerResponse = {
			decision: isDecline ? 'REJECT' : 'ACCEPT',
		};
		offerResponse['offer_id'] = offerId;

		const requestData = {
			offers: [offerResponse],
		};

		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.csapCaseServices,
			method: 'PUT',
			url,
			addAuthToken: true,
			requestData,

		}, body => {
			// Store the Case ID.
			AccountOpeningActions.updateFormValue('caseId', body['reference_id']);
		});
	},

	/**
	 * API call to discover what task the current case is on.
	 *
	 * @param  {Function} callback 		Triggered and passed the taskID on completion.
	 * @param {String} caseId 			The caseId for the application.
	 */
	getNextTask(callback, caseId) {
		const url = envConfig.apiBaseUrl + _getNextTaskEndpoint.replace('{case-type}', 'csap')
			.replace('{case-id}', caseId);

		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.csapCaseServices,
			method: 'GET',
			url,
			addAuthToken: true,

		}, body => {
			if (callback) {
				callback(body['task_uri']);
			}
		});
	},

	/**
	 * Submit a CAs request.
	 *
	 * @param  {Function} callback 	Triggered and passed status code on completion.
	 */
	submitSwitchingApplication(callback, data) {
		const requestData = MappingUtils.mapSwitchPost(data);

		const url = envConfig.apiBaseUrl + _submitSwitchEndpoint.replace('{case-type}', 'cas');

		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.casCaseServices,
			method: 'POST',
			url,
			addAuthToken: true,
			requestData,

		}, () => {
			if (callback) {
				callback();
			}
		}, (body, status) => {
			if (callback && status === 409) {
				callback(body.error.code);
			} else {
				AccountOpeningActions.navigateToWebTask('WEB-ERROR');
			}
		});
	},

	/**
	 * Request the application data for the given case.
	 *
	 * @param  {String} caseId 		ID of the case.
	 */
	getCase(caseId, productType) {
		const { url, method } = RequestOptionsBuilder
			.getCase(productType, caseId);

		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.csapCaseServices,
			method,
			url,
			addAuthToken: true,

		}, body => {
			AccountOpeningActions.receiveGetResult(body);
		});
	},
};

module.exports = AccountOpeningApiUtils;

