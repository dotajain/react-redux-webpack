/**
 * @module AddressLine
 */

const React = require('react');
const { PropTypes } = React;

const { TextQuestion } = require('../../../common/questionsets');

const AddressLine = React.createClass({
	propTypes: {
		arrayName: PropTypes.string.isRequired,
		arrayIndex: PropTypes.number.isRequired,
		addressId: PropTypes.number.isRequired,
		addressLine: PropTypes.string,
		index: PropTypes.number.isRequired,
		group: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		children: PropTypes.node,
		validateType: PropTypes.string,
	},

	getDefaultProps() {
		return {
			validateType: 'alphanumeric',
		};
	},

	render() {
		const name = `addressLine${this.props.index}_${this.props.addressId}`;
		return (<TextQuestion
					name={name}
					inputClassName={name}
					validateType={this.props.validateType}
					maxLength={40}
					group={this.props.group}
					dataAnchor={`address-line-${this.props.index}`}
					defaultValue={this.props.addressLine}
					onChange={this.props.onChange}
					arrayName={this.props.arrayName}
					arrayIndex={this.props.arrayIndex}
		>
					{this.props.children}
				</TextQuestion>);
	},
});

module.exports = AddressLine;

