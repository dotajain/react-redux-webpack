/**
 * @module PostcodeAddressStore
 */

const AppDispatcher = require('../dispatcher/AppDispatcher');
const assign = require('object-assign');
const EventEmitter = require('events').EventEmitter;
const _ = require('lodash');
const AccountOpeningConstants = require('../constants/AccountOpeningConstants');

const CHANGE_EVENT = 'change';
let _addresses = {};

const PostcodeAddressStore = assign({}, EventEmitter.prototype, {

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
	 * @param  {Function} callback 		Function to unbind.
	 */
	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	get(id) {
		return _addresses[id];
	},

	getAll() {
		return _addresses;
	},

});

PostcodeAddressStore.dispatchToken = AppDispatcher.register(payload => {
	const action = payload.action;

	switch (action.actionType) {
		case AccountOpeningConstants.REQUEST_POSTCODE_ADDRESSES_SUCCESS:
			_addresses[action.data.addressId] = action.data['short_addresses'];
			_addresses.lastupdated = action.data.addressId;
			PostcodeAddressStore.emitChange();
			break;

		case AccountOpeningConstants.REQUEST_POSTCODE_ADDRESSES_ERROR:
			_addresses[action.data.addressId] = { error: true };
			_addresses.lastupdated = action.data.addressId;
			PostcodeAddressStore.emitChange();
			break;

		case AccountOpeningConstants.CLEAR_LOADED_ADDRESS_LIST:
			const { data } = action;

			if (!data || !_.isArray(data)) {
				_addresses = {};
			} else {
				_addresses = _.omit(_addresses, data);
			}

			PostcodeAddressStore.emitChange();
			break;
		default:
			// Do nothing.
	}
});

module.exports = PostcodeAddressStore;
