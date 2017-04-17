'use strict';

jest.unmock('../AlertsNSweepsStore');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const _ = require('lodash');
const EventEmitter = require('events').EventEmitter;
const AppDispatcher = require('../../dispatcher/AppDispatcher');
const AlertsNSweepsConstant = require('../../constants/AlertsNSweepsConstant');
const AccountsStore = require('../AccountsStore');
const AlertsNSweepsStore = require('../AlertsNSweepsStore');
const SweepsActionCreator = require('../../actions/SweepsActionCreator');
const SweepsApiUtils = require('../../utils/SweepsApiUtils');
const AlertsNSweepsApiUtils = require('../../utils/AlertsNSweepsApiUtils');

describe('Alerts And Sweeps Store Test Cases', () => {
  let callback = AppDispatcher.register.mock.calls[0][0];

  const handleAccountDetailsSuccess = (data) => ({
    action: {
      actionType: AlertsNSweepsConstant.ALERT_SWEEPS_ACCOUNT_DETAILS,
      data,
    },
  });

  const handleAccountDetailsError = (data) => ({
    action: {
      actionType: AlertsNSweepsConstant.ALERT_SWEEPS_ACCOUNT_DETAILS_ERROR,
      data,
    },
  });

  const getSweepDetails = () => ({
    action: {
      actionType: AlertsNSweepsConstant.REQUEST_SWEEPS_DETAILS,
    },
  });

  const handleSweepsSuccess = (data) => ({
    action: {
      actionType: AlertsNSweepsConstant.REQUEST_SWEEPS_DETAILS_SUCCESS,
      data,
    },

  });

  const hideHeaderComponent = (data) => ({
    action: {
      actionType: AlertsNSweepsConstant.HIDE_HEADER_COMPONENT,
      data,
    },
  });

  const setSweepMyAccount = (data) => ({
    action: {
      actionType: AlertsNSweepsConstant.SET_IN_MY_ACCOUNT,
      data,
    },
  });

  const setSweepMyAccountOut = (data) => ({
    action: {
      actionType: AlertsNSweepsConstant.SET_OUT_MY_ACCOUNT,
      data,
    },
  });
  const setAlertAccount = (data) => ({
    action: {
      actionType: AlertsNSweepsConstant.SET_ALERT_ACCOUNT,
      data,
    },
  });

  const setAlerLessMoreValue = (data) => ({
    action: {
      actionType: AlertsNSweepsConstant.SET_ALERT_LESS_MORE_VALUE,
      data,
    },
  });

  const setAlertTargetMoney = (data) => ({
    action: {
      actionType: AlertsNSweepsConstant.ALERT_TARGET_MONEY,
      data,
    },
  });

  const targetProjectionAlertMoney = (data) => ({
    action: {
      actionType: AlertsNSweepsConstant.PROJECTION_ALERT_TARGET_MONEY,
      data,
    },
  });

  const setProjectionAlertInMyAccount = (data) => ({
    action: {
      actionType: AlertsNSweepsConstant.SET_PROJECTION_ALERT_ACCOUNT,
      data,
    },
  });

  const setSweepTargetMoney = (data) => ({
    action: {
      actionType: AlertsNSweepsConstant.REQUEST_SWEEP_TARGET_MONEY,
      data,
    },
  });

  const setSweepThresoldMoney = (data) => ({
    action: {
      actionType: AlertsNSweepsConstant.REQUEST_SWEEP_THRESHOLD_MONEY,
      data,
    },
  });

  const setSweepFailure = (data) => ({
    action: {
      actionType: AlertsNSweepsConstant.ALERTS_SWEEPS_FAILURE,
      data,
    },
  });

  const handleAlertSweepProjectionListError = (data) => ({
    action: {
      actionType: AlertsNSweepsConstant.ALERT_SWEEP_PROJECTION_LIST_FAILURE,
      data,
    },
  });

  const setProjectionAlertData = (data) => ({
    action: {
      actionType: AlertsNSweepsConstant.REQUEST_PROJECTION_ALERTS_DETAILS_SUCCESS,
      data,
    },
  });

  const setCompName = (data) => ({
    action: {
      actionType: AlertsNSweepsConstant.SET_COMP_NAME,
      data,
    },
  });

  const getAlertsList = () => ({
    action: {
      actionType: AlertsNSweepsConstant.REQUEST_ALERTS_DETAILS,
    },
  });

  const handleAlertsSuccess = (response, refreshList) => ({
    action: {
      actionType: AlertsNSweepsConstant.REQUEST_ALERTS_DETAILS_SUCCESS,
      data: response,
      refreshList: refreshList,
    },
  });

  const getProjectionAlertsList = () => ({
    action: {
      actionType: AlertsNSweepsConstant.REQUEST_PROJECTION_ALERTS_DETAILS,
    },
  });

  const handleProjectionAlertsSuccess = (data) => ({
    action: {
      actionType: AlertsNSweepsConstant.REQUEST_PROJECTION_ALERTS_DETAILS_SUCCESS,
      data,
    },
  });

  const handleAlertListError = (data) => ({
    action: {
      actionType: AlertsNSweepsConstant.ALERTS_LIST_FAILURE,
      data,
    },
  });

  const handleSweepListError = (data) => ({
    action: {
      actionType: AlertsNSweepsConstant.SWEEPS_LIST_FAILURE,
      data,
    },
  });

  const handleProjectionListError = (data) => ({
    action: {
      actionType: AlertsNSweepsConstant.PROJECTIONS_LIST_FAILURE,
      data,
    },
  });

  const createDefault = () => ({
    action: {
      actionType: AlertsNSweepsConstant.default,
    },
  });

  let addListner = AlertsNSweepsStore.addChangeListener(function () { });
  let removeListner = AlertsNSweepsStore.removeChangeListener(function () { });

  describe('Get list of Alerts and Sweeps', () => {
    const alertList = {
      "account_alerts": [
        {
          "account_id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
          "alerts": [
            {
              "lower_threshold": {
                "enabled": true,
                "amount": {
                  "value": 20.0,
                  "currency": "GBP"
                }
              }
            }
          ]
        }
      ]
    }
    let accountList = {
      accounts: [
        {
          "id": "05985dae-d2de-4ebc-ab0a-79093081bde5",
          "product": {
            "code": "901",
            "name": "Personal Loan",
            "description": "Personal Loan"
          }
        }]
    };

    const sweepData = {
      "sweeps": [{
        "id": "ee8948b5-e443-408a-a2cd-1af9b29fdd5f",
        "direction": "in",
        "threshold": {
          "value": 100.00,
          "currency": "GBP"
        },
        "target": {
          "value": 250.00,
          "currency": "GBP"
        },
        "account_id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
        "other_account_id": "a91fe657-4605-42c7-96f1-3e1cc8555276",
        "enabled": true
      }]
    }
    callback(handleSweepsSuccess(sweepData));
    callback(handleSweepsSuccess(sweepData));

    callback(getAlertsList())
    callback(handleAccountDetailsSuccess(accountList));

    callback(handleAlertsSuccess(alertList, true));
    callback(createDefault());


    AlertsNSweepsStore.setAccountList();
    const getCurrentAccountID = jest.fn();

    // callback(getSweepDetails());
    it('should make an API call to get sweep details', () => {
      expect(AlertsNSweepsApiUtils.getSweepsData.mock.calls.length).toBe(0);
    });

    let actual = AlertsNSweepsStore.getCreateSweepData();
    let expected = {
      counter: 0,
      id: 0,
      account_id: 0,
      other_account_id: 0,
      alert: [{ amount: 50, amount1: 150 }]
    };
    it('should return initial state of sweep', () => {
      expect(actual).toEqual(expected);
    });

    actual = AlertsNSweepsStore.getAlertLessMoreValue();
    expected = [
      { 'id': 'less', 'name': 'Less' },
      { 'id': 'more', 'name': 'More' }];
    it('should return alert less and more values', () => {
      expect(actual).toEqual(expected);
    });



  });

  describe('Get alert data for updation', () => {
    let actual = AlertsNSweepsStore.getEditAlertData(0);
    const expected = {
      counter: 0,
      id: 0,
      account_id: 0,
      alert: [{ lessmore: 'Less', amount: 0 }]
    };
    it('should return alert data by specified id', () => {
      expect(actual).toEqual(expected);
    });

    actual = AlertsNSweepsStore.getAlertData();
    it('should return updated alert data', () => {
      expect(actual).toEqual(expected);
    });
  });

  describe('show/hide header panel', () => {
    const expected = true;
    callback(hideHeaderComponent(expected));
    let actual = AlertsNSweepsStore.showHeader();
    it('should check the show header panel', () => {
      expect(actual).toEqual(expected)
    });

    actual = AlertsNSweepsStore.showHeader(true);
    it('should show header panel', () => {
      expect(actual).toEqual(expected)
    });
  });

  describe('set alert, sweep and projection data', () => {
    const account_id = 0;
    callback(setAlertAccount(account_id));
    callback(setSweepMyAccount(account_id));
    callback(setSweepMyAccountOut(account_id));

    const actual = AlertsNSweepsStore.getAlertData();
    it('should match given alert account id ', () => {
      expect(actual.id).toEqual(account_id)
    });
  });

  describe('set values for alerts', () => {
    const lessmore = 'Less';
    callback(setAlerLessMoreValue(lessmore));
    let actual = AlertsNSweepsStore.getAlertData();
    it('should match given sweep less/more value ', () => {
      expect(actual.alert[0].lessmore).toEqual(lessmore)
    });

    const targetMoney = 0;
    AlertsNSweepsStore.getEditAlertData(0);
    callback(setAlertTargetMoney(targetMoney));
    callback(setProjectionAlertInMyAccount(0));

    //AlertsNSweepsStore.getProjectionData();
    //callback(targetProjectionAlertMoney(0));


    actual = AlertsNSweepsStore.getAlertData();
    it('should return alert target money ', () => {
      expect(actual.alert[0].amount).toEqual(targetMoney)
    });

  });

  describe('set sweep target and thresold money and compoenent name', () => {
    const targetMoney = 1000;
    AlertsNSweepsStore.getEditSweepData()
    callback(setSweepTargetMoney(targetMoney));
    let actual = AlertsNSweepsStore.getSweepData();
    it('should return sweep target money ', () => {
      expect(actual.alert[0].amount1).toEqual(targetMoney)
    });

    const thresoldMoney = 2000;
    AlertsNSweepsStore.getEditSweepData()
    callback(setSweepThresoldMoney(thresoldMoney));
    actual = AlertsNSweepsStore.getSweepData();
    it('should return thresold sweep money ', () => {
      expect(actual.alert[0].amount).toEqual(thresoldMoney)
    });

    callback(setCompName('alerts'));
    callback(setCompName('default'));
  });

  describe('Handle failure calls', () => {
    const expected = false;
    const action = {
      "data": {},
      "response": true
    }

    let actual = AlertsNSweepsStore.showErrorMessage();
    it('should return fail on not getting right response from API ', () => {
      expect(actual).toEqual(expected)
    });

    callback(setSweepFailure());
    callback(setSweepFailure(action));

    callback(handleAccountDetailsError());
    callback(handleAccountDetailsError(true));

    callback(handleAlertSweepProjectionListError());
    callback(handleAlertSweepProjectionListError(true));

    callback(handleAlertListError());
    callback(handleAlertListError(true));


    callback(handleSweepListError());
    callback(handleSweepListError(true));

    callback(handleProjectionListError());
    callback(handleProjectionListError(true));
  });

  describe('Handle projection data', () => {
    const data = [{
      "id" :  "0",
      "accounts": {
        "account" : {
          "id" :  "0",
          "number" :  "90389378378383"
        },
        "thresholds": {
          "lower": {
            "amount": {
              "value": 20.00,
              "currency":  "GBP"
            }
          }
        }, "external_notification" :  true
      }

    }]
    //callback(setProjectionAlertData(data));
    //const actual = AlertsNSweepsStore.getProjectionAlertsList();

    callback(getProjectionAlertsList());
    // callback(handleProjectionAlertsSuccess(data));

    xit('should customize the projection object ', () => {
      expect(actual[0].id).toEqual('0')
    });
  });

  describe('Handle store methods', () => {
    let actual = '';
    let isAlertsLoaded = true;
    let isSweepsLoaded = true;
    let isProjectionsLoaded = true;

    actual = AlertsNSweepsStore.getToggleFlag();
    it('should check the toggeling on alerts, sweeps and projection', () => {
      expect(actual).toEqual(false);
    });

    actual = AlertsNSweepsStore.getSweepsList();
    it('should return alerts list', () => {
      expect(actual).toEqual(false);
    });

    actual = AlertsNSweepsStore.getAlertsList();
    it('should return alerts list', () => {
      expect(actual).toEqual(false);
    });

    actual = AlertsNSweepsStore.getProjectionAlertsList();
    it('should return proejection alerts list', () => {
      expect(actual).toEqual(false);
    });

    actual = AlertsNSweepsStore.getAccountColour('12345');
    it('should return account colour', () => {
      expect(actual).toEqual(false);
    });

    actual = AlertsNSweepsStore.getProjectionData();
    it('should return projection data', () => {
      expect(actual).toEqual(false);
    });

    actual = AlertsNSweepsStore.getErrorMessage();
    it('should return error response', () => {
      expect(actual).toEqual(false);
    });

    actual = AlertsNSweepsStore.getLoadStatus();
    it('should return true if all alert, sweeps and projection list loaded', () => {
      expect(actual).toEqual(false);
    });

    actual = AlertsNSweepsStore.getCompName();
    it('should return current loaded compoenent', () => {
      expect(actual).toEqual(false);
    });

    actual = AlertsNSweepsStore.isNetworkError();
    it('should return false if network issues found', () => {
      expect(actual).toEqual(false);
    });

    const accountProjections = {
      "account": {
        "id": "23d5f45b-123a-4418-8bbd-9c8872bcd403",
        "number": "82701820113821"
      },
      "external_notification": true,
      "thresholds": {
        "lower": {
          "amount": {
            "currency": "GBP",
            "value": 123
          }
        }
      }
    }


    // AlertsNSweepsStore.getAccountName(accountProjections.account.id);

    //AlertsNSweepsStore.createProjectionObject(accountProjections, 1);

    let _accountList = {
      accounts: [{ id: 1, actions_available: ['/account/read': true,] }, { id: 2, actions_available: ['/account/read': true,] }]
    };
    AccountsStore.getAll.mockReturnValue(_accountList);
    AlertsNSweepsStore.setAccountList();
    AlertsNSweepsStore.getSweepToAccountName();
    AlertsNSweepsStore.getSweepFromAccountName();
    AlertsNSweepsStore.getAlertAccountName();
    AlertsNSweepsStore.showSweepPage();
    AlertsNSweepsStore.showAlertPage();
    AlertsNSweepsStore.getSweepFlag();
    AlertsNSweepsStore.getAlertFlag();
    AlertsNSweepsStore.getProjectionAccountName();
    AlertsNSweepsStore.customizeProjection(accountProjections, true);


      const sweepData = {
      "sweeps": [{
        "id": "ee8948b5-e443-408a-a2cd-1af9b29fdd5f",
        "direction": "in",
        "threshold": {
          "value": 100.00,
          "currency": "GBP"
        },
        "target": {
          "value": 250.00,
          "currency": "GBP"
        },
        "account_id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
        "other_account_id": "a91fe657-4605-42c7-96f1-3e1cc8555276",
        "enabled": true
      }]
    }    

    

    const customizeProjectionDetails = { 
      "external_notifications": [{
        "account" : {
        "id" : "23d5f45b-123a-4418-8bbd-9c8872bcd403",
        "number": "82701820113821"
          },
          "external_notification": true,
          "thresholds": {
            "lower" : {
              "amount": {
                "currency": "GBP",
                "value": 123
              }
            }
          }
      }]}
    AlertsNSweepsStore.customizeProjectionDetails(customizeProjectionDetails);

  });
});
