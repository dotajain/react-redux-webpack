jest.unmock('../SpendingsCreateBudgetDataGrid');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const SpendingsCreateBudgetDataGrid = require('../SpendingsCreateBudgetDataGrid');
const Modal = require('react-bootstrap/lib/Modal');

let component;
let props;
let instance;

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<SpendingsCreateBudgetDataGrid
						   {...props}
						/>);
	return shallowRenderer.getRenderOutput();
};

describe('SpendingsCreateBudgetDataGrid Test Cases', () => {

	beforeEach(()=>{
		props = {
			tableData: [],
			customClick : jest.fn(),
			content :{},
		}
		component = shallowRender(props);
		instance = TestUtils.renderIntoDocument(<SpendingsCreateBudgetDataGrid {...props}/>);
	});

	it('SpendingsCreateBudgetDataGrid : Unit Test Case 1 : toBedefined',()=>{
		expect(component).toBeDefined();
	});

	it('SpendingsCreateBudgetDataGrid : Unit Test Case 1 : toBedefined',()=>{
		let check = instance.shouldComponentUpdate();
		expect(check).toBe(false);
	});

	 
});