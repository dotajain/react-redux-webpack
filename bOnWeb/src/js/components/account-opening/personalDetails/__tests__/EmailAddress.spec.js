jest.unmock('../EmailAddress');
jest.unmock('../../../common/questionsets/ReadOnlyQuestion');
jest.unmock('../../../common/questionsets/TextQuestion');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const ReactDOM = require('react-dom');
const _ = require('lodash');

const container = document.createElement('div');
const render = (comp, el) => ReactDOM.render(comp, el || container);
const shallowRenderer = TestUtils.createRenderer();

const {TextQuestion, ReadOnlyQuestion} = require('../../../common/questionsets');
const EmailAddress = require('../EmailAddress');

describe('EmailAddress', () => {
	let result, component, instance;

	describe('WHEN editable', () => {
			beforeEach(() => {
				component = (
					<EmailAddress
						group={''}
						label={'test'} />
				);

				instance = render(component);
				shallowRenderer.render(component);

			});

			beforeEach(() => {
				result = shallowRenderer.getRenderOutput();
			});

			it('should NOT be readOnly', () => {
				let props = {
					readOnly: 'No',
					group: '',
					label: 'test',
					name: "emailAddress",
					minLength: 6,
					maxLength: 70,
					onChange: () => {},
					validateType: 'email',
					dataAnchor: 'email-address',
					required: true,
				};
				expect(result).toEqualJSX(
						<TextQuestion
							{...props}
							>
							{props.label}
						</TextQuestion>
				);
			});

			it('should have a name', () => {
				expect(result.props.name).toEqual('emailAddress');
			});

			it('should have a data-anchor', () => {
				expect(result.props.dataAnchor).toEqual('email-address');
			});

			it('should have a email validation', () => {
				expect(result.props.validateType).toEqual('email');
			});

			it('should have a min-length', () => {
				expect(result.props.minLength).toEqual(6);
			});

			it('should have a max-length', () => {
				expect(result.props.maxLength).toEqual(70);
			});


		describe('overrides', () => {

			beforeEach(() => {
				component = (
					<EmailAddress
						name={'test-name'}
						validateType={'test-validation'}
						dataAnchor={'test-data-anchor'}
						required={false}
						group={''}
						minLength={4}
						maxLength={432}
						defaultValue={'default'}
						label={'test'} />
				);

				instance = render(component);
				shallowRenderer.render(component);

			});

			beforeEach(() => {
				result = shallowRenderer.getRenderOutput();
			});

			it('should return the defaultValue if one is provided', () => {
				expect(result.props.defaultValue).toEqual('default');
			});

			it('should have a name', () => {
				expect(result.props.name).toEqual('test-name');
			});

			it('should have a data-anchor', () => {
				expect(result.props.dataAnchor).toEqual('test-data-anchor');
			});

			it('should have a custom validation', () => {
				expect(result.props.validateType).toEqual('test-validation');
			});

			it('should have a required validation set to false', () => {
				expect(result.props.required).toBe(false);
			});

			it('should have a min-length', () => {
				expect(result.props.minLength).toEqual(4);
			});

			it('should have a max-length', () => {
				expect(result.props.maxLength).toEqual(432);
			});
		});
	});

	describe('WHEN is is NOT editable', () => {
		beforeEach(() => {
			component = (
				<EmailAddress
					readOnly={'Yes'}
					group={''}
					defaultValue={'default'}
					label={'test'} />
			);

			instance = render(component);
			shallowRenderer.render(component);
			result = shallowRenderer.getRenderOutput();

		});

		it('should be readOnly', () => {
			let props = {
				readOnly: 'Yes',
				group: '',
				label: 'test',
				defaultValue: 'default',
				name: "emailAddress",
				minLength: 6,
				maxLength: 70,
				onChange: () => {},
				validateType: 'email',
				dataAnchor: 'email-address',
				required: true,
			};
			expect(result).toEqualJSX(
					<TextQuestion
						{...props}
						>
						{props.label}
					</TextQuestion>
				);
		});

	});
});
