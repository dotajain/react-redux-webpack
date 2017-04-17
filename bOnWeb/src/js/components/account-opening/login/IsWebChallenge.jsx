const React = require('react');
const { PropTypes } = React;
const _ = require('lodash');
const ChallengeUtils = require('../../../utils/ChallengeUtils');

const webChallenges = ['partial_password', 'security_questions', 'acn', 'otp', 'debit_card', 'date_of_birth'];

const isWebChallenge = challenge => _.every(_.keys(challenge.auth_schemes[0].challenges), challenge => _.includes(webChallenges, challenge));

const IsWebChallenge = WrappedComponent => React.createClass({
	propTypes: {
		session: PropTypes.shape({
			challenge: PropTypes.object,
		}),
	},

	render() {
		if (ChallengeUtils(this.props.session).hasChallenge() && !this.props.session.challenge.error && !isWebChallenge(this.props.session.challenge)) {
			console.error('non-web-challenge:', this.props.session.challenge.auth_schemes[0].challenges);
		}

		return (
			<WrappedComponent {...this.props} />
		);
	},
});

module.exports = IsWebChallenge;
