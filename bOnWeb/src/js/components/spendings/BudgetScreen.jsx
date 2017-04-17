/**
 * @module BudgetScreen
*/

const React = require('react');
const { PropTypes } = React;
const _ = require('lodash');
const BDataGrid = require('../common/datagrid/BDataGrid');
const SpendingsActionCreator = require('../../actions/SpendingsActionCreator');
const SpendingsStore = require('../../stores/SpendingsStore');
const config = require('../../config');
const AnalyticsActionCreator = require('../../actions/AnalyticsActionCreator');
const moment = require('moment');

const SpendingsHeaderProgress = require('./SpendingsHeaderProgress');
const BudgetTableRowTemplate = require('./BudgetTableRowTemplate');


const BudgetScreen = React.createClass({
  propTypes: {
    content: PropTypes.object,
    budgetData: PropTypes.array,
    totalCurrentMonthValue: PropTypes.string,
    isNoBudget: PropTypes.bool,
    allBudgetTarget: PropTypes.array,
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
        description: config.analytics.analytics_name_bos_budget,
    });
	},
  _onRowClick(e, item) {
    // Record an analytics user event.
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
      'start_date': moment(firstDay).format('YYYY-MM-DDTHH:mm:ss.[000+0100]'),
    };
    SpendingsActionCreator.getTransactionDetails(requestDataTemplate);
  },
  render() {
    const content = this.props.content;
    const budgetData = this.props.budgetData;
    const totalCurrentMonthValue = this.props.totalCurrentMonthValue;
    const allBudgetTarget = this.props.allBudgetTarget;

    const budgetAmount = _.sum(allBudgetTarget);
    let budgetAmountInt;

    if (_.isInteger(budgetAmount)) {
      budgetAmountInt = budgetAmount;
    } else {
      budgetAmountInt = budgetAmount.toFixed(2);
    }

    let leftValue;
    let rightValue;
    let labelLeft;
    let labelRight;


    labelLeft = content.spendingHeaderThisMonthText;
    labelRight = content.spendingHeaderBudgetText;
    leftValue = Number(totalCurrentMonthValue);
    rightValue = Number(budgetAmountInt);
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
          />
          <div className="spendings-grid spendings content-wrapper">
              <BDataGrid
                results={budgetData}
                columns={['name', 'current_month', 'progress', 'target_amount', 'message']}
                columnMetadata={columnMeta}
                initialSortAscending={false}
                customClick={this._onRowClick}
                initialSort="current_month"
                enableInfiniteScroll="false"
                useCustomPagerComponent="false"
                showPager={false}
                useFixedHeader
                resultsPerPage={budgetData.length}
                bodyHeight={400}
                content={this.props.content}
                showNoData
                noDataMessage={content.spendingTableLoading}
                tableClassName="table"
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
    'customComponent': BudgetTableRowTemplate,
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
    'customComponent': BudgetTableRowTemplate,
    'cssClassName': 'column-spent',
	},
	{
		'columnName': 'progress',
		'order': 3,
    'locked': false,
		'visible': true,
		'displayName': ' ',
		'sortable': false,
    'customComponent': BudgetTableRowTemplate,
    'cssClassName': 'column-progress',
	},
  {
		'columnName': 'target_amount',
		'order': 4,
		'locked': false,
		'visible': true,
		'displayName': 'Amount Budgeted',
		'sortable': true,
    'customComponent': BudgetTableRowTemplate,
    'cssClassName': 'column-amount',
	},
	{
		'columnName': 'message',
		'order': 5,
		'locked': false,
		'visible': true,
		'displayName': 'Status',
		'sortable': false,
    'customComponent': BudgetTableRowTemplate,
    'cssClassName': 'column-status',
	},
];

module.exports = BudgetScreen;
