/**
 * @module Country
 */

const React = require('react');
const { PropTypes } = React;

const { DropdownQuestion, StaticParagraphQuestion } = require('../../../common/questionsets');

const Country = React.createClass({
	propTypes: {
		arrayName: PropTypes.string.isRequired,
		arrayIndex: PropTypes.number.isRequired,
		addressId: PropTypes.number.isRequired,
		countries: PropTypes.array.isRequired,
		country: PropTypes.string,
		group: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		children: PropTypes.node,
		editable: PropTypes.bool,
	},

	render() {
		return (this.props.editable ? <DropdownQuestion
					name={`country_${this.props.addressId}`}
					inputClassName={`country_${this.props.addressId}`}
					group={this.props.group}
					dataAnchor={'country'}
					defaultValue={this.props.country}
					onChange={this.props.onChange}
					data={this.props.countries}
					arrayName={this.props.arrayName}
					arrayIndex={this.props.arrayIndex}
					required
		>
					{this.props.children}
				</DropdownQuestion> : <StaticParagraphQuestion
					label={this.props.children}
					name={`country_${this.props.addressId}`}
					defaultValue={this.props.country}
					required
				/>);
	},
});

module.exports = Country;

