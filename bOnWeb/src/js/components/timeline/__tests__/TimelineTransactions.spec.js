'use strict';

jest.unmock('../TimelineTransactions');
jest.unmock('../../../utils/DateUtils');
jest.unmock('../../../utils/NumberUtils');
jest.unmock('../../../utils/RegexUtils');
jest.unmock('../../../stores/TransactionsStore');
const TimelineTransactions = require('../TimelineTransactions');
const Waypoint = require('react-waypoint');
const AccountsStore = require('../../../stores/AccountsStore');
const React = require('react');
const RegexUtils = require('../../../utils/RegexUtils');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const search = [];
const text = '';
const content = {

}
const shallowRender = props => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<TimelineTransactions data={props} searchText ={text} searchSuggestedData={search} getSelectedTypeTransactions ={() => { } } endOfTransactions = {() => { } }/>);
  return shallowRenderer.getRenderOutput();
};
describe('TimelineTransactions', () => {
  describe('Single Transaction', () => {
    let props =
      [
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
                "small": "Interest",
                "medium": "Interest",
                "large": "Interest"
              }
            },
            "metadata": {
              "tags": [

              ],
              "categories": [
                {
                  "value": "Eating Out",
                  "path": "/untagged",
                  "scheme": "NAG Categories",
                  "id": 19,
                  "archived": false
                }
              ],
              "where": {
                "city": "Leafyville"
              }
            },
            "this_account": {
              "type": "mortgage"
            }
          }
        }
      ]
    const component = shallowRender(props);
    it('should display single transactions on the given date', () => {
      expect(component).toEqualJSX(
        <div>
          <form
            action="."
            className="autofillSearch"
            >
            <input
              ref="searchInput"
              className=""
              id="timelineSearch"
              onChange={function noRefCheck() { } }
              onFocus={function noRefCheck() { } }
              onKeyPress={function noRefCheck() { } }
              pattern={RegexUtils.regexes.timelineSearchData} placeholder="Search" type= "search"/>
            <a className="searchClear" />
            <a
              className="search-cancel opt-green"
              onClick={function noRefCheck() { } }
              >
              Cancel
            </a>
          </form>
          <div className="timeline timeline-single-column">
            <div className="transactions">
              <span className="timeline-label">
                28 May 16
              </span>
              <div className="timeline-item ">
                <div className="timeline-point timeline-point-default" />
                <div className="timeline-event">
                  <div className="transactionInfo">
                    <h4>
                      Interest
                    </h4>
                    <p>
                      <span>
                        <span className="icon icon-tag" />
                        <span>
                          Eating Out
                        </span>
                      </span>
                    </p>
                  </div>
                  <div className="transactionFigure">
                    <h3>
                      -£215.98
                    </h3>
                    Fee
                  </div>
                </div>
              </div>
              <div className="timeline-item account-">
                <div />
              </div>
            </div>
          </div>
          <div>
            <Waypoint
              bottomOffset="0px"
              fireOnRapidScroll={true}
              onEnter={function noRefCheck() { } }
              onLeave={function noRefCheck() { } }
              onPositionChange={function noRefCheck() { } }
              throttleHandler={function noRefCheck() { } }
              topOffset="0px"
              />
          </div>
        </div>
      );
    });
  })
  describe('Multiple transactions on a single date', () => {
    const props = [
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
              "small": "Interest",
              "medium": "Interest",
              "large": "Interest"
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
          },
          "this_account": {
            "type": "mortgage"
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
              "small": "Interest",
              "medium": "Interest",
              "large": "Interest"
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
          },
          "this_account": {
            "type": "mortgage"
          }
        }
      }
    ];
    AccountsStore.getAccountType.mockReturnValue({ accntClass: 'account 1' });
    const component = shallowRender(props);
    it('should display multiple transactions on single date', () => {
      expect(component).toEqualJSX( <div>
      <form
        action="."
        className="autofillSearch"
      >
        <input
          ref="searchInput"
          className=""
          id="timelineSearch"
          onChange={function noRefCheck() {}}
          onFocus={function noRefCheck() {}}
          onKeyPress={function noRefCheck() {}}
          pattern={RegexUtils.regexes.timelineSearchData}
          placeholder="Search"
          type="search"
        />
        <a className="searchClear" />
        <a
          className="search-cancel opt-green"
          onClick={function noRefCheck() {}}
        >
          Cancel
        </a>
      </form>
      <div className="timeline timeline-single-column">
        <div className="transactions">
          <span className="timeline-label">
            28 May 16
          </span>
          <div className="timeline-item account 1">
            <div className="timeline-point timeline-point-default" />
            <div className="timeline-event">
              <div className="transactionInfo">
                <h4>
                  Interest
                </h4>
                <p />
              </div>
              <div className="transactionFigure">
                <h3>
                  -£215.98
                </h3>
                Fee
              </div>
            </div>
          </div>
          <div className="timeline-item account-">
            <div />
          </div>
        </div>
        <div className="transactions">
          <span className="timeline-label" />
          <div className="timeline-item account 1">
            <div className="timeline-point timeline-point-blank" />
            <div className="timeline-event">
              <div className="transactionInfo">
                <h4>
                  Interest
                </h4>
                <p />
              </div>
              <div className="transactionFigure">
                <h3>
                  -£215.98
                </h3>
                Fee
              </div>
            </div>
          </div>
          <div className="timeline-item account-">
            <div />
          </div>
        </div>
      </div>
      <div>
        <Waypoint
          bottomOffset="0px"
          fireOnRapidScroll={true}
          onEnter={function noRefCheck() {}}
          onLeave={function noRefCheck() {}}
          onPositionChange={function noRefCheck() {}}
          throttleHandler={function noRefCheck() {}}
          topOffset="0px"
        />
      </div>
    </div>
);
    })
  })
  describe('Single Transaction as per given Dates', () => {
    const props = [
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
              "small": "Interest",
              "medium": "Interest",
              "large": "Interest"
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
          },
          "this_account": {
            "type": "mortgage"
          }
        }
      },
      {
        "_source": {
          "details": {
            "type": "Fee",
            "posted": true,
            "when": "2016-05-25T13:00:00.000+01:00",
            "amount": {
              "value": -215.98,
              "currency": "GBP"
            },
            "narrative": {
              "small": "Interest",
              "medium": "Interest",
              "large": "Interest"
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
          },
          "this_account": {
            "type": "mortgage"
          }
        }
      }];
    const component = shallowRender(props);
    it('should show single transactions for different dates', () => {
      expect(component).toEqualJSX(<div>
        <form action="." className="autofillSearch">
          <input
            ref="searchInput"
            className=""
            id="timelineSearch"
            onFocus={function noRefCheck() { } }
            onChange={function noRefCheck() { } }
            onKeyPress={function noRefCheck() { } }
            pattern={RegexUtils.regexes.timelineSearchData}
            placeholder="Search"
            type="search"
            />
          <a className="searchClear" />
          <a
            className="search-cancel opt-green"
            onClick={function noRefCheck() { } }
            >
            Cancel
          </a>
        </form>
        <div className="timeline timeline-single-column">
          <div className="transactions">
            <span className="timeline-label">
              28 May 16
            </span>
            <div className="timeline-item account 1">
              <div className="timeline-point timeline-point-default" />
              <div className="timeline-event">
                <div className="transactionInfo">
                  <h4>
                    Interest
                  </h4>
                  <p />
                </div>
                <div className="transactionFigure">
                  <h3>
                    -£215.98
                  </h3>
                  Fee
                </div>
              </div>
            </div>
            <div className="timeline-item account-">
              <div />
            </div>
          </div>
          <div className="transactions">
            <span className="timeline-label">
              25 May 16
            </span>
            <div className="timeline-item account 1">
              <div className="timeline-point timeline-point-default" />
              <div className="timeline-event">
                <div className="transactionInfo">
                  <h4>
                    Interest
                  </h4>
                  <p />
                </div>
                <div className="transactionFigure">
                  <h3>
                    -£215.98
                  </h3>
                  Fee
                </div>
              </div>
            </div>
            <div className="timeline-item account-">
              <div />
            </div>
          </div>
        </div>
        <div>
          <Waypoint onEnter = {() => { } }/>
        </div>
      </div>
      );
    })
  })
  describe('Multiple Dates Multiple Tranasactions Per Date', () => {
    const props = [
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
              "small": "Interest",
              "medium": "Interest",
              "large": "Interest"
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
          },
          "this_account": {
            "type": "mortgage"
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
              "small": "Interest",
              "medium": "Interest",
              "large": "Interest"
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
          },
          "this_account": {
            "type": "mortgage"
          }
        }
      }, {
        "_source": {
          "details": {
            "type": "Fee",
            "posted": true,
            "when": "2016-05-25T13:00:00.000+01:00",
            "amount": {
              "value": -215.98,
              "currency": "GBP"
            },
            "narrative": {
              "small": "Interest",
              "medium": "Interest",
              "large": "Interest"
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
          },
          "this_account": {
            "type": "mortgage"
          }
        }
      }, {
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
              "small": "Interest",
              "medium": "Interest",
              "large": "Interest"
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
          },
          "this_account": {
            "type": "mortgage"
          }
        }
      }];
    const component = shallowRender(props);
    it('should display Multiple Transactions for multiple dates', () => {
      expect(component).toEqualJSX(<div>
        <form action="." className="autofillSearch">
          <input
            ref="searchInput"
            className=""
            id="timelineSearch"
            onFocus={function noRefCheck() { } }
            onChange={function noRefCheck() { } }
            onKeyPress={function noRefCheck() { } }
            pattern={RegexUtils.regexes.timelineSearchData}
            placeholder="Search"
            type="search"
            />
          <a className="searchClear" />
          <a
            className="search-cancel opt-green"
            onClick={function noRefCheck() { } }
            >
            Cancel
          </a>
        </form>
        <div className="timeline timeline-single-column">
          <div className="transactions">
            <span className="timeline-label">
              28 May 16
            </span>
            <div className="timeline-item account 1">
              <div className="timeline-point timeline-point-default" />
              <div className="timeline-event">
                <div className="transactionInfo">
                  <h4>
                    Interest
                  </h4>
                  <p />
                </div>
                <div className="transactionFigure">
                  <h3>
                    -£215.98
                  </h3>
                  Fee
                </div>
              </div>
            </div>
            <div className="timeline-item account-">
              <div />
            </div>
          </div>
          <div className="transactions">
            <span className="timeline-label" />
            <div className="timeline-item account 1">
              <div className="timeline-point timeline-point-blank" />
              <div className="timeline-event">
                <div className="transactionInfo">
                  <h4>
                    Interest
                  </h4>
                  <p />
                </div>
                <div className="transactionFigure">
                  <h3>
                    -£215.98
                  </h3>
                  Fee
                </div>
              </div>
            </div>
            <div className="timeline-item account-">
              <div />
            </div>
          </div>
          <div className="transactions">
            <span className="timeline-label">
              25 May 16
            </span>
            <div className="timeline-item account 1">
              <div className="timeline-point timeline-point-default" />
              <div className="timeline-event">
                <div className="transactionInfo">
                  <h4>
                    Interest
                  </h4>
                  <p />
                </div>
                <div className="transactionFigure">
                  <h3>
                    -£215.98
                  </h3>
                  Fee
                </div>
              </div>
            </div>
            <div className="timeline-item account-">
              <div />
            </div>
          </div>
          <div className="transactions">
            <span className="timeline-label" />
            <div className="timeline-item account 1">
              <div className="timeline-point timeline-point-blank" />
              <div className="timeline-event">
                <div className="transactionInfo">
                  <h4>
                    Interest
                  </h4>
                  <p />
                </div>
                <div className="transactionFigure">
                  <h3>
                    -£215.98
                  </h3>
                  Fee
                </div>
              </div>
            </div>
            <div className="timeline-item account-">
              <div />
            </div>
          </div>
        </div>
        <div>
          <Waypoint onEnter = {() => { } }/>
        </div>
      </div>
      )
    })
  });
  describe('componentDidMount', () => {
    let instance;
    let props = {
      endOfTransactions: () => { },
      searchText: '',
      data: [
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
                "small": "Interest",
                "medium": "Interest",
                "large": "Interest"
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
            },
            "this_account": {
              "type": "mortgage"
            }
          }
        }],
      isSearching: true
    };
    it('should call the didmount function', () => {
      let node = document.createElement('div');
      instance = ReactDOM.render(<TimelineTransactions {...props} />, node);
      instance.componentDidMount();
    });
  });

  describe('timelineBody', () => {
    let props = {
      content: {
        noTransactionFound: 'No transactions found',
      },
      endOfTransactions: () => { },
      searchText: 'mortgage',
      data: [],
    };

    it('should call the timelineBody function', () => {
      let node = document.createElement('div');
      const render = (comp, el) => ReactDOM.render(comp, el);
      let instance = ReactDOM.render(<TimelineTransactions {...props} />, node);
      instance.timelineBody();
    });
  });

  describe('getSearchData', () => {
    let component;
    let props;
    beforeEach(() => {


      props = {
        content: {
          noTransactionFound: 'No transactions found',
        },
        endOfTransactions: () => { },
        searchText: 'mortgage',
        data: [
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
                  "small": "Interest",
                  "medium": "Interest",
                  "large": "Interest"
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
              },
              "this_account": {
                "type": "mortgage"
              }
            }
          }],
        getSelectedTypeTransactions: jest.fn()
      };

    });

    it('should call the getSearchData', () => {
      let node = document.createElement('div');
      component = ReactDOM.render(<TimelineTransactions {...props} />, node);

      //component = TestUtils.renderIntoDocument( <TimelineTransactions {...props} />);      
      component.getSearchData();
      expect(component.props.getSelectedTypeTransactions.mock.calls.length).toBe(1);

    });
  });

  describe('doTransactionSearch', () => {
    let instance;
    let props = {
      content: {
        noTransactionFound: 'No transactions found',
      },
      endOfTransactions: () => { },
      searchText: 'mortgage',
      data: [
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
                "small": "Interest",
                "medium": "Interest",
                "large": "Interest"
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
            },
            "this_account": {
              "type": "mortgage"
            }
          }
        }],
      doTransactionSearch: jest.fn()
    };
    it('should call do Transaction Search function', () => {
      let node = document.createElement('div');
      instance = ReactDOM.render(<TimelineTransactions {...props} />, node);
      instance.doTransactionSearch();
      //instance.props.cancelTransactionSearch();
      expect(instance.props.doTransactionSearch.mock.calls.length).toBe(1);
    });
  });
  describe('cancelTransactionSearch', () => {
    let instance;
    let props = {
      content: {
        noTransactionFound: 'No transactions found',
      },
      endOfTransactions: () => { },
      searchText: 'mortgage',
      data: "",
      cancelTransactionSearch: jest.fn(),
      isSearching: false
    };
    it('should call cancel Transaction Search function', () => {
      let node = document.createElement('div');
      instance = ReactDOM.render(<TimelineTransactions {...props} />, node);
      instance.cancelTransactionSearch();
      //instance.props.doTransactionSearch();
      expect(instance.props.cancelTransactionSearch.mock.calls.length).toBe(1);
    });
  });
  describe('moveCaretAtEnd', () => {
    let instance;
    let onFocus = jest.fn();
    let props = {
      content: {
        noTransactionFound: 'No transactions found',
      },
      endOfTransactions: () => { },
      searchText: 'mortgage',
      data: "",
      event: 1,
      cancelTransactionSearch: jest.fn(),
      isSearching: true
    };
    it('should call moveCaretAtEnd function', () => {
      let node = document.createElement('div');
      instance = ReactDOM.render(<TimelineTransactions {...props} />, node);
      let inut = TestUtils.findRenderedDOMComponentWithTag(instance, 'input');
      inut.preventDefault = jest.fn()
      TestUtils.Simulate.focus(inut.getDOMNode(), { target: { value: "new value" } });

    });
  });
  describe('handleKeyPress', () => {
    let instance;
    let props = {
      content: {
        noTransactionFound: 'No transactions found',
      },
      endOfTransactions: () => { },
      searchText: 'mortgage',
      data: "",
      event: 1,
      isSearching: true,
      searchData: 'annual',
      getSelectedTypeTransactions: jest.fn()
    };
    it('should call handleKeyPress function', () => {

      let node = document.createElement('div');
      instance = ReactDOM.render(<TimelineTransactions {...props} />, node);
      let inut = TestUtils.findRenderedDOMComponentWithTag(instance, 'input');
      inut.key = "Enter";
      inut.preventDefault = jest.fn()
      instance.handleKeyPress(inut);
      //instance.handleKeyPress(inut);
      TestUtils.Simulate.keyPress(inut.getDOMNode());

      expect(instance.props.getSelectedTypeTransactions.mock.calls.length).toBe(1);
    });
  });

  describe('searchSuggestedPopup', () => {
    let instance;
    let props = {
      content: {
        noTransactionFound: 'No transactions found',
      },
      endOfTransactions: () => { },
      searchText: 'mortgage',
      data: "",
      event: 1,
      isSearching: true,
      searchData: 'annual',
      getSelectedTypeTransactions: jest.fn(),
      searchSuggestedData: [
        {
          "length": 4,
          "offset": 0,
          "options": [
            {
              "score": 0.239,
              "text": "Mortgage"
            },
            {
              "score": 0.139,
              "text": "Mortgage Payment"
            },
            {
              "score": 0.239,
              "text": "Mortgage Interest Payment"
            },
            {
              "score": 0.139,
              "text": "Monthly Savings"
            }
          ],
          "text": "fred"
        }
      ]

    };
    it('should call searchSuggestedData function', () => {

      let node = document.createElement('div');
      instance = ReactDOM.render(<TimelineTransactions {...props} />, node);
      instance.searchSuggestedPopup();
      expect(instance.props.searchSuggestedData.length).toBe(1);
    });

    it('should call searchSuggestedData function with blank array', () => {
      let props = {
        content: {
          noTransactionFound: 'No transactions found',
        },
        endOfTransactions: () => { },
        searchText: 'mortgage',
        data: "",
        event: 1,
        isSearching: true,
        searchData: 'annual',
        getSelectedTypeTransactions: jest.fn(),
        searchSuggestedData: [],
      }
      let node = document.createElement('div');
      instance = ReactDOM.render(<TimelineTransactions {...props} />, node);
      let result = instance.searchSuggestedPopup();
      expect(result).toBe(false);
    });

    it('should call searchSuggestedData when pop up is true', () => {
      let props = {
        content: {
          noTransactionFound: 'No transactions found',
        },
        endOfTransactions: () => { },
        searchText: 'mortgage',
        data: "",
        event: 1,
        isSearching: true,
        searchData: 'annual',
        getSelectedTypeTransactions: jest.fn(),
        isPopupOpen: true,
        searchSuggestedData: [],
      }
      let node = document.createElement('div');
      instance = ReactDOM.render(<TimelineTransactions {...props} />, node);
      let result = instance.searchSuggestedPopup();
      expect(result).toBe(false);
    });
    it('should call getSelectedTypeTransactions when pop up is true', () => {
      let props = {
        content: {
          noTransactionFound: 'No transactions found',
        },
        endOfTransactions: () => { },
        searchText: 'mortgage',
        data: "",
        event: 1,
        isSearching: true,
        searchData: 'annual',
        getSelectedTypeTransactions: jest.fn(),
        isPopupOpen: true,
        searchSuggestedData: [],
      }
      let node = document.createElement('div');
      instance = ReactDOM.render(<TimelineTransactions {...props} />, node);
      instance.getSelectedTypeTransactions('abc');
      expect(props.getSelectedTypeTransactions).toBeCalled();
    });
    it('should call closeBtnClick when pop up is true', () => {
      let props = {
        content: {
          noTransactionFound: 'No transactions found',
        },
        endOfTransactions: () => { },
        searchText: 'mortgage',
        data: "",
        event: 1,
        isSearching: true,
        searchData: 'annual',
        getSelectedTypeTransactions: jest.fn(),
        closeBtnClick: jest.fn(),
        isPopupOpen: true,
        searchSuggestedData: [],
      }
      let node = document.createElement('div');
      instance = ReactDOM.render(<TimelineTransactions {...props} />, node);
      instance.closeBtnClick();
      expect(props.closeBtnClick).toBeCalled();
    });
  });
})
