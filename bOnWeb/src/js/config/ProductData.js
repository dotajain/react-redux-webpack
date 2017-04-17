const _ = require('lodash');

const productTypes = {
	Savings: {
		name: 'savings',
		urlPart: 'savings',
	},
	Current: {
		name: 'current',
		urlPart: 'current',
	},
};

const productFactory = {
	current: target => _.extend({}, {
		productType: productTypes.Current,
		postRegistrationTask: 'WEB-SWITCH',
		productArticle: 'a',
		alternativeOfferItems: [],
		additionalDocumentItems: ['termsAndConditions', 'financialServicesCompensationScheme', 'tariff'],
		mandateItems: ['reviewAcceptTsAndCsBullet1', 'reviewAcceptTsAndCsBullet2', 'reviewAcceptTsAndCsBullet3', 'reviewAcceptTsAndCsBullet4', 'reviewAcceptTsAndCsBullet5'],
		offerMandateItems: ['offertandCCondition', 'offertandCCondition2', 'offerFSACondition', 'offerCreditCondition', 'offerDebitAuthCondition'],
	}, target),
	savings: target => _.extend({}, {
		productType: productTypes.Savings,
		existingCustomersOnly: true,
		postRegistrationTask: 'WEB-ACCOUNT-OPENED',
		productArticle: 'a',
		offerItems: ['offerItemHappyWithdrawalMadeByTransfer'],
		additionalDocumentItems: ['termsAndConditions', 'financialServicesCompensationScheme', 'tariff'],
		mandateItems: ['reviewAcceptTsAndCsBullet1', 'reviewAcceptTsAndCsBullet2', 'reviewAcceptTsAndCsBullet3', 'reviewAcceptTsAndCsBullet6', 'reviewAcceptTsAndCsBullet7'],
		offerMandateItems: ['offertandCCondition', 'offertandCCondition2', 'offerFSACondition', 'offerDebitAuthCondition'],
		description: 'This section contains certain key information relating to your account. Full details are contained in your Terms & Conditions attached below which you should read.',
		minimumAge: 18,
		maximumAge: 99,
	}, target),
};


const savingsProducts = {
	IM803: productFactory.savings({
		name: 'Savings Account Plus',
		eligibilityQuestions: ['eligibilityAge18Question', 'eligibilityUKResidentQuestion'],
		alternativeOfferItems: ['offerItemInterestCalculation', 'offerItemInterestPaid', 'offerItemWithdrawalMadeByTransfer', 'offerItemInclusionMortgageOffsetting'],
		keyFeatureItems: ['interestRatesInfoNoGross', 'mortgageSaver', 'interestCalculation', 'withdrawalFundsLinked', 'fscsCovered', 'savingsDefaultCancellationPolicy'],
		offerMandateItems: ['offertandCCondition', 'offertandCCondition2', 'offerFSACondition', 'reviewAcceptTsAndCsBullet7'],
		productLink: 'productLinkSavingsPlus',
		accountOpenedSections: [
			{
				header: '1',
				bullets: [
					'1.1',
					'1.2',
				],
			},
			{
				header: '2',
				bullets: [
					'2.1',
				],
			},
			{
				header: '3',
				bullets: [
					'3.1',
					'3.4',
				],
			},
			{
				header: '4',
				bullets: [
					'4.1',
				],
			},
			{
				header: '5',
				bullets: [
					'5.1',
				],
			},
		],
	}),
	IM340: productFactory.savings({
		name: 'Signature Savings Account',
		eligibilityQuestions: ['eligibilityAge18Question', 'eligibilityUKResidentQuestion'],
		alternativeOfferItems: ['offerItemInterestCalculation', 'offerItemInterestPaid', 'offerItemWithdrawalMadeByTransfer', 'offerItemInclusionMortgageOffsetting'],
		keyFeatureItems: ['interestRatesInfo', 'mortgageSaver', 'interestCalculation', 'withdrawalFundsLinked', 'fscsCovered', 'savingsDefaultCancellationPolicy'],
		productLink: 'productLinkSignatureSavings',
		accountOpenedSections: [
			{
				header: '1',
				bullets: [
					'1.1',
					'1.2',
				],
			},
			{
				header: '2',
				bullets: [
					'2.1',
				],
			},
			{
				header: '3',
				bullets: [
					'3.1',
					'3.4',
				],
			},
			{
				header: '4',
				bullets: [
					'4.1',
				],
			},
			{
				header: '5',
				bullets: [
					'5.1',
				],
			},
		],
	}),
	IM360: productFactory.savings({
		name: 'Instant Savings Account',
		productArticle: 'an',
		eligibilityQuestions: ['eligibilityAge18Question', 'eligibilityUKResidentQuestion'],
		alternativeOfferItems: ['offerItemInterestCalculation', 'offerItemInterestPaid', 'offerItemNoWithdrawnCharge', 'offerItemnonContactlessCard', 'offerItemTieredRates', 'offerItemTransactionFees'],
		offerItems: ['offerItemHappynonContactlessCard'],
		keyFeatureItems: ['interestRatesInfoNoGross', 'interestCalculation', 'offerItemnonContactlessCard', 'noWithdrawnCharge', 'accountAccess', 'fscsCovered', 'savingsDefaultCancellationPolicy'],
		mandateItems: ['reviewAcceptTsAndCsBullet1', 'reviewAcceptTsAndCsBullet2', 'reviewAcceptTsAndCsBullet3', 'reviewAcceptTsAndCsBullet6', 'reviewAcceptTsAndCsBullet8'],
		offerMandateItems: ['offertandCCondition', 'offertandCCondition2', 'offerFSACondition', 'offerDebitAuthCondition2'],
		productLink: 'productLinkInstantSavings',
		accountOpenedSections: [
			{
				header: '1',
				bullets: [
					'1.1',
					'1.2',
				],
			},
			{
				header: '2',
				bullets: [
					'2.1',
					'2.2',
				],
			},
			{
				header: '3',
				bullets: [
					'3.1',
					'3.4',
				],
			},
			{
				header: '4',
				bullets: [
					'4.1',
				],
			},
			{
				header: '5',
				bullets: [
					'5.1',
				],
			},
		],
	}),
	IM145: productFactory.savings({
		name: 'Savings Account Plus',
		eligibilityQuestions: ['eligibilityAge18Question', 'eligibilityUKResidentQuestion'],
		alternativeOfferItems: ['offerItemInterestCalculation', 'offerItemInterestPaid', 'offerItemWithdrawalMadeByTransfer', 'offerItemInclusionMortgageOffsetting'],
		keyFeatureItems: ['interestRatesInfoNoGross', 'mortgageSaver', 'interestCalculation', 'withdrawalFundsLinked', 'fscsCovered', 'savingsDefaultCancellationPolicy'],
		offerMandateItems: ['offertandCCondition', 'offertandCCondition2', 'offerFSACondition', 'reviewAcceptTsAndCsBullet7'],
		productLink: 'productLinkSavingsPlus',
		accountOpenedSections: [
			{
				header: '1',
				bullets: [
					'1.1',
					'1.2',
				],
			},
			{
				header: '2',
				bullets: [
					'2.1',
				],
			},
			{
				header: '3',
				bullets: [
					'3.1',
					'3.4',
				],
			},
			{
				header: '4',
				bullets: [
					'4.1',
				],
			},
			{
				header: '5',
				bullets: [
					'5.1',
				],
			},
		],
	}),
	IM110: productFactory.savings({
		name: 'Instant Savings Account',
		productArticle: 'an',
		eligibilityQuestions: ['eligibilityAge18Question', 'eligibilityUKResidentQuestion'],
		alternativeOfferItems: ['offerItemInterestCalculation', 'offerItemInterestPaid', 'offerItemNoWithdrawnCharge', 'offerItemnonContactlessCard', 'offerItemTieredRates', 'offerItemTransactionFees'],
		offerItems: ['offerItemHappynonContactlessCard'],
		keyFeatureItems: ['interestRatesInfoNoGross', 'interestCalculation', 'offerItemnonContactlessCard', 'noWithdrawnCharge', 'accountAccess', 'fscsCovered', 'savingsDefaultCancellationPolicy'],
		mandateItems: ['reviewAcceptTsAndCsBullet1', 'reviewAcceptTsAndCsBullet2', 'reviewAcceptTsAndCsBullet3', 'reviewAcceptTsAndCsBullet6', 'reviewAcceptTsAndCsBullet8'],
		offerMandateItems: ['offertandCCondition', 'offertandCCondition2', 'offerFSACondition', 'offerDebitAuthCondition2'],
		productLink: 'productLinkInstantSavings',
		accountOpenedSections: [
			{
				header: '1',
				bullets: [
					'1.1',
					'1.2',
				],
			},
			{
				header: '2',
				bullets: [
					'2.1',
					'2.2',
				],
			},
			{
				header: '3',
				bullets: [
					'3.1',
					'3.4',
				],
			},
			{
				header: '4',
				bullets: [
					'4.1',
				],
			},
			{
				header: '5',
				bullets: [
					'5.1',
				],
			},
		],
	}),
};

const currentProducts = {

	IM135: productFactory.current({
		name: 'Current Account Plus',
		eligibilityQuestions: ['eligibilityAge18Question', 'eligibilityUKResidentQuestion'],
		offerItems: ['offerItemCaDirectCaPlus'],
		keyFeatureItems: ['noMonthlyFee', 'variableCreditInterest', 'plannedBorrowing', 'mortgageSaver', 'fscsCovered', 'defaultCancellationPolicy'],
		monthlyFee: 0,
		minimumAge: 18,
		maximumAge: 99,
		description: 'This section contains certain key information relating to your account.  Full details are contained in your Terms & Conditions and Tariff attached below which you should read.',
		productLink: 'productLinkIM135',
		accountOpenedSections: [
			{
				header: '1',
				bullets: [
					'1.1',
					'1.2',
				],
			},
			{
				header: '2',
				bullets: [
					'2.1',
					'2.2',
				],
			},
			{
				header: '3',
				bullets: [
					'3.1',
					'3.2',
				],
			},
			{
				header: '4',
				bullets: [
					'4.1',
					'4.3',
				],
			},
			{
				header: '5',
				bullets: [
					'5.1',
				],
			},
		],
	}),
	IM125: productFactory.current({
		name: 'Current Account Control',
		eligibilityQuestions: ['eligibilityAge18Question', 'eligibilityUKResidentQuestion'],
		offerItems: ['offerItemCaControl'],
		keyFeatureItems: ['monthlyFee', 'variableCreditInterest', 'plannedBorrowing', 'mortgageSaver', 'fscsCovered', 'defaultCancellationPolicy'],
		additionalDocumentItems: ['termsAndConditions', 'financialServicesCompensationScheme', 'tariff', 'CA31'],
		monthlyFee: 7.5,
		minimumAge: 18,
		maximumAge: 99,
		description: 'This section contains certain key information relating to your account.  Full details are contained in your Terms & Conditions, Tariff and Factsheet attached below which you should read.',
		productLink: 'productLinkIM125',
		accountOpenedSections: [
			{
				header: '1',
				bullets: [
					'1.1',
					'1.2',
				],
			},
			{
				header: '2',
				bullets: [
					'2.1',
					'2.2',
				],
			},
			{
				header: '3',
				bullets: [
					'3.1',
					'3.2',
				],
			},
			{
				header: '4',
				bullets: [
					'4.1',
					'4.3',
				],
			},
			{
				header: '5',
				bullets: [
					'5.1',
				],
			},
		],
	}),
	IM800: productFactory.current({
		name: 'Readycash Account',
		blackListedProduct: true,
		eligibilityQuestions: ['eligibilityAge18Question', 'eligibilityUKResidentQuestion'],
		alternativeOfferItems: ['offerItemNoFees', 'offerItemNoCreditInterest', 'offerItemNoBorrowing', 'offerItemDebitCard', 'offerItemDeposits', 'offerItemCancelation'],
		keyFeatureItems: ['noMonthlyFeeOrCharges', 'noCreditInterest', 'noUnplannedBorrowing', 'offerItemReadyCash', 'fscsCovered', 'defaultCancellationPolicy'],
		offerRestrictions: ['noCheckbook', 'noMortgageOffset', 'noLinkedSavings', 'noBapp'],
		additionalDocumentItems: ['termsAndConditions', 'financialServicesCompensationScheme', 'tariff'],
		monthlyFee: 0,
		minimumAge: 18,
		maximumAge: 99,
		description: 'This section contains certain key information relating to your account.  Full details are contained in your Terms & Conditions and Tariff attached below which you should read.',
		productLink: 'productLinkIM800',
		accountOpenedSections: [
			{
				header: '1',
				bullets: [
					'1.1',
					'1.2',
				],
			},
			{
				header: '2',
				bullets: [
					'2.1',
					'2.2',
				],
			},
			{
				header: '3',
				bullets: [
					'3.1',
					'3.2',
					'3.3',
				],
			},
			{
				header: '4',
				bullets: [
					'4.2',
				],
			},
			{
				header: '5',
				bullets: [
					'5.1',
				],
			},
		],
	}),
	IM136: productFactory.current({
		name: 'B Current account and B Instant Savings account',
		eligibilityQuestions: ['eligibilityAge18Question', 'eligibilityUKResidentQuestion'],
		offerItems: ['offerItemCurrentAndSavingsAccounts', 'offerItemDebitContactless', 'offerItemSelfService'],
		keyFeatureItems: ['keyFeatureRequirements', 'keyFeatureRequirementsB', 'monthlyFee', 'keyFeatureCreditIterest', 'overdraftFacilityB', 'keyFeatureTransfer', 'keyFeatureNoDirectDebitSavings', 'mortgageSaver', 'fscsCovered', 'noticeOfChanges', 'keyFeaturesComplaints', 'defaultCancellationPolicy', 'accountClosureInfo'],
		monthlyFee: 2,
		minimumAge: 18,
		maximumAge: 99,
		productLink: 'productLinkIM136',
		accountOpenedSections: [
			{
				header: '1',
				bullets: [
					'1.1',
					'1.2',
				],
			},
			{
				header: '2',
				bullets: [
					'2.1',
					'2.2',
				],
			},
			{
				header: '3',
				bullets: [
					'3.1',
					'3.2',
					'3.3',
					'3.4',
				],
			},
			{
				header: '4',
				bullets: [
					'4.1',
				],
			},
			// This bullet is only used for the CYB downgrade
			{
				header: '5',
				bullets: [
					'5.1',
				],
			},
		],
	}),
};

module.exports = {
	...currentProducts,
	...savingsProducts,
};

module.exports.productTypes = productTypes;
