
'use strict';

jest.unmock('../../constants/PortalConstants');
jest.unmock('../PortalStore');

var PortalStore = require('../PortalStore');
var PortalConstants = require('../../constants/PortalConstants');
var AppDispatcher = require('../../dispatcher/AppDispatcher');;
var AccountOpeningApiUtils = require('../../utils/AccountOpeningApiUtils');

describe('PortalStore', () => {

	var callback;

	var handlePortalCasesSuccess = (data) => ({
		action: {
			actionType: PortalConstants.REQUEST_PORTAL_CASES_SUCCESS,
			data
		}
	});

	beforeEach(() => {
		callback = AppDispatcher.register.mock.calls[0][0];

	});

	describe('getAll', () => {
		let value;

		beforeEach(() => {
			var cases = [
			    {
			        "id": "CS-1002753",
			        "description": "YB Current Account Opening",
			        "status": "Account Opened",
			        "uri": "case://csap/ntb/CS-1002753",
			    },
			    {
			        "id": "CS-1002753",
			        "description": "YB Current Account Opening",
			        "status": "Account Opened",
			        "uri": "case://csap/ntb/CS-1002753",
			    },
			    {
			        "id": "CS-1002753",
			        "description": "YB Current Account Opening",
			        "status": "Account Opened",
			        "uri": "case://csap/ntb/CS-1002753",
			    },
			    {
			        "id": "MO-1002753",
			        "description": "YB Current Account Opening",
			        "status": "Account Opened",
			        "uri": "case://csap/ntb/CS-1002753",
			    },
			    {
			        "id": "CS-1002432435753",
			        "description": "YB Current Account Opening",
			        "status": "Account Opened",
			        "uri": "case://csap/ntb/CS-1002753",
			    },
			    {
			        "id": "MO-88888888",
			        "description": "NEWPURCHASE",
			        "status": "Interview",
			        "uri": "map:view:/case/MO-1001394",
			    }
			];

			callback(handlePortalCasesSuccess({
				cases
			}));

			value = PortalStore.getAll();

		});

		it('should group cases with code prefix', () => {
			expect(value['CS']).toBeDefined();
			expect(value['MO']).toBeDefined();
		});

		it('should group account opening with CS prefix', () => {
			expect(value['CS'].length).toBe(4);
		});

		it('should group account opening with MO prefix', () => {
			expect(value['MO'].length).toBe(2);
		});

	});

});
