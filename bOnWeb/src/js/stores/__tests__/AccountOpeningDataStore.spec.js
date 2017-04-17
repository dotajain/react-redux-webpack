jest.unmock('../../constants/AccountOpeningConstants');
jest.unmock('../AccountOpeningDataStore');
jest.unmock('../../actions/AccountOpeningActions');

const _ = require('lodash');
const React = require('react');
const AccountOpeningDataStore = require('../AccountOpeningDataStore');
const AccountOpeningConstants = require('../../constants/AccountOpeningConstants');
const AccountOpeningActions = require('../../actions/AccountOpeningActions');
const AppDispatcher = require('../../dispatcher/AppDispatcher');
const AccountOpeningApiUtils = require('../../utils/AccountOpeningApiUtils');
const UserServicesApiUtils = require('../../utils/UserServicesApiUtils');
const ProductUtils = require('../../utils/ProductUtils');

describe('AccountOpeningDataStore', () => {

	let triggerActionCallback;

	function retrieveAndClear(dispatch) {
		const action = dispatch.mock.calls[0][0];
		dispatch.mockClear();
		return {action};
	}

	const clearAddress = (data) => {
		AccountOpeningActions.clearAddress(..._.values(data));
		return retrieveAndClear(AppDispatcher.handleViewAction);
	};

	const updateFormValue = (data) => {
		AccountOpeningActions.updateFormValue(..._.values(data));
		return retrieveAndClear(AppDispatcher.handleViewAction);
	};

	const updateUsername = (data) => {
		AccountOpeningActions.updateUserName(..._.values(data));
		return retrieveAndClear(AppDispatcher.handleViewAction);
	};

	const setBankId = (data) => {
		AccountOpeningActions.setBankId(..._.values(data));
		return retrieveAndClear(AppDispatcher.handleViewAction);
	}

	const receiveGetResult = (data) => {
		AccountOpeningActions.receiveGetResult(..._.values(data));
		return retrieveAndClear(AppDispatcher.handleViewAction);
	}

	const submitRegistrationPage = (data) => {
		AccountOpeningActions.submitRegistrationPage(..._.values(data));
		return retrieveAndClear(AppDispatcher.handleViewAction);
	}

	const respondToProductOffer = (data) => {
		AccountOpeningActions.respondToProductOffer(..._.values(data));
		return retrieveAndClear(AppDispatcher.handleViewAction);
	}

	beforeEach(function() {
		triggerActionCallback = AppDispatcher.register.mock.calls[0][0];
	});

	describe('WHEN removing an address', () => {
		let value;

		beforeEach(() => {

			triggerActionCallback(updateFormValue({
				key: 'id',
				value: 'first',
				arrayName: 'addresses',
				arrayIndex: 0,
			}));

			triggerActionCallback(updateFormValue({
				key: 'id',
				value: 'second',
				arrayName: 'addresses',
				arrayIndex: 1,
			}));

			triggerActionCallback(updateFormValue({
				key: 'id',
				value: 'third',
				arrayName: 'addresses',
				arrayIndex: 2,
			}));

			triggerActionCallback(updateFormValue({
				key: 'id',
				value: 'fourth',
				arrayName: 'addresses',
				arrayIndex: 2,
			}));

			triggerActionCallback(clearAddress({
				addressIndexes: [1,3]
			}));

			value = AccountOpeningDataStore.getValue('addresses');
		});

		it('should remove the address', () => {
			expect(value.length).toBe(2);
			expect(value[0].id).toBe('first');
			expect(value[1].id).toBe('fourth');
		});
	});

	describe('UPDATE_USERNAME', () => {
		let value;

		it('should update username WHEN we have a value', () => {
			triggerActionCallback(updateUsername({
				userName: 'testUsername',
			}));
			value = AccountOpeningDataStore.getValue('username');
			expect(value).toEqual('testUsername');
		});

		it('should NOT update username WHEN there is no value', () => {
			triggerActionCallback(updateUsername({
				userName: 'testUsername',
			}));
			value = AccountOpeningDataStore.getValue('username');
			expect(value).toEqual('testUsername');

			triggerActionCallback(updateUsername({
				userName: undefined,
			}));
			value = AccountOpeningDataStore.getValue('username');
			expect(value).toEqual('testUsername');
		});
	});

	describe('onSendFormDataCompleteWithBusinessError', () => {
		let data;
		let result;

		describe('AND the error is for a taken username', () => {
			beforeEach(() => {
				result = AccountOpeningDataStore.onSendFormDataCompleteWithBusinessError('1036');
				data = AccountOpeningDataStore.getAll();
			});

			it('should set that the username is taken', () => {
				expect(data.usernameAlreadyInUse).toBe(true);
			});

			it('should return true', () => {
				expect(result).toBe(true);
			});
		});

		describe('AND the error is for personal details found', () => {
			beforeEach(() => {
				result = AccountOpeningDataStore.onSendFormDataCompleteWithBusinessError('318');
				data = AccountOpeningDataStore.getAll();
			});

			it('should set that the the personal details have been found', () => {
				expect(data.personalDetailsFound).toBe(true);
			});

			it('should return true', () => {
				expect(result).toBe(true);
			});
		});

		describe('AND the error code is not recognised', () => {
			let origData;
			beforeEach(() => {
				origData = AccountOpeningDataStore.getAll();
				result = AccountOpeningDataStore.onSendFormDataCompleteWithBusinessError('1123');
				data = AccountOpeningDataStore.getAll();
			});

			it('should not change any data', () => {
				expect(origData).toEqual(data);
			});

			it('should return false', () => {
				expect(result).toBe(false);
			});
		})

	});

	describe('handleSendError', () => {

		describe('when handing an unhandled error and not completed', () => {
			beforeEach(() => {
				AccountOpeningDataStore.handleSendError('1234', false);
			});

			it('should redirect to error page', () => {
				const {action} = retrieveAndClear(AppDispatcher.handleViewAction);
				expect(action.data.taskId).toEqual('WEB-ERROR');
			})
		});

		describe('when handing an handled error and not completed', () => {
			beforeEach(() => {
				AccountOpeningDataStore.handleSendError('318', false);
			});

			it('should not redirect', () => {
				expect(AppDispatcher.handleViewAction.mock.calls.length).toBe(0);
			})
		});

		describe('when handing an handled error and is completed', () => {
			beforeEach(() => {
				AccountOpeningDataStore.handleSendError('318', true);
			});

			it('should rediect to review page', () => {
				const {action} = retrieveAndClear(AppDispatcher.handleViewAction);
				expect(action.data.taskId).toEqual('WEB-REVIEW-DETAILS');
			})
		});
	});

	describe('sendFormData', () => {
		describe('options', () => {
			let handleSendError;
			let options;
			let data;

			beforeEach(() => {
				data = {};

				AccountOpeningApiUtils.sendFormData.mockClear();
				handleSendError = AccountOpeningDataStore.handleSendError;
				AccountOpeningDataStore.handleSendError = jest.fn();
				AccountOpeningDataStore.sendFormData(data);
				options = AccountOpeningApiUtils.sendFormData.mock.calls[0][0];
			});

			afterEach(() => {
				AccountOpeningDataStore.handleSendError = handleSendError;
			});

			it('should delegate errorCallBack to handleSendError', () => {
				options.errorCallBack('123');
				expect(AccountOpeningDataStore.handleSendError.mock.calls.length).toBe(1);
			});
		});
	});

	describe('default values', () => {
		it('should opt out of all contact methods.', () => {
			const value = AccountOpeningDataStore.getValue('contactMethods');
			expect(value.length).toBe(0);
		});
	});

	describe('when setting bankId on store', () => {

		let bankId;
		let expectedBankId;

		beforeEach(() => {

			expectedBankId = 'CB';

			let mockFn = jest.fn();
			AccountOpeningDataStore.emitChange = mockFn;

			let action = setBankId({bankID: expectedBankId});
			triggerActionCallback(action);

			bankId = AccountOpeningDataStore.getAll().bankID;
		});

		it('should set bankId on store state', () => {
			expect(bankId).toEqual(expectedBankId);
		});

		it('should emit change on set bankId', () => {
			expect(AccountOpeningDataStore.emitChange.mock.calls.length).toBe(1);
		});
	});

	describe('when submitting the registration page', () => {
		const publicKey = 'TEST';
		const keyDatetime = '00000000';
		const nextWebTask = 'WEB-SUBMIT';

		beforeEach(() => {
			UserServicesApiUtils.submitSecurityQuestions.mockClear();
			const action = submitRegistrationPage({
				publicKey, keyDatetime, nextWebTask
			});
			triggerActionCallback(action);

		});

		it('should pass next web task to api utils', () => {
			const submitArgs = UserServicesApiUtils.submitSecurityQuestions.mock.calls[0];
			expect(submitArgs[1]).toBe(nextWebTask);
		});


	});

	describe('when receiving get data that has no product code', () => {
		let getAll;
		let navigateToWebTaskMockFn

		beforeEach(() => {
			let mockFn = jest.fn();

			navigateToWebTaskMockFn = jest.fn();
			AccountOpeningDataStore.emitChange = mockFn;
			AccountOpeningActions.navigateToWebTask = navigateToWebTaskMockFn;

			ProductUtils.getProduct.mockReturnValue({
				productType: {
					name: 'test',
				},
			});

			let result = {};

			let action = receiveGetResult({result});
			triggerActionCallback(action);

			getAll = AccountOpeningDataStore.getAll();
		});

		it('should not change the productCode', () => {
			expect(getAll.productCode).toEqual('');
		});

		it('should redirect users to an error page', () => {
			ProductUtils.getProduct.mockReturnValue({});

			let result = {};

			let action = receiveGetResult({result});
			triggerActionCallback(action);
			console.log(AccountOpeningActions.navigateToWebTask.mock.calls[1])
			expect(AccountOpeningActions.navigateToWebTask.mock.calls[0][0]).toBe('WEB-ERROR');
		});
	});

	describe('when receiving get data that has a product code and no product code is set', () => {
		let getAll;

		beforeEach(() => {
			let mockFn = jest.fn();
			AccountOpeningDataStore.emitChange = mockFn;

			ProductUtils.getProduct.mockReturnValue({
				productType: {
					name: 'test',
				},
			});

			let result = {
				products: { code: '1234' }
			};

			let action = receiveGetResult({result});
			triggerActionCallback(action);

			getAll = AccountOpeningDataStore.getAll();
		});

		it('should update the productCode', () => {
			expect(getAll.productCode).toEqual('IM1234');
		});
	});

	describe('when receiving get data that has a product code and a product code is already set', () => {
		let getAll;

		beforeEach(() => {
			let mockFn = jest.fn();
			AccountOpeningDataStore.emitChange = mockFn;

			triggerActionCallback(updateFormValue({
				key: 'productCode',
				value: 'IM987',
			}));

			ProductUtils.getProduct.mockReturnValue({
				productType: {
					name: 'test',
				},
			});

			let result = {
				products: { code: '1234' }
			};

			let action = receiveGetResult({result});
			triggerActionCallback(action);

			getAll = AccountOpeningDataStore.getAll();
		});

		it('should not update the productCode', () => {
			expect(getAll.productCode).not.toEqual('IM1234');
		});
	});

	describe('when responding to a product offer', () => {
		beforeEach(() => {
			triggerActionCallback(updateFormValue({
				key: 'caseId',
				value: 'caseId',
			}));
			AccountOpeningApiUtils.respondToProductOffer.mockClear();
			ProductUtils.getProduct.mockClear();

			let action = respondToProductOffer({
				offerId: 'OFFER-id',
				isDecline:false,
				offerProductCode: 'IM540',
			});
			triggerActionCallback(action);

			const getAll = AccountOpeningDataStore.getAll();
		});

		it('should use the offerProductCode for the global product data', () => {
			expect(ProductUtils.getProduct.mock.calls[0][0]).toEqual('IM540');
		});

		it('should use the offerProductCode for the global product data', () => {
			expect(AccountOpeningApiUtils.respondToProductOffer.mock.calls[0]).toEqual(['caseId', 'OFFER-id', false]);
		});
	});


});
