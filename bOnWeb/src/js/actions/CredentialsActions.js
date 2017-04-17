/**
 * @module CredentialsActions
 */

const CredentialsConstants = require('../constants/CredentialsConstants');
const AppDispatcher = require('../dispatcher/AppDispatcher');

/**
 * @class CredentialsActions
 */
const CredentialsActions = {

	getCredentials() {
		AppDispatcher.handleViewAction({
			actionType: CredentialsConstants.GET_CREDENTIALS,
		});
	},

};

module.exports = CredentialsActions;
