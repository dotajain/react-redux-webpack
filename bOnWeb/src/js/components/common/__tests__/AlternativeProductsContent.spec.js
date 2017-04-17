
jest.unmock('../AlternativeProductsContent');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const ReactDOM = require('react-dom');
const _ = require('lodash');

const AlternativeProductsContent = require('../AlternativeProductsContent');
const ContentUtils = require('../../../utils/ContentUtils');

const container = document.createElement('div');
const render = (comp, el) => ReactDOM.render(comp, el || container);

let instance;
let component;
const content = {
	test: 'test string'
};
const data = {
	isAltProduct: false
};

let Wrapper = React.createClass({
    render() {
        return (
            <div>test</div>
        );
    }
});

Wrapper = AlternativeProductsContent(Wrapper);


describe('AlternativeProductsContent', () => {
	beforeEach(() => {
		component = (<Wrapper content={content} data={data} />);

		instance = render(component);
	});

	describe('selectContentBasedOnDowngrade()', () => {
		it('returns calls content utils with valid params', () => {
			const contentKey = 'test';

			instance.selectContentBasedOnDowngrade(contentKey);

			expect(ContentUtils.getCYBAltContent.mock.calls[0]).toEqual([
				contentKey, content, data.isAltProduct
			]);
		});

		it('returns updated content when a regex config is passed', () => {
			const contentKey = 'test';
			ContentUtils.getCYBAltContent.mockReturnValue(content[contentKey]);
			const regexConfig = {
				regex: /string/,
				text: 'number'
			};
			const result = instance.selectContentBasedOnDowngrade(contentKey, regexConfig);

			expect(result).toEqual('test number');
		});

		it('returns updated content when a regex config is passed', () => {
			const contentKey = 'test';
			ContentUtils.getCYBAltContent.mockReturnValue(content[contentKey]);
			const regexConfig = {
				regex: /string/,
				text: 'number'
			};
			const result = instance.selectContentBasedOnDowngrade(contentKey, regexConfig);

			expect(result).not.toEqual(content[contentKey]);
		});

		describe('invalid regex config', () => {
			it('doens\'t replace when regexConfig is undefined', () => {
				const contentKey = 'test';
				ContentUtils.getCYBAltContent.mockReturnValue(content[contentKey]);
				const regexConfig = undefined;
				const result = instance.selectContentBasedOnDowngrade(contentKey, regexConfig);

				expect(result).toEqual(content[contentKey]);
			});

			it('doens\'t replace when regexConfig is null', () => {
				const contentKey = 'test';
				ContentUtils.getCYBAltContent.mockReturnValue(content[contentKey]);
				const regexConfig = null;
				const result = instance.selectContentBasedOnDowngrade(contentKey, regexConfig);

				expect(result).toEqual(content[contentKey]);
			});

			it('doens\'t replace when regexConfig is string', () => {
				const contentKey = 'test';
				ContentUtils.getCYBAltContent.mockReturnValue(content[contentKey]);
				const regexConfig = 'string';
				const result = instance.selectContentBasedOnDowngrade(contentKey, regexConfig);

				expect(result).toEqual(content[contentKey]);
			});

			it('doens\'t replace when regexConfig is array', () => {
				const contentKey = 'test';
				ContentUtils.getCYBAltContent.mockReturnValue(content[contentKey]);
				const regexConfig = [];
				const result = instance.selectContentBasedOnDowngrade(contentKey, regexConfig);

				expect(result).toEqual(content[contentKey]);
			});

		});
	});


});
