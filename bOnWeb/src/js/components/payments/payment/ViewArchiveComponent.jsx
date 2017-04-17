/**
 * @module ViewArchiveComponent
 */
const React = require('react');
const { PropTypes } = React;
const StringConstant = require('../../../constants/StringConstants');
const DateUtils = require('../../../utils/DateUtils');
const moment = require('moment');
const config = require('../../../config');
const NumberUtils = require('../../../utils/NumberUtils');

const ViewArchiveComponent = React.createClass({
  propTypes: {
    contents: PropTypes.object,
    archieveData: PropTypes.object,
    closed: PropTypes.func,
    id: PropTypes.string,
    accountId: PropTypes.string,
    onClick: PropTypes.func,
    isMobileView: PropTypes.bool,
  },
  componentWillMount() {

  },
  checkRepeat() {
  },
  // to close mobile view page
  closeMobileView() {
    this.props.onClick(false);
  },
  renderHeader() {
    const header = (
      <div className = "row no-gutters pay-Header">
        <div className="col-xs-3">
          {this.props.isMobileView ?
            <a className="page-options opt-green" onClick={this.closeMobileView}>{this.props.contents.cancel}</a> : ''}
        </div>
        <div className="col-xs-6 text-center">
          <h6 className="ModelHeader">{this.props.contents.managePayment}</h6>
        </div>

        <div className="col-xs-3 text-right">
          <a className="page-options opt-green inactive" disabled>{this.props.contents.edit}</a>
        </div>
      </div>);
    return header;
  },
  renderReference() {
    const reference =
      (<li>
        <section> {this.props.contents.reference}</section>
        {this.props.archieveData.reference.length === 0 ? <section> <input type="text" name={this.props.contents.payeeRequestPacket_reference} placeholder={this.props.contents.placeHolderContent} /></section>
          : <section >{this.props.archieveData.reference}</section>}
      </li>);
    return reference;
  },
  renderLastReference() {
    const reference =
      (<li className = "second-part">
        <section>Last Payment Reference</section>
        {this.props.archieveData.reference.length === 0 ? <section> <input type="text" name={this.props.contents.payeeRequestPacket_reference} placeholder={this.props.contents.placeHolderContent} /></section>
          : <section >{this.props.archieveData.reference}</section>}
      </li>);
    return reference;
  },
  renderType() {
    const type = (<li>
      <section> {this.props.contents.type}</section>
      <section >{this.props.archieveData.type}</section>
    </li>
    );
    return type;
  },
  renderAmount() {
    const amount = (<li>
      <section>Amount</section>
      <section>{NumberUtils.decimalFormat(this.props.archieveData.amount, 3, true) }</section>
    </li>
    );
    return amount;
  },
  renderRepeatPayment() {
    const repeatPayment = (<li className = "second-part">
      <section>{this.props.contents.repeatPayment}</section>
      <section>Yes</section>
    </li>);
    return repeatPayment;
  },
  renderStandingOrder() {
    return (
      <div>
        {this.renderHeader() }
        <div className = "edit-table">
          <ul>
            <li className = "first-part">
              <section>Name</section>
              <section>{this.props.archieveData.to}</section>
            </li>
            <li className = "first-part">
              <section> {this.props.contents.accountLabel}</section>
              <section>{this.props.archieveData.from}</section>
            </li>
            {this.props.archieveData.amount !== undefined ? this.renderAmount() : null }
            {this.renderReference() }
            {this.renderType() }
            {this.renderRepeatPayment() }
          </ul>
        </div>
      </div>);
  },
  renderDirectDebit() {
    return (
      <div>
        {this.renderHeader() }
        <div className = "edit-table">
          <ul>
            <li className = "first-part">
              <section>Name</section>
              <section>{this.props.archieveData.to}</section>
            </li>
            <li className = "first-part">
              <section> {this.props.contents.accountLabel}</section>
              <section>{this.props.archieveData.from}</section>
            </li>
            {this.props.archieveData.amount !== undefined ? this.renderDirectAmount() : null }
            {this.props.archieveData.when !== undefined ? this.renderLastPayment() : null }
            {this.renderLastReference() }
            {this.renderRepeatPayment() }
          </ul>
        </div>
      </div>);
  },
  renderDirectAmount() {
    const amount = (<li>
      <section>Last Amount</section>
      <section>{NumberUtils.decimalFormat(this.props.archieveData.amount, 3, true) }</section>
    </li>
    );
    return amount;
  },
  renderLastPayment() {
    let endDate = DateUtils.getMomentFromDateString(this.props.archieveData.when);
    endDate = moment(endDate).format(config.dateFormatTimeline);
    const lastPayment = (<li>
      <section>Last Payment</section>
      <section>{endDate}</section>
    </li>
    );
    return lastPayment;
  },
  render() {
    if (this.props.archieveData.category === StringConstant.DDPayment) {
      return this.renderDirectDebit();
    } else {
      return this.renderStandingOrder();
    }
  },


});

module.exports = ViewArchiveComponent;
