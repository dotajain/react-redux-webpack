jest.unmock('../ContentUtils');
jest.unmock('../ProductUtils');
jest.unmock('../BrandUtils');
jest.unmock('../../config');
jest.unmock('../../config/BrandConfig');
jest.unmock('lodash');


var envConfig = require('../../../static/config');
let originalBankId = envConfig.bankId;
envConfig.bankId = 'CB';

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const _ = require('lodash');



const ContentUtils = require('../ContentUtils');
const ProductUtils = require('../ProductUtils');
const config = require('../../config');



describe('ContentUtils', () => {

	beforeEach(function() {
		originalBankId = global.envConfig.bankId;
		global.envConfig.bankId = 'CB';
	});

	afterEach(function() {
		global.envConfig.bankId = originalBankId;
	});

	const key = 'contentLine';
	const content = {
		contentLine1: 'test line one',
		contentLine2: 'test line two',
		contentLine3: 'test line three',
		contentLine3CYB: 'test line three alt',
		contentLine4: 'test line four',
		'contentLine4-savings': 'test line four savings',
		contentLine5: 'test line five',
		'contentLine5-savings': '',
	};

	describe('getContent', () => {
		it('should return all valid pieces of content in an array', () => {
			const result = ContentUtils.getContent(key, content);
			expect(result.length).toBe(6);
		});

		it('should return no items if no matches are found', () => {
			const result = ContentUtils.getContent('line', content);
			expect(result.length).toBe(0);
		});

		it('should be undefined if key is not a string', () => {
			const result = ContentUtils.getContent(['line'], content);
			expect(result).toBeUndefined();
		});

		it('should be undefined if key is undefined', () => {
			const result = ContentUtils.getContent(undefined, content);
			expect(result).toBeUndefined();
		});

		it('should be undefined if content is not a plain object', () => {
			const result = ContentUtils.getContent(key, ['content', 'content2']);
			expect(result).toBeUndefined();
		});

		it('should be undefined if content is undefined', () => {
			const result = ContentUtils.getContent(key, undefined);
			expect(result).toBeUndefined();
		});
	});

	describe('getContentListElements', () => {
		it('should return all valid list items', () => {
			const result = ContentUtils.getContentListElements(key, content);
			expect(result.length).toBe(6);
		});

		it('should return no items if no matches are found', () => {
			const result = ContentUtils.getContentListElements('line', content);
			expect(result.length).toBe(0);
		});

		it('should be undefined if key is not a string', () => {
			const result = ContentUtils.getContentListElements(['line'], content);
			expect(result).toBeUndefined();
		});

		it('should be undefined if key is undefined', () => {
			const result = ContentUtils.getContentListElements(undefined, content);
			expect(result).toBeUndefined();
		});

		it('should be undefined if content is not a plain object', () => {
			const result = ContentUtils.getContentListElements(key, ['content', 'content2']);
			expect(result).toBeUndefined();
		});

		it('should be undefined if content is undefined', () => {
			const result = ContentUtils.getContentListElements(key, undefined);
			expect(result).toBeUndefined();
		});
	});

	describe('getContentParagraphs', () => {
		it('should return all valid paragraphs', () => {
			const result = ContentUtils.getContentParagraphs(key, content);
			expect(result.length).toBe(6);
		});

		it('should return no items if no matches are found', () => {
			const result = ContentUtils.getContentParagraphs('line', content);
			expect(result.length).toBe(0);
		});

		it('should be undefined if key is not a string', () => {
			const result = ContentUtils.getContentParagraphs(['line'], content);
			expect(result).toBeUndefined();
		});

		it('should be undefined if key is undefined', () => {
			const result = ContentUtils.getContentParagraphs(undefined, content);
			expect(result).toBeUndefined();
		});

		it('should be undefined if content is not a plain object', () => {
			const result = ContentUtils.getContentParagraphs(key, ['content', 'content2']);
			expect(result).toBeUndefined();
		});

		it('should be undefined if content is undefined', () => {
			const result = ContentUtils.getContentParagraphs(key, undefined);
			expect(result).toBeUndefined();
		});

		it('should apply style if supplied', () => {
			const result = ContentUtils.getContentParagraphs(key, content, 'styleSupplied');
			expect(_.includes(result[0], 'class="styleSupplied"'));
		});

		it('should not add a default style', () => {
			const result = ContentUtils.getContentParagraphs(key, content);
			expect(!_.includes(result[0], 'class'));
		});

		describe('WHEN handling product based content', () => {
			it('should return product based content if product type matches key suffix', () => {
				const result = ContentUtils.getContentParagraphs(key, content, undefined, 'IM803');

				expect(result[3]).not.toEqual((
					<p
						key='test-line-four'
						className={undefined}
						dangerouslySetInnerHTML={{
							__html: 'test line four'
						}}
					/>
				));
				expect(result[4]).toEqual((
					<p
						key='test-line-four-savings'
						className={undefined}
						dangerouslySetInnerHTML={{
							__html: 'test line four savings'
						}}
					/>
				));
				expect(result.length).toBe(5);

			});

			it('should return normal content if product type DOES NOT matches key suffix', () => {
				const result = ContentUtils.getContentParagraphs(key, content, undefined, 'IM135');

				expect(result[4]).toEqual((
					<p
						key='test-line-four'
						className={undefined}
						dangerouslySetInnerHTML={{
							__html: 'test line four'
						}}
					/>
				));
			});

			it('should return normal content if no product code is given', () => {
				const result = ContentUtils.getContentParagraphs(key, content, undefined);

				expect(result[4]).toEqual((
					<p
						key='test-line-four'
						className={undefined}
						dangerouslySetInnerHTML={{
							__html: 'test line four'
						}}
					/>
				));
			});
		});

	});

	describe('getProductContent', () => {
		it('should return standard content if no product code', () => {
			const result = ContentUtils.getProductContent('contentLine4', content, undefined);
			expect(result).toBe('test line four');
		});

		it('should return alternative product content if present and matches product code', () => {
			const result = ContentUtils.getProductContent('contentLine4', content, 'IM803');
			expect(result).toBe('test line four savings');
		});

		it('should return nothing if we pass a content key which has a product-type suffix', () => {
			const result = ContentUtils.getProductContent('contentLine4-savings', content, 'IM803');
			expect(result).toBe(undefined);
		});

		it('should return nothing if we pass a content key which has a product-type suffix', () => {
			const result = ContentUtils.getProductContent('contentLine4-savings', content, 'IM803');
			expect(result).toBe(undefined);
		});

		it('should return standard content if the product code doesn\'t match product type', () => {
			const result = ContentUtils.getProductContent('contentLine4', content, 'IM135');
			expect(result).toBe('test line four');
		});
	});

	describe('getCYBAltContent', () => {

		describe('WHEN on DYB', () => {
			beforeEach(() => {
				envConfig.bankId = 'DYB';
			});
			it('should return standard content when NOT downgraded', () => {
				const result = ContentUtils.getCYBAltContent('contentLine3', content, false);
				expect(result).toEqual('test line three');
			});

			it('should return alternative content when downgraded', () => {
				const result = ContentUtils.getCYBAltContent('contentLine3', content, true);
				expect(result).toEqual('test line three alt');
			});
		});

		describe('WHEN NOT on DYB', () => {
			beforeEach(() => {
				envConfig.bankId = 'YB';
			});
			it('should return standard content when NOT downgraded', () => {
				const result = ContentUtils.getCYBAltContent('contentLine3', content, false);
				expect(result).toEqual('test line three');
			});

			it('should return standard content when downgraded', () => {
				const result = ContentUtils.getCYBAltContent('contentLine3', content, true);
				expect(result).toEqual('test line three');
			});
		});

	});

	// @ticket DYB-22764
	describe('getContentWithDocument', () => {
		let testContent;
		beforeEach(() => {
			testContent = {
				testWithDocString: 'Something blah blah {testDoc}',
				testString: 'Something blah blah.',
				testDocLink: '/test.pdf',
				testDocLinkText: 'Testing document',
				testDocLinkTitle: 'Blah',
			};
		});

		describe('WHEN no key is in the content', () => {
			it('should return undefined', () => {
				const result = ContentUtils.getContentWithDocument('klfhdskfskd', testContent);
				expect(result).toEqual(undefined);
			});
		});

		describe('WHEN no document tag is in the content', () => {
			it('should return standard content', () => {
				const result = ContentUtils.getContentWithDocument('testString', testContent);
				expect(result).toEqual('Something blah blah.');
			});
		});

		describe('WHEN a document tag is in the content', () => {
			it('should return content with linked document', () => {
				const result = ContentUtils.getContentWithDocument('testWithDocString', testContent);
				// FIXME: In the debt ticket proper testing of this will happen, testing against a rendered react string is pointless
				expect(result).not.toEqual('Something blah blah.');
			});
		});
	});

});
