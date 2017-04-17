
jest.unmock('../../constants/SavingsPotsConstants');
jest.unmock('../SavingsPotsStore');

const assign = require('object-assign');
const EventEmitter = require('events').EventEmitter;
const AppDispatcher = require('../../dispatcher/AppDispatcher');
 const SavingsPotsConstants = require('../../constants/SavingsPotsConstants');
const SavingsPotsUtils = require('../../utils/SavingsPotsUtils');
const AccountConstants = require('../../constants/AccountConstants');
const SavingsPotsStore = require('../../stores/SavingsPotsStore');
const AccountsApiUtils = require('../../utils/AccountsApiUtils');
const AccountsStore = require('../../stores/AccountsStore');

const _ = require('lodash');
const CHANGE_EVENT = 'change';
const _collectAccountID = [];

describe('SavingPotsStore Test Cases', () => {
let callback = AppDispatcher.register.mock.calls[0][0];

	let requestAccountsList = (data) => ({
		action: {
			actionType: SavingsPotsConstants.REQUEST_POT_ACCOUNTS_LIST,
			data,
		}
	});

	let requestAccountsListSuccess = (data) => ({
		action: {
			actionType: SavingsPotsConstants.REQUEST_POT_ACCOUNTS_LIST_SUCCESS,
			data,
		}
	});
	
	let requestPotAccountsListError = (data) => ({
		action: {
			actionType: SavingsPotsConstants.REQUEST_POT_ACCOUNTS_LIST_ERROR,
			data,
		}
	});


    let getPotsData = (data ) => ({
		action: {
			actionType: SavingsPotsConstants.REQUEST_POT_DATA,
            data,
		}
	});
     let handlePotDataSuccess = (data) => ({         
		action: {
			actionType: SavingsPotsConstants.REQUEST_POT_DATA_SUCCESS,
            data: false,
		}        
	});
     
     let handlePotDataError = (data) => ({         
		action: {
			actionType: SavingsPotsConstants.REQUEST_POT_DATA_ERROR,
            data,
		}        
	});
    let getPotDetail = (response) => ({
		action: {
			actionType: SavingsPotsConstants.REQUEST_POT_DETAIL_PAGE,
            data:response,
		}
	});
    let handleSinglePotDataSuccess = (response) => ({
		action: {
			actionType: SavingsPotsConstants.REQUEST_SINGLE_POT_DATA_SUCCESS,
            data:response,
		}
	});
	let handleSinglePotDataError = (response) => ({
		action: {
			actionType: SavingsPotsConstants.REQUEST_POT_DETAIL_DATA_ERROR,
            data:response,
		}
	});
     let getClickedAccount = (data,accindex) => ({
		action: {
			actionType: SavingsPotsConstants.REQUEST_SELECTED_ACCOUNT,
           data,
           accindex,
		}
	});
    let getCreateSavingPotPage = (response) => ({
		action: {
			actionType: SavingsPotsConstants.REQUEST_CREATE_PAGE,
            data:response,
		}
	});
     let handleCreatedPotDataSuccess = (response) => ({
		action: {
			actionType: SavingsPotsConstants.REQUEST_CREATED_POT_DATA_SUCCESS,
            data:response,
		}
	});
    let deletePotConnection = (data) => ({
		action: {
			actionType: SavingsPotsConstants.REQUEST_DELETE_POT_CONNECTION,
            data
		}
	});    
    let getReducePotPage = (response) => ({
		action: {
			actionType: SavingsPotsConstants.REQUEST_REDUCE_POT_PAGE,
            data:response
		}
	});
    let getPotConfirmation = (response) => ({
		action: {
			actionType: SavingsPotsConstants.REQUEST_NEW_POT_CONFIRMATION,
            data:response,
		}
	});
    let getInterPotData = (response) => ({
		action: {
			actionType: SavingsPotsConstants.REQUEST_INTERPOT_DATA,
            data:response,
		}
	});
     let displayLoading  = (response) => ({
		action: {
			actionType: SavingsPotsConstants.REQUEST_SINGLE_POT_DATA_ERROR,
            data:response,
		}
	});
	 let editError  = (response) => ({
		action: {
			actionType: SavingsPotsConstants.REQUEST_CREATED_POT_DATA_ERROR,
            data:response,
		}
	});
	let interPotData  = (response) => ({
		action: {
			actionType: SavingsPotsConstants.REQUEST_INTERPOT_DATA_SUCCESS,
            data:response,
		}
	});
	let editPotData  = (response) => ({
		action: {
			actionType: SavingsPotsConstants.REQUEST_EDITED_POT_DATA,
            data:response,
		}
	});
	
	let interPotError  = (response) => ({
		action: {
			actionType: SavingsPotsConstants.REQUEST_INTERPOT_DATA_ERROR,
            data:response,
		}
	});
	
	let errorModal  = (response) => ({
		action: {
			actionType: SavingsPotsConstants.REQUEST_CLOSE_ERROR_MODAL,
            data:response,
		}
	});

	describe('Unit Test Case : 1 : SavingPotsStore : displayLoading', () => {
			let result;
			let data = {
				      "id": "4a131a32-2483-45f2-91c1-074878410dcf",
				      "name": "Holiday",
				      "reference": "Reference",
				      "balance": {
				        "currency": "GBP",
				        "value": "1200.0",
				      },
				      "goal": {
				        "amount": {
				          "value": 2000,
				          "currency": "GBP"
				        },
				        "when": '2016-05-19'
				      },
				      "schedule": {
				        "recurrence": {
				          "frequency": {
				            "monthly": {
				              "interval": "1",
				              "day_of_month": "1"
				            }
				          },
				          "amount": {
				            "value": 100,
				            "currency": "GBP"
				          }
				        },
				        "next_payment": {
				          "when": "2016-05-19",
				          "amount": {
				            "value": "270.0",
				            "currency": "GBP"
				          }
				        }
				      }
			};
			callback(handleSinglePotDataSuccess(data));
			callback(editPotData(data));
			result = SavingsPotsStore.displayLoading();
			it('should be equal to data', () => {
				expect(result).toEqual(true);
			});
			
		});
		describe('Unit Test Case : 2 : SavingPotsStore : displayLoading', () => {
			let result;
			let data = false;
			
			callback(interPotData(data));
			result = SavingsPotsStore.displayLoading();
			it('should be equal to data', () => {
				expect(result).toEqual(true);
			});
			
		});
	
	describe('Unit Test Case : 3 : SavingPotsStore : editError', () => {
			let result;
			let data ;
			
			callback(editError(data));
			result = SavingsPotsStore.editError();
			it('should be equal to data', () => {
				expect(result).toEqual({});
			});
			
		});
  
	describe('Unit Test Case : 4 : SavingPotsStore : displayLoading', () => {
			let result;
			let data = false;
			
			callback(displayLoading(data));
			result = SavingsPotsStore.displayLoading();
			it('should be equal to data', () => {
				expect(result).toEqual(true);
			});
			
		});
	
    
    describe('Unit Test Case : 5 : SavingPotsStore : getAll', () => {
            let _accountID;
			let data = {"accounts": [
			    {
			      "id": "05985dae-d2de-4ebc-ab0a-79093081bde5",
			      "type": "loan",
			      "product": {
			        "code": "901",
			        "name": "Personal Loan",
			        "description": "Personal Loan"
			      },
			      "actions_available": {
			        "/account/pots": true
			      }
			    },
			    {
			      "id": "05985dae-d2de-4ebc-ab0a-79093081bde5",
			      "type": "loan-new",
			      "product": {
			        "code": "901",
			        "name": "Personal-Loan",
			        "description": "Personal Loan"
			      },
			      "actions_available": {
			        "/account/pots": false
			      }
			    }
			  ]};
			callback(requestAccountsListSuccess(data));
			_accountID = AccountsStore.getAll();
			it('should be equal to data', () => {
				expect(SavingsPotsUtils.getPotsData.mock.calls.length).toBe(4);
			});
			
		});

	describe('Unit Test Case : 6 : SavingPotsStore : addChangeListener', () => {
			const props = {
				content: {

				},
			};
			it('calls for the addChangeListener', () => {

				SavingsPotsStore.addChangeListener(jest.fn())
				expect(EventEmitter.listenerCount.length).toBe(2);
			});


		});

	describe('Unit Test Case : 7 : SavingPotsStore : removeChangeListener', () => {
			const props = {
				content: {

				},
			};
			it('calls for the removeChangeListener', () => {
				let node = document.createElement('div');

				const render = (comp, el) => ReactDOM.render(comp, el);
				//component = ReactDOM.render(<NBAStore />, node);
				SavingsPotsStore.removeChangeListener(jest.fn())

				expect(EventEmitter.listenerCount.length).toBe(2);
			});
		});	

	describe('Unit Test Case : 8 : SavingPotsStore : getCreateSavingPotPage', () => {
			let result;
			let data = false;
			
			callback(handlePotDataSuccess(data));
			result = SavingsPotsStore.getCreateSavingPotPage();
			
			it('should be equal to data', () => {
				expect(result).toEqual(false);
			});
			
		});

	describe('Unit Test Case : 9 : SavingPotsStore : getCreateSavingPotPage', () => {
			let result;
			let data = '';
			
			callback(handlePotDataSuccess(data));
			result = SavingsPotsStore.getCreateSavingPotPage();
			it('should be equal to data', () => {
				expect(result).toEqual(false);
			});
			
		});

		describe('Unit Test Case : 10 : SavingPotsStore : getCreateSavingPotPage', () => {
			let result;

			let data = false;
			
			callback(getCreateSavingPotPage(data));
			result = SavingsPotsStore.getCreateSavingPotPage();
			
			it('should be equal to data', () => {
				expect(result).toEqual(true);
			});
			describe('Unit Test Case : 11 : SavingPotsStore : toEqual', () => {
				let result;
			it('should be blank',() =>{
				expect(result).toEqual();
			})
			});
		});
     
	   describe('Unit Test Case : 12 : SavingPotsStore : getCreateSavingPotPage', () => {
			let result;
			let data = false;
			
			callback(handleSinglePotDataSuccess(data));
			result = SavingsPotsStore.getCreateSavingPotPage();
			
			it('should be equal to data', () => {
				expect(result).toEqual(false);
			});
			
		});
		 describe('Unit Test Case : 13 : SavingPotsStore : getCreateSavingPotPages', () => {
			let result;
			let data = false;
			
			callback(getReducePotPage(data));
			result = SavingsPotsStore.getCreateSavingPotPage();
			
			it('should be equal to data', () => {
				expect(result).toEqual(false);
			});
			
		});
		
         describe('Unit Test Case : 14 : SavingPotsStore : getCreateSavingPotPage', () => {
			let result;
			let data = false;
			
			callback(handleCreatedPotDataSuccess(data));
			result = SavingsPotsStore.getCreateSavingPotPage();
			
			it('should be equal to data', () => {
				expect(result).toEqual(false);
			});
			
		});
		 describe('Unit Test Case : 15 : SavingPotsStore : getCreateSavingPotPage', () => {
			let result;
			let data = false;
			
			callback(getClickedAccount(data));
			result = SavingsPotsStore.getCreateSavingPotPage();
			
			it('should be equal to data', () => {
				expect(result).toEqual(false);
			});
			
		});
		describe('Unit Test Case : 16 : SavingPotsStore : getCreateSavingPotPage', () => {
			let result;
			let data = false;
			
			callback(getPotDetail(data));
			result = SavingsPotsStore.getCreateSavingPotPage();
			
			it('should be equal to data', () => {
				expect(result).toEqual(false);
			});
			
		});
			
      	describe('Unit Test Case : 17 : SavingPotsStore : getPotConfirmationFlag', () => {
			let result;
			let data = false;
			
			callback(getPotConfirmation(data));
			result = SavingsPotsStore.getPotConfirmationFlag();
			
			it('should be equal to data', () => {
				expect(result).toEqual(true);
			});
			
		});
		
		describe('Unit Test Case : 18 : SavingPotsStore : getCreateSavingPotPages', () => {
			let result;
			let data = false;
			
			callback(getInterPotData(data));
			result = SavingsPotsStore.getCreateSavingPotPage();
			
			it('should be equal to data', () => {
				expect(result).toEqual(false);
			});
			
		});
		
		describe('Unit Test Case : 19 : SavingPotsStore : getCreateSavingPotPage', () => {
			let result;
			let data = false;
			
			callback(deletePotConnection(data));
			result = SavingsPotsStore.getCreateSavingPotPage();
			
			it('should be equal to data', () => {
				expect(result).toEqual(false);
			});
			
		});

		describe('Unit Test Case : 20 : SavingPotsStore : getCreateSavingPotPage', () => {
			let result;
			let data = false;
			
			callback(getPotsData(data));
			result = SavingsPotsStore.getCreateSavingPotPage();
			
			it('should be equal to data', () => {
				expect(result).toEqual(false);
			});
			
		});

    describe('Unit Test Case : 21 : SavingPotsStore : getCreateSavingPotPage', () => {
		let result;
        let data = {
          
        }
		describe('Unit Test Case : 22 : SavingPotsStore : getCreateSavingPotPagel', () => {			
            
			result = SavingsPotsStore.getCreateSavingPotPage();
			it('should make an API call', () => {				
                expect(result.value).toBe(data.value)
			});
		});
    });

    describe('Unit Test Case : 22 : SavingPotsStore : getCreateSavingPotPage', () => {
		let result;
        let data = {
          
        }
		describe('Unit Test Case : 22 : SavingPotsStore : createPotData ', () => {			
            
			result = SavingsPotsStore.createPotData();
			it('should make an API call', () => {				
                expect(result.value).toBe(data.value)
			});
		});
    });

	describe('Unit Test Case : 23 : SavingPotsStore : getAll', () => {
		let result;
		describe('Unit Test Case : 24 : SavingPotsStore Account List API Call', () => {
			//callback(getAccountsList());
			result = AccountsStore.getAll();
			it('should make an API call', () => {
				expect(AccountsApiUtils.getAccountsList.mock.calls.length).toBe(0);
			});
		});
		describe('Unit Test Case : 25 : SavingPotsStore : getAccountType', () => {
			let data = {
				accounts: 'loan'
			};
			
			let idList = [];
			let id= 1;
			result = AccountsStore.getAll();
			let accType = AccountsStore.getAccountType(data.accounts);
			let accountIdList = AccountsStore.getAccountIdList();
			// it('should be equal to data', () => {
			// 	expect(result).toEqual(data.accounts);
			// });
			
			// it('should have account id list', () => {
			// 	expect(accountIdList).toEqual(idList);
			// })
		});
	});
     describe('Unit Test Case : 26 : SavingPotsStore : getClickedAccount', () => {
		let result;
        let data = {
           
        }
		describe('Unit Test Case : 27 : SavingPotsStore : getClickedAccount', () => {			
			result = SavingsPotsStore.getClickedAccount();
		});
    });
   describe('Unit Test Case : 28 : SavingPotsStore : getReducePotPage', () => {
		let result;
        let data = {
           
        }
		describe('Unit Test Case : 29 : SavingPotsStore : getReducePotPage', () => {			
			result = SavingsPotsStore.getReducePotPage();
		});
    });
    describe('Unit Test Case : 30 : SavingPotsStore : getPotConfirmationFlag', () => {
		let result;
        let data = {
           
        }
		describe('Unit Test Case : 31 : SavingPotsStore : getPotConfirmationFlag', () => {			
			result = SavingsPotsStore.getPotConfirmationFlag();

		});
    });
     describe('Unit Test Case : 32 : SavingPotsStore  : getPotDetailsFlag', () => {
		let result;
        let data = {
           
        }
		describe('Unit Test Case : 33 : SavingPotsStore : getPotDetailsFlag', () => {			
			result = SavingsPotsStore.getPotDetailsFlag();
			    
		});
    });
    describe('Unit Test Case : 34 : SavingPotsStore : getPotDetailsData', () => {
		let result;
        let data = {
           
        }
		describe('Unit Test Case : 35 : SavingPotsStore : getPotDetailsData', () => {			
			result = SavingsPotsStore.getPotDetailsData();
			    
		});
    });
    describe('Unit Test Case : 36 : SavingPotsStore : getSelectedAccountID', () => {
		let result;
        let data = {
           
        }
		describe('Unit Test Case : 37 : SavingPotsStore : getSelectedAccountIDa', () => {			
			result = SavingsPotsStore.getSelectedAccountID();
			    
		});
    });
     describe('Unit Test Case : 38 : SavingPotsStore : getCreatedPotData', () => {
		let result;
        let data = {
           
        }
		describe('Unit Test Case : 39 : SavingPotsStore : getCreatedPotData', () => {			
			result = SavingsPotsStore.getCreatedPotData();
			    
		});
    });
    describe('Unit Test Case : 40 : SavingPotsStore : getAccountIndex', () => {
		let result;
        let data = {
           
        }
		describe('Unit Test Case : 41 : SavingPotsStore : getAccountIndex', () => {			
			result = SavingsPotsStore.getAccountIndex();
			    
		});
    });
    describe('Unit Test Case : 42 : SavingPotsStore : getPotData', () => {
		let result;
          let data = {
              
        }
		describe('Unit Test Case : 43 : SavingPotsStore : getPotData', () => {			
			result = SavingsPotsStore.getPotData();
           it('should make an API call', () => {				
                expect(data).toBe(data)
			});  
		});

		describe('Unit Test Case : 44 : SavingPotsStore : getPotData', () => {
			let result;
			let data = ['Hello'];
			
			callback(handlePotDataSuccess(data));
			result = SavingsPotsStore.getPotData();
			
			it('should be equal to data', () => {
				expect(result).toEqual([]);
			});
			
		});

		describe('Unit Test Case : 45 : SavingPotsStore : getPotData', () => {
			let result;
			let data = ['Hello'];
			
			callback(handlePotDataSuccess(data));
			result = SavingsPotsStore.checkpotFlag();
			
			it('should be equal to data', () => {
				expect(result).toEqual(true);
			});
			
		});

    });

    describe('Unit Test Case : 45 : SavingPotsStore : potError', () => {
			let result;
			let data = ['Hello'];
			
			callback(handlePotDataError(data));
			result = SavingsPotsStore.potError();
			
			it('should be equal to data', () => {
				expect(result).toEqual([ 'Hello' ]);
			});
			
		});

    describe('Unit Test Case : 46 : SavingPotsStore : interPotError', () => {
			let result;
			let data = ['Hello'];
			
			callback(interPotError(data));
			result = SavingsPotsStore.interPotError();
			
			it('should be equal to data', () => {
				expect(result).toEqual(data);
			});
			
		});

    describe('Unit Test Case : 47 : SavingPotsStore : errorModal', () => {
			let result;
			let data = ['Hello'];
			
			callback(errorModal(data));
			result = SavingsPotsStore.interPotError();
			
			it('should be equal to data', () => {
				expect(result).toEqual({});
			});
			
		});

     describe('Unit Test Case : 48 : SavingPotsStore : isError', () => {
			let result;
			let data = {"accounts": [
			    {
			      "id": "05985dae-d2de-4ebc-ab0a-79093081bde5",
			      "type": "loan",
			      "product": {
			        "code": "901",
			        "name": "Personal Loan",
			        "description": "Personal Loan"
			      },
			      "actions_available": {
			        "/account/pots": true
			      }
			    },
			    {
			      "id": "3420d6c1-fb60-4ac5-a226-0d741f498ad2",
			      "type": "mortgage",
			      "product": {
			        "code": "901",
			        "name": "2 year fixed rate",
			        "description": "2 year fixed rate mortgage"
			      },
			      "actions_available": {
			        "/account/pots": true
			      }
			    }
			  ]};
			callback(requestAccountsList(data));
			//result = SavingsPotsStore.isError();
			
			it('should be equal to data', () => {
				expect(SavingsPotsUtils.getAccountsList.mock.calls.length).toBe(4);
			});
			
		});

     describe('Unit Test Case : 49 : SavingPotsStore : unavailableCheck  ', () => {
			let result;
			let data = false;
			
			callback(requestAccountsList(data));
			result = SavingsPotsStore.unavailableCheck();
			
			it('should be equal to data', () => {
				expect(result).toEqual(false);
			});
			
		});

     describe('Unit Test Case : 50 : SavingPotsStore : isNetworkError  ', () => {
			let result;
			let data = false;
			
			callback(requestAccountsList(data));
			result = SavingsPotsStore.isNetworkError();
			
			it('should be equal to data', () => {
				expect(result).toEqual(false);
			});
			
		});

     describe('Unit Test Case : 51 : SavingPotsStore : requestPotAccountsListError  ', () => {
			let result;
			let data = false;
			
			callback(requestPotAccountsListError(data));
			result = SavingsPotsStore.isNetworkError();
			
			it('should be equal to data', () => {
				expect(result).toEqual(true);
			});
			
		});

     describe('Unit Test Case : 52 : SavingPotsStore : requestPotAccountsListError  ', () => {
			let result;
			let data = true;
			
			callback(requestPotAccountsListError(data));
			result = SavingsPotsStore.isNetworkError();
			
			it('should be equal to data', () => {
				expect(result).toEqual(false);
			});
			
		});
     
     describe('Unit Test Case : 53 : SavingPotsStore : potError', () => {
			let result;
			let data = false;
			
			callback(handlePotDataError(data));
			result = SavingsPotsStore.potError();
			
			it('should be equal to data', () => {
				expect(result).toEqual({});
			});
			
		});

     describe('Unit Test Case : 54 : SavingPotsStore : displayLoading', () => {
			let result;
			let data = {
				value: 'Success'
			};
			callback(displayLoading(data));
			result = SavingsPotsStore.displayLoading();
			it('should be equal to data', () => {
				expect(result).toEqual(false);
			});
			
		});
		
	describe('Unit Test Case : 55 : SavingPotsStore : editError', () => {
			let result;
			let data = {
				value: 'Success'
			};
			callback(editError(data));
			result = SavingsPotsStore.editError();
			it('should be equal to data', () => {
				expect(result).toEqual(data);
			});
			
		});

	describe('Unit Test Case : 56 : SavingPotsStore : handleSinglePotDataError', () => {
			let result;
			let data = false;

			callback(handleSinglePotDataError(data));
			result = SavingsPotsStore.isNetworkError();
			it('should be equal to data', () => {
				expect(result).toEqual(true);
			});
			
		});

	describe('Unit Test Case : 57 : SavingPotsStore : handleSinglePotDataError', () => {
			let result;
			let data = {
				value: 'Success'
			};
			callback(handleSinglePotDataError(data));
			result = SavingsPotsStore.isNetworkError();
			it('should be equal to data', () => {
				expect(result).toEqual(false);
			});
			
		});

	describe('Unit Test Case : 58 : SavingPotsStore : interPotError', () => {
			let result;
			let data = false;
			
			callback(interPotError(data));
			result = SavingsPotsStore.isNetworkError();
			
			it('should be equal to data', () => {
				expect(result).toEqual(true);
			});
			
		});

	describe('Unit Test Case : 59 : SavingPotsStore : errorModal', () => {
			let result;
			let data = false;
			
			callback(interPotError(data));
			callback(errorModal(data));
			result = SavingsPotsStore.isNetworkError();
			
			it('should be equal to data', () => {
				expect(SavingsPotsUtils.getAccountsList.mock.calls.length).toBe(4);
				expect(result).toEqual(false);
			});
			
		});

	describe('Unit Test Case : 60 : SavingPotsStore : interPotError', () => {
			let result;
			let data = false;
			
			callback(interPotError(data));
			result = SavingsPotsStore.editError();
			
			it('should be equal to data', () => {
				expect(result).toEqual({});
			});
			
		});

});

