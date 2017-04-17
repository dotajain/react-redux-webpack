'use strict'

jest.unmock('../ProjectionScreen');
jest.unmock('../../../../utils/NumberUtils');
jest.unmock('../ProjectionPage');
jest.unmock('../../../../utils/ProjectionDateUtils');

const React = require('react');
const ReactDOM = require('react-dom');
const ProjectionScreen = require('../ProjectionScreen');
const Helmet = require('react-helmet');
const {PropTypes} = React;
const TestUtils = require('react-addons-test-utils');
import { Swipeable, defineSwipe } from 'react-touch';
// import Slider from '../src/slider'
const General = require('../../../../config/General');
const ProjectionStore = require('../../../../stores/ProjectionStore');
const NumberUtils = require('../../../../utils/NumberUtils');
const ProjectionActionCreator = require('../../../../actions/ProjectionActionCreator');
const FinancialStoriesActionCreator = require('../../../../actions/FinancialStoriesActionCreator');
const AccountOpeningActions = require('../../../../actions/AccountOpeningActions');
const ProjectionDetailsPage = require('../ProjectionDetailsPage');
const ProjectionTourComponent = require('../ProjectionTourComponent');
const PoundIcon = require('../SvgIcons/Pound');
const WalletIcon = require('../SvgIcons/Wallet');
const TrolleyIcon = require('../SvgIcons/Trolley');
const CameraIcon = require('../SvgIcons/Camera');
const Wheel = require('../SvgIcons/Wheel');
const ProjectionSettings = require('../ProjectionSettings');
const ProjectionDateUtils = require('../../../../utils/ProjectionDateUtils');
const shallowRender = props => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<ProjectionScreen
    {...props}
    />);
  return shallowRenderer.getRenderOutput();
};

describe('Projection Screen Page', () => {
  describe('should equal JSX', () => {
    let props = {
      content: {
        projectionsExpandedItemViewYourCurrentBalanceHeading: 'Your current balance is',
        projectionsExpandedItemViewThisMayDifferFootNote: 'This may be different to your available balance (you can check this in your account screen)',
        projectionsExpandedItemViewYouHaveOneCommitmentHeading: 'You have 1 commitment. This comes to',
        projectionsExpandedItemViewYouCanViewTheseFootNote: 'See what these are below',
        projectionsExpandedItemViewYouveTaggedHeading: 'You\'ve tagged',
        projectionsExpandedItemViewSingagEssentialSpendWithin31DaysSubHeading: 'as essential spend. Your tag is',
        projectionTagsContent1: 'as essential spend. Your tag is',
        projectionsExpandedItemViewYouCanChangeTheseFootNote: 'You can change these in Projection Settings',
        projectionTagsContent: 'as essential spend. Your top tags are',
        projectionsExpandedItemViewYourNextEarningHeading: 'The next cash coming into your account should be',
        projectionsExpandedItemViewThisIsMadeUpOfSubHeading: 'before your next earning. This is made up of',
        projectionsExpandedItemViewThisIsMadeUpOfWthin31DaysSubHeading: 'over the next 31 days. This is made up of',
        projectionSummaryHeaderNoWarningDays: 'B predicts you\'re good to go. You should have',
        projectionsExpandedItemViewSpinTheWheelFootNote: 'Spin the wheel to find out more',
        projectionsExpandedItemViewNoNextEarningHeading: 'There is no cash coming into your account in the next 31 days',
        projectionsExpandedItemViewYouCanReviewThisFootNote: 'See this in Projection Settings',
        projectionSummaryHeaderWarningDays: 'Looks like you\'ll go below your low balance limit of £50.00 on',
        projectionsExpandedItemViewCurrentBalance: 'Current Balance',
        projectionsExpandedItemViewCommitments: 'Commitments',
        projectionsExpandedItemViewEssentialSpend: 'Essential spend',
        projectionsExpandedItemViewLowBalanceLimit: 'Low balance limit',
      },
      projectionSummary: {
        isCrunching: true,
      },
      onload: false,
    }
    let component = shallowRender(props);
    it('should render component', () => {
      expect(component).toEqualJSX(
        <div className="scroll-wrapper">
          <Helmet title="Projections" />
          <ProjectionSettings
            _cancel_button={undefined}
            _opt_out_of_projections={undefined}
            alertsAmountValue={undefined}
            backToAccount={undefined}
            cancelButtonFlag={undefined}
            cancelFlag={undefined}
            changeTheNotificationFlag={undefined}
            changeTheValue={undefined}
            content={{ projectionSummaryHeaderNoWarningDays: 'B predicts you\'re good to go. You should have', projectionSummaryHeaderWarningDays: 'Looks like you\'ll go below your low balance limit of £50.00 on', projectionTagsContent: 'as essential spend. Your top tags are', projectionTagsContent1: 'as essential spend. Your tag is', projectionsExpandedItemViewCommitments: 'Commitments', projectionsExpandedItemViewCurrentBalance: 'Current Balance', projectionsExpandedItemViewEssentialSpend: 'Essential spend', projectionsExpandedItemViewLowBalanceLimit: 'Low balance limit', projectionsExpandedItemViewNoNextEarningHeading: 'There is no cash coming into your account in the next 31 days', projectionsExpandedItemViewSingagEssentialSpendWithin31DaysSubHeading: 'as essential spend. Your tag is', projectionsExpandedItemViewSpinTheWheelFootNote: 'Spin the wheel to find out more', projectionsExpandedItemViewThisIsMadeUpOfSubHeading: 'before your next earning. This is made up of', projectionsExpandedItemViewThisIsMadeUpOfWthin31DaysSubHeading: 'over the next 31 days. This is made up of', projectionsExpandedItemViewThisMayDifferFootNote: 'This may be different to your available balance (you can check this in your account screen)', projectionsExpandedItemViewYouCanChangeTheseFootNote: 'You can change these in Projection Settings', projectionsExpandedItemViewYouCanReviewThisFootNote: 'See this in Projection Settings', projectionsExpandedItemViewYouCanViewTheseFootNote: 'See what these are below', projectionsExpandedItemViewYouHaveOneCommitmentHeading: 'You have 1 commitment. This comes to', projectionsExpandedItemViewYourCurrentBalanceHeading: 'Your current balance is', projectionsExpandedItemViewYourNextEarningHeading: 'The next cash coming into your account should be', projectionsExpandedItemViewYouveTaggedHeading: 'You\'ve tagged' }}
            dLeaveSetup={undefined}
            doneClicked={undefined}
            doneProjectionSettings={undefined}
            earningsAndCommitmentsData={undefined}
            getEarningsId={undefined}
            modifiedTags={undefined}
            modifiedUserTag={undefined}
            notificationFlag={undefined}
            onLoad={undefined}
            onclickCancelForOptOut={undefined}
            onclickLeaveSetup={undefined}
            optOutFlag={undefined}
            optoutDemo={undefined}
            />
        </div>
      )
    })
  })
  describe('function test', () => {
    let onStoreChange = jest.genMockFn();
    let props = {
      "content": {
        projectionsExpandedItemViewYourCurrentBalanceHeading: 'Your current balance is',
        projectionsExpandedItemViewThisMayDifferFootNote: 'This may be different to your available balance (you can check this in your account screen)',
        projectionsExpandedItemViewYouHaveOneCommitmentHeading: 'You have 1 commitment. This comes to',
        projectionsExpandedItemViewYouCanViewTheseFootNote: 'See what these are below',
        projectionsExpandedItemViewYouveTaggedHeading: 'You\'ve tagged',
        projectionsExpandedItemViewSingagEssentialSpendWithin31DaysSubHeading: 'as essential spend. Your tag is',
        projectionTagsContent1: 'as essential spend. Your tag is',
        projectionsExpandedItemViewYouCanChangeTheseFootNote: 'You can change these in Projection Settings',
        projectionTagsContent: 'as essential spend. Your top tags are',
        projectionsExpandedItemViewYourNextEarningHeading: 'The next cash coming into your account should be',
        projectionsExpandedItemViewThisIsMadeUpOfSubHeading: 'before your next earning. This is made up of',
        projectionsExpandedItemViewThisIsMadeUpOfWthin31DaysSubHeading: 'over the next 31 days. This is made up of',
        projectionSummaryHeaderNoWarningDays: 'B predicts you\'re good to go. You should have',
        projectionsExpandedItemViewSpinTheWheelFootNote: 'Spin the wheel to find out more',
        projectionsExpandedItemViewNoNextEarningHeading: 'There is no cash coming into your account in the next 31 days',
        projectionsExpandedItemViewYouCanReviewThisFootNote: 'See this in Projection Settings',
        projectionSummaryHeaderWarningDays: 'Looks like you\'ll go below your low balance limit of £50.00 on',
        projectionsExpandedItemViewCurrentBalance: 'Current Balance',
        projectionsExpandedItemViewCommitments: 'Commitments',
        projectionsExpandedItemViewEssentialSpend: 'Essential spend',
        projectionsExpandedItemViewLowBalanceLimit: 'Low balance limit',
      },
      "onload": true,
      "projectionSummary": {
        "last_updated": "2016-05-16T16:07:50.074+01:00",
        "thresholds": {
          "lower": {
            "amount": {
              "value": 50.0,
              "currency": "GBP"
            }
          }
        },
        "projection_periods": [
          {
            "period": {
              "from": {
                "date": "2016-05-16T00:00:00.000+01:00",
                "available_balance": {
                  "value": 4093.94,
                  "currency": "GBP"
                }
              },
              "to": {
                "date": "2016-05-10T23:59:59.000+01:00",
                "available_balance": {
                  "value": 4093.94,
                  "currency": "GBP"
                }
              }
            },
            "warning_days": [

            ],
            "earnings": [

            ],
            "projected_transactions": {
              "transactions": [
                {
                  "display_name": "UK Gas Co",
                  "amount": {
                    "value": -45.0,
                    "currency": "GBP"
                  }
                }
              ],
              "total_amount": {
                "value": -699.35,
                "currency": "GBP"
              }
            },
            "essential_spend_info": {
              "essential_spend": [
                {
                  "amount": {
                    "value": -439.13,
                    "currency": "GBP"
                  },
                  "display_name": "Shoes"
                },
                {
                  "amount": {
                    "value": -910.28,
                    "currency": "GBP"
                  },
                  "display_name": "Untagged"
                },
                {
                  "amount": {
                    "value": -49.79,
                    "currency": "GBP"
                  },
                  "display_name": "Style"
                },
              ],
              "total_amount": {
                "value": -3021.82,
                "currency": "GBP"
              }
            }
          }
        ]
      }
    };
    let props1 = {
      "content": {
        projectionSummaryHeaderWarningDays: 'Looks like you\'ll go below your low balance limit of £50.00 on',
        projectionsExpandedItemViewSpinTheWheelFootNote: 'Spin the wheel to find out more',
        projectionSpinWheelText: 'Spin the wheel to find out more',
      },
      "onload": true,
      "projectionSummary": {
        isCrunching: true,
        "last_updated": "2016-05-16T16:07:50.074+01:00",
        "thresholds": {
          "lower": {
            "amount": {
              "value": 50.0,
              "currency": "GBP"
            }
          }
        },
        "projection_periods": [
          {
            "period": {
              "from": {
                "date": "2016-05-16T00:00:00.000+01:00",
                "available_balance": {
                  "value": 4093.94,
                  "currency": "GBP"
                }
              },
              "to": {
                "date": "2016-05-10T23:59:59.000+01:00",
                "available_balance": {
                  "value": 4093.94,
                  "currency": "GBP"
                }
              }
            },
            "warning_days": [{
              value: 1
            }
            ],
            "earnings": [
              {
                amount: {
                  value: 200,
                }
              }

            ],
            "projected_transactions": {
              "transactions": [
                {
                  "display_name": "UK Gas Co",
                  "amount": {
                    "value": -45.0,
                    "currency": "GBP"
                  }
                }
              ],
              "total_amount": {
                "value": -699.35,
                "currency": "GBP"
              }
            },
            "essential_spend_info": {
              "essential_spend": [
                {
                  "amount": {
                    "value": -439.13,
                    "currency": "GBP"
                  },
                  "display_name": "Shoes"
                },
                {
                  "amount": {
                    "value": -910.28,
                    "currency": "GBP"
                  },
                  "display_name": "Untagged"
                },
                {
                  "amount": {
                    "value": -49.79,
                    "currency": "GBP"
                  },
                  "display_name": "Style"
                },
              ],
              "total_amount": {
                "value": -3021.82,
                "currency": "GBP"
              }
            }
          }
        ]
      }
    };
    it('should call done Click function', () => {
      let node = document.createElement('div');
      const render = (comp, el) => ReactDOM.render(comp, el);
      let instance = ReactDOM.render(<ProjectionScreen {...props} />, node);
      instance.doneClick();
      expect(FinancialStoriesActionCreator.handleUpdateFSTileClick.mock.calls.length).toEqual(1);
    })
    it('should call onStoreChange Click function', () => {
      let node = document.createElement('div');
      const render = (comp, el) => ReactDOM.render(comp, el);
      let instance = ReactDOM.render(<ProjectionScreen {...props} />, node);
      instance.onStoreChange();
      expect(instance.state.wheelDegree).toEqual(0);
    })
    it('should call onStoreChange Click function', () => {
      let node = document.createElement('div');
      const render = (comp, el) => ReactDOM.render(comp, el);
      let instance = ReactDOM.render(<ProjectionScreen {...props} />, node);
      instance.onStoreChange();
      expect(instance.state.wheelDegree).toEqual(0);
    })
    it('should call projectionWheelLeftMove', () => {
      let node = document.createElement('div');
      const render = (comp, el) => ReactDOM.render(comp, el);
      let instance = ReactDOM.render(<ProjectionScreen {...props} />, node);
      instance.setState({ wheelDegree: 288 });
      instance.projectionWheelLeftMove();
      expect(instance.state.wheelDegree).toEqual(360);
    })
    it('should call projectionWheelLeftMove', () => {
      let node = document.createElement('div');
      const render = (comp, el) => ReactDOM.render(comp, el);
      let instance = ReactDOM.render(<ProjectionScreen {...props} />, node);
      instance.projectionWheelLeftMove();
      expect(instance.state.wheelDegree).toEqual(72);
    })
    it('should call projectionWheelRightMove', () => {
      let node = document.createElement('div');
      const render = (comp, el) => ReactDOM.render(comp, el);
      let instance = ReactDOM.render(<ProjectionScreen {...props} />, node);
      instance.projectionWheelRightMove();
      expect(instance.state.wheelDegree).toEqual(-72);
    })
    it('should call projectionWheelRightMove', () => {
      let node = document.createElement('div');
      const render = (comp, el) => ReactDOM.render(comp, el);
      let instance = ReactDOM.render(<ProjectionScreen {...props} />, node);
      instance.setState({ wheelDegree: -288 });
      instance.projectionWheelRightMove();
      expect(instance.state.wheelDegree).toEqual(-360);
    })
    it('should call projectionWheelLeftClick', () => {
      let node = document.createElement('div');
      const render = (comp, el) => ReactDOM.render(comp, el);
      let instance = ReactDOM.render(<ProjectionScreen {...props} />, node);
      instance.projectionWheelLeftClick();
      expect(instance.state.wheelDegree).toEqual(72);
    })
    it('should call projectionWheelLeftClick', () => {
      let node = document.createElement('div');
      const render = (comp, el) => ReactDOM.render(comp, el);
      let instance = ReactDOM.render(<ProjectionScreen {...props} />, node);
      instance.setState({ wheelDegree: 288 });
      instance.projectionWheelLeftClick();
      expect(instance.state.wheelDegree).toEqual(360);
    })
    it('should call projectionWheelRightClick', () => {
      let node = document.createElement('div');
      const render = (comp, el) => ReactDOM.render(comp, el);
      let instance = ReactDOM.render(<ProjectionScreen {...props} />, node);
      instance.setState({ wheelDegree: -288 });
      instance.projectionWheelRightClick();
      expect(instance.state.wheelDegree).toEqual(-360);
    })

    it('should call projectionWheelRightClick', () => {
      let node = document.createElement('div');
      const render = (comp, el) => ReactDOM.render(comp, el);
      let instance = ReactDOM.render(<ProjectionScreen {...props} />, node);
      instance.projectionWheelRightClick();
      expect(instance.state.wheelDegree).toEqual(-72);
    })

    it('should call nextEarningProjectionPeriod', () => {
      let node = document.createElement('div');
      const render = (comp, el) => ReactDOM.render(comp, el);
      let instance = ReactDOM.render(<ProjectionScreen {...props} />, node);
      instance.nextEarningProjectionPeriod();
    })

    it('should call _getCurrentBalanceContent', () => {
      let node = document.createElement('div');
      const render = (comp, el) => ReactDOM.render(comp, el);
      let instance = ReactDOM.render(<ProjectionScreen {...props} />, node);
      instance.setState({ wheelDegree: -72 });
      let result = instance._getCurrentBalanceContent();
      expect(result).toEqualJSX(
        <div className="active content-block">
          <h3 className="wheel-stmnt">
            Your current balance is
                </h3>
          <h3 className="current-date">
            £4,093.
                  <sub>
              94
                  </sub>
          </h3>
          <h3 className="wheel-stmnt2">
            This may be different to your available balance (you can check this in your account screen)
                </h3>
        </div>
      );
    })

    it('should call _getCommitmentContent', () => {
      let node = document.createElement('div');
      const render = (comp, el) => ReactDOM.render(comp, el);
      let instance = ReactDOM.render(<ProjectionScreen {...props} />, node);
      instance.setState({ wheelDegree: -144 });
      let result = instance._getCommitmentContent();
      expect(result).toEqualJSX(<div className="active content-block">
        <h3 className="wheel-stmnt">
          You have 1 commitment. This comes to
               </h3>
        <h3 className="current-date">
          -£699.
                 <sub>
            35
                 </sub>
        </h3>
        <h3 className="wheel-stmnt2">
          See what these are below
               </h3>
      </div>);
    })

    it('should call _getEssentialSpendContent', () => {
      let node = document.createElement('div');
      const render = (comp, el) => ReactDOM.render(comp, el);
      let instance = ReactDOM.render(<ProjectionScreen {...props} />, node);
      instance.setState({ wheelDegree: -216 });
      let result = instance._getEssentialSpendContent();
      expect(result).toEqualJSX(<div className="active content-block">
        <h3 className="wheel-stmnt">
          You've tagged
      </h3>
        <h3 className="current-date">
          -£3,021.
        <sub>
            82
        </sub>
        </h3>
        <h3 className="wheel-stmnt2">
          as essential spend. Your top tags are
      </h3>
        <span>
          <label className="you-tag">
            Shoes
          <span>
              -£439.13
          </span>
          </label>
        </span>
        <span>
          <label className="you-tag">
            Untagged
          <span>
              -£910.28
          </span>
          </label>
        </span>
        <span>
          <label className="you-tag">
            Style
          <span>
              -£49.79
          </span>
          </label>
        </span>
        <h3 className="wheel-stmnt2">
          You can change these in Projection Settings
      </h3>
      </div>
      );
    })

    describe('componentWillUnmount', () => {
      it('calls for the removeChangeListener', () => {
        let node = document.createElement('div');
        const render = (comp, el) => ReactDOM.render(comp, el);
        let component = ReactDOM.render(<ProjectionScreen {...props} />, node);
        React.unmountComponentAtNode(node);
      });
    });
    it('should call _getNextEarningContent', () => {
      let node = document.createElement('div');
      const render = (comp, el) => ReactDOM.render(comp, el);
      let instance = ReactDOM.render(<ProjectionScreen {...props} />, node);
      instance.setState({ wheelDegree: -216 });
      let result = instance._getNextEarningContent();
      expect(result).toEqualJSX(<div className="">
        <h3 className="wheel-stmnt" />
        <h3 className="wheel-stmnt">
          There is no cash coming into your account in the next 31 days
              </h3>
        <h3 className="wheel-stmnt2">
          See this in Projection Settings
              </h3>
      </div>);
    })
    it('should call _getProjectionSummaryContent', () => {
      let node = document.createElement('div');
      const render = (comp, el) => ReactDOM.render(comp, el);
      let instance = ReactDOM.render(<ProjectionScreen {...props} />, node);
      let result = instance._getProjectionSummaryContent();
      expect(result).toEqualJSX(<div className="active content-block">
        <h3 className="wheel-stmnt">
          B predicts you're good to go. You should have
      </h3>
        <h3 className="current-date">
          £322.
        <sub>
            77
        </sub>
        </h3>
        <h3 className="wheel-stmnt2">
          over the next 31 days. This is made up of
      </h3>
        <ul className="balance-info">
          <li>
            <span className="value">
              £4,093.94
          </span>
            <span className="value-tag">
              Current Balance
          </span>
          </li>
          <li>
            <span className="value">
              -£699.35
          </span>
            <span className="value-tag">
              Commitments
          </span>
          </li>
          <li>
            <span className="value">
              -£3,021.82
          </span>
            <span className="value-tag">
              Essential spend
          </span>
          </li>
          <li>
            <span className="value">
              -£50.00
          </span>
            <span className="value-tag">
              Low balance limit
          </span>
          </li>
        </ul>
        <h3 className="wheel-stmnt2">
          Spin the wheel to find out more
      </h3>
      </div>);
    });

    it('componentDidMount ---> ', () => {
      props.projectionSummary.isCrunching = true;
      let instance = TestUtils.renderIntoDocument(<ProjectionScreen {...props} />);
      //instance.componentDidMount();
      expect(instance.componentDidMount).toBeTruthy();
    });

    it('tomorrowsEarningsFlag ---> ', () => {
      props.projectionSummary.projection_periods = [

        {
          "period": {
            "from": {
              "date": "2016-05-16T00:00:00.000+01:00",
              "available_balance": {
                "value": 4093.94,
                "currency": "GBP"
              }
            },
            "to": {
              "date": "2016-05-10T23:59:59.000+01:00",
              "available_balance": {
                "value": 4093.94,
                "currency": "GBP"
              }
            }
          },
          "warning_days": [

          ],
          "earnings": [
            {
              "amount": {
                "value": 2200.0,
                "currency": "GBP"
              },
              "display_name": "BACS, Recruitment Solutions - Salary",
              "when": "2016-05-11T13:00:00.000+01:00"
            }
          ],
          "projected_transactions": {
            "transactions": [
              {
                "display_name": "UK Gas Co",
                "amount": {
                  "value": -45.0,
                  "currency": "GBP"
                }
              }
            ],
            "total_amount": {
              "value": -699.35,
              "currency": "GBP"
            }
          },
          "essential_spend_info": {
            "essential_spend": [
              {
                "amount": {
                  "value": -439.13,
                  "currency": "GBP"
                },
                "display_name": "Shoes"
              },
              {
                "amount": {
                  "value": -910.28,
                  "currency": "GBP"
                },
                "display_name": "Untagged"
              },
              {
                "amount": {
                  "value": -49.79,
                  "currency": "GBP"
                },
                "display_name": "Style"
              },
            ],
            "total_amount": {
              "value": -3021.82,
              "currency": "GBP"
            }
          }
        }
      ];
      let instance = TestUtils.renderIntoDocument(<ProjectionScreen {...props} />);
      instance.tomorrowsEarningsFlag();
      expect(instance.props.projectionSummary.projection_periods.length).toBe(1);
    });

    it('next earnings projection period  1: checking projection summary to be not undefined', () => {
      props = {
        projectionSummary: {
          projection_periods: [

            {
              "period": {
                "from": {
                  "date": "2016-05-16T00:00:00.000+01:00",
                  "available_balance": {
                    "value": 4093.94,
                    "currency": "GBP"
                  }
                },
                "to": {
                  "date": "2016-05-10T23:59:59.000+01:00",
                  "available_balance": {
                    "value": 4093.94,
                    "currency": "GBP"
                  }
                }
              },
              "warning_days": [

              ],
              "earnings": [

              ],
              "projected_transactions": {
                "transactions": [
                  {
                    "display_name": "UK Gas Co",
                    "amount": {
                      "value": -45.0,
                      "currency": "GBP"
                    }
                  }
                ],
                "total_amount": {
                  "value": -699.35,
                  "currency": "GBP"
                }
              },
              "essential_spend_info": {
                "essential_spend": [
                  {
                    "amount": {
                      "value": -439.13,
                      "currency": "GBP"
                    },
                    "display_name": "Shoes"
                  },
                  {
                    "amount": {
                      "value": -910.28,
                      "currency": "GBP"
                    },
                    "display_name": "Untagged"
                  },
                  {
                    "amount": {
                      "value": -49.79,
                      "currency": "GBP"
                    },
                    "display_name": "Style"
                  },
                ],
                "total_amount": {
                  "value": -3021.82,
                  "currency": "GBP"
                }
              }
            }
          ]

        }
      };
      let instance = TestUtils.renderIntoDocument(<ProjectionScreen {...props} />);
      instance.nextEarningProjectionPeriod();
      expect(instance.props.projectionSummary).toBeDefined();
    });

    it('next earnings projection period  2: checking projection summary to be not undefined', () => {
      props = {
        projectionSummary: {
          projection_periods: [
            {
              "period": {
                "from": {
                  "date": "2016-05-16T00:00:00.000+01:00",
                  "available_balance": {
                    "value": 4093.94,
                    "currency": "GBP"
                  }
                },
                "to": {
                  "date": "2016-05-10T23:59:59.000+01:00",
                  "available_balance": {
                    "value": 4093.94,
                    "currency": "GBP"
                  }
                }
              },
              "warning_days": [

              ],
              "earnings": [
                {
                  "amount": {
                    "value": 2200.0,
                    "currency": "GBP"
                  },
                  "display_name": "BACS, Recruitment Solutions - Salary",
                  "when": "2016-05-11T13:00:00.000+01:00"
                }
              ],
              "projected_transactions": {
                "transactions": [
                  {
                    "display_name": "UK Gas Co",
                    "amount": {
                      "value": -45.0,
                      "currency": "GBP"
                    }
                  }
                ],
                "total_amount": {
                  "value": -699.35,
                  "currency": "GBP"
                }
              },
              "essential_spend_info": {
                "essential_spend": [
                  {
                    "amount": {
                      "value": -439.13,
                      "currency": "GBP"
                    },
                    "display_name": "Shoes"
                  },
                ],
                "total_amount": {
                  "value": -3021.82,
                  "currency": "GBP"
                }
              }
            },
            {
              "period": {
                "from": {
                  "date": "2016-05-16T00:00:00.000+01:00",
                  "available_balance": {
                    "value": 4093.94,
                    "currency": "GBP"
                  }
                },
                "to": {
                  "date": "2016-05-10T23:59:59.000+01:00",
                  "available_balance": {
                    "value": 4093.94,
                    "currency": "GBP"
                  }
                }
              },
              "warning_days": [

              ],
              "earnings": [
                {
                  "amount": {
                    "value": 2200.0,
                    "currency": "GBP"
                  },
                  "display_name": "BACS, Recruitment Solutions - Salary",
                  "when": "2016-05-11T13:00:00.000+01:00"
                }
              ],
              "projected_transactions": {
                "transactions": [
                  {
                    "display_name": "UK Gas Co",
                    "amount": {
                      "value": -45.0,
                      "currency": "GBP"
                    }
                  }
                ],
                "total_amount": {
                  "value": -699.35,
                  "currency": "GBP"
                }
              },
              "essential_spend_info": {
                "essential_spend": [
                  {
                    "amount": {
                      "value": -439.13,
                      "currency": "GBP"
                    },
                    "display_name": "Shoes"
                  },
                ],
                "total_amount": {
                  "value": -3021.82,
                  "currency": "GBP"
                }
              }
            }
          ]

        }
      };
      let instance = TestUtils.renderIntoDocument(<ProjectionScreen {...props} />);
      instance.nextEarningProjectionPeriod();
      expect(instance.props.projectionSummary.projection_periods.length).toBe(2);
    });

    it('next earnings projection period  3: checking projection summary to be not undefined', () => {
      props = {
        projectionSummary: {
          projection_periods: [
            {
              "period": {
                "from": {
                  "date": "2016-05-16T00:00:00.000+01:00",
                  "available_balance": {
                    "value": 4093.94,
                    "currency": "GBP"
                  }
                },
                "to": {
                  "date": "2016-05-10T23:59:59.000+01:00",
                  "available_balance": {
                    "value": 4093.94,
                    "currency": "GBP"
                  }
                }
              },
              "warning_days": [

              ],
              "earnings": [],
              "projected_transactions": {
                "transactions": [
                  {
                    "display_name": "UK Gas Co",
                    "amount": {
                      "value": -45.0,
                      "currency": "GBP"
                    }
                  }
                ],
                "total_amount": {
                  "value": -699.35,
                  "currency": "GBP"
                }
              },
              "essential_spend_info": {
                "essential_spend": [
                  {
                    "amount": {
                      "value": -439.13,
                      "currency": "GBP"
                    },
                    "display_name": "Shoes"
                  },
                ],
                "total_amount": {
                  "value": -3021.82,
                  "currency": "GBP"
                }
              }
            },
            {
              "period": {
                "from": {
                  "date": "2016-05-16T00:00:00.000+01:00",
                  "available_balance": {
                    "value": 4093.94,
                    "currency": "GBP"
                  }
                },
                "to": {
                  "date": "2016-05-10T23:59:59.000+01:00",
                  "available_balance": {
                    "value": 4093.94,
                    "currency": "GBP"
                  }
                }
              },
              "warning_days": [

              ],
              "earnings": [],
              "projected_transactions": {
                "transactions": [
                  {
                    "display_name": "UK Gas Co",
                    "amount": {
                      "value": -45.0,
                      "currency": "GBP"
                    }
                  }
                ],
                "total_amount": {
                  "value": -699.35,
                  "currency": "GBP"
                }
              },
              "essential_spend_info": {
                "essential_spend": [
                  {
                    "amount": {
                      "value": -439.13,
                      "currency": "GBP"
                    },
                    "display_name": "Shoes"
                  },
                ],
                "total_amount": {
                  "value": -3021.82,
                  "currency": "GBP"
                }
              }
            }
          ]

        }
      };
      let instance = TestUtils.renderIntoDocument(<ProjectionScreen {...props} />);
      instance.nextEarningProjectionPeriod();
      expect(instance.props.projectionSummary.projection_periods.length).toBe(2);
    });

    it('next earnings projection period  4: checking projection summary to be not undefined', () => {
      props = {
        projectionSummary: {
          projection_periods: [
            {
              "period": {
                "from": {
                  "date": "2016-05-16T00:00:00.000+01:00",
                  "available_balance": {
                    "value": 4093.94,
                    "currency": "GBP"
                  }
                },
                "to": {
                  "date": "2016-05-10T23:59:59.000+01:00",
                  "available_balance": {
                    "value": 4093.94,
                    "currency": "GBP"
                  }
                }
              },
              "warning_days": [

              ],
              "earnings": undefined,
              "projected_transactions": {
                "transactions": [
                  {
                    "display_name": "UK Gas Co",
                    "amount": {
                      "value": -45.0,
                      "currency": "GBP"
                    }
                  }
                ],
                "total_amount": {
                  "value": -699.35,
                  "currency": "GBP"
                }
              },
              "essential_spend_info": {
                "essential_spend": [
                  {
                    "amount": {
                      "value": -439.13,
                      "currency": "GBP"
                    },
                    "display_name": "Shoes"
                  },
                ],
                "total_amount": {
                  "value": -3021.82,
                  "currency": "GBP"
                }
              }
            },
            {
              "period": {
                "from": {
                  "date": "2016-05-16T00:00:00.000+01:00",
                  "available_balance": {
                    "value": 4093.94,
                    "currency": "GBP"
                  }
                },
                "to": {
                  "date": "2016-05-10T23:59:59.000+01:00",
                  "available_balance": {
                    "value": 4093.94,
                    "currency": "GBP"
                  }
                }
              },
              "warning_days": [

              ],
              "earnings": undefined,
              "projected_transactions": {
                "transactions": [
                  {
                    "display_name": "UK Gas Co",
                    "amount": {
                      "value": -45.0,
                      "currency": "GBP"
                    }
                  }
                ],
                "total_amount": {
                  "value": -699.35,
                  "currency": "GBP"
                }
              },
              "essential_spend_info": {
                "essential_spend": [
                  {
                    "amount": {
                      "value": -439.13,
                      "currency": "GBP"
                    },
                    "display_name": "Shoes"
                  },
                ],
                "total_amount": {
                  "value": -3021.82,
                  "currency": "GBP"
                }
              }
            }
          ]

        }
      };
      let instance = TestUtils.renderIntoDocument(<ProjectionScreen {...props} />);
      instance.nextEarningProjectionPeriod();
      expect(instance.props.projectionSummary.projection_periods.length).toBe(2);
    });

    it('get projection summary content', () => {
      props = {
        content: {
          projectionsExpandedItemViewYourCurrentBalanceHeading: 'Your current balance is',
          projectionsExpandedItemViewThisMayDifferFootNote: 'This may be different to your available balance (you can check this in your account screen)',
          projectionsExpandedItemViewYouHaveOneCommitmentHeading: 'You have 1 commitment. This comes to',
          projectionsExpandedItemViewYouCanViewTheseFootNote: 'See what these are below',
          projectionsExpandedItemViewYouveTaggedHeading: 'You\'ve tagged',
          projectionsExpandedItemViewSingagEssentialSpendWithin31DaysSubHeading: 'as essential spend. Your tag is',
          projectionTagsContent1: 'as essential spend. Your tag is',
          projectionsExpandedItemViewYouCanChangeTheseFootNote: 'You can change these in Projection Settings',
          projectionTagsContent: 'as essential spend. Your top tags are',
          projectionsExpandedItemViewYourNextEarningHeading: 'The next cash coming into your account should be',
          projectionsExpandedItemViewThisIsMadeUpOfSubHeading: 'before your next earning. This is made up of',
          projectionsExpandedItemViewThisIsMadeUpOfWthin31DaysSubHeading: 'over the next 31 days. This is made up of',
          projectionSummaryHeaderNoWarningDays: 'B predicts you\'re good to go. You should have',
          projectionsExpandedItemViewSpinTheWheelFootNote: 'Spin the wheel to find out more',
          projectionsExpandedItemViewNoNextEarningHeading: 'There is no cash coming into your account in the next 31 days',
          projectionsExpandedItemViewYouCanReviewThisFootNote: 'See this in Projection Settings',
          projectionSummaryHeaderWarningDays: 'Looks like you\'ll go below your low balance limit of £50.00 on',
          projectionsExpandedItemViewCurrentBalance: 'Current Balance',
          projectionsExpandedItemViewCommitments: 'Commitments',
          projectionsExpandedItemViewEssentialSpend: 'Essential spend',
          projectionsExpandedItemViewLowBalanceLimit: 'Low balance limit',
        },
        projectionSummary: {
          "last_updated": "2016-05-16T16:07:50.074+01:00",
          "thresholds": {
            "lower": {
              "amount": {
                "value": 50.0,
                "currency": "GBP"
              }
            }
          },
          projection_periods: [
            {
              "period": {
                "from": {
                  "date": "2016-05-16T00:00:00.000+01:00",
                  "available_balance": {
                    "value": 4093.94,
                    "currency": "GBP"
                  }
                },
                "to": {
                  "date": "2016-05-10T23:59:59.000+01:00",
                  "available_balance": {
                    "value": 4093.94,
                    "currency": "GBP"
                  }
                }
              },
              "warning_days": [

              ],
              "earnings": [
                {
                  "amount": {
                    "value": 2200.0,
                    "currency": "GBP"
                  },
                  "display_name": "BACS, Recruitment Solutions - Salary",
                  "when": "2016-05-11T13:00:00.000+01:00"
                }
              ],
              "projected_transactions": {
                "transactions": [
                  {
                    "display_name": "UK Gas Co",
                    "amount": {
                      "value": -45.0,
                      "currency": "GBP"
                    }
                  }
                ],
                "total_amount": {
                  "value": -699.35,
                  "currency": "GBP"
                }
              },
              "essential_spend_info": {
                "essential_spend": [
                  {
                    "amount": {
                      "value": -439.13,
                      "currency": "GBP"
                    },
                    "display_name": "Shoes"
                  },
                  {
                    "amount": {
                      "value": -910.28,
                      "currency": "GBP"
                    },
                    "display_name": "Untagged"
                  },
                  {
                    "amount": {
                      "value": -49.79,
                      "currency": "GBP"
                    },
                    "display_name": "Style"
                  },
                ],
                "total_amount": {
                  "value": -3021.82,
                  "currency": "GBP"
                }
              }
            }
          ]

        }
      };

      //props.projectionSummary = {};
      // let i = 1;
      let instance = TestUtils.renderIntoDocument(<ProjectionScreen {...props} />);
      instance._getProjectionSummaryContent();
      expect(instance.props.projectionSummary.projection_periods[0].earnings).toBeDefined();
    });

    it('get projection summary content', () => {
      props = {
        content: {
          projectionsExpandedItemViewYourCurrentBalanceHeading: 'Your current balance is',
          projectionsExpandedItemViewThisMayDifferFootNote: 'This may be different to your available balance (you can check this in your account screen)',
          projectionsExpandedItemViewYouHaveOneCommitmentHeading: 'You have 1 commitment. This comes to',
          projectionsExpandedItemViewYouCanViewTheseFootNote: 'See what these are below',
          projectionsExpandedItemViewYouveTaggedHeading: 'You\'ve tagged',
          projectionsExpandedItemViewSingagEssentialSpendWithin31DaysSubHeading: 'as essential spend. Your tag is',
          projectionTagsContent1: 'as essential spend. Your tag is',
          projectionsExpandedItemViewYouCanChangeTheseFootNote: 'You can change these in Projection Settings',
          projectionTagsContent: 'as essential spend. Your top tags are',
          projectionsExpandedItemViewYourNextEarningHeading: 'The next cash coming into your account should be',
          projectionsExpandedItemViewThisIsMadeUpOfSubHeading: 'before your next earning. This is made up of',
          projectionsExpandedItemViewThisIsMadeUpOfWthin31DaysSubHeading: 'over the next 31 days. This is made up of',
          projectionSummaryHeaderNoWarningDays: 'B predicts you\'re good to go. You should have',
          projectionsExpandedItemViewSpinTheWheelFootNote: 'Spin the wheel to find out more',
          projectionsExpandedItemViewNoNextEarningHeading: 'There is no cash coming into your account in the next 31 days',
          projectionsExpandedItemViewYouCanReviewThisFootNote: 'See this in Projection Settings',
          projectionSummaryHeaderWarningDays: 'Looks like you\'ll go below your low balance limit of £50.00 on',
          projectionsExpandedItemViewCurrentBalance: 'Current Balance',
          projectionsExpandedItemViewCommitments: 'Commitments',
          projectionsExpandedItemViewEssentialSpend: 'Essential spend',
          projectionsExpandedItemViewLowBalanceLimit: 'Low balance limit',
        },
        projectionSummary: {
          "last_updated": "2016-05-16T16:07:50.074+01:00",
          "thresholds": {
            "lower": {
              "amount": {
                "value": 50.0,
                "currency": "GBP"
              }
            }
          },
          projection_periods: [
            {
              "period": {
                "from": {
                  "date": "2016-05-16T00:00:00.000+01:00",
                  "available_balance": {
                    "value": 4093.94,
                    "currency": "GBP"
                  }
                },
                "to": {
                  "date": "2016-05-10T23:59:59.000+01:00",
                  "available_balance": {
                    "value": 4093.94,
                    "currency": "GBP"
                  }
                }
              },
              "warning_days": [
                '2016-10-12',
                '2016-10-25'
              ],
              "earnings": [

              ],
              "projected_transactions": {
                "transactions": [
                  {
                    "display_name": "UK Gas Co",
                    "amount": {
                      "value": -45.0,
                      "currency": "GBP"
                    }
                  }
                ],
                "total_amount": {
                  "value": -699.35,
                  "currency": "GBP"
                }
              },
              "essential_spend_info": {
                "essential_spend": [
                  {
                    "amount": {
                      "value": -439.13,
                      "currency": "GBP"
                    },
                    "display_name": "Shoes"
                  },
                  {
                    "amount": {
                      "value": -910.28,
                      "currency": "GBP"
                    },
                    "display_name": "Untagged"
                  },
                  {
                    "amount": {
                      "value": -49.79,
                      "currency": "GBP"
                    },
                    "display_name": "Style"
                  },
                ],
                "total_amount": {
                  "value": -3021.82,
                  "currency": "GBP"
                }
              }
            }
          ]

        }
      };

      let instance = TestUtils.renderIntoDocument(<ProjectionScreen {...props} />);
      let check = ProjectionDateUtils.dateConversion(instance.props.projectionSummary.projection_periods[0].warning_days[0]);
      instance._getProjectionSummaryContent();
      expect(instance.props.projectionSummary.projection_periods[0].warning_days.length).toBe(2);
    });
    it('checking if condition for the _getCommitmentContent()', () => {
      props = {
        "content": {
          projectionsExpandedItemViewYourCurrentBalanceHeading: 'Your current balance is',
          projectionsExpandedItemViewThisMayDifferFootNote: 'This may be different to your available balance (you can check this in your account screen)',
          projectionsExpandedItemViewYouHaveOneCommitmentHeading: 'You have 1 commitment. This comes to',
          projectionsExpandedItemViewYouCanViewTheseFootNote: 'See what these are below',
          projectionsExpandedItemViewYouveTaggedHeading: 'You\'ve tagged',
          projectionsExpandedItemViewSingagEssentialSpendWithin31DaysSubHeading: 'as essential spend. Your tag is',
          projectionTagsContent1: 'as essential spend. Your tag is',
          projectionsExpandedItemViewYouCanChangeTheseFootNote: 'You can change these in Projection Settings',
          projectionTagsContent: 'as essential spend. Your top tags are',
          projectionsExpandedItemViewYourNextEarningHeading: 'The next cash coming into your account should be',
          projectionsExpandedItemViewThisIsMadeUpOfSubHeading: 'before your next earning. This is made up of',
          projectionsExpandedItemViewThisIsMadeUpOfWthin31DaysSubHeading: 'over the next 31 days. This is made up of',
          projectionSummaryHeaderNoWarningDays: 'B predicts you\'re good to go. You should have',
          projectionsExpandedItemViewSpinTheWheelFootNote: 'Spin the wheel to find out more',
          projectionsExpandedItemViewNoNextEarningHeading: 'There is no cash coming into your account in the next 31 days',
          projectionsExpandedItemViewYouCanReviewThisFootNote: 'See this in Projection Settings',
          projectionSummaryHeaderWarningDays: 'Looks like you\'ll go below your low balance limit of £50.00 on',
          projectionsExpandedItemViewCurrentBalance: 'Current Balance',
          projectionsExpandedItemViewCommitments: 'Commitments',
          projectionsExpandedItemViewEssentialSpend: 'Essential spend',
          projectionsExpandedItemViewLowBalanceLimit: 'Low balance limit',
        },
        "projectionSummary": {
          isCrunching: true,
          "last_updated": "2016-05-16T16:07:50.074+01:00",
          "thresholds": {
            "lower": {
              "amount": {
                "value": 50.0,
                "currency": "GBP"
              }
            }
          },
          "projection_periods": [
            {
              "period": {
                "from": {
                  "date": "2016-05-16T00:00:00.000+01:00",
                  "available_balance": {
                    "value": 4093.94,
                    "currency": "GBP"
                  }
                },
                "to": {
                  "date": "2016-05-10T23:59:59.000+01:00",
                  "available_balance": {
                    "value": 4093.94,
                    "currency": "GBP"
                  }
                }
              },
              "warning_days": [
              ],
              "earnings": [
              ],
              "projected_transactions": {
                "transactions": [
                  {
                    "display_name": "UK Gas Co",
                    "amount": {
                      "value": -45.0,
                      "currency": "GBP"
                    }
                  },
                  {
                    "display_name": "UK Gas Co",
                    "amount": {
                      "value": -45.0,
                      "currency": "GBP"
                    }
                  }
                ],
                "total_amount": {
                  "value": -699.35,
                  "currency": "GBP"
                }
              },
              "essential_spend_info": {
                "essential_spend": [
                  {
                    "amount": {
                      "value": -439.13,
                      "currency": "GBP"
                    },
                    "display_name": "Shoes"
                  },
                  {
                    "amount": {
                      "value": -910.28,
                      "currency": "GBP"
                    },
                    "display_name": "Untagged"
                  },
                  {
                    "amount": {
                      "value": -49.79,
                      "currency": "GBP"
                    },
                    "display_name": "Style"
                  },
                ],
                "total_amount": {
                  "value": -3021.82,
                  "currency": "GBP"
                }
              }
            }
          ]
        }
      };
      let instance = TestUtils.renderIntoDocument(<ProjectionScreen {...props} />);
      instance._getCommitmentContent();
      expect(instance.props.projectionSummary.projection_periods[0].projected_transactions.transactions.length).toBe(2);
    });

    it('checking if condition for the _getCommitmentContent()', () => {
      props = {
        "content": {
          projectionsExpandedItemViewYourCurrentBalanceHeading: 'Your current balance is',
          projectionsExpandedItemViewThisMayDifferFootNote: 'This may be different to your available balance (you can check this in your account screen)',
          projectionsExpandedItemViewYouHaveOneCommitmentHeading: 'You have 1 commitment. This comes to',
          projectionsExpandedItemViewYouCanViewTheseFootNote: 'See what these are below',
          projectionsExpandedItemViewYouveTaggedHeading: 'You\'ve tagged',
          projectionsExpandedItemViewSingagEssentialSpendWithin31DaysSubHeading: 'as essential spend. Your tag is',
          projectionTagsContent1: 'as essential spend. Your tag is',
          projectionsExpandedItemViewYouCanChangeTheseFootNote: 'You can change these in Projection Settings',
          projectionTagsContent: 'as essential spend. Your top tags are',
          projectionsExpandedItemViewYourNextEarningHeading: 'The next cash coming into your account should be',
          projectionsExpandedItemViewThisIsMadeUpOfSubHeading: 'before your next earning. This is made up of',
          projectionsExpandedItemViewThisIsMadeUpOfWthin31DaysSubHeading: 'over the next 31 days. This is made up of',
          projectionSummaryHeaderNoWarningDays: 'B predicts you\'re good to go. You should have',
          projectionsExpandedItemViewSpinTheWheelFootNote: 'Spin the wheel to find out more',
          projectionsExpandedItemViewNoNextEarningHeading: 'There is no cash coming into your account in the next 31 days',
          projectionsExpandedItemViewYouCanReviewThisFootNote: 'See this in Projection Settings',
          projectionSummaryHeaderWarningDays: 'Looks like you\'ll go below your low balance limit of £50.00 on',
          projectionsExpandedItemViewCurrentBalance: 'Current Balance',
          projectionsExpandedItemViewCommitments: 'Commitments',
          projectionsExpandedItemViewEssentialSpend: 'Essential spend',
          projectionsExpandedItemViewLowBalanceLimit: 'Low balance limit',
        },
        "projectionSummary": {
          isCrunching: true,
          "last_updated": "2016-05-16T16:07:50.074+01:00",
          "thresholds": {
            "lower": {
              "amount": {
                "value": 50.0,
                "currency": "GBP"
              }
            }
          },
          "projection_periods": [
            {
              "period": {
                "from": {
                  "date": "2016-05-16T00:00:00.000+01:00",
                  "available_balance": {
                    "value": 4093.94,
                    "currency": "GBP"
                  }
                },
                "to": {
                  "date": "2016-05-10T23:59:59.000+01:00",
                  "available_balance": {
                    "value": 4093.94,
                    "currency": "GBP"
                  }
                }
              },
              "warning_days": [
              ],
              "earnings": [
              ],
              "projected_transactions": {
                "transactions": [],
                "total_amount": {
                  "value": -699.35,
                  "currency": "GBP"
                }
              },
              "essential_spend_info": {
                "essential_spend": [
                  {
                    "amount": {
                      "value": -439.13,
                      "currency": "GBP"
                    },
                    "display_name": "Shoes"
                  },
                  {
                    "amount": {
                      "value": -910.28,
                      "currency": "GBP"
                    },
                    "display_name": "Untagged"
                  },
                  {
                    "amount": {
                      "value": -49.79,
                      "currency": "GBP"
                    },
                    "display_name": "Style"
                  },
                ],
                "total_amount": {
                  "value": -3021.82,
                  "currency": "GBP"
                }
              }
            }
          ]
        }
      };
      let instance = TestUtils.renderIntoDocument(<ProjectionScreen {...props} />);
      instance._getCommitmentContent();
      expect(instance.props.projectionSummary.projection_periods[0].projected_transactions.transactions.length).toBe(0);
    });

    xit('checking if condition for the _getCommitmentContent()', () => {
      props = {
        "content": {
          projectionsExpandedItemViewYourCurrentBalanceHeading: 'Your current balance is',
          projectionsExpandedItemViewThisMayDifferFootNote: 'This may be different to your available balance (you can check this in your account screen)',
          projectionsExpandedItemViewYouHaveOneCommitmentHeading: 'You have 1 commitment. This comes to',
          projectionsExpandedItemViewYouCanViewTheseFootNote: 'See what these are below',
          projectionsExpandedItemViewYouveTaggedHeading: 'You\'ve tagged',
          projectionsExpandedItemViewSingagEssentialSpendWithin31DaysSubHeading: 'as essential spend. Your tag is',
          projectionTagsContent1: 'as essential spend. Your tag is',
          projectionsExpandedItemViewYouCanChangeTheseFootNote: 'You can change these in Projection Settings',
          projectionTagsContent: 'as essential spend. Your top tags are',
          projectionsExpandedItemViewYourNextEarningHeading: 'The next cash coming into your account should be',
          projectionsExpandedItemViewThisIsMadeUpOfSubHeading: 'before your next earning. This is made up of',
          projectionsExpandedItemViewThisIsMadeUpOfWthin31DaysSubHeading: 'over the next 31 days. This is made up of',
          projectionSummaryHeaderNoWarningDays: 'B predicts you\'re good to go. You should have',
          projectionsExpandedItemViewSpinTheWheelFootNote: 'Spin the wheel to find out more',
          projectionsExpandedItemViewNoNextEarningHeading: 'There is no cash coming into your account in the next 31 days',
          projectionsExpandedItemViewYouCanReviewThisFootNote: 'See this in Projection Settings',
          projectionSummaryHeaderWarningDays: 'Looks like you\'ll go below your low balance limit of £50.00 on',
          projectionsExpandedItemViewCurrentBalance: 'Current Balance',
          projectionsExpandedItemViewCommitments: 'Commitments',
          projectionsExpandedItemViewEssentialSpend: 'Essential spend',
          projectionsExpandedItemViewLowBalanceLimit: 'Low balance limit',
        },
        "projectionSummary": {
          isCrunching: true,
        }
      };
      let instance = TestUtils.renderIntoDocument(<ProjectionScreen {...props} />);
      instance._getCommitmentContent();
      expect(instance.props.projectionSummary).toBe(undefined);
    });
    it('checking if condition for _getEssentialSpendContent()', () => {
      props = {
        "content": {
          projectionsExpandedItemViewYourCurrentBalanceHeading: 'Your current balance is',
          projectionsExpandedItemViewThisMayDifferFootNote: 'This may be different to your available balance (you can check this in your account screen)',
          projectionsExpandedItemViewYouHaveOneCommitmentHeading: 'You have 1 commitment. This comes to',
          projectionsExpandedItemViewYouCanViewTheseFootNote: 'See what these are below',
          projectionsExpandedItemViewYouveTaggedHeading: 'You\'ve tagged',
          projectionsExpandedItemViewSingagEssentialSpendWithin31DaysSubHeading: 'as essential spend. Your tag is',
          projectionTagsContent1: 'as essential spend. Your tag is',
          projectionsExpandedItemViewYouCanChangeTheseFootNote: 'You can change these in Projection Settings',
          projectionTagsContent: 'as essential spend. Your top tags are',
          projectionsExpandedItemViewYourNextEarningHeading: 'The next cash coming into your account should be',
          projectionsExpandedItemViewThisIsMadeUpOfSubHeading: 'before your next earning. This is made up of',
          projectionsExpandedItemViewThisIsMadeUpOfWthin31DaysSubHeading: 'over the next 31 days. This is made up of',
          projectionSummaryHeaderNoWarningDays: 'B predicts you\'re good to go. You should have',
          projectionsExpandedItemViewSpinTheWheelFootNote: 'Spin the wheel to find out more',
          projectionsExpandedItemViewNoNextEarningHeading: 'There is no cash coming into your account in the next 31 days',
          projectionsExpandedItemViewYouCanReviewThisFootNote: 'See this in Projection Settings',
          projectionSummaryHeaderWarningDays: 'Looks like you\'ll go below your low balance limit of £50.00 on',
          projectionsExpandedItemViewCurrentBalance: 'Current Balance',
          projectionsExpandedItemViewCommitments: 'Commitments',
          projectionsExpandedItemViewEssentialSpend: 'Essential spend',
          projectionsExpandedItemViewLowBalanceLimit: 'Low balance limit',
        },
        "projectionSummary": {
          isCrunching: true,
          "last_updated": "2016-05-16T16:07:50.074+01:00",
          "thresholds": {
            "lower": {
              "amount": {
                "value": 50.0,
                "currency": "GBP"
              }
            }
          },
          "projection_periods": [
            {
              "period": {
                "from": {
                  "date": "2016-05-16T00:00:00.000+01:00",
                  "available_balance": {
                    "value": 4093.94,
                    "currency": "GBP"
                  }
                },
                "to": {
                  "date": "2016-05-10T23:59:59.000+01:00",
                  "available_balance": {
                    "value": 4093.94,
                    "currency": "GBP"
                  }
                }
              },
              "warning_days": [
              ],
              "earnings": [
              ],
              "projected_transactions": {
                "transactions": [],
                "total_amount": {
                  "value": -699.35,
                  "currency": "GBP"
                }
              },
              "essential_spend_info": {
                "essential_spend": [
                  {
                    "amount": {
                      "value": -439.13,
                      "currency": "GBP"
                    },
                    "display_name": "Shoes"
                  },
                ],
                "total_amount": {
                  "value": -3021.82,
                  "currency": "GBP"
                }
              }
            }
          ]
        }
      };
      let instance = TestUtils.renderIntoDocument(<ProjectionScreen {...props} />);
      instance._getEssentialSpendContent();
      expect(instance.props.projectionSummary.projection_periods[0].essential_spend_info.essential_spend.length).toBe(1);
    });
    it('checking if condition for _getNextEarningContent 1', () => {
      props = {
        "content": {
          projectionsExpandedItemViewYourCurrentBalanceHeading: 'Your current balance is',
          projectionsExpandedItemViewThisMayDifferFootNote: 'This may be different to your available balance (you can check this in your account screen)',
          projectionsExpandedItemViewYouHaveOneCommitmentHeading: 'You have 1 commitment. This comes to',
          projectionsExpandedItemViewYouCanViewTheseFootNote: 'See what these are below',
          projectionsExpandedItemViewYouveTaggedHeading: 'You\'ve tagged',
          projectionsExpandedItemViewSingagEssentialSpendWithin31DaysSubHeading: 'as essential spend. Your tag is',
          projectionTagsContent1: 'as essential spend. Your tag is',
          projectionsExpandedItemViewYouCanChangeTheseFootNote: 'You can change these in Projection Settings',
          projectionTagsContent: 'as essential spend. Your top tags are',
          projectionsExpandedItemViewYourNextEarningHeading: 'The next cash coming into your account should be',
          projectionsExpandedItemViewThisIsMadeUpOfSubHeading: 'before your next earning. This is made up of',
          projectionsExpandedItemViewThisIsMadeUpOfWthin31DaysSubHeading: 'over the next 31 days. This is made up of',
          projectionSummaryHeaderNoWarningDays: 'B predicts you\'re good to go. You should have',
          projectionsExpandedItemViewSpinTheWheelFootNote: 'Spin the wheel to find out more',
          projectionsExpandedItemViewNoNextEarningHeading: 'There is no cash coming into your account in the next 31 days',
          projectionsExpandedItemViewYouCanReviewThisFootNote: 'See this in Projection Settings',
          projectionSummaryHeaderWarningDays: 'Looks like you\'ll go below your low balance limit of £50.00 on',
          projectionsExpandedItemViewCurrentBalance: 'Current Balance',
          projectionsExpandedItemViewCommitments: 'Commitments',
          projectionsExpandedItemViewEssentialSpend: 'Essential spend',
          projectionsExpandedItemViewLowBalanceLimit: 'Low balance limit',
        },
        "projectionSummary": {
          isCrunching: true,
          "last_updated": "2016-05-16T16:07:50.074+01:00",
          "thresholds": {
            "lower": {
              "amount": {
                "value": 50.0,
                "currency": "GBP"
              }
            }
          },
          "projection_periods": [
            {
              "period": {
                "from": {
                  "date": "2016-05-16T00:00:00.000+01:00",
                  "available_balance": {
                    "value": 4093.94,
                    "currency": "GBP"
                  }
                },
                "to": {
                  "date": "2016-05-10T23:59:59.000+01:00",
                  "available_balance": {
                    "value": 4093.94,
                    "currency": "GBP"
                  }
                }
              },
              "warning_days": [
                "11-11-206",
                "11-11-2015"
              ],
              "earnings": [
              ],
              "projected_transactions": {
                "transactions": [],
                "total_amount": {
                  "value": -699.35,
                  "currency": "GBP"
                }
              },
              "essential_spend_info": {
                "essential_spend": [
                  {
                    "amount": {
                      "value": -439.13,
                      "currency": "GBP"
                    },
                    "display_name": "Shoes"
                  },
                ],
                "total_amount": {
                  "value": -3021.82,
                  "currency": "GBP"
                }
              }
            }
          ]
        }
      };
      let instance = TestUtils.renderIntoDocument(<ProjectionScreen {...props} />);
      instance._getNextEarningContent();
      expect(instance.props.projectionSummary.projection_periods[0].warning_days.length).toBe(2);
    });
    it('checking if condition for _getNextEarningContent 1', () => {
      props = {
        "content": {
          projectionsExpandedItemViewYourCurrentBalanceHeading: 'Your current balance is',
          projectionsExpandedItemViewThisMayDifferFootNote: 'This may be different to your available balance (you can check this in your account screen)',
          projectionsExpandedItemViewYouHaveOneCommitmentHeading: 'You have 1 commitment. This comes to',
          projectionsExpandedItemViewYouCanViewTheseFootNote: 'See what these are below',
          projectionsExpandedItemViewYouveTaggedHeading: 'You\'ve tagged',
          projectionsExpandedItemViewSingagEssentialSpendWithin31DaysSubHeading: 'as essential spend. Your tag is',
          projectionTagsContent1: 'as essential spend. Your tag is',
          projectionsExpandedItemViewYouCanChangeTheseFootNote: 'You can change these in Projection Settings',
          projectionTagsContent: 'as essential spend. Your top tags are',
          projectionsExpandedItemViewYourNextEarningHeading: 'The next cash coming into your account should be',
          projectionsExpandedItemViewThisIsMadeUpOfSubHeading: 'before your next earning. This is made up of',
          projectionsExpandedItemViewThisIsMadeUpOfWthin31DaysSubHeading: 'over the next 31 days. This is made up of',
          projectionSummaryHeaderNoWarningDays: 'B predicts you\'re good to go. You should have',
          projectionsExpandedItemViewSpinTheWheelFootNote: 'Spin the wheel to find out more',
          projectionsExpandedItemViewNoNextEarningHeading: 'There is no cash coming into your account in the next 31 days',
          projectionsExpandedItemViewYouCanReviewThisFootNote: 'See this in Projection Settings',
          projectionSummaryHeaderWarningDays: 'Looks like you\'ll go below your low balance limit of £50.00 on',
          projectionsExpandedItemViewCurrentBalance: 'Current Balance',
          projectionsExpandedItemViewCommitments: 'Commitments',
          projectionsExpandedItemViewEssentialSpend: 'Essential spend',
          projectionsExpandedItemViewLowBalanceLimit: 'Low balance limit',
        },
        "projectionSummary": {
          isCrunching: true,
          "last_updated": "2016-05-16T16:07:50.074+01:00",
          "thresholds": {
            "lower": {
              "amount": {
                "value": 50.0,
                "currency": "GBP"
              }
            }
          },
          "projection_periods": [
            {
              "period": {
                "from": {
                  "date": "2016-05-16T00:00:00.000+01:00",
                  "available_balance": {
                    "value": 4093.94,
                    "currency": "GBP"
                  }
                },
                "to": {
                  "date": "2016-05-10T23:59:59.000+01:00",
                  "available_balance": {
                    "value": 4093.94,
                    "currency": "GBP"
                  }
                }
              },
              "warning_days": [
                "11-11-206",
                "11-11-2015"
              ],
              "earnings": [
                {
                  "amount": {
                    "value": 2200.0,
                    "currency": "GBP"
                  },
                  "display_name": "BACS, Recruitment Solutions - Salary",
                  "when": "2016-05-11T13:00:00.000+01:00"
                }
              ],
              "projected_transactions": {
                "transactions": [],
                "total_amount": {
                  "value": -699.35,
                  "currency": "GBP"
                }
              },
              "essential_spend_info": {
                "essential_spend": [
                  {
                    "amount": {
                      "value": -439.13,
                      "currency": "GBP"
                    },
                    "display_name": "Shoes"
                  },
                ],
                "total_amount": {
                  "value": -3021.82,
                  "currency": "GBP"
                }
              }
            }
          ]
        }
      };
      let instance = TestUtils.renderIntoDocument(<ProjectionScreen {...props} />);
      instance._getNextEarningContent();
      expect(instance.props.projectionSummary.projection_periods[0].earnings.length).toBe(1);
    });
     it('checking if condition for _getNextEarningContent 2', () => {
      props = {
        "content": {
          projectionsExpandedItemViewYourCurrentBalanceHeading: 'Your current balance is',
          projectionsExpandedItemViewThisMayDifferFootNote: 'This may be different to your available balance (you can check this in your account screen)',
          projectionsExpandedItemViewYouHaveOneCommitmentHeading: 'You have 1 commitment. This comes to',
          projectionsExpandedItemViewYouCanViewTheseFootNote: 'See what these are below',
          projectionsExpandedItemViewYouveTaggedHeading: 'You\'ve tagged',
          projectionsExpandedItemViewSingagEssentialSpendWithin31DaysSubHeading: 'as essential spend. Your tag is',
          projectionTagsContent1: 'as essential spend. Your tag is',
          projectionsExpandedItemViewYouCanChangeTheseFootNote: 'You can change these in Projection Settings',
          projectionTagsContent: 'as essential spend. Your top tags are',
          projectionsExpandedItemViewYourNextEarningHeading: 'The next cash coming into your account should be',
          projectionsExpandedItemViewThisIsMadeUpOfSubHeading: 'before your next earning. This is made up of',
          projectionsExpandedItemViewThisIsMadeUpOfWthin31DaysSubHeading: 'over the next 31 days. This is made up of',
          projectionSummaryHeaderNoWarningDays: 'B predicts you\'re good to go. You should have',
          projectionsExpandedItemViewSpinTheWheelFootNote: 'Spin the wheel to find out more',
          projectionsExpandedItemViewNoNextEarningHeading: 'There is no cash coming into your account in the next 31 days',
          projectionsExpandedItemViewYouCanReviewThisFootNote: 'See this in Projection Settings',
          projectionSummaryHeaderWarningDays: 'Looks like you\'ll go below your low balance limit of £50.00 on',
          projectionsExpandedItemViewCurrentBalance: 'Current Balance',
          projectionsExpandedItemViewCommitments: 'Commitments',
          projectionsExpandedItemViewEssentialSpend: 'Essential spend',
          projectionsExpandedItemViewLowBalanceLimit: 'Low balance limit',
        },
        "projectionSummary": {
          isCrunching: true,
          "last_updated": "2016-05-16T16:07:50.074+01:00",
          "thresholds": {
            "lower": {
              "amount": {
                "value": 50.0,
                "currency": "GBP"
              }
            }
          },
          "projection_periods": [
            {
              "period": {
                "from": {
                  "date": "2016-05-16T00:00:00.000+01:00",
                  "available_balance": {
                    "value": 4093.94,
                    "currency": "GBP"
                  }
                },
                "to": {
                  "date": "2016-05-10T23:59:59.000+01:00",
                  "available_balance": {
                    "value": 4093.94,
                    "currency": "GBP"
                  }
                }
              },
              "warning_days": [
                "11-11-206",
                "11-11-2015"
              ],
              "earnings": [
                {
                  "amount": {
                    "value": 2200.0,
                    "currency": "GBP"
                  },
                  "display_name": "BACS, Recruitment Solutions - Salary",
                  "when": "2016-05-11T13:00:00.000+01:00"
                }
              ],
              "projected_transactions": {
                "transactions": [],
                "total_amount": {
                  "value": -699.35,
                  "currency": "GBP"
                }
              },
              "essential_spend_info": {
                "essential_spend": [
                  {
                    "amount": {
                      "value": -439.13,
                      "currency": "GBP"
                    },
                    "display_name": "Shoes"
                  },
                ],
                "total_amount": {
                  "value": -3021.82,
                  "currency": "GBP"
                }
              }
            }
          ]
        }
      };
      let instance = TestUtils.renderIntoDocument(<ProjectionScreen {...props} />);
      instance._getNextEarningContent();
      expect(instance.props.projectionSummary).toBeDefined();
    });

     it('checking if condition for _getNextEarningContent 3', () => {
      props = {
        "content": {
          projectionsExpandedItemViewYourCurrentBalanceHeading: 'Your current balance is',
          projectionsExpandedItemViewThisMayDifferFootNote: 'This may be different to your available balance (you can check this in your account screen)',
          projectionsExpandedItemViewYouHaveOneCommitmentHeading: 'You have 1 commitment. This comes to',
          projectionsExpandedItemViewYouCanViewTheseFootNote: 'See what these are below',
          projectionsExpandedItemViewYouveTaggedHeading: 'You\'ve tagged',
          projectionsExpandedItemViewSingagEssentialSpendWithin31DaysSubHeading: 'as essential spend. Your tag is',
          projectionTagsContent1: 'as essential spend. Your tag is',
          projectionsExpandedItemViewYouCanChangeTheseFootNote: 'You can change these in Projection Settings',
          projectionTagsContent: 'as essential spend. Your top tags are',
          projectionsExpandedItemViewYourNextEarningHeading: 'The next cash coming into your account should be',
          projectionsExpandedItemViewThisIsMadeUpOfSubHeading: 'before your next earning. This is made up of',
          projectionsExpandedItemViewThisIsMadeUpOfWthin31DaysSubHeading: 'over the next 31 days. This is made up of',
          projectionSummaryHeaderNoWarningDays: 'B predicts you\'re good to go. You should have',
          projectionsExpandedItemViewSpinTheWheelFootNote: 'Spin the wheel to find out more',
          projectionsExpandedItemViewNoNextEarningHeading: 'There is no cash coming into your account in the next 31 days',
          projectionsExpandedItemViewYouCanReviewThisFootNote: 'See this in Projection Settings',
          projectionSummaryHeaderWarningDays: 'Looks like you\'ll go below your low balance limit of £50.00 on',
          projectionsExpandedItemViewCurrentBalance: 'Current Balance',
          projectionsExpandedItemViewCommitments: 'Commitments',
          projectionsExpandedItemViewEssentialSpend: 'Essential spend',
          projectionsExpandedItemViewLowBalanceLimit: 'Low balance limit',
        },
        "projectionSummary": {
          isCrunching: true,
          "last_updated": "2016-05-16T16:07:50.074+01:00",
          "thresholds": {
            "lower": {
              "amount": {
                "value": 50.0,
                "currency": "GBP"
              }
            }
          },
          "projection_periods": [
            {
              "period": {
                "from": {
                  "date": "2016-05-16T00:00:00.000+01:00",
                  "available_balance": {
                    "value": 4093.94,
                    "currency": "GBP"
                  }
                },
                "to": {
                  "date": "2016-05-10T23:59:59.000+01:00",
                  "available_balance": {
                    "value": 4093.94,
                    "currency": "GBP"
                  }
                }
              },
              "warning_days": [
                "11-11-206",
                "11-11-2015"
              ],
              "earnings": [
                {
                  "amount": {
                    "value": 2200.0,
                    "currency": "GBP"
                  },
                  "display_name": "BACS, Recruitment Solutions - Salary",
                  "when": "2016-05-11T13:00:00.000+01:00"
                }
              ],
              "projected_transactions": {
                "transactions": [],
                "total_amount": {
                  "value": -699.35,
                  "currency": "GBP"
                }
              },
              "essential_spend_info": {
                "essential_spend": [
                  {
                    "amount": {
                      "value": -439.13,
                      "currency": "GBP"
                    },
                    "display_name": "Shoes"
                  },
                ],
                "total_amount": {
                  "value": -3021.82,
                  "currency": "GBP"
                }
              }
            },
             {
              "period": {
                "from": {
                  "date": "2016-05-16T00:00:00.000+01:00",
                  "available_balance": {
                    "value": 4093.94,
                    "currency": "GBP"
                  }
                },
                "to": {
                  "date": "2016-05-10T23:59:59.000+01:00",
                  "available_balance": {
                    "value": 4093.94,
                    "currency": "GBP"
                  }
                }
              },
              "warning_days": [
                "11-11-206",
                "11-11-2015"
              ],
              "earnings": [
                {
                  "amount": {
                    "value": 2200.0,
                    "currency": "GBP"
                  },
                  "display_name": "BACS, Recruitment Solutions - Salary",
                  "when": "2016-05-11T13:00:00.000+01:00"
                }
              ],
              "projected_transactions": {
                "transactions": [],
                "total_amount": {
                  "value": -699.35,
                  "currency": "GBP"
                }
              },
              "essential_spend_info": {
                "essential_spend": [
                  {
                    "amount": {
                      "value": -439.13,
                      "currency": "GBP"
                    },
                    "display_name": "Shoes"
                  },
                ],
                "total_amount": {
                  "value": -3021.82,
                  "currency": "GBP"
                }
              }
            }
          ]
        }
      };
      let instance = TestUtils.renderIntoDocument(<ProjectionScreen {...props} />);
      instance._getNextEarningContent();
      expect(instance.props.projectionSummary.projection_periods[1].earnings.length).toBe(1);
    });
    it('checking if condition for _getNextEarningContent 4', () => {
      props = {
        "content": {
          projectionsExpandedItemViewYourCurrentBalanceHeading: 'Your current balance is',
          projectionsExpandedItemViewThisMayDifferFootNote: 'This may be different to your available balance (you can check this in your account screen)',
          projectionsExpandedItemViewYouHaveOneCommitmentHeading: 'You have 1 commitment. This comes to',
          projectionsExpandedItemViewYouCanViewTheseFootNote: 'See what these are below',
          projectionsExpandedItemViewYouveTaggedHeading: 'You\'ve tagged',
          projectionsExpandedItemViewSingagEssentialSpendWithin31DaysSubHeading: 'as essential spend. Your tag is',
          projectionTagsContent1: 'as essential spend. Your tag is',
          projectionsExpandedItemViewYouCanChangeTheseFootNote: 'You can change these in Projection Settings',
          projectionTagsContent: 'as essential spend. Your top tags are',
          projectionsExpandedItemViewYourNextEarningHeading: 'The next cash coming into your account should be',
          projectionsExpandedItemViewThisIsMadeUpOfSubHeading: 'before your next earning. This is made up of',
          projectionsExpandedItemViewThisIsMadeUpOfWthin31DaysSubHeading: 'over the next 31 days. This is made up of',
          projectionSummaryHeaderNoWarningDays: 'B predicts you\'re good to go. You should have',
          projectionsExpandedItemViewSpinTheWheelFootNote: 'Spin the wheel to find out more',
          projectionsExpandedItemViewNoNextEarningHeading: 'There is no cash coming into your account in the next 31 days',
          projectionsExpandedItemViewYouCanReviewThisFootNote: 'See this in Projection Settings',
          projectionSummaryHeaderWarningDays: 'Looks like you\'ll go below your low balance limit of £50.00 on',
          projectionsExpandedItemViewCurrentBalance: 'Current Balance',
          projectionsExpandedItemViewCommitments: 'Commitments',
          projectionsExpandedItemViewEssentialSpend: 'Essential spend',
          projectionsExpandedItemViewLowBalanceLimit: 'Low balance limit',
        },
        "projectionSummary": {
          isCrunching: true,
          "last_updated": "2016-05-16T16:07:50.074+01:00",
          "thresholds": {
            "lower": {
              "amount": {
                "value": 50.0,
                "currency": "GBP"
              }
            }
          },
          "projection_periods": [
            {
              "period": {
                "from": {
                  "date": "2016-05-16T00:00:00.000+01:00",
                  "available_balance": {
                    "value": 4093.94,
                    "currency": "GBP"
                  }
                },
                "to": {
                  "date": "2016-05-10T23:59:59.000+01:00",
                  "available_balance": {
                    "value": 4093.94,
                    "currency": "GBP"
                  }
                }
              },
              "warning_days": [
                "11-11-206",
                "11-11-2015"
              ],
              "earnings": [
                {
                  "amount": {
                    "value": 2200.0,
                    "currency": "GBP"
                  },
                  "display_name": "BACS, Recruitment Solutions - Salary",
                  "when": "2016-05-11T13:00:00.000+01:00"
                }
              ],
              "projected_transactions": {
                "transactions": [],
                "total_amount": {
                  "value": -699.35,
                  "currency": "GBP"
                }
              },
              "essential_spend_info": {
                "essential_spend": [
                  {
                    "amount": {
                      "value": -439.13,
                      "currency": "GBP"
                    },
                    "display_name": "Shoes"
                  },
                ],
                "total_amount": {
                  "value": -3021.82,
                  "currency": "GBP"
                }
              }
            },
             {
              "period": {
                "from": {
                  "date": "2016-05-16T00:00:00.000+01:00",
                  "available_balance": {
                    "value": 4093.94,
                    "currency": "GBP"
                  }
                },
                "to": {
                  "date": "2016-05-10T23:59:59.000+01:00",
                  "available_balance": {
                    "value": 4093.94,
                    "currency": "GBP"
                  }
                }
              },
              "warning_days": [
                "11-11-206",
                "11-11-2015"
              ],
              "earnings": [
              ],
              "projected_transactions": {
                "transactions": [],
                "total_amount": {
                  "value": -699.35,
                  "currency": "GBP"
                }
              },
              "essential_spend_info": {
                "essential_spend": [
                  {
                    "amount": {
                      "value": -439.13,
                      "currency": "GBP"
                    },
                    "display_name": "Shoes"
                  },
                ],
                "total_amount": {
                  "value": -3021.82,
                  "currency": "GBP"
                }
              }
            }
          ]
        }
      };
      let instance = TestUtils.renderIntoDocument(<ProjectionScreen {...props} />);
      instance._getNextEarningContent();
      expect(instance.props.projectionSummary.projection_periods[1].earnings.length).toBe(0);
    });
  })
})
