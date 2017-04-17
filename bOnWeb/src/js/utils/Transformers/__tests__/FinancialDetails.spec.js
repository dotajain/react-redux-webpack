
'use strict';
jest.unmock('../FinancialDetails');
jest.unmock('../../RegexUtils');
jest.unmock('../../GenericMapperUtils');
jest.unmock('../../DateUtils');
jest.unmock('../../../config');

var _ = require('lodash');
var moment = require('moment');

var store = (() => {
	var map = {};

	return {
		map: {},
		getValue: key => map[key],
		setValue: (k, v) => map[k] = v,
		setValues: values => map = values,
		reset: () => map = {},
		getAll: () => map,
	}
})();

var FinancialDetailsTransformer = require('../FinancialDetails');

let yearsAgo = seed => moment().subtract(seed, 'years').format('DD-MM-YYYY')

describe('FinancialDetailsTransformer', () => {
	describe('toPost', () => {
		let runTest = testCase => {
			it(`should map ${testCase.should}`, () => {
				store.setValues(testCase.values);
				var result = FinancialDetailsTransformer.toPost(store.getAll(), testCase.productType)
				expect(result).toEqual(testCase.expected)
				store.reset();
			})
		};

		let testCases = [
			{
				should: 'completedTasks does not contain WEB-EMPLOYMENT-DETAILS',
				values: {
					completedTasks: {}
				},
				expected: null,
			}, {
				should: 'grossAnnualIncome 0 return 0',
				values: {
					grossAnnualIncome: 0,
					completedTasks: { 'WEB-EMPLOYMENT-DETAILS': true, }
				},
				expected: {
					income: {
						gross_annual: 0,
					},
				},
			}, {
				should: 'Full Income Details',
				values: {
					grossAnnualIncome: '100',
					netMonthlyIncome: '200',
					incomeOtherAmount: '300',
					incomeOtherFrequencyOptions: 'WEEKLY',
					completedTasks: { 'WEB-EMPLOYMENT-DETAILS': true, }
				},
				expected: {
					income: {
						gross_annual: 100.00,
						regular: {
							frequency: 'MONTHLY',
							input_type: 'NET MONTHLY INCOME',
							net_amount: 200
						},
						additional: {
							frequency: 'WEEKLY',
							input_type: 'OTHER',
							net_amount: 300
						},
					},
				}
			}, {
				should: 'Full Income Details with Full expenditure',
				values: {
					grossAnnualIncome: '100',
					netMonthlyIncome: '200',
					incomeOtherAmount: '300',
					incomeOtherFrequencyOptions: 'WEEKLY',

					mortgageOrRentExpenditure: '100',
					expenditureOther: '244',
					completedTasks: { 'WEB-EMPLOYMENT-DETAILS': true, }
				},
				expected: {
					income: {
						gross_annual: 100.00,
						regular: {
							frequency: 'MONTHLY',
							input_type: 'NET MONTHLY INCOME',
							net_amount: 200
						},
						additional: {
							frequency: 'WEEKLY',
							input_type: 'OTHER',
							net_amount: 300
						},
					},
					expenditure: {
						mortgage: {
							frequency: 'MONTHLY',
							net_amount: 100
						},
						others: {
							frequency: 'MONTHLY',
							net_amount: 244
						}
					}
				}
			}, {
				should: 'Full Income Details with Full expenditure and Full Tax',
				values: {
					grossAnnualIncome: '100',
					citizenshipList: ['UK'],
					hasNoTaxOligations: 'Yes',
					ukCitizen: 'Yes',
					taxObligationList: [{
						taxCountry: 'Panama',
						status: 'HIDDEN',
						taxNumber: '1234',
					}],
					grossAnnualIncome: '100',
					netMonthlyIncome: '200',
					incomeOtherAmount: '300',
					incomeOtherFrequencyOptions: 'WEEKLY',

					mortgageOrRentExpenditure: '100',
					expenditureOther: '244',
					completedTasks: { 'WEB-EMPLOYMENT-DETAILS': true, }
				},
				expected: {
					income: {
						gross_annual: 100.00,
					},
					tax: {
						countries_of_citizenship: ['UK'],
						uk_citizen: 'Y',
						uk_taxpayer_only: 'Y',
						identification_info: [{
							country_of_residency: 'Panama',
							missing_number_reason: 'NOT AVAILABLE',
							number: '1234',
							status: 'HIDDEN'
						}]
					},
					income: {
						gross_annual: 100.00,
						regular: {
							frequency: 'MONTHLY',
							input_type: 'NET MONTHLY INCOME',
							net_amount: 200
						},
						additional: {
							frequency: 'WEEKLY',
							input_type: 'OTHER',
							net_amount: 300
						},
					},
					expenditure: {
						mortgage: {
							frequency: 'MONTHLY',
							net_amount: 100
						},
						others: {
							frequency: 'MONTHLY',
							net_amount: 244
						}
					}
				}
			}, {
				should: 'Savings - Full Tax',
				productType: 'savings',
				values: {
					grossAnnualIncome: '100',
					citizenshipList: ['UK'],
					hasNoTaxOligations: 'Yes',
					ukCitizen: 'Yes',
					taxObligationList: [{
						taxCountry: 'Panama',
						status: 'HIDDEN',
						taxNumber: '1234',
					}],
					completedTasks: { 'WEB-EMPLOYMENT-DETAILS': true, }
				},
				expected: {
					tax: {
						countries_of_citizenship: ['UK'],
						uk_citizen: 'Y',
						uk_taxpayer_only: 'Y',
						identification_info: [{
							country_of_residency: 'Panama',
							missing_number_reason: 'NOT AVAILABLE',
							number: '1234',
							status: 'HIDDEN'
						}]
					},
				}
			}
		];

		testCases.forEach(runTest);
	});

	describe('fromGet', () => {
		let runTest = testCase => {
			it(`should map ${testCase.should}`, () => {
				store.setValues(testCase.values);
				var result = FinancialDetailsTransformer.fromGet(store.getAll(), testCase.productType)
				expect(result).toEqual(testCase.expected)
				store.reset();
			})
		};

		let testCases = [{
			should: 'uk_citizen \'true\'',
			values: { tax: {
				uk_citizen: 'true',
			}},
			expected: {
				ukCitizen: 'Yes',
				allTaxObligationsListed: 'Yes',
			},
		},{
			should: 'uk_citizen \'Y\'',
			values: { tax: {
				uk_citizen: 'Y',
			}},
			expected: {
				ukCitizen: 'Yes',
				allTaxObligationsListed: 'Yes',
			},
		}, {
			should: 'uk_citizen \'N\'',
			values: { tax: {
				uk_citizen: 'N',
			}},
			expected: {
				ukCitizen: 'No',
				allTaxObligationsListed: 'Yes',
			},
		}, {
			should: 'uk_citizen \'false\'',
			values: { tax: {
				uk_citizen: 'false',
			}},
			expected: {
				ukCitizen: 'No',
				allTaxObligationsListed: 'Yes',
			},
		}, {
			should: 'uk_citizen true',
			values: { tax: {
				uk_citizen: true,
			}},
			expected: {
				ukCitizen: 'Yes',
				allTaxObligationsListed: 'Yes',
			},
		}, {
			should: 'uk_citizen false',
			values: { tax: {
				uk_citizen: false,
			}},
			expected: {
				ukCitizen: 'No',
				allTaxObligationsListed: 'Yes',
			},
		}, {
			should: 'countries_of_citizenship null',
			values: { tax: {
				countries_of_citizenship: null,
			}},
			expected: {
				hasAdditionalCitizenships: 'No',
				citizenshipList: null,
				allTaxObligationsListed: 'Yes',
			}
		}, {
			should: 'countries_of_citizenship has 1 value',
			values: { tax: {
				countries_of_citizenship: ['UK'],
			}},
			expected: {
				hasAdditionalCitizenships: 'Yes',
				citizenshipList: ['UK'],
				allTaxObligationsListed: 'Yes',
			}
		}, {
			should: 'countries_of_citizenship has 2 values',
			values: { tax: {
				countries_of_citizenship: ['UK', 'GER'],
			}},
			expected: {
				hasAdditionalCitizenships: 'Yes',
				citizenshipList: ['UK', 'GER'],
				allTaxObligationsListed: 'Yes',
			}
		}, {
			should: 'countries_of_citizenship has 0 values',
			values: { tax: {
				countries_of_citizenship: [],
			}},
			expected: {
				hasAdditionalCitizenships: 'No',
				citizenshipList: [],
				allTaxObligationsListed: 'Yes',
			}
		}, {
			should: 'uk_taxpayer_only \'true\'',
			values: { tax: {
				uk_taxpayer_only: 'true',
			}},
			expected: {
				hasNoTaxOligations: 'Yes',
				allTaxObligationsListed: 'Yes',
			},
		}, {
			should: 'uk_taxpayer_only \'false\'',
			values: { tax: {
				uk_taxpayer_only: 'false',
			}},
			expected: {
				hasNoTaxOligations: 'No',
				allTaxObligationsListed: 'Yes',
			},
		}, {
			should: 'uk_taxpayer_only true',
			values: { tax: {
				uk_taxpayer_only: true,
			}},
			expected: {
				hasNoTaxOligations: 'Yes',
				allTaxObligationsListed: 'Yes',
			},
		}, {
			should: 'uk_taxpayer_only false',
			values: { tax: {
				uk_taxpayer_only: false,
			}},
			expected: {
				hasNoTaxOligations: 'No',
				allTaxObligationsListed: 'Yes',
			},
		}, {
			should: 'identification_info',
			values: { tax: {
				identification_info: [
					{
						country_of_tax_residence: 'UK',
						taxpayer_identification_number: '1223',
						status: 'status',
					}
				]
			}},
			expected: {
				allTaxObligationsListed: 'Yes',
				taxObligationList: [{
					taxCountry: 'UK',
					taxNumber: '1223',
					status: 'STATUS',
					hasTaxNumber: 'Yes',
				}]
			}
		}, {
			should: 'identification_info - country_of_residency',
			values: { tax: {
				identification_info: [
					{
						country_of_residency: 'UK',
						taxpayer_identification_number: '1223',
						status: 'status',
					}
				]
			}},
			expected: {
				allTaxObligationsListed: 'Yes',
				taxObligationList: [{
					taxCountry: 'UK',
					taxNumber: '1223',
					status: 'STATUS',
					hasTaxNumber: 'Yes',
				}]
			}
		}, {
			should: 'identification_info - null taxpayer_identification_number',
			values: { tax: {
				identification_info: [
					{
						country_of_residency: 'UK',
						taxpayer_identification_number: null,
						status: 'status',
					}
				]
			}},
			expected: {
				allTaxObligationsListed: 'Yes',
				taxObligationList: [{
					taxCountry: 'UK',
					taxNumber: null,
					hasTaxNumber: 'No',
					status: 'STATUS',
				}]
			}
		},

		{
			should: 'income',
			values: {
				income: {
					gross_annual: '1234',
					regular: {
						net_amount: '1234',
					},
					additional: {
						net_amount: '123',
						frequency: 'monthly',
					},
				},
				expenditure: {
					mortgage: {
						net_amount: '1234',
					},
					other: {
						net_amount: '1234'
					}
				}
			},
			expected: {
				grossAnnualIncome: '1234',
				netMonthlyIncome: '1234',
				hasAdditionalIncome: 'Yes',
				incomeOtherAmount: '123',
				incomeOtherFrequencyOptions: 'MONTHLY',
				mortgageOrRentExpenditure: '1234',
				expenditureOther: '1234',
			}
		},
		// Savings
		{
			should: 'savings - uk_citizen \'true\'',
			productType: 'savings',
			values: { tax: {
				uk_citizen: 'true',
			}},
			expected: {
				ukCitizen: 'Yes',
				allTaxObligationsListed: 'Yes',
			},
		},{
			should: 'savings - uk_citizen \'Y\'',
			productType: 'savings',
			values: { tax: {
				uk_citizen: 'Y',
			}},
			expected: {
				ukCitizen: 'Yes',
				allTaxObligationsListed: 'Yes',
			},
		}, {
			should: 'savings - uk_citizen \'N\'',
			productType: 'savings',
			values: { tax: {
				uk_citizen: 'N',
			}},
			expected: {
				ukCitizen: 'No',
				allTaxObligationsListed: 'Yes',
			},
		}, {
			should: 'savings - uk_citizen \'false\'',
			productType: 'savings',
			values: { tax: {
				uk_citizen: 'false',
			}},
			expected: {
				ukCitizen: 'No',
				allTaxObligationsListed: 'Yes',
			},
		}, {
			should: 'savings - uk_citizen true',
			productType: 'savings',
			values: { tax: {
				uk_citizen: true,
			}},
			expected: {
				ukCitizen: 'Yes',
				allTaxObligationsListed: 'Yes',
			},
		}, {
			should: 'savings - uk_citizen false',
			productType: 'savings',
			values: { tax: {
				uk_citizen: false,
			}},
			expected: {
				ukCitizen: 'No',
				allTaxObligationsListed: 'Yes',
			},
		}, {
			should: 'savings - countries_of_citizenship null',
			productType: 'savings',
			values: { tax: {
				countries_of_citizenship: null,
			}},
			expected: {
				hasAdditionalCitizenships: 'No',
				citizenshipList: null,
				allTaxObligationsListed: 'Yes',
			}
		}, {
			should: 'savings - countries_of_citizenship has 1 value',
			productType: 'savings',
			values: { tax: {
				countries_of_citizenship: ['UK'],
			}},
			expected: {
				hasAdditionalCitizenships: 'Yes',
				citizenshipList: ['UK'],
				allTaxObligationsListed: 'Yes',
			}
		}, {
			should: 'savings - countries_of_citizenship has 2 values',
			productType: 'savings',
			values: { tax: {
				countries_of_citizenship: ['UK', 'GER'],
			}},
			expected: {
				hasAdditionalCitizenships: 'Yes',
				citizenshipList: ['UK', 'GER'],
				allTaxObligationsListed: 'Yes',
			}
		}, {
			should: 'savings - countries_of_citizenship has 0 values',
			productType: 'savings',
			values: { tax: {
				countries_of_citizenship: [],
			}},
			expected: {
				hasAdditionalCitizenships: 'No',
				citizenshipList: [],
				allTaxObligationsListed: 'Yes',
			}
		}, {
			should: 'savings - uk_taxpayer_only \'true\'',
			productType: 'savings',
			values: { tax: {
				uk_taxpayer_only: 'true',
			}},
			expected: {
				hasNoTaxOligations: 'Yes',
				allTaxObligationsListed: 'Yes',
			},
		}, {
			should: 'savings - uk_taxpayer_only \'false\'',
			productType: 'savings',
			values: { tax: {
				uk_taxpayer_only: 'false',
			}},
			expected: {
				hasNoTaxOligations: 'No',
				allTaxObligationsListed: 'Yes',
			},
		}, {
			should: 'savings - uk_taxpayer_only true',
			productType: 'savings',
			values: { tax: {
				uk_taxpayer_only: true,
			}},
			expected: {
				hasNoTaxOligations: 'Yes',
				allTaxObligationsListed: 'Yes',
			},
		}, {
			should: 'savings - uk_taxpayer_only false',
			productType: 'savings',
			values: { tax: {
				uk_taxpayer_only: false,
			}},
			expected: {
				hasNoTaxOligations: 'No',
				allTaxObligationsListed: 'Yes',
			},
		}, {
			should: 'savings - identification_info',
			productType: 'savings',
			values: { tax: {
				identification_info: [
					{
						country_of_tax_residence: 'UK',
						taxpayer_identification_number: '1223',
						status: 'status',
					}
				]
			}},
			expected: {
				allTaxObligationsListed: 'Yes',
				taxObligationList: [{
					taxCountry: 'UK',
					taxNumber: '1223',
					status: 'STATUS',
					hasTaxNumber: 'Yes',
				}]
			}
		}, {
			should: 'savings - identification_info - country_of_residency',
			productType: 'savings',
			values: { tax: {
				identification_info: [
					{
						country_of_residency: 'UK',
						taxpayer_identification_number: '1223',
						status: 'status',
					}
				]
			}},
			expected: {
				allTaxObligationsListed: 'Yes',
				taxObligationList: [{
					taxCountry: 'UK',
					taxNumber: '1223',
					status: 'STATUS',
					hasTaxNumber: 'Yes',
				}]
			}
		}, {
			should: 'savings - identification_info - null taxpayer_identification_number',
			productType: 'savings',
			values: { tax: {
				identification_info: [
					{
						country_of_residency: 'UK',
						taxpayer_identification_number: null,
						status: 'status',
					}
				]
			}},
			expected: {
				allTaxObligationsListed: 'Yes',
				taxObligationList: [{
					taxCountry: 'UK',
					taxNumber: null,
					hasTaxNumber: 'No',
					status: 'STATUS',
				}]
			}
		},

		{
			should: 'savings - income',
			productType: 'savings',
			values: {
				income: {
					gross_annual: '1234',
					regular: {
						net_amount: '1234',
					},
					additional: {
						net_amount: '123',
						frequency: 'monthly',
					},
				},
				expenditure: {
					mortgage: {
						net_amount: '1234',
					},
					other: {
						net_amount: '1234'
					}
				}
			},
			expected: {
			}
		}];

		testCases.forEach(runTest);
	})
});
