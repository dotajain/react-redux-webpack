/**
 * @module BudgetTableRowTemplate
*/

const React = require('react');
const { PropTypes } = React;
const ProgressOnTable = require('./ProgressOnTable');
const NumberUtils = require('../../utils/NumberUtils');


const BudgetTableRowTemplate = React.createClass({
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
    const budgetValue = rowData.target_amount;
    const currentMonth = rowData.current_month;
    let budgetedValue;

    let isArchived;

    if (rowData.archived || rowData.joint) {
        isArchived = 'column-fade';
    }

    if (budgetValue === 0) {
        budgetedValue = '-';
    } else {
        budgetedValue = NumberUtils.appendCurrency('{}', budgetValue);
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
    if (metaData.columnName === 'target_amount') {
        colData = budgetedValue;
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

module.exports = BudgetTableRowTemplate;
