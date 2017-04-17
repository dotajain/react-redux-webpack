/**
 * ProjectionsActionCreator
 * @class AccountsActionCreator
 */
jest.mock('../../stores/ProjectionsStore');
jest.unmock('../ProjectionsActionCreator');

const AppDispatcher = require('../../dispatcher/AppDispatcher');
const ProjectionsActionCreator =require('../ProjectionsActionCreator');
const ProjectionsConstants = require('../../constants/ProjectionsConstants');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

describe('ProjectionsActionCreator', () => {
    let data ={
     "thresholds": {
        "lower": {
          "amount": {
            "value": 20.00,
            "currency": "GBP"
          }
        }
       },"external_notification" : true
};
    it('Action to update projections from API', () => {
        ProjectionsActionCreator.editProjectionData(data);
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(1);
    });
});

// describe('ProjectionsActionCreator', () => {
//     beforeEach(() => {
//        });
//     it('Action to update projections from API', () => {
//         ProjectionssActionCreator.editProjectionData("05985dae-d2de-4ebc-ab0a-79093081bde5");
//         expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(1);
//     });
// });