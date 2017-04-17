jest.unmock('../SavingPotDatePicker');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const moment = require('moment');

const Button = require('react-bootstrap/lib/Button');
const Modal = require('react-bootstrap/lib/Modal');

const SavingPotDatePicker = require('../SavingPotDatePicker');
let component;
let props;
let instance;
const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<SavingPotDatePicker
						   {...props}
						/>);
	return shallowRenderer.getRenderOutput();
};

describe('SavingPotDatePicker Test Cases check', () => {

	beforeEach(() => {	
		props = {
			  dateTime : moment().format('YYYY-MM'),
			  minDate : '',
			  format : '',
			  viewMode : '',
			  viewMode : '',
			  onChange : '',
			  defaultText :'',
		}
		component = shallowRender(props);
		instance = TestUtils.renderIntoDocument(<SavingPotDatePicker {...props}/>);
	});

	it('Unit Test Case 1 : SavingPotDatePicker : toBeDefined',()=>{
		expect(component).toBeDefined();
	});

	it('Unit Test Case 2 : SavingPotDatePicker : _close ',()=>{
		instance._close();
		expect(moment(instance.state.dateTime).format('YYYY')).toBe('2016');
	});

	it('Unit Test Case 3 : SavingPotDatePicker : componentWillReceiveProps ',()=>{
		instance.componentWillReceiveProps(props.dateTime);
		expect(moment(instance.state.dateTime).format('YYYY')).toBe('2016');
	});

	it('Unit Test Case 4 : SavingPotDatePicker : _click ',()=>{
		instance._click();
		expect(instance._click).toBeTruthy();
	}); 

});
