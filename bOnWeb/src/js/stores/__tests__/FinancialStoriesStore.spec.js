'use strict';

jest.unmock('../FinancialStoriesStore');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const _ = require('lodash');

const AppDispatcher = require('../../dispatcher/AppDispatcher');
const FinancialStoriesStore = require('../FinancialStoriesStore');
const EventEmitter = require('events').EventEmitter;
const FinancialStoriesConstants = require('../../constants/FinancialStoriesConstants');
const AccountsStore = require('../AccountsStore');
const FinancialStoriesApiUtils = require('../../utils/FinancialStoriesApiUtils');
const TransactionHistoryApiUtils = require('../../utils/TransactionHistoryApiUtils');

describe('Financial Stories Store', () => {
	let callback = AppDispatcher.register.mock.calls[0][0];

	getDefault
	let getDefault = () => ({
		action: {
			actionType: FinancialStoriesConstants.Default,
		}
	})

	let getInsAndOuts = () => ({
		action: {
			actionType: FinancialStoriesConstants.insAndOuts,
		}
	})


	let getProjectionSettingsClicked = () => ({
		action: {
			actionType: FinancialStoriesConstants.PROJECTION_SETTING_CLICKED,
		}
	})

	let microTransactions = () => ({
		action: {
			actionType: FinancialStoriesConstants.microTransactions,
		}
	})


	let handleMatchallForDropdownSuccess = (data) => ({
		action: {
			actionType: FinancialStoriesConstants.MATCHALL_FOR_DROPDOWN_SUCCESS,
			data: data,
		}
	})

	let setAccountHelp = (data) => ({
		action: {
			actionType: FinancialStoriesConstants.SET_ACCOUNT_HELP,
			data: data,
		}
	})
	let getTagsList = () => ({
		action: {
			actionType: FinancialStoriesConstants.REQUEST_TAGS_LIST,
		}
	})
	let createTag = (data) => ({
		action: {
			actionType: FinancialStoriesConstants.CREATE_NEW_TAG,
			data: data,
		}
	})
	let deleteTag = (data) => ({
		action: {
			actionType: FinancialStoriesConstants.DELETE_TAG_REQUEST,
			data: data,
		}
	})
	let updateTag = (data) => ({
		action: {
			actionType: FinancialStoriesConstants.UPDATE_TAG_REQUEST,
			data: data,
		}
	})
	let assignTag = (data) => ({
		action: {
			actionType: FinancialStoriesConstants.ASSIGN_TAG_REQUEST,
			data: data,
		}
	})
	let getMicroTransaction = (data) => ({
		action: {
			actionType: FinancialStoriesConstants.MICRO_TRANSACTION_REQUEST,
			data: data,
		}
	})
	let getCashPointTransaction = (data) => ({
		action: {
			actionType: FinancialStoriesConstants.CASHPOINT_REQUEST,
			data: data,
		}
	})
	let getInAndOutTransaction = (data) => ({
		action: {
			actionType: FinancialStoriesConstants.IN_OUT_REQUEST,
			data: data,
		}
	})
	let handleMicroTransactionSuccess = (response) => ({
		action: {
			actionType: FinancialStoriesConstants.MICRO_TRANSACTION_REQUEST_SUCCESS,
			data: response,
		}
	})
	let handleCashPointTransactionSuccess = (response) => ({
		action: {
			actionType: FinancialStoriesConstants.CASHPOINT_REQUEST_SUCCESS,
			data: response,
		}
	})
	let resetTransactionSearchText = () => ({
		action: {
			actionType: FinancialStoriesConstants.RESET_TRANSACTION_SEARCH_TEXT,
		}
	})
	let handleTagsListSuccess = (response) => ({
		action: {
			actionType: FinancialStoriesConstants.REQUEST_TAGS_LIST_SUCCESS,
			data: response,
		}
	})
	let getAccountsList = () => ({
		action: {
			actionType: FinancialStoriesConstants.ACCOUNTS_LIST,
		}
	})
	let handleFinancialStoriesTile = (tile) => ({
		action: {
			actionType: FinancialStoriesConstants.FINANCIAL_STORIES_TILE,
			data: tile,
		}
	})
	let handleAccountsListSuccess = (response) => ({
		actionType: FinancialStoriesConstants.ACCOUNTS_LIST_SUCCESS,
		data: response,
	})
	let handleAccountDetailsSuccess = (response, accountType) => ({
		action: {
			actionType: FinancialStoriesConstants.ACCOUNT_DETAILS_SUCCESS,
			data: response,
			accountType: accountType,
		}
	})
	let getAccountDetails = (acountNumber, accountType, colorIndex) => ({
		action: {
			actionType: FinancialStoriesConstants.ACCOUNT_DETAILS,
			acountNumber: acountNumber,
			accountType: accountType,
			accountColorIndex: colorIndex,
		}
	})
	let getFinancialStoriesConnection = (fsConnectionData) => ({
		action: {
			actionType: FinancialStoriesConstants.FINANCIAL_STORIES_CONNECTION,
			transactionType: fsConnectionData,
		}
	})
	let handleFSTransactionListSuccess = (response, status, fsStoryConnectionData) => ({
		action: {
			actionType: FinancialStoriesConstants.FINANCIAL_STORIES_CONNECTION_SUCCESS,
			data: response,
			status: status,
			tileType: fsStoryConnectionData,
		}
	})
	let handleFSTransactionProjectionError = (response, status) => ({
		actionType: FinancialStoriesConstants.FINANCIAL_STORIES_PROJECTION_ERROR,
		data: response,
		status: status,
	})
	let tabSelect = (tabKey) => ({
		action: {
			actionType: FinancialStoriesConstants.TAB_SELECT,
			tabKey: tabKey,
		}
	})
	let getTransactionHistoryList = (transactionType) => ({
		action: {
			actionType: FinancialStoriesConstants.TRANSACTION_LIST,
			transactionType: transactionType,
		}
	})
	let getTransactionHistoryPageList = (pageSize) => ({
		action: {
			actionType: FinancialStoriesConstants.TRANSACTION_HISTORY_PAGE_LIST,
			pageSize: pageSize,
		}
	})
	let getTransactionHistorySortList = (sortData) => ({
		action: {
			actionType: FinancialStoriesConstants.TRANSACTION_HISTORY_SORT_LIST,
			sortData: sortData,
		}
	})
	let getTransactionSearchList = (text) => ({
		action: {
			actionType: FinancialStoriesConstants.TRANSACTION_SEARCH_LIST,
			text: text,
		}
	})
	let getTransactionDateRangeList = (dateRange) => ({
		action: {
			actionType: FinancialStoriesConstants.TRANSACTION_DATE_RANGE_LIST,
			dateRange: dateRange,
		}
	})
	let handleUpdateFSTileClick = () => ({
		action: {
			actionType: FinancialStoriesConstants.FINANCIAL_STORIES_UPDATE_TILE_CLICK,
		}
	})
	let handleUpdateFSTagAssignment = () => ({
		action: {
			actionType: FinancialStoriesConstants.FINANCIAL_STORIES_UPDATE_TAG_ASSIGN,
		}
	})
	let transactionSearchTextList = (text) => ({
		action: {
			actionType: FinancialStoriesConstants.TRANSACTION_SEARCH_TEXT,
			text: text,
		}
	})
	let handleTransactionHistoryDateRangeListSuccess = (response) => ({
		actionType: FinancialStoriesConstants.TRANSACTION_DATE_RANGE_LIST_SUCCESS,
		data: response,
	})
	let handleTransactionHistoryListSuccess = (response) => ({
		action: {
			actionType: FinancialStoriesConstants.TRANSACTION_LIST_SUCCESS,
			data: response,
		}
	})
	let handleTransactionSearchListSuccess = (response) => ({
		action: {
			actionType: FinancialStoriesConstants.TRANSACTION_SEARCH_TEXT_SUCCESS,
			data: response,
		}
	})
	let handleCreateTagSuccess = (response) => ({
		action: {
			actionType: FinancialStoriesConstants.CREATE_NEW_TAG_SUCCESS,
			data: response,
		}
	})
	let handleCreateUpdateTagError = (response, data) => ({
		action: {
			actionType: FinancialStoriesConstants.CREATE_UPDATE_NEW_TAG_ERROR,
			response: response,
			data: data,
		}
	})
	let handleDeleteTagSuccess = (response) => ({
		action: {
			actionType: FinancialStoriesConstants.DELETE_TAG_REQUEST_SUCCESS,
			data: response,
		}
	})
	let handleAssignTagSuccess = (response) => ({
		action: {
			actionType: FinancialStoriesConstants.ASSIGN_TAG_REQUEST_SUCCESS,
			data: response,
		}
	})
	let handleUpdateTagSuccess = (response) => ({
		action: {
			actionType: FinancialStoriesConstants.UPDATE_TAG_REQUEST_SUCCESS,
			data: response,
		}
	})
	let handleInOutTransactionSuccess = (response) => ({
		action: {
			actionType: FinancialStoriesConstants.IN_OUT_REQUEST_SUCCESS,
			data: response,
		}
	})
	let handleFSTransactionTileError = (response, status, tileType) => ({
		action: {
			actionType: FinancialStoriesConstants.FINANCIAL_STORIES_TRANSACTION_TILE_ERROR,
			data: response,
			status: status,
			tileType: tileType,
		}
	})
	let handleFSProjectionTourDone = () => ({
		action: {
			actionType: FinancialStoriesConstants.PROJECTION_TOUR_DONE_SUCESS,
		}
	})
	describe('get tag functions', () => {
		it('should make api call', () => {
			callback(getTagsList());
			let result = FinancialStoriesStore.getState();
            expect(FinancialStoriesApiUtils.getTagsList.mock.calls.length).toEqual(4);
			FinancialStoriesStore.getOverDraftAmount();
        });
    });
    describe('handleUpdateFSTileClick', () => {
		it('should be equal to null call', () => {
			callback(handleUpdateFSTileClick());
			let result = FinancialStoriesStore.getState();
            expect(result.fsTileClick).toBe(null);
        })
    })
    describe('handleUpdateFSTagAssignment', () => {
		it('should be equal to false', () => {
			callback(handleUpdateFSTagAssignment());
			let result = FinancialStoriesStore.getAssignTagResponse();
            expect(result).toBeFalsy();
        })
    })

    describe('Api call to setAccountHelp', () => {
        callback(setAccountHelp(123));
        let result = FinancialStoriesStore.getAccountHelpOpen();
        it('should getCurrentAccountId data', () => {
            expect(result).toEqual(123);
        });
    });
    describe('Api call to createTag', () => {
        callback(createTag(123));
        let result = FinancialStoriesStore.getState();
        it('should getCurrentAccountId data', () => {
            expect(FinancialStoriesApiUtils.createNewTag.mock.calls[0][0]).toEqual(123);
        });
    });
    describe('Api call to updateTag', () => {
        callback(updateTag(123));
        let result = FinancialStoriesStore.getState();
        it('should getCurrentAccountId data', () => {
            expect(FinancialStoriesApiUtils.updateTag.mock.calls.length).toEqual(1);
        });
    });
    describe('Api call to handleCreateTagSuccess', () => {
		callback(handleCreateTagSuccess(['tag']));
        let result = FinancialStoriesStore.responseForTag();
        it('should make API Call', () => {
            expect(result).toEqual(['tag']);
        });
    });
    describe('Api call to transactionSearchTextList', () => {
        callback(transactionSearchTextList('tag'));
        let result = FinancialStoriesStore.getState();
        it('should make API Call', () => {
            expect(FinancialStoriesApiUtils.getTransactionSearchTextList.mock.calls.length).toEqual(1);
        });
    });
    describe('Api call to transactionSearchTextList', () => {
        callback(getTransactionSearchList('tag'));
        let result = FinancialStoriesStore.getState();
        xit('should make API Call', () => {
            expect(TransactionHistoryApiUtils.getTransactionHistorySearchList.mock.calls.length).toEqual(1);
        });
        callback(getTransactionSearchList(''));
        xit('should make API Call', () => {
			expect(TransactionHistoryApiUtils.getTransactionHistorySearchList.mock.calls.length).toEqual(1);
        });
    });
    describe('Api call to getTransactionDateRangeList', () => {
        callback(getTransactionDateRangeList('2016-06-16'));
        let result = FinancialStoriesStore.getState();
        it('should make API Call', () => {
            expect(FinancialStoriesApiUtils.getTransactionSearchTextList.mock.calls.length).toEqual(1);
        });
    });
    describe('Api call to deleteTag', () => {
        callback(deleteTag('Tag'));
        let result = FinancialStoriesStore.getState();
        it('should make API Call', () => {
            expect(FinancialStoriesApiUtils.deleteTag.mock.calls.length).toEqual(1);
        });
    });
    describe('Api call to assignTag', () => {
        callback(assignTag('Tag'));
        let result = FinancialStoriesStore.getState();
        it('should make API Call', () => {
            expect(FinancialStoriesApiUtils.assignTag.mock.calls.length).toEqual(1);
        });
    });
    describe('Api call to getMicroTransaction', () => {
		let fsData = {
			date_lower_bound: '2013-05-28T13:00:00.000+01:00',
			date_upper_bound: '2016-05-28T13:00:00.000+01:00',
			tileType: FinancialStoriesConstants.microTransactions,

		}
        callback(getMicroTransaction(fsData));
        let result = FinancialStoriesStore.getState();
        it('should make API Call', () => {
            expect(FinancialStoriesApiUtils.getMicroTransactions.mock.calls.length).toEqual(1);
        });
    });
    describe('Api call to getCashPointTransaction', () => {
		let fsData = {
			date_lower_bound: '2013-05-28T13:00:00.000+01:00',
			date_upper_bound: '2016-05-28T13:00:00.000+01:00',
			tileType: FinancialStoriesConstants.cashpoint,

		}
        callback(getCashPointTransaction(fsData));
        let result = FinancialStoriesStore.getState();
        it('should make API Call', () => {
            expect(FinancialStoriesApiUtils.getCashPointTransactions.mock.calls.length).toEqual(1);
        });
    });
    describe('Api call to getInOutTransactions', () => {
		let fsData = {
			date_lower_bound: '2013-05-28T13:00:00.000+01:00',
			date_upper_bound: '2016-05-28T13:00:00.000+01:00',
			tileType: FinancialStoriesConstants.insAndOuts,

		}
        callback(getInAndOutTransaction(fsData));
        let result = FinancialStoriesStore.getState();
        it('should make API Call', () => {
            expect(FinancialStoriesApiUtils.getInOutTransactions.mock.calls.length).toEqual(1);
        });
    });
    describe('handleMicroTransactionSuccess', () => {
		let response = {
			success: 200,
		}
		callback(handleMicroTransactionSuccess(response));
        let result = FinancialStoriesStore.getMicroTileData();
        it('should make API Call', () => {
            expect(result).toEqual(response);
        });
    });

	describe('handleMicroTransactionSuccess', () => {
		let response = {
			success: 200,
		}
		callback(handleMicroTransactionSuccess(null));
        it('should make API Call', () => {

        });
    });

    describe('handleCashPointTransactionSuccess', () => {
		let response = {
			success: 200,
		}
		callback(handleCashPointTransactionSuccess(response));
        let result = FinancialStoriesStore.getCashPointData();
        it('should make API Call', () => {
            expect(result).toEqual(response);
        });
    });

	describe('handleCashPointTransactionSuccess where data = null', () => {
		let response = {
			success: 200,
		}
		callback(handleCashPointTransactionSuccess(null));
        let result = FinancialStoriesStore.getCashPointData();
        it('should make API Call', () => {
        });
    });

    describe('resetTransactionSearchText', () => {
		let response = {
			success: 200,
		}
		callback(resetTransactionSearchText(response));
        let result = FinancialStoriesStore.getState();
        it('should make API Call', () => {
            // expect(result.searchItem).toEqual('');
        });
    });
    describe('handleTagsListSuccess', () => {
		let response = {
			success: 200,
		}
		callback(handleTagsListSuccess(response));
        let result = FinancialStoriesStore.getTags();
        let result2 = FinancialStoriesStore.getTagLoadStatus();
        it('should be equal to result', () => {
            expect(result).toEqual(response);
        });
        it('should be true', () => {
			expect(result2).toBeTruthy();
        })
	});

	describe('handleFinancialStoriesTile', () => {
		let response = {
			fsTileClick: 200,
		}
		callback(handleFinancialStoriesTile(response));
        let result = FinancialStoriesStore.getState();
        it('should make API Call', () => {
            expect(result.fsTileClick).toEqual(null);
        });
    });

	describe('handleFinancialStoriesTile for case = microTransactions', () => {
		let response = {
			fsTileClick: 200,
		}
		callback(handleFinancialStoriesTile('microTransactions'));
		// let result = FinancialStoriesStore.getState();
        xit('should make API Call', () => {
            expect(result.fsTileClick).toEqual(null);
        });
    });

	describe('handleFinancialStoriesTile for case = microTransactions', () => {
		let response = {
			fsTileClick: 200,
		}
		callback(handleFinancialStoriesTile('projection'));
		// let result = FinancialStoriesStore.getState();
        xit('should make API Call', () => {
            expect(result.fsTileClick).toEqual(null);
        });
    });

    describe('handleUpdateTagSuccess', () => {
		let response = {};
		callback(handleUpdateTagSuccess(response));
        it('should make API Call', () => {
            expect(FinancialStoriesApiUtils.getTagsList.mock.calls.length).toEqual(4);
        });
    });
    describe('handleAssignTagSuccess', () => {
		let response = {};
		callback(handleAssignTagSuccess(response));
		let result = FinancialStoriesStore.getAssignTagResponse();
        it('should make API Call', () => {
            expect(result).toBeTruthy();
        });
    });
    describe('handleDeleteTagSuccess', () => {
		let response = {
			tag: 'delete'
		};
		callback(handleDeleteTagSuccess(response));
		let result = FinancialStoriesStore.getAssignTagResponse();
        let result2 = FinancialStoriesStore.responseFordeleteTag();
        it('should be false', () => {
            expect(result).toBeFalsy();
        });
        it('should be equal to response', () => {
            expect(result2).toEqual(response);
        });
    });
    describe('handleCreateUpdateTagError', () => {
		let response = {};
		let data = true;
		callback(handleCreateUpdateTagError(response, data));
		let result = FinancialStoriesStore.getCreateUpdateTagError();
        it('should be true', () => {
            expect(result).toBeTruthy();
        });
    });
    describe('handleTransactionSearchListSuccess', () => {
		let response = {
			"suggest": [{
	               "options": [{
					"score": 0.239,
					"text": "Mortgage"
				}
				]
			}
			]
		};
		callback(handleTransactionSearchListSuccess(response));
		let result = FinancialStoriesStore.getPopupState();
        it('should be true', () => {
            expect(result).toBeTruthy();
        });
    });
    describe('handleTransactionHistoryListSuccess', () => {
		let response = {
			"hits": {
				"total": 58,
				"hits": [
					{
						"_source": {
							"id": "1f151124-966c-4e51-944e-373c906065c5",
							"ordinal": "1",
							"this_account": {
								"id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
								"type": "current",
								"product": {
									"code": "901",
									"name": "B Current Account",
									"description": "Current Account"
								},
								"actions_available": {
									"/account/pots": false,
									"/account/alerts": true,
									"/account/projections": true,
									"/account/sweeps": true,
									"/account/sweeps/transfer/out": false,
									"/account/transactions/read": true,
									"/account/payments/transfer/in": true,
									"/account/payments/transfer/out": true,
									"/account/payments/uk/default/out": true,
									"/account/mandates/so/read": true,
									"/account/mandates/dd/read": true,
									"/account/mandates/so/write": true,
									"/account/mandates/dd/write": true
								},
								"bank_id": "CB",
								"sort_code": "654321",
								"number": "12345678",
								"metadata": {
									"display_name": "B Current"
								}
							},
							"details": {
								"type": "ATM",
								"posted": true,
								"when": "2016-05-27T15:00:00.000+01:00",
								"amount": {
									"value": -50.0,
									"currency": "GBP"
								},
								"balances": {
									"current": {
										"value": 4093.94,
										"currency": "GBP"
									}
								},
								"narrative": {
									"small": "Card 01, Cash Machine Network abcdefghijklmnopqrstuvwxyz",
									"medium": "Card 01, Cash Machine Network abcdefghijklmnopqrstuvwxyz",
									"large": "Card 01, Cash Machine Network abcdefghijklmnopqrstuvwxyz"
								}
							},
							"metadata": {
								"tags": [

								],
								"categories": [
									{
										"value": "Untagged",
										"path": "/untagged",
										"scheme": "NAG Categories",
										"id": 19,
										"archived": false
									}
								],
								"where": {
									"city": "Glasgow"
								}
							}
						}
					}
				]
			}
		};
		callback(handleTransactionHistoryListSuccess(response));
		let result = FinancialStoriesStore.getLoadStatus();
        it('should be true', () => {
            expect(result).toBeTruthy();
        });
    });
    xdescribe('getTransactionHistorySortList', () => {
		let data = 'desc';
		callback(getTransactionHistorySortList(data));
		let result = FinancialStoriesStore.getCreateUpdateTagError();
        it('should make API Call', () => {
            expect(TransactionHistoryApiUtils.getTransactionHistorySearchList.mock.calls.length).toBe(1);
        });
    });
    xdescribe('getTransactionHistoryList', () => {
		let data = 'all';
		let data1 = 'moneyin';
		let data2 = 'moneyout';
		let data3 = 'repeating';
		let data4 = '';
		TransactionHistoryApiUtils.getTransactionHistoryList.mockClear();
		callback(getTransactionHistoryList(data));
		it('should make API Call', () => {
            expect(TransactionHistoryApiUtils.getTransactionHistoryList.mock.calls.length).toBe(2);
        });
        TransactionHistoryApiUtils.getTransactionHistoryList.mockClear();
        callback(getTransactionHistoryList(data1));
		it('should make API Call', () => {
            expect(TransactionHistoryApiUtils.getTransactionHistoryList.mock.calls.length).toBe(2);
        });
        TransactionHistoryApiUtils.getTransactionHistoryList.mockClear();
        callback(getTransactionHistoryList(data2));
		it('should make API Call', () => {
            expect(TransactionHistoryApiUtils.getTransactionHistoryList.mock.calls.length).toBe(2);
        });
        TransactionHistoryApiUtils.getTransactionHistoryList.mockClear();
        callback(getTransactionHistoryList(data3));
		it('should make API Call', () => {
            expect(TransactionHistoryApiUtils.getTransactionHistoryList.mock.calls.length).toBe(2);
        });
        TransactionHistoryApiUtils.getTransactionHistoryList.mockClear();
        callback(getTransactionHistoryList(data4));
		it('should make API Call', () => {
            expect(TransactionHistoryApiUtils.getTransactionHistoryList.mock.calls.length).toBe(2);
        });
    });
    xdescribe('tabSelect', () => {
		let data = 'all';
		TransactionHistoryApiUtils.getTransactionHistoryList.mockClear();
		callback(tabSelect(data));
		it('should make API Call', () => {
            expect(TransactionHistoryApiUtils.getTransactionHistorySearchList.mock.calls.length).toBe(1);
        });
    });
    describe('handleAccountDetailsSuccess', () => {
		let data = {
			"id": "05985dae-d2de-4ebc-ab0a-79093081bde5",
			"product": {
				"code": "901",
				"name": "Personal Loan",
				"description": "Personal Loan"
			},
			"actions_available": {
				"/account/pots": true,
				"/account/alerts": true,
				"/account/projections": true,
				"/account/sweeps": true,
				"/account/sweeps/transfer/out": true,
				"/account/transactions/read": true,
				"/account/payments/transfer/in": true,
				"/account/payments/transfer/out": true,
				"/account/payments/uk/default/out": true,
				"/account/mandates/so/read": true,
				"/account/mandates/dd/read": true,
				"/account/mandates/so/write": true,
				"/account/mandates/dd/write": true
			},
			"limits": [
				{
					"type": "credit",
					"amount": {
						"value": 5000.0,
						"currency": "GBP"
					}
				}
			],
			"bank_id": "CB",
			"number": "650000-22446699",
			"metadata": {
				"display_name": "Loan Account"
			},
			"owners": [
				{
					"id": "2",
					"provider": "CB",
					"display_name": "Bob Brown"
				}
			],
			"balances": [
				{
					"type": "current",
					"amount": {
						"value": 7178.06,
						"currency": "GBP"
					},
					"at": "2016-05-16T15:07:50.315+00:00"
				}
			]
		};
		let accountType = 'current';
		let accountType2 = 'CREDIT_CARD';
		let accountNumber = '650000-22446699';
       	let colorIndex = 6;
       	let response = {
			fsData1: FinancialStoriesConstants.microTransactions,
			fsData2: FinancialStoriesConstants.insAndOuts,
			fsData3: FinancialStoriesConstants.cashpoint,
			fsData4: FinancialStoriesConstants.projection,
       	};
       	FinancialStoriesApiUtils.getFinancialStoriesConnection.mockClear();
       	TransactionHistoryApiUtils.getTransactionHistoryList.mockClear();
		callback(getAccountDetails(accountNumber, accountType, colorIndex));
        callback(handleAccountDetailsSuccess(data, accountType));

        let overDraft = 5000;
        let result = FinancialStoriesStore.getOverDraftAmount()

		it('should be equal to result', () => {
            expect(result).toEqual(overDraft);
        });
        FinancialStoriesApiUtils.getFinancialStoriesConnection.mockClear();
        callback(getFinancialStoriesConnection(response.fsdata1));
        it('should make API Call', () => {
            expect(FinancialStoriesApiUtils.getFinancialStoriesConnection.mock.calls.length).toEqual(1);
        });
        FinancialStoriesApiUtils.getFinancialStoriesConnection.mockClear();
        callback(getFinancialStoriesConnection(response.fsdata2));
        it('should make API Call', () => {
            expect(FinancialStoriesApiUtils.getFinancialStoriesConnection.mock.calls.length).toEqual(1);
        });
        FinancialStoriesApiUtils.getFinancialStoriesConnection.mockClear();
		callback(getFinancialStoriesConnection(response.fsdata3));
        it('should make API Call', () => {
            expect(FinancialStoriesApiUtils.getFinancialStoriesConnection.mock.calls.length).toEqual(1);
        });
        FinancialStoriesApiUtils.getFinancialStoriesConnection.mockClear();
		callback(getFinancialStoriesConnection(response.fsdata1));
        it('should make API Call', () => {
            expect(FinancialStoriesApiUtils.getFinancialStoriesConnection.mock.calls.length).toEqual(1);
        });
        callback(getAccountDetails(accountNumber, accountType2, colorIndex));
        callback(handleAccountDetailsSuccess(data, accountType2));
        overDraft = 5000;
        result = FinancialStoriesStore.getOverDraftAmount();
		it('should be equal to result', () => {
            expect(result).toEqual(overDraft);
        });
        let result2 = FinancialStoriesStore.getCurrentAccountId();
        it('should be equal to accountNumber', () => {
            expect(result2).toEqual(accountNumber);
        });
        FinancialStoriesStore.setAccountId('12345');
        let result3 = FinancialStoriesStore.getCurrentAccountId();
        it('should be equal to accountNumber', () => {
            expect(result3).toEqual('12345');
        });
    });

	///////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	xdescribe('getUnavailableProjection ', () => {
		it('getUnavailableProjection ', () => {
			let projection = {
				metadata: {
					available_days: 10,
					required_days: 10,
				},
			};
			let status = 404;
			FinancialStoriesStore.getUnavailableProjection(projection,status);
		});
	});

	describe('handleAccountDetailsSuccess providing _state.accountDetails', () => {
		let data = {
			"id": "05985dae-d2de-4ebc-ab0a-79093081bde5",
			"product": {
				"code": "901",
				"name": "Personal Loan",
				"description": "Personal Loan"
			},
			"actions_available": {
				"/account/pots": true,
				"/account/alerts": true,
				"/account/projections": true,
				"/account/sweeps": true,
				"/account/sweeps/transfer/out": true,
				"/account/transactions/read": true,
				"/account/payments/transfer/in": true,
				"/account/payments/transfer/out": true,
				"/account/payments/uk/default/out": true,
				"/account/mandates/so/read": true,
				"/account/mandates/dd/read": true,
				"/account/mandates/so/write": true,
				"/account/mandates/dd/write": true
			},
			"limits": [
				{
					"type": "credit",
					"amount": {
						"value": 5000.0,
						"currency": "GBP"
					}
				}
			],
			"bank_id": "CB",
			"number": "650000-22446699",
			"metadata": {
				"display_name": "Loan Account"
			},
			"owners": [
				{
					"id": "2",
					"provider": "CB",
					"display_name": "Bob Brown"
				}
			],
			"balances": [
				{
					"type": "current",
					"amount": {
						"value": 7178.06,
						"currency": "GBP"
					},
					"at": "2016-05-16T15:07:50.315+00:00"
				}
			]
		};
		callback(handleAccountDetailsSuccess(data, 'current'));
		callback(getTransactionSearchList('tag'));
		callback(getTransactionSearchList(''));

		it('handleAccountDetailsSuccess ', () => {
			let dateRange = {
				startDate: '1 week',
				endDate: '2016-06-16',
			}
			callback(getTransactionDateRangeList(dateRange));
		});

		it('handleAccountDetailsSuccess ', () => {
			let dateRange = {
				startDate: '2 weeks',
				endDate: '2016-06-16',
			}
			callback(getTransactionDateRangeList(dateRange));
		});

		it('handleAccountDetailsSuccess ', () => {
			let dateRange = {
				startDate: '1 month',
				endDate: '2016-06-16',
			}
			callback(getTransactionDateRangeList(dateRange));
		});

		it('handleAccountDetailsSuccess ', () => {
			let dateRange = {
				startDate: '3 months',
				endDate: '2016-06-16',
			}
			callback(getTransactionDateRangeList(dateRange));
		});

		it('handleAccountDetailsSuccess ', () => {
			let dateRange = {
				startDate: '6 months',
				endDate: '2016-06-16',
			}
			callback(getTransactionDateRangeList(dateRange));
		});
	});

	describe('getAccountDetails', () => {
		let accountNumber = '12345678';
		let accountType = 'current';
		let colorIndex = 6;
		FinancialStoriesApiUtils.getAccountDetails.mockClear();
		callback(getAccountDetails(accountNumber, accountType, colorIndex));
		let result = FinancialStoriesStore.getAccountColorIndex()
		xit('should make API Call', () => {
			expect(FinancialStoriesApiUtils.getAccountDetails.mock.calls.length).toEqual(1);
		});
		it('should make API Call', () => {
			expect(result).toEqual(6);
		});

	});
	describe('handleFSTransactionListSuccess', () => {
		let fsData = {
			"aggregations": {
				"debit": {
					"doc_count": 2,
					"filtered_by_date": {
						"buckets": [
							{
								"doc_count": 1,
								"key": "8",
								"monthly_spend": {
									"avg": -50.0,
									"min": -50.0,
									"count": 1,
									"max": 0,
									"sum": -50.0
								},
								"key_as_string": "2016-07-01T00:00:00.000+01:00",
								"most_popular_transaction": {
									"buckets": [
										{
											"key": -50.0,
											"doc_count": 1
										}
									]
								}
							},
							{
								"doc_count": 1,
								"key": "8",
								"monthly_spend": {
									"avg": -10.0,
									"min": -10.0,
									"count": 1,
									"max": 0,
									"sum": -10.0
								},
								"key_as_string": "2016-07-01T00:00:00.000+01:00",
								"most_popular_transaction": {
									"buckets": [
										{
											"key": -10.0,
											"doc_count": 1
										}
									]
								}
							}
						]
					}
				},
				"credit": {
					"doc_count": 0,
					"filtered_by_date": {
						"buckets": [

						]
					}
				},
				"totals_of_debit_and_credits": {
					"doc_count": 2,
					"filtered_by_date": {
						"buckets": [
							{
								"doc_count": 1,
								"key": "8",
								"monthly_spend": {
									"avg": -50.0,
									"min": -50.0,
									"count": 1,
									"max": 0,
									"sum": -50.0
								},
								"key_as_string": "2016-07-01T00:00:00.000+01:00",
								"most_popular_transaction": {
									"buckets": [
										{
											"key": -50.0,
											"doc_count": 1
										}
									]
								}
							},
							{
								"doc_count": 1,
								"key": "8",
								"monthly_spend": {
									"avg": -10.0,
									"min": -10.0,
									"count": 1,
									"max": 0,
									"sum": -10.0
								},
								"key_as_string": "2016-04-01T00:00:00.000+01:00",
								"most_popular_transaction": {
									"buckets": [
										{
											"key": -10.0,
											"doc_count": 1
										}
									]
								}
							}
						]
					}
				}
			}
		};
		let fsData1 = {
			"aggregations": {
				"debit": {
					"doc_count": 0,
					"filtered_by_date": {
						"buckets": []
					}
				},
				"credit": {
					"doc_count": 0,
					"filtered_by_date": {
						"buckets": []
					}
				},
				"totals_of_debit_and_credits": {
					"doc_count": 0,
					"filtered_by_date": {
						"buckets": []
					}
				}
			}
		};
		let projectionData = {
			"last_updated": "2016-05-16T16:07:50.074+01:00",
			"thresholds": {
				"lower": {
					"amount": {
						"value": 50.0,
						"currency": "GBP"
					}
				}
			},
			"projection_periods": [
				{
					"period": {
						"from": {
							"date": "2016-05-16T00:00:00.000+01:00",
							"available_balance": {
								"value": 4093.94,
								"currency": "GBP"
							}
						},
						"to": {
							"date": "2016-05-10T23:59:59.000+01:00",
							"available_balance": {
								"value": 4093.94,
								"currency": "GBP"
							}
						}
					},
					"warning_days": [

					],
					"earnings": [

					],
					"projected_transactions": {
						"transactions": [
							{
								"display_name": "UK Gas Co",
								"amount": {
									"value": -45.0,
									"currency": "GBP"
								}
							}
						],
						"total_amount": {
							"value": -699.35,
							"currency": "GBP"
						}
					},
					"essential_spend_info": {
						"essential_spend": [
							{
								"amount": {
									"value": -439.13,
									"currency": "GBP"
								},
								"display_name": "Shoes"
							},
							{
								"amount": {
									"value": -910.28,
									"currency": "GBP"
								},
								"display_name": "Untagged"
							},
							{
								"amount": {
									"value": -49.79,
									"currency": "GBP"
								},
								"display_name": "Style"
							},
						],
						"total_amount": {
							"value": -3021.82,
							"currency": "GBP"
						}
					}
				}
			]
		};
		let tileType = FinancialStoriesConstants.microTransactions;
		let tileType1 = FinancialStoriesConstants.cashpoint;
		let tileType2 = FinancialStoriesConstants.insAndOuts;
		let tileType3 = FinancialStoriesConstants.projection;

		let status = 200;
		callback(handleFSTransactionListSuccess(fsData, status, tileType));
		it('should make API Call', () => {
			expect(status).toEqual(200);
		});
		callback(handleFSTransactionListSuccess(fsData, status, tileType1));
		it('should make API Call', () => {
			expect(status).toEqual(200);
		});
		callback(handleFSTransactionListSuccess(fsData, status, tileType2));
		it('should make API Call', () => {
			expect(status).toEqual(200);
		});
		callback(handleFSTransactionListSuccess(fsData1, status, tileType));
		it('should make API Call', () => {
			expect(status).toEqual(200);
		});
		callback(handleFSTransactionListSuccess(fsData1, status, tileType1));
		it('should make API Call', () => {
			expect(status).toEqual(200);
		});
		callback(handleFSTransactionListSuccess(fsData1, status, tileType2));
		it('should make API Call', () => {
			expect(status).toEqual(200);
		});
		callback(handleFSTransactionListSuccess(projectionData, status, tileType3));
		it('should make API Call', () => {
			expect(status).toEqual(200);
		});

	});
	describe('handleInOutTransactionSuccess', () => {
		let data = {
			inAndOuts: 'values'
		};
		callback(handleInOutTransactionSuccess(data));
		let result = FinancialStoriesStore.getInOutData();
		it('should make API Call', () => {
			expect(result).toBe(data);
		});
	});
	describe('handleFSTransactionTileError', () => {
		let response = {
			error: 'Something went wrong'
		};
		let status = 404;
		let tileType = FinancialStoriesConstants.microTransactions;
		let tileType1 = FinancialStoriesConstants.cashpoint;
		let tileType2 = FinancialStoriesConstants.insAndOuts;
		let tileType3 = FinancialStoriesConstants.projection;

		callback(handleInOutTransactionSuccess(response, status, tileType));
		let result = FinancialStoriesStore.getState();
		it('should be false', () => {
			expect(result.fSConnectionData.microClickable).toBeFalsy();
		});

		callback(handleInOutTransactionSuccess(response, status, tileType1));
		result = FinancialStoriesStore.getState();
		it('should be false', () => {
			expect(result.fSConnectionData.cashClickable).toBeFalsy();
		});

		callback(handleInOutTransactionSuccess(response, status, tileType2));
		result = FinancialStoriesStore.getState();
		it('should be false', () => {
			expect(result.fSConnectionData.inandoutClickable).toBeFalsy();
		});

		callback(handleInOutTransactionSuccess(response, status, tileType3));
		result = FinancialStoriesStore.getState();
		let output = { title: "Great news, looks like you'll be in the green 'til payday.", footer: "Go to Projections" };
		it('should be equal to output', () => {
			expect(result.fSConnectionData.projection).toEqual(output);
		});
	});
	xdescribe('handleFSProjectionTourDone', () => {
		callback(handleFSProjectionTourDone());
		let result = FinancialStoriesStore.getProjectionData();
		it('should be blank', () => {
			expect(result).toEqual({ isCrunching: true });
		});
	});
	describe('addChangeListener', () => {
		const props = {
			content: {

			},
		};
		it('calls for the addChangeListener', () => {

			FinancialStoriesStore.addChangeListener(jest.fn())
			expect(EventEmitter.listenerCount.length).toBe(2);
		});
	});
	describe('removeChangeListener', () => {
		const props = {
			content: {

			},
		};
		it('calls for the removeChangeListener', () => {
			let node = document.createElement('div');

			const render = (comp, el) => ReactDOM.render(comp, el);

			FinancialStoriesStore.removeChangeListener(jest.fn())

			expect(EventEmitter.listenerCount.length).toBe(2);
		});
	});

	describe('MATCHALL_FOR_DROPDOWN_SUCCESS', () => {
		let data = {
			inAndOuts: 'values'
		};
		callback(handleMatchallForDropdownSuccess(data));
		let result = FinancialStoriesStore.getMatchAllForDropDown();
		it('should make API Call', () => {
			expect(result).toBe(data);
		});
	});

	describe('getInsAndOuts', () => {
		let data = {
			inAndOuts: 'values'
		};
		callback(getInsAndOuts());

		it('should make API Call', () => {
			// expect(result).toBe(data);
		});
	});

	describe('handleFSTransactionTileError', () => {
		let data = {
			inAndOuts: 'values'
		};
		let status = 'status';
		let tileType = 'tileType';
		callback(handleFSTransactionTileError(data, status, tileType));

		it('should make API Call', () => {
			// expect(result).toBe(data);
		});
	});

	describe('getTransactionHistoryPageList', () => {
		let data = {
			inAndOuts: 'values'
		};
		callback(getTransactionHistoryPageList(data));

		it('should make API Call', () => {
			// expect(result).toBe(data);
		});
	});


	describe('PROJECTION_SETTING_CLICKED', () => {
		let data = {
			inAndOuts: 'values'
		};
		callback(getProjectionSettingsClicked());
		FinancialStoriesStore.setLoadingStatus();
		FinancialStoriesStore.getAssignTagStatus();
		FinancialStoriesStore.getCancelButtonFlag();
		FinancialStoriesStore.getCreateUpdateErrorId();
		FinancialStoriesStore.getFromDate();
		FinancialStoriesStore.getToDate();

		let result = FinancialStoriesStore.getOnLoad();
		it('should make API Call', () => {
			expect(result).toBe(false);
		});
	});

	describe('getAccountsList', () => {
		let data = {
			inAndOuts: 'values'
		};
		AccountsStore.getAll.mockReturnValue({
			accounts: [
				{
					id: 1,
					type: 'type',
					metadata: {
						display_name: 'metadata.display_name',
					},
					product: {
						name: 'name',
					}
				}
			]
		})

		AccountsStore.getAccountDetail.mockReturnValue({ type: 'type', });

		callback(getAccountsList());
		FinancialStoriesStore.setLoadingStatus();
		it('should make API Call', () => {
			// expect(result).toBe(false);
		});
	});

	describe('default', () => {
		callback(getDefault());
		it('should cover default case', () => {

		});

	});
})

// callback(getTransactionSearchList('tag'));