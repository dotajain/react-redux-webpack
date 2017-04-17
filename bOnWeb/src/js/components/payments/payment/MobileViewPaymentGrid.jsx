/**
 * @module MobileViewPaymentGrid
 */
const React = require('react');
const PaymentsStore = require('../../../stores/PaymentsStore');
const { PropTypes } = React;
const config = require('../../../config');
const DateUtils = require('../../../utils/DateUtils');
const moment = require('moment');
const NumberUtils = require('../../../utils/NumberUtils');
const StringConstant = require('../../../constants/StringConstants');
const MobileViewPaymentGrid = React.createClass({
	propTypes: {
        rowData: PropTypes.object,
        content: PropTypes.object,
        metadata: PropTypes.object,
        data: PropTypes.array,
		rowClick: PropTypes.func,
    },
	getDefaultProps() {
		return { 'data': [] };
	},
	getInitialState() {
        return {
			show: false,
			rowData: {},
        };
    },
    // Set rowData when row clicks
	rowClick(e) {
		this.setState({ rowData: e, show: true });
		this.props.rowClick(e);
	},
	render() {
		let data = this.props.data !== undefined && this.props.data.map(data => {
			let click = this.rowClick.bind(this, data);
			const fromCSS = PaymentsStore.getColorFromAccount(data.fromAccId);
			// const accId = PaymentsStore.getAccIDByAccNumber(data.accNumber);
		//	const toCSS = PaymentsStore.getColorFromAccount(accId);
			let when = DateUtils.getMomentFromDateString(data.when);
            when = moment(when).format(config.dateFormatTimeline);
			return (<div>{!this.state.show && <div className="custom-row-card" onClick={click}>
				<div><h5 className={fromCSS}>{data.from}</h5><span className="name">{data.type}</span></div>
				<div className = {'data-to'}>{data.to}</div>
				<div><span className = "amount">{this.props.content.amount}</span> {NumberUtils.decimalFormat(data.amount, 3, true) }</div>
						<div><span className = "next-due">{data.category === StringConstant.SOPayment ? this.props.content.nextDue : this.props.content.paid}</span> {when}</div>
			</div>}</div>);
		});
		data = data.length > 0 ? data : <div></div>;
		return (
			<div>
				{ data }
			</div>
		);
	},
});

module.exports = MobileViewPaymentGrid;
