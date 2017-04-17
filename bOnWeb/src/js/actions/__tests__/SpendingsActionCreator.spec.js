jest.mock('../../stores/SpendingsStore');
jest.unmock('../SpendingsActionCreator');

const SpendingsStore = require('../../stores/SpendingsStore');
const SpendingsActionCreator = require('../SpendingsActionCreator');
const AppDispatcher = require('../../dispatcher/AppDispatcher');
const SpendingsConstants = require('../../constants/SpendingsConstants');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

describe('SpendingsActionCreator : Unit TestCase : 1', () => {
    beforeEach(() => {
    });
    it('Checking : getAccountsList', () => {
        SpendingsActionCreator.getAccountsList();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(1);
    });
});

describe('SpendingsActionCreator : Unit TestCase : 2', () => {
    beforeEach(() => {
    });
    it('Checking : handleAccountsListSuccess', () => {
        SpendingsActionCreator.handleAccountsListSuccess();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(1);
    });
});

describe('SpendingsActionCreator : Unit TestCase : 3', () => {
    beforeEach(() => {
    });
    it('Checking : handleAccountsListError', () => {
        SpendingsActionCreator.handleAccountsListError();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(2);
    });
});

describe('SpendingsActionCreator : Unit TestCase : 4', () => {
    beforeEach(() => {
    });
    it('Checking : getSpendingPageWithKey', () => {
        SpendingsActionCreator.getSpendingPageWithKey();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(3);
    });
});

describe('SpendingsActionCreator : Unit TestCase : 5', () => {
    beforeEach(() => {
    });
    it('Checking : loadSpendingPage', () => {
        SpendingsActionCreator.loadSpendingPage();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(4);
    });
});

describe('SpendingsActionCreator : Unit TestCase : 6', () => {
    beforeEach(() => {
    });
    it('Checking : goBackToSpendings', () => {
        SpendingsActionCreator.goBackToSpendings();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(4);
    });
});

describe('SpendingsActionCreator : Unit TestCase : 7', () => {
    beforeEach(() => {
    });
    it('Checking : loadEarningPage', () => {
        SpendingsActionCreator.loadEarningPage();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(4);
    });
});

describe('SpendingsActionCreator : Unit TestCase : 8', () => {
    beforeEach(() => {
    });
    it('Checking : getBudgetConnection', () => {
        SpendingsActionCreator.getBudgetConnection();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(5);
    });
});

describe('SpendingsActionCreator : Unit TestCase : 9', () => {
    it('Checking : handleGetBudgetConnectionSuccess', () => {
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
        SpendingsActionCreator.handleGetBudgetConnectionSuccess(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(4);
    });
});

describe('SpendingsActionCreator : Unit TestCase : 10', () => {
    beforeEach(() => {
    });
    it('Checking : handleGetBudgetConnectionError', () => {
        SpendingsActionCreator.handleGetBudgetConnectionError();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(6);
    });
});

describe('SpendingsActionCreator : Unit TestCase : 11', () => {
    it('checking : updateBudgetConnection', () => {
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
        SpendingsActionCreator.updateBudgetConnection(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(4);
    });
});

describe('SpendingsActionCreator : Unit TestCase : 12', () => {
    beforeEach(() => {
    });
    it('Checking : handleUpdateBudgetConnectionSuccess', () => {
        SpendingsActionCreator.handleUpdateBudgetConnectionSuccess();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(8);
    });
});

describe('SpendingsActionCreator : Unit TestCase : 13', () => {
    beforeEach(() => {
    });
    it('Checking : handleUpdateBudgetConnectionError', () => {
        SpendingsActionCreator.handleUpdateBudgetConnectionError();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(9);
    });
});


describe('SpendingsActionCreator : Unit TestCase : 14', () => {
    it('checking : getSpendListConnection', () => {
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
        SpendingsActionCreator.getSpendListConnection(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(5);
    });
});


describe('SpendingsActionCreator : Unit TestCase : 15', () => {
    it('Checking : handleGetSpendListConnectionSuccess', () => {
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
        SpendingsActionCreator.handleGetSpendListConnectionSuccess(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(6);
    });
});

describe('SpendingsActionCreator : Unit TestCase : 16', () => {
    beforeEach(() => {
    });
    it('Checking : handleGetSpendListConnectionError', () => {
        SpendingsActionCreator.handleGetSpendListConnectionError();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(10);
    });
});

describe('SpendingsActionCreator : Unit TestCase : 17', () => {
    beforeEach(() => {
    });
    it('Checking : getBudgetPreferencesConnection', () => {
        SpendingsActionCreator.getBudgetPreferencesConnection();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(11);
    });
});

describe('SpendingsActionCreator : Unit TestCase : 18', () => {
    beforeEach(() => {
    });
    it('Checking : getBudgetPreferencesConnection', () => {
        SpendingsActionCreator.getBudgetPreferencesConnection();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(12);
    });
});

describe('SpendingsActionCreator : Unit TestCase : 19', () => {
    it('checking : updateBudgetPreferencesConnection', () => {
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
        SpendingsActionCreator.updateBudgetPreferencesConnection(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(7);
    });
});


describe('SpendingsActionCreator : Unit TestCase : 20', () => {
    it('checking : updateBudgetPreferencesConnectionSuccess', () => {
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
        SpendingsActionCreator.updateBudgetPreferencesConnectionSuccess(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(8);
    });
});

describe('SpendingsActionCreator : Unit TestCase : 21', () => {
    beforeEach(() => {
    });
    it('Checking : updateBudgetPreferencesConnectionError', () => {
        SpendingsActionCreator.updateBudgetPreferencesConnectionError();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(13);
    });
});

describe('SpendingsActionCreator : Unit TestCase : 22', () => {
    it('checking : handleGetBudgetPreferencesConnectionSuccessn', () => {
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
        SpendingsActionCreator.handleGetBudgetPreferencesConnectionSuccess(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(9);
    });
});

describe('SpendingsActionCreator : Unit TestCase : 23', () => {
    beforeEach(() => {
    });
    it('Checking : handleGetBudgetPreferencesConnectionError', () => {
        SpendingsActionCreator.handleGetBudgetPreferencesConnectionError();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(14);
    });
});

describe('SpendingsActionCreator : Unit TestCase : 24', () => {
    beforeEach(() => {
    });
    it('Checking : requestEditBudgetPage', () => {
        SpendingsActionCreator.requestEditBudgetPage();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(15);
    });
});

describe('SpendingsActionCreator : Unit TestCase : 25', () => {
    beforeEach(() => {
    });
    it('Checking : getTagListConnection', () => {
        SpendingsActionCreator.getTagListConnection();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(16);
    });
});

describe('SpendingsActionCreator : Unit TestCase : 26', () => {
    it('Checking : handleGetTagListConnectionSuccess', () => {
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
        SpendingsActionCreator.handleGetTagListConnectionSuccess(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(10);
    });
});


describe('SpendingsActionCreator : Unit TestCase : 27', () => {
    beforeEach(() => {
    });
    it('Checking : handleGetTagListConnectionError', () => {
        SpendingsActionCreator.handleGetTagListConnectionError();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(17);
    });
});

describe('SpendingsActionCreator : Unit TestCase : 28', () => {
    beforeEach(() => {
    });
    it('Checking : getTransactionDetails', () => {
        SpendingsActionCreator.getTransactionDetails();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(18);
    });
});
describe('SpendingsActionCreator : Unit TestCase : 29', () => {
    beforeEach(() => {
    });
    it('Checking : getAllSelectedAccountNumnber', () => {
        SpendingsActionCreator.getAllSelectedAccountNumnber();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(19);
    });
});

describe('SpendingsActionCreator : Unit TestCase : 30', () => {
    it('Checking : handleTransactionDetailsSuccess', () => {
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
        SpendingsActionCreator.handleTransactionDetailsSuccess(response);
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(11);
    });
});

describe('SpendingsActionCreator : Unit TestCase : 31', () => {
    beforeEach(() => {
    });
    it('Checking : getTransactionDetailsOnNext', () => {
        SpendingsActionCreator.getTransactionDetailsOnNext();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(20);
    });
});

describe('SpendingsActionCreator : Unit TestCase : 32', () => {
    beforeEach(() => {
    });
    it('Checking : getTransactionDetailsOnSort', () => {
        SpendingsActionCreator.getTransactionDetailsOnSort();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(21);
    });
});

describe('SpendingsActionCreator : Unit TestCase : 33', () => {
    beforeEach(() => {
    });
    it('Checking : handleTransactionDetailsError', () => {
        SpendingsActionCreator.handleTransactionDetailsError();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(22);
    });
});

describe('SpendingsActionCreator : Unit TestCase : 34', () => {
    beforeEach(() => {
    });
    it('Checking : closeAccountModal', () => {
        SpendingsActionCreator.closeAccountModal();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(23);
    });
});

describe('SpendingsActionCreator : Unit TestCase : 35', () => {
    beforeEach(() => {
    });
    it('Checking : handlePotDataSpendings', () => {
        SpendingsActionCreator.handlePotDataSpendings();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(24);
    });
});

describe('SpendingsActionCreator : Unit TestCase : 36', () => {
    beforeEach(() => {
    });
    it('Checking : handlePotDataSpendingsSuccess', () => {
        SpendingsActionCreator.handlePotDataSpendingsSuccess();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(24);
    });
});

describe('SpendingsActionCreator : Unit TestCase : 37', () => {
    beforeEach(() => {
    });
    it('Checking : handlePotDataSpendingsError', () => {
        SpendingsActionCreator.handlePotDataSpendingsError();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(25);
    });
});

describe('SpendingsActionCreator : Unit TestCase : 38', () => {
    beforeEach(() => {
    });
    it('Checking : handleUpdatedBudgetData', () => {
        SpendingsActionCreator.handleUpdatedBudgetData ();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(26);
    });
});