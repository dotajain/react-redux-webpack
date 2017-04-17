/**
 * @module MiddleName
 */

const React = require('react');
const PropTypes = React.PropTypes;

const AnalyticsWrapper = require('../../common/AnalyticsWrapper');
const { TextQuestion, ReadOnlyQuestion } = require('../../common/questionsets');

const MiddleName = props => {
	return (
		<ReadOnlyQuestion readOnly={props.readOnly}>
			<TextQuestion {...props} >
				{props.label}
			</TextQuestion>
		</ReadOnlyQuestion>

	);
};


MiddleName.propTypes = {
	readOnly: PropTypes.string,
	name: PropTypes.string.isRequired,
	group: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	defaultValue: PropTypes.string,
	dataAnchor: PropTypes.string.isRequired,
	required: PropTypes.bool,
	label: PropTypes.string.isRequired,
};

MiddleName.defaultProps = {
	readOnly: 'No',
	name: 'middleName',
	minLength: 2,
	maxLength: 12,
	onChange: () => {},
	validateType: 'alpha',
	dataAnchor: 'middle-name',
	required: true,
};

module.exports = AnalyticsWrapper(MiddleName);
