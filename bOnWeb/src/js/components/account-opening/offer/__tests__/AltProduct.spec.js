jest.unmock('../AltProducts');
jest.unmock('../OfferDetails');
jest.unmock('../MultiProducts');
jest.unmock('../SingleProduct');
jest.unmock('../OfferSummary');
jest.unmock('../BasicOffer');
jest.unmock('../../../../config');
jest.unmock('../../../../config/ProductData');
jest.unmock('../../../../config/BrandConfig');
jest.unmock('../../../../utils/ProductUtils');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const ReactDOM = require('react-dom');

const container = document.createElement('div');
const render = (comp, el) => ReactDOM.render(comp, el || container);
const shallowRenderer = TestUtils.createRenderer();

const AltProducts = require('../AltProducts');
const OfferDetails = require('../OfferDetails');
const MultiProducts = require('../MultiProducts');
const SingleProduct = require('../SingleProduct');

let props = {
	content: {
		offerPageUnsuccessfulTitle: 'offerPageUnsuccessfulTitle {productTitle}',
		offerPageAlternativeOfferTitle: 'offerPageAlternativeOfferTitle ',
		offerPageDowngradeTitle: 'offerPageDowngradeTitle {productTitle}',
	},
	appData: {},
	data: {
		productCode: 'IM135',
		productOffer: {},
		product: {
			alternativeOfferItems: [],
			name: 'test',
		},
	},

	products: [{
		'product_type': 'CURRENT ACCOUNT',
		'product_code': '135',
		'bank_code': 'CB',
		'debit_card_offered': 'DUAL FUNCTION',
	}],
	validations: {},
	onClickActionAccount: () => {},
	getDocumentElements: () => {},
	getOfferElements: () => {},
	getMandateElements: () => {},
	headerIllustration: 'test.png',
};

describe('AltProducts', () => {
	let result, component, instance;


	describe('WHEN a single offer', () => {
		beforeEach(() => {
			component = (<AltProducts {...props} />);

			instance = render(component);
			shallowRenderer.render(component);
			result = shallowRenderer.getRenderOutput();
		});
		it('should render the single product component', () => {

			expect(result).toEqualJSX(
				<OfferDetails
					headerIllustration='downgrade-illustration.png'
					pageTitle='offerPageUnsuccessfulTitle Current Account Plus'
					{...props}>
					<SingleProduct
						product={{
							'product_type': 'CURRENT ACCOUNT',
							'product_code': '135',
							'bank_code': 'CB',
							'debit_card_offered': 'DUAL FUNCTION',
						}}
						{...props} />
				</OfferDetails>
			);
		});

		describe('WHEN a ready cash downgrade offer', () => {
			beforeEach(() => {
					props.products = [{
						'product_type': 'CURRENT ACCOUNT',
						'product_code': '800',
						'bank_code': 'CB',
						'debit_card_offered': 'DUAL FUNCTION',
					},
				];

				component = (<AltProducts {...props} />);
				instance = render(component);
				shallowRenderer.render(component);
				result = shallowRenderer.getRenderOutput();
			});

			it('should render the multi product component', () => {
				expect(result).toEqualJSX(
					<OfferDetails
						headerIllustration='downgrade-illustration.png'
						pageTitle='offerPageDowngradeTitle Current Account Plus'
						{...props}>
						<SingleProduct
							product={{
								'product_type': 'CURRENT ACCOUNT',
								'product_code': '800',
								'bank_code': 'CB',
								'debit_card_offered': 'DUAL FUNCTION',
							}}
							{...props} />
					</OfferDetails>
				);
			});
		});
	});

	describe('WHEN a multi offer', () => {
		beforeEach(() => {
			props.products = [{
				'product_type': 'CURRENT ACCOUNT',
				'product_code': '135',
				'bank_code': 'CB',
				'debit_card_offered': 'DUAL FUNCTION',
			},
			{
				'product_type': 'CURRENT ACCOUNT',
				'product_code': '125',
				'bank_code': 'CB',
				'debit_card_offered': 'DUAL FUNCTION',
			}];
			component = (<AltProducts {...props} />);
			instance = render(component);
			shallowRenderer.render(component);
			result = shallowRenderer.getRenderOutput();
		});

		it('should render the multi product component', () => {
			expect(result).toEqualJSX(
				<OfferDetails
					headerIllustration='downgrade-illustration.png'
					pageTitle='offerPageUnsuccessfulTitle Current Account Plus'
					{...props}>
					<MultiProducts
						onClickGoBack={() => {}}
						onClickMoreInfo={() => {}}
						selectedProduct={undefined}
						{...props} />
				</OfferDetails>
			);
		});
	});
});
