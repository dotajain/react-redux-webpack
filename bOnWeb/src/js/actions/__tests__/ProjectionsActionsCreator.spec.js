jest.mock('../../stores/ProjectionsStore');
jest.unmock('../ProjectionsActionCreator');

const ProjectionsStore = require('../../stores/ProjectionsStore');
const ProjectionsActionCreator = require('../ProjectionsActionCreator');
const AppDispatcher = require('../../dispatcher/AppDispatcher');
const ProjectionsConstants = require('../../constants/ProjectionsConstants');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

describe('ProjectionsActionCreator', () => {
    beforeEach(() => {
    });
    it('Action to get all Terms and conditions data from API', () => {
        ProjectionsActionCreator.editProjectionData();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(1);
    });
});

describe('handleEditProjectionAlertsDataSuccess', () => {
    it('to check the function', () => {
        let response ={
          "external_notifications": [
    {
      "account": {
        "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
        "number": "65432112345678"
      },
      "thresholds": {
        "lower": {
          "amount": {
            "value": 50.0,
            "currency": "GBP"
          }
        }
      },
      "external_notification": true
    }
  ]
        };
        ProjectionsActionCreator.handleEditProjectionAlertsDataSuccess(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(1);
    });
});