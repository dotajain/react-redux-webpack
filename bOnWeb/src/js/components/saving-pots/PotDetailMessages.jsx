const React = require('react');
const { PropTypes } = React;
const NumberUtils = require('../../utils/NumberUtils');
const _ = require('lodash');

const PotDetailMessages = React.createClass({
  propTypes: {
    amountvalue: PropTypes.number,
    goal: PropTypes.number,
    balance: PropTypes.number,
    goalwhen: PropTypes.string,
    content: PropTypes.object,
  },

  conditionCheck(cYear, nYear, cMonth, nMonth, trgAmount, monthlyContribution, timeRequired, expMonth, expYear, expContribution, differentiator, expectedTimeSpan) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const content = this.props.content;
    if (this.props.goal !== 0 && this.props.goal !== null) {
      const goalValue = NumberUtils.appendCurrency('{}', this.props.goal);
      const mc = Number(monthlyContribution);
      const ec = Number(expContribution);
      const mcCurrency = NumberUtils.appendCurrency('{}', mc);
      const ecCurrency = NumberUtils.appendCurrency('{}', ec);
      const nDate = <span>{monthNames[nMonth]} {nYear}</span>;
      const exDate = <span>{monthNames[expMonth]} {expYear}</span>;
      if ((expYear <= cYear) && trgAmount > 0 && (expMonth < cMonth)) {
          let message = (<div><h5>{content.potMessage9Part1}</h5>
                          <p>
                          {content.potMessage9Part2} <strong>{goalValue}</strong> {content.potMessage9Part3} {exDate} {content.potMessage9Part4}<br/>
                          {content.potMessage9Part5}
                          </p></div>);
          return (<div>{message}</div>);
      } else {
        if (trgAmount <= 0 && this.props.goal > 0) {
        let message = (<div><h5>{content.potMessageHead1}</h5>
                        <p>
                          {content.potMessage1Part} <strong>{goalValue}</strong>!
                        </p></div>);
        return (<div>{message}</div>);
      } else {
        if (timeRequired >= 1200 || mc === 0) {
          let message = (<div><h5>{content.potMessageHead2}</h5>
                          <p>
                            {content.potMessage2Part1} <strong>{mcCurrency}</strong> {content.potMessage2Part2} <strong>{goalValue}</strong>,
                          {content.potMessage2Part3} <br/> {content.potMessage2Part4}</p>
                          </div>);
        return (<div>{message}</div>);
      } else {
        if (mc === ec) {
          let changedGoal;
              changedGoal = goalValue.replace(/[^\d\.]*/g, '');
              if (changedGoal === '') {
                changedGoal = 0;
              }
              const changedContributionAmount = (Number(changedGoal) / expectedTimeSpan);
              const changedTimeRequired = (Number(changedGoal) / Number(changedContributionAmount));
              changedGoal = (mc * changedTimeRequired) + this.props.balance;
          let finalChangedGoal = NumberUtils.appendCurrency('{}', parseFloat(changedGoal));
          let message = (<div><h5>{content.potMessageHead3}</h5>
                          <p>
                            {content.potMessage3Part1} <strong>{mcCurrency}</strong> {content.potMessage3Part5} {exDate} {content.potMessage3Part3} <strong>{finalChangedGoal}</strong>.<br/>
                             {content.potMessage3Part4}
                          </p></div>);
          return (<div>{message}</div>);
        } else if (mc < ec) {
          let message = (<div><h5>{content.potMessageHead4}</h5>
                          <p> {content.potMessage2Part1} <strong>{mcCurrency}</strong> {content.potDetailMessage4Part2} <strong>{goalValue}</strong> {content.potDetailMessage4Part3} {nDate}.<br/>
                             {content.potMessage4Part4} {exDate} {content.potMessage4Part5} <strong>{ecCurrency}</strong>.
                          </p>
                          </div>);
          return (<div>{message}</div>);
        } else {
          if (differentiator === 'ON_TARGET_BUT_OVER') {
            const newAmount = (Number(monthlyContribution) * Math.ceil(timeRequired)) + this.props.balance;
            const newAmountCurrency = NumberUtils.appendCurrency('{}', newAmount);
            let message = (<div><h5>{content.potMessageHead5}</h5>
                            <p>
                             {content.potMessage2Part1} {content.potDetailMessage5Part2} <strong>{mcCurrency}</strong> {content.potDetailMessage5Part3} <strong>{newAmountCurrency}</strong> {content.potDetailMessage5Part4} {nDate}.<br/>
                              {content.potDetailMessage5Part5} <strong>{ecCurrency}</strong> {content.potDetailMessage5Part6}
                            </p></div>);
            return (<div>{message}</div>);
          } else {
              let message = (<div><h5>{content.potMessageHead6}</h5> <p>{content.potMessage6Part1}</p></div>);
              return (<div>{message}</div>);
            }
          }
        }
      }
     }
    } else {
      let message = (<div><h5>{content.potMessageHead7}</h5> <p>{content.potMessage7Part1}</p></div>);
      return (<div>{message}</div>);
    }
  },
  contentHolder() {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    let contributionAmount;
    let totalTimeRequired = 0;
    let additionalMonths = 0;
    let additionalYears = 0;
    let newMonth;
    let expectedTimeSpan;
    let differentiator = 'SMASH_IT';

    const newTargetAmount = this.props.goal - this.props.balance;
    contributionAmount = this.props.amountvalue;
    if (contributionAmount === null) {
      contributionAmount = 0;
    }
    contributionAmount = Math.abs(contributionAmount.toFixed(2));
    if (contributionAmount === 0 || contributionAmount === null) {
      totalTimeRequired = 0;
    } else {
      totalTimeRequired = (newTargetAmount / contributionAmount);
    }
    additionalMonths = Math.ceil(totalTimeRequired % 12);
    additionalYears = (Math.ceil(totalTimeRequired) - additionalMonths) / 12;
    if ((currentMonth + additionalMonths) > 12) {
      additionalYears = additionalYears + 1;
    }
    if ((Number(new Date(this.props.goalwhen).getFullYear())) === currentYear) {
      if ((Number(new Date(this.props.goalwhen).getMonth())) === currentMonth) {
        if (totalTimeRequired === 1) {
          newMonth = (currentMonth);
        } else {
          newMonth = (currentMonth + additionalMonths);
        }
      } else {
        newMonth = (currentMonth + additionalMonths);
      }
    } else {
      newMonth = (currentMonth + additionalMonths);
    }

    const newYear = (currentYear + additionalYears);
    if (newMonth >= 11) {
      newMonth = newMonth - 13;
      if (newMonth < 0) {
         if (newMonth === -1) {
          newMonth = 11;
        }
        if (newMonth === -2) {
          newMonth = 10;
        }
      }
    }

    const expectedFullDate = new Date(this.props.goalwhen);
    const expectedMonth = expectedFullDate.getMonth();
    const expectedYear = expectedFullDate.getFullYear();

    expectedTimeSpan = Number(((expectedYear - currentYear) * 12) + (expectedMonth - currentMonth) + 1);
    if (expectedTimeSpan <= 0) {
      expectedTimeSpan = 1;
    }
    let expextedContribution = Math.abs((newTargetAmount / expectedTimeSpan));
    if (_.isInteger(expextedContribution)) {
      expextedContribution = expextedContribution.toFixed(2);
    } else {
      expextedContribution = (Math.ceil(expextedContribution * 100)) / 100;
      expextedContribution = expextedContribution.toFixed(2);
    }
    const newMonthYearString = `${newMonth} ${newYear}`;
    const expectedMonthYearString = `${expectedMonth} ${expectedYear}`;

    if (newMonthYearString === expectedMonthYearString) {
      differentiator = 'ON_TARGET_BUT_OVER';
    } else {
      differentiator = 'SMASH_IT';
    }

    return (this.conditionCheck(currentYear, newYear, currentMonth, newMonth, newTargetAmount, contributionAmount, totalTimeRequired, expectedMonth, expectedYear, expextedContribution, differentiator, expectedTimeSpan));
  },
  render() {
    return (<div>{this.contentHolder()}</div>);
  },
});

module.exports = PotDetailMessages;
