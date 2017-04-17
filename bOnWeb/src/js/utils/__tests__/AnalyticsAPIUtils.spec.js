
jest.unmock('../AnalyticsApiUtils');
jest.unmock('../ApiUtils');
jest.unmock('lodash');

// React
const React = require('react');

// React Addons
const TestUtils = require('react-addons-test-utils');

// superagent
const superagent = require('superagent');

var envConfig = require('../../../static/config')

const AnalyticsApiUtil = require('../AnalyticsApiUtils');
const AnalyticsServerActionCreator = require('../../actions/AnalyticsActionServerCreator');

describe('AnalyticsApiUtil test', function() {

	describe('api send', function() {
		const payload = [{
			// jscs: disable
			event_path: 'path/to/event',
			// jscs: enable
			attributes: {},
			metrics: {},
		}];

		envConfig.disableAnalytics = false;

		it('should make an api call', function() {

			AnalyticsApiUtil.send(payload);

			const sendCallback = superagent.mock.calls.length;
			expect(sendCallback).toBe(1);
		});

	});
});
