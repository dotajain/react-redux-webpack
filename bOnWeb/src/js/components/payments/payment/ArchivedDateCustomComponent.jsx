/**
 * @module ArchivedDateCustomComponent
 */
const React = require('react');
const DateUtils = require('../../../utils/DateUtils');
const moment = require('moment');
const config = require('../../../config');
const { PropTypes } = React;
const NumberUtils = require('../../../utils/NumberUtils');

const ArchivedDateCustomComponent = React.createClass({
    propTypes: {
        rowData: PropTypes.object,
        content: PropTypes.object,
        metadata: PropTypes.object,
        data: PropTypes.object,
    },
    // Returns the cell based on columnName
    renderCell() {
        switch (this.props.metadata.columnName) {
            case 'when':
            if (this.props.rowData.when === undefined) {
                 return <label onClick={this.cellClick}>-</label>;
            } else {
            let endDate = DateUtils.getMomentFromDateString(this.props.rowData.when);
            endDate = moment(endDate).format(config.dateFormatTimeline);
            return <label onClick={this.cellClick}>{endDate}</label>;
            }
            case 'amount': if (this.props.rowData.amount === undefined) {
                 return <label onClick={this.cellClick}>-</label>;
            } else {
                return <label onClick={this.cellClick}>{NumberUtils.decimalFormat(this.props.rowData.amount, 3, true)}</label>;
            }
            default:
                return <span ref="span" onClick={this.cellClick}>{this.props.data}</span>;

        }
    },
    render() {
        return (
            <div>
                {this.renderCell() }
            </div>);
    },
});
module.exports = ArchivedDateCustomComponent;
