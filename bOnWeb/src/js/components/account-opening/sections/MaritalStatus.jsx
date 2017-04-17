/**
 * @module MaritalStatus
 */

const React = require('react');
const { PropTypes } = React;
const config = require('../../../config');

const AccountOpeningActions = require('../../../actions/AccountOpeningActions');

const AccountOpeningConstants = require('../../../constants/AccountOpeningConstants');

const DropdownQuestion = require('../../common/questionsets/DropdownQuestion');

const MaritalStatus = React.createClass({

	propTypes: {
		content: PropTypes.object.isRequired,
		data: PropTypes.object.isRequired,
	},

	render() {
		return (
			<DropdownQuestion
				name="maritalStatus"
				group={AccountOpeningConstants.GROUP_PAGE_1}
				data={config.formOptionsMaritalStatus}
				onChange={AccountOpeningActions.updateFormValue}
				defaultValue={this.props.data.maritalStatus}
				dataAnchor="marital-status"
				required
			>
				{this.props.content.maritalStatusQuestion}
			</DropdownQuestion>
		);
	},
});

module.exports = MaritalStatus;
