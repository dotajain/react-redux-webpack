/**
 * @module PortalStore
 */

const _ = require('lodash');
const AppDispatcher = require('../dispatcher/AppDispatcher');
const assign = require('object-assign');
const EventEmitter = require('events').EventEmitter;
const PortalConstants = require('../constants/PortalConstants');
const AccountOpeningApiUtils = require('../utils/AccountOpeningApiUtils');

const CHANGE_EVENT = 'change';
let _casesInformation = {};

const PortalStore = assign({}, EventEmitter.prototype, {

	emitChange() {
		this.emit(CHANGE_EVENT);
	},

	/**
	* @param {function} callback
	*/
	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	/**
	 * Allow views to unbind listeners before dismounting.
	 *
	 * @param  {Function} callback    Function to unbind.
	 */
	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	getAll() {
		return _casesInformation || [];
	},

});

PortalStore.dispatchToken = AppDispatcher.register(payload => {
	const action = payload.action;

	switch (action.actionType) {

		case PortalConstants.REQUEST_PORTAL_CASES:
			AccountOpeningApiUtils.getCases();
			break;
		case PortalConstants.REQUEST_PORTAL_CASES_SUCCESS:
			const cases = _.groupBy(action.data.cases, item => {
				const key = item.id.match(/(\w{2})-\d*/);
				return key.length ? key[1] : 'NOGROUPED';
			});
			_casesInformation = cases;
			PortalStore.emitChange();
			break;

		default:
			// Do nothing.
	}
});

module.exports = PortalStore;
