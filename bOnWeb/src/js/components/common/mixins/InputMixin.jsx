/**
 * @module InputMixin
 * @mixin InputMixin
 */

const _ = require('lodash');
const React = require('react');
const { PropTypes } = React;
const moment = require('moment-business-days');
const cx = require('classnames');

const config = require('../../../config');

const ErrorMessage = require('../ErrorMessage');

const AccountOpeningActions = require('../../../actions/AccountOpeningActions');

const ContentStore = require('../../../stores/AccountOpeningContentStore');
const ValidationStore = require('../../../stores/ValidationStore');

const DateUtils = require('../../../utils/DateUtils');
const RegexUtils = require('../../../utils/RegexUtils');

const InputMixin = {

	propTypes: {
		children: PropTypes.node,
	},

	/**
	 * All inputs should send their validation status first.
	 * Do not override this accidentally.
	 */
	componentDidMount() {
		this.updateStateValidation();

		// If a value has been pre-filled, then re-enable validation instantly.
		if (!_.isUndefined(this.props.defaultValue)) {
			this.enableValidation();
		}
	},

	/**
	 * New props received. Did that include changes to validation rules?
	 *
	 * @param  {Object} prevProps
	 * @param  {Object} prevState
	 */
	componentDidUpdate(prevProps) {
		/**
		 * Should there be any children in the props or previous props, we should
		 * clone JSON and remove children to avoid circular references which can't be evaulated by JSON.stringify
		 *
		 * Do not edit the real props and prevProps objects. This causes bugs!
		 */
		let prevPropsToCompare = prevProps;
		let propsToCompare = this.props;

		if (prevProps.children || prevProps.labelSpan) {
			prevPropsToCompare = this.setupForCompare(prevPropsToCompare);
		}

		if (this.props.children || this.props.labelSpan) {
			propsToCompare = this.setupForCompare(this.props);
		}

		if (JSON.stringify(propsToCompare) !== JSON.stringify(prevPropsToCompare)) {
			this.updateStateValidation();
		}
	},

	setupForCompare(props) {
		if (this.__keysToCompare) {
			return _.values(_.pick(props, this.__keysToCompare));
		}

		const propsToCompare = _.pickBy(props, value => {
			return !(_.isObject(value) && value.$$typeof) && !_.isFunction(value);
		});

		this.__keysToCompare = _.keys(propsToCompare);

		return _.values(propsToCompare);
	},

	/**
	 * All inputs should clear their validation if being removed.
	 * Do not override this accidentally.
	 */
	componentWillUnmount() {
		if (_.isFunction(this._componentWillUnmount)) {
			this._componentWillUnmount();
		}

		this.removeStateValidation();
	},

	/**
	 * Convenience function. Fire the updateValidation action for the current value held in state.
	 */
	updateStateValidation() {
		AccountOpeningActions.updateValidation(this.props.group, this.props.name, this.isValid(this.state.value));
	},

	/**
	 * Convenience function. Fire the updateValidation action for the current value held in state, with a null
	 * isValid function to clear it.
	 */
	removeStateValidation() {
		AccountOpeningActions.removeValidation(this.props.group, this.props.name);
	},

	/**
	 * Convenience function. Fire the enableValidation method for the current component.
	 */
	enableValidation() {
		AccountOpeningActions.enableValidation(this.props.group, this.props.name);
	},

	/**
	 *  Get required question text if question is marked as required.
	 */
	getRequiredQuestionText() {
		if (this.props.required) {
			return config.requiredQuestionText;
		}
		return '';
	},

	/**
	 * Validate this component against its properties.
	 *
	 * @param {Any} value 		The value to be tested. Usually from state.
	 * @return {Boolean} 		True if the current value is valid.
	 */
	isValid(value) {
		// Is it required?
		if (this.props.required) {
			// For checkboxes, required means the box must be ticked.
			if (this.isCheckbox()) {
				if (!this.isTrue(value)) {
					return false;
				}

			// Regular "isRequired"
			} else if (!this.isPresent(value)) {
				return false;
			}
		}

		// minLength
		if (!_.isUndefined(this.props.minLength) && !this.isOverLength(value, this.props.minLength)) {
			return false;
		}

		// maxLength
		if (!_.isUndefined(this.props.maxLength) && !this.isUnderLength(value, this.props.maxLength)) {
			return false;
		}

		// validateEqualTo
		if (!_.isUndefined(this.props.validateEqualTo) && !this.isEqualTo(value, this.props.validateEqualTo) ||
			!_.isUndefined(this.props.validateNotEqualTo) && this.isEqualTo(value, this.props.validateNotEqualTo)) {
			return false;
		}

		// validateEqualToThese
		if (!_.isUndefined(this.props.validateEqualToThese) && !this.areEqualTo(value, this.props.validateEqualToThese) ||
			!_.isUndefined(this.props.validateNotEqualToThese) && this.areEqualTo(value, this.props.validateNotEqualToThese)) {
			return false;
		}

		// validateRegex
		if (!_.isUndefined(this.props.validateRegex) && !this.isValidRegex(value, this.props.validateRegex)) {
			return false;
		}

		// validateType
		if (!_.isUndefined(this.props.validateType) && !this.isValidType(value, this.props.validateType)) {
			return false;
		}

		// validateMinAge
		if (!_.isUndefined(this.props.validateMinAge) && !this.isOverAge(value, this.props.validateMinAge)) {
			return false;
		}

		// validateMaxAge
		if (!_.isUndefined(this.props.validateMaxAge) && this.isOverAge(value, this.props.validateMaxAge + 1)) {
			return false;
		}

		// validateBeforeDate
		if (!_.isUndefined(this.props.validateBeforeDate) && !this.isBefore(value, this.props.validateBeforeDate)) {
			return false;
		}

		// validateAfterDate
		if (!_.isUndefined(this.props.validateAfterDate) && !this.isAfter(value, this.props.validateAfterDate)) {
			return false;
		}

		// validateBeforeToday
		if (!_.isUndefined(this.props.validateBeforeToday) && this.isTheFuture(value)) {
			return false;
		}

		// validateAfterToday
		if (!_.isUndefined(this.props.validateAfterToday) && !this.isTheFuture(value)) {
			return false;
		}

		// validateDaysFromToday
		if (!_.isUndefined(this.props.validateDaysFromToday)) {
			const range = _.map(this.props.validateDaysFromToday.split('-'), item => {
				return parseInt(item, 10);
			});

			if (!this.isInDaysRange(value, range[0], range[1])) {
				return false;
			}
		}

		// validateWorkingDaysFromToday
		if (!_.isUndefined(this.props.validateWorkingDaysFromToday)) {
			const weekDayRange = _.map(this.props.validateWorkingDaysFromToday.split('-'), item => {
				return parseInt(item, 10);
			});
			const valueMoment = DateUtils.getMomentFromDateString(value);

			if (!this.isInWorkingDaysRange(valueMoment, weekDayRange[0], weekDayRange[1])) {
				return false;
			}
		}

		// validateExpirationDate
		if (!_.isUndefined(this.props.validateExpirationDate) && this.isCardExpired(value)) {
			return false;
		}

		// validateLessThan
		if (!_.isUndefined(this.props.validateLessThan) && (value >= this.props.validateLessThan)) {
			return false;
		}

		// Custom validation function?
		if (_.isFunction(this.customValidator) && !this.customValidator()) {
			return false;
		}

		return true;
	},

	/**
	 * Should we show this component?
	 *
	 * @return {Boolean}       True if props.visible is true and there is a value.
	 */
	isVisible() {
		return _.isUndefined(this.props.visible) ? true : this.props.visible;
	},

	/**
	 * Has a value been entered?
	 *
	 * @param  {Any}  value 	The value to be tested.
	 * @return {Boolean}       True if a value exists.
	 */
	isPresent(value) {
		// @ticket DYB-19416
		const isValid = !_.isNumber(value) ? !_.isEmpty(value) : _.isNumber(value);

		return !_.isUndefined(value) && !_.isNull(value) && isValid;
	},

	/**
	 * Is the given value equal to the reference value?
	 *
	 * @param  {Any}  value          Values to be compared
	 * @param  {Any}  referenceValue Values to be compared
	 * @return {Boolean}             True if equal.
	 */
	isEqualTo(value, referenceValue) {
		return (value === referenceValue);
	},

	/**
	 * Are any of the given values equal to the reference value?
	 *
	 * @param  {Any}  value 				Values to be compared
	 * @param  {Array}  referenceValues 	Values to be compared
	 * @return {Boolean}					True if equal.
	 */
	areEqualTo(value, referenceValues) {
		let result = false;

		_.each(referenceValues, referenceValue => {
			if (this.isEqualTo(value, referenceValue)) {
				result = true;
			}
		});

		return result;
	},

	/**
	 * Is the given value identical to true?
	 *
	 * @param  {Boolean}  value 	Input value.
	 * @return {Boolean}       		True if pass. False otherwise.
	 */
	isTrue(value) {
		return (value === true);
	},

	/**
	 * Is the given value identical to false?
	 *
	 * @param  {Boolean}  value 	Input value.
	 * @return {Boolean}       		True if pass. False otherwise.
	 */
	isFalse(value) {
		return (value === false);
	},

	/**
	 * Is the given value equal to or over a certain length?
	 *
	 * @param  {String}  value     String to test.
	 * @param  {Number}  minLength Length it must be.
	 * @return {Boolean}           True if equal to or greater than the min.
	 */
	isOverLength(value, minLength) {
		const minLengthValue = _.isString(minLength) ? parseInt(minLength, 10) : minLength;
		const valueString = (_.isNumber(value) || _.isString(value)) && value.toString();

		// Allows for non-required fields to be present
		if (!_.isUndefined(valueString) && (valueString.length >= minLengthValue || valueString.length === 0)) {
			return true;
		}
	},

	/**
	 * Is the given value less than or equal to a certain length?
	 *
	 * @param  {String}  value     String to test.
	 * @param  {Number}  maxLength Length it must be.
	 * @return {Boolean}           True if equal to or less than the min.
	 */
	isUnderLength(value, maxLength) {
		const maxLengthValue = _.isString(maxLength) ? parseInt(maxLength, 10) : maxLength;
		const valueString = (_.isNumber(value) || _.isString(value)) && value.toString();

		// Allows for non-required fields to be present
		if (!_.isUndefined(valueString) && valueString.length <= maxLengthValue || valueString.length === 0) {
			return true;
		}
	},

	/**
	 * Is the given value less than or equal to a certain length?
	 *
	 * @param  {String}  value     String to test.
	 * @param  {RegexConstant}     The RegexConstant to test against the value.
	 */
	isValidRegex(value, regexConstant) {
		return RegexUtils.isValid(value, regexConstant);
	},

	/**
	 * Validates the value against the pre-defined list of types
	 * https://abouthere.atlassian.net/wiki/display/DYB/Global+behaviours
	 *
	 * @param  {String}  value String to test
	 * @param  {String}  type  One of the pre-defined list.
	 * @return {Boolean}       True if valid.
	 */
	isValidType(value, type) {
		const regex = RegexUtils.regexes[type];

		if (!this.props.required && !this.isPresent(value)) {
			return true;
		} else if (!_.isUndefined(regex)) {
			return this.isValidRegex(value, regex);
		} else {
			console.warn(`Unable to find regex for type: ${type}`);
			return false;
		}
	},

	/**
	 * Does the selected date make the user older than a given age?
	 *
	 * @param  {String} dateStr 	e.g. '31-01-2015'
	 * @param  {Number}  minAge 	Age the user must be.
	 * @return {Boolean}          True if equal to or greater than the min.
	 */
	isOverAge(value, minAge) {
		const valueMoment = DateUtils.getMomentFromDateString(value);
		const minimumDOB = moment().subtract(minAge, 'years');

		return valueMoment.isBefore(minimumDOB);
	},

	/**
	 * Is the selected date in the past?
	 *
	 * @param  {String} dateStr 	e.g. '31-01-2015'
	 * @return {Boolean}           	True if the value is after current moment
	 */
	isTheFuture(value) {
		const valueMoment = DateUtils.getMomentFromDateString(value);
		const lastMomentOfYesterday = moment().startOf('days').subtract(1, 'milliseconds');

		return valueMoment.isAfter(lastMomentOfYesterday);
	},

	/**
	 * Is the given date before a set limit?
	 *
	 * @param  {String}  value  The field value.
	 * @param  {String}  target The boundary date string.
	 * @return {Boolean}        True if value is before.
	 */
	isBefore(value, target) {
		const valueMoment = DateUtils.getMomentFromDateString(value);
		const targetMoment = DateUtils.getMomentFromDateString(target);

		return valueMoment.isBefore(targetMoment);
	},

	/**
	 * Is the given date afer a set limit?
	 *
	 * @param  {String|Moment}  value  The field value.
	 * @param  {String|Moment}  target The boundary date string.
	 * @return {Boolean}        True if value is after.
	 */
	isAfter(value, target) {
		const valueMoment = moment.isMoment(value) ? value : DateUtils.getMomentFromDateString(value);
		const targetMoment = moment.isMoment(target) ? target : DateUtils.getMomentFromDateString(target);

		return valueMoment.isAfter(targetMoment);
	},

	/**
	 * Is the given card expiration date in the past?
	 *
	 * @param  {String}  value e.g. "0315"
	 * @return {Boolean}       True if expired.
	 */
	isCardExpired(value) {
		if (!_.isString(value) || value.length !== 4) {
			return true;
		}

		const expiryMoment = moment(value, 'MMYY');

		return expiryMoment.isBefore(moment(), 'month');
	},

	/**
	 * Validates that a given date is within the from and to numbers of days from today.
	 *
	 * @param  {String}  value 		The chosen date.
	 * @param  {Number}  daysFrom 	How many days from today is acceptable?
	 * @param  {Number}  daysTo		How many days in the future is acceptable?
	 * @return {Boolean}      		True if the given date is within the range.
	 */
	isInDaysRange(value, daysFrom, daysTo) {
		const valueMoment = DateUtils.getMomentFromDateString(value);

		if (!_.isNumber(daysFrom) || !_.isNumber(daysTo) || !valueMoment.isValid()) {
			return false;
		}

		const momentFrom = moment().add(daysFrom - 1, 'days').endOf('day'); // i.e. solve 23:59 yesterday vs 00:00 today
		const momentTo = moment().add(daysTo, 'days').endOf('day');

		return valueMoment.isAfter(momentFrom) && valueMoment.isBefore(momentTo);
	},

	/**
	 * Validates that a given date is within the from and to numbers of days from today only for working days.
	 *
	 * @param  {Object}  value 		The chosen date, Moment date object.
	 * @param  {Number}  daysFrom 	How many days from today is acceptable?
	 * @param  {Number}  daysTo		How many days in the future is acceptable?
	 * @return {Boolean}      		True if the given date is within the range.
	 */
	isInWorkingDaysRange(value, daysFrom, daysTo) {
		if (!_.isNumber(daysFrom) || !_.isNumber(daysTo)) {
			return false;
		}

		const cutOffTime = 10; // 10AM

		// increment a day when over the cut off time
		if (moment().hour() >= cutOffTime) {
			daysFrom + 1;
		}
		const from = moment().businessAdd(daysFrom);
		const to = moment().add(daysTo, 'days').endOf('day');

		return value.isBetween(from, to) && moment(value).isBusinessDay();
	},

	/**
	 * What is the class name and do we need to show it in any particular state?
	 *
	 * @return {String} class name.
	*/
	className(className) {
		const isInvalid = ValidationStore.isInvalid(this.props.group, this.props.name);
		const isEnabled = ValidationStore.isEnabled(this.props.group, this.props.name);

		return cx(className, {
			error: isInvalid,
			complete: !isInvalid && isEnabled,
		});
	},
	/**
	 * Is the current input a checkbox?
	 *
	 * @return {Boolean} True if so.
	 */
	isCheckbox() {
		return (this._inputType === 'checkbox');
	},

	/**
	 * Is the current input a multiple checkbox?
	 *
	 * @return {Boolean} True if so.
	 */
	isMultiCheckbox() {
		return (this._inputType === 'multiCheckbox');
	},

	/**
	 * Get the help text for this input, if any.
	 *
	 * @return {String} Or undefined if no text exists.
	 */
	getValidationText() {
		let text = this.props.validationText;

		if (!text) {
			text = ContentStore.getValidationMessage(this.props.groupValidationName ? this.props.groupValidationName : this.props.name);
		}

		return this.appendMessageText(text);
	},

	/**
	 * Get the help text for this input, if any.
	 *
	 * @return {String} Or undefined if no text exists.
	 */
	getHelpText() {
		let text = this.props.helpText;

		if (!text) {
			text = ContentStore.getHelpMessage(this.props.name);
		}

		return this.appendMessageText(text);
	},

	/**
	 * Append either a prefix or a suffix to the help or validation message text.
	 * This is necessary for when text needs to be added to every component of a particular type.
	 *
	 * @param {String}		Help or validation text.
	 * @return {String}		Given string with prefix or suffix, if specified.
	 */
	appendMessageText(text) {
		let textValue = text;
		if (_.isUndefined(textValue)) {
			return textValue;
		}

		const prefix = ContentStore.get(this.props.helpMessagePrefix);
		if (prefix) {
			textValue = `${prefix} ${textValue}`;
		}

		const suffix = ContentStore.get(this.props.helpMessageSuffix);
		if (suffix) {
			textValue = `${textValue} ${suffix}`;
		}

		return textValue;
	},

	/**
	 * Get a Help Icon element, if there is help text available.
	 *
	 * @return {JSX} Icon element, with click handler bound.
	 */
	getHelpIcon() {
		let ele;
		const helpText = this.getHelpText();
		const labelMsg = `Help for: ${this.props.children || this.props.labelText}`;

		if (helpText) {
			ele = <a href="#" onClick={this.onHelpClick} title={labelMsg} aria-label={labelMsg} role="button" className="help-icon">{labelMsg}</a>;
		}

		return ele;
	},

	/**
	 * Get a ErrorMessage element, if there is help text available and user has asked to see it.
	 *
	 * @return {JSX} Text element, with the help message.
	 */
	getHelpMessage() {
		let ele;

		if (this.state.helpVisible) {
			const helpText = this.getHelpText();

			if (helpText) {
				ele = <ErrorMessage text={helpText} extraClasses="help" />;
			}
		}

		return ele;
	},

	/**
	 * Get a Help Text element wrapper
	 *
	 * @return {ReactElement}
	 */
	getHelpElement() {
		return (
				<div role="alert" aria-live="assertive">
					{this.getHelpMessage()}
				</div>
			);
	},

	/**
	 * User clicked a help icon.
	 *
	 * @param  {Event} e
	 */
	onHelpClick(e) {
		e.preventDefault();
		this.toggleHelpVisibility();
	},

	/**
	 * Toggle visibility of the help text.
	 */
	toggleHelpVisibility() {
		this.setState({
			helpVisible: !this.state.helpVisible,
		});
	},

	/**
	 * Get an ErrorMessage element, if the input is invalid.
	 *
	 * @return {JSX}		Error element.
	 */
	getErrorMessage() {
		if (!this.props.disableErrorMessage && ValidationStore.isInvalid(this.props.group, this.props.name)) {
			return <ErrorMessage text={this.getValidationText()} />;
		}
	},

	/**
	 * Get an Error accessibility wrapper
	 *
	 * @return {ReactElement}
	 */
	getErrorElement() {
		return (
				<div role="alert" aria-live="assertive">
					{this.getErrorMessage()}
				</div>
			);
	},

	/**
	 * Calculate the remaining columns avilable based on a 12 column grid and a size
	 *
	 * @param {Number} size 				The main column size
	 *
	 * @return {Number} The remaining columns
	 */
	_columnSizeRemainder(size) {
		return (Math.floor(size / 12) * 12 + 12) - size;
	},
};

module.exports = InputMixin;
