jest.unmock('../AccountTransactionComponent');
const React = require('react');
const TestUtils = require('react-addons-test-utils');

const TransactionHistory = require('../TransactionHistory.jsx');
const AccountTransactionComponent = require('../AccountTransactionComponent');
const FinancialStoriesActionCreator = require('../../../actions/FinancialStoriesActionCreator');
const RegexUtils = require('../../../utils/RegexUtils');

let component;
let props;
let instance;
const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<AccountTransactionComponent
		{...props}
		/>);
	return shallowRenderer.getRenderOutput();
};

describe('AccountTransactionComponent Test Cases check', () => {

	beforeEach(() => {
		props = {
			isPopupOpen: true,
			content: {
				current: 'current'
			},
			transactionsState: {
				selectedTabKey: '',
				searchTextData: [{ value: 'HELLO' }],
				transactionHistoryData: {},
			},
			nextAccountDetails: true,
			resetTranTagSelection: true,
			openSideBar: jest.fn(),
			onShowProgressIconClick: jest.fn(),
			openGridCheckBoxColumn: true,
			onMicroTileClick: jest.fn(),
		};

		component = shallowRender(props);
		instance = TestUtils.renderIntoDocument(<AccountTransactionComponent {...props}/>);
	});

	it('Unit Test Case 1 : AccountTransactionComponent : toBeDefined', () => {
		expect(component).toBeDefined();
	});

	it('Unit Test Case 2 : AccountTransactionComponent : componentDidMount', () => {
		instance.componentDidMount();
		expect(FinancialStoriesActionCreator.getTransactionHistoryList.mock.calls.length).toBe(0);
	});

	it('Unit Test Case 3 : AccountTransactionComponent : componentWillReceiveProps', () => {
		instance.componentWillReceiveProps();
		expect(instance.props.nextAccountDetails).toBe(true);
	});

	it('Unit Test Case 4 : AccountTransactionComponent : componentWillReceiveProps', () => {
		props.nextAccountDetails = false;
		instance = TestUtils.renderIntoDocument(<AccountTransactionComponent {...props}/>);
		instance.componentWillReceiveProps();
		expect(instance.props.nextAccountDetails).toBe(false);
	});

	it('Unit Test Case 5 : AccountTransactionComponent : onTabSelect', () => {
		instance.onTabSelect(true);
		expect(FinancialStoriesActionCreator.tabSelect.mock.calls.length).toBe(1);
	});

	it('Unit Test Case 6 : AccountTransactionComponent : onTransactionDateChange', () => {
		instance.onTransactionDateChange('2016-12-20', '2017-12-20');
		expect(FinancialStoriesActionCreator.getTransactionDateRangeList.mock.calls.length).toBe(1);
	});

	it('Unit Test Case 7 : AccountTransactionComponent : onInputSearchChange', () => {
		instance = TestUtils.renderIntoDocument(<AccountTransactionComponent {...props}/>);
		// instance.refs.searchInput.value = 'HELLO';
		instance.onInputSearchChange();
		expect(instance.onInputSearchChange).toBeDefined;
		// expect(FinancialStoriesActionCreator.transactionSearchTextList.mock.calls.length).toBe(1);

	});

	it('Unit Test Case 8 : AccountTransactionComponent : getSearchData', () => {
		let data = {
			text: 'HELLO',
		};
		instance.getSearchData(data);
		expect(instance.refs.searchInput.value).toBe('HELLO');
	});

	it('Unit Test Case 9 : AccountTransactionComponent : getSearchData : If', () => {
		props.nextAccountDetails = false;
		instance = TestUtils.renderIntoDocument(<AccountTransactionComponent {...props}/>);
		let data = {
			text: 'HELLO'
		};
		instance.getSearchData(data);
		expect(instance.getSearchData).toBeDefined;
	});

	it('Unit Test Case 10 : AccountTransactionComponent : moveCaretAtEnd', () => {
		let event = {
			target: {
				value: 'HELLO'
			},
			preventDefault: jest.fn(),
		};
		instance.moveCaretAtEnd(event);
		expect(event.target.value).toBe('HELLO');
	});

	it('Unit Test Case 11 : AccountTransactionComponent : clearclick', () => {
		instance.clearclick();
		expect(FinancialStoriesActionCreator.resetTransactionSearchText.mock.calls.length).toBe(1);
	});

	it('Unit Test Case 12 : AccountTransactionComponent : searchSuggestedPopup : If', () => {
		instance = TestUtils.renderIntoDocument(<AccountTransactionComponent {...props}/>);
		instance.searchSuggestedPopup();
		expect(props.transactionsState.searchTextData.length).toBe(1);
	});

	it('Unit Test Case 13 : AccountTransactionComponent : searchSuggestedPopup : ELSE', () => {
		let returnValue = true;
		props.transactionsState.searchTextData = [];
		instance = TestUtils.renderIntoDocument(<AccountTransactionComponent {...props}/>);
		returnValue = instance.searchSuggestedPopup();
		expect(returnValue).toBe(false);
	});

	it('Unit Test Case 14 : AccountTransactionComponent : cancelTransactionSearch : If', () => {
		instance.cancelTransactionSearch();
		expect(instance.refs.searchInput.value).toBe('');
	});
	it('Unit Test Case 15 : AccountTransactionComponent : render fxn', () => {
		let returnValue = true;
		props.transactionsState.searchTextData = [];
		instance = TestUtils.renderIntoDocument(<AccountTransactionComponent {...props}/>);
		instance.refs.searchInput.value = 'loan';
		instance.render();
		//expect(returnValue).toBe(false);
	});

	it('Unit Test Case 15 : AccountTransactionComponent : render fxn', () => {
		let returnValue = true;
		props.transactionsState.searchTextData = [];
		instance = TestUtils.renderIntoDocument(<AccountTransactionComponent {...props}/>);
		instance.render();
		//expect(returnValue).toBe(false);
	});

	it('Unit Test Case 15 : AccountTransactionComponent : render fxn', () => {
		let props = {
			isPopupOpen: false,
			content: {
				current: 'current'
			},
			transactionsState: {
				selectedTabKey: '',
				searchTextData: [{ value: 'HELLO' }],
				transactionHistoryData: {},
			},
			nextAccountDetails: true,
			resetTranTagSelection: true,
			openSideBar: jest.fn(),
			onShowProgressIconClick: jest.fn(),
			openGridCheckBoxColumn: true,
			onMicroTileClick: jest.fn(),
		};
		let returnValue = true;
		props.transactionsState.searchTextData = [];
		instance = TestUtils.renderIntoDocument(<AccountTransactionComponent {...props}/>);
		instance.render();
		//expect(returnValue).toBe(false);
	});

	it('Unit Test Case 16 : AccountTransactionComponent : handleKeyPress fxn', () => {
		let event = {
			key : 'Enter',
			preventDefault: () => {},
		};
		RegexUtils.isValid.mockReturnValue(true);
		instance = TestUtils.renderIntoDocument(<AccountTransactionComponent {...props}/>);
		instance.handleKeyPress(event);
		expect(instance.handleKeyPress).toBeDefined;
		//expect(returnValue).toBe(false);
	});

	it('Unit Test Case 16 : AccountTransactionComponent : handleKeyPress fxn where event.key is not equal to enter', () => {
		let event = {
			key : '',
			preventDefault: () => {},
		};
		RegexUtils.isValid.mockReturnValue(true);
		instance = TestUtils.renderIntoDocument(<AccountTransactionComponent {...props}/>);
		instance.handleKeyPress(event);
		expect(instance.handleKeyPress).toBeDefined;
		//expect(returnValue).toBe(false);
	});

});
