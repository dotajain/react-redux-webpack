/**
 * @module OfferPage
 */

const React = require('react');
const { PropTypes } = React;

const AccountOpeningActions = require('../../../actions/AccountOpeningActions');

const AccountOpeningConstants = require('../../../constants/AccountOpeningConstants');

const CheckBoxQuestion = require('../../common/questionsets/CheckBoxQuestion');
const ListSection = require('../../common/sections/ListSection');
const OfferHOC = require('./OfferHOC');

const ProductUtils = require('../../../utils/ProductUtils');
const ValidationUtils = require('../../../utils/ValidationUtils');

const SingleProduct = props => {
	const productCode = `IM${props.product['product_code']}`;
	const prod = ProductUtils.getProduct(productCode);
	const productName = prod.name;
	const offerItems = prod.alternativeOfferItems;
	const offerRestrictionsItems = prod.offerRestrictions;
	const docsToRead = prod.additionalDocumentItems;
	const mandateToRead = prod.offerMandateItems;
	const subTitle = `${props.content.offerPageAlternativeOfferTitle}<span class="brand-highlight">${productName}</span>`;
	return (
		<div>
			{!props.goBack && <h2 dangerouslySetInnerHTML={{ __html: subTitle }} />}
			<h3 dangerouslySetInnerHTML={{ __html: props.content.offerPageSubTitle }} />
			<ListSection
				wrapperFn={props.getOfferElements}
				items={offerItems}
			/>
			<ListSection
				wrapperFn={props.getOfferElements}
				items={offerRestrictionsItems}
				title={props.content.offerPageofferRestrictionsTitle}
			/>
			<ListSection
				wrapperFn={props.getDocumentElements}
				items={docsToRead}
				title={props.content.offerPageDocumentToReadSectionTitle}
			/>

			<div className="terms-and-conditions-checkbox" key="offerAcceptFullTCsDiv">
				<CheckBoxQuestion
					defaultValue={props.data.offerAcceptFullTCs}
					group={AccountOpeningConstants.GROUP_OFFER}
					name="offerAcceptFullTCs"
					dataAnchor="offer-accept-full-tcs"
					onChange={AccountOpeningActions.updateFormValue}
					required
				>
					{props.content.offerTandCQuestion}
				</CheckBoxQuestion>
			</div>
			<ListSection
				wrapperFn={props.getMandateElements}
				items={mandateToRead}
			/>
			<p>{props.content.downgradedOfferPageEmail}</p>
			<div className="offer-result-actions clearfix">
				<div className="row">
					<div className="col-xs-12 col-md-6 col-md-push-5 text-center">
						<button
							className="btn btn-lg btn-primary inline btn-next"
							onClick={() => {
								props.onClickActionAccount(false, props.product.offerId, props.product['product_code']);
							}}
							data-anchor="accept-next"
							disabled={!ValidationUtils.isGroupValid(props.validations, AccountOpeningConstants.GROUP_OFFER) || props.appData.isApiCallInProgress}
						>
							{props.content.altOpenAccountButton}
						</button>
					</div>
					<div className="col-xs-12 col-md-6 col-md-pull-5 text-center">
						{props.goBack && <button
							className="btn btn-lg btn-primary inline btn-back"
							onClick={() => { props.onClickGoBack();}}
						>
							Go Back
						</button>}
						{!props.goBack && <button
							className="btn btn-lg btn-primary inline btn-decline"
							onClick={() => { props.onClickActionAccount(true, props.product.offerId);}}
							data-anchor="accept-decline"
							disabled={props.appData.isApiCallInProgress}
						>
							{props.content.altDeclineAccountButton}
						</button>}

					</div>
				</div>
			</div>
		</div>
	);
};

SingleProduct.propTypes = {
	validations: PropTypes.object,
	appData: PropTypes.object.isRequired,
	product: PropTypes.object.isRequired,
	data: PropTypes.shape({
		offerAcceptFullTCs: PropTypes.boolean,
		productOffer: PropTypes.object.isRequired,
		product: PropTypes.shape({
			alternativeOfferItems: PropTypes.array,
		}).isRequired,
	}),
	getOfferElements: PropTypes.func.isRequired,
	getDocumentElements: PropTypes.func.isRequired,
	getMandateElements: PropTypes.func.isRequired,
	onClickActionAccount: PropTypes.func.isRequired,
	content: PropTypes.object.isRequired,
	goBack: PropTypes.bool,
};

module.exports = OfferHOC(SingleProduct);
