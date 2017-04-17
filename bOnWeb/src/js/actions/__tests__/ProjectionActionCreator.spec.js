/**
 * @module ProjectionActionCreator
 */

jest.mock('../../stores/ProjectionStore');
jest.unmock('../ProjectionActionCreator');

const ProjectionActionCreator = require('../ProjectionActionCreator');
const AppDispatcher = require('../../dispatcher/AppDispatcher');
const AppConstants = require('../../constants/AppConstants');
const ProjectionStore = require('../../stores/ProjectionStore');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

describe('call earnings and commitments - projection preference servivce', () => {
    it('call GetProjectionPreference servive', () => {
        ProjectionActionCreator.getEarningsAndCommitment();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(1);
    });

});

describe('check projection crunching back clicked', () => {
    it('check click on back button of projection crunching page', () => {
        ProjectionActionCreator.projectionCrunchBackClicked();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(2);
    });
});
describe('handle earnings and commitments - projection preference service', () => {
    const response = {};
    it('handle the success of projection ', () => {
        ProjectionActionCreator.handleEarningsCommitmentSuccess(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(1);
    });
});
describe('handle projection done success', () => {
    const response = {};
    it('handle the create/update projection preferences success', () => {
        ProjectionActionCreator.handleProjectionDoneSuccess(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(2);
    });
});
describe('get projection alerts', () => {
    it('to get the projection alerts', () => {
        ProjectionActionCreator.getProjectionAlerts();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(3);
    });
});
describe('call done - projection settings update service', () => {
    const projectionObject = {};
    it('to create / update the projection prefrence service', () => {
        ProjectionActionCreator.doneProjections(projectionObject);
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(4);
    });
});
describe('get category tags for tabs', () => {
    const categoryTagArray = [];
    it('to get the category tags that are enabled', () => {
        ProjectionActionCreator.getCategoryTagsForTab(categoryTagArray);
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(5);
    });
});
describe('get user tags for tabs', () => {
    const userTagArray = [];
    it('to get the user tags that are enabled', () => {
        ProjectionActionCreator.getUserTagsForTab(userTagArray);
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(6);
    });
});
describe('set alerts notification amount', () => {
    const alertsAmountValue = 10.00;
    it('to set the alert amount for the projection', () => {
        ProjectionActionCreator.setAlertNotificationAmount(alertsAmountValue);
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(7);
    });
});
describe('set alerts notification flag', () => {
    const notificationFlag = true;
    it('to set the alert flag for the projection', () => {
        ProjectionActionCreator.setAlertsNotificationFlag(notificationFlag);
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(8);
    });
});
describe('set earnings ids', () => {
    const value = "";
    it('to set earnings Id', () => {
        ProjectionActionCreator.setEarningsId(value);
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(9);
    });
});
describe('handle projection tour tone', () => {
    it('only setting the flag for the projection tour done', () => {
        ProjectionActionCreator.handleFSProjectionTourDone();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(10);
    });
});
describe('handle projection settings leave setup', () => {
    it('to handle projection settings leave setup option', () => {
        ProjectionActionCreator.handleProjectionSettingLeaveSetup();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(11);
    });
});