/**
 * PortalActionCreator
 * @class PortalActionCreator
 */

const AppDispatcher = require('../dispatcher/AppDispatcher');
const PortalConstants = require('../constants/PortalConstants');

const PortalActionCreator = {

	/**
	 * Action to get all customer cases from API
	 */
	requestPortalCases() {
		AppDispatcher.handleViewAction({
			actionType: PortalConstants.REQUEST_PORTAL_CASES,
		});
	},

};

module.exports = PortalActionCreator;
