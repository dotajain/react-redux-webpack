/**
 * @module SecurityQuestions
 */

const React = require('react');
const { PropTypes } = React;

const AccountOpeningActions = require('../../../actions/AccountOpeningActions');

const TextQuestion = require('../../common/questionsets/TextQuestion');
const DropdownQuestion = require('../../common/questionsets/DropdownQuestion');

const AccountOpeningConstants = require('../../../constants/AccountOpeningConstants');

const group = AccountOpeningConstants.GROUP_REGISTRATION;

const SecurityQuestions = React.createClass({

	propTypes: {
		numQuestions: PropTypes.number.isRequired,
		data: PropTypes.object.isRequired,
		content: PropTypes.object.isRequired,
		securityQuestions: PropTypes.array,
	},

	_getSelectedSecurityQuestions(thisQuestionId) {
		const selectedSecurityQuestions = [];

		for (let i = 1; i <= this.props.numQuestions; i++) {
			if (thisQuestionId !== i) {
				const selectedSecurityQuestion = this.props.data[`securityQuestion${i}`];

				if (selectedSecurityQuestion) {
					selectedSecurityQuestions.push(selectedSecurityQuestion);
				}
			}
		}

		return selectedSecurityQuestions;
	},

	render() {
		const securityQuestions = [];

		for (let i = 1; i <= this.props.numQuestions; i++) {
			securityQuestions.push(
				<div key={i}>
					<DropdownQuestion
						name={`securityQuestion${i}`}
						data={this.props.securityQuestions}
						group={group}
						onChange={AccountOpeningActions.updateFormValue}
						defaultValue={this.props.data[`securityQuestion${i}`]}
						validateNotEqualToThese={this._getSelectedSecurityQuestions(i)}
						validationText={this.props.content.securityQuestionDropdownValidationMessage}
						helpText={this.props.content.securityQuestionDropdownHelpText}
						dataAnchor={`security-Q${i}`}
						required
					>
						{`Security question ${i}`}
					</DropdownQuestion>
					<TextQuestion
						name={`securityQuestion${i}Answer`}
						group={group}
						onChange={AccountOpeningActions.updateFormValue}
						defaultValue={this.props.data[`securityQuestion${i}Answer`]}
						minLength={6}
						maxLength={20}
						validateType="alphanumeric"
						maskValueOnBlur
						helpText={this.props.content.securityQuestionInputHelpText}
						validationText={this.props.content.securityQuestionInputValidationMessage}
						dataAnchor={`security-A${i}`}
						required
						encrypt
					>
						{`Answer ${i}`}
					</TextQuestion>
				</div>
			);
		}

		return (
			<div>
				{securityQuestions}
			</div>
		);
	},
});

module.exports = SecurityQuestions;
