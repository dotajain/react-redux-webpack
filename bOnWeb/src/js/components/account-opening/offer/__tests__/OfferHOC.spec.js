jest.unmock('../OfferHOC');
jest.unmock('../../../common/links/NewWindowLink');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const _ = require('lodash');
const { buildFindMockByDataAnchorFilter, buildContent } = require('../../../../__helpers__/TestHelpers');

const config = require('../../../../config');
const OfferHOC = require('../OfferHOC');

const ProductUtils = require('../../../../utils/ProductUtils');
const ValidationUtils = require('../../../../utils/ValidationUtils');
const ContentUtils = require('../../../../utils/ContentUtils');
const HtmlUtils = require('../../../../utils/HtmlUtils');
const PathUtils = require('../../../../utils/PathUtils');
const BrandUtils = require('../../../../utils/BrandUtils');

PathUtils.getPath.mockReturnValue('/test/');
ProductUtils.getProduct.mockReturnValue({
	productType: 'test'
});
BrandUtils.appendBrand.mockReturnValue('/test/');

const container = document.createElement('div');
const render = (comp, el) => ReactDOM.render(comp, el || container);
let Wrapper = React.createClass({
    render() {
        return (
            <div>test</div>
        );
    }
});

Wrapper = OfferHOC(Wrapper);

let instance;

const contentKeys = ['termsAndConditionsDocLinkText', 'tariffDocLinkText', 'test1', 'test2'];

const content = buildContent(contentKeys);
const shallowRenderer = TestUtils.createRenderer();

const data = {
	productOffer: {
		offers: [1, 2, 3]
	},
	productCode: 'blah',
};

describe('OfferHOC', () => {


	describe('getOfferElements', () => {
		beforeEach(() => {
			instance = render(
				<Wrapper data={data} content={content} validations={{}} appData={{isApiCallInProgress: false}} />
			);
			ContentUtils.getContentWithDocument.mockReturnValue('testblah');
		});

		it('returns null if offerItems is not an array', () => {
			expect(instance.getOfferElements()).toBe(null);
			expect(instance.getOfferElements(null)).toBe(null);
			expect(instance.getOfferElements('null')).toBe(null);
		});


		it('returns an item for each data element passed in', () => {
			const result = instance.getOfferElements(['debitContactlessOfferItem', 'interestOfferItem']);
			expect(result.length).toBe(2);
		});

		it('returns an empty list if no items are passed in', () => {
			const result = instance.getOfferElements([]);
			expect(result.length).toBe(0);
		});

		it('returns an empty list if the content is not mapped', () => {
			ContentUtils.getContentWithDocument.mockReturnValue();
			const result = instance.getOfferElements(['debitContactlessOfferItem', 'interestOfferItem']);
			expect(result.length).toBe(0);
		});

		it('hasSavingsAccountItems', () => {
			ProductUtils.getSavingAccountItems.mockReturnValue([1, 2, 3])
			HtmlUtils.getTextItems.mockReturnValue({
				test: 'test'
			});

			const result = instance.getOfferElements(['debitContactlessOfferItem']);
			expect(HtmlUtils.getTextItems.mock.calls.length).toBe(1);
			expect(result.length).toBe(2);
		});
	});

	describe('getDocumentElements', () => {

		it('returns null if docItems is not an array', () => {
			expect(instance.getDocumentElements()).toBe(null);
			expect(instance.getDocumentElements(null)).toBe(null);
			expect(instance.getDocumentElements('null')).toBe(null);
		});

		it('returns an item for each data element passed in', () => {
			const result = instance.getDocumentElements(['termsAndConditions', 'tariff']);
			expect(result.length).toBe(2);
		});

		it('returns an empty list if no items are passed in', () => {
			const result = instance.getDocumentElements([]);
			expect(result.length).toBe(0);
		});

		it('returns an empty list if the content is not mapped', () => {
			const result = instance.getDocumentElements(['testing']);
			expect(result.length).toBe(0);
		});
	});

	describe('getMandateElements', () => {
		it('returns null if docItems is not an array', () => {
			expect(instance.getMandateElements()).toBe(null);
			expect(instance.getMandateElements(null)).toBe(null);
			expect(instance.getMandateElements('null')).toBe(null);
		});

		it('returns an item for each data element passed in', () => {
			const result = instance.getMandateElements(['test1', 'test2']);
			expect(result.length).toBe(2);
		});

		it('returns an empty list if no items are passed in', () => {
			const result = instance.getMandateElements([]);
			expect(result.length).toBe(0);
		});

		it('returns an empty list if the content is not mapped', () => {
			const result = instance.getMandateElements(['testing']);
			expect(result.length).toBe(0);
		});
	});


});
