function buildProductionConfig() {
	const config = global.envConfig || {};
	config.content = global.appContent;
	// To test using stub data instead of actual micro-service invocation
	// config.stubConfig = global.stubConfig;
	return config;
}

module.exports = buildProductionConfig();
