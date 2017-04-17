/**
 * @module SavingComponent
 */
const React = require('react');
const Panel = require('react-bootstrap').Panel;
const SavingPotComponent = require('./SavingPotComponent');
const SavingPotTotalComponent = require('./SavingPotTotalComponent');
const PaymentsStore = require('../../../stores/PaymentsStore');
const PaymentsActionCreator = require('../../../actions/PaymentsActionCreator');
const NumberUtils = require('../../../utils/NumberUtils');
const AccountOpeningActions = require('../../../actions/AccountOpeningActions');
const BrowserUtils = require('../../../utils/BrowserUtils');
const _ = require('lodash');
const { PropTypes } = React;
const StringConstant = require('../../../constants/StringConstants');


const SavingComponent = React.createClass({
  propTypes: {
    content: PropTypes.object,
    onClick: PropTypes.func,
    data: PropTypes.object,
    name: PropTypes.string,
    onChange: PropTypes.func,
    display: PropTypes.bool,
    contents: PropTypes.object,
  },
  getInitialState() {
    return {
      potList: PaymentsStore.getPotDetails(this.props.data.id) || [],
      open: false,
      isPotLoad: false,
      disablePayee: 'disabled',
      fromAllocatedCheck: false,
      toAllocatedCheck: false,
      potData: '',
      totClick: false,
    };
  },
  componentWillMount() {
    PaymentsActionCreator.refreshSavingComponent();
    PaymentsStore.addChangeListener(this.onStoreChange);
    this.setOpenState();
    if (PaymentsStore.isOneOffPayment() && this.props.name === StringConstant.toList) {
      this.setState({ potData: PaymentsStore.getSelectedToPotData() });
    }
  },
  componentDidMount() {
    if (PaymentsStore.getPotDetails(this.props.data.id) === undefined) {
      PaymentsActionCreator.getPotDetails(this.props.data.id);
    }
  },
  componentWillUnmount() {
    PaymentsStore.removeChangeListener(this.onStoreChange);
  },
  onStoreChange() {
    if (this.isMounted()) {
      // to check the component get mount
      this.setState({ potList: [] });

      const potList = PaymentsStore.getPotDetails(this.props.data.id);

      this.setState({ potList: potList, isPotLoad: true });
      this.setOpenState();
      if (PaymentsStore.getNextTask() === StringConstant.To || PaymentsStore.getNextTask() === StringConstant.From || PaymentsStore.getNextTask() === StringConstant.RP || PaymentsStore.getNextTask() === StringConstant.KP || PaymentsStore.getNextTask() === StringConstant.CNFRM) {
        this.setState({ disablePayee: StringConstant.EmptyString });
        this.setAllocatedCheck();
      }
    }
  },
  onSavingClick(evnt) {
    this.setAllocatedCheck();
    const e = evnt;
    if (this.props.display && BrowserUtils.isMobileView()) {
      e.target.checked = false;
    }
    if (!this.checkOneOffAllow()) {
      this.setState({ open: false });
    }
    if (this.state.potList === undefined || this.state.potList.pots.pots.length === 0) {
      this.props.onChange(this.props.data, true, false);
    } else {
      this.props.onChange(this.props.data, false, false);
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
      return this.props.data.number;
    } else {
      const accountNumber = _.split(this.props.data.number, '-');
      const sortcode = NumberUtils.formatSortCode(accountNumber[0]);
      return (`${accountNumber[1]} | ${sortcode}`);
    }
  },
  setAllocatedCheck() {
    if (this.state.potList === undefined) {
      return;
    }
    if (this.props.name !== StringConstant.toList) {
      this.state.potList.pots.pots.map(check => {
        if (check.balance.value < 0) {
          this.setState({ fromAllocatedCheck: true });
        } else {
          this.setState({ fromAllocatedCheck: false });
        }
        return false;
      });
    } else {
      this.state.potList.pots.pots.map(check => {
        if (check.balance.value < 0) {
          this.setState({ toAllocatedCheck: true });
        } else {
          this.setState({ toAllocatedCheck: false });
        }
        return false;
      });
    }
  },
  // return a radio button which acts like a div to select any div amoung a group
  setRadioCSS(nameFor) {
    if (this.props.name === StringConstant.toList) {
      let checked = PaymentsStore.IsToAccountSame(this.props.data.id);

      let disabled = (PaymentsStore.IsAccountSame(this.props.data.id) && PaymentsStore.isSavingTotClicked()) ? 'disabled' : '';

      if (PaymentsStore.getPaymentType()) {
        if (PaymentsStore.getSelectedAccount().type === StringConstant.savings
          && PaymentsStore.getSelectedPot() === StringConstant.EmptyString
          && ((this.props.data.id !== PaymentsStore.getSelectedAccount().id || this.props.data.id !== PaymentsStore.getSelectedToAccount().id) && !PaymentsStore.isSavingTotClicked())) {
          disabled = 'disabled';
        }

        const moveMoney = PaymentsStore.getMoveMoney();
        if (moveMoney !== StringConstant.EmptyString && moveMoney.id !== this.props.data.id && PaymentsStore.getSelectedAccount() === StringConstant.EmptyString) {
          disabled = 'disabled';
        }
      }

      if (this.props.data.id === PaymentsStore.getSelectedToAccount().id && !PaymentsStore.isSavingTotClicked()) {
        disabled = '';
      }
      switch (PaymentsStore.getNextTask()) {
        case StringConstant.To:
        case StringConstant.KP:

          return <input type="radio" id= {nameFor} name={StringConstant.groupFrom_ + this.props.name } onClick={ e => { this.setState({ open: !this.state.open }); this.onSavingClick(e); } } value={ this.props.data.type } defaultChecked={checked} disabled={disabled} />;

        case StringConstant.RP:
          if (PaymentsStore.getPaymentType() && checked) {
            return (<input type="radio" id= {nameFor} name={StringConstant.groupFrom_ + this.props.name } value={ this.props.data.type } onClick={ e => { this.setState({ open: !this.state.open }); this.onSavingClick(e); this.props.onChange(this.props.data); } } defaultChecked={checked}
              disabled={disabled}
            />);
          } else {
            return (<input type="radio" id= {nameFor} name={StringConstant.groupFrom_ + this.props.name } value={ this.props.data.type } onClick={ e => { this.setState({ open: !this.state.open }); this.onSavingClick(e); } }
              disabled={disabled}
            />);
          }
        case StringConstant.CNFRM:
          return <input type="radio" id={nameFor} name={StringConstant.groupFrom_ + this.props.name } value={this.props.data.id} defaultChecked/>;
        default:
          return <input type="radio" id={nameFor} name={StringConstant.groupFrom_ + this.props.name } value={this.props.data.id} onClick={ () => { this.setState({ open: true }); } } disabled="disabled"/>;

      }
    } else {
      let checked = PaymentsStore.IsAccountSame(this.props.data.id);
      switch (PaymentsStore.getNextTask()) {
        case StringConstant.From:
        case StringConstant.To:
        case StringConstant.KP:

          return <input type="radio" id= {nameFor} name={StringConstant.groupFrom_ + this.props.name } onClick={ e => { this.setState({ open: !this.state.open }); this.onSavingClick(e); } } value={ this.props.data.type } defaultChecked={checked} />;
        case StringConstant.RP:
          if (PaymentsStore.IsAccountSame(this.props.data.id) === true) {
            return <input type="radio" id={nameFor} name={StringConstant.groupFrom_ + this.props.name } value={this.props.data.id} onClick={ e => { this.setState({ open: !this.state.open }); this.onSavingClick(e); } } defaultChecked={checked} />;
          } else {
            return <input type="radio" id= {nameFor} name={StringConstant.groupFrom_ + this.props.name } value={ this.props.data.type } onClick={ e => { this.setState({ open: true }); this.onSavingClick(e); } } />;
          }
        case StringConstant.CNFRM:
          return <input type="radio" id={nameFor} name={StringConstant.groupFrom_ + this.props.name } value={this.props.data.id} defaultChecked />;
        default:
          return <input type="radio" id={nameFor} name={StringConstant.groupFrom_ + this.props.name } value={this.props.data.id} onClick={ e => { this.setState({ open: true }); this.onSavingClick(e); } }/>;
      }
    }
  },
  // to set the state of open to open saving pot
  setOpenState() {
    if (PaymentsStore.IsAccountSame(this.props.data.id) === true && this.props.name === StringConstant.fromList) {
      this.setState({ open: true });
    } else if (PaymentsStore.getNextTask() !== StringConstant.From && PaymentsStore.IsToAccountSame(this.props.data.id) === true && this.props.name === StringConstant.toList) {
      this.setState({ open: true });
      if (PaymentsStore.IsAccountSame(this.props.data.id) && PaymentsStore.isSavingTotClicked()) {
        this.setState({ open: false });
      }
    } else if (PaymentsStore.getNextTask() === StringConstant.CNFRM) {
      this.setState({ open: true });
    } else {
      this.setState({ open: false });
    }
  },
  getCurrentAmount(id) {
    let balance;
    const accDetails = PaymentsStore.getAccountDetail(id);
    if (accDetails !== undefined) {
      accDetails.balances.map(bal => {
        switch (bal.type) {
          case StringConstant.current:
            balance = bal.amount.value;
            break;
        }
        return false;
      });

      return balance;
    }
  },
  // handles total radio button click
  handleTotalClick(e) {
    this.setState({
      open: true,
      potData: e,
      totClick: true,
    });
    if (this.props.name !== StringConstant.toList) {
      if (this.checkOneOffAllow()) {
        PaymentsActionCreator.savingTotalClick(true);
      }
    } else {
      PaymentsActionCreator.toSavingTotalClick(true);
    }
    this.props.onChange(this.props.data, true, true);
  },
  savingpotClick() {
    AccountOpeningActions.navigateToWebTask('WEB-OPEN-SAVING-POTS');
  },
  checkOneOffAllow() {
    if (PaymentsStore.isOneOffPayment() && PaymentsStore.getOneOffPayment().isMonthly && !PaymentsStore.repeatPaymentShow(this.props.data)) {
      return false;
    } else return true;
  },
  // loads pot component in saving pot component
  loadPotComponent() {
    const bgClass = (this.state.potList === undefined || this.state.potList.pots === undefined || this.state.potList.pots.pots.length === 0) ? 'account-pot fill-pot' : 'account-pot';
    if (this.state.isPotLoad && this.state.potList !== undefined && this.state.potList.pots !== undefined) {
      let potList = this.state.potList.pots.pots.map((dData, i) => {
        return (<SavingPotComponent name={this.props.name} key={i} innerData= {dData} index={i} savingId={this.props.data.id}
          onChange={this.handleRadioClick} contents={this.props.contents}
        />);
      });

      return (<ul className={bgClass}>
        {potList}
      </ul>);
    } else {
      return (<ul className={bgClass}>
        <li></li>
      </ul>);
    }
  },
  // handles radio button click
  handleRadioClick(potData, e) {
    this.setState({
      open: true,
    });
    if (BrowserUtils.isMobileView()) {
      this.setState({
        open: false,
        potData: potData,
        totClick: false,
      });
    }

    this.props.onChange(this.props.data, e, true);
  },
  renderLabel(nameFor) {
    if (!BrowserUtils.isMobileView() || !this.props.display) {
      // const bg = (this.state.potList === undefined || this.state.potList.pots === undefined || this.state.potList.pots.pots.length === 0) ? `fill-pot` : ''
      let open = this.state.open;
      if (PaymentsStore.getPaymentType() && this.props.name === StringConstant.toList
        && PaymentsStore.getSelectedAccount().type === StringConstant.savings
        && PaymentsStore.getSelectedPot() === StringConstant.EmptyString
        && ((this.props.data.id !== PaymentsStore.getSelectedAccount().id || this.props.data.id !== PaymentsStore.getSelectedToAccount().id) && !PaymentsStore.isSavingTotClicked())) {
        open = false;
      }
      if (PaymentsStore.getPaymentType() && this.props.name === StringConstant.toList
        && this.props.data.id === PaymentsStore.getSelectedToAccount().id && !PaymentsStore.isSavingTotClicked()) {
        open = true;

        // if (BrowserUtils.isMobileView() && !PaymentsStore.isFromOtherPage() && open)
        //   open = false;
      }
      return (<label htmlFor={nameFor} className="pots">
        <h3>{this.getAccountDisplayName() }</h3>
        <h5>{this.getAccountDisplayNumber() }</h5>

        <Panel collapsible expanded={open} >
          {this.state.fromAllocatedCheck || this.state.toAllocatedCheck ?

            <div className="notice" onClick={this.savingpotClick}>
              <h4>{this.props.contents.unAllocatedHeader}</h4>
              <p>{this.props.contents.unAllocatedContent}</p>
            </div> : StringConstant.EmptyString}
          {this.loadPotComponent() }
        </Panel>
        <SavingPotTotalComponent name={this.props.name} open={open} data={this.props.data} onChange={this.handleTotalClick} contents={this.props.contents} showTotal={this.state.toAllocatedCheck}/>
      </label>);
    } else {
      let balance = '0.0';
      let potData = this.state.potData;

      if (this.state.totClick) {
        balance = this.getCurrentAmount(potData.id);
        balance = NumberUtils.decimalFormat(balance, 3);
      } else {
        if (PaymentsStore.getNextTask() === StringConstant.CNFRM || PaymentsStore.getNextTask() === StringConstant.RP) {
          if (this.props.name === StringConstant.fromList) {
            potData = PaymentsStore.getSelectedPotData();
          } else {
            potData = PaymentsStore.getSelectedToPotData();
          }
        }
        if (potData.balance !== undefined) {
          balance = NumberUtils.decimalFormat(potData.balance.value, 3);
        } else {
          balance = this.getCurrentAmount(this.props.data.id);
          balance = NumberUtils.decimalFormat(balance, 3);
        }
      }
      balance = _.split(balance, '.');
      let h2css = StringConstant.EmptyString;
      if (potData.name !== String.EmptyString) {
        h2css = 'pot-h2';
      }
      return (<label htmlFor= { nameFor } >
        <h3>{this.getAccountDisplayName() }</h3>
        <h2 className = {h2css}>{balance[0]}.<sub>{balance[1]} current</sub></h2>
        <h3 className = "potName">{potData.name }</h3>
      </label >);
    }
  },
  render() {
    const css = PaymentsStore.getColorFromAccount(this.props.data.id);
    const nameFor = this.props.name + this.props.data.id;
    return (
      <div className={`checkbox-account ${css}`} >


        { this.setRadioCSS(nameFor) }
        {this.renderLabel(nameFor, css) }

      </div >
    );
  },
});

module.exports = SavingComponent;
