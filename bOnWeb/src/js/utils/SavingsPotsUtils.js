const envConfig = require('../../static/config');
const config = require('../config');
const ApiUtils = require('./ApiUtils');
const PaymentsActionCreator = require('../actions/PaymentsActionCreator');
const SavingPotsActionCreator = require('../actions/SavingPotsActionCreator');
const _getPotsDataEndpoint = '/banks/{bank-id}/accounts/default/{account-id}/pots';
const _singlePotEndPoint = '/banks/{bank-id}/accounts/default/{account-id}/pots/{pot-id}';
const _editPotEndPoint = _singlePotEndPoint;
const _interPotEndPoint = '/banks/{bank-id}/accounts/default/{account-id}/pots/transactions';

const _getAccountListEndpoint = '/banks/{bank-id}/accounts/default';

const SavingsPotsUtils = {
    /**
     * API call for getAccoountList.
     * Retrieves the list of accounts for a customer.
     */
    getAccountsList() {
        let url = envConfig.apiBaseUrl + _getAccountListEndpoint;
        if (envConfig.stubConfig) {
            url = envConfig.stubConfig.timelineStub.AccountListConnection;
        }
        ApiUtils.makeAjaxCall({
            apiVersion: config.apiVersions.getPots,
            method: 'GET',
            url,
            addAuthToken: true,
        }, body => {
            SavingPotsActionCreator.handleAccountsListSuccess(body);
        }, error => {
            SavingPotsActionCreator.handleAccountsListError(error);
        });
    },
    getPotsData(accid) {
        let url = envConfig.apiBaseUrl + _getPotsDataEndpoint;
        url = url.replace('{account-id}', accid);
        if (envConfig.stubConfig) {
            const key = `GetPotsConnection-${accid}`;
            url = envConfig.stubConfig.savingspotsStub[key];
        }
        ApiUtils.makeAjaxCall({
            apiVersion: config.apiVersions.getPots,
            method: 'GET',
            url,
            addAuthToken: true,

        }, body => {
            SavingPotsActionCreator.handlePotDataSuccess(body);
        }, error => {
            SavingPotsActionCreator.handlePotDataError(error);
        });
    },
    getSinglePotData(potid, accid) {
        let url = envConfig.apiBaseUrl + _singlePotEndPoint;
        url = url.replace('{account-id}', accid);
        url = url.replace('{pot-id}', potid);
        if (envConfig.stubConfig) {
            const key = `GetPotsConnection-${accid}`;
            url = envConfig.stubConfig.savingspotsStub[key];
        }
        ApiUtils.makeAjaxCall({
            apiVersion: config.apiVersions.getPots,
            method: 'GET',
            url,
            addAuthToken: true,
        }, body => {
            SavingPotsActionCreator.handleSinglePotDataSuccess(body);
        }, (error, status) => {
            SavingPotsActionCreator.handleSinglePotDataError(error, status);
        });
    },
    getCreatePotData(newdata, accid) {
        const requestData = newdata;
        let url = envConfig.apiBaseUrl + _getPotsDataEndpoint;
        url = url.replace('{account-id}', accid);
        if (envConfig.stubConfig) {
            const key = `GetPotsConnection-${accid}`;
            url = envConfig.stubConfig.savingspotsStub[key];
        }
        ApiUtils.makeAjaxCall({
            apiVersion: config.apiVersions.getPots,
            method: 'POST',
            url,
            addAuthToken: true,
            requestData,
        }, body => {
            PaymentsActionCreator.getPotDetails(accid);
            SavingPotsActionCreator.handleCreatedPotDataSuccess(body);
        }, (error, status) => {
            SavingPotsActionCreator.handleCreatedPotDataError(error, status);
        });
    },
    deletePotConnection(potid, accid) {
        let url = envConfig.apiBaseUrl + _singlePotEndPoint;
        url = url.replace('{account-id}', accid);
        url = url.replace('{pot-id}', potid);
        if (envConfig.stubConfig) {
            const key = `GetPotsConnection-${accid}`;
            url = envConfig.stubConfig.savingspotsStub[key];
        }
        ApiUtils.makeAjaxCall({
            apiVersion: config.apiVersions.getPots,
            method: 'DELETE',
            url,
            addAuthToken: true,
        }, () => {
            PaymentsActionCreator.getPotDetails(accid);
            SavingPotsActionCreator.getPotData();
        });
    },
    editPotConnection(potid, accid, editedData) {
        const requestData = editedData;
        let url = envConfig.apiBaseUrl + _editPotEndPoint;
        url = url.replace('{account-id}', accid);
        url = url.replace('{pot-id}', potid);
        if (envConfig.stubConfig) {
            const key = `GetPotsConnection-${accid}`;
            url = envConfig.stubConfig.savingspotsStub[key];
        }
        ApiUtils.makeAjaxCall({
            apiVersion: config.apiVersions.getPots,
            method: 'PUT',
            url,
            addAuthToken: true,
            requestData,
        }, body => {
            PaymentsActionCreator.getPotDetails(accid);
            SavingPotsActionCreator.handleSinglePotDataSuccess(body);
        }, error => {
            SavingPotsActionCreator.handleSinglePotDataError(error);
        });
    },
    getInterPotData(newdata, accid) {
        const requestData = newdata;
        let url = envConfig.apiBaseUrl + _interPotEndPoint;
        url = url.replace('{account-id}', accid);
        if (envConfig.stubConfig) {
            const key = `GetPotsConnection-${accid}`;
            url = envConfig.stubConfig.savingspotsStub[key];
        }
        ApiUtils.makeAjaxCall({
            apiVersion: config.apiVersions.getPots,
            method: 'POST',
            url,
            addAuthToken: true,
            requestData,
        }, () => {
                 PaymentsActionCreator.getPotDetails(accid);
            SavingPotsActionCreator.getInterPotDataSuccess();
        }, error => {
            SavingPotsActionCreator.getInterPotDataError(error);
        });
    },
};

module.exports = SavingsPotsUtils;
