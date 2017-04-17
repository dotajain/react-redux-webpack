/**
 * @module SavingPotsList
 */
const React = require('react');
const { PropTypes } = React;
const moment = require('moment');
const config = require('../../config');
const SavingPotsActionCreator = require('../../actions/SavingPotsActionCreator');
const AnalyticsActionCreator = require('../../actions/AnalyticsActionCreator');
const PotDetailMessages = require('./PotDetailMessages');
const CircularProgress = require('./CircularProgress');

const SavingPotsList = React.createClass({
  propTypes: {
    pot: PropTypes.object,
    content: PropTypes.object,
  },
  _getCurrentPotPage() {
    SavingPotsActionCreator.getPotDetail(this.props.pot.id);
    // Record an analytics user event.
      AnalyticsActionCreator.track({
          path: '/user/experience/activity',
          action: 'Interacted',
          }, {
          description: config.analytics.analytics_name_saving_goal_viewer,
          event: 'click',
      });
  },
  render() {
    let content = this.props.content;
    const pot = this.props.pot;
    let targetDate = moment((pot.goal.when)).format('MMMM YYYY');
    const goalWhen = pot.goal.when;
    const potBalance = parseFloat(pot.balance.value);
    const potGoal = parseFloat(pot.goal.amount.value);
    const potName = pot.name;
    const potScheduleValue = parseFloat(pot.schedule.recurrence.amount.value);

    return (
      <article className="row no-gutters" onClick={this._getCurrentPotPage}>
        <div className="col-xs-3 text-center">
          <CircularProgress size={this.donutSize} potBalance={potBalance} potGoal={potGoal}/>
        </div>
        <div className="col-xs-9">
          <h4>{potName}</h4>
          <div className="pot-target-date">{content.savingpotTargetDate} {targetDate}</div>
          <div className="potMessages">
          <PotDetailMessages
            amountvalue={potScheduleValue}
            goal={potGoal}
            goalwhen={goalWhen}
            balance={potBalance}
            content={content}
          />
          </div>
        </div>
      </article>
    );
  },
});


module.exports = SavingPotsList;
