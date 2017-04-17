const envConfig = require('../../static/config');
const { brandConfig } = require('../config/BrandConfig');
const accOpeningBase = `${envConfig.websiteBaseDirectory}bapp`;
const _ = require('lodash');

const getQuery = () => {
	const products = brandConfig.getProductsFor(envConfig.bankId);
	return _.head(_.keys(products));
};

const taskUrls = {
	capture: accOpeningBase,
	idcheckfail: `${accOpeningBase}/sorry`,
	idcheckcannotbedone: `${accOpeningBase}/id-deferred`,
	challenge: `${accOpeningBase}/security`,
	creditcheckdeclined: `${accOpeningBase}/sorry`,
	creditcheckreferred: `${accOpeningBase}/deferred`,
	offer: `${accOpeningBase}/offer`,
	fulfillmentinprogress: `${accOpeningBase}/registration`,
	productsetupinprogress: `${accOpeningBase}/setup-in-progress`,
	applicationexpired: `${accOpeningBase}/deferred`,
	cancelled: `${accOpeningBase}/sorry`,
	applicationrejected: `${accOpeningBase}/decline`,

	'WEB-AUTHENTICATION': `${accOpeningBase}/authentication?applyFor=${getQuery()}`,
	'WEB-SUBMIT-FORM': `${accOpeningBase}/submission`,
	'WEB-SUBMIT-CALL3D': `${accOpeningBase}/submission`,
	'WEB-ACCOUNT-OPENED': `${accOpeningBase}/account-opened`,
	'WEB-ELIGIBILITY-PAGE': accOpeningBase,
	'WEB-PERSONAL-DETAILS': `${accOpeningBase}/step-1`,
	'WEB-PERSONAL-DETAILS-PERSONAL': `${accOpeningBase}/step-1#personal-details`,
	'WEB-PERSONAL-DETAILS-CONTACT': `${accOpeningBase}/step-1#contact-details`,
	'WEB-EMPLOYMENT-DETAILS': `${accOpeningBase}/step-2`,
	'WEB-EMPLOYMENT-DETAILS-NATIONALITY': `${accOpeningBase}/step-2#nationality-details`,
	'WEB-EMPLOYMENT-DETAILS-EMPLOYMENT': `${accOpeningBase}/step-2#employment-details`,
	'WEB-EMPLOYMENT-DETAILS-INCOME': `${accOpeningBase}/step-2#income-details`,
	'WEB-EMPLOYMENT-DETAILS-OUTGOINGS': `${accOpeningBase}/step-2#outgoings-details`,
	'WEB-EMPLOYMENT-DETAILS-SAVINGS': `${accOpeningBase}/step-2#savings-account-details`,
	'WEB-REVIEW-DETAILS': `${accOpeningBase}/review`,
	'WEB-REGISTRATION': `${accOpeningBase}/registration`,
	'WEB-SWITCH': `${accOpeningBase}/switch`,
	'WEB-ERROR': `${accOpeningBase}/error`,
	'WEB-PORTAL': `${accOpeningBase}/portal`,
	'WEB-LOGIN': `${accOpeningBase}/login`,
	'WEB-DECLINE-ID': `${accOpeningBase}/sorry`,
	'WEB-CONTACT-BANK': `${accOpeningBase}/contact-bank`,
	'WEB-TIMELINE': `${accOpeningBase}/timeline`,
	'WEB-OPEN-PAYMENTS': `${accOpeningBase}/payments`,
    'WEB-OPEN-SPENDINGS': `${accOpeningBase}/spendings`,
	'WEB-OPEN-FINANCIAL_STORIES': `${accOpeningBase}/financialstories`,
    'WEB-OPEN-SAVING-POTS': `${accOpeningBase}/savingpots`,
    'WEB-OPEN-ALERTS': `${accOpeningBase}/alertsnsweeps`,
    'WEB-OPEN-HELP': `${accOpeningBase}/help`,
    'WEB-OPEN-LOGOUT': `${accOpeningBase}/logout`,
	'WEB-PAYMENT-CONFIRM': `${accOpeningBase}/confirmpayment`,
	'WEB-PAYMENT-THANKYOU': `${accOpeningBase}/finalpayment`,
	'WEB-PAYMENT-BACK': `${accOpeningBase}/payments`,
	'WEB-MANAGE-PAYMENT': `${accOpeningBase}/managepayment`,
	'WEB-MANAGE-PAYEE': `${accOpeningBase}/managepayee`,
	'WEB-ARCHIEVED-PAYMENT': `${accOpeningBase}/archivedpayment`,
	'WEB-ADD-PAYEE': `${accOpeningBase}/addPayee`,
	'WEB-VIEW-PAYEE':`${accOpeningBase}/viewPayee`,
	'WEB-ACCOUNT-LOCKED': `${accOpeningBase}/account-locked`,
	

};

module.exports = taskUrls;
