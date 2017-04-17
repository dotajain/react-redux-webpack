/**
 * @class BrowserUtils
 */

// Packages
const _ = require('lodash');
const browser = require('bowser');
const modernizr = require('modernizr');
const config = require('../config');

const BrowserUtils = {
	isMobileBrowser() {
		return modernizr.touch && (browser.mobile || browser.tablet);
	},
	isMobileView() {
		const screenSize = BrowserUtils.getScreenSize();
		const screenWidth = screenSize ? screenSize.x : undefined;
		const isMobileDevice = screenWidth < 801;
		return isMobileDevice;
	},

	getUserAgent() {
		return navigator.userAgent || navigator.vendor || window.opera;
	},

	getPlatform() {
		return navigator.platform || window.opera;
	},

	getBrowserVersion() {
		return navigator.appVersion || navigator.vendor || window.opera;
	},

	getBrowserName() {
		return `${navigator.appName} - ${navigator.appCodeName}` || window.opera;
	},

	getUserLocale() {
		return navigator.userLanguage || navigator.language || navigator.browserLanguage || navigator.systemLanguage;
	},

	getScreenSize() {
		const w = window;
		const d = document;
		const e = d.documentElement;
		const g = d.getElementsByTagName('body')[0];
		const x = w.innerWidth || e.clientWidth || g.clientWidth;
		const y = w.innerHeight || e.clientHeight || g.clientHeight;

		return { x, y };
	},

	/**
	 * Determine if this is a compatible browser
	 *
	 * @return {bool}       True if this is a compatible browser
	 */
	isCompatible() {
		let compatible = false;

		// Don't check browser and version on mobile or tablet
		if (browser.mobile || browser.tablet) {
			return true;
		}

		// Do check the compatible browsers list in config
		_.each(config.compatibleBrowsers, compatibleBrowser => {
			if (browser[compatibleBrowser.browser] && parseInt(browser.version) >= compatibleBrowser.version) {
				compatible = true;
			}
		});

		if (process.env.NODE_ENV === 'development') {
			compatible = true;
		}

		return compatible;
	},

	/**
	 * Set viewport to scale 0 or 1 for zoom functionality
	 *
	 */
	setViewPort(scale) {
		const viewport = document.querySelector('meta[name=viewport]');
		// is it already set to initial-scale=0
		const initialScale = viewport.getAttribute('content').search('initial-scale=0') > 0;
		if (scale === 0 && (this.getScreenSize().x < 991 || initialScale)) {
			viewport.setAttribute('content', 'width=1024, initial-scale=0');
		} else {
			viewport.setAttribute('content', 'width=device-width, initial-scale=1');
		}
	},
};

module.exports = BrowserUtils;

