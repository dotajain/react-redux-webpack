/**
 * @module SpendingsCreateBudgetDataGrid
 */
const React = require('react');
const { PropTypes } = React;
const BDataGrid = require('../common/datagrid/BDataGrid');

const TransactionRowTemplate = require('./TransactionRowTemplate');
const SpendingsStore = require('../../stores/SpendingsStore');
const SpendingsActionCreator = require('../../actions/SpendingsActionCreator');

const TransactionScreenDataGrid = React.createClass({
  propTypes: {
    content: PropTypes.object,
    onRowClick: PropTypes.func,
    pageSize: PropTypes.number,
  },
  getInitialState() {
    return {
      pageSize: SpendingsStore.transactionPageSize(),
    };
  },
  _onPageChange(currPage, sizePerPage) {
    const pageSize = this.state.pageSize + sizePerPage;
    this.setState({ pageSize: pageSize });
    SpendingsActionCreator.getTransactionDetailsOnNext(pageSize);
  },
  _onSortChange(sortName, sort) {
    const sortOrder = sort;
    let sortField = sortName;
    if (sortName === 'date') {
      sortField = 'details.when';
    } else if (sortName === 'description') {
      sortField = 'details.narrative.medium.raw';
    } else if (sortName === 'type') {
      sortField = 'details.type';
    } else if (sortName === 'amount') {
      sortField = 'details.amount.value';
    }

    const sortData = { order: sortOrder, sort_field: sortField };
    SpendingsActionCreator.getTransactionDetailsOnSort(sortData);
  },
  render() {
    const transactionDetailsData = SpendingsStore.getTransactionDetails();
    const tableData = transactionDetailsData.tableData;
    const totalData = transactionDetailsData.totalData;
    const content = this.props.content;

    let hasMoreData = true;
    let isFooterEnabled = false;
    if (tableData.length === totalData && totalData > 0) {
      hasMoreData = false;
      isFooterEnabled = true;
    }
    return (
      <div className="spendings-grid">
            <BDataGrid ref="TransactionHistoryGrid"
                    results={tableData}
                    columns={['date', 'description', 'type', 'tag', 'amount', 'account']}
                    columnMetadata={columnMeta}
                    useCustomPagerComponent="true"
                    initialSortAscending={false}
                    next={this._onPageChange}
                    onSort={this._onSortChange}
                    onRowClick={this.props.onRowClick}
                    initialSort="date"
                    enableInfiniteScroll
                    useFixedHeader
                    bodyHeight={400}
                    resultsPerPage={25}
                    content={content}
                    rowExpnader
                    showNoData
                    noDataMessage={content.spendingTableLoading1}
                    showPager={hasMoreData}
                    tableClassName="table"
                    isFooterEnabled={isFooterEnabled}
            />
      </div>
    );
  },
});

const columnMeta = [
  {
    'columnName': 'date',
    'order': 1,
    'locked': false,
    'visible': true,
    'displayName': 'Date',
    'sortable': true,
    'sortDirectionCycle': ['desc', 'asc'],
    'customComponent': TransactionRowTemplate,
    'cssClassName': 'column-date',
  },
  {
    'columnName': 'description',
    'order': 2,
    'locked': false,
    'visible': true,
    'displayName': 'Description',
    'sortable': true,
    'sortDirectionCycle': ['desc', 'asc'],
    'customComponent': TransactionRowTemplate,
    'cssClassName': 'column-desc',
  },
  {
    'columnName': 'type',
    'order': 3,
    'locked': false,
    'visible': true,
    'displayName': 'Type',
    'sortable': true,
    'customComponent': TransactionRowTemplate,
    'cssClassName': 'column-type',
  },
  {
    'columnName': 'tag',
    'order': 4,
    'locked': false,
    'visible': true,
    'displayName': 'Tag',
    'sortable': false,
    'customComponent': TransactionRowTemplate,
    'cssClassName': 'column-tags',
  },
  {
    'columnName': 'amount',
    'order': 5,
    'locked': false,
    'visible': true,
    'displayName': 'Amount',
    'sortable': true,
    'customComponent': TransactionRowTemplate,
    'cssClassName': 'column-amount',
  },
  {
    'columnName': 'account',
    'order': 6,
    'locked': false,
    'visible': true,
    'displayName': 'Account',
    'sortable': false,
    'customComponent': TransactionRowTemplate,
    'cssClassName': 'column-account',
  },
];

module.exports = TransactionScreenDataGrid;
