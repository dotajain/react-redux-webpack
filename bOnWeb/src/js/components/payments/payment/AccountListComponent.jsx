/**
 * @module AccountListComponent
 */
const React = require('react');
const AccountComponent = require('./AccountComponent');
const SavingComponent = require('./SavingComponent');
const PaymentsStore = require('../../../stores/PaymentsStore');
const BrowserUtils = require('../../../utils/BrowserUtils');
const StringConstant = require('../../../constants/StringConstants');
const { PropTypes } = React;

const AccountListComponent = React.createClass({
  propTypes: {
    contents: PropTypes.object,
    name: PropTypes.string,
    accountList: PropTypes.array,
    accountClick: PropTypes.func,
    tabChange: PropTypes.bool,
  },
  getInitialState() {
    return {
      open: false,
      isFromOpen: PaymentsStore.getConfirmBack() ? true : this.props.tabChange,
      isToOpen: PaymentsStore.getConfirmBack() || PaymentsStore.isOneOffPayment() ? true : false,
    };
  },
  componentWillMount() {
    if (PaymentsStore.getNextTask() === StringConstant.From && this.props.tabChange) {
      this.setState({ isFromOpen: false });
    }
    if ((PaymentsStore.isFromOtherPage()) && PaymentsStore.getNextTask() !== StringConstant.From) {
      // if savings and pot selected
      if ((PaymentsStore.getSelectedToAccount().type === StringConstant.savings
        && (PaymentsStore.getSelectedToPot() !== StringConstant.EmptyString || PaymentsStore.isToSavingTotClicked()))) {
        this.setState({ isToOpen: true });
      }
      // if not saving and account selected
      if (PaymentsStore.getSelectedToAccount().type !== StringConstant.savings &&
        PaymentsStore.getSelectedToAccount() !== StringConstant.EmptyString) {
        this.setState({ isToOpen: true });
      }
    }
  },
  // set the from/to list state to open or close behaviour
  setOpenState(stateValue, type, potClick) {
    let counter = stateValue;
    if (type !== StringConstant.savings) {
      counter = !stateValue;
    } else {
      if (potClick) {
        counter = !stateValue;
      } else if (counter) {
        counter = !stateValue;
      }
    }
    return counter;
  },
  // handles onclick of account component
  accountClick(e, potClick, compClick) {
    // check mobile view
    if (BrowserUtils.isMobileView()) {
      if (this.props.name !== StringConstant.toList) {
        this.setState({ isFromOpen: this.setOpenState(this.state.isFromOpen, e.type, potClick) });
      } else {
        this.setState({ isToOpen: this.setOpenState(this.state.isToOpen, e.type, potClick) });
      }
    }
    if (this.props.name !== StringConstant.toList) {
      if (this.props.accountClick !== undefined) {
        this.props.accountClick(e, this.state.isFromOpen, compClick);
      }
    } else {
      if (this.props.accountClick !== undefined) {
        this.props.accountClick(e, this.state.isToOpen, compClick);
      }
    }
  },

  // load accounts for all device base on condition for devices
  showAccountType(account, index) {
    if (BrowserUtils.isMobileView()) {
      if (this.props.name !== StringConstant.toList) {
        const checked = PaymentsStore.IsAccountSame(account.id);
        if (!this.state.isFromOpen || (this.state.isFromOpen && checked)) {
          return this.loadAccounts(account, index, this.state.isFromOpen);
        }
      } else {
        const checked = PaymentsStore.IsToAccountSame(account.id);
        if (!this.state.isToOpen || ((this.state.isToOpen && checked))) {
          return this.loadAccounts(account, index, this.state.isToOpen);
        }
      }
    } else {
      return this.loadAccounts(account, index, false);
    }
  },
  // returns saving or account components based on conditions
  loadAccounts(account, index, display) {
    // display selected saving account only for one-off payment in to list
    if (this.props.name === StringConstant.toList && PaymentsStore.isOneOffPayment()) {
      if (account.type === StringConstant.savings && account.id === PaymentsStore.getSelectedToAccount().id) {
        return (<SavingComponent key={index} data={account} name={this.props.name} open={this.state.open} display={display}
          onChange={this.accountClick} contents={this.props.contents}
        />);
      }
    } else if (this.props.name === StringConstant.fromList && PaymentsStore.isOneOffPayment() && account.type === StringConstant.savings && PaymentsStore.getOneOffPayment().isMonthly) {
      if (account.id !== PaymentsStore.getSelectedToAccount().id) {
        return (<SavingComponent key={index} data={account} name={this.props.name} open={this.state.open} display={display}
          onChange={this.accountClick} contents={this.props.contents}
        />);
      }
    } else {
      switch (account.type) {
        case StringConstant.savings:
          return (<SavingComponent key={index} data={account} name={this.props.name} open={this.state.open} display={display}
            onChange={this.accountClick} contents={this.props.contents}
          />);
        default:
          return (<AccountComponent key={index} data={account} name={this.props.name} onClick={this.accountClick} display={display}
            contents={this.props.contents}
          />);
      }
    }
  },
  render() {
    let list = this.props.accountList !== undefined && this.props.accountList.map((account, index) => {
      return this.showAccountType(account, index);
    });

    list = list.length > 0 ? list : <div></div>;

    return (
      <div>
        {list}
      </div>

    );
  },
});


module.exports = AccountListComponent;
