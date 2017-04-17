/**
 * @module TransactionRowTemplate
*/

const React = require('react');
const { PropTypes } = React;
const NumberUtils = require('../../utils/NumberUtils');
const moment = require('moment');

const TransactionRowTemplate = React.createClass({
  propTypes: {
    rowData: PropTypes.object,
    metadata: PropTypes.object,
    customClick: PropTypes.func,
  },
  _onClick() {
      this.props.customClick();
  },
  render() {
    const rowData = this.props.rowData;
    const metaData = this.props.metadata;
    const index = rowData.accIndex;
    let colData;
    if (metaData.columnName === 'date') {
        const tagDate = moment(rowData.date).format('DD MMM YY');
        colData = <span>{tagDate}</span>;
    }
    if (metaData.columnName === 'description') {
        colData = <span className={`account-${index}`}>{rowData.description}</span>;
    }
    if (metaData.columnName === 'type') {
        colData = <span>{rowData.type}</span>;
    }
    if (metaData.columnName === 'tag') {
        if (rowData.tag === 'Untagged') {
            colData = <span>&nbsp;</span>;
        } else {
            colData = <span className="icon icon-tag">{rowData.tag}</span>;
        }
    }
    if (metaData.columnName === 'amount') {
        const amount = NumberUtils.appendCurrency('{}', rowData.amount);
        colData = <span><strong>{amount}</strong></span>;
    }
    if (metaData.columnName === 'account') {
        if (rowData.inProgress) {
            colData = <span className={`has-inprogress account-${index}`}>{rowData.account} <button className="btn btn-link" onClick={this._onClick}><i className="icon icon-waiting"></i></button></span>;
        } else {
            colData = <span className={`account-${index}`}>{rowData.account}</span>;
        }
    }
    return (
      <div>
        {colData}
      </div>
    );
	},
});

module.exports = TransactionRowTemplate;
