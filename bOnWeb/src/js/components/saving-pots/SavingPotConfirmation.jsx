const React = require('react');
const { PropTypes } = React;
const SavingsPotsStore = require('../../stores/SavingsPotsStore');
const SavingPotsActionCreator = require('../../actions/SavingPotsActionCreator');
const PaymentsActionCreator = require('../../actions/PaymentsActionCreator');

const SavingPotConfirmation = React.createClass({
   propTypes: {
    getPotPageHandleClick: PropTypes.func,
    accountClass: PropTypes.string,
    content: PropTypes.object,
    getSelectedAccountID: React.PropTypes.string,
  },
  getInitialState() {
    return {
      newpotdata: SavingsPotsStore.getCreatedPotData(),
    };
  },
  _handleClickOnOffTransfer() {
    // accid and pot id and amount(kick amonut)
    const data = {
      id: this.props.getSelectedAccountID,
      potId: this.state.newpotdata.id,
      amt: sessionStorage.getItem('potbalance'),
      isMonthly: false,
    };
    SavingPotsActionCreator.handleTransferMoney(data);
    PaymentsActionCreator.navigateToWebTask('WEB-OPEN-PAYMENTS');
    this.props.getPotPageHandleClick();
  },
  _handleClickRegularTransfer() {
    // Monthly Payment, accid and pot id
    const data = {
      id: this.props.getSelectedAccountID,
      potId: this.state.newpotdata.id,
      amt: this.state.newpotdata.schedule.recurrence.amount.value,
      isMonthly: true,
    };
    SavingPotsActionCreator.handleTransferMoney(data);
    PaymentsActionCreator.navigateToWebTask('WEB-OPEN-PAYMENTS');
    this.props.getPotPageHandleClick();
  },
  render() {
    const content = this.props.content;
    return (
      <div className="main-container create-pot-success">
        <div className="text-center full-height">
          <div className="success__header text-right">
            <button className="page-options" onClick={this.props.getPotPageHandleClick}>
                {content.savingsPotCancelButton}
            </button>
          </div>
          <div className="success__content">
            <h2>{content.savingsPotConfirmationMessage}</h2>
            <div className="check-image">
              <span className="icon icon-done" ></span>
              <ul>
				<li>
					<button type="button" onClick={this._handleClickOnOffTransfer} className="page-options"><i className="icon icon-move"></i>{content.savingsPotConfirmationTransfer}</button>
				</li>
				<li>
					<button type="button" onClick={this._handleClickRegularTransfer} className="page-options"><i className="icon icon-move"></i>{content.savingsPotConfirmationTransferRegular}</button>
				</li>
            </ul>
            </div>
          </div>
              <button onClick={this.props.getPotPageHandleClick} className="action-button white">{content.savingDone}</button>
        </div>
      </div>
    );
  },
});

module.exports = SavingPotConfirmation;
