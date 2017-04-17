/**
 * @module StreetName
 *
 * @component StreetName|{"addressId":0, "streetName": "Test Street", "group": "docs", "onChange": "onChange"}
 */

const React = require('react');
const { PropTypes } = React;

const { TextQuestion } = require('../../../common/questionsets');

const StreetName = React.createClass({
	propTypes: {
		arrayName: PropTypes.string.isRequired,
		arrayIndex: PropTypes.number.isRequired,
		addressId: PropTypes.number.isRequired,
		streetName: PropTypes.string,
		group: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		children: PropTypes.node,
	},

	render() {
		return (<TextQuestion
					name={`streetName_${this.props.addressId}`}
					inputClassName={`streetName_${this.props.addressId}`}
					validateType="alphanumeric"
					maxLength={40}
					group={this.props.group}
					dataAnchor={'street'}
					defaultValue={this.props.streetName}
					onChange={this.props.onChange}
					arrayName={this.props.arrayName}
					arrayIndex={this.props.arrayIndex}
		>
					{this.props.children}
				</TextQuestion>);
	},
});

module.exports = StreetName;

