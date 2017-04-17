/**
 * @module AnalyticsStore
 */

// Packages
const _ = require('lodash');
const assign = require('object-assign');
const config = require('../config');
const uuid = require('node-uuid');

// Dispatcher
const AppDispatcher = require('../dispatcher/AppDispatcher');
const EventEmitter = require('events').EventEmitter;

// Constants
const AnalyticsConstants = require('../constants/AnalyticsConstants');

// Stores
const AccountOpeningDataStore = require('./AccountOpeningDataStore');

// Utils
const AnalyticsApiUtils = require('../utils/AnalyticsApiUtils');
const DateUtils = require('../utils/DateUtils');

let _messages = [];
let _timeoutId = null;
let _inFlightIndex = -1;

const AnalyticsStore = assign({}, EventEmitter.prototype, {
	/**
	 * Returns the message within the messages array at given index.
	 *
	 * @param {number} id
	 * @return {object} message
	 */
	get(id) {
		return _.cloneDeep(_messages[id]);
	},

	/**
	 * Returns the contents of the messages array.
	 * @return {array} messages
	 */
	getAll() {
		return _.cloneDeep(_messages);
	},

	/**
	 * Returns true if the messages array is not empty.
	 *
	 * @return {bool}
	 */
	containsEvents() {
		return _messages.length > 0;
	},
});

/**
 * This method will check the message queue for events and will use the
 * Analytics APi to send them if the array is not empty.
 *
 */
function attemptDispatch() {
	_timeoutId = null;

	if (AnalyticsStore.containsEvents()) {
		// Mark messages that are being sent.
		_inFlightIndex = _messages.length;
		// Send.
		AnalyticsApiUtils.send(_messages);
	} else {
		scheduleDispatch();
	}
}

/**
 * Reschedule a dispatch if we're not in the middle of an interval.
 *
 */
function scheduleDispatch() {
	if (_timeoutId === null) {
		_timeoutId = setTimeout(attemptDispatch, config.analytics.sendInterval);
	}
}

/**
 * Should there be a scheduled dispatch, cancel it.
 *
 */
function cancelScheduledDispatch() {
	if (_timeoutId !== null) {
		clearTimeout(_timeoutId);
		_timeoutId = null;
	}
}

/**
 * Do not wait for next iteration, cancel scheduled dispatch and attempt a new one.
 *
 */
function immediateDispatch() {
	cancelScheduledDispatch();
	attemptDispatch();
}

/**
 * Convinience function to convert object to an array of individual objects.
 * @param  {object} object 					Regular object with attributes
 * @return {array}  arrayofObjects  Array of inividual objects
 */
function convertToArrayOfObjects(object) {
	return _.map(object, (value, key) => {
		const obj = {};
		obj[key] = value.toString();
		return obj;
	});
}

AnalyticsStore.dispatchToken = AppDispatcher.register(payload => {
	const action = payload.action;

	switch (action.actionType) {

		/**
		 * Append the new event to the messages queue. This will also populate the
		 * timestamp using the analyticsApiUtil.
		 *
		 */
	case AnalyticsConstants.TRACK_EVENT:
		let eventData = action.data;
		const hasContext = _.indexOf(config.analytics.excludeViewContext, eventData.type.path) < 0;

		eventData = _.merge(eventData, {
			id: uuid.v1(),
			data: {
				context: (hasContext ? AnalyticsApiUtils.getViewContext() : undefined),
				attributes: AnalyticsApiUtils.getCommonAttributes(AccountOpeningDataStore),
				metrics: AnalyticsApiUtils.getCommonMetrics(),
			},
		});
		eventData['created_at'] = DateUtils.getISODateString();

		const attributesArrayOfObjects = convertToArrayOfObjects(eventData.data.attributes);

		eventData.data.attributes = {
			attribute: attributesArrayOfObjects,
		};

		const metricsArrayOfObjects = convertToArrayOfObjects(eventData.data.metrics);

		eventData.data.metrics = {
			attribute: metricsArrayOfObjects,
		};

		_messages = _messages.concat(eventData);

		if (!_.isUndefined(eventData.sendImmediately)) {
			const sendImmediately = eventData.sendImmediately;
			delete eventData.sendImmediately;

			if (sendImmediately) {
				immediateDispatch();
			}
		}
		break;

		/**
		 * Requests an immediate flush of the event queue by clearing the timeout
		 * loop and either send the data and terminate the loop or send the data
		 * and continue looping. This depends on the applicationWillTerminate
		 * argument.
		 *
		 */
	case AnalyticsConstants.REQUEST_IMMEDIATE_DISPATCH:
		immediateDispatch();
		break;

		/**
		 * Initiates the polling loop that will flush the event queue to the events
		 * service.
		 *
		 */
	case AnalyticsConstants.REQUEST_CHECKLOOP_START:
		scheduleDispatch();
		break;

		/**
		 * Clear the messages array should the dispatch have been successful and
		 * reschedule dispatch.
		 *
		 */
	case AnalyticsConstants.REQUEST_DISPATCH_SUCCESS:
			// Remove messages that were being sent. This is to account for the
			// scenario that messages are appended while sending.

		_messages = _messages.slice(_inFlightIndex);
		_inFlightIndex = -1;

		scheduleDispatch();
		break;

		/**
		 * Should the dispatch have failed, then prepare for determining the next
		 * iteration.
		 *
		 */
	case AnalyticsConstants.REQUEST_DISPATCH_ERROR:
		scheduleDispatch();
		break;

		/**
		 * Cancel Scheduled dispatch and clear messages.
		 *
		 */
	case AnalyticsConstants.REQUEST_CHECKLOOP_TERMINATION:
			// As per ticket events to be deleted on termination
		_messages = [];
		cancelScheduledDispatch();
		break;

	default:
		// Do nothing.
	}
});

module.exports = AnalyticsStore;
