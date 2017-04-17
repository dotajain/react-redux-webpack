jest.unmock('../AltProducts');
jest.unmock('../OfferDetails');
jest.unmock('../MultiProducts');
jest.unmock('../SingleProduct');
jest.unmock('../OfferSummary');
jest.unmock('../BasicOffer');
jest.unmock('../../../common/sections/ListSection');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const ReactDOM = require('react-dom');

const container = document.createElement('div');
const render = (comp, el) => ReactDOM.render(comp, el || container);
const shallowRenderer = TestUtils.createRenderer();

const OfferSummary = require('../OfferSummary');
const MultiProducts = require('../MultiProducts');
const SingleProduct = require('../SingleProduct');

const CheckBoxQuestion = require('../../../common/questionsets/CheckBoxQuestion');
const ListSection = require('../../../common/sections/ListSection');

const ContentUtils = require('../../../../utils/ContentUtils');
const ProductUtils = require('../../../../utils/ProductUtils');
const ValidationUtils = require('../../../../utils/ValidationUtils');

const AccountOpeningActions = require('../../../../actions/AccountOpeningActions');
const AccountOpeningConstants = require('../../../../constants/AccountOpeningConstants');


let props = {
	content: {
		featureSubTitle: 'featureSubTitle',
		offerPageofferRestrictionsTitle: 'offerPageofferRestrictionsTitle',
		offerPageDocumentToReadSectionTitle: 'offerPageDocumentToReadSectionTitle',
		offerTandCQuestion: 'offerTandCQuestion',
		openAccountButton: 'openAccountButton',
		offertandCCondition: 'offertandCCondition',
		offertandCCondition2: 'offertandCCondition2',
		offerFSACondition: 'offerFSACondition',
		offerCreditCondition: 'offerCreditCondition',
		offerDebitAuthCondition: 'offerDebitAuthCondition',
		downgradedOfferPageEmail: 'downgradedOfferPageEmail',
		downgradedOfferPageKeyFeaturesTitle: 'downgradedOfferPageKeyFeaturesTitle',
		declineAccountButton: 'declineAccountButton',
		offerPageSubTitle: 'offerPageSubTitle',
		offerPageAlternativeOfferTitle: 'offerPageAlternativeOfferTitle',
		altOpenAccountButton: 'altOpenAccountButton',
	},
	data: {
		productOffer: {},
		offerAcceptFullTCs: false,
		product: {
			alternativeOfferItems: [1, 2, 3],
			additionalDocumentItems: [1, 2, 3, 4, 5],
			product_code: '803',
			productType: {
				name: 'savings',
			},
		},
	},
	appData: {
		isApiCallInProgress: false
	},
	product: {
		'product_type': 'CURRENT ACCOUNT',
		'product_code': '800',
		'bank_code': 'CB',
		'debit_card_offered': 'DUAL FUNCTION',
	},
	validations: {},
	getDocumentElements: () => {},
	getOfferElements: () => {},
	onClickActionAccount: () => {},
	onClickMoreInfo: () => {},
	getMandateElements: () => {},
	goBack: true,
};


ProductUtils.getProduct.mockReturnValue({
	name: 'blah',
	alternativeOfferItems: [1, 2, 3],
	offerRestrictions: [1, 2, 3, 4],
	additionalDocumentItems: [1, 2, 3, 4, 5],
	offerMandateItems: [1, 2, 3, 4, 5],
	productType: {
		name: 'current',
	}
});
ContentUtils.getContentParagraphs.mockReturnValue('test');

describe('SingleProduct', () => {
	let result, component, instance;

		beforeEach(() => {
			component = (<SingleProduct {...props} />);

			instance = render(component);
			shallowRenderer.render(component);
			result = shallowRenderer.getRenderOutput();
		});
		it('should render the default component', () => {

			expect(result).toEqualJSX(
				<div>
					<h3 dangerouslySetInnerHTML={{__html: 'offerPageSubTitle'}} />
					<ListSection
						wrapperFn={() => {}}
						items={[1, 2, 3]}
					/>
					<ListSection
						wrapperFn={() => {}}
						items={[1, 2, 3, 4]}
						title={'offerPageofferRestrictionsTitle'}
					/>
					<ListSection
						wrapperFn={() => {}}
						items={[1, 2, 3, 4, 5]}
						title={'offerPageDocumentToReadSectionTitle'}
					/>

					<div className="terms-and-conditions-checkbox" key="offerAcceptFullTCsDiv">
						<CheckBoxQuestion
							defaultValue={false}
							group={AccountOpeningConstants.GROUP_OFFER}
							name="offerAcceptFullTCs"
							dataAnchor="offer-accept-full-tcs"
							onChange={AccountOpeningActions.updateFormValue}
							required>
							offerTandCQuestion
						</CheckBoxQuestion>
					</div>
						<ListSection
							wrapperFn={() => {}}
							items={[1, 2, 3, 4, 5]}
						/>
					<p>downgradedOfferPageEmail</p>
					<div className="offer-result-actions clearfix">
						<div className="row">
							<div className="col-xs-12 col-md-6 col-md-push-5 text-center">
								<button
									className="btn btn-lg btn-primary inline btn-next"
									onClick={() => {}}
									data-anchor="accept-next"
									disabled={!ValidationUtils.isGroupValid(props.validations, AccountOpeningConstants.GROUP_OFFER) || props.appData.isApiCallInProgress}>
									altOpenAccountButton
								</button>
							</div>
							<div className="col-xs-12 col-md-6 col-md-pull-5 text-center">
								<button
									className="btn btn-lg btn-primary inline btn-back"
									onClick={() => {}}
									>
									Go Back
								</button>
							</div>
						</div>
					</div>
				</div>
			);
		});

		it('should render decline btn when in single mode', () => {
			props.goBack = false;
			component = (<OfferSummary {...props} />);

			instance = render(component);

			shallowRenderer.render(component);
			result = shallowRenderer.getRenderOutput();
			expect(result).not.toIncludeJSX(
				<button
					className="btn btn-lg btn-primary inline btn-decline"
					onClick={() => { }}
					data-anchor="accept-decline"
					disabled={false}>
					declineAccountButton
				</button>
			);
		});

		it('should NOT render credit bullet when on savings', () => {
			ProductUtils.getProduct.mockReturnValue({
				name: 'blah',
			    alternativeOfferItems: [1, 2, 3],
			   	offerRestrictions: [1, 2, 3, 4],
			   	additionalDocumentItems: [1, 2, 3, 4, 5],
				productType: {
					name: 'savings',
				}
			});
			component = (<SingleProduct {...props} />);
			shallowRenderer.render(component);
			result = shallowRenderer.getRenderOutput();
			expect(result).not.toIncludeJSX(
				<li>
					offerCreditCondition
				</li>
			);
		});


});
