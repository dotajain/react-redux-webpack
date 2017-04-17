
jest.unmock('../RadioQuestion');
jest.unmock('../../../common/mixins/InputMixin');

const React = require('react');
const TestUtils = require('react-addons-test-utils');

const RadioQuestion = require('../RadioQuestion');

describe('RadioQuestion', function() {

	const componentName = 'test';
	const componentText = 'This is a test';

	it('Should have a default lg column width', function() {
		// Render a instance with label in the document
		const instance = TestUtils.renderIntoDocument(
			<RadioQuestion name={componentName} group="test" options={[]}>{componentText}</RadioQuestion>
		);

		const columnElement = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'col-xs-12');
		expect(columnElement.length).toEqual(2);
	})

	it('Should accept a different lg column width', function() {
		const columnSize = 9;
		const overriddenColumnSizeClassname = `col-lg-${columnSize}`;

		const localInstance = TestUtils.renderIntoDocument(
			<RadioQuestion name={componentName} mainColumnSize={columnSize} group="test" options={[]}>{componentText}</RadioQuestion>
		);

		const columnElement = TestUtils.scryRenderedDOMComponentsWithClass(localInstance, overriddenColumnSizeClassname);

		expect(columnElement.length).toEqual(1);
	});

});
