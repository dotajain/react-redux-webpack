/**
 * @module TransactionHistoryDateRangePicker
 */

const React = require('react');
const { PropTypes } = React;
const DateRangePicker = require('react-bootstrap-daterangepicker');
const moment = require('moment');
const BS = require('react-bootstrap');

const TransactionHistoryDateRangePicker = React.createClass({
	propTypes:{
    onTransactionDateChange: PropTypes.func,
    ranges:PropTypes.bool,
		content: PropTypes.object,
  },
  getInitialState() {
		return {
			ranges: {
				'1 week': [moment().subtract(6, 'days'), moment()],
        '2 weeks': [moment().subtract(13, 'days'), moment()],
				'1 month': [moment().subtract(1, 'months'), moment()],
        '3 months': [moment().subtract(3, 'months'), moment()],
        '6 months': [moment().subtract(6, 'months'), moment()],
			},
			startDate: moment().subtract(3, 'months'),
      startLabel:this.props.content.threeMonths,
			endDate: moment(),
		};
	},
	onApply (event, picker) {
		this.setState({
			startDate: picker.startDate,
			endDate: picker.endDate,
      startLabel: picker.chosenLabel,
		});
    this.props.onTransactionDateChange(picker.startDate, picker.endDate);
	},
	render () {
		const start = this.state.startDate.format('DD-MMM');
		const end = this.state.endDate.format('DD-MMM');
		let label = this.state.startLabel; // start; // let label = start + ' - ' + end;
		if (this.props.ranges) {
        if (start === end) {
          label = this.state.startLabel;// start;
        }

        if (this.state.startLabel === this.props.content.customRange) {
           label = this.state.startDate.format('DD MMM YY');
        }
    } else {
      label = this.state.endDate.format('DD MMM YY');
    }
		return (
		<div>
      <DateRangePicker onShowCalendar={this.onShowCalendar} singleDatePicker={!this.props.ranges && true} minDate={moment().subtract(5, 'years')} maxDate={moment()} startDate={this.state.startDate} endDate={this.state.endDate} ranges={this.props.ranges && this.state.ranges} onApply={this.onApply}>
							<BS.Button className="selected-date-range-btn" style={{ width:'100%' }}>
								<div className="pull-left">
									<span>
										{label}
									</span>
									<span className="caret"></span>
								</div>
							</BS.Button>
						</DateRangePicker>
    </div>
		);
	},
});

module.exports = TransactionHistoryDateRangePicker;
