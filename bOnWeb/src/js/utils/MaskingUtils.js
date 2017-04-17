/**
 * @class MaskingUtils
 */

const _ = require('lodash');

const _maskChar = '•';

const MaskingUtils = {

	/**
	 * Mask a given string (e.g. - 07411167094 to 074•••••094)
	 *
	 * @param value {String} 				the value to mask (e.g. - 07411167094)
	 * @param startPos {number} 			the position to begin the mask
	 * @param numberofMasks {number} 		the number of charachters to mask
	 * @param maskChar {String} 			a custom character to use for masking, can be empty
	 *
	 * @return {String}
	 */
	applyMask(value, startPos, numberOfMasks, maskChar) {
		let numberOfMasksValue = numberOfMasks;
		const startPosValue = parseInt(startPos || 0, 10);

		// Don't continue if start position is less than zero
		if (startPosValue < 0) {
			// console.warn('Invalid start position given to MaskingUtils.applyMask');
			return value;
		}

		// Don't continue if number of masks is less than zero
		if (numberOfMasksValue < 0) {
			// console.warn('Invalid number of masks given to MaskingUtils.applyMask');
			return value;
		}

		// If the number of masks specified is greater than the possible space, mask up to the end
		if (numberOfMasksValue > (value.length - startPosValue)) {
			numberOfMasksValue = value.length - startPosValue;
		}

		const result = [];

		result.push(value.slice(0, startPosValue));
		result.push(Array(numberOfMasksValue + 1).join(_.isString(maskChar) ? maskChar : _maskChar));
		result.push(value.slice((startPosValue + numberOfMasksValue)));

		return result.join('');
	},

};

module.exports = MaskingUtils;
