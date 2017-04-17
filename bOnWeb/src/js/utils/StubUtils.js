/* eslint no-console: 0*/
/**
 * @class StubUtils
 */

const _ = require('lodash');
const envConfig = require('../../static/config');

const AccountOpeningActions = require('../actions/AccountOpeningActions');

const UrlUtils = require('./UrlUtils');

const localNumber = localStorage.getItem('stubMobileNumber');
const localEmail = localStorage.getItem('stubEmail');

const getStubName = _.once(() => UrlUtils.getParam('stub') || localStorage.getItem('stubName'));
const getProductCode = _.memoize(productCode => !productCode && localStorage.getItem('productCode') || productCode);
const isExisting = _.once(() => UrlUtils.getParam('isExisting'));
const clearUsername = _.once(() => UrlUtils.getParam('clearUsername'));
const getUpdate = _.once(() => {
	const updates = UrlUtils.getParam('updates');
	if (!updates) {
		return;
	}

	const updatePairs = updates
		.split('|')
		.map(i => {
			const [key, value] = i.split(',');
			return {
				key, value,
			};
		});

	return updatePairs;
});

const StubUtils = {
	additional: [
		_.once(() => isExisting() && AccountOpeningActions.updateFormValue('isExistingCustomer', 'Yes')),
		_.once(() => !clearUsername() && AccountOpeningActions.updateFormValue('username', new Date().getTime().toString())),
		_.once(() => (updates => updates && AccountOpeningActions.updateFormValues(updates))(getUpdate())),
	],

	/**
	 * Apply stub based off url param.
	 *
	 * @param  {string} productCode
	 */
	applyStub(productCode) {
		if (UrlUtils.getParam('clear')) {
			this.clear();
		}

		const stubName = getStubName();
		const productCodeValue = getProductCode(productCode);

		const stub = stubData[stubName];

		if (!envConfig.enableWindowStubs || !productCodeValue || !stubName || !stub) {
			return;
		}

		if (UrlUtils.getParam('commit')) {
			this.commit(stubName, productCodeValue);
		}

		if (!localNumber || !localEmail) {
			console.warn(['Please enter *your* email & mobile number for OTPs using: ',
						'localStorage.setItem("stubMobileNumber", "YOUR-NUMBER"); ',
						'or localStorage.setItem("stubEmail", "YOUR-EMAIL");']);
		}

		console.log(`applying ${stubName}!`);
		stub.product.code = _.escape(productCodeValue.replace('IM', ''));
		AccountOpeningActions.setProductCode(productCodeValue);
		this.updateStub();

		_.flow(this.additional)();
	},

	updateStub() {
		const stub = stubData[getStubName()].values;

		if (!stub) {
			return;
		}

		this.mapAndSend(stub, localNumber, localEmail);
	},

	commit(stubName, productCode) {
		localStorage.setItem('stubName', stubName);
		localStorage.setItem('productCode', productCode);
	},

	clear() {
		localStorage.removeItem('stubName');
		localStorage.removeItem('productCode');
	},

	/**
	* Apply stub object.
	*
	* @param  {Object} data stub data object mapper
	*/
	mapAndSend(data) {
		AccountOpeningActions.updateFormValues(data);
	},

};

const password = 'TESTtest12!';

const stubData = {
	ben: {
		'product': {
			'code': '136',
		},
		values: [
			{ 'key': 'phoneNumber', 'value': localNumber },
			{ 'key': 'emailAddress', 'value': localEmail },
			{ 'key': 'emailAddressConfirmation', 'value': localEmail },
			{ 'key': 'contactMethods', 'value': [null, null, null, null] },
			{ 'key': 'preferredContactMethod', 'value': 'EMAIL' },
			{ 'key': 'gender', 'value': 'Male' },
			{ 'key': 'dateOfBirth', 'value': '24-03-1981' },
			{ 'key': 'maritalStatus', 'value': 'MARRIED / CIVIL PARTNERSHIP' },
			{ 'key': 'hasDependants', 'value': 'Yes' },
			{ 'key': 'dependants', 'value': '6' },
			{ 'key': 'title', 'value': 'MR' },
			{ 'key': 'firstName', 'value': 'Ben' },
			{ 'key': 'lastName', 'value': 'Avalon' },
			{ 'key': 'hasMiddleName', 'value': 'Yes' },
			{ 'key': 'middleName', 'value': 'test' },
			{ 'key': 'addresses', 'value': [{ 'addressType': 'domestic', 'id': 'X99BH-1', 'address_reference': 'X99BH-1', 'addressPrefix': 'FLAT 2/2', 'houseNumber': '1', 'addressLine1': 'FLAT 2/2, 1 BONDI BEACH ROAD', 'addressLine2': 'testlinetwo', 'streetName': 'BONDI BEACH ROAD', 'county': 'Stockton-on-tees', 'city': 'TEST TOWN', 'postcode': 'X9 9BH', 'dateMoved': '02-02-2010', 'isManual': false }] },
			{ 'key': 'residentialStatus', 'value': 'OWNER' },
			{ 'key': 'password1', 'value': password },
			{ 'key': 'password2', 'value': password },
			{ 'key': 'employmentStatus', 'value': 'FULL TIME' },
			{ 'key': 'employmentOccupation', 'value': 'ARMED FORCES' },
			{ 'key': 'employmentStartDate', 'value': '01-01-2010' },
			{ 'key': 'employerName', 'value': 'CYB' },
			{ 'key': 'nationality', 'value': 'United Kingdom' },
			{ 'key': 'cityBorn', 'value': 'Glasgow' },
			{ 'key': 'countryBorn', 'value': 'United Kingdom' },
			{ 'key': 'ukCitizen', 'value': 'Yes' },
			{ 'key': 'hasAdditionalCitizenships', 'value': 'Yes' },
			{ 'key': 'citizenshipList', 'value': ['Afghanistan'] },
			{ 'key': 'hasNoTaxOligations', 'value': 'No' },
			{ 'key': 'taxObligationList', 'value': [{ 'taxCountry': 'Afghanistan', 'hasTaxNumber': 'Yes', 'taxNumber': '1235' }] },
			{ 'key': 'allTaxObligationsListed', 'value': 'Yes' },
			{ 'key': 'netMonthlyIncome', 'value': '100' },
			{ 'key': 'grossAnnualIncome', 'value': '100000' },
			{ 'key': 'hasAdditionalIncome', 'value': 'Yes' },
			{ 'key': 'incomeOtherAmount', 'value': '1000' },
			{ 'key': 'incomeOtherFrequencyOptions', 'value': 'WEEKLY' },
			{ 'key': 'mortgageOrRentExpenditure', 'value': '1000' },
			{ 'key': 'expenditureOther', 'value': '100' },
			{ 'key': 'incomeOtherPaymentTypeOptions', 'value': 'EARNINGS DIRECT TO ACCOUNT' },
			{ 'key': 'incomeOtherPaymentAmount', 'value': '100' },
			{ 'key': 'incomeOtherAccountPurpose', 'value': 'ACCOUNT TO SERVICE REGULAR BILLS' },
			{ 'key': 'incomeOtherSavingsAmount', 'value': '100' },
			{ 'key': 'incomeOtherSavingsFrequency', 'value': 'WEEKLY' },
		],
	},
};


module.exports = StubUtils;
