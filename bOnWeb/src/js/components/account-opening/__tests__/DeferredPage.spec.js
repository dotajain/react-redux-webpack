
jest.unmock('../DeferredPage');
jest.unmock('../../common/sections/ResultSection');
jest.unmock('../../common/ComponentHeader');

// React
const React = require('react');

// React Addons
const TestUtils = require('react-addons-test-utils');

// Component
const DeferredPage = require('../DeferredPage');

// Lodash
const _ = require('lodash');

describe('Deferred Page', function() {

	const content = {
	};

	const data = {
		productCode: 'IM800'
	};

	// Render an instance of the component
	let instance;
	function renderComponent() {
		instance = TestUtils.renderIntoDocument(
			<DeferredPage
				data={data}
				content={content} />
		);
	}

	it ('renders with no deferred items', function() {
		renderComponent();
		const li = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li');
		expect(li.length).toBe(0);
	});

});
