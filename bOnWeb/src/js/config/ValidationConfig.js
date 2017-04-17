const _ = require('lodash');
const RegexUtils = require('../utils/RegexUtils');
// Configuring validation criteria for input field
const validationData = [
	{
        inputName:'name',
		regex: RegexUtils.regexes.accountName,
		minLength: 1,
        maxLength: 18,
    },
    {
        inputName:'sort_code',
		regex: RegexUtils.regexes.number,
		minLength: 6,
        maxLength: 6,
    },
    {
        inputName:'display_name',
		regex: RegexUtils.regexes.accountName,
		minLength: 2,
        maxLength: 18,
    },
    {
        inputName:'reference',
		regex: RegexUtils.regexes.accountName,
		minLength: 2,
        maxLength: 18,
    },
    {
        inputName:'account_number',
		regex: RegexUtils.regexes.number,
		minLength: 8,
        maxLength: 8,
    },
    {
        inputName:'amount',
        regex: RegexUtils.regexes.decimalNumber,
        minLength: 1,
        maxLength: 10,
    },
    {
        inputName:'noOfTimes',
		regex: RegexUtils.regexes.number,
		minLength: 1,
        maxLength: 3,
    },
    ];

const validationConfig =
{
    // Geting validtaion object for the input Name
   getValidationObjet(inputName) {
        return _.find(validationData, { 'inputName': inputName });
    },
    // Validating the input and its value
    validateData(name, value) {
    const validationResult = {
        isValid:true,
        minLengthValid:true,
        maxLengthValid:true,
        regexValid:true,
    };
    // getting the validation object
    const validationCriteria = this.getValidationObjet(name);
    if (validationCriteria === undefined) {
            validationResult.isValid = true;
    }
    else {
            // Check if regex is valid
            if (!RegexUtils.isValid(value, validationCriteria.regex)) {
                validationResult.isValid = false;
                validationResult.regexValid = false;
                return validationResult;
            }
            // checking value with the configured minimum length
            else if (value.length < validationCriteria.minLength) {
                  validationResult.isValid = false;
                validationResult.minLengthValid = false;
                return validationResult;
            }
             // checking value with the configured maximum length
            else if (value.length > validationCriteria.maxLength) {
                validationResult.isValid = false;
                validationResult.maxLengthValid = false;
                return validationResult;
            }
            else {
                validationResult.isValid = true;
            }
    }
    // returning the result after the validation
        return validationResult;
    },
};
module.exports = validationConfig;
