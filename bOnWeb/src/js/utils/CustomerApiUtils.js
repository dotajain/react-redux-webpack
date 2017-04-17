/**
 * @module CustomerApiUtils
 */

const envConfig = require('../../static/config');
const config = require('../config');

const CustomerServerActions = require('../actions/CustomerServerActions');
const AccountOpeningActions = require('../actions/AccountOpeningActions');

const ApiUtils = require('./ApiUtils');

const _getCustomersUrl = '/banks/{bank-id}/customers';
const _getCustomerByIdUrl = '/banks/{bank-id}/customers/{customer-id}';

/**
 * @class CustomerApiUtils
 */
const CustomerApiUtils = {

	/**
	 * Calls the customer api to get a list of customers associated with the auth token
	 */
	_getCustomersUrl() {
		const url = envConfig.apiBaseUrl + _getCustomersUrl;

		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.customerServices,
			method: 'GET',
			url,
			addAuthToken: true,
		}, body => {
			CustomerServerActions.handleGetCustomersSuccess(body);
		}, (body, status) => {
			CustomerServerActions.handleGetCustomersError({ status });
		});
	},

	getCustomers() {
		let url = envConfig.apiBaseUrl + _getCustomersUrl;
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.authenticationStub.GetUsersConnection;
		}

		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.customerServices,
			method: 'GET',
			url,
			addAuthToken: true,
		}, body => {
			CustomerServerActions.handleGetCustomersSuccess(body);
		}, (body, status) => {
			CustomerServerActions.handleGetCustomersError({ status });
		});
	},

	getCustomerById(customerId) {
		let url = envConfig.apiBaseUrl + _getCustomerByIdUrl;

		url = url.replace('{customer-id}', customerId);

		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.customerServices,
			method: 'GET',
			url,
			addAuthToken: true,
		}, body => {
			AccountOpeningActions.receiveGetResult(body);
			CustomerServerActions.handleGetCustomerByIdSuccess(body);
		}, (body, status) => {
			CustomerServerActions.handleGetCustomerByIdError({ status });
		});
	},

};

module.exports = CustomerApiUtils;
