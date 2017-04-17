/**
 * @module Gender
 */

const React = require('react');
const PropTypes = React.PropTypes;
const _ = require('lodash');

const { DropdownQuestion, ReadOnlyQuestion } = require('../../common/questionsets');

const Gender = React.createClass({
	propTypes: {
		data: PropTypes.array.isRequired,
		readOnly: PropTypes.string,
		name: PropTypes.string.isRequired,
		group: PropTypes.string.isRequired,
		onChange: PropTypes.func,
		defaultValue: PropTypes.string,
		dataAnchor: PropTypes.string.isRequired,
		required: PropTypes.bool,
		label: PropTypes.string.isRequired,
		customValidator: PropTypes.func,
	},

	getInitialState() {
		return {
			value: !_.isUndefined(this.props.defaultValue) ? this.props.defaultValue : '',
		};
	},

	render() {
		return (
			<ReadOnlyQuestion readOnly={this.props.readOnly}>
				<DropdownQuestion
					name={this.props.name}
					group={this.props.group}
					data={this.props.data}
					onChange={this.props.onChange}
					defaultValue={this.props.defaultValue}
					selectedValue={this.props.defaultValue}
					dataAnchor={this.props.dataAnchor}
					customValidator={this.props.customValidator}
					required={this.props.required}
				>
					{this.props.label}
				</DropdownQuestion>
			</ReadOnlyQuestion>
		);
	},
});

module.exports = Gender;
