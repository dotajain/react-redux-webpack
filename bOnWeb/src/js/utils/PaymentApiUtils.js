/**
 * @class PaymentApiUtils
 */
// Importing the dependencies
const envConfig = require('../../static/config');
const config = require('../config');
const HashcodeUtils = require('./HashcodeUtils');
const ApiUtils = require('./ApiUtils');
const PaymentsActionCreator = require('../actions/PaymentsActionCreator');

// Url for Service Call
const _getAccountListEndpoint = '/banks/{bank-id}/accounts/default';
const _getPaymentUrl = '/banks/{bank-id}/accounts/default/{account_id}/mandates/';
const _getSOPaymentUrl = `${_getPaymentUrl}${'so'}`;
const _getDDPaymentUrl = `${_getPaymentUrl}${'dd'}`;
const _getPotListEndpoint = '/banks/{bank-id}/accounts/default/{account_id}/pots';
const _delPaymentUrl = '/banks/{bank-id}/accounts/default/{account_id}/mandates/';
const _updatePaymentEndpoint = '/banks/{bank-id}/accounts/default/{account_id}/mandates/so/';
const _makeSOPaymentUrl = '/banks/{bank-id}/accounts/default/{account_id}/mandates/so';
const _makeDDPaymentUrl = '/banks/{bank-id}/accounts/default/{account_id}/transactions';
const _getPayeeList = '/banks/{bank-id}/accounts/default/beneficiaries';
const _getAccountDetails = '/banks/{bank-id}/accounts/default/';
const _getInterPotTransfer = '/banks/{bank-id}/accounts/default/{account_id}/pots/{potId}/transactions';
const _addPayeeUrl = '/banks/{bank-id}/accounts/default/{accountId}/beneficiaries/account';

const PaymentApiUtils = {
	/**
	 * API call for getAccoountList.
	 * Retrieves the list of accounts for a customer.
	 */
	getAccountsList() {
		let url = envConfig.apiBaseUrl + _getAccountListEndpoint;
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.timelineStub.AccountListConnection;
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.accountService,
			method: 'GET',
			url,
			addAuthToken: true,

		}, body => {
			PaymentsActionCreator.handleAccountsListSuccess(body);
		});
	},
	/**
	 * API call for getPayeeList.
	 * Retrieves the list of payees.
	 */
	getPayeeList() {
		let url = envConfig.apiBaseUrl + _getPayeeList;
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.paymentStub.PaymentListConnection;
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.paymentServices,
			method: 'GET',
			url,
			addAuthToken: true,

		}, body => {
			PaymentsActionCreator.handlePayeesListSuccess(body);
		}, error => {
			PaymentsActionCreator.handlePayeeListError(error);
		});
	},
	/**
	 * API call for getStandingOrderPaymentList.
	 * Retrieves the list of payments for a particular account.
	 */
	getStandingOrderPaymentList(accountId, accountName, accountType) {
		const getSOPaymentUrl = _getSOPaymentUrl.replace('{account_id}', accountId);
		let url = envConfig.apiBaseUrl + getSOPaymentUrl;
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.paymentStub.MandateListConnection;
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.mandateService,
			method: 'GET',
			url,
			addAuthToken: true,

		}, body => {
			const responseBody = body;
			responseBody.accountId = accountId;
			responseBody.accountName = accountName;
			responseBody.accountType = accountType;
			PaymentsActionCreator.getPaymentSuccess(responseBody);
		}, error => {
			PaymentsActionCreator.getPaymentError(error);
		}
		);
	},
	/**
	 * API call for getDirectDebitPaymentList.
	 * Retrieves the list of direct payments for a particular account.
	 */
	getDirectDebitPaymentList(accountId, accountName, accountType) {
		const getDDPaymentUrl = _getDDPaymentUrl.replace('{account_id}', accountId);
		let url = envConfig.apiBaseUrl + getDDPaymentUrl;
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.paymentStub.DirectDebitListConnection;
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.mandateService,
			method: 'GET',
			url,
			addAuthToken: true,

		}, body => {
			const responseBody = body;
			responseBody.accountId = accountId;
			responseBody.accountName = accountName;
			responseBody.accountType = accountType;
			PaymentsActionCreator.getDDPaymentSuccess(responseBody);
		}, error => {
			PaymentsActionCreator.getDDPaymentFailure(error);
		});
	},
	/**
	 * API call for getPotList.
	 * Retrieves the list of direct payments for a particular account.
	 */
	getPotList() {
		let url = envConfig.apiBaseUrl + _getAccountListEndpoint;
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.paymentStub.PotListConnection;
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.potService,
			method: 'GET',
			url,
			addAuthToken: true,

		}, body => {
			PaymentsActionCreator.handlePotListSuccess(body);
		}, error => {
			console.log(error);
			console.log('Please handle pot error');
		});
	},
	makeSingleUsePayee(requestBody) {
		const addPayeeUrl = _addPayeeUrl.replace('{accountId}', requestBody.selectedAccountId);
		let url = envConfig.apiBaseUrl + addPayeeUrl;
		const requestData = requestBody.requestData;
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.paymentStub.AddPayeeConnection;
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.payeeService,
			method: envConfig.stubConfig ? 'Get' : 'POST',
			url,
			requestData,
			addAuthToken: true,

		}, bodys => {
			const body = bodys;
			body.code = 201;
			PaymentsActionCreator.handleSingleUsePayee(body, requestBody);
		}, errors => {
			if (errors !== undefined) {
				const error = errors;
				error.code = 422;
				PaymentsActionCreator.handleMakePaymentServiceCall(error);
			} else {
				PaymentsActionCreator.handleMakePaymentServiceCall({ code: 422 });
			}
		});
	},
	makeInterPotTransfer(requestBody) {
		let makeTransferUrl = _getInterPotTransfer.replace('{account_id}', requestBody.selectedAccountId);
		const requestData = requestBody.requestData;
		makeTransferUrl = makeTransferUrl.replace('{potId}', requestBody.selectedPotId);
		let url = envConfig.apiBaseUrl + makeTransferUrl;
		if (envConfig.stubConfig) {
			// TODO need to discuss with the team
			url = envConfig.stubConfig.paymentStub.MakePaymentConnection;
		}
		// TODO remove this part
		// url = "http://localhost:3000/stubs/payment-stub/MakePaymentSuccess.json"
		requestData.source_id = HashcodeUtils.getSourceId(requestData);
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.paymentServices,
			// Todo change it to post when webservice is there in place
			method: envConfig.stubConfig ? 'Get' : 'POST',
			url,
			addAuthToken: true,
			requestData,
		}, bodys => {
			const body = bodys;
			body.code = 202;
			PaymentsActionCreator.handleMakePaymentServiceCall(body);
		}, errors => {
			if (errors !== undefined) {
				const error = errors;
				error.code = 422;
				PaymentsActionCreator.handleMakePaymentServiceCall(error);
			} else {
				PaymentsActionCreator.handleMakePaymentServiceCall({ code: 422 });
			}
		});
	},
	makePayment(requestBody) {
		let url = envConfig.apiBaseUrl + _getPaymentUrl;
		if (envConfig.stubConfig) {
			// TODO need to discuss with the team
			url = envConfig.stubConfig.paymentStub.MakePaymentConnection;
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.paymentServices,
			// Todo change it to post when webservice is there in place
			method: 'Get',
			url,
			addAuthToken: true,
			requestBody,
		}, bodys => {
			const body = bodys;
			body.code = 202;
			PaymentsActionCreator.handleMakePaymentServiceCall(body);
		}, errors => {
			if (errors !== undefined) {
				const error = errors;
				error.code = 422;
				PaymentsActionCreator.handleMakePaymentServiceCall(error);
			} else {
				PaymentsActionCreator.handleMakePaymentServiceCall({ code: 422 });
			}
		});
    },
	makeSOPayment(requestBody) {
		const makePaymentUrl = _makeSOPaymentUrl.replace('{account_id}', requestBody.accountId);
		let url = envConfig.apiBaseUrl + makePaymentUrl;
		if (envConfig.stubConfig) {
			// TODO need to discuss with the team
			url = envConfig.stubConfig.paymentStub.MakePaymentConnection;
		}


		const requestData = requestBody.makePaymentRequest;
		requestData.source_id = HashcodeUtils.getSourceId(requestData);
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.mandateService,
			method: envConfig.stubConfig ? 'Get' : 'POST',
			url,
			addAuthToken: true,
			requestData,
		}, bodys => {
			const body = bodys;
			body.code = 202;
			PaymentsActionCreator.handleMakePaymentServiceCall(body);
		}, errors => {
			if (errors !== undefined) {
				const error = errors;
				error.code = 422;
				PaymentsActionCreator.handleMakePaymentServiceCall(error);
			} else {
				PaymentsActionCreator.handleMakePaymentServiceCall({ code: 422 });
			}
		});
    },
	makeDDPayment(requestBody) {
		const makePaymentUrl = _makeDDPaymentUrl.replace('{account_id}', requestBody.accountId);
		let url = envConfig.apiBaseUrl + makePaymentUrl;
		if (envConfig.stubConfig) {
			// TODO need to discuss with the team
			url = envConfig.stubConfig.paymentStub.MakePaymentConnection;
		}
		const requestData = requestBody.makePaymentRequestDD;
		requestData.source_id = HashcodeUtils.getSourceId(requestData);
		requestData.tags = [
			'11111111-2222-3333-4444-555555555555',
		];

		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.paymentServices,
			method: envConfig.stubConfig ? 'Get' : 'POST',
			url,
			addAuthToken: true,
			requestData,
		}, bodys => {
			const body = bodys;
			body.code = 202;
			PaymentsActionCreator.handleMakePaymentServiceCall(body);
		}, errors => {
			if (errors !== undefined) {
				const error = errors;
				error.code = 422;
				PaymentsActionCreator.handleMakePaymentServiceCall(error);
			} else {
				PaymentsActionCreator.handleMakePaymentServiceCall({ code: 422 });
			}
		});
    },
	getDirectDebitList() {
		let url = envConfig.apiBaseUrl + _getDDPaymentUrl;
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.paymentStub.DirectDebitListConnection;
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.paymentServices,
			method: 'GET',
			url,
			addAuthToken: true,

		}, body => {
			PaymentsActionCreator.handleDirectDebitListSuccess(body);
		});
	},
	getStandingOrderList() {
		let url = envConfig.apiBaseUrl + _getSOPaymentUrl;
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.paymentStub.MandateListConnection;
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.paymentServices,
			method: 'GET',
			url,
			addAuthToken: true,

		}, body => {
			PaymentsActionCreator.handleStandingOrderListSuccess(body);
		});
	},

	deletePaymentList(deletePaymentRequest) {
		let deleteUrl = _delPaymentUrl.replace('{account_id}', deletePaymentRequest.accountId);
		deleteUrl = deleteUrl + deletePaymentRequest.type + '/' + deletePaymentRequest.mandateId;

		let url = envConfig.apiBaseUrl + deleteUrl;
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.paymentStub.DeletedPaymentConnection;
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.mandateService,
			method: envConfig.stubConfig ? 'Get' : 'DELETE',
			url,
			addAuthToken: true,

		}, body => {
			// Handling the success response
			console.log(body);
			const success = {
				code: 201,
			};
			PaymentsActionCreator.handleDeletePaymentSuccess(success);
		}, errors => {
			if (errors !== undefined) {
				const error = errors;
				error.code = 422;
				PaymentsActionCreator.updateEditPaymentStatus(error);
			} else {
				PaymentsActionCreator.updateEditPaymentStatus({ code: 422 });
			}
		});
	},
	deletePayeeList() {
		let url = envConfig.apiBaseUrl + _getAccountListEndpoint;

		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.paymentStub.DeletePayeeListConnection;
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.paymentServices,
			method: 'Get',
			url,
			addAuthToken: true,

		}, body => {
			PaymentsActionCreator.handleDeletePayeeListSuccess(body);
		});
	},
	postEditedData(editPaymentData, mandateId) {
		const updatePaymentUrl = _updatePaymentEndpoint.replace('{account_id}', editPaymentData.accountId) + '/' + mandateId;
		let url = envConfig.apiBaseUrl + updatePaymentUrl;
		const requestData = editPaymentData.data;
		requestData.source_id = HashcodeUtils.getSourceId(requestData);
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.paymentStub.SOPaymentUpdateConnection;
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.paymentServices,
			method: envConfig.stubConfig ? 'Get' : 'PUT',
			url,
			//	requestData,
			addAuthToken: true,

		}, body => {
			PaymentsActionCreator.updateSOPaymentStatus(body);
		});
	},
	editPayment(data, accountId, mandateId) {
		const updatePaymentUrl = _updatePaymentEndpoint.replace('{account_id}', accountId);
		let url = envConfig.apiBaseUrl + updatePaymentUrl + mandateId;
		const requestData = data;
		requestData.source_id = HashcodeUtils.getSourceId(requestData);
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.paymentStub.SOPaymentUpdateConnection;
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.mandateService,
			method: envConfig.stubConfig ? 'Get' : 'PUT',
			url,
			requestData,
			addAuthToken: true,

		}, bodys => {
			const body = bodys;
			body.code = 201;
			PaymentsActionCreator.updateEditPaymentStatus(body);
		}, errors => {
			const error = errors;
			error.code = 422;
			PaymentsActionCreator.updateEditPaymentStatus(error);
		});
	},
	getAccountDetails(account_number) {
		let url = envConfig.apiBaseUrl + _getAccountDetails + account_number;
		if (envConfig.stubConfig) {
			const key = `AccountDetailsConnection-${account_number}`;
			url = envConfig.stubConfig.timelineStub[key];
		}

		ApiUtils.makeAjaxCall({

			apiVersion: config.apiVersions.accountService,
			method: 'GET',
			url,
			addAuthToken: true,

		}, bodys => {
			const body = bodys;
			body.code = 401;
			PaymentsActionCreator.handleAccountsDetailsSuccess(body);
		}, errors => {
			if (errors !== undefined) {
				const error = errors;
				error.code = 422;
				PaymentsActionCreator.handleAccountsDetailsSuccess(error);
			} else {
				PaymentsActionCreator.handleAccountsDetailsSuccess({ code: 422 });
			}
		});
	},

	getPotDetails(account_number) {
		let url = envConfig.apiBaseUrl + _getPotListEndpoint;
		url = url.replace('{account_id}', account_number);
		if (envConfig.stubConfig) {
			const key = `GetPotsConnection-${account_number}`;
			url = envConfig.stubConfig.paymentStub[key];
		}
		ApiUtils.makeAjaxCall({

			apiVersion: config.apiVersions.paymentServices,
			method: 'GET',
			url,
			addAuthToken: true,

		}, body => {
			const resp = {
				id: account_number,
				pots: body,
			};
			PaymentsActionCreator.handlePotsDetailsSuccess(resp);
		}, error => {
			// handle error
			console.log(error);
			console.log('Please handle get Pots Error message');
		});
	},


};

module.exports = PaymentApiUtils;

