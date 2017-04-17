// FinancialStories.js

/**
 * FinancialStoriesActionCreator
 * @class FinancialStoriesActionCreator
 */

const AppDispatcher = require('../dispatcher/AppDispatcher');
const FinancialStoriesConstants = require('../constants/FinancialStoriesConstants');

const FinancialStoriesActionCreator = {

	setAccountHelp(data) {
		AppDispatcher.handleViewAction({
			actionType: FinancialStoriesConstants.SET_ACCOUNT_HELP,
			data: data,
		});
	},

	/**
	 * Action to get all accounts from API
	 */
	getTagsList() {
		AppDispatcher.handleViewAction({
			actionType: FinancialStoriesConstants.REQUEST_TAGS_LIST,
		});
	},
	createTag(data) {
		AppDispatcher.handleViewAction({
			actionType: FinancialStoriesConstants.CREATE_NEW_TAG,
			data: data,
		});
	},
	deleteTag(data) {
		AppDispatcher.handleViewAction({
			actionType: FinancialStoriesConstants.DELETE_TAG_REQUEST,
			data: data,
		});
	},
	updateTag(data) {
		AppDispatcher.handleViewAction({
			actionType: FinancialStoriesConstants.UPDATE_TAG_REQUEST,
			data: data,
		});
	},
	assignTag(data) {
		AppDispatcher.handleViewAction({
			actionType: FinancialStoriesConstants.ASSIGN_TAG_REQUEST,
			data: data,
		});
	},
	// To get micro trnsactions
	getMicroTransaction(data) {
		AppDispatcher.handleViewAction({
			actionType: FinancialStoriesConstants.MICRO_TRANSACTION_REQUEST,
			data: data,
		});
	},
	getCashPointTransaction(data) {
		//	console.log("cash point transactions");
		AppDispatcher.handleViewAction({
			actionType: FinancialStoriesConstants.CASHPOINT_REQUEST,
			data: data,
		});
	},
	getInAndOutTransaction(data) {
		AppDispatcher.handleViewAction({
			actionType: FinancialStoriesConstants.IN_OUT_REQUEST,
			data: data,
		});
	},
	handleMicroTransactionSuccess(response) {
        AppDispatcher.handleServerAction({
			actionType: FinancialStoriesConstants.MICRO_TRANSACTION_REQUEST_SUCCESS,
			data: response,
		});
	},
	handleCashPointTransactionSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: FinancialStoriesConstants.CASHPOINT_REQUEST_SUCCESS,
			data: response,
		});
	},
	handleInOutTransactionSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: FinancialStoriesConstants.IN_OUT_REQUEST_SUCCESS,
			data: response,
		});
	},

	resetTransactionSearchText() {
		AppDispatcher.handleServerAction({
			actionType: FinancialStoriesConstants.RESET_TRANSACTION_SEARCH_TEXT,
		});
	},

	// TO HANDLE SERVER ACTIONS
	/**
	 * Action to handle an API call success
	 * @param  {object} response getCases api response
	 */
	handleTagsListSuccess(response) {
		AppDispatcher.handleServerAction({

			actionType: FinancialStoriesConstants.REQUEST_TAGS_LIST_SUCCESS,
			data: response,
		});
	},

	// To retrive account list
	getAccountsList() {
		AppDispatcher.handleViewAction({
			actionType: FinancialStoriesConstants.ACCOUNTS_LIST,
		});
	},

	// To handle financial stories tile
	handleFinancialStoriesTile(tile) {
		AppDispatcher.handleViewAction({
			actionType: FinancialStoriesConstants.FINANCIAL_STORIES_TILE,
			data: tile,
		});
	},

	handleAccountsListSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: FinancialStoriesConstants.ACCOUNTS_LIST_SUCCESS,
			data: response,
		});
	},

	// To handle account list success
	handleAccountDetailsSuccess(response, accountType) {
		AppDispatcher.handleServerAction({
			actionType: FinancialStoriesConstants.ACCOUNT_DETAILS_SUCCESS,
			data: response,
			accountType: accountType,
		});
	},

	// To retrive account details
	getAccountDetails(acountNumber, accountType, colorIndex) {
		AppDispatcher.handleViewAction({
			actionType: FinancialStoriesConstants.ACCOUNT_DETAILS,
			acountNumber: acountNumber,
			accountType: accountType,
			accountColorIndex: colorIndex,
		});
	},

	// To retrive Financial Stories Connection
	getFinancialStoriesConnection(fsConnectionData) {
		AppDispatcher.handleViewAction({
			actionType: FinancialStoriesConstants.FINANCIAL_STORIES_CONNECTION,
			transactionType: fsConnectionData,
		});
	},

	// To handle success for Financial Stories Transaction List
	handleFSTransactionListSuccess(response, status, fsStoryConnectionData) {
		AppDispatcher.handleServerAction({
			actionType: FinancialStoriesConstants.FINANCIAL_STORIES_CONNECTION_SUCCESS,
			data: response,
			status: status,
			tileType: fsStoryConnectionData,
		});
	},
	
	// To handle error for Financial Stories Transaction Projection Error
	handleFSTransactionTileError(response, status, tileType) {
		AppDispatcher.handleServerAction({
			actionType: FinancialStoriesConstants.FINANCIAL_STORIES_TRANSACTION_TILE_ERROR,
			data: response,
			status: status,
			tileType: tileType,
		});
	},

	tabSelect(tabKey) {
        AppDispatcher.handleViewAction({
            actionType: FinancialStoriesConstants.TAB_SELECT,
            tabKey: tabKey,
        });
    },

	/**
	 * Action to get all accounts from API
	 */
	getTransactionHistoryList(transactionType) {
		AppDispatcher.handleViewAction({
			actionType: FinancialStoriesConstants.TRANSACTION_LIST,
			transactionType: transactionType,
		});
	},

	// To get  Page List of Transaction History
	getTransactionHistoryPageList(pageSize) {
		AppDispatcher.handleViewAction({
			actionType: FinancialStoriesConstants.TRANSACTION_HISTORY_PAGE_LIST,
			pageSize: pageSize,
		});
	},

	//  To get Sort List of Transaction History
	getTransactionHistorySortList(sortData) {
		AppDispatcher.handleViewAction({
			actionType: FinancialStoriesConstants.TRANSACTION_HISTORY_SORT_LIST,
            sortData: sortData,
		});
	},

	// To get list of trnsaction search
	getTransactionSearchList(text) {
		AppDispatcher.handleViewAction({
			actionType: FinancialStoriesConstants.TRANSACTION_SEARCH_LIST,
            text: text,
		});
	},

	// To get List of Transaction Date List
	getTransactionDateRangeList(dateRange) {
		AppDispatcher.handleViewAction({
			actionType: FinancialStoriesConstants.TRANSACTION_DATE_RANGE_LIST,
            dateRange: dateRange,
		});
	},

	// To handle update for FS Tile Click
	handleUpdateFSTileClick() {
		AppDispatcher.handleViewAction({
			actionType: FinancialStoriesConstants.FINANCIAL_STORIES_UPDATE_TILE_CLICK,
		});
	},

	// To handle update for FS Tile Click
	handleFSProjectionTourDone() {
		AppDispatcher.handleViewAction({
			actionType: FinancialStoriesConstants.PROJECTION_TOUR_DONE_SUCESS,
		});
	},

	projectionSettingClicked() {
		AppDispatcher.handleViewAction({
			actionType: FinancialStoriesConstants.PROJECTION_SETTING_CLICKED,

		});
	},
	// getAccountColorIndex() {
	// 	AppDispatcher.handleViewAction({
	// 		actionType: FinancialStoriesConstants.ACCOUNT_DETAILS_COLOR_INDEX,
	// 	});
	// },

	handleUpdateFSTagAssignment() {
		AppDispatcher.handleViewAction({
			actionType: FinancialStoriesConstants.FINANCIAL_STORIES_UPDATE_TAG_ASSIGN,
		});
	},

	/**
	 * Action to get all accounts from API
	 */
	transactionSearchTextList(text) {
		AppDispatcher.handleViewAction({
			actionType: FinancialStoriesConstants.TRANSACTION_SEARCH_TEXT,
            text: text,
		});
	},

	handleTransactionHistoryDateRangeListSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: FinancialStoriesConstants.TRANSACTION_DATE_RANGE_LIST_SUCCESS,
			data: response,
		});
	},

	handleTransactionHistoryListSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: FinancialStoriesConstants.TRANSACTION_LIST_SUCCESS,
			data: response,
		});
	},

	handleTransactionHistoryListError(response) {
		AppDispatcher.handleServerAction({
			actionType: FinancialStoriesConstants.TRANSACTION_HISTORY_LIST_ERROR,
			data: response,
		});
	},

	handleFSAccountDetailsError(response, status) {
		AppDispatcher.handleServerAction({
			actionType: FinancialStoriesConstants.FINANCIAL_STORIES_ACCOUNT_DETAILS_ERROR,
			data: response,
			status: status,
		});
	},

	// TO HANDLE SERVER ACTIONS
	/**
	 * Action to handle an API call success
	 * @param  {object} response getCases api response
	 */
	handleTransactionSearchListSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: FinancialStoriesConstants.TRANSACTION_SEARCH_TEXT_SUCCESS,
			data: response,
		});
	},
	handleCreateTagSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: FinancialStoriesConstants.CREATE_NEW_TAG_SUCCESS,
			data: response,

		});
	},
	handleCreateUpdateTagError(response, data) {
		AppDispatcher.handleServerAction({
			actionType: FinancialStoriesConstants.CREATE_UPDATE_NEW_TAG_ERROR,
			response: response,
			data: data,
		});
	},
	handleDeleteTagSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: FinancialStoriesConstants.DELETE_TAG_REQUEST_SUCCESS,
			data: response,
		});
	},

	handleAssignTagSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: FinancialStoriesConstants.ASSIGN_TAG_REQUEST_SUCCESS,
			data: response,
		});
	},
	handleUpdateTagSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: FinancialStoriesConstants.UPDATE_TAG_REQUEST_SUCCESS,
			data: response,
		});
	},

	handleOldestTransactionDate(response) {
		AppDispatcher.handleServerAction({
			actionType: FinancialStoriesConstants.MATCHALL_FOR_DROPDOWN_SUCCESS,
			data: response,
		});
	},


};

module.exports = FinancialStoriesActionCreator;

