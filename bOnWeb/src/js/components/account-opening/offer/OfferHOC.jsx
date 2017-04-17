/**
 * @module OfferHOC
 */

const React = require('react');
const { PropTypes } = React;
const _ = require('lodash');

const BrandUtils = require('../../../utils/BrandUtils');
const ContentUtils = require('../../../utils/ContentUtils');
const ProductUtils = require('../../../utils/ProductUtils');
const HtmlUtils = require('../../../utils/HtmlUtils');
const PathUtils = require('../../../utils/PathUtils');
const NewWindowLink = require('../../common/links/NewWindowLink');

const savingsAccountRootKey = 'savingsAccountInformation';

const OfferHOC = WrappedComponent => React.createClass({
	displayName: WrappedComponent.name,

	propTypes: {
		appData: PropTypes.object,
		data: PropTypes.shape({
			productOffer: PropTypes.object,
			productCode: PropTypes.string,
			caseId: PropTypes.string,
			bankID: PropTypes.string,
		}),
		validations: PropTypes.object,
		content: PropTypes.object,
	},


	/**
	 * Get a JSX element for each document item.
	 * @param  {Array} docItems		Offers array content mapper
	 * @return {Array} Of JSX elements.
	 */
	getDocumentElements(docItems) {
		if (!_.isArray(docItems)) {
			return null;
		}

		const product = this.props.data.productCode && ProductUtils.getProduct(this.props.data.productCode);
		const productType = product && product.productType;
		const brandDocs = ['termsAndConditions', 'tariff'];

		return _.chain(docItems)
			.map(docName => {
				const content = this.props.content[`${docName}DocLinkText`];
				let path = this.props.content[`${docName}DocLink`];
				let link = _.includes(brandDocs, docName) ? BrandUtils.appendBrand(path, this.props.data.bankID) : PathUtils.getPath(path);

				link = link && link.replace('{type}', productType.name);
				path = path && path.replace('{type}', productType.name);

				return { content, path, link };
			})
			.reject(item => {
				return !item.content;
			})
			.map((item, i) => {
				return (
					<li
						name={item.name}
						key={i}
					>
						<NewWindowLink
							href={item.link}
							text={item.content}
							{...this.props}
						/>
					</li>

				);
			})
			.value();
	},

	/**
	 * Get a JSX element for each offer item.
	 * @param  {Array} offerItems	Offers array content mapper
	 * @return {Array} Of JSX elements.
	 */
	getOfferElements(offerItems) {
		if (!_.isArray(offerItems)) {
			return null;
		}

		const offerElements = _.chain(offerItems)
			.map(offerName => {
				return {
					name: offerName,
					content: ContentUtils.getContentWithDocument(offerName, this.props.content, this.props.data.bankID),
				};
			})
			.reject(item => {
				return !item.content;
			})
			.map((item, i) => {
				// @ticket DYB-22764
				return (
					<li
						name={item.name}
						key={i}
						dangerouslySetInnerHTML={{ __html: item.content }}
					/>
				);
			})
			.value();

		const hasSavingsAccountItems = this.props.data.productOffer && !_.isEmpty(ProductUtils.getSavingAccountItems(this.props.data.productOffer.offers));

		if (hasSavingsAccountItems) {
			const htmlFactory = (c, k) => <li name={k} key={k} dangerouslySetInnerHTML={{ __html: c }}></li>;
			offerElements.push(HtmlUtils.getTextItems(htmlFactory, savingsAccountRootKey, this.props.content));
		}

		return offerElements;
	},

	getMandateElements(mandateItems) {
		if (!_.isArray(mandateItems)) {
			return null;
		}

		return _.flow(
			bullets => _.filter(bullets, item => this.props.content[item]),
			items => _.map(items, item => (<li key={item}>{this.props.content[item]}</li>))
		)(mandateItems);
	},

	render() {
		return (
			<WrappedComponent
				{...this.props}
				getOfferElements={this.getOfferElements}
				getDocumentElements={this.getDocumentElements}
				getMandateElements={this.getMandateElements}
			/>
		);
	},
});

module.exports = OfferHOC;
