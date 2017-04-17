/**
 * @class TimelineApiUtils
 */

const envConfig = require('../../static/config');
const config = require('../config');
const FinancialStoriesStore = require('../stores/FinancialStoriesStore');
const ApiUtils = require('./ApiUtils');
const ProjectionActionCreator = require('../actions/ProjectionActionCreator');
const projectionPreferencesUrl = '/banks/{bank-id}/accounts/default/{account_id}/projection/preferences';
const projectionCreateUpdateUrl = '/banks/{bank-id}/accounts/default/{account_id}/projection/preferences';
let accountId;

const ProjectionApiUtils = {
	getAccountId() {
		return accountId = FinancialStoriesStore.getCurrentAccountId();
	},
	/**
	 * API call for get projection preferences.
	 * Retrieves the projection preferences of the customer.
	 */
	getEarningCommitments() {
        const _getprojectionPreferenceUrl = projectionPreferencesUrl.replace('{account_id}', this.getAccountId());
		let url = envConfig.apiBaseUrl + _getprojectionPreferenceUrl;
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.projectionsStub.ProjectionEarningsAndCommitments;
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.projectionService,
			method: 'GET',
			url,
			addAuthToken: true,
		}, (body, status) => {
           switch(status){
            case 200 : ProjectionActionCreator.handleEarningsCommitmentSuccess(body);
				break;
			case 404 :
				break;
	  		}
		});
	},
	/**
	 * API call for creates/updates the  projection preferences.
	 * creates or updates the projection preferences of the customer.
	 */
	projectionsUpdate(dProjectionObjects) {
		const requestData = dProjectionObjects;
		const _updateProjectionPreferences = projectionCreateUpdateUrl.replace('{account_id}', this.getAccountId());
		let url = envConfig.apiBaseUrl + _updateProjectionPreferences;
		// if (envConfig.stubConfig) {
		// 	url = envConfig.stubConfig.projectionsStub.ProjectionEarningsAndCommitments;
		// }
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.projectionService,
			method: 'PUT',
			url,
			addAuthToken: true,
			requestData,
		}, body => {
			ProjectionActionCreator.handleProjectionDoneSuccess(body);
		},
		(error, status) => {
			if (status === 500) {

			}
		});
	},
};
module.exports = ProjectionApiUtils;

