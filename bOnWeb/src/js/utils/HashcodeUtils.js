/**
 * @class PathUtils
 */

const envConfig = require('../../static/config');
const hash = require('object-hash');
const HashcodeUtils = {

	/**
	 * Get Relative Path by adding websiteBaseDirectory to any given path
	 * @param  {string} path a relative path
	 * @return {string} The given path with appended websiteBaseDirectory at the beginging.
	 */
	getHashcode(value) {
	let hashValue = hash(value);
	 return hashValue;
	},
	getSourceId(value) {
		const hashValue = this.getHashcode(value);
		const sourceId = hashValue.slice(0, 8) + '-' + hashValue.slice(8, 12) + '-' + hashValue.slice(12, 16) + '-' + hashValue.slice(16, 20) + '-' + hashValue.slice(20, 32);
		return sourceId;
	},

};

module.exports = HashcodeUtils;
