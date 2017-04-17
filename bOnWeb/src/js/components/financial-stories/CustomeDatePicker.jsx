/**
 * @module NBAComponent
 */
const React = require('react');
const { PropTypes } = React;
const DateTimeField = require('react-bootstrap-datetimepicker');
const moment = require('moment');
const ReactDOM = require('react-dom');

const CustomeDatePicker = React.createClass({
	propTypes: {
		content: PropTypes.object,
		data: PropTypes.object,
		nbaFlag: PropTypes.func,
		onMenuSelect : PropTypes.func,
		fromDate: PropTypes.string,
		toDate: PropTypes.object,
		nextAccountDetails:PropTypes.bool,
	},

	getInitialState() {
		return {
            status: null,
            open: false,
			startMinDate : moment(),
			when : moment().format('YYYY-MM-DD'),
			mode: 'date',
			inputFormat: 'DD MMM YY',
			format: 'YYYY-MM-DD',
			minDate: moment().subtract(60, 'months'),
			maxDate: moment(),
			toDate:this.getToDate(),
        };
	},

	componentDidMount() {
		ReactDOM.findDOMNode(this.refs.customDatePicker).children[2].children[0].readOnly = true;
		ReactDOM.findDOMNode(this.refs.customDatePicker).children[2].addEventListener('click', this.onFromDateChildClick);
		ReactDOM.findDOMNode(this.refs.toDatePicker).children[2].addEventListener('click', this.onToDateChildClick);
	},

	componentWillReceiveProps() {
		if (this.props.nextAccountDetails) {
			this.setState({ toDate:moment(), when: moment() });
		}
	},
	onFromDateChildClick () {
		setTimeout(() => {
		ReactDOM.findDOMNode(this.refs.customDatePicker).children[0].addEventListener('click', this.onFromDateCloseClick);
		}, 100);
	},
	onToDateChildClick () {
		setTimeout(() => {
		ReactDOM.findDOMNode(this.refs.toDatePicker).children[0].addEventListener('click', this.onToDateCloseClick);
		}, 100);
	},

	onFromDateCloseClick () {
		if (moment(this.props.fromDate).isValid()) {
			this.setState({ when: moment(this.props.fromDate) });
		} else {
			this.setState({ when: moment() });
		}
	},

	onToDateCloseClick () {
		this.setState({ toDate: moment(this.getToDate()) });
	},

	onSelectRange(date, isHideDiv) {
		this.props.onMenuSelect(date, this.props.toDate);
		if (isHideDiv !== false) {
			this.showHide();
		}
		const selectedDate = moment(moment(date).add(1, 'days').format('YYYY-MM-DD'));
		this.setState({ minDate: selectedDate });
	},

	getToDate() {
		return this.props.toDate.format('YYYY-MM-DD');
	},

	fromDateChange(date) {
		this.onSelectRange(date);
	},

	toDateChange(date) {
		let _fromDate = this.props.fromDate;
		_fromDate = moment(_fromDate, 'DD MMM YY').isValid() ? moment(_fromDate, 'DD MMM YY') : _fromDate;
		this.props.onMenuSelect(_fromDate, moment(date));
		const selectedDate = moment(date);
		this.setState({ maxDate: selectedDate });
	},

	showHide() {
		if (this.state.open !== false) {
			this.setState({
				open: false,
			});
		} else {
			this.setState({
				open: true,
			});
		}
	},

	showHideDiv() {
		if (this.state.open !== false) {
			return 'period-box displayBlock';
		} else {
			return 'displayNone';
		}
	},
	closeDatePiker () {
		this.setState({ open: false });
	},
	render() {
		let showCalanderBackdropClass = 'hide';
		if (this.state.open) {
			showCalanderBackdropClass = 'custom-date-picker-backdrop';
		}
		return (
			<div className="period-container">
				<div className="date-timePicker">
					<span>{this.props.content.Showing} </span>
					<span className="customeDatePicker" onClick={this.showHide}>{this.props.fromDate} </span>
					<span>
					{this.props.content.Upto}
					</span>
					<span>
						<div className="choose-date">
							<DateTimeField
								ref="toDatePicker"
								maxDate={moment()}
								minDate={this.state.minDate}
								dateTime={this.state.toDate}
								format={this.state.format}
								viewMode={this.state.mode}
								inputFormat={this.state.inputFormat}
								onChange={this.toDateChange}
							/>
						</div>
					</span>
				</div>

				<div className={this.showHideDiv()}>
					<div className="period-options">
						<a href="#" onClick={() => this.onSelectRange('1 week')}>
							<span>1 week</span>
						</a>
						<a href="#" onClick={() => this.onSelectRange('2 weeks')}>
							<span>2 weeks</span>
						</a>
						<a href="#" onClick={() => this.onSelectRange('1 month')}>
							<span>1 month</span>
						</a>
						<a href="#" onClick={() => this.onSelectRange('3 months')}>
							<span>3 months</span>
						</a>
						<a href="#" onClick={() => this.onSelectRange('6 months')}>
							<span>6 months</span>
						</a>
						<div className="period-calender">
							<label>
								<DateTimeField className="date-timePicker"
									ref="customDatePicker"
									maxDate={this.state.maxDate}
									minDate={moment().subtract(60, 'months')}
									dateTime={this.state.when}
									format={this.state.format}
									viewMode={this.state.mode}
									inputFormat={this.state.inputFormat}
									onChange={this.fromDateChange}
								/>
							</label>
						</div>
					</div>
				</div>
				<button type="button" onTouchEnd={this.closeDatePiker} onClick={this.closeDatePiker} className={showCalanderBackdropClass}></button>
			</div>
		);
	},
});

module.exports = CustomeDatePicker;
