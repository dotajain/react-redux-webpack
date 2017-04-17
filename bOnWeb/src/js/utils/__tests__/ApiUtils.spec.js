

jest.unmock('../ApiUtils');

const ApiUtils = require('../ApiUtils');

describe('ApiUtils', function() {
	beforeEach(function() {
		window.data = {
			url: 'https://test.co.uk/api/banks/{bank-id}/auth/provider/oauth2/token/challenges'
		}
	});

	afterEach(function() {
		delete window.data;
	})

	describe('replaceUriString', function() {
		it('replaces one placeholder', function() {
			expect(ApiUtils.replaceUriString(data, '{bank-id}', 'CB')).toEqual('https://test.co.uk/api/banks/CB/auth/provider/oauth2/token/challenges');
		});

		it('replaces multiple placeholders', function() {
			data.url = 'https://test.co.uk/api/banks/{bank-id}/cases/{case-type}/{case-id}/{case-subtype}/tasks/next'
			data.url = ApiUtils.replaceUriString(data, '{bank-id}', 'CB');
			data.url = ApiUtils.replaceUriString(data, '{case-id}', '1234567890');
			data.url = ApiUtils.replaceUriString(data, '{case-type}', 'csap');
			data.url = ApiUtils.replaceUriString(data, '{case-subtype}', 'existing');
			data.url = ApiUtils.replaceUriString(data, '{not-relevant}', 'nothing');

			expect(data.url).toEqual('https://test.co.uk/api/banks/CB/cases/csap/1234567890/existing/tasks/next');
		});

		it('replaces multiple occurances of a placeholder', function() {
			data.url = 'https://test.co.uk/api/banks/{bank-id}/cases/{bank-id}'
			data.url = ApiUtils.replaceUriString(data, '{bank-id}', 'CB');
			expect(data.url).toEqual('https://test.co.uk/api/banks/CB/cases/CB');
		});

		it('returns unchanged url when replacement is not found', function() {
			expect(ApiUtils.replaceUriString(data, '{subcase-id}', 'existing')).toEqual('https://test.co.uk/api/banks/{bank-id}/auth/provider/oauth2/token/challenges');
		});

		it('returns unchanged url when replacement string is undefined', function() {
			data.url = 'https://test.co.uk/api/banks/{bank-id}/cases/{bank-id}';
			const url = ApiUtils.replaceUriString(data, '{bank-id}', undefined);
			expect(url).toEqual(data.url);
		});
	});

	describe('getRequiredScope', function() {

		const tests = [
			// Valid tests
			{header: 'Bearer realm scope=20', expectedScope: 20},
			{header: 'Bearer realm scope=30', expectedScope: 30},
			{header: 'Bearer realm scope=40', expectedScope: 40},
			{header: 'scope=40', expectedScope: 40},
			// Invalid tests
			{header: 'Bearer realm scope=', expectedScope: -1},
			{header: '', expectedScope: -1},
			{header: undefined, expectedScope: -1},
		];

		it('extracts the required scope from the www-authenticate header', function() {
			for (let i = 0, testsLength = tests.length; i < testsLength; i++) {
				expect(ApiUtils.getRequiredScope(tests[i].header)).toEqual(tests[i].expectedScope);
			};
		});
	});

	xdescribe('makeAjaxCall', () => {
		describe('when calling with a url that has a bank id', () => {
			describe('and no bank id is present', () => {
				it('should throw', () => {
					expect(() => ApiUtils.makeAjaxCall({url: '{bank-id}', bankID: 'DYB' })).toThrowError('Invalid bank id')
				});
			})
		});
	});
});
