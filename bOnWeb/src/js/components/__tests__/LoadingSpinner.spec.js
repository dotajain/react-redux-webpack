/**
 * @test LoadingSpinner
 */

jest.unmock('../LoadingSpinner');
jest.unmock('classnames');


const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

const LoadingSpinner = require('../LoadingSpinner');
const renderer = (props) => {
	const instance = ReactDOM.render(
		<LoadingSpinner {...props} />, document.createElement('div')
	);
	wrapper = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
	image = TestUtils.findRenderedDOMComponentWithTag(instance, 'img');
};

let wrapper;
let image;
describe('LoadingSpinner', () => {

	it('renders a default loader', () => {
		renderer();

		expect(wrapper.className).toBe('loading-spinner');
		expect(image.className).toBe('spin');
		expect(image.getAttribute('alt')).toBe('Loading');
		expect(image.getAttribute('title')).toBe('Loading');
		expect(image.getAttribute('height')).toBe('80px');
		expect(image.getAttribute('width')).toBe('80px');
	});

	it('centers the loader', () => {
		renderer({
			centerAlign: true
		});

		expect(wrapper.className).toBe('loading-spinner text-center');
	});

	it('applys a backdrop colour to loader', () => {
		renderer({
			backdrop: true
		});

		expect(wrapper.className).toBe('loading-spinner backdrop');
	});

	it('applys a custom sizes to loader', () => {
		renderer({
			imgSize: 20
		});

		expect(image.getAttribute('height')).toBe('20px');
		expect(image.getAttribute('width')).toBe('20px');
	});
});
