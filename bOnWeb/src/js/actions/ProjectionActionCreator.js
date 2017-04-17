/**
 * TimelineActionCreator
 * @class TimelineActionCreator
 */

const AppDispatcher = require('../dispatcher/AppDispatcher');
const ProjectionConstants = require('../constants/ProjectionConstants');
const FinancialStoriesConstants = require('../constants/FinancialStoriesConstants');
const ProjectionActionCreator = {
	/**
	 * Action to get all accounts from API
	 */
	// projections page ends
	getEarningsAndCommitment() {
		AppDispatcher.handleViewAction({
			actionType: ProjectionConstants.REQUEST_EARNINGS_COMMITMENTS,
		});
	},
	projectionCrunchBackClicked() {
		AppDispatcher.handleViewAction({
			actionType: ProjectionConstants.PROJECTION_CRUNCH_BACK_CLICKED,
		});
	},
	handleEarningsCommitmentSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: ProjectionConstants.REQUEST_EARNINGS_COMMITMENTS_SUCCESS,
			data: response,
		});
	},
	handleProjectionDoneSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: ProjectionConstants.DONE_PROJECTIONS_SUCCESS,
			data: response,
		});
	},
	// projections and settings starts
	/**
		 * Action to get all accounts from API
		 */
	// TO HANDLE SERVER ACTIONS
	/**
	 * Action to handle an API call success
	 * @param  {object} response getCases api response
	 */
	// projections and settings ends
	getProjectionAlerts() {
		AppDispatcher.handleViewAction({
			actionType: ProjectionConstants.GET_PROJECTION_ALERTS,
		});
	},
	// TO HANDLE SERVER ACTIONS
	/**
	 * Action to handle an API call success
	 * @param  {object} response getCases api response
	 */
	doneProjections(projectionObject) {
		AppDispatcher.handleViewAction({
			actionType: ProjectionConstants.DONE_PROJECTIONS,
			data: projectionObject,
		});
	},
	getCategoryTagsForTab(categoryTagArray) {
		AppDispatcher.handleViewAction({
			actionType: ProjectionConstants.CATEGORY_TAGS_FOR_PROJECTION_TAB,
			data: categoryTagArray,
		});
	},
	getUserTagsForTab(userTagArray) {
		AppDispatcher.handleViewAction({
			actionType: ProjectionConstants.USER_TAGS_FOR_PROJECTION_TAB,
			data: userTagArray,
		});
	},
	setAlertNotificationAmount(alertsAmountValue) {
		AppDispatcher.handleViewAction({
			actionType: ProjectionConstants.SET_AMOUNT_FOR_NOTIFICATION_ALERT,
			data: alertsAmountValue,
		});
	},
	setAlertsNotificationFlag(notificationFlag) {
		AppDispatcher.handleViewAction({
			actionType: ProjectionConstants.SET_NOTIFICATION_FLAG,
			data: notificationFlag,
		});
	},
	setEarningsId(value) {
		AppDispatcher.handleViewAction({
			actionType: ProjectionConstants.GET_EARNINGS_ID,
			data: value,
		});
	},

	handleFSProjectionTourDone() {
		AppDispatcher.handleViewAction({
			actionType: ProjectionConstants.PROJECTION_TOUR_DONE_CLICKED,
		});
	},
	handleProjectionSettingLeaveSetup() {
		AppDispatcher.handleViewAction({
			actionType: ProjectionConstants.PROJECTION_LEAVE_SETUP,
		});
	},
};

module.exports = ProjectionActionCreator;

