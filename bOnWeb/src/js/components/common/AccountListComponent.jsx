/**
 * @module AccountListComponent
 */
const React = require('react');
const { PropTypes } = React;
const AccountComponent = require('./AccountComponent');


const AccountListComponent = React.createClass({
    propTypes: {
      content: PropTypes.object,
      accountClick: PropTypes.func,
      accountList: PropTypes.array,
      savingPot: PropTypes.bool,
    },

    render() {
        const savingPotFlag = this.props.savingPot;
        const acountList = this.props.accountList.map((account, index) => {
            let accountComponent;
            if (savingPotFlag) {
                    if (account.actions_available['/account/pots']) {
                        accountComponent = (<AccountComponent savingPot key={index} data={account} index={index} onClick={this.props.accountClick} content={ this.props.content } />);
                    }
                } else {
                    accountComponent = (<AccountComponent key={index} data={account} index={index} onClick={this.props.accountClick} content={this.props.content} />);
                }
            return accountComponent;
        });
        return (<div>{acountList}</div>);
    },
});

module.exports = AccountListComponent;
