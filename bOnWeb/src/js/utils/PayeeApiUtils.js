/**
 * @class PayeeApiUtils
 */
const envConfig = require('../../static/config');
const config = require('../config');
const ApiUtils = require('./ApiUtils');
const PayeeActionCreator = require('../actions/PayeeActionCreator');
// Urls for service call
const _addPayeeUrl = '/banks/{bank-id}/accounts/default/{accountId}/beneficiaries/account';
const _deletePayeeUrl = '/banks/{bank-id}/accounts/default/{accountId}/beneficiaries/';
const _getPayeeList = '/banks/{bank-id}/accounts/default';

const PayeeApiUtils = {
	/*
	Getting List of Payee
	*/
	getPayeeList() {
		let url = envConfig.apiBaseUrl + _getPayeeList;
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.paymentStub.PaymentListConnection;
		}
		// Ajax Call
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.payeeService,
			method: 'GET',
			url,
			addAuthToken: true,
		}, body => {
			// send Data to store when getting the list of payee
			PayeeActionCreator.handlePayeesListSuccess(body);
		}, error => {
			// Handle Error of payee
		});
	},
	/*
		Editing the payee
		@Description This method will first add the payee
		and on succes of add payee delete payee will be called
	*/
	editPayee(requestData, accountId, benificaryId) {

		const addPayeeUrl = _addPayeeUrl.replace('{accountId}', accountId);
		let url = envConfig.apiBaseUrl + addPayeeUrl;
		if (envConfig.stubConfig) {
			// TODO need to discuss with the team
			url = envConfig.stubConfig.paymentStub.AddPayeeConnection;
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.payeeService,
			method: envConfig.stubConfig ? 'Get' : 'Post',
			url,
			requestData,
			addAuthToken: true,

		}, body => {
			const resp = body;
			// creating request packet to delete the previous payee
			const deletePayeeRequest = {};
			deletePayeeRequest.accountId = accountId;
			deletePayeeRequest.beneficiary_id = benificaryId;
			resp.code = 201;
			PayeeActionCreator.handleEditPayeePartialSuccessCall(resp);
			this.deletePayee(deletePayeeRequest);
		}, errors => {
			if (errors !== undefined) {
				const error = errors;
				error.code = 422;
				// handle error of edit payee service call
				PayeeActionCreator.handlePayeeServiceCall(error);
			} else {
				// handle error of edit payee service call
				PayeeActionCreator.handlePayeeServiceCall({ code: 422 });
			}
		});
	},
	/**
	 * method: addPayee
	 * request: addPayee data and accountId
	 * description:This method will make a ajax call to add a payee for a particular account
	 */
	addPayee(requestData, accountId) {
		// replacing the accountId
		const addPayeeUrl = _addPayeeUrl.replace('{accountId}', accountId);
		let url = envConfig.apiBaseUrl + addPayeeUrl;
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.paymentStub.AddPayeeConnection;
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.payeeService,
			method: envConfig.stubConfig ? 'Get' : 'Post',
			url,
			requestData,
			addAuthToken: true,

		}, resp => {
			const body = resp;
			body.code = 201;
			// Handling the success response
			PayeeActionCreator.handleAddPayeeServiceCall(body);
		}, errors => {
			if (errors !== undefined) {
				const error = errors;
				error.code = 422;
				// Handling the error response
				PayeeActionCreator.handleAddPayeeServiceCall(error);
			} else {
				// Handling the error response
				PayeeActionCreator.handleAddPayeeServiceCall({ code: 422 });
			}
		});
    },
	/*
	 * method: deletePayee
	 * request: deletPayeeRequestData
	 * description:This method will make a ajax call to delete a payee for a particular account
	 */
	deletePayee(deletePayeeRequest) {
		let deleteUrl = _deletePayeeUrl.replace('{accountId}', deletePayeeRequest.accountId);
		deleteUrl += deletePayeeRequest.beneficiary_id;
		let url = envConfig.apiBaseUrl + deleteUrl;
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.paymentStub.DeletePayeeListConnection;
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.payeeService,
			method: envConfig.stubConfig ? 'Get' : 'DELETE',
			url,
			addAuthToken: true,

		}, body => {
			// Handling the success response
			const success = {
				code: 201,
			};
			PayeeActionCreator.handleDeletePayeeSuccess(success);
		}, errors => {
			const error = errors;
			if (error !== undefined) {
				error.code = 422;
				// Handling the error response
				PayeeActionCreator.handlePayeeServiceCall(error);
			} else {
				// Handling the error response
				PayeeActionCreator.handlePayeeServiceCall({ code: 422 });
			}
		});
	},

};

module.exports = PayeeApiUtils;

