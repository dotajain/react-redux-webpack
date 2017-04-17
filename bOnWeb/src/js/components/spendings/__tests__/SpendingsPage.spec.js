jest.unmock('../SpendingsPage');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const SpendingsPage = require('../SpendingsPage');
const AccountsActionCreator = require('../../../actions/AccountsActionCreator');
const SpendingsActionCreator = require('../../../actions/SpendingsActionCreator');
const AccountsStore = require('../../../stores/AccountsStore');
const SpendingsStore = require('../../../stores/SpendingsStore');
const BrowserUtils = require('../../../utils/BrowserUtils');

let component;
let props;
let instance;

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<SpendingsPage
						   {...props}
						/>);
	return shallowRenderer.getRenderOutput();
};

describe('SpendingsPage Test Cases', () => {

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
		instance = TestUtils.renderIntoDocument(<SpendingsPage {...props}/>);

	});

	it('Test Case : 1 : check ToBedefined',()=>{
			expect(component).toBeDefined();
	});

	it('Test Case : 2 : check componentWillMount',()=>{
			instance.componentWillMount();
			expect(BrowserUtils.setViewPort.mock.calls.length).toBe(5);
	});

	it('Test Case : 3 : check componentDidMount',()=>{
			instance.componentDidMount();
			expect(SpendingsStore.addChangeListener.mock.calls.length).toBe(4);
	});

	it('Test Case : 4 : check componentWillUnmount',()=>{
			instance.componentWillUnmount();
			expect(SpendingsStore.removeChangeListener.mock.calls.length).toBe(1);
	});

	it('Test Case : 5 : check _loadSpendingAction',()=>{
			instance._loadSpendingAction();
			expect(SpendingsActionCreator.getAccountsList.mock.calls.length).toBe(12);
			expect(SpendingsActionCreator.getBudgetConnection.mock.calls.length).toBe(12);
			expect(SpendingsActionCreator.getTagListConnection.mock.calls.length).toBe(12);
			expect(SpendingsActionCreator.getBudgetPreferencesConnection.mock.calls.length).toBe(12);
	});

	it('Test Case : 6 : check _onStoreChange',()=>{
			instance._onStoreChange();
			expect(instance.state.storeChanged).toBe(true);
	});

	it('Test Case : 7 : check _reload',()=>{
			instance._reload();
			expect(instance._reload).toBeTruthy();
	});
	

	it('Test Case : 8 : check  ',()=>{
			instance.setState({
				isSpendingPage:true
			})
			instance.setState({
				hasAccountList:true
			});
			instance.setState({
				accountsList: {
				  "accounts": [
				    {
				      "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
				      "type": "current",
				      "product": {
				        "code": "901",
				        "name": "B Current Account",
				        "description": "Current Account"
				      },
				      "actions_available": {
				        "/account/pots": false,
				        "/account/alerts": true,
				        "/account/projections": true,
				        "/account/sweeps": true,
				        "/account/sweeps/transfer/out": false,
				        "/account/transactions/read": true,
				        "/account/payments/transfer/in": true,
				        "/account/payments/transfer/out": true,
				        "/account/payments/uk/default/out": true,
				        "/account/mandates/so/read": true,
				        "/account/mandates/dd/read": true,
				        "/account/mandates/so/write": true,
				        "/account/mandates/dd/write": true
				      },
				      "bank_id": "CB",
				      "sort_code": "654321",
				      "number": "12345678",
				      "metadata": {
				        "display_name": "B Current"
				      }
				    },
				    {
				      "id": "ee8948b5-e443-408a-a2cd-1af9b29fdd5f",
				      "type": "savings",
				      "product": {
				        "code": "901",
				        "name": "B Savings Account",
				        "description": "B Savings Account"
				      },
				      "actions_available": {
				        "/account/pots": true,
				        "/account/alerts": false,
				        "/account/projections": false,
				        "/account/sweeps": false,
				        "/account/sweeps/transfer/out": true,
				        "/account/transactions/read": true,
				        "/account/payments/transfer/in": true,
				        "/account/payments/transfer/out": true,
				        "/account/payments/uk/default/out": true,
				        "/account/mandates/so/read": false,
				        "/account/mandates/dd/read": false,
				        "/account/mandates/so/write": false,
				        "/account/mandates/dd/write": false
				      },
				      "bank_id": "CB",
				      "sort_code": "123456",
				      "number": "41381167",
				      "metadata": {
				        "display_name": "B Instant Savings"
				      }
				    },
				  ]
				}
			});
			expect(instance.state.hasAccountList).toBe(true);
	});

		it('Test Case : 9 : check isSpendingPage',()=>{
			instance  = TestUtils.renderIntoDocument(<SpendingsPage {...props}/>);
			instance.setState({
				accountsList: {
				  "accounts": [
				    {
				      "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
				      "type": "current",
				      "product": {
				        "code": "901",
				        "name": "B Current Account",
				        "description": "Current Account"
				      },
				      "actions_available": {
				        "/account/pots": false,
				        "/account/alerts": true,
				        "/account/projections": true,
				        "/account/sweeps": true,
				        "/account/sweeps/transfer/out": false,
				        "/account/transactions/read": true,
				        "/account/payments/transfer/in": true,
				        "/account/payments/transfer/out": true,
				        "/account/payments/uk/default/out": true,
				        "/account/mandates/so/read": true,
				        "/account/mandates/dd/read": true,
				        "/account/mandates/so/write": true,
				        "/account/mandates/dd/write": true
				      },
				      "bank_id": "CB",
				      "sort_code": "654321",
				      "number": "12345678",
				      "metadata": {
				        "display_name": "B Current"
				      }
				    },
				    {
				      "id": "ee8948b5-e443-408a-a2cd-1af9b29fdd5f",
				      "type": "savings",
				      "product": {
				        "code": "901",
				        "name": "B Savings Account",
				        "description": "B Savings Account"
				      },
				      "actions_available": {
				        "/account/pots": true,
				        "/account/alerts": false,
				        "/account/projections": false,
				        "/account/sweeps": false,
				        "/account/sweeps/transfer/out": true,
				        "/account/transactions/read": true,
				        "/account/payments/transfer/in": true,
				        "/account/payments/transfer/out": true,
				        "/account/payments/uk/default/out": true,
				        "/account/mandates/so/read": false,
				        "/account/mandates/dd/read": false,
				        "/account/mandates/so/write": false,
				        "/account/mandates/dd/write": false
				      },
				      "bank_id": "CB",
				      "sort_code": "123456",
				      "number": "41381167",
				      "metadata": {
				        "display_name": "B Instant Savings"
				      }
				    },
				  ]
				}
			});
			instance.setState({
				storeChanged : true,
				isLoadPage : true,
			})
			expect(instance.state.isLoadPage).toBe(true);
	});

	it('Test Case : 10 : check isError',()=>{
			instance  = TestUtils.renderIntoDocument(<SpendingsPage {...props}/>);
			instance.setState({
				storeChanged : true,
				isLoadPage : false,
				isNetworkError : true,
				isError : true,
			})
			expect(instance.state.isError).toBe(true);
	});

	it('Test Case : 11 : check isInterNalServerError',()=>{
			instance  = TestUtils.renderIntoDocument(<SpendingsPage {...props}/>);
			instance.setState({
				storeChanged : true,
				isLoadPage : false,
				isNetworkError : false,
				isError : false,
				isInterNalServerError : true,
			})
			expect(instance.state.isInterNalServerError).toBe(true);
	});
	
	it('Test Case : 12 : check openFaq()',()=>{
			instance  = TestUtils.renderIntoDocument(<SpendingsPage {...props}/>);
			instance.openFaq();
			expect(instance.state.faqFlag).toBe(true);
	});

	it('Test Case : 13 : check closeFaq()',()=>{
			instance  = TestUtils.renderIntoDocument(<SpendingsPage {...props}/>);
			instance.closeFaq();
			expect(instance.state.faqFlag).toBe(false);
	});

});