jest.unmock('../SpendLastMonthTemplate');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const SpendLastMonthTemplate = require('../SpendLastMonthTemplate');

let component;
let props;
let instance;

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<SpendLastMonthTemplate
						   {...props}
						/>);
	return shallowRenderer.getRenderOutput();
};

describe('SpendLastMonthTemplate Test Cases', () => {

	beforeEach(()=>{
		props = {
			rowData : {
				last_month: -10.20,
			},
		}
		component = shallowRender(props);
		instance = TestUtils.renderIntoDocument(<SpendLastMonthTemplate {...props}/>);

	});

	it('Test Case : 1 : check ToBedefined',()=>{
			expect(component).toBeDefined();
	});

	it('Test Case : 2 : check lastMonth : Else',()=>{
		props = {
			rowData : {
				last_month: 10.20,
			},
		}
		instance = TestUtils.renderIntoDocument(<SpendLastMonthTemplate {...props}/>);
		expect(instance.props.rowData.last_month).toBe(props.rowData.last_month);
	});
});