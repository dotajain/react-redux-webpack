window.matchMedia = window.matchMedia || function () {
    return {
        matches: false,
        addListener: function () { },
        removeListener: function () { }
    };
};

jest.unmock('../AccountSummarySlider');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const AccountSummarySlider = require('../AccountSummarySlider');
const FinancialStoriesStore = require('../../../stores/FinancialStoriesStore');
let Slider;
let component;
let props;
let breakpo024;

FinancialStoriesStore.getState.mockReturnValue({
    accountList: [
        { name: 'name' }, { name: 'name' }
    ],
    accountDetails: { currentBalance: 100.50 }
});

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<AccountSummarySlider
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};


const accountList = [
    {
        name: 'Bcurrent',
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
]

describe('AccountSummarySlider Test Cases check', () => {

    let component;
    let props = {
        onTagsClick: jest.fn(),
        onNextAccountDetails: jest.fn(),
    };

    beforeEach(() => {


    });

    xit('should compare jsx', () => {


        let instance = shallowRender(props);
        expect(instance).toEqualJSX(
            <div>
                <Slider
                    ref="slider"
                    afterChange={function noRefCheck() { } }
                    arrows={true}
                    dots={true}
                    draggable={false}
                    fade={true}
                    infinite={false}
                    responsive={[{ breakpoint: 768, settings: { slidesToShow: 1 } }, { breakpoint: 991, settings: { slidesToShow: 1 } }, { breakpo024, settings: { slidesToShow: 1 } }, { breakpoint: 1200, settings: { slidesToShow: 1 } }]}
                    slidesToScroll={1}
                    slidesToShow={1}
                    speed={500}
                    swipe={false}
                    >
                    <div className="slide">
                        <a
                            className="slide-content"
                            href="#"
                            >
                            <h3 />
                            <h2>
                                100.
                                <sub>
                                    5
                                </sub>
                            </h2>
                        </a>
                    </div>
                    <div className="slide">
                        <a
                            className="slide-content"
                            href="#"
                            >
                            <h3 />
                            <h2>
                                100.
                                <sub>
                                    5
                                </sub>
                            </h2>
                        </a>
                    </div>
                    <div className="slide">
                        <a
                            className="slide-content"
                            href="#"
                            >
                            <h3 />
                            <h2>
                                100.
                                <sub>
                                    5
                                </sub>
                            </h2>
                        </a>
                    </div>
                    <div className="slide">
                        <a
                            className="slide-content"
                            href="#"
                            >
                            <h3 />
                            <h2>
                                100.
                                <sub>
                                    5
                                </sub>
                            </h2>
                        </a>
                    </div>
                    <div className="slide">
                        <a
                            className="slide-content"
                            href="#"
                            >
                            <h3 />
                            <h2>
                                100.
                                <sub>
                                    5
                                </sub>
                            </h2>
                        </a>
                    </div>
                    <div className="slide">
                        <a
                            className="slide-content"
                            href="#"
                            >
                            <h3 />
                            <h2>
                                100.
                                <sub>
                                    5
                                </sub>
                            </h2>
                        </a>
                    </div>
                    <div className="slide">
                        <a
                            className="slide-content"
                            href="#"
                            >
                            <h3 />
                            <h2>
                                100.
                                <sub>
                                    5
                                </sub>
                            </h2>
                        </a>
                    </div>
                </Slider>
            </div>
        );
    });
    it('should cover account click fxn', () => {

        FinancialStoriesStore.getState.mockReturnValue({
            accountList: [
                {
                    name: 'Bcurrent',
                    "id": "05985dae-d2de-4ebc-ab0a-79093081bde5",
                },
                {
                    name: 'Bcurrent',
                    "id": "05985dae-d2de-4ebc-ab0a-79093081bde5",
                }
            ],
            accountDetails: { currentBalance: 100.50 }
        });
        component = TestUtils.renderIntoDocument(
            <AccountSummarySlider {...props}
                />
        );

        component.getSlide();
    });

    it('should cover account click fxn 1', () => {
        FinancialStoriesStore.getState.mockReturnValue({
            accountList: [],
            accountDetails: {}
        });
        component = TestUtils.renderIntoDocument(
            <AccountSummarySlider {...props}
                />
        );

        component.getSlide();
    });

 
    it('should cover account click fxn 2', () => {
        FinancialStoriesStore.getState.mockReturnValue({
            accountList: [
                {
                    name: 'Bcurrent',
                    "id": "05985dae-d2de-4ebc-ab0a-79093081bde5",
                },
                {
                    name: 'Bcurrent',
                    "id": "05985dae-d2de-4ebc-ab0a-79093081bde5",
                }
            ],
            accountDetails: { currentBalance: 100.50 }
        });
        component = TestUtils.renderIntoDocument(
            <AccountSummarySlider {...props}
                />
        );
        //component.afterChange(-1);
    });

    it('should cover account click fxn 3', () => {
        FinancialStoriesStore.getState.mockReturnValue({
            accountList: [
                {
                    name: 'Bcurrent',
                    "id": "05985dae-d2de-4ebc-ab0a-79093081bde5",
                    "type": 'current',
                    "counter": 0,

                },
                {
                    name: 'Bcurrent',
                    "id": "05985dae-d2de-4ebc-ab0a-79093081bde5",
                }
            ],
            accountDetails: { currentBalance: 100.50 }
        });
        component = TestUtils.renderIntoDocument(
            <AccountSummarySlider {...props}
                />
        );
        //component.afterChange(0);
    });

    it('should cover account click fxn 3', () => {
        FinancialStoriesStore.getState.mockReturnValue({
            accountList: [
                {
                    name: 'Bcurrent',
                    "id": "05985dae-d2de-4ebc-ab0a-79093081bde5",
                    "type": 'current',
                    "counter": 0,

                },
                {
                    name: 'Bcurrent',
                    "id": "05985dae-d2de-4ebc-ab0a-79093081bde5",
                }
            ],
            accountDetails: { currentBalance: 100.50 }
        });
        component = TestUtils.renderIntoDocument(
            <AccountSummarySlider {...props}
                />
        );
        component.nextSlide(0);
    });
});
