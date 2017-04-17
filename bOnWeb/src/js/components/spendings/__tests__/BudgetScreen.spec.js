jest.unmock('../BudgetScreen');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const BudgetScreen = require('../BudgetScreen');

let component;
let props;
let instance;

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<BudgetScreen
						   {...props}
						/>);
	return shallowRenderer.getRenderOutput();
};

describe('BudgetScreen Test Cases', () => {

	beforeEach(()=>{
		props = {
			content: {
				spendingHeaderThisMonthText : 'Hello',
				spendingHeaderBudgetText:'Hello',
			},
    		budgetData: [],
    		totalCurrentMonthValue: "",
    		isNoBudget: true,
    		allBudgetTarget: [],
    		data:"Pummy",
		}
		component = shallowRender(props);
		instance = TestUtils.renderIntoDocument(<BudgetScreen {...props}/>);

	});

	it('Test Case : 1 : check ToBedefined',()=>{
			expect(component).toBeDefined();
	});

	it('Test Case : 2 : check allBudgetTarget',()=>{
		let event = {
			props:{
				data: "Hello"
			}
		};
		props = {
			content: {
				spendingHeaderThisMonthText : 'Hello',
				spendingHeaderBudgetText:'Hello',
			},
    		budgetData: [],
    		totalCurrentMonthValue: "",
    		isNoBudget: true,
    		allBudgetTarget: [10.22],
    		data:"Pummy",
		}
		instance = TestUtils.renderIntoDocument(<BudgetScreen {...props}/>);
		expect(instance.props.allBudgetTarget).toBe(props.allBudgetTarget);
	});

	it('Test Case : 3 : check _onRowClick : IF',()=>{
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

	it('Test Case : 4 : check _onRowClick : Else',()=>{
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