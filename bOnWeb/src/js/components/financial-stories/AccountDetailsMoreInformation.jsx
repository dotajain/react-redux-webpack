/**
 * @module AccountDetailsMoreInformation
 */
const React = require('react');
const { PropTypes } = React;
const _ = require('lodash');

const AccountDetailsMoreInformation = React.createClass({
  propTypes:{
   content: PropTypes.object,
    accountInformation:PropTypes.object,
  },
  render() {
    const amtTemplate = value => `<b>${value[0]}</b>.<sub>${value[1]}</sub>`;
    let amount;
    if (this.props.accountInformation.amount) {
         const value = _.split(this.props.accountInformation.value, '.');
         const val = !value[1] ? '00' : value[1];
         amount = _.split(`${value[0]}.${val}`, '.');
    }
  return (
        <li>
            <span className="float-left">{this.props.accountInformation.label}</span>
            <span className="float-right">{this.props.accountInformation.amount ? <div dangerouslySetInnerHTML={{ __html: amtTemplate(amount) }}></div> : this.props.accountInformation.value}<span className="pence-s"></span></span>

        </li>
  );},
});
module.exports = AccountDetailsMoreInformation;
