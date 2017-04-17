/**
 * @module PartialPasswordChallenge
 * @tutorial authentication
 */

const React = require('react');
const { PropTypes } = React;
const _ = require('lodash');

const AccountOpeningConstants = require('../../../../constants/AccountOpeningConstants');
const MultiTextQuestion = require('../../../common/questionsets/MultiTextQuestion');

/**
 * Requests update to auth header
 *
 * @param {String} name of auth field within challenge
 * @param {String} value of auth field within challenge
 * @param {Object} props containing action of take onChange
 *
 */
function onChange(name, value, props) {
	const authenticationAnswers = _.transform(value, (result, item) => {
		result.push(props.encryptAnswer(item));
	});

	props.requestAuthenticationUpdate({
		authType: 'partial-password',
		authData: authenticationAnswers,
	});
}

function getPassWordPositions(props) {
	return props.session.challenge['auth_schemes'][0].challenges['partial_password'].positions;
}

const PartialPasswordChallenge = props => {
	const passwordPositions = getPassWordPositions(props);
	const columnsize = 12 / passwordPositions.length;

	return (<MultiTextQuestion
		name="password"
		key="password"
		group={props.group}
		data={passwordPositions}
		itemPrefix={props.content.passwordCharacterPrefix}
		onChange={(name, value) => onChange(name, value, props)}
		mainColumnSize={columnsize}
		mainColumnSizeMD={columnsize}
		inputsMaxLength={1}
		inputType="password"
		autoTab
		required
	>
		{props.content.passwordLabel}
	</MultiTextQuestion>);
};

PartialPasswordChallenge.defaultProps = {
	group: AccountOpeningConstants.GROUP_LOGIN,
};

PartialPasswordChallenge.propTypes = {
	session: PropTypes.object.isRequired,
	content: PropTypes.object.isRequired,
	group: PropTypes.string.isRequired,
	encryptAnswer: PropTypes.func.isRequired,
	requestAuthenticationUpdate: PropTypes.func.isRequired,
};

module.exports = PartialPasswordChallenge;
