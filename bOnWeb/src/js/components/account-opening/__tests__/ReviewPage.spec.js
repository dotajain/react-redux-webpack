jest.unmock('../ReviewPage');
jest.unmock('react-bootstrap-datetimepicker');
jest.unmock('../../../config/BrandConfig');
jest.unmock('../../../config');
jest.unmock('../../common/PageColumnWrapper');
jest.unmock('../../../config/ProductData');
jest.unmock('../review/CurrentAccountReviewSection');
jest.unmock('../../common/links/NewWindowLink');

const React = require('react');
const TestUtils = require('react-addons-test-utils');

const _ = require('lodash');

const ReviewPage = require('../ReviewPage');
const ArrayUtils = require('../../../utils/ArrayUtils');
const MaskingUtils = require('../../../utils/MaskingUtils');
const PathUtils = require('../../../utils/PathUtils');
const BrandUtils = require('../../../utils/BrandUtils');
const config = require('../../../config');

const BottomNavigationBox = require('../../common/BottomNavigationBox');
const CheckBoxQuestion = require('../../common/questionsets/CheckBoxQuestion');
const MultiCheckBoxQuestion = require('../../common/questionsets/MultiCheckBoxQuestion');


PathUtils.getPath.mockReturnValue('/test/');
BrandUtils.appendBrand.mockReturnValue('/test/');

const product = {
	productLink: 'test1',
	name: 'test1',
	productType: { name: 'current', urlPart: 'current' },
	additionalDocumentItems: [
	'tariff',
	'financialServicesCompensationScheme',
	'termsAndConditions'
	],
	mandateItems: ['test1', 'test2', 'NOKEY']

}
describe('ReviewPage', () => {
	let instance;

	const content = {
		test1: 'test 1',
		test1: 'test 1',
		test2: 'test 2',
		tariffDocLinkText: 'test',
		tariffDocLinkLink: 'test',
		financialServicesCompensationSchemeDocLinkText: 'test',
		financialServicesCompensationSchemeDocLink: 'test',
		termsAndConditionsDocLinkText: 'test',
		termsAndConditionsDocLink: 'test',
	};

	const data = {
		productCode: 'IM136',
		product: product,
	};

	beforeEach(() => {
		BottomNavigationBox.mockClear();
		CheckBoxQuestion.mockClear();
		MultiCheckBoxQuestion.mockClear();

		instance = TestUtils.renderIntoDocument(
			<ReviewPage appData={{}} content={content} data={data} />
		);
	});

	describe('First render', () => {
		it('is defined', () => {
			expect(instance).toBeDefined()
		});

		it('should render the accept checkbox', () => {
			expect(CheckBoxQuestion.mock.calls.length).toBe(1);
		});

		it('should render the marketing questions', () => {
			expect(MultiCheckBoxQuestion.mock.calls.length).toBe(1);
		});

		it('should render a next button', () => {
			expect(BottomNavigationBox.mock.calls.length).toBe(1);
		});
	});

	describe('getKeyFeatureItems', () => {
		it('should render a list of key feature items', () => {
			const productData = {
				keyFeatureItems: ['test1', 'test2'],
			};
			const result = instance.getKeyFeatureItems(productData);
			expect(result.length).toBe(2);
		});

		it('should not render a list of key feature items', () => {
			const productData = {};
			const result = instance.getKeyFeatureItems(productData);
			expect(result.length).toBe(0);
		});
	});

	describe('getOfferRestrictions', () => {
		it('should render a list of offer restrictions', () => {
			const offerRestrictions = ['test1', 'test2'];
			const result = instance.getOfferRestrictions(offerRestrictions, 'title');
			expect(result).not.toBeNull();
		});

		it('should not render a list if offer restrictions is empty', () => {
			const offerRestrictions = [];
			const result = instance.getOfferRestrictions(offerRestrictions, 'title');
			expect(result).toBeNull();
		});

		it('should not render a list if offer restrictions is undefined', () => {
			const result = instance.getOfferRestrictions(undefined, 'title');
			expect(result).toBeNull();
		});


	});
	describe('getTaxObligations', () => {
		it('should return a string containing No if there are no tax obligations', () => {
			const noObligations = 'Yes';
			const result = instance.getTaxObligations(noObligations, undefined);
			expect(result).toMatch('No');
		});

		it('it should render the string using ArrayUtils', () => {
			ArrayUtils.getCommaString.mockClear();
			const noObligations = 'No';
			const result = instance.getTaxObligations(noObligations, 'test');
			expect(ArrayUtils.getCommaString.mock.calls.length).toBe(1);
		});
	});

	describe('getAdditionalDocumentItems', () => {
		it('should render a list of additional documents', () => {
			let result = instance.getAdditionalDocumentItems();
			expect(result.length).toBe(3);
		});
		it('should not render a list if additional documents is empty', () => {
			instance = TestUtils.renderIntoDocument(
				<ReviewPage appData={{}} content={{test1: 'test'}} data={{ productCode: 'IM136', product: product }} />
			);
			const result = instance.getAdditionalDocumentItems();

			expect(result.length).toBe(0);
		});
	});

	describe('getMandateBulletPoints', () => {
		it('should render a list of mandate items that have keys', () => {
			instance = TestUtils.renderIntoDocument(
				<ReviewPage appData={{}} content={content} data={{ productCode: 'IM800', product: product }} />
			);
			let result = instance.getMandateBulletPoints(content, 'IM136');
			expect(result.length).toBe(2);
		});
	});

	describe('formatPhoneNumber', () => {
		it('existing customer is masked', () => {
			MaskingUtils.applyMask.mockClear();

			const instance = TestUtils.renderIntoDocument(
				<ReviewPage
				appData={{}}
				content={content}
				data={
					{
						productCode: 'IM135',
						product: product,
						isExistingCustomer: 'Yes',
						phoneNumber: '07711316179',
					}
				} />
			);

			expect(MaskingUtils.applyMask.mock.calls[0]).toEqual(['07711316179', 3, 5]);
		});

		it('ntb is not masked', () => {
			MaskingUtils.applyMask.mockClear();

			const instance = TestUtils.renderIntoDocument(
				<ReviewPage
				appData={{}}
				content={content}
				data={
					{
						productCode: 'IM135',
						product: product,
						isExistingCustomer: 'No',
						phoneNumber: '07711316179',
					}
				} />
			);

			expect(MaskingUtils.applyMask.mock.calls.length).toBe(0);
		});
	});
});
