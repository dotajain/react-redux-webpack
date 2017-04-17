/**
 * CallValidate3DServerActionCreator
 * @class CallValidate3DServerActionCreator
 */

const AppDispatcher = require('../dispatcher/AppDispatcher');
const CallValidate3DConstants = require('../constants/CallValidate3DConstants');

const CallValidate3DServerActionCreator = {

	handleCallValidate3DQuestionsSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: CallValidate3DConstants.REQUEST_CALLVALIDATE3D_QUESTIONS_SUCCESS,
			data: response,
		});
	},

	handleCallValidate3DAuthenticationSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: CallValidate3DConstants.REQUEST_CALLVALIDATE3D_AUTHENTICATION_SUCCESS,
			data: response,
		});
	},

};

module.exports = CallValidate3DServerActionCreator;
