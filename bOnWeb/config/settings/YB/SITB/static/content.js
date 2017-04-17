'use strict';

window.appContent = (function() {

	var brands = {
		CB: {
			bankName: 'Clydesdale',
			bankCode: 'cb',
			bankWebsite: 'http://www.cbonline.co.uk',
			phoneNumber: '0800 028 3632',
			appendBank: true,
			faqsLink: 'https://help.cybonline.co.uk/system/selfservice.controller?CONFIGURATION=1125&PARTITION_ID=1&CMD=STARTPAGE&USERTYPE=1&isSecure=true&isSecure=true&LANGUAGE=en&COUNTRY=us',
			faqsSavingsLink: 'https://help.cybonline.co.uk/system/selfservice.controller?CONFIGURATION=1127&PARTITION_ID=1&CMD=STARTWELCOMEPAGE&USERTYPE=1&isSecure=true&isSecure=true&LANGUAGE=en&COUNTRY=us',
			monetiseLink: 'http://www.cbonline.co.uk/personal/current-accounts/nextsteps/'
		},
		DYB: {
			bankName: 'B',
			bankCode: 'dyb',
			bankWebsite: 'http://www.cbonline.co.uk',
			phoneNumber: '0800 678 3654',
			appendBank: true
		},
		YB: {
			bankName: 'Yorkshire',
			bankCode: 'yb',
			bankWebsite: 'http://www.ybonline.co.uk',
			phoneNumber: '0800 028 3632',
			appendBank: false,
			faqsLink: 'https://help.cybonline.co.uk/system/selfservice.controller?CONFIGURATION=1131&PARTITION_ID=1&CMD=STARTPAGE&USERTYPE=1&isSecure=true&isSecure=true&LANGUAGE=en&COUNTRY=us',
			faqsSavingsLink: 'https://help.cybonline.co.uk/system/selfservice.controller?CONFIGURATION=1181&PARTITION_ID=1&CMD=STARTPAGE&USERTYPE=1&isSecure=true&isSecure=true&LANGUAGE=en&COUNTRY=us',
			monetiseLink: 'http://www.ybonline.co.uk/personal/current-accounts/nextsteps/'
		}
	};

	var appLinks = {
		ios: {
			link: 'http://itunes.apple.com/app/id1051351437',
			title: 'App Store',
		},
		android: {
			link: 'https://play.google.com/store/apps/details?id=co.uk.youandb.android.b',
			title: 'Google Play',
		},
		amazon: {
			link: 'http://www.amazon.co.uk/gp/mas/dl/android?p=co.uk.youandb.android.b',
			title: 'Amazon App Store',
		},
	}

	var brand = brands.YB;

	var result = {
		bankNames: {
			CB: brands.CB.bankName,
			YB: brands.YB.bankName,
			DYB: brands.DYB.bankName,
		},
		appLinks: appLinks,
		bankWebsite: brand.bankWebsite,

		// Product Links
		productLinkIM540: brand.bankWebsite + '/personal/current-accounts/direct/',
		productLinkIM135: brand.bankWebsite + '/personal/current-accounts/current-account-plus/',
		productLinkIM125: brand.bankWebsite + '/personal/current-accounts/current-account-control/',
		productLinkIM800: brand.bankWebsite + '/personal/current-accounts/standard-current-account/',
		productLinkIM136: 'http://www.youandb.co.uk/getb',
		productLinkInstantSavings: brand.bankWebsite + '/personal/savings/everyday-instant-access-accounts/instant-savings-account/',
		productLinkSavingsPlus: brand.bankWebsite + '/personal/savings/everyday-instant-access-accounts/savings-account-plus/',
		productLinkSignatureSavings: brand.bankWebsite + '/personal/savings/everyday-instant-access-accounts/signature-savings-account/',

		// Document
		documentTitle: brand.bankName + ' Bank',
		navigationWarning: 'If you refresh or leave this page, you\'ll lose any unsaved progress. Are you sure you want to leave?',

		// Header Logo
		headerLogoAlt: brand.bankName + ' Bank Logo',

		// Key Features
		noMonthlyFee: 'There is no monthly fee for this account.',
		noMonthlyFeeOrCharges: 'There are no fees or charges for this account.',
		monthlyFee: 'There is a monthly fee of {} for this account.',
		variableCreditInterest: 'Variable credit interest is payable on this account on credit balances.',
		noCreditInterest: 'This account doesn\'t pay credit interest.',
		interestUpTo3000: 'Interest is payable on this account on credit balances up to £3000.',
		noUnplannedBorrowing: 'Borrowing is not available on this account. Requests for unplanned borrowing will usually be declined. Full details can be found in the Borrowing section of your Terms & Conditions and in your Tariff.',
		plannedBorrowing125: 'Planned borrowing is available on this account, subject to eligibility. The cost of this is £6 per month plus interest. Requests for unplanned borrowing will usually be declined. Full details can be found in the Borrowing section of your Terms & Conditions and in your Tariff.',
		plannedBorrowing: 'Borrowing is available on this account, subject to eligibility, and is usually more expensive if not agreed in advance. Planned borrowing costs £6 per month plus interest. Unplanned borrowing costs £6 per day. An item returned unpaid costs £15. Full details can be found in the Borrowing section of your Terms & Conditions and in your Tariff.',
		fscsCovered: 'Your eligible deposits with Clydesdale Bank PLC are protected up to a total of £75,000 by the Financial Services Compensation Scheme, the UK\'s deposit guarantee scheme. This limit is applied to the total of any deposits you have with Clydesdale Bank, Yorkshire Bank and B. Any total deposits you hold above the limit between these brands are unlikely to be covered. Please see <a href="http://www.ybonline.co.uk/resources/b82e172a-b00f-4783-973b-e4399da349e4/fscs_2015_online-leaflet.pdf" target="_blank">FSCS leaflet<span class="screenreader"> This link will open in a new browser window</span></a> for further information or visit <a href="http://www.fscs.org.uk" target="_blank" title="www.fscs.org.uk. This link will open in a new browser window">www.fscs.org.uk<span class="screenreader"> This link will open in a new browser window</span></a>',
		defaultCancellationPolicy: 'You can cancel your agreement with us within 14 days of opening the account, or from the day you receive the Terms & Conditions if later, by contacting us in branch, phone or in writing. You will need to repay any debit balance, interest and fees incurred within 30 days from the date you tell us you want to cancel it.',
		savingsDefaultCancellationPolicy: 'You can cancel your agreement with us within 14 days of opening the account, or from the day you receive the Terms & Conditions if later, by contacting us in branch, phone or in writing.',
		mortgageSaver: 'This account is eligible for inclusion in mortgage offsetting arrangements. Any credit balance can be used to set against the debit balance on your Offset Mortgage held with us and so reduce the interest payable on your mortgage. Full details can be found in the Offsetting section of your Terms & Conditions.',
		caDirectKeyFeature: 'This account requires a minimum deposit of £1000 per month (excluding transfers from other accounts held with us), and that you must register for telephone and internet services and use these for day-to-day banking. Please note, if you fail to meet these criteria, we may change your account to a Current Account Plus which has different interest rates.',
		caDirectKeyFeature2: 'You can have a maximum of 2 Current Account Direct accounts, of which only one may be a sole account.',

		// Key Features B
		serviceCommitmentB: 'We\'re committed to providing our customers with the best possible service from us but more information can be found in the Terms & Conditions about what to do if you have a complaint.',
		overdraftFacilityB: 'Overdrafts are available on this account subject to eligibility. Going overdrawn is usually more expensive if not arranged in advance. Applicable fees and interest, for both planned and unplanned borrowing, can be found in your Tariff.',
		packagedAccountOpening: 'Both a current account and a linked savings account must be opened at the same time, please see Terms & Conditions for full details.',
		creditInterestPaid: 'Credit interest is payable on both the current account and the savings account, please refer to your Tariff for rates.',
		creditBalanceMortgage: 'Any credit balance in this account may be used to reduce the debit interest calculated on your mortgage account with us.',
		noticeOfChanges: 'We will usually give you two months\' notice of changes, the Terms & Conditions detail any that we may make sooner.',

		downgradedOfferPageKeyFeaturesTitle: 'Key features for the',
		downgradedOfferKeyFeaturesParagraph: 'This section contains certain key information relating to this alternative offer of a Readycash Account. Full details are contained in your terms & conditions and tariff attached below which you should read.',

		// Offer Restrictions ReadyCash
		noCheckbook: 'Chequebook facilities.',
		noMortgageOffset: 'The ability to offset against a mortgage product.',
		noLinkedSavings: 'Linked savings account.',

		// SideBar
		sideBarTitle: 'Need Help?',
		sideBarContentLine1: 'Call us on:',
		sideBarContentLine2: '0800 028 3632,',
		sideBarContentLine3: 'Monday to Friday 08:00 to 20:00.',
		sideBarContentLine4: 'Saturday 09:00 to 17:00.',
		sideBarContentLine5: 'Closed on Sunday.',

		// Footer
		footerLinkText1: 'Footer Link 1',
		footerLinkUrl1: '/',
		footerLinkText2: 'Footer Link 2',
		footerLinkUrl2: '/',
		footerLinkText3: 'Footer Link 3',
		footerLinkUrl3: '/',
		footerLinkText4: 'Footer Link 4',
		footerLinkUrl4: '/',

		// Landing Page
		landingPagePageHeader: 'Account Opening',
		landingPageTitle: 'You\'re applying for a ',
		landingPageIntro: 'We\'ve tried to keep this online application straightforward. It includes everything you need to apply and open an account with a debit card. Please be aware our online application does not currently offer the ability to arrange an overdraft. <strong>If you require an overdraft and are planning to use the Current Account Switch Service, please call us or go into a branch.</strong>',
		'landingPageIntro-savings': 'We\'ve tried to keep this online application straightforward. It includes everything you need to apply and open an account.',
		landingPageQuestionsNote: 'If you think there are special circumstances (e.g. you are vulnerable or experiencing financial difficulties) then Readycash is our Basic Banking Account may suit your needs better than one of our other accounts. If you think there are special circumstances related to your application, please call us on 0800 028 3632 or call into one of our branches.',
		'landingPageQuestionsNote-savings': '',
		existingCustomerTitle: 'Existing customer?',
		initialQuestionsTitle: 'Initial questions',
		initialQuestionsSubtitle: undefined,
		infoToApplyTitle: 'To apply',
		infoToApplyIntro: 'You\'ll need these handy:',
		infoToApply1: 'Your addresses for the past 3 years',
		infoToApply2: 'The name of your employer, how much you get paid and when you started work',
		'infoToApply2-savings': 'The name of your employer and when you started work',
		infoToApply3: 'How much you usually spend each month',
		'infoToApply3-savings': '',
		infoToApply4: '',
		infoToApply5: '',
		isExistingCustomer: 'Have you ever held an account with ' + brand.bankName + ' Bank?',
		isExistingCustomerHelpMessage: 'Even if you held this account in the past, please select Yes.',
		isExistingCustomerValidationMessage: 'Sorry, you can\'t apply online, so please call us instead and apply over the phone. Or, if you prefer, go into a branch and ask for help there.',

		// Eligibility Questions
		eligibilityAge18Question: 'Are you 18 or over?',
		eligibilityAge18QuestionValidationMessage: 'As you\'re under 18 you can\'t apply online, so please call us or, if you prefer, go into a branch and ask for help there.',
		eligibilityAge18QuestionHelpMessage: 'If you\'re aged between 16-17, you might be able to have an account, but we need additional information first. Please call us or go to a branch and ask for help.',
		eligibilityAge16Question: 'Are you 16 or over?',
		eligibilityAge16QuestionValidationMessage: 'Sorry, but if you\'re under 16 we can\'t offer you this account at the moment. But we do have some other products that might be of interest. Click on the link to find out more: <a href="#">CA Plus</a> &amp; <a href="#">Jumpstart</a>',
		eligibilityAge16QuestionHelpMessage: 'You need to be 16 or over to have a bank account.',
		eligibilityUKResidentQuestion: 'Are you a UK resident?',
		eligibilityUKResidentQuestionValidationMessage: 'We need to ask you a few questions we can\'t cover online. Can you please call us and we\'ll explain what\'s involved.',
		eligibilityUKResidentQuestionHelpMessage: 'You can answer Yes if you are a UK resident, even if you were born in another country or you used to live abroad.',
		eligibilityDeviceQuestion: 'Do you have or plan on having a compatible device to use the DYB proposition?',
		eligibilityDeviceQuestionValidationMessage: 'You can not proceed with the application if you do not have a compatible device to use the DYB proposition and links to other products I might be eligible for.',
		eligibilityDeviceQuestionHelpMessage: 'For details of the operating systems and example mobile and tablet devices supported by the B app, please visit: <a href="http://www.youandb.co.uk/devices" target="_blank" title="www.youandb.co.uk/devices. This link will open in a new browser window">www.youandb.co.uk/devices <span class="screenreader">This link will open in a new browser window</span></a>.',

		// Terms & Conditions
		eligibilityTermsTitle: 'Use of Personal Information',
		eligibilityTerms1: 'The information you provide will be used to assess your application, and to set up and manage your account. Where you\'ve given us information about any other people as part of an application for a joint account, you also confirm that each person has authorised you to do so as part of the application.',
		eligibilityTerms2: 'A full description of how and for what purposes your information may be processed <a href="static/DU1950.pdf" target="_blank" title="Download Personal Information Statement PDF. This link will open in a new browser window" aria-label="Download Personal Information Statement PDF. This link will open in a new browser window.">can be viewed here <span class="screenreader">Download Personal Information Statement PDF. This link will open in a new browser window</span></a>.',
		eligibilityTerms3: 'We will share your information with Credit Reference Agencies to help determine what credit products and services we can provide you. These agencies will use the information for assessing credit applications, debt tracing and prevention of money laundering. In the case of joint applications, you confirm all applicants understand that an association linking their financial records together will be created by these agencies.',
		'eligibilityTerms3-savings': 'In order to prevent or detect fraud, the information provided in applications will be shared with fraud prevention agencies. If false or inaccurate information is provided by you or on your behalf, if we suspect fraud or if fraud is identified, details will be kept in our records and also passed to fraud prevention agencies, law enforcement agencies and other organisations involved in crime and fraud prevention which may access and use this information.',
		eligibilityTerms4: 'If false or inaccurate information is provided and fraud is identified, details will be passed to fraud prevention agencies to prevent fraud and money laundering. Further details explaining how the information is held by fraud prevention agencies can be found in our Use of Personal Information documentation.',
		'eligibilityTerms4-savings': '',
		eligibilityTermsClosingText: 'Please read and save a copy of the Use of Personal Information Statement for your reference and records. This will also be emailed to you.',
		acceptTsAndCs: 'I agree to the use of personal information above.',
		dataProtectionDocDownloadLabel: 'Download as PDF',
		dataProtectionDocLink: 'static/DU1950.pdf',
		dataProtectionDocLinkTitle: 'Download Personal Information Statement PDF. This link will open in a new browser window.',
		dataProtectionDocFileName: 'DU1950.pdf',
		dataProtectionDocVersion: 'I',

		// Step 1 - Your Details
		personalDetailsPageHeader: 'Personal details',
		personalDetailsTitle: 'Personal details',
		personalDetailsGuidance: 'If you need to make any changes to your personal details please call our team on ' + brand.phoneNumber,
		personalDetailsSubtitle: undefined,

		titleQuestion: 'Title',
		titleHelpMessage: 'Please select from the given list.',
		firstNameQuestion: 'First Name',
		firstNameValidationMessage: 'Sorry, your name must be made up of letters and spaces only.',
		firstNameHelpMessage: 'Your first name, as shown on your passport.',
		hasMiddleNameQuestion: 'Do you have a middle name?',
		hasMiddleNameHelpMessage: 'Your middle name, as shown on your passport.',
		middleNameValidationMessage: 'Sorry, your name must be made up of letters and spaces only.',
		middleNameQuestion: 'Middle Name',
		lastNameQuestion: 'Last Name',
		lastNameValidationMessage: 'Sorry, your name must be made up of letters and spaces only.',
		lastNameHelpMessage: 'Your last name, as shown on your passport. If your name has changed, for example because of marriage, make sure you use the name that you\'re officially registered with.',
		dateOfBirthQuestion: 'Date of birth',
		dateOfBirthValidationMessage: 'You need to be at least 18 years old to be eligible for this account.',
		dateOfBirthHelpMessage: 'You need to be at least 18 years old to open an account online so please call us or, if you prefer, visit your local branch and ask for help there.',
		genderQuestion: 'Gender',
		genderHelpMessage: 'We need this so we can check your information using our decision processes.',
		genderValidationMessage: 'Please confirm if your title and gender are both correct on ' + brand.phoneNumber,
		maritalStatusQuestion: 'Marital status',
		maritalStatusHelpMessage: 'We need this so we can check your information using our decision processes.',
		hasDependantsQuestion: 'Do you have any dependants?',
		hasDependantsHelpMessage: 'A legal dependant includes anyone you have a legal duty to support, such as children.',
		personalDetailsFoundValidationMessage: 'It appears you are already a customer. <a href="{websiteBaseDirectory}account-opening/authentication?applyFor={productCode}">Please login to continue</a>.',

		// Step 1 - Addresses
		addressTitle: 'Current address',
		addressSubtitle: 'We\'ll need the addresses for everywhere you\'ve lived for the past 3 years.',
		addressLookupError: 'We were unable to look up your postcode. Please try again or contact us to proceed.',
		addressNoExactMatch: 'Don\'t see your exact address? Contact us to proceed.',
		previousAddressTitle: 'Previous address',
		previousAddressSubtitle: 'We need to know where you\'ve been living for the last 3 years.',
		residentialStatusHelpMessage: 'Choose the option which best describes your status while living at this address. If you have a mortgage and live there, select Owner.',
		residentialStatusValidationMessage: 'Please select an option from the dropdown list.',
		livedForThreeYearsQuestion: 'Please confirm that you have lived at the address shown above for at least 3 years.',
		livedForThreeYearsValidationMessage: 'Please contact the bank on 0800 028 3632 to update your address history.',
		residentialStatusQuestion: 'Residential status',
		dateMovedQuestion: 'Date moved to address',
		removeAddressButtonLabel: 'Remove Address',
		postcodeSearchButtonLabel: 'Find address',
		postcodeSearchLegend: 'Postcode',
		selectAddressPlaceholder: 'Please select your address...',
		selectAddressLabel: 'Select your address',
		selectAddressSelectButtonText: 'Select',
		addressesQuestion: 'Postcode',
		postcodeQuestion: 'Postcode',
		addressTypeQuestion: 'Did you live in the UK?',
		addressInvalidMessage: 'Something isn\'t right with your postcode, please contact the team at ' + brand.bankName + ' on ' + brand.phoneNumber,

		// Step 1 - Contact Details
		contactDetailsTitle: 'Contact details',
		contactDetailsIntro: 'Your phone number and email address will be used to complete your application and to help us look after your account in the future.',
		phoneNumberQuestion: 'Mobile number (Helps you access and manage your online account).',
		phoneNumberValidationMessage: 'Your phone number should be 11 characters long and include numbers only, no spaces or symbols. A mobile number is needed to access internet and phone banking.',
		phoneNumberHelpMessage: 'You can use a landline number if you want, however a mobile number is required at this point if you want to register for internet and telephone banking as part of this application. If you don\'t want to be contacted by mobile, you can tell us below.',
		emailAddressQuestion: 'Email address',
		emailAddressValidationMessage: 'Please check your email address? It needs to include a \'@\' and a \'.\' to be formatted the right way.',
		emailAddressHelpMessage: 'If you don\'t want to be contacted by email, you can tell us below.',
		emailAddressConfirmationQuestion: 'Confirm email address',
		emailAddressConfirmationValidationMessage: 'Your email addresses don\'t match. Can you check them please?',
		emailAddressConfirmationHelpMessage: 'Please ensure this is the same as you have entered above.',
		contactMethodTitle: 'Preferred contact method',
		contactMethodIntro: 'We\'ll try to use your preferred contact method where possible. However for any issues relating to account security, we\'ll always give you a call. Once you\'ve finished your application, we\'ll email you all the related documents. Everything else, including statements, we\'ll post to you.',
		preferredContactMethodQuestion: 'I\'d prefer to be contacted by',
		contactMethodsValidationMessage: 'Please select at least one contact method.',

		// Step 1 - Select Your Bank
		selectBankTitle: 'Select Your Bank',
		selectBankQuestion:'Which bank is handy for you?',
		selectBankSubtitle: 'B Bank is powered by Clydesdale Bank and Yorkshire Bank. For branch offering purposes, if you live in England, Yorkshire Bank has the most branches. If you are based in Scotland go for Clydesdale Bank. There is a Clydesdale Bank branch and a Yorkshire Bank branch in central London.',
		bankIDHelpMessage: 'Please select one of the banks, which seems the best fit for your location. Please call us if you\'re not sure.',
		bankIDValidationMessage: 'This is required.',

		selectBankHelpLink: 'http://www.cbonline.co.uk',
		selectBankHelpLinkText: 'Click here for more Information',

		selectBankHelpLinkCb: 'http://www.cbonline.co.uk/personal/online-locator/',
		selectBankHelpLinkCbText: 'Clydesdale Bank Branch Locator',
		selectBankHelpLinkCbTitle: 'Clydesdale Bank Branch Locator link. This link will open in a new browser window',
		selectBankHelpLinkYb: 'http://www.ybonline.co.uk/personal/online-locator/',
		selectBankHelpLinkYbText: 'Yorkshire Bank Branch Locator',
		selectBankHelpLinkYbTitle: 'Yorkshire Bank Branch Locator link. This link will open in a new browser window',

		// Step 1 - Username and Password
		setPasswordTitle: 'Username and password',
		usernameInfo: 'Once you\'ve created your username and password, your application will be saved. If you need to retrieve your application to complete it or to view an online decision, you will be able to log in through the Retrieve application link on the website. Please take care in choosing your password, and keep it safe, as you\'ll need it later to log in to internet banking and we won\'t be able to remind you of it. Your username must be 6-16 characters in length, using only letters and numbers. Your password must be 8-12 characters long, including at least one letter and one number. It is also case sensitive.',
		unsavedUsernameHelpMessage: 'Your username must be 6-16 characters in length, using only letters and numbers. Please note it is also case sensitive.',
		unsavedUsernameValidationMessage: 'Your username must be 6-16 characters in length, using only letters and numbers. Please note it is also case sensitive.',
		usernameAlreadyInUseValidationMessage: 'Your username needs to be unique. Someone has taken that one already, so please choose another one.',
		password1Question: 'Password',
		password2Question: 'Password (confirm)',
		passwordRequirements: 'Your password should be 8-16 characters long with at least one letter, number and symbol. It\'s case sensitive too.',
		password1HelpMessage: 'Your password should be 8-16 characters long with at least one letter, number and symbol. It\'s case sensitive too.',
		password1ValidationMessage: 'It needs to be tougher than that. Your password should be 8-16 characters long with at least one letter, number and symbol. It\'s case sensitive too.',
		password2HelpMessage: 'Your password should be 8-16 characters long with at least one letter, number and symbol. It\'s case sensitive too.',
		password2ValidationMessage: 'Oops. Your passwords don\'t match. Please have another go.',
		passwordDisclaimer: 'You can save and retrieve your account at a later date, you can use the same password to login. This password will also be the one you use to enrol for online and mobile banking.',

		// Employment Details
		employmentDetailsHeader: 'Employment details',
		employmentDetailsTitle: 'Employment details',
		employmentSectionTitle: 'Employment details',
		employmentSectionSubtitle: undefined,
		employmentSectionIntro: 'Please tell us about your job and income. You\'ll need to know when your job started and the name of your employer.',

		employmentStatusQuestion: 'Employment status',
		employmentStatusHelpMessage: 'Pick the option that suits your current situation at the time of making this application.',
		employmentOccupationHelpMessage: 'Please select the category that closest fits your job description.',
		employmentStartDateQuestion: 'Employment Start Date',
		employmentStartDateValidationMessage: 'Sorry, your employment date doesn’t seem right. Try again?',
		employmentStartDateHelpMessage: 'This should be the date of your first paid day of work in your current job.',
		employerNameValidationMessage: 'Please fill in your employer\'s name as it appears on your payslip',
		employerNameHelpMessage: 'This should be the same as it appears on your payslip',

		// Employment Details - Nationality
		nationalityTitle: 'Nationality',
		nationalityQuestion: 'Nationality',
		nationalityHelpMessage: 'Please select your country of nationality.',
		cityBorn: 'City or town where you were born',
		cityBornValidationMessage: 'Your place of birth must be made up of letters and spaces only.',
		cityBornHelpMessage: 'As it appears on your birth certificate or passport.',
		countryBorn: 'Where you were born',
		countryBornHelpMessage: 'As stated on your birth certificate.',
		ukCitizen: 'Are you a UK citizen?',
		ukCitizenValidationMessage: 'You must be a UK citizen in order to open an account.',
		ukCitizenHelpMessage: 'Select \'Yes\' if you have a UK passport or are eligible for one.',
		hasAdditionalCitizenships: 'Do you have any other citizenships?',
		hasAdditionalCitizenshipsValidationMessage: 'If you\'re not a UK citizen, please tell us where you\'re from.',
		hasAdditionalCitizenshipsHelpMessage: 'If you\'re a legally registered citizen of any other countries, you need to list them here.',
		citizenshipListQuestion: 'What country or countries?',
		citizenshipListValidationMessage: 'Please select a country from each of the additional citizenship options you\'ve selected.',

		// Employment Details - Tax
		taxObligationsTitle: 'Tax',
		hasNoTaxOligations: 'Are you a UK tax resident only?',
		hasNoTaxOligationsHelpMessage: 'Choose "no" if you are not a UK tax resident OR if you have tax obligations in any country in addition to the UK.',
		taxCountryHelpMessage: 'Which country(ies) do you have a tax obligation in? Please ensure you include details of all countries of tax residency, including the UK.',
		taxNumberHelpMessage: 'This is a code or number that is associated with your tax obligation, usually issued by the tax authority of your country of tax residence. It is mandatory that, if your country of tax residency does issue a tax ID number or equivalent, you must provide this for the country entered. If you do not know what this is, or do not have a tax ID for other reasons,  please call us.',
		allTaxObligationsListed: 'I hereby confirm I have no tax obligations other than in the countries listed above.',
		allTaxObligationsListedValidationMessage: 'Please list all your tax obligations.',
		allTaxObligationsListedHelpMessage: 'If you\'ve got a tax obligation that doesn\'t fit these options, please call us.',
		taxObligationListValidationMessage: 'Please add in the detail for each of your additional tax obligations.',
		taxNumberNA: 'Country of Tax Residency does not issue a Tax ID number',
		taxNumberMissing: 'I do not have my Tax ID Number here',
		taxObligationsListCountryFieldName: 'Country of tax residency',
		taxObligationsListHasTaxNumberFieldName: 'Does your country of tax residency issue a tax ID number?',
		taxObligationsListTaxNumberName: 'Tax ID',
		taxNumber0ValidationMessage: 'Letters and numbers only (no symbols or punctuation)',
		taxNumber1ValidationMessage: 'Letters and numbers only (no symbols or punctuation)',
		taxNumber2ValidationMessage: 'Letters and numbers only (no symbols or punctuation)',
		taxNumber3ValidationMessage: 'Letters and numbers only (no symbols or punctuation)',
		taxNumber4ValidationMessage: 'Letters and numbers only (no symbols or punctuation)',

		// Employment Details- Income
		incomeSectionTitle: 'Your income',
		grossAnnualIncome: 'Your annual income before tax',
		grossAnnualIncomeValidationMessage: 'Put in a whole number please, without spaces or commas. For example 30000.',
		grossAnnualIncomeHelpMessage: 'If you are working, please enter your annual salary before tax. Otherwise please enter zero.',
		netMonthlyIncome: 'Your monthly income after tax.',
		incomeSectionCurrentAccountSubtitle: 'Current Account Details',
		incomeSectionSavingsAccountSubtitle: 'Savings Account Details',
		netMonthlyIncomeValidationMessage: 'Please enter whole numbers, without spaces or commas. Your monthly income shouldn’t be more than your annual income divided by 12.',
		netMonthlyIncomeHelpMessage: 'This is the amount you receive each month after tax and deductions. You can include the following incomes: salary, pensions and state benefits (such as disability living allowance, personal independence payment, carers allowance, reduced earnings allowance).',
		hasAdditionalIncome: 'Do you have any other sources of income?',
		hasAdditionalIncomeValidationMessage: 'Please select an answer.',
		hasAdditionalIncomeHelpMessage: 'You might get rent in from somewhere or have a second job, or maybe you get interest from investments? If it\'s something that you declare on your tax returns, you should add it here.',
		incomeOtherAmount: 'How much extra income do you get per year?',
		incomeOtherAmountValidationMessage: 'Put in a whole number please, without spaces or commas. For example 5000.',
		incomeOtherAmountHelpMessage: 'Please tell us the overall figure for your other sources of income. If this is hard to calculate, just add in a realistic amount that you know is a guaranteed amount you can prove. If you’d like some help please call us.',
		incomeOtherFrequency: 'That money tends to come in',
		incomeOtherFrequencyOptionsHelpMessage: 'It\'s possible that income might come unpredictably or at different times. If there is an option that makes sense for the majority of your payments, please choose it. Otherwise, please call us.',

		incomeOtherSavingsAmount: 'How much are you planning on paying into your savings account?',
		incomeOtherSavingsAmountValidationMessage: 'Put in a whole number please, without spaces or commas. For example 5000.',
		incomeOtherSavingsAmountHelpMessage: 'Tell us an overall amount you hope to save annually. If you\'re not sure, add in a realistic number, perhaps based on previous savings habits.',
		incomeOtherSavingsFrequency: 'How often are you planning to pay savings in?',
		incomeOtherSavingsFrequencyHelpMessage: 'If you\'re not sure how often you\'ll be paying in, pick an option that is likely to be one that makes most sense. If you\'re not sure what to put, please call us.',
		incomeOtherSavingsTypeOptions: 'What will you pay into this account?',
		incomeOtherSavingsTypeOptionsHelpMessage: 'Choose the option that feels the most relevant one to you.',
		incomeOtherSavingsPurpose: 'What\'s your main reason for opening this account?',
		incomeOtherSavingsPurposeHelpMessage: 'Please select the main reason for having this account. If there are a few reasons there that make sense to you, just pick one you know is important.',

		incomeOtherPaymentAmount: 'How much will you pay in each month?',
		incomeOtherPaymentAmountValidationMessage: 'Put in a whole number please, without spaces or commas. For example 3000.',
		incomeOtherPaymentAmountHelpMessage: 'This is an overall monthly figure which indicates how much income you plan to pay into your new account.',
		incomeOtherAccountPurpose: 'What\'s your main reason for opening this account?',
		incomeOtherAccountPurposeHelpMessage: 'Please select the main reason for having this account. If there are a few reasons there that make sense to you, just pick one you know is important.',
		incomeOtherAccountPurposeValidationMessage: 'Please select an answer.',
		incomeOtherPaymentType: 'What will you pay into this account?',
		incomeOtherPaymentTypeOptionsHelpMessage: 'Choose the option that feels the most relevant one to you. This should incorporate all your income sources.',
		incomeOtherPaymentTypeOptionsValidationMessage: 'Please select one of the options.',

		// Employment Details - Expenses
		expenditureSectionTitle: 'Your monthly expenditure',
		mortgageOrRentExpenditure: 'Mortgage/Rent expenditure',
		mortgageOrRentExpenditureValidationMessage: 'Put in a whole number please, without spaces or commas. For example 1500.',
		mortgageOrRentExpenditureHelpMessage: 'This is the monthly figure for your rent or mortgage.',
		expenditureOther: 'Other credit payments',
		expenditureOtherValidationMessage: 'Put in a whole number please, without spaces or commas. For example 2000.',
		expenditureOtherHelpMessage: 'The amount you enter here should be the total monthly amount you pay on any personal loans, credit cards and hire purchase agreements.',

		// Review Page
		reviewPageHeader: 'Review',
		reviewTopTitle: 'Review and submit your application',
		reviewTopSubtitle: 'Great, you\'ve finished',
		reviewTopParagraph: 'Please review what you\'ve told us and if necessary edit any of the information you\'ve provided. Please ensure you read all the important information including key features, terms & conditions and tariff.  When you\'re ready, submit. We\'ll take care of the rest.',
		reviewPageTitle: 'Review and submit your application',

		reviewPersonalDetailsTitle: 'Your details',
		reviewSectionPersonalTitle: 'Personal details',
		reviewSectionContactTitle: 'Contact details',
		reviewSectionNationalityTitle: 'Nationality',
		reviewEmploymentDetailsTitle: 'Employment details',
		reviewSectionEmploymentTitle: 'Employment details',
		reviewSectionIncomeTitle: 'Income',
		reviewSectionOutgoingsTitle: 'Expenditure',
		reviewTermsDocumentsTitle: 'Documents for you to read and save',
		reviewTermsDocumentsParagraph: 'We will also email you these documents after you have opened your ',
		reviewImportantInformationTitle: 'Important information',

		termsAndConditionsDocLinkText: 'Terms & Conditions',
		termsAndConditionsDocLinkTitle: 'Download Terms & Conditions PDF. This link will open in a new browser window.',
		termsAndConditionsDocLink: 'static/{}/personal-account-terms.pdf',
		termsAndConditionsDocFileName: 'personal-account-terms.pdf',
		termsAndConditionsDocVersion: '0716',
		lendingCodeDocLinkText: 'A guide to the Lending Code',
		lendingCodeDocLinkTitle: 'Download Lending Code PDF. This link will open in a new browser window.',
		lendingCodeDocLink: 'static/lending-code.pdf',
		lendingCodeDocFileName: 'lending-code.pdf',
		lendingCodeDocVersion: '1.0',
		currentTariffDocLinkText: 'Tariff details',
		currentTariffDocLinkTitle: 'Download Tariff Details PDF. This link will open in a new browser window.',
		currentTariffDocLink: 'static/{}/current-account-tariff.pdf',
		currentTariffDocFileName: 'current-account-tariff.pdf',
		currentTariffDocVersion: '0816',
		savingsTariffDocLinkText: 'Tariff details',
		savingsTariffDocLinkTitle: 'Download Tariff Details PDF. This link will open in a new browser window.',
		savingsTariffDocLink: 'static/{}/savings-account-tariff.pdf',
		savingsTariffDocFileName: 'savings-account-tariff.pdf',
		savingsTariffDocVersion: '08a16',
		CA31DocLink: 'static/{}/CA31.pdf',
		CA31DocLinkText: 'Current Account Control Factsheet',
		CA31DocLinkTitle: 'Download Current Account Control Factsheet PDF. This link will open in a new browser window.',
		CA31DocVersion: '1.0',
		financialServicesCompensationSchemeDocLinkText: 'Financial Services Compensation Scheme Information Sheet',
		financialServicesCompensationSchemeDocLinkTitle: 'Download Financial Services Compensation Scheme Information Sheet PDF. This link will open in a new browser window. ',
		financialServicesCompensationSchemeDocLink: 'static/FSCS_Information_Sheet_DU728.pdf',
		financialServicesCompensationSchemeDocName: 'FSCS_Information_Sheet_DU728.pdf',
		financialServicesCompensationSchemeName: 'FSCS_Information_Sheet_DU728.pdf',
		financialServicesCompensationSchemeDocVersion: '1115',

		reviewKeyFeaturesTitle: 'Key features for the',
		reviewOfferRestrictionsTitle: 'This offer doesn\'t include:',
		reviewAcceptTsAndCs: 'By ticking this box and clicking "Submit" this represents my signature confirming that:',

		// Review page labels - capital LABEL so last section can match up to name of the form element
		reviewLabelsectionPersonalDetails: 'Personal details',

		reviewLabeltitle: 'Title',
		reviewLabelfirstName: 'First Name',
		reviewLabelmiddleName: 'Middle Name',
		reviewLabellastName: 'Last Name',
		reviewLabeldateOfBirth: 'Date of Birth',
		reviewLabelgender: 'Gender',
		reviewLabelmaritalStatus: 'Marital Status',
		reviewLabeldependants: 'No. of Dependants',
		reviewLabeladdresses: 'Address',
		reviewLabelresidentialStatus: 'Residential Status',
		reviewLabeldateMoved: 'Date Moved',
		reviewLabelPreviousaddresses: 'Previous Address',

		reviewLabelsectionContactDetails: 'Contact details',

		reviewLabelemailAddress: 'Email Address',
		reviewLabelpreferredContactMethod: 'Preferred Contact Method',
		reviewLabelphoneNumber: 'Phone Number',

		reviewLabelsectionNationality: 'Nationality',

		reviewLabelnationality: 'Nationality',
		reviewLabelcountryBorn: 'Country of Birth',
		reviewLabelcityBorn: 'City of Birth',
		reviewLabelukCitizen: 'UK Citizen',
		reviewLabelcitizenshipList: 'Additional Citizenships',
		reviewLabeltaxObligations: 'Additional Tax Obligations',
		reviewLabelallTaxObligationsListed: 'All Tax Obligations Listed',

		reviewLabelsectionEmployment: 'Employment details',

		reviewLabelemploymentStatus: 'Employment Status',
		reviewLabelemploymentOccupation: 'Occupation',
		reviewLabelemployerName: 'Employer Name',
		reviewLabelemploymentStartDate: 'Start Date',

		reviewLabelsectionIncome: 'Income',

		reviewLabelgrossAnnualIncome: 'Gross Annual Income',
		reviewLabelnetMonthlyIncome: 'Net Monthly Income',
		reviewLabelincomeOtherAmount: 'Additional Income',
		reviewLabelincomeOtherFrequencyOptions: 'Frequency',

		reviewLabelsectionCA: 'Current Account',

		reviewLabelincomeOtherAccountPurpose: 'Account Purpose',
		reviewLabelincomeOtherPaymentTypeOptions: 'Account Use For',
		reviewLabelincomeOtherPaymentAmount: 'Monthly Pay In',

		reviewLabelsectionSA: 'Savings Account',

		reviewLabelincomeOtherSavingsAmount: 'Pay In Amount',
		reviewLabelincomeOtherSavingsFrequency: 'Frequency',
		reviewLabelincomeOtherSavingsTypeOptions: 'Account Use For',
		reviewLabelincomeOtherSavingsPurpose: 'Account Purpose',

		reviewLabelsectionOutgoings: 'Outgoings',

		reviewLabelmortgageOrRentExpenditure: 'Mortgage / Rent',
		reviewLabelexpenditureOther: 'Other',

		// DGS Documents
		reviewAcceptSaDgs: 'Yes, I agree to the Savings Account Deposit Guarantee Scheme',
		reviewAcceptCaDgs: 'Yes, I agree to the Current Account Deposit Guarantee Scheme',
		DGSDocLink: 'static/CYB00174_FSCS Information Sheet _079601_v10.pdf',
		DGSDocLinkTitle: 'Download Deposit Guarantee Scheme Information Sheet PDF. This link will open in a new browser window.',
		DGSDocName: 'Deposit Guarantee Scheme Information Sheet',
		DGSDocFileName: 'CYB00174_FSCS Information Sheet _079601_v10.pdf',
		DGSDocVersion: '10.0',

		// Marketing Prefs
		marketingPrefsTitle: 'Marketing preferences',
		marketingPrefsText: 'When we have a new product or offer that we think you might be interested in, we\'d like to let you know. Please tell us the best way to stay in touch.',

		// Offer Page
		offerItemSelfService: 'Easy to use phone and internet banking',
		offerItemWithInterest: 'Ongoing 2% AER (variable) interest on balances up to £3000',
		offerItemDebitContactless: 'A Debit MasterCard with Contactless functionality as well as allowing you to withdraw cash at any ' + brand.bankName + ' ATM or UK ATM, subject to available funds. We will tell you your daily ATM withdrawal limit when we send you your Debit MasterCard.',
		offerItemDebitContactlessLimited: 'A Debit MasterCard Online Only card with Contactless functionality allowing you to withdraw up to £350 a day at any ' + brand.bankName + ' ' + (brand.appendBank ? '' : 'Bank') + ' ATM or UK ATM, subject to available funds',

		offerItemCaControl: 'A Debit MasterCard Online Only card with Contactless functionality allowing you to withdraw up to £350 a day at any Clydesdale ATM or UK ATM, subject to available funds.',
		// ready cash offers
		offerItemNoFees: 'There are no fees or charges for this account.',
		offerItemNoCreditInterest: 'This account doesn\'t pay credit interest.',
		offerItemNoOverdrafts: 'Overdrafts are not permitted.',
		offerItemNoBorrowing: 'Borrowing is not available on this account. Requests for unplanned borrowing will usually be declined. {termsAndConditionsDoc}',
		offerItemDebitCard: 'You will receive a Debit MasterCard Online Only card with non contactless functionality allowing you to withdraw up to £350 a day at any Clydesdale ATM or UK ATM, subject to available funds.',
		offerItemDeposits: 'Your eligible deposits with Clydesdale Bank PLC are protected up to a total of £75,000 by the Financial Services Compensation Scheme, the UK’s deposit guarantee scheme. This limit is applied to the total of any deposits you have with Clydesdale Bank, Yorkshire Bank and B. Any total deposits you hold above the limit between these brands are unlikely to be covered. Please see <a href="http://www.cbonline.co.uk/resources/b82e172a-b00f-4783-973b-e4399da349e4/fscs_2015_online-leaflet.pdf" target="_blank" title="www.fscs.org.uk. This link will open in a new browser window">FSCS leaflet<span class="screenreader"> This link will open in a new browser window</span></a> for further information or visit <a href="http://www.fscs.org.uk" target="_blank" title="www.fscs.org.uk. This link will open in a new browser window">www.fscs.org.uk<span class="screenreader"> This link will open in a new browser window</span></a>',
		offerItemDeposits2: 'Your eligible deposits with Clydesdale Bank PLC are protected up to a total of £75,000 by the Financial Services Compensation Sheet, UK’s deposit guarantee scheme. The limit is applied to the total of any deposits you have with Clydesdale and Yorkshire bank. Any deposits you hold above the limit between these brands are unlikely to be covered. B is part of Clydesdale Bank and is not a separate entity for the purposes of this scheme. Please ask for further information, or visit <a href="http://www.fscs.org.uk" target="_blank" title="www.fscs.org.uk. This link will open in a new browser window">www.fscs.org.uk<span class="screenreader"> This link will open in a new browser window</span></a>',
		offerItemCancelation: 'You can cancel your agreement with us within 14 days of opening the account, or from the day you receive the Terms & Conditions if later, by contacting us in branch, phone or in writing. You will need to repay any debit balance, interest and fees incurred within 30 days from the date you tell us you want to cancel it.',

		offerItemInterestCalculation: 'Interest calculated daily',
		offerItemInterestPaid: 'Interest paid last business day of each calendar quarter',
		offerItemNoWithdrawnCharge: 'No charge for withdrawals',
		offerItemnonContactlessCard: 'Non-Contactless Debit MasterCard',
		offerItemTieredRates: 'Tiered interest rates',
		offerItemTransactionFees: 'Transaction fees apply when you use your debit card abroad. Details of the limits and charges which apply are provided in the tariff guide for the account on which your card is issued.',
		offerItemWithdrawalMadeByTransfer: 'Withdrawal may only be made by transfer to your linked current account either in branch or using internet/telephone banking.',
		offerItemInclusionMortgageOffsetting: 'This account is eligible for inclusion in mortgage offsetting arrangements. Any credit balance can be used to set against the debit balance on your Offset Mortgage held with us and so reduce the interest payable on your mortgage. Full details can be found in the Offsetting section of your Terms & Conditions.',

		//happy path savings items
		offerItemHappynonContactlessCard: 'A non-contactless Debit MasterCard as well as allowing you to withdraw cash at any ' + brand.bankName + ' ATM or UK ATM, subject to available funds. We will tell you your daily ATM withdrawal limit when we send you your Debit MasterCard.',
		offerItemHappyWithdrawalMadeByTransfer: 'Withdrawal of funds by transfer to your linked current account either in branch or using internet/telephone banking.',

		//KEY FEATURES FOR INSTANT SAVINGS
		interestRatesInfoNoGross: 'For interest rates, please refer to the savings account tariff for personal customers, our <a href="' + brand.bankWebsite + '/personal/savings/interest-rates-and-charges/" target="_blank" title="' + brand.bankWebsite + '/personal/savings/interest-rates-and-charges/ This link will open in a new browser window">website <span class="screenreader">This link will open in a new browser window</span></a> or the notice displayed in branch.',
		interestRatesInfo: 'For interest rates, please refer to the savings account tariff for personal customers, our <a href="' + brand.bankWebsite + '/personal/savings/interest-rates-and-charges/" target="_blank" title="' + brand.bankWebsite + '/personal/savings/interest-rates-and-charges/ This link will open in a new browser window">website <span class="screenreader">This link will open in a new browser window</span></a> or the notice displayed in branch. Interest will be paid gross.',
		interestCalculation: 'Interest is calculated on a daily basis and paid gross on the last business day of each calendar quarter.',
		nonContactlessCard: 'Debit MasterCard online only non-contactless card.',
		noWithdrawnCharge: 'No charge for withdrawals - Transaction fees apply when you use your debit card abroad. Details of the limits and charges which apply are provided in the tariff guide for the account on which your card is issued.',
		accountAccess: 'You can access your account via Internet, telephone banking, ATM or branch',

		//KEY FEATURES FOR SAVINGS PLUS
		offsetAgainstMortgage: 'Offset your Current account and Savings Account Plus against a Clydesdale Bank Offset Mortgage – you\'ll earn interest on linked savings accounts when the linked credit balances are greater than the balance owed on the mortgage',
		withdrawalMadeByTransfer: 'Withdrawals must be made by transfer to your linked current account or via our telephone, internet and mobile banking services.',
		withdrawalFundsLinked: 'You may only withdraw funds by transfer to your linked current account either in branch or using internet/telephone banking.',

		//KEY FEATURES FOR SIGNATURE SAVINGS
		inclusionMortgageOffsetting: 'This account is eligible for inclusion in mortgage offsetting arrangements. Offset your Signature Current Account and Signature Savings Accounts against a Clydesdale Bank Offset Mortgage - you\'ll earn interest on linked savings accounts when the linked credit balances are greater than the balance owed on the mortgage',

		offerPageUnsuccessfulTitle: 'We are sorry, it appears that you are not eligible for the {productTitle} as you don’t hold the appropriate current account',
		offerPageDowngradeTitle: 'Unfortunately you have been unsuccessful for the {productTitle}',
		offerPageAlternativeOfferTitle: 'However we can offer you our ',
		offerPageAlternativeOfferTitleMulti: 'We can offer you our ',
		offerPageTitle: 'We are pleased to offer you {productArticle} {productName}',
		offerPageAltTitle: 'We are please to offer you a ',
		offerPageSubTitle: 'This offer includes:',
		offerPageIntroTitle: 'This section contains certain key information relating to the Readycash Account. Full details are contained in your Terms & Conditions and Tariff attached below which you should read.',

		offerPageKeyFeaturesTitle: 'Key features for',
		offerPageofferRestrictionsTitle: 'This offer doesn\'t include:',
		offerPageDocumentToReadSectionTitle: 'Documents for you to read and save:',
		offerPageDeclineOffer: 'If there\'s something you\'re undecided about, please call us on ' + brand.phoneNumber + ' or go into a branch.',
		offerConditionsIntro: 'You will receive these by email after you have opened the account.',
		offerTandCQuestion: 'By ticking this box and clicking "Accept offer" this represents my signature confirming that:',
		offerPageContinue: 'Do you wish to continue with the offer of a ',
		offerItemReadyCash: 'A Debit MasterCard Online Only card with Non contactless functionality allowing you to withdraw up to £350 a day at any Clydesdale ATM or UK ATM, subject to available funds.',
		offerItemCaDirectCaPlus: 'A Debit MasterCard with Contactless functionality as well as allowing you to withdraw cash at any Clydesdale ATM or UK ATM, subject to available funds. We will tell you your daily ATM withdrawal limit when we send you your Debit MasterCard.',

		offerPageHeader: 'Offer',
		openAccountButton: 'Yes, open my account',
		declineAccountButton: 'No, do not proceed',
		downgradedOfferPageEmail: 'We will also email you these documents after you have opened the account',


		// Offer Page Mandate
		mandateTitle: '',
		mandateParagraph: 'I confirm that by clicking the \'Yes, open my account\' button this represents my signature and that I am opening an account and reconfirm my authority previously provided.',

		// Mutli Offer & Modal
		altOpenAccountButton: 'Accept offer',
		altDeclineAccountButton: 'Decline offer',
		offerCancelApplicationBtn: 'Cancel application',
		offerCancelApplicationModalTitle: 'Are you sure you want to cancel this application?',
		offerCancelApplicationConfirm: 'Yes',
		offerCancelApplicationDecline: 'No',
		offerCancelIntro: 'If you do not wish to proceed with your application you can cancel below',

		// Mandate items
		mandateBullet1: 'I wish to apply for the account',
		mandateBullet2: 'I have read and accept the Terms & Conditions and Tariff. I have also saved or printed a copy of the Terms & Conditions and Tariff',
		mandateBullet3: 'I acknowledge receipt of the Financial Services Compensation Scheme Information Sheet',
		mandateBullet4: 'I authorise you to undertake any necessary searches and credit checks required to validate my identity and address, and',
		mandateBullet5: 'If my application is accepted and I proceed to open the account, I authorise you to debit to the account all cheques, orders, payments and withdrawals signed or otherwise authorised by me. I also authorise you to debit to the account all transactions made by using any debit cards that you may issue to me',
		mandateBullet6: 'I authorise you to undertake any necessary searches required to validate my identity and address, and',
		mandateBullet7: 'If my application is accepted and I proceed to open the account, I authorise you to debit to the account all withdrawals signed or otherwise authorised by me.',
		mandateBullet8: 'If my application is accepted and I proceed to open the account, I authorise you to debit to the account all withdrawals signed or otherwise authorised by me. I also authorise you to debit to the account all transactions made by using any debit cards that you may issue to me',
		mandateBullet9: 'I wish to apply for this account',
		mandateBullet10: 'I have read and accept the Terms & Conditions and Tariff. I have also saved or printed a copy of the Terms & Conditions and Tariff',
		mandateBullet11: 'I acknowledge receipt of the Financial Services Compensation Scheme Information Sheet',
		mandateBullet12: 'I authorise you to undertake any necessary searches and credit checks required to validate my identity and address, and',
		mandateBullet13: 'If my application is accepted and I proceed to open the account, I authorise you to debit to the account all cheques, orders, payments and withdrawals signed or otherwise authorised by me. I also authorise you to debit to the account all transactions made by using any debit cards that you may issue to me',

		// Deferred Page
		deferredPageHeader: 'Deferred',
		deferredPageTitle: 'We need more time to look at your application',
		deferredPageExplanation: 'A team member needs to go over your application in more detail. We will do this within two working days and you will be notified by email or SMS with a link to log in and see the decision.',

		// ID Deferred Page
		idDeferredPageHeader: 'Verify your identity',
		idDeferredPageTitle: 'We need to see your ID in person',
		idDeferredPageExplanation: 'We have been unable to verify your identity. In order to complete your application, please visit your <a target=\'_blank\' href=\'' + brand.bankWebsite + '/personal/online-locator/' + '\'>local branch</a> with an official form of ID.',
		idDeferredPageNextStepsItems: ['Passport', 'Driving license'],
		idDeferredLinkTitle: 'Download ID Requirements Factsheet PDF. This link will open in a new browser window',
		idDeferredLinkText: 'What ID can I bring?',
		idDeferredLinkUrl: 'http://www.cbonline.co.uk/wcm-media/CYB-Identificatio-Requirements.pdf',

		// Contact Bank Page
		contactBankPageHeader: 'We need your number',
		contactBankPageTitle: 'We need your number',
		contactBankPageExplanation: 'To continue your application we need you to update your mobile details. Please visit your nearest branch or call us on ' + brand.phoneNumber + '.',

		// Sorry Page
		sorryPageHeader: 'Sorry',
		sorryPageTitle: 'We are sorry but after careful consideration we have declined your application',
		sorryPageExplanation1: 'We use a Credit Scoring System and information from credit reference agencies, Experian and Callcredit, to ensure we assess all credit applications fairly and consistently. You can request a copy of your report from the credit reference agencies by clicking on the link below.',
		'sorryPageExplanation1-savings':'We use an identity verification system and information from credit reference agencies, Experian and Call credit, to ensure we assess all applications fairly and consistently.',
		sorryPageExplanation2: 'If you think there are special circumstances related to your application, you can call us to discuss it on ' + brand.phoneNumber + '. Lines are open Monday to Friday 08:00 to 20:00, Saturday 09:00 to 17:00 and closed Sunday.{findOutMore}  We will send you a letter in the post to confirm this decision.',
		'sorryPageExplanation2-savings': 'The details of our identity verification system are confidential and we’re unable to give you any more specific reasons for declining your application. You can request a copy of your report from the credit reference agencies by clicking on the link below.',
		sorryFindOutMore: 'We may be able to offer you an alternative current account to the one you applied for. Please call us to find out more.',
		sorryPageFormLink: 'http://www.experian.co.uk/consumer/statutory-report.html',
		sorryPageFormLink2: 'http://www.callcredit.co.uk',
		sorryPageFormLinkText: 'Click here to visit Experian website',
		sorryPageFormLinkText2: 'Click here to visit Callcredit website',
		sorryPageFormLinkTitle: 'This link will open in a new window',
		sorryPageFormLinkTitle2: 'This link will open in a new window',

		// Decline Page
		declinePageTitle: 'We are sorry, it appears that you are not eligible for the {productName} as you don’t hold the appropriate current account. We note that you did not proceed with our offer of an alternative product.',
		declinePageParagraph1: undefined,
		declinePageParagraph2: undefined,
		declinePageLink1: undefined,
		declinePageLink2: undefined,

		// Registration Page
		registrationPageHeader: 'Registration',
		registrationPageTitle: 'Congratulations, your account has been opened',
		registrationPageSubTitle: 'Your account details and information you\'ll need to make a note of',
		registrationPageParagraph1: 'If you haven’t already registered for internet and telephone banking, you can do so below',
		registrationPageParagraph2: 'For Telephone Banking you\'ll need your customer number – again it\'s above, and your telephone PIN – which you can set up below.',
		registrationPageBulletParagraph: 'For Internet Banking you\'ll need the following details to log in:',
		registrationPageBullet1: 'your customer number - which is above',
		registrationPageBullet2: 'your password - which you created at the start of this application',
		registrationPageBullet3: 'your security questions for Internet Banking - which you can set up below',
		registrationPageErrorMessage: 'There has been a problem registering your {0} credentials. The reason is {1}.',

		alreadyRibRegistered: 'It looks like you\'re already signed up for internet banking, you don\'t need to do anything more here.',
		alreadyTBRegistered: 'It looks like you\'re already signed up for telephone banking, you don\'t need to do anything more here.',

		securityQuestionsTitle: 'Security questions for Internet Banking',
		securityQuestionsSubTitle: 'Please choose some security questions and answers. These will be used when you log in to internet banking.',

		securityPageLoadingMessage: 'Loading...',
		securityPageSubmissionMessage: 'Submitting answers...',

		securityQuestionDropdownValidationMessage: 'Sorry, you can\'t select the same question twice.',
		securityQuestionInputValidationMessage: 'Your answer must be 6-20 characters long, and only contain letters and numbers.',
		securityQuestionDropdownHelpText: 'These questions are a safeguard against the risk of fraud and make your log in to internet banking more secure.',
		securityQuestionInputHelpText: 'Type in a simple answer that you can easily remember for each question. Your answer must be 6-20 characters long, and only contain letters and numbers.',
		telephonePinTitle: 'Telephone Banking',
		telephonePinHelpMessage: 'Your telephone PIN is a special code you\'ll use to identify yourself when you phone up to use telephone banking. It\'s an important security measure. It needs to be a 4 digit number which you can easily remember. Don\'t use the same number more than three times, or have any sequential numbers in there like 1234.',
		telephonePinValidationMessage: 'Pick a 4 digit number, with no consecutive numbers, and without using the same number four times.',
		telephonePin2HelpMessage: 'This needs to be exactly the same as the PIN entered in the box above.',
		telephonePin2ValidationMessage: 'Try again? The PIN numbers didn\'t match.',
		registrationTCsTitle: 'Download and save the Terms & Conditions for Telephone and Internet Banking for your records. These will also be emailed to you.',
		registrationTsAndCsDocLink: 'static/rib-tb-terms.pdf',
		registrationTsAndCsDocVersion: '0815',
		registrationTsAndCsText: 'Terms & Conditions for Telephone and Internet Banking',
		registrationTsAndCsDocLinkTitle: 'Download Terms & Conditions for telephone and internet banking PDF. This link will open in a new browser window.',
		registrationAcceptTCs: 'I confirm by ticking this box that I agree to the Terms & Conditions above.',
		registrationAcceptTCsValidationMessage: 'You need to agree in order to carry on.',

		// Submission Page
		submissionPageHeader: 'Submission',
		submissionPageTitle: 'Thank you for sending us your application',
		submissionPageText: 'We are working on it right now for you.',

		// Security Page
		securityPageTitle: 'We need to ask you a few questions to check your identity',
		timerSectionTitle: 'As a security measure, there\'s a time limit on this section. Please answer the questions within 5 minutes.',
		timerSectionTimeUnitDescription: 'mins',
		timerSectionTimeUnitExpiredDescription: 'Sorry, but you\'ve run out of time.',

		// Account Opened Page
		accountOpenedPageHeader: 'Account Opened',
		accountOpenedPageTitle: 'Good news, you\'re all done',

		accountOpenedSection1Title: 'Check your email',
		accountOpenedSection1Bullet1: 'Shortly we will send you an email with important information for you to read and save. Check your email filters in case it\'s gone straight to your junk/spam folder and you can\'t see it in your inbox.',
		accountOpenedSection1Bullet2: 'You’re all registered for internet banking too. You can use this straight away by going to the login button at the top right of any page on <a href="' + brands.CB.bankWebsite + '" target="_blank" title="www.cbonline.co.uk This link will open in a new browser window">www.cbonline.co.uk <span class="screenreader">This link will open in a new browser window</span></a> or <a href="' + brands.YB.bankWebsite + '" target="_blank" title="www.ybonline.co.uk This link will open in a new browser window">www.ybonline.co.uk <span class="screenreader">This link will open in a new browser window</span></a>. You\'ll need your customer number, password and security details.',
		accountOpenedSection2Title: 'Look out for your post',
		accountOpenedSection2Bullet1: 'You will receive a welcome letter which will confirm the details of your new account, please read through and send us back your specimen signature, as we’ll need this so you can make certain transactions on your account.',
		accountOpenedSection2Bullet2: 'Your Debit MasterCard and PIN are on their way. These will come separately and will be with you within 3-5 working days.',
		accountOpenedSection3Title: 'Useful links',
		accountOpenedSection3Bullet1: 'Download our mobile banking app <a href="' + brand.monetiseLink + '" target="_blank" title="Click here to download our mobile banking app. This link will open in a new browser window">here <span class="screenreader">Click here to download our mobile banking app. This link will open in a new browser window</span></a>',
		accountOpenedSection3Bullet2: '<a href="' + brand.faqsLink + '" target="_blank" title="FAQs. This link will open in a new browser window">FAQ\'s <span class="screenreader">This link will open in a new browser window</span></a> to help answer any queries you may have',
		accountOpenedSection3Bullet3: '',
		accountOpenedSection3Bullet4: '<a href="' + brand.faqsSavingsLink + '" target="_blank" title="FAQs. This link will open in a new browser window">FAQ\'s <span class="screenreader">This link will open in a new browser window</span></a> to help answer any queries you may have',
		accountOpenedSection4Title: 'Contact us',
		accountOpenedSection4Bullet1: 'If you want to include your new account in mortgage offsetting arrangements as this will not be done automatically.',
		accountOpenedSection4Bullet2: '',
		accountOpenedSection4Bullet3: 'If you would like to arrange planned borrowing, subject to eligibility.',
		accountOpenedSection5Title: 'Ways to contact us',
		accountOpenedSection5Bullet1: 'Call us on ' + brand.phoneNumber + ' or pop in to your local branch.',

		// Portal Page
		portalPageHeader: 'Portal',
		portalPageTitle: 'Your saved applications',
		portalPageSubTitle: 'Pick an application to carry on with',

		// Login Page
		loginPageHeader: 'Login',
		loginPageTitle: 'Your saved application',
		loginPageNextButtonLabel: 'Please log in to carry on',
		usernameLabel: 'Please enter your Customer Number or Username',
		usernameValidationMessage: 'Your Customer Number should be a 10 digit number starting with "30". Your Username should be between 6 and 16 characters. It can be made up of letters and numbers and is case sensitive. If you are having difficulty finding these, please call us on ' + brand.phoneNumber + '.',
		usernameHelpMessage: undefined,
		passwordValidationMessage: 'If you are having difficulty remembering this, please call us on 0800 028 3632.',
		passwordHelpMessage: 'Your Internet Banking Password was set up during the registration process.',
		passwordLabel: 'Please enter the following characters from your Internet Banking login password. Characters are case sensitive.',
		passwordCharacterPrefix: 'Character ',
		goneWrongMessage: 'Can you check the details and try again please? Something went wrong but it might work if you try again.',
		tooManyRetries: 'You have exceeded the maximum number of login attempts. Please try again later.',
		cannotBeLoggedIn: 'Sorry we cannot log you in at this time. Please contact us for support.',

		// OTP Authentication Overlay
		OTPTitle: 'We\'ve sent a passcode to your mobile',
		OTPAuthenticationTitle: 'We\'ve sent a passcode to your mobile ending {partial-phone-number}',
		OTPAuthenticationAltTitle: 'We\'ve sent a passcode to your mobile',
		OTPAuthenticationSubTitle: 'You should have received a text on your mobile ending {partial-phone-number} You can\'t proceed past this point unless we have a mobile number saved for you. If you need help call us on ' + brand.phoneNumber + '.',
		OTPAuthenticationAltSubTitle: 'You should have received a text on your mobile. You can\'t proceed past this point unless we have a mobile number saved for you. If you need help call us on ' + brand.phoneNumber + '.',

		OTPAuthenticationTitleResent: 'We\'ve sent you another passcode.',
		OTPAuthenticationSubTitleResent: 'Check your mobile ending {partial-phone-number}',
		passcodeValidationMessage: 'This passcode is required and should be a number of exactly 10 characters.',
		OTPAuthenticationTitleNoOTP: 'Something went wrong',
		OTPAuthenticationSubTitleNoOTP: 'Please try that again.',
		OTPAuthenticationTitleInvalidOTP: 'That\'s not the right passcode.',
		OTPAuthenticationSubTitleInvalidOTP: 'Try again please. The passcode you entered isn\'t the same as the one we texted you.',

		// Switch Page
		switchPageHeader: 'Switch',
		switchPageTitle: 'Switch to us with the Current Account Switch Service',
		switchPageText1: 'If you have an agreed overdraft facility on your old account you will need to arrange a planned borrowing limit with us prior to switching your account to ensure that you can fully transfer any debit balance as part of your switch. You can arrange planned borrowing, subject to eligibility, just pop into your nearest branch or call us on 0800 678 3350.',
		switchPageText2: 'Switching your current account to us from another bank is straightforward with the Current Account Switch Service, we\'ll do everything for you. We\'ll contact your old bank so you don\'t have to worry about letting them know. The Current Account Switch Service is free to use and once you have chosen and agreed your switch date with us, we guarantee it will only take 7 working days, backed by the Current Account Switch Guarantee. On your switch date, your old account will be closed and all your payments and credit balance will be transferred to your new ' + brand.bankName + ' account.',
		switchPageText3: '<strong>Once your switch has started it cannot be stopped</strong>, but the guarantee means that if anything goes wrong we’ll refund any interest or charges made on either your old account or the new one as a result.',
		switchPageText4: 'If you\'re not eligible for the Current Account Switch Service, or you don\'t want to use it, the Payment Transfer Service lets you transfer your Direct Debits and standing orders from your old account to your new account over a 3 month period.',

		wantsToSwitch: 'If you want to use either of these switching services, please click on the \'Yes\' button.',
		wantsToSwitchValidationMessage: 'This is required.',
		switchDetailsTitle: 'Please fill in the following details. Use the details from the old account you’re switching from, and not the new one you’ve just opened.',
		switchAccountNameValidationMessage: 'Your account name must be no more than 18 characters long.',
		switchAccountNameHelpMessage: 'This is the name shown on your account statement.',
		switchAccountNumberValidationMessage: 'This must be 8 numbers long.',
		switchAccountNumberHelpMessage: 'The account number will appear on your account statements.',
		switchSortCodeValidationMessage: 'This is 6 numbers long.',
		switchSortCodeHelpMessage: 'You will see your sort code on your account statements, usually next to the account number.',
		switchHasDebitCardValidationMessage: 'This is required.',
		switchDebitCardPanLabel: 'Your 16-digit Card Number',
		switchDebitCardPanValidationMessage: 'This is the long number on the front of the card.',
		switchDebitCardPanHelpMessage: 'This is the main number across the front of the card, typically printed in bigger characters and usually 16-19 numbers long.',
		switchDebitCardExpirationValidationMessage: 'Please use numbers without any extra characters, so for example January 2017 should be written like this: 0117. The card must not have expired.',
		switchDebitCardExpirationHelpMessage: 'This will be shown on the card as a month and year, typically next to a statement such as \'Expires end\'.',
		switchTypeValidationMessage: 'This is required.',
		switchTypeTitle: 'Please choose a switch option.',
		switchTypeFullSwitch: 'A full switch using the Current Account Switch Service will guarantee that once you have chosen and agreed the switch date with us that the full balance and regular payments associated with your old account will be switched to your new account and your old account will be closed. You will be advised of regular payments that cannot be automatically transferred and any payments made to your old account will be redirected to your new account.',
		switchTypePaymentSwitch: 'The Payment Transfer Service allows you to choose which payments you would like to transfer across to your new account, your old account will not be closed.',
		switchDateValidationMessage: 'The date cannot be in the past. Please remeber to select a date at least 7 working days from now, which is not a weekend or Bank Holiday.',
		switchDateHelpMessage: 'This is the date you would like the switch to take place.',
		switchDateGuidance: 'Please select a date at least 7 working days from now, which is not a weekend or Bank Holiday.',
		switchCloseOldAccount: 'Yes, I agree to you closing my old current account when the switch to my new one is complete.',
		switchCloseOldAccountValidationMessage: 'Please confirm your consent to continue.',
		switchCloseOldAccountHelpMessage: 'This means that we\'ll transfer your balance, direct debits and standing orders before closing the account.',
		switchFullTsAndCsDocLink: 'static/switch-terms-' + brand.bankCode + '.pdf',
		switchFullTsAndCsDocLinkTitle: 'Download Current Account Switch Service Terms & Conditions PDF. This link will open in a new browser window.',
		switchFullTsAndCsDocVersion: '1.0',
		switchFullTsAndCsText: 'Current Account Switch Service Terms & Conditions',
		switchAcceptFullTCs: 'Yes, I agree to the Terms & Conditions above',
		switchAcceptFullTCsValidationMessage: 'Please agree in order to continue.',
		switchPaymentsTsAndCsDocLink: 'static/payment-transfer-' + brand.bankCode + '.pdf',
		switchPaymentsTsAndCsDocLinkTitle: 'Download Payment Transfer Service Terms & Conditions PDF. This link will open in a new browser window.',
		switchPaymentsTsAndCsDocVersion: '1.0',
		switchPaymentsTsAndCsText: 'Payment Transfer Service Terms & Conditions',
		switchAcceptPaymentsTCs: 'Yes, I agree to the Terms & Conditions above',
		switchAcceptPaymentsTCsValidationMessage: 'Please agree in order to continue.',

		// Map Switch Response Codes to Messages
		switchCode000: 'Your switch has been successful',
		switchCode340: 'Sorry, this product is not eligible for switching. However you can do a Payment Transfer. Please call ' + brand.phoneNumber + ' if you require further assistance',
		switchCode365: 'Sorry, this product is not eligible for switching. Please call ' + brand.phoneNumber + ' if you require further assistance',
		switchCode366: 'Sorry, you have inserted the wrong sort code, account number or 16 digit card number. Please re-enter to proceed.',
		switchCode364: 'Sorry, we cannot switch your account at this stage as we have encountered a difficulty. Please call us on ' + brand.phoneNumber + ' ',
		switchCode367: 'We\'re sorry but the provider of the account you wish to switch does not support the Current Account Switch Service. Please select an account which is supported by the Current Account Switch Guarantee Service or call us on ' + brand.phoneNumber + '.',
		switchCode345: 'Sorry, the switch date cannot be a weekend or a bank holiday. Please choose another date which is neither.',
		switchCode346: 'Sorry, the switch date must be 7 or more working days from now.',
		switchCode347: 'Sorry. Your switch date is too far in advance. Please pick a date that is more than 7, and less than 90 days from today.',
		switchCode393: 'Sorry. We\'ve encountered a technical problem. Please try again later or call us on ' + brand.phoneNumber + '.',
		switchCode394: 'Sorry, there is a difficulty with your new account. Please call us on ' + brand.phoneNumber + ' ',
		switchCode395: 'Sorry. We\'ve encountered a technical problem. Please try again later or call us on ' + brand.phoneNumber + '.',
		switchCode349: 'Sorry. We\'ve encountered a technical problem. Please try again later or call us on ' + brand.phoneNumber + '.',
		switchCode350: 'Sorry, we have encountered a difficulty with the data input. Please contact us on ' + brand.phoneNumber + '.',
		switchCode353: 'The switch date chosen is in the past. Please reselect a date 7 or more working days from now',
		switchCode380: 'Sorry, this product is not eligible for The Product Transfer Service. Please call ' + brand.phoneNumber + ' if you require further assistance',
		switchCode402: 'Sorry, the bank you are switching from only supports The Payment Transfer Service. If you require further information contact us on ' + brand.phoneNumber + '.',
		switchCode403: 'We\'re sorry but the provider of the account you wish to switch does not support the Current Account Switch Service. Please select an account which is supported by the Current Account Switch Guarantee Service or call us on ' + brand.phoneNumber + '.',
		switchCode398: 'Sorry. We\'ve encountered a technical problem. Please try again later or call us on ' + brand.phoneNumber + '.',
		switchCode801: 'Sorry. We\'ve encountered a technical problem. Please try again later or call us on ' + brand.phoneNumber + '.',
		switchCode355: 'Sorry. We\'ve encountered a technical problem. Please try again later or call us on ' + brand.phoneNumber + '.',
		switchCode358: 'Sorry. We\'ve encountered a technical problem. Please try again later or call us on ' + brand.phoneNumber + '.',
		switchCode359: 'Sorry. We\'ve encountered a technical problem. Please try again later or call us on ' + brand.phoneNumber + '.',
		switchCode348: 'Sorry. You seem to have already applied to switch this account. If you require more information call us on ' + brand.phoneNumber + '.',
		switchCode361: 'Sorry. We\'ve encountered a technical problem. Please try again later or call us on ' + brand.phoneNumber + '.',
		switchCode362: 'Sorry. We\'ve encountered a technical problem. Please try again later or call us on ' + brand.phoneNumber + '.',
		switchCode363: 'Sorry. We\'ve encountered a technical problem. Please try again later or call us on ' + brand.phoneNumber + '.',
		switchCode389: 'We\'re sorry but we do not have a current mailing address for you. Please contact us on ' + brand.phoneNumber + ' so that we can update your details and allow you to proceed.',
		switchCodeDefault: 'Sorry, something has gone wrong creating your switch application',

		// Authentication Page
		authPageHeader: 'Application',
		authPageSubtitle: 'Please login to continue',
		authPageTitle: 'Authentication',
		authFormTitle: 'Existing customer authentication',
		authFormSubTitle: 'To help us find your customer details, please complete the following authentication questions',
		hasCustomerName: 'Do you have a customer number/username?',
		hasCustomerNameHelpMessage: 'Your Customer Number can be found on your internet banking welcome letter. You can also use the Username you created when you started your application.',
		authChallengeSecurityQuestionValidationMessage: 'This is the answer to the internet banking security question you selected at the time of registration. Please call us if you need help.',
		authPageContact: 'If you need help with your application, or need to update your personal information, please call us on ' + brand.phoneNumber,

		authBankQuestion: 'Please let us know where you have an account',
		authBankIdHelpMessage: 'Please indicate the bank with which you hold an account',
		authFirstNameQuestion: 'First Name',
		authFirstNameHelpMessage: 'Your first name, as shown on your passport or identification.',
		authLastNameQuestion: 'Last Name',
		authLastNameHelpMessage: 'Your last name, as shown on your passport or identification. If your name has changed, for example because of marriage, make sure you use the name that you\'re officially registered with. This must also match our records.',
		authGenderQuestion: 'Gender',
		authGenderHelpMessage: 'This is just to help identify you.',
		authDateOfBirthQuestion: 'Date Of Birth',
		authDateOfBirthHelpMessage: 'You must be at least 18 years old to open an account online.',
		authHouseNumberQuestion: 'House Number',
		authHouseNumberHelpMessage: 'This should be your current address. If you have recently moved, please make sure you have updated your details with us.',
		authStreetQuestion: 'Street',
		authStreetHelpMessage: 'This should be your current address. If you have recently moved, please make sure you have updated your details with us.',
		authPostcodeQuestion: 'Postcode',
		authContactBankError: 'Please contact us for more help.',
		authPostcodeHelpMessage: 'This should be your current postcode. If you have recently moved, please make sure you have updated your details with us.',
		authCheckDetailsError: 'Can you check your details and try again please? Something went wrong but it might work if you try again.',
		authNextButtonText: 'Proceed',
		authFirstNameValidationMessage: 'Please use letters and spaces only.',
		authLastNameValidationMessage: 'Please use letters and spaces only.',
		authDateOfBirthValidationMessage: 'Please enter a valid date in the following format DD-MM-YYYY.',
		authHouseNumberValidationMessage: 'Sorry, your house number must be written using numbers and letters only and no longer than 40 characters.',
		authStreetValidationMessage: 'Your street should be written using numbers and letters only and be no longer than 40 characters.',
		authPostcodeValidationMessage: 'You have not entered a valid postcode, this should be in the format AB1 2AB.',
		authGenderValidationMessage: 'Please select a gender.',
		authPageLoadingMessage: 'Please wait while we load your details...',

		// Authentication Component
		authChallengeTitle: 'Stepup challenge',
		authChallengeSubtitle: '',
		"security-question-0HelpMessage": 'This should be the answer you provided during the registration process.',
		telephoneAuthAccessCode: 'Telephone Access Code',
		telephoneAuthAccessCodeValidationMessage: 'Your Telephone Access code should be a 4 digit number. If you are having difficulty remembering this, please call us on ' + brand.phoneNumber + '.',
		telephoneAuthAccessCodeHelpMessage: 'Your Telephone Access Code is a 4 digit code that was set up during the registration process.',
		telephoneAuthSortCode: 'Sort code',
		telephoneAuthAccountNumber: 'Account number',
		debitCardAuthPan: 'Your 16-digit Card Number',
		debitCardAuthSortCode: 'Sort code',
		debitCardAuthAccountNumber: 'Account number',
		panHelpMessage: 'Your Card Number is a 16 digit number that appears across the front of your debit card.',
		accessCodeHelpMessage: 'Your Telephone Access Code is a 4 digit code that was set up during the registration process.',
		sortCodeHelpMessage: 'Your Sort Code is a 6 digit number starting with "05". It will appear on the front of your debit card.',
		accountNumberHelpMessage: 'Your Account Number is an 8 digit number. It will appear on the front of your debit card and bank statements.',
		panValidationMessage: 'Your Card Number should be a 16 digit number. If you are having difficulty finding this, please call us on 0800 028 3632.',
		accessCodeValidationMessage: 'Your Telephone Access code should be a 4 digit number. If you are having difficulty remembering this, please call us on ' + brand.phoneNumber + '.',
		sortCodeValidationMessage: 'Your Sort Code should be a 6 digit number without any spaces. If you are having difficulty finding this, please call us on ' + brand.phoneNumber + '.',
		accountNumberValidationMessage: 'Your Account Number should be an 8 digit number. If you are having difficulty finding this, please call us on ' + brand.phoneNumber + '.',

		// Error Page
		upgradeBrowserMessage: '<p class="browsehappy">Sorry, our online application does not support your browser. please <a href="http://browsehappy.com/" target="_blank" title="www.browsehappy.com This link will open in a new browser window.">update your browser <span class="screenreader">www.browsehappy.com This link will open in a new browser window.</span></a> to a newer version or try again with a different browser</p><p>You can close this window to return to the site to see other ways to apply.</p>',
		errorPageHeader: 'Error',
		errorPageTitle: 'Sorry there has been a technical problem',
		errorPageText1: 'Something has gone wrong in the background.',
		errorPageText2: 'While we\'re sorting it out, can you please call us instead on ' + brand.phoneNumber + '. Lines are open Monday to Friday, 8am-6pm and Saturday 9am-5pm.',

		// Setup in Progress Page
		setupInProgressHeader: 'Setup',
		setupInProgressTitle: 'Sorry, there\'s been a slight technical hitch',
		setupInProgressText1: 'Your account will be open and ready the next working day.',
		setupInProgressText2: 'We\'ll let you know as soon as it\'s available so you can register for online banking, telephone banking and account switching.',
		setupInProgressText3: 'We look forward to being in touch very soon.',

		// Any page
		missingRequiredFields: 'Call us on ' + brand.phoneNumber + ' to add the information below and continue with your application:',
		datePickerHelpMessageSuffix: 'Click on the month/year to start entering your dates. There’s no need to scroll. The date entered should be formatted DD-MM-YYYY.',
		newBrowserWindowTitle: 'This link will open in a new browser window',

	};

	// Address validations. There is a max of 15 so create 15 of these.
	for (var i = 0; i < 15; i++) {
		result['addressPrefix_' + i + 'ValidationMessage'] = 'Sorry, your flat number must be written using numbers and letters only and no longer than 40 characters.';
		result['addressPrefix_' + i + 'HelpMessage'] = 'This is the flat number of your house or apartment.';
		result['houseNumber_' + i + 'ValidationMessage'] = 'Sorry, your house number must be written using numbers and letters only and no longer than 40 characters.';
		result['houseNumber_' + i + 'HelpMessage'] = 'This is the number of your house or apartment.';
		result['houseName_' + i + 'ValidationMessage'] = 'Sorry, your house name must be written using numbers and letters only.';
		result['houseName_' + i + 'HelpMessage'] = 'This is the name of your house or apartment.';
		result['streetName_' + i + 'ValidationMessage'] = 'Your street name should be written using numbers and letters only and be no longer than 40 characters.';
		result['streetName_' + i + 'HelpMessage'] = 'Your street name should be written using number and letters only.';

		for (var j = 1; j < 5; j++) {
			result[['addressLine', j, '_', i, 'ValidationMessage'].join('')] = 'Your address line ' + j + ' should be written using numbers and letters only and be no longer than 40 characters.';
			result[['addressLine', j, '_', i, 'HelpMessage'].join('')] = 'Your address line ' + j + ' should be written using number and letters only.';
		}

		result['city_' + i + 'ValidationMessage'] = 'Your town should be written using numbers and letters only and no longer than 40 characters.';
		result['city_' + i + 'HelpMessage'] = 'Please tell us which town or city this address is in.';
		result['county_' + i + 'ValidationMessage'] = 'Your county should be written using numbers and letters only and no longer than 40 characters.';
		result['county_' + i + 'HelpMessage'] = 'Please tell us which county this address is in.';
		result['country_' + i + 'ValidationMessage'] = 'Please select a valid option from the dropdown.';
		result['country_' + i + 'HelpMessage'] = 'Your current address must be in the UK, but for previous addresses, please tell us which country you lived in.';
		result['dateMoved_' + i + 'ValidationMessage'] = 'For current addresses, the date you moved in needs to be before today. If it\'s a previous address, it should be an earlier date than any addresses listed above it.';
		result['dateMoved_' + i + 'HelpMessage'] = 'Please enter the day month and year you moved to this address.';
		result['postcode_' + i + 'ValidationMessage'] = 'Please check as this postcode can\'t be found. Postcodes are normally formatted like this - A12 3BC - if yours still can\'t be found please call the team at B on ' + brand.phoneNumber + '.';
		result['postcode_' + i + 'HelpMessage'] = 'You need to supply a valid postcode for any UK address you add. These are normally formatted like this: A12 3BC. If you live at a BFPO address, please call us.';
	}

	return Object.freeze(result);
})();
