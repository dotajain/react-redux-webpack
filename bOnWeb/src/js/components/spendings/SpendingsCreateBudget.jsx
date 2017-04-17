/**
 * @module SpendingsCreateBudget
*/

const React = require('react');
const { PropTypes } = React;
const _ = require('lodash');
const config = require('../../config');
const AnalyticsActionCreator = require('../../actions/AnalyticsActionCreator');

const SpendingsActionCreator = require('../../actions/SpendingsActionCreator');
const SpendingsStore = require('../../stores/SpendingsStore');

const NumberUtils = require('../../utils/NumberUtils');

const SpendingsCreateBudgetDataGrid = require('./SpendingsCreateBudgetDataGrid');
const CreateBudgetProgress = require('./CreateBudgetProgress');
const CreateBudgetMessage = require('./CreateBudgetMessage');

const SpendingsCreateBudget = React.createClass({
  propTypes: {
    content: PropTypes.object,
    earnings: PropTypes.object,
    potValue: PropTypes.number,
  },
  getInitialState() {
    return {
      pot: this.props.potValue,
      selections: [],
      tableData: SpendingsStore.updatedCreateBudgetData(),
      isSavEnable: false,
      budgetPacket: null,
    };
  },
  componentWillMount() {
    const data = {
        'tag_budgets': [],
        'category_budgets': [],
      };
      _.map(this.state.tableData, item => {
        if (item.key !== 'spend_pot_key') {
          if (item.tag_budget) {
            const obj = {
                'tag_id' : item.key,
                'target_amount' : {
                    'value' : item.target_amount,
                    'currency' : 'GBP',
                },
            };
            data.tag_budgets.push(obj);
          }
          if (item.category_budgets) {
            const obj = {
                'category_id' : item.key,
                'target_amount' : {
                    'value' : item.target_amount,
                    'currency' : 'GBP',
                },
            };
            data.category_budgets.push(obj);
          }
        }
      });
      this.setState({ budgetPacket: data });
  },
  componentDidMount() {
    // Record an analytics user event.
    AnalyticsActionCreator.track({
        path: '/user/experience/view',
        action: 'Appeared',
        }, {
        description: config.analytics.analytics_name_budget,
    });
	},
  _loadSpendingAction() {
    // Get Account List
    SpendingsActionCreator.getAccountsList();
    SpendingsActionCreator.getBudgetConnection();
    SpendingsActionCreator.getTagListConnection();
    SpendingsActionCreator.getBudgetPreferencesConnection();
  },
  _handleCancel() {
    this._loadSpendingAction();
  },

  _onChildToggle(id, selected) {
    const selections = this.state.selections;
    const list = this.state.tableData;
    const budgetPacketList = this.state.budgetPacket;
    selections[id] = selected;
    this.setState({ isSavEnable: true });
    _.map(budgetPacketList.category_budgets, item => {
      let tAmount;
       _.map(list, item => {
        if (item.key === id) {
          tAmount = item.target_amount;
        }
      });
      if (item.category_id === id) {
        item.target_amount.value = tAmount + selections[id];
      }
    });
    _.map(budgetPacketList.tag_budgets, item => {
      let tAmount;
       _.map(list, item => {
        if (item.key === id) {
          tAmount = item.target_amount;
        }
      });
     if (item.tag_id === id) {
        item.target_amount.value = tAmount + selections[id];
      }
    });
    this.setState({ budgetPacket: budgetPacketList });
  },
   _handleEarnings() {
    // Record an analytics user event.
    AnalyticsActionCreator.track({
        path: '/user/experience/activity',
        action: 'Interacted',
        }, {
        description: config.analytics.analytics_name_budget_income,
        event: 'click',
    });
    const myList = this.state.tableData;
    const budgetPacket = [];
    _.map(this.state.budgetPacket.category_budgets, item => budgetPacket.push(item));
    _.map(this.state.budgetPacket.tag_budgets, item => budgetPacket.push(item));

    const newObj = [];
    _.map(myList, items => {
      let target_amount = items.target_amount;
      _.map(budgetPacket, item => {
        if (items.key === item.category_id) {
          target_amount = item.target_amount.value;
        }
        if (items.key === item.tag_id) {
          target_amount = item.target_amount.value;
        }
      });
      let obj = [];
      if (items.key === 'spend_pot_key') {
        obj = items;
      } else {
        obj = {
          'archived': items.archived,
          'category_budgets': items.category_budgets,
          'joint': items.joint,
          'key': items.key,
          'last_month': items.last_month,
          'name': items.name,
          'tag_budget': items.tag_budget,
          'target_amount': target_amount,
        };
      }
      newObj.push(obj);
    });
    SpendingsActionCreator.handleUpdatedBudgetData(newObj);
    SpendingsActionCreator.loadEarningPage(3);
  },
  _handleSave() {
    SpendingsActionCreator.updateBudgetConnection(this.state.budgetPacket);
    if (!_.isEmpty(this.props.earnings)) {
      SpendingsActionCreator.updateBudgetPreferencesConnection(this.props.earnings);
    }
    this._loadSpendingAction();
  },
  render() {
    const tableData = this.state.tableData;
    const content = this.props.content;
    let earning;
    if (!_.isEmpty(this.props.earnings)) {
      earning = this.props.earnings.period.net_income.value;
    } else {
      earning = 0;
    }
    let headerLeftMessage = content.spendingCreateHeaderLeftLabel;

    const targetAmount = [];
    _.map(this.state.budgetPacket.category_budgets, item => targetAmount.push(item.target_amount.value));
    _.map(this.state.budgetPacket.tag_budgets, item => targetAmount.push(item.target_amount.value));

    const totalTargetAmount = _.sum(targetAmount);
    const totalBudgetValue = (totalTargetAmount + this.state.pot);

    let noPotClass;
    if (this.state.pot === 0) {
      headerLeftMessage = content.spendingTableHeaderText8;
      noPotClass = 'no-pot';
    }
    let savebutton;
    if (earning !== 0) {
      savebutton = (<button type="button" className="btn btn-link btn-style" onClick={this._handleSave}>{content.spendingSaveButtonText}</button>);
    }
    return (
      <div className="main-container from-top spending-edit">
        <div className="headerRow row no-gutters">
          <div className="col-xs-2 text-left">
            <button type="button" className="btn btn-link btn-style" onClick={this._handleCancel}>{content.spendingCancelButtonText}</button>
          </div>
          <div className="col-xs-8"></div>
          <div className="col-xs-2 text-right">
            {savebutton}
          </div>
        </div>
        <div className ="spendings-progress">
					<div className="budget-status">
						<div className="monthly-progress row">
							<div className="col-xs-3">
								<h6>{headerLeftMessage}</h6>
								<h2>{NumberUtils.appendCurrency('{}', totalBudgetValue) }</h2>
							</div>
							<div className="col-xs-6 text-center">
								<CreateBudgetProgress content={content} totalBudgetValue={totalBudgetValue} potValue={this.state.pot} earning={earning} />
							</div>
							<div className="col-xs-3">
								<h6>{content.spendingCreateHeaderRightLabel}</h6>
								<h2>{NumberUtils.appendCurrency('{}', earning) }</h2>
							</div>
							</div>
							<div className="edit-earning">
								<a className= "page-option icon icon-edit" onClick={this._handleEarnings}></a>
							</div>
					</div>
        </div>

        <div className={`edit-budget scroll-wrapper ${noPotClass}`}>
          <div className="edit-budget-grid content-wrapper">
            <div className="row ">
              <div className="col-xs-7">
                <SpendingsCreateBudgetDataGrid content={content} tableData={tableData} customClick={this._onChildToggle} />
              </div>
              <div className="col-xs-5">
                <CreateBudgetMessage content={content} totalBudgetValue={totalBudgetValue} potValue={this.state.pot} earning={earning} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
module.exports = SpendingsCreateBudget;
