/**
 * @test PortalPage
 */
jest.unmock('../PortalPage');
jest.unmock('../../common/ComponentHeader');
jest.unmock('../../common/PageColumnWrapper');
jest.unmock('../../common/SectionFullWidth');


const React = require('react');
const TestUtils = require('react-addons-test-utils');

var config = require('../../../config');
var PortalPage = require('../PortalPage');
var CaseItem = require('./../portal/CaseItem');
var PortalStore = require('../../../stores/PortalStore');

var cases = {
	"CS": [{
		"id": "CS-1002753",
		"description": "YB Current Account Opening",
		"status": "Account Opened",
		"uri": "case://csap/ntb/CS-1002753"
	}, {
		"id": "CS-1002753",
		"description": "YB Current Account Opening",
		"status": "Account Opened",
		"uri": "case://csap/ntb/CS-1002753"
	}, {
		"id": "CS-1002753",
		"description": "YB Current Account Opening",
		"status": "Account Opened",
		"uri": "case://csap/ntb/CS-1002753"
	}, {
		"id": "CS-1002432435753",
		"description": "YB Current Account Opening",
		"status": "Account Opened",
		"uri": "case://csap/ntb/CS-1002753"
	}],
	"MO": [{
		"id": "MO-1002753",
		"description": "YB Current Account Opening",
		"status": "Account Opened",
		"uri": "case://csap/ntb/CS-1002753"
	}, {
		"id": "MO-88888888",
		"description": "NEWPURCHASE",
		"status": "Interview",
		"uri": "map:view:/case/MO-1001394"
	}],
	"SA": [{
		"id": "SA-1002753",
		"description": "YB Current Account Opening",
		"status": "Account Opened",
		"uri": "case://csap/ntb/SA-1002753"
	}, {
		"id": "SA-88888888",
		"description": "NEWPURCHASE",
		"status": "Interview",
		"uri": "map:view:/case/SA-1001394"
	}]
};

PortalStore.getAll.mockReturnValue(cases)

describe('PortalPage', () => {

	let instance;

	let data = {};
	let content = {};

	beforeEach(() => {
		instance = TestUtils.renderIntoDocument(
			<PortalPage
				data={data}
				validations={{}}
				content={{}}
				session={{}}
			/>
		);
	});

	describe('getCaseItems', () => {

		it('should filter case types', () => {
			expect(instance.getCaseItems().length).toBe(6);
		});

	});
});
