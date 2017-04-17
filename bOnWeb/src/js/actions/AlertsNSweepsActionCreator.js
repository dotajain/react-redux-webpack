/**
 * AlertsNSweepsActionCreator
 * @class AlertsNSweepsActionCreator
 */

const AppDispatcher = require('../dispatcher/AppDispatcher');
const AlertsNSweepsConstant = require('../constants/AlertsNSweepsConstant');

const AlertsNSweepsActionCreator = {

	/**
	 * Action to get all accounts from API
	 */
	getSweepsList() {
		AppDispatcher.handleViewAction({
			actionType: AlertsNSweepsConstant.REQUEST_SWEEPS_DETAILS,
		});
	},

	handleAlertsNSweepsError(data, response) {
		AppDispatcher.handleServerAction({
			actionType: AlertsNSweepsConstant.ALERTS_SWEEPS_FAILURE,
			data: data,
			response: response,
		});
	},

	handleAlertSweepProjectionListError(response) {
		AppDispatcher.handleServerAction({
			actionType: AlertsNSweepsConstant.ALERT_SWEEP_PROJECTION_LIST_FAILURE,
			data: response,
		});
	},

	handleAlertListError(response) {
		AppDispatcher.handleServerAction({
			actionType: AlertsNSweepsConstant.ALERTS_LIST_FAILURE,
			data: response,
		});
	},

	handleSweepListError(response) {
		AppDispatcher.handleServerAction({
			actionType: AlertsNSweepsConstant.SWEEPS_LIST_FAILURE,
			data: response,
		});
	},

	handleProjectionListError(response) {
		AppDispatcher.handleServerAction({
			actionType: AlertsNSweepsConstant.PROJECTIONS_LIST_FAILURE,
			data: response,
		});
	},

	// setErrorState(flag) {
	// 	AppDispatcher.handleServerAction({
	// 	actionType: AlertsNSweepsConstant.SET_ERROR_STATE,
	// 	data:flag,
	// 	});
	// },

	// TO HANDLE SERVER ACTIONS
	/**
	 * Action to handle an API call success
	 * @param  {object} response getCases api response
	 */
	handleSweepsSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: AlertsNSweepsConstant.REQUEST_SWEEPS_DETAILS_SUCCESS,
			data: response,
		});
	},

	/**
	 * Action to get all accounts from API
	 */
	getAlertsList() {
		AppDispatcher.handleViewAction({
			actionType: AlertsNSweepsConstant.REQUEST_ALERTS_DETAILS,
		});
	},

	// TO HANDLE SERVER ACTIONS
	/**
	 * Action to handle an API call success
	 * @param  {object} response getCases api response
	 */
	handleAlertsSuccess(response, refreshList) {
		AppDispatcher.handleServerAction({
			actionType: AlertsNSweepsConstant.REQUEST_ALERTS_DETAILS_SUCCESS,
			data: response,
			refreshList: refreshList,
		});
	},

	getProjectionAlertsList() {
		AppDispatcher.handleViewAction({
			actionType: AlertsNSweepsConstant.REQUEST_PROJECTION_ALERTS_DETAILS,
		});
	},

	// TO HANDLE SERVER ACTIONS
	/**
	 * Action to handle an API call success
	 * @param  {object} response getCases api response
	 */
	handleProjectionAlertsSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: AlertsNSweepsConstant.REQUEST_PROJECTION_ALERTS_DETAILS_SUCCESS,
			data: response,
		});
	},

	setSweepId(id) {
		AppDispatcher.handleViewAction({
			actionType: AlertsNSweepsConstant.SET_EDIT_SWEEP_ID,
			data: id,
		});
	},

	setSweepMyAccount(id) {
		AppDispatcher.handleViewAction({
			actionType: AlertsNSweepsConstant.SET_IN_MY_ACCOUNT,
			data: id,
		});
	},

	setSweepMyAccountOut(id) {
		AppDispatcher.handleViewAction({
			actionType: AlertsNSweepsConstant.SET_OUT_MY_ACCOUNT,
			data: id,
		});
	},
	targetMoney(data) {
		AppDispatcher.handleViewAction({
			actionType: AlertsNSweepsConstant.REQUEST_SWEEP_TARGET_MONEY,
			data: data,
		});
	},

	thresholdMoney(data) {
		AppDispatcher.handleViewAction({
			actionType: AlertsNSweepsConstant.REQUEST_SWEEP_THRESHOLD_MONEY,
			data: data,
		});
	},

	targetAlertMoney(data) {
		AppDispatcher.handleViewAction({
			actionType: AlertsNSweepsConstant.ALERT_TARGET_MONEY,
			data: data,
		});
	},

	targetProjectionAlertMoney(data) {
		AppDispatcher.handleViewAction({
			actionType: AlertsNSweepsConstant.PROJECTION_ALERT_TARGET_MONEY,
			data: data,
		});
	},

	resetPopup() {
		AppDispatcher.handleViewAction({
			actionType: AlertsNSweepsConstant.RESET_POPUP,
		});
	},

	hideHeaderComponent(show) {
		AppDispatcher.handleViewAction({
			actionType: AlertsNSweepsConstant.HIDE_HEADER_COMPONENT,
			data: show,
		});
	},

	setAlertLessMoreValue(id) {
		AppDispatcher.handleViewAction({
			actionType: AlertsNSweepsConstant.SET_ALERT_LESS_MORE_VALUE,
			data: id,
		});
	},

	setAlertMyAccount(id) {
		AppDispatcher.handleViewAction({
			actionType: AlertsNSweepsConstant.SET_ALERT_ACCOUNT,
			data: id,
		});
	},

	setProjectionAlertInMyAccount(id) {
		AppDispatcher.handleViewAction({
			actionType: AlertsNSweepsConstant.SET_PROJECTION_ALERT_ACCOUNT,
			data: id,
		});
	},

	handleAccountDetailsSuccess(data) {
		AppDispatcher.handleViewAction({
			actionType: AlertsNSweepsConstant.ALERT_SWEEPS_ACCOUNT_DETAILS,
			data: data,
		});
	},

	handleAccountDetailsError(response) {
		AppDispatcher.handleServerAction({
			actionType: AlertsNSweepsConstant.ALERT_SWEEPS_ACCOUNT_DETAILS_ERROR,
			data: response,
		});
	},

	setCompName(data) {
		AppDispatcher.handleViewAction({
			actionType: AlertsNSweepsConstant.SET_COMP_NAME,
			data: data,
		});
	},

	resetFlag(data) {
		AppDispatcher.handleViewAction({
			actionType: AlertsNSweepsConstant.RESET_FLAG,
			data: data,
		});
	},
};

module.exports = AlertsNSweepsActionCreator;

