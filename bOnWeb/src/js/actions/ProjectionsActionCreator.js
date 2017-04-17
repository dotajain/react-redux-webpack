// ProjectionsActionsCreator.js
/**
 * ProjectionsActionCreator
 * @class TimelineActionCreator
 */

const AppDispatcher = require('../dispatcher/AppDispatcher');
const ProjectionsConstants = require('../constants/ProjectionsConstants');

const ProjectionsActionCreator = {

	/**
	 * Action to get all accounts from API
	 */

	editProjectionData(toggleProjection, accountId) {
        AppDispatcher.handleViewAction({
			actionType: ProjectionsConstants.UPDATE_PROJECTION_DETAILS,
			toggleProjection: toggleProjection,
			accountId,
		});
	},


	// TO HANDLE SERVER ACTIONS
	/**
	 * Action to handle an API call success
	 * @param  {object} response getCases api response
	 */

    handleEditProjectionAlertsDataSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: ProjectionsConstants.UPDATE_PROJECTION_DETAILS_SUCCESS,
			data: response,

		});
	},
	// TO HANDLE SERVER ACTIONS
	/**
	 * Action to handle an API call success
	 * @param  {object} response getCases api response
	 */

    setProjectionEdited(response) {
		AppDispatcher.handleServerAction({
			actionType: ProjectionsConstants.RESET_UPDATION_FLAG,
			data: response,

		});
	},

};

module.exports = ProjectionsActionCreator;

