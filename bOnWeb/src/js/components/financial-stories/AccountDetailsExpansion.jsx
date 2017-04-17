/**
 * @module AccountDetailsExpansion
 */
const React = require('react');
const { PropTypes } = React;
const FinancialStoriesStore = require('../../stores/FinancialStoriesStore');
const AccountDetailsMoreInformation = require('./AccountDetailsMoreInformation');
const AccountDetailsMoreInformationDisClaimer = require('./AccountDetailsMoreInformationDisClaimer');
const _ = require('lodash');
const NumberUtils = require('../../utils/NumberUtils');

const ARROW_DOWN = 'icon icon-down';
const ARROW_UP = 'icon icon-up';

const AccountDetailsExpansion = React.createClass({
  propTypes:{
   content: PropTypes.object,
    onNextAccountDetails:PropTypes.func,
		hideMoreInformation:PropTypes.bool,
  },
	getInitialState() {
			return {
			open: false,
			arrow : ARROW_DOWN,
			accountsState: FinancialStoriesStore.getState(),
			showHideStyle:{ 'display':'none' },
			};
	},
	componentWillReceiveProps() {
		if (this.props.hideMoreInformation) {
			this.setState({ arrow: ARROW_DOWN, showHideStyle: { display : 'none' } });
		}
	},

	getAccountMoreInformation() {
      const accountBalance = [];
      const accDetail = this.state.accountsState.accountDetails;
      switch (accDetail.accountType) {
      case this.props.content.current:
        accountBalance.push({ label:this.props.content.availableBalance, value: accDetail.availableBalance, amount:true });
        accountBalance.push({ label:this.props.content.borrowingLimit, value: accDetail.borrowingLimit, amount:true });
        break;
      case this.props.content.creditCard:
        accountBalance.push({ label:this.props.content.creditCardLimit, value: accDetail.creditLimit, amount:true });
        accountBalance.push({ label:this.props.content.availableBalance, value: accDetail.availableBalance, amount:true });
        accountBalance.push({ label:this.props.content.lastStatementDate, value: accDetail.lastStatementDate });
        accountBalance.push({ label:this.props.content.lastStatementBalance, value: accDetail.lastStatementBalance, amount:true });
        accountBalance.push({ label:this.props.content.minPaymentDue, value: accDetail.minPaymentDue, amount:true });
        accountBalance.push({ label:this.props.content.paymentDueDate, value: accDetail.paymentDueDate });
        break;
      case this.props.content.savings:
        accountBalance.push({ label:this.props.content.availableBalance, value:  accDetail.availableBalance, amount:true });
        break;
      default:
      }
    return accountBalance;
},

 getAccountDisclaimer() {
    let disclaimer = '';
    const accDetail = this.state.accountsState.accountDetails;
    switch (accDetail.accountType) {
      case this.props.content.current:
        disclaimer = this.props.content.AccountMoreInfoView_AvailableBalanceDisclaimer_WithOverdraft;
        break;
      case this.props.content.creditCard:
      case this.props.content.savings:
      case this.props.content.loan:
      case this.props.content.mortgage:
        disclaimer = this.props.content.AccountMoreInfoView_AvailableBalanceDisclaimer;
        break;
      default:
      }
        return disclaimer;
},
// displays the Account Number
getAccountDisplayNumber() {
  const accountDetail = this.state.accountsState.accountDetails;
    if (accountDetail) {
        // to mask the number incase of credit card
      if (accountDetail.accountType === this.props.content.creditCard) {
            let creditcardNumber = _.replace(accountDetail.number, '************', 'xxxxxxxxxxxx');
            creditcardNumber = _.split(creditcardNumber, '-');
            const creditcard = NumberUtils.formatCreditCard(creditcardNumber[0]);
            return (` ${creditcard}`);
      } else { // to display number in case of normal account number and sort code format
          const accountNumber = _.split(accountDetail.number, '-');
          const sortcode = NumberUtils.formatSortCode(accountNumber[0]);
          return (<strong><span>{accountNumber[1]} </span><span>{sortcode}</span></strong>);
      }
  }
},
	showAndHideInformation(e) {
      e.preventDefault();
      this.setState({ open: !this.state.open });
      if (this.state.open) {
        this.setState({ arrow: ARROW_DOWN, showHideStyle: { display : 'none' } });
      } else {
        this.setState({ arrow: ARROW_UP, showHideStyle: { display : 'block' } });
      }
},
  render() {
		const accountDetails = this.state.accountsState.accountDetails;
		const accountInformation = this.getAccountMoreInformation();
    const accountDetailError = FinancialStoriesStore.isInternalServerError();

		let moreInformationDisClaimer;

		let moreInfoRows = [];
		for (let i = 0; i < accountInformation.length; i++) {
			moreInfoRows.push(<AccountDetailsMoreInformation key={i} accountInformation={accountInformation[i]} />);
		}
    if (accountDetailError) {
      moreInfoRows = [];
    }
		if (accountDetails) {
        moreInformationDisClaimer = this.getAccountDisclaimer();
      }
    return (
			<div>
					<p className="more-info" onClick={this.showAndHideInformation}> { this.props.content.moreInformation }<span className={ this.state.arrow }></span></p>
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={this.state.showHideStyle} >
						<div className="align-center moreInfo-col">
							<p className="account-num-sortcode">{this.getAccountDisplayNumber()}</p>
								<ul>
                {moreInfoRows}
                </ul>
								<AccountDetailsMoreInformationDisClaimer contactMessage={this.props.content.AccountMoreInfoView_ContactMessage} disClaimer={moreInformationDisClaimer}/>
						</div>
					</div>
			</div>
    );
  },
});
module.exports = AccountDetailsExpansion;

