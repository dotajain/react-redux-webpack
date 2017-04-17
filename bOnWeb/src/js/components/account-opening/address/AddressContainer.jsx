/**
 * @module AddressContainer
 */

const React = require('react');
const { PropTypes } = React;

const AddressContainer = React.createClass({
	propTypes: {
		addressId: PropTypes.number.isRequired,
		children: PropTypes.node.isRequired,
	},

	render() {
		return (<div className={`address-section${this.props.addressId}`}>{this.props.children}</div>);
	},
});

module.exports = AddressContainer;

