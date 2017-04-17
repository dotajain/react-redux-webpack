
const _ = require('lodash');

const { apiBaseUrl } = require('../../static/config');

const modifier = (key, value) => url => url.replace(key, value);
const replaceCaseTypeModifier = modifier('{case-type}', 'csap');
const replaceCaseIdModifier = caseId => modifier('{case-id}', caseId);

const formatProductPart = productType => `/${productType}`;

const urlPartOrString = productType => (_.isString(productType) ? p => p : p => p.urlPart)(productType);

const productTypeModifier = productType => modifier('{product-type}', _.flow(urlPartOrString, formatProductPart)(productType));

const _defaultModifiers = [replaceCaseTypeModifier];

const buildModifiers = modify => {
	const modUrl = modify || [url => url];
	const modArray = !_.isArray(modUrl) ? [modUrl] : modUrl;

	return modArray.concat(_defaultModifiers);
};

const constructUrl = (urlPart, mods) => _.flow(...mods)([apiBaseUrl, urlPart].join(''));

const productTypedOptions = (targetUrl, method, productType, modify) => {
	if (!productType) {
		throw new Error('No productType defined for sending case');
	}

	const urlModifiers = buildModifiers(modify)
		.concat(productTypeModifier(productType));

	const url = constructUrl(targetUrl, urlModifiers);

	return {
		url,
		method,
	};
};

const saveCase = (productType, caseId) => {
	const createCaseEndpoint = '/banks/{bank-id}/cases/{case-type}{product-type}/{case-subtype}';
	const updateCaseEndpoint = '/banks/{bank-id}/cases/{case-type}{product-type}/{case-subtype}/{case-id}/tasks/capture/actions/update';
	const caseEndpoint = caseId ? updateCaseEndpoint : createCaseEndpoint;

	return productTypedOptions(caseEndpoint, caseId ? 'PUT' : 'POST', productType, [replaceCaseIdModifier(caseId)]);
};

const caseIdGuard = caseId => next => url => {
	if (!caseId) {
		throw new Error('No case id defined for sending case');
	}

	return next(caseId)(url);
};

const submitCase = (productType, caseId) => {
	const submitCaseEndpoint = '/banks/{bank-id}/cases/{case-type}{product-type}/{case-subtype}/{case-id}/tasks/capture/actions/submit';

	return productTypedOptions(submitCaseEndpoint, 'PUT', productType, [caseIdGuard(caseId)(replaceCaseIdModifier)]);
};

const getCase = (productType, caseId) => {
	const getCaseEndpoint = '/banks/{bank-id}/cases/{case-type}{product-type}/{case-subtype}/{case-id}/tasks/capture';

	return productTypedOptions(getCaseEndpoint, 'GET', productType, [caseIdGuard(caseId)(replaceCaseIdModifier)]);
};

const RequestOptionsBuilder = {
	saveCase,
	submitCase,
	getCase,

	replaceCaseIdModifier,
	replaceCaseTypeModifier,
	productTypeModifier,
};

module.exports = RequestOptionsBuilder;
