jest.unmock('../FirstName');
jest.unmock('../../../common/questionsets/ReadOnlyQuestion');
jest.unmock('../../../common/questionsets/TextQuestion');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const ReactDOM = require('react-dom');
const _ = require('lodash');

const container = document.createElement('div');
const render = (comp, el) => ReactDOM.render(comp, el || container);
const shallowRenderer = TestUtils.createRenderer();

const AccountOpeningActions = require('../../../../actions/AccountOpeningActions');
const AnalyticsActionCreator = require('../../../../actions/AnalyticsActionCreator');

const {TextQuestion, ReadOnlyQuestion} = require('../../../common/questionsets');
const FirstName = require('../FirstName');

describe('FirstName', () => {
	let result, component, instance;

	describe('WHEN editable', () => {
			beforeEach(() => {
				component = (
					<FirstName
						group={''}
						label={'test'} />
				);

				instance = render(component);
				shallowRenderer.render(component);
				result = shallowRenderer.getRenderOutput();

			});



			it('should NOT be readOnly', () => {
				let props = {
					group: '',
					label: 'test',
					readOnly: 'No',
					name: "firstName",
					minLength: 1,
					maxLength: 35,
					onChange: () => {},
					validateType: 'alpha',
					dataAnchor: 'first-name',
					required: true,
				};

				expect(result).toEqualJSX(
					<ReadOnlyQuestion readOnly="No">
						<TextQuestion
							{...props}
							>
							test
						</TextQuestion>
					</ReadOnlyQuestion>
				);
			});

			it('should have a name', () => {
				expect(result.props.children.props.name).toEqual('firstName');
			});

			it('should have a data-anchor', () => {
				expect(result.props.children.props.dataAnchor).toEqual('first-name');
			});

			it('should have a alpha validation', () => {
				expect(result.props.children.props.validateType).toEqual('alpha');
			});

			it('should have a min-length', () => {
				expect(result.props.children.props.minLength).toEqual(1);
			});

			it('should have a max-length', () => {
				expect(result.props.children.props.maxLength).toEqual(35);
			});


		describe('overrides', () => {

			beforeEach(() => {
				component = (
					<FirstName
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

			it('should have a alpha validation', () => {
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
				<FirstName
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
				group: '',
				label: 'test',
				readOnly: 'Yes',
				name: "firstName",
				minLength: 1,
				maxLength: 35,
				onChange: () => {},
				validateType: 'alpha',
				dataAnchor: 'first-name',
				defaultValue:'default',
				required: true,
			};
			expect(result).toEqualJSX(
				<ReadOnlyQuestion readOnly="Yes">
					<TextQuestion
						{...props}
						>
						test
					</TextQuestion>
				</ReadOnlyQuestion>
				);
		});

	});
});
