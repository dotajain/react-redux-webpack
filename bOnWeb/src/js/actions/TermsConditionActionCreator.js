const AppDispatcher = require('../dispatcher/AppDispatcher');
const TermsConditionConstants = require('../constants/TermsConditionConstants');

const TermsConditionActionCreator = {
    getTcData() {
        console.log(TermsConditionConstants.GET_TC_DATA);
        AppDispatcher.handleViewAction({
            actionType: TermsConditionConstants.GET_TC_DATA,

        });
        console.log('TcActionCreator-getTcData');
    },
    handleTcDataSuccess(response) {
        AppDispatcher.handleServerAction({
            actionType: TermsConditionConstants.GET_TC_DATA_SUCCESS,
            data: response,
          });
    },
    handleTcTextDataSuccess(response) {
      AppDispatcher.handleServerAction({
            actionType: TermsConditionConstants.GET_TC_TEXT_DATA_SUCCESS,
            data: response,
          });
    },
    acceptTermsConditions() {
      AppDispatcher.handleViewAction({
            actionType: TermsConditionConstants.REQUEST_ACCEPT_TC,
          });
    },
};

module.exports = TermsConditionActionCreator;
