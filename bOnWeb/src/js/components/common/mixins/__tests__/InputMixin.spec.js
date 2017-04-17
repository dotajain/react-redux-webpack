
jest.unmock('../InputMixin');
jest.unmock('../../../../utils/RegexUtils');
jest.unmock('../../../../config');

const React = require('react');
const _ = require('lodash');
const TestUtils = require('react-addons-test-utils');
const config = require('../../../../config');

const InputMixin = require('../InputMixin');
const ValidationStore = require('../../../../stores/ValidationStore');

let instance;

describe('InputMixin', () => {
	beforeEach(() => {
		config.testRegex = /[A-Za-z]+/i;
		instance = _.assign({props: {}}, InputMixin);
	});

	afterEach(() => {
		delete config.testRegex;
	});

	describe('WHEN isPresent', () => {
		it('is a valid string', () => {
			expect(instance.isPresent('test')).toBeTruthy();
		});

		it('is a valid integer', () => {
			expect(instance.isPresent(12)).toBeTruthy();
		});

		it('is 0 and valid integer', () => {
			expect(instance.isPresent(0)).toBeTruthy();
		});

		it('is undefined and invalid', () => {
			expect(instance.isPresent()).not.toBeTruthy();
		});

		it('is null and invalid', () => {
			expect(instance.isPresent(null)).not.toBeTruthy();
		});

	});

	describe('WHEN isValidType()', () => {
		it('is a valid currency integer', () => {
			expect(instance.isValidType(12, 'currency')).toBeTruthy();
		});

		it('is a valid currency string', () => {
			expect(instance.isValidType('12', 'currency')).toBeTruthy();
		});

		it('is a invalid currency', () => {
			expect(instance.isValidType('12a', 'currency')).not.toBeTruthy();
		});
	});

	describe('WHEN isOverLength', () => {
		it('is a valid string', () => {
			expect(instance.isOverLength('aaa', 2)).toBeTruthy();
		});

		it('is a invalid string', () => {
			expect(instance.isOverLength('a', 2)).not.toBeTruthy();
		});

		it('is a valid integer', () => {
			expect(instance.isOverLength(12, 2)).toBeTruthy();
		});

		it('is a valid integer of zero', () => {
			expect(instance.isOverLength(0, 1)).toBeTruthy();
		});

		it('is a invalid integer', () => {
			expect(instance.isOverLength(1, 2)).not.toBeTruthy();
		});
	});

	describe('WHEN isUnderLength', () => {
		it('is a valid string', () => {
			expect(instance.isUnderLength('123', 3)).toBeTruthy();
		});

		it('is a invalid string', () => {
			expect(instance.isUnderLength('1234', 3)).not.toBeTruthy();
		});

		it('is a valid integer', () => {
			expect(instance.isUnderLength(12, 2)).toBeTruthy();
		});

		it('is a valid integer of zero', () => {
			expect(instance.isUnderLength(0, 1)).toBeTruthy();
		});

		it('is a invalid integer', () => {
			expect(instance.isUnderLength(123, 2)).not.toBeTruthy();
		});
	});

	describe('isValidType', () => {
		it('allows null values on optional fields', () => {
			instance.props.required = false;
			expect(instance.isValidType(undefined, 'alphanumeric')).toBeTruthy();
		});

		it('does not allow null values on required fields', () => {
			instance.props.required = true;
			expect(instance.isValidType(undefined, 'testRegex')).not.toBeTruthy();
		});
	});

	describe('ClassName', () => {
		const executeTest = (testCase) => {
			it(testCase.desc, () => {
				ValidationStore[testCase.methods[0].name].mockReturnValue(testCase.methods[0].retVal);
				ValidationStore[testCase.methods[1].name].mockReturnValue(testCase.methods[1].retVal);
				expect(instance.className('foo')).toMatch(testCase.expected);
			});
		};

		const testCases = [{
			desc: 'append error class to ClassName on invalid data',
			methods: [{
				name: 'isInvalid',
				retVal: true,
			},
			{
				name: 'isEnabled',
				retVal: false,
			},
			],
			expected: 'error',
		},
		{
			desc: 'append complete class to ClassName on isEnabled',
			methods: [{
				name: 'isInvalid',
				retVal: false,
			},
			{
				name: 'isEnabled',
				retVal: true,
			},
			],
			expected: 'complete',
		},
		{
			desc: 'should return classname without appending any class',
			methods: [{
				name: 'isInvalid',
				retVal: false,
			},
			{
				name: 'isEnabled',
				retVal: false,
			},
			],
			expected: '',
		}];

		testCases.forEach(executeTest);
	});
});
