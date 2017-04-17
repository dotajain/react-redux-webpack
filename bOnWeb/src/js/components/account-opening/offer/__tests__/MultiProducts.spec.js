jest.unmock('../AltProducts');
jest.unmock('../OfferHOC');
jest.unmock('../OfferDetails');
jest.unmock('../MultiProducts');
jest.unmock('../SingleProduct');
jest.unmock('../OfferSummary');
jest.unmock('../BasicOffer');
jest.unmock('../../../common/sections/ResultSection');
jest.unmock('../../../common/ComponentHeader');
jest.unmock('../../../common/modals/Modal');


const React = require('react');
const TestUtils = require('react-addons-test-utils');
const ReactDOM = require('react-dom');

const container = document.createElement('div');
const render = (comp, el) => ReactDOM.render(comp, el || container);
const shallowRenderer = TestUtils.createRenderer();

const OfferSummary = require('../OfferSummary');
const MultiProducts = require('../MultiProducts');
const SingleProduct = require('../SingleProduct');
const ProductUtils = require('../../../../utils/ProductUtils');


ProductUtils.getProduct.mockReturnValue({
	alternativeOfferItems: [1, 2, 3],
	name: 'blah',
   	offerRestrictions: [1, 2, 3, 4],
   	additionalDocumentItems: [1, 2, 3, 4, 5],
	productType: {
		name: 'savings',
	}
});

let props = {
	content: {
		offerCancelApplicationBtn: 'Cancel application',
		offerCancelIntro: 'If you do not wish to proceed with your application you can cancel below',
	},
	data: {
		productOffer: {},
		product: {
			alternativeOfferItems: [],
		},
	},
	appData: {
		isApiCallInProgress: false
	},
	products: [{
		'product_type': 'CURRENT ACCOUNT',
		'product_code': '800',
		'bank_code': 'CB',
		'debit_card_offered': 'DUAL FUNCTION',
	},
	{
		'product_type': 'CURRENT ACCOUNT',
		'product_code': '800',
		'bank_code': 'CB',
		'debit_card_offered': 'DUAL FUNCTION',
	}],
	selectedProduct: {
		'product_type': 'CURRENT ACCOUNT',
		'product_code': '800',
		'bank_code': 'CB',
		'debit_card_offered': 'DUAL FUNCTION',
	},
	validations: {},
	onClickMoreInfo: () => {},
	onClickGoBack: () => {},
	onClickActionAccount: () => {},
	getDocumentElements: () => {},
	getOfferElements: () => {},
	headerIllustration: 'test.png',
};


describe('MultiProducts', () => {
	let result, component, instance;


	describe('WHEN in a single offer state', () => {
		beforeEach(() => {
			component = (<MultiProducts {...props} />);

			instance = render(component);
			shallowRenderer.render(component);
			result = shallowRenderer.getRenderOutput();
		});
		it('should render the single product component', () => {

			expect(result).toEqualJSX(
				<div>
					<SingleProduct
						product={{
							'product_type': 'CURRENT ACCOUNT',
							'product_code': '800',
							'bank_code': 'CB',
							'debit_card_offered': 'DUAL FUNCTION',
						}}
						goBack={true}
						{...props} />
				</div>
			);
		});
	});

	describe('WHEN a multi offer', () => {
		beforeEach(() => {
			props.selectedProduct = undefined;
			component = (<MultiProducts {...props} />);
			instance = render(component);
			shallowRenderer.render(component);
			result = shallowRenderer.getRenderOutput();
		});

		it('should render the multi product component', () => {
			expect(result).toIncludeJSX(
				<div>
					<div>
					<OfferSummary
						key={0}
						product={{
							'product_type': 'CURRENT ACCOUNT',
							'product_code': '800',
							'bank_code': 'CB',
							'debit_card_offered': 'DUAL FUNCTION',
						}}
						isLast={false}
						{...props} />
					<OfferSummary
						key={1}
						product={{
							'product_type': 'CURRENT ACCOUNT',
							'product_code': '800',
							'bank_code': 'CB',
							'debit_card_offered': 'DUAL FUNCTION',
						}}
						isLast={true}
						{...props} />
					</div>
					<div>
						<hr/>
						<p>If you do not wish to proceed with your application you can cancel below</p>
						<a
							className="btn btn-lg btn-primary btn-next"
							onClick={() => {}}
							disabled={false}>
							Cancel application
						</a>
					</div>
				</div>
			);
		});

		xit('should render the confirmation popup when CTA is clicked', () => {
			// Issues with stateless components/jest don;t allow this test! :()
			console.log(ReactDOM.findDOMNode(instance).innerHTML)
			const btn = TestUtils.findRenderedDOMComponentWithClass(instance, ' btn-next');
			TestUtils.Simulate.click(btn, {});
			expect(result).toIncludeJSX(
				<Modal title="Are you sure you want to exit this application?">
					<div>
						<button
							onClick={() => {} }
							className="btn btn-primary"
							data-anchor="confirm-cancel-button"
							role="button"
							>
							No
						</button>
						<button
							onClick={() => {} }
							className="btn btn-primary btn-next"
							data-anchor="confirm-cancel-button"
							role="button"
							>
							Yes
						</button>
					</div>
				</Modal>
			);
		});
	});
});
