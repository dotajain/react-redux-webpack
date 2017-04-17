// PaymentsConstants.js
/**
 * @module PaymentsConstants
 * @requires keyMirror
 */

const keyMirror = require('keymirror');

/**
 * @const PaymentsConstants
 */
const PaymentsConstants = keyMirror({
  REQUEST_ACCOUNTS_LIST_SUCCESS: null,
  REQUEST_ACCOUNT_DETAILS_SUCCESS: null,
  GET_FROM_ACCOUNTS: null,
  GET_FROM_ACCOUNTS_SUCCESS: null,
  GET_TO_ACCOUNTS: null,
  GET_TO_PAYEES: null,
  GET_FROM_PAYEES: null,
  GET_FROM_PAYEES_SUCCESS: null,
  GET_FROM_POTS: null,
  GET_FROM_POTS_SUCCESS: null,
  PUT_SELECTED_ACCOUNT: null,
  SELECT_PAYMENT_TYPE: null,
  SELECT_PAYEE: null,
  MAKE_PAYMENT_SUCCESS: null,
  MAKE_PAYMENT_FAILURE: null,
  MAKE_PAYMENT_SERVICECALL: null,
  GET_STANDING_ORDERS_PAYMENT_LIST: null,
  GET_DIRECT_DEBITS_PAYMENT_LIST: null,
  GET_STANDING_ORDERS_PAYMENT_SUCCESS: null,
  GET_STANDING_ORDERS_PAYMENT_ERROR: null,
  GET_STANDING_ORDER_LIST_ERROR:null,
  GET_FROM_PAYEES_FAILURE: null,
  GET_DIRECT_DEBITS_PAYMENT_SUCCESS: null,
  GET_DIRECT_DEBIT_LIST_ERROR: null,
  DELETE_PAYMENT_SUCCESS: null,
  DELETE_PAYMENT_DETAILS: null,
  DELETE_PAYMENT_DETAILS_SUCCESS: null,
  PUT_TO_SELECTED_ACCOUNT: null,
  DELETE_PAYEE_DETAILS: null,
  DELETE_PAYEE_DETAILS_SUCCESS: null,
  CONFIRM_PAYMENT: null,
  GET_DIRECT_DEBIT_LIST: null,
  GET_DIRECT_DEBIT_LIST_SUCCESS: null,
  GET_STANDING_ORDER_LIST: null,
  GET_STANDING_ORDER_LIST_SUCCESS: null,
  POST_TO_STORE: null,
  GET_ARCHIVED_DATA: null,
  GET_ARCHIVED_FILTER: null,
  GET_PAYMENT_FILTER: null,
  GET_PAYMENTDETAILS_BYID: null,
  POST_EDITPAYMENTDATA: null,
  SET_REPEAT_DATA: null,
  UPDATE_PAYMENT_SO_LIST: null,
  SELECTED_POT: null,
  SELECTED_TO_POT: null,
  POT_CLICKED: null,
  SET_PAYMENT_ID: null,
  REQUEST_ACCOUNT_DETAIL: null,
  REQUEST_ACCOUNT_DETAIL_SUCCESS: null,
  REQUEST_POT_DETAIL: null,
  REQUEST_POT_DETAIL_SUCCESS: null,
  SET_ENDING_DETAILS: null,
  GO_BACK_TO_RP: null,
  MAKE_SO_PAYMENT_SERVICECALL: null,
  MAKE_DD_PAYMENT_SERVICECALL: null,
  SET_EDIT_PAYMENT_DATA: null,
  SET_EDIT_PAYMENT_DATA_FROM_EDITSTORE: null,
  SET_TO_RP: null,
  SET_LEFT_MARGIN: null,
  SAVING_TOT_CLICK: null,
  SAVING_REFRESH: null,
  MAKE_TRASNFER_SERVICECALL: null,
  MAKE_INTER_POT_TRASNFER_SERVICECALL: null,
  CREATE_SINGLE_USE_PAYEE_SERVICECALL: null,
  FROM_SPENDING: null,
  SPENDING_MOVE_MONEY: null,
  GO_BACK_HIDE_KEYPAD: null,
  UPDATE_ALL_EDIT_FORM_VALUES: null,
  UPDATE_EDIT_PAYEE_FORM: null,
  EDIT_PAYEE_SERVICECALL: null,
  MANAGE_PAYEE_SERVICE_SUCCESS: null,
  MOBILE_CLEAR_TOLIST: null,
  UPDATE_ALL_EDIT_PAYMENT_FORM_VALUES: null,
  EDIT_SO_PAYMENT_SERVICECALL: null,
  UPDATE_EDIT_PAYMENT_FORM: null,
  EDIT_PAYMENT_SERVICE_MESSAGE: null,
  EDIT_PAYMENT_EXIT: null,
  SPENDING_TRANSFER_MONEY: null,
  PAYMENT_TRANSFER_MONEY: null,
  SAVING_TO_TOT_CLICK: null,
  SET_ONEOFF_PAYMENT: null,
  REQUEST_ACCOUNT_DETAILS_ERROR: null,
  CLEAR_FROM_SELECTED: null,
  SET_ARCHIVED_LEFT_MARGIN:null,
});

module.exports = PaymentsConstants;