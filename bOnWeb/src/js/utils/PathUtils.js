/**
 * @class PathUtils
 */

const envConfig = require('../../static/config');

const PathUtils = {

	/**
	 * Get Relative Path by adding websiteBaseDirectory to any given path
	 * @param  {string} path a relative path
	 * @return {string} The given path with appended websiteBaseDirectory at the beginging.
	 */
	getPath(path) {
		if (path && path.indexOf('http') >= 0) {
			return path;
		}

		if (!path) {
			console.warn('No path set for asset');
			return undefined;
		}

		return envConfig.websiteBaseDirectory + path;
	},

};

module.exports = PathUtils;
