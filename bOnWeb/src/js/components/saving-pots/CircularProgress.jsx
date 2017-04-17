/**
 * @module CircularProgress
 */
const React = require('react');
const { PropTypes } = React;
const NumberUtils = require('../../utils/NumberUtils');
const DonutChart = require('../common/DonutChart');

const CircularProgress = React.createClass({
  propTypes: {
    potBalance: PropTypes.number,
    potGoal: PropTypes.number,
    donutSize: PropTypes.number,
  },

  _calculatePotPercentage() {
    let progressPercentage;
    if (this.props.potBalance > 0) {
      progressPercentage = Math.floor((this.props.potBalance / this.props.potGoal) * 100);
    } else {
      progressPercentage = 0;
    }
    return progressPercentage;
  },
  render() {
    const potBalance = this.props.potBalance;
    const potGoal = this.props.potGoal;

    return (
      <div className="circularProgress text-center">
        <div className="donut">
          <DonutChart size={this.donutSize} value={this._calculatePotPercentage()} />
          <p><strong>{NumberUtils.appendCurrency('{}', potBalance)}</strong> of <strong>{NumberUtils.appendCurrency('{}', potGoal)}</strong></p>
        </div>
      </div>
    );
  },
});

module.exports = CircularProgress;
