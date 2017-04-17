// AlertsActions.js
// SweepsActions.js
/**
 * TimelineActionCreator
 * @class TimelineActionCreator
 */

const AppDispatcher = require('../dispatcher/AppDispatcher');
const AlertsConstants = require('../constants/AlertsConstants');

const AlertsActionCreator = {

	/**
	 * Action to get all accounts from API
	 */
	sendAlertData() {
        AppDispatcher.handleViewAction({
			actionType: AlertsConstants.CREATE_ALERT_DETAILS,
		});
	},

	sendEditAlertData(id, amount, lessMore, toggleAlert, fromToggle) {
        AppDispatcher.handleViewAction({
			actionType: AlertsConstants.UPDATE_ALERT_DETAILS,
			accountId: id,
			amount: amount,
			lessMore: lessMore,
			toggleAlert: toggleAlert,
			fromToggle: fromToggle,
		});
	},


	// TO HANDLE SERVER ACTIONS
	/**
	 * Action to handle an API call success
	 * @param  {object} response getCases api response
	 */
	handleAlertsDataSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: AlertsConstants.CREATE_ALERT_DETAILS_SUCCESS,
			data: response,
		});
	},

	handleEditAlertsDataSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: AlertsConstants.UPDATE_ALERT_DETAILS_SUCCESS,
			data: response,
		});
	},

};

module.exports = AlertsActionCreator;

