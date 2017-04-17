
jest.unmock('../MultiSelectQuestion');
jest.unmock('../../../common/mixins/InputMixin');
jest.unmock('object-assign');

const React = require('react');
const TestUtils = require('react-addons-test-utils');

const MultiSelectQuestion = require('../MultiSelectQuestion');

describe('MultiSelectQuestion', function() {

	describe('getItems', function() {

		const renderWithData = function(data) {
			return TestUtils.renderIntoDocument(
				<MultiSelectQuestion name="test" labelText="testlabel" data={data} onItemSelected={function() {}} />
			);
		};

		it('returns an array of elements for each data item passed', function() {
			const item1 = {
				index: 1,
				value: 100,
				text: 'One'
			};

			const item2 = {
				index: 2,
				value: 200,
				text: 'Two'
			};

			const instance = renderWithData([item1, item2]);
			expect(instance.getItems().length).toBe(2);
		});

		it('returns an empty array if no data has been passed', function() {
			const instance = renderWithData([]);
			expect(instance.getItems().length).toBe(0);
		});
	});
});
