/**
 * @module DateOfBirthChallenge
 * @tutorial authentication
 */
const React = require('react');
const { PropTypes } = React;

const AccountOpeningConstants = require('../../../../constants/AccountOpeningConstants');
const DatePickerQuestion = require('../../../common/questionsets/DatePickerQuestion');
const ProductUtils = require('../../../../utils/ProductUtils');

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
		authType: 'date_of_birth',
		authData: props.encryptAnswer(value),
	});
}

const DateOfBirthChallenge = props => {
	const minAge = ProductUtils.getMinAge(props.data.productCode);
    const maxAge = ProductUtils.getMaxAge(props.data.productCode);
	return (
		<DatePickerQuestion
				validateMinAge={minAge}
				validateMaxAge={maxAge}
				{...props}
				onChange={(name, value) => onChange(name, value, props)}
		/>
	);
};

DateOfBirthChallenge.defaultProps = {
	group: AccountOpeningConstants.GROUP_LOGIN,
	readOnly: 'No',
	name: 'dateOfBirth',
	onChange: () => {},
	dataAnchor: 'date-of-birth',
	required: true,
};

DateOfBirthChallenge.propTypes = {
	session: PropTypes.object.isRequired,
	content: PropTypes.object.isRequired,
	group: PropTypes.string.isRequired,
	encryptAnswer: PropTypes.func.isRequired,
	requestAuthenticationUpdate: PropTypes.func.isRequired,
	readOnly: PropTypes.string,
	data: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	defaultValue: PropTypes.string,
	dataAnchor: PropTypes.string.isRequired,
	required: PropTypes.bool,

};

module.exports = DateOfBirthChallenge;
