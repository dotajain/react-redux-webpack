/**
 * @module MobileViewArchievedGrid
 */
const React = require('react');
const PaymentsStore = require('../../../stores/PaymentsStore');
const { PropTypes } = React;
const NumberUtils = require('../../../utils/NumberUtils');
const StringConstant = require('../../../constants/StringConstants');
const config = require('../../../config');
const DateUtils = require('../../../utils/DateUtils');
const moment = require('moment');
const MobileViewArchievedGrid = React.createClass({
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
        return (<div>
            {this.props.data !== undefined && this.props.data.map(data => {
                let click = this.rowClick.bind(this, data);
                const fromCSS = PaymentsStore.getColorFromAccount(data.fromAccId);
                 let when;
             if (data.when !== undefined) {
                when = DateUtils.getMomentFromDateString(data.when);
                 when = moment(when).format(config.dateFormatTimeline);
             }
               const whenContent = data.category === StringConstant.SOPayment ? this.props.content.nextDue : this.props.content.paid;
                return (<div className="custom-row-card" onClick={click}>

                    <div><h5 className={fromCSS}>{data.from}</h5><span className="name">{data.type}</span></div>
                    <div className = "data-to">{data.to}</div>
                     {data.amount !== undefined ? <div><span className = "amount">Amount {NumberUtils.decimalFormat(data.amount, 3, true)}</span></div> : null}
                    <div><span className = "next-due"></span></div>{data.when !== undefined ? <div><span className = "next-due">{whenContent}</span> {when}</div> : null}

                </div>);
            })
            }</div>);
    },
});

module.exports = MobileViewArchievedGrid;
