
jest.unmock('../TextQuestion');
jest.unmock('../../mixins/InputMixin');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const TextQuestion = require('../TextQuestion');

const container = document.createElement('div');
const render = (comp) => ReactDOM.render(comp, container);

describe('TextQuestion', () => {

	let instance;
	const group = 'group';
	const name = 'name';

	beforeEach(() => {
		instance = TestUtils.renderIntoDocument(
			<TextQuestion
				name={name}
				group={group}
			/>
		);

	});

	describe('render', () => {

		it('should use default value when zero', () => {
			instance = TestUtils.renderIntoDocument(
				<TextQuestion
					name={name}
					group={group}
					defaultValue={0}
				/>
			);

			const value = ReactDOM.findDOMNode(instance.refs.textInput).value;

			expect(value).toBe('0');
		});
	});

	describe('when focusing', () => {
		let focusMock;

		beforeEach(() => {
			focusMock = jest.fn()

			ReactDOM.findDOMNode(instance.refs.textInput).focus = focusMock
			TestUtils.Simulate.focus(instance.refs.textInput);
			instance.refs.textInput.focus();
		});

		it('should focus the text input', () => {
			expect(focusMock.mock.calls.length).toBe(1);
		});
	});

	describe('when a value formatter is provider', () => {
		let formatter;
		beforeEach(() => {
			formatter = jest.fn();

			instance = TestUtils.renderIntoDocument(
				<TextQuestion
					name={name}
					group={group}
					valueFormatter={formatter}
				/>
			);

			TestUtils.Simulate.change(ReactDOM.findDOMNode(instance.refs.textInput), {target: {value: 'i am a teapot'}})
		});

		it('should format the value', () => {
			expect(formatter.mock.calls.length).toBeTruthy();
		})
	})
});
