jest.unmock('../AccountsList');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const AccountsList = require('../AccountsList');

let component;
let props;
let instance;

const shallowRender = props => {
	const shallowRenderer = TestUtils.createRenderer();
	shallowRenderer.render(<AccountsList
						   {...props}
						/>);
	return shallowRenderer.getRenderOutput();
};

describe('AccountsList Test Cases', () => {

	beforeEach(()=>{
		props = {
			account:{
				  "id": "05985dae-d2de-4ebc-ab0a-79093081bde5",
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
				  "limits": [

				  ],
				  "bank_id": "CB",
				  "number": "650000-22446699",
				  "metadata": {
				    "display_name": "Loan Account"
				  },
				  "owners": [
				    {
				      "id": "2",
				      "provider": "CB",
				      "display_name": "Bob Brown"
				    }
				  ],
				  "balances": [
				    {
				      "type": "current",
				      "amount": {
				        "value": 7178.06,
				        "currency": "GBP"
				      },
				      "at": "2016-05-16T15:07:50.315+00:00"
				    }
				  ]
				}
		}
		component = shallowRender(props);
		instance = TestUtils.renderIntoDocument(<AccountsList {...props}/>);
	});
	it('check ToBedefined',()=>{
			component = shallowRender(props);
			expect(component).toBeDefined();
		});
});