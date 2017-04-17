jest.unmock('../SpendingsLangingPages');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const SpendingsLangingPages = require('../SpendingsLangingPages');

let component;
let props;
let instance;

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<SpendingsLangingPages
						   {...props}
						/>);
	return shallowRenderer.getRenderOutput();
};

describe('SpendingsLangingPages Test Cases', () => {

	beforeEach(()=>{
		props = {
			content : {},
			budgetData : [],
			isNoBudget : true,
			spendListData : [],
			allBudgetTarget : [],
			loadSpendingPage : 0,
			spendingAccountList : [],
			totalLastMonthValue : [],
			totalCurrentMonthValue : [],
		}
		component = shallowRender(props);
		instance = TestUtils.renderIntoDocument(<SpendingsLangingPages {...props}/>);

	});

	it('Test Case : 1 : check ToBedefined',()=>{
			expect(component).toBeDefined();
	});


	it("Test Case : 2 : check loadSpendingPage",()=>{
		props.loadSpendingPage = 2;
		instance = TestUtils.renderIntoDocument(<SpendingsLangingPages {...props}/>);
		expect(instance.props.loadSpendingPage).toBe(2);
	});
		
});