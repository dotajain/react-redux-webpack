jest.unmock('../index');
jest.unmock('../ApiVersions');
jest.unmock('../FormOptions');
jest.unmock('../TaskUrls');
jest.unmock('../Analytics');
jest.unmock('../General');

const config = require('../');
const { apiStringFieldMaxLength, apiVersions} = require('../ApiVersions');
const {
	formOptionsIncomeOtherPaymentType,
	formOptionsAccountPurpose,
	formOptionsResidentialStatus,
	formOptionsMaritalStatus,
	formOptionsEmploymentStatus,
	formOptionsOccupation,
	formOptionsPreferredContactMethod,
	formOptionsOtherIncomeFrequency,
	formOptionsSavingsFrequency,
	validTitles,
	existingCustomerReadOnlyFields
} = require('../FormOptions');
const taskUrls = require('../TaskUrls');
const analytics = require('../Analytics');
const general = require('../General');
const _ = require('lodash');

describe('given a config', () => {

	const runTest = testCase => {
		it(`should have ${testCase.type}`, () => {
			expect(testCase.actual).toEqual(testCase.expected);
		});
	};

	describe('that is valid', () => {

		const testCases = [{
			type: 'apiStringFieldMaxLength',
			actual: config.apiStringFieldMaxLength,
			expected: apiStringFieldMaxLength
		}, {
			type: 'apiVersions',
			actual: config.apiVersions,
			expected: apiVersions
		}, {
			type: 'formOptionsIncomeOtherPaymentType',
			actual: config.formOptionsIncomeOtherPaymentType,
			expected: formOptionsIncomeOtherPaymentType
		}, {
			type: 'formOptionsAccountPurpose',
			actual: config.formOptionsAccountPurpose,
			expected: formOptionsAccountPurpose
		}, {
			type: 'formOptionsResidentialStatus',
			actual: config.formOptionsResidentialStatus,
			expected: formOptionsResidentialStatus
		}, {
			type: 'formOptionsMaritalStatus',
			actual: config.formOptionsMaritalStatus,
			expected: formOptionsMaritalStatus
		}, {
			type: 'formOptionsEmploymentStatus',
			actual: config.formOptionsEmploymentStatus,
			expected: formOptionsEmploymentStatus
		}, {
			type: 'formOptionsOccupation',
			actual: config.formOptionsOccupation,
			expected: formOptionsOccupation
		}, {
			type: 'formOptionsPreferredContactMethod',
			actual: config.formOptionsPreferredContactMethod,
			expected: formOptionsPreferredContactMethod
		}, {
			type: 'formOptionsOtherIncomeFrequency',
			actual: config.formOptionsOtherIncomeFrequency,
			expected: formOptionsOtherIncomeFrequency
		}, {
			type: 'formOptionsSavingsFrequency',
			actual: config.formOptionsSavingsFrequency,
			expected: formOptionsSavingsFrequency
		}, {
			type: 'taskUrls',
			actual: config.taskUrls,
			expected: taskUrls
		}, {
			type: 'validTitles',
			actual: config.validTitles,
			expected: validTitles
		}, {
			type: 'analytics',
			actual: config.analytics,
			expected: analytics
		}, {
			type: 'existingCustomerReadOnlyFields',
			actual: config.existingCustomerReadOnlyFields,
			expected: existingCustomerReadOnlyFields
		}].concat(_.map(Object.getOwnPropertyNames(general), (entry) => {
			return {
				type: entry,
				actual: config[entry],
				expected: general[entry]
			};
		}));

		testCases.forEach(runTest);
	});
});
