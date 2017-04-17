/**
 * @module PostcodeActions
 */

const _ = require('lodash');

const AccountOpeningConstants = require('../constants/AccountOpeningConstants');
const AccountOpeningServerActionCreator = require('../actions/AccountOpeningServerActionCreator');
const AppDispatcher = require('../dispatcher/AppDispatcher');
const PostcodeApiUtils = require('../utils/PostcodeApiUtils');

/**
 * @class PostcodeActions
 */
const PostcodeActions = {

	/**
	 * Action for request addresses within a given postcode. Step 1 of the postcode search.
	 *
	 * @param {String} addressId	 	The addressId, assigned to an AddressSection.
	 * @param {String} postcode			The postcode entered by the user.
	 * @param {String} houseNumber		The houseNumber entered by the user (optional, not used in this application).
	 */
	requestPostcodeAddresses(addressId, postcode, houseNumber) {
		PostcodeApiUtils.search(postcode, houseNumber).then(res => {
			const { body } = res;

			AccountOpeningServerActionCreator.handlePostcodeLookupSuccess(_.extend({}, body, { addressId }));
		}, () => {
			AccountOpeningServerActionCreator.handlePostcodeLookupContentError(addressId);
		});
	},

	/**
	 * Action for request full address details. Step 2 of the postcode search.
	 *
	 * @param {String} addressId	 	The addressId, assigned to an AddressSection.
	 * @param {String} addressRef		The addressRef (given back from the loadAddressesForPostcode api request).
	 * @param {String} selectedAddress 		The summary line from the initial QAS call.
	 */
	requestFullAddress(addressId, addressRef, selectedAddress) {
		PostcodeApiUtils.load(addressRef).then(res => {
			const { body } = res;
			AccountOpeningServerActionCreator.handleFullAddressLookupSuccess(_.extend({}, body, { addressId, selectedAddress }));
		}, () => {
			AccountOpeningServerActionCreator.handlePostcodeLookupContentError(addressId);
		});
	},

	/**
	 * Clear the currently saved list of addresses from the API.
	 */
	clearLoadedAddressList(data) {
		AppDispatcher.handleViewAction({
			actionType: AccountOpeningConstants.CLEAR_LOADED_ADDRESS_LIST,
			data,
		});
	},
};

module.exports = PostcodeActions;
