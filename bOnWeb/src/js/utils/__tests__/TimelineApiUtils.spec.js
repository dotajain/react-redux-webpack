'use strict';
jest.unmock('../TimelineApiUtils');
jest.unmock('../../../static/config');
jest.unmock('../../config');
const TimelineApiUtils = require('../TimelineApiUtils');
const envConfig = require('../../../static/config');
const ApiUtils = require('../ApiUtils');
const TimelineActionCreator = require('../../actions/TimelineActionCreator');
describe('Timeline Api Utils Test cases',()=> {
	beforeEach(() => {
		ApiUtils.makeAjaxCall.mockClear();
	});
	describe('getTransactionList',() => {
		beforeEach(() => {
			TimelineApiUtils.getTransactionsList();
		});
		describe('Request Arguments of getTransactionList',() => {
			let args = '';
			beforeEach(() => {
				args = ApiUtils.makeAjaxCall.mock.calls[0][0];
			});
			it('should make Ajax call', () => {
				expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
			});
			it ('should have set the correct method', () => {
				expect(args.method).toBe('POST');
			});
			it ('should construct the correct url', () => {
				expect(args.url).toContain('/banks/{bank-id}/accounts/default/transactions/searches/matchAll');
			});
		});
		describe('it was success', () => {
			let success;
			beforeEach(() => {
				TimelineActionCreator.handleTransactionSuccess.mockClear();
				success = ApiUtils.makeAjaxCall.mock.calls[0][1];
				success({
					hits : {
						hits: []
					}
				});
			});
			it('should make action call', () => {
				expect(TimelineActionCreator.handleTransactionSuccess.mock.calls[0][0]).toBeDefined();
			});
		});
		describe('it has error', () => {
			let failure;
			beforeEach(() => {
				TimelineActionCreator.handleTransactionError.mockClear();
				failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
				failure({
					error : "Something went wrong"
				});
			});
			it('should make action call', () => {
				expect(TimelineActionCreator.handleTransactionError.mock.calls[0][0]).toBeDefined();
			});
		});
	});
	describe('getTransactionsSearchSuggestion',() => {
		let searchText = '';
		beforeEach(() => {
			searchText = 'atm';
			TimelineApiUtils.getTransactionsSearchSuggestion(searchText);
		});
		describe('Request Arguments of getTransactionsSearchSuggestion',() => {
			let args = '';
			beforeEach(() => {
				args = ApiUtils.makeAjaxCall.mock.calls[0][0];
			});
			it('should make Ajax call', () => {
				expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
			});
			it ('should have set the correct method', () => {
				expect(args.method).toBe('POST');
			});
			it ('should construct the correct url', () => {
				expect(args.url).toContain('/banks/{bank-id}/accounts/default/transactions/searches/suggest');
			});
		});
		describe('it was success', () => {
			let success;
			beforeEach(() => {
				TimelineActionCreator.handleTransactionSearchSuggestionSuccess.mockClear();
				success = ApiUtils.makeAjaxCall.mock.calls[0][1];
				success({
					hits : {
						hits: []
					}
				});
			});
			it('should make action call', () => {
				expect(TimelineActionCreator.handleTransactionSearchSuggestionSuccess.mock.calls[0][0]).toBeDefined();
			});
		});
		describe('it has error', () => {
			let failure;
			beforeEach(() => {
				TimelineActionCreator.handleTransactionError.mockClear();
				failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
				failure({
					error : "Something went wrong"
				});
			});
			it('should make action call', () => {
				expect(TimelineActionCreator.handleTransactionError.mock.calls[0][0]).toBeDefined();
			});
		});
	});
	describe('getTransactionSearchData',() => {
		let searchText = '';
		beforeEach(() => {
			searchText = 'atm';
			TimelineApiUtils.getTransactionSearchData(searchText);
		});
		describe('Request Arguments of getTransactionSearchData',() => {
			let args = '';
			beforeEach(() => {
				args = ApiUtils.makeAjaxCall.mock.calls[0][0];
			});
			it('should make Ajax call', () => {
				expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(1);
			});
			it ('should have set the correct method', () => {
				expect(args.method).toBe('POST');
			});
			it ('should construct the correct url', () => {
				expect(args.url).toContain('/banks/{bank-id}/accounts/default/transactions/searches/matchText');
			});
		});
		describe('it was success', () => {
			let success;
			beforeEach(() => {
				TimelineActionCreator.handleTransactionSuccess.mockClear();
				success = ApiUtils.makeAjaxCall.mock.calls[0][1];
				success({
					hits : {
						hits: []
					}
				});
			});
			it('should make action call', () => {
				expect(TimelineActionCreator.handleTransactionSuccess.mock.calls[0][0]).toBeDefined();
			});
		});
		/**To be uncommented after error handling
		describe('it has error', () => {
			let failure;
			beforeEach(() => {
				TimelineActionCreator.handleTransactionError.mockClear();
				failure = ApiUtils.makeAjaxCall.mock.calls[0][2];
				failure({
					error : "Something went wrong"
				});
			});
			it('should make action call', () => {
				expect(TimelineActionCreator.handleTransactionError.mock.calls[0][0]).toBeDefined();
			});
		});*/
	});
});

