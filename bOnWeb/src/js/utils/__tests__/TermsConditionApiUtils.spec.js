/**
 * @module TransactionHistoryApiUtils
 */

'use strict';
jest.unmock('../TermsConditionApiUtils');
jest.unmock('../../../static/config');
jest.unmock('../../config');
const TermsConditionApiUtils = require('../TermsConditionApiUtils');
const envConfig = require('../../../static/config');
const ApiUtils = require('../ApiUtils');
const TermsConditionActionCreator = require('../../actions/TermsConditionActionCreator');
const AccountsActionCreator = require('../../actions/AccountsActionCreator');

const TermsConditionConstants = require('../../constants/TermsConditionConstants');

describe('ermsCondition Api Utils Test Cases', () => {
	beforeEach(() => {
		ApiUtils.makeAjaxCall.mockClear();
	});
	describe('getTcData', () => {
		beforeEach(() => {
			TermsConditionApiUtils.getTcData();
		});

        describe('Request Arguments of getTcData', () => {
			let args = '';
			beforeEach(() => {
				args = ApiUtils.makeAjaxCall.mock.calls[0][0];
			});
			it('should make Ajax call', () => {
				expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
			});
			it('should have set the correct method', () => {
				expect(args.method).toBe('GET');
			});
            it('should construct the correct url', () => {
				expect(args.url).toContain('/ref/content/tandcs/B/latest');
			});
		});
        describe('it was success', () => {
			let success;
			beforeEach(() => {
				TermsConditionActionCreator.handleTcDataSuccess.mockClear();
				success = ApiUtils.makeAjaxCall.mock.calls[0][1];
				success({
					accounts: []
				});
			});
			it('should make action call', () => {
				expect(TermsConditionActionCreator.handleTcDataSuccess.mock.calls[0][0]).toBeDefined();
			});
		});
		describe('it has error', () => {
			let failure;
			beforeEach(() => {
				TermsConditionActionCreator.handleTcDataSuccess.mockClear();
				failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
				failure({
					error: "Something went wrong"
				});
			});
			it('should make action call', () => {
				//expect(TimelineActionCreator.handleTransactionError.mock.calls[0][0]).toBeDefined();
			});
		});
	});


	describe('getTextUrl', () => {
		beforeEach(() => {
			let textUrl = '/ref';
			TermsConditionApiUtils.getTextUrl(textUrl);
		});
		describe('Request Arguments of getTextUrl', () => {
			let args = '';
			beforeEach(() => {
				args = ApiUtils.makeAjaxCall.mock.calls[0][0];
			});
			it('should make Ajax call', () => {
				expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
			});
			it('should have set the correct method', () => {
				expect(args.method).toBe('GET');
			});
		});
		describe('it was success', () => {
			let success;
			beforeEach(() => {
				TermsConditionActionCreator.handleTcTextDataSuccess.mockClear();
				success = ApiUtils.makeAjaxCall.mock.calls[0][1];
				success({
					id: '123456',
					product: {},
					metadata: {},
				});
			});
			it('should make action call', () => {
				expect(TermsConditionActionCreator.handleTcTextDataSuccess.mock.calls[0][0]).not.toBeDefined();
			});
		});

		describe('it has error', () => {
			let failure;
			beforeEach(() => {
				TermsConditionActionCreator.handleTcTextDataSuccess.mockClear();
				failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
				failure({
					error: "Something went wrong"
				});
			});
			it('should make action call', () => {
				//expect(TimelineActionCreator.handleTransactionError.mock.calls[0][0]).toBeDefined();
			});
		});
	});

describe('acceptedTermsAndConditions', () => {
		beforeEach(() => {
			ApiUtils.makeAjaxCall.mockClear();
			let serviceName = 'abcd';
			let version = '2';
			TermsConditionApiUtils.acceptedTermsAndConditions(serviceName, version);
		});
		describe('Request Arguments of acceptedTermsAndConditions', () => {
			let args = '';
			beforeEach(() => {
				args = ApiUtils.makeAjaxCall.mock.calls[0][0];
			});
			it('should make Ajax call', () => {
				expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
			});
			it('should have set the correct method', () => {
				expect(args.method).toBe('PUT');
			});
		});
		describe('it was success', () => {
			let success;
			beforeEach(() => {
				AccountsActionCreator.handleAcceptTcSuccess.mockClear();
				success = ApiUtils.makeAjaxCall.mock.calls[0][1];
				success({
					id: '123456',
					product: {},
					metadata: {},
				});
			});
			it('should make action call', () => {
				expect(AccountsActionCreator.handleAcceptTcSuccess.mock.calls[0][0]).not.toBeDefined();
			});
		});

		describe('it has error', () => {
			let failure;
			beforeEach(() => {
				AccountsActionCreator.handleAcceptTcSuccess.mockClear();
				failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
				failure({
					error: "Something went wrong"
				});
			});
			it('should make action call', () => {
				//expect(TimelineActionCreator.handleTransactionError.mock.calls[0][0]).toBeDefined();
			});
		});
	});




	// xdescribe('acceptedTermsAndConditions', () => {
	// 	beforeEach(() => {
	// 		let serviceName = 'abcd';
    //         let version = '2';
	// 		TermsConditionApiUtils.acceptedTermsAndConditions(serviceName, version);
	// 	});
	// 	describe('Request Arguments of getTextUrl', () => {
	// 		let args = '';
	// 		beforeEach(() => {
	// 			args = ApiUtils.makeAjaxCall.mock.calls[0][0];
	// 		});
	// 		it('should make Ajax call', () => {
	// 			expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
	// 		});
	// 		it('should have set the correct method', () => {
	// 			expect(args.method).toBe('PUT');
	// 		});
    //         it('should construct the correct url', () => {
	// 			expect(args.url).toContain('undefined/user/tandcs/abcd/2/accept');
	// 		});
	// 	});

	// });
});
