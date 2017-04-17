/**
 * @module CallValidate3DStore
 */

// Packages
const assign = require('object-assign');
const _ = require('lodash');

// Actions
const AccountOpeningActions = require('../actions/AccountOpeningActions');

// Constants
const CallValidate3DConstants = require('../constants/CallValidate3DConstants');

// Dispatcher
const AppDispatcher = require('../dispatcher/AppDispatcher');
const EventEmitter = require('events').EventEmitter;

// Utils
const AccountOpeningApiUtils = require('../utils/AccountOpeningApiUtils');

const CHANGE_EVENT = 'change';
let _questions = [];
const _answers = {};

const CallValidate3DStore = assign({}, EventEmitter.prototype, {
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

	getAllQuestions() {
		return _questions.challenges || [];
	},

	/**
	 * Store the given answer.
	 *
	 * @param {Object} answer 	Question ID and answer.
	 * @return {Array} User's answers so far.
	 */
	setAnswer(answer) {
		if (answer && !_.isUndefined(answer['question_id'])) {
			_answers[answer['question_id']] = answer;
		}

		return _.values(_answers);
	},
});

CallValidate3DStore.dispatchToken = AppDispatcher.register(payload => {
	const action = payload.action;

	switch (action.actionType) {

	case CallValidate3DConstants.REQUEST_CALLVALIDATE3D_QUESTION_UPDATE:
		CallValidate3DStore.setAnswer(action.data);
		break;
	case CallValidate3DConstants.REQUEST_CALLVALIDATE3D_QUESTIONS:
		AccountOpeningApiUtils.getChallenges(action.data.caseId);
		break;
	case CallValidate3DConstants.REQUEST_CALLVALIDATE3D_QUESTIONS_SUCCESS:
		_questions = action.data;
		CallValidate3DStore.emitChange();
		break;
	case CallValidate3DConstants.REQUEST_CALLVALIDATE3D_AUTHENTICATION:
		AccountOpeningApiUtils.postAuthenticateChallenges(action.data.caseId, _.values(_answers));
		break;
	case CallValidate3DConstants.REQUEST_CALLVALIDATE3D_AUTHENTICATION_SUCCESS:
		AccountOpeningActions.navigateToWebTask('WEB-SUBMIT-CALL3D');
		break;
	default:
		// Do nothing.
	}
});

module.exports = CallValidate3DStore;
