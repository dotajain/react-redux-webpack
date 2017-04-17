/**
 * @module EconomicallyActiveComponent
 */

const React = require('react');
const { PropTypes } = React;
const config = require('../../../config');
const moment = require('moment');
const DateUtils = require('../../../utils/DateUtils');

const DropDownQuestion = require('../../common/questionsets/DropdownQuestion');
const DatePickerQuestion = require('../../common/questionsets/DatePickerQuestion');
const TextQuestion = require('../../common/questionsets/TextQuestion');

const EconomicallyActiveComponent = React.createClass({

	propTypes: {
		visible: PropTypes.bool.isRequired,
		fieldNames: PropTypes.object.isRequired,
		group: PropTypes.string.isRequired,
		content: PropTypes.object.isRequired,
		data: PropTypes.object,
		onChange: PropTypes.func.isRequired,
	},

	getDefaultProps() {
		return {
			data: {},
		};
	},

	/**
	 * Employment date validation to ensure user is older than
	 * 16 years
	 * @param {String}	Date of birth
	 */
	getEmploymentStartDateLimit(dateOfBirth) {
		return moment(
				DateUtils.getAPIDateString(dateOfBirth)
			).add(16, 'years');
	},

	render() {
		if (!this.props.visible) {
			return false;
		}

		return (
			<div>
				<DropDownQuestion
					group={this.props.group}
					name={this.props.fieldNames.employmentOccupation}
					data={config.formOptionsOccupation}
					onChange={this.props.onChange}
					defaultValue={this.props.data[this.props.fieldNames.employmentOccupation]}
					dataAnchor="employment-occupation"
					required
				>
					Occupation
				</DropDownQuestion>
				<DatePickerQuestion
					name={this.props.fieldNames.employmentStartDate}
					group={this.props.group}
					onChange={this.props.onChange}
					defaultValue={this.props.data[this.props.fieldNames.employmentStartDate]}
					validateBeforeToday
					validateAfterDate={this.getEmploymentStartDateLimit(this.props.data.dateOfBirth)}
					dataAnchor="employment-start-date"
					required
				>
					{this.props.content.employmentStartDateQuestion}
				</DatePickerQuestion>
				<TextQuestion
					name={this.props.fieldNames.employmentEmployerName}
					group={this.props.group}
					onChange={this.props.onChange}
					defaultValue={this.props.data[this.props.fieldNames.employmentEmployerName]}
					minLength={2}
					maxLength={40}
					dataAnchor="employer-name"
					required
				>
					Employer Name
				</TextQuestion>
			</div>
		);
	},
});

module.exports = EconomicallyActiveComponent;
