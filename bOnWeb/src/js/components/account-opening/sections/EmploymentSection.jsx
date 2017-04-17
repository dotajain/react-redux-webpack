/**
 * @module EmploymentSection
 */

const _ = require('lodash');
const React = require('react');
const { PropTypes } = React;
const config = require('../../../config');

const AccountOpeningActions = require('../../../actions/AccountOpeningActions');
const AnalyticsActionCreator = require('../../../actions/AnalyticsActionCreator');

const ComponentHeader = require('../../common/ComponentHeader');
const DropDownQuestion = require('../../common/questionsets/DropdownQuestion');
const EconomicallyActiveComponent = require('../employment/EconomicallyActiveComponent');

const activeState = 'active';
const inactiveState = 'inactive';
const inactiveEmploymentStatusName = 'Economically inactive'; // Will be sent to the API.

// These are used in child copmonents and it doesn't make sense to duplicate them
const _fieldNames = {
	employmentStatusName: 'employmentStatus',
	employmentOccupation: 'employmentOccupation',
	employmentStartDate: 'employmentStartDate',
	employmentEmployerName: 'employerName',
};

const EmploymentSection = React.createClass({

	propTypes: {
		group: PropTypes.string.isRequired,
		content: PropTypes.object.isRequired,
		data: PropTypes.object,
	},

	/**
	 * Get the _data object for the selected employment status.
	 *
	 * @param {String} employmentStatus 		e.g. 'Full time'
	 * @return {Object} One of the values defined in _data above.
	 */
	getJobStatusData(employmentStatus) {
		return _.find(config.formOptionsEmploymentStatus, item => {
			return item.value === employmentStatus;
		});
	},

	_onEmploymentStatusChange(name, values) {
		const valuesArr = values.split('|');

		const employmentStatus = valuesArr[0];
		const behaviour = valuesArr[1];

		if (employmentStatus === 'Self employed') {
			AnalyticsActionCreator.track({
				path: '/user/experience/activity',
				action: 'Interacted',
			}, {
				description: 'SelfEmployedSelected',
				event: (this.props.data[name] ? 'updated' : 'created'),
			});
		}

		// This is the payload to eventually send to AccountOpeningActions.
		const payload = [];
		payload.push({ key: _fieldNames.employmentStatusName, value: employmentStatus });

		// If going from economically inactive to active we also need to clear the values we set
		if (behaviour === inactiveState) {
			payload.push({ key: _fieldNames.employmentOccupation, value: undefined });
			payload.push({ key: _fieldNames.employmentStartDate, value: undefined });
			payload.push({ key: _fieldNames.employmentEmployerName, value: undefined });
		}

		// Don't bother if there's nothing inside.
		if (payload.length > 0) {
			AccountOpeningActions.updateFormValues(payload);
		}
	},

	/**
	 * Is the current employment status classed as economically active?
	 *
	 * @return {Boolean} True if active. False if inactive or no employment status set.
	 */
	isEconomicallyActive() {
		const statusData = this.getJobStatusData(this.props.data[_fieldNames.employmentStatusName]);
		return !!(statusData && (statusData.behaviour === activeState));
	},

	/**
	 * Is the current employment status classed as economically inactive?
	 *
	 * @return {Boolean} True if inactive. False if active or no employment status set.
	 */
	isEconomicallyInactive() {
		const currentStatusName = this.props.data[_fieldNames.employmentStatusName];
		return !!(currentStatusName && (currentStatusName === inactiveEmploymentStatusName));
	},

	render() {
		return (
			<ComponentHeader
				title={this.props.content.employmentSectionTitle}
				titleLevel={2}
				subTitle={this.props.content.employmentSectionSubtitle}
				hasSeparator
			>

				<p className="intro-paragraph">{this.props.content.employmentSectionIntro}</p>

				<DropDownQuestion
					name={_fieldNames.employmentStatusName}
					group={this.props.group}
					data={config.formOptionsEmploymentStatus}
					onChange={this._onEmploymentStatusChange}
					defaultValue={this.props.data[_fieldNames.employmentStatusName]}
					dataAnchor="employment-status"
					required
				>
					{this.props.content.employmentStatusQuestion}
				</DropDownQuestion>
				<EconomicallyActiveComponent
					group={this.props.group}
					content={this.props.content}
					onChange={AccountOpeningActions.updateFormValue}
					data={this.props.data}
					visible={this.isEconomicallyActive()}
					fieldNames={_fieldNames}
				/>
			</ComponentHeader>
		);
	},
});

module.exports = EmploymentSection;
