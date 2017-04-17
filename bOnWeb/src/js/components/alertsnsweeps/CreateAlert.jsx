const React = require('react');
const AlertsActionCreator = require('../../actions/AlertsActionCreator');
const { PropTypes } = React;
const AlertSweepModal = require('./AlertSweepModal');
const AlertsNSweepsStore = require('../../stores/AlertsNSweepsStore');
const AlertsNSweepsActionCreator = require('../../actions/AlertsNSweepsActionCreator');
const Select = require('react-select-box');
const ReactDOM = require('react-dom');
const _ = require('lodash');

const CreateAlert = React.createClass({
  propTypes: {
    content: PropTypes.object,
    alertCreated: PropTypes.func,
  },
  getInitialState() {
    return {
      modalPopup: false,
      editAlert: AlertsNSweepsStore.getEditAlertData(),
      thresholdAmount: '£50',
      accountId: '',
      lessMore: '',
      showCnfrm: true,
    };
  },

  componentWillMount() {
    const accounts = this.getNotAllAlertCreatedAccount();
    const accountId = accounts && accounts[0].id;
    this.setState({ accountId: accountId });

    const label = this.getExisitngAlertLessMore(accountId);
    this.setState({ lessMore: label });
    this.setAlertAmount(accountId);
  },
  componentDidMount() {
    // Get the default value of dropdown components.
    const createAccountDropDown = this.refs.createAlertMyAccountDropDown;
    const accounts = this.getNotAllAlertCreatedAccount();
    const accountId = accounts && accounts[0].id;
    if (createAccountDropDown) {
      const options = createAccountDropDown.options();
      if (options.length > 1) {
        const account = _.find(accounts, { id: accountId });
        ReactDOM.findDOMNode(createAccountDropDown).childNodes[0].innerHTML = account.name;
      }
    }

    // Handling the default value of lessMore Dropdown.
    const createAlertLessMoreDropDown = this.refs.createAlertLessMoreDropDown;
    const label = this.getExisitngAlertLessMore(accountId);
    if (createAlertLessMoreDropDown) {
      const options = createAlertLessMoreDropDown.options();
      if (options.length) {
        const displayLabel = label.charAt(0).toUpperCase() + label.slice(1);
        ReactDOM.findDOMNode(createAlertLessMoreDropDown).childNodes[0].innerHTML = displayLabel;
      }
    }
  },

  componentDidUpdate() {
    const createAlertLessMoreDropDown = this.refs.createAlertLessMoreDropDown;
    if (createAlertLessMoreDropDown) {
      const options = createAlertLessMoreDropDown.options();
      if (options.length) {
        const label = this.state.lessMore;
        const displayLabel = label.charAt(0).toUpperCase() + label.slice(1);
        ReactDOM.findDOMNode(createAlertLessMoreDropDown).childNodes[0].innerHTML = displayLabel;
      }
    }
  },

  onThresholdMoneyChange(evnts) {
    const evnt = evnts;
    const thresholdValue = String(evnt.target.value).substring(1);
    if (thresholdValue === '00') {
      evnt.target.value = thresholdValue.substring(1);
      return;
    }
    const res = thresholdValue.match(/^[0-9]{0,6}(\.[0-9]{0,2})?$/);
    if (res === null) return;

    if (thresholdValue >= 0 && thresholdValue !== '') {
      this.setState({ showCnfrm: true });
    } else {
      this.setState({ showCnfrm: false });
    }
    this.setState({ thresholdAmount: `£${thresholdValue}` });
  },

  onGetAlertMyAccount(value) {
    this.setState({ accountId: value });
    AlertsNSweepsActionCreator.setAlertMyAccount(value);
    this.setAlertAmount(value);
  },

  getLessMoreValue(value) {
    this.setState({ lessMore: value });
    AlertsNSweepsActionCreator.setAlertLessMoreValue(value);
  },

  getRealAccountName(accountId) {
    const accounts = this.getNotAllAlertCreatedAccount();
    if (this.refs.createAlertMyAccountDropDown) {
      const options = this.refs.createAlertMyAccountDropDown.options();
      if (options.length) {
        const account = _.find(accounts, { id: accountId });
        ReactDOM.findDOMNode(this.refs.createAlertMyAccountDropDown).childNodes[0].innerHTML = account.name;
      }
    }
  },

  getLessMoreDropDown() {
    const lessMoreValues = AlertsNSweepsStore.getAlertLessMoreValue();
    const less = this.getExisitngAlertLessMore(this.state.accountId);
    const isDropDown = this.isAlertsPending(this.state.accountId);
    if (!isDropDown) {
      return (<Select ref="createAlertLessMoreDropDown" onChange = {this.getLessMoreValue} value={less}>
        {lessMoreValues.map((lessMore, index) => {
          return <option key={index} value={lessMore.id}><span>{lessMore.name}</span></option>;
        })
        }
      </Select >);
    } else {
      const remainingAlert = this.getExisitngAlertLessMore(this.state.accountId);
      const lessMore = _(lessMoreValues).filter(c => c.id === remainingAlert).value()[0];
      return (<select dir="rtl" className="createAlert" disabled ref="createAlertLessMoreDropDownDisabled" value={less}>
        return <option value={lessMore.id}>{lessMore.name}</option>;
        }
      </select >);
    }
  },

  getExisitngAlertLessMore(accountId) {
    const alertList = AlertsNSweepsStore.getAlertsList();
    const tempAlert = _(alertList).filter(c => c.id === accountId).value()[0];
    if (tempAlert && tempAlert.alert.length > 0) {
      if (tempAlert.alert[0].lessMore === 'more') {
        return 'less';
      } else {
        return 'more';
      }
    } else {
      return 'less';
    }
  },

  getNotAllAlertCreatedAccount() {
    const newAccountList = [];
    const accounts = AlertsNSweepsStore.getAlertAccountName();
    const alertList = AlertsNSweepsStore.getAlertsList();
    accounts.forEach(account => {
      const tempAccount = _(alertList).filter(c => c.id === account.id).value()[0];
      if (!tempAccount) {
        newAccountList.push(account);
      } else {
        if (tempAccount.alert.length < 2) {
          newAccountList.push(account);
        }
      }
    }
    );
    return newAccountList;
  },
  setAlertAmount(accountId) {
    const alertList = AlertsNSweepsStore.getAlertsList();
    const tempAlert = _(alertList).filter(c => c.id === accountId).value()[0];
    const label = this.getExisitngAlertLessMore(accountId);
    if (tempAlert && tempAlert.alert.length > 0 && label !== 'less') {
      this.setState({ thresholdAmount: '£', showCnfrm: false });
    } else {
      this.setState({ thresholdAmount: '£50', showCnfrm: true });
    }
  },
  getMyAccountDropDown() {
    const accounts = this.getNotAllAlertCreatedAccount();
    const cur_accountId = accounts[0].id;
    if (accounts.length > 1) {
      return (<Select ref="createAlertMyAccountDropDown" onChange = {this.onGetAlertMyAccount} value={this.getRealAccountName(cur_accountId) }>
        {accounts.map((account, index) => {
          const label = `ending ${account.number.slice(-4)}`;
          return <option key={index} value={account.id}><span>{account.name}</span><span>{label}</span></option>;
        })
        }
      </Select >);
    } else {
      return (<div className="editSweep">{accounts[0].name}</div>);
    }
  },

  isAlertsPending(accountId) {
    const alertList = AlertsNSweepsStore.getAlertsList();
    const tempAlert = _(alertList).filter(c => c.id === accountId).value()[0];
    return tempAlert;
  },

  showHeader() {
    AlertsNSweepsActionCreator.hideHeaderComponent(true);
  },

  createAlert() {
    AlertsNSweepsActionCreator.hideHeaderComponent(true);
    AlertsNSweepsActionCreator.setAlertMyAccount(this.state.accountId);
    AlertsNSweepsActionCreator.setAlertLessMoreValue(this.state.lessMore);
    const thanValue = String(this.state.thresholdAmount).substring(1);
    AlertsNSweepsActionCreator.targetAlertMoney(parseFloat(thanValue));
    AlertsActionCreator.sendAlertData();
    this.props.alertCreated();
  },

  isConfirm() {
    if (this.state.showCnfrm) {
      return (
        <button className="action-button" onClick={this.createAlert}>{this.props.content.confirmButton}</button>);
    }
  },

  render() {
    let amountValue1;
    if (this.state.thresholdAmount) {
      amountValue1 = this.state.thresholdAmount;
    } else {
      if (this.state.editAlert.amount === undefined) {
        amountValue1 = '£50';
      } else {
        amountValue1 = `£${this.state.editAlert.amount}`;
      }
    }

    return (
      <div className="content-wrapper">
        <div className="row no-gutters headerContainer">
          <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 ">
            <button type="button" className="page-options opt-white" onClick={this.showHeader}>
              <span>{this.props.content.cancelButton}</span>
            </button>
          </div>
          <div className="col-lg-8  col-lg-offset-0 col-md-8 col-md-offset-0 col-sm-8 col-sm-offset-0 col-xs-8  col-xs-offset-0">
            <h2 className="sweepHeading">{this.props.content.createMyAlert}</h2>
          </div>
          <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-12 col">
            <ul className= "form-wrapper sweepsForm">
              <li>
                <section><span className="float-left">{this.props.content.inMy}</span></section>
                <section><span className="float-right">{this.getMyAccountDropDown() }</span></section>
              </li>
              <li>
                <section><span className="float-left">{this.props.content.whenIHave}</span></section>
                <section>{this.getLessMoreDropDown() }</section>
              </li>
              <li>
                <section><span className="float-left">{this.props.content.than}</span></section>
                <section>
                  <h4 className="currency currency-value-holder">
                    <input type="text"
                      value = {this.state.thresholdAmount}
                      defaultValue = {`£${50}`}
                      onChange={this.onThresholdMoneyChange}
                      placeholder=""
                      />
                    <span className="currency-value-border">
                      {amountValue1}
                    </span>
                  </h4>
                </section>
              </li>
              <li>
                <section><span className="float-left" dangerouslySetInnerHTML = {{ __html: this.props.content.send }}></span>{this.props.content.sendAlert}</section>
                <section><span className="float-right" dangerouslySetInnerHTML = {{ __html: this.props.content.sms }}></span></section>
              </li>
            </ul>
          </div>
        </div>
        <div>
          { this.isConfirm() }
          <AlertSweepModal confirmCancel={this.state.modalPopup} content={this.props.content} />
        </div>
      </div>
    );
  },
});

module.exports = CreateAlert;

