jest.unmock('../EconomicallyActiveComponent');
jest.unmock('../../../../config');
jest.unmock('../../../../utils/DateUtils');
jest.unmock('../../../common/questionsets/DatePickerQuestion');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const _ = require('lodash');

const container = document.createElement('div');
const render = (comp, el) => ReactDOM.render(comp, el || container);
const shallowRenderer = TestUtils.createRenderer();

const config = require('../../../../config');
const EconomicallyActiveComponent = require('../EconomicallyActiveComponent');
const { DropdownQuestion, TextQuestion, DatePickerQuestion } = require('../../../common/questionsets');

describe('Economically Active', () => {
	let instance;
	let component;
	let result;

	let content = {
		employmentStartDateQuestion: 'employmentStartDateQuestion'
	};

	let data = {
	};

	let props = {
		group:'group',
		data:data,
		fieldNames:{'employmentStartDate':''},
		visible:true,
		content:content,
		onChange: () => {},
	};

	beforeEach(() => {
		component = (
			<EconomicallyActiveComponent {...props} />
		);

		instance = render(component);
		shallowRenderer.render(component);
		result = shallowRenderer.getRenderOutput();
	});

	it('should be defined', () => {
		expect(instance).toBeDefined();
	});

	describe('getEmploymentStartDateLimit()', () =>{
		it('should return a date 16 years after the DOB given', () => {
			var dateLimit = instance.getEmploymentStartDateLimit('24-03-1981').format('DD-MM-YYYY');

			expect(dateLimit).toEqual('24-03-1997');
		});
	});

	describe('render()', () =>{
		it('should render the occupation dropdown', () => {
			expect(result.props.children[0]).toEqualJSX(
				<DropdownQuestion
					group={props.group}
					name={props.fieldNames.employmentOccupation}
					data={config.formOptionsOccupation}
					onChange={props.onChange}
					defaultValue={props.data[props.fieldNames.employmentOccupation]}
					dataAnchor="employment-occupation"
					required>
					Occupation
				</DropdownQuestion>
			);
		});

		it('should render other income payment amount', () => {
			expect(result.props.children[1]).toEqualJSX(
				<DatePickerQuestion
					name={props.fieldNames.employmentStartDate}
					group={props.group}
					onChange={props.onChange}
					defaultValue={props.data[props.fieldNames.employmentStartDate]}
					validateBeforeToday
					validateAfterDate={instance.getEmploymentStartDateLimit(props.data.dateOfBirth)}
					dataAnchor="employment-start-date"
					required>
					employmentStartDateQuestion
				</DatePickerQuestion>
			);
		});

		it('should render other income type dropdown', () => {
			expect(result.props.children[2]).toEqualJSX(
				<TextQuestion
					name={props.fieldNames.employmentEmployerName}
					group={props.group}
					onChange={props.onChange}
					defaultValue={props.data[props.fieldNames.employmentEmployerName]}
					minLength={2}
					maxLength={40}
					dataAnchor="employer-name"
					required>
					Employer Name
				</TextQuestion>
			);
		});

		it('should return null if set not to be visible', () => {
			let nonVisibleProps = {
				group:'group',
				data:data,
				fieldNames:{},
				visible:false,
				content:content,
				onChange: () => {},
			};

			component = (
				<EconomicallyActiveComponent {...nonVisibleProps} />
			);

			instance = render(component);
			shallowRenderer.render(component);
			result = shallowRenderer.getRenderOutput();

			expect(result).toBe(null);

		});
	});

});

