/**
 * @module HouseNumber
 */

const React = require('react');
const { PropTypes } = React;

const { TextQuestion } = require('../../../common/questionsets');

const HouseNumber = React.createClass({
	propTypes: {
		arrayName: PropTypes.string.isRequired,
		arrayIndex: PropTypes.number.isRequired,
		addressId: PropTypes.number.isRequired,
		houseNumber: PropTypes.string,
		group: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		children: PropTypes.node,
		required: PropTypes.bool,
	},

	render() {
		return (<TextQuestion
			name={`houseNumber_${this.props.addressId}`}
			inputClassName={`houseNumber_${this.props.addressId}`}
			validateType="alphanumeric"
			maxLength={40}
			group={this.props.group}
			dataAnchor={'number'}
			defaultValue={this.props.houseNumber}
			onChange={this.props.onChange}
			arrayName={this.props.arrayName}
			arrayIndex={this.props.arrayIndex}
			required={this.props.required}
		>
			{this.props.children}
		</TextQuestion>);
	},
});

module.exports = HouseNumber;

