/**
 * @module AccessSortCodeAccountChallenge
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
		authType: 'acn',
		authData: props.encryptAnswer(value),
		authIndex: name,
	});
}

const AccessSortCodeAccountChallenge = props => {
	return (<span>
		<TextQuestion
			name="access_code"
			key="access_code"
			group={props.group}
			mainColumnSize={12}
			mainColumnSizeMD={12}
			minLength={4}
			maxLength={4}
			validateType="number"
			validationText={props.content.accessCodeValidationMessage}
			helpText={props.content.accessCodeHelpMessage}
			onChange={(name, value) => onChange(name, value, props)}
			dataAnchor="auth-challenge-acn-input"
			required
		>
			{props.content.telephoneAuthAccessCode}
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
			{props.content.telephoneAuthSortCode}
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
			{props.content.telephoneAuthAccountNumber}
		</TextQuestion>
	</span>);
};

AccessSortCodeAccountChallenge.defaultProps = {
	group: AccountOpeningConstants.GROUP_LOGIN,
};

AccessSortCodeAccountChallenge.propTypes = {
	session: PropTypes.object.isRequired,
	content: PropTypes.object.isRequired,
	group: PropTypes.string.isRequired,
	encryptAnswer: PropTypes.func.isRequired,
	requestAuthenticationUpdate: PropTypes.func.isRequired,
};

module.exports = AccessSortCodeAccountChallenge;
