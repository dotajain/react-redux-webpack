/**
 * CustomerServerActions
 * @class CustomerServerActions
 */

const AppDispatcher = require('../dispatcher/AppDispatcher');
const CustomerConstants = require('../constants/CustomerConstants');

const CustomerServerActions = {

	/**
	 * Handle success of get customers
	 * @param  {object} response  response as given from the api
	 */
	handleGetCustomersSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: CustomerConstants.GET_CUSTOMERS_SUCCESS,
			data: response,
		});
	},

	/**
	 * Handle error of get customers
	 * @param  {object} error 	error as given by the api
	 */
	handleGetCustomersError(errorObj) {
		AppDispatcher.handleServerAction({
			actionType: CustomerConstants.GET_CUSTOMERS_FAILURE,
			status: errorObj.status,
		});
	},

	/**
	 * Handle success of get customer by id
	 * @param  {object} response  response as given from the api
	 */
	handleGetCustomerByIdSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: CustomerConstants.GET_CUSTOMER_BY_ID_SUCCESS,
			data: response,
		});
	},

	/**
	 * Handle error of get customer by id
	 * @param  {object} error 	error as given by the api
	 */
	handleGetCustomerByIdError(errorObj) {
		AppDispatcher.handleServerAction({
			actionType: CustomerConstants.GET_CUSTOMER_BY_ID_FAILURE,
			status: errorObj.status,
		});
	},
};

module.exports = CustomerServerActions;
