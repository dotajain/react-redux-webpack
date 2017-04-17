
const common = {
	componentHeader: () => '.component-header',
}

const landingPage = {
	isExistingCustomerNoBtn: '[data-anchor="existing-customer-no"]',
	acceptTsAndCs: '[data-anchor="terms-and-conditions"]',
	initialQuestionsNext: '[data-anchor="initial-questions-next"]',
}


const PersonalDetailsPage = {
    mobileNumber: '[data-anchor="mobile-number"]',
    emailAddress: '[data-anchor="email-address"]',
    emailAddressConfirm: '[data-anchor="confirm-email-address"]',
	bankPreferenceCB: '[data-anchor="select-bank-cb"]',
	bankPreferenceYB: '[data-anchor="select-bank-yb"]',
	unsavedUsername: '[data-anchor="unsaved-username"]',
	password: '[data-anchor="password"]',
	passwordConfirm: '[data-anchor="password-confirm"]',
	personalDetailsNextBtn: '[data-anchor="personal-details-next"]',
}

const EmploymentDetailsPage = {
 	pageTitle: '.header-title-column',
	pageWrapper: '.employment-details-page',
	employmentStartDateWrapper: '[data-anchor="employment-start-date"]',
	employmentStartDate: '#employmentStartDate',
}

const UI = {
	postcode: 'postcode',
	address: index => ({
		index,
		section: () => `.address-section-${index}`,
	}),
	landingPage,
	PersonalDetailsPage,
	EmploymentDetailsPage,
	common,
};

export default UI;
