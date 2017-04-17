jest.unmock('../TransactionScreenDataGrid');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const TransactionScreenDataGrid = require('../TransactionScreenDataGrid');
const SpendingsStore = require('../../../stores/SpendingsStore');
const SpendingsActionCreator = require('../../../actions/SpendingsActionCreator');

let component;
let props;
let instance;
let transactionDetailsData;

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<TransactionScreenDataGrid
						   {...props}
						/>);
	return shallowRenderer.getRenderOutput();
};

describe('TransactionScreenDataGrid Test Cases', () => {

	beforeEach(()=>{
		props = {
			onRowClick : jest.fn(),
			content :{},
		};
		transactionDetailsData = {
			tableData : ['Hello','World'],
			totalData : 2,
		};
		SpendingsStore.getTransactionDetails.mockReturnValue(transactionDetailsData);
		component = shallowRender(props);
		instance = TestUtils.renderIntoDocument(<TransactionScreenDataGrid {...props}/>);
	});

	it('TransactionScreenDataGrid : Unit Test Case 1 : toBedefined',()=>{
		expect(component).toBeDefined();
	});

	it('TransactionScreenDataGrid : Unit Test Case 2 : _onPageChange',()=>{
		instance._onPageChange();
		expect(SpendingsActionCreator.getTransactionDetailsOnNext.mock.calls.length).toBe(1);
	});

	it('TransactionScreenDataGrid : Unit Test Case 3 : transactionDetailsData',()=>{
		transactionDetailsData = {
			tableData : ['Hello','World'],
			totalData : 1,
		};
		SpendingsStore.getTransactionDetails.mockReturnValue(transactionDetailsData);
		instance = TestUtils.renderIntoDocument(<TransactionScreenDataGrid {...props}/>);
		expect(transactionDetailsData.tableData.length).toBe(2);
	});
	 
	it('TransactionScreenDataGrid : Unit Test Case 4 : _onSortChange : If',()=>{
		let sortName = 'date';
		let sort = 'acs';
		instance._onSortChange(sortName, sort);
		expect(SpendingsActionCreator.getTransactionDetailsOnSort.mock.calls.length).toBe(1);
	});

	it('TransactionScreenDataGrid : Unit Test Case 5 : _onSortChange : Else If',()=>{
		let sortName = 'description';
		let sort = 'acs';
		instance._onSortChange(sortName, sort);
		expect(SpendingsActionCreator.getTransactionDetailsOnSort.mock.calls.length).toBe(2);
	});

	it('TransactionScreenDataGrid : Unit Test Case 6 : _onSortChange : Else If',()=>{
		let sortName = 'type';
		let sort = 'acs';
		instance._onSortChange(sortName, sort);
		expect(SpendingsActionCreator.getTransactionDetailsOnSort.mock.calls.length).toBe(3);
	});

	it('TransactionScreenDataGrid : Unit Test Case 7 : _onSortChange : Else If',()=>{
		let sortName = 'amount';
		let sort = 'acs';
		instance._onSortChange(sortName, sort);
		expect(SpendingsActionCreator.getTransactionDetailsOnSort.mock.calls.length).toBe(4);
	});

	it('TransactionScreenDataGrid : Unit Test Case 8 : _onSortChange : Else',()=>{
		let sortName = 'hello';
		let sort = 'acs';
		instance._onSortChange(sortName, sort);
		expect(SpendingsActionCreator.getTransactionDetailsOnSort.mock.calls.length).toBe(5);
	});
});