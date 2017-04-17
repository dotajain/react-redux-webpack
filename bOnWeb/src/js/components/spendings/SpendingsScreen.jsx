/**
 * @module SpendingsScreen
*/

const React = require('react');
const { PropTypes } = React;
const moment = require('moment');
const BDataGrid = require('../common/datagrid/BDataGrid');
const SpendingsActionCreator = require('../../actions/SpendingsActionCreator');
const SpendingsStore = require('../../stores/SpendingsStore');
const config = require('../../config');
const AnalyticsActionCreator = require('../../actions/AnalyticsActionCreator');
const SpendingsHeaderProgress = require('./SpendingsHeaderProgress');
const SpendTableRowTemplate = require('./SpendTableRowTemplate');

const SpendingsScreen = React.createClass({
  propTypes: {
    content: PropTypes.object,
    spendListData: PropTypes.array,
    totalLastMonthValue: PropTypes.string,
    totalCurrentMonthValue: PropTypes.string,
    isNoBudget: PropTypes.bool,
  },
  getInitialState() {
    return {
      getAllAccountIds: SpendingsStore.updatedAccountIds(),
    };
  },
  componentDidMount() {
    // Record an analytics user event.
    AnalyticsActionCreator.track({
        path: '/user/experience/view',
        action: 'Appeared',
        }, {
        description: config.analytics.analytics_name_bos_month,
    });
	},
  _onRowClick(e, item) {
    AnalyticsActionCreator.track({
        path: '/user/experience/activity',
        action: 'Interacted',
        }, {
        description: config.analytics.analytics_name_spend_view_transaction_tag,
        event: 'click',
    });
    const date = new Date();
    const y = date.getFullYear();
    const m = date.getMonth();
    const firstDay = new Date(y, m, 1);
    const tagId = item.key.toString();
    const tagName = item.name;
    let filter_field;
    if (item.tag_budget) {
      filter_field = 'metadata.tags.id';
    } else {
      filter_field = 'metadata.categories.id';
    }
    const requestDataTemplate = {
      'name': tagName,
      'filter_value':  tagId,
      'filter_field': filter_field,
      'order': 'desc',
      'size': 200,
      'sort_field': 'details.when',
      'start_date': moment(firstDay).subtract(1, 'months').format('YYYY-MM-DDTHH:mm:ss.[000+0100]'),
    };
    SpendingsActionCreator.getTransactionDetails(requestDataTemplate);
  },
  render() {
    const content = this.props.content;
    const tableData = this.props.spendListData;
    const totalCurrentMonthValue = this.props.totalCurrentMonthValue;
    const totalLastMonthValue = this.props.totalLastMonthValue;

    let leftValue;
    let rightValue;
    let labelLeft;
    let labelRight;

    labelLeft = content.spendingHeaderThisMonthText;
    labelRight = moment().subtract(1, 'months').format('MMMM');
    leftValue = Number(totalCurrentMonthValue);
    rightValue = Number(totalLastMonthValue);
    return (
      <div className="scroll-wrapper">
      <div className="spendings-month">
        <SpendingsHeaderProgress
          content={content}
          isNoBudget={this.props.isNoBudget}
          leftValue={leftValue}
          rightValue={rightValue}
          labelLeft={labelLeft}
          labelRight={labelRight}
          spendingProgressText={moment().subtract(1, 'months').format('MMMM')}
        />
        <div className="spendings-grid spendings content-wrapper">
            <BDataGrid
              results={tableData}
              columns={['name', 'current_month', 'progress', 'last_month', 'message']}
              columnMetadata={columnMeta}
              initialSortAscending={false}
              customClick={this._onRowClick}
              initialSort="current_month"
              enableInfiniteScroll
              useFixedHeader
              showPager={false}
              resultsPerPage={tableData.length}
              bodyHeight={400}
              content={this.props.content}
              showNoData
              noDataMessage={content.spendingTableLoading}
              tableClassName="table"
              useCustomPagerComponent="false"
            />
        </div>
      </div>
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
    'customComponent': SpendTableRowTemplate,
    'freeze':'Untagged',
    'cssClassName': 'column-tag',
	},
  {
		'columnName': 'current_month',
		'order': 2,
    'locked': false,
		'visible': true,
		'displayName': 'Spent this month',
		'sortable': true,
    'customComponent': SpendTableRowTemplate,
    'cssClassName': 'column-spent',
	},
	{
		'columnName': 'progress',
		'order': 3,
    'locked': false,
		'visible': true,
		'displayName': ' ',
		'sortable': false,
    'customComponent': SpendTableRowTemplate,
    'cssClassName': 'column-progress',
	},
  {
		'columnName': 'last_month',
		'order': 4,
		'locked': false,
		'visible': true,
		'displayName': `Spent in ${moment().subtract(1, 'months').format('MMMM')}`,
		'sortable': true,
    'customComponent': SpendTableRowTemplate,
    'cssClassName': 'column-amount',
	},
	{
		'columnName': 'message',
		'order': 5,
		'locked': false,
		'visible': true,
		'displayName': 'Difference',
		'sortable': false,
    'customComponent': SpendTableRowTemplate,
    'cssClassName': 'column-status',
	},
];

module.exports = SpendingsScreen;
