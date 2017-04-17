/**
 * @class TimelineApiUtils
 */

const envConfig = require('../../static/config');
const config = require('../config');

const ApiUtils = require('./ApiUtils');
const DateUtils = require('./DateUtils')
const TimelineActionCreator = require('../actions/TimelineActionCreator');

const _getTransactionsListEndPoint = '/banks/{bank-id}/accounts/default/transactions/searches/matchAll';
const _getTransactionSearchSuggestionEndPoint = '/banks/{bank-id}/accounts/default/transactions/searches/suggest';
const _getSearchTransactionsEndponit = '/banks/{bank-id}/accounts/default/transactions/searches/matchText';
// Stores
const AccountsStore = require('../stores/AccountsStore');
const moment = require('moment');

const TimelineApiUtils = {
	getTransactionsList(fromTransactionIndex) {
		let url = envConfig.apiBaseUrl + _getTransactionsListEndPoint;
		let method = 'POST';
		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.timelineStub.TimelineListConnection;
			method = 'GET';
		}
		const requestData = {
			template: {
				file: 'matchAll',
			},
			params: {
				from: fromTransactionIndex,
				order: 'desc',
				start_date: DateUtils.getTransactionsAPICallDate(),
				sort_field: 'details.when',
				end_date: 'now',
				size: 25,
				account_list: AccountsStore.getAccountIdList(),
			},
		};

		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.timelineService,
			method: method,
			url,
			requestData,
			addAuthToken: true,

		}, body => {
			TimelineActionCreator.handleTransactionSuccess(body);
		}, error => {
			const e = error;
			e.isSearchSuggetionError = false;
			TimelineActionCreator.handleTransactionError(e);
		});
	},

	getTransactionsSearchSuggestion(searchText) {
		let url = envConfig.apiBaseUrl + _getTransactionSearchSuggestionEndPoint;
		let method = 'POST';
		const requestData = {
			template: {
				file: 'suggest',
			},
			params: {
				text: searchText,
				account_list: AccountsStore.getAccountIdList(),
			},
		};

		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.timelineStub.TimelineSearchSuggestion;
			method = 'GET';
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.timelineService,
			method: method,
			url,
			requestData,
			addAuthToken: true,
		}, body => {
			TimelineActionCreator.handleTransactionSearchSuggestionSuccess(body);
		},
		error => {
			const e = error;
			e.isSearchSuggetionError = true;
			TimelineActionCreator.handleTransactionError(e);
		});
	},

	getTransactionSearchData(suggestData, fromTransactionSearchIndex) {
		let url = envConfig.apiBaseUrl + _getSearchTransactionsEndponit;
		let method = 'POST';
		console.log(suggestData);

		const requestData = {
			template: {
				file: 'matchText',
			},
			params: {
				from: fromTransactionSearchIndex,
				search_text: suggestData.text,
				order: 'desc',
				start_date: DateUtils.getTransactionsAPICallDate(),
				sort_field: '_score',
				size: 25,
				end_date: 'now',
				account_list: AccountsStore.getAccountIdList(),
			},
		};

		if (envConfig.stubConfig) {
			url = envConfig.stubConfig.timelineStub.FilteredTransactionListConnection;
			method = 'GET';
		}
		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.timelineService,
			method: method,
			url,
			requestData,
			addAuthToken: true,

		}, body => {
			TimelineActionCreator.handleTransactionSuccess(body);
		});
	},
};

module.exports = TimelineApiUtils;

