/**
 * CallValidate3DActionCreator
 * @class CallValidate3DActionCreator
 */

const AppDispatcher = require('../dispatcher/AppDispatcher');
const CallValidate3DConstants = require('../constants/CallValidate3DConstants');

const CallValidate3DActionCreator = {

	requestCallValidate3DQuestions(caseId) {
		AppDispatcher.handleServerAction({
			actionType: CallValidate3DConstants.REQUEST_CALLVALIDATE3D_QUESTIONS,
			data: {
				caseId,
			},
		});
	},

	requestCallValidate3DQuestionUpdate(questionId, answerId) {
		const data = {
			answer: answerId,
		};
		data['question_id'] = questionId;

		AppDispatcher.handleServerAction({
			actionType: CallValidate3DConstants.REQUEST_CALLVALIDATE3D_QUESTION_UPDATE,
			data,
		});
	},

	requestCallValidate3DAuthentication(caseId) {
		AppDispatcher.handleServerAction({
			actionType: CallValidate3DConstants.REQUEST_CALLVALIDATE3D_AUTHENTICATION,
			data: {
				caseId,
			},
		});
	},

};

module.exports = CallValidate3DActionCreator;
