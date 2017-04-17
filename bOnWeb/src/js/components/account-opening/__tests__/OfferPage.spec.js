
jest.unmock('../../../config');
jest.unmock('../../common/sections/ResultSection');
jest.unmock('../../common/ComponentHeader');
jest.unmock('../OfferPage');
jest.unmock('../offer/AltProducts');
jest.unmock('../offer/BasicOffer');
jest.unmock('../offer/OfferHOC');
jest.unmock('../offer/OfferDetails');
jest.unmock('../offer/MultiProducts');
jest.unmock('../offer/SingleProduct');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const _ = require('lodash');
const { buildFindMockByDataAnchorFilter, buildContent } = require('../../../__helpers__/TestHelpers');

const config = require('../../../config');
const OfferPage = require('../OfferPage');

const ProductUtils = require('../../../utils/ProductUtils');
const ValidationUtils = require('../../../utils/ValidationUtils');
const ContentUtils = require('../../../utils/ContentUtils');
const HtmlUtils = require('../../../utils/HtmlUtils');

const PageHeader = require('../../common/PageHeader');
const CheckBoxQuestion = require('../../common/questionsets/CheckBoxQuestion');
const ResultSection = require('../../common/sections/ResultSection');
const ListSection = require('../../common/sections/ListSection');

const AccountOpeningActions = require('../../../actions/AccountOpeningActions');

const container = document.createElement('div');
const render = (comp, el) => ReactDOM.render(comp, el || container);

let instance;

const contentKeys = [
	'offerPageUnsuccessfulTitle',
	'offerPageAlternativeOfferTitle',
	'offerPageDowngradeTitle',
	'offerPageHeader',
	'offerPageTitle',
	'offerPageAltTitle',
	'offerPageSubTitle',
	'offerPageIntroTitle',
	'offerPageKeyFeaturesTitle',
	'offerPageofferRestrictionsTitle',
	'offerPageDocumentToReadSectionTitle',
	'offerPageDeclineOffer',
	'offerConditionsIntro',
	'offerTandCQuestion',
	'offertandCCondition',
	'offertandCCondition2',
	'offerFSACondition',
	'offerCreditCondition',
	'offerDebitAuthCondition',
	'offerPageContinue',
	'openAccountButton',
	'declineAccountButton',
	'downgradedOfferPageEmail',
	'downgradedOfferPageKeyFeaturesTitle',
	'downgradedOfferKeyFeaturesParagraph',
	'termsAndConditionsDocLinkText',
	'tariffDocLinkText',
	];

const content = buildContent(contentKeys);
const shallowRenderer = TestUtils.createRenderer();

const prodfactory = (products) => {
	const productsArray = [{
			"product_type": "SAVINGS ACCOUNT",
			"product_code": "125",
			"bank_code": "CB",
			"debit_card_offered": "DUAL FUNCTION"
		}, {
			"product_type": "CURRENT ACCOUNT",
			"product_code": "136",
			"bank_code": "CB",
			"debit_card_offered": "DUAL FUNCTION"
		},
		{
			"product_type": "CURRENT ACCOUNT",
			"product_code": "800",
			"bank_code": "CB",
			"debit_card_offered": "DUAL FUNCTION"
		}
	];
	return _.map(products, (productCode) => {
		return _.find(productsArray, {product_code: productCode});
	});
};

const productStub = {
	"reference_id": "CS-10001",
	"uuid": "xxxxxxxxxxxxx",
	"offers": [{
		"offer_id": "OFFER-1",
		"products": prodfactory(['136', '125'])
	}]
};
const downgradeProductStub = {
	"reference_id": "CS-10001",
	"uuid": "zzzzzzzzzzzzzzz",
	"offers": [{
		"offer_id": "OFFER-2",
		"products": prodfactory(['800'])
	}]
};

const stubfactory = (isAltProduct) => {
	const stub = isAltProduct ? downgradeProductStub : productStub;
	return _.clone(stub);
};

const setProduct = (isAltProduct) => {
	const offers = stubfactory(isAltProduct);
	const newData = {
		productOffer: offers,
		productCode: isAltProduct ? 'IMxxxx' : 'IM136',
		isAltProduct: isAltProduct,
		product: {
			alternativeOfferItems: [1, 2, 3],
			name: 'blah',
		   	offerRestrictions: [1, 2, 3, 4],
		   	additionalDocumentItems: [1, 2, 3, 4, 5],
			productType: {
				name: 'savings',
			}
		},
	};
	instance = render(
		<OfferPage
			data={newData}
			content={content}
			validations={{}}
			appData={{isApiCallInProgress: false}}
		/>
	);

};

ProductUtils.getProduct.mockReturnValue({
	alternativeOfferItems: [1, 2, 3],
	name: 'blah',
   	offerRestrictions: [1, 2, 3, 4],
   	additionalDocumentItems: [1, 2, 3, 4, 5],
	productType: {
		name: 'savings',
	}
});

describe('OfferPage', () => {
	beforeEach(() => {
		const data = {
			//productOffer: stubfactory(false),
			productCode: 'IM1343',
			product: {
				alternativeOfferItems: [],
			},
		};

		ValidationUtils.isGroupValid.mockReturnValue(true)

		instance = render(
			<OfferPage data={data} validations={{}} content={content} appData={{}} />
		);
	});

	describe('componentWillReceiveProps', () => {
		it('returns an empty list if no items are passed in', () => {
			expect(AccountOpeningActions.updateOfferStatus.mock.calls.length).toBe(0);
		});

		describe('WHEN downGrade', () => {
			beforeEach(() => {
				AccountOpeningActions.updateOfferStatus.mockClear();
				setProduct(true);
			});

			it('calls the action to downgrade app state', () => {
				expect(AccountOpeningActions.updateOfferStatus.mock.calls[0][0]).toBe(true)
			});

			it('sets downgraded product into state', () => {
				expect(instance.state.products[0]).toEqual(stubfactory(true).offers[0].products[0])
			});
		});

	});

	describe('onClickActionAccount', () => {

		describe('WHEN downGrade', () => {
			let button;
			beforeEach(() => {
				setProduct(true);
			});

			describe('decline', () => {
				beforeEach(() => {
					AccountOpeningActions.respondToProductOffer.mockClear();
					button = TestUtils.findRenderedDOMComponentWithClass(
						instance,
						'btn-decline'
					);
					TestUtils.Simulate.click(button);
				});

				it('should fire action to decline ', () => {
					expect(AccountOpeningActions.respondToProductOffer.mock.calls[0][0]).toBe(stubfactory(true).offers[0].offer_id);
					expect(AccountOpeningActions.respondToProductOffer.mock.calls[0][1]).toBe(true)
				});
			});


			describe('accept', () => {

				beforeEach(() => {
					AccountOpeningActions.respondToProductOffer.mockClear();
				});

				it('should fire action to accept ', () => {
					button = TestUtils.findRenderedDOMComponentWithClass(
						instance,
						'btn-next'
					);
					TestUtils.Simulate.click(button);

					expect(AccountOpeningActions.respondToProductOffer.mock.calls[0][0]).toBe(stubfactory(true).offers[0].offer_id);
					expect(AccountOpeningActions.respondToProductOffer.mock.calls[0][1]).toBe(false)
				});
			});

		});

		describe('WHEN normal offer', () => {
			let button;

			beforeEach(() => {
				setProduct(false);
			});

			describe('accept', () => {

				beforeEach(() => {
					AccountOpeningActions.respondToProductOffer.mockClear();
				});

				it('should fire action to accept ', () => {
					button = TestUtils.findRenderedDOMComponentWithClass(
						instance,
						'btn-next'
					);
					TestUtils.Simulate.click(button);

					expect(AccountOpeningActions.respondToProductOffer.mock.calls[0][0]).toBe(stubfactory(false).offers[0].offer_id);
					expect(AccountOpeningActions.respondToProductOffer.mock.calls[0][1]).toBe(false)
				});
			});

		});

		it('should NOT fire action to accept when no offerId  ', () => {
			AccountOpeningActions.respondToProductOffer.mockClear();
			const stub = stubfactory(false);
			let newProps;
			let button;

			stub.offers[0]['offer_id'] = undefined;

			newProps = _.assign({}, instance.props, {
				appData: {
					isApiCallInProgress: false
				},
				data: {
					productOffer: stub,
					productCode: 'IM125',
					isAltProduct: true,
					product: {
						alternativeOfferItems: [],
					},
				}
			});
			instance = render(
				<OfferPage data={newProps.data} validations={{}} content={newProps.content} appData={newProps.appData} />
			);


			button = TestUtils.findRenderedDOMComponentWithClass(
				instance,
				'btn-next'
			);
			TestUtils.Simulate.click(button);

			expect(AccountOpeningActions.respondToProductOffer.mock.calls.length).toBe(0);
		});

	});

});
