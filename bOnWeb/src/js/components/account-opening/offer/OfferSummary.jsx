/**
 * @module OfferPage
 */

const React = require('react');
const { PropTypes } = React;

const ListSection = require('../../common/sections/ListSection');

const ProductUtils = require('../../../utils/ProductUtils');

const OfferSummary = props => {
	const productCode = `IM${props.product['product_code']}`;
	const prod = ProductUtils.getProduct(productCode);
	const productName = prod.name;
	const offerItems = prod.alternativeOfferItems;
	const subTitleKey = props.isLast ? 'offerPageAlternativeOfferTitleMulti' : 'offerPageAlternativeOfferTitle';
	const subTitle = `${props.content[subTitleKey]}<span class="brand-highlight">${productName}</span>`;
	return (
		<div key={productCode} className="offer-summary">
			<h2 className="h3" dangerouslySetInnerHTML={{ __html: subTitle }} />
			<h3>{props.content.offerPageSubTitle}</h3>
			<ListSection
				wrapperFn={props.getOfferElements}
				items={offerItems}
			/>
			<div className="offer-result-actions clearfix">
				<div className="row">
					<div className="col-xs-12 padding-bottom">
						<button
							className="btn btn-lg btn-primary "
							onClick={() => { console.log(props); props.onClickMoreInfo(props.product); }}
							disabled={props.appData.isApiCallInProgress}
						>
							More information
						</button>
					</div>
				</div>
			</div>
			{!props.isLast && <h2>Or</h2>}
		</div>

	);
};

OfferSummary.propTypes = {
	appData: PropTypes.object.isRequired,
	product: PropTypes.object.isRequired,
	data: PropTypes.shape({
		productCode: PropTypes.string,
		product: PropTypes.shape({
			alternativeOfferItems: PropTypes.array,
		}).isRequired,
	}).isRequired,
	getOfferElements: PropTypes.func.isRequired,
	onClickMoreInfo: PropTypes.func.isRequired,
	content: PropTypes.object.isRequired,
	isLast: PropTypes.bool,
};

module.exports = OfferSummary;
