
/**
 * @class ContentUtils
 */

const _ = require('lodash');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const envConfig = require('../../static/config');
const BrandUtils = require('./BrandUtils');
const ProductUtils = require('./ProductUtils');
const { productTypes } = require('../config/ProductData');

const AltContentKey = 'CYB';

const ContentUtils = {

	/**
	 * Return an array of strings
	 *
	 * @param  {String} key			the JSON key without the number suffix
	 * @param  {Array}  content 	the JSON items to be filtered through
	 * @return {Array}  Of strings.
	 */
	getContent(key, content, productCode) {
		if (!_.isString(key) || !_.isPlainObject(content)) {
			return;
		}

		return _.map(
			_.filter(_.keys(content), contentKey => _.startsWith(contentKey, key) && this.getProductContent(contentKey, content, productCode)
			), i => this.getProductContent(i, content, productCode)
		);
	},

	/**
	 * Return an array of JSX elements formatted as bullet points
	 *
	 * @param  {String} key				the JSON key without the number suffix
	 * @param  {Array}  content 		the JSON items to be filtered through
	 * @return {Array}  Of JSX elements.
	 */
	getContentListElements(key, content) {
		if (!_.isString(key) || !_.isPlainObject(content)) {
			return;
		}
		return _.map(this.getContent(key, content), item => <li key={_.kebabCase(item)}>{item}</li>);
	},

	/**
	 * Return an array of JSX elements formatted as paragraphs
	 *
	 * @param  {String} key				the JSON key without the number suffix
	 * @param  {Array}  content 		the JSON items to be filtered through
	 * @param  {String}  style 			the optional class to be added to the element
	 * @param  {String}  productCode	the optional product code
	 * @return {Array}  Of JSX elements.
	 */
	getContentParagraphs(key, content, style, productCode) {
		if (!_.isString(key) || !_.isPlainObject(content)) {
			return;
		}
		return _.map(this.getContent(key, content, productCode), item => item && <p key={_.kebabCase(item)} className={style} dangerouslySetInnerHTML={{ __html: item }}></p>);
	},

	/**
	 * Return CYB content for B
	 *
	 * @param  {String} key				the JSON key
	 * @param  {Array}  content 		the JSON items to be filtered through
	 * @param  {Boolean} isDownGraded	flag to see if we are downgraded or not
	 * @return {String} Alternative content string
	 */
	getCYBAltContent(key, content, isDownGraded) {
		if (!_.isString(key) || !_.isPlainObject(content)) {
			return;
		}

		return envConfig.bankId === 'DYB' && isDownGraded ? content[key + AltContentKey] : content[key];
	},

	/**
	 * Returns content based off product type
	 * @param {string} key 				Content key
	 * @param {Object} content			Content object
	 * @param {string} productCode 		Product Code
	 * @return {String} 				Alternative Product based content
	 */
	getProductContent(key, content, productCode) {
		const product = productCode && ProductUtils.getProduct(productCode);
		const productType = product && product.productType;
		const hasProductKeySuffix = _.filter(_.valuesIn(productTypes), prod => {
			return _.endsWith(key, `-${prod.name}`);
		});
		const altContent = productType && content[`${key}-${productType.name}`];
		const hasAltProductContent = productType && _.has(content, `${key}-${productType.name}`) && _.isString(altContent);

		if (!content || !key || hasProductKeySuffix.length) {
			return;
		}

		if (!productCode || !hasAltProductContent) {
			return content[key];
		}

		return content[`${key}-${productType.name}`];
	},

	/**
	 * Return content with linked document if matched
	 *
	 * @param  {String} key				the JSON key
	 * @param  {Array} content 			the JSON items to be filtered through
	 * @param  {String} bankID	 		bank ID
	 * @return {String} Content string with appended a tag for document if required
	 */
	getContentWithDocument(key, content, bankID) {
		const docRegex = /(.*?){(.*?)Doc}/;
		const value = content[key];

		if (!value) {
			return;
		}

		const match = value.match(docRegex);

		if (!match) {
			return value;
		}

		const itemContent = content[`${match[2]}DocLinkText`];
		const linkPath = content[`${match[2]}DocLink`];
		const itemLink = BrandUtils.appendBrand(linkPath, bankID);
		return (
			match[1] + ReactDOMServer.renderToString(<a
				href={itemLink}
				target="_blank"
				aria-label={itemContent}
			>
					{itemContent}
					<span className="screenreader">{content.newBrowserWindowTitle}</span>
			</a>)
		);
	},
};

module.exports = ContentUtils;
