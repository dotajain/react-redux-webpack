
jest.unmock('../../../config');
jest.unmock('../DeclinePage');

jest.unmock('../../../utils/ContentUtils');

// React
const React = require('react');
const TestUtils = require('react-addons-test-utils');

const DeclinePage = require('../DeclinePage');
const ProductUtils = require('../../../utils/ProductUtils');

describe('DeclinePage', function() {

	let instance;

	const content = {
		declinePageTitle: 'the title {productTitle} here',
		item1: 'content test',
		item2: 'content test',
		item3: 'content test',
		item4: 'content test',
		paragraph1: 'Paragraph test',
		paragraph2: 'Paragraph test',
		paragraph3: 'Paragraph test',
		paragraph4: 'Paragraph test',
		paragraph5: 'Paragraph test',
		link1: 'Link test',
		link2: 'Link test',
		link3: 'Link test',
	};

	beforeEach(function() {
		const data = {
			productCode: 'IM136',
			product: {
				name: 'test product',
			},
		};

		instance = TestUtils.renderIntoDocument(
			<DeclinePage data={data} content={content} appData={{}} />
		);

	});

	describe('getContent', () => {
		it('Returns content if a matching key is found', () => {
			const result = instance.getContent('item', content);
			expect(result.length).toBe(4);

		});

		it('Returns no content if a matching key is not found', () => {
			const result = instance.getParagraphs('itm', content);
			expect(result.length).toBe(0);
		});
	});

	describe('getParagraphs', () => {
		it('Return required content', () => {
			const result = instance.getParagraphs('paragraph', content);
			expect(result.length).toBe(5);
		});

	});

	describe('getLinks', () => {
		it('Returns a list of links if a matching key is found', () => {
			const result = instance.getLinks('link', content);
			expect(result.length).toBe(3);
		});
		it('Returns no links if a matching key is not found', () => {
			const result = instance.getParagraphs('lnk', content);
			expect(result.length).toBe(0);
		});
	});

});
