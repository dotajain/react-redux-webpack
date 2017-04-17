/**
 * @class ValidationUtils
 */

const _ = require('lodash');

const ValidationUtils = {
	/**
	 * Are all values in the given group valid?
	 *
	 * @param {Object} data 		From the ValidationStore.
	 * @param {String} group 		What group is the value from?
	 * @param {Boolean} ignoreDisabled Do not look at disabled fields.
	 * @return {Any}    			The corresponding value.
	 */
	isGroupValid(data, group, ignoreDisabled) {
		return _.isObject(data) && (
			!data[group] ||
			_.every(data[group], item => {
				if (ignoreDisabled) {
					return item.isValid === true || item.isEnabled === false;
				}

				return item.isValid === true;
			})
		);
	},

	/**
	 * Is the given value, from the named group, valid?
	 *
	 * @param {Object} data 		From the ValidationStore.
	 * @param {String} group 		What group is the value from?
	 * @param  {String} key 		Key of the value to get.
	 * @return {Any}    			The corresponding value.
	 */
	isKeyValid(data, group, key) {
		return _.isObject(data[group])
				&& _.isObject(data[group][key])
				&& (data[group][key].isValid === true || data[group][key].isEnabled === false);
	},

};

module.exports = ValidationUtils;
