const React = require('react');
const AlertSweepModal = require('./AlertSweepModal');
const SweepsActionCreator = require('../../actions/SweepsActionCreator');
const AlertsNSweepsActionCreator = require('../../actions/AlertsNSweepsActionCreator');
const AlertsNSweepsStore = require('../../stores/AlertsNSweepsStore');
// const NumberUtils = require('../../utils/NumberUtils');
const Select = require('react-select-box');
const { PropTypes } = React;
const ReactDOM = require('react-dom');
const _ = require('lodash');

const CreateSweep = React.createClass({
  propTypes: {
    content: PropTypes.object,
    backSweep: PropTypes.func,
    sweepId: PropTypes.string,
    sweepCreated: PropTypes.func,
  },

  getInitialState() {
    return {
      modalPopup: false,
      name: '',
      editSweep: AlertsNSweepsStore.getEditSweepData(),
      amount0: 50,
      amount1: 150,
      cnfrmModal: false,
      thresholdAmount: '£50',
      targetAmount: '£150',
      showCnfrm: true,
    };
  },
  componentDidMount() {
    // Get the default value of dropdown components.
    this.initToAccount();
    this.initFromAccount();
  },


  onThresholdMoneyChange(evnts) {
    const evnt = evnts;
    this.setState({ modalPopup: false, name: '' });
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

    if (thresholdValue !== '' && ((parseFloat(thresholdValue) > 0 && parseFloat(thresholdValue) > (999899)) || parseFloat(thresholdValue) < -99999)) {
      return;
    }

    if (thresholdValue !== '') {
      this.setState({ showCnfrm: true });
    } else {
      this.setState({ showCnfrm: false });
    }

    this.setState({ thresholdAmount: `£${thresholdValue}` });
    this.setState({ amount0: parseFloat(thresholdValue) });

    if (this.state.amount1 > Number(thresholdValue) + 100) return;

    const val = Number(thresholdValue) + 100;

    if (!(val) < this.state.amount1 && !isNaN(val)) {
      setTimeout(() => {
        this.setState({ targetAmount: `£${val}` });
        this.setState({ amount1: val });
      }, 200);
    }
  },

  onTargetMoneyChange(evnts) {
    const evnt = evnts;
    this.setState({ modalPopup: false, name: '' });
    const targetValue = String(evnt.target.value).substring(1);
    if (targetValue === '-0' || targetValue === '-.') {
      evnt.target.value = '-';
      return;
    }

    if (targetValue === '00') {
      evnt.target.value = targetValue.substring(1);
      return;
    }

    const res = targetValue.match(/^[-]?[0-9]{0,6}(\.[0-9]{0,2})?$/);

    if (res === null) return;

    setTimeout(() => {
      this.updateStateOnTargetMoneyChange(targetValue);
    }, 50);
  },

  onGetOtherAccount(accounId) {
    this.setState({ modalPopup: false, name: '' });
    this.getFromAccountName(accounId);
    this.setState({ other_account_id: accounId });
    // AlertsNSweepsActionCreator.setSweepMyAccountOut(accounId);
  },

  getFromAccountName(accountId) {
    const accounts = AlertsNSweepsStore.getSweepFromAccountName();
    if (this.refs.fromAccountCreateSweepDropDown) {
      const options = this.refs.fromAccountCreateSweepDropDown.options();
      if (options.length) {
        const account = _.find(accounts, { id: accountId });
        ReactDOM.findDOMNode(this.refs.fromAccountCreateSweepDropDown).childNodes[0].innerHTML = account.name;
      }
    }
  },

  getToAccountName(accountId) {
    const accounts = AlertsNSweepsStore.getSweepToAccountName();
    if (this.refs.myAccount) {
      const options = this.refs.myAccount.options();
      if (options.length) {
        const account = _.find(accounts, { id: accountId });
        ReactDOM.findDOMNode(this.refs.myAccount).childNodes[0].innerHTML = account.name;
      }
    }
  },

  getMyAccount(accounId) {
    this.setState({ modalPopup: false, name: '' });
    this.getToAccountName(accounId);
    this.setState({ account_id: accounId });
    // AlertsNSweepsActionCreator.setSweepMyAccount(accounId);
  },

  getFromAccountDropDown() {
    const accounts = AlertsNSweepsStore.getSweepFromAccountName();
    const defaultValue = accounts && accounts[0].id;
    if (accounts.length > 1) {
      return (<Select dir="rtl" ref="fromAccountCreateSweepDropDown" onChange = {this.onGetOtherAccount} value={this.getFromAccountName(defaultValue) }>
        {accounts.map((account, index) => {
          const label = `ending ${account.number.slice(-4)}`;
          return <option key={index} value={account.id}><span>{account.name}</span><span>{label}</span></option>;
        })
        }
      </Select>);
    } else {
      return (<div className="editSweep">{accounts[0].name}</div>);
    }
  },

  getToAccounts() {
    const accounts = AlertsNSweepsStore.getSweepToAccountName();
    const newList = [];
    const sweepList = AlertsNSweepsStore.getSweepsList();

    accounts.map((account, index) => {
      if (sweepList !== undefined && sweepList.length > 0) {
        const tempAccount = _(sweepList).filter(c => c.id === account.id).value()[0];
        if (tempAccount === undefined) {
          newList.push(account);
        }
      } else {
        newList.push(account);
      }
    });
    return newList;
  },

  updateStateOnTargetMoneyChange(targetValue) {
    this.setState({ targetAmount: `£${targetValue}` });
    // set amount1 if current input is less than amount1
    if (parseFloat(targetValue) > this.state.amount1) {
      this.setState({ amount1: parseFloat(targetValue) });
    }

    // this.setState({ amount1: parseFloat(targetValue) });
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

  isConfirm() {
    const thresholdValue = String(this.state.thresholdAmount).substring(1);
    const targetValue = String(this.state.targetAmount).substring(1);
    if (Number(targetValue) > (Number(thresholdValue) + 99) && this.state.showCnfrm) { // && thresholdValue >= 0
      return (
        <button className="action-button" onClick={this.createSweep} value="update">{this.props.content.confirmButton}</button>
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

  createSweep() {
    AlertsNSweepsActionCreator.hideHeaderComponent(true);

    let accountId = this.state.account_id;
    const list = this.getToAccounts();
    if (list.length === 1) {
      accountId = list[0].id;
    }
    AlertsNSweepsActionCreator.setSweepMyAccount(accountId);
    AlertsNSweepsActionCreator.setSweepMyAccountOut(this.state.other_account_id);
    AlertsNSweepsActionCreator.thresholdMoney(parseFloat(this.state.amount0));
    AlertsNSweepsActionCreator.targetMoney(parseFloat(this.state.amount1));
    SweepsActionCreator.createSweepData();
    this.props.sweepCreated();
  },

  infoPopup() {
    if (!AlertsNSweepsStore.isJointAccount()) {
      this.setState({ modalPopup: true, name: 'info' });
    } else {
      this.setState({ modalPopup: true, name: 'jointInfo' });
    }
  },

  closeToggleMessage() {
    this.setState({ cnfrmModal: false });
  },

  showNotification() {
    // setTimeout(() => {
    //   this.setState({ cnfrmModal: false });
    //   this.setState({ targetAmount: `£${this.state.amount1}` });
    // }, 4000);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({ cnfrmModal: false });
      if (Number(this.state.amount1) > this.state.editSweep.alert[0].amount1) {
        this.setState({ showCnfrm: true });
      }
      if (this.targetAmount.length > 0) {
        this.setState({ targetAmount: `£${this.state.amount1}` });
      }
    }, 4000);
  },


  showHeader() {
    // this.props.backSweep();
    AlertsNSweepsActionCreator.hideHeaderComponent(true);
  },

  initFromAccount() {
    const fromAccountDropDown = this.refs.fromAccountCreateSweepDropDown;
    const sweepFromAccount = AlertsNSweepsStore.getSweepFromAccountName();
    const fromAccountId = sweepFromAccount && sweepFromAccount[0].id;

    if (fromAccountDropDown) {
      const options = fromAccountDropDown.options();
      if (options.length > 1) {
        const accounts = AlertsNSweepsStore.getSweepFromAccountName();
        const account = _.find(accounts, { id: fromAccountId });
        ReactDOM.findDOMNode(fromAccountDropDown).childNodes[0].innerHTML = account.name;
      }
    }
    this.getFromAccountName(fromAccountId);
    this.setState({ other_account_id: fromAccountId });
    AlertsNSweepsActionCreator.thresholdMoney(parseFloat(this.state.amount0));
  },

  initToAccount() {
    const myAccountDropDown = this.refs.myAccount;
    const sweepToAccount = this.getToAccounts(); // AlertsNSweepsStore.getSweepToAccountName();
    const toAccountId = sweepToAccount && sweepToAccount[0].id;
    if (myAccountDropDown) {
      const options = myAccountDropDown.options();
      if (options.length > 1) {
        const accounts = AlertsNSweepsStore.getSweepToAccountName();
        const account = _.find(accounts, { id: toAccountId });
        ReactDOM.findDOMNode(myAccountDropDown).childNodes[0].innerHTML = account.name;
      }
    }
    this.getToAccountName(toAccountId);
    this.setState({ account_id: toAccountId });
  },

  renderToAccounts() {
    // const accounts = AlertsNSweepsStore.getSweepToAccountName();
    const newList = this.getToAccounts();
    const defaultValue = newList && newList[0].id;

    if (newList.length > 1) {
      return (<Select dir="rtl" ref="myAccount" onChange = {this.getMyAccount} value={this.getToAccountName(defaultValue) }>
        {
          newList.map((account, index) => {
            const label = `ending ${account.number.slice(-4)}`;
            return <option key={index} value={account.id}><span>{account.name}</span><span>{label}</span></option>;
          })
        }
      </Select >);
    } else {
      return (<div className="editSweep">{newList[0].name}</div>);
    }
  },

  render() {
    let amountValue1;
    if (this.state.thresholdAmount) {
      amountValue1 = this.state.thresholdAmount;
    } else {
      if (this.state.editSweep.alert[0].amount === undefined) {
        amountValue1 = '£50';
      } else {
        amountValue1 = `£${this.state.editSweep.alert[0].amount}`;
      }
    }

    let amountValue2;
    if (this.state.targetAmount) {
      amountValue2 = this.state.targetAmount;
    } else {
      if (this.state.editSweep.alert[0].amount1 === undefined) {
        amountValue2 = '£150';
      } else {
        amountValue2 = `£${this.state.editSweep.alert[0].amount1}`;
      }
    }
    return (
      <div className="content-wrapper">

        <div className="row no-gutters headerContainer">
          <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 ">
            <button type="button" className="page-options opt-white" onClick={this.showHeader}>
              <span >Cancel</span>
            </button>
          </div>
          <div className="col-lg-8  col-lg-offset-0 col-md-8 col-md-offset-0 col-sm-8 col-sm-offset-0 col-xs-8 col-xs-offset-0">
            <h2 className="sweepHeading">{this.props.content.createMySweep}</h2>
          </div>
          <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-right">
            <button type="button" className="page-options opt-white" onClick={this.infoPopup}>
              <span className="icon icon-information"></span>
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-12 col">
            <ul className= "form-wrapper sweepsForm">
              <li>
                <section><span className="float-left">{this.props.content.sweepLine1}</span></section>
                <section><span className="float-right">{this.renderToAccounts() }</span></section>
              </li>
              <li className = "first-column">
                <section><span className="float-left" dangerouslySetInnerHTML = {{ __html: this.props.content.sweepLine2 }}></span></section>
                <section>
                  <h4 className="currency currency-value-holder">
                    <input
                      type="text"
                      defaultValue={`£${50}`}
                      onChange = {this.onThresholdMoneyChange}
                      value = {this.state.thresholdAmount}
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
                <section><span className="float-right">{this.getFromAccountDropDown() }</span></section>
              </li>
              <li>
                <section>
                  <span className="float-left">{this.props.content.sweepLine4}</span>
                </section>
                <section>
                  <h4 className="currency currency-value-holder">
                    <input type="text"
                      defaultValue={`£${150}`}
                      onChange = {this.onTargetMoneyChange}
                      onBlur = {this.onTargetMoneyBlur}
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
          <AlertSweepModal confirmCancel={this.state.modalPopup} content={this.props.content} name={this.state.name} />
        </div>
      </div>
    );
  },
});

module.exports = CreateSweep;

