jest.mock('../../stores/SweepsStores');
jest.unmock('../SweepsActionCreator');

const SweepsStores = require('../../stores/SweepsStores');
const SweepsActionCreator = require('../SweepsActionCreator');
const AppDispatcher = require('../../dispatcher/AppDispatcher');
const SweepsConstants = require('../../constants/SweepsConstants');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

describe('SweepsActionCreator1', () => {
    beforeEach(() => {
    });
    it('Action to get all Terms and conditions data from API', () => {
        SweepsActionCreator.createSweepData();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(1);
    });
});

describe('SweepsActionCreator2', () => {
    beforeEach(() => {
    });
    it('Action to get all Terms and conditions data from API', () => {
        SweepsActionCreator.editSweepData();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(2);
    });
});

describe('handleEditSweepSuccess', () => {
    it('to check the function', () => {
        let response = {
            "sweeps" : [{
        "id": "ee8948b5-e443-408a-a2cd-1af9b29fdd5f",
        "direction" : "in", 
        "threshold" : {
            "value" : 100.00,
            "currency" : "GBP"
        },
        "target": {   
            "value" : 250.00,
            "currency" : "GBP"
        },
        "account_id":"b80e95a0-6b60-45b2-8b0f-77f2355f3061",
        "other_account_id" : "a91fe657-4605-42c7-96f1-3e1cc8555276",
        "enabled" : true
    }]
        }
        SweepsActionCreator.handleEditSweepSuccess(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(1);
    });
});


describe('handleCreateSweepSuccess', () => {
    it('to check the function', () => {
        let response = {
           "sweeps" : [{
        "id": "ee8948b5-e443-408a-a2cd-1af9b29fdd5f",
        "direction" : "in", 
        "threshold" : {
            "value" : 100.00,
            "currency" : "GBP"
        },
        "target": {   
            "value" : 250.00,
            "currency" : "GBP"
        },
        "account_id":"b80e95a0-6b60-45b2-8b0f-77f2355f3061",
        "other_account_id" : "a91fe657-4605-42c7-96f1-3e1cc8555276",
        "enabled" : true
    }]
        }
        SweepsActionCreator.handleCreateSweepSuccess(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(2);
    });
});

describe('SweepsActionCreator3', () => {
    beforeEach(() => {
    });
    it('Action to get all Terms and conditions data from API', () => {
        SweepsActionCreator.sendDeleteData();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(3);
    });
});

describe('SweepsActionCreator4', () => {
    beforeEach(() => {
    });
    it('Action to get all Terms and conditions data from API', () => {
        SweepsActionCreator.handleDeleteSweepsSuccess();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(3);
    });
});


describe('SweepsActionCreator5', () => {
    beforeEach(() => {
    });
    it('Action to get all Terms and conditions data from API', () => {
        SweepsActionCreator.handleDeleteSweepsError();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(4);
    });
});
