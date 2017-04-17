jest.unmock('../AccountsModal');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const AccountsModal = require('../AccountsModal');
const SpendingsStore = require('../../../stores/SpendingsStore');
const SpendingsActionCreator = require('../../../actions/SpendingsActionCreator');

let component;
let props;
let instance;
let getIds = [];

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<AccountsModal
						   {...props}
						/>);
	return shallowRenderer.getRenderOutput();
};

describe('AccountsModal Test Cases', () => {

	beforeEach(()=>{
		props = {
			content:{

			},
			spendingAccountList: [
				    {
				      "id": "05985dae-d2de-4ebc-ab0a-79093081bde5",
				      "type": "loan",
				      "product": {
				        "code": "901",
				        "name": "Personal Loan",
				        "description": "Personal Loan"
				      },
				      "actions_available": {
				        "/account/pots": false,
				        "/account/alerts": false,
				        "/account/projections": false,
				        "/account/sweeps": false,
				        "/account/sweeps/transfer/out": false,
				        "/account/transactions/read": false,
				        "/account/payments/transfer/in": false,
				        "/account/payments/transfer/out": false,
				        "/account/payments/uk/default/out": false,
				        "/account/mandates/so/read": false,
				        "/account/mandates/dd/read": false,
				        "/account/mandates/so/write": false,
				        "/account/mandates/dd/write": false
				      },
				      "bank_id": "CB",
				      "number": "650000-22446699",
				      "metadata": {
				        "display_name": "Loan Account"
				      }
				    },
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
				      "number": "654321-12345678",
				      "metadata": {
				        "display_name": "B Current"
				      }
				    },
				    {
				      "id": "084c7a11-c91a-45ef-baea-2fd0e9556e16",
				      "type": "credit_card",
				      "product": {
				        "code": "901",
				        "name": "Gold MasterCard",
				        "description": "Gold MasterCard credit card"
				      },
				      "actions_available": {
				        "/account/pots": false,
				        "/account/alerts": false,
				        "/account/projections": false,
				        "/account/sweeps": false,
				        "/account/sweeps/transfer/out": false,
				        "/account/transactions/read": true,
				        "/account/payments/transfer/in": false,
				        "/account/payments/transfer/out": true,
				        "/account/payments/uk/default/out": true,
				        "/account/mandates/so/read": false,
				        "/account/mandates/dd/read": false,
				        "/account/mandates/so/write": false,
				        "/account/mandates/dd/write": false
				      },
				      "bank_id": "CB",
				      "number": "************1234",
				      "metadata": {
				        "display_name": "My Credit Card"
				      }
				    },
				    {
				      "id": "3420d6c1-fb60-4ac5-a226-0d741f498ad2",
				      "type": "mortgage",
				      "product": {
				        "code": "901",
				        "name": "2 year fixed rate",
				        "description": "2 year fixed rate mortgage"
				      },
				      "actions_available": {
				        "/account/pots": false,
				        "/account/alerts": false,
				        "/account/projections": false,
				        "/account/sweeps": false,
				        "/account/sweeps/transfer/out": false,
				        "/account/transactions/read": false,
				        "/account/payments/transfer/in": false,
				        "/account/payments/transfer/out": false,
				        "/account/payments/uk/default/out": false,
				        "/account/mandates/so/read": false,
				        "/account/mandates/dd/read": false,
				        "/account/mandates/so/write": false,
				        "/account/mandates/dd/write": false
				      },
				      "bank_id": "CB",
				      "number": "650000-11223344",
				      "metadata": {
				        "display_name": "Mortgage"
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
				      "number": "123456-41381167",
				      "metadata": {
				        "display_name": "B Instant Savings"
				      }
				    },
				    {
				      "id": "a91fe657-4605-42c7-96f1-3e1cc8555276",
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
				      "number": "654321-44224422",
				      "metadata": {
				        "display_name": "B Instant Savings"
				      }
				    },
				    {
				      "id": "05985dae-d2de-4ebc-ab0a-79093081bde5",
				      "type": "loan-new",
				      "product": {
				        "code": "901",
				        "name": "Personal-Loan",
				        "description": "Personal Loan"
				      },
				      "actions_available": {
				        "/account/pots": false,
				        "/account/alerts": false,
				        "/account/projections": false,
				        "/account/sweeps": false,
				        "/account/sweeps/transfer/out": false,
				        "/account/transactions/read": false,
				        "/account/payments/transfer/in": false,
				        "/account/payments/transfer/out": false,
				        "/account/payments/uk/default/out": false,
				        "/account/mandates/so/read": false,
				        "/account/mandates/dd/read": false,
				        "/account/mandates/so/write": false,
				        "/account/mandates/dd/write": false
				      },
				      "bank_id": "CB",
				      "number": "650000-22446699",
				      "metadata": {
				        "display_name": "Loan Account"
				      }
				    }
				  ],
			onHide: jest.genMockFunction(),
			getAllAccountIds :['1','2'			
			]
		}
		SpendingsStore.updatedAccountIds.mockReturnValue(getIds);
		component = shallowRender(props);
		instance = TestUtils.renderIntoDocument(<AccountsModal {...props}/>);
	});
	it('Test Case : 1 : check ToBedefined',()=>{
			expect(component).toBeDefined();
	});

	/*it('Test Case : 2 : check componentWillUnmount',()=>{
		instance.componentWillUnmount();
		expect(instance.componentWillUnmount()).toBe();
	});*/

	it('Test Case : 3 : check _onOkClick',()=>{
		instance._onOkClick();
		expect(SpendingsActionCreator.getSpendListConnection.mock.calls.length).toBe(1);
	});

	it('Test Case : 4 : check _getAccountIdOnToggle : IF',()=>{
		let event = {
			target:{
				checked:true,
				getAttribute:jest.fn(),
			}
		}
		
		instance._getAccountIdOnToggle(event);
		expect(event.target.checked).toBe(true);
	});
	
	it('Test Case : 5 : check _getAccountIdOnToggle : Else',()=>{
		let event = {
			target:{
				checked:false,
				getAttribute:jest.fn(),
			}
		}
		
		instance._getAccountIdOnToggle(event);
		expect(event.target.checked).toBe(false);
	});

	it('Test Case : 6 : check _getAccountIdOnToggle : Else',()=>{
		let event = {
			target:{
				checked:true,
				getAttribute:()=>{
					return '5262'
				},
			}
		}
		getIds = ['123456-41381167']
		SpendingsStore.updatedAccountIds.mockReturnValue(getIds);
		
		instance._getAccountIdOnToggle(event);
		expect(event.target.checked).toBe(true);
	});

	it('Test Case : 7 : check _getAccountIdOnToggle : Else',()=>{
		let event = {
			target:{
				checked:false,
				getAttribute:()=>{
					return '1'
				},
			}
		}
		getIds = ['123456-41381167']
		SpendingsStore.updatedAccountIds.mockReturnValue(getIds);
		instance.setState({
			accountNumbs:['1'],
		})
		instance._getAccountIdOnToggle(event);
		expect(event.target.checked).toBe(false);
	});

	it('Test Case : 8 : check accoutnNumber length 0',()=>{
		let event = {
			target:{
				checked:false,
				getAttribute:()=>{
					return '1'
				},
			}
		}
		instance.setState({
			accountNumbs:[],
		})
		instance._getAccountIdOnToggle(event);
		expect(instance.state.isButtonDisable).toBe(true);
	});
});