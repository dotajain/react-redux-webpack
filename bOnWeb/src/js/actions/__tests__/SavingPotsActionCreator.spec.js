jest.mock('../../stores/SavingsPotsStore');
jest.unmock('../SavingPotsActionCreator');

const SpendingsStore = require('../../stores/SavingsPotsStore');
const SavingPotsActionCreator = require('../SavingPotsActionCreator');
const AppDispatcher = require('../../dispatcher/AppDispatcher');
const SpendingsConstants = require('../../constants/SavingsPotsConstants');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

describe('SavingPotsActionCreator TestCase1', () => {
    beforeEach(() => {
    });
    it('Action to get pot data from API', () => {
        SavingPotsActionCreator.getPotData();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(1);
    });
});
describe('SavingPotsActionCreator TestCase2', () => {
    beforeEach(() => {
    });
    it('Action to get pot data from API', () => {
        SavingPotsActionCreator.handlePotDataSuccess();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(1);
    });
});
describe('SavingPotsActionCreator TestCase3', () => {
    beforeEach(() => {
    });
    it('Action to get pot data from API', () => {
        SavingPotsActionCreator.getPotDetail();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(1);
    });
});
describe('SavingPotsActionCreator TestCase4', () => {
    beforeEach(() => {
    });
    it('Action to get pot data from API', () => {
        SavingPotsActionCreator.handleSinglePotDataSuccess();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(1);
    });
});
describe('SavingPotsActionCreator TestCase5', () => {
    beforeEach(() => {
    });
    it('Action to get pot data from API', () => {
        SavingPotsActionCreator.getClickedAccount();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(1);
    });
});
describe('SavingPotsActionCreator TestCase6', () => {
    beforeEach(() => {
    });
    it('Action to get pot data from API', () => {
        SavingPotsActionCreator.getCreateSavingPotPage();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(1);
    });
});
describe('SavingPotsActionCreator TestCase7', () => {
    beforeEach(() => {
    });
    it('Action to get pot data from API', () => {
        SavingPotsActionCreator.handleCreatedPotDataSuccess();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(1);
    });
});
describe('SavingPotsActionCreator TestCase8', () => {
    beforeEach(() => {
    });
    it('Action to get pot data from API', () => {
        SavingPotsActionCreator.deletePotConnection();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(1);
    });
});
describe('SavingPotsActionCreator TestCase9', () => {
    beforeEach(() => {
    });
    it('Action to get pot data from API', () => {
        SavingPotsActionCreator.getReducePotPage();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(1);
    });
});
describe('SavingPotsActionCreator TestCase10', () => {
    beforeEach(() => {
    });
    it('Action to get pot data from API', () => {
        SavingPotsActionCreator.getPotConfirmation();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(1);
    });
});
describe('SavingPotsActionCreator TestCase11', () => {
    beforeEach(() => {
    });
    it('Action to get pot data from API', () => {
        SavingPotsActionCreator.getEditedPotData();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(1);
    });
});
describe('SavingPotsActionCreator TestCase12', () => {
    beforeEach(() => {
    });
    it('Action to get pot data from API', () => {
        SavingPotsActionCreator.getInterPotData();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(1);
    });
});
describe('SavingPotsActionCreator TestCase13', () => {
    beforeEach(() => {
    });
    it('Action to get pot data from API', () => {
        SavingPotsActionCreator.handleMoveMoney();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(1);
    });
});
describe('SavingPotsActionCreator TestCase14', () => {
    beforeEach(() => {
    });
    it('Action to get pot data from API', () => {
        SavingPotsActionCreator.handleTransferMoney();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(1);
    });
});
describe('SavingPotsActionCreator TestCase15', () => {
    beforeEach(() => {
    });
    it('Action to get pot data from API', () => {
        SavingPotsActionCreator.handleSinglePotDataError();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(1);
    });
});
describe('SavingPotsActionCreator TestCase16', () => {
    beforeEach(() => {
    });
    it('Action to get pot data from API', () => {
        SavingPotsActionCreator.handleCreatedPotDataError();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(1);
    });
});
describe('SavingPotsActionCreator TestCase17', () => {
    beforeEach(() => {
    });
    it('Action to get pot data from API', () => {
        SavingPotsActionCreator.getInterPotDataSuccess();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(1);
    });
});

describe('SavingPotsActionCreator TestCase18', () => {
    beforeEach(() => {
    });
    it('Action to get pot data from API', () => {
        SavingPotsActionCreator.getAccountsList();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(2);
    });
});

describe('SavingPotsActionCreator TestCase19', () => {
    beforeEach(() => {
    });
    it('Action to get pot data from API', () => {
        SavingPotsActionCreator.handleAccountsListSuccess();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(2);
    });
});

describe('SavingPotsActionCreator TestCase20', () => {
    beforeEach(() => {
    });
    it('Action to get pot data from API', () => {
        SavingPotsActionCreator.handlePotDataError();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(2);
    });
});

describe('SavingPotsActionCreator TestCase21', () => {
    beforeEach(() => {
    });
    it('Action to get pot data from API', () => {
        SavingPotsActionCreator.handleDeletePotSuccess();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(2);
    });
});

describe('SavingPotsActionCreator TestCase22', () => {
    beforeEach(() => {
    });
    it('Action to get pot data from API', () => {
        SavingPotsActionCreator.getInterPotDataError();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(2);
    });
});

describe('SavingPotsActionCreator TestCase23', () => {
    beforeEach(() => {
    });
    it('Action to get pot data from API', () => {
        SavingPotsActionCreator.closetErrorModal();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(3);
    });
});

describe('SavingPotsActionCreator TestCase24', () => {
    beforeEach(() => {
    });
    it('Action to get pot data from API', () => {
        SavingPotsActionCreator.handleAccountsListError();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(4);
    });
});

describe('SavingPotsActionCreator TestCase25', () => {
    beforeEach(() => {
    });
    it('Action to get pot data from API', () => {
        SavingPotsActionCreator.getPotDataError();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(4);
    });
});
 
 