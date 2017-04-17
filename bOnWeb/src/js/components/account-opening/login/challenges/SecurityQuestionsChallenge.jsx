/**
 * @module PartialPasswordChallenge
 * @tutorial authentication
 */

const React = require('react');
const { PropTypes } = React;

const _ = require('lodash');
const TextQuestion = require('../../../common/questionsets/TextQuestion');
const AccountOpeningConstants = require('../../../../constants/AccountOpeningConstants');

const securityQuestionName = 'security-question-';

function getQuestions(props) {
	return _.head(props.session.challenge.auth_schemes).challenges['security_questions'].questions;
}

/**
 * Requests update to auth header
 *
 * @param {String} name of auth field within challenge
 * @param {String} value of auth field within challenge
 * @param {Object} props containing action of take onChange
 *
 */
function onChange(name, value, props) {
	const index = parseInt(name.replace(securityQuestionName, ''));
	props.requestAuthenticationUpdate({
		authType: 'security-questions',
		authData: props.encryptAnswer(value),
		authIndex: index,
	});
}

const SecurityQuestionsChallenge = props => {
	const questions = getQuestions(props);

	return (
		<span>
			{questions.map((item, index) => {
				return (<TextQuestion
					name={securityQuestionName + index}
					key={securityQuestionName + index}
					groupValidationName="authChallengeSecurityQuestion"
					group={props.group}
					dataAnchor={securityQuestionName + index}
					onChange={(name, value) => onChange(name, value, props)}
					mainColumnSize={12}
					mainColumnSizeMD={12}
					required
				>
					{item}
				</TextQuestion>);
			})}
		</span>
	);
};

SecurityQuestionsChallenge.defaultProps = {
	group: AccountOpeningConstants.GROUP_LOGIN,
};

SecurityQuestionsChallenge.propTypes = {
	session: PropTypes.object.isRequired,
	group: PropTypes.string.isRequired,
	encryptAnswer: PropTypes.func.isRequired,
	requestAuthenticationUpdate: PropTypes.func.isRequired,
};

module.exports = SecurityQuestionsChallenge;
