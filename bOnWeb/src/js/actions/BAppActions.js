/**
 * @module BAppActions
 * @requires BAppConstants
 * @requires AppDispatcher
 * @requires appConstants
 */

const BAppConstants = require('../constants/BAppConstants');
const AppDispatcher = require('../dispatcher/AppDispatcher');
const AppConstants = require('../constants/AppConstants');

/**
 * @class BAppActions
 */
const BAppActions = {

	raise(actionType, data) {
		AppDispatcher.handleViewAction({
			actionType,
			data,
		});
	},

	/**
	 * User has changed a value in the form.
	 *
	 * @param  {String} key   		Which value was changed?
	 * @param  {Any} value 			What is the new value?
	 * @param  {String} arrayName 	Optional value, used if the value should be stored in an array
	 * @param  {String}  arrayIndex	Optional value, specifies the index within the array to update
	 */
	updateFormValue(key, value, arrayName, arrayIndex) {
		BAppActions.raise(BAppConstants.UPDATE_FORM_VALUE, {
			key,
			value,
			arrayName,
			arrayIndex,
		}
		);
	},

	/**
	 * User has changed a value in the form.
	 *
	 * @param  {Array} data 	List of objects, each with a "key" and "value" pair.
	 */
	updateFormValues(data) {
		BAppActions.raise(BAppConstants.UPDATE_FORM_VALUES, data);
	},

	/**
	 * User has entered a new value Is it valid?
	 *
	 * @param  {String}  group   	Inputs are grouped by form.
	 * @param  {String}  key     	Name of the input.
	 * @param  {Boolean} isValid 	True if the value passes validation.
	 */
	updateValidation(group, key, isValid) {
		BAppActions.raise(BAppConstants.UPDATE_VALIDATION, {
			group,
			key,
			isValid,
		});
	},

	/**
	 * User removed a question. Is the form valid?
	 *
	 * @param  {String}  group   	Inputs are grouped by form.
	 * @param  {String}  key     	Name of the input.
	 */
	removeValidation(group, key) {
		BAppActions.raise(BAppConstants.REMOVE_VALIDATION, {
			group,
			key,
		});
	},

	/**
	 * The given field can now be visibly validated (i.e. show error messages)
	 *
	 * @param  {String}  group   	Inputs are grouped by form.
	 * @param  {String}  key     	Name of the input.
	 */
	enableValidation(group, key) {
		BAppActions.raise(BAppConstants.ENABLE_VALIDATION, {
			group,
			key,
		});
	},

	/**
	 * What screen should the user be on?
	 *
	 * @param {String} caseId 		User case ID.
	 */
	getNextTask(caseId) {
		BAppActions.raise(AppConstants.GET_NEXT_TASK, { caseId });
	},

	/**
	 * Take the user to the URL represented by the given task ID.
	 *
	 * This should never be called with CSAP tasks. They should be fetched
	 * only from the API (via BAppActions.getNextTask) so that
	 * we are never out of sync with CSAP.
	 */
	navigateToWebTask(taskId) {
		BAppActions.raise(AppConstants.NAVIGATE_TO_WEB_TASK, { taskId });
	},

	/**
	 * Clear stored task IDs.
	 */
	clearTasks() {
		BAppActions.raise(AppConstants.CLEAR_TASKS);
	},

	/**
	 * Clear stored web task ID.
	 */
	clearWebTask() {
		BAppActions.raise(AppConstants.CLEAR_WEB_TASK);
	},

	/**
	 * Track when the user is/isn't editing a field in the form.
	 *
	 * @param {Boolean} isEditing Are they currently editing a field?
	 */
	setUserIsEditingField(isEditing) {
		BAppActions.raise(BAppConstants.SET_USER_IS_EDITING_FIELD, { isEditing });
	},

	/**
	 * Force autosaving of the user's data to start.
	 * Successful save calls automatically trigger the next autosave timer, so this
	 * is only needed for the initial kick-off.
	 */
	startAutosaveTimer() {
		BAppActions.raise(BAppConstants.START_AUTOSAVE_TIMER);
	},

	/**
	 * Bank ID may or may not be present in the data store from app start
	 * @param  {bankId}
	 */
	setBankId(bankID) {
		BAppActions.raise(BAppConstants.SET_BANK_ID, { bankID });
	},

	/**
	 * Clear any bankID that has been set
	 */
	resetBankId() {
		BAppActions.raise(BAppConstants.RESET_BANK_ID);
	},

	/**
	 * Clear any username that has been set
	 */
	resetUsername() {
		BAppActions.raise(BAppConstants.CLEAR_USERNAME);
	},

	/**
	 * Receives Http get response body
	 * @param  {object} result Http response body
	 */
	receiveGetResult(result) {
		BAppActions.raise(BAppConstants.RECEIVE_GET_RESULT, { result });
	},

	/**
	 * Records that a task has been completed
	 * @param  {string} taskId Id of the task that has just been completed
	 */
	recordTaskComplete(taskId) {
		BAppActions.raise(BAppConstants.RECORD_TASK_COMPLETE, { taskId });
	},
};

module.exports = BAppActions;
