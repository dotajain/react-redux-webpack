/**
 * @module AccountsList
*/

const React = require('react');
const { PropTypes } = React;
const _ = require('lodash');
const Toggle = require('../common/Toggle');

const AccountsList = React.createClass({
  propTypes: {
    account: PropTypes.object,
    dataKey: PropTypes.number,
    getAccountID: PropTypes.func,
    accNumbers: PropTypes.array,
    colorIndex: PropTypes.number,
  },
  render() {
    const account = this.props.account;
    const colorIndex = this.props.colorIndex;
    let isChecked = _.includes(this.props.accNumbers, account.id);
    return (
        <div className={`row account-${colorIndex} ${account.type}`}>
          <h6 className="col-xs-9">
            {account.product.name}
          </h6>
          <div className="col-xs-3">
            <div className="toggle">
              <Toggle aria-label="No label tag" id={`check_${this.props.dataKey}`} data-id={account.id} defaultChecked={isChecked} onChange={this.props.getAccountID} />
            </div>
          </div>
        </div>
    );
	},
});

module.exports = AccountsList;
