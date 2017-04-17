/**
 * @module SpendTableRowTemplate
*/

const React = require('react');
const { PropTypes } = React;
const ProgressOnTable = require('./ProgressOnTable');
const NumberUtils = require('../../utils/NumberUtils');


const SpendTableRowTemplate = React.createClass({
  propTypes: {
    rowData: PropTypes.object,
    metadata: PropTypes.object,
    customClick: PropTypes.func,
    content: PropTypes.object,
  },
  _onClick() {
      this.props.customClick(this.props.rowData.name, this.props.rowData);
  },
  render() {
    const rowData = this.props.rowData;
    const metaData = this.props.metadata;
    const last_month = rowData.last_month;
    const currentMonth = rowData.current_month;


    let isArchived;

    if (rowData.archived || rowData.joint) {
        isArchived = 'column-fade';
    }

    let colData;
    if (metaData.columnName === 'name') {
        colData = <div className={`spendings__tag_name ${isArchived}`}><a onClick={this._onClick}><span>{rowData.name}</span></a></div>;
    }
    if (metaData.columnName === 'current_month') {
        colData = NumberUtils.appendCurrency('{}', currentMonth);
    }
    if (metaData.columnName === 'progress') {
        if (rowData.archived || rowData.joint) {
            colData = null;
        } else {
            colData = <ProgressOnTable {...this.props}/>;
        }
    }
    if (metaData.columnName === 'last_month') {
        colData = NumberUtils.appendCurrency('{}', last_month);
    }
    if (metaData.columnName === 'message') {
        colData = rowData.message;
    }


    return (
      <div className="enabled">
        {colData}
      </div>
    );
	},
});

module.exports = SpendTableRowTemplate;
