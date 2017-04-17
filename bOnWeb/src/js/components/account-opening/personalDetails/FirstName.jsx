/**
 * @module FirstName
 */

const React = require('react');
const { PropTypes } = React;

const { TextQuestion, ReadOnlyQuestion } = require('../../common/questionsets');
const AnalyticsWrapper = require('../../common/AnalyticsWrapper');

const FirstName = props => {
	return (
		<ReadOnlyQuestion readOnly={props.readOnly}>
			<TextQuestion {...props} >
				{props.label}
			</TextQuestion>
		</ReadOnlyQuestion>
	);
};

FirstName.propTypes = {
	readOnly: PropTypes.string,
	name: PropTypes.string,
	group: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	defaultValue: PropTypes.string,
	dataAnchor: PropTypes.string,
	required: PropTypes.bool,
	label: PropTypes.string.isRequired,
};

FirstName.defaultProps = {
	readOnly: 'No',
	name: 'firstName',
	minLength: 1,
	maxLength: 35,
	onChange: () => {},
	validateType: 'alpha',
	dataAnchor: 'first-name',
	required: true,
};

module.exports = AnalyticsWrapper(FirstName);
