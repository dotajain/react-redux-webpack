/**
 * @module OfferPage
 */

const React = require('react');
const Helmet = require('react-helmet');
const _ = require('lodash');
const { PropTypes } = React;

const AccountOpeningActions = require('../../actions/AccountOpeningActions');
const AnalyticsActionCreator = require('../../actions/AnalyticsActionCreator');

const AltProducts = require('./offer/AltProducts');
const BasicOffer = require('./offer/BasicOffer');

const PageHeader = require('../common/PageHeader');
const LoadingSpinner = require('../LoadingSpinner');


const BrandUtils = require('../../utils/BrandUtils');
const ProductUtils = require('../../utils/ProductUtils');

const OfferPage = React.createClass({

	propTypes: {
		appData: PropTypes.object,
		data: PropTypes.shape({
			productOffer: PropTypes.object,
			productCode: PropTypes.string,
			caseId: PropTypes.string,
			bankID: PropTypes.string,
			offerAcceptFullTCs: PropTypes.bool,
			isDownGraded: PropTypes.bool,
			isAltProduct: PropTypes.bool,
		}),
		validations: PropTypes.object,
		content: PropTypes.object,
	},

	getInitialState() {
		return {};
	},

	componentDidMount() {
		AccountOpeningActions.requestProductOffer(this.props.data.caseId);

		AnalyticsActionCreator.track({
			path: '/user/experience/view',
			action: 'Appeared',
		}, {
			description: 'PageLoaded',
		});
	},

	componentWillReceiveProps(nextProps) {
		if (nextProps.data.productOffer && !this.props.data.productOffer) {
			const offers = nextProps.data.productOffer.offers;
			const products = _.map(offers, offer => {
				const product = _.head(offer.products);
				product.offerId = offer['offer_id']; // TODO: Review this, if its a singlar object for product then let pass offer through as the prop and not product....
				return product;
			});

			const isAltProduct = offers.length > 1 || !!_.filter(offers, offer => {
				const prod = _.head(offer.products);
				return `IM${prod['product_code']}` !== nextProps.data.productCode;
			}).length;

			AccountOpeningActions.updateOfferStatus(isAltProduct);
			this.setState({ products });
		}
	},

	/**
	 * User has chosen to open/decline an account.
	 *
	 * @param  {Boolean} isDecline				Is decline action
	 * @param  {String} offerId					related offer ID
	 * @param  {String} offerProductCode		code of chosen product offer
	 */
	onClickActionAccount(isDecline, offerId, offerProductCode) {
		if (!offerId) {
			console.warn('No offer available to accept');
			return;
		}

		AnalyticsActionCreator.track({
			path: '/user/experience/activity',
			action: 'Interacted',
		}, {
			description: 'UserAcceptsOffer',
			event: 'created',
		});

		AccountOpeningActions.respondToProductOffer(offerId, isDecline, `IM${offerProductCode}`);
		AccountOpeningActions.navigateToWebTask('WEB-SUBMIT-FORM');
	},


	render() {
		let spinner;

		if (this.props.appData.isApiCallInProgress || !this.state.products) {
			spinner = <LoadingSpinner centerAlign imgSize={80} />;
		}

		return (
			<div className="account-opening result-page-wrapper offer-page-wrapper container-fluid">
				<Helmet title={this.props.content.offerPageHeader} />
				<PageHeader
					visible={BrandUtils.isAbleToDisplay('result-pages-header')}
					title={this.props.content.landingPageTitle + ProductUtils.getName(this.props.data.productCode)}
					content={this.props.content}
				/>
				<div className="result-page offer-page" role="main">
					<div className="row text-center">
						<div className="col-xs-12">
							{spinner}
							{!spinner && !this.props.data.isAltProduct && <BasicOffer
								{...this.props}
								product={_.head(this.state.products)}
								onClickActionAccount={this.onClickActionAccount}
							/>}
							{!spinner && this.props.data.isAltProduct && <AltProducts
								{...this.props}
								products={this.state.products}
								onClickActionAccount={this.onClickActionAccount}
							/>}
						</div>
					</div>
				</div>
			</div>
		);
	},
});

module.exports = OfferPage;
