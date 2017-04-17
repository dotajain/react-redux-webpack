/**
 * @module TransactionsStore
 */

const AppDispatcher = require('../dispatcher/AppDispatcher');
const assign = require('object-assign');
const EventEmitter = require('events').EventEmitter;
const TimelineConstants = require('../constants/TimelineConstants');
const AccountConstants = require('../constants/AccountConstants');
const TimelineApiUtils = require('../utils/TimelineApiUtils');

const DateUtils = require('../utils/DateUtils');

const _ = require('lodash');
const CHANGE_EVENT = 'change';
let _transactionList = [];
let _transactionSearchSuggestion = [];
let _transactionSearchText = '';
let _popupState = false;
let _activeKey = 1;
let _fetchTransactions = [];
let _searchTransactionList = [];
let _onSearchTransactions = false;
let _loadTransactions = false;
let _loadSearchTransactions = false;
let _fromTransactionIndex = 0;
let _fromSearchTransactionIndex = 0;
let _dates = [];
let _transactionsLoadSuccess = false;

const TransactionsStore = assign({}, EventEmitter.prototype, {
	emitChange() {
		this.emit(CHANGE_EVENT);
	},

	/**
	* @param {function} callback
	*/
	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	/**
	 * Allow views to unbind listeners before dismounting.
	 *
	 * @param  {Function} callback    Function to unbind.
	 */
	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},
	// to get all the transaction list

	getTransactionsList() {
		return _transactionList;
	},
	// to get search suggestion of transactions
	getTransactionSearchSuggestion() {
		return _transactionSearchSuggestion;
	},
	// get the transaction of searched text
	getTransactionSearchText() {
		return _transactionSearchText;
	},
	// get the state of popup
	getPopupState() {
		return _popupState;
	},
	getActiveKey() {
		return _activeKey;
	},

	getTransactionLoad() {
		return _loadTransactions;
	},

	getSearchTransactionLoad() {
		return _loadSearchTransactions;
	},

	getTransactionsLoadSuccess() {
		return _transactionsLoadSuccess;
	},

	resetStore() {
		_transactionsLoadSuccess = false;
		_activeKey = 1;
		_transactionList = [];
		_searchTransactionList = [];
		_fromTransactionIndex = 0;
		_dates = [];
		_fromSearchTransactionIndex = 0;
		_transactionSearchText = '';
		_loadTransactions = false;
		_loadSearchTransactions = false;
		_onSearchTransactions = false;
		_popupState = false;
	},
});

TransactionsStore.dispatchToken = AppDispatcher.register(payload => {
	const action = payload.action;

	switch (action.actionType) {
		case TimelineConstants.REQUEST_TRANSACTION_LIST:
			_activeKey = 2;
			_onSearchTransactions = false;
			TimelineApiUtils.getTransactionsList(_fromTransactionIndex);
			_fromTransactionIndex = _fromTransactionIndex + 25;
			break;

		case TimelineConstants.RESET_SEARCH_INFO:
			if (action.data.isSearchTextReset) {
				_transactionSearchText = '';
				if (action.data.close) {
					TransactionsStore.resetStore();
				} else {
					TransactionsStore.emitChange();
				}
			}
			if (action.data.isPopupOpenReset) {
				_popupState = false;
				TransactionsStore.emitChange();
			}
			break;

		case TimelineConstants.REQUEST_TRANSACTION_LIST_SUCCESS:
			_fetchTransactions = [];
			action.data.hits.hits.map(hit => {
				const when = DateUtils.getShortStringFromHTML5Date(hit._source.details.when);
				if (_.find(_dates, { date: when })) {
					hit._source.details.when = '';
				} else {
					const data = {
						date:when,
					};
					_dates.push(data);
				}
				_fetchTransactions.push(hit);
				// return false;
			});
			if (_onSearchTransactions) {
				_transactionList = [];
				_loadTransactions = false;
				_loadSearchTransactions = _fetchTransactions.length < 25 ? false : true;
				_searchTransactionList = _.concat(_searchTransactionList, _fetchTransactions);
				_transactionList = _searchTransactionList;
			} else {
				_loadTransactions = _fetchTransactions.length < 25 ? false : true;
				_transactionList = _.concat(_transactionList, _fetchTransactions);
			}
			_transactionsLoadSuccess = true;
			TransactionsStore.emitChange();
			break;

		case TimelineConstants.REQUEST_TRANSACTION_LIST_ERROR:
			if (!action.data.isSearchSuggetionError) {
				_transactionList = [];
				_transactionsLoadSuccess = true;
				TransactionsStore.emitChange();
			}
			break;

		case TimelineConstants.REQUEST_SEARCH_TRANSACTION_SUGGEST:
			_activeKey = 2;
			_transactionSearchText = action.data;
			_fromSearchTransactionIndex = 0;
			_searchTransactionList = [];
			TimelineApiUtils.getTransactionsSearchSuggestion(_transactionSearchText);
			break;

		case TimelineConstants.REQUEST_SEARCH_TRANSACTION_SUGGEST_SUCCESS:
			if (action.data.suggest) {
				_transactionSearchSuggestion = action.data.suggest[0].options;
				_popupState = _transactionSearchSuggestion.length ? true : false;
				TransactionsStore.emitChange();
			}
			break;

		case TimelineConstants.REQUEST_SEARCH_TRANSACTION_DATA:
			_activeKey = 2;
			_popupState = false;
			_onSearchTransactions = true;
			_dates = [];
			if (action.data.text !== _transactionSearchText) {
				_searchTransactionList = [];
				_fromSearchTransactionIndex = 0;
			}
			if (action.data.text) {
				_transactionSearchText = action.data.text;
				TimelineApiUtils.getTransactionSearchData(action.data, _fromSearchTransactionIndex);
				_fromSearchTransactionIndex = _fromSearchTransactionIndex + 25;
			}
			break;

		case AccountConstants.REQUEST_ACCOUNTS_LIST_SUCCESS:
			// console.log('Transactions Store');
			TransactionsStore.resetStore();
			TimelineApiUtils.getTransactionsList(_fromTransactionIndex);
			_fromTransactionIndex = _fromTransactionIndex + 25;
			break;
	}
});

module.exports = TransactionsStore;
