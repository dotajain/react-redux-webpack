const envConfig = require('../../static/config');
const config = require('../config');
const ApiUtils = require('./ApiUtils');
const TermsConditionActionCreator = require('../actions/TermsConditionActionCreator');
const AccountsActionCreator = require('../actions/AccountsActionCreator');
const AccountOpeningActions = require('../actions/AccountOpeningActions');
const _getTermsAndConditionsEndpoint = '/ref/content/tandcs/B/latest';
const _userAcceptedTandCEndpoint = '/user/tandcs/{service-name}/{version}/accept';

const TermsConditionApiUtils = {
	getTcData() {
        console.log('TcApiUtils- getTcData');
		const url = envConfig.apiBaseUrl + _getTermsAndConditionsEndpoint;
		const method = 'GET';
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.userServices,
			method: method,
			url,
			addAuthToken: true,
		}, body => {
			TermsConditionActionCreator.handleTcDataSuccess(body);
		}, error => {
			console.log(error);
		});
	},

	getTextUrl(textUrl) {
		const url = envConfig.apiBaseUrl + textUrl;
		const method = 'GET';
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.userServices,
			method: method,
			url,
			addAuthToken: true,
		}, (body, status, text) => {
			TermsConditionActionCreator.handleTcTextDataSuccess(text);
		}, error => {
			console.log(error);
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
		}, () => {
			// Currently this only sends back a 200 so all we can do for now is go to next web task from product.
			// AccountOpeningActions.navigateToWebTask('WEB-TIMELINE');
			AccountsActionCreator.handleAcceptTcSuccess();
		}, () => {
			AccountOpeningActions.navigateToWebTask('WEB-ERROR');
			// }
		});
	},

};

module.exports = TermsConditionApiUtils;
