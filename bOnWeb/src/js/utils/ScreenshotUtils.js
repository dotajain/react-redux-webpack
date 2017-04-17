/**
 * @class ScreenshotUtils
 */

// Packages
const Html2Canvas = require('html2canvas');
const config = require('../config');
const envConfig = require('../../static/config');
const _ = require('lodash');
const moment = require('moment');

// Actions
const AppActions = require('../actions/AppActions');

// Stores
const AppStore = require('../stores/AppStore');

// Utils
const ApiUtils = require('./ApiUtils');

// Local vars
const _submitScreenshotEndpoint = '/banks/{bank-id}/cases/{case-type}/{case-subtype}/{case-id}/evidence';

// This is annoying, but html2canvas won't work unless html2canvas exists in window. Will raise an issue on github.
window.html2canvas = Html2Canvas;

const ScreenshotUtils = {

	/**
	 * Take a screenshot and send it off to account opening API.
	 *
	 * @param {Function} callback					The function to call after the screenshot has been taken.
	 * @param {String} caseId 						ID of the user case.
	 * @param {Boolean} doNotTrackCallProgress 		Optional. Set to true to disable tracking of this screenshot being taken.
	 */
	takeScreenshot(callback, caseId, doNotTrackCallProgress) {
		// API utils will also track this. However, the process of creating the image takes time, so
		// the flag is not set until quite late. This sets it immediately.
		let apiCallId;

		if (!doNotTrackCallProgress) {
			apiCallId = `screenshot-${Date.now()}`;
			AppActions.trackApiCallStarted(apiCallId);
		}

		Html2Canvas(document.body, {
			onrendered: canvas => {
				this.submitScreenshot(canvas, caseId, doNotTrackCallProgress);

				// Don't wait for the request to finish, just go to callback.
				if (callback) {
					callback();
				}

				// Now log that the request is finished.
				if (!doNotTrackCallProgress) {
					AppActions.trackApiCallComplete(apiCallId);
				}
			},
		});
	},

	/**
	 * Take a screenshot and send it off to account opening API.
	 *
	 * @param  {String} canvas 					Canvas element of the image to submit.
	 * @param  {String} caseId 					The case id.
	 * @param {Boolean} doNotTrackCallProgress 	Optional. Set to true to disable tracking of this screenshot being taken.
	 */
	submitScreenshot(canvas, caseId, doNotTrackCallProgress) {
		const url = envConfig.apiBaseUrl + _submitScreenshotEndpoint
			.replace('{case-type}', 'csap')
			.replace('{case-id}', caseId);

		const screenshot = canvas.toDataURL(config.screenshotMimeType, config.screenshotQuality);

		const requestData = {
			context: AppStore.getValue('apiTaskId'),
			image: {
				data: this.splitImageIntoParts(screenshot),
			},
		};

		requestData.capture_timestamp = moment().format();
		requestData.image.mime_type = config.screenshotMimeType;

		ApiUtils.makeAjaxCall({
			apiVersion: config.apiVersions.csapCaseServices,
			method: 'POST',
			url,
			requestData,
			addAuthToken: true,
			doNotTrackCallProgress,
		});
	},

	/**
	 * Split a given into image parts, each no bigger than the maximum
	 * length accepted by a field in the API.
	 *
	 * @param  {String} imageStr 	Image to split.
	 * @return {Array}          	Array of strings. Empty array if bad input.
	 */
	splitImageIntoParts(imageStr) {
		let imageStrValue = imageStr;
		const parts = [];

		if (!_.isString(imageStrValue) || imageStrValue.length === 0) {
			return parts;
		}

		const numParts = Math.ceil(imageStrValue.length / config.apiStringFieldMaxLength);

		for (let i = 0; i < numParts; i++) {
			parts.push(imageStrValue.substr(0, config.apiStringFieldMaxLength));
			imageStrValue = imageStrValue.substr(config.apiStringFieldMaxLength);
		}

		return parts;
	},
};

module.exports = ScreenshotUtils;
