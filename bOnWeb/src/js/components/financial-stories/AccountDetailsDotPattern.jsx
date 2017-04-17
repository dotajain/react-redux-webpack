/**
 * @module AccountDetailsDotPattern
 */
const React = require('react');
const { PropTypes } = React;
const AccountDetailsDotPattern = React.createClass({
   propTypes:{
   content: PropTypes.object,
    accountClick:PropTypes.func,
    activeClassIndex:PropTypes.number,
    data:PropTypes.object,
    index:PropTypes.number,
  },
   getInitialState() {
    return {
      className: '',
    };
},

accountClick() {
    this.props.accountClick(this.props.data.id, this.props.data.type, this.props.index);
},
  render() {
    const className = this.props.activeClassIndex === this.props.index ? 'active' : '';
    return (<li onClick={this.accountClick} className={className}></li>);
  },
});
module.exports = AccountDetailsDotPattern;
