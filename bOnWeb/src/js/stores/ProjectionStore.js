/**
 * @module ProjectionStore
 */

const AppDispatcher = require('../dispatcher/AppDispatcher');
const assign = require('object-assign');
const EventEmitter = require('events').EventEmitter;
const ProjectionConstants = require('../constants/ProjectionConstants');
const ProjectionApiUtils = require('../utils/ProjectionApiUtils');

const CHANGE_EVENT = 'change';

let _projectionSummary = [];
let _earningsAndCommitments = [];
let _essentialSpending = [];
let _projectionAlerts = [];
let _projectionAlertsAmountValue = '';
let _projectionAlertsNotificationBoolean = '';
let _projectionSettingsFlag;
let _categoryTagsForProjectionTab = [];
let _userTagsForProjectionTab = [];
let _amountValue = '';
let _alertsNotificationFlag = '';
let _currency = '';
let _getNotificationAmount = '';

let _onLoad = true;
let _earningIdArray = [];
let _warningsCount = [];
let _categoryTags = [];
let _userTags = [];
let _alertAmount;
let _alertFlag;
let _forecasts = [];
let _demoDoneClicked = false;
let _activityIndicator = false;
let _isCrunching = false;
let _optoutClicked = true;
let _setAmountToDecimal = 0;
const ProjectionStore = assign({}, EventEmitter.prototype, {

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

     getProjectionSummary() {
         return _projectionSummary || [];
     },
    getEarningsAndCommitments() {
        return _earningsAndCommitments || [];
    },
    getProjectionAlertsAmountValue() {
        return _projectionAlertsAmountValue;
    },
    getProjectionAlertsNotificationBoolean() {
        return _projectionAlertsNotificationBoolean;
    },
    getProjectionSettingsFlag() {
        return _projectionSettingsFlag;
    },
    getCategoryTagsForProjectionTab() {
        return _categoryTagsForProjectionTab || [];
    },
    getUserTagsForProjectionTab() {
        return _userTagsForProjectionTab || [];
    },
    getNotificationAmount() {
        return _getNotificationAmount || [];
    },
    getCurrency() {
        return _currency;
    },
    getOnload() {
        return _onLoad;
    },
    getTourFlag() {
        return _projectionSettingsFlag;
    },
    getEarningId() {
            return _earningIdArray || [];
    },
    getCategoryTags() {
        return _categoryTags || [];
    },
    getUserTags() {
        return _userTags || [];
    },
    setProjectionAlertAmount(alertAmount) {
      _alertAmount = alertAmount;
    },
    setProjectionNotification(alertNotficationFlag) {
      _alertFlag = alertNotficationFlag;
    },
    getProjectionAlertAmount() {
        return _alertAmount;
    },
    getProjectionNotificationFlag() {
        return _alertsNotificationFlag;
    },
    getForecasts() {
        return _forecasts;
    },
    isDemoDoneCliked() {
        return _demoDoneClicked;
    },
    getActivityIndicator(){
        return _activityIndicator;
    },
    getCrunching(){
		return _isCrunching;
	},
    getActualAmountWithDecimal() {
        return _setAmountToDecimal;
    },
    
});

ProjectionStore.dispatchToken = AppDispatcher.register(payload => {
    const action = payload.action;

    switch (action.actionType) {
        case ProjectionConstants.REQUEST_EARNINGS_COMMITMENTS:
            _isCrunching = false;
            ProjectionApiUtils.getEarningCommitments();
            break;
        case ProjectionConstants.REQUEST_EARNINGS_COMMITMENTS_SUCCESS:
            _earningsAndCommitments = action.data;
            _projectionSettingsFlag = action.data.enabled;
            _categoryTags = [];
            action.data.essential_spend.categories.map((category) => {
                if (category.enabled) {
                    _categoryTags.push(category.id);
                }
            });
            _userTags = [];
            action.data.essential_spend.tags.map((tag) => {
                if (tag.enabled) {
                    _userTags.push(tag.id);
                }
            });
            _earningIdArray = [];
            action.data.earnings.map((earningid) => {
                if (earningid.enabled === true) {
                    _earningIdArray.push(earningid.id);
                }
            });
            _projectionAlertsAmountValue = (action.data.thresholds.lower.amount.value).toFixed(2);
            _setAmountToDecimal = (action.data.thresholds.lower.amount.value).toFixed(2);
            _projectionAlertsNotificationBoolean = action.data.external_notification;
            _currency = action.data.thresholds.lower.amount.currency;
            _forecasts = action.data.forecasts;
            _onLoad = true;
            _isCrunching = false;
            ProjectionStore.emitChange();
            break;

        case ProjectionConstants.DONE_PROJECTIONS:
            _demoDoneClicked = false;
            ProjectionApiUtils.projectionsUpdate(action.data.cpProjectionPreferences);
            _isCrunching = false;
            _activityIndicator = true;
            _optoutClicked = action.data.from === 'optout';
            if(_optoutClicked){
              _activityIndicator = true;
            }
            ProjectionStore.emitChange();
            break;
        case ProjectionConstants.DONE_PROJECTIONS_SUCCESS:
             _isCrunching = !_optoutClicked;
             _activityIndicator = false;
             if(_optoutClicked){
              _activityIndicator = false;
            }
            ProjectionStore.emitChange();
            break;
        case ProjectionConstants.CATEGORY_TAGS_FOR_PROJECTION_TAB:
            _categoryTagsForProjectionTab = action.data;
            break;
        case ProjectionConstants.USER_TAGS_FOR_PROJECTION_TAB:
            _userTagsForProjectionTab = action.data;
            break;
        case ProjectionConstants.SET_AMOUNT_FOR_NOTIFICATION_ALERT:
            _getNotificationAmount = action.data;
            break;
        case ProjectionConstants.GET_EARNINGS_ID:
            _earningIdArray = action.data;
            break;
        case ProjectionConstants.PROJECTION_TOUR_DONE_CLICKED:
            _demoDoneClicked = true;
            break;
        case ProjectionConstants.PROJECTION_CRUNCH_BACK_CLICKED:
            _isCrunching = false;
            break;
        case ProjectionConstants.PROJECTION_LEAVE_SETUP:
             _onLoad = false;
            break;    
        default:
    }
});

module.exports = ProjectionStore;
