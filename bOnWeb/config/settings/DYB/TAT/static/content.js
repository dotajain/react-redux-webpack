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

	var brand = brands.DYB;

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

		// Document
		documentTitle: brand.bankName + ' Bank',
		navigationWarning: 'If you refresh or leave this page, you\'ll lose any unsaved progress. Are you sure you want to leave?',

		// Header Logo
		headerLogoAlt: brand.bankName + ' Bank Logo',

		// Side Progress Bar
		sidebarStep1: 'About you',
		sidebarStep2: 'Your money',
		sidebarStep3: 'All systems go',

		// Key Features
		noMonthlyFee: 'There is no monthly fee for this account.',
		noMonthlyFeeOrCharges: 'There are no fees or charges for this account.',
		monthlyFee: 'A Monthly Maintenance Fee of £2 applies to the B banking service and will be applied following a 12 month free period. Full details can be found in your Terms and Conditions and Tariff.',
		variableCreditInterest: 'Variable credit interest is payable on this account on credit balances.',
		noCreditInterest: 'This account doesn\'t pay credit interest.',
		interestUpTo3000: 'Interest is payable on this account on credit balances up to £3000.',
		noUnplannedBorrowing: 'Borrowing is not available on this account. Requests for unplanned borrowing will usually be declined. An item returned unpaid costs £15. Full details can be found in the Borrowing section of your Terms and Conditions and in your Tariff.',
		plannedBorrowing125: 'Planned borrowing is available on this account, subject to eligibility. The cost of this is £6 per month plus interest. Requests for unplanned borrowing will usually be declined. Full details can be found in the Borrowing section of your Terms and Conditions and in your Tariff.',
		plannedBorrowing: 'Borrowing is available on this account, subject to eligibility, and is usually more expensive if not agreed in advance. Planned borrowing costs £6 per month plus interest. Unplanned borrowing costs £6 per day. An item returned unpaid costs £15. Full details can be found in the Borrowing section of your Terms and Conditions and in your Tariff.',
		fscsCovered: 'Your eligible deposits with Clydesdale Bank PLC are protected up to a total of £75,000 by the Financial Services Compensation Scheme, the UK\'s deposit guarantee scheme. This limit is applied to the total of any deposits you have with Clydesdale Bank, Yorkshire Bank and B. Any total deposits you hold above the limit between these brands are unlikely to be covered. Please see <a href="http://www.cbonline.co.uk/resources/b82e172a-b00f-4783-973b-e4399da349e4/fscs_2015_online-leaflet.pdf" target="_blank" title="www.fscs.org.uk. This link will open in a new browser window">FSCS leaflet<span class="screenreader"> This link will open in a new browser window</span></a> for further information or visit <a href="http://www.fscs.org.uk" target="_blank" title="www.fscs.org.uk. This link will open in a new browser window">www.fscs.org.uk<span class="screenreader"> This link will open in a new browser window</span></a>',
		defaultCancellationPolicy: 'You can cancel your agreement with us within 14 days of opening the account, or from the day you receive the Terms and Conditions, if later, by contacting us in branch, by phone or in writing.  You will need to repay any debit balance, interest and fees incurred within 30 days of the date you tell us you want to cancel it.',
		mortgageSaver: 'Both B Current and B Instant Savings accounts are eligible for inclusion in mortgage offsetting arrangements. Any credit balance can be used to set against the debit balance on your Offset Mortgage held with us and so reduce the interest payable on your mortgage. Full details can be found in the Offsetting section of your Terms and Conditions',
		accountClosureInfo: 'If you close all of your B Current accounts, you\'ll no longer have access to the B app (unless you hold another account that the team at B agree can be used to access the app) and your B Instant Savings accounts will be closed or transferred to another instant savings account.',
		caDirectKeyFeature: 'This account requires a minimum deposit of £1000 per month (excluding transfers from other accounts held with us), and that you must register for telephone and internet services and use these for day-to-day banking. Please note, if you fail to meet these criteria, we may change your account to a Current Account Plus which has different interest rates.',
		caDirectKeyFeature2: 'You can have a maximum of 2 Current Account Direct accounts, of which only one may be a sole account.',

		// Key Features B
		keyFeatureRequirements: 'You are applying for both a B Current account and a B Instant Savings account. Both are required to take full advantage of all the features of B.',
		keyFeatureRequirementsB:'You will need both a compatible tablet and compatible mobile phone to access the full range of services available in the B app, though other mobile phones can still be used to receive SMS alerts',
		keyFeatureCreditIterest: 'Credit interest is payable on both the current and the savings account; please refer to your Tariff for rates.',
		keyFeatureTransfer: 'If you want to take money out of your B Instant Savings account, you need to transfer the money into your B Current account first and make your payment from there. You will be able to make transfers from your B Instant Savings account to some other accounts you hold with us',
		keyFeatureNoDirectDebitSavings: 'No standing orders or Direct Debits can be set up on your B Instant Savings account',
		keyFeaturesComplaints: 'We are committed to providing our customers with the best possible service but more information can be found in the Terms and Conditions about what to do if you have a complaint.',
		serviceCommitmentB: 'We are committed to providing our customers with the best possible service but more information can be found in the Terms and Conditions about what to do if you have a complaint. ',
		overdraftFacilityB: 'Borrowing is available on the B Current account, subject to eligibility.  Going overdrawn is usually more expensive if not arranged in advance. Planned borrowing costs £6 per month plus interest. Unplanned borrowing costs £6 per day. An item returned unpaid costs £15. Full details can be found in your Terms and Conditions and in your Tariff. Borrowing is not allowed on the B Instant Savings account.',
		packagedAccountOpening: 'Both a current account and a savings account will be opened at the same time so you can take full advantage of all the features of the B app.',
		creditInterestPaid: 'Credit interest is payable on both the current and the savings account; please refer to your Tariff for rates.',
		savingsWithdrawals: 'You can’t make withdrawals directly from your B Instant Savings; you need to first transfer money into your B Current account and make the payment from there. You can transfer money from your B Instant Savings account to your B Current account, or any other account that we allow you to make a transfer into using one of our services. Apart from these transfers, you won’t be able to make payments directly to other accounts from B Instant Savings. No standing orders or Direct Debits can be set up on your B Instant Savings account.',
		creditBalanceMortgage: 'Any credit balance in this account may be used to reduce the debit interest calculated on your mortgage account with us.',
		noticeOfChanges: 'We will usually give you two months’ notice of any changes. The Terms and Conditions detail any that we may make sooner.',

		downgradedOfferPageKeyFeaturesTitle: 'Key features for the',
		downgradedOfferKeyFeaturesParagraph: 'This section contains certain key information relating to this alternative offer of a Readycash Account. Full details are contained in your terms & conditions and tariff attached below which you should read.',

		// Offer Restrictions ReadyCash
		noCheckbook: 'Chequebook facilities.',
		noMortgageOffset: 'The ability to offset against a mortgage product.',
		noLinkedSavings: 'Linked savings account.',
		noBapp: 'The B app.',

		// SideBar
		sideBarTitle: 'Need help?',
		sideBarContentLine1: 'Call us on:',
		sideBarContentLine2: brand.phoneNumber + ',',
		sideBarContentLine3: 'Monday to Sunday 08:00 to 22:00.',
		sideBarContentLine4: undefined,
		sideBarContentLine5: undefined,

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
		landingPageIntro: 'By the time you\'re finished, if all goes to plan, you should be all set up with a B Current account, B Instant Savings account and B Debit Card. You\'ll need to register for Internet and Telephone banking and will also have the option to use the Current Account Switch Service.',
		landingPageIntro1: 'Please be aware our online application does not currently offer the ability to arrange an overdraft. If you require an overdraft and are planning to use the Current Account Switch Service, please call us or go into a branch.',
		landingPageQuestionsNote: 'If you’re experiencing difficulties or there are other special circumstances related to your application, then it may be that our Basic Banking Account Readycash may suit your needs better than B. If you think this is the case, please call the team at B on 0800 678 3654 or call into one of our branches.',
		existingCustomerTitle: 'Existing customer?',
		initialQuestionsTitle: 'First, a few questions.',
		initialQuestionsSubtitle: undefined,
		infoToApplyTitle: 'Apply for B',
		infoToApplyIntro: 'Before you start you\'ll need about 15 minutes and a few facts at your fingertips:',
		infoToApply1: 'Where you\'ve lived',
		infoToApply2: 'What you do for a living',
		infoToApply3: 'General information about your income and expenditure',
		infoToApply4: 'General information about your financial history',
		infoToApply5: '',
		isExistingCustomer: 'Have you ever held an account with ' + brand.bankName + ' Bank?',
		isExistingCustomerHelpMessage: 'Even if you held this account in the past, please select Yes.',
		isExistingCustomerValidationMessage: 'Sorry, you can\'t apply online, so please call us instead and apply over the phone. Or, if you prefer, go into a branch and ask for help there.',

		infoToApplyFooter1: 'Great. Let\'s go.',

		// Eligibility Questions
		eligibilityAge18Question: 'Are you 18 or over?',
		eligibilityAge18QuestionValidationMessage: 'As you\'re under 18 please call, or pop into your local branch of Clydesdale or Yorkshire Bank for a chat.',
		eligibilityAge18QuestionHelpMessage: 'To sign up for B online you need to be 18 or over. So if you\'re 16 or 17 you\'ll need to pop into a local branch of Clydesdale or Yorkshire Bank to go through your options.',
		eligibilityAge16Question: 'Are you 16 or over?',
		eligibilityAge16QuestionValidationMessage: 'Sorry, but if you\'re under 16 we can\'t offer you this account at the moment. But we do have some other products that might be of interest. Click on the link to find out more: <a href="#">CA Plus</a> &amp; <a href="#">Jumpstart</a>',
		eligibilityAge16QuestionHelpMessage: 'You need to be 16 or over to have a bank account.',

		eligibilityUKResidentQuestion: 'Do you live in the UK?',
		eligibilityUKResidentQuestionValidationMessage: 'We need to ask you a few questions we can\'t cover online. Can you please call us and we\'ll explain what\'s involved.',
		eligibilityUKResidentQuestionHelpMessage: 'You can answer Yes if you are a UK resident. Even if you were born abroad or used to live outside the UK. Feel free to call if you\'re unsure about anything.',
		eligibilityDeviceQuestion: 'Got the right device? Are you sure B will work on both your tablet and mobile phone?',
		eligibilityDeviceQuestionValidationMessage: 'You will need both a compatible tablet and a compatible mobile phone to take full advantage of all the features of the B app, though other mobile phones can still be used to receive SMS alerts',
		eligibilityDeviceQuestionHelpMessage: 'For details of the operating systems and example mobile and tablet devices supported by the B app, please visit: <a href="http://www.youandb.co.uk/devices" target="_blank" title="www.youandb.co.uk/devices. This link will open in a new browser window">www.youandb.co.uk/devices <span class="screenreader">This link will open in a new browser window</span></a>.',

		// Terms and Conditions
		eligibilityTermsTitle: 'Using your personal information',
		eligibilityTerms1: 'The information you provide will be used to assess your application, and set up and manage your accounts.',
		eligibilityTerms2: 'A full description of how and for what purposes your information may be processed <a href="static/DU1950.pdf" target="_blank" title="Download Personal Information Statement PDF. This link will open in a new browser window" aria-label="Download Personal Information Statement PDF. This link will open in a new browser window.">can be viewed here <span class="screenreader">Download Personal Information Statement PDF. This link will open in a new browser window</span></a>.',
		eligibilityTerms3: 'We will share your information with credit reference agencies to help determine what credit products and services we can provide you. These agencies will use the information for assessing credit applications, debt tracing and prevention of money laundering.',
		eligibilityTerms4: 'If false or inaccurate information is provided and fraud is identified, details will be passed to fraud prevention agencies to prevent fraud and money laundering. Further details explaining how the information is held by fraud prevention agencies can be found in our Use of Personal Information Statement.',
		eligibilityTermsClosingText: undefined,
		acceptTsAndCs: 'I agree to the Use of Personal Information above.',
		dataProtectionDocDownloadLabel: 'Download as PDF',
		dataProtectionDocLink: 'static/DU1950.pdf',
		dataProtectionDocLinkTitle: 'Download Personal Information Statement PDF. This link will open in a new browser window.',
		dataProtectionDocFileName: 'DU1950.pdf',
		dataProtectionDocVersion: 'I',

		// Step 1 - Your Details
		personalDetailsPageHeader: 'Personal details',
		personalDetailsTitle: 'Now for some form filling',
		personalDetailsGuidance: 'As part of B\'s security measures you aren\'t able to change your details at this stage. But don\'t worry, if anything needs updating please call the team at B on ' + brand.phoneNumber + '.',
		personalDetailsSubtitle: undefined,

		titleQuestion: 'Title',
		titleHelpMessage: 'Please select from the given list.',
		firstNameQuestion: 'First Name',
		firstNameValidationMessage: 'Please use letters and spaces only.',
		firstNameHelpMessage: 'Just using letters and spaces as it appears on your passport or driving licence.',
		hasMiddleNameQuestion: 'Do you have a middle name?',
		hasMiddleNameHelpMessage: 'Just using letters and spaces as it appears on your passport or driving licence.',
		middleNameQuestion: 'Middle Name',
		middleNameValidationMessage: 'Please use letters and spaces only.',
		lastNameQuestion: 'Last Name',
		lastNameValidationMessage: 'Please use letters and spaces only.',
		lastNameHelpMessage: 'Please use your last name as it appears in your passport or driving licence.',
		dateOfBirthQuestion: 'Date of birth',
		dateOfBirthValidationMessage: 'You need to be at least 18 to register for B.',
		dateOfBirthHelpMessage: 'To sign up for B online you need to be 18 or over. So if you\'re  16 or 17 you\'ll need to pop into a local branch of Clydesdale or Yorkshire Bank to go through your options.',
		genderQuestion: 'Gender',
		genderHelpMessage: 'This is just to help identify you.',
		genderValidationMessage: 'Please confirm if your title and gender are both correct on ' + brand.phoneNumber,
		maritalStatusQuestion: 'Marital status',
		maritalStatusHelpMessage: 'This is just to help identify you.',
		hasDependantsQuestion: 'Do you have any dependants?',
		hasDependantsHelpMessage: 'A dependant is anyone who relies on your help and support - a child for instance.',
		personalDetailsFoundValidationMessage: 'You look familiar... If you\'re already a customer <a href="{websiteBaseDirectory}account-opening/authentication?applyFor={productCode}">please login to continue</a>.',

		// Step 1 - Addresses
		addressTitle: 'Where do you live?',
		addressSubtitle: 'If you\'ve lived at this address for less than three years, you\'ll need to add your other previous addresses too.',
		postcodeQuestion: 'Postcode',
		addressLookupError: 'We were unable to look up your postcode. Please try again or contact us to proceed.',
		addressNoExactMatch: 'Don\'t see your exact address? Contact us to proceed.',
		previousAddressTitle: 'Previous address',
		previousAddressSubtitle: 'We need to know where you\'ve been living for the last 3 years.',
		residentialStatusHelpMessage: 'Choose the option that best describes your situation, so for instance if you pay a mortgage choose Owner.',
		residentialStatusValidationMessage: 'Please select an option from the dropdown list.',
		residentialStatusQuestion: 'Living arrangement',
		dateMovedQuestion: 'When you moved here',
		removeAddressButtonLabel: 'Remove Address',
		postcodeSearchButtonLabel: 'Find address',
		postcodeSearchLegend: 'Postcode',
		selectAddressPlaceholder: 'Please select your address...',
		selectAddressLabel: 'Select your address',
		selectAddressSelectButtonText: 'Select',
		addressesQuestion: 'Postcode',
		addressTypeQuestion: 'Did you live in the UK?',
		addressInvalidMessage: 'Something isn\'t right with your postcode, please contact the team at ' + brand.bankName + ' on ' + brand.phoneNumber,

		// Step 1 - Contact Details
		contactDetailsTitle: 'Now for your contact details',
		contactDetailsIntro: 'Please give the mobile phone number and email address you want to be used in future.',
		phoneNumberQuestion: 'Mobile number',
		phoneNumberValidationMessage: 'This should be 11 characters long and numbers only. No spaces or symbols.',
		phoneNumberHelpMessage: 'This should be 11 numbers long with no spaces or symbols. You must give a mobile number to be able to use the B app in full.',
		emailAddressQuestion: 'Email address',
		emailAddressValidationMessage: 'Hmm. Can you check your email address please? Looks like there\'s a typo in there somewhere.',
		emailAddressHelpMessage: 'If you don\'t want to receive offers by email tell us in the \'How would you like to be contacted?\' section below. We\'ll still need your email address to send you important documents, including your Terms and Conditions.',
		emailAddressConfirmationQuestion: 'Confirm email address',
		emailAddressConfirmationValidationMessage: 'Oops. Your email address doesn\'t match with the first. Can you give it another go?',
		emailAddressConfirmationHelpMessage: 'Please type your email address again. Thanks.',
		contactMethodTitle: 'How would you like to be contacted?',
		contactMethodIntro: 'Tell us how we can get in touch with you. When it comes to security, the team at B will always try to contact you on your mobile. You\'ll never get a request for your login details by email or text.',
		preferredContactMethodQuestion: 'I\'d prefer to be contacted by',
		contactMethodsValidationMessage: 'Please select at least one contact method.',

		// Step 1 - Select Your Bank
		selectBankTitle: 'If you ever need to see us',
		selectBankQuestion: 'Which bank is handy for you?',
		selectBankSubtitle: 'You’ll be able to manage your account online and you can call us too, but if you ever need to see us in person use the links below to find your nearest branch now.',
		bankIDHelpMessage: 'Please select one of the banks, which seems the best fit for your location. Please call us if you\'re not sure.',
		bankIDValidationMessage: 'This is required.',
		selectBankHelpText: 'For CHAPS and international payments, plus some other transaction types, you’ll have to visit your local branch.',

		selectBankHelpLinkCb: 'http://www.cbonline.co.uk/personal/online-locator/',
		selectBankHelpLinkCbText: 'Clydesdale Bank Branch Locator',
		selectBankHelpLinkCbTitle: 'Clydesdale Bank Branch Locator link. This link will open in a new browser window',
		selectBankHelpLinkYb: 'http://www.ybonline.co.uk/personal/online-locator/',
		selectBankHelpLinkYbText: 'Yorkshire Bank Branch Locator',
		selectBankHelpLinkYbTitle: 'Yorkshire Bank Branch Locator link. This link will open in a new browser window',

		// Step 1 - Username and Password
		setPasswordTitle: 'Your username and password',
		usernameInfo: 'When you create your username and password make sure they’re memorable, as you\'ll need them to log on in future, for internet banking and signing up to the B app. The username you choose can\'t be changed and team at B won\'t be able to remind you of it if you forget it.',
		additionalUsernameInfo: 'Once you\'ve set them you\'ll be able to save your application form and log back in if you need to take a break.',
		unsavedUsernameHelpMessage: 'Your username must be 6-16 characters in length, using only letters and numbers. It\'s also case sensitive.',
		unsavedUsernameValidationMessage: 'Your username must be 6-16 characters in length, using only letters and numbers. It\'s also case sensitive.',
		usernameAlreadyInUseValidationMessage: 'Sorry, that username happens to be already in use.',
		password1Question: 'Password',
		password2Question: 'Password (confirm)',
		passwordRequirements: 'Your password should be 8-16 characters long with at least one letter, number and symbol. It\'s case sensitive too.',
		password1HelpMessage: 'Your password should be 8-16 characters long with at least one letter, number and symbol. It\'s case sensitive too.',
		password1ValidationMessage: 'It needs to be tougher than that. Your password should be 8-16 characters long with at least one letter, number and symbol. It\'s case sensitive too.',
		password2HelpMessage: 'Your password should be 8-16 characters long with at least one letter, number and symbol. It\'s case sensitive too.',
		password2ValidationMessage: 'Oops. Your passwords don\'t match. Please have another go.',
		passwordDisclaimer: 'If you have to leave the application for any reason and want to save and log back in later, you can use the same password to login. This password will also be the one you use to sign up to the B app.',
		passwordLastWarning: 'Never give your security details to anyone either in person, by email or by text. Clydesdale or Yorkshire Bank will NEVER email or text you asking for username or password, or for details of your accounts or cards.',

		// Employment Details
		employmentDetailsHeader: 'Employment details',
		employmentDetailsTitle: 'Employment details',
		employmentSectionTitle: 'You and your money',
		employmentSectionSubtitle: undefined,
		employmentSectionIntro: '',

		employmentStatusQuestion: 'Job status',
		employmentStatusHelpMessage: 'Choose an option that best describes your job.',
		employmentOccupationHelpMessage: 'Which occupation is closest to yours?',
		employmentStartDateQuestion: 'When did you start work there?',
		employmentStartDateValidationMessage: 'Sorry, your employment date doesn’t seem right. Try again?',
		employmentStartDateHelpMessage: 'What was your start date at this job?',
		employerNameValidationMessage: 'Oops! You missed one. Please fill this in to keep going.',
		employerNameHelpMessage: 'If you work for yourself just put your own name here',

		// Employment Details - Nationality
		nationalityTitle: 'Where are you from?',
		nationalityQuestion: 'Your nationality',
		nationalityHelpMessage: 'Please select your country of nationality.',
		cityBorn: 'City or town where you were born?',
		cityBornValidationMessage: 'Letters and spaces only. No numbers or characters.',
		cityBornHelpMessage: 'As it\'s written on your birth certificate or passport.',
		countryBorn: 'Country where you were born?',
		countryBornHelpMessage: 'As it\'s written on your birth certificate or passport.',
		ukCitizen: 'Do you have a UK citizenship?',
		ukCitizenValidationMessage: 'You must be a UK citizen in order to open an account.',
		ukCitizenHelpMessage: 'If you have a UK passport you definitely have UK citizenship. If you have a visa and you\'re not sure if it covers citizenship please call the team at B on ' + brand.phoneNumber + '.',
		hasAdditionalCitizenships: 'Are you a citizen of any other country or countries?',
		hasAdditionalCitizenshipsValidationMessage: 'If you\'re not a UK citizen, please tell us where you\'re from.',
		hasAdditionalCitizenshipsHelpMessage: 'If you\'re a legally registered citizen of another country please tell us below.',
		citizenshipListQuestion: 'What country or countries?',
		citizenshipListValidationMessage: 'Please select a country from each of the additional citizenship options you\'ve selected.',

		// Employment Details - Tax
		taxObligationsTitle: 'Now for your tax status',
		taxStatusIntro: 'Don\'t worry, this information won\'t be shared. If you\'re not sure about anything call the team at B on ' + brand.phoneNumber + '.',
		hasNoTaxOligations: 'Are you a UK tax resident only?',
		hasNoTaxOligationsHelpMessage: 'Choose "no" if you are not a UK tax resident OR if you have tax obligations in any country in addition to the UK.',
		taxCountryHelpMessage: 'Which country(ies) do you have a tax obligation in? Please ensure you include details of all countries of tax residency, including the UK',
		taxNumberHelpMessage: 'This is a code or number that is associated with your tax obligation, usually issued by the tax authority of your country of tax residence. It is mandatory that, if your country of tax residency does issue a tax ID number or equivalent, you must provide this for the country entered. If you do not know what this is, or do not have a tax ID for other reasons,  please call us.',
		allTaxObligationsListed: 'I confirm that I have no tax obligations other than in the countries listed above.',
		allTaxObligationsListedValidationMessage: 'Please list all the ways you\'re liable for tax.',
		allTaxObligationsListedHelpMessage: 'If you\'ve got a tax obligation that doesn\'t fit these options, please call us.',
		taxObligationListValidationMessage: 'Please list all the ways you\'re liable for tax.',
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
		incomeSectionTitle: 'Money coming in',
		grossAnnualIncome: 'Roughly how much do you earn a year before tax?',
		grossAnnualIncomeValidationMessage: 'Keep it simple please. No dots, commas or even a £.',
		grossAnnualIncomeHelpMessage: 'If you\'re working, please enter your annual salary before tax. Otherwise please enter zero.',
		netMonthlyIncome: 'Approximately how much goes into your bank account a month, after tax?',
		incomeSectionCurrentAccountSubtitle: 'Current Account Details',
		incomeSectionSavingsAccountSubtitle: 'Saving up',
		incomeSectionSavingsAccountIntro: 'Imagine you could put some money aside to do more of the things you\'ve always wanted to do.',
		netMonthlyIncomeValidationMessage: 'Keep it simple please. No dots, commas or even a £. If your income goes up and down just type in an average. Your monthly income shouldn’t be more than your annual income divided by 12.',
		netMonthlyIncomeHelpMessage: 'This is the amount you receive each month after tax and deductions. You can include the following incomes: salary, pensions and state benefits (such as disability living allowance, personal independence payment, carers allowance, reduced earnings allowance).',
		hasAdditionalIncome: 'Aside from the above, do you bring in extra income from anything else?',
		hasAdditionalIncomeValidationMessage: 'Please select an answer.',
		hasAdditionalIncomeHelpMessage: 'You might get rent in from somewhere or maybe you get interest from investments? If it\'s something that you declare on your tax returns, you should add it here.',
		incomeOtherAmount: 'What does that extra income add up to over a year?',
		incomeOtherAmountValidationMessage: 'Please estimate how much extra income you earn a year, not including your salary.',
		incomeOtherAmountHelpMessage: 'Try to come up with a rough estimate that doesn\'t include your salary.',
		incomeOtherFrequency: 'That money tends to come in',
		incomeOtherFrequencyOptionsHelpMessage: 'It\'s possible that income might come unpredictably or at different times. If there is an option that makes sense for the majority of your payments, please choose it. Otherwise, please call us.',

		incomeOtherSavingsAmount: 'How much might you be able to put away a year?',
		incomeOtherSavingsAmountValidationMessage: 'Put in a whole number please, without spaces or commas. For example 5000.',
		incomeOtherSavingsAmountHelpMessage: 'Tell us an overall amount you hope to save annually. If you\'re not sure, add in a realistic number, perhaps based on previous savings habits.',
		incomeOtherSavingsFrequency: 'How often would you like to put money aside?',
		incomeOtherSavingsFrequencyHelpMessage: 'If you\'re not sure, pick an interval that seems most likely. This is just to get you started.',

		incomeOtherPaymentAmount: 'How much will you pay in each month?',
		incomeOtherPaymentAmountValidationMessage: 'Put in a whole number please, without spaces or commas. For example 3000.',
		incomeOtherPaymentAmountHelpMessage: 'This is an overall monthly figure which indicates how much income you plan to pay into your new account.',
		incomeOtherAccountPurpose: 'What is your main reason for having an account with B?',
		incomeOtherAccountPurposeHelpMessage: 'Please select the main reason for having this account. If there are a few reasons there that make sense to you, just pick one you know is important.',
		incomeOtherAccountPurposeValidationMessage: 'Please select an answer.',
		incomeOtherPaymentType: 'What will you pay into B? Will it be your salary or another source of income?',
		incomeOtherPaymentTypeOptionsHelpMessage: 'Choose the option that feels the most relevant one to you. This should incorporate all your income sources.',
		incomeOtherPaymentTypeOptionsValidationMessage: 'Please select one of the options.',

		// Employment Details - Expenses
		expenditureSectionTitle: 'And money going out',
		mortgageOrRentExpenditure: 'How much do you pay a month on the mortgage and/or rent?',
		mortgageOrRentExpenditureValidationMessage: 'Please type in a whole number for the overall monthly amount, for example 1200.',
		mortgageOrRentExpenditureHelpMessage: 'Just the basic figure, not extras like council tax, heating bills or service charges.',
		expenditureOther: 'Roughly how much do you pay out on personal loans, credit cards and hire purchase agreements?',
		expenditureOtherValidationMessage: 'Please type a figure without adding any pence, dots or commas.',
		expenditureOtherHelpMessage: 'The amount you enter here should be the total monthly amount you pay on any personal loans, credit cards and hire purchase agreements.',

		// Review Page
		reviewPageHeader: 'Review',
		reviewTopTitle: 'Review and submit your application',
		reviewTopSubtitle: 'Almost there. Now for a quick review.',
		reviewTopParagraph: 'Please double-check that your contact details are all correct in the summary below. Some you’ll be able to edit yourself but if anything\'s not quite right please call the team at B on ' + brand.phoneNumber + ' and ask them to make changes for you. ',
		reviewTopTermsParagraph: 'Please read all the important information below. It includes Key Features, Terms & Conditions, Lending Code information and Tariff details.',
		reviewPageTitle: 'Review and submit your application',

		reviewPersonalDetailsTitle: 'Your details',
		reviewSectionPersonalTitle: 'About you',
		reviewSectionContactTitle: 'Contact details',
		reviewSectionNationalityTitle: 'Where you are from',
		reviewEmploymentDetailsTitle: 'Employment details',
		reviewSectionEmploymentTitle: 'Employment details',
		reviewSectionIncomeTitle: 'Your money',
		reviewSectionOutgoingsTitle: 'Money out',
		reviewTermsDocumentsTitle: 'Documents for you to read and save',
		reviewTermsDocumentsParagraph: 'We will also email you these four documents after you have opened a ',
		reviewImportantInformationTitle: 'Important information',

		termsAndConditionsDocLinkText: 'Terms and Conditions',
		termsAndConditionsDocLinkTitle: 'Download Terms and Conditions PDF. This link will open in a new browser window.',
		termsAndConditionsDocLink: 'static/{}/personal-account-terms.pdf',
		termsAndConditionsDocFileName: 'personal-account-terms.pdf',
		termsAndConditionsDocVersion: '1015',
		lendingCodeDocLinkText: 'A guide to the Lending Code',
		lendingCodeDocLinkTitle: 'Download Lending Code PDF. This link will open in a new browser window.',
		lendingCodeDocLink: 'static/lending-code.pdf',
		lendingCodeDocFileName: 'lending-code.pdf',
		lendingCodeDocVersion: '1.0',
		tariffDocLinkText: 'Tariff details',
		tariffDocLinkTitle: 'Download Tariff Details PDF. This link will open in a new browser window.',
		tariffDocLink: 'static/{}/current-account-tariff.pdf',
		tariffDocFileName: 'current-account-tariff.pdf',
		tariffDocVersion: '1015',
		CA31DocLink: 'static/{}/CA31.pdf',
		CA31DocLinkText: 'Current Account Control Factsheet',
		CA31DocLinkTitle: 'Download Current Account Control Factsheet PDF. This link will open in a new browser window.',
		CA31DocVersion: '1.0',
		financialServicesCompensationSchemeDocLinkText: 'Financial Services Compensation Scheme Information Sheet',
		financialServicesCompensationSchemeDocLinkTitle: 'Download Financial Services Compensation Scheme Information Sheet PDF. This link will open in a new browser window.',
		financialServicesCompensationSchemeDocLink: 'static/FSCS_Information_Sheet_DU728.pdf',
		financialServicesCompensationSchemeDocName: 'FSCS_Information_Sheet_DU728.pdf',
		financialServicesCompensationSchemeDocVersion: '1215',
		reviewKeyFeaturesTitle: 'Key features for the',
		reviewOfferRestrictionsTitle: 'This offer doesn\'t include:',
		reviewAcceptTsAndCs: 'By ticking this box and clicking "Submit" this represents my signature confirming that:',
		reviewAcceptTsAndCsBullet1: 'I wish to apply for the B accounts and B App',
		reviewAcceptTsAndCsBullet2: 'I have read and accept the Terms & Conditions and Tariff for B accounts and B App. And I have also saved or printed a copy of the Terms & Conditions and Tariff',
		reviewAcceptTsAndCsBullet3: 'I acknowledge receipt of the Financial Services Compensation Scheme Information Sheet for both B Current account and B Instant Savings account',
		reviewAcceptTsAndCsBullet4: 'I authorise you to undertake any necessary searches and credit checks required to validate my identity and address, and',
		reviewAcceptTsAndCsBullet5: 'If my application is accepted and I proceed to open the B accounts, I authorise you to debit to the accounts all cheques, orders, payments and withdrawals signed or otherwise authorised by me. I also authorise you to debit to the B Current account all transactions made by using any debit cards that you may issue to me',

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
		marketingPrefsTitle: 'Marketing stuff',
		marketingPrefsText: 'When we have new stuff we think you\'d find useful, we\'d like to tell you about it. If that\'s okay with you, let us know the best way to do that here. We should say, whatever you choose will replace anything you\'ve already told us about this (so if you\'ve said Phone before but say Email now).',
		marketingPrefsSmsDYB: '',

		// Offer Page
		offerItemCurrentAndSavingsAccounts: 'Both a B Current Account and a B Instant Savings account.',
		offerItemSelfService: 'Access to the B app',
		offerItemWithInterest: 'Ongoing 2% AER (variable) interest on balances up to £3000',
		offerItemDebitContactless: 'A Debit MasterCard for your B Current account with contactless functionality as well as allowing you to withdraw cash at any UK ATM, subject to available funds. We will tell you your daily withdrawal limit when we send you your B debit card.',
		offerItemDebitContactlessLimited: 'A Debit MasterCard Online Only card for your B Current Account with Contactless functionality allowing you to withdraw up to £350 a day at any UK ATM, subject to available funds.',

		offerItemCaControl: 'A Debit MasterCard Online Only card with Contactless functionality allowing you to withdraw up to £350 a day at any UK ATM, subject to available funds.',
		// ready cash offers
		offerItemReadyCash: 'A Debit MasterCard Online Only card with Non contactless functionality allowing you to withdraw up to £350 a day at any UK ATM, subject to available funds.',
		offerItemNoFees: 'There are no fees or charges for this account.',
		offerItemNoCreditInterest: 'This account doesn\'t pay credit interest.',
		offerItemNoOverdrafts: 'Overdrafts are not permitted.',
		offerItemNoBorrowing: 'Borrowing is not available on this account. Requests for unplanned borrowing will usually be declined. {termsAndConditionsDoc}',
		offerItemDebitCard: 'You will receive a Debit MasterCard Online Only card with non contactless functionality allowing you to withdraw up to £350 a day at any Clydesdale ATM or UK ATM, subject to available funds.',
		offerItemDeposits: 'Your eligible deposits with Clydesdale Bank PLC are protected up to a total of £75,000 by the Financial Services Compensation Scheme, the UK’s deposit guarantee scheme. This limit is applied to the total of any deposits you have with Clydesdale Bank, Yorkshire Bank and B. Any total deposits you hold above the limit between these brands are unlikely to be covered. Please see <a href="http://www.cbonline.co.uk/resources/b82e172a-b00f-4783-973b-e4399da349e4/fscs_2015_online-leaflet.pdf" target="_blank" title="www.fscs.org.uk. This link will open in a new browser window">FSCS leaflet<span class="screenreader"> This link will open in a new browser window</span></a> for further information or visit <a href="http://www.fscs.org.uk" target="_blank" title="www.fscs.org.uk. This link will open in a new browser window">www.fscs.org.uk<span class="screenreader"> This link will open in a new browser window</span></a>',
		offerItemCancelation: 'You can cancel your agreement with us within 14 days of opening the account, or from the day you receive the Terms and Conditions, if later, by contacting us in branch, by phone or in writing. You will need to repay any debit balance, interest and fees incurred within 30 days of the date you tell us you want to cancel it.',

		offerItemCaDirectCaPlus: 'A Debit MasterCard with Contactless functionality as well as allowing you to withdraw cash at any UK ATM, subject to available funds. We will tell you your daily withdrawal limit when we send you your Debit MasterCard.',

		offerPageUnsuccessfulTitle: 'We are sorry, it appears that you are not eligible for the {productTitle} as you don’t hold the appropriate current account',
		offerPageDowngradeTitle: 'Unfortunately you have been unsuccessful for the {productTitle}',
		offerPageAlternativeOfferTitle: 'However we can offer you our ',
		offerPageHeader: 'Offer',
		offerPageTitle: 'Happy days. You can open B.',
		offerPageAltTitle: 'We are please to offer you a ',
		offerPageSubTitle: 'This offer includes:',
		offerPageIntroTitle: 'This section contains certain key information relating to the Readycash Account. Full details are contained in your Terms & Conditions and Tariff attached below which you should read.',

		offerPageKeyFeaturesTitle: 'Key features for',
		offerPageofferRestrictionsTitle: 'This offer doesn\'t include:',
		offerPageDocumentToReadSectionTitle: 'Documents for you to read and save:',
		offerPageDeclineOffer: 'If there\'s something you\'re undecided about, please call us on ' + brand.phoneNumber + ' or go into a branch.',
		offerConditionsIntro: 'You will receive these by email after you have opened the account.',
		offerTandCQuestion: 'By ticking this box and clicking "Yes Open my account" this represents my signature confirming that:',
		offertandCCondition: 'I wish to apply for the account',
		offertandCCondition2: 'I have read and accept the Terms & Conditions and Tariff. And I have also saved or printed a copy of the Terms & Conditions and Tariff',
		offerFSACondition: 'I acknowledge receipt of the Financial Services Compensation Scheme Information Sheet',
		offerCreditCondition: 'I authorise you to undertake any necessary searches and credit checks required to validate my identity and address, and',
		offerDebitAuthCondition: 'If my application is accepted and I proceed to open the account, I authorise you to debit to the account all cheques, orders, payments and withdrawals signed or otherwise authorised by me. I also authorise you to debit to the account all transactions made by using any debit cards that you may issue to me',
		offerPageContinue: 'Do you wish to continue with the offer of a ',
		openAccountButton: 'Yes, open my account',
		declineAccountButton: 'No, do not proceed',
		downgradedOfferPageEmail: 'We will also email you these four documents after you have opened the account',

		// Offer Page Mandate
		mandateTitle: '',
		mandateParagraph: 'By clicking the \'Yes, open my account\' button, this confirms my signature and authority, and that I am opening an account.',

		// Savings Account Information
		savingsAccountInformation1: 'For more information regarding the savings account, please see the Terms and Conditions',

		// Mutli Offer & Modal
		altOpenAccountButton: 'Accept offer',
		altDeclineAccountButton: 'Decline offer',
		offerCancelApplicationBtn: 'Cancel application',
		offerCancelApplicationModalTitle: 'Are you sure you want to cancel this application?',
		offerCancelApplicationConfirm: 'Yes',
		offerCancelApplicationDecline: 'No',
		offerCancelIntro: 'If you do not wish to proceed with your application you can cancel below',

		// Deferred Page
		deferredPageHeader: 'Deferred',
		deferredPageTitle: 'We need more time to look at your application.',
		deferredPageExplanation: 'A team member needs to go over your application in more detail. We will do this within two working days and you will be notified by email or SMS with a link to log in and see the decision.',

		// ID Deferred Page
		idDeferredPageHeader: 'Verify your identity',
		idDeferredPageTitle: 'We need to see your ID in person',
		idDeferredPageExplanation: 'We have been unable to verify your identity. You will need to pop into any branch of Clydesdale or Yorkshire Bank to apply for your B account.',
		idDeferredPageNextStepsItems: ['Passport', 'Driving license'],
		idDeferredLinkTitle: 'Download ID Requirements Factsheet PDF. This link will open in a new browser window.',
		idDeferredLinkText: 'For details on what ID to bring with you please click here. Cheers.',
		idDeferredLinkUrl: 'http://www.cbonline.co.uk/wcm-media/CYB-Identificatio-Requirements.pdf',

		// Contact Bank Page
		contactBankPageHeader: 'We need your number',
		contactBankPageTitle: 'We need your number',
		contactBankPageExplanation: 'To continue your application the team at B need you to update your mobile details. Please give them a call on ' + brand.phoneNumber + '.',

		// Sorry Page
		sorryPageHeader: 'Sorry',
		sorryPageTitle: 'Sorry, we can\'t offer you B.',
		sorryPageExplanation1: 'Thank you for applying for B. I\'m sorry, but based on our own credit scoring system, and information from outside credit reference agencies - Experian and Callcredit - we\'re unable to offer you B at the moment. We will send you a letter in the post to confirm this decision. You can request a copy of your report from the credit reference agencies by clicking on the links below. Just bear in mind that they may charge you a fee for this.',
		sorryPageExplanation2: '{findOutMore}',
		sorryPageExplanation3DYB: 'If you think there are special circumstances related to your application, you can call us to discuss it on ' + brand.phoneNumber + '. Lines are open Monday to Friday 08:00 to 20:00, closed on Saturday and Sunday.',
		sorryFindOutMore: '',
		sorryPageFormLink: 'http://www.experian.co.uk/consumer/statutory-report.html',
		sorryPageFormLink2: 'http://www.callcredit.co.uk',
		sorryPageFormLinkText: 'Click here to visit Experian website',
		sorryPageFormLinkText2: 'Click here to visit Callcredit website',
		sorryPageFormLinkTitle: 'This link will open in a new window',
		sorryPageFormLinkTitle2: 'This link will open in a new window',

		// Decline Page
		declinePageTitle: 'We are sorry but after careful consideration we declined your application for {}. We note you did not proceed with our offer of an alternative product.',
		declinePageParagraph1: 'We use a Credit Scoring System and information from credit reference agencies, Experian and Callcredit, to ensure we assess all credit applications fairly and consistently. You can request a copy of your report from the credit reference agencies by clicking on the link below.',
		declinePageParagraph2: 'If you think there are special circumstances related to your application, you can call us to discuss it on ' + brand.phoneNumber + '. Lines are open Monday to Friday 08:00 to 20:00, closed on Saturday and Sunday. We will send you a letter in the post to confirm this decision.',
		declinePageLink1: '<a href="http://www.experian.co.uk/consumer/statutory-report.html" target="_blank" title="www.experian.co.uk/consumer/statutory-report.html This link will open in a new browser window">Click here to visit Experian website <span class="screenreader"> This link will open in a new browser window.</span></a>',
		declinePageLink2: '<a href="http://www.callcredit.co.uk" target="_blank" title="www.callcredit.co.uk This link will open in a new browser window">Click here to visit Callcredit website <span class="screenreader"> This link will open in a new browser window.</span></a>',

		// Registration Page
		registrationPageHeader: 'Registration',
		registrationPageTitle: 'Congratulations',
		registrationPageSubTitle: 'You\'ll be needing these account details. Got a pencil?',
		registrationPageParagraph1: 'To give you a backup in case you ever lose your phone or tablet, we recommend you register for internet and telephone banking now. You\'ll need your customer number (up there) and the password you created at the start of this form. You should also definitely write down/ copy and paste/ screenshot your customer number now as you\'ll need it to download the app',
		registrationPageParagraph2: 'You\'ll also need a telephone access code. (That bit comes later.)',
		registrationPageBulletParagraph: 'For internet banking you\'ll need the following details to log in:',
		registrationPageBullet1: undefined,
		registrationPageBullet2: undefined,
		registrationPageBullet3: 'Set up Internet Banking',
		registrationPageErrorMessage: 'There has been a problem registering your {0} credentials. The reason is {1}.',
		// Alternative YB/CB rgistration content
		registrationPageHeaderCYB: 'Registration',
		registrationPageTitleCYB: 'Congratulations, your account has been opened',
		registrationPageSubTitleCYB: 'Your account details and information you\'ll need to make a note of',
		registrationPageParagraph1CYB: 'Now that your account is opened, let\'s register you for Internet and Telephone Banking services so that you can use your account straight away.',
		registrationPageParagraph2CYB: 'For Telephone Banking you\'ll need your customer number – again it\'s above, and your telephone PIN – which you can set up below.',
		registrationPageBulletParagraphCYB: 'For Internet Banking you\'ll need the following details to log in:',
		registrationPageBullet1CYB: 'your customer number - which is above',
		registrationPageBullet2CYB: 'your password - which you created at the start of this application',
		registrationPageBullet3CYB: 'your security questions for Internet Banking - which you can set up below',
		registrationPageErrorMessageCYB: 'There has been a problem registering your {0} credentials. The reason is {1}.',

		securityQuestionsTitle: 'Set up your internet banking',
		securityQuestionsSubTitle: 'Please choose some security questions and answers. These will be used when you log in to internet banking.',

		securityPageLoadingMessage: 'Loading...',
		securityPageSubmissionMessage: 'Submitting answers...',

		securityQuestionDropdownValidationMessage: 'Sorry, you can\'t select the same question twice.',
		securityQuestionInputValidationMessage: 'Your answer must be 6-20 characters long, and only contain letters and numbers.',
		securityQuestionDropdownHelpText: 'These questions are a safeguard against the risk of fraud and make your log in to internet banking more secure.',
		securityQuestionInputHelpText: 'Type in a simple answer that you can easily remember for each question. Your answer must be 6-20 characters long, and only contain letters and numbers.',
		telephonePinTitle: 'Telephone banking',
		telephonePinHelpMessage: 'Your telephone access code is a special code you\'ll use to identify yourself when you phone up to use telephone banking. It\'s an important security measure. It needs to be a 4 digit number which you can easily remember. Don\'t use the same number more than three times, or have any sequential numbers in there like 1234.',
		telephonePinValidationMessage: 'Pick a 4 digit number, with no consecutive numbers, and without using the same number four times.',
		telephonePin2HelpMessage: 'This needs to be exactly the same as the PIN entered in the box above.',
		telephonePin2ValidationMessage: 'Try again? The PIN numbers didn\'t match.',
		registrationTCsTitle: 'Download and save the Terms and Conditions for telephone and internet banking for your records. These will also be emailed to you.',
		registrationTsAndCsDocLink: 'static/rib-tb-terms.pdf',
		registrationTsAndCsDocVersion: '0815',
		registrationTsAndCsText: 'Terms and Conditions for telephone and internet banking',
		registrationTsAndCsDocLinkTitle: 'Download Terms and Conditions for telephone and internet banking PDF. This link will open in a new browser window.',
		registrationAcceptTCs: 'I confirm by ticking this box that I agree to the Terms and Conditions above.',
		registrationAcceptTCsValidationMessage: 'You need to agree in order to carry on.',

		alreadyRibRegistered: 'It looks like you\'re already signed up for internet banking, you don\'t need to do anything more here.',
		alreadyTBRegistered: 'It looks like you\'re already signed up for telephone banking, you don\'t need to do anything more here.',

		// Submission Page
		submissionPageHeader: 'Submission',
		submissionPageTitle: 'Thank you for sending your application',
		submissionPageText: 'Please wait while your details are checked',

		// Security Page
		securityPageTitle: 'Nearly there',
		timerSectionTitle: 'Just tell us a bit more about yourself',
		timerSectionTimeUnitDescription: 'mins',
		timerSectionTimeUnitExpiredDescription: 'Sorry, but you\'ve run out of time.',

		// Account Opened Page
		accountOpenedPageHeader: 'Account Opened',
		accountOpenedPageTitle: 'You\'re good to go',
		accountOpenedAppDownloadTitle: 'Now you can download the B app',

		accountOpenedSection1Title: 'What\'s next?',
		accountOpenedSection1Bullet1: 'Within the next few days, the team at B will email you with important T&Cs, the B Tariff and other documents to read and save. If you can\'t see their message, please check your junk and spam just in case it\'s landed there.',
		accountOpenedSection1Bullet2: 'You’re all registered for internet banking too. You can use this straight away by going to the login button at the top right of any page on <a href="' + brands.CB.bankWebsite + '" target="_blank" title="www.cbonline.co.uk. This link will open in a new browser window">www.cbonline.co.uk<span class="screenreader"> This link will open in a new browser window</span></a> or <a href="' + brands.YB.bankWebsite + '" target="_blank" title="www.ybonline.co.uk. This link will open in a new browser window">www.ybonline.co.uk<span class="screenreader"> This link will open in a new browser window</span></a>. You\'ll need your customer number, password and security details.',
		accountOpenedSection2Title: 'Look out for the post too:',
		accountOpenedSection2Bullet1: 'Your B Debit MasterCard and PIN will arrive separately in around 3-5 days.',
		accountOpenedSection2Bullet2: 'If you\'d like a cheque book as well please call the team at B on ' + brand.phoneNumber,
		accountOpenedSection3Title: 'With B, you can also:',
		accountOpenedSection3Bullet1: 'Arrange to include your B accounts in mortgage offsetting arrangements (this won\’t be done automatically)',
		accountOpenedSection3Bullet2: 'Apply for an overdraft (subject to eligibility)',
		accountOpenedSection3Bullet3: 'Apply for a credit card or a personal loan (subject to eligibility)',
		accountOpenedSection3Bullet4: 'For any of these, please get in touch with the team at B on ' + brand.phoneNumber,
		accountOpenedSection4Title: 'P.S. Here are some useful links:',
		accountOpenedSection4Bullet1: 'Any questions? Find out the answers <a href="https://www.youandb.co.uk/faq/tablet" target="_blank" title="Tablet FAQs. This link will open in a new browser window">here<span class="screenreader"> This link will open in a new browser window</span></a>',
		accountOpenedSection4Bullet2: '',
		accountOpenedSection5Title: '',
		accountOpenedSection5Bullet1: '',
		// Alt CYB content for account opened
		accountOpenedPageTitleCYB: 'Good news, you\'re all done',
		accountOpenedSection1TitleCYB: 'Check your email',
		accountOpenedSection1Bullet1CYB: 'In the next few days we will send you an email with important information for you to read and save. Check your email filters in case it\'s gone straight to your junk/spam folder and you can\'t see it in your inbox',
		accountOpenedSection1Bullet2CYB: 'You’re all registered for internet banking too. You can use this straight away by going to the login button at the top right of any page on <a href="' + brands.CB.bankWebsite + '" target="_blank" title="www.cbonline.co.uk This link will open in a new browser window">www.cbonline.co.uk <span class="screenreader">This link will open in a new browser window</span></a> or <a href="' + brands.YB.bankWebsite + '" target="_blank" title="www.ybonline.co.uk This link will open in a new browser window">www.ybonline.co.uk <span class="screenreader">This link will open in a new browser window</span></a>. You\'ll need your customer number, password and security details.',
		accountOpenedSection2TitleCYB: 'Look out for your post',
		accountOpenedSection2Bullet1CYB: 'You will receive a welcome letter which will confirm the details of your new account, please read through and send us back your specimen signature, as we’ll need this so you can make certain transactions on your account',
		accountOpenedSection2Bullet2CYB: 'Your Debit MasterCard and PIN are on their way. These will come separately and will be with you within 3-5 working days',
		accountOpenedSection3TitleCYB: 'Useful links',
		accountOpenedSection3Bullet1CYB: 'Download our mobile banking app <a href="' + brand.monetiseLink + '" target="_blank" title="Click here to download our mobile banking app. This link will open in a new browser window">here <span class="screenreader">Click here to download our mobile banking app. This link will open in a new browser window</span></a>',
		accountOpenedSection3Bullet2CYB: '<a href="' + brand.faqsLink + '" target="_blank" title="FAQs. This link will open in a new browser window">FAQs <span class="screenreader">This link will open in a new browser window</span></a> to help answer any queries you may have',
		accountOpenedSection3Bullet3CYB: '',
		accountOpenedSection4TitleCYB: 'Contact us',
		accountOpenedSection4Bullet1CYB: 'If you have any queries about your new account',
		accountOpenedSection5TitleCYB: 'Ways to contact us',
		accountOpenedSection5Bullet1CYB: 'Call us on ' + brands.YB.phoneNumber + ' or pop in to your local branch',

		// Portal Page
		portalPageHeader: 'Portal',
		portalPageTitle: 'Your saved applications',
		portalPageSubTitle: 'Pick an application to carry on with',

		// Login Page
		loginPageHeader: 'Login',
		loginPageTitle: 'Your saved application',
		loginPageNextButtonLabel: 'Please log in to carry on',
		usernameLabel: 'Customer Number/Username',
		usernameValidationMessage: 'Here you can use either your Customer Number or Username. Your Customer Number is 10 numbers long, detailed in your Internet Banking Welcome Letter. Your username is 6-16 characters long, and can be letters and numbers. It\'s also case sensitive.',
		usernameHelpMessage: 'This is your customer number or username you created when you registered to save your application earlier on. Please call us if you need help.',
		passwordLabel: 'Please type the characters we\'ve requested from your Internet Banking password. The password characters are case sensitive.',
		passwordValidationMessage: 'Type the characters we\'ve requested from your password.',
		passwordHelpMessage: 'This is the password you created when you registered for Internet Banking earlier. Please call us if you need help.',
		passwordCharacterPrefix: 'Character ',
		goneWrongMessage: 'Can you check your details and try again please? Something went wrong but it might work if you try again.',
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
		switchPageTitle: 'Switch to B. It\'s easy and there\'s a guarantee',
		switchPageHeadingOptional1: 'The switch guarantee means it\'s really straightforward',
		switchPageText1: 'First of all the team at B will do everything for you, you won\'t even have to get in touch with your old bank.',
		switchPageHeadingOptional2: 'Make sure you arrange an overdraft first',
		switchPageText2: 'If you have an overdraft on your old account, you\'ll need to contact the team at B before you switch on ' + brand.phoneNumber + ' to make sure you get one with B. If you\'re eligible and you\'re using your overdraft at the moment, your balance will be carried across, even if it\'s in debit, subject to checks of course. If you prefer speaking to someone in person, you can also pop into a branch of Clydesdale or Yorkshire Bank. Staff will be more than happy to help.',
		switchPageHeadingOptional3: '',
		switchPageText3: '',
		switchPageHeadingOptional4: 'A word in your ear',
		switchPageText4: 'Once switching has started it can\'t be stopped, but the guarantee means that if anything goes wrong, tell B and you\'ll get a refund of any interest or charges made on either your old account or the new one as a result. If, for any reason, you don\'t qualify for the Current Account Switch Service, or you don\'t want to use it, you can use the Payment Transfer Service. This enables you to transfer all your Direct Debits and standing orders from your old account to B over 3 months. Please note that the 7 working day switch guarantee does not apply to this service.',
		switchPageText5: '',
		switchPageText6: '',

		wantsToSwitch: 'Want to switch from your current account to B?',
		wantsToSwitchValidationMessage: 'This is required.',
		switchDetailsTitle: 'Your old current account details',
		switchAccountNameValidationMessage: 'Your account name must be no more than 18 characters long.',
		switchAccountNameHelpMessage: 'This is the name shown on your account statement.',
		switchAccountNumberValidationMessage: 'This must be 8 numbers long.',
		switchAccountNumberHelpMessage: 'The account number will appear on your account statements.',
		switchSortCodeValidationMessage: 'This is 6 numbers long.',
		switchSortCodeHelpMessage: 'You will see your sort code on your account statements, usually next to the account number.',
		switchHasDebitCardValidationMessage: 'Your 16-digit Card Number',
		switchDebitCardPanLabel: 'Your 16-digit Card Number',
		switchDebitCardPanValidationMessage: 'Your 16-digit Card Number',
		switchDebitCardPanHelpMessage: 'This is the main number across the front of the card, typically printed in bigger characters and usually 16 numbers long.',
		switchDebitCardExpirationValidationMessage: 'Please use numbers without any extra characters, so for example January 2017 should be written like this: 0117. The card must not have expired.',
		switchDebitCardExpirationHelpMessage: 'This will be shown on the card as a month and year, typically next to a statement such as \'Expires end\'.',
		switchTypeValidationMessage: 'This is required.',
		switchTypeTitle: 'Choose from two types of switch',
		switchTypeFullSwitch: 'A full switch using the Current Account Switch Service will guarantee that once you have chosen and agreed the switch date with us the full balance and regular payments associated with your old account at your old bank will be switched to your new account and your old account will be closed. You will be advised of regular payments that cannot be automatically transferred and any payments made to your old account will be redirected to your new account.',
		switchTypePaymentSwitch: 'The Payment Transfer Service allows you to choose which payments you would like to transfer across to your new account and your old account will not be closed. Please note that the 7 working day switch guarantee does not apply to this service.',
		switchDateValidationMessage: 'The date cannot be in the past. Please remeber to select a date at least 7 working days from now, which is not a weekend or Bank Holiday.',
		switchDateHelpMessage: 'This is the date you would like the switch to take place.',
		switchDateGuidance: 'Please select a date at least 7 working days from now, which is not a weekend or Bank Holiday.',
		switchCloseOldAccount: 'Yes, I agree to you closing my old current account when the switch to my new one is complete.',
		switchCloseOldAccountValidationMessage: 'Please confirm your consent to continue.',
		switchCloseOldAccountHelpMessage: 'This means that we\'ll transfer your balance, direct debits and standing orders before closing the account.',
		switchFullTsAndCsDocLink: 'static/switch-terms-' + brand.bankCode + '.pdf',
		switchFullTsAndCsDocLinkTitle: 'Download Current Account Switch Service Terms and Conditions PDF. This link will open in a new browser window.',
		switchFullTsAndCsDocVersion: '1.0',
		switchFullTsAndCsText: 'Current Account Switch Service Terms and Conditions',
		switchAcceptFullTCs: 'Yes, I agree to the Terms and Conditions above',
		switchAcceptFullTCsValidationMessage: 'Please agree in order to continue.',
		switchPaymentsTsAndCsDocLink: 'static/payment-transfer-' + brand.bankCode + '.pdf',
		switchPaymentsTsAndCsDocLinkTitle: 'Download Payment Transfer Service Terms and Conditions PDF. This link will open in a new browser window.',
		switchPaymentsTsAndCsDocVersion: '1.0',
		switchPaymentsTsAndCsText: 'Payment Transfer Service Terms and Conditions',
		switchAcceptPaymentsTCs: 'Yes, I agree to the Terms and Conditions above',
		switchAcceptPaymentsTCsValidationMessage: 'Please agree in order to continue.',
		// Switch page alt CYB content
		switchPageHeaderCYB: 'Switch',
		switchPageTitleCYB: 'Switch to us with the Current Account Switch Service',
		switchPageText1CYB: 'If you have an agreed overdraft facility on your old account you will need to arrange a planned borrowing limit with us prior to switching your account to ensure that you can fully transfer any debit balance as part of your switch. You can arrange planned borrowing, subject to eligibility, just pop into your nearest branch or call us on 0800 678 3350.',
		switchPageText2CYB: 'Switching your current account to us from another bank is straightforward with the Current Account Switch Service, we\'ll do everything for you. We\'ll contact your old bank so you don\'t have to worry about letting them know. The Current Account Switch Service is free to use and once you have chosen and agreed your switch date with us, we guarantee it will only take 7 working days, backed by the Current Account Switch Guarantee. On your switch date, your old account will be closed and all your payments and credit balance will be transferred to your new {bankName} account.',
		switchPageText3CYB: '<strong>Once your switch has started it cannot be stopped</strong>, but the guarantee means that if anything goes wrong we’ll refund any interest or charges made on either your old account or the new one as a result.',
		switchPageText4CYB: 'If you\'re not eligible for the Current Account Switch Service, or you don\'t want to use it, the Payment Transfer Service lets you transfer your Direct Debits and standing orders from your old account to your new account over a 3 month period.',

		wantsToSwitchCYB: 'If you want to use either of these switching services, please click on the \'Yes\' button.',
		wantsToSwitchValidationMessageCYB: 'This is required.',
		switchDetailsTitleCYB: 'Please fill in the following details. Use the details from the old account you’re switching from, and not the new one you’ve just opened.',
		switchAccountNameValidationMessageCYB: 'Your account name must be no more than 18 characters long.',
		switchAccountNameHelpMessageCYB: 'This is the name shown on your account statement.',
		switchAccountNumberValidationMessageCYB: 'This must be 8 numbers long.',
		switchAccountNumberHelpMessageCYB: 'The account number will appear on your account statements.',
		switchSortCodeValidationMessageCYB: 'This is 6 numbers long.',
		switchSortCodeHelpMessageCYB: 'You will see your sort code on your account statements, usually next to the account number.',
		switchHasDebitCardValidationMessageCYB: 'This is required.',
		switchDebitCardPanLabelCYB: 'Your 16-digit Card Number',
		switchDebitCardPanValidationMessageCYB: 'This is the long number on the front of the card.',
		switchDebitCardPanHelpMessageCYB: 'This is the main number across the front of the card, typically printed in bigger characters and usually 16-19 numbers long.',
		switchDebitCardExpirationValidationMessageCYB: 'Please use numbers without any extra characters, so for example January 2017 should be written like this: 0117. The card must not have expired.',
		switchDebitCardExpirationHelpMessageCYB: 'This will be shown on the card as a month and year, typically next to a statement such as \'Expires end\'.',
		switchTypeValidationMessageCYB: 'This is required.',
		switchTypeTitleCYB: 'Please choose a switch option.',
		switchTypeFullSwitchCYB: 'A full switch using the Current Account Switch Service will guarantee that once you have chosen and agreed the switch date with us that the full balance and regular payments associated with your old account will be switched to your new account and your old account will be closed. You will be advised of regular payments that cannot be automatically transferred and any payments made to your old account will be redirected to your new account.',
		switchTypePaymentSwitchCYB: 'The Payment Transfer Service allows you to choose which payments you would like to transfer across to your new account, your old account will not be closed.',

		// Map Switch Response Codes to Messages
		switchCode000: 'Your switch has been successful',
		switchCode340: 'Sorry. This account doesn\'t allow switching. But you can transfer your details from your old bank to B. Please call the team at B on ' + brand.phoneNumber + ' for help.',
		switchCode365: 'Sorry. This account doesn\'t allow switching. Please call the team at B on ' + brand.phoneNumber + ' for help.',
		switchCode366: 'The sort code, account number or 16-digit card number you’ve entered aren’t quite right. Please give them a double-check and try again.',
		switchCode364: 'Sorry. You can\'t switch to this account at the moment. Please get in touch with the team at B.',
		switchCode367: 'Sorry. You can\'t carry out a switch to B on this account.',
		switchCode345: 'Switches can\'t go ahead on weekends and bank holidays. Please choose another date for your switch.',
		switchCode346: 'Please pick a switch date that\'s at least 7 working days from now.',
		switchCode347: 'Please pick a switch date that\'s less than 90 days from today, and more than 7 working days in the future.',
		switchCode393: 'There’s been a problem with B, please try again later or call the team on ' + brand.phoneNumber + ' to get this sorted.',
		switchCode394: 'Sorry. You can\'t switch to this account at the moment. Please get in touch with the team at B.',
		switchCode395: 'There\'s been a problem with B, please try again later or call the team on ' + brand.phoneNumber + ' to get this sorted.',
		switchCode349: 'There\'s been a problem with B, please try again later or call the team on ' + brand.phoneNumber + ' to get this sorted.',
		switchCode350: 'Please check that the day, month and year you\'ve given for your date of birth are correct. If they are then please get in touch with the team at B.',
		switchCode353: 'Please pick a switch date that\'s at least 7 working days in the future.',
		switchCode380: 'Sorry. You can\'t switch to B from this type of account. Please call the team at B on ' + brand.phoneNumber + ' for help.',
		switchCode402: 'Sorry. You can\'t switch to B from this type of account. Please call the team at B on ' + brand.phoneNumber + ' for help.',
		switchCode403: 'Sorry. You can\'t switch to B from this type of account. To switch you need an account that\'s backed by the Current Account Switch Service. Please call the team at B on ' + brand.phoneNumber + ' to get something sorted.',
		switchCode398: 'There\'s been a problem with B, please try again later or call the team on ' + brand.phoneNumber + ' to get this sorted.',
		switchCode801: 'There\'s been a problem with B, please try again later or call the team on ' + brand.phoneNumber + ' to get this sorted.',
		switchCode355: 'There\'s been a problem with B, please try again later or call the team on ' + brand.phoneNumber + ' to get this sorted.',
		switchCode358: 'There\'s been a problem with B, please try again later or call the team on ' + brand.phoneNumber + ' to get this sorted.',
		switchCode359: 'There\'s been a problem with B, please try again later or call the team on ' + brand.phoneNumber + ' to get this sorted.',
		switchCode348: 'Hold your horses - there\'s already a switch going on for this account.',
		switchCode861: 'There\'s been a problem with B, please try again later or call the team on ' + brand.phoneNumber + ' to get this sorted.',
		switchCode362: 'There\'s been a problem with B, please try again later or call the team on ' + brand.phoneNumber + ' to get this sorted.',
		switchCode363: 'There\'s been a problem with B, please try again later or call the team on ' + brand.phoneNumber + ' to get this sorted.',
		switchCode389: 'B needs your postal address to continue, please call ' + brand.phoneNumber + '.',
		switchCodeDefault: 'Sorry, something has gone wrong creating your switch application',

		// Authentication Page
		authPageHeader: 'Application',
		authPageSubtitle: 'Please login to continue',
		authPageTitle: 'Authentication',
		authFormTitle: undefined,
		authFormSubTitle: undefined,
		hasCustomerName: 'Do you have a customer number/username?',
		authChallengeSecurityQuestionValidationMessage: 'This is the answer to the internet banking security question you selected at the time of registration. Please call us if you need help.',
		authPageContact: 'If you need help with your application, or if any of your details aren\'t up-to-date, please call the team at B on ' + brand.phoneNumber + '.',

		authBankQuestion: 'Please let us know where you have an account',
		authBankIdHelpMessage: 'Please indicate the bank with which you hold an account',
		authFirstNameQuestion: 'First Name',
		authFirstNameHelpMessage: 'Just using letters and spaces as it appears on your passport or driving licence.',
		authLastNameQuestion: 'Last Name',
		authLastNameHelpMessage: 'Please use your last name as it appears in your passport or driving licence.',
		authGenderQuestion: 'Gender',
		authGenderHelpMessage: 'This is just to help identify you.',
		authDateOfBirthQuestion: 'Date Of Birth',
		authDateOfBirthHelpMessage: 'Click on the month/year to start entering your dates. There’s no need to scroll. The date entered should be formatted DD-MM-YYYY.',
		authHouseNumberQuestion: 'House Number',
		authHouseNumberHelpMessage: 'This is the number of your house or apartment.',
		authStreetQuestion: 'Street',
		authStreetHelpMessage: 'Your street name should be written using number and letters only.',
		authPostcodeQuestion: 'Postcode',
		authPostcodeHelpMessage: 'You need to supply a valid postcode for any UK address you add. These are normally formatted like this: A12 3BC.',
		authCheckDetailsError: 'Can you check your details and try again please? Something went wrong but it might work if you try again.',
		authNextButtonText: 'Proceed',
		authFirstNameValidationMessage: 'Please use letters and spaces only.',
		authLastNameValidationMessage: 'Please use letters and spaces only.',
		authDateOfBirthValidationMessage: 'Please enter a valid date in the following format DD-MM-YYYY.',
		authHouseNumberValidationMessage: 'Sorry, your house number must be written using numbers and letters only and no longer than 40 characters.',
		authStreetValidationMessage: 'Your street should be written using numbers and letters only and be no longer than 40 characters.',
		authPostcodeValidationMessage: 'Please enter a valid postcode.  Postcodes are normally formatted like this - A12 3BC',
		authGenderValidationMessage: 'Please select a gender.',
		authPageLoadingMessage: 'Please wait while we load your details...',

		// Authentication Component
		authChallengeTitle: 'Stepup challenge',
		authChallengeSubtitle: '',
		telephoneAuthAccessCode: 'Telephone Access Code',
		telephoneAuthAccessCodeValidationMessage: 'This is the 4-digit number you chose for Telephone Banking',
		telephoneAuthAccessCodeHelpMessage: 'This is 4 numbers long.',
		telephoneAuthSortCode: 'Sort code',
		telephoneAuthAccountNumber: 'Account number',
		debitCardAuthPan: 'Your 16-digit Card Number',
		debitCardAuthSortCode: 'Sort code',
		debitCardAuthAccountNumber: 'Account number',
		panHelpMessage: 'This is the 16-digit card number that runs across the middle of the front of your card.',
		accessCodeHelpMessage: 'This is your four-digit Access Account Number. It’s set during the registration process to allow you to access telephone banking and internet banking.',
		sortCodeHelpMessage: 'You\'ll spot your 6-digit sort code on your bank statements and debit card.',
		accountNumberHelpMessage: '8-digit account number appears on your bank statements and debit card.',
		panValidationMessage: 'This is 16 numbers long.',
		accessCodeValidationMessage: 'This is 4 numbers long.',
		sortCodeValidationMessage: 'This is 6 numbers long without spaces.',
		accountNumberValidationMessage: 'This is 8 numbers long.',

		// Error Page
		errorPageHeader: 'Error',
		upgradeBrowserMessage: '<p class="browsehappy">Sorry, our online application does not support your browser. please <a href="http://browsehappy.com/" target="_blank" title="www.browsehappy.com This link will open in a new browser window.">update your browser <span class="screenreader">www.browsehappy.com This link will open in a new browser window.</span></a> to a newer version or try again with a different browser</p><p>You can close this window to return to the site to see other ways to apply.</p>',
		errorPageTitle: 'Sorry there has been a technical problem',
		errorPageText1: 'Something has gone wrong in the background.',
		errorPageText2: 'While we\'re sorting it out, can you please call us instead on ' + brand.phoneNumber + '. Lines are open Monday to Friday, 8am-8pm.',

		// Setup in Progress Page
		setupInProgressHeader: 'Setup',
		setupInProgressTitle: 'Sorry, there\'s been a slight technical hitch',
		setupInProgressText1: 'Your account will be open and ready the next working day.',
		setupInProgressText2: 'We\'ll let you know as soon as it\'s available so you can register for online banking, telephone banking and account switching.',
		setupInProgressText3: 'We look forward to being in touch very soon.',

		// Any page
		missingRequiredFields: 'Please contact the team at B on ' + brand.phoneNumber + ' to add the information below and carry on with your application:',
		datePickerHelpMessageSuffix: 'Click on the month/year to start entering your dates. There’s no need to scroll. The date entered should be formatted DD-MM-YYYY.',
		newBrowserWindowTitle: 'This link will open in a new browser window.',
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
