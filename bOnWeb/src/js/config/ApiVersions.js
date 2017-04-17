const apiStringFieldMaxLength = 1000000;
const apiVersions = {
	authServices: '0.8.0',
	casCaseServices: '0.8.0',
	caseServices: '0.8.0',
	csapCaseServices: '1.0.0',
	customerServices: '1.0.0',
	eventServices: '0.8.0',
	referenceServices: '1.0.0',
	userCredentialServices: '0.8.0',
	userServices: '0.8.0',
	timelineService: '0.8.0', // TODO: Need to find API version
	accountTranService: '0.8.0',
	projectionService: '1.0.0',
	tagManagementService: '1.0.0',
	alertService: '0.8.0',
	sweepService: '0.9.0',
	nbaService: '1.0.0', // TODO: Need to find API version
	payeeService:'0.8.0',
	paymentServices:'0.8.0',
	mandateService:'1.0.0',
	accountService:'0.8.0',
	getPots: '0.8.0',
	spendingDataService: '0.8.0',
	tagListService: '1.0.0',
};

module.exports = {
	apiStringFieldMaxLength,
	apiVersions,
};
