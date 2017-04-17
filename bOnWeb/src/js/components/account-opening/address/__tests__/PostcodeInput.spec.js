
jest.unmock('../PostcodeInput');
jest.unmock('../../../common/mixins/InputMixin');

// React & Test Utils
const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

// Components
const PostcodeInput = require('../PostcodeInput');

// Local vars
const postcodeInputClassName = 'postcode-input';
const postcodeInputButtonClassName = 'btn-postcode-input';
const postcodeToInput = 'sw152ds';
const postcodeToInputAsUpperCase = 'SW152DS';
const postcodeToInputWithSpace = 'SW15 2DS';

describe('PostcodeInput test', function() {
	let instance;
	const addressId = 1;
	const isCountryDomestic = true;
	let postcodeInputElement;
	let postcodeInputButtonElement;
	let onChange = jest.fn();
	const onSearch = jest.fn();

	beforeEach(() => {
		instance = TestUtils.renderIntoDocument(
			<PostcodeInput
				name={`address_${addressId}_postcode`}
				section={`address-section${addressId}`}
				group={'ANYGROUP'}
				addressId={addressId}
				onManualAddressClick={jest.fn().mockReturnThis()}
				validateType="postcode"
				onChange={onChange}
				onSearch={onSearch}
				content={{}}
			/>
		);

		postcodeInputElement = TestUtils.findRenderedDOMComponentWithClass(instance, postcodeInputClassName);
		postcodeInputButtonElement = TestUtils.findRenderedDOMComponentWithClass(instance, postcodeInputButtonClassName);
	});

	describe('when first rendered', () => {
		it('should render a postcode input field', function() {
			expect(ReactDOM.findDOMNode(postcodeInputElement).className).toContain(postcodeInputClassName);
		});

		it('should render a postcode input button', function() {
			expect(ReactDOM.findDOMNode(postcodeInputButtonElement).className).toContain(postcodeInputClassName);
		});
	});

	describe('when text is entered', () => {
		beforeEach(() => {
			TestUtils.Simulate.change(postcodeInputElement, {target: {value: postcodeToInput}});
		});

		it('should capitalize the postcode during input', function() {
			expect(ReactDOM.findDOMNode(postcodeInputElement).value).toEqual(postcodeToInputAsUpperCase);
		});

		describe('and focus is removed', () => {
			beforeEach(() => {
				TestUtils.Simulate.blur(postcodeInputElement, {});
			});

			it('should add a space to the postcode after input', function() {
				expect(ReactDOM.findDOMNode(postcodeInputElement).value).toEqual(postcodeToInputWithSpace);
			});

			it('should fire onChange', () => {
				expect(onChange.mock.calls.length).toBe(2);
			});

			describe('when focus is returned', () => {
				beforeEach(() => {
					onChange = jest.fn();
					TestUtils.Simulate.focus(postcodeInputElement, {});
				});

				it('should not fire onChange', () => {
					expect(onChange.mock.calls.length).toBe(0);
				});
			});

			describe('when the search is executed', () => {
				beforeEach(() => {
					onChange = jest.fn();

					const btn = TestUtils.findRenderedDOMComponentWithClass(instance, 'btn');
					TestUtils.Simulate.click(btn, {});
				});

				it('should fire onSearch', () => {
					expect(onSearch.mock.calls.length).toBe(0);
				});
			});
		});
	});
});
