/**
 * @module AppStore
 */

// Packages
const _ = require('lodash');
const uuid = require('node-uuid');
const assign = require('object-assign');

// React
const AppDispatcher = require('../dispatcher/AppDispatcher');
const EventEmitter = require('events').EventEmitter;

// Constants
const AppConstants = require('../constants/AppConstants');
const SessionConstants = require('../constants/SessionConstants');

// Utils
const StorageUtils = require('../utils/StorageUtils');
const TaskUtils = require('../utils/TaskUtils');

// Private vars
const CHANGE_EVENT = 'change';

function getSessionId() {
	let sessionId = StorageUtils.get('sessionId');

	if (!sessionId) {
		// Generate a new UUID.
		sessionId = uuid.v1();
		StorageUtils.set('sessionId', sessionId);
	}

	return sessionId;
}

// All possible account opening values. Default values for each are specified here.
const _fields = {
	sessionId: getSessionId(),
	apiTaskId: 'capture',		// Default to the first stage most users will hit.
	pageTitle: undefined,
};

// Track the URLs of the current API calls in progress.
let _apiCallsInProgress = [];

const AppStore = assign({}, EventEmitter.prototype, {

	/**
	 * Alert listeners that the Store has changed.
	 */
	emitChange() {
		this.emit(CHANGE_EVENT);
	},

	/**
	 * Allow views to specify functions to run when this store changes.
	 *
	 * @param {function} callback		Function to run on change.
	*/
	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	/**
	 * Allow views to unbind listeners before dismounting.
	 *
	 * @param  {Function} callback 		Function to unbind.
	 */
	removeChangeListener(callback) {
		this.removeListener('change', callback);
	},

	/**
	 * Fetch a value from the Store.
	 *
	 * @param  {String} key 		Key of the value to get.
	 * @param {Any} defaultVal 		Used if the request key is undefined.
	 * @return {Any}    		The corresponding value.
	 */
	getValue(key) {
		return _fields[key];
	},

	/**
	 * Fetch all values in the store.
	 *
	 * @return {Object} 		All stored values.
	 */
	getAll() {
		const result = _.cloneDeep(_fields); // Ensures that components never edit the _fields object in this store directly.
		result.isApiCallInProgress = (_apiCallsInProgress.length > 0);

		return result;
	},

	/**
	 * Kick off an API call to check the current task for this case.
	 */
	getNextTask(caseId) {
		if (caseId) {
			const AccountOpeningApiUtils = require('../utils/AccountOpeningApiUtils');
			AccountOpeningApiUtils.getNextTask(this.setApiTaskId.bind(this), caseId);
		} else {
			console.warn('No case ID given to getNextTask');
		}
	},

	/**
	 * Update the current API taskUri
	 *
	 * @param {String} taskUri 			URI of the task.
	 */
	setApiTaskId(taskUri) {
		_fields.apiTaskId = TaskUtils.getTaskId(taskUri);
		_fields.webTaskId = undefined;
		this.emitChange();
	},

	/**
	 * Update the current web taskId
	 *
	 * Does not reset API task ID, as visiting loading page
	 * would then cause a navigation on first getNextTask response.
	 *
	 * @param {String} taskId 			ID of the task.
	 */
	setWebTaskId(taskId) {
		_fields.webTaskId = taskId;
		this.emitChange();
	},

	/**
	 * Log that an API call has begun.
	 *
	 * @param  {String} url
	 */
	trackApiCallStarted(url) {
		_apiCallsInProgress.push(url);
		this.emitChange();
	},

	/**
	 * Log that an API call has finished.
	 *
	 * @param  {String} url
	 */
	trackApiCallComplete(url) {
		_apiCallsInProgress = _.without(_apiCallsInProgress, url);
		this.emitChange();
	},

	/**
	 * Update the current page title.
	 *
	 * @param {String} pageTitle
	 */
	setPageTitle(pageTitle) {
		_fields.pageTitle = pageTitle;
		this.emitChange();
	},
});

/**
 * Listen for dispatcher events.
 *
 * @param  {Object} payload 			Data attached to a dispatcher action.
 */
AppStore.dispatchToken = AppDispatcher.register(payload => {
	const action = payload.action;

	switch (action.actionType) {
		case AppConstants.SHOW_SPINNER:
			_fields.showSpinner = true;
			AppStore.emitChange();
			break;

		case AppConstants.HIDE_SPINNER:
			_fields.showSpinner = false;
			AppStore.emitChange();
			break;

		case AppConstants.HEADER_EXPAND:
			_fields.displayingExpandedHeader = true;
			AppStore.emitChange();
			break;

		case AppConstants.HEADER_COLLAPSE:
			_fields.displayingExpandedHeader = false;
			AppStore.emitChange();
			break;

		case SessionConstants.REQUEST_ACCESS_TOKEN_CREATE_SUCCESS:
			_fields.requireOTPAuthentication = false;
			AppStore.emitChange();
			break;

		case AppConstants.GET_NEXT_TASK:
			AppStore.getNextTask(action.data.caseId);
			break;

		case AppConstants.NAVIGATE_TO_WEB_TASK:
			AppStore.setWebTaskId(action.data.taskId);
			break;

		case AppConstants.CLEAR_TASKS:
			_fields.apiTaskId = undefined;
			_fields.webTaskId = undefined;
			AppStore.emitChange();
			break;

		case AppConstants.CLEAR_WEB_TASK:
			_fields.webTaskId = undefined;
			AppStore.emitChange();
			break;
		case AppConstants.TRACK_API_CALL_STARTED:
			AppStore.trackApiCallStarted(action.data.url);
			break;

		case AppConstants.TRACK_API_CALL_COMPLETE:
			AppStore.trackApiCallComplete(action.data.url);
			break;

		default:
			// Do nothing.
	}
});

module.exports = AppStore;
