

jest.unmock('../PathUtils');
var envConfig = require('../../../static/config')

const PathUtils = require('../PathUtils');


describe('Path', () => {
	const runTest = testCase => {
		it(`when asset path ${testCase.type}  return ${testCase.expected}`, () => {
			const result = PathUtils.getPath(testCase.path);
			expect(result).toBe(testCase.expected)
		})
	};

	describe('getPath', () => {
		beforeEach(() => {
			envConfig.websiteBaseDirectory = 'http://test.com/';
		});

		const testCases = [
			{
				path: 'http://test/something.pdf',
				expected: 'http://test/something.pdf',
				type: 'has http'
			},
			{
				path: undefined,
				expected: undefined,
				type: 'is undefined'
			},
			{
				path: null,
				expected: undefined,
				type: 'is null'
			},
			{
				path: 'something.pdf',
				expected: 'http://test.com/something.pdf',
				type: 'doesn\'t have http'
			},
		];

		testCases.forEach(runTest);

	});

});
