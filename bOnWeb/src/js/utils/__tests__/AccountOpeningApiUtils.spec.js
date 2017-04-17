
jest.unmock('../AccountOpeningApiUtils');
jest.unmock('../../api/RequestOptionsBuilder');
jest.unmock('../ProductUtils');
jest.unmock('../../config');
jest.unmock('../../config/ProductData');
jest.unmock('../../config/BrandConfig');
jest.unmock('lodash');

var React = require('react');
var TestUtils = require('react-addons-test-utils');

var _ = require('lodash');

// SUT
var AccountOpeningApiUtils = require('../AccountOpeningApiUtils');
var AccountOpeningActions = require('../../actions/AccountOpeningActions');
var CallValidate3DServerActionCreator = require('../../actions/CallValidate3DServerActionCreator');

// Mocks
var ApiUtils = require('../ApiUtils');

describe('AccountOpeningApiUtils', () => {
	let baseOptions = {
		store: {
			getValue: () => 0
		},
		errorCallback: jest.fn(),
		product: {
			productType: {
				urlPart: 'current',
			},
		}
	};

	beforeEach(() => {
		ApiUtils.makeAjaxCall.mockClear();
		AccountOpeningActions.navigateToWebTask.mockClear();
		CallValidate3DServerActionCreator.handleCallValidate3DQuestionsSuccess.mockClear();
	});

	describe('when sending form data for a new case', function() {
		let args;
		let calledErrorCallBack;

		let newOptions = _.assign({}, baseOptions, {
			callback: jest.fn(),
			errorCallBack: () => calledErrorCallBack = true
		});

		beforeEach(() => {
			AccountOpeningApiUtils.sendFormData(newOptions, {}, false);
			args = ApiUtils.makeAjaxCall.mock.calls[0][0]
		});

		it('should set the correct method', () => {
			expect(args.method).toBe('POST');
		});

		it('should contruct the url corrected', () => {
			expect(args.url)
				.toContain('/banks/{bank-id}/cases/csap/current/{case-subtype}');
		});

		describe('and it was a success', () => {
			let success;

			beforeEach(() => {
				success = ApiUtils.makeAjaxCall.mock.calls[0][1]

				success({
					'reference_id': 1234
				});
			});

			it('should execute the callback', () => {
				expect(newOptions.callback.mock.calls.length).toBeTruthy();
			});
		});

		describe('and it was a failure and the status is not 409', () => {
			let failure;

			beforeEach(() => {
				failure = ApiUtils.makeAjaxCall.mock.calls[0][2];

				failure({
					'reference_id': 1234
				});
			});

			it('should not execute the errorCallback', () => {
				expect(newOptions.errorCallback.mock.calls.length).not.toBeTruthy();
			});

			it('should move to an error', () => {
				expect(AccountOpeningActions.navigateToWebTask.mock.calls[0][0])
					.toBe('WEB-ERROR');
			})
		});

		describe('and it was a failure and the status is 409', () => {
			let failure;

			beforeEach(() => {
				failure = ApiUtils.makeAjaxCall.mock.calls[0][2];

				failure({
					error: {
						code: 409,
					}
				}, 409);
			});

			it('should execute the errorCallback', () => {
				expect(calledErrorCallBack).toBeTruthy();
			});
		});
	});

	describe('when sending form data for an existing case', function() {
		let args;
		let newOptions = _.assign({}, baseOptions, {
					store: {
						getValue: () => 1234
					},
					formComplete: true,
					caseId: 1234,
				});

		beforeEach(() => {
			AccountOpeningApiUtils.sendFormData(newOptions, {}, true);

			args = ApiUtils.makeAjaxCall.mock.calls[0][0]
		});

		it('should set the correct method', () => {
			expect(args.method).toBe('PUT');
		});

		it('should contruct the url corrected', () => {
			expect(args.url)
				.toContain('/banks/{bank-id}/cases/csap/current/{case-subtype}/1234/tasks/capture/actions/update');
		});

		describe('when it was a success', () => {
			let success;

			beforeEach(() => {
				success = ApiUtils.makeAjaxCall.mock.calls[0][1];

				success({
					'reference_id': 1234
				});
			});

			it('should execute the callback', () => {
				// HERE BE DRAGONS - RWAR
				// Not completely happy with this assertion as
				// it's assuming too much internal knowledge
				// of a method we are not currently testing,
				// Currently a pretty brittle tests :'(
				expect(ApiUtils.makeAjaxCall.mock.calls.length).toBe(2);
			});

			it('should set the case id', () => {
				// HERE BE DRAGONS - RWAR
				// See previous test
				expect(ApiUtils.makeAjaxCall.mock.calls[1][0].url)
					.toMatch('1234');
			});
		});
	});

	describe('when posting form data', function() {
		let args;
		let newOptions = _.assign({}, baseOptions, {
					caseId: 123,
					callback: jest.fn()
				});

		beforeEach(() => {
			AccountOpeningApiUtils.postFormSubmit(newOptions);

			args = ApiUtils.makeAjaxCall.mock.calls[0][0]
		});

		it('should contruct the url corrected', () => {
			expect(args.url)
				.toContain('/banks/{bank-id}/cases/csap/current/{case-subtype}/123/tasks/capture/actions/submit');
		});

		describe('and it was a success', () => {
			beforeEach(() => {
				ApiUtils.makeAjaxCall.mock.calls[0][1]({

				});
			});

			it('it should execute the callback', () => {
				expect(newOptions.callback.mock.calls.length).toBeTruthy();
			})
		})
	});

	describe('getChallenges', function() {
		let resp;

		describe('and it was a success', () => {
			it('if there are challenge questions', () => {
				resp = {
					challenges: [{}, {}, {}]
				}
				AccountOpeningApiUtils.getChallenges();
				ApiUtils.makeAjaxCall.mock.calls[0][1](resp);
				expect(CallValidate3DServerActionCreator.handleCallValidate3DQuestionsSuccess.mock.calls[0][0]).toEqual(resp);
			});
		});

		describe('when there is an error', () => {

			it('it loads the referral page if the user did not have enough questions', () => {
				resp = {
					error: {
						code: '1000'
					}
				};
				AccountOpeningApiUtils.getChallenges();
				ApiUtils.makeAjaxCall.mock.calls[0][2](resp);

				expect(AccountOpeningActions.navigateToWebTask.mock.calls[0][0]).toBe('idcheckcannotbedone');
			});

			it('it loads the generic error page otherwise', () => {
				resp = {};
				AccountOpeningApiUtils.getChallenges();
				ApiUtils.makeAjaxCall.mock.calls[0][2](resp);

				expect(AccountOpeningActions.navigateToWebTask.mock.calls[0][0]).toBe('WEB-ERROR');
			});
		});
	});

});
