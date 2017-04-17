const general = {
	version: '1.0.0',
	versionName: 'Milestone_1',
	appPackageName: 'BWEB',
	platform: 'B Web',
	compatibleBrowsers: [
		{ browser: 'chrome', version: 39 },
		{ browser: 'safari', version: 8 },
		{ browser: 'msie', version: 11 },
		{ browser: 'msedge', version: 12 },
		{ browser: 'firefox', version: 33 },
		{ browser: 'opera', version: 38 },
	],
	dateFormat: 'DD-MM-YYYY', // For use in moment.js etc.
	dateFormatPayment:'DD MMM YYYY',
	dateFormatTimeline: 'DD MMM YY',
	dateFormatInAPI: 'YYYY-MM-DD', // How do the APIs expect to receive date strings?
	readyCashCode: 'IM800',
	minimumAge: 18,
	maximumAge: 99,
	currencySign: '£',
	currencySignWithDash: '-£',
	currencyDecimals: 2,
	requiredQuestionText: '',
	masks: {
		dateOfBirth: { numberOfMasks: 2 },
		phoneNumber: { numberOfMasks: 5, startPosition: 3 },
	},
	maxAdditionalCitizenships: 5,
	maxNumberOfAddresses: 15,
	numSecurityQuestions: 3,
	screenshotMimeType: 'image/jpeg',
	screenshotQuality: 0.50,
	authentication: {
		context: 'USER',
	},
	authenticateHeaderName: 'www-authenticate',
};

module.exports = general;
