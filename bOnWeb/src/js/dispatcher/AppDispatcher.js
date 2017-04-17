/**
 * @module AppDispatcher
 */

const assign = require('object-assign');
const AppConstants = require('../constants/AppConstants');
const Dispatcher = require('flux').Dispatcher;
const async = require('async');
const PayloadSources = AppConstants.PayloadSources;

// Queue the actions. Implementation discussion found at https://github.com/facebook/flux/issues/106
const queue = async.queue((task, callback) => {
	const payload = {
		source: PayloadSources[task.source],
		action: task.action,
	};

	AppDispatcher.dispatch(payload);
	callback();
}, 1); // Only one worker, one event at a time

/**
 * @class
 */
const AppDispatcher = assign(new Dispatcher(), {

	handleServerAction(action) {
		queue.push({ source: 'SERVER_ACTION', action });
	},
	handleViewAction(action) {
		queue.push({ source: 'VIEW_ACTION', action });
	},
});

module.exports = AppDispatcher;
