

jest.unmock('../UrlUtils');
jest.unmock('lodash');

const UrlUtils = require('../UrlUtils');

describe('UrlUtils', function() {

	describe('getParam', function() {
		it('returns the value from the URL', function() {
			UrlUtils.retrieveSearch = () => '?apple=red&banana=yellow';
			expect(UrlUtils.getParam('apple')).toEqual('red');
			expect(UrlUtils.getParam('banana')).toEqual('yellow');
		});

		it('returns an empty string if the given param is not found', function() {
			UrlUtils.retrieveSearch = () => '';
			expect(UrlUtils.getParam('apple')).toEqual('');
			expect(UrlUtils.getParam('banana')).toEqual('');
			expect(UrlUtils.getParam(false)).toEqual('');
			expect(UrlUtils.getParam(null)).toEqual('');
		});
	});
});
