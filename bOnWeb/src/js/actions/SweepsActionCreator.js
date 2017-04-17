// SweepsActions.js
/**
 * SweepsActionCreator
 * @class SweepsActionCreator
 */

const AppDispatcher = require('../dispatcher/AppDispatcher');
const SweepsConstants = require('../constants/SweepsConstants');

const SweepsActionCreator = {

	/**
	 * Action to get all accounts from API
	 */
	createSweepData(data) {
        AppDispatcher.handleViewAction({
			actionType: SweepsConstants.CREATE_SWEEP_DETAILS,
			data: data,
		});
	},

    editSweepData(toggleSweep, accountId) {
        AppDispatcher.handleViewAction({
			actionType: SweepsConstants.EDIT_SWEEP_REQUEST,
			toggleSweep:toggleSweep,
			accountId,
		});
	},

    handleEditSweepSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: SweepsConstants.EDIT_SWEEP_REQUEST_SUCCESS,
			data: response,
		});
	},

	handleCreateSweepSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: SweepsConstants.CREATE_SWEEP_DETAILS_SUCCESS,
			data: response,
		});
	},

	sendDeleteData(id) {
		AppDispatcher.handleViewAction({
			actionType: SweepsConstants.DELETE_SWEEP_DATA,
			data: id,
		});
	},

	handleDeleteSweepsSuccess(data) {
		AppDispatcher.handleServerAction({
			actionType: SweepsConstants.DELETE_SWEEPS_SUCCESS,
				data: data,
		});
	},

	handleDeleteSweepsError(data) {
		AppDispatcher.handleViewAction({
			actionType: SweepsConstants.DELETE_SWEEPS_FAILURE,
			data: data,
		});
	},
};

module.exports = SweepsActionCreator;

