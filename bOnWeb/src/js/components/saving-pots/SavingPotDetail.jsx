/**
 * @module SavingPotDetail
 */
const React = require('react');
const { PropTypes } = React;
const moment = require('moment');
const config = require('../../config');
const NumberUtils = require('../../utils/NumberUtils');

const DeleteModal = require('./DeleteModal');
const SavingPotsActionCreator = require('../../actions/SavingPotsActionCreator');
const AnalyticsActionCreator = require('../../actions/AnalyticsActionCreator');
const PotDetailMessages = require('./PotDetailMessages');
const CircularProgress = require('./CircularProgress');
const PaymentsActionCreator = require('../../actions/PaymentsActionCreator');

const SavingPotDetail = React.createClass({
  propTypes: {
    potDetailsData: PropTypes.any.isRequired,
    getPotPageHandleClick: PropTypes.func,
    getSelectedAccountID: PropTypes.string,
    content: PropTypes.object,
    accountClass: PropTypes.string,
  },
  getInitialState() {
    return { showModal: false };
  },
  _editPot() {
    SavingPotsActionCreator.getCreateSavingPotPage(this.props.potDetailsData);
    // Record an analytics user event.
      AnalyticsActionCreator.track({
          path: '/user/experience/activity',
          action: 'Interacted',
          }, {
          description: config.analytics.analytics_action_saving_goal_edit_edit_goal,
          event: 'click',
      });
  },
  _handleMoveMoney() {
    //  - Move money - transfer to payment page
    const data = {
      id: this.props.getSelectedAccountID,
      potId: this.props.potDetailsData.id,
      amt: 0,
      isFrom: false,
    };
    SavingPotsActionCreator.handleMoveMoney(data);
    PaymentsActionCreator.navigateToWebTask('WEB-OPEN-PAYMENTS');
    this.props.getPotPageHandleClick();
    // Record an analytics user event.
      AnalyticsActionCreator.track({
          path: '/user/experience/activity',
          action: 'Interacted',
          }, {
          description: config.analytics.analytics_action_saving_goal_list_go_to_payments,
          event: 'click',
      });
  },
  _smClose() {
    this.setState({ showModal: false });
  },
  _smShow() {
    this.setState({ showModal: true });
  },
  _onDelete() {
      SavingPotsActionCreator.deletePotConnection(this.props.potDetailsData.id);
      SavingPotsActionCreator.getPotData();
      // Record an analytics user event.
      AnalyticsActionCreator.track({
          path: '/user/experience/activity',
          action: 'Interacted',
          }, {
          description: config.analytics.analytics_action_saving_goal_viewer_delete_goal,
          event: 'click',
      });
  },
  render() {
    let content = this.props.content;
    const pot = this.props.potDetailsData;
    let targetDate = moment(pot.goal.when).format('MMMM YYYY');
    const goalWhen = pot.goal.when;
    const potBalance = parseFloat(pot.balance.value);
    const potGoal = parseFloat(pot.goal.amount.value);
    const potGoalCurrency = NumberUtils.appendCurrency('{}', potGoal);
    const potName = pot.name;
    const potScheduleValue = parseFloat(pot.schedule.recurrence.amount.value);
    const potScheduleValueCurrency = NumberUtils.appendCurrency('{}', potScheduleValue);
    let deleteModal;
    let message = (
                    <div>
                      <p>{content.savingPotDetailDeletMessage1}<br/>
                      {content.savingPotDetailDeletMessage2}</p>
                    </div>
                  );
    if (this.state.showModal) {
      deleteModal = <DeleteModal content={content} onHide={this._smClose} onDelete={this._onDelete} message={message} />;
    }
    return (
		<div className="main-container from-top">
			<div className={`potDetails sp ${this.props.accountClass}`}>
				<div className="savingpot_component__header row no-gutters">
					<div className="col-xs-3 text-left">
						<button className="page-options" onClick={this.props.getPotPageHandleClick}>
								{content.savingDone}
						</button>
					</div>
					<div className="col-xs-6 text-center">
						<div className="savingpot_component__header--title">
							{potName}
						</div>
					</div>
					<div className="col-xs-3 text-right">
					</div>
				</div>

				<div className="potDetails--body">
					<article className="row">
						<div className="col-sm-4 text-center">
							<CircularProgress potBalance={potBalance} potGoal={potGoal}/>
						</div>
						<div className="col-sm-8">
							<h2>
								{content.savingpotAimingBal} <strong>{potGoalCurrency}</strong> {content.savingpotByBal} <strong>{targetDate}</strong> {content.savingpotByputtingAway} <strong>{potScheduleValueCurrency}</strong> {content.savingpotAmonth}.
							</h2>
							<div className="potMessages">
								<PotDetailMessages
									amountvalue={potScheduleValue}
									goal={potGoal}
									goalwhen={goalWhen}
									balance={potBalance}
									content={content}
								/>
							</div>
							<div className="detailButtons">
								<button type="button" className="page-options opt-green border" onClick={this._handleMoveMoney}> <i className="icon icon-move"></i> {content.savingPotMoveMoneyButton} </button>
								<button type="button" className="page-options opt-green border" onClick={this._editPot}> <i className="icon icon-edit"></i> {content.savingPotEditPotButton} </button>
								<button type="button" className="page-options opt-green border" onClick={this._smShow}> <i className="icon icon-delete"></i>{content.savingPotDeletePotButton} </button>
							</div>
						</div>
					</article>
				</div>
				{deleteModal}
			</div>
		</div>
		);
	},
});

module.exports = SavingPotDetail;
