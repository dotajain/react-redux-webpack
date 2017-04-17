/**
 * @module ProgressOnTable
*/

const React = require('react');
const { PropTypes } = React;
const moment = require('moment');

const ProgressOnTable = React.createClass({
  propTypes: {
    rowData: PropTypes.object,
  },
  render() {
    const difference = this.props.rowData.difference;
    const currentMonth = Math.abs(parseFloat(this.props.rowData.current_month));
    const lastDateOfTheMonth = Number(moment().endOf('month').format('DD'));
    const currentDate = Number(moment().format('DD'));
    let className;
    let percentage;
    let progressTemplate;
    if (this.props.rowData.last_month !== undefined) {
      const lastMonth = Math.abs(parseFloat(this.props.rowData.last_month));
      const valueTillToday = currentDate * (lastMonth / lastDateOfTheMonth);
      if (currentMonth === 0) {
        percentage = 0;
      } else if (lastMonth === 0) {
        percentage = 101;
      } else {
        percentage = Math.round((currentMonth * 100) / lastMonth);
      }

      if (currentMonth > lastMonth) {
        className = 'progress-bar progress-bar-danger';
      } else if (currentMonth <= valueTillToday) {
        className = 'progress-bar progress-bar-success';
      } else {
        className = 'progress-bar progress-bar-warning';
      }
    }
   if (this.props.rowData.target_amount === 0) {
      className = 'progress-bar progress-bar-striped';
      percentage = 100;
   } else if (this.props.rowData.target_amount) {
      const target_amount = parseFloat(this.props.rowData.target_amount);
      const valueTillToday = currentDate * (target_amount / lastDateOfTheMonth);
      if (difference) {
        percentage = Math.round((currentMonth * 100) / target_amount);
      } else {
        percentage = null;
      }

      if (!percentage) {
        className = 'progress-bar progress-bar-striped';
      } else if (currentMonth > target_amount) {
        className = 'progress-bar progress-bar-danger';
      } else if (currentMonth <= valueTillToday) {
        className = 'progress-bar progress-bar-success';
      } else {
        className = 'progress-bar progress-bar-warning';
      }
    }

    if (!percentage) {
      percentage = 0;
    } else if (percentage >= 100) {
      percentage = 100;
    } else {
      percentage;
    }
    if (this.props.rowData.name === 'Untagged') {
      progressTemplate = '';
    } else {
      progressTemplate = (<div className="progress">
                              <div className={className} role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style={{ width: `${percentage}%` }}>
                                <span className="sr-only">45% Complete</span>
                              </div>
                        </div>);
    }
    return (
      <div>
        {progressTemplate}
      </div>
    );
	},
});

module.exports = ProgressOnTable;
