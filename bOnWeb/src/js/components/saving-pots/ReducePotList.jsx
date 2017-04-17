/**
 * @module SavingPotsList
 */
const React = require('react');
const moment = require('moment');
const { PropTypes } = React;
const _ = require('lodash');
const config = require('../../config');

const SavingPotsActionCreator = require('../../actions/SavingPotsActionCreator');
const AnalyticsActionCreator = require('../../actions/AnalyticsActionCreator');
const CircularProgress = require('./CircularProgress');
const DeleteModal = require('./DeleteModal');

const ReducePotList = React.createClass({
  propTypes: {
    pot: PropTypes.object,
    id: PropTypes.number,
    getFull: PropTypes.object,
    onToggle: PropTypes.func,
    getKey: PropTypes.number,
    content: PropTypes.object,
  },
  getInitialState() {
    return {
      balanceValue: `£${this.props.pot.balance.value}`,
      showModal: false,
      getFull: this.props.getFull,
      diff: 0,
    };
  },
  componentDidMount() {
    this.props.onToggle(this.props.id, this.props.pot.balance.value, {});
  },
  _validateNumber(num) {
    const regex = /^(0|[1-9]\d*)(\.\d+)?$/;
    return regex.test(num);
  },
  _differenceObj() {
    let obj = {};
    if (this.state.diff === 0) {
      obj = {};
    } else if (this.state.diff < 0) {
      obj = {
        amount : {
          currency : this.props.content.savingPotCurrencyType,
          value : Math.abs(this.state.diff),
        },
        source_pot_id : this.props.content.SavingPotUnallocatedText,
        target_pot_id : this.props.pot.id,
      };
    } else {
      obj = {
        amount : {
          currency : this.props.content.savingPotCurrencyType,
          value : Math.abs(this.state.diff),
        },
        source_pot_id : this.props.pot.id,
        target_pot_id : this.props.content.SavingPotUnallocatedText,
      };
    }
    return obj;
  },
  checkNumber(e) {
    const etarget = e.replace(/[^\d\.]*/g, '');
    const len = etarget.length;
    const index = etarget.indexOf('.');
    const dots = etarget.split('.').length;
    const beforeDecimalLen = etarget.split('.')[0].length;
    const goalValue = (this.props.pot.goal.amount.value).toString();
    const goalValueBeforeDecimalLen = goalValue.split('.')[0].length;
    let isValid = true;
    if (beforeDecimalLen > 6) {
        isValid = false;
    }
    if (dots > 2) {
        isValid = false;
    }
    if (index >= 0) {
        const CharAfterdot = (len + 1) - index;
        if (CharAfterdot > 4) {
            isValid = false;
        }
    }
    if (beforeDecimalLen > goalValueBeforeDecimalLen) {
      isValid = false;
    }
    if (beforeDecimalLen === goalValueBeforeDecimalLen) {
      if (Number(goalValue) < Number(etarget)) {
        isValid = false;
      }
    }
    return isValid;
  },
  _onChange(e) {
    const isValid = this.checkNumber(e.target.value);
    let etarget;
    const goalValue = this.props.pot.goal.amount.value;
    const potBalanceValue = parseFloat(this.props.pot.balance.value);
    if (isValid) {
      etarget = e.target.value.replace(/[^\d\.]*/g, '');
      if (etarget === '') {
        this.setState({ balanceValue: '£', diff: potBalanceValue - 0 }, () => {
          this.props.onToggle(this.props.id, 0, this._differenceObj());
        });
      } else if (etarget === '.') {
        this.setState({ balanceValue: '£0.', diff: potBalanceValue - 0 }, () => {
            this.props.onToggle(this.props.id, 0, this._differenceObj());
        });
      } else if (etarget === '0.') {
        this.setState({ balanceValue: '£0.', diff: potBalanceValue - 0 }, () => {
            this.props.onToggle(this.props.id, 0, this._differenceObj());
        });
      } else if (etarget === '0.0') {
        this.setState({ balanceValue: '£0.0', diff: potBalanceValue - 0 }, () => {
          this.props.onToggle(this.props.id, 0, this._differenceObj());
        });
      } else if (etarget === '0.00') {
        this.setState({ balanceValue: '£0.00', diff: potBalanceValue - 0 }, () => {
          this.props.onToggle(this.props.id, 0, this._differenceObj());
        });
      } else if (Number(etarget) === 0) {
        this.setState({ balanceValue: '£0', diff: potBalanceValue - 0 }, () => {
          this.props.onToggle(this.props.id, 0, this._differenceObj());
        });
      } else {
        if (Number(etarget) >= Number(goalValue)) {
          this.setState({ balanceValue: `£${goalValue}`, diff: potBalanceValue - goalValue }, () => {
            this.props.onToggle(this.props.id, goalValue, this._differenceObj());
          });
        } else {
          this.setState({ balanceValue: `£${etarget}`, diff: potBalanceValue - parseFloat(Number(etarget)) }, () => {
            this.props.onToggle(this.props.id, Number(etarget), this._differenceObj());
          });
        }
      }
    }
  },
  _incrementTotal(e) {
    const balanceValue = Number(this.state.balanceValue.replace(/[^\d\.]*/g, ''));
    const value = parseFloat(balanceValue) + e;
    this.setState({ balanceValue: `£${value}`, diff: this.props.pot.balance.value - (parseFloat(balanceValue) + e) }, () => {
      const balanceValue = Number(this.state.balanceValue.replace(/[^\d\.]*/g, ''));
      this.props.onToggle(this.props.id, parseFloat(balanceValue), this._differenceObj());
    });
  },
  _incrementCountCal() {
    const balanceValue = Number(this.state.balanceValue.replace(/[^\d\.]*/g, ''));
    const potBalanceValue = parseFloat(balanceValue);
    if (potBalanceValue >= 0 && potBalanceValue <= 500) {
        this._incrementTotal(10);
    } else if (potBalanceValue > 500 && potBalanceValue <= 1000) {
        this._incrementTotal(50);
    } else if (potBalanceValue > 1000 && potBalanceValue <= 10000) {
        this._incrementTotal(100);
    } else {
        this._incrementTotal(1000);
    }
  },
  _increment () {
    const balanceValue = Number(this.state.balanceValue.replace(/[^\d\.]*/g, ''));
    const potBalanceValue = parseFloat(balanceValue);
    if (potBalanceValue < this.props.pot.goal.amount.value) {
      const temp = potBalanceValue;
      if ((temp % 10) === 0) {
        this._incrementCountCal();
      } else {
        this._incrementTotal(10 - (temp % 10));
      }
    }
  },
  _decrementTotal(e) {
    const balanceValue = Number(this.state.balanceValue.replace(/[^\d\.]*/g, ''));
    const value = parseFloat(balanceValue) - e;
    const potBalanceValue = parseFloat(balanceValue);
    this.setState({ balanceValue: `£${value}`, diff:  this.props.pot.balance.value - (potBalanceValue - e) }, () => {
      const balanceValue = Number(this.state.balanceValue.replace(/[^\d\.]*/g, ''));
      this.props.onToggle(this.props.id, parseFloat(balanceValue), this._differenceObj());
    });
  },
  _decrementCountCal () {
    const balanceValue = Number(this.state.balanceValue.replace(/[^\d\.]*/g, ''));
    const potBalanceValue = parseFloat(balanceValue);
    if (potBalanceValue > 0 && potBalanceValue <= 450) {
      this._decrementTotal(10);
    } else if (potBalanceValue > 450 && potBalanceValue <= 900) {
      this._decrementTotal(50);
    } else if (potBalanceValue > 900 && potBalanceValue <= 10000) {
      this._decrementTotal(100);
    } else {
      this._decrementTotal(1000);
    }
  },
  _decrement () {
    const balanceValue = Number(this.state.balanceValue.replace(/[^\d\.]*/g, ''));
    const potBalanceValue = parseFloat(balanceValue);
    if (potBalanceValue > 0) {
      const temp = potBalanceValue;
      if ((temp % 10) === 0) {
        this._decrementCountCal();
      } else {
        this._decrementTotal(temp % 10);
      }
    }
  },
  _onDelete() {
    const full = _.extend({}, this.props.getFull);
    delete full.pots[this.props.getKey];
    this.setState({
      getFull: full,
    });
    this.setState({ balanceValue: '£' }, () => {
      const balanceValue = Number(this.state.balanceValue.replace(/[^\d\.]*/g, ''));
      this.props.onToggle(this.props.id, balanceValue, {});
    });
    SavingPotsActionCreator.deletePotConnection(this.props.pot.id);
    // Record an analytics user event.
    AnalyticsActionCreator.track({
        path: '/user/experience/activity',
        action: 'Interacted',
        }, {
        description: config.analytics.analytics_action_saving_goal_adjust_delete_goal,
        event: 'click',
    });
  },
  _onPaste(e) {
    e.preventDefault();
  },
  _smClose() {
    this.setState({ showModal: false });
  },
  _smShow() {
    this.setState({ showModal: true });
  },
  render() {
    const pot = this.props.pot;
    const potBalance = Number(this.state.balanceValue.replace(/[^\d\.]*/g, ''));
    const potGoal = pot.goal.amount.value;
    const potName = pot.name;
    let content = this.props.content;
    let targetDate = moment((pot.goal.when)).subtract(1, 'months').format('MMMM YYYY');
    let deleteModal;
    let message = (
                    <div>
                      <p>{content.savingPotRejigDeletMessage1}<br/><br/>
                      {content.savingPotRejigDeletMessage2}</p>
                    </div>
                  );
    if (this.state.showModal) {
      deleteModal = <DeleteModal content={content} onHide={this._smClose} onDelete={this._onDelete} message={message} />;
    }
    return (
      <article className="row no-gutters adjust-pot">
        <div className="col-xs-8">
            <div className="row itemleft no-gutters">
                <div className="col-xs-4">
                    <CircularProgress potBalance={potBalance} potGoal={potGoal}/>
                </div>
                <div className="col-xs-7">
                    <h4>{potName}</h4>
                    <div className="pot-target-date">{content.savingpotTargetDate} {targetDate}</div>
                </div>
            </div>
        </div>
        <div className="col-xs-4">
          <div className="numberAdjust">
            <input type="text" value={this.state.balanceValue} className="form-control" id="potScheduleValue" placeholder="" onChange={this._onChange} onPaste={this._onPaste}/>
            <div className="btn-numberAdjust">
                <button onClick={this._decrement} type="button">
                    <img src="../images/b/icons/remove.svg" height="15" alt="" />
                </button>
                <button onClick={this._increment} type="button">
                    <img src="../images/b/icons/add.svg" height="15" alt="" />
                </button>
            </div>
        </div>
        <div className="deletePotButton">
          <button className="page-options opt-green" onClick={this._smShow}> <span className="icon icon-delete"></span>{content.savingPotDeletePotButton} </button>
        </div>
        </div>
        {deleteModal}
      </article>
    );
  },
});

module.exports = ReducePotList;
