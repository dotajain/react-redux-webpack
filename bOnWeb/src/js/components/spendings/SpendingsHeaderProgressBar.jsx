/**
 * @module SpendingsHeaderProgressBar
*/

const React = require('react');
const { PropTypes } = React;
const _ = require('lodash');
const moment = require('moment');

const SpendingsHeaderProgressBar = React.createClass({
  propTypes: {
    content: PropTypes.object,
    leftValue: PropTypes.number,
    rightValue: PropTypes.number,
    spendingProgressText: PropTypes.string,
  },
  getInitialState() {
    return {
      percentage: 0,
    };
  },

  componentWillMount () {
    const leftValue = Math.abs(this.props.leftValue);
    const rightValue = Math.abs(this.props.rightValue);
    const percentageCalculater = Math.round((leftValue * 100) / rightValue);
    setTimeout(() => {
      this.setState({ percentage: percentageCalculater });
    }, 100);
  },

  _totalDaysLeft() {
    const currentDate = moment(moment().format('DD/MM/YYYY'), 'DD/MM/YYYY');
    const lastDateOfTheMonth = moment(moment().endOf('month').format('DD/MM/YYYY'), 'DD/MM/YYYY');
    return lastDateOfTheMonth.diff(currentDate, 'days');
  },
  render() {
    const content = this.props.content;
    const leftValue = Math.abs(this.props.leftValue);
    const rightValue = Math.abs(this.props.rightValue);

    const lastDateOfTheMonth = Number(moment().endOf('month').format('DD'));
    const currentDate = Number(moment().format('DD'));

    const valueTillToday = currentDate * (rightValue / lastDateOfTheMonth);

    let percentage = this.state.percentage;
    let className;
    let icon;

    if (leftValue > rightValue) {
      className = 'progress-bar progress-bar-danger';
      icon = <span className="icon icon-attention"></span>;
    } else if (leftValue <= valueTillToday) {
      className = 'progress-bar progress-bar-success pot-green';
    } else {
      className = 'progress-bar progress-bar-warning';
    }

    if (_.isNaN(percentage)) {
      percentage = 0;
    }
    if (percentage >= 100) {
      percentage = 100;
    } else {
      percentage;
    }

    let fadeClass = 'fade';
    let shadowClass;
    if (percentage > 20) {
      fadeClass = 'fade in';
    }
    if (percentage > 87) {
      shadowClass = 'shadow';
    }

    let message = content.spendingProgressText1;
    if (this.props.spendingProgressText) {
      message = this.props.spendingProgressText;
    }
    return (
      <div className="spendings-progressbar">
          <div className="progress">
            <span>{message}</span>
            <div className={`${className} ${shadowClass}`} role="progressbar" style={{ width: `${percentage}%` }} ref="progressBar">
              <span className={fadeClass}>{content.spendingHeaderThisMonthText}</span>
              {icon}
            </div>
          </div>
          <div>
            <h6><span className="icon icon-calendar"></span>{this._totalDaysLeft()} {content.spendingDaysLeftText}</h6>
          </div>
      </div>
    );
	},
});

module.exports = SpendingsHeaderProgressBar;
