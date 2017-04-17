/**
 * @module SavingPots
 */
const React = require('react');
const { PropTypes } = React;
const NumberUtils = require('../../utils/NumberUtils');
const _ = require('lodash');

const SavingPotsList = require('./SavingPotsList');
const SavingPotsActionCreator = require('../../actions/SavingPotsActionCreator');

let potContent;

const SavingPots = React.createClass({
  propTypes: {
    pots: PropTypes.array,
    unallocatedAmount: PropTypes.number,
    content: PropTypes.object,
  },
  _getCreateSavingPot() {
    SavingPotsActionCreator.getCreateSavingPotPage();
  },
  render() {
    let content = this.props.content;
    const pots = this.props.pots;
    const unallocatedAmount = NumberUtils.appendCurrency('{}', this.props.unallocatedAmount);
    if (pots.length > 0) {
      potContent = _.map(pots, (pot, i) => <SavingPotsList key={i} pot={pot} content={content}/>);
    } else {
      potContent = <button onClick={this._getCreateSavingPot} type="button" className="col-xs-12 noPotMessage">{content.SavingLinkPot}</button>;
    }
    return (
      <div className="saving_pot_list__wrapper">
        <div className="unallocated__message">{content.savingpotMainPageTitle1} <strong>{unallocatedAmount}</strong> {content.savingpotMainPageTitle2}</div>
        <div className="create_savingspot">
        <button type="button" className="page-options opt-green btn btn-link" onClick={this._getCreateSavingPot}>
          <span className="icon icon-add"></span>
          {content.SavingLinkPot}
        </button>
        </div>
        <div className="saving_pot_list">
          {potContent}
        </div>
      </div>
    );
  },
});

module.exports = SavingPots;
