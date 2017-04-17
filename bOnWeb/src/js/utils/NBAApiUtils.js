/**
 * @class NBAApiUtils
 */

const envConfig = require('../../static/config');
const config = require('../config');
const ApiUtils = require('./ApiUtils');
const DateUtils = require('./DateUtils');
const uuid = require('node-uuid');

const NBAActionCreator = require('../actions/NBAActionCreator');

const _getNBAEndpoint = '/banks/{bank-id}/accounts/default/transactions/searches/matchAll/insights?form_factor=tablet';
const _getNBAFeedbackEndpoint = '/banks/{bank-id}/user/events';

const NBAApiUtils = {
	getNBAData() {
        let url = envConfig.apiBaseUrl + _getNBAEndpoint;
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.nbaStub.NBAComponent;
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.nbaService,
			method: 'GET',
			url,
			addAuthToken: true,
		}, body => {
			NBAActionCreator.handleNBADataSuccess(body);
		}, error => {
			NBAActionCreator.handleNBADataError(error);
		});
	},

	getNBAFeedback(feedback) {
		let url = envConfig.apiBaseUrl + _getNBAFeedbackEndpoint;
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.nbaStub.NBAComponent;
		}
		const requestData = {
			'id': uuid.v1(),
			'created_at': DateUtils.getISODateString(new Date()),
			'type': {
				'path': '/user/experience/activity',
				'action': feedback,
			},
			'data': {
				'context': '/bow-sitb/bapp/timeline',
			},
		};
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.nbaService,
			method: 'POST',
			url,
			addAuthToken: true,
			requestData,
		}, body => {
			NBAActionCreator.handleNBAFeedBackDataSuccess(body);
		}, error => {
			console.log(error);
			NBAActionCreator.handleNBAFeedBackDataError(error);
		});
	},

};

module.exports = NBAApiUtils;
