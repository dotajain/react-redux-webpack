'use strict';

jest.unmock('../HelpPage');

const React = require('react');
const Helmet = require('react-helmet');
const HeaderComponent = require('../../common/HeaderComponent');
const ModalComponent = require('../../common/modals/ModalComponent');
const HelpPanel = require('../HelpPanel');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const { buildContent } = require('../../../__helpers__/TestHelpers');
const _ = require('lodash');
const shallowRenderer = TestUtils.createRenderer();
const BrowserUtils = require('../../../utils/BrowserUtils');
const HelpPage = require('../HelpPage');
const Talk = require('../Talk');
const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<HelpPage
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};

describe('To run clickable fxn', () => {
    let component;
    let onClickStub;
    let props = {
        content: {
        },
    }

    beforeEach(() => {
        onClickStub = jest.genMockFn();

        component = TestUtils.renderIntoDocument(
            <HelpPage onClick={onClickStub} {...props}
                />
        )
    });

    it('closed fxn on click of Talk tag', () => {
        const pageoptions = TestUtils.scryRenderedDOMComponentsWithTag(component, 'Talk');
        component.onClick = onClickStub;

        onClickStub();
        _.map(pageoptions, page => {

            TestUtils.Simulate.click(page);
        });

        expect(onClickStub).toBeCalled();
    });

    describe('calling functions', () => {
        let component;
        let props;
        let nextProps;

        beforeEach(() => {
            props = {
                content: {
                    HelpPageHeading: 'HelpPageHeading'
                }
            };

            nextProps = {
                confirmCancel: 'true'
            }


        });

        it('should call the confirmCancel fxn', () => {
            let node = document.createElement('div');
            component = ReactDOM.render(<HelpPage {...props} />, node);
            component.confirmCancel();
            expect(component.state.isConfirming).toBe(false);

        });

        it('should call the closed fxn', () => {
            let node = document.createElement('div');
            component = ReactDOM.render(<HelpPage {...props} />, node);
            component.closed();
            expect(component.state.confirmCancel).toBe(false);

        });

        it('should call the HelpModal fxn', () => {
            let node = document.createElement('div');
            component = ReactDOM.render(<HelpPage {...props} />, node);
            component.HelpModal();
        });

        it('should call the renderMobileHelp fxn for Talk', () => {
            let node = document.createElement('div');
            component = ReactDOM.render(<HelpPage {...props} />, node);
            component.setState({ HelpContent: 'Talk' });
            component.renderMobileHelp();
        });

        it('should call the renderMobileHelp fxn for Email', () => {
            let node = document.createElement('div');
            component = ReactDOM.render(<HelpPage {...props} />, node);
            component.setState({ HelpContent: 'Email' });
            component.renderMobileHelp();
        });

        it('should call the renderMobileHelp fxn for About B', () => {
            let node = document.createElement('div');
            component = ReactDOM.render(<HelpPage {...props} />, node);
            component.setState({ HelpContent: 'About B' });
            component.renderMobileHelp();
        });

        it('should call the renderMobileHelp fxn for Demo', () => {
            let node = document.createElement('div');
            component = ReactDOM.render(<HelpPage {...props} />, node);
            component.setState({ Demo: true });
            component.renderMobileHelp();
        });

        it('should call the renderMobileHelp fxn for Any questions?', () => {
            let node = document.createElement('div');
            component = ReactDOM.render(<HelpPage {...props} />, node);
            component.setState({ 'Any questions?': true });
            component.renderMobileHelp();
        });

        it('should call the renderMobileHelp fxn for renderHelp', () => {
            let node = document.createElement('div');
            component = ReactDOM.render(<HelpPage {...props} />, node);
            component.renderHelp();
        });



        it('should call the HelpModal fxn for Talk covering else condition', () => {
            let node = document.createElement('div');
            component = ReactDOM.render(<HelpPage {...props} />, node);
            component.HelpModal('Talk');
        });



        it('should call the HelpModal fxn for Email else condition', () => {
            let node = document.createElement('div');
            component = ReactDOM.render(<HelpPage {...props} />, node);
            component.HelpModal('Email');
        });



        it('should call the HelpModal fxn for Any question?', () => {
            let node = document.createElement('div');
            component = ReactDOM.render(<HelpPage {...props} />, node);
            component.HelpModal('Any questions?');
        });

        it('should call the HelpModal fxn for Demo', () => {
            let node = document.createElement('div');
            component = ReactDOM.render(<HelpPage {...props} />, node);
            component.HelpModal('Demo');
        });

        it('should call the HelpModal fxn for About B for else condition', () => {
            let node = document.createElement('div');
            component = ReactDOM.render(<HelpPage {...props} />, node);
            component.HelpModal('About B');
        });

        it('should call the HelpModal fxn for T&Cs', () => {
            let node = document.createElement('div');
            component = ReactDOM.render(<HelpPage {...props} />, node);
            component.HelpModal('T&Cs');
        });

        it('should call the HelpModal fxn for Protecting your money', () => {
            let node = document.createElement('div');
            component = ReactDOM.render(<HelpPage {...props} />, node);
            component.HelpModal('Protecting your money');
        });

        it('should call the componentWillReceiveProps fxn', () => {
            let node = document.createElement('div');
            component = ReactDOM.render(<HelpPage nextProps={nextProps}  {...props} />, node);
             component.setState({ confirmCancel: true });
            component.componentWillReceiveProps(nextProps);
        });
        
        it('should call the HelpModal fxn for Talk covering if condition', () => {
            let node = document.createElement('div');
            component = ReactDOM.render(<HelpPage {...props} />, node);
            BrowserUtils.getScreenSize.mockReturnValue({ x: 10 });
            component.HelpModal('Talk');
        });

        it('should call the HelpModal fxn for Email if condition', () => {
            let node = document.createElement('div');
            component = ReactDOM.render(<HelpPage {...props} />, node);
            BrowserUtils.getScreenSize.mockReturnValue({ x: 10 });
            component.HelpModal('Email');
        });

        it('should call the HelpModal fxn for About B for else condition', () => {
            let node = document.createElement('div');
            component = ReactDOM.render(<HelpPage {...props} />, node);
            BrowserUtils.getScreenSize.mockReturnValue({ x: 10 });
            component.HelpModal('About B');
        });

        it('should call the isMobileDevice fxn', () => {
            let node = document.createElement('div');
            component = ReactDOM.render(<HelpPage {...props} />, node);
            BrowserUtils.getScreenSize.mockReturnValue({ x: 10 });
            component.isMobileDevice();
        });
        
        it('should call the openFaq fxn', () => {
            let node = document.createElement('div');
            component = ReactDOM.render(<HelpPage nextProps={nextProps}  {...props} />, node);
             component.setState({ AnyQuestion: true });
            component.openFaq();

   });

        describe("to check the header component", () => {
            let instance;
            let props;
            const content = {
            };
            beforeEach(() => {
                props = {
                    content: {
                        HelpPageHeading: 'HelpPageHeading'
                    }
                };

                shallowRenderer.render(<HelpPage {...props} />);
                instance = shallowRenderer.getRenderOutput();
            });
            xit('should render HelpPage', () => {
                BrowserUtils.getScreenSize.mockReturnValue({ x: 10 });
                expect(instance).toEqualJSX(
                    <div>
                        <div className="b container-fluid-full">
                            <Helmet title="HelpPage" />
                            <HeaderComponent
                                content={{ HelpPageHeading: 'HelpPageHeading' }}
                                selectedTab="help"
                                />
                            <div className="main-container">
                                <ModalComponent
                                    bsSize="medium"
                                    closed={function noRefCheck() { } }
                                    confirmCancel={false}
                                    helpConent=""
                                    style=""
                                    title={undefined}
                                    />
                                <div className="scroll-wrapper no-scroll">
                                    <div className="row help content-wrapper">
                                        <h3 className="text-center">
                                            HelpPageHeading
                                        </h3>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <HelpPanel
                                                content={{ HelpPageHeading: 'HelpPageHeading' }}
                                                onClick={function noRefCheck() { } }
                                                panelLine={undefined}
                                                panelName="Talk"
                                                src="icon icon-help-talk"
                                                />
                                            <HelpPanel
                                                content={{ HelpPageHeading: 'HelpPageHeading' }}
                                                onClick={function noRefCheck() { } }
                                                panelContent="Send your feedback"
                                                panelLine={undefined}
                                                panelName="Email"
                                                src="icon icon-help-email"
                                                />
                                            <HelpPanel
                                                content={{ HelpPageHeading: 'HelpPageHeading' }}
                                                onClick={function noRefCheck() { } }
                                                panelLine={undefined}
                                                panelName="Any questions?"
                                                src="icon icon-help-questions"
                                                />
                                            <HelpPanel
                                                content={{ HelpPageHeading: 'HelpPageHeading' }}
                                                onClick={function noRefCheck() { } }
                                                panelLine={undefined}
                                                panelName="Demo"
                                                src="icon icon-help-demo"
                                                />
                                            <HelpPanel
                                                content={{ HelpPageHeading: 'HelpPageHeading' }}
                                                onClick={function noRefCheck() { } }
                                                panelLine={undefined}
                                                panelName="About B"
                                                src="icon icon-help-reminders"
                                                />
                                            <HelpPanel
                                                content={{ HelpPageHeading: 'HelpPageHeading' }}
                                                onClick={function noRefCheck() { } }
                                                panelLine={undefined}
                                                panelName="T&Cs"
                                                src="icon icon-case"
                                                />
                                            <HelpPanel
                                                content={{ HelpPageHeading: 'HelpPageHeading' }}
                                                onClick={function noRefCheck() { } }
                                                panelLine={undefined}
                                                panelName="Protecting your money"
                                                src="icon icon-fscs"
                                                />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                )
            });

            xit('should check Talk', () => {

                let props = {
                    content: {
                        HelpPageHeading: 'HelpPageHeading',
                        talkLine: 'Talk',
                    }
                };

                let content = {
                    talkLine: 'Talk',
                }

                shallowRenderer.render(<HelpPage content={content} {...props}/>);
                instance = shallowRenderer.getRenderOutput();
                instance.HelpModal('Talk')

            });


        });

    });

});
