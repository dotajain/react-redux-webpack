const AppDispatcher = require('../dispatcher/AppDispatcher');
const assign = require('object-assign');
const EventEmitter = require('events').EventEmitter;

const SavingsPotsConstants = require('../constants/SavingsPotsConstants');
const SavingsPotsUtils = require('../utils/SavingsPotsUtils');

const _ = require('lodash');
const CHANGE_EVENT = 'change';
const _collectAccountID = [];

let _potData = [];
let _accountData = [];
let _checkpotFlag = false;
let _accountList = [];
let _accountID;
let _getCreateSavingPotPage = false;
let _getCreatedPotData;
let _getPotDetailsPage = false;
let _potDetailData = {};
let _reducePotData = [];
let _getPotId;
let _getEditedPotData;
let _getEditedPotID;
let _potConfirmationFlag = false;
let _accountIndex;
let _displayLoading = false;
let _editError = {};
let _potError = {};
let _unavailableCheck = false;
let _interPotError = {};
let _createPotData = {};
let _isNetworkError = false;

const defaultError = {
	'error': {
		'code': 500,
		'developer_message': null,
		'id': null,
		'message': 'Something techie has gone wrong',
		'quoteId': null,
	},
};

const SavingsPotsStore = assign({}, EventEmitter.prototype, {

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
	// to get all acoount list
	checkpotFlag() {
		return _checkpotFlag;
	},
	getPotData() {
		return _potData || [];
	},
	getCreateSavingPotPage() {
		return _getCreateSavingPotPage;
	},
	getPotDetailsFlag() {
		return _getPotDetailsPage;
	},
	getPotDetailsData() {
		return _potDetailData;
	},
	getReducePotPage() {
		return _reducePotData;
	},

	getPotConfirmationFlag() {
		return _potConfirmationFlag;
	},
	getClickedAccount() {
		return _accountData;
	},
	getSelectedAccountID() {
		return _accountID;
	},
	getCreatedPotData() {
		return _getCreatedPotData;
	},
	getAccountIndex() {
		return _accountIndex;
	},
	editError () {
		return _editError || {};
	},
	potError () {
		return _potError || {};
	},
	unavailableCheck () {
		return _unavailableCheck;
	},
	interPotError () {
		return _interPotError;
	},
	displayLoading () {
		return _displayLoading;
	},
	createPotData () {
		return _createPotData;
	},
	isNetworkError () {
		return _isNetworkError;
	},
});

SavingsPotsStore.dispatchToken = AppDispatcher.register(payload => {
	const action = payload.action;
	switch (action.actionType) {
		case SavingsPotsConstants.REQUEST_POT_ACCOUNTS_LIST:
			_unavailableCheck = false;
			_isNetworkError = false;
			SavingsPotsUtils.getAccountsList();
			break;
		case SavingsPotsConstants.REQUEST_POT_ACCOUNTS_LIST_SUCCESS:
			_accountList = action.data;
			const acc = [];
			_.map(_accountList.accounts, (account, i) => {
				if (account.actions_available['/account/pots']) {
					acc.push((i % 10) + 1);
					_collectAccountID.push(account.id);
				}
			});
			_accountIndex = _.head(acc);
			_accountID = _.toString(_.head(_collectAccountID));
			if (_accountID !== '') {
				SavingsPotsUtils.getPotsData(_accountID);
			}
			break;
		case SavingsPotsConstants.REQUEST_POT_ACCOUNTS_LIST_ERROR:
			if (!action.data) {
				_isNetworkError = true;
			} else {
				_isNetworkError = false;
			}
			SavingsPotsStore.emitChange();
			break;

		case SavingsPotsConstants.REQUEST_POT_DATA:
			_unavailableCheck = false;
			_isNetworkError = false;
			_displayLoading = true;
			SavingsPotsUtils.getPotsData(_accountID);
			SavingsPotsStore.emitChange();
			break;

		case SavingsPotsConstants.REQUEST_POT_DATA_SUCCESS:
			_unavailableCheck = false;
			_isNetworkError = false;
			_getCreateSavingPotPage = false;
			_getPotDetailsPage = false;
			_potConfirmationFlag = false;
			_potData = action.data;
			_potDetailData = null;
			_reducePotData = [];
			_checkpotFlag = true;
			_displayLoading = false;
			SavingsPotsStore.emitChange();
			break;
		case SavingsPotsConstants.REQUEST_POT_DATA_ERROR:
			if (!action.data) {
				_isNetworkError = true;
				_displayLoading = false;
			} else {
				_isNetworkError = false;
				_potError = action.data;
				_unavailableCheck = true;
				_displayLoading = false;
			}
			SavingsPotsStore.emitChange();
			break;

        case SavingsPotsConstants.REQUEST_SELECTED_ACCOUNT:
			_unavailableCheck = false;
			_isNetworkError = false;
			_potData = [];
            _accountData = action.data;
			_accountID = _accountData.id;
			_accountIndex = (action.index % 10) + 1;
			SavingsPotsUtils.getPotsData(_accountID);
			SavingsPotsStore.emitChange();
			break;
		case SavingsPotsConstants.REQUEST_CREATE_PAGE:
			_unavailableCheck = false;
			_isNetworkError = false;
			_getCreateSavingPotPage = true;
			_editError = {};
			_createPotData = {};
			_getPotDetailsPage = false;
			if (action.data !== undefined) {
				_potDetailData = action.data;
			}
			SavingsPotsStore.emitChange();
			break;
		case SavingsPotsConstants.REQUEST_POT_DETAIL_PAGE:
			_unavailableCheck = false;
			_isNetworkError = false;
			_getPotId = action.data;
			SavingsPotsUtils.getSinglePotData(_getPotId, _accountID);
			break;
		case SavingsPotsConstants.REQUEST_SINGLE_POT_DATA_SUCCESS:
			_unavailableCheck = false;
			_isNetworkError = false;
			_getCreateSavingPotPage = false;
			_getPotDetailsPage = true;
			_potDetailData = action.data;
			_displayLoading = false;
			SavingsPotsStore.emitChange();
			break;
		case SavingsPotsConstants.REQUEST_SINGLE_POT_DATA_ERROR:
			if (!action.data && action.status !== 500) {
				_isNetworkError = true;
			} else {
				let errorMessage;
				if (!action.data) {
					errorMessage = defaultError;
				} else {
					errorMessage = action.data;
				}
				_isNetworkError = false;
				_editError = errorMessage;
				_displayLoading = false;
			}
			SavingsPotsStore.emitChange();
			break;
		case SavingsPotsConstants.REQUEST_REDUCE_POT_PAGE:
			_unavailableCheck = false;
			_isNetworkError = false;
			_getCreateSavingPotPage = false;
			_reducePotData = action.data;
			SavingsPotsStore.emitChange();
			break;
		case SavingsPotsConstants.REQUEST_NEW_POT_CONFIRMATION:
			_unavailableCheck = false;
			_isNetworkError = false;
			_displayLoading = true;
			_editError = {};
			_createPotData = action.data;
			SavingsPotsUtils.getCreatePotData(action.data, _accountID);
			break;
		case SavingsPotsConstants.REQUEST_CREATED_POT_DATA_SUCCESS:
			_unavailableCheck = false;
			_isNetworkError = false;
			_getCreatedPotData = action.data;
			_getCreateSavingPotPage = false;
			_potConfirmationFlag = true;
			_getPotDetailsPage = false;
			_potDetailData = null;
			_displayLoading = false;
			_editError = {};
			SavingsPotsStore.emitChange();
			break;
		case SavingsPotsConstants.REQUEST_CREATED_POT_DATA_ERROR:
			if (!action.data && action.status !== 500) {
				_isNetworkError = true;
			} else {
				let errorMessage;
				if (!action.data) {
					errorMessage = defaultError;
				} else {
					errorMessage = action.data;
				}
				_isNetworkError = false;
				_editError = errorMessage;
				_displayLoading = false;
			}
			SavingsPotsStore.emitChange();
			break;
		case SavingsPotsConstants.REQUEST_POT_DETAIL_DATA_ERROR:
			if (!action.data) {
				_isNetworkError = true;
			} else {
				_isNetworkError = false;
			}
			SavingsPotsStore.emitChange();
			break;
		case SavingsPotsConstants.REQUEST_DELETE_POT_CONNECTION:
			_unavailableCheck = false;
			_isNetworkError = false;
			_displayLoading = true;
			_getPotId = action.data;
			SavingsPotsUtils.deletePotConnection(_getPotId, _accountID);
			SavingsPotsStore.emitChange();
			break;
		case SavingsPotsConstants.REQUEST_EDITED_POT_DATA:
			const potDetail = _.extend({}, _potDetailData);
			_unavailableCheck = false;
			_isNetworkError = false;
			_getEditedPotData = action.data;
			_getEditedPotID = action.id;
			potDetail.goal.amount.value = _getEditedPotData.goal.amount.value;
			potDetail.schedule.recurrence.amount.value = _getEditedPotData.schedule.recurrence.amount.value;
			_displayLoading = true;
			SavingsPotsUtils.editPotConnection(_getEditedPotID, _accountID, _getEditedPotData);
			break;
		case SavingsPotsConstants.REQUEST_INTERPOT_DATA:
			_unavailableCheck = false;
			_isNetworkError = false;
			_interPotError = {};
			SavingsPotsUtils.getInterPotData(action.data, _accountID);
			break;
		case SavingsPotsConstants.REQUEST_INTERPOT_DATA_SUCCESS:
			_unavailableCheck = false;
			_isNetworkError = false;
			_interPotError = {};
			SavingsPotsUtils.getPotsData(_accountID);
			break;
		case SavingsPotsConstants.REQUEST_INTERPOT_DATA_ERROR:
			if (!action.data) {
				_isNetworkError = true;
			} else {
				_isNetworkError = false;
				_interPotError = action.data;
			}
			SavingsPotsStore.emitChange();
			break;
		case SavingsPotsConstants.REQUEST_CLOSE_ERROR_MODAL:
			if (_isNetworkError) {
				SavingsPotsUtils.getAccountsList();
				_isNetworkError = false;
			}
			_interPotError = {};
			_editError = {};
			_potError = {};
			SavingsPotsStore.emitChange();
			break;
	}
});
module.exports = SavingsPotsStore;
