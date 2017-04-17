
jest.unmock('../ListSection');


// React
const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

const ListSection = require('../ListSection');

describe('ListSection', function() {

	let instance;
	beforeEach(() => {
		instance = TestUtils.renderIntoDocument(
			<ListSection />
		);
	});

	describe('getSection', () => {

		describe('WHEN a title is set', () => {
			it('renders one title', () => {
				instance = TestUtils.renderIntoDocument(
					<ListSection items={['test1', 'test2']} title={'testing'}/>
				);

				const header = TestUtils.findRenderedDOMComponentWithTag(instance, 'h3');

				expect(ReactDOM.findDOMNode(header).textContent).toEqual('testing');
			});
		});

		describe('WHEN a title is NOT set', () => {
			it('doesn\'t renders a title', () => {
				instance = TestUtils.renderIntoDocument(
					<ListSection items={['test1', 'test2']} />
				);
				const header = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'h3');

				expect(header.length).toBe(0);
			});
		});

		describe('WHEN items are set', () => {
			it('renders unordered list', () => {
				instance = TestUtils.renderIntoDocument(
					<ListSection items={['test1', 'test2']} title={'testing'}/>
				);

				const listItems = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li');

				expect(listItems.length).toBe(2);
				expect(ReactDOM.findDOMNode(listItems[0]).textContent).toEqual('test1');
				expect(ReactDOM.findDOMNode(listItems[1]).textContent).toEqual('test2');
			});
		});

		describe('WHEN there are no items in the array', () => {
			it('renders nothing', () => {
				expect(instance.render()).toBe(null);
			});
		});

	});

});
