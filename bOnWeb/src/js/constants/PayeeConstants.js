// PaymentsConstants.js
/**
 * @module PaymentsConstants
 * @requires keyMirror
 */

const keyMirror = require('keymirror');

/**
 * @const PaymentsConstants
 */
const PayeeConstants = keyMirror({
  ADD_PAYEE_SERVICECALL: null,
  ADD_PAYEE_FAILURE: null,
  ADD_PAYEE_SUCCESS: null,
  DELETE_PAYEE_DETAILS: null,
  DELETE_PAYEE_SUCCESS: null,
  DELETE_PAYEE_FAILED:null,
  GROUP_ADD_PAYEE: null,
  UPDATE_ADD_PAYEE_FORM: null,
  UPDATE_ALL_FORM_VALUES: null,
  UPDATE_ALL_EDIT_FORM_VALUES: null,
  UPDATE_EDIT_PAYEE_FORM: null,
  EDIT_PAYEE_SERVICECALL: null,
  MANAGE_PAYEE_SERVICE_SUCCESS: null,
  EDIT_PAYEE_EXIT: null,
  EDIT_PAYEE_PARTIAL_SUCCESS:null,
  UPDATE_BENIFICIARY_ID:null,
  UPDATE_ALL_EDIT_FORM_VALUES_FROM_SHOW_VIEW:null,

});

module.exports = PayeeConstants;
