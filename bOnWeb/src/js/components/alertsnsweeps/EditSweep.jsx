const React = require('react');
const AlertSweepModal = require('./AlertSweepModal');
const SweepsActionCreator = require('../../actions/SweepsActionCreator');
const AlertsNSweepsActionCreator = require('../../actions/AlertsNSweepsActionCreator');
const AlertsNSweepsStore = require('../../stores/AlertsNSweepsStore');
const SweepsStores = require('../../stores/SweepsStores');
const { PropTypes } = React;
const Select = require('react-select-box');
const _ = require('lodash');
const ReactDOM = require('react-dom');

const EditSweep = React.createClass({
  propTypes: {
    content: PropTypes.object,
    backSweep: PropTypes.func,
    sweepId: PropTypes.string,
    sweepEdited: PropTypes.func,
    deleteData: PropTypes.func,
    id: PropTypes.string,
    accountId: PropTypes.string,
  },
  getInitialState() {
    return {
      modalPopup: false,
      name: '',
      editSweep: AlertsNSweepsStore.getEditSweepData(this.props.sweepId),
      amount0: AlertsNSweepsStore.getEditSweepData(this.props.sweepId).alert[0].amount,
      amount1: AlertsNSweepsStore.getEditSweepData(this.props.sweepId).alert[0].amount1,
      cnfrmModal: false,
      showCnfrm: false,
      isNetworkError: SweepsStores.isNetworkError(),
      fromAccountId: AlertsNSweepsStore.getEditSweepData(this.props.sweepId).fromAccountId,
    };
  },

  onThresholdMoneyChange(evnts) {
    const evnt = evnts;
    this.setState({ modalPopup: false, name: '' });
    // const thresholdValue = this.getFormattedThresholdMoney(evnt.target.value);

    const thresholdValue = String(evnt.target.value).substring(1);
    if (thresholdValue === '-0' || thresholdValue === '-.') {
      evnt.target.value = '-';
      return;
    }
    if (thresholdValue === '00') {
      evnt.target.value = thresholdValue.substring(1);
      return;
    }

    const res = thresholdValue.match(/^[-]?[0-9]{0,6}(\.[0-9]{0,2})?$/);
    if (res === null) return;

    if ((parseFloat(thresholdValue) > (999899)) || parseFloat(thresholdValue) < -99999) {  // parseFloat(thresholdValue) > 0
      return;
    }


    const fromAccountId = this.state.fromAccountId;

    this.setState({ thresholdAmount: `£${thresholdValue}` });

    this.setState({ amount0: parseFloat(thresholdValue) });
    if (thresholdValue === '£') {
      // if (this.isAmountEmpty()) {
      this.setState({ showCnfrm: false });
    } else if (thresholdValue !== '' && (parseFloat(thresholdValue) !== parseFloat(this.state.editSweep.alert[0].amount) || this.state.amount1 !== parseFloat(this.state.editSweep.alert[0].amount1) ||
      fromAccountId !== (this.state.editSweep.fromAccountId))) {
      this.setState({ showCnfrm: true });
    } else {
      this.setState({ showCnfrm: false });
    }

    if (this.state.amount1 > Number(thresholdValue) + 100) return;

    const val = Number(thresholdValue) + 100;
    if (!(val) < this.state.amount1 && !isNaN(val)) {
      setTimeout(() => {
        this.setState({ targetAmount: `£${val}` });
        this.setState({ amount1: val });
        if (!this.isAmountEmpty()) {
          this.setState({ showCnfrm: true });
        }
      }, 200);
    }
  },


  onTargetMoneyChange(evnts) {
    const evnt = evnts;
    this.setState({ modalPopup: false, name: '' });
    const targetValue = String(evnt.target.value).substring(1);

    if (targetValue === '00') {
      evnt.target.value = targetValue.substring(1);
      return;
    }

    const res = targetValue.match(/^[-]?[0-9]{0,6}(\.[0-9]{0,2})?$/);

    if (res === null) return;
    this.targetAmount = targetValue;

    setTimeout(() => {
      this.updateStateOnTargetMoneyChange(targetValue);
    }, 50);
  },

  onUserAgreementInfoPopup() {
    if (!AlertsNSweepsStore.isJointAccount()) {
      this.setState({ modalPopup: true, name: 'info' });
    } else {
      this.setState({ modalPopup: true, name: 'jointInfo' });
    }
  },

  onGetMyAccount(e) {
    // this.setState({ myAccountId: e });
    this.setState({ account_id: e });
    AlertsNSweepsActionCreator.setSweepMyAccount(e);
  },

  onGetOtherAccount(e) {
    const isAccount = e === this.state.editSweep.fromAccountId;
    const isAccountNot = e !== this.state.editSweep.fromAccountId;
    const isAmount1 = this.state.amount1 !== parseFloat(this.state.editSweep.alert[0].amount1);
    const isAmount0 = this.state.amount0 !== parseFloat(this.state.editSweep.alert[0].amount);

    if (this.isAmountEmpty()) {
      this.setState({ showCnfrm: false });
    } else if (isAccount && (isAmount1 || isAmount0)) {
      this.setState({ showCnfrm: true });
    } else if (isAccountNot) {
      this.setState({ showCnfrm: true });
    } else {
      this.setState({ showCnfrm: false });
    }

    this.setState({ modalPopup: false, name: '' });
    this.getRealAccountName(e);
    this.setState({ fromAccountId: e });
    this.setState({ other_account_id: e });
    AlertsNSweepsActionCreator.setSweepMyAccountOut(e);
  },

  getRealAccountName(accountId) {
    const accounts = AlertsNSweepsStore.getSweepFromAccountName();
    if (this.refs.fromAccountDropDown) {
      const options = this.refs.fromAccountDropDown.options();
      if (options.length) {
        const account = _.find(accounts, { id: accountId });
        ReactDOM.findDOMNode(this.refs.fromAccountDropDown).childNodes[0].innerHTML = account.name;
      }
    }
  },

  getFromAccountDropDown() {
    const accounts = AlertsNSweepsStore.getSweepFromAccountName();
    if (accounts.length > 1) {
      return (<Select dir="rtl" ref="fromAccountDropDown" onChange = {this.onGetOtherAccount} value={this.getRealAccountName(this.state.editSweep.fromAccountId) }>
        {accounts.map((account, index) => {
          const label = `ending ${account.number.slice(-4)}`;
          // return <option key={index} value={account.id}>{account.name}{label}</option>;
          return <option key={index} value={account.id}><span>{account.name}</span><span>{label}</span></option>;
        })
        }
      </Select>);
    } else {
      return (<div className="editSweep">{accounts[0].name}</div>);
    }
  },

  getMyAccountDropDown() {
    return (<select dir="rtl" className="editSweep" disabled onChange = {this.onGetMyAccount} value={this.state.editSweep.id}>
      {AlertsNSweepsStore.getSweepToAccountName().map((account, index) => {
        return <option key={index} value={account.id}>{account.name}</option>;
      })
      }
    </select >);
  },

  isAmountEmpty() {
    if (this.state.thresholdAmount === '£' || this.state.targetAmount === '£') {
      return true;
    } else {
      return false;
    }
  },

  updateStateOnTargetMoneyChange(targetValue) {
    this.setState({ targetAmount: `£${targetValue}` });
    const fromAccountId = this.state.fromAccountId;
    if (this.isAmountEmpty()) {
      this.setState({ showCnfrm: false });
    } else if (targetValue !== '' && parseFloat(targetValue) !== parseFloat(this.state.editSweep.alert[0].amount1) || this.state.amount0 !== parseFloat(this.state.editSweep.alert[0].amount) || fromAccountId !== (this.state.editSweep.fromAccountId)) {
      this.setState({ showCnfrm: true });
    } else {
      this.setState({ showCnfrm: false });
    }

    if (parseFloat(targetValue) > this.state.amount1) {
      this.setState({ amount1: parseFloat(targetValue) });
    }

    if (parseFloat(targetValue) >= parseFloat(this.state.amount0 + 100)) {
      this.setState({ amount1: parseFloat(targetValue) });
    }

    if (this.state.amount0 >= parseFloat(targetValue)) {
      this.setState({ cnfrmModal: true });
    }

    if ((parseFloat(targetValue) - this.state.amount0) < 100) {
      this.setState({ cnfrmModal: true });
    }
  },

  updateSweep() {
    this.props.sweepEdited();
    AlertsNSweepsActionCreator.thresholdMoney(this.state.amount0);
    AlertsNSweepsActionCreator.targetMoney(this.state.amount1);
    AlertsNSweepsActionCreator.hideHeaderComponent(true);
    SweepsActionCreator.editSweepData(null, this.props.sweepId);
  },
  delPopup() {
    this.setState({
      modalPopup: true,
      name: 'delete',
    });
  },

  showHeader() {
    // this.props.backSweep();
    AlertsNSweepsActionCreator.hideHeaderComponent(true);
  },

  DeleteData() {
    AlertsNSweepsActionCreator.hideHeaderComponent(true);
    SweepsActionCreator.sendDeleteData(this.props.sweepId); // sweepid is a accountid.
    // this.props.deleteData();
    // this.props.notDeleted();
    this.props.sweepEdited();
  },

  closeToggleMessage() {
    this.setState({ cnfrmModal: false });
  },

  showNotification() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({ cnfrmModal: false });
      if (Number(this.state.amount1) > this.state.editSweep.alert[0].amount1) {
        this.setState({ showCnfrm: true });
      }
      if (this.targetAmount.length > 0) {
        this.setState({ targetAmount: `£${this.state.amount1}` });
      }
    }, 5000);
  },

  isConfirm() {
    if (this.state.thresholdAmount === undefined) {
      this.setState({ thresholdAmount: `£${this.state.editSweep.alert[0].amount}` });
    }
    if (this.state.targetAmount === undefined) {
      this.setState({ targetAmount: `£${this.state.editSweep.alert[0].amount1}` });
    }
    const thresholdAmount = String(this.state.thresholdAmount).substring(1);
    const targetAmount = String(this.state.targetAmount).substring(1);

    if (Number(targetAmount) > (Number(thresholdAmount) + 99) && (this.state.showCnfrm)) {
      return (
        <button className="action-button" onClick={this.updateSweep} value="update">{this.props.content.confirmChanges}</button>
      );
    } else {
      if (this.state.cnfrmModal) {
        this.showNotification();
        return (<div className="row no-gutters info-row">
          <div className = "col-lg-1 col-md-1 col-sm-1 col-xs-2 infoIconStyle">
            <a className="page-options opt-green ">
              <span className="icon icon-information"></span>
            </a>
          </div>
          <div className = "col-lg-10 col-md-10 col-sm-10 col-xs-8 info-data">
            <span>{this.props.content.triggerEntryViewController_TargetAmount_Error_Message}</span>
          </div>
          <div className = "col-lg-1 col-md-1 col-sm-1 col-xs-2 close-info text-center">
            <a className="page-options opt-green" onClick = {this.closeToggleMessage}><span className="icon icon-close"></span></a>
          </div>
        </div>);
      }
    }
  },

  render() {
    let amountValue1;
    if (this.state.thresholdAmount) {
      amountValue1 = this.state.thresholdAmount;
    } else {
      amountValue1 = `£${this.state.editSweep.alert[0].amount}`;
    }

    let amountValue2;
    if (this.state.targetAmount) {
      amountValue2 = this.state.targetAmount;
    } else {
      amountValue2 = `£${this.state.editSweep.alert[0].amount1}`;
    }

    return (
      <div className="content-wrapper">
        <div className="row no-gutters headerContainer">
          <div className="col-lg-2 col-md-2 col-sm-2 col-xs-3 ">
            <button type="button" className="page-options opt-white" onClick={this.showHeader}>
              <span >{this.props.content.cancelButton}</span>
            </button>
          </div>
          <div className="col-lg-8  col-lg-offset-0 col-md-8 col-md-offset-0 col-sm-8 col-sm-offset-0 col-xs-6 col-xs-offset-0">
            <h2 className="sweepHeading">{this.props.content.editMySweep}</h2>
          </div>
          <div className="col-lg-2 col-md-2 col-sm-2 col-xs-3 text-right">
            <button type="button" className="page-options opt-white" onClick={this.onUserAgreementInfoPopup}>
              <span className="icon icon-information"></span>
            </button>
            <button type="button" className="page-options opt-white" onClick={this.delPopup}>
              <span className="icon icon-delete"></span>
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-12 col">
            <ul className= "form-wrapper sweepsForm">
              <li className = "second-column">
                <section><span className="float-left">{this.props.content.sweepLine1}</span></section>
                <section>{this.getMyAccountDropDown() }</section>
              </li>
              <li className = "first-column">
                <section><span className="float-left" dangerouslySetInnerHTML = {{ __html: this.props.content.sweepLine2 }}></span></section>
                <section>
                  <h4 className="currency currency-value-holder">
                    <input type="text"
                      defaultValue={`£${this.state.editSweep.alert[0].amount}`}
                      onChange = {this.onThresholdMoneyChange}
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
                <section>
                  <span className="float-left" dangerouslySetInnerHTML = {{ __html: this.props.content.sweepLine3 }}></span>
                </section>
                <section>{this.getFromAccountDropDown() }</section>
              </li>
              <li className = "first-column">
                <section>
                  <span className="float-left">{this.props.content.sweepLine4}</span>
                </section>
                <section>
                  <h4 className="currency currency-value-holder">
                    <input type="text"
                      defaultValue={`£${this.state.editSweep.alert[0].amount1}`}
                      onChange = {this.onTargetMoneyChange}
                      value = {this.state.targetAmount}
                      placeholder=""
                    />
                    <span className="currency-value-border">
                      {amountValue2}
                    </span>
                  </h4>
                </section>
              </li>
            </ul>
          </div>
        </div>
        <div>
          {this.isConfirm() }
          <AlertSweepModal confirmCancel={this.state.modalPopup} deleteData={this.DeleteData} content={this.props.content} name={this.state.name} id={this.state.editSweep.id} sendDeleteData={this.sendDeleteData}/>
        </div>
      </div>
    );
  },
});

module.exports = EditSweep;
