jest.unmock('../AltProducts');
jest.unmock('../OfferDetails');
jest.unmock('../MultiProducts');
jest.unmock('../SingleProduct');
jest.unmock('../../../common/sections/ListSection');
jest.unmock('../BasicOffer');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const ReactDOM = require('react-dom');

const container = document.createElement('div');
const render = (comp, el) => ReactDOM.render(comp, el || container);
const shallowRenderer = TestUtils.createRenderer();

const BasicOffer = require('../BasicOffer');
const OfferDetails = require('../OfferDetails');
const ListSection = require('../../../common/sections/ListSection');
const ProductUtils = require('../../../../utils/ProductUtils');
const onClickActionAccountSpy = jest.fn();
const props = {
	content: {
		offerPageUnsuccessfulTitle: 'offerPageUnsuccessfulTitle',
		offerPageTitle: 'offerPageTitle',
		offerPageSubTitle: 'offerPageSubTitle',
		mandateTitle: 'mandateTitle',
		mandateParagraph: 'mandateParagraph',
		openAccountButton: 'openAccountButton',
		offerPageDeclineOffer: 'offerPageDeclineOffer',

	},
	data: {
		productCode: 'xxx',
		product: {
			alternativeOfferItems: [],
			name: 'test',
		},
	},
	product: {
		alternativeOfferItems: [],
		name: 'test',
	},
	appData: {
		isApiCallInProgress: false,
	},
	validations: {},
	onClickActionAccount: onClickActionAccountSpy,
	getOfferElements: () => {},
	getDocumentElements: () => {},
	getOfferElements: () => {},
	product: {},
};


describe('BasicOffer', () => {
	let result, component, instance;

	describe('WHEN a single offer', () => {
		beforeEach(() => {
			component = (<BasicOffer {...props} />);

			instance = render(component);

			shallowRenderer.render(component);
			result = shallowRenderer.getRenderOutput();
		});

		it('should render the default offer layout', () => {
			expect(result).toIncludeJSX(
				<OfferDetails
					{...props}
					headerIllustration='offer-illustration.png'
					pageTitle='offerPageTitle'
					subTitle='offerPageSubTitle'
					>
					<div>
						<ListSection
							wrapperFn={() => {}}
							items={[]}
						/>
						<h3>mandateTitle</h3>
						<p>mandateParagraph</p>
						<div className="text-center">
							<button
								className="btn btn-lg btn-primary inline btn-next"
								onClick={() => {}}
								data-anchor="accept-next"
								disabled={false}>
								openAccountButton
							</button>
						</div>
						<hr />
						<div className="offer-info text-center">
							offerPageDeclineOffer
						</div>
					</div>
				</OfferDetails>
			);
		});

		xit('should trigger handler prop on cta button', () => {
			const btn = TestUtils.findRenderedDOMComponentWithClass(instance, 'btn');
			TestUtils.Simulate.click(btn, {});
			expect(onClickActionAccountSpy).toHaveBeenCalled();

		});
	});
});
