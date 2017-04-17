/**
 * @module County
 */

const React = require('react');
const { PropTypes } = React;

const { TextQuestion } = require('../../../common/questionsets');

const County = React.createClass({
	propTypes: {
		arrayName: PropTypes.string.isRequired,
		arrayIndex: PropTypes.number.isRequired,
		addressId: PropTypes.number.isRequired,
		county: PropTypes.string,
		group: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		children: PropTypes.node,
		editable: PropTypes.bool,
	},

	render() {
		return (<TextQuestion
					name={`county_${this.props.addressId}`}
					inputClassName={`county_${this.props.addressId}`}
					validateType="alphanumeric"
					maxLength={40}
					group={this.props.group}
					dataAnchor={'county'}
					defaultValue={this.props.county}
					onChange={this.props.onChange}
					arrayName={this.props.arrayName}
					arrayIndex={this.props.arrayIndex}
		>
					{this.props.children}
				</TextQuestion>);
	},
});

module.exports = County;

