/**
 * @class PortalServerActionCreator
 */

const AppDispatcher = require('../dispatcher/AppDispatcher');
const PortalConstants = require('../constants/PortalConstants');

const PortalServerActionCreator = {

	/**
	 * Action to handle an API call success
	 * @param  {object} response getCases api response
	 */
	handlePortalCasesSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: PortalConstants.REQUEST_PORTAL_CASES_SUCCESS,
			data: response,
		});
	},
};

module.exports = PortalServerActionCreator;
