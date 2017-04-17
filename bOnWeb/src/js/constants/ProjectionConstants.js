// projection constants.js
/**
 * @module FinancialStories And Projection settings page
 * @requires keyMirror
 */

const keyMirror = require('keymirror');

/**
 * @const TimelineConstants
 */
module.exports = keyMirror({

	GET_PROJECTION_SUMMARY: null,
	GET_PROJECTION_SUMMARY_SUCCESS: null,
	GET_CURRENT_BALANCE: null,
	GET_CURRENT_BALANCE_SUCCESS: null,
	GET_COMMITMENT: null,
    GET_COMMITMENT_SUCCESS: null,
    GET_ESSENTIAL_SPENDINGS : null,
    GET_ESSENTIAL_SPENDINGS_SUCCESS : null,
    GET_NEXT_EARNING : null,
    GET_NEXT_EARNING_SUCCESS : null,
    GET_EARNING_AND_COMMITMENT:null,
    GET_EARNING_AND_COMMITMENT_SUCCESS : null,
    GET_ESSENTIAL_SPENDING : null,
    GET_ESSENTIAL_SPENDING_SUCCESS : null,
    GET_PROJECTION_ALERTS:null,
    GET_PROJECTION_ALERTS_SUCCESS:null,
    REQUEST_EARNINGS_COMMITMENTS:null,
    REQUEST_EARNINGS_COMMITMENTS_SUCCESS : null,
    NAVIGATE_TO_FINANCIAL_STORIES : null,
    DONE_PROJECTIONS:null,
    DONE_PROJECTIONS_SUCCESS:null,
    GET_PROJECTION_SUMMARY_FAILURE:null,
    CATEGORY_TAGS_FOR_PROJECTION_TAB:null,
    USER_TAGS_FOR_PROJECTION_TAB:null,
    SET_AMOUNT_FOR_NOTIFICATION_ALERT:null,
    SET_NOTIFICATION_FLAG:null,
    GET_EARNINGS_ID:null,
    PROJECTION_TOUR_DONE_CLICKED: null,
    PROJECTION_CRUNCH_BACK_CLICKED:null,
    PROJECTION_LEAVE_SETUP: null,
});