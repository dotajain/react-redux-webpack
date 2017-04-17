/**
 * @module FinancialStoriesApiUtils
 */

'use strict';
jest.unmock('../FinancialStoriesApiUtils');
jest.unmock('../../../static/config');
jest.unmock('../../config');
const FinancialStoriesApiUtils = require('../FinancialStoriesApiUtils');
const envConfig = require('../../../static/config');
const ApiUtils = require('../ApiUtils');
const FinancialStoriesActionCreator = require('../../actions/FinancialStoriesActionCreator');
const FinancialStoriesConstants = require('../../constants/FinancialStoriesConstants');

describe('Payee Api Utils Test Cases', () => {
    beforeEach(() => {
        ApiUtils.makeAjaxCall.mockClear();
    });
    describe('getAccountsList', () => {
        beforeEach(() => {
            FinancialStoriesApiUtils.getAccountsList();
        });
        describe('Request Arguments of getAccountsList', () => {
            let args = '';
            beforeEach(() => {
                args = ApiUtils.makeAjaxCall.mock.calls[0][0];
            });
            it('should make Ajax call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
            });
            it('should have set the correct method', () => {
                expect(args.method).toBe('GET');
            });
            it('should construct the correct url', () => {
                expect(args.url).toContain('/banks/{bank-id}/accounts/default');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                FinancialStoriesActionCreator.handleAccountsListSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    accounts: []
                });
            });
            it('should make action call', () => {
                expect(FinancialStoriesActionCreator.handleAccountsListSuccess.mock.calls[0][0]).toBeDefined();
            });
        });
    });
    describe('getAccountDetails', () => {
        beforeEach(() => {
            FinancialStoriesApiUtils.getAccountDetails();
        });
        describe('Request Arguments of getAccountDetails', () => {
            let args = '';
            beforeEach(() => {
                args = ApiUtils.makeAjaxCall.mock.calls[0][0];
            });
            it('should make Ajax call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
            });
            it('should have set the correct method', () => {
                expect(args.method).toBe('GET');
            });
            it('should construct the correct url', () => {
                expect(args.url).toContain('undefined/banks/{bank-id}/accounts/default/undefined');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                FinancialStoriesActionCreator.handleAccountDetailsSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    accounts: []
                });
            });
            it('should make action call', () => {
                expect(FinancialStoriesActionCreator.handleAccountDetailsSuccess.mock.calls[0][0]).toBeDefined();
            });
        });
    });

    describe('getFinancialStoriesConnection', () => {
        const props = {
            fsStoryConnectionData: {
                template: {
                    file: 'projection',
                },
                params:
                {
                    account_list:
                    ['a91fe657-4605-42c7-96f1-3e1cc8555276']
                }
            }
        };
        beforeEach(() => {
            FinancialStoriesApiUtils.getFinancialStoriesConnection(props.fsStoryConnectionData);
        });
        describe('Request Arguments of getFinancialStoriesConnection', () => {
            let args;
            beforeEach(() => {
                args = ApiUtils.makeAjaxCall.mock.calls[0][0];
            });
            it('should make Ajax call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
            });
            it('should have set the correct method', () => {
                expect(args.method).toBe('GET');
            });
            it('should construct the correct url', () => {
                expect(args.url).toContain('undefined/banks/{bank-id}/accounts/default/a91fe657-4605-42c7-96f1-3e1cc8555276/projection');
            });
        });
        describe('it was success', () => {
            let status;
            beforeEach(() => {
                FinancialStoriesActionCreator.handleFSTransactionListSuccess.mockClear();
                status = ApiUtils.makeAjaxCall.mock.calls[0][1];

                status({
                    accounts: []
                });

            });
            it('should make action call', () => {
                expect(FinancialStoriesActionCreator.handleFSTransactionListSuccess.mock.calls[0][0]).toBeDefined();
            });
        });
    });

    describe('getFinancialStoriesConnection', () => {
        const props = {
            fsStoryConnectionData: {
                template: {
                    file: 'proj',
                },
                params:
                {
                    account_list:
                    ['a91fe657-4605-42c7-96f1-3e1cc8555276']
                }
            }
        };
        beforeEach(() => {
            FinancialStoriesApiUtils.getFinancialStoriesConnection(props.fsStoryConnectionData);
        });
        describe('Request Arguments of getFinancialStoriesConnection', () => {
            let args;
            beforeEach(() => {
                args = ApiUtils.makeAjaxCall.mock.calls[0][0];
            });
            it('should make Ajax call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
            });
            it('should have set the correct method', () => {
                expect(args.method).toBe('POST');
            });
            it('should construct the correct url', () => {
                expect(args.url).toContain('undefined/banks/{bank-id}/accounts/default/transactions/aggregations/microTransactions');
            });
        });
        describe('it was success', () => {
            let status;
            beforeEach(() => {
                FinancialStoriesActionCreator.handleFSTransactionListSuccess.mockClear();
                status = ApiUtils.makeAjaxCall.mock.calls[0][1];
                status({
                    accounts: []
                });
            });
            it('should make action call', () => {
                expect(FinancialStoriesActionCreator.handleFSTransactionListSuccess.mock.calls[0][0]).toBeDefined();
            });

        });
    });
    describe('getTransactionSearchTextList', () => {
        beforeEach(() => {
            let searchTextData = true;
            FinancialStoriesApiUtils.getTransactionSearchTextList(searchTextData);
        });
        describe('Request Arguments of getTransactionSearchTextList', () => {
            let args = '';
            beforeEach(() => {
                args = ApiUtils.makeAjaxCall.mock.calls[0][0];
            });
            it('should make Ajax call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
            });
            it('should have set the correct method', () => {
                expect(args.method).toBe('POST');
            });
            it('should construct the correct url', () => {
                expect(args.url).toContain('/banks/{bank-id}/accounts/default/transactions/searches/suggest');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                FinancialStoriesActionCreator.handleTransactionSearchListSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    accounts: []
                });
            });
            it('should make action call', () => {
                expect(FinancialStoriesActionCreator.handleTransactionSearchListSuccess.mock.calls[0][0]).toBeDefined();
            });
        });
    });
    describe('getTagsList', () => {
        beforeEach(() => {
            FinancialStoriesApiUtils.getTagsList();
        });
        describe('Request Arguments of getTagsList', () => {
            let args = '';
            beforeEach(() => {
                args = ApiUtils.makeAjaxCall.mock.calls[0][0];
            });
            it('should make Ajax call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
            });
            it('should have set the correct method', () => {
                expect(args.method).toBe('GET');
            });
            it('should construct the correct url', () => {
                expect(args.url).toContain('undefined/banks/{bank-id}/tags/active');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                FinancialStoriesActionCreator.handleTagsListSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    accounts: []
                });
            });
            it('should make action call', () => {
                expect(FinancialStoriesActionCreator.handleTagsListSuccess.mock.calls[0][0]).toBeDefined();
            });
        });
    });
    describe('createNewTag', () => {
        beforeEach(() => {
            FinancialStoriesApiUtils.createNewTag();
        });
        describe('Request Arguments of createNewTag', () => {
            let args = '';
            beforeEach(() => {
                args = ApiUtils.makeAjaxCall.mock.calls[0][0];
            });
            it('should make Ajax call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
            });
            it('should have set the correct method', () => {
                expect(args.method).toBe('POST');
            });
            it('should construct the correct url', () => {
                expect(args.url).toContain('undefined/banks/{bank-id}/tags');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                FinancialStoriesActionCreator.handleCreateTagSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    accounts: []
                });
            });
            it('should make action call', () => {
                expect(FinancialStoriesActionCreator.handleCreateTagSuccess.mock.calls[0][0]).toBeDefined();
            });
        });
        describe('it has error', () => {
            let failure;
            beforeEach(() => {
                FinancialStoriesActionCreator.handleCreateUpdateTagError.mockClear();
                failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
                failure({
                    error: true,
                });
            });
            it('should make action call', () => {
                expect(FinancialStoriesActionCreator.handleCreateUpdateTagError.mock.calls[0][0]).toBeDefined();
            });
        });
    });
    describe('updateTag', () => {
        beforeEach(() => {
            const props = {
                data: {
                    id: '112211',
                }
            }
            FinancialStoriesApiUtils.updateTag(props.data);
        });
        describe('Request Arguments of updateTag', () => {
            let args = '';
            beforeEach(() => {
                args = ApiUtils.makeAjaxCall.mock.calls[0][0];
            });
            it('should make Ajax call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
            });
            it('should have set the correct method', () => {
                expect(args.method).toBe('PUT');
            });
            it('should construct the correct url', () => {
                expect(args.url).toContain('undefined/banks/{bank-id}/tags/112211');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                FinancialStoriesActionCreator.handleUpdateTagSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    accounts: []
                });
            });
            it('should make action call', () => {
                expect(FinancialStoriesActionCreator.handleUpdateTagSuccess.mock.calls[0][0]).toBeDefined();
            });
        });
        describe('it has error', () => {
            let failure;
            beforeEach(() => {
                FinancialStoriesActionCreator.handleCreateUpdateTagError.mockClear();
                failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
                failure({
                    error: true,
                });
            });
            it('should make action call', () => {
                expect(FinancialStoriesActionCreator.handleCreateUpdateTagError.mock.calls[0][0]).toBeDefined();
            });
        });
    });
    describe('deleteTag', () => {
        beforeEach(() => {
            let data = true;
            FinancialStoriesApiUtils.deleteTag(data);
        });
        describe('Request Arguments of deleteTag', () => {
            let args = '';
            beforeEach(() => {
                args = ApiUtils.makeAjaxCall.mock.calls[0][0];
            });
            it('should make Ajax call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
            });
            it('should have set the correct method', () => {
                expect(args.method).toBe('PUT');
            });
            xit('should construct the correct url', () => {
                expect(args.url).toContain('undefined/banks/{bank-id}/tags/true/archive');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                FinancialStoriesActionCreator.handleDeleteTagSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    accounts: []
                });
            });
            it('should make action call', () => {
                expect(FinancialStoriesActionCreator.handleDeleteTagSuccess.mock.calls[0][0]).toBeDefined();
            });
        });
    });
    describe('assignTag', () => {
        beforeEach(() => {
            let data = true;
            let accountId = true;
            FinancialStoriesApiUtils.assignTag(data, accountId);
        });
        describe('Request Arguments of assignTag', () => {
            let args = '';
            beforeEach(() => {
                args = ApiUtils.makeAjaxCall.mock.calls[0][0];
            });
            it('should make Ajax call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
            });
            it('should have set the correct method', () => {
                expect(args.method).toBe('PUT');
            });
            it('should construct the correct url', () => {
                expect(args.url).toContain('undefined/banks/{bank-id}/accounts/default/true/transactions/metadata/tags');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                FinancialStoriesActionCreator.handleAssignTagSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    accounts: []
                });
            });
            it('should make action call', () => {
                expect(FinancialStoriesActionCreator.handleAssignTagSuccess.mock.calls[0][0]).toBeDefined();
            });
        });
    });
    describe('getMicroTransactions', () => {
        beforeEach(() => {
            let tileData = true;
            FinancialStoriesApiUtils.getMicroTransactions(tileData);
        });
        describe('Request Arguments of getMicroTransactions', () => {
            let args = '';
            beforeEach(() => {
                args = ApiUtils.makeAjaxCall.mock.calls[0][0];
            });
            it('should make Ajax call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
            });
            it('should have set the correct method', () => {
                expect(args.method).toBe('POST');
            });
            it('should construct the correct url', () => {
                expect(args.url).toContain('undefined/banks/{bank-id}/accounts/default/transactions/aggregations/microTransactions');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                FinancialStoriesActionCreator.handleMicroTransactionSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    accounts: []
                });
            });
            it('should make action call', () => {
                expect(FinancialStoriesActionCreator.handleMicroTransactionSuccess.mock.calls[0][0]).toBeDefined();
            });
        });
    });
    describe('getCashPointTransactions', () => {
        beforeEach(() => {
            let tileData = true;
            FinancialStoriesApiUtils.getCashPointTransactions(tileData);
        });
        describe('Request Arguments of getCashPointTransactions', () => {
            let args = '';
            beforeEach(() => {
                args = ApiUtils.makeAjaxCall.mock.calls[0][0];
            });
            it('should make Ajax call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
            });
            it('should have set the correct method', () => {
                expect(args.method).toBe('POST');
            });
            it('should construct the correct url', () => {
                expect(args.url).toContain('undefined/banks/{bank-id}/accounts/default/transactions/aggregations/cashpoint');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                FinancialStoriesActionCreator.handleCashPointTransactionSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    accounts: []
                });
            });
            it('should make action call', () => {
                expect(FinancialStoriesActionCreator.handleCashPointTransactionSuccess.mock.calls[0][0]).toBeDefined();
            });
        });
    });
    describe('getInOutTransactions', () => {
        beforeEach(() => {
            let tileData = true;
            FinancialStoriesApiUtils.getInOutTransactions(tileData);
        });
        describe('Request Arguments of getInOutTransactions', () => {
            let args = '';
            beforeEach(() => {
                args = ApiUtils.makeAjaxCall.mock.calls[0][0];
            });
            it('should make Ajax call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
            });
            it('should have set the correct method', () => {
                expect(args.method).toBe('POST');
            });
            it('should construct the correct url', () => {
                expect(args.url).toContain('undefined/banks/{bank-id}/accounts/default/transactions/aggregations/insAndOuts');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                FinancialStoriesActionCreator.handleInOutTransactionSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    accounts: []
                });
            });
            it('should make action call', () => {
                expect(FinancialStoriesActionCreator.handleInOutTransactionSuccess.mock.calls[0][0]).toBeDefined();
            });
        });
    });
    describe('getAccountTypeDetails', () => {

        // let stubConfig = 'adadda';
        let stubConfig = {
            financialStoresStub: {
                AccountDetailsCurrentConnection: 'AccountDetailsCurrentConnection',
                AccountDetailsLoanConnection: 'AccountDetailsLoanConnection',
                AccountDetailsCreditConnection: 'AccountDetailsCreditConnection',
                AccountDetailsMortgageConnection: 'AccountDetailsMortgageConnection',
                AccountDetailsSavingsConnection: 'AccountDetailsSavingsConnection',
                AccountDetailsSavings1Connection: 'AccountDetailsSavings1Connection',
            }
        }
        it('getAccountTypeDetails fxn', () => {
            let accountNumber = 'b80e95a0-6b60-45b2-8b0f-77f2355f3061';
            FinancialStoriesApiUtils.getAccountTypeDetails(stubConfig, accountNumber);
        });

        it('getAccountTypeDetails fxn', () => {
            let accountNumber = '05985dae-d2de-4ebc-ab0a-79093081bde5';
            FinancialStoriesApiUtils.getAccountTypeDetails(stubConfig, accountNumber);
        });

        it('getAccountTypeDetails fxn', () => {
            let accountNumber = '084c7a11-c91a-45ef-baea-2fd0e9556e16';
            FinancialStoriesApiUtils.getAccountTypeDetails(stubConfig, accountNumber);
        });

        it('getAccountTypeDetails fxn', () => {
            let accountNumber = '3420d6c1-fb60-4ac5-a226-0d741f498ad2';
            FinancialStoriesApiUtils.getAccountTypeDetails(stubConfig, accountNumber);
        });

        it('getAccountTypeDetails fxn', () => {
            let accountNumber = 'ee8948b5-e443-408a-a2cd-1af9b29fdd5f';
            FinancialStoriesApiUtils.getAccountTypeDetails(stubConfig, accountNumber);
        });

        it('getAccountTypeDetails fxn', () => {
            let accountNumber = 'a91fe657-4605-42c7-96f1-3e1cc8555276';
            FinancialStoriesApiUtils.getAccountTypeDetails(stubConfig, accountNumber);
        });

        it('getAccountTypeDetails fxn', () => {
            let accountNumber = 'default';
            FinancialStoriesApiUtils.getAccountTypeDetails(stubConfig, accountNumber);
        });



        xdescribe('Request Arguments of getAccountTypeDetails', () => {
            let args = '';
            beforeEach(() => {
                //args = ApiUtils.makeAjaxCall.mock.calls[0][0];
                args = stubConfig.financialStoresStub.AccountDetailsCurrentConnection
            });
            xit('should make Ajax call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
            });
            xit('should have set the correct method', () => {
                expect(args.method).toBe('GET');
            });
            xit('should construct the correct url', () => {
                expect(args.url).toContain('/banks/{bank-id}/accounts/default');
            });
        });
    });
    describe('getFilterUrl', () => {
        beforeEach(() => {
            const props = {
                filterData: {
                    template: {
                        file: 'FinancialStoriesConstants.microTransactions',
                    }
                }
            }
            FinancialStoriesApiUtils.getFilterUrl(props.filterData);
        });
        xdescribe('Request Arguments of getFilterUrl', () => {
            let args = '/banks/{bank-id}/accounts/default/transactions/aggregations/microTransactions';
            beforeEach(() => {
                url = ApiUtils.makeAjaxCall.mock.calls[0][0];
                //args = stubConfig.financialStoresStub.AccountDetailsCurrentConnection
            });
            xit('should make Ajax call', () => {
                //expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
            });
            xit('should have set the correct method', () => {
                expect(args.method).toBe('GET');
            });
            it('should construct the correct url', () => {
                expect(args.url).toContain('/banks/{bank-id}/accounts/default/transactions/aggregations/microTransactions');
            });
        });
    });
});

describe('getFilterUrl', () => {
    it('getFilterUrl fxn', () => {
        const filterData = {
            template: {
                file: 'microTransactions',
            }
        };
        FinancialStoriesApiUtils.getFilterUrl(filterData);
    });

    it('getFilterUrl fxn', () => {
        const filterData = {
            template: {
                file: 'cashpoint',
            }
        };
        FinancialStoriesApiUtils.getFilterUrl(filterData);
    });

    it('getFilterUrl fxn', () => {
        const filterData = {
            template: {
                file: 'insAndOuts',
            }
        };
        FinancialStoriesApiUtils.getFilterUrl(filterData);
    });

    xit('getFilterUrl fxn', () => {
        const filterData = {
            template: {
                file: 'projection',
            }
        };
        FinancialStoriesApiUtils.getFilterUrl(filterData);
    });
});

describe('getFilterStubFile', () => {

    let stubConfig = {
        financialStoresStub: {
            FinancialStoriesConnectionMicroTransactions: 'FinancialStoriesConnectionMicroTransactions',

        }
    };

    it('getFilterUrl fxn', () => {
        const filterData = {
            template: {
                file: 'microTransactions',
            }
        };
        FinancialStoriesApiUtils.getFilterStubFile(stubConfig, filterData);
    });

    it('getFilterUrl fxn', () => {
        const filterData = {
            template: {
                file: 'cashpoint',
            }
        };
        FinancialStoriesApiUtils.getFilterStubFile(stubConfig, filterData);
    });

    it('getFilterUrl fxn', () => {
        const filterData = {
            template: {
                file: 'insAndOuts',
            }
        };
        FinancialStoriesApiUtils.getFilterStubFile(stubConfig, filterData);
    });

    it('getFilterUrl fxn', () => {
        const filterData = {
            template: {
                file: 'projection',
            }
        };
        FinancialStoriesApiUtils.getFilterStubFile(stubConfig, filterData);
    });

    it('getFilterUrl fxn', () => {
        const filterData = {
            template: {
                file: 'url',
            }
        };
        FinancialStoriesApiUtils.getFilterStubFile(stubConfig, filterData);
    });
}); 


describe('getOldestTransactionDate', () => {
        beforeEach(() => {
            FinancialStoriesApiUtils.getOldestTransactionDate();
        });
        describe('Request Arguments of getOldestTransactionDate', () => {
            let args = '';
            beforeEach(() => {
                args = ApiUtils.makeAjaxCall.mock.calls[0][0];
            });
            it('should make Ajax call', () => {
                expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
            });
            xit('should have set the correct method', () => {
                expect(args.method).toBe('GET');
            });
            xit('should construct the correct url', () => {
                expect(args.url).toContain('undefined/banks/{bank-id}/accounts/default/undefined');
            });
        });
        describe('it was success', () => {
            let success;
            beforeEach(() => {
                FinancialStoriesActionCreator.handleAccountDetailsSuccess.mockClear();
                success = ApiUtils.makeAjaxCall.mock.calls[0][1];
                success({
                    accounts: []
                });
            });
            it('should make action call', () => {
                expect(FinancialStoriesActionCreator.handleOldestTransactionDate.mock.calls[0][0]).toBeDefined();
            });
        });
    });
