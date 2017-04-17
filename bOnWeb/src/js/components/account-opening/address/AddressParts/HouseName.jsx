/**
 * @module HouseName
 */

const React = require('react');
const { PropTypes } = React;

const { TextQuestion } = require('../../../common/questionsets');

const HouseName = React.createClass({
	propTypes: {
		arrayName: PropTypes.string.isRequired,
		arrayIndex: PropTypes.number.isRequired,
		addressId: PropTypes.number.isRequired,
		houseName: PropTypes.string,
		group: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		children: PropTypes.node,
		required: PropTypes.bool,
	},

	render() {
		return (<TextQuestion
					name={`houseName_${this.props.addressId}`}
					inputClassName={`houseName_${this.props.addressId}`}
					validateType="alphanumeric"
					maxLength={40}
					group={this.props.group}
					dataAnchor={'house-name'}
					defaultValue={this.props.houseName}
					onChange={this.props.onChange}
					arrayName={this.props.arrayName}
					arrayIndex={this.props.arrayIndex}
					required={this.props.required}
		>
					{this.props.children}
				</TextQuestion>);
	},
});

module.exports = HouseName;

