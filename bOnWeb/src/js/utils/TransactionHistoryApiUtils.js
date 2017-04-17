/**
 * @class TransactionHistoryApiUtils
 */

const envConfig = require('../../static/config');
const config = require('../config');

const ApiUtils = require('./ApiUtils');
const FinancialStoriesActionCreator = require('../actions/FinancialStoriesActionCreator');

// const _getTransactionHistoryListEndpoint = '/banks/{bank-id}/accounts/default/transactions/searches/matchAll';
// const _getTransactionFilterListEndpoint = '/banks/{bank-id}/accounts/default/transactions/searches/matchAllWithFilter';
// const _getTransactionSearchListEndpoint = '/banks/{bank-id}/accounts/default/transactions/searches/matchText';
const _transactionHistorySearchListEndpoint = '/banks/{bank-id}/accounts/default/transactions/searches/{template-id}';

// const MONEYIN = 'moneyin';
// const MONEYOUT = 'moneyout';
// const REPEATING = 'repeating';
// const ALL = 'all';

const TransactionHistoryApiUtils = {

// getFilterUrl(filterData, tabKey) {
// 	let url = _getTransactionHistoryListEndpoint;
// 	switch (tabKey) {
// 		case ALL:
// 		url = _getTransactionHistoryListEndpoint;
// 		break;
// 		case MONEYIN:
// 		case MONEYOUT:
// 		case REPEATING:
// 		url = _getTransactionFilterListEndpoint;
// 		break;
// 		default:
// 	}
// 	return url;
// },

// TODO: remove it later
getFilterStubFile(stubConfig, filterData, tabKey) {
	let url = stubConfig.financialStoresStub.TransactionHistoryList;
	switch (tabKey) {
		case 'all':
            switch (filterData.account_list) {
				case 'ee8948b5-e443-408a-a2cd-1af9b29fdd5f':
				url = stubConfig.financialStoresStub.TransactionHistoryListSaving;
				break;
				default:
				url = stubConfig.financialStoresStub.TransactionHistoryList;
			}
            break;
		// case 'search':
		// url = stubConfig.financialStoresStub.TransactionHistorySearchList;
		// break;
		case 'moneyin':
		case 'moneyout':
		case 'repeating':
            url = stubConfig.financialStoresStub.TransactionHistoryFilterList;
            break;
		default:
	}
	return url;
},

	/**
 * API call for getAccoountList.
 * Retrieves the list of accounts for a customer.
 */

getTransactionHistoryList(filterData, tabKey) {
	const requestData = filterData;
	let url = envConfig.apiBaseUrl + _transactionHistorySearchListEndpoint.replace('{template-id}', filterData.template.file);// this.getFilterUrl(filterData, tabKey);// _getTransactionHistoryListEndpoint;
	let method = 'POST';
	if (envConfig.stubConfig) {
		url = this.getFilterStubFile(envConfig.stubConfig, filterData, tabKey);// .financialStoresStub.TransactionHistoryList;
		method = 'GET';
	}
	ApiUtils.makeAjaxCall({
		apiVersion: config.apiVersions.accountTranService,
		method: method,
		url,
		addAuthToken: true,
		requestData,
	}, body => {
		FinancialStoriesActionCreator.handleTransactionHistoryListSuccess(body);
	},
		error => {
			FinancialStoriesActionCreator.handleTransactionHistoryListError(error);
	});
},

getTransactionHistorySearchList(filterData) {
	const requestData = filterData;
	// let url = envConfig.apiBaseUrl + _getTransactionSearchListEndpoint;
	let url = envConfig.apiBaseUrl + _transactionHistorySearchListEndpoint.replace('{template-id}', filterData.template.file);
	let method = 'POST';
	if (envConfig.stubConfig) {
		url = envConfig.stubConfig.financialStoresStub.TransactionHistorySearchList;
		method = 'GET';
	}
	ApiUtils.makeAjaxCall({
		apiVersion: config.apiVersions.accountTranService,
		method: method,
		url,
		addAuthToken: true,
		requestData,
	}, body => {
		FinancialStoriesActionCreator.handleTransactionHistoryListSuccess(body);
	},
		error => {
			FinancialStoriesActionCreator.handleTransactionHistoryListError(error);
	});
},
};

module.exports = TransactionHistoryApiUtils;
