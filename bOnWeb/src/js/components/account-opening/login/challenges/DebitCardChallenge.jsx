/**
 * @module DebitCardChallenge
 * @tutorial authentication
 */

const React = require('react');
const { PropTypes } = React;

const TextQuestion = require('../../../common/questionsets/TextQuestion');
const AccountOpeningConstants = require('../../../../constants/AccountOpeningConstants');

/**
 * Requests update to auth header
 *
 * @param {String} name of auth field within challenge
 * @param {String} value of auth field within challenge
 * @param {Object} props containing action of take onChange
 *
 */
function onChange(name, value, props) {
	props.requestAuthenticationUpdate({
		authType: 'debit_card',
		authData: props.encryptAnswer(value),
		authIndex: name,
	});
}

const DebitCardChallenge = props => {
	return (<span><TextQuestion
		name="pan"
		key="pan"
		group={props.group}
		mainColumnSize={12}
		mainColumnSizeMD={12}
		minLength={16}
		maxLength={16}
		validateType="number"
		validationText={props.content.panValidationMessage}
		helpText={props.content.panHelpMessage}
		onChange={(name, value) => onChange(name, value, props)}
		dataAnchor="auth-challenge-pan-input"
		required
	>
		{props.content.debitCardAuthPan}
	</TextQuestion>
	<TextQuestion
		name="sort_code"
		key="sort_code"
		group={props.group}
		mainColumnSize={12}
		mainColumnSizeMD={12}
		minLength={6}
		maxLength={6}
		validateType="number"
		validationText={props.content.sortCodeValidationMessage}
		helpText={props.content.sortCodeHelpMessage}
		onChange={(name, value) => onChange(name, value, props)}
		dataAnchor="auth-challenge-sort-code-input"
		required
	>
		{props.content.debitCardAuthSortCode}
	</TextQuestion>
	<TextQuestion
		name="account_number"
		key="account_number"
		group={props.group}
		mainColumnSize={12}
		mainColumnSizeMD={12}
		minLength={8}
		maxLength={8}
		validateType="number"
		validationText={props.content.accountNumberValidationMessage}
		helpText={props.content.accountNumberHelpMessage}
		onChange={(name, value) => onChange(name, value, props)}
		dataAnchor="auth-challenge-account-number-input"
		required
	>
		{props.content.debitCardAuthAccountNumber}
	</TextQuestion></span>);
};

DebitCardChallenge.defaultProps = {
	group: AccountOpeningConstants.GROUP_LOGIN,
};

DebitCardChallenge.propTypes = {
	session: PropTypes.object.isRequired,
	content: PropTypes.object.isRequired,
	group: PropTypes.string.isRequired,
	encryptAnswer: PropTypes.func.isRequired,
	requestAuthenticationUpdate: PropTypes.func.isRequired,
};

module.exports = DebitCardChallenge;
