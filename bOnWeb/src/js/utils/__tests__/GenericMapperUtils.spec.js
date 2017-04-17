
jest.unmock('../GenericMapperUtils');
jest.unmock('lodash');

const _ = require('lodash');

const GenericMapperUtils = require('../GenericMapperUtils');

describe('GenericMapperUtils', () => {
	describe('map', () => {
		const runTest = testCase => {
			it(`can map`, () => {
				const result = GenericMapperUtils.mapObject(testCase.source, testCase.schema, testCase.keyCase);
				expect(result).toEqual(testCase.target)
			})
		};

		const testCases = [{
			source: {
				userInfo: {
					firstName: 'John',
					lastName: 'Smith',
					dateOfBirth: '17-04-1981',
					gender: 'Male',
					addressLine: 'test street',
					postcode: 'eh2 5lg'
				}
			},
			target: {
				'user_info': {
					'first_name': 'John',
					'last_name': 'Smith',
					'dob': '17-04-1981',
					'gender': 'Male',
					'address_line': 'test street',
					'post_code': 'eh2 5lg',
				}
			},
			schema: {
				userInfo: {
					dateOfBirth: 'dob',
					postcode: 'post_code'
				}
			}
		}, {
			source: {
				'user_info': {
					'first_name': 'John',
					'last_name': 'Smith',
					'dob': '17-04-1981',
					'gender': 'Male',
					'address_line': 'test street',
					'post_code': 'eh2 5lg',
				}
			},
			target: {
				userInfo: {
					firstName: 'John',
					lastName: 'Smith',
					dateOfBirth: '17-04-1981',
					gender: 'Male',
					addressLine: 'test street',
					postcode: 'eh2 5lg'
				}
			},
			schema: {
				'user_info': {
					dob: 'dateOfBirth',
					'post_code': 'postcode'
				}
			},
			keyCase: _.camelCase
		}, {
			source: {
				'some_value': 1
			},
			target: {
				first: 1,
				third: 2
			},
			schema: {
				'some_value': {
					key: ['first', 'second'],
					first: {
						value: (value) => value
					},
					second: {
						key: 'third',
						value: value => value + 1
					}
				}
			},
			keyCase: _.camelCase
		}];

		testCases.forEach(runTest);
	});
});
