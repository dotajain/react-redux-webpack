jest.unmock('../NewWindowLink');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const ReactDOM = require('react-dom');

const container = document.createElement('div');
const render = (comp, el) => ReactDOM.render(comp, el || container);
const shallowRenderer = TestUtils.createRenderer();

const NewWindowLink = require('../NewWindowLink');

const content = {
	testTitle: 'testTitle',
	testUrl: 'http://test.com',
	newBrowserWindowTitle: "newBrowserWindowTitle",
}

describe('NewWindowLink', () => {
	let result, component, instance;

	beforeEach(() => {
		component = (
			<NewWindowLink
				text={content.testTitle}
				href={content.testUrl}
				content={content} />
		);

		instance = render(component);
		shallowRenderer.render(component);
		result = shallowRenderer.getRenderOutput();

	});

	it('should have a href', () => {
		expect(result.props.href).toEqual('http://test.com',);
	});

	it('should have content', () => {
		expect(result.props.children[0]).toEqual('testTitle');
	});

	it('should have a title', () => {
		expect(result.props.title).toEqual('testTitle');
	});

	it('should have a target', () => {
		expect(result.props.target).toEqual('_blank');
	});

	it('should have a aria-label matching the title', () => {
		expect(result.props['aria-label']).toEqual('testTitle');
	});

	it('should have a screenreader content', () => {
		expect(result.props.children[1].props.className).toEqual('screenreader');
		expect(result.props.children[1].props.children).toEqual('newBrowserWindowTitle');
	});


});