
const AppDispatcher = require('../dispatcher/AppDispatcher');
const AccountOpeningConstants = require('../constants/AccountOpeningConstants');

/**
 * @class AccountOpeningServerActionCreator
 */
const AccountOpeningServerActionCreator = {

	handlePostcodeLookupSuccess(response) {
		if (response['short_addresses']) {
			this.raise(AccountOpeningConstants.REQUEST_POSTCODE_ADDRESSES_SUCCESS, response);
			return;
		}

		this.handleFullAddressLookupSuccess(response);
	},

	raise(actionType, data) {
		AppDispatcher.handleServerAction({
			actionType,
			data,
		});
	},

	handlePostcodeLookupContentError(addressId) {
		AppDispatcher.handleServerAction({
			actionType: AccountOpeningConstants.REQUEST_POSTCODE_ADDRESSES_ERROR,
			data: { addressId },
		});
	},

	handleFullAddressLookupSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: AccountOpeningConstants.REQUEST_FULL_ADDRESSES_SUCCESS,
			data: response,
		});
	},

	handleFullAddressLookupError(addressId) {
		AppDispatcher.handleServerAction({
			actionType: AccountOpeningConstants.REQUEST_FULL_ADDRESSES_ERROR,
			data: { addressId },
		});
	},

	handleProductOfferSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: AccountOpeningConstants.REQUEST_PRODUCT_OFFER_SUCCESS,
			data: response,
		});
	},

	handleCaseUpdateError(body) {
		AppDispatcher.handleServerAction({
			actionType: AccountOpeningConstants.UPDATE_CASE_ERROR,
			data: {
				body,
			},
		});
	},

};

module.exports = AccountOpeningServerActionCreator;
