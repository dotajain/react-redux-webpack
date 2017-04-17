
jest.unmock('../ComponentHeader');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const ComponentHeader = require('../ComponentHeader');

describe('ComponentHeader Component Tests', () => {
	let instance;

	describe('WHEN no subtitle is set', () => {
		const subtitleClass = 'component-header-subtitle';

		beforeEach(() => {
			instance =  TestUtils.renderIntoDocument(
				<ComponentHeader title='Hello World' />
			);
		});

		it('should not render a subtitle', () => {
			expect(TestUtils.scryRenderedDOMComponentsWithClass(instance, subtitleClass).length).toBeFalsy();
		});
	});
});
