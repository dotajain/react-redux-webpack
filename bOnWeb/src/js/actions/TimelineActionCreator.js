/**
 * TimelineActionCreator
 * @class TimelineActionCreator
 */

const AppDispatcher = require('../dispatcher/AppDispatcher');
const TimelineConstants = require('../constants/TimelineConstants');

const TimelineActionCreator = {
	/**
	 * Action to get all TransactionsList from API
	 */
	getTransactionsList() {
		AppDispatcher.handleViewAction({
			actionType: TimelineConstants.REQUEST_TRANSACTION_LIST,
		});
	},
	/**
	 * Action to get all Search TransactionSuggest from API
	 */
	getSearchTransactionSuggest(searchText) {
		AppDispatcher.handleViewAction({
			actionType: TimelineConstants.REQUEST_SEARCH_TRANSACTION_SUGGEST,
			data: searchText,
		});
	},
	/**
	 * Action to get Transaction Search Data from API
	 */
	getTransactionSearchData(selectedTypeData) {
		AppDispatcher.handleViewAction({
			actionType: TimelineConstants.REQUEST_SEARCH_TRANSACTION_DATA,
			data: selectedTypeData,
		});
	},
	/**
	 * Action to rest Search info data from API
	 */

	resetSearchInfo(fields) {
		AppDispatcher.handleViewAction({
			actionType: TimelineConstants.RESET_SEARCH_INFO,
			data: fields,
		});
	},
	// TO HANDLE SERVER ACTIONS
	/**
	 * Action to handle an API call success
	 * @param  {object} response getCases api response
	 */
	handleTransactionSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: TimelineConstants.REQUEST_TRANSACTION_LIST_SUCCESS,
			data: response,
		});
	},
	// TO HANDLE Error
	handleTransactionError(error) {
		AppDispatcher.handleServerAction({
			actionType: TimelineConstants.REQUEST_TRANSACTION_LIST_ERROR,
			data: error,
		});
	},
	// TO HANDLE SERVER  Transaction Search Suggestion Success ACTIONS
	handleTransactionSearchSuggestionSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: TimelineConstants.REQUEST_SEARCH_TRANSACTION_SUGGEST_SUCCESS,
			data: response,
		});
	},
};

module.exports = TimelineActionCreator;

