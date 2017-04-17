jest.mock('../../stores/AlertsNSweepsStore');
jest.unmock('../AlertsNSweepsActionCreator');

const AlertsNSweepsStore = require('../../stores/AlertsNSweepsStore');
const AlertsNSweepsActionCreator = require('../AlertsNSweepsActionCreator');
const AppDispatcher = require('../../dispatcher/AppDispatcher');
const AlertsNSweepsConstant = require('../../constants/AlertsNSweepsConstant');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

describe('getSweepsList', () => {
    beforeEach(() => {
    });
    it('Action to get Sweeps List', () => {
        AlertsNSweepsActionCreator.getSweepsList();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(1);
    });
});

describe('handleAlertsNSweepsError', () => {
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
        AlertsNSweepsActionCreator.handleAlertsNSweepsError(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(1);
    });
});


describe('handleAlertSweepProjectionListError', () => {
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
        AlertsNSweepsActionCreator.handleAlertSweepProjectionListError(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(2);
    });
});

describe('handleSweepsSuccess', () => {
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
        AlertsNSweepsActionCreator.handleSweepsSuccess(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(3);
    });
});

describe('getAlertsList', () => {
    beforeEach(() => {
    });
    it('Action to get Sweeps List', () => {
        AlertsNSweepsActionCreator.getAlertsList();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(2);
    });
});

describe('handleAlertsSuccess', () => {
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
        AlertsNSweepsActionCreator.handleAlertsSuccess(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(4);
    });
});

describe('getProjectionAlertsList', () => {
    beforeEach(() => {
    });
    it('Action to get Sweeps List', () => {
        AlertsNSweepsActionCreator.getProjectionAlertsList();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(3);
    });
});

describe('handleProjectionAlertsSuccess', () => {
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
        AlertsNSweepsActionCreator.handleProjectionAlertsSuccess(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(5);
    });
});

describe('setSweepId', () => {
    beforeEach(() => {
    });
    it('Action to get Sweeps List', () => {
        AlertsNSweepsActionCreator.setSweepId();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(4);
    });
});

describe('setSweepMyAccount', () => {
    beforeEach(() => {
    });
    it('Action to get Sweeps List', () => {
        AlertsNSweepsActionCreator.setSweepMyAccount();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(5);
    });
});

describe('setSweepMyAccountOut', () => {
    beforeEach(() => {
    });
    it('Action to get Sweeps List', () => {
        AlertsNSweepsActionCreator.setSweepMyAccountOut();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(6);
    });
});

// describe('editToggleSweepDataSuccess', () => {
//     it('to check the function', () => {
//         let response = {
//             "sweeps" : [{
//         "id": "ee8948b5-e443-408a-a2cd-1af9b29fdd5f",
//         "direction" : "in", 
//         "threshold" : {
//             "value" : 100.00,
//             "currency" : "GBP"
//         },
//         "target": {   
//             "value" : 250.00,
//             "currency" : "GBP"
//         },
//         "account_id":"b80e95a0-6b60-45b2-8b0f-77f2355f3061",
//         "other_account_id" : "a91fe657-4605-42c7-96f1-3e1cc8555276",
//         "enabled" : true
//     }]
//         }
//         AlertsNSweepsActionCreator.editToggleSweepDataSuccess(response);
//         expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(6);
//     });
// });

describe('targetMoney', () => {
    beforeEach(() => {
    });
    it('Action to get Sweeps List', () => {
        AlertsNSweepsActionCreator.targetMoney();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(7);
    });
});

describe('thresholdMoney', () => {
    beforeEach(() => {
    });
    it('Action to get Sweeps List', () => {
        AlertsNSweepsActionCreator.thresholdMoney();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(8);
    });
});

describe('targetAlertMoney', () => {
    beforeEach(() => {
    });
    it('Action to get Sweeps List', () => {
        AlertsNSweepsActionCreator.targetAlertMoney();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(9);
    });
});

describe('targetProjectionAlertMoney', () => {
    beforeEach(() => {
    });
    it('Action to get Sweeps List', () => {
        AlertsNSweepsActionCreator.targetProjectionAlertMoney();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(10);
    });
});


describe('resetPopup', () => {
    beforeEach(() => {
    });
    it('Action to get Sweeps List', () => {
        AlertsNSweepsActionCreator.resetPopup();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(11);
    });
});

describe('hideHeaderComponent', () => {
    beforeEach(() => {
    });
    it('Action to get Sweeps List', () => {
        AlertsNSweepsActionCreator.hideHeaderComponent();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(12);
    });
});

describe('setAlertLessMoreValue', () => {
    beforeEach(() => {
    });
    it('Action to get Sweeps List', () => {
        AlertsNSweepsActionCreator.setAlertLessMoreValue();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(13);
    });
});

describe('setAlertMyAccount', () => {
    beforeEach(() => {
    });
    it('Action to get Sweeps List', () => {
        AlertsNSweepsActionCreator.setAlertMyAccount();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(14);
    });
});


describe('setProjectionAlertInMyAccount', () => {
    beforeEach(() => {
    });
    it('Action to get Sweeps List', () => {
        AlertsNSweepsActionCreator.setProjectionAlertInMyAccount();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(15);
    });
});

describe('handleAccountDetailsSuccess', () => {
    beforeEach(() => {
    });
    it('Action to get Sweeps List', () => {
        AlertsNSweepsActionCreator.handleAccountDetailsSuccess();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(16);
    });
});

describe('handleAccountDetailsError', () => {
    beforeEach(() => {
    });
    it('Action to get Sweeps List', () => {
        AlertsNSweepsActionCreator.handleAccountDetailsError();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(16);
    });
});

describe('resetFlag', () => {
    beforeEach(() => {
    });
    it('Action to get Sweeps List', () => {
        AlertsNSweepsActionCreator.resetFlag();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(17);
    });
});

describe('setCompName', () => {
    beforeEach(() => {
    });
    it('Action to get Sweeps List', () => {
        AlertsNSweepsActionCreator.setCompName();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(18);
    });
});

describe('handleAlertListError', () => {
    beforeEach(() => {
    });
    it('Action to get Sweeps List', () => {
        AlertsNSweepsActionCreator.handleAlertListError();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(18);
    });
});

describe('handleSweepListError', () => {
    beforeEach(() => {
    });
    it('Action to get Sweeps List', () => {
        AlertsNSweepsActionCreator.handleSweepListError();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(18);
    });
});

describe('handleProjectionListError', () => {
    beforeEach(() => {
    });
    it('Action to get Sweeps List', () => {
        AlertsNSweepsActionCreator.handleProjectionListError();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(18);
    });
});