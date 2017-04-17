jest.unmock('../SpendCurrentMonthTemplate');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const SpendCurrentMonthTemplate = require('../SpendCurrentMonthTemplate');

let component;
let props;
let instance;

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<SpendCurrentMonthTemplate
						   {...props}
						/>);
	return shallowRenderer.getRenderOutput();
};

describe('SpendCurrentMonthTemplate Test Cases', () => {

	beforeEach(()=>{
		props = {
			rowData: {
				current_month:'03'
			},
		}
		component = shallowRender(props);
	});

	it('Test Case : 1 : check ToBedefined',()=>{
			expect(component).toBeDefined();
	});

	it('Test Case : 2 : check current_month',()=>{
		props = {
			rowData: {
				current_month: -12.256
			},
		}
		instance = TestUtils.renderIntoDocument(<SpendCurrentMonthTemplate {...props}/>);
		expect(instance.props.rowData.current_month).toBe(-12.256);
	});

});