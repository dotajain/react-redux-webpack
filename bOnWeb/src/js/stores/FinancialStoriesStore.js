/**
 * @module FinancialStoriesStore
 */
const AppDispatcher = require('../dispatcher/AppDispatcher');
const assign = require('object-assign');
const EventEmitter = require('events').EventEmitter;
const FinancialStoriesConstants = require('../constants/FinancialStoriesConstants');
const FinancialStoriesApiUtils = require('../utils/FinancialStoriesApiUtils');
const TransactionHistoryApiUtils = require('../utils/TransactionHistoryApiUtils');
const AccountsStore = require('./AccountsStore');
// const update = require('react-addons-update');
const moment = require('moment');
const _ = require('lodash');
const config = require('../config');
// Constant start
const CREDIT_CARD = 'credit_card';
const CURRENT = 'current';
const CREDIT = 'credit';
const OVERDRAFT = 'overdraft';
const CHANGE_EVENT = 'change';
const CURRENCY = 'GBP';
const MONEYIN = 'moneyin';
const MONEYOUT = 'moneyout';
const REPEATING = 'repeating';
const ALL = 'all';
// const MICRO_TRANSACTION="micro";
// const CASHPOINT="cashpoint";
// const IN_AND_OUT="inandout";
// const PROJECTION="projection";
const FinancialStory_Connection_Cell_No_Data_Title = 'We can\'t show you this story right now.';
const FinancialStory_Connection_Cell_No_Data_SubTitle = 'We\'ll keep trying though…';
const FinancialStory_Micro_Cell_Zero_Amount_Title = 'So far you haven\'t paid for anything under a tenner this month.';
const FinancialStory_Micro_Cell_Amount_Title = 'So far you\'ve spent <strong> (amount) </strong> on things under a tenner this month.';
const FinancialStory_CashPoint_Cell_Zero_Amount_Title = 'You haven\'t taken out any cash so far this month.';
const FinancialStory_CashPoint_Cell_Amount_Title = 'You\'ve taken out <strong> (amount) </strong> in cash so far this month.';
const FinancialStory_InOut_Cell_Amount_Title = 'Nothing\'s gone in or out of your account so far this month';
const FinancialStory_InOut_Cell_Total_Amount_Up_Title = 'You\'re up (amount) so far this month.';
const FinancialStory_InOut_Cell_Total_Amount_Down_Title = 'You\'re down (amount) so far this month.';

const fsConnectionTileFooter = 'Take a closer look...';

// Projection const
/* ProjectionFinancialStoryPreviewCell */
const ProjectionFinancialStoryPreviewCell_Title_NotEnabled = 'See in advance how the rest of your month is panning out.';
const ProjectionFinancialStoryPreviewCell_SubTitle_NotEnabled = 'Set up Projections';

const ProjectionFinancialStoryPreviewCell_Title_NotEnoughData = "B doesn't have enough to go on at the moment - please try again soon.";
const ProjectionFinancialStoryPreviewCell_SubTitle_NotEnoughData = '##days## days left...';
const ProjectionFinancialStoryPreviewCell_SubTitle_NotEnoughDataDays = '##days##';
const ProjectionFinancialStoryPreviewCell_SubTitle_NotEnoughDataBackupTitle = 'Try again soon';

const ProjectionFinancialStoryPreviewCell_Title_ProjectionInProgress = "You're all set up, now B's just crunching the numbers.";
const ProjectionFinancialStoryPreviewCell_SubTitle_ProjectionInProgress = 'Calculating...';

const ProjectionFinancialStoryPreviewCell_Title_ProjectionUpdatingPreferences = "Your preferences have been updated, B's just crunching the numbers.";
const ProjectionFinancialStoryPreviewCell_SubTitle_ProjectionUpdatingPreferences = 'Calculating...';

const ProjectionFinancialStoryPreviewCell_Title_GoodProjectionResult = "Great news, looks like you'll be in the green 'til payday.";
const ProjectionFinancialStoryPreviewCell_SubTitle_GoodProjectionResult = 'Go to Projections';

const ProjectionFinancialStoryPreviewCell_Title_BadProjectionResult = "You're running low - top up to ensure your bills get paid.";
const ProjectionFinancialStoryPreviewCell_SubTitle_BadProjectionResult = 'Review Projections';

const ProjectionFinancialStoryPreviewCell_Title_ProjectionError = 'There was an error retrieving your Projection';
const ProjectionFinancialStoryPreviewCell_SubTitle_ProjectionError = 'Please try again later';

// Constant end

const _state = {
    transactionHistoryData: [],
	transactionHistoryDataTotal: 0,
    dropDownItems: [],
    dropDownTitle: null,
    selectedTabKey: ALL,
    searchTextData: [],
    searchItem: '',
	pageSize: 200,
	sortData: {},
	fSConnectionData: {},
	accountType: '', // savings', // TODO
	accountId: '', // '8cbb3614-29c2-4502-b291-998d0b586856', // TODO
	accountList: [],
	accountDetails: {},
	fsTileClick: null,
	dateRange: {},
};
let _overdraftData = 0; // used in the alerts and notification for calculations
let _tagList = [];
let _newTagData = [];
let _createTagResponse = [];
let _assignTagResponse = false;
let _deleteTagResponse = [];
let _deleteTagData = [];
let _microTileData = {};
let _cashPointData = {};
let _inOutData = {};
let _projectionData = {};
let _matchAllDataForDropDown = {};
let _popupState = false;
let _accountColorIndex = 0;
let _accountHelpOpen = false;
let _createUpdateTagError = false;
let _tagCreateUpdateQuoteId = '';
let _load = false;
let _tagLoad = false;
let _assignTagStatus = false;
let _cancelButtonFlag = true;
let _fromDate = '3 months';
let _toDate = moment();
let maxEarningsAmountArray = [];
let _fsTileSelectedMonth = 0;
let _onLoad = true;
let _transactionHistoryListError = false;
let _internalServerError = false;

// let _statusCodeofProjection = 0;
const FinancialStoriesStore = assign({}, EventEmitter.prototype, {

	/**
	 * Alert listeners that the Store has changed.
	 */
	emitChange() {
		this.emit(CHANGE_EVENT);
	},

	/**			/**
	 * Allow views to specify functions to run when this store changes.
	 * * @param {function} callback
	 * @param {function} callback		Function to run on change.
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
    getOverDraftAmount() {
		return _overdraftData || 0;
	},
	// Retrive state from store
	getState() {
		return _state || [];
	},

	// Retrive Tags from store
	getTags() {
		return _tagList || [];
	},

	// Retrive assign tag response from store
	getAssignTagResponse() {
		return _assignTagResponse;
	},

	// Retrive response for flag from store
	responseForTag() {
        return _createTagResponse || [];
	},

	// Retrive response for deleteTag from store
	responseFordeleteTag() {
        return _deleteTagResponse || [];
	},

	// Retrive micro tile data from store
	getMicroTileData() {
		return _microTileData;
	},

	// Retrive cash point data from store
	getCashPointData() {
        return _cashPointData;
	},

	// Retrive inandout data from store
	getInOutData() {
		return _inOutData;
	},

	// Retrive projection data from store
	getProjectionData() {
		return _projectionData;
	},

	getMatchAllForDropDown() {
		return _matchAllDataForDropDown;
	},

	// To set Account id
	setAccountId(accountId) {
		_state.accountId = accountId;
	},
	setLoadingStatus() {
		_assignTagStatus = true;
	},

	setIsInternalServerError() {
		_internalServerError = false;
	},
	// Retrive Popup State from state.
	getPopupState() {
		return _popupState;
	},
	getAccountColorIndex() {
		return _accountColorIndex;
	},
	getAccountHelpOpen() {
		return _accountHelpOpen;
	},
	getCurrentAccountId() {
		return _state.accountId;
	},
	getCreateUpdateTagError() {
		return _createUpdateTagError;
	},
	getLoadStatus() {
		return _load;
	},
	getTagLoadStatus() {
		return _tagLoad;
	},
	getAssignTagStatus() {
		return _assignTagStatus;
	},
	getCancelButtonFlag() {
        return _cancelButtonFlag;
    },
	getCreateUpdateErrorId() {
        return _tagCreateUpdateQuoteId;
    },
	getFromDate() {
		if (_fromDate instanceof Object) {
			_fromDate = _fromDate.format('DD MMM YY');
		}
		return _fromDate;
    },
    getToDate() {
		return _toDate;
    },
	getOnLoad() {
		return _onLoad;
	},

	isInternalServerError() {
		return _internalServerError;
	},

	isTransactionHistoryListError() {
		return _transactionHistoryListError;
	},

	// getProjectionStatusCode() {
	// 	return _statusCodeofProjection;
	// },
});

const updateAssignTagResponse = function () {
	_assignTagResponse = false;
};

const updateFSTileClick = function () {
	_state.fsTileClick = null;
};

const transactionSearchTextList = function (text) {
	const object = {
		'template': {
			'file': 'suggest',
		},
		'params': {
			'text': text,
			'account_list': [
				_state.accountId,
			],
		},
	};

	// console.log(JSON.stringify(object));
	FinancialStoriesApiUtils.getTransactionSearchTextList(object);
};
const transactionSearchList = function (item) {
	// TODO
	let object;
	if (item.length > 0) {
		_state.searchItem = item;
		object = modifyTransactionHistoryObject();
		// object.template.file = 'matchText';
		// object.params.search_text = _state.searchItem;
		// object.params = _.omit(object.params, ['filter_field', 'filter_value']);
		TransactionHistoryApiUtils.getTransactionHistorySearchList(object);
	} else {
		_state.searchItem = '';
		object = modifyTransactionHistoryObject();
		// object.params = _.omit(object.params, ['search_text']);
		getTransactionHistoryList(object);
	}
};
const transactionDateRangeList = function (item) {
	_fromDate = item.startDate;
	_toDate = item.endDate;
	const dateRange = item;
	let selectedDate = item.startDate;
	switch (_fromDate) {
		case '1 week':
			selectedDate = moment().subtract(7, 'days');
			break;
		case '2 weeks':
			selectedDate = moment().subtract(14, 'days');
			break;
		case '1 month':
			selectedDate = moment().subtract(1, 'months');
			break;
		case '3 months':
			selectedDate = moment().subtract(3, 'months');
			break;
		case '6 months':
			selectedDate = moment().subtract(6, 'months');
			break;
		default:
			selectedDate = moment(_fromDate, 'YYYY-MM-DD');
			_fromDate = moment(_fromDate, 'YYYY-MM-DD');
	}

	if (_state.accountDetails.canLoadTransactions) {
		dateRange.startDate = selectedDate;
		_state.dateRange = dateRange;
		TransactionHistoryApiUtils.getTransactionHistoryList(modifyTransactionHistoryObject());
	} else {
		FinancialStoriesStore.emitChange();
	}
};

// creating Transaction History Object
const createTransactionHistoryObject = function () {
    return {
		'template': {
			'file': 'matchAll',
		},
		'params': {
			'from': 0,
			'filter_value': [],
			'order': _state.sortData.order ? _state.sortData.order : 'desc',
			'start_date': _state.dateRange.startDate ? _state.dateRange.startDate : moment().subtract(3, 'months').toISOString(),
			'sort_field': _state.sortData.sortField ? _state.sortData.sortField : 'details.when',
			'size': _state.pageSize,
			'end_date': _state.dateRange.endDate ? _state.dateRange.endDate : moment().toISOString(), //  moment().format('YYYY-MM-DD'),
			'filter_field': 'details.debit_credit',
			'account_list': [
				_state.accountId,
			],
		},
	};
};

// creating Transaction History Object
const createTransactionForDropDown = function () {
    return {
		'template': {
			'file': 'matchAll',
		},
		'params': {
			'from': 0,
			'order': 'asc',
			'start_date': 'now-6M',
			'sort_field': 'details.when',
			'size': 1,
			'end_date': 'now',
			'account_list': [
				_state.accountId,
			],
		},
	};
};

// creating Financial Stories Object
const createFinancialStoriesObject = function () {
    return {
		'template': {
			'file': 'microTransactions',
		},
		'params': {
			'amount_lower_bound': -10,
			'date_lower_bound': '2016-08-01T00:00:00.000+0100',
			'sort_field_date': 'details.when',
			'debit_name': 'debit',
			'date_field': 'details.when',
			'from': 0,
			'date_upper_bound': '2016-08-31T23:59:59.000+0100',
			'size': 10,
			'account_list': [
				_state.accountId,
			],
			'sort_field_ordinal': 'ordinal',
			'amount_range_field': 'details.amount.value',
			'histogram_interval': 'month',
			'date_range_field': 'details.when',
			'amount_upper_bound': 0,
			'credit_name': 'credit',
			'order': 'desc',
			'amount_field': 'details.amount.value',
		},
	};
};

const modifyTransactionHistoryObject = function () {
	const object = createTransactionHistoryObject();
	switch (_state.selectedTabKey) {
		case ALL:
			object.params = _.omit(object.params, ['filter_field', 'filter_value']);
			// object.template.file = 'match';
			break;
		case MONEYIN:
			object.params.filter_value.push('credit');
			object.template.file = 'matchAllWithFilter';
			break;
		case MONEYOUT:
			object.params.filter_value.push('debit');
			object.template.file = 'matchAllWithFilter';
			break;
		case REPEATING:
			object.params.filter_value.push('Direct Debit');
			object.params.filter_value.push('Standing Order');
			object.params.filter_field = 'details.type';
			object.template.file = 'matchAllWithFilter';
			break;
		default:
	}

	if (_state.searchItem && _state.searchItem.length > 0) {
		if (_state.selectedTabKey !== ALL) {
			object.template.file = 'matchTextWithFilter';
			object.params.search_text = _state.searchItem;
		} else {
			object.template.file = 'matchText';
			object.params.search_text = _state.searchItem;
		}
	}
	// else {
	// 	object.params = _.omit(object.params, ['search_text']);
	// }

	return object;
};

const tabSelect = function (tabKey) {
	_state.selectedTabKey = tabKey;
	_state.pageSize = 200;
	// _state.searchItem = '';
	const object = modifyTransactionHistoryObject();
	// console.log(JSON.stringify(object));
	getTransactionHistoryList(object);
    // FinancialStoriesStore.emitChange();
};

const getTransactionHistoryList = function (filterData) {
	if (_state.searchItem && _state.searchItem.length > 0) {
		TransactionHistoryApiUtils.getTransactionHistorySearchList(filterData);
	} else {
		TransactionHistoryApiUtils.getTransactionHistoryList(filterData, _state.selectedTabKey);
	}
};

const getFinancialStoriesConnection = function (fsData) {
	const object = createFinancialStoriesObject();
	object.params.date_lower_bound = moment().startOf('month').format('YYYY-MM-DDTHH:mm:ss.sss') + 'Z';
	object.params.date_upper_bound = moment().endOf('month').format('YYYY-MM-DD') + 'T23:59:59.000Z';

	switch (fsData) {
		case FinancialStoriesConstants.microTransactions:
			break;
		case FinancialStoriesConstants.cashpoint:
			object.template.file = FinancialStoriesConstants.cashpoint;
			object.params.transaction_type_field = 'details.type';
			object.params.transaction_type = 'ATM';
			object.params = _.omit(object.params, ['amount_lower_bound', 'amount_range_field', 'amount_upper_bound']);
			break;
		case FinancialStoriesConstants.insAndOuts:
			object.template.file = FinancialStoriesConstants.insAndOuts;
			object.params = _.omit(object.params, ['amount_lower_bound', 'amount_range_field', 'amount_upper_bound']);
			break;
		case FinancialStoriesConstants.projection:
			object.template.file = FinancialStoriesConstants.projection;
			break;
		default:
	}
	FinancialStoriesApiUtils.getFinancialStoriesConnection(object);
};

const getOldestTransactionDate = function () {
	FinancialStoriesApiUtils.getOldestTransactionDate(createTransactionForDropDown());
};

const getFinancialStoriesTileData = function (fsData) {
	const object = createFinancialStoriesObject();
	object.params.date_lower_bound = fsData.date_lower_bound;// moment(fsData.date_lower_bound).toISOString();
    object.params.date_upper_bound = fsData.date_upper_bound; // moment(fsData.date_upper_bound).toISOString();
	object.params.size = 100;
	switch (fsData.tileType) {
		case FinancialStoriesConstants.microTransactions:
			FinancialStoriesApiUtils.getMicroTransactions(object);
			break;
		case FinancialStoriesConstants.cashpoint:
			object.template.file = 'cashpoint';
			object.params.transaction_type_field = 'details.type';
			object.params.transaction_type = 'ATM';
			object.params = _.omit(object.params, ['amount_lower_bound', 'amount_range_field', 'amount_upper_bound']);
			FinancialStoriesApiUtils.getCashPointTransactions(object);
			break;
		case FinancialStoriesConstants.insAndOuts:
			object.template.file = 'insAndOuts';
			object.params = _.omit(object.params, ['amount_lower_bound', 'amount_range_field', 'amount_upper_bound']);
			FinancialStoriesApiUtils.getInOutTransactions(object);
			break;
		default:
	}
	// console.log(JSON.stringify(object));
};

const getString = function (inString, replaceStr, sum) {
	return inString.replace(replaceStr, config.currencySign + sum.toFixed(2).toString().replace('-', ''));
};

const getProjection = function (projection) {
	const projectionObject = {};
	if (projection.projection_periods.length > 0) {
		if (projection.projection_periods[0].warning_days.length > 0) {
			projectionObject.previewTitle = ProjectionFinancialStoryPreviewCell_Title_BadProjectionResult;
			projectionObject.previewSubtitle = ProjectionFinancialStoryPreviewCell_SubTitle_BadProjectionResult;
			_state.fSConnectionData.projectionClickable = undefined;
		} else {
			/* We need to calculate if the first period in the projection contains a good to go balance
			that is projection balance - threshold value > 0, then include this in the copy */

			projectionObject.previewTitle = ProjectionFinancialStoryPreviewCell_Title_GoodProjectionResult;
			projectionObject.previewSubtitle = ProjectionFinancialStoryPreviewCell_SubTitle_GoodProjectionResult;
		}
	} else {
		projectionObject.previewTitle = ProjectionFinancialStoryPreviewCell_Title_ProjectionError;
		projectionObject.previewSubtitle = ProjectionFinancialStoryPreviewCell_SubTitle_ProjectionError;
		_state.fSConnectionData.projectionClickable = false;
	}


	return projectionObject;
};

const getFinancialStoriesConnectionSuccess = function (fsData, status, tileType) {
	let buckets;
	let sum;
	let text;
	const currentDate = moment().format('YYYY-MM');
	switch (tileType) {
		case FinancialStoriesConstants.microTransactions:
			_microTileData.aggregations = fsData.aggregations;
            buckets = fsData.aggregations.debit.filtered_by_date.buckets;
			if (buckets && buckets.length > 0) {
				sum = buckets[0].monthly_spend.sum;
				text = sum !== 0 ? getString(FinancialStory_Micro_Cell_Amount_Title, '(amount)', sum) : FinancialStory_Micro_Cell_Zero_Amount_Title;
				_state.fSConnectionData.micro = { title: text, footer: fsConnectionTileFooter };
			} else {
				text = FinancialStory_Micro_Cell_Zero_Amount_Title;
				_state.fSConnectionData.micro = { title: text, footer: fsConnectionTileFooter };
			}
			_state.fSConnectionData.microClickable = undefined;
            break;
		case FinancialStoriesConstants.cashpoint:
			_cashPointData.aggregations = fsData.aggregations;
			buckets = fsData.aggregations.debit.filtered_by_date.buckets;
			if (buckets && buckets.length > 0) {
				sum = buckets.filter(c => moment(c.key_as_string).format('YYYY-MM') === currentDate).map(c => c.monthly_spend.sum)[0];
				sum = !sum ? 0 : sum;
				text = sum !== 0 ? getString(FinancialStory_CashPoint_Cell_Amount_Title, '(amount)', sum) : FinancialStory_CashPoint_Cell_Zero_Amount_Title;
				_state.fSConnectionData.cashpoint = { title: text, footer: fsConnectionTileFooter };
			} else {
				text = FinancialStory_CashPoint_Cell_Zero_Amount_Title;
				_state.fSConnectionData.cashpoint = { title: text, footer: fsConnectionTileFooter };
			}
			_state.fSConnectionData.cashClickable = undefined;
			break;
		case FinancialStoriesConstants.insAndOuts:
			_inOutData.aggregations = fsData.aggregations;
			buckets = fsData.aggregations.debit.filtered_by_date.buckets;
			const creditBucket = fsData.aggregations.credit.filtered_by_date.buckets;
			if (buckets && buckets.length > 0) {
				sum = buckets.filter(c => moment(c.key_as_string).format('YYYY-MM') === currentDate).map(c => c.monthly_spend.sum)[0];
				sum = !sum ? 0 : sum;
				let creditSum = creditBucket.length > 0 ? creditBucket[0].monthly_spend.sum : 0;
				creditSum = creditBucket.filter(c => moment(c.key_as_string).format('YYYY-MM') === currentDate).map(c => c.monthly_spend.sum)[0];
				creditSum = !creditSum ? 0 : creditSum;
				if (sum === creditSum) {
					text = FinancialStory_InOut_Cell_Amount_Title;
				} else {
					buckets = fsData.aggregations.totals_of_debit_and_credits.filtered_by_date.buckets;
					sum = buckets.filter(c => moment(c.key_as_string).format('YYYY-MM') === currentDate).map(c => c.monthly_spend.sum)[0];
					sum = !sum ? 0 : sum;
					text = sum > 0 ? getString(FinancialStory_InOut_Cell_Total_Amount_Up_Title, '(amount)', sum) : getString(FinancialStory_InOut_Cell_Total_Amount_Down_Title, '(amount)', sum);
				}
				_state.fSConnectionData.inandout = { title: text, footer: fsConnectionTileFooter };
			} else {
				text = FinancialStory_InOut_Cell_Amount_Title;
				_state.fSConnectionData.inandout = { title: text, footer: fsConnectionTileFooter };
			}
			_state.fSConnectionData.inandoutClickable = undefined;
			break;
		case FinancialStoriesConstants.projection:
			let projectionObject;
			if (status === 200) {
				projectionObject = getProjection(fsData);
				_projectionData = fsData;
				_onLoad = true;
				let projectionPeriodCount;
				if (_projectionData !== undefined) {
					projectionPeriodCount = _projectionData.projection_periods.length;
					if (projectionPeriodCount > 1) {
						let i;
						for (i = 1; i < _projectionData.projection_periods.length; i++) {
							maxEarningsAmountArray.push(_projectionData.projection_periods[i].period.to.available_balance.value);
						}
					} else {
						console.log(projectionPeriodCount + 'else part');
					}
				}
				_cancelButtonFlag = true;
				_state.fSConnectionData.projectionClickable = undefined;
			}
			_state.fSConnectionData.projection = { title: projectionObject.previewTitle, footer: projectionObject.previewSubtitle };
            break;


		default:
	}
};

const getUnavailableProjection = function (projection, status) {
	const projectionObject = {};
	if (status === 404) {
		projectionObject.previewTitle = ProjectionFinancialStoryPreviewCell_Title_NotEnabled;
		projectionObject.previewSubtitle = ProjectionFinancialStoryPreviewCell_SubTitle_NotEnabled;
		_onLoad = false;
		_projectionData.notEnabled = true;
		_state.fSConnectionData.projectionClickable = undefined;
		_cancelButtonFlag = false;
	} else if (status === 409) {
		if (projection.code === '0001') {
			projectionObject.previewTitle = ProjectionFinancialStoryPreviewCell_Title_NotEnoughData;
			let subtitle = ProjectionFinancialStoryPreviewCell_SubTitle_NotEnoughData;
			if (projection.metadata) {
				const availableDays = projection.metadata.available_days;
				const requiredDays = projection.metadata.required_days;
				let daysRemaining = requiredDays - availableDays;
				daysRemaining = daysRemaining <= 0 ? 'No' : daysRemaining;
				subtitle = subtitle.replace(ProjectionFinancialStoryPreviewCell_SubTitle_NotEnoughDataDays, daysRemaining);
				projectionObject.previewSubtitle = subtitle;
			} else {
				projectionObject.previewSubtitle = ProjectionFinancialStoryPreviewCell_SubTitle_NotEnoughDataBackupTitle;
			}
		} else if (projection.code === '0002') {
			projectionObject.previewTitle = ProjectionFinancialStoryPreviewCell_Title_ProjectionUpdatingPreferences;
			projectionObject.previewSubtitle = ProjectionFinancialStoryPreviewCell_SubTitle_ProjectionUpdatingPreferences;
		} else if (projection.code === '0000') {
			projectionObject.previewTitle = ProjectionFinancialStoryPreviewCell_Title_ProjectionInProgress;
			projectionObject.previewSubtitle = ProjectionFinancialStoryPreviewCell_SubTitle_ProjectionInProgress;
		}
		_state.fSConnectionData.projectionClickable = false;
	} else {
		projectionObject.previewTitle = ProjectionFinancialStoryPreviewCell_Title_ProjectionError;
		projectionObject.previewSubtitle = ProjectionFinancialStoryPreviewCell_SubTitle_ProjectionError;
		_state.fSConnectionData.projectionClickable = false;
	}
	return projectionObject;
};

const getFinancialStoriesTransactionTileError = function (response, status, tileType) {
	switch (tileType) {
		case FinancialStoriesConstants.insAndOuts:
			_state.fSConnectionData.inandout = { title: FinancialStory_Connection_Cell_No_Data_Title, footer: FinancialStory_Connection_Cell_No_Data_SubTitle };
			_state.fSConnectionData.inandoutClickable = false;
			break;
		case FinancialStoriesConstants.cashpoint:
			_state.fSConnectionData.cashpoint = { title: FinancialStory_Connection_Cell_No_Data_Title, footer: FinancialStory_Connection_Cell_No_Data_SubTitle };
			_state.fSConnectionData.cashClickable = false;
			break;
		case FinancialStoriesConstants.microTransactions:
			_state.fSConnectionData.micro = { title: FinancialStory_Connection_Cell_No_Data_Title, footer: FinancialStory_Connection_Cell_No_Data_SubTitle };
			_state.fSConnectionData.microClickable = false;
			break;
		case FinancialStoriesConstants.projection:
			let projectionObject = {};
			projectionObject = getUnavailableProjection(response, status);
			_state.fSConnectionData.projection = { title: projectionObject.previewTitle, footer: projectionObject.previewSubtitle };
			break;
		default:
	}
};

const customizeTransactionHistoryData = function (hits) {
    const rows = [];
    let balance = null;
	let categoryObject = null;
	let categories = null;
	let amount = null;
	let tagObject = null;
    hits.hits.forEach(source => {
		balance = source._source.details.balances;
		categories = source._source.metadata.categories;
		categoryObject = categories && categories.length > 0 ? categories[0] : 'Untagged';
		if (source._source.details.posted) {
			tagObject = (source._source.metadata.tags && source._source.metadata.tags.length > 0 ? source._source.metadata.tags[0] : categoryObject);
		}
		if (balance) {
			balance = balance.current.currency === CURRENCY && config.currencySign + getFormattedAmount(balance.current.value.toFixed(2).toString());
		}
		amount = source._source.details.amount.value;
		if (amount < 0) {
			amount = config.currencySignWithDash + getFormattedAmount(amount.toFixed(2).toString()).replace('-', '');
		} else {
			amount = config.currencySign + getFormattedAmount(amount.toFixed(2).toString());
		}
		rows.push({
			id: source._source.id,
			description: source._source.details.narrative.medium,
			date: moment(source._source.details.when).format('DD MMM YY'),
			type: source._source.details.type,
			tag: tagObject instanceof Object ? tagObject.value : tagObject,
			tagId: tagObject instanceof Object ? tagObject.id : 0,
			archived: tagObject instanceof Object ? tagObject.archived : false,
			posted:source._source.details.posted,
			amount: source._source.details.amount.currency === CURRENCY && amount,
			balance: source._source.details.posted && balance,
			city: source._source.metadata.where && source._source.metadata.where.city,
        });
    });
    return rows;
    // ///
};

const customizeAccountList = function (accountList) {
	const accList = [];
	if (accountList) {
		for (let i = 0; i < accountList.length; i++) {
			if (accountList[i].id === _state.accountId) {
				_accountColorIndex = getFSColorIndex(i + 1);
			}

			accList.push({
					counter: getFSColorIndex(i),
					id: accountList[i].id,
					type: accountList[i].type,
					name: accountList[i].metadata.display_name ? accountList[i].metadata.display_name : accountList[i].product.name,
					number: accountList[i].number,
					sortcode: accountList[i].sort_code,
				});
		}
	}
    return accList;
};

const getFSColorIndex = function (accountSequenceNumber) {
	// Colour assignment based on below sequence and current
	// Should be displayed first then saving accounts
	let index = accountSequenceNumber;
	if (index > 9) {
		index = index - 10;
	}
	return index;
};

const getFormattedAmount = function (amount) {
	if (amount) {
		return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}
	return amount;
};

const customizeAccountDetails = function (accountDetails, accountType) {
	const accDetails = {};
	let amount;
	if (accountDetails) {
		accDetails.id = accountDetails.id;
		accDetails.color = _(_state.accountList).filter(c => c.id === accountDetails.id).map(c => c.color).value()[0];
		accDetails.accountType = accountType;
		accDetails.canLoadTransactions = accountDetails.actions_available['/account/transactions/read'];
		accDetails.allowProjection = accountDetails.actions_available['/account/projections'];
		accDetails.name = accountDetails.metadata.display_name ? accountDetails.metadata.display_name : accountDetails.product.name;
		accDetails.number = _(_state.accountList).filter(c => c.id === accountDetails.id).map(c => c.number).value()[0];
		accDetails.sortcode = _(_state.accountList).filter(c => c.id === accountDetails.id).map(c => c.sortcode).value()[0];
		amount = _(accountDetails.balances).filter(c => c.type === CURRENT).map(c => c.amount.value).value()[0];
		if (amount < 0) {
			amount = config.currencySignWithDash + getFormattedAmount(amount.toFixed(config.currencyDecimals)).replace('-', '');
		} else {
			amount = config.currencySign + getFormattedAmount(amount.toFixed(config.currencyDecimals));
		}
		accDetails.currentBalance = amount;
		amount = _(accountDetails.balances).filter(c => c.type === 'available').map(c => c.amount.value).value()[0];
		amount = amount !== undefined ? amount.toFixed(config.currencyDecimals) : 0;
		accDetails.availableBalance = config.currencySign + getFormattedAmount(amount);
		if (accountType === CREDIT_CARD) {
			amount = _(accountDetails.limits).filter(c => c.type === CREDIT).map(c => c.amount.value).value()[0];
			amount = amount !== undefined ? amount.toFixed(config.currencyDecimals) : 0;
			accDetails.creditLimit = config.currencySign + getFormattedAmount(amount);

			accDetails.lastStatementDate = moment(accountDetails.statements.last.at).format('DD MMM YY');
			amount = accountDetails.statements.last.balance.amount.value;
			amount = amount !== undefined ? amount : 0;
			if (amount < 0) {
				amount = config.currencySignWithDash + getFormattedAmount(amount.toFixed(config.currencyDecimals)).replace('-', '');
			} else {
				amount = config.currencySign + getFormattedAmount(amount.toFixed(config.currencyDecimals));
			}
			accDetails.lastStatementBalance = amount;
			amount = accountDetails.statements.last.payment.minimum_amount.value;
			amount = amount !== undefined ? amount.toFixed(config.currencyDecimals) : 0;
			accDetails.minPaymentDue = config.currencySign + amount;

			accDetails.paymentDueDate = moment(accountDetails.statements.last.payment.when).format('DD MMM YY');
		}
		if (accountType === CURRENT) {
			amount = _(accountDetails.limits).filter(c => c.type === OVERDRAFT).map(c => c.amount.value).value()[0];
			amount = amount !== undefined ? amount.toFixed(config.currencyDecimals) : 0;
			accDetails.borrowingLimit = config.currencySign + getFormattedAmount(amount);
		}
	}
	return accDetails;
    // ///
};

const getTagErrorQuoteId = function (response) {
	if (response !== undefined && response !== null) {
		if (response.error) {
			return response.error.id.slice(-6);
		}
	}
	return '';
};

FinancialStoriesStore.dispatchToken = AppDispatcher.register(payload => {
	const action = payload.action;

	switch (action.actionType) {
		case FinancialStoriesConstants.SET_ACCOUNT_HELP:
			_accountHelpOpen = action.data;
			FinancialStoriesStore.emitChange();
			break;
		case FinancialStoriesConstants.ACCOUNTS_LIST:
			// TODO: remove it later
			// FinancialStoriesApiUtils.getAccountsList();
			_load = false;
			_internalServerError = false;
			_state.accountList = customizeAccountList(AccountsStore.getAll().accounts); //  customizeAccountList(action.data.accounts);
			// _state.accountId = action.acountNumber // TODO
			const accountDetail = AccountsStore.getAccountDetail(_state.accountId);
			_state.accountType = accountDetail.type; // 'current'; // TODO
			FinancialStoriesApiUtils.getAccountDetails(_state.accountId, _state.accountType);
			_assignTagStatus = true;
			// _state.accountDetails = customizeAccountDetails(AccountsStore.getAccountDetail(action.acountNumber), action.accountType);
			break;
		// case FinancialStoriesConstants.ACCOUNTS_LIST_SUCCESS:
		// 	_state.accountList = customizeAccountList(action.data.accounts);
		// 	break;
		// TODO: remove once integrated with timeline
		case FinancialStoriesConstants.ACCOUNT_DETAILS:
			_load = false;
			_state.accountId = action.acountNumber;
			_state.accountType = action.accountType;
			_accountColorIndex = action.accountColorIndex;
			FinancialStoriesApiUtils.getAccountDetails(action.acountNumber, action.accountType);
			break;

		case FinancialStoriesConstants.ACCOUNT_DETAILS_SUCCESS:
			_state.accountDetails = customizeAccountDetails(action.data, action.accountType);
			_overdraftData = action.data.limits.length > 0 && action.data.limits[0].amount.value;
			_state.selectedTabKey = ALL;
			_state.pageSize = 200;
			_state.sortData = {};
			_state.searchItem = '';
			_state.dateRange = {};
			_fromDate = '3 months';
			_toDate = moment();
			_assignTagResponse = false;
			_internalServerError = false;
			if (_state.accountType === CURRENT) {
				getOldestTransactionDate();
				getFinancialStoriesConnection(FinancialStoriesConstants.micro);
				getFinancialStoriesConnection(FinancialStoriesConstants.cashpoint);
				getFinancialStoriesConnection(FinancialStoriesConstants.inandout);
				if (_state.accountDetails.allowProjection) {
					getFinancialStoriesConnection(FinancialStoriesConstants.projection);
				}
			}
			if (_state.accountDetails.canLoadTransactions) {
				getTransactionHistoryList(modifyTransactionHistoryObject());
			} else {
				_load = true;
				_popupState = false;
				_state.transactionHistoryData = [];
				_state.transactionHistoryDataTotal = 0;
				_assignTagStatus = false;
			}

			FinancialStoriesStore.emitChange();
			break;
		case FinancialStoriesConstants.FINANCIAL_STORIES_TILE:
            _state.fsTileClick = action.data;
			switch (action.data) {
				case FinancialStoriesConstants.microTransactions:
				case FinancialStoriesConstants.cashpoint:
				case FinancialStoriesConstants.insAndOuts:
					_state.financialStoriesClass = 'financial-stories2';
					break;
				case FinancialStoriesConstants.projection:
					_state.financialStoriesClass = 'projection';
					break;
				default:
			}
			FinancialStoriesStore.emitChange();
            break;
		case FinancialStoriesConstants.FINANCIAL_STORIES_CONNECTION:
			if (_state.accountType === CURRENT) {
				// if (action.transactionType === FinancialStoriesConstants.projection && !_state.accountDetails.allowProjection) {
				// 	return;
				// }
				getFinancialStoriesConnection(action.transactionType);
			}
            break;
		case FinancialStoriesConstants.TRANSACTION_LIST:
			_state.selectedTabKey = action.transactionType;
            getTransactionHistoryList(modifyTransactionHistoryObject());
            break;
		case FinancialStoriesConstants.TRANSACTION_HISTORY_PAGE_LIST:
			_state.pageSize = action.pageSize;
            getTransactionHistoryList(modifyTransactionHistoryObject());
            break;
		case FinancialStoriesConstants.TRANSACTION_HISTORY_SORT_LIST:
			if (_state.accountDetails.canLoadTransactions) {
				_state.sortData = action.sortData;
				getTransactionHistoryList(modifyTransactionHistoryObject());
			}
            break;

		case FinancialStoriesConstants.TAB_SELECT:
			if (_state.accountDetails.canLoadTransactions) {
				_load = false;
				tabSelect(action.tabKey);
				_assignTagResponse = false;
			}
			break;
		case FinancialStoriesConstants.TRANSACTION_SEARCH_LIST:
			if (_state.accountDetails.canLoadTransactions) {
				_load = false;
				transactionSearchList(action.text);
			}
            break;
		case FinancialStoriesConstants.TRANSACTION_SEARCH_TEXT:
			transactionSearchTextList(action.text);
			break;
		case FinancialStoriesConstants.TRANSACTION_DATE_RANGE_LIST:
			if (_state.accountDetails.canLoadTransactions) {
				_load = false;
			}
			transactionDateRangeList(action.dateRange);
			break;
		case FinancialStoriesConstants.TRANSACTION_LIST_SUCCESS:
			_load = true;
			_popupState = false;
			_state.transactionHistoryData = customizeTransactionHistoryData(action.data.hits);
			_state.transactionHistoryDataTotal = action.data.hits.total;
			_assignTagStatus = false;
			_transactionHistoryListError = false;
			FinancialStoriesStore.emitChange();
			break;
		case FinancialStoriesConstants.TRANSACTION_HISTORY_LIST_ERROR:
			_load = true;
			_popupState = false;
			_assignTagStatus = false;
			_transactionHistoryListError = true;
			_state.transactionHistoryData = [];
			FinancialStoriesStore.emitChange();
			break;
		case FinancialStoriesConstants.FINANCIAL_STORIES_ACCOUNT_DETAILS_ERROR:
			if (action.data) {
                if (action.status === 500) {
					_load = true;
					_popupState = false;
					_assignTagStatus = false;
					// _transactionHistoryListError = true;
					_state.transactionHistoryData = [];
					_state.transactionHistoryDataTotal = 0;
					const accountDetail = {};
					accountDetail.id = _state.accountId;
					accountDetail.accountType = _state.accountType;
					accountDetail.number = _(_state.accountList).filter(c => c.id === accountDetail.id).map(c => c.number).value()[0];
					accountDetail.currentBalance = 0;
					accountDetail.name = _(_state.accountList).filter(c => c.id === accountDetail.id).map(c => c.name).value()[0];
					_state.accountDetails = accountDetail;
					_internalServerError = true;
					FinancialStoriesStore.emitChange();
				}
            }
			break;
		case FinancialStoriesConstants.TRANSACTION_SEARCH_TEXT_SUCCESS:
			_popupState = true;
			_state.searchTextData = action.data && action.data.suggest[0].options;// action.data;
			FinancialStoriesStore.emitChange();
			break;
		// case FinancialStoriesConstants.TRANSACTION_DATE_RANGE_LIST_SUCCESS:
		// 	FinancialStoriesStore.emitChange();
		// 	break;
		case FinancialStoriesConstants.RESET_TRANSACTION_SEARCH_TEXT:
			if (_state.accountDetails.canLoadTransactions) {
				_popupState = false;
				_state.searchItem = '';
				FinancialStoriesStore.emitChange();
			}
			break;
		case FinancialStoriesConstants.FINANCIAL_STORIES_CONNECTION_SUCCESS:
            getFinancialStoriesConnectionSuccess(action.data, action.status, action.tileType);
            break;
		case FinancialStoriesConstants.FINANCIAL_STORIES_TRANSACTION_TILE_ERROR:
            getFinancialStoriesTransactionTileError(action.data, action.status, action.tileType);
            break;
		case FinancialStoriesConstants.REQUEST_TAGS_LIST:
			FinancialStoriesApiUtils.getTagsList();
			break;

		case FinancialStoriesConstants.REQUEST_TAGS_LIST_SUCCESS:
			_tagLoad = true;
			_tagList = action.data;
			let tags = action.data.tags;
			_tagList.untagged = action.data.categories;
			if (tags) {
				tags = _.sortBy(tags, [o => {return o.value;}]);
				// tags = update(tags, { $splice: [[tags.indexOf('Untagged'), 1]] });
				_tagList.tags = tags;
			}
			if (_tagList.untagged) {
				let categories = _.remove(_tagList.untagged, c => c.path !== '/untagged');
				categories = _.sortBy(categories, [o => {return o.value;}]);
				_tagList.categories = categories;
			}
			FinancialStoriesStore.emitChange();
			break;
		case FinancialStoriesConstants.CREATE_NEW_TAG:
			_tagLoad = false;
			_newTagData = action.data;
			FinancialStoriesApiUtils.createNewTag(_newTagData);
			break;
		case FinancialStoriesConstants.UPDATE_TAG_REQUEST:
			_tagLoad = false;
			FinancialStoriesApiUtils.updateTag(action.data);
			break;

		case FinancialStoriesConstants.CREATE_NEW_TAG_SUCCESS:
			_createTagResponse = action.data;
			FinancialStoriesApiUtils.getTagsList();
			// FinancialStoriesStore.emitChange();
			break;
		case FinancialStoriesConstants.CREATE_UPDATE_NEW_TAG_ERROR:
			_createUpdateTagError = action.data;
			_tagCreateUpdateQuoteId = getTagErrorQuoteId(action.response);
			_tagLoad = true;
			_createUpdateTagError && FinancialStoriesStore.emitChange();
			break;
		case FinancialStoriesConstants.DELETE_TAG_REQUEST:
			_tagLoad = false;
			_deleteTagData = action.data;
			FinancialStoriesApiUtils.deleteTag(_deleteTagData);
			break;

		case FinancialStoriesConstants.DELETE_TAG_REQUEST_SUCCESS:
			_deleteTagResponse = action.data;
			_assignTagResponse = false;
			FinancialStoriesApiUtils.getTagsList();
			// FinancialStoriesStore.emitChange();
			break;

		case FinancialStoriesConstants.ASSIGN_TAG_REQUEST:
			_assignTagStatus = true;
			FinancialStoriesApiUtils.assignTag(action.data, _state.accountId);
			break;

		case FinancialStoriesConstants.ASSIGN_TAG_REQUEST_SUCCESS:
			_assignTagResponse = true;
			_assignTagStatus = false;
			getTransactionHistoryList(modifyTransactionHistoryObject());
			FinancialStoriesStore.emitChange();
			// Alternate solution //
			// // getTransactionHistoryList(modifyTransactionHistoryObject());
			// let assignTag;
			// let index;
			// for (let i = 0; i < action.data.transactions.length; i++) {
			// 	assignTag = action.data.transactions[i];
			// 	index = _.indexOf(_state.transactionHistoryData, _.find(_state.transactionHistoryData, { id: assignTag.id }));
			// 	_state.transactionHistoryData[index].tag = assignTag.categories.length > 0 ? assignTag.categories[0].value : assignTag.tags[0].value;
			// }
			// _assignTagResponse = true;
			// FinancialStoriesStore.emitChange();
			break;
		case FinancialStoriesConstants.UPDATE_TAG_REQUEST_SUCCESS:
			FinancialStoriesApiUtils.getTagsList();
			// FinancialStoriesStore.emitChange();
			break;
		case FinancialStoriesConstants.MICRO_TRANSACTION_REQUEST:
			getFinancialStoriesTileData(action.data);
			_fsTileSelectedMonth = action.data.selectedMonth;
			break;
		case FinancialStoriesConstants.CASHPOINT_REQUEST:
			// FinancialStoriesApiUtils.getCashPointTransactions();
			getFinancialStoriesTileData(action.data);
			_fsTileSelectedMonth = action.data.selectedMonth;
			break;
		case FinancialStoriesConstants.MICRO_TRANSACTION_REQUEST_SUCCESS:
			if (action.data !== null) {
				_microTileData = action.data;
				_microTileData.selectedMonth = _fsTileSelectedMonth;
			}
			_assignTagStatus = false;
			FinancialStoriesStore.emitChange();
			break;
		case FinancialStoriesConstants.CASHPOINT_REQUEST_SUCCESS:
			if (action.data !== null) {
				_cashPointData = action.data;
				_cashPointData.selectedMonth = _fsTileSelectedMonth;
			}
			_assignTagStatus = false;
			FinancialStoriesStore.emitChange();
			break;
		case FinancialStoriesConstants.IN_OUT_REQUEST:
			// FinancialStoriesApiUtils.getInOutTransactions();
			getFinancialStoriesTileData(action.data);
			_fsTileSelectedMonth = action.data.selectedMonth;
			break;
		case FinancialStoriesConstants.IN_OUT_REQUEST_SUCCESS:
			_inOutData = action.data;
			_inOutData.selectedMonth = _fsTileSelectedMonth;
			_assignTagStatus = false;
			FinancialStoriesStore.emitChange();
			break;
		case FinancialStoriesConstants.FINANCIAL_STORIES_UPDATE_TILE_CLICK:
			updateFSTileClick();
			break;
		case FinancialStoriesConstants.FINANCIAL_STORIES_UPDATE_TAG_ASSIGN:
			updateAssignTagResponse();
			break;
		case FinancialStoriesConstants.PROJECTION_TOUR_DONE_SUCESS:
			_projectionData = {};
			FinancialStoriesStore.emitChange();
			break;
		case FinancialStoriesConstants.MATCHALL_FOR_DROPDOWN_SUCCESS:
			_matchAllDataForDropDown = action.data;
			FinancialStoriesStore.emitChange();
			break;
		case FinancialStoriesConstants.PROJECTION_SETTING_CLICKED:
			_onLoad = false;
			FinancialStoriesStore.emitChange();
            break;
		default:

	}
});

module.exports = FinancialStoriesStore;
