/**
 * @module UIActions
 * @requires AppConstants
 * @requires AppDispatcher
 */

const AppConstants = require('../constants/AppConstants');
const AppDispatcher = require('../dispatcher/AppDispatcher');

/**
 * @class UIActions
 */
const UIActions = {

	notifyHeaderCollapse() {
		AppDispatcher.handleViewAction({
			actionType: AppConstants.HEADER_COLLAPSE,
		});
	},

	notifyHeaderExpand() {
		AppDispatcher.handleViewAction({
			actionType: AppConstants.HEADER_EXPAND,
		});
	},
};

module.exports = UIActions;
