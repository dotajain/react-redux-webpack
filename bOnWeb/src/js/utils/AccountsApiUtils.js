
/**
 * @class AccountsApiUtils
 */

const envConfig = require('../../static/config');
const config = require('../config');

const ApiUtils = require('./ApiUtils');
const AccountsActionCreator = require('../actions/AccountsActionCreator');

const _getAccountListEndpoint = '/banks/{bank-id}/accounts/default';
const _getAccountDetailsEndpoint = '/banks/{bank-id}/accounts/default/{account-id}';

const AccountsApiUtils = {

	/**
	 * API call for getAccoountList.
	 * Retrieves the list of accounts for a customer.
	 */
	getAccountsList(termsAndConditionsFlag) {
		let url = envConfig.apiBaseUrl + _getAccountListEndpoint;
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.timelineStub.AccountListConnection;
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.timelineService,
			method: 'GET',
			url,
			addAuthToken: true,

		}, (body, status) => {
			AccountsActionCreator.handleAccountsListSuccess(body);
			// console.log('account list success');
		}, (error, status) => {
			if (status === 401 && error.headers[config.authenticateHeaderName] === 'Bearer realm error=tsandcs') {
				if (termsAndConditionsFlag === true) {
					this.getAccountsList(termsAndConditionsFlag);
				} else {
					AccountsActionCreator.getTermsAndConditions();
				}
			} else {
				AccountsActionCreator.handleAccountsListError(error);
				}
		});
	},

	/**
	 * API call for getAccoountDetails.
	 * Retrieves the details of account for a customer.
	 */
	getAccountDetails(account_number) {
		let url = envConfig.apiBaseUrl + _getAccountDetailsEndpoint;
		url = url.replace('{account-id}', account_number);
		if (envConfig.stubConfig) {
			const key = `AccountDetailsConnection-${account_number}`;
			url = envConfig.stubConfig.timelineStub[key];
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.timelineService,
			method: 'GET',
			url,
			addAuthToken: true,

		}, body => {
			AccountsActionCreator.handleAccountsDetailsSuccess(body);
		}, error => {
			// console.log('in error api utils');
			const status = 422;
			AccountsActionCreator.handleAccountsDetailsError(account_number, error, status);
		}
		);
	},
};

module.exports = AccountsApiUtils;
