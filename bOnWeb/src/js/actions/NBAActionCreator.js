/**
 * NBAActionCreator
 * @class NBAActionCreator
 */

const AppDispatcher = require('../dispatcher/AppDispatcher');
const NBAConstants = require('../constants/NBAConstants');

const NBAActionCreator = {
        /**
     * Action to get all NBAData from API
     */
    getNBAData() {
        AppDispatcher.handleViewAction({
            actionType: NBAConstants.GET_NBA_DATA,
        });
    },
    closeNBAData() {
        AppDispatcher.handleViewAction({
            actionType: NBAConstants.NBA_CLOSE,
        });
    },
    // TO HANDLE SERVER ACTIONS
	/**
	 * Action to handle an API call success
	 * @param  {object} response getCases api response
	 */
    handleNBADataSuccess(response) {
        AppDispatcher.handleServerAction({
            actionType: NBAConstants.GET_NBA_DATA_SUCCESS,
            data: response,
        });
    },
    // TO HANDLE NBAData Error
    handleNBADataError(error) {
        AppDispatcher.handleServerAction({
            actionType: NBAConstants.GET_NBA_DATA_ERROR,
            data: error,
        });
    },
};

module.exports = NBAActionCreator;
