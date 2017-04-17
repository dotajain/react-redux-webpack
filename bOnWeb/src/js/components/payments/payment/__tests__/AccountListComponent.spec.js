
jest.unmock('../AccountListComponent');
jest.mock('../../../../stores/PaymentsStore');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const ReactDOM = require('react-dom');
const AccountComponent = require('../AccountComponent');
const AccountListComponent = require('../AccountListComponent');
const PaymentsStore = require('../../../../stores/PaymentsStore');
const BrowserUtils = require('../../../../utils/BrowserUtils');

const shallowRenderer = TestUtils.createRenderer();

PaymentsStore.getSelectedToAccount.mockReturnValue({id: "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
    type:"savings",
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
                "value": 1517.44,
                "currency": "GBP"
            },
            "at": "2016-05-16T15:07:50.832+00:00"
        },
        {
            "type": "available",
            "amount": {
                "value": 3482.56,
                "currency": "GBP"
            },
            "at": "2016-05-16T15:07:50.832+00:00"
        }
    ]
})


const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<AccountListComponent
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};

describe("to check the header component", () => {
    let instance
    let props = {
        tabChange:true,
        accountClick: jest.fn(),
        accountList: [
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
         contents: {
       "loadingAccounts":" Loading Accounts...",
      }
    };
    beforeEach(() => {
        instance = TestUtils.renderIntoDocument(
            <AccountListComponent {...props} />
        );
    });

    it('should render AccountListComponent', () => {
        expect(instance.props.accountList).toBeTruthy();
    });

    it('to check get state', () => {
        //PaymentsStore.setConfirmBack(true)
        PaymentsStore.getConfirmBack.mockReturnValue(true)

        instance = TestUtils.renderIntoDocument(
            <AccountListComponent {...props} />
        );
        expect(instance.props.accountList).toBeTruthy();
    });

    it('Component will mount', () => {
       
        PaymentsStore.getNextTask.mockReturnValue("From");
        instance = TestUtils.renderIntoDocument(
            <AccountListComponent {...props} />
        );

        instance.componentWillMount();
        //expect(instance.props.accountList).toBeTruthy();
    });

      it('Component will mount - get next task "TO"', () => {
        PaymentsStore.getNextTask.mockReturnValue("To");
        PaymentsStore.isFromOtherPage.mockReturnValue(true);
        PaymentsStore.getSelectedToPot.mockReturnValue('12345');
        instance = TestUtils.renderIntoDocument(
            <AccountListComponent {...props} />
        );

        instance.componentWillMount();
        
    });

     it('Component will mount - get next task "TO"-selectedToPot empty', () => {
        PaymentsStore.getNextTask.mockReturnValue("To");
        PaymentsStore.isFromOtherPage.mockReturnValue(true);
        PaymentsStore.getSelectedToPot.mockReturnValue('');
        PaymentsStore.isSavingTotClicked.mockReturnValue(true);
        instance = TestUtils.renderIntoDocument(
            <AccountListComponent {...props} />
        );

        instance.componentWillMount();
        
    });

    
      it('Component will mount - get next task "TO"-type,accounts', () => {
        PaymentsStore.getNextTask.mockReturnValue("To");
        PaymentsStore.isFromOtherPage.mockReturnValue(true);
        PaymentsStore.getSelectedToAccount.mockReturnValue({id: "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
    type:"accounts",});
       
        instance = TestUtils.renderIntoDocument(
            <AccountListComponent {...props} />
        );

        instance.componentWillMount();
        
    });

    it('should handle accout click function-mobile view true', () => {
        BrowserUtils.isMobileView.mockReturnValue(true);
        let e = {
            type: "savings",

        };
        instance = TestUtils.renderIntoDocument(
            <AccountListComponent {...props} />
        );

        instance.accountClick(e, true);
        expect(instance.props.accountList).toBeTruthy();
    });
    it('should handle accout click function - mobile view false', () => {
        BrowserUtils.isMobileView.mockReturnValue(false);
        let e = {
            type: "savings",

        };
        instance = TestUtils.renderIntoDocument(
            <AccountListComponent {...props} />
        );

        instance.accountClick(e, true);
        expect(instance.props.accountList).toBeTruthy();
    });
    it('should handle accout click function - mobile view true -to list - savings-potclick true', () => {
        BrowserUtils.isMobileView.mockReturnValue(true);
        let e = {
            type: "savings",

        };
        instance = TestUtils.renderIntoDocument(
            <AccountListComponent {...props} name='toList'/>
        );

        instance.accountClick(e, true);
        expect(instance.props.accountList).toBeTruthy();
    });
    it('should handle accout click function - mobile view true -from list -not savings-potclick true', () => {
        BrowserUtils.isMobileView.mockReturnValue(true);
        let e = {
            type: "current",

        };
        instance = TestUtils.renderIntoDocument(
            <AccountListComponent {...props} name='fromList'/>
        );

        instance.accountClick(e, true);
        expect(instance.props.accountList).toBeTruthy();
    });

    it('should handle accout click function - mobile view true -from list - savings-potclick false', () => {
        BrowserUtils.isMobileView.mockReturnValue(true);
        let e = {
            type: "savings",

        };
        instance = TestUtils.renderIntoDocument(
            <AccountListComponent {...props} name='fromList'/>
        );

        instance.accountClick(e, false);
        expect(instance.props.accountList).toBeTruthy();
    });
    it('should handle accout click function - mobile view true -to list - current-potclick true', () => {
        BrowserUtils.isMobileView.mockReturnValue(true);
        let e = {
            type: "current",

        };
        instance = TestUtils.renderIntoDocument(
            <AccountListComponent {...props} name='toList'/>
        );

        instance.accountClick(e, true);
        expect(instance.props.accountList).toBeTruthy();
    });
    it('should handle accout click function - mobile view true -to list - current-potclick false', () => {
        BrowserUtils.isMobileView.mockReturnValue(true);
        let e = {
            type: "current",

        };
        instance = TestUtils.renderIntoDocument(
            <AccountListComponent {...props} name='toList'/>
        );

        instance.accountClick(e, false);
        expect(instance.props.accountList).toBeTruthy();
    });
    it('should handle accout click function - mobile view true -to list - current-potclick false', () => {
        // PaymentsStore.setConfirmBack(false)
        BrowserUtils.isMobileView.mockReturnValue(true);
        let e = {
            type: "savings",

        };
        instance = TestUtils.renderIntoDocument(
            <AccountListComponent {...props} name='toList'/>
        );

        instance.accountClick(e, false);
        expect(instance.props.accountList).toBeTruthy();
    });

    it('should handle accout click function - mobile view true -to list - current-potclick false', () => {
        // PaymentsStore.setConfirmBack(false)
        // BrowserUtils.isMobileView.mockReturnValue(true);
        props.accountClick = undefined;
        let e = {
            type: "savings",

        };
        instance = TestUtils.renderIntoDocument(
            <AccountListComponent {...props} name='toList'/>
        );

        instance.accountClick(e, false);
        expect(instance.props.accountList).toBeTruthy();
    });
    it('should handle accout click function - mobile view true -to list - current-potclick false', () => {
        // PaymentsStore.setConfirmBack(false)
        // BrowserUtils.isMobileView.mockReturnValue(true);
        props.accountClick = undefined;
        let e = {
            type: "savings",

        };
        instance = TestUtils.renderIntoDocument(
            <AccountListComponent {...props} name='fromList'/>
        );

        instance.accountClick(e, false);
        expect(instance.props.accountList).toBeTruthy();
    });
    it('should handle accout click function Form List - mobile view true -to list - savings-potclick false', () => {
        // PaymentsStore.setConfirmBack(false)
        BrowserUtils.isMobileView.mockReturnValue(true);
        //props.accountClick = undefined;
        let e = {
            type: "savings",

        };
        instance = TestUtils.renderIntoDocument(
            <AccountListComponent {...props} name='fromList'/>
        );
        instance.setState({ isFromOpen: false });

        instance.accountClick(e, false);
        expect(instance.props.accountList).toBeTruthy();
    });
    it('should handle accout click function To List- mobile view true -to list - savings-potclick false', () => {
        // PaymentsStore.setConfirmBack(false)
        BrowserUtils.isMobileView.mockReturnValue(true);
        //props.accountClick = undefined;
        let e = {
            type: "savings",

        };
        instance = TestUtils.renderIntoDocument(
            <AccountListComponent {...props} name='toList'/>
        );
        instance.setState({ isToOpen: false });

        instance.accountClick(e, false);
        expect(instance.props.accountList).toBeTruthy();
    });

    it('should dipaly loading message', () => {
       
        props.accountList = [];

        let component = shallowRender(props);
        expect(component).toEqualJSX(<div><div /></div>);
    });
    it('should handle load accounts click', () => {
      let disp=true;
      let index=1;
        let e = {
            type: "savings",
            id:"b80e95a0-6b60-45b2-8b0f-77f2355f3061",

        };
        instance = TestUtils.renderIntoDocument(
            <AccountListComponent {...props} name='toList'/>
        );
       //instance.setState({ isToOpen: false });
        PaymentsStore.isOneOffPayment.mockReturnValue(true);
       // PaymentsStore.getSelectedToAccount();
        instance.loadAccounts(e, index,disp);
        //expect(instance.props.accountList).toBeTruthy();
        //expect(instance.loadAccounts).toBeDefined();
    });
    it('should handle load accounts click else', () => {
      let disp=true;
      let index=1;
        let e = {
            type: "accounts",
            id:"b80e95a0-6b60-45b2-8b0f-77f2355f3061",

        };
        instance = TestUtils.renderIntoDocument(
            <AccountListComponent {...props} name='toList'/>
        );
       //instance.setState({ isToOpen: false });
        PaymentsStore.isOneOffPayment.mockReturnValue(true);
        //PaymentsStore.getSelectedToAccount();
        instance.loadAccounts(e, index,disp);
        //expect(instance.props.accountList).toBeTruthy();
        expect(instance.loadAccounts).toBeDefined();
    });

    it('should handle load accounts click else', () => {
      let disp=true;
      let index=1;
        let e = {
            type: "savings",
            id:"b80e95a0-6b60-45b2-8b0f-77f2355f306",

        };
        instance = TestUtils.renderIntoDocument(
            <AccountListComponent {...props} name='fromList'/>
        );
       //instance.setState({ isToOpen: false });
       PaymentsStore.getOneOffPayment.mockReturnValue({isMonthly:true})
        PaymentsStore.isOneOffPayment.mockReturnValue(true);
        //PaymentsStore.getSelectedToAccount();
        instance.loadAccounts(e, index,disp);
        //expect(instance.props.accountList).toBeTruthy();
        expect(instance.loadAccounts).toBeDefined();
    });

    it('should handle load accounts click else-equals', () => {
      let disp=true;
      let index=1;
        let e = {
            type: "savings",
            id:"b80e95a0-6b60-45b2-8b0f-77f2355f3061",

        };
        instance = TestUtils.renderIntoDocument(
            <AccountListComponent {...props} name='fromList'/>
        );
       //instance.setState({ isToOpen: false });
       PaymentsStore.getOneOffPayment.mockReturnValue({isMonthly:true})
        PaymentsStore.isOneOffPayment.mockReturnValue(true);
        //PaymentsStore.getSelectedToAccount();
        instance.loadAccounts(e, index,disp);
        //expect(instance.props.accountList).toBeTruthy();
        expect(instance.loadAccounts).toBeDefined();
    });
});



