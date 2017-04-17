jest.mock('../../stores/AlertsStore');
jest.unmock('../AlertsActionCreator');

const AlertsStore = require('../../stores/AlertsStore');
const AlertsActionCreator = require('../AlertsActionCreator');
const AppDispatcher = require('../../dispatcher/AppDispatcher');
const AlertsConstants = require('../../constants/AlertsConstants');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

describe('AlertsActionCreator', () => {
    beforeEach(() => {
    });
    it('Action to get all Terms and conditions data from API', () => {
        AlertsActionCreator.sendAlertData();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(1);
    });
});

describe('AlertsActionCreator', () => {
    beforeEach(() => {
    });
    it('Action to get all Terms and conditions data from API', () => {
        AlertsActionCreator.sendEditAlertData();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(2);
    });
});

describe('handleAlertsDataSuccess', () => {
    it('to check the function', () => {
        let response ={
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
        };
        AlertsActionCreator.handleAlertsDataSuccess(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(1);
    });
});


describe('handleEditAlertsDataSuccess', () => {
    it('to check the function', () => {
        let response = {
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
        AlertsActionCreator.handleEditAlertsDataSuccess(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(2);
    });
});