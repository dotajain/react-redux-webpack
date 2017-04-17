/**
 * @module LastName
 */

const React = require('react');
const PropTypes = React.PropTypes;

const AnalyticsWrapper = require('../../common/AnalyticsWrapper');
const { TextQuestion, ReadOnlyQuestion } = require('../../common/questionsets');

const LastName = props => {
	return (
		<ReadOnlyQuestion readOnly={props.readOnly}>
			<TextQuestion {...props} >
				{props.label}
			</TextQuestion>
		</ReadOnlyQuestion>

	);
};

LastName.propTypes = {
	readOnly: PropTypes.string,
	name: PropTypes.string.isRequired,
	group: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	defaultValue: PropTypes.string,
	dataAnchor: PropTypes.string.isRequired,
	required: PropTypes.bool,
	label: PropTypes.string.isRequired,
};

LastName.defaultProps = {
	readOnly: 'No',
	name: 'lastName',
	minLength: 1,
	maxLength: 35,
	onChange: () => {},
	validateType: 'alpha',
	dataAnchor: 'last-name',
	required: true,
};

module.exports = AnalyticsWrapper(LastName);
