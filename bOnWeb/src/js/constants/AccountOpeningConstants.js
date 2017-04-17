/**
 * @module AccountOpeningConstants
 * @requires keyMirror
 */

const keyMirror = require('keymirror');

/**
 * @const AccountOpeningConstants
 */
const AccountOpeningConstants = keyMirror({
	REQUEST_USER_REGISTRATION: null,
	REQUEST_USER_REGISTRATION_ERROR: null,

	REQUEST_USER_REGISTRATION_PAGE: null,
	REQUEST_USER_REGISTRATION_PAGE_SUCCESS: null,
	REQUEST_USER_REGISTRATION_PAGE_ERROR: null,

	REQUEST_POSTCODE_ADDRESSES: null,
	REQUEST_POSTCODE_ADDRESSES_SUCCESS: null,
	REQUEST_POSTCODE_ADDRESSES_ERROR: null,
	CLEAR_LOADED_ADDRESS_LIST: null,

	REQUEST_FULL_ADDRESSES: null,
	REQUEST_FULL_ADDRESSES_SUCCESS: null,
	REQUEST_FULL_ADDRESSES_ERROR: null,

	CLEAR_ADDRESS: null,
	RESET_ADDRESS: null,

	REQUEST_PRODUCT_OFFER: null,
	REQUEST_PRODUCT_OFFER_SUCCESS: null,
	RESPOND_TO_PRODUCT_OFFER: null,

	UPDATE_CASE_ERROR: null,

	LOAD_FIELDS_STEP1: null,
	POST_DATA_STEP1: null,
	LOAD_APPROVAL_STEP2: null,

	ENABLE_VALIDATION: null,
	UPDATE_FORM_VALUE: null,
	UPDATE_FORM_VALUES: null,
	UPDATE_VALIDATION: null,
	REMOVE_VALIDATION: null,

	GROUP_ELIGIBILITY: null,
	GROUP_PAGE_1: null,
	GROUP_PAGE_2: null,
	GROUP_TS_AND_CS: null,
	GROUP_REGISTRATION: null,
	GROUP_CALLVALIDATE_3D: null,
	GROUP_REVIEW: null,
	GROUP_OFFER: null,
	GROUP_LOGIN: null,
	GROUP_SWITCH: null,
	GROUP_OTP: null,
	GROUP_EXISTING_CUSTOMER_WITHOUT_CUSTOMERID: null,
	GROUP_EXISTING_CUSTOMER_WITH_CUSTOMERID: null,
	GROUP_EXISTING_CUSTOMER: null,
	GROUP_STEPUP: null,

	SEND_FORM_DATA: null,
	GET_CASE: null,
	SET_USER_IS_EDITING_FIELD: null,

	SUBMIT_SWITCHING_APPLICATION: null,
	SUBMIT_REGISTRATION_PAGE: null,

	START_AUTOSAVE_TIMER: null,

	UPDATE_OFFER_STATUS: null,

	SET_PRODUCT_CODE: null,

	UPDATE_USERNAME: null,

	SET_BANK_ID: null,
	RESET_BANK_ID: null,

	CLEAR_USERNAME: null,
	CLEAR_USERINFO: null,

	RECEIVE_GET_RESULT: null,

	RECORD_TASK_COMPLETE: null,

	REQUEST_TERMSANDCONDITIONS_DETAILS: null,
	REQUEST_TERMSANDCONDITIONS_DETAILS_SUCCESS: null,
});

module.exports = AccountOpeningConstants;