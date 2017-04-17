/**
 * @module AccountsModal
 */
const React = require('react');
const { PropTypes } = React;
const _ = require('lodash');
const BasicModal = require('../common/modals/ModalB');
const SpendingsActionCreator = require('../../actions/SpendingsActionCreator');
const AccountsList = require('./AccountsList');
const config = require('../../config');
const AnalyticsActionCreator = require('../../actions/AnalyticsActionCreator');
const AccountsModal = React.createClass({
  propTypes: {
    onHide: PropTypes.func,
    content: PropTypes.object,
    spendingAccountList: PropTypes.array,
    getAllAccountIds: PropTypes.array,
  },
  getInitialState() {
    return {
      isButtonDisable: false,
      accountNumbs: [],
    };
  },
  componentWillMount() {
    const accoutnNumber = [];
    _.map(this.props.getAllAccountIds, item => {
      accoutnNumber.push(item);
    });
    this.setState({ accountNumbs: accoutnNumber });
  },
  _getAccountIdOnToggle(e) {
    const accoutnNumber = this.state.accountNumbs;
    if (e.target.checked) {
      accoutnNumber.push(e.target.getAttribute('data-id'));
    } else {
      for (const i in accoutnNumber) {
        if (accoutnNumber[i] === e.target.getAttribute('data-id')) {
          accoutnNumber.splice(i, 1);
          break;
        }
      }
    }

    if (accoutnNumber.length === 0) {
      this.setState({ isButtonDisable: true });
    } else {
      this.setState({ isButtonDisable: false });
    }
    this.setState({ accountNumbs: accoutnNumber });
  },
  _onOkClick() {
    // Record an analytics user event.
    AnalyticsActionCreator.track({
        path: '/user/experience/activity',
        action: 'Interacted',
        }, {
        description: config.analytics.analytics_action_spend_filter_by_account,
        event: 'click',
    });
    SpendingsActionCreator.getSpendListConnection(this.state.accountNumbs);
  },
  render() {
    const content = this.props.content;
    const getAllAccountIds = this.props.getAllAccountIds;
    let accountsList = _.map(this.props.spendingAccountList, (account, i) => {
      const colorIndex = (i % 10) + 1;
      if (account.actions_available['/account/transactions/read']) {
        return (<AccountsList accNumbers={getAllAccountIds} colorIndex={colorIndex} key={i} dataKey={i} account={account} getAccountID={this._getAccountIdOnToggle}/>);
      }
    });
    return (
      <BasicModal keyboard={false} backdrop="static">
        <div className="toggle_content">
          <h3>Accounts</h3>
          {accountsList}
        </div>
        <div className="toggle_footer">
          <button onClick={this.props.onHide}>{content.spendingCancelButtonText}</button>
          <button disabled={this.state.isButtonDisable} onClick={this._onOkClick}>{content.spendingOkButtonText}</button>
        </div>
      </BasicModal>
    );
  },
});

module.exports = AccountsModal;
