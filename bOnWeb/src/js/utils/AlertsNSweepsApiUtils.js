/**
 * @class AlertsNSweepsApiUtils
 */

const envConfig = require('../../static/config');
const config = require('../config');
const ApiUtils = require('./ApiUtils');
const AlertsNSweepsActionCreator = require('../actions/AlertsNSweepsActionCreator');
const _getSweepsListEndpoint = '/banks/{bank-id}/accounts/{scope-id}/{account-id}/sweeps';
const _getBulkAlertsListEndPoint = '/banks/{bank-id}/accounts/{scope-id}/alerts/balance/preferences';
const _getProjectionslistEndPoint = '/banks/{bank-id}/accounts/{scope-id}/projection/alerts';
const _getAccountDetailsEndpoint = '/banks/{bank-id}/accounts/default/{account-id}';
// const _editSweepEndpoint = '/banks/{bank-id}/accounts/{scope_id}/{account-id}/sweeps/{sweep-id}';
// const scope_id = 'default';
const AlertsNSweepsApiUtils = {

	getSweepsData(accountId) {
		let url = envConfig.apiBaseUrl + _getSweepsListEndpoint;
		url = url.replace('{account-id}', accountId);
		url = url.replace('{scope-id}', 'default');
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.alertsNsweeps.GetSweepsAlertsConnectionStub;
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.sweepService,
			method: 'GET',
			url,
			addAuthToken: true,
		}, body => {
			AlertsNSweepsActionCreator.handleSweepsSuccess(body);
		},	body => {
			AlertsNSweepsActionCreator.handleSweepListError(body);
		});
	},

	getAlertsData(refreshList) {
		let url = envConfig.apiBaseUrl + _getBulkAlertsListEndPoint;
		url = url.replace('{scope-id}', 'default');
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.alertsNsweeps.GetAlertsConnectionStub;
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.alertService,
			method: 'GET',
			url,
			addAuthToken: true,
		}, body => {
			AlertsNSweepsActionCreator.handleAlertsSuccess(body, refreshList);
		},	error => {
			AlertsNSweepsActionCreator.handleAlertListError(error);
		});
	},

	getProjectionAlertsData() {
		let url = envConfig.apiBaseUrl + _getProjectionslistEndPoint;
		url = url.replace('{scope-id}', 'default');
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.alertsNsweeps.GetProjectionsAlertsConnectionStub;
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.projectionService,
			method: 'GET',
			url,
			addAuthToken: true,
		}, body => {
			AlertsNSweepsActionCreator.handleProjectionAlertsSuccess(body);
		}, error => {
			AlertsNSweepsActionCreator.handleProjectionListError(error);
		});
	},

	getAccountDetails(account_id) {
		let url = envConfig.apiBaseUrl + _getAccountDetailsEndpoint;
		url = url.replace('{account-id}', account_id);
		if (envConfig.stubConfig) {
			const key = `AccountDetailsConnection-${account_id}`;
			url = envConfig.stubConfig.timelineStub[key];
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.accountTranService,
			method: 'GET',
			url,
			addAuthToken: true,

		}, body => {
			AlertsNSweepsActionCreator.handleAccountDetailsSuccess(body);
		}, error => {
			AlertsNSweepsActionCreator.handleAccountDetailsError(error);
		});
	},
};

module.exports = AlertsNSweepsApiUtils;

