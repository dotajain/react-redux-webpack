'use strict';

jest.unmock('../../constants/SessionConstants');
jest.unmock('../SessionStore');
jest.unmock('../../utils/GenericMapperUtils');

let SessionStore = require('../SessionStore');
let SessionConstants = require('../../constants/SessionConstants');
let AppDispatcher = require('../../dispatcher/AppDispatcher');;
let SessionApiUtils = require('../../utils/SessionApiUtils');
let AccountOpeningActions = require('../../actions/AccountOpeningActions');

describe('SessionStore', () => {
	let callback;
	let value;
	let getCurrentUserCallback;

	const handleGetCurrentUserSuccess = (data) => ({
		action: {
			actionType: SessionConstants.GET_CURRENT_USER,
			data
		}
	});

	beforeEach(() => {
		SessionStore = require('../SessionStore');
		SessionConstants = require('../../constants/SessionConstants');
		AppDispatcher = require('../../dispatcher/AppDispatcher');;
		SessionApiUtils = require('../../utils/SessionApiUtils');
		AccountOpeningActions = require('../../actions/AccountOpeningActions');

		callback = AppDispatcher.register.mock.calls[0][0];
		callback(handleGetCurrentUserSuccess());

		getCurrentUserCallback = SessionApiUtils.getCurrentUser.mock.calls[0][0];
	});

	describe('getCurrentUser', () => {

		it('should return when no response', () => {
			expect(getCurrentUserCallback()).toBe(false);
		});

		it('should only call API once when fetching or if we have data', () => {
			expect(SessionStore.getCurrentUser({}, true, false)).toBe(null);
			expect(SessionStore.getCurrentUser({}, false, true)).toBe(null);
		});

		describe('successful response', () => {

			beforeEach(() => {
				getCurrentUserCallback({
					'userName': '234987483',
					'contactDetails': {
						'phone': {
							'home': '01366887650',
							'mobile': '07896788566',
							'work': '01366887650'
						},
					}
				});

				value = SessionStore.getAll();
			});

			it('should call getCurrentUser from the API', () => {
				expect(SessionApiUtils.getCurrentUser.mock.calls.length).toBe(1);
			});

			it('should call send action to update the username', () => {
				expect(AccountOpeningActions.updateUserName.mock.calls.length).toBe(1);
			});

			it('should set flag that we have retrieved the user details', () => {
				expect(value.retrievedUser).toBe(true);
			});

			it('should set the user details', () => {
				expect(value.userName).toEqual('234987483');
			});
		});
	});

	describe('getOTPNumber', () => {
		it('should return null when empty', () => {
			expect(SessionStore.getOTPNumber()).toBe(null);
		});

		it('should return the mobile number if present', () => {
			expect(SessionStore.getOTPNumber({
				phone:{
					mobile: '07777777777',
				}
			})).toEqual('07777777777');
		});

		it('should return null if no mobile number if present', () => {
			expect(SessionStore.getOTPNumber({
				phone:{
					home: '07777777777',
				}
			})).toEqual(null);
		});


	});

	describe('getUserName', () => {
		it('should return null when empty', () => {
			expect(SessionStore.getUserName()).toBe(null);
		});
	});

});
