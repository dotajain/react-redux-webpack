/**
 * @module AltProducts
 */

const React = require('react');
const _ = require('lodash');
const { PropTypes } = React;

const OfferDetails = require('./OfferDetails');
const MultiProducts = require('./MultiProducts');
const SingleProduct = require('./SingleProduct');
const ProductUtils = require('../../../utils/ProductUtils');
const OfferHOC = require('./OfferHOC');
const config = require('../../../config');

const AltProducts = React.createClass({

	propTypes: {
		data: PropTypes.shape({
			productCode: PropTypes.string.isRequired,
		}),
		content: PropTypes.object.isRequired,
		products: PropTypes.array.isRequired,
		onClickActionAccount: PropTypes.func.isRequired,
	},

	getInitialState() {
		return {
			selectedProduct: undefined,
		};
	},

	/**
	 * Go back click handler
	 *
	 */
	onClickGoBack() {
		this.updateScrollPosition();
		this.setState({
			selectedProduct: undefined,
		});
	},

	/**
	 * More info click handler
	 *
	 * @param  {Object} product	selected product object
	 */
	onClickMoreInfo(product) {
		this.updateScrollPosition();
		this.setState({
			selectedProduct: product,
		});
	},

	/**
	 * Reset scroll top top of page
	 *
	 */
	updateScrollPosition() {
		window.scrollTo(0, 0);
	},

	render() {
		const headerIllustration = 'downgrade-illustration.png';
		let pageTitle = this.props.content.offerPageUnsuccessfulTitle
			&& this.props.content.offerPageUnsuccessfulTitle
			.replace('{productTitle}', ProductUtils.getName(this.props.data.productCode));

		let singleProduct;
		let product;

		if (this.props.products.length === 1) {
			singleProduct = _.head(this.props.products);
			const productCode = `IM${singleProduct['product_code']}`;

			if (productCode === config.readyCashCode) {
				product = ProductUtils.getProduct(this.props.data.productCode);
				pageTitle = this.props.content.offerPageDowngradeTitle && this.props.content.offerPageDowngradeTitle
						.replace('{productTitle}', product.name);
			}
		}

		if (this.state.selectedProduct) {
			const productCode = `IM${this.state.selectedProduct['product_code']}`;
			product = ProductUtils.getProduct(productCode);
			pageTitle = this.props.content.offerPageTitle &&
				this.props.content.offerPageTitle
					.replace('{productName}', product.name)
					.replace('{productArticle}', product.productArticle);
		}

		return (
			<OfferDetails
				headerIllustration={headerIllustration}
				pageTitle={pageTitle}
				{...this.props}
			>
				{!singleProduct && <MultiProducts
					onClickMoreInfo={this.onClickMoreInfo}
					onClickGoBack={this.onClickGoBack}
					selectedProduct={this.state.selectedProduct}
					{...this.props}
				/>}
				{singleProduct && <SingleProduct product={singleProduct || this.state.selectedProduct} {...this.props} />}
			</OfferDetails>
		);
	},
});

module.exports = OfferHOC(AltProducts);
