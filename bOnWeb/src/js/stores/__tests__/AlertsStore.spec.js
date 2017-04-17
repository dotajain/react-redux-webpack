'use strict';

jest.unmock('../AlertsStore');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const _ = require('lodash');
const EventEmitter = require('events').EventEmitter;
const AppDispatcher = require('../../dispatcher/AppDispatcher');
const AlertsConstants = require('../../constants/AlertsConstants');
const AlertsNSweepsConstant = require('../../constants/AlertsNSweepsConstant');
const AlertsStore = require('../AlertsStore');
const AlertsNSweepsStore = require('../AlertsNSweepsStore');
const AlertsActionCreator = require('../../actions/AlertsActionCreator');
const AlertsApiUtils = require('../../utils/AlertsApiUtils');
const AlertsNSweepsApiUtils = require('../../utils/AlertsNSweepsApiUtils');


describe('Alerts Store Test Cases', () => {
    let callback = AppDispatcher.register.mock.calls[0][0];
     AlertsNSweepsStore.getAlertData.mockReturnValue({
            counter: 0,
            id: 0,
            account_id: 0,
            other_account_id: 0,
            alert: [{ amount: 50, amount1: 150 }],
        });
    const createAlertDetails = () => ({
        action: {
            actionType: AlertsConstants.CREATE_ALERT_DETAILS,
        },
    });

    const createAlertDetailsSuccess = () => ({
        action: {
            actionType: AlertsConstants.CREATE_ALERT_DETAILS_SUCCESS,
        },
    });

    const updateAlertDetails = () => ({
        action: {
            actionType: AlertsConstants.UPDATE_ALERT_DETAILS,
        },
    });

    const updateAlertDetailsSuccess = (data) => ({
        action: {
            actionType: AlertsConstants.UPDATE_ALERT_DETAILS_SUCCESS,
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

    const handleAlertsNSweepsError = (data, response) => ({
        action: {
            actionType: AlertsNSweepsConstant.ALERTS_SWEEPS_FAILURE,
            data: data,
			response: response,
        },
    });

     const resetFlag = (data) => ({
        action: {
            actionType: AlertsNSweepsConstant.RESET_FLAG,
            data: data,
        },
    });

    const createDefault = () => ({
        action: {
            actionType: AlertsNSweepsConstant.default,
        },
    });

    let addListner = AlertsStore.addChangeListener(function(){});
    let removeListner = AlertsStore.removeChangeListener(function(){});

    describe('create alert details', () => {
        callback(createAlertDetails());
    
        let actual = AlertsStore.isAlert();
        it('should initialize create alert data ', () => {
            expect(actual).toEqual(true);  // it should show false
        });

       const createAlertData = jest.fn();
       const getAccountID = jest.fn();

        AlertsApiUtils.sendAlertData(createAlertData, '1234');

        it('should make an API call to create alert details', () => {
            expect(AlertsApiUtils.sendAlertData.mock.calls.length).toBe(2);
        });

        callback(createAlertDetailsSuccess());

        actual = AlertsStore.isAlert();
        it('should return alert data successfully created ', () => {
            expect(actual).toEqual(true);
        });

        it('should make an API call to get updated list of alert on success', () => {
            expect(AlertsNSweepsApiUtils.getAlertsData.mock.calls.length).toBe(1);
        });

        callback(getAlertsList());
        callback(handleAlertsSuccess('122', true));
        callback(handleAlertsNSweepsError(null, true));
        callback(resetFlag(true));
        callback(resetFlag());
        callback(createDefault());
        // AlertsNSweepsApiUtils.getAlertsData(true);
        //  it('should make an API call to get list of alerts', () => {
        //     expect(AlertsApiUtils.getAlertsData.mock.calls.length).toBe(3);
        // });
    });

    describe('update alert details', () => {
       callback(updateAlertDetails());

       let actual = AlertsStore.isUpdateAlert();
        it('should initialize update alert data ', () => {
            expect(actual).toEqual(false);
        });

       const editAlertData = jest.fn();
       const getAccountID = jest.fn();

        AlertsApiUtils.sendEditAlertData(editAlertData, getAccountID);
        it('should make an API call to update alert details', () => {
            expect(AlertsApiUtils.sendEditAlertData.mock.calls.length).toBe(2);
        });

        const data = {
            'alerts': [
            {
              'lower_threshold': {
                'enabled': true,
                'amount': {
                  'value': 20.0,
                  'currency': 'GBP',
                },
              },
            },
          ],
        };

        callback(updateAlertDetailsSuccess(data));
        const result = AlertsNSweepsStore.setAlertData(data);
        it('should make an API call to get updated list of alert on success', () => {
            expect(AlertsNSweepsStore.setAlertData.mock.calls.length).toBe(2);
        });
    });

    describe('get alerts list ', () => {
        

    });
});
