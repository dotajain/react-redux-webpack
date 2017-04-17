/**
 * @module AccountComponent
 */
const React = require('react');
const { PropTypes } = React;
const AccountsStore = require('../../stores/AccountsStore');
const NumberUtils = require('../../utils/NumberUtils');
const _ = require('lodash');
const cx = require('classnames');
const SavingPotsActionCreator = require('../../actions/SavingPotsActionCreator');
const AccountsActionCreator = require('../../actions/AccountsActionCreator');
const SavingsPotsStore = require('../../stores/SavingsPotsStore');

// for maintaing accounts
const AccountComponent = React.createClass({
    propTypes: {
        data: PropTypes.object,
        content: PropTypes.object,
        onClick: PropTypes.func,
        index: PropTypes.number,
        savingPot: PropTypes.bool,
    },

    getInitialState() {
        return {
            curAmount: 0,
            availAmount: 0,
            savingPotAccIndex: SavingsPotsStore.getAccountIndex(),
            load: false,
            error: false,
        };
    },
    componentDidMount() {
           this.getAccountBalances();
    },
    componentWillReceiveProps(nextProps) {
        if (!this.props.savingPot) {
           this.getAccountBalances();
        }
    },

    onClick(index) {
        if (!this.state.load) {
            return;
        }
        if (this.state.error) {
            AccountsActionCreator.getAccountDetails(this.props.data.id);
            this.setState({ error: false, load: false });
            //  this.getAccountBalances();
        } else {
            if (this.props.savingPot) {
                SavingPotsActionCreator.getClickedAccount(this.props.index, this.props.data);
            } else {
                this.props.onClick(index);
            }
        }
    },

    getAccountBalances() {
        const accDetails = AccountsStore.getAccountDetail(this.props.data.id);
        if (accDetails && !accDetails.errCode) {
            if (accDetails.balances) {
                accDetails.balances.map(balance => {
                    switch (balance.type) {
                        case 'current':
                            this.setState({ curAmount: balance.amount.value });
                            break;
                        case 'available':
                            this.setState({ availAmount: balance.amount.value });
                            break;
                    }
                    return false;
                });
                this.setState({ load: true });
            }
        } else {
            this.setState({ error: true, load: true });
        }
    },
    // displays Account Name
    getAccountDisplayName() {
        let accountName = '';
        if (this.props.data.metadata.display_name !== null) {
            accountName = this.props.data.metadata.display_name;
        } else {
            accountName = this.props.data.product.name;
        }
        return accountName;
    },
    // displays the Account Number
    getAccountDisplayNumber() {
        // to mask the number incase of credit card
        if (this.props.data.type === 'credit_card') {
            let creditcardNumber = _.replace(this.props.data.number, '************', 'xxxxxxxxxxxx');
            creditcardNumber = _.split(creditcardNumber, '-');
            const creditcard = NumberUtils.formatCreditCard(creditcardNumber[0]);
            return (` ${creditcard}`);
        } else { // to display number in case of normal account number and sort code format
            const accountNumber = _.split(this.props.data.number, '-');
            const sortcode = NumberUtils.formatSortCode(accountNumber[0]);
            return (`${accountNumber[1]} | ${sortcode}`);
        }
    },

    displayAvailableAmount(amount) {
        if (this.props.data.type === 'current' || this.props.data.type === 'credit_card' || this.props.data.type === 'savings') {
            return (<div><h2>{amount[0]}.<sub>{amount[1]} { this.props.content.accountBalanceCurrent }</sub></h2>
                <h4>{NumberUtils.appendCurrency('{}', this.state.availAmount) } { this.props.content.accountBalanceAvailable }</h4></div>);
        } else {
            return (<div><br/><h2>{amount[0]}.<sub>{amount[1]} { this.props.content.accountBalanceCurrent }</sub></h2></div>);
        }
    },
    render() {
        const index = (this.props.index % 10) + 1;
        const amount = _.split(NumberUtils.appendCurrency('{}', this.state.curAmount), '.');
        let classNames;
        if (this.props.savingPot) {
            if (this.state.savingPotAccIndex === index) {
                classNames = cx(
                    'account',
                    `account-${index}`,
                    'active'
                );
            } else {
                classNames = cx(
                    'account',
                    `account-${index}`
                );
            }
        } else {
            classNames = cx(
                'account',
                `account-${index}`,
                'active'
            );
        }

        return (
            <a className={classNames} onClick={this.onClick} id={this.props.data.id}>
                <h3>{this.getAccountDisplayName() }</h3>
                <h5>{this.getAccountDisplayNumber() }</h5>
                {
                  this.state.error ? <div><h3>{ this.props.content.accountBalanceUnavailable }</h3><h4>{ this.props.content.accountTapToReload }</h4></div>
                        : this.state.load === false
                            ? <div className="loader-amount"></div>
                          : this.displayAvailableAmount(amount)
                }
            </a>
        );
    },
});

module.exports = AccountComponent;
