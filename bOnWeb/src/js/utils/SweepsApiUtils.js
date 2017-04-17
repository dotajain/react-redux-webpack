/**
 * @class SweepsApiUtils
 */

const envConfig = require('../../static/config');
const config = require('../config');
const ApiUtils = require('./ApiUtils');
const SweepsActionCreator = require('../actions/SweepsActionCreator');
const AlertsNSweepsActionCreator = require('../actions/AlertsNSweepsActionCreator');

const _editSweepEndpoint = '/banks/{bank-id}/accounts/{scope_id}/{account-id}/sweeps/{sweep-id}';
const _createSweepEndpoint = '/banks/{bank-id}/accounts/{scope_id}/{account-id}/sweeps';
const _deleteSweepEndpoint = '/banks/{bank-id}/accounts/{scope_id}/{account-id}/sweeps/{sweep-id}';
const scope_id = 'default';
const SweepsApiUtils = {

	/**
	 * API call for getAccoountList.
	 * Retrieves the list of accounts for a customer.
	 */

	createSweepData(data, accountId) {
		const requestData = data;
		let url = envConfig.apiBaseUrl + _createSweepEndpoint;
		url = url.replace('{scope_id}', scope_id);
		url = url.replace('{account-id}', accountId);
		let method = 'POST';
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.alertsNsweeps.GetSweepsAlertsConnectionStub;
			method = 'GET';
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.sweepService,
			method: method,
			url,
			addAuthToken: true,
			requestData,
		}, body => {
			SweepsActionCreator.handleCreateSweepSuccess(body);
		}, error => {
			AlertsNSweepsActionCreator.handleAlertsNSweepsError(error, true);
		});
	},

	editSweepData(data, accountId, sweepId) {
		const requestData = data;
		let url = envConfig.apiBaseUrl + _editSweepEndpoint;
		url = url.replace('{scope_id}', scope_id);
		url = url.replace('{account-id}', accountId);
		url = url.replace('{sweep-id}', sweepId);
		let method = 'PUT';
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.alertsNsweeps.GetSweepsAlertsConnectionStub;
			method = 'GET';
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.sweepService,
			method: method,
			url,
			addAuthToken: true,
			requestData,
		}, body => {
			SweepsActionCreator.handleEditSweepSuccess(body);
		}, error => {
			AlertsNSweepsActionCreator.handleAlertsNSweepsError(error, true);
		});
	},

	deleteSweepData(accountId, sweepId) {
		let url = envConfig.apiBaseUrl + _deleteSweepEndpoint;
		url = url.replace('{scope_id}', scope_id);
		url = url.replace('{account-id}', accountId);
		url = url.replace('{sweep-id}', sweepId);
		let method = 'DELETE';
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.alertsNsweeps.DeleteSweepsConnectionStub;
			method = 'GET';
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.sweepService,
			method: method,
			url,
			addAuthToken: true,
		}, body => {
			SweepsActionCreator.handleDeleteSweepsSuccess(body);
		}, error => {
				AlertsNSweepsActionCreator.handleAlertsNSweepsError(error, true);
		});
	},
};

module.exports = SweepsApiUtils;

