jest.unmock('../AltProducts');
jest.unmock('../OfferHOC');
jest.unmock('../OfferDetails');
jest.unmock('../MultiProducts');
jest.unmock('../SingleProduct');
jest.unmock('../BasicOffer');
jest.unmock('../../../common/sections/ResultSection');


const React = require('react');
const TestUtils = require('react-addons-test-utils');
const ReactDOM = require('react-dom');

const container = document.createElement('div');
const render = (comp, el) => ReactDOM.render(comp, el || container);
const shallowRenderer = TestUtils.createRenderer();

const OfferDetails = require('../OfferDetails');
const ResultSection = require('../../../common/sections/ResultSection');

const BrandUtils = require('../../../../utils/BrandUtils');

const props = {
	pageTitle: 'pageTitle',
	subTitle: 'subTitle',
	content: {
		offerPageUnsuccessfulTitle: 'offerPageUnsuccessfulTitle',
		offerPageTitle: 'offerPageTitle',
		offerPageSubTitle: 'offerPageSubTitle',
		mandateTitle: 'mandateTitle',
		mandateParagraph: 'mandateParagraph',
		openAccountButton: 'openAccountButton',
		offerPageDeclineOffer: 'offerPageDeclineOffer',

	},
	validations: {},
	headerIllustration: 'test.png'
};

BrandUtils.getResultImage.mockReturnValue('test.png');

describe('OfferDetails', () => {
	let result, component, instance;

	describe('WHEN a single offer', () => {
		beforeEach(() => {
			component = (<OfferDetails {...props} >test</OfferDetails>);

			instance = render(component);

			shallowRenderer.render(component);
			result = shallowRenderer.getRenderOutput();
		});

		it('should render the detail section', () => {
			expect(result).toIncludeJSX(
				<ResultSection
					className="offer-result-section"
					imgSrc='test.png'
					imgAlt="Offer Result"
					title='pageTitle'>
					<div className="white-board">
						<ResultSection
							className="result-header debitcard-result-section"
							subTitle='subTitle'
							hasSubtitleSeparator={false}>
							test
						</ResultSection>
					</div>
				</ResultSection>
			);
		});

	});
});
