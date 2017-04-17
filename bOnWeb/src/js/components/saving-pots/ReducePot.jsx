/**
 * @module ReducePot
 */
const React = require('react');
const { PropTypes } = React;
const _ = require('lodash');
const config = require('../../config');

const ReducePotList = require('./ReducePotList');
const HashcodeUtils = require('../../utils/HashcodeUtils');

const SavingPotsActionCreator = require('../../actions/SavingPotsActionCreator');
const AnalyticsActionCreator = require('../../actions/AnalyticsActionCreator');
const NumberUtils = require('../../utils/NumberUtils');
const AccountsStore = require('../../stores/AccountsStore');
const BasicModal = require('../common/modals/ModalB');

let initialUnallocatedAmount;
const interPotData = {
  source_id : '',
  transactions : [],
};

const ReducePot = React.createClass({
  propTypes: {
    pots: PropTypes.array,
    getPotPageHandleClick: PropTypes.func,
    content: PropTypes.object,
    accountClass: PropTypes.string,
    accDetails: PropTypes.object,
    getFull: PropTypes.object,
    getSelectedAccountID: PropTypes.string,
    interPotError: PropTypes.object,
  },

  getInitialState() {
    return {
      totalAllocatedValue: null,
      currentBalanceValue: this._getCurrentBalance(),
      balance: null,
      progressColor: 'red',
      selections: [],
      isValid: 'hide',
      accountNumber: this._getAccountNumber(),
      errorModal: false,
    };
  },
  componentWillMount() {
    if (!_.isEmpty(this.props.interPotError)) {
      this.setState({ errorModal: true });
    }
  },
  componentDidMount() {
    this._updateBalanceBalue();
  },
  _updateBalanceBalue() {
    const selections = this.state.selections;
    initialUnallocatedAmount = this.state.currentBalanceValue - selections.reduce((a, b) => a + b, 0);
    this.setState({
      totalAllocatedValue: selections.reduce((a, b) => a + b, 0),
      balance: this.state.currentBalanceValue - selections.reduce((a, b) => a + b, 0),
    });
  },
  _onChildToggle(id, selected, obj) {
    const selections = this.state.selections;
    selections[id] = selected;
    if (_.isEmpty(obj)) {
      delete interPotData.transactions[id];
    } else {
      interPotData.transactions[id] = obj;
    }
    this.setState({ selections: selections });
    this.setState({
      totalAllocatedValue: selections.reduce((a, b) => a + b, 0),
      balance: this.state.currentBalanceValue - selections.reduce((a, b) => a + b, 0),
    });
    const source_id = HashcodeUtils.getSourceId(interPotData);
    interPotData.source_id = source_id;
  },
 _getCurrentBalance() {
   let currentBalance;
    const accDetails = this.props.accDetails;
      if (accDetails && accDetails.balances) {
        _.map(accDetails.balances, balance => {
              switch (balance.type) {
                  case 'current':
                      currentBalance = balance.amount.value;
                      break;
              }
              return false;
          });
      }
      return currentBalance;
  },
  _handleInterPot() {
    const obj = {
        source_id : interPotData.source_id,
        transactions : [],
      };
    _.map(interPotData.transactions, item => {
      if (item) {
        obj.transactions.push(item);
      }
    });
    SavingPotsActionCreator.getInterPotData(obj);
    // Record an analytics user event.
    AnalyticsActionCreator.track({
        path: '/user/experience/activity',
        action: 'Interacted',
        }, {
        description: config.analytics.analytics_name_saving_goal_list,
        event: 'click',
    });
  },
  _getLeftProgress() {
    let leftProgressbar;
    if (this.state.balance || this.state.balance === 0) {
      if (this.state.balance >= 0) {
        leftProgressbar = (<div className="vertical-progress">
                              <span className="percentage green" style={{ height: '25%' }}></span>
                              <div className="rejigMessage">
                                <div>{this.props.content.savingpotreducemessage2} <strong>{NumberUtils.appendCurrency('{}', Math.abs(this.state.balance))}</strong></div>
                              </div>
                            </div>);
      } else {
        let percentage = Math.round(Math.abs(this.state.balance) / Math.abs(initialUnallocatedAmount) * 100);
        if (percentage > 100) {
          percentage = 100;
        }
        if (Math.abs(initialUnallocatedAmount) === Math.abs(this.state.balance)) {
          leftProgressbar = (<div className="vertical-progress">
                              <span className="percentage red" style={{ height: '100%' }}></span>
                              <div className="rejigMessage">
                                <div>{this.props.content.savingpotreducemessage1} <strong>{NumberUtils.appendCurrency('{}', Math.abs(this.state.balance))}</strong></div>
                              </div>
                            </div>);
        } else {
          leftProgressbar = (<div className="vertical-progress">
                              <span className="percentage red" style={{ height: `${percentage}%` }}></span>
                              <div className="rejigMessage">
                                <div>{this.props.content.savingpotreducemessage1} <strong>{NumberUtils.appendCurrency('{}', Math.abs(this.state.balance))}</strong></div>
                              </div>
                            </div>);
        }
      }
      return leftProgressbar;
    }
  },
  _getAccountNumber() {
    const seletedAccountData = AccountsStore.getAccountDetail(this.props.getSelectedAccountID);
    const accountNumber = _.last(_.split(seletedAccountData.number, '-'));
    return accountNumber;
  },
  _closeAlertModal() {
    SavingPotsActionCreator.closetErrorModal();
    this.setState({ errorModal: false });
  },
  _alertEditErrorModal() {
    if (this.state.errorModal) {
      return (<BasicModal>
                <div className="modal_content">
                  <h3>{this.props.interPotError.error.message}</h3>
                  <p>
                    {this.props.content.potSupportMessage1}<br/>
                    {this.props.content.potSupportMessage2}<br/>
                    {this.props.interPotError.error.quoteId}
                  </p>
                </div>
                  <div className="modal_footer">
                    <button onClick={this._closeAlertModal}>{this.props.content.ok}</button>
                </div>
              </BasicModal>);
    } else {
      return false;
    }
  },
  render() {
    let content = this.props.content;
    const pots = this.props.pots;
    const potContent = pots.map((pot, i) => <ReducePotList content={content} getFull={this.props.getFull} getKey={i} key={i} getAccountColor="green" pot={pot} id={i} selected={this.state.selections[i]} onToggle={this._onChildToggle} />);
    const totalAllocatedValue = NumberUtils.appendCurrency('{}', Number(this.state.totalAllocatedValue));
    const currentBalanceValue = NumberUtils.appendCurrency('{}', Number(this.state.currentBalanceValue));
    let saveButton;
    if (this.state.balance || this.state.balance === 0) {
      if (this.state.balance >= 0) {
        saveButton = <button className="page-options" onClick={this._handleInterPot}>{this.props.content.savingDone}</button>;
      }
    }
    return (
     <div className="main-container from-top">
     {this._alertEditErrorModal()}
     <div className={`reducePot full-height sp ${this.props.accountClass}`}>
		<div className="savingpot_component__header row no-gutters">
			<div className="col-xs-3 text-left">
				<button className="page-options" onClick={this.props.getPotPageHandleClick}>
					{content.savingsPotBackButton}
				</button>
			</div>
			<div className="col-xs-6 text-center">
				<div className="savingpot_component__header--title">
					{content.savingPotReduce}
				</div>
			</div>
			<div className="col-xs-3 text-right">
				{saveButton}
			</div>
		</div>
    <div className="scroll-wrapper">
			<div className="saving-pots content-wrapper">
					<div className="reducePot__body">
						<div className="row">
							<div className="col-xs-4">
								{this._getLeftProgress()}
								<div className="balances">
									<div className="balances-item">
										<p>{content.savingpotcurrentbank} {this.state.accountNumber}</p>
										<div className="balance">{currentBalanceValue}</div>
									</div>
									<div className="balances-item">
										<p>{content.savingpottotalallocated}</p>
										<div className="balance">{totalAllocatedValue}</div>
									</div>
								</div>
							</div>
							<div className="col-xs-8">
								<div className="row reduce--header">
									<div className="col-xs-6 text-left">
										<h3>{content.savingpotTitle}</h3>
									</div>
									<div className="col-sxs-4 text-center">
										<h3>{content.savingpotAllocatedTitle}</h3>
									</div>
                  <div className="col-sxs-2 text-center"></div>
								</div>
								<div className="reduce__content">
									{potContent}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
     </div>
    );
  },
});

module.exports = ReducePot;
