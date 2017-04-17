
jest.unmock('../UserIdentityBuilder');
jest.unmock('lodash');

const _ = require('lodash');

const Builder = require('../UserIdentityBuilder');

describe('UserIdentityBuilder', () => {

	const runTest = testCase => {
		describe(testCase.describe, () => {
			it(testCase.should, () => {
				testCase.assert(testCase.execute());
			});
		});
	};

	const testCases = [{
		describe: 'fromUsername: given a string',
		should: 'should build a userName object',
		execute: () => Builder.fromUsername('username'),
		assert: result => expect(result).toEqual({
					userId: 'username'
			})
	}, {
		describe: 'fromUsername: given an object',
		should: 'should throw',
		execute: () => expect(() => Builder.fromUsername({firstname: 'robin'})),
		assert: result => result.toThrowError('userName must be a string')
	}, {
		describe: 'build: given a string',
		should: 'should build a userName userIdentity object',
		execute: () => Builder.build('username'),
		assert: result => expect(result).toEqual({
				userIdentity: {
					userId: 'username'
				}
			})
	}, {
		describe: 'fromUserId: given a UUID',
		should: 'should build a userName userIdentity object',
		execute: () => Builder.fromUserId('e7ca8830-a865-435a-86ca-32db6dd30b77'),
		assert: result => expect(result).toEqual({
					userId: 'e7ca8830-a865-435a-86ca-32db6dd30b77'
			})
	}, {
		describe: 'fromUserId: given an object',
		should: 'should throw',
		execute: () => expect(() => Builder.fromUserId({firstname: 'robin'})),
		assert: result => result.toThrow()
	}, {
		describe: 'fromUserId: given a string',
		should: 'should throw',
		execute: () => expect(() => Builder.fromUserId('a string')),
		assert: result => result.toThrowError('"a string" is not a UUID')
	}, {
		describe: 'build: given a UUID',
		should: 'should build a userName userIdentity object',
		execute: () => Builder.build('e7ca8830-a865-435a-86ca-32db6dd30b77'),
		assert: result => expect(result).toEqual({
				userIdentity: {
					userId: 'e7ca8830-a865-435a-86ca-32db6dd30b77'
				}
			})
	}, {
		describe: 'build: given an object that matches userInfo',
		should: 'should build a userInfo userIdentity object',
		execute: () => Builder.build({firstname: 'batman'}),
		assert: result => expect(result).toEqual({
				userIdentity: {
					userInfo: {
						firstname: 'batman',
					}
				}
			})
	}
	];

	testCases.forEach(runTest);
});
