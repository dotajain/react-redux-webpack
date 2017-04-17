/**
 * @module AddressPrefix
 */

const React = require('react');
const { PropTypes } = React;

const { TextQuestion } = require('../../../common/questionsets');

const AddressPrefix = React.createClass({
	propTypes: {
		arrayName: PropTypes.string.isRequired,
		arrayIndex: PropTypes.number.isRequired,
		addressId: PropTypes.number.isRequired,
		addressPrefix: PropTypes.string,
		group: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		children: PropTypes.node,
		required: PropTypes.bool,
	},

	render() {
		return (<TextQuestion
					name={`addressPrefix_${this.props.addressId}`}
					inputClassName={`addressPrefix_${this.props.addressId}`}
					validateType="alphanumeric"
					maxLength={40}
					group={this.props.group}
					dataAnchor={'address-prefix'}
					defaultValue={this.props.addressPrefix}
					onChange={this.props.onChange}
					arrayName={this.props.arrayName}
					arrayIndex={this.props.arrayIndex}
					required={this.props.required}
		>
					{this.props.children}
				</TextQuestion>);
	},
});

module.exports = AddressPrefix;

