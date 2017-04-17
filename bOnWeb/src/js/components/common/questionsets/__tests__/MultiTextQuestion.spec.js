
jest.unmock('../MultiTextQuestion');
jest.unmock('react-bootstrap-datetimepicker');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const MultiTextQuestion = require('../MultiTextQuestion');
const TextQuestion = require('../TextQuestion');

const container = document.createElement('div');
const render = (comp) => ReactDOM.render(comp, container);

describe('MultiTextQuestion.AutoTab', () => {

	let instance;
	const group = 'group';
	const name = 'name';
	const firstTextbox = `${name}-0`;
	const secondTextbox = `${name}-1`;
	const data = [1, 2];
	beforeEach(() => {


		instance = render(
			<MultiTextQuestion
				name={name}
				group={group}
				data={data}
				inputsMaxLength={1}
			/>
		);

		instance.refs = {
				'name-1': {
					focus: jest.fn()
				}
			}
	});

	it('should set the correct name', () => {
		expect(TextQuestion.mock.calls[0][0].name).toBe('name-0');
	});

	it('should set the correct id', () => {
		expect(TextQuestion.mock.calls[0][0].id).toBe('name-0');
	});

	describe('when auto tab is disabled', () => {
		beforeEach(() => {
			instance = render(
				<MultiTextQuestion
					name={name}
					group={group}
					data={data}
					inputsMaxLength={1}
					autoTab={false}
				/>
			);

			instance.onChange(firstTextbox, 'abc')
		});

		it('should not auto tab when changed', () => {
			expect(instance.refs[secondTextbox].focus.mock.calls.length).toBe(0);
		});

	});

	describe('when auto tab is enabled', () => {
		beforeEach(() => {
			instance = render(
				<MultiTextQuestion
					name={name}
					group={group}
					data={data}
					inputsMaxLength={1}
					autoTab={true}
				/>
			);

			instance.onChange(firstTextbox, 'a')
		});

		it('should not auto tab when changed', () => {
			expect(instance.refs[secondTextbox].focus.mock.calls.length).toBe(1);
		});
	});

	describe('when a textbox blurs', () => {
		let validated;

		beforeEach(() => {
			TextQuestion.mock.calls[0][0].onBlur('name', 'value', () => validated = true);
		});

		it('should validate', () => {
			expect(validated).toBe(true);
		});
	});
});
