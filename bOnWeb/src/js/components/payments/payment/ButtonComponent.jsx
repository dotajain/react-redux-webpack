/**
 * @module ButtonComponent
 */
const React = require('react');
const { PropTypes } = React;
const ButtonComponent = React.createClass({
    propTypes:{
    bsStyle:PropTypes.string,
    bsSize:PropTypes.string,
    disabled:PropTypes.bool,
    onClick:PropTypes.func,
    type:PropTypes.string,
    btnName:PropTypes.string,
  },
  render () {
      return (
         <button
          bsStyle={this.props.bsStyle}
          bsSize={this.props.bsSize}
          disabled={this.props.disabled}
          onClick={this.props.onClick}
          type = {this.props.type}
          value={this.props.btnName}
          name={this.props.btnName}
         >{this.props.btnName}</button>

      );
  },

 });

module.exports = ButtonComponent;
