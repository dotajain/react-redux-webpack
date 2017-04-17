jest.unmock('../SpendingsScreen');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const SpendingsScreen = require('../SpendingsScreen');

let component;
let props;
let instance;

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<SpendingsScreen
						   {...props}
						/>);
	return shallowRenderer.getRenderOutput();
};

describe('SpendingsScreen Test Cases', () => {

	beforeEach(()=>{
		props = {
			content : {},
			spendListData : [],
			totalCurrentMonthValue : '',
			totalLastMonthValue : '',
			isNoBudget : true,
		}
		component = shallowRender(props);
		instance = TestUtils.renderIntoDocument(<SpendingsScreen {...props}/>);

	});

	it('Test Case : 1 : check ToBedefined',()=>{
			expect(component).toBeDefined();
	});

	it('Test Case : 2 : check _onRowClick : IF',()=>{
		let event = {
			props:{
				data: "Hello"
			}
		};
		let item = {
			key : 1,
			tag_budget : true,
		};
		instance._onRowClick(event,item);
		expect(item.tag_budget).toBe(true);
	});

	it('Test Case : 3 : check _onRowClick : Else',()=>{
		let event = {
			props:{
				data: "Hello"
			}
		};
		let item = {
			key : 1,
			tag_budget : false,
		};
		instance._onRowClick(event,item);
		expect(item.tag_budget).toBe(false);
	});

});