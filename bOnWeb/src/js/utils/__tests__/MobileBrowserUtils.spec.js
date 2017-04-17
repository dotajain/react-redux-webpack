
jest.unmock('../BrowserUtils');
jest.unmock('lodash');
jest.unmock('bowser');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const _ = require('lodash');
const bowser = require('bowser');
const modernizr = require('modernizr');

const BrowserUtils = require('../BrowserUtils');

describe('BrowserUtils', function() {

	const userAgentTests = [
		{
			name: 'Android Webkit Browser',
			userAgent: 'Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
			isMobileUserAgent: true
		},
		{
			name: 'BlackBerry',
			userAgent: 'Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.1.0.346 Mobile Safari/534.11+',
			isMobileUserAgent: true
		},
		{
			name: 'Midori',
			userAgent: 'Mozilla/5.0 (X11; U; Linux i686; fr-fr) AppleWebKit/525.1+ (KHTML, like Gecko, Safari/525.1+) midori/1.19',
			isMobileUserAgent: false
		},
		{
			name: 'Playstation',
			userAgent: 'Mozilla/5.0 (PLAYSTATION 3; 3.55)',
			isMobileUserAgent: false
		},
		{
			name: 'chrome',
			userAgent: 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
			isMobileUserAgent: false,
		},
		{
			name: 'PhantomJS',
			userAgent: '',
			isMobileUserAgent: false,
		}
	];

	describe('isMobileUserAgent', function() {
		it('verifies that it is returning the correct value for specified userAgents', function() {
			_.each(userAgentTests, function(userAgentTest) {
				// Override userAgent
				BrowserUtils.getUserAgent = function() {
					return userAgentTest.userAgent;
				};

				const browser = bowser._detect(userAgentTest.userAgent);
				const isMobile = (browser.mobile || browser.tablet) ? true : false;

				expect(isMobile).toEqual(userAgentTest.isMobileUserAgent);
			});
		});
	});

	describe('isMobileBrowser', function() {
		it('is always false when there is no touch capability', function() {
			_.each(userAgentTests, function(userAgentTest) {
				// Override userAgent
				BrowserUtils.getUserAgent = function() {
					return userAgentTest.userAgent;
				};

				// Override modernizr touch
				modernizr.touch = false;

				expect(BrowserUtils.isMobileBrowser()).toEqual(false);
			});
		});
	});
});
