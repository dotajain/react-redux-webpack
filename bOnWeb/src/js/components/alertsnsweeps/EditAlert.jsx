const React = require('react');
const AlertsActionCreator = require('../../actions/AlertsActionCreator');
const { PropTypes } = React;
const AlertSweepModal = require('./AlertSweepModal');
const AlertsNSweepsActionCreator = require('../../actions/AlertsNSweepsActionCreator');
const AlertsNSweepsStore = require('../../stores/AlertsNSweepsStore');
const _ = require('lodash');

const EditAlert = React.createClass({
  propTypes: {
    content: PropTypes.object,
    alertId: PropTypes.string,
    backAlert: PropTypes.func,
    alertUpdated: PropTypes.func,
    lessMore: PropTypes.string,
  },
  getInitialState() {
    return {
      modalPopup: false,
      editAlert: this.getAlert(AlertsNSweepsStore.getEditAlertData(this.props.alertId)),
      amount: 0,
      showCnfrm: false,
      thresholdAmount: `£${this.getAlert(AlertsNSweepsStore.getEditAlertData(this.props.alertId)).amount}`,
    };
  },

  getAlert(alerts) {
    return _(alerts.alert).filter(c => c.label === this.props.lessMore).value()[0];
  },

  getLessMoreValue(e) {
    this.setState({ lessMore: e });
    AlertsNSweepsActionCreator.setAlertLessMoreValue(e);
  },

  getAlertMyAccount(e) {
    AlertsNSweepsActionCreator.setAlertMyAccount(e);
  },

  getMyAccountDropDown() {
    return (<select dir="rtl" className="editSweep" disabled="disabled" ref="alertDrop" onChange = {this.getAlertMyAccount} value={this.props.alertId}>
      {AlertsNSweepsStore.getAlertAccountName().map(account => {
        return <option value={account.id}>{account.name}</option>;
      })
      }
    </select >);
  },


  editAlert() {
    AlertsNSweepsActionCreator.hideHeaderComponent(true);
    this.state.amount = this.state.amount === undefined ? this.state.editAlert.amount : this.state.amount;
    this.state.lessMore = this.state.lessMore === undefined ? this.state.editAlert.lessMore : this.state.lessMore;
    // AlertsActionCreator.sendEditAlertData(this.props.alertId, this.props.lessMore);
    AlertsNSweepsActionCreator.targetAlertMoney(parseFloat(this.state.amount));

    AlertsActionCreator.sendEditAlertData(this.props.alertId, this.state.amount, this.state.lessMore, this.state.editAlert.enabled, false);
    this.props.alertUpdated();
  },

  thresholdMoney(evnts) {
    const evnt = evnts;
    // let thresholdValue = this.getFormattedAmount(evnt.target.value);
    const thresholdValue = String(evnt.target.value).substring(1);
    const res = thresholdValue.match(/^[0-9]{0,6}(\.[0-9]{0,2})?$/);
    if (res === null) return;
    if (thresholdValue === '00') {
      evnt.target.value = thresholdValue.substring(1);
      return;
    }
    if (thresholdValue >= 0 && thresholdValue !== '' && parseFloat(thresholdValue) !== parseFloat(this.state.editAlert.amount)) {
      this.setState({ showCnfrm: true });
    } else {
      this.setState({ showCnfrm: false });
    }
    this.setState({ thresholdAmount: `£${thresholdValue}` });
    this.setState({ amount: thresholdValue });
    // AlertsNSweepsActionCreator.targetAlertMoney(thresholdValue);
  },

  showHeader() {
    // this.props.backAlert();
    AlertsNSweepsActionCreator.hideHeaderComponent(true);
  },

  lessMore() {
    const less = this.state.lessMore === undefined ? this.state.editAlert.lessMore : this.state.lessMore;
    return (<select dir="rtl" disabled="disabled" onChange = {this.getLessMoreValue} value={less}>
      {AlertsNSweepsStore.getAlertLessMoreValue().map(lessMore => {
        return <option value={lessMore.id}>{lessMore.name}</option>;
      })
      }
    </select>);
  },

  isConfirm() {
    if (this.state.showCnfrm) {
      return (
        <button className="action-button" onClick={this.editAlert}>{this.props.content.confirmChanges}</button>);
    }
  },

  render() {
    let amountValue1;
    if (this.state.thresholdAmount) {
      amountValue1 = this.state.thresholdAmount;
    } else {
      amountValue1 = `£${this.state.editAlert.amount}`;
    }
    return (
      <div className="content-wrapper">
        <div className="row no-gutters headerContainer">
          <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 ">
            <button type="button" className="page-options opt-white" onClick={this.showHeader}>
              <span >{this.props.content.cancelButton}</span>
            </button>
          </div>
          <div className="col-lg-8  col-lg-offset-0 col-md-8 col-md-offset-0 col-sm-8 col-sm-offset-0 col-xs-8  col-xs-offset-0">
            <h2 className="sweepHeading">{this.props.content.editMyAlert}</h2>
          </div>
          <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-12 col">
            <ul className= "form-wrapper sweepsForm">
              <li>
                <section><span className="float-left">{this.props.content.inMy}</span></section>
                <section>{this.getMyAccountDropDown() }</section>
              </li>
              <li>
                <section><span className="float-left">{this.props.content.whenIHave}</span></section>
                <section>{this.lessMore() }</section>
              </li>
              <li>
                <section><span className="float-left">{this.props.content.than}</span></section>
                <section>
                  <h4 className="currency currency-value-holder">
                    <input type="text"
                      defaultValue={`£${this.state.editAlert.amount}`}
                      onChange = {this.thresholdMoney}
                      value = {this.state.thresholdAmount}
                      placeholder=""
                    />
                    <span className="currency-value-border">
                      {amountValue1}
                    </span>
                  </h4>
                </section>
              </li>
              <li>
                <section><span className="float-left" dangerouslySetInnerHTML = {{ __html: this.props.content.projectionLine3 }}></span></section>
                <section><span className="float-right" dangerouslySetInnerHTML = {{ __html: this.props.content.sms }}></span></section>
              </li>
            </ul>
          </div>
        </div>
        <div>
          {this.isConfirm() }
          <AlertSweepModal confirmCancel={this.state.modalPopup} content={this.props.content} />
        </div>
      </div>
    );
  },
});

module.exports = EditAlert;

