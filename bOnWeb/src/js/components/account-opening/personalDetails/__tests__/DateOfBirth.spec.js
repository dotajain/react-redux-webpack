jest.unmock('../DateOfBirth');
jest.unmock('../../../common/questionsets/ReadOnlyQuestion');
jest.unmock('../../../common/questionsets/DatePickerQuestion');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const ReactDOM = require('react-dom');
const _ = require('lodash');

const container = document.createElement('div');
const render = (comp, el) => ReactDOM.render(comp, el || container);
const shallowRenderer = TestUtils.createRenderer();

const {DatePickerQuestion, ReadOnlyQuestion} = require('../../../common/questionsets');
const ProductUtils = require('../../../../utils/ProductUtils');
const DateOfBirth = require('../DateOfBirth');

let data = {
	productCode: 'test'
};



describe('DateOfBirth', () => {
	let result, component, instance;

	beforeEach(() => {
		ProductUtils.getMinAge.mockReturnValue(1);
		ProductUtils.getMaxAge.mockReturnValue(10);
	});

	describe('WHEN editable', () => {
			beforeEach(() => {
				component = (
					<DateOfBirth
						group={''}
						label={'test'}
						data={data}
					 />
				);

				instance = render(component);
				shallowRenderer.render(component);

			});

			beforeEach(() => {
				result = shallowRenderer.getRenderOutput();
			});

			it('should NOT be readOnly', () => {
				let props = {
					data:{productCode: 'test'},
					readOnly: 'No',
					group: '',
					name: "dateOfBirth",
					validateMinAge: 1,
					validateMaxAge: 10,
					onChange: () => {},
					dataAnchor: 'date-of-birth',
					required: true,
					label: 'test',
				}
				expect(result).toEqualJSX(
					<ReadOnlyQuestion readOnly="No" mask>
						<DatePickerQuestion
								{...props}
							>
							test
						</DatePickerQuestion>
					</ReadOnlyQuestion>
				);
			});

			it('should have a name', () => {
				expect(result.props.children.props.name).toEqual('dateOfBirth');
			});

			it('should have a data-anchor', () => {
				expect(result.props.children.props.dataAnchor).toEqual('date-of-birth');
			});

		describe('overrides', () => {

			beforeEach(() => {
				component = (
					<DateOfBirth
						name={'test-name'}
						dataAnchor={'test-data-anchor'}
						required={false}
						group={''}
						defaultValue={'default'}
						label={'test'}
						data={data}
					 />
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

			it('should have a required validation set to false', () => {
				expect(result.props.children.props.required).toBe(false);
			});

			it('should have a valide min age', () => {
				expect(result.props.children.props.validateMinAge).toEqual(1);
			});

			it('should have a valide max age', () => {
				expect(result.props.children.props.validateMaxAge).toEqual(10);
			});

		});
	});

	describe('WHEN is is NOT editable', () => {
		beforeEach(() => {
			component = (
				<DateOfBirth
					readOnly={'Yes'}
					group={''}
					defaultValue={'default'}
					label={'test'}
					data={data}
				 />
			);

			instance = render(component);
			shallowRenderer.render(component);
			result = shallowRenderer.getRenderOutput();

		});

		it('should be readOnly', () => {
			let props = {
				data:{productCode: 'test'},
				readOnly: 'Yes',
				group: '',
				name: "dateOfBirth",
				validateMinAge: 1,
				validateMaxAge: 10,
				onChange: () => {},
				dataAnchor: 'date-of-birth',
				required: true,
				defaultValue: 'default',
				label: 'test',
			}
			expect(result).toEqualJSX(
				<ReadOnlyQuestion readOnly="Yes" mask>
					<DatePickerQuestion
							{...props}
						>
						test
					</DatePickerQuestion>
				</ReadOnlyQuestion>
				);
		});

	});
});
