jest.unmock('../PhoneNumber');
jest.unmock('../../../common/questionsets/ReadOnlyQuestion');
jest.unmock('../../../common/questionsets/TextQuestion');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const ReactDOM = require('react-dom');
const _ = require('lodash');

const container = document.createElement('div');
const render = (comp, el) => ReactDOM.render(comp, el || container);
const shallowRenderer = TestUtils.createRenderer();

const BrandUtils = require('../../../../utils/BrandUtils');
const {TextQuestion, ReadOnlyQuestion} = require('../../../common/questionsets');
const PhoneNumber = require('../PhoneNumber');

describe('PhoneNumber', () => {
	let result, component, instance;

	describe('WHEN editable', () => {
			beforeEach(() => {
				BrandUtils.isAbleToDisplay.mockReturnValue(true);
				component = (
					<PhoneNumber
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
					name: "phoneNumber",
					minLength: 11,
					maxLength: 11,
					onChange: () => {},
					validateType: 'phone',
					dataAnchor: 'mobile-number',
					required: true,
				}
				expect(result).toEqualJSX(
					<ReadOnlyQuestion readOnly="No" mask>
						<TextQuestion
							{...props}
							>
							{props.label}
						</TextQuestion>
					</ReadOnlyQuestion>
				);
			});

			it('should have a name', () => {
				expect(result.props.children.props.name).toEqual('phoneNumber');
			});

			it('should have a data-anchor', () => {
				expect(result.props.children.props.dataAnchor).toEqual('mobile-number');
			});

			it('should have a phone validation', () => {
				expect(result.props.children.props.validateType).toEqual('phone');
			});

			it('should have a min-length', () => {
				expect(result.props.children.props.minLength).toEqual(11);
			});

			it('should have a max-length', () => {
				expect(result.props.children.props.maxLength).toEqual(11);
			});


		describe('overrides', () => {

			beforeEach(() => {
				component = (
					<PhoneNumber
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
				expect(result.props.children.props.defaultValue).toEqual('default');
			});

			it('should have a name', () => {
				expect(result.props.children.props.name).toEqual('test-name');
			});

			it('should have a data-anchor', () => {
				expect(result.props.children.props.dataAnchor).toEqual('test-data-anchor');
			});

			it('should have a custom validation', () => {
				expect(result.props.children.props.validateType).toEqual('test-validation');
			});

			it('should have a required validation set to false', () => {
				expect(result.props.children.props.required).toBe(false);
			});

			it('should have a min-length', () => {
				expect(result.props.children.props.minLength).toEqual(4);
			});

			it('should have a max-length', () => {
				expect(result.props.children.props.maxLength).toEqual(432);
			});
		});
	});

	describe('WHEN is is NOT editable', () => {
		beforeEach(() => {
			component = (
				<PhoneNumber
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
				name: "phoneNumber",
				minLength: 11,
				maxLength: 11,
				onChange: () => {},
				validateType: 'phone',
				dataAnchor: 'mobile-number',
				required: true,
			}
			expect(result).toEqualJSX(
				<ReadOnlyQuestion readOnly="Yes" mask>
					<TextQuestion
						{...props}
						>
						{props.label}
					</TextQuestion>
				</ReadOnlyQuestion>
				);
		});

	});
});
