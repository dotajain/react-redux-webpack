const request = require('superagent-promise')(require('superagent'), require('promise'));

const config = require('../config');

const _ = require('lodash');

const AccountOpeningContentStore = require('../stores/AccountOpeningContentStore');
const AppStore = require('../stores/AppStore');

const BrowserUtils = require('./BrowserUtils');
const GenericMapper = require('./GenericMapperUtils');

const Api = {
	options: {
		apiVersion: '0.8',
		contentType: 'application/json',
	},

	get(url) {
		const req = request.get(url);

		return _.extend({}, req, { setupWith: options => req.use(this.setupApi(options)) });
	},

	setupApi(options) {
		const opts = _.extend({}, this.options, options);

		return req => req.set('Accept', 'application/json')
			.set('Content-Type', opts.contentType)
			.set('x-bpi-version', opts.apiVersion)
			.set('x-bpi-client-context', this.clientContext())
			.set('x-bpi-service-context', config.authentication.context);
	},

	clientContext() {
		const clientContext = {
			client: {
				userTrackingId: AppStore.getValue('sessionId'),
				appTitle: AccountOpeningContentStore.get('documentTitle'),
				appPackageName: config.analytics.channelID,
				appVersionCode: config.version,
				appVersionName: config.versionName,
			},
			env: {
				platformVersion: BrowserUtils.getBrowserVersion(),
				make: BrowserUtils.getPlatform(),
				locale: BrowserUtils.getUserLocale(),
				platform: config.platform,
			},
		};

		return JSON.stringify(GenericMapper.mapObject(clientContext, {}));
	},
};

module.exports = Api;
