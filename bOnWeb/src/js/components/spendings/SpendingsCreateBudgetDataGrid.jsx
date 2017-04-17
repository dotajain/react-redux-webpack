/**
 * @module SpendingsCreateBudgetDataGrid
 */
const React = require('react');
const { PropTypes } = React;
const BDataGrid = require('../common/datagrid/BDataGrid');

const CreateBudgetTableRowTemplate = require('./CreateBudgetTableRowTemplate');

const SpendingsCreateBudgetDataGrid = React.createClass({
  propTypes: {
      content: PropTypes.object,
      customClick: PropTypes.func,
      tableData: PropTypes.array,
  },
  shouldComponentUpdate () {
      return false;
  },
  render() {
    return (
        <div className="spendings-grid">
            <BDataGrid
                results={this.props.tableData}
                columns={['name', 'last_month', 'target_amount']}
                columnMetadata={columnMeta}
                initialSortAscending={false}
                customClick={this.props.customClick}
                initialSort="last_month"
                enableInfiniteScroll="false"
                useFixedHeader
                showPager={false}
                useCustomPagerComponent="false"
                resultsPerPage={this.props.tableData.length}
                bodyHeight={400}
                content={this.props.content}
                showNoData
                noDataMessage={this.props.content.spendingTableLoading}
                tableClassName="table"
            />
        </div>
    );
  },
});


const columnMeta = [
  {
    'columnName': 'name',
    'order': 1,
    'locked': false,
    'visible': true,
    'displayName': 'Tag',
    'sortable': true,
    'sortDirectionCycle': ['desc', 'asc'],
    'customComponent': CreateBudgetTableRowTemplate,
    'freeze': 'Pots',
    'cssClassName': 'column-tag',
  },
  {
    'columnName': 'last_month',
    'order': 2,
    'locked': false,
    'visible': true,
    'displayName': 'Last Month',
    'sortable': true,
    'customComponent': CreateBudgetTableRowTemplate,
    'cssClassName': 'column-last-month',
  },
  {
    'columnName': 'target_amount',
    'order': 3,
    'locked': false,
    'visible': true,
    'displayName': 'Budget',
    'sortable': true,
    'customComponent': CreateBudgetTableRowTemplate,
    'sortDirectionCycle': ['desc', 'asc'],
    'cssClassName': 'column-budget',
  },
];


module.exports = SpendingsCreateBudgetDataGrid;
