/**
 * @class HtmlUtils
 */
const _ = require('lodash');

const HtmlUtils = {

	/**
	 * Get a JSX element for each item in a numerated list from this.props.content
	 *
	 * @param {function} htmlFactory	the html element that the content is to be wrapped in
	 * @param {string} key				the JSON key without the number suffix
	 * @param {Array} items				the JSON items to be filtered through
	 * @return {Array} Of JSX elements.
	 */
	getTextItems(htmlFactory, key, items) {
		return _.map(
			_.map(
				_.filter(
					_.keys(items), contentKey => _.startsWith(contentKey, key)
				), i => items[i]
			), contentValue => htmlFactory(contentValue)
		);
	},

};

module.exports = HtmlUtils;
