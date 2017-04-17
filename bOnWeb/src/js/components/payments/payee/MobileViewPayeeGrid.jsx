/**
 * @module MobileViewPayeeGrid
 */
const React = require('react');
const { PropTypes } = React;
const NumberUtils = require('../../../utils/NumberUtils');

const MobileViewPayeeGrid = React.createClass({
	propTypes: {
        rowData: PropTypes.object,
        content: PropTypes.object,
        metadata: PropTypes.object,
        data: PropTypes.object,
        rowClick: PropTypes.func,
    },
	getDefaultProps() {
		return { 'data': {} };
	},
	getInitialState() {
        return {
			show: false,
			rowData: {},
            showView: false,
        };
    },
    // Set rowData when row clicks
	rowClick(e) {
		this.setState({ rowData: e, show: true });
        this.props.rowClick(e);
	},
	render() {
		let payeeData = this.props.data !== undefined && this.props.data.map(data => {
			let click = this.rowClick.bind(this, data);
			return (<div className="custom-row-card manage-payee" onClick={click}>
				<div><h5 className = "payee-name">{data.display_name}</h5></div>
				<div className = "payee-acc">{data.to_account.account_number} | {NumberUtils.formatSortCode(data.to_account.sort_code) }</div>
				<div><span className = "payee-ref">Ref </span>{data.reference}</div>
			</div>);
		});
		payeeData = payeeData.length > 0 ? payeeData : <div></div>;

		return (
			<div>
				{ payeeData }
			</div>
		);
	},
});
module.exports = MobileViewPayeeGrid;
