/**
 * @module SpendingsCreateBudget
*/

const React = require('react');
const { PropTypes } = React;
const _ = require('lodash');
const config = require('../../config');
const AnalyticsActionCreator = require('../../actions/AnalyticsActionCreator');
const SpendingsActionCreator = require('../../actions/SpendingsActionCreator');
const SpendingsUtils = require('../../utils/SpendingsUtils');
const NumberUtils = require('../../utils/NumberUtils');

const SpendingsEarnings = React.createClass({
  propTypes: {
    content: PropTypes.object,
    earnings: PropTypes.object,
  },
  getInitialState() {
      return {
        nextButtonDisabled: false,
        earnings: this.props.earnings,
      };
  },
  componentWillMount() {
    if (this.state.earnings.period.net_income.value === '' || !this.state.earnings.period.net_income.value) {
      const earning = _.extend({}, this.state.earnings);
      earning.period.net_income.value = '£';
      this.setState({ nextButtonDisabled: true, clasname: 'btn btn-link btn-style hide', earnings: earning });
    } else {
      this.setState({ nextButtonDisabled: false, clasname: 'btn btn-link btn-style' });
    }
  },
  componentDidMount() {
    // Record an analytics user event.
    AnalyticsActionCreator.track({
        path: '/user/experience/view',
        action: 'Appeared',
        }, {
        description: config.analytics.analytics_name_budget_income,
    });
	},
   _earningsOnChange(e) {
    const earning = _.extend({}, this.state.earnings);
    const isValid = SpendingsUtils.numberValidation(e.target.value);
    let etarget;
    if (isValid) {
      etarget = e.target.value.replace(/[^\d\.]*/g, '');
      earning.period.net_income.value = `£${etarget}`;
      if (etarget === '') {
        earning.period.net_income.value = `£${etarget}`;
        this.setState({ nextButtonDisabled: true, clasname: 'btn btn-link btn-style hide' });
      } else if (etarget === '.' || etarget === '0.') {
        earning.period.net_income.value = `£${etarget}`;
        this.setState({ nextButtonDisabled: true, clasname: 'btn btn-link btn-style hide' });
      } else if (etarget === '0') {
        earning.period.net_income.value = `£${etarget}`;
        this.setState({ nextButtonDisabled: true, clasname: 'btn btn-link btn-style hide' });
      } else if (etarget === '0.0') {
        earning.period.net_income.value = `£${etarget}`;
        this.setState({ nextButtonDisabled: true, clasname: 'btn btn-link btn-style hide' });
      } else if (etarget === '0.00') {
        earning.period.net_income.value = `£${etarget}`;
        this.setState({ nextButtonDisabled: true, clasname: 'btn btn-link btn-style hide' });
       } else if (Number(etarget) === 0) {
        earning.period.net_income.value = '£0';
        this.setState({ nextButtonDisabled: true, clasname: 'btn btn-link btn-style hide' });
       } else {
        this.setState({ nextButtonDisabled: false, clasname: 'btn btn-link btn-style' });
      }
      this.setState({ earnings: earning });
    }
  },
  _onPaste(e) {
    e.preventDefault();
  },
  _loadSpendingAction() {
    SpendingsActionCreator.getAccountsList();
    SpendingsActionCreator.getBudgetConnection();
    SpendingsActionCreator.getTagListConnection();
    SpendingsActionCreator.getBudgetPreferencesConnection();
  },
  _handleCancel() {
    this._loadSpendingAction();
  },
  _handleNext() {
    // Record an analytics user event.
    AnalyticsActionCreator.track({
        path: '/user/experience/activity',
        action: 'Interacted',
        }, {
        description: config.analytics.analytics_name_budget,
        event: 'click',
    });
    const earning = _.extend({}, this.state.earnings);
    if (_.isNumber(this.state.earnings.period.net_income.value)) {
      earning.period.net_income.value = this.state.earnings.period.net_income.value;
    } else {
      earning.period.net_income.value = parseFloat(this.state.earnings.period.net_income.value.replace(/[^\d\.]*/g, ''));
    }
    SpendingsActionCreator.requestEditBudgetPage();
  },
  _earningsOnBlur() {
    const earning = _.extend({}, this.state.earnings);
     if (_.isNumber(this.state.earnings.period.net_income.value)) {
       earning.period.net_income.value = NumberUtils.appendCurrency('{}', Number(this.state.earnings.period.net_income.value));
     } else {
        const income = parseFloat(this.state.earnings.period.net_income.value.replace(/[^\d\.]*/g, ''));
        if (_.isNaN(income)) {
          earning.period.net_income.value = '£';
        } else {
          earning.period.net_income.value = NumberUtils.appendCurrency('{}', Number(income));
        }
      }
      this.setState({ earnings: earning });
  },
  render() {
    const content = this.props.content;
    let earning = this.state.earnings.period.net_income.value;
    if (_.isNumber(earning)) {
      earning = `£${this.state.earnings.period.net_income.value}`;
    }
    return (
      <div className="spendings-create full-height">
        <div className="row header-row">
          <div className="col-xs-6">
            <button type="button" className="btn btn-link btn-style" onClick={this._handleCancel}>{content.spendingCancelButtonText}</button>
          </div>
          <div className="col-xs-6 text-right">
            <button type="button" className={this.state.clasname} onClick={this._handleNext} disabled = {this.state.nextButtonDisabled}>{content.spendingNextButtonText}</button>
          </div>
        </div>
        <div className="row text-center">
          <div className="create-content">
            <div className="content-style">
              <p>{content.spendingEarningMessage}</p>
            </div>
              <input type="text" value={earning} className="text-style" onChange={this._earningsOnChange} onBlur={this._earningsOnBlur} onPaste={this._onPaste}/>
          </div>
        </div>
      </div>
    );
	},
});

module.exports = SpendingsEarnings;
