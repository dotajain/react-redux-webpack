/**
 * @module PhoneNumber
 */

const React = require('react');
const PropTypes = React.PropTypes;

const BrandUtils = require('../../../utils/BrandUtils');
const { TextQuestion, ReadOnlyQuestion } = require('../../common/questionsets');

const PhoneNumber = props => {
	return (
		<ReadOnlyQuestion readOnly={props.readOnly} mask>
			<TextQuestion {...props} >
				{props.label}
			</TextQuestion>
		</ReadOnlyQuestion>

	);
};

PhoneNumber.propTypes = {
	readOnly: PropTypes.string,
	name: PropTypes.string.isRequired,
	group: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	defaultValue: PropTypes.string,
	dataAnchor: PropTypes.string.isRequired,
	required: PropTypes.bool,
	label: PropTypes.string.isRequired,
};

PhoneNumber.defaultProps = {
	readOnly: 'No',
	name: 'phoneNumber',
	minLength: 11,
	maxLength: 11,
	onChange: () => {},
	validateType: BrandUtils.isAbleToDisplay('requires-phone-number-to-be-mobile') ? 'mobilePhone' : 'phone',
	dataAnchor: 'mobile-number',
	required: true,
};

module.exports = PhoneNumber;
