const envConfig = require('../../static/config');

const { apiStringFieldMaxLength, apiVersions } = require('./ApiVersions');

const analytics = require('./Analytics');

const {
	branding,
	brandConfig,
} = require('./BrandConfig');

const taskUrls = require('./TaskUrls');

const formOptions = require('./FormOptions');

const general = require('./General');

const config = {
	analytics,
	apiStringFieldMaxLength,
	apiVersions,
	taskUrls,
	branding,
	productData: brandConfig.getProductsFor(envConfig.bankId),
	...formOptions,
	...general,
};

module.exports = config;
