/**
 * @module SavingPotsRejig
 */
const React = require('react');
const SavingPotsActionCreator = require('../../actions/SavingPotsActionCreator');
const { PropTypes } = React;
const NumberUtils = require('../../utils/NumberUtils');
const PaymentsActionCreator = require('../../actions/PaymentsActionCreator');

const SavingPotsRejig = React.createClass({
  propTypes: {
    unallocatedAmount: PropTypes.number,
    pots: PropTypes.array,
    content: PropTypes.object,
    getSelectedAccountID: React.PropTypes.string,
  },
  _getReducePotPage() {
    SavingPotsActionCreator.getReducePotPage(this.props.pots);
  },
  _handleMoveMoney() {
    //  - Move money - transfer to payment page
    const data = {
      id: this.props.getSelectedAccountID,
    };
    SavingPotsActionCreator.handleMoveMoney(data);
    PaymentsActionCreator.navigateToWebTask('WEB-OPEN-PAYMENTS');
  },
  render() {
    const content = this.props.content;
    const unallocatedAmount = this.props.unallocatedAmount;
    const unAmount = NumberUtils.appendCurrency('{}', Math.abs(unallocatedAmount));
    return (
        <div className="savingPotsRejig__wrapper">
          <div className="savingPotsRejig text-center">
            <div className="rejig__image">
              <img src="../images/b/gingerbread-man.png" alt="rejig pot image"/>
            </div>
            <div className="rejig_content">
              <h2>{content.savingPotRejigTitle}</h2>
              <p>
                  {content.savingpotRejigMessage1} <strong>{unAmount}</strong> {content.savingpotRejigMessage2}
              </p>
              <div className="rejig_btn">
                  <button className="page-options border opt-green" type="button" onClick={this._getReducePotPage}>{content.savingPotReduceRejigButton}</button>
                  <button className="page-options border opt-green" type="button" onClick={this._handleMoveMoney}>{content.savingPotMoveMoneyButton2}</button>
              </div>
            </div>
          </div>
        </div>
    );
  },
});

module.exports = SavingPotsRejig;
