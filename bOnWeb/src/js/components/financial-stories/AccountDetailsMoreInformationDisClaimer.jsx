/**
 * @module AccountDetailsMoreInformationDisClaimer
 */

const React = require('react');
const { PropTypes } = React;

const AccountDetailsMoreInformationDisClaimer = React.createClass({
   propTypes:{
   disClaimer: PropTypes.string,
    contactMessage:PropTypes.string,
  },
  render() {
  return (
     <div>
        <p>{this.props.disClaimer}<br/>{this.props.contactMessage}</p>
      </div>

  );},
});
module.exports = AccountDetailsMoreInformationDisClaimer;
