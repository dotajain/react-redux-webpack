/**
 * @module City
 */

const React = require('react');
const { PropTypes } = React;

const { TextQuestion, StaticParagraphQuestion } = require('../../../common/questionsets');

const City = React.createClass({
	propTypes: {
		arrayName: PropTypes.string.isRequired,
		arrayIndex: PropTypes.number.isRequired,
		addressId: PropTypes.number.isRequired,
		city: PropTypes.string,
		group: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		children: PropTypes.node,
		editable: PropTypes.bool,
	},

	render() {
		return (this.props.editable ? <TextQuestion
					name={`city_${this.props.addressId}`}
					inputClassName={`city_${this.props.addressId}`}
					validateType="alphanumeric"
					maxLength={40}
					group={this.props.group}
					dataAnchor={'city'}
					defaultValue={this.props.city}
					onChange={this.props.onChange}
					arrayName={this.props.arrayName}
					arrayIndex={this.props.arrayIndex}
		>
					{this.props.children}
				</TextQuestion> : <StaticParagraphQuestion
					label={this.props.children}
					name={`city_${this.props.addressId}`}
					defaultValue={this.props.city}
				/>);
	},
});

module.exports = City;

