
jest.unmock('../Dropdown');
jest.unmock('../../mixins/InputMixin');
jest.unmock('../../../../utils/BrandUtils');

// React
const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

// Component
const Dropdown = require('../Dropdown');
const _ = require('lodash');
// Components
const InputMixin = require('../../mixins/InputMixin');

// Utils
const BrandUtils = require('../../../../utils/BrandUtils');

const container = document.createElement('div');
const render = (comp, el) => ReactDOM.render(comp, el || container);

describe('Dropdown', () => {
	let instance;

	const data = [
				{value: 'FULL TIME', label: 'Full Time!'},
				{value: 'PART TIME', label: 'PART Time'},
				{value: undefined, label: 'undefined Time'},
				{value: 'No LabeL', label: ''},
			];

	let component;
	let result;

	const value = 'full time';
	let newValue;
	const onChange = (value) => newValue = value;

	beforeEach(() => {
		component = (<Dropdown
			options={data}
			name="test"
			value={value}
			dataAnchor="dataAnchor"
			onChange={onChange}
		/>);

		const shallowRenderer = TestUtils.createRenderer();
		shallowRenderer.render(component);
		result = shallowRenderer.getRenderOutput();
	});

	it('should render a select', () => {
		expect(result.type).toBe('select');
	});

	it('should render the correct children', () => {
		expect(result.props.children)
			.toEqual([<option value="" disabled>Select...</option>,
					[
						<option key="option-0" value="FULL TIME">Full Time!</option>,
						<option key="option-1" value="PART TIME">PART Time</option>,
						<option key="option-2" value="">undefined Time</option>,
						<option key="option-3" value="NO LABEL">No LabeL</option>
					]]);
	});

	it('should return correct value for inputted value', () => {
		TestUtils.Simulate.change(ReactDOM.findDOMNode(render(component)), { target: {value: 'FULL TIME'}});
		expect(newValue).toBe(value);
	});

	it('should return correct value for alternative value', () => {
		TestUtils.Simulate.change(ReactDOM.findDOMNode(render(component)), { target: {value: 'PART TIME'}});
		expect(newValue).toBe('PART TIME');
	});

	it('should return correct value for no value', () => {
		TestUtils.Simulate.change(ReactDOM.findDOMNode(render(component)), { target: {value: ''}});
		expect(newValue).toBe('');
	});

	it('should return correct value for No LabeL', () => {
		TestUtils.Simulate.change(ReactDOM.findDOMNode(render(component)), { target: {value: 'No LabeL'}});
		expect(newValue).toBe('No LabeL');
	});

	describe('isValueDifferent', () => {
		beforeEach(() => {
			instance = render(<Dropdown
				options={data}
				name="test"
				value={value}
				dataAnchor="dataAnchor"
				onChange={onChange}
			/>);
		});

		it('should be false if null or undefined', () => {
			expect(instance.isValueDifferent({
				value: undefined
			})).toBe(true);

			expect(instance.isValueDifferent({
				value: null
			})).toBe(true);
		});

		it('should be true if value is different', () => {
			expect(instance.isValueDifferent({
				value: 'blah'
			})).toBe(true);
		});

		it('should be false if value is the same', () => {
			expect(instance.isValueDifferent({
				value: value
			})).toBe(false);
		});
	});

	describe('areOptionsDifferent', () => {
		beforeEach(() => {
			instance = render(<Dropdown
				options={data}
				name="test"
				value={value}
				dataAnchor="dataAnchor"
				onChange={onChange}
			/>);
		});

		it('should be true if options are different', () => {
			expect(instance.areOptionsDifferent({
				options: data.slice(1)
			})).toBe(true);
		});

		it('should be false if options are the same', () => {
			expect(instance.areOptionsDifferent({
				options: data
			})).toBe(false);
		});
	});
});

