
jest.unmock('../HeaderComponent');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const ReactDOM = require('react-dom');
const HeaderComponent = require('../HeaderComponent');
const LableWithIconComponent = require('../LableWithIconComponent');
const shallowRenderer = TestUtils.createRenderer();
const PageOverlayMenu = require('../PageOverlayMenu');
const MobileOverlay = require('../../common/MobileOverlay');


describe("to check the header component", () => {
    let instance
    const content = {
    };
    beforeEach(() => {

        shallowRenderer.render(<HeaderComponent {...content} />);
        instance = shallowRenderer.getRenderOutput();
    });
    it('should render HeaderComponent', () => {

        expect(instance).toEqualJSX(
            <header className={null} role="navigation">
                <div className="navigation main">
                    <ul className="">
                        <LableWithIconComponent
                            lableName="You"
                            alt="you"
                            onClick={jest.fn() }
                            className = ""
                            />
                        <LableWithIconComponent
                            lableName="Payments"
                            alt="payments"
                            onClick={jest.fn() }
                            className = ""
                            />
                        <LableWithIconComponent
                            lableName="Spending"
                            alt="spending"
                            onClick={jest.fn() }
                            className = ""
                            />
                        <LableWithIconComponent
                            lableName="Savings Pots"
                            alt="goals"
                            onClick={jest.fn() }
                            className = ""
                            />
                        <LableWithIconComponent
                            lableName="Alerts"
                            alt="alerts"
                            onClick={jest.fn() }
                            className = ""
                            />
                        <LableWithIconComponent
                            lableName="Help"
                            alt="helps"
                            onClick={jest.fn() }
                            className = ""
                            />
                        <MobileOverlay
                            content={undefined}
                            openFaq={undefined}
                            selectedTab="desktop"
                            getHeaderClass={function noRefCheck() {}}
                            />
                    </ul>
                </div>
            </header>
        )
    });

    it('should check you', () => {
        let content = {
            selectedTab: "you",
        }
        shallowRenderer.render(<HeaderComponent {...content} />);
        instance = shallowRenderer.getRenderOutput();

    });

    it('should check payments', () => {
        let content = {
            selectedTab: "payments",
        }
        shallowRenderer.render(<HeaderComponent {...content} />);
        instance = shallowRenderer.getRenderOutput();

    });
    it('should check spending', () => {
        let content = {
            selectedTab: "spending",
        }
        shallowRenderer.render(<HeaderComponent {...content} />);
        instance = shallowRenderer.getRenderOutput();

    });
    it('should check savingpots', () => {
        let content = {
            selectedTab: "savingpots",
        }
        shallowRenderer.render(<HeaderComponent {...content} />);
        instance = shallowRenderer.getRenderOutput();

    });
    it('should check alerts', () => {
        let content = {
            selectedTab: "alerts",
        }
        shallowRenderer.render(<HeaderComponent {...content} />);
        instance = shallowRenderer.getRenderOutput();

    });
    it('should check help', () => {
        let content = {
            selectedTab: "help",
        }
        shallowRenderer.render(<HeaderComponent {...content} />);
        instance = shallowRenderer.getRenderOutput();

    });

    it('should alert for you', () => {
        let content = {
            selectedTab: "You",
        }
       	let instance = TestUtils.renderIntoDocument(
            <HeaderComponent {...content} />
        );

        const a = 'You'
        instance.headerTab(a);
        // expect(instance.alertMessage).toBeCalled();

    });

    it('should alert for Payments', () => {
        let content = {
            selectedTab: "payments",
        }
       	let instance = TestUtils.renderIntoDocument(
            <HeaderComponent {...content} />
        );

        instance.headerTab('Payments');
    });
    it('should alert for Spending', () => {
        let content = {
            selectedTab: "spending",
        }
       	let instance = TestUtils.renderIntoDocument(
            <HeaderComponent {...content} />
        );

        instance.headerTab("Spending");
    });
    it('should alert for Saving Pots', () => {
        let content = {
            selectedTab: "Savings Pots",
        }

       	let instance = TestUtils.renderIntoDocument(
            <HeaderComponent {...content} />
        );

        const a = 'You'
        instance.headerTab("Savings Pots");
    });
    it('should alert for Alerts', () => {
        let content = {
            selectedTab: "help",
        }

       	let instance = TestUtils.renderIntoDocument(
            <HeaderComponent {...content} />
        );

        const a = 'You'
        instance.headerTab("Alerts");
    });
    it('should alert for Help', () => {
        let content = {
            selectedTab: "help",
        }

       	let instance = TestUtils.renderIntoDocument(
            <HeaderComponent {...content} />
        );

        const a = 'You'
        instance.headerTab("Help");
    });

    it('should alert for Logout', () => {
        let content = {
            selectedTab: "help",
        }

       	let instance = TestUtils.renderIntoDocument(
            <HeaderComponent {...content} />
        );

        const a = 'You'
        instance.headerTab("Logout");
    });



});

