/**
 * @module EmailAddress
 */

const React = require('react');
const PropTypes = React.PropTypes;

const AnalyticsWrapper = require('../../common/AnalyticsWrapper');
const { TextQuestion } = require('../../common/questionsets');

const EmailAddress = props => {
	return (
			<TextQuestion {...props} >
				{props.label}
			</TextQuestion>
	);
};

EmailAddress.propTypes = {
	readOnly: PropTypes.string,
	name: PropTypes.string.isRequired,
	group: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	defaultValue: PropTypes.string,
	dataAnchor: PropTypes.string.isRequired,
	required: PropTypes.bool,
	label: PropTypes.string.isRequired,
};

EmailAddress.defaultProps = {
	readOnly: 'No',
	name: 'emailAddress',
	minLength: 6,
	maxLength: 70,
	onChange: () => {},
	validateType: 'email',
	dataAnchor: 'email-address',
	required: true,
};

module.exports = AnalyticsWrapper(EmailAddress);
