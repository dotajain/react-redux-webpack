/**
 * @module SpendingsLangingPages
*/

const React = require('react');
const { PropTypes } = React;
const _ = require('lodash');

const HeaderComponent = require('../common/HeaderComponent');

const SpendingsHeader = require('./SpendingsHeader');
const SpendingsScreen = require('./SpendingsScreen');
const BudgetScreen = require('./BudgetScreen');

const SpendingsLangingPages = React.createClass({
  propTypes: {
    content: PropTypes.object,
    spendingAccountList: PropTypes.array,
    budgetData: PropTypes.array,
    spendListData: PropTypes.array,
    loadSpendingPage: PropTypes.number,
    totalLastMonthValue: PropTypes.array,
    totalCurrentMonthValue: PropTypes.array,
    isNoBudget: PropTypes.bool,
    allBudgetTarget: PropTypes.array,
    lastMonth: PropTypes.string,
    showAccountModal: PropTypes.bool,
    getAllAccountIds: PropTypes.array,
    openFaq: PropTypes.func,
  },
  render() {
    const content = this.props.content;
    const budgetData = this.props.budgetData;
    const isNoBudget = this.props.isNoBudget;
    const spendListData = this.props.spendListData;
    const allBudgetTarget = this.props.allBudgetTarget;
    const getAllAccountIds = this.props.getAllAccountIds;
    const showAccountModal = this.props.showAccountModal;
    const loadSpendingPage = this.props.loadSpendingPage;
    const spendingAccountList = this.props.spendingAccountList;
    const totalLastMonthValue = _.sum(this.props.totalLastMonthValue).toFixed(2);
    const totalCurrentMonthValue = _.sum(this.props.totalCurrentMonthValue).toFixed(2);

    let pageData;
    if (loadSpendingPage === 2 || !this.props.isNoBudget) {
      pageData = (<SpendingsScreen
                    content={content}
                    spendListData={spendListData}
                    totalLastMonthValue={totalLastMonthValue}
                    totalCurrentMonthValue={totalCurrentMonthValue}
                    isNoBudget={isNoBudget}
      />);
    } else {
      pageData = (<BudgetScreen
                    content={content}
                    budgetData={budgetData}
                    totalCurrentMonthValue={totalCurrentMonthValue}
                    allBudgetTarget={allBudgetTarget}
                    isNoBudget={isNoBudget}
      />);
    }
    return (
      <div className="full-height">
        <HeaderComponent selectedTab="spending" {...this.props} openFaq={this.props.openFaq}/>
        <div className="spending main-container">
          <div className="spendings-landings">
            <div className="full-height">
              <SpendingsHeader
                loadSpendingPage={loadSpendingPage}
                isNoBudget={isNoBudget}
                spendingAccountList={spendingAccountList}
                lastMonth={this.props.lastMonth}
                content={content}
                showAccountModal={showAccountModal}
                getAllAccountIds={getAllAccountIds}
              />
              {pageData}
            </div>
          </div>
        </div>
      </div>
    );
	},
});

module.exports = SpendingsLangingPages;
