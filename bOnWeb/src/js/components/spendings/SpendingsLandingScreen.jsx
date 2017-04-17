/**
 * @module SpendingsLandingScreen
*/

const React = require('react');
const { PropTypes } = React;
const _ = require('lodash');
const moment = require('moment');

const SpendingsLangingPages = require('./SpendingsLangingPages');
const SpendingsEarnings = require('./SpendingsEarnings');
const SpendingsCreateBudget = require('./SpendingsCreateBudget');

const SpendingsStore = require('../../stores/SpendingsStore');
const TransactionScreen = require('./TransactionScreen');

const SpendingsLandingScreen = React.createClass({
  propTypes: {
    content: PropTypes.object,
    spendingAccountList: PropTypes.array,
    loadSpendingPage: PropTypes.number,
    isCreateBudgetPage: PropTypes.bool,
    earnings: PropTypes.object,
    isTransactionPage: PropTypes.bool,
    isEarningPage: PropTypes.bool,
    showAccountModal: PropTypes.bool,
    getAllAccountIds: PropTypes.array,
    transactionsTagName: PropTypes.string,
    transactionPageSize: PropTypes.number,
    earningsError: PropTypes.bool,
    openFaq: PropTypes.func,
  },
  getInitialState() {
    return {
      monthPageData: SpendingsStore.spendMonthPageData(),
      budgetPageData: SpendingsStore.spendBudgetPageData(),
      spendListData: SpendingsStore.getSpendListConnectionData(),
    };
  },

  render() {
    const content = this.props.content;
    const currentMonth = moment().format('YYYY-MM');
    const lastMonth = moment(currentMonth).subtract(1, 'months').format('YYYY-MM');
    const budgetData = this.state.budgetPageData;
    const monthPageData = this.state.monthPageData.spendPageSortedData;

    const totalLastMonthValue = this.state.monthPageData.last_month;
    const totalCurrentMonthValue = this.state.monthPageData.current_month;

    const earningValueFromSpend = this.state.spendListData.earningValueFromSpend;

    const earningsError = this.props.earningsError;
    const loadSpendingPage = this.props.loadSpendingPage;
    const isTransactionPage = this.props.isTransactionPage;
    const isEarningPage = this.props.isEarningPage;
    const isCreateBudgetPage = this.props.isCreateBudgetPage;
    const showAccountModal = this.props.showAccountModal;
    const getAllAccountIds = this.props.getAllAccountIds;
    const transactionsTagName = this.props.transactionsTagName;
    const transactionPageSize = this.props.transactionPageSize;
    const potValue = SpendingsStore.getmonthlyContributionPots();

    const allBudgetTarget = [];
    _.map(budgetData, item => allBudgetTarget.push(item.target_amount));

    let isBudgetData = false;
    const collectAllTargetAmount = [];
    _.map(budgetData, item => collectAllTargetAmount.push(item.target_amount));
    _.map(collectAllTargetAmount, item => {
      if (item > 0) {
        isBudgetData = true;
      }
    });

    let earningValue = _.extend({}, this.props.earnings);
    if (!_.isEmpty(earningValue)) {
      if (earningsError && earningValue.period.net_income.value === null) {
        earningValue.period.net_income.value = _.head(earningValueFromSpend);
      } else {
        earningValue.period.net_income.value = earningValue.period.net_income.value;
      }
    }

    let pageData;
    if (isCreateBudgetPage) {
      pageData = (<SpendingsCreateBudget content={content} potValue={potValue} earnings={earningValue} />);
    } else if (isEarningPage) {
      pageData = (<SpendingsEarnings content={content} earnings={earningValue} />);
    } else if (isTransactionPage) {
      pageData = <TransactionScreen loadSpendingPage={loadSpendingPage} transactionPageSize={transactionPageSize} transactionsTagName={transactionsTagName} content={content} />;
    } else {
      pageData = (<SpendingsLangingPages
                    {...this.props}
                    loadSpendingPage={loadSpendingPage}
                    content={content}
                    lastMonth={lastMonth}
                    totalLastMonthValue={totalLastMonthValue}
                    totalCurrentMonthValue={totalCurrentMonthValue}
                    spendListData={monthPageData}
                    budgetData={budgetData}
                    allBudgetTarget={allBudgetTarget}
                    isNoBudget={isBudgetData}
                    spendingAccountList={this.props.spendingAccountList}
                    showAccountModal={showAccountModal}
                    getAllAccountIds={getAllAccountIds}
                    openFaq={this.props.openFaq}
      />);
    }

    return (
      <div className="full-height">
        {pageData}
      </div>
    );
  },
});

module.exports = SpendingsLandingScreen;
