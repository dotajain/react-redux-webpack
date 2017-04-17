const _ = require('lodash');

const GenericMapper = require('../GenericMapperUtils');

const filterNulls = _.partialRight(_.pickBy, v => _.isNumber(v) || v);

const boolMap = v => {
	const map = {
		Yes: 'Y',
		No: 'N',
	};
	return map[v];
};

const create = o => filterNulls(o);

const getIdentificationInfo = taxObligationList => {
		return taxObligationList && _.map(taxObligationList, item => {
			const { status, taxNumber: number, taxCountry: countryOfResidency } = item;
			return {
				countryOfResidency,
				missingNumberReason: 'NOT AVAILABLE', // wut??
				status,
				number,
			};
		});
	};

const currentToPost = data => {
	const getFinancialObject = (inputType, amount, frequency) => {
		if (!_.isNumber(amount) && !_.isString(amount)) {
			return null;
		}

		const frequencyValue = (frequency || 'MONTHLY').toUpperCase();

		return filterNulls({
			netAmount: parseInt(amount, 10),
			frequency: frequencyValue,
			inputType,
		});
	};

	const {
		grossAnnualIncome: grossAnnual,
		citizenshipList: countriesOfCitizenship,
		taxObligationList,
		hasNoTaxOligations: ukTaxpayerOnly,
		ukCitizen,
	} = data;

	const income = create({
		grossAnnual: parseInt(grossAnnual, 10),
		regular: getFinancialObject('NET MONTHLY INCOME', data.netMonthlyIncome),
		additional: getFinancialObject('OTHER', data.incomeOtherAmount, data.incomeOtherFrequencyOptions),
	});

	const expenditure = create({
		mortgage: getFinancialObject(null, data.mortgageOrRentExpenditure),
		others: getFinancialObject(null, data.expenditureOther),
	});

	const tax = create({
		countriesOfCitizenship,
		identificationInfo: getIdentificationInfo(taxObligationList),
		ukTaxpayerOnly: boolMap(ukTaxpayerOnly),
		ukCitizen: boolMap(ukCitizen),
	});

	return { income, expenditure, tax };
};

const savingsToPost = data => {
	const {
		citizenshipList: countriesOfCitizenship,
		taxObligationList,
		hasNoTaxOligations: ukTaxpayerOnly,
		ukCitizen,
	} = data;

	const tax = create({
		countriesOfCitizenship,
		identificationInfo: getIdentificationInfo(taxObligationList),
		ukTaxpayerOnly: boolMap(ukTaxpayerOnly),
		ukCitizen: boolMap(ukCitizen),
	});

	return { tax };
};

const postBuilders = {
	'current': currentToPost,
	'savings': savingsToPost,
};

const post = (data, productType = 'current') => {
	const builder = postBuilders[productType];
	const fromPost = builder(data);

	return GenericMapper.mapObject(_.pickBy(create(fromPost), v => !_.isEmpty(v)));
};

const bool2Str = b => b ? 'Yes' : 'No';
const parseN = boolString => (boolString === 'N' ? 'false' : boolString);
const parseNY = boolString => boolString === 'Y' ? 'true' : parseN(boolString);
const toBool = boolString => (typeof boolString !== 'string' ? boolString : JSON.parse((parseNY(boolString) || '').toLowerCase()));
const boolMapper = value => bool2Str(toBool(value));
const netAmountMapper = value => value && value['net_amount'];
const upperCaseMapper = value => (value || '').toUpperCase();
const nullCheck = next => value => value && next(value);
const property = (next, accessor) => value => next(accessor(value));

const getTax = tax => {
	const taxNumber = {
		key: ['taxNumber', 'hasTaxNumber'],
		hasTaxNumber: {
			value: value => value ? 'Yes' : 'No',
		},
	};

	const schema = {
		'uk_citizen': {
			value: boolMapper,
		},
		'countries_of_citizenship': {
			key: ['hasAdditionalCitizenships', 'citizenshipList'],
			hasAdditionalCitizenships: {
				value: value => bool2Str(value && value.length),
			},
		},
		'uk_taxpayer_only': {
			key: 'hasNoTaxOligations',
			value: boolMapper,
		},
		'identification_info': {
			key: 'taxObligationList',
			'country_of_tax_residence': 'taxCountry',
			'country_of_residency': 'taxCountry',
			'taxpayer_identification_number': taxNumber,
			'number': taxNumber,
			status: {
				value: upperCaseMapper,
			},
		},
	};

	const mapped = GenericMapper.mapObject(tax, schema, _.camelCase);

	return _.assign({ allTaxObligationsListed: 'Yes' }, mapped);
};

const getIncome = income => {
	const schema = {
		'gross_annual': 'grossAnnualIncome',
		regular: {
			key: 'netMonthlyIncome',
			value: netAmountMapper,
		},
		additional: {
			key: ['hasAdditionalIncome', 'incomeOtherAmount', 'incomeOtherFrequencyOptions'],
			hasAdditionalIncome: {
				value: bool2Str,
			},
			incomeOtherAmount: {
				value: netAmountMapper,
			},
			incomeOtherFrequencyOptions: {
				value: nullCheck(property(upperCaseMapper, o => o.frequency)),
			},
		},
	};

	const mapped = GenericMapper.mapObject(income, schema, _.camelCase);

	return mapped;
};

const getExpenditure = expenditure => {
	const other = {
		key: 'expenditureOther',
		value: netAmountMapper,
	};

	const schema = {
		mortgage: {
			key: 'mortgageOrRentExpenditure',
			value: netAmountMapper,
		},
		other,
		others: other,  // @ticket DYB-20561
	};

	const mapped = GenericMapper.mapObject(expenditure, schema, _.camelCase);

	return mapped;
};

const currentFromGet = data => {
	let { tax, income, expenditure } = data;
	expenditure = expenditure || data['expenditure_info']; // @ticket DYB-20561

	return _.extend({},
					tax && getTax(tax),
					income && getIncome(income),
					expenditure && getExpenditure(expenditure)
			);
};

const savingsFromGet = data => {
	const { tax } = data;

	return tax && getTax(tax) || {};
};

const getBuilders = {
	'current': currentFromGet,
	'savings': savingsFromGet,
};

const get = (data, productType = 'current') => {
	return getBuilders[productType](data);
};

const completedTask = data => data.completedTasks && data.completedTasks['WEB-EMPLOYMENT-DETAILS'];
const ntb = data => data.isExistingCustomer !== 'Yes';

module.exports = {
	toPost: (data, productType) => {
		if (!completedTask(data) && ntb(data)) {
			return null;
		}

		return post(data, productType);
	},
	fromGet: (data, producType) => {
		if (!data) {
			return data;
		}

		return get(data, producType);
	},
};
