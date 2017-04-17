/**
 * @class FinancialStoriesApiUtils
 */

const envConfig = require('../../static/config');
const config = require('../config');

const ApiUtils = require('./ApiUtils');
const FinancialStoriesActionCreator = require('../actions/FinancialStoriesActionCreator');
const FinancialStoriesConstants = require('../constants/FinancialStoriesConstants');

const _getAccountListEndpoint = '/banks/{bank-id}/accounts/default';
const _getTransactionSearchTextListEndpoint = '/banks/{bank-id}/accounts/default/transactions/searches/suggest';
const _getAccountDetailsEndpoint = '/banks/{bank-id}/accounts/default/{account-id}';

const _getFSConMicroTransactionsEndpoint = '/banks/{bank-id}/accounts/default/transactions/aggregations/microTransactions';
const _getFSConCashpointEndpoint = '/banks/{bank-id}/accounts/default/transactions/aggregations/cashpoint';
const _getFSConInsAndOutsEndpoint = '/banks/{bank-id}/accounts/default/transactions/aggregations/insAndOuts';
const _getFSConProjectionEndpoint = '/banks/{bank-id}/accounts/default/{account-id}/projection';
const _getMatchAllTransaction = '/banks/{bank-id}/accounts/default/transactions/searches/matchAll';

// Tag endpoint
const _getTagListEndpoint = '/banks/{bank-id}/tags/active';
const _createTagEndpoint = '/banks/{bank-id}/tags';
const _updateTagEndpoint = '/banks/{bank-id}/tags/{tag-id}';
const _deleteTagEndpoint = '/banks/{bank-id}/tags/{tag-id}/archive';
const _assignTagEndpoint = '/banks/{bank-id}/accounts/default/{account-id}/transactions/metadata/tags';

const FinancialStoriesApiUtils = {

	// Used for stuff only
	getAccountTypeDetails(stubConfig, accountNumber) {
		let url = '';
		switch (accountNumber) {
			case 'b80e95a0-6b60-45b2-8b0f-77f2355f3061':
				url = stubConfig.financialStoresStub.AccountDetailsCurrentConnection;
				break;
			case '05985dae-d2de-4ebc-ab0a-79093081bde5':
				url = stubConfig.financialStoresStub.AccountDetailsLoanConnection;
				break;
			case '084c7a11-c91a-45ef-baea-2fd0e9556e16':
				url = stubConfig.financialStoresStub.AccountDetailsCreditConnection;
				break;
			case '3420d6c1-fb60-4ac5-a226-0d741f498ad2':
				url = stubConfig.financialStoresStub.AccountDetailsMortgageConnection;
				break;
			case 'ee8948b5-e443-408a-a2cd-1af9b29fdd5f':
				url = stubConfig.financialStoresStub.AccountDetailsSavingsConnection;
				break;
			case 'a91fe657-4605-42c7-96f1-3e1cc8555276':
				url = stubConfig.financialStoresStub.AccountDetailsSavings1Connection;
				break;
			default:
		}
		return url;
	},

	/**
	 * API call for getAccountsList.
	 * Retrieves the list of accounts type for a customer.
	 */
	getAccountsList() {
		let url = envConfig.apiBaseUrl + _getAccountListEndpoint;
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.timelineStub.AccountListConnection;
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.accountTranService,
			method: 'GET',
			url,
			addAuthToken: true,

		}, body => {
			FinancialStoriesActionCreator.handleAccountsListSuccess(body);
		});
	},

	/**
	 * API call for getAccoountDetails.
	 * Retrieves the details of account for a customer.
	 */
	getAccountDetails(account_number, accountType) {
		let url = envConfig.apiBaseUrl + _getAccountDetailsEndpoint;
		url = url.replace('{account-id}', account_number);
		if (envConfig.stubConfig) {
			url = this.getAccountTypeDetails(envConfig.stubConfig, account_number);
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.accountTranService,
			method: 'GET',
			url,
			addAuthToken: true,
		}, body => {
			FinancialStoriesActionCreator.handleAccountDetailsSuccess(body, accountType);
		}, (error, status) => {
			FinancialStoriesActionCreator.handleFSAccountDetailsError(error, status);
		});
	},

	/**
	 * API call for getFilterUrl.
	 * Retrieves the Filter Url .
	 */
	getFilterUrl(filterData) {
		let url = _getFSConMicroTransactionsEndpoint;
		switch (filterData.template.file) {
			case FinancialStoriesConstants.microTransactions:
				url = _getFSConMicroTransactionsEndpoint;
				break;
			case FinancialStoriesConstants.cashpoint:
				url = _getFSConCashpointEndpoint;
				break;
			case FinancialStoriesConstants.insAndOuts:
				url = _getFSConInsAndOutsEndpoint;
				break;
			case FinancialStoriesConstants.projection:
				url = _getFSConProjectionEndpoint;
				url = url.replace('{account-id}', filterData.params.account_list[0]);
				break;
			default:
		}
		return url;
	},

	/**
	 * API call for getFilterStubFile.
	 * Retrieves the Filter Stub File .
	 */
	getFilterStubFile(stubConfig, filterData) {
		let url = stubConfig.financialStoresStub.FinancialStoriesConnectionMicroTransactions;
		switch (filterData.template.file) {
			case FinancialStoriesConstants.microTransactions:
				url = stubConfig.financialStoresStub.FinancialStoriesConnectionMicroTransactions;
				break;
			case FinancialStoriesConstants.cashpoint:
				url = stubConfig.financialStoresStub.FinancialStoriesConnectionCashpoint;
				break;
			case FinancialStoriesConstants.insAndOuts:
				url = stubConfig.financialStoresStub.FinancialStoriesConnectionInsAndOuts;
				break;
			case FinancialStoriesConstants.projection:
				url = stubConfig.financialStoresStub.FinancialStoriesConnectionProjection;
				break;
			default:
		}
		return url;
	},

	/**
	 * API call for getFinancialStoriesConnection.
	 * Retrieves connection for Financial Stories .
	 */
	getFinancialStoriesConnection(fsStoryConnectionData) {
		const requestData = fsStoryConnectionData;
		if (fsStoryConnectionData.template.file === FinancialStoriesConstants.projection) {
			return this.getFinancialStoriesProjectionConnection(fsStoryConnectionData);
		}
		let url = envConfig.apiBaseUrl + this.getFilterUrl(fsStoryConnectionData);
		let method = 'POST';
		if (envConfig.stubConfig) {
			url = this.getFilterStubFile(envConfig.stubConfig, fsStoryConnectionData);
			method = 'GET';
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.accountTranService,
			method: method,
			url,
			addAuthToken: true,
			requestData,
		}, (body, status) => {
			FinancialStoriesActionCreator.handleFSTransactionListSuccess(body, status, fsStoryConnectionData.template.file);
		}, (body, status) => {
			FinancialStoriesActionCreator.handleFSTransactionTileError(body, status, fsStoryConnectionData.template.file);
		});
	},

	getFinancialStoriesProjectionConnection(fsStoryConnectionData) {
		let url = envConfig.apiBaseUrl + this.getFilterUrl(fsStoryConnectionData);
		if (envConfig.stubConfig) {
			url = this.getFilterStubFile(envConfig.stubConfig, fsStoryConnectionData);
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.projectionService,
			method: 'GET',
			url,
			addAuthToken: true,
		}, (body, status) => {
			FinancialStoriesActionCreator.handleFSTransactionListSuccess(body, status, fsStoryConnectionData.template.file);
		}, (body, status) => {
			FinancialStoriesActionCreator.handleFSTransactionTileError(body, status, fsStoryConnectionData.template.file);
		});
	},
	/**
	 * API call for getAccoountList.
	 * Retrieves the list of accounts for a customer.
	 */
	getTransactionSearchTextList(searchTextData) {
		const requestData = searchTextData;

		let url = envConfig.apiBaseUrl + _getTransactionSearchTextListEndpoint;
		let method = 'POST';
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.financialStoresStub.AccountTranSearchTextList;
			method = 'GET';
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.accountTranService,
			method: method,
			url,
			addAuthToken: true,
			requestData,
		}, body => {
			FinancialStoriesActionCreator.handleTransactionSearchListSuccess(body);
		});
	},

	/**
		 * API call for getTagsList.
		 * Retrieves the list of tags for a customer.
		 */
	getTagsList() {
		let url = envConfig.apiBaseUrl + _getTagListEndpoint;

		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.financialStoresStub.TagConnection;
		}

		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.tagManagementService,
			method: 'GET',
			url,
			addAuthToken: true,

		}, body => {
			FinancialStoriesActionCreator.handleTagsListSuccess(body);
		});
	},
	createNewTag(data) {
		const requestData = data;
		let url = envConfig.apiBaseUrl + _createTagEndpoint;
		let method = 'POST';
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.financialStoresStub.TagConnection; // CreateTagResponse;
			method = 'GET';
		}

		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.tagManagementService,
			method: method,
			url,
			addAuthToken: true,
			requestData,

		}, body => {
			FinancialStoriesActionCreator.handleCreateTagSuccess(body);
		}, body => {
			FinancialStoriesActionCreator.handleCreateUpdateTagError(body, true);
		});
	},
	updateTag(data) {
		const requestData = data;
		let url = envConfig.apiBaseUrl + _updateTagEndpoint;
		let method = 'PUT';
		url = url.replace('{tag-id}', data.id);
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.financialStoresStub.TagConnection; // CreateTagResponse;
			method = 'GET';
		}

		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.tagManagementService,
			method: method,
			url,
			addAuthToken: true,
			requestData,

		}, body => {
			FinancialStoriesActionCreator.handleUpdateTagSuccess(body);
		}, body => {
			FinancialStoriesActionCreator.handleCreateUpdateTagError(body, true);
		});
	},
	deleteTag(data) {
		let url = envConfig.apiBaseUrl + _deleteTagEndpoint;
		let method = 'PUT';
		url = url.replace('{tag-id}', data.id);
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.financialStoresStub.TagConnection;// CreateTagResponse;
			method = 'GET';
		}

		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.tagManagementService,
			method: method,
			url,
			addAuthToken: true,
			contentType:'N',
		}, body => {
			FinancialStoriesActionCreator.handleDeleteTagSuccess(body);
		}, body => {
			FinancialStoriesActionCreator.handleCreateUpdateTagError(body, true);
		});
	},

	assignTag(data, accountId) {
		const requestData = data;
		let url = envConfig.apiBaseUrl + _assignTagEndpoint;
		let method = 'PUT';
		url = url.replace('{account-id}', accountId);
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.financialStoresStub.TagConnection;// CreateTagResponse;
			method = 'GET';
		}

		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.tagManagementService,
			method: method,
			url,
			addAuthToken: true,
			requestData,
		}, body => {
			FinancialStoriesActionCreator.handleAssignTagSuccess(body);
		});
	},

	getMicroTransactions(tileData) {
		const requestData = tileData;
		let url = envConfig.apiBaseUrl + _getFSConMicroTransactionsEndpoint;
		let method = 'POST';
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.financialStoresStub.FinancialStoriesConnectionMicroTransactions;// CreateTagResponse;
			method = 'GET';
		}

		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.accountTranService,
			method: method,
			url,
			addAuthToken: true,
			requestData,
		}, body => {
			FinancialStoriesActionCreator.handleMicroTransactionSuccess(body);
		});
	},

	getCashPointTransactions(tileData) {
		const requestData = tileData;
		let url = envConfig.apiBaseUrl + _getFSConCashpointEndpoint;
		let method = 'POST';
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.financialStoresStub.FinancialStoriesConnectionCashpoint;// CreateTagResponse;
			method = 'GET';
		}

		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.accountTranService,
			method: method, // PUT
			url,
			addAuthToken: true,
			requestData,
		}, body => {
			FinancialStoriesActionCreator.handleCashPointTransactionSuccess(body);
		});
	},

	getInOutTransactions(tileData) {
		const requestData = tileData;
		let url = envConfig.apiBaseUrl + _getFSConInsAndOutsEndpoint;
		let method = 'POST';
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.financialStoresStub.FinancialStoriesConnectionInsAndOuts;// CreateTagResponse;
			method = 'GET';
		}

		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.accountTranService,
			method: method,
			url,
			addAuthToken: true,
			requestData,
		}, body => {
			FinancialStoriesActionCreator.handleInOutTransactionSuccess(body);
		});
	},

	getOldestTransactionDate(data) {
		const requestData = data;
		let url = envConfig.apiBaseUrl + _getMatchAllTransaction;
		let method = 'POST';
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.financialStoresStub.FinancialStoriesConnectionInsAndOuts;// CreateTagResponse;
			method = 'GET';
		}

		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.accountTranService,
			method: method,
			url,
			addAuthToken: true,
			requestData,
		}, body => {
			FinancialStoriesActionCreator.handleOldestTransactionDate(body);
		});
	},

};

module.exports = FinancialStoriesApiUtils;

