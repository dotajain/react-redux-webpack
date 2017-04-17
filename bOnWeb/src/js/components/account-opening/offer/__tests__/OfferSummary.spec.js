jest.unmock('../AltProducts');
jest.unmock('../OfferHOC');
jest.unmock('../OfferDetails');
jest.unmock('../MultiProducts');
jest.unmock('../SingleProduct');
jest.unmock('../OfferSummary');
jest.unmock('../../../common/sections/ListSection');


const React = require('react');
const TestUtils = require('react-addons-test-utils');
const ReactDOM = require('react-dom');

const container = document.createElement('div');
const render = (comp, el) => ReactDOM.render(comp, el || container);
const shallowRenderer = TestUtils.createRenderer();

const OfferSummary = require('../OfferSummary');
const ListSection = require('../../../common/sections/ListSection');
const ContentUtils = require('../../../../utils/ContentUtils');
const ProductUtils = require('../../../../utils/ProductUtils');


const props = {
	pageTitle: 'pageTitle',
	subTitle: 'subTitle',
	product: {
		'product_code': 'xxx',
	},
	data: {
		product: {
			alternativeOfferItems: [1, 2, 3],
		},
	},
	content: {
		offerPageUnsuccessfulTitle: 'offerPageUnsuccessfulTitle',
		offerPageTitle: 'offerPageTitle',
		offerPageSubTitle: 'offerPageSubTitle',
		offerPageAlternativeOfferTitle: 'offerPageAlternativeOfferTitle'
	},
	appData: {
		isApiCallInProgress: false,
	},
	getOfferElements:() => {},
	onClickMoreInfo:() => {},
	validations: {},
	headerIllustration: 'test.png',
	isLast:false,
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

ProductUtils.getName.mockReturnValue('blah');
ContentUtils.getContentParagraphs.mockReturnValue('test');

describe('OfferSummary', () => {
	let result, component, instance;

	describe('WHEN a single offer', () => {
		beforeEach(() => {
			component = (<OfferSummary {...props} />);

			instance = render(component);

			shallowRenderer.render(component);
			result = shallowRenderer.getRenderOutput();
		});

		it('should render the detail section', () => {
			expect(result).toEqualJSX(
				<div key='IMxxx' className="offer-summary">
					<h2 className="h3" dangerouslySetInnerHTML={{__html: 'offerPageAlternativeOfferTitle<span class="brand-highlight">blah</span>'}}/>
					<h3>offerPageSubTitle</h3>
					<ListSection
						wrapperFn={() => {}}
						items={[1, 2, 3]}
					/>
					<div className="offer-result-actions clearfix">
						<div className="row">
							<div className="col-xs-12 padding-bottom">
								<button
									className="btn btn-lg btn-primary "
									onClick={() => {}}
									disabled={false}>
									More information
								</button>
							</div>
						</div>
					</div>
					<h2>Or</h2>
				</div>
			);
		});

		it('should not render "Or" on last section', () => {
			props.isLast = true;
			component = (<OfferSummary {...props} />);

			instance = render(component);

			shallowRenderer.render(component);
			result = shallowRenderer.getRenderOutput();
			expect(result).not.toIncludeJSX(
				<h2>Or</h2>
			);
		});

	});
});
