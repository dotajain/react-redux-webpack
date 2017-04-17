	/**
 * @class DateUtils
 */

const config = require('../config');
const moment = require('moment');

const DateUtils = {

	/**
	 * Get a moment object from a unix timestamp.
	 *
	 * @param  {number} timestamp e.g. '1429640282'
	 * @return {Moment}
	 */
	getMomentFromTimestamp(timestamp) {
		return moment(timestamp, 'x');
	},

	/**
	 * Get a moment object from the standard date format string.
	 *
	 * @param  {String} dateStr e.g. '31-01-2015'
	 * @return {Moment}
	 */
	getMomentFromDateString(dateStr) {
		return moment(dateStr, [config.dateFormat, config.dateFormatInAPI]);
	},

	/**
	 * Get a formatted short string from a moment object.
	 *
	 * @param  {Moment} mTime 		Optional. Moment to build string from.
	 * @return {String}        		Empty string if invalid moment given.
	 */
	getShortString(mTime) {
		let momentTime = mTime;
		if (!moment.isMoment || !moment.isMoment(momentTime)) {
			momentTime = moment();
		}

		return momentTime.format(config.dateFormat);
	},

	/**
	 * Generates a timestamp as per the API requirements
	 * @param  {String} dateStr e.g. '31-01-2015'
	 */
	getISODateString(dateStr) {
		const dateStrValue = dateStr || undefined;
		// ISO 8601 date as per API spec
		return moment(dateStrValue).toISOString();
	},

	/**
	 * Convert a date string from the format we use, to the format
	 * that the API expects.
	 *
	 * @param  {String} dateStr e.g. '31-01-2015'
	 * @return {String}         e.g. '2015-01-31'
	 */
	getAPIDateString(dateStr) {
		const m = DateUtils.getMomentFromDateString(dateStr);

		return m.isValid() ? m.format(config.dateFormatInAPI) : '';
	},

	/**
	 * Convert a date string from the format the API uses, to the format
	 * that we use.
	 *
	 * @param  {String} dateStr e.g. '2015-01-31'
	 * @return {String}         e.g. '31-01-2015'
	 */
	getDateStringFromAPI(dateString) {
		const m = moment(dateString, config.dateFormatInAPI);

		return m.isValid() ? m.format(config.dateFormat) : '';
	},

	/**
	 * Get a formatted short string from an HTML5 formatted date (string).
	 * @param  {string} date Date in the HTML5 date input format
	 * @return {string}      Date in the format of config.dateFormat or the given
	 *                       input if it could not be converted.
	 */
	getShortStringFromHTML5Date(date) {
		const _momentDate = moment(date, [config.dateFormatInAPI, config.dateFormat]);
		return _momentDate.isValid() ? _momentDate.format(config.dateFormat) : '';
	},

	getDateForTimeline(dateString) {
		return moment(dateString).format(config.dateFormatTimeline);
	},

	/**
	 * Get transactions to be fetched from 5 years before the current dateString
	*/
	getTransactionsAPICallDate() {
		return moment(new Date(new Date().setFullYear(new Date().getFullYear() - 5)));
	},
	comapareFromCurrentDate(date) {
		const oneDay = 24 * 60 * 60 * 1000;
        const currentDate = new Date();
        const part = date.split('-');
        const secondDate = new Date(part[2], part[1] - 1, part[0]);
          if (currentDate.getTime() > secondDate.getTime()) {
            return 0;
          }
        const time = currentDate.getTime() - secondDate.getTime();
        return Math.round(Math.abs(time / oneDay));
	},
		compareDates(firstDate, secondDate) {
		const oneDay = 24 * 60 * 60 * 1000;
        const firstPart = firstDate.split('-');
        const secondPart = secondDate.split('-');    
		const firstFormatedDate = new Date(firstPart[2], firstPart[1] - 1, firstPart[0]);
		const secondFormatedDate = new Date(secondPart[2], secondPart[1] - 1, secondPart[0]);
		if (firstFormatedDate.getTime() > secondDate.getTime()) {
            return 0;
          }
        const time = firstFormatedDate.getTime() - secondFormatedDate.getTime();
        return Math.round(Math.abs(time / oneDay));
	}


};

module.exports = DateUtils;
