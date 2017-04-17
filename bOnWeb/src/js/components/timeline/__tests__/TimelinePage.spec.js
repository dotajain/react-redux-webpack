'use strict';

jest.unmock('../TimelinePage');
jest.mock('../../common/AccountListComponent');
jest.mock('../TimelineTransactions');
jest.mock('../../../stores/AccountsStore');
jest.unmock('../../../../static/config');

const TimelinePage = require('../TimelinePage');
const React = require('react');
const ReactDOM = require('react-dom');
const Helmet = require('react-helmet');
const TestUtils = require('react-addons-test-utils');
const ScrollUp = require('react-scroll-up');
const HeaderComponent = require('../../common/HeaderComponent');
const NBAComponent = require('../../common/NBAComponent');
const Nav = require('react-bootstrap/lib/Nav');
const NavItem = require('react-bootstrap/lib/NavItem');
const Waypoint = require('react-waypoint');
const MobileOverlay = require('../../common/MobileOverlay');
const FinancialStoriesStore = require('../../../stores/FinancialStoriesStore');


const AccountsStore = require('../../../stores/AccountsStore');
const ErrorPopUpComponent = require('../../common/ErrorPopUpComponent');
const TransactionsStore = require('../../../stores/TransactionsStore');

const TimelineActionCreator = require('../../../actions/TimelineActionCreator');
const AccountsActionCreator = require('../../../actions/AccountsActionCreator');
const AccountOpeningActions = require('../../../actions/AccountOpeningActions');
const AccountListComponent = require('../../common/AccountListComponent');
const TimelineTransactions = require('../TimelineTransactions');
const BrowserUtils = require('../../../utils/BrowserUtils');

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<TimelinePage
		{...props}
		/>);
	return shallowRenderer.getRenderOutput();
};
describe('TimelineTransactionsTest Cases', () => {
	describe('TimelineTransactionsTest Cases', () => {
		let instance;
		let props;
		beforeEach(() => {
			props = {
				content: {
					mobileAccountText: 'Accounts',
					mobileTimelineText: 'Timeline',
					noTransactionFound: 'No transactions found.',
					accountsText: 'Your Accounts',
				},
				data: {
					isExistingBAppUser: true,
				},
			};

			instance = shallowRender(props);
		});

		it('should render the timeline page', () => {
			BrowserUtils.getScreenSize.mockReturnValue({ x: 10 });
			expect(instance).toEqualJSX( <div className="b container-fluid-full">
      <Helmet title="Timeline" />
      <HeaderComponent
        content={{accountsText: 'Your Accounts', mobileAccountText: 'Accounts', mobileTimelineText: 'Timeline', noTransactionFound: 'No transactions found.'}}
        data={{isExistingBAppUser: true}}
        openFaq={function noRefCheck() {}}
        selectedTab="you"
      />
      <div className="main-container null">
        <NBAComponent
          content={{accountsText: 'Your Accounts', mobileAccountText: 'Accounts', mobileTimelineText: 'Timeline', noTransactionFound: 'No transactions found.'}}
          data={{isExistingBAppUser: true}}
          nbaFlag={function noRefCheck() {}}
          onClick={undefined}
        />
        <div className="scroll-wrapper">
          <div className="row dashboard content-wrapper">
            <MobileOverlay
              content={{accountsText: 'Your Accounts', mobileAccountText: 'Accounts', mobileTimelineText: 'Timeline', noTransactionFound: 'No transactions found.'}}
              getHeaderClass={function noRefCheck() {}}
              openFaq={function noRefCheck() {}}
              selectedTab="timeline"
            />
            <div className="device-small">
              <Nav
                activeKey={undefined}
                bsClass="nav"
                justified={true}
                onSelect={function noRefCheck() {}}
                pullLeft={false}
                pullRight={false}
                stacked={false}
              >
                <NavItem
                  active={false}
                  disabled={false}
                  eventKey={1}
                  href="#account"
                >
                  Accounts
                </NavItem>
                <NavItem
                  active={false}
                  disabled={false}
                  eventKey={2}
                  title="#timeline"
                >
                  Timeline
                </NavItem>
              </Nav>
              <div className="tab-content">
                <div
                  className="tab-pane active col-lg-4 col-lg-offset-0 col-md-4 col-md-offset-0 col-sm-8 col-sm-offset-2 col-xs-12"
                  id="accounts"
                  role="tabpanel"
                >
                  <h4
                    className="title"
                    id="timeline"
                  >
                     Your Accounts
                  </h4>
                  <div className="loader-account" />
                </div>
                <div
                  className="tab-pane col-lg-8 col-lg-offset-0 col-md-8 col-md-offset-0 col-sm-12 col-sm-offset-0 col-xs-12 col-sm-offset-0"
                  id="timeline"
                  role="tabpanel"
                >
                  <h4 className="title" />
                  <div className="loader-timeline" />
                  <div className="thats-all" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
);
		});
	});

	describe('getAccountList', () => {
		let props;
		let component
		let accounts = {
			"accounts": [
				{
					"id": "05985dae-d2de-4ebc-ab0a-79093081bde5",
					"type": "loan",
					"product": {
						"code": "901",
						"name": "Personal Loan",
						"description": "Personal Loan"
					},
					"actions_available": {
						"/account/pots": false,
					},
					"bank_id": "CB",
					"number": "650000-22446699",
					"metadata": {
						"display_name": "Loan Account"
					}
				}]
		}
		beforeEach(() => {

			props = {
				content: {
					mobileAccountText: 'Accounts',
					mobileTimelineText: 'Timeline',
					noTransactionFound: 'No transactions found.',
				},
				data: {
					isExistingBAppUser: true,
				},
			};
			component = TestUtils.renderIntoDocument(
				<TimelinePage   {...props}	/>
			);
			component.setState({ accountsList: accounts, loadAccountsSuccess: true, transactionsList: [] });
			component.getAccountList();
		});



		it('should on store change event', () => {
			AccountsStore.getLoad.mockReturnValue(true);
			component.onStoreChange();
			expect(component.state.loadAccountsSuccess).toBe(true);
		});

		it('should render the account list', () => {
			expect(component.state.accountsList.accounts.length).toBe(1);
		});
		it('should render the getTransactionsList ', () => {

			let trans =
				[
					{
						"_source": {
							"id": "fd55e9c5-351e-4593-92f3-a5e7e40790d3",
							"ordinal": "1",
							"this_account": {
								"uuid": "3420d6c1-fb60-4ac5-a226-0d741f498ad2",
								"type": "mortgage",
								"product": {
									"code": "901",
									"name": "2 year fixed rate",
									"description": "2 year fixed rate mortgage"
								},
								"actions_available": {
									"/account/pots": false,
									"/account/alerts": false,
									"/account/projections": false,
									"/account/sweeps": false,
									"/account/sweeps/transfer/out": false,
									"/account/transactions/read": false,
									"/account/payments/transfer/in": false,
									"/account/payments/transfer/out": false,
									"/account/payments/uk/default/out": false,
									"/account/mandates/so/read": false,
									"/account/mandates/dd/read": false,
									"/account/mandates/so/write": false,
									"/account/mandates/dd/write": false
								},
								"bank_id": "CB",
								"sort_code": "650000",
								"number": "11223344",
								"metadata": {
									"display_name": "Mortgage"
								}
							},
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
							},
							"metadata": {
								"tags": [

								],
								"categories": [
									{
										"value": "Untagged",
										"path": "/untagged",
										"scheme": "NAG Categories",
										"id": 19,
										"archived": false
									}
								],
								"where": {
									"city": "Leafyville"
								}
							}
						}
					}]



			component.setState({ transactionsList: trans, loadTransactionsSuccess: true });
			component.getTransactionsList();
			expect(component.state.transactionsList.length).toBe(1);
		});
	});

	describe('componentWillUnmount', () => {
		let component;
		const props = {
			content: {
				mobileAccountText: 'Accounts',
				mobileTimelineText: 'Timeline',
				noTransactionFound: 'No transactions found.',
			},
			data: {
				isExistingBAppUser: true,
			},
		};
		it('calls for the removeChangeListener', () => {
			let node = document.createElement('div');
			const render = (comp, el) => ReactDOM.render(comp, el);
			component = ReactDOM.render(<TimelinePage {...props} />, node);
			React.unmountComponentAtNode(node);
			expect(AccountsStore.removeChangeListener.mock.calls.length).toBe(1);
		});
	});

	describe('getSelectedTypeTransactions', () => {
		let component;
		beforeEach(() => {
			let props = {
				content: {
					mobileAccountText: 'Accounts',
					mobileTimelineText: 'Timeline',
					noTransactionFound: 'No transactions found.',
				},
				data: {
					type: 'loan',
					isExistingBAppUser: true,
				}
			};

			component = TestUtils.renderIntoDocument(
				<TimelinePage {...props}/>
			);

		});
		it('calls for the getTransactionSearchData', () => {
			let node = document.createElement('div');
			component.getSelectedTypeTransactions();
			expect(component.getSelectedTypeTransactions).toBeDefined();
		});
	});
	describe('handleSelect', () => {
		let component;
		beforeEach(() => {
			let props = {
				content: {
					mobileAccountText: 'Accounts',
					mobileTimelineText: 'Timeline',
					noTransactionFound: 'No transactions found.',
				},
				selectedKey: 1,
				data: {
					isExistingBAppUser: true,
				},
			};

			component = TestUtils.renderIntoDocument(
				<TimelinePage {...props}/>
			);

		});
		it('calls for the getTransactionSearchData', () => {
			let node = document.createElement('div');
			component.handleSelect();
			expect(component.handleSelect).toBeDefined();
		});
	});
	describe('doTransactionSearch', () => {
		let component;
		beforeEach(() => {
			let props = {
				content: {
					mobileAccountText: 'Accounts',
					mobileTimelineText: 'Timeline',
					noTransactionFound: 'No transactions found.',
				},
				data: {
					isExistingBAppUser: true,
				},
			};
			component = TestUtils.renderIntoDocument(
				<TimelinePage {...props}/>
			);
			component.setState({ searchText: 'annualloan' });

		});
		it('calls for the getTransactionSearchData', () => {
			let node = document.createElement('div');
			component.doTransactionSearch("a");
			expect(component.state.transactionSearchSuggestion.length).toBe(0);
		});

		it('calls for the doTransactionSearch', () => {
			let node = document.createElement('div');
			component.doTransactionSearch('sadf');

		});
	});
	describe('doTransactionSearch else path', () => {
		let component;
		beforeEach(() => {
			let props = {
				content: {
					mobileAccountText: 'Accounts',
					mobileTimelineText: 'Timeline',
					noTransactionFound: 'No transactions found.',
				},
				data: {
					isExistingBAppUser: true,
				},
			};
			component = TestUtils.renderIntoDocument(
				<TimelinePage {...props}/>
			);
			component.setState({ searchText: 'annualloan' });

		});
		it('calls for the getTransactionSearchData', () => {
			let node = document.createElement('div');
			component.doTransactionSearch("a");
			expect(component.state.transactionSearchSuggestion.length).toBe(0);
		});
		it('calls for the doTransactionSearch', () => {
			let node = document.createElement('div');
			component.doTransactionSearch('annualloan');

		});
	});
	describe('closeBtnClick', () => {
		let component;
		beforeEach(() => {

			let props = {
				content: {
					mobileAccountText: 'Accounts',
					mobileTimelineText: 'Timeline',
					noTransactionFound: 'No transactions found.',
				},
				isPopupOpen: false,
				data: {
					isExistingBAppUser: true,
				},
			};
			component = TestUtils.renderIntoDocument(
				<TimelinePage {...props}/>
			);

		});
		it('calls for the getTransactionSearchData', () => {
			let node = document.createElement('div');
			component.closeBtnClick();
			expect(component.closeBtnClick).toBeDefined();
		});
		it('calls for the getTransactionSearchData', () => {
			let node = document.createElement('div');
			component.cancelTransactionSearch();
			expect(component.cancelTransactionSearch).toBeDefined();
		});

	});
	describe('cancelTransactionSearch1', () => {
		const props = {
			content: {
				mobileAccountText: 'Accounts',
				mobileTimelineText: 'Timeline',
				noTransactionFound: 'No transactions found.',
			},
			isPopupOpen: true,
			data: {
				isExistingBAppUser: true,
			},
		};
		let node = document.createElement('div');
		const render = (comp, el) => ReactDOM.render(comp, el);
		let instance = ReactDOM.render(<TimelinePage {...props} />, node);

		it('calls for the resetSearchInfo', () => {


			instance.setState({ isPopupOpen: true })
			instance.closeBtnClick();
			expect(TimelineActionCreator.resetSearchInfo.mock.calls.length).toBe(3);
		});
		it('calls for the resetSearchInfo', () => {
			instance.setState({ isPopupOpen: true })
			instance.cancelTransactionSearch();
			expect(TimelineActionCreator.resetSearchInfo.mock.calls.length).toBe(4);
		});
	});

	describe('onStoreChange', () => {
		let node = document.createElement('div');
		let onStoreChange = jest.genMockFn();
		const render = (comp, el) => ReactDOM.render(comp, el);
		const props = {
			isPopupOpen: true,
			content: {
				mobileAccountText: 'Accounts',
				mobileTimelineText: 'Timeline',
				noTransactionFound: 'No transactions found.',
			},
			data: {
				isExistingBAppUser: true,
			},
		};
		let instance = ReactDOM.render(<TimelinePage {...props} />, node);
		it('calls for the resetSearchInfo', () => {
			instance.onStoreChange();

		});

	});

	describe('loadTransactions', () => {
		let node = document.createElement('div');
		let loadTransactions = jest.genMockFn();
		TimelineActionCreator.getTransactionsList.mockClear();
		TimelineActionCreator.getTransactionSearchData.mockClear();
		const render = (comp, el) => ReactDOM.render(comp, el);
		const props = {
			content: {
				mobileAccountText: 'Accounts',
				mobileTimelineText: 'Timeline',
				noTransactionFound: 'No transactions found.',
			},
			loadTransactions: false,
			loadSearchTransactions: false,
			data: {
				isExistingBAppUser: true,
			},
		};
		let instance = ReactDOM.render(<TimelinePage {...props} />, node);
		it('calls for the loadTransactions', () => {
			instance.loadTransactions();

		});

		instance.setState({ loadTransactions: true });
		it('should make call to transaction list action', () => {
			expect(TimelineActionCreator.getTransactionsList.mock.calls.length).toBe(2);
		});
		instance.setState({ loadSearchTransactions: true })
		it('should make call to transaction list action', () => {
			expect(TimelineActionCreator.getTransactionSearchData.mock.calls.length).toBe(2);
		});
	});
	describe('loadTransactions esle path', () => {
		let node = document.createElement('div');
		let loadTransactions = jest.genMockFn();
		TimelineActionCreator.getTransactionsList.mockClear();
		TimelineActionCreator.getTransactionSearchData.mockClear();
		const render = (comp, el) => ReactDOM.render(comp, el);
		const props = {
			content: {
				mobileAccountText: 'Accounts',
				mobileTimelineText: 'Timeline',
				noTransactionFound: 'No transactions found.',
			},
			loadTransactions: false,
			loadSearchTransactions: false,
			data: {
				isExistingBAppUser: true,
			},
		};
		let instance = ReactDOM.render(<TimelinePage {...props} />, node);
		it('calls for the loadTransactions', () => {
			instance.loadTransactions();

		});

		instance.setState({ loadTransactions: false });
		it('should make call to transaction list action', () => {
			expect(TimelineActionCreator.getTransactionsList.mock.calls.length).toBe(2);
		});
		instance.setState({ loadSearchTransactions: false })
		it('should make call to transaction list action', () => {
			expect(TimelineActionCreator.getTransactionSearchData.mock.calls.length).toBe(2);
		});
	});
	describe('nbaFlag for scroll class update', () => {
		let node = document.createElement('div');
		let nbaFlag = jest.genMockFn();
		const render = (comp, el) => ReactDOM.render(comp, el);
		const props = {
			content: {
				mobileAccountText: 'Accounts',
				mobileTimelineText: 'Timeline',
				noTransactionFound: 'No transactions found.',
			},
			loadTransactions: false,
			loadSearchTransactions: false,
			data: {
				isExistingBAppUser: true,
			},
		};
		let instance = ReactDOM.render(<TimelinePage {...props} />, node);
		it('calls for the nbaFlag', () => {
			instance.nbaFlag('header');

		})
		it('calls for the nbaFlag', () => {
			instance.nbaFlag('more');

		})
		it('calls for the nbaFlag', () => {
			instance.nbaFlag('close');

		})
		it('calls for the nbaFlag', () => {
			instance.nbaFlag('less');

		})
		it('calls for the nbaFlag', () => {
			instance.nbaFlag('');

		})
	})
	describe('end of Transactions', () => {
		let node = document.createElement('div');
		let endOfTransactions = jest.genMockFn();
		const render = (comp, el) => ReactDOM.render(comp, el);
		const props = {
			content: {
				mobileAccountText: 'Accounts',
				mobileTimelineText: 'Timeline',
				noTransactionFound: 'No transactions found.',
				NoSearchResult: 'No Result',
			},
			loadTransactions: false,
			loadSearchTransactions: false,
			data: {
				isExistingBAppUser: true,
			},
		};
		let instance = ReactDOM.render(<TimelinePage {...props} />, node);
		instance.setState({ loadTransactions: false });
		instance.setState({ loadTransactionsSuccess: true, transactionsList: [1, 2, 3, 4, 5] });
		it('calls endOfTransactions', () => {
			instance.endOfTransactions();
		})
	});
	describe('end of Transactions else path', () => {
		let node = document.createElement('div');
		let endOfTransactions = jest.genMockFn();
		const render = (comp, el) => ReactDOM.render(comp, el);
		const props = {
			content: {
				mobileAccountText: 'Accounts',
				mobileTimelineText: 'Timeline',
				noTransactionFound: 'No transactions found.',
				NoSearchResult: 'No Result',
			},
			loadTransactions: false,
			loadSearchTransactions: false,
			data: {
				isExistingBAppUser: true,
			},
		};
		let instance = ReactDOM.render(<TimelinePage {...props} />, node);
		instance.setState({ loadTransactions: true, loadSearchTransactions: true });
		instance.setState({ loadTransactionsSuccess: true, transactionsList: [1, 2, 3, 4, 5] });
		it('calls endOfTransactions', () => {
			instance.endOfTransactions();
		})
	});
	describe('fromHandleChange', () => {
		let node = document.createElement('div');
		let fromHandleChange = jest.genMockFn();
		const render = (comp, el) => ReactDOM.render(comp, el);
		const props = {
			content: {
				mobileAccountText: 'Accounts',
				mobileTimelineText: 'Timeline',
				noTransactionFound: 'No transactions found.',
			},
			loadTransactions: false,
			loadSearchTransactions: false,
			data: {
				isExistingBAppUser: true,
			},
		};
		let instance = ReactDOM.render(<TimelinePage {...props} />, node);
		let index = {
			currentTarget: {
				id: '123',
			}
		};
		it('calls fromHandleChange', () => {
			instance.fromHandleChange(index);
			expect(FinancialStoriesStore.setAccountId.mock.calls.length).toBe(1);
		})
	})
	describe('closed', () => {
		let node = document.createElement('div');
		let fromHandleChange = jest.genMockFn();
		const render = (comp, el) => ReactDOM.render(comp, el);
		const props = {
			content: {
				mobileAccountText: 'Accounts',
				mobileTimelineText: 'Timeline',
				noTransactionFound: 'No transactions found.',
			},
			loadTransactions: false,
			loadSearchTransactions: false,
			data: {
				isExistingBAppUser: false,
			},
		};
		let instance = ReactDOM.render(<TimelinePage {...props} />, node);
		it('calls AccountOpeningActions.updateform', () => {
			instance.closed();
			expect(AccountOpeningActions.updateFormValue.mock.calls.length).toBe(1);
		})
	})
	describe('onResize', () => {
		let node = document.createElement('div');
		let fromHandleChange = jest.genMockFn();
		const render = (comp, el) => ReactDOM.render(comp, el);
		const props = {
			content: {
				mobileAccountText: 'Accounts',
				mobileTimelineText: 'Timeline',
				noTransactionFound: 'No transactions found.',
			},
			loadTransactions: false,
			loadSearchTransactions: false,
			data: {
				isExistingBAppUser: false,
			},
		};
		let instance = ReactDOM.render(<TimelinePage {...props} />, node);
		it('calls onResize', () => {
			instance.onResize();
		})
	});
	describe('openFaq', () => {
		let node = document.createElement('div');
		let fromHandleChange = jest.genMockFn();
		const render = (comp, el) => ReactDOM.render(comp, el);
		const props = {
			content: {
				mobileAccountText: 'Accounts',
				mobileTimelineText: 'Timeline',
				noTransactionFound: 'No transactions found.',
			},
			loadTransactions: false,
			loadSearchTransactions: false,
			data: {
				isExistingBAppUser: false,
			},
		};
		let instance = ReactDOM.render(<TimelinePage {...props} />, node);
		it('calls openFaq', () => {
			instance.openFaq();
		})
	})
	describe('closeFaq', () => {
		let node = document.createElement('div');
		let fromHandleChange = jest.genMockFn();
		const render = (comp, el) => ReactDOM.render(comp, el);
		const props = {
			content: {
				mobileAccountText: 'Accounts',
				mobileTimelineText: 'Timeline',
				noTransactionFound: 'No transactions found.',
			},
			loadTransactions: false,
			loadSearchTransactions: false,
			data: {
				isExistingBAppUser: false,
			},
		};
		let instance = ReactDOM.render(<TimelinePage {...props} />, node);
		it('calls closeFaq', () => {
			instance.setState({ termsAndConditionFlag: true })
			instance.closeFaq();
		})
	})
	describe('closeErrorPopup', () => {
		let node = document.createElement('div');
		let fromHandleChange = jest.genMockFn();
		const render = (comp, el) => ReactDOM.render(comp, el);
		const props = {
			content: {
				mobileAccountText: 'Accounts',
				mobileTimelineText: 'Timeline',
				noTransactionFound: 'No transactions found.',
			},
			loadTransactions: false,
			loadSearchTransactions: false,
			data: {
				isExistingBAppUser: false,
			},
		};
		let instance = ReactDOM.render(<TimelinePage {...props} />, node);
		it('calls closeErrorPopup', () => {
			instance.setState({ termsAndConditionFlag: true })
			instance.closeErrorPopup();
			expect(AccountsActionCreator.resetErrorFlag.mock.calls.length).toBe(1);
		})
	})
	describe('errorPopUp', () => {
		let node = document.createElement('div');
		let fromHandleChange = jest.genMockFn();
		const render = (comp, el) => ReactDOM.render(comp, el);
		const props = {
			content: {
				mobileAccountText: 'Accounts',
				mobileTimelineText: 'Timeline',
				noTransactionFound: 'No transactions found.',
			},
			loadTransactions: false,
			loadSearchTransactions: false,
			data: {
				isExistingBAppUser: false,
			},
		};
		let instance = ReactDOM.render(<TimelinePage {...props} />, node);
		it('calls errorPopUp', () => {
			const result = instance.errorPopUp();
			expect(result).toEqualJSX(<ErrorPopUpComponent closeErrorPopup={function noRefCheck() { } } content={{ mobileAccountText: 'Accounts', mobileTimelineText: 'Timeline', noTransactionFound: 'No transactions found.' }} error={{ message: 'Something went wrong', quoteId: '' }} />);
		});
	})

	describe('getHeaderClass', () => {
		let node = document.createElement('div');
		let e = 'e';
		const render = (comp, el) => ReactDOM.render(comp, el);
		const props = {
			content: {
				mobileAccountText: 'Accounts',
				mobileTimelineText: 'Timeline',
				noTransactionFound: 'No transactions found.',
			},
			loadTransactions: false,
			loadSearchTransactions: false,
			data: {
				isExistingBAppUser: false,
			},
		};
		let instance = ReactDOM.render(<TimelinePage {...props} />, node);
		it('calls getHeaderClass', () => {
			instance.getHeaderClass(e);
			expect(instance.state.headerClass).toEqual(e);
		});
	})
});
