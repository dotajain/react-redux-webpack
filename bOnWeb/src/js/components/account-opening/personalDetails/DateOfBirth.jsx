/**
 * @module DateOfBirth
 */

const React = require('react');
const PropTypes = React.PropTypes;

const ProductUtils = require('../../../utils/ProductUtils');
const { DatePickerQuestion, ReadOnlyQuestion } = require('../../common/questionsets');

const DateOfBirth = props => {
    const minAge = ProductUtils.getMinAge(props.data.productCode);
    const maxAge = ProductUtils.getMaxAge(props.data.productCode);
    return (
        <ReadOnlyQuestion readOnly={props.readOnly} mask>
            <DatePickerQuestion
                validateMinAge={minAge}
                validateMaxAge={maxAge}
                {...props}
            >
                {props.label}
            </DatePickerQuestion>
        </ReadOnlyQuestion>
    );
};

DateOfBirth.propTypes = {
	readOnly: PropTypes.string,
	data: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,
	group: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	defaultValue: PropTypes.string,
	dataAnchor: PropTypes.string.isRequired,
	required: PropTypes.bool,
	label: PropTypes.string.isRequired,
};

DateOfBirth.defaultProps = {
	readOnly: 'No',
	name: 'dateOfBirth',
	onChange: () => {},
	dataAnchor: 'date-of-birth',
	required: true,
};


module.exports = DateOfBirth;
