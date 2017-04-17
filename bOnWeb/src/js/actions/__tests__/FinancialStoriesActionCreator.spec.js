/**
 * @module FinancialStoriesActionCreator
 */

jest.mock('../../stores/FinancialStoriesStore');
jest.unmock('../FinancialStoriesActionCreator');

const FinancialStoriesActionCreator = require('../FinancialStoriesActionCreator');
const AppDispatcher = require('../../dispatcher/AppDispatcher');
const AppConstants = require('../../constants/AppConstants');
const FinancialStoriesStore = require('../../stores/FinancialStoriesStore');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

describe('FinancialStoriesActionCreator', () => {
    let response = {
        "beneficiaries": [
            {
                "id": "f07a634d-1f9f-4297-8988-d10fb1f447e8",
                "code": "9384",
                "message": "Payee Deleted",
                "metadata": {
                    "available_funds": 7.30
                }
            }
        ]
    };

    it('Action to get all TransactionsList from API', () => {
        FinancialStoriesActionCreator.setAccountHelp();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(1);
    });
});
describe('getTagsList', () => {

    it('Action to get all TransactionsList from API', () => {
        FinancialStoriesActionCreator.getTagsList();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(2);
    });
});
describe('createTag', () => {
    let response = {
        "beneficiaries": [
            {
                "id": "f07a634d-1f9f-4297-8988-d10fb1f447e8",
                "code": "9384",
                "message": "Payee Deleted",
                "metadata": {
                    "available_funds": 7.30
                }
            }
        ]
    };

    it('Action to get all TransactionsList from API', () => {
        FinancialStoriesActionCreator.createTag();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(3);
    });
});
describe('deleteTag', () => {
    let response = {
        "beneficiaries": [
            {
                "id": "f07a634d-1f9f-4297-8988-d10fb1f447e8",
                "code": "9384",
                "message": "Payee Deleted",
                "metadata": {
                    "available_funds": 7.30
                }
            }
        ]
    };

    it('Action to get all TransactionsList from API', () => {
        FinancialStoriesActionCreator.deleteTag();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(4);
    });
});
describe('updateTag', () => {
    let response = {
        "beneficiaries": [
            {
                "id": "f07a634d-1f9f-4297-8988-d10fb1f447e8",
                "code": "9384",
                "message": "Payee Deleted",
                "metadata": {
                    "available_funds": 7.30
                }
            }
        ]
    };

    it('Action to get all TransactionsList from API', () => {
        FinancialStoriesActionCreator.updateTag();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(5);
    });
});
describe('assignTag', () => {
    let response = {
        "beneficiaries": [
            {
                "id": "f07a634d-1f9f-4297-8988-d10fb1f447e8",
                "code": "9384",
                "message": "Payee Deleted",
                "metadata": {
                    "available_funds": 7.30
                }
            }
        ]
    };

    it('Action to get all TransactionsList from API', () => {
        FinancialStoriesActionCreator.assignTag();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(6);
    });
});
describe('getMicroTransaction', () => {
    let response = {
        "beneficiaries": [
            {
                "id": "f07a634d-1f9f-4297-8988-d10fb1f447e8",
                "code": "9384",
                "message": "Payee Deleted",
                "metadata": {
                    "available_funds": 7.30
                }
            }
        ]
    };

    it('Action to get all TransactionsList from API', () => {
        FinancialStoriesActionCreator.getMicroTransaction();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(7);
    });
});
describe('getCashPointTransaction', () => {
    let response = {
        "beneficiaries": [
            {
                "id": "f07a634d-1f9f-4297-8988-d10fb1f447e8",
                "code": "9384",
                "message": "Payee Deleted",
                "metadata": {
                    "available_funds": 7.30
                }
            }
        ]
    };

    it('Action to get all TransactionsList from API', () => {
        FinancialStoriesActionCreator.getCashPointTransaction();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(8);
    });
});
describe('getInAndOutTransaction', () => {
    let response = {
        "beneficiaries": [
            {
                "id": "f07a634d-1f9f-4297-8988-d10fb1f447e8",
                "code": "9384",
                "message": "Payee Deleted",
                "metadata": {
                    "available_funds": 7.30
                }
            }
        ]
    };

    it('Action to get all TransactionsList from API', () => {
        FinancialStoriesActionCreator.getInAndOutTransaction();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(9);
    });
});
describe('handleMicroTransactionSuccess', () => {
    let response = {
        "beneficiaries": [
            {
                "id": "f07a634d-1f9f-4297-8988-d10fb1f447e8",
                "code": "9384",
                "message": "Payee Deleted",
                "metadata": {
                    "available_funds": 7.30
                }
            }
        ]
    };

    it('Action to get all TransactionsList from API', () => {
        FinancialStoriesActionCreator.handleMicroTransactionSuccess();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(9);
    });
});
describe('handleCashPointTransactionSuccess', () => {
    let response = {
        "beneficiaries": [
            {
                "id": "f07a634d-1f9f-4297-8988-d10fb1f447e8",
                "code": "9384",
                "message": "Payee Deleted",
                "metadata": {
                    "available_funds": 7.30
                }
            }
        ]
    };

    it('Action to get all TransactionsList from API', () => {
        FinancialStoriesActionCreator.handleCashPointTransactionSuccess();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(9);
    });
});
describe('handleInOutTransactionSuccess', () => {
    let response = {
        "beneficiaries": [
            {
                "id": "f07a634d-1f9f-4297-8988-d10fb1f447e8",
                "code": "9384",
                "message": "Payee Deleted",
                "metadata": {
                    "available_funds": 7.30
                }
            }
        ]
    };

    it('Action to get all TransactionsList from API', () => {
        FinancialStoriesActionCreator.handleInOutTransactionSuccess();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(9);
    });
});
describe('resetTransactionSearchText', () => {
    let response = {
        "beneficiaries": [
            {
                "id": "f07a634d-1f9f-4297-8988-d10fb1f447e8",
                "code": "9384",
                "message": "Payee Deleted",
                "metadata": {
                    "available_funds": 7.30
                }
            }
        ]
    };

    it('Action to get all TransactionsList from API', () => {
        FinancialStoriesActionCreator.resetTransactionSearchText();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(9);
    });
});
describe('handleTagsListSuccess', () => {
    let response = {
        "beneficiaries": [
            {
                "id": "f07a634d-1f9f-4297-8988-d10fb1f447e8",
                "code": "9384",
                "message": "Payee Deleted",
                "metadata": {
                    "available_funds": 7.30
                }
            }
        ]
    };

    it('Action to get all TransactionsList from API', () => {
        FinancialStoriesActionCreator.handleTagsListSuccess();
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(5);
    });
});
describe('getAccountsList', () => {
    let response = {
        "beneficiaries": [
            {
                "id": "f07a634d-1f9f-4297-8988-d10fb1f447e8",
                "code": "9384",
                "message": "Payee Deleted",
                "metadata": {
                    "available_funds": 7.30
                }
            }
        ]
    };

    it('Action to get all TransactionsList from API', () => {
        FinancialStoriesActionCreator.getAccountsList();
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(5);
    });
});
describe('handleFinancialStoriesTile', () => {
    let response = {
        "beneficiaries": [
            {
                "id": "f07a634d-1f9f-4297-8988-d10fb1f447e8",
                "code": "9384",
                "message": "Payee Deleted",
                "metadata": {
                    "available_funds": 7.30
                }
            }
        ]
    };

    it('Action to get all TransactionsList from API', () => {
        FinancialStoriesActionCreator.handleFinancialStoriesTile();
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(5);
    });
});
describe('handleAccountsListSuccess', () => {
    let response = {
        "beneficiaries": [
            {
                "id": "f07a634d-1f9f-4297-8988-d10fb1f447e8",
                "code": "9384",
                "message": "Payee Deleted",
                "metadata": {
                    "available_funds": 7.30
                }
            }
        ]
    };

    it('Action to get all TransactionsList from API', () => {
        FinancialStoriesActionCreator.handleAccountsListSuccess();
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(6);
    });
});
describe('getFinancialStoriesConnection', () => {
    let response = {
        "beneficiaries": [
            {
                "id": "f07a634d-1f9f-4297-8988-d10fb1f447e8",
                "code": "9384",
                "message": "Payee Deleted",
                "metadata": {
                    "available_funds": 7.30
                }
            }
        ]
    };

    it('Action to get all TransactionsList from API', () => {
        FinancialStoriesActionCreator.getFinancialStoriesConnection();
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(6);
    });
});
// describe('handleFSTransactionProjectionError', () => {
//     let response = {
//         "beneficiaries": [
//             {
//                 "id": "f07a634d-1f9f-4297-8988-d10fb1f447e8",
//                 "code": "9384",
//                 "message": "Payee Deleted",
//                 "metadata": {
//                     "available_funds": 7.30
//                 }
//             }
//         ]
//     };

//     it('Action to get all TransactionsList from API', () => {
//         FinancialStoriesActionCreator.handleFSTransactionProjectionError();
//         expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(7);
//     });
// });
describe('getTransactionHistoryList', () => {
    let response = {
        "beneficiaries": [
            {
                "id": "f07a634d-1f9f-4297-8988-d10fb1f447e8",
                "code": "9384",
                "message": "Payee Deleted",
                "metadata": {
                    "available_funds": 7.30
                }
            }
        ]
    };

    it('Action to get all TransactionsList from API', () => {
        FinancialStoriesActionCreator.getTransactionHistoryList();
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(6);
    });
});
describe('getTransactionHistoryPageList', () => {
    let response = {
        "beneficiaries": [
            {
                "id": "f07a634d-1f9f-4297-8988-d10fb1f447e8",
                "code": "9384",
                "message": "Payee Deleted",
                "metadata": {
                    "available_funds": 7.30
                }
            }
        ]
    };

    it('Action to get all TransactionsList from API', () => {
        FinancialStoriesActionCreator.getTransactionHistoryPageList();
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(6);
    });
});
describe('getTransactionHistorySortList', () => {
    let response = {
        "beneficiaries": [
            {
                "id": "f07a634d-1f9f-4297-8988-d10fb1f447e8",
                "code": "9384",
                "message": "Payee Deleted",
                "metadata": {
                    "available_funds": 7.30
                }
            }
        ]
    };

    it('Action to get all TransactionsList from API', () => {
        FinancialStoriesActionCreator.getTransactionHistorySortList();
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(6);
    });
});
describe('getTransactionDateRangeList', () => {
    let response = {
        "beneficiaries": [
            {
                "id": "f07a634d-1f9f-4297-8988-d10fb1f447e8",
                "code": "9384",
                "message": "Payee Deleted",
                "metadata": {
                    "available_funds": 7.30
                }
            }
        ]
    };

    it('Action to get all TransactionsList from API', () => {
        FinancialStoriesActionCreator.getTransactionDateRangeList();
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(6);
    });
});
describe('handleUpdateFSTileClick', () => {

    it('Action to get all TransactionsList from API', () => {
        FinancialStoriesActionCreator.handleUpdateFSTileClick();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(17);
    });
});
describe('handleUpdateFSTagAssignment', () => {

    it('Action to get all TransactionsList from API', () => {
        FinancialStoriesActionCreator.handleUpdateFSTagAssignment();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(18);
    });
});
describe('transactionSearchTextList', () => {
    let response = {
        "beneficiaries": [
            {
                "id": "f07a634d-1f9f-4297-8988-d10fb1f447e8",
                "code": "9384",
                "message": "Payee Deleted",
                "metadata": {
                    "available_funds": 7.30
                }
            }
        ]
    };

    it('Action to get all TransactionsList from API', () => {
        FinancialStoriesActionCreator.transactionSearchTextList();
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(6);
    });
});
describe('handleTransactionHistoryDateRangeListSuccess', () => {
    let response = {
        "beneficiaries": [
            {
                "id": "f07a634d-1f9f-4297-8988-d10fb1f447e8",
                "code": "9384",
                "message": "Payee Deleted",
                "metadata": {
                    "available_funds": 7.30
                }
            }
        ]
    };

    it('Action to get all TransactionsList from API', () => {
        FinancialStoriesActionCreator.handleTransactionHistoryDateRangeListSuccess();
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(7);
    });
});
describe('handleTransactionHistoryListSuccess', () => {
    let response = {
        "beneficiaries": [
            {
                "id": "f07a634d-1f9f-4297-8988-d10fb1f447e8",
                "code": "9384",
                "message": "Payee Deleted",
                "metadata": {
                    "available_funds": 7.30
                }
            }
        ]
    };

    it('Action to get all TransactionsList from API', () => {
        FinancialStoriesActionCreator.handleTransactionHistoryListSuccess();
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(8);
    });
});
describe('handleTransactionSearchListSuccess', () => {
    let response = {
        "beneficiaries": [
            {
                "id": "f07a634d-1f9f-4297-8988-d10fb1f447e8",
                "code": "9384",
                "message": "Payee Deleted",
                "metadata": {
                    "available_funds": 7.30
                }
            }
        ]
    };

    it('Action to get all TransactionsList from API', () => {
        FinancialStoriesActionCreator.handleTransactionSearchListSuccess();
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(9);
    });
});
describe('handleCreateTagSuccess', () => {
    let response = {
        "beneficiaries": [
            {
                "id": "f07a634d-1f9f-4297-8988-d10fb1f447e8",
                "code": "9384",
                "message": "Payee Deleted",
                "metadata": {
                    "available_funds": 7.30
                }
            }
        ]
    };

    it('Action to get all TransactionsList from API', () => {
        FinancialStoriesActionCreator.handleCreateTagSuccess();
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(10);
    });
});
describe('handleDeleteTagSuccess', () => {
    let response = {
        "beneficiaries": [
            {
                "id": "f07a634d-1f9f-4297-8988-d10fb1f447e8",
                "code": "9384",
                "message": "Payee Deleted",
                "metadata": {
                    "available_funds": 7.30
                }
            }
        ]
    };

    it('Action to get all TransactionsList from API', () => {
        FinancialStoriesActionCreator.handleDeleteTagSuccess();
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(11);
    });
});
describe('handleAssignTagSuccess', () => {
    let response = {
        "beneficiaries": [
            {
                "id": "f07a634d-1f9f-4297-8988-d10fb1f447e8",
                "code": "9384",
                "message": "Payee Deleted",
                "metadata": {
                    "available_funds": 7.30
                }
            }
        ]
    };

    it('Action to get all TransactionsList from API', () => {
        FinancialStoriesActionCreator.handleAssignTagSuccess();
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(12);
    });
});
describe('handleUpdateTagSuccess', () => {
    let response = {
        "beneficiaries": [
            {
                "id": "f07a634d-1f9f-4297-8988-d10fb1f447e8",
                "code": "9384",
                "message": "Payee Deleted",
                "metadata": {
                    "available_funds": 7.30
                }
            }
        ]
    };

    it('Action to get all TransactionsList from API', () => {
        FinancialStoriesActionCreator.handleUpdateTagSuccess();
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(13);
    });
});
describe('getTransactionSearchList', () => {
    let response = {
        "beneficiaries": [
            {
                "id": "f07a634d-1f9f-4297-8988-d10fb1f447e8",
                "code": "9384",
                "message": "Payee Deleted",
                "metadata": {
                    "available_funds": 7.30
                }
            }
        ]
    };

    it('Action to get all TransactionsList from API', () => {
        FinancialStoriesActionCreator.getTransactionSearchList();
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(13);
    });
});
describe('tabSelect', () => {
    let response = {
        "beneficiaries": [
            {
                "id": "f07a634d-1f9f-4297-8988-d10fb1f447e8",
                "code": "9384",
                "message": "Payee Deleted",
                "metadata": {
                    "available_funds": 7.30
                }
            }
        ]
    };

    it('Action to get all TransactionsList from API', () => {
        FinancialStoriesActionCreator.tabSelect();
        expect(AppDispatcher.handleServerAction.mock.calls.length).toBe(13);
    });
});
describe('Action To handleAccountDetailsSuccess view action', () => {
    it('Action To check the accoun type and data', () => {
        FinancialStoriesActionCreator.handleAccountDetailsSuccess('Mortgage', 'data1');
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(21);
    });
});
describe('Action To getAccountDetails view action', () => {
    it('Action To check the accoun type and data', () => {
        FinancialStoriesActionCreator.getAccountDetails('Mortgage', 'data1', '1');
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(22);
    });
});
describe('Action To handleCreateUpdateTagError view action', () => {
    it('Action To check the accoun type and data', () => {
        FinancialStoriesActionCreator.handleCreateUpdateTagError('Mortgage', 'data1');
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(22);
    });
});
describe('Action To handleFSTransactionListSuccess view action', () => {
    it('Action To check the accoun type and data', () => {
        FinancialStoriesActionCreator.handleFSTransactionListSuccess('Mortgage', 'data1', 'DataFlow');
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(22);
    });
});
describe('Action To handleFSTransactionTileError action', () => {
    it('Action To check the accoun type and data', () => {
        FinancialStoriesActionCreator.handleFSTransactionTileError('Mortgage', 'data1', 'DataFlow');
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(22);
    });
});
describe('handleFSProjectionTourDone', () => {

    it('Action to get all TransactionsList from API', () => {
        FinancialStoriesActionCreator.handleFSProjectionTourDone();
        expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(23);
    });
});