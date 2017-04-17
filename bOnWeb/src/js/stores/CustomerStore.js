/**
 * @module CustomerStore
 */

// Packages
const _ = require('lodash');
const AppDispatcher = require('../dispatcher/AppDispatcher');
const assign = require('object-assign');
const EventEmitter = require('events').EventEmitter;

// Constants
const CustomerConstants = require('../constants/CustomerConstants');

// Actions
const AccountOpeningActions = require('../actions/AccountOpeningActions');

// Utils
const CustomerApiUtils = require('../utils/CustomerApiUtils');

// Private vars
const CHANGE_EVENT = 'change';

// All possible customer store values. Default values for each are specified here.
const _fields = {
	customerId: undefined,
};

const CustomerStore = assign({}, EventEmitter.prototype, {

	/**
	 * Alert listeners that the Store has changed.
	 */
	emitChange() {
		this.emit(CHANGE_EVENT);
	},

	/**
	 * Allow views to specify functions to run when this store changes.
	 *
	 * @param {function} callback		Function to run on change.
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

	/**
	 * Fetch a value from the Store.
	 *
	 * @param  {String} key 		Key of the value to get.
	 * @param {Any} defaultVal 		Used if the request key is undefined.
	 * @return {Any}    		The corresponding value.
	 */
	getValue(key, defaultVal) {
		return _fields[key] || defaultVal;
	},

	/**
	 * Fetch all values in the store.
	 *
	 * @return {Object} 		All stored values.
	 */
	getAll() {
		return _.cloneDeep(_fields); // Ensures that components never edit the _fields object in this store directly.
	},
});

/**
 * Listen for dispatcher events.
 *
 * @param  {Object} payload 			Data attached to a dispatcher action.
 */
CustomerStore.dispatchToken = AppDispatcher.register(payload => {
	const action = payload.action;
	const data = action.data;
	const customerId = CustomerStore.getValue('customerId');

	switch (action.actionType) {
	case CustomerConstants.GET_CUSTOMERS:
		if (!_fields.isGetCustomersRequesting) {
			CustomerApiUtils.getCustomers();
			_fields.isGetCustomersRequesting = true;
			CustomerStore.emitChange();
		}
		break;
	case CustomerConstants.GET_CUSTOMERS_SUCCESS:
		const owner = _.find(data.customers, { relationship: 'OWNER' });
		_fields.isGetCustomersRequesting = false;
		if (owner && owner.id) {
			_fields.customerId = owner.id;
			CustomerStore.emitChange();
		} else {
			AccountOpeningActions.navigateToWebTask('WEB-ERROR');
		}
		break;

	case CustomerConstants.GET_CUSTOMER_BY_ID:
		if (!_fields.isGetCustomerByIdRequesting) {
			_fields.isGetCustomerByIdRequesting = true;
			CustomerApiUtils.getCustomerById(customerId);
			CustomerStore.emitChange();
		}
		break;
	case CustomerConstants.GET_CUSTOMERS_FAILURE:
		_fields.isGetCustomersRequesting = false;
		_fields.error = true;
		CustomerStore.emitChange();
		break;
	case CustomerConstants.GET_CUSTOMER_BY_ID_SUCCESS:
		_fields.isGetCustomerByIdRequesting = false;
		_fields.customerNumber = data['customer_number'];
		CustomerStore.emitChange();
		break;
	case CustomerConstants.GET_CUSTOMER_BY_ID_FAILURE:
		_fields.isGetCustomerByIdRequesting = false;
		_fields.error = true;
		CustomerStore.emitChange();
		break;

	default:
		// Do nothing.
	}
});

module.exports = CustomerStore;
