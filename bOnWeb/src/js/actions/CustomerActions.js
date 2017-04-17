/**
 * CustomerActions
 * @class CustomerActions
 */

const AppDispatcher = require('../dispatcher/AppDispatcher');
const CustomerConstants = require('../constants/CustomerConstants');

const CustomerActions = {

	/**
	 * Request the get customers endpoint from the customers api
	 */
	getCustomers() {
		AppDispatcher.handleServerAction({
			actionType: CustomerConstants.GET_CUSTOMERS,
		});
	},

	getCustomerById() {
		AppDispatcher.handleServerAction({
			actionType: CustomerConstants.GET_CUSTOMER_BY_ID,
		});
	},
};

module.exports = CustomerActions;
