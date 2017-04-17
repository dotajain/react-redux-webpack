/**
 * @module BasicOffer
 */

const React = require('react');
const { PropTypes } = React;

const OfferDetails = require('./OfferDetails');
const ListSection = require('../../common/sections/ListSection');
const OfferHOC = require('./OfferHOC');
const ProductUtils = require('../../../utils/ProductUtils');

const BasicOffer = props => {
	return (
		<OfferDetails
			{...props}
			headerIllustration="offer-illustration.png"
			pageTitle={props.content.offerPageTitle &&
				props.content.offerPageTitle
				.replace('{productName}', props.data.product.name)
				.replace('{productArticle}', props.data.product.productArticle)

			}
			subTitle={props.content.offerPageSubTitle}
		>
			<div>
				<ListSection
					wrapperFn={props.getOfferElements}
					items={ProductUtils.getOfferItems(props.data.productCode)}
				/>
				<h3>{props.content.mandateTitle}</h3>
				<p>{props.content.mandateParagraph}</p>
				<div className="text-center">
					<button
						className="btn btn-lg btn-primary inline btn-next"
						onClick={() => { props.onClickActionAccount(false, props.product.offerId, props.product['product_code']);}}
						data-anchor="accept-next"
						disabled={props.appData.isApiCallInProgress}
					>
						{props.content.openAccountButton}
					</button>
				</div>
				<hr />
				<div className="offer-info text-center">
					{props.content.offerPageDeclineOffer}
				</div>
			</div>
		</OfferDetails>
	);
};

BasicOffer.propTypes = {
	appData: PropTypes.object.isRequired,
	data: PropTypes.shape({
		productCode: PropTypes.string,
		product: PropTypes.shape({
			name: PropTypes.string,
			productArticle: PropTypes.string,
		}).isRequired,
	}).isRequired,
	onClickActionAccount: PropTypes.func.isRequired,
	getOfferElements: PropTypes.func.isRequired,
	content: PropTypes.object.isRequired,
	product: PropTypes.object.isRequired,
};

module.exports = OfferHOC(BasicOffer);

