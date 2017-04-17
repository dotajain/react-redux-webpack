/**
 * @module AccountComponent
 */
const React = require('react');
const PaymentsStore = require('../../../stores/PaymentsStore');
const NumberUtils = require('../../../utils/NumberUtils');
const BrowserUtils = require('../../../utils/BrowserUtils');
const StringConstant = require('../../../constants/StringConstants');
const _ = require('lodash');
const { PropTypes } = React;
const groupName = StringConstant.groupFrom_;

const AccountComponent = React.createClass({
  propTypes: {
    color: PropTypes.string,
    name: PropTypes.string,
    data: PropTypes.object,
    onClick: PropTypes.func,
    display: PropTypes.bool,
    contents: PropTypes.object,
  },
  getInitialState() {
    return {
      id: StringConstant.EmptyString,
      curAmount: 0.0,
      availAmount: 0.0,
      error: false,

    };
  },
  componentWillMount() {
    PaymentsStore.addChangeListener(this.onStoreChange);
    this.setAmount();
  },
  componentWillUnmount() {
    PaymentsStore.removeChangeListener(this.onStoreChange);
  },
  onStoreChange() {
    if (this.isMounted()) {
      this.setAmount();
    }
  },
  // handles click of account component
  onClick(e) {
    const evnt = e;
    if (this.props.display && BrowserUtils.isMobileView()) {
      evnt.target.checked = false;
    }
    this.props.onClick(this.props.data, true, true);
  },
  setAmount() {
    const accDetails = PaymentsStore.getAccountDetail(this.props.data.id);
    //   const accDetails = AccountsStore.getAccountDetail(this.props.data.id);
    if (accDetails !== undefined && !accDetails.errCode) {
      accDetails.balances.map(balance => {
        switch (balance.type) {
          case StringConstant.current:
            this.setState({ curAmount: balance.amount.value });
            break;
          case StringConstant.available:
            this.setState({ availAmount: balance.amount.value });
            break;
        }
        return false;
      });
      this.setState({ error: false });
    } else {
      this.setState({ error: true });
    }
  },
  // get the account name to display
  getAccountDisplayName() {
    let accountName = '';
    if (this.props.data.metadata.display_name !== null) {
      accountName = this.props.data.metadata.display_name;
    } else {
      accountName = this.props.data.product.name;
    }
    return accountName;
  },
  // for sort code display in account / saving component
  getAccountDisplayNumber() {
    // to mask the number incase of credit card
    if (this.props.data.type === StringConstant.credit_card) {
      let creditcardNumber = _.replace(this.props.data.number, '************', 'xxxxxxxxxxxx');
      creditcardNumber = _.split(creditcardNumber, '-');
      const creditcard = NumberUtils.formatCreditCard(creditcardNumber[0]);
      return creditcard;
    } else {
      const accountNumber = _.split(this.props.data.number, '-');
      const sortcode = NumberUtils.formatSortCode(accountNumber[0]);
      return (`${accountNumber[1]} | ${sortcode}`);
    }
  },
  // shows account either disabled or checked or empty based on following conditions
  setRadioCSS() {
    const nameFor = this.props.name + this.props.data.id;
    if (this.props.name === StringConstant.toList) {
      switch (PaymentsStore.getNextTask()) {
        case StringConstant.To:
        case StringConstant.KP:
          let disable = PaymentsStore.IsAccountSame(this.props.data.id) ? 'disabled' : '';
          if (PaymentsStore.getPaymentType()) {
            if (PaymentsStore.getSelectedAccount().type === StringConstant.savings
              && PaymentsStore.getSelectedPot() === StringConstant.EmptyString && !PaymentsStore.isSavingTotClicked()) {
              disable = 'disabled';
            }
            const moveMoney = PaymentsStore.getMoveMoney();
            if (moveMoney !== StringConstant.EmptyString && moveMoney.id !== this.props.data.id) {
              disable = 'disabled';
            }
          }

          let checked = (PaymentsStore.getPaymentType() && PaymentsStore.IsToAccountSame(this.props.data.id));
          return <input type="radio" id= {nameFor} name={groupName + this.props.name } value={ this.props.data.type } disabled={disable} onClick = { this.onClick } defaultChecked={checked} />;
        case StringConstant.RP:
          if (PaymentsStore.IsAccountSame(this.props.data.id) === true) {
            return <input type="radio" id= {nameFor} name={groupName + this.props.name } value={ this.props.data.type } disabled="disabled" />;
          } else {
            let checked = (PaymentsStore.getPaymentType() === true && PaymentsStore.IsToAccountSame(this.props.data.id) === true);
            let disable = '';
            if (PaymentsStore.getPaymentType() && PaymentsStore.getSelectedAccount().type === StringConstant.savings
              && PaymentsStore.getSelectedPot() === StringConstant.EmptyString && !PaymentsStore.isSavingTotClicked()) {
              disable = 'disabled';
            }
            return <input type="radio" id= {nameFor} name={groupName + this.props.name } value={ this.props.data.type } onClick = { this.onClick } defaultChecked={checked} disabled={disable} />;
          }
        case StringConstant.CNFRM:
          return <input type="radio" id={nameFor} name={groupName + this.props.name } value= { this.props.data.type } defaultChecked />;
        default:
          return <input type="radio" id= {nameFor} name={groupName + this.props.name } value={ this.props.data.type } disabled="disabled" />;

      }
    } else {
      switch (PaymentsStore.getNextTask()) {
        case StringConstant.To:
        case StringConstant.KP:
        case StringConstant.RP:
        case StringConstant.CNFRM:
          // condition when we switch from payment to transfer
          let checked = PaymentsStore.IsAccountSame(this.props.data.id);
          return (<input type="radio" id= {nameFor} name={groupName + this.props.name } value={ this.props.data.type } onClick = { this.onClick }
            defaultChecked={checked}
          />);
        case StringConstant.From:
          return (<input type="radio" id= {nameFor} name={groupName + this.props.name } value={ this.props.data.type } onClick = { this.onClick }
            defaultChecked={false}
          />);
        // break;
      }
    }
  },
  // return the html content
  renderView() {
    const css = PaymentsStore.getColorFromAccount(this.props.data.id);
    const nameFor = this.props.name + this.props.data.id;
    let curAmount = 0;
    let avlAmount = 0;
    curAmount = _.split(NumberUtils.appendCurrency('{}', this.state.curAmount), '.');
    avlAmount = _.split(NumberUtils.appendCurrency('{}', this.state.availAmount), '.');
    const accountCard = this.state.error ? ''
    : (<div className= {`checkbox-account ${css}`} >
      { this.setRadioCSS() }
      <label htmlFor= {nameFor} >
        <h3>{this.getAccountDisplayName() }</h3>
        <h5>{this.getAccountDisplayNumber() }</h5>
        <div>
          <h2>{curAmount[0]}.<sub>{curAmount[1]} {this.props.contents.current}</sub></h2>
          <h4 className = "group-from">{avlAmount[0]}.<sub>{avlAmount[1]} {this.props.contents.available}</sub></h4>
        </div>
      </label >
    </div >);
    return accountCard;
  },
  render() {
    return (
      <div>
        { this.renderView() }
      </div>
    );
  },
});

module.exports = AccountComponent;

