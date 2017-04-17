/**
 * @module TaskUtils
 */

const _ = require('lodash');

module.exports = {

	/**
	 * Derive the task id from a task uri
	 *
	 * @param 	{String} uri 	The uri to parse
	 * @return 	{String} 		The task id to use
	 */
	getTaskId(uri) {
		const uriObj = this.parseUri(uri);

		if (uriObj) {
			return uriObj.reason || uriObj.action || uriObj.task;
		}

		return undefined;
	},

	/**
	 * Parse either a task or case uri into an object
	 *
	 * @param 	{String} uri 	The uri to parse
	 * @return 	{Object} 		An object populated with the uri details
	 */
	parseUri(uri) {
		const taskTypeMatch = uri.match(/^([\w]*):\/\//);

		if (!taskTypeMatch) {
			return undefined;
		}

		const uriObj = { type: taskTypeMatch[1] };
		let match;

		switch (uriObj.type) {
		case 'task':
			match = uri.match(/^[\w]*:\/\/([\w\d]*)\/([\w\d]*)(\/([\w\d]*))?\?(.*)/);
			if (match) {
				uriObj.caseType = match[1];
				uriObj.task = match[2];
				uriObj.action = match[4];

				const queryString = match[5];
				const queryStringArr = queryString.split('&');

				// Loop through each query string parameter and assign to uriObj
				_.each(queryStringArr, queryStringItem => {
					const queryStringItemArr = queryStringItem.split('=');
					if (queryStringItemArr.length === 2) {
						uriObj[queryStringItemArr[0]] = queryStringItemArr[1];
					}
				});
			}
			break;
		case 'case':
			match = uri.match(/^[\w]*:\/\/([\w\d]*)\/([\w\d]*)\/([\w\d-]*)/);
			if (match) {
				uriObj.caseType = match[1];
				uriObj.caseSubType = match[2];
				uriObj.caseId = match[3];
			}
			break;
		default:
			break;
		}

		return _.transform(uriObj, (result, val, key) => {
			const next = result;
			next[key] = (val && key !== 'caseId') ? val.toLowerCase() : val;

			return next;
		});
	},
};
