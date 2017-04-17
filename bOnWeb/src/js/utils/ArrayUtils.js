/**
 * @class ArrayUtils
 */

const _ = require('lodash');

const ArrayUtils = {

	/**
	 * Get an array of numbers between 2 limits.
	 *
	 * @param  {Number} from e.g. 1
	 * @param  {Number} to   e.g. 4
	 * @return {Array}      e.g. [1, 2, 3, 4]
	 */
	getRange(from, to) {
		const result = [];

		if (_.isNumber(from) && _.isNumber(to) && from <= to) {
			for (let i = from; i <= to; i++) {
				result.push(i);
			}
		}

		return result;
	},

	/**
	 * Convert an array into a comma-separated string.
	 *
	 * @param  {Array} arr  	e.g. [1, 2, 3]
	 * @return {String}     	'1, 2, 3'
	 */
	getCommaString(arr) {
		return _.isArray(arr) ? arr.join(', ') : '';
	},

	/**
	 *	Iterates through the dropdown array in config to retrieve the label of a given value
	 *
	 *  @param  {String} currentValue The value to be looked up
	 *  @param  {Array}  values  	  The array of objects to be iterated through
	 *  @return {String}     		  The label value of the retrieved object.
	 */
	getDropdownLabelFromValue(currentValue, values) {
		if (!_.isString(currentValue)) {
			return undefined;
		}

		if (!_.isArray(values)) {
			return currentValue; // return the orignal value if the array is missing
		}

		return _.result(_.find(values, { value: currentValue }), 'label') || currentValue;
	},
};

module.exports = ArrayUtils;
