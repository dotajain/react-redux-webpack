/**
 * @class MappingUtils
 */

// Packages
const _ = require('lodash');

// Utils
const CountryUtils = require('./CountryUtils');
const DateUtils = require('./DateUtils');
const AddressTransformer = require('./AddressTransformer');
const FinancialDetailsTransformer = require('./Transformers/FinancialDetails');

const MappingUtils = {

	/**
	 * Map all of the properties from the enquiry service response into our data store structure
	 *  (new payload)
	 *
	 * @param  {Object} response		Response object from the enquiry service
	 * @return {Array}    				Array of data formatted to our data store structure
	 */
	mapGetEnquiry(responseData, productType) {
		let adapter;
		const response = responseData;

		// getCustomerById doesn't have applicants array and all
		// response.personal_details turns into response.applicants[0]
		if (response.applicants) {
			const applicant = response.applicants.length && response.applicants[0];

			for (const key in applicant) {
				if (applicant.hasOwnProperty(key)) {
					response[key] = applicant[key];
				}
			}
		}

		const _isNotEmptyArray = arr => {
			return (_.isArray(arr) && arr.length > 0);
		};

		/**
		 * Returns eligibility questions mapping if available
		 * @return {object} eligibility questions/answers
		 */
		const _getEligibilityQuestions = () => {
			const eligibilityQuestionKeys = [
				'eligibilityAge18Question',
				'eligibilityUKResidentQuestion',
				'eligibilityDeviceQuestion',
			];

			const eligibilityQuestions = response['audit_info'] && response['audit_info']['eligibility_questions'];
			const result = {};

			// @ticket DYB-20878: compatibility with 0.6 release
			const positiveEligibilityQuestions = _.filter(eligibilityQuestions, { answer: 'Y' });

			if (positiveEligibilityQuestions) {
				_.each(positiveEligibilityQuestions, (value, index) => {
					result[eligibilityQuestionKeys[index]] = 'Yes';
				});
			}

			return result;
		};

		const _getEmploymentDetails = key => {
			return (_isNotEmptyArray(response['employment_details'])) ? response['employment_details'][0][key] : undefined;
		};

		const _getAddress = () => {
			if (_isNotEmptyArray(response['personal_details'].addresses)) {
				const addresses = AddressTransformer.fromGet(response['personal_details'].addresses);
				return !_.isEmpty(addresses) ? addresses : undefined;
			} else {
				return null;
			}
		};

		/**
		 * Forms an account usage object
		 * @return {Object}
		 */
		const _getAccountUsage = () => {
			const accountUsageInformation = response['account_usage_info'];
			let result = {};

			_.each(accountUsageInformation, item => {
				const accountUsageFundsInfo = item['funds_info'];
				switch (item['usage_type']) {
				case 'CURRENT ACCOUNT':
					result = _.assign(result, {
						incomeOtherPaymentTypeOptions: accountUsageFundsInfo.source,
						incomeOtherPaymentAmount: parseInt(accountUsageFundsInfo.amount, 10),
						incomeOtherAccountPurpose: item.purpose,
					});
					break;

				case 'SAVINGS ACCOUNT':
					result = _.assign(result, {
						incomeOtherSavingsTypeOptions: accountUsageFundsInfo.source,
						incomeOtherSavingsFrequency: accountUsageFundsInfo.frequency,
						incomeOtherSavingsAmount: parseInt(accountUsageFundsInfo.amount, 10),
						incomeOtherSavingsPurpose: item.purpose,
					});

					break;

				default:
					break; // Do Nothing
				}
			});

			return result;
		};

		const _getContactDetails = key => {
			let result = (response['contact_details']) ? response['contact_details'][key] : undefined;

			// Some values may have been stored differently in older systems, e.g. Email -> EMAIL.
			if (result && result.toLowerCase) {
				switch (result.toLowerCase()) {
				case 'email':
					result = 'EMAIL';
					break;
				case 'mobile':
					result = 'PHONE';
					break;
				case 'mail':
					result = 'MAIL';
					break;
				}
			}

			return result;
		};

		/**
		 * Returns a product code, falls back to IM136
		 * @return {String} Product code
		 */
		const _getProductCode = () => {
			return !response.products ? {} : {
				productCode: response.products && `IM${response.products.code}`,
			};
		};

		const _getBankInfo = () => {
			if (response['bank_info'] && _.isArray(response['bank_info'].accounts)) {
				return _.map(response['bank_info'].accounts, account => {
					return {
						accountType: account['account_type'] ? account['account_type'].toLowerCase() : undefined,
						accountNumber: account['account_number'],
						sortCode: account['sort_code'],
					};
				});
			}

			return undefined;
		};

		const numberOfDependants = response['personal_details']['number_of_dependents'] ? parseInt(response['personal_details']['number_of_dependents'], 10) : 0;

		const getStatus = (residentialStatus, noMatch) => residentialStatus && residentialStatus !== noMatch ? residentialStatus : '';

		adapter = {
			customerNumber: response['customer_number'],
			caseId: response['reference_id'],

			// Bank Info
			bankInfo: _getBankInfo(),

			// Personal Details
			gender: response['personal_details'].sex === 'M' ? 'Male' : 'Female',
			dateOfBirth: DateUtils.getDateStringFromAPI(response['personal_details'].dob),
			maritalStatus: response['personal_details']['marital_status'],
			hasDependants: numberOfDependants > 0 ? 'Yes' : 'No',
			dependants: !isNaN(numberOfDependants) && String(numberOfDependants) || '0',
			title: response['personal_details'].name.title,
			firstName: response['personal_details'].name['first_name'],
			lastName: response['personal_details'].name['last_name'],
			hasMiddleName: response['personal_details'].name['middle_name'] ? 'Yes' : 'No',
			middleName: response['personal_details'].name['middle_name'],

			// Address Details
			addresses: _getAddress(),

			residentialStatus: getStatus(response['personal_details']['residential_status'], 'OTHER'),

			// Contact Details
			phoneNumber: _getContactDetails('phone') && _getContactDetails('phone').mobile,
			emailAddress: _getContactDetails('email'),
			emailAddressConfirmation: _getContactDetails('email'),
			contactMethods: _getContactDetails('preferences') && _.map(_getContactDetails('preferences').marketing, (value, key) => {
				if (value === 'Y' && key !== 'do_not_contact') {
					return key.toUpperCase();
				}

				return undefined;
			}),
			preferredContactMethod: _getContactDetails('preferences') && _getContactDetails('preferences').contact.method,

			// Employment Details
			employmentStatus: _getEmploymentDetails('status'),
			employmentOccupation: _getEmploymentDetails('description'),
			employmentStartDate: _getEmploymentDetails('effective_period') && DateUtils.getDateStringFromAPI(_getEmploymentDetails('effective_period').from),
			employerName: _getEmploymentDetails('employer') && _getEmploymentDetails('employer').name,

			// Nationality
			nationality: response['personal_details'].nationality,
			cityBorn: response['personal_details']['city_of_birth'],
			countryBorn: response['personal_details']['country_of_birth'],
		};

		adapter = _.extend(adapter, FinancialDetailsTransformer.fromGet(response['financial_details'], productType));

		adapter = _.extend(adapter, _getAccountUsage(), _getEligibilityQuestions(), _getProductCode());

		return _.chain(adapter)
			.map((value, key) => {
				return { key, value };
			})
			.filter(item => {
				return !_.isUndefined(item.value) && !_.isNull(item.value);
			})
			.value();
	},

	/**
	 * Build a "create case" payload object. (new payload)
	 *
	 * @param  {Object} store 		AccountOpeningDataStore containing user's form data.
	 * @param  {Object} content 	From content store.
	 * @return {Object}       		JSON to send.
	 */
	mapPostEnquiry(store, content) {
		// jscs: disable
		// jshint ignore:start
		const storeData = store.getAll();
		const isExistingCustomer = store.getValue('isExistingCustomer') === 'Yes' ? true : false;
		const isRibCustomer = store.getValue('isRibCustomer');
		const mobileNumber = this.getMobileNumber(store);
		const homeNumber = this.getHomeNumber(store);
		const eligibilityQuestions = _.map(store.getValue('eligibilityQuestions'), item => {
			return {
				question: item.question || '',
				answer: item.answer === 'Yes' ? 'Y' : 'N',
				consent: item.consent,
				timestamp: item.timestamp,
			};
		});

		// to review @ticket DGW2-946
		const docs = ['dataProtection', 'termsAndConditions', 'tariff', 'DGS'];

		const _getDocuments = () => {
			const availableDocuments = [];
			_.each(docs, docName => {
				const data = store.getValue(docName);
				data && availableDocuments.push({
					reason: docName === 'dataProtection' ? 'DATA PROTECTION' : 'DOCUMENTATION',
					name: content[`${docName}DocFileName`] && content[`${docName}DocFileName`].replace('{type}', storeData.product.productType.name),
					content_type: 'PDF',
					version: data.version,
					consent: data.consent,
					timestamp: data.timestamp,
				});
			});

			return availableDocuments;
		};

		/**
		 * adress mapping for create case payload
		 * @param  {Object}  data               Data from the form
		 * @return {Array}                     Addresses formated for create case API
		 */
		const _mapAddress = data => {
			return AddressTransformer.toPost(data);
		};

		/**
		 * for account usage object
		 * @return {Array} Account usage data formattet for create case API
		 */
		const _getAccountUsage = () => {
			let accountUsageInformation;

			// Additional Income for Current Account
			const fundsTypeCA = store.getValue('incomeOtherPaymentTypeOptions');
			const fundsAmountCA = store.getValue('incomeOtherPaymentAmount');
			const accountPurposeCA = store.getValue('incomeOtherAccountPurpose');

			// Additional Income for Savings Account
			const fundsFrequencySA = store.getValue('incomeOtherSavingsFrequency');
			const fundsAmountSA = store.getValue('incomeOtherSavingsAmount');
			const fundsTypeSA = store.getValue('incomeOtherSavingsTypeOptions');
			const accountPurposeSA = store.getValue('incomeOtherSavingsPurpose');

			const _addUsageInfo = (usage_type, purpose, funds_info) => {
				accountUsageInformation = accountUsageInformation || [];
				accountUsageInformation.push({
					usage_type,
					purpose,
					funds_info,
				});
			};

			if (fundsTypeCA || fundsAmountCA || accountPurposeCA || fundsFrequencySA || fundsAmountSA) {
				if (fundsTypeCA && fundsAmountCA && accountPurposeCA) {
					const fundsInfoCA = {
						'source': fundsTypeCA,
						'amount': parseInt(fundsAmountCA || 0, 10),
						'frequency': 'MONTHLY',
					};

					_addUsageInfo('CURRENT ACCOUNT', accountPurposeCA, fundsInfoCA);
				}

				if (fundsFrequencySA) {
					const fundsInfoSA = {
						'source': fundsTypeSA || '',
						'amount': parseInt(fundsAmountSA || 0, 10),
						'frequency': fundsFrequencySA,
					};

					_addUsageInfo('SAVINGS ACCOUNT', accountPurposeSA || 'SAVINGS', fundsInfoSA);
				}
			}

			return accountUsageInformation;
		};

		const _getEmploymentDetails = () => {
			let employment;
			const employerName = store.getValue('employerName');
			const employmentStartDate = store.getValue('employmentStartDate');

			if (employerName && employmentStartDate) {
				employment = [{
					'status': store.getValue('employmentStatus', ''),
					'description': store.getValue('employmentOccupation'),
					'employer': {
						'name': employerName,
					},
					'effective_period': {
						'from': DateUtils.getAPIDateString(employmentStartDate),
					},
				}];
			} else {
				employment = [{
					'status': store.getValue('employmentStatus', ''),
				}];
			}

			this._deleteEmptyProperties(employment, true);

			return !_.isEmpty(_.head(employment)) ? employment : null;
		};

		const adapter = {
			'product': {
				'code': store.getValue('productCode', '').replace(/^\D+/gi, ''), // Remove letters from the code.
			},

			'applicants': [{
				'personal_details': {
					addresses: _mapAddress(store.getValue('addresses', [])),
					'number_of_dependents': store.getValue('dependants') || '0',
					'nationality': store.getValue('nationality'),
					'city_of_birth': store.getValue('cityBorn'),
					'country_of_birth': store.getValue('countryBorn'),
					'residential_status': store.getValue('residentialStatus'),
					'marital_status': store.getValue('maritalStatus', '').toUpperCase(),
				},

				'contact_details': {
					'email': store.getValue('emailAddress'),
					'preferences': {
						'contact': {
							'method': store.getValue('preferredContactMethod'),
							'time': 'ANYTIME',
							'phone': mobileNumber ? 'MOBILE' : 'HOME',
						},
						'marketing': {
							'phone': store.getValue('contactMethods').indexOf('PHONE') >= 0 ? 'Y' : 'N',
							'email': store.getValue('contactMethods').indexOf('EMAIL') >= 0 ? 'Y' : 'N',
							'sms': store.getValue('contactMethods').indexOf('SMS') >= 0 ? 'Y' : 'N',
							'mail': store.getValue('contactMethods').indexOf('MAIL') >= 0 ? 'Y' : 'N',
						},
					},
				},

				'employment_details': _getEmploymentDetails(),

				'account_usage_info': _getAccountUsage(),
			}],

			'audit_info': {
				'eligibility_questions': eligibilityQuestions,
				'documents': _getDocuments(),
			},
		};

		const mainApplicant = adapter.applicants[0];
		const financialDetails = FinancialDetailsTransformer.toPost(storeData, storeData.product.productType.name);
		if (financialDetails) {
			mainApplicant['financial_details'] = financialDetails;
		}

		const usernamePassword = 	{
			'username': store.getValue('username') || store.getValue('unsavedUsername'),
			'password': store.getValue('encryptedPassword'),
		};

		if (isExistingCustomer) {
			adapter['customer_id'] = this._getCustomerId();

			if (!isRibCustomer) {
				mainApplicant['user_details'] = usernamePassword;
			}
		} else {
			mainApplicant['user_details'] = usernamePassword;

			mainApplicant['personal_details'] = _.extend(mainApplicant['personal_details'], {
				'sex': store.getValue('gender') === 'Male' ? 'M' : 'F',
				'dob': DateUtils.getAPIDateString(store.getValue('dateOfBirth')),
				'name': {
					'title': store.getValue('title', '').toUpperCase(),
					'first_name': store.getValue('firstName'),
					'last_name': store.getValue('lastName'),
					'middle_name': store.getValue('middleName'),
				},
			});

			mainApplicant['contact_details']['phone'] = {
				'home': homeNumber,
				'mobile': mobileNumber,
			};
		}

		this._deleteEmptyProperties(adapter, true);

		return adapter;

		/* jshint ignore:end */
		// jscs: enable */
	},

	_getCustomerId() {
		const CustomerStore = require('../stores/CustomerStore');
		return CustomerStore.getValue('customerId');
	},

	_deleteEmptyProperties(obj, isRecursive) {
		let isRecursiveValue = isRecursive;
		const objeData = obj;
		isRecursiveValue = isRecursiveValue || false;
		for (const i in objeData) {
			if (objeData[i] === null || objeData[i] === undefined || objeData[i] === '') {
				delete objeData[i];
			} else if (isRecursiveValue && typeof objeData[i] === 'object') {
				this._deleteEmptyProperties(objeData[i], isRecursiveValue);
			}
		}
	},

	/**
	 * fetch current account data and return it's details
	 * @param  {object} data AccountOpening data
	 * @return {object}      Formatted object
	 */
	_getNewAccountDetails(data) {
		const account = data && data.bankInfo && _.find(data.bankInfo, { accountType: 'current account' });

		return account && {
			'sort_code': account.sortCode,
			'account_number': account.accountNumber,
		};
	},

	/**
	 * Build a CAS payload object.
	 *
	 * @param  {Object} data 	From data store.
	 * @return {Object}      	To send.
	 */
	mapSwitchPost(data) {
		const hasDebitCard = data.switchHasDebitCard === 'Yes' ? true : false;

		const result = {
			'switch_type': data.switchType.toUpperCase().substr(0, 4) === 'FULL' ? 'FULL' : 'PART',
			'customer_info': {
				'nationality': CountryUtils.getCodeFromName(data.nationality),
				'country_of_residence': 'GB', // A current UK address is required to signup.
			},
			'new_account': this._getNewAccountDetails(data),
			'old_account': {
				'name': data.switchAccountName,
				'debit_card': hasDebitCard,
				'sort_code': data.switchSortCode,
				'account_number': data.switchAccountNumber,
			},
		};

		// Optional fields.
		const switchDate = data.switchDate ? data.switchDate.split('-').reverse().join('') : undefined;
		if (switchDate) {
			result['complete_date'] = switchDate;
		}

		if (hasDebitCard) {
			result['old_account'].card = {
				'number': data.switchDebitCardPan,
				'expiry_date': data.switchDebitCardExpiration,
			};
		}

		return _.pickBy(result, value => {
			return value;
		});
	},

	/**
	 * User enters one phone number in the UI.
	 * We should interpret it as a mobile number if appropriate.
	 *
	 * @param {Store} store  		Account opening data store.
	 * @return {String} Mobile number if appropriate, or empty string if user entered a house number.
	 */
	getMobileNumber(store) {
		const phoneNumber = store.getValue('phoneNumber');

		return (_.isString(phoneNumber) && phoneNumber.indexOf('07') === 0) ? phoneNumber : '';
	},

	/**
	 * User enters one phone number in the UI.
	 * We should interpret it as a home number if appropriate.
	 *
	 * @param {Store} store  		Account opening data store.
	 * @return {String} Home number if appropriate, or empty string if user entered a mobile number.
	 */
	getHomeNumber(store) {
		const phoneNumber = store.getValue('phoneNumber');

		return (_.isString(phoneNumber) && phoneNumber.substr(0, 2) !== '07') ? phoneNumber : '';
	},
};

module.exports = MappingUtils;
