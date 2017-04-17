
jest.unmock('../../constants/AnalyticsConstants');
jest.unmock('../../actions/AnalyticsActionServerCreator');
jest.unmock('../../utils/AnalyticsApiUtils');
jest.unmock('../AnalyticsStore');
jest.unmock('../../config');

describe('AnalyticsStore', function() {

	const AnalyticsConstants = require('../../constants/AnalyticsConstants');
	const superagent = require('superagent');
	let AppDispatcher;
	let AnalyticsStore;
	let triggerActionCallback;

	/**
	 * Mocked Actions specified here.
	 */
	const actionTrackEvent = {
		action: {
			actionType: AnalyticsConstants.TRACK_EVENT,
			data: {
				type: {
					path: 'path/to/event',
					action: 'Interracted',
				},
				data: {
					metrics: {
						view: 'viewed'
					},
					attributes: {
						'step-1': 'loaded'
					}
				},
			}
		}
	};

	const actionImmediateDispatch = {
		action: {
			actionType: AnalyticsConstants.REQUEST_IMMEDIATE_DISPATCH
		}
	};

	const actionRequestDispatchSuccess = {
		action: {
			actionType: AnalyticsConstants.REQUEST_DISPATCH_SUCCESS
		}
	};

	const actionCheckLoopStart = {
		action: {
			actionType: AnalyticsConstants.REQUEST_CHECKLOOP_START
		}
	};

	const actionCheckLoopTermination = {
		action: {
			actionType: AnalyticsConstants.REQUEST_CHECKLOOP_TERMINATION
		}
	};

	beforeEach(function() {
		AppDispatcher = require('../../dispatcher/AppDispatcher');
		AnalyticsStore = require('../AnalyticsStore');
		triggerActionCallback = AppDispatcher.register.mock.calls[0][0];
	});

	it('registers a triggerActionCallback with the dispatcher', function() {
		expect(AppDispatcher.register.mock.calls.length).toBe(1);
	});

	it('should initialize with no events', function() {
		const all = AnalyticsStore.getAll();
		expect(all).toEqual([]);
	});

	it('containEvents should initialize with false (no events)', function() {
		const hasEvents = AnalyticsStore.containsEvents();
		expect(hasEvents).toEqual(false);
	});

	it('containEvents should return true if there are events in the queue', function() {
		triggerActionCallback(actionTrackEvent);
		const hasEvents = AnalyticsStore.containsEvents();
		expect(hasEvents).toEqual(true);
	});

	it('fires an event to be tracked', function() {
		triggerActionCallback(actionTrackEvent);
		const all = AnalyticsStore.getAll();
		expect(all.length).toBe(1);
	});

	it('starts the checkloop', function() {
		triggerActionCallback(actionCheckLoopStart);
		expect(setTimeout.mock.calls.length).toBe(1);
		expect(setTimeout.mock.calls[0][1] >= 0).toBeTruthy();
	});

	it('starts the checkloop and checks that the next loop is scheduled in due time', function() {
		triggerActionCallback(actionCheckLoopStart);
		expect(setTimeout.mock.calls.length).toBe(1);
		triggerActionCallback(actionTrackEvent);

		jest.runAllTimers();
		triggerActionCallback(actionRequestDispatchSuccess);
		expect(setTimeout.mock.calls.length).toBe(2);

	});

	it('flushes the events queue immediately', function() {
		triggerActionCallback(actionCheckLoopStart);
		triggerActionCallback(actionTrackEvent);
		triggerActionCallback(actionImmediateDispatch);

		expect(clearTimeout).toBeCalled();
		triggerActionCallback(actionRequestDispatchSuccess);
		const all = AnalyticsStore.getAll();
		expect(all.length).toBe(0);
	});

});
