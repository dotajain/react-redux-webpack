/**
 * @module ChallengeError
 * @tutorial authentication
 */

const React = require('react');
const { PropTypes } = React;

const ChallengeError = props => {
	return (<p className="error" key={props.type}>{props.content[props.type]}</p>);
};

ChallengeError.propTypes = {
	type: PropTypes.string.isRequired,
	content: PropTypes.object.isRequired,
};

module.exports = ChallengeError;
