

jest.unmock('../MappingUtils');
jest.unmock('../RegexUtils');
jest.unmock('../GenericMapperUtils');
jest.unmock('../Transformers/FinancialDetails');
jest.unmock('../../config');
jest.unmock('./data');

const _ = require('lodash');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const MappingUtils = require('../MappingUtils');
const UrlUtils = require('../UrlUtils');

// Mocks
const AccountOpeningDataStore = require('../../stores/AccountOpeningDataStore');
const AccountOpeningContentStore = require('../../stores/AccountOpeningContentStore');
const CustomerStore = require('../../stores/CustomerStore');

let customerIdSpy;
let customerData;
let result;

describe('MappingUtils', () => {

	describe('mapGetEnquiry', () => {

		beforeEach(() => {
			customerData = {'id': null, 'customer_number':'1097143044', 'personal_details': {'name':{'title':'MRS', 'first_name':'JENNIFER', 'middle_name':null,'last_name':'STORK'}, 'sex':'F', 'dob':'19601105', 'country_of_birth':'Scotland', 'marital_status':null,'nationality':'British', 'number_of_dependents':null,'country_of_residence':'UNITED KINGDOM', 'ni_number':null,'addresses':[{'uk_address':{'flat_number':null,'house_number':'1', 'street':'CALLSCREEN LANE', 'address_line1':null,'address_line2':null,'address_line3':null,'address_line4':null,'county':null,'city':'TEST TOWN', 'postal_code':'X9 9RB'}, 'status':'N', 'residential_status':'OWNER', 'effective_period':{'to':null,'from':'2010-02-02'}, 'bfpo_address':null,'international_address':null},{'uk_address':{'flat_number':null,'house_number':'39', 'street':'GLOBAL GARDENS', 'address_line1':'39 GLOBAL GARDENS', 'address_line2':'PLANET PARK', 'address_line3':'Meta', 'address_line4':null,'county':null,'city':'TEST TOWN', 'postal_code':'X9 9LG'}, 'status':null,'residential_status':'H', 'effective_period':{'to':null,'from':'2008-05-05'}, 'bfpo_address':null,'international_address':null}]}, 'contact_details':{'email':'JENNY.STORK@DYBAPPLICATIONS.CO.UK', 'preferred_contact_type':'SMS', 'marketing_preferences':{'phone':'Y', 'email':'Y', 'sms':'Y', 'mail':'Y'}, 'phone':{'home':null,'mobile':'07825010634'}}, 'employment_details':[{'status':'FULL TIME', 'description':'', 'employer':{'name':'DELOITTE'}, 'effective_period':{'to':null,'from':'2010-02-01'}, 'category':'PROFESSIONAL WITH DEGREE'}],'financial_details':{'income':{'gross_annual':'0', 'regular':{'net_amount':'2400', 'frequency':'MONTHLY', 'input_type':null}, 'additional':{'net_amount':'550', 'frequency':'FORTNIGHTLY', 'input_type':'OTHER'}}, 'expenditure':{'mortgage':650,'other':350}, 'tax':{'countries_of_citizenship':['United Kingdom'],'identification_info':[{'country_of_residency':'France', 'missing_number_reason':'NOT ISSUED', 'status':'Active', 'number':'IO902174B'}],'uk_taxpayer_only':false,'uk_citizen':true}}};
			result = MappingUtils.mapGetEnquiry(customerData);
		});

		it('returns a formatted JSON object', () => {
			let requiredKeys = ['customerNumber', 'gender', 'middleName', 'addresses', 'residentialStatus', 'phoneNumber', 'emailAddress', 'emailAddressConfirmation', 'contactMethods', 'preferredContactMethod', 'employmentStatus', 'employmentOccupation', 'dateOfBirth', 'employmentStartDate', 'employerName', 'nationality', 'cityBorn', 'countryBorn', 'ukCitizen', 'hasAdditionalCitizenships', 'citizenshipList', 'hasNoTaxOligations', 'taxObligationList', 'maritalStatus', 'allTaxObligationsListed', 'grossAnnualIncome', 'netMonthlyIncome', 'hasAdditionalIncome', 'incomeOtherAmount', 'mortgageOrRentExpenditure', 'expenditureOther', 'hasDependants', 'dependants', 'title', 'firstName', 'lastName', 'hasMiddleName'];
			let listOfKeys = [];

			expect(result).toBeDefined();
			expect(result).toEqual(jasmine.any(Array));
			result.forEach((el) => {
				expect(el.key).toBeDefined();
				expect(el).toEqual(jasmine.any(Object));
			});
		});

		it('removes null and undefined values', () => {
			let allPossibleKeys = ['customerNumber', 'gender', 'middleName', 'addresses', 'residentialStatus', 'phoneNumber', 'emailAddress', 'emailAddressConfirmation', 'contactMethods', 'preferredContactMethod', 'employmentStatus', 'employmentOccupation', 'dateOfBirth', 'employmentStartDate', 'employerName', 'nationality', 'cityBorn', 'countryBorn', 'ukCitizen', 'hasAdditionalCitizenships', 'citizenshipList', 'hasNoTaxOligations', 'taxObligationList', 'maritalStatus', 'allTaxObligationsListed', 'grossAnnualIncome', 'netMonthlyIncome', 'hasAdditionalIncome', 'incomeOtherAmount', 'mortgageOrRentExpenditure', 'expenditureOther', 'hasDependants', 'dependants', 'title', 'firstName', 'lastName', 'hasMiddleName'];
			let listOfKeys = [];

			expect(result).toBeDefined();
			result.forEach((el) => {
				expect(el.key).toBeDefined();
				listOfKeys.push(el.key);
			});

			expect(_.difference(allPossibleKeys, listOfKeys).length).toBe(9);
		});

		it('when residential status is valid', () => {
			let validPersonalDetails = {
				"name": {
					"title":"MRS",
					"first_name":"JENNIFER",
					"middle_name":null,
					"last_name":"STORK"
				},
				"sex":"F",
				"dob":"19810324",
				"country_of_birth":"UK",
				"marital_status":"SINGLE",
				"nationality":"United Kingdom",
				"number_of_dependents":null,
				"city_of_birth":"London",
				"country_of_residence":"UNITED KINGDOM",
				"ni_number":null,
				"residential_status":"OWNER",
			};
			customerData.personal_details = validPersonalDetails;
			result = MappingUtils.mapGetEnquiry(customerData);

			var detailsData = _.find(result, {key: 'residentialStatus'});
			expect(detailsData.value).toEqual('OWNER');
		});

		it('when residential status is invalid', () => {
			let invalidPersonalDetails = {
				"name": {
					"title":"MRS",
					"first_name":"JENNIFER",
					"middle_name":null,
					"last_name":"STORK"
				},
				"sex":"F",
				"dob":"19810324",
				"country_of_birth":"UK",
				"marital_status":"SINGLE",
				"nationality":"United Kingdom",
				"number_of_dependents":null,
				"city_of_birth":"London",
				"country_of_residence":"UNITED KINGDOM",
				"ni_number":null,
				"residential_status":"OTHER",
			};

			customerData.personal_details = invalidPersonalDetails;
			result = MappingUtils.mapGetEnquiry(customerData);

			var detailsData = _.find(result, {key: 'residentialStatus'});
			expect(detailsData.value).toEqual('');
		});
	});

	describe('mapGetEnquiry with Â£0', () => {
		const testCases = [{
			property: 'mortgageOrRentExpenditure',
			modifier: data => data['financial_details'].expenditure.mortgage.net_amount = 0,
			expected: 0
		}, {
			property: 'expenditureOther',
			modifier: data => data['financial_details'].expenditure.others.net_amount = 0,
			expected: 0
		}, {
			property: 'netMonthlyIncome',
			modifier: data => data['financial_details'].income.regular.net_amount = 0,
			expected: 0
		}, {
			property: 'incomeOtherAmount',
			modifier: data => data['financial_details'].income.additional.net_amount = 0,
			expected: 0
		}, {
			property: 'incomeOtherSavingsAmount',
			modifier: data => data['account_usage_info'][0]['funds_info'].amount = 0, // NOTE: This could fail if this array is modified
			expected: 0
		}
		];

		_.forEach(testCases, testCase => {
			it(`should set ${testCase.property} to ${testCase.expected}`, () => {
				let data = require('./data');

				testCase.modifier(data);

				let result = MappingUtils.mapGetEnquiry(data);

				expect(_.find(result, {key: testCase.property }).value).toBe(testCase.expected);
			});

		});
	});

	describe('mapPostEnquiry', () => {

		beforeEach(() => {

			customerIdSpy = spyOn(MappingUtils, '_getCustomerId');
			AccountOpeningDataStore.getValue.mockImplementation((key) => {
				if (key === 'isExistingCustomer') {
					return 'Yes';
				}

				let selectedKeys = [
					{'isExistingCustomer': 'Yes'},
					{'grossAnnualIncome' : '123'},
					{'netMonthlyIncome':'123'},
					{'incomeOtherAmount': '123'},
					{'incomeOtherSavingsAmount': '123'},
					{'incomeOtherPaymentAmount': '0'},
					{'mortgageOrRentExpenditure': '432.00'},
					{'otherExpenditure': '432.00'},
				];

				return key && key.indexOf(selectedKeys) > -1 ? selectedKeys.key : key;
			});

			AccountOpeningDataStore.getAll = () => ({
				grossAnnualIncome: '123',
				netMonthlyIncome:'123',
				incomeOtherAmount: '123',
				incomeOtherSavingsAmount: '123',
				incomeOtherPaymentAmount: '0',
				mortgageOrRentExpenditure: '432.00',
				expenditureOther: '432.00',
				completedTasks: { 'WEB-EMPLOYMENT-DETAILS': true },
				product: { productType: { name: 'current' } },
			});

			CustomerStore.getValue.mockImplementation((key) => ({ key }));
			let content = {
				tariffDocLinkText: 'Tariff details',
				tariffDocLinkTitle: 'Download Tariff Details PDF. This link will open in a new browser window.',
				tariffDocLink: 'static/{}/{type}-account-tariff.pdf',
				tariffDocFileName: '{type}-account-tariff.pdf',
				tariffDocVersion: '04b16',
			}

			result = MappingUtils.mapPostEnquiry(AccountOpeningDataStore, content);
		});

		it('returns a formatted JSON object for existing user', () => {

			expect(result.product).toBeDefined();

			expect(result.applicants).toBeDefined();
			expect(result.applicants.length).toBeGreaterThan(0);

			let audit = result['audit_info'];
			expect(audit).toBeDefined();
			expect(audit['eligibility_questions']).toBeDefined();
			expect(audit['documents']).toBeDefined();

			expect(customerIdSpy).toHaveBeenCalled();
		});

		it('returns an Integer for netMonthlyIncome', () => {
			expect(result.applicants[0].financial_details.income.regular.net_amount).toEqual(jasmine.any(Number));
		});

		it('returns an Integer for incomeOtherAmount ', () => {
			expect(result.applicants[0].financial_details.income.additional.net_amount).toEqual(jasmine.any(Number));
		});

		it('returns an Integer for mortgageOrRentExpenditure', () => {
			expect(result.applicants[0].financial_details.expenditure.mortgage.net_amount).toEqual(jasmine.any(Number));
		});

		it('returns an Integer for otherExpenditure', () => {
			expect(result.applicants[0].financial_details.expenditure.others.net_amount).toEqual(jasmine.any(Number));
		});

		describe('_getDocuments', () => {
			it('should map account type to tariff document name', () => {
				const tariffDoc = result['audit_info'].documents[2];
				expect(tariffDoc.name).toEqual('current-account-tariff.pdf');
			});
		});

		describe('employment', () => {
			it('does not return an object when undefined', () => {
				AccountOpeningDataStore.getValue.mockImplementation((key) => {
					let selectedKeys = [
						'employerName',
						'employmentStartDate',
						'employmentStartDate',
						'employmentOccupation',
						'employmentStatus',
					];

					return key && selectedKeys.indexOf(key) > -1 ? undefined : key;
				});

				result = MappingUtils.mapPostEnquiry(AccountOpeningDataStore, AccountOpeningContentStore);

				expect(result.applicants[0]["employment_details"]).toBeUndefined();
			});

			it('returns an object when set', () => {
				expect(result.applicants[0]["employment_details"]).toEqual([{
					status: 'employmentStatus',
					description: 'employmentOccupation',
					employer: {
						name: 'employerName'
					},
					effective_period: {},
				}]);
			});

		})
	});
});
