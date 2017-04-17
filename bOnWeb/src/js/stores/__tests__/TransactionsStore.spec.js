'use strict';

jest.unmock('../../constants/TimelineConstants');
jest.unmock('../TransactionsStore');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const _ = require('lodash');
const EventEmitter = require('events').EventEmitter;

const AppDispatcher = require('../../dispatcher/AppDispatcher');
const TimelineApiUtils = require('../../utils/TimelineApiUtils');
const TimelineConstants = require('../../constants/TimelineConstants');
const AccountConstants = require('../../constants/AccountConstants');
const TransactionsStore = require('../TransactionsStore');
const TimelineActionCreator = require('../../actions/TimelineActionCreator');

describe('Transactions Store test cases', () => {
	let callback = AppDispatcher.register.mock.calls[0][0];
	let getTransactionsList = () => ({
		action: {
			actionType: TimelineConstants.REQUEST_TRANSACTION_LIST
		}
	});
	let getSearchTransactionSuggest = (searchText) => ({
		action: {
			actionType: TimelineConstants.REQUEST_SEARCH_TRANSACTION_SUGGEST,
			searchText
		}
	});
	let getTransactionSearchData = (suggestData) => ({
		action: {
			actionType: TimelineConstants.REQUEST_SEARCH_TRANSACTION_DATA,
			data : suggestData
		}
	});
	let resetSearchInfo = (fields) => ({
		action: {
			actionType: TimelineConstants.RESET_SEARCH_INFO,
			data: fields
		}
	});
	let handleTransactionSuccess = (data) => ({
		action: {
			actionType: TimelineConstants.REQUEST_TRANSACTION_LIST_SUCCESS,
			data
		}
	});
	let handleTransactionError = (error) => ({
		action: {
			actionType: TimelineConstants.REQUEST_TRANSACTION_LIST_ERROR,
			error
		}
	});
	let handleTransactionSearchSuggestionSuccess = (data) => ({
		action: {
			actionType: TimelineConstants.REQUEST_SEARCH_TRANSACTION_SUGGEST_SUCCESS,
			data
		}
	});
	let handleAccountsListSuccess = (data) => ({
		action: {
			actionType: AccountConstants.REQUEST_ACCOUNTS_LIST_SUCCESS,
			data
		}
	})
	describe('Transactions List test Cases', () => {
		describe('Transactions List API call', () => {
			callback(getTransactionsList())
			let result = TransactionsStore.getTransactionsList();
			it('should make API call', () => {
				expect(TimelineApiUtils.getTransactionsList.mock.calls.length).toBe(1);
			});
		});
		describe('get Transaction List Success Scenario', () => {
			let data = {
  				"hits": {
    				"hits": [
     				 {
     				 "_source": {
     				 	"details": {
            				"type": "Fee",
            				"posted": true,
            				"when": "2016-05-28T13:00:00.000+01:00",
            				"amount": {
              					"value": -215.98,
              					"currency": "GBP"
            				},
            				"narrative": {
              					"small": "Card 02, sports car ab",
              					"medium": "Card 02, sports car ab",
              					"large": "Card 02, sports car ab"
           						}
         					 }
         				}
         			},
         			{
     				 "_source": {
     				 	"details": {
            				"type": "Fee",
            				"posted": true,
            				"when": "2016-05-28T13:00:00.000+01:00",
            				"amount": {
              					"value": -215.98,
              					"currency": "GBP"
            				},
            				"narrative": {
              					"small": "Card 02, sports car ab",
              					"medium": "Card 02, sports car ab",
              					"large": "Card 02, sports car ab"
           						}
         					 }
         				}
         			}]
        		}
        	};
        	let output =[
        			{
     				 "_source": {
     				 	"details": {
            				"type": "Fee",
            				"posted": true,
            				"when": "2016-05-28T13:00:00.000+01:00",
            				"amount": {
              					"value": -215.98,
              					"currency": "GBP"
            				},
            				"narrative": {
              					"small": "Card 02, sports car ab",
              					"medium": "Card 02, sports car ab",
              					"large": "Card 02, sports car ab"
           						}
         					 }
         				}
         			},
         			{
     				 "_source": {
     				 	"details": {
            				"type": "Fee",
            				"posted": true,
            				"when": "",
            				"amount": {
              					"value": -215.98,
              					"currency": "GBP"
            				},
            				"narrative": {
              					"small": "Card 02, sports car ab",
              					"medium": "Card 02, sports car ab",
              					"large": "Card 02, sports car ab"
           						}
         					 }
         				}
         			}];
			callback(handleTransactionSuccess(data))
			let result = TransactionsStore.getTransactionsList();
			it('should be equal to output', () => {
				expect(result).toEqual(output);
			});
		});
		describe('Error in fetching transaction list',() => {
			let error = {
				error :"Something Went Wrong"
			}
			callback(handleTransactionError(error));
			let result = TransactionsStore.getTransactionsList();
			it('should have blank transaction list', () => {
				expect(result.length).toBe(0);
			});
      it('should have load search transactions false', () => {
        expect(TransactionsStore.getTransactionLoad()).toBeFalsy();
      })
		});
	});
	describe('Transaction search suggestion', () => {
		let result;
		describe('Transaction search suggestion API Call', () => {
			let searchText = 'atm';
			callback(getSearchTransactionSuggest(searchText));
			
        	it('should make API call', () => {
				expect(TimelineApiUtils.getTransactionsSearchSuggestion.mock.calls.length).toBe(1);
			});
		});
		describe('Search suggestion success', () => {
			let searchData = {
  				"suggest" : [
    				{
      				"length" : 4,
      				"offset" : 0,
      				"options" : [
       					 {
         					"score" : 0.239,
          					"text" : "Mortgage"
        				 	}
        				]
        			}
        		]};
        	let output = [
       			 {
         			"score" : 0.239,
          			"text" : "Mortgage"
        		}];
        	callback(handleTransactionSearchSuggestionSuccess(searchData));
        	result = TransactionsStore.getTransactionSearchSuggestion();
        	let popUpState = TransactionsStore.getPopupState();
        	it('should be equal to output', () => {
        		expect(result).toEqual(output);
        	});
        	it('should have PopUp State as True',() => {
        		expect(popUpState).toBeTruthy();
        	})
		});
	});
	describe('Transaction Search Data', () => {
		describe('Transaction Search Data should make API call', () =>{
			let suggestData = {
         			"score" : 0.239,
          			"text" : "Mortgage"
        		};
			callback(getTransactionSearchData(suggestData));
			let result = TransactionsStore.getTransactionSearchText();
      let activeKey = TransactionsStore.getActiveKey();
			let popUpState = TransactionsStore.getPopupState();
			it('should make API call', () => {
				expect(TimelineApiUtils.getTransactionSearchData.mock.calls.length).toBe(1);
			});
			it('should return passed text', () => {
				expect(result).toEqual(suggestData.text);
			});
			it('should have popUpState as False',() => {
				expect(popUpState).toBeFalsy();
			});
      it('should have active key as Timeline', () => {
            expect(activeKey).toBe(2)
      });
			let data = {
  				"hits": {
    				"hits": [
     				 {
     				 "_source": {
     				 	"details": {
            				"type": "Fee",
            				"posted": true,
            				"when": "2016-05-28T13:00:00.000+01:00",
            				"amount": {
              					"value": -215.98,
              					"currency": "GBP"
            					},
            				"narrative": {
              					"small": "Card 02, sports car ab",
              					"medium": "Card 02, sports car ab",
              					"large": "Card 02, sports car ab"
           							}
         					 	}
         					}
         				},
         			{
     				 "_source": {
     				 	"details": {
            				"type": "Fee",
            				"posted": true,
            				"when": "2016-05-28T13:00:00.000+01:00",
            				"amount": {
              					"value": -215.98,
              					"currency": "GBP"
            					},
            				"narrative": {
              					"small": "Card 02, sports car ab",
              					"medium": "Card 02, sports car ab",
              					"large": "Card 02, sports car ab"
           								}
         						 }
         					}
         				}]
        			}
        		}
			let output =[
        			{
     				 "_source": {
     				 	"details": {
            				"type": "Fee",
            				"posted": true,
            				"when": "2016-05-28T13:00:00.000+01:00",
            				"amount": {
              					"value": -215.98,
              					"currency": "GBP"
            				},
            				"narrative": {
              					"small": "Card 02, sports car ab",
              					"medium": "Card 02, sports car ab",
              					"large": "Card 02, sports car ab"
           						}
         					 }
         				}
         			},
         			{
     				 "_source": {
     				 	"details": {
            				"type": "Fee",
            				"posted": true,
            				"when": "",
            				"amount": {
              					"value": -215.98,
              					"currency": "GBP"
            				},
            				"narrative": {
              					"small": "Card 02, sports car ab",
              					"medium": "Card 02, sports car ab",
              					"large": "Card 02, sports car ab"
           						}
         					 }
         				}
         			}];
         		callback(handleTransactionSuccess(data));
         		let result1 = TransactionsStore.getTransactionsList();
         		it('should have output same as result', () => {
         			expect(result1).toEqual(output);
         		});
            it('should have load search transactions false', () => {
              expect(TransactionsStore.getSearchTransactionLoad()).toBeFalsy();
            })
         	});
	});
	describe('Reset Search Test Cases', () => {
		let fields = {
			isSearchTextReset : true,
			isPopupOpenReset : true,
    }
    let fields2 = {
      isSearchTextReset : true,
      isPopupOpenReset : true,
      close: true,
    }
		callback(resetSearchInfo(fields))
		let result = TransactionsStore.getTransactionSearchText();
		let popUpState = TransactionsStore.getPopupState();
		it('should have blank transaction search', () => {
			expect(result).toBe('');
		})
		it('should have popUpState as false', () => {
			expect(popUpState).toBeFalsy();
		});
    callback(resetSearchInfo(fields2))
    let result1 = TransactionsStore.getTransactionSearchText();
    let popUpState1 = TransactionsStore.getPopupState();
    it('should have blank transaction search', () => {
      expect(result1).toBe('');
    })
    it('should have popUpState as false', () => {
      expect(popUpState1).toBeFalsy();
    })
	});
	describe('Test to check whether Account List is loaded', () => {
		let accountList = {
			accounts : []
		};
		TimelineApiUtils.getTransactionsList.mockClear();
		callback(handleAccountsListSuccess(accountList));
		it('should make API call for transaction list', () => {
			expect(TimelineApiUtils.getTransactionsList.mock.calls.length).toBe(1);
		})
	})

	describe('removeChangeListener', () => {
			const props = {
				content: {

				},
			};
			it('calls for the removeChangeListener', () => {
				let node = document.createElement('div');

				const render = (comp, el) => ReactDOM.render(comp, el);
				
				TransactionsStore.removeChangeListener(jest.fn())

				expect(EventEmitter.listenerCount.length).toBe(2);
			});


		});

		describe('addChangeListener', () => {
			const props = {
				content: {

				},
			};
			it('calls for the addChangeListener', () => {

				TransactionsStore.addChangeListener(jest.fn())
				expect(EventEmitter.listenerCount.length).toBe(2);
			});


		});

});
