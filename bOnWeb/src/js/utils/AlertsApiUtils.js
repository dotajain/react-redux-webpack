/**
 * @class TimelineApiUtils
 */

const envConfig = require('../../static/config');
const config = require('../config');
const ApiUtils = require('./ApiUtils');
const AlertsActionCreator = require('../actions/AlertsActionCreator');
const AlertsNSweepsActionCreator = require('../actions/AlertsNSweepsActionCreator');
const _editAlertEndpoint = '/banks/{bank-id}/accounts/{scope_id}/{account-id}/alerts/balance/preferences';
const _createAlertEndPoint = '/banks/{bank-id}/accounts/{scope_id}/{account-id}/alerts/balance/preferences';
const scope_id = 'default';
const AlertsApiUtils = {

	/**
	 * API call for getAccoountList.
	 * Retrieves the list of accounts for a customer.
	 */
	sendAlertData(data, accountId) {
		let url = envConfig.apiBaseUrl + _createAlertEndPoint;
		url = url.replace('{scope_id}', scope_id);
		url = url.replace('{account-id}', accountId);
		let method = 'PUT';
		const requestData = data;
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.alertsNsweeps.GetAlertsConnectionStub;
			method = 'GET';
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.alertService,
			method: method,
			url,
			addAuthToken: true,
			requestData,
		}, body => {
			AlertsActionCreator.handleAlertsDataSuccess(body);
		}, error => {
			AlertsNSweepsActionCreator.handleAlertsNSweepsError(error, true);
		});
	},

	sendEditAlertData(data, accountId) {
		let url = envConfig.apiBaseUrl + _editAlertEndpoint;
		url = url.replace('{scope_id}', scope_id);
		url = url.replace('{account-id}', accountId);
		const requestData = data;
		let method = 'PUT';
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.alertsNsweeps.GetAlertsConnectionStub;
			method = 'GET';
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.timelineService,
			method: method,
			url,
			addAuthToken: true,
			requestData,
		}, body => {
			if (envConfig.stubConfig) {
				AlertsActionCreator.handleEditAlertsDataSuccess(body.account_alerts[0]);
			} else {
				AlertsActionCreator.handleEditAlertsDataSuccess(body);
			}
		}, error => {
			AlertsNSweepsActionCreator.handleAlertsNSweepsError(error, true);
		});
	},

	/**
	 * API call for getAccoountDetails.
	 * Retrieves the details of account for a customer.
	 */
};

module.exports = AlertsApiUtils;

