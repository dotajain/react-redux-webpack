/**
 * @class ProjectionsApiUtils
 */

const envConfig = require('../../static/config');
const config = require('../config');

const ApiUtils = require('./ApiUtils');
const ProjectionsActionCreator = require('../actions/ProjectionsActionCreator');
const _editProjectionEndpoint = '/banks/{bank-id}/accounts/{scope_id}/{account-id}/projection/alerts';
const AlertsNSweepsActionCreator = require('../actions/AlertsNSweepsActionCreator');
const scope_id = 'default';

const ProjectionsApiUtils = {

	/**
	 * API call for getAccoountList.
	 * Retrieves the list of accounts for a customer.
	 */
	editProjectionData(data, accountId) {
		let url = envConfig.apiBaseUrl + _editProjectionEndpoint;
		url = url.replace('{scope_id}', scope_id);
		url = url.replace('{account-id}', accountId);
		const requestData = data;
		let method = 'PUT';
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.alertsNsweeps.GetProjectionsAlertsConnectionStub;
			method = 'GET';
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.projectionService,
			method: method,
			url,
			addAuthToken: true,
			requestData,
		}, body => {
			ProjectionsActionCreator.handleEditProjectionAlertsDataSuccess(body);
		}, error => {
			AlertsNSweepsActionCreator.handleAlertsNSweepsError(error, true);
		});
	},

	/**
	 * API call for getAccoountDetails.
	 * Retrieves the details of account for a customer.
	 */
};

module.exports = ProjectionsApiUtils;

