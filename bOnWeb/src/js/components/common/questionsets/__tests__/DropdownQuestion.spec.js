
jest.unmock('../DropdownQuestion');
jest.unmock('../Dropdown');
jest.unmock('../../mixins/InputMixin');
jest.unmock('../../../../utils/BrandUtils');

// React
const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

// Component
const DropdownQuestion = require('../DropdownQuestion');
const _ = require('lodash');
// Components
const InputMixin = require('../../mixins/InputMixin');
const Dropdown = require('../Dropdown');

// Utils
const BrandUtils = require('../../../../utils/BrandUtils');

const container = document.createElement('div');
const render = (comp, el) => ReactDOM.render(comp, el);

describe('DropdownQuestion', () => {
	let instance;

	beforeEach(() => {
		instance = render(
			<DropdownQuestion
				name="testName"
				group="anyGroup"
				appData={{}}
				content={{}}
				data={[]} />, container
		);
	});

	describe('getInitialState', ()=> {
		it('should return just the defaultValue', () => {
			const data = [
				{label:'Full time', value: 'FULL TIME'},
				{label:'Part time', value: 'PART TIME'},
				{label:'Unemployed', value: 'UNEMPLOYED'}
			];
			instance = render(
				<DropdownQuestion
					name="test"
					group="test"
					appData={{}}
					content={{}}
					data={data}
					defaultValue={'FULL TIME'} />, container
			);

			const result = instance.getInitialState();
			expect(result).toEqual({value: 'FULL TIME'});
		});

		it('should return the defaultValue and behaviour', () => {
			const data = [
				{label:'Full time', value: 'FULL TIME', behaviour: 'active'},
				{label:'Part time', value: 'PART TIME', behaviour: 'active'},
				{label:'Unemployed', value: 'UNEMPLOYED', behaviour: 'inactive'}
			];
			instance = render(
				<DropdownQuestion
					name="test"
					group="test"
					appData={{}}
					content={{}}
					data={data}
					defaultValue={'FULL TIME'} />, container
			);

			const result = instance.getInitialState();
			expect(result).toEqual({value: 'FULL TIME|active'});
		});

		it('should return undefined if no defaultValue is undefined', () => {
			const data = [];
			instance = render(
				<DropdownQuestion
					name="test"
					group="test"
					appData={{}}
					content={{}}
					data={data}
					defaultValue={undefined} />, container
			);



			const result = instance.getInitialState();
			expect(result).toEqual({value: undefined});
		});

		it('should return undefined if no defaultValue is empty', () => {
			const data = [];
			instance = render(
				<DropdownQuestion
					name="test"
					group="test"
					appData={{}}
					content={{}}
					data={data}
					defaultValue={''} />, container
			);

			const result = instance.getInitialState();
			expect(result).toEqual({value: ''});
		});
	});
});
