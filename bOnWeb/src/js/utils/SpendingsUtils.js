/**
 * @module SpendingsUtils
 */

const envConfig = require('../../static/config');
const config = require('../config');
const ApiUtils = require('./ApiUtils');
const SpendingsActionCreator = require('../actions/SpendingsActionCreator');

const _getBudgetDataEndPoint = '/banks/{bank-id}/budget';
const _getSpendingDataEndpoint = '/banks/{bank-id}/accounts/default/transactions/aggregations/breakDownOfSpend';
const _getTagBudgetDataEndPoint = '/banks/{bank-id}/tags/active';
const _budgetPreferencesEndPoint = '/user/budget/preferences';
const _getTransactionData = '/banks/{bank-id}/accounts/default/transactions/searches/matchAllWithFilter';
const _getPotsDataEndpoint = '/banks/{bank-id}/accounts/default/{account-id}/pots';

const _getAccountListEndpoint = '/banks/{bank-id}/accounts/default';

const SpendingsUtils = {
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
			apiVersion: config.apiVersions.spendingDataService,
			method: 'GET',
			url,
			addAuthToken: true,

		}, body => {
			SpendingsActionCreator.handleAccountsListSuccess(body);
		}, error => {
      SpendingsActionCreator.handleAccountsListError(error);
    });
	},

  /**
   * API call for get Spending Data.
   * Retrieves the list of Spending for a customer.
   */
  getPotsDataSpendings(accid) {
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
          SpendingsActionCreator.handlePotDataSpendingsSuccess(body);
      }, () => {
          SpendingsActionCreator.handlePotDataSpendingsError();
      });
  },
  /**
   * API call for getBudgetConnection.
   * Retrieves the list of Budgets for a customer.
   */
  getSpendListConnectionData(data) {
    const requestData = data;
    let url = envConfig.apiBaseUrl + _getSpendingDataEndpoint;
    if (envConfig.stubConfig) {
      url = envConfig.stubConfig.spendingStub.SpendListConnection;
    }
    ApiUtils.makeAjaxCall({
      apiVersion: config.apiVersions.spendingDataService,
      method: 'POST',
      url,
      addAuthToken: true,
      requestData,
    }, body => {
      SpendingsActionCreator.handleGetSpendListConnectionSuccess(body);
    }, () => {
      SpendingsActionCreator.handleGetSpendListConnectionError();
    });
  },

  /**
   * API call for get Spend List Connection.
   * Retrieves the list of Budgets for a customer.
   */
    getTagListConnectionData() {
      let url = envConfig.apiBaseUrl + _getTagBudgetDataEndPoint;
      if (envConfig.stubConfig) {
        url = envConfig.stubConfig.spendingStub.TagListConnection;
      }
      ApiUtils.makeAjaxCall({
        apiVersion: config.apiVersions.tagListService,
        method: 'GET',
        url,
        addAuthToken: true,
      }, body => {
        SpendingsActionCreator.handleGetTagListConnectionSuccess(body);
      }, error => {
        SpendingsActionCreator.handleGetTagListConnectionError(error);
      });
    },

  /**
   * API call for getBudgetConnection.
   * Retrieves the list of Budgets for a customer.
   */
  getBudgetConnectionData() {
    let url = envConfig.apiBaseUrl + _getBudgetDataEndPoint;
    if (envConfig.stubConfig) {
      url = envConfig.stubConfig.spendingStub.GetBudgetConnection;
    }
    ApiUtils.makeAjaxCall({
      apiVersion: config.apiVersions.spendingDataService,
      method: 'GET',
      url,
      addAuthToken: true,
    }, body => {
      SpendingsActionCreator.handleGetBudgetConnectionSuccess(body);
    }, error => {
      SpendingsActionCreator.handleGetBudgetConnectionError(error);
    });
  },

   /**
   * API call for getBudgetConnection.
   * Retrieves the list of Budgets for a customer.
   */
  updateBudgetConnectionData(data) {
    let url = envConfig.apiBaseUrl + _getBudgetDataEndPoint;
    const requestData = data;
    if (envConfig.stubConfig) {
      url = envConfig.stubConfig.spendingStub.GetBudgetConnection;
    }
    ApiUtils.makeAjaxCall({
      apiVersion: config.apiVersions.spendingDataService,
      method: 'PUT',
      url,
      addAuthToken: true,
      requestData,
    }, () => {
      SpendingsActionCreator.handleUpdateBudgetConnectionSuccess();
    }, error => {
      SpendingsActionCreator.handleUpdateBudgetConnectionError(error);
    });
  },

  /**
   * API call for getBudgetConnection.
   * Retrieves the list of Budgets for a customer.
   */
  getBudgetPreferencesConnectionData() {
    let url = envConfig.apiBaseUrl + _budgetPreferencesEndPoint;
    if (envConfig.stubConfig) {
      url = envConfig.stubConfig.spendingStub.GetBudgetPreferencesConnection;
    }
    ApiUtils.makeAjaxCall({
      apiVersion: config.apiVersions.spendingDataService,
      method: 'GET',
      url,
      addAuthToken: true,
    }, body => {
      SpendingsActionCreator.handleGetBudgetPreferencesConnectionSuccess(body);
    }, error => {
      SpendingsActionCreator.handleGetBudgetPreferencesConnectionError(error);
    });
  },

  /**
   * API call for getBudgetConnection.
   * Retrieves the list of Budgets for a customer.
   */
  updateBudgetPreferencesConnectionData(data) {
    const requestData = data;
    let url = envConfig.apiBaseUrl + _budgetPreferencesEndPoint;
    if (envConfig.stubConfig) {
      url = envConfig.stubConfig.spendingStub.GetBudgetPreferencesConnection;
    }
    ApiUtils.makeAjaxCall({
      apiVersion: config.apiVersions.spendingDataService,
      method: 'PUT',
      url,
      addAuthToken: true,
      requestData,
    }, () => {
      SpendingsActionCreator.updateBudgetPreferencesConnectionSuccess(requestData);
    }, error => {
      SpendingsActionCreator.updateBudgetPreferencesConnectionError(error);
    });
  },

  /**
   * API call for getTagListConnection..
   * Retrieves the list of Budgets for a customer.
   */
  transactionData(data) {
    const requestData = data;
    let url = envConfig.apiBaseUrl + _getTransactionData;
    if (envConfig.stubConfig) {
      url = envConfig.stubConfig.spendingStub.TransactionListConnection;
    }
    ApiUtils.makeAjaxCall({
      apiVersion:config.apiVersions.spendingDataService,
      method: 'POST',
      url,
      addAuthToken: true,
      requestData,
    }, body => {
      SpendingsActionCreator.handleTransactionDetailsSuccess(body);
    }, error => {
      SpendingsActionCreator.handleTransactionDetailsError(error);
    });
  },
  /**
   *
   * Number Validation for Earnings Screen
   *
  */
  numberValidation (val) {
    const etarget = val.replace(/[^\d\.]*/g, '');
    const len = etarget.length;
    const index = etarget.indexOf('.');
    const dots = etarget.split('.').length;
    const beforeDecimalLen = etarget.split('.')[0].length;
    let isValid = true;
    if (beforeDecimalLen > 6) {
        isValid = false;
    }
    if (dots > 2 || Number(etarget) > 999999 || etarget === '999999.') {
        isValid = false;
    }
    if (index >= 0) {
        const CharAfterdot = (len + 1) - index;
        if (CharAfterdot > 4) {
            isValid = false;
        }
    }
    return isValid;
  },
  /**
   *
   * Number Validation for create edit budget page
   *
   */
  numberValidationForCreateEditBudget(val) {
    const etarget = val.replace(/[^\d\.]*/g, '');
    const len = etarget.length;
    const index = etarget.indexOf('.');
    const dots = etarget.split('.').length;
    const beforeDecimalLen = etarget.split('.')[0].length;
    let isValid = true;
    if (beforeDecimalLen > 5) {
      isValid = false;
    }
    if (dots > 2) {
        isValid = false;
    }
    if (index >= 0) {
        const CharAfterdot = (len + 1) - index;
        if (CharAfterdot > 4) {
            isValid = false;
        }
    }
    if (beforeDecimalLen === 5) {
      if (Number(etarget) > 10000) {
        isValid = false;
      } else {
        isValid = true;
      }
    }
    return isValid;
  },
};

module.exports = SpendingsUtils;
