
jest.unmock('../SideBarContactBox');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const SideBarContactBox = require('../SideBarContactBox');

describe('SideBarContactBox Component Tests', function() {
	it('Renders with no subtitle', function() {
		// Render the component
		const SideBar = TestUtils.renderIntoDocument(
			<SideBarContactBox appData={{}} content={{}} />
		);
		expect(SideBar).toBeDefined();
	});
});
