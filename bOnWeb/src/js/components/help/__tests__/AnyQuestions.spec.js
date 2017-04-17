/**
 * @test AnyQuestions
 */
jest.unmock('../AnyQuestions');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const { buildContent } = require('../../../__helpers__/TestHelpers');
const ReactDOM = require('react-dom');
const AnyQuestions = require('../AnyQuestions');
const _ = require('lodash');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<AnyQuestions {...props} />);
    return shallowRenderer.getRenderOutput();
};

describe('User will get FAQ page by Any Questions', () => {
    const contentBody = buildContent(['FaqDone']);
    let instance;
    const content = {
        FaqDone: 'PropTypes.string.isRequired',
    };
    beforeEach(() => {
        instance = TestUtils.renderIntoDocument(
            <AnyQuestions
                content={content}
                />
        );
    });

    describe('customer registration page', () => {
        let component;
        let props;
        let onClickRefresh;


        beforeEach(() => {
            onClickRefresh = jest.genMockFn();
            component = TestUtils.renderIntoDocument(
                <AnyQuestions onClick={onClickRefresh}	content={content}
                    />
            );
            component.setState({ iframe: '<iframe width="100%" style="border: none;" src="https://help.cybonline.co.uk/system/selfservice.controller?CONFIGURATION=1109&PARTITION_ID=1&CMD=STARTPAGE&USERTYPE=1&isSecure=true&isSecure=true&LANGUAGE=en&COUNTRY=us" height="760" cellspacing="5" id="iframe"></iframe>' });
        });

        it('it returns the FAQ Page of the application', () => {
            expect(contentBody.FaqDone.length).toBe(7);
        });
    });
    describe('To check back Function', () => {
        let instance;

        let vari = {
            window: {
                history: {
                    length: "11"
                }
            }
        }

        let props = {
            back: jest.genMockFn(),
            content: {

            },
            window: {
                history: {
                    length: "10"
                }
            }
        };
        it('calls for the back function', () => {
            let node = document.createElement('div');
            let back = jest.genMockFn();
            const render = (comp, el) => ReactDOM.render(comp, el);
            instance = ReactDOM.render(<AnyQuestions {...props} />, node);
            instance.setState({ length: 10 });
            instance.setState({ vari: 10 });
            instance.setState({ backClick: 1 });
            instance.back();
        });
        it('calls for the back function', () => {
            let node = document.createElement('div');
            let back = jest.genMockFn();
            const render = (comp, el) => ReactDOM.render(comp, el);
            instance = ReactDOM.render(<AnyQuestions {...props} />, node);
            instance.setState({ length: 10 });
            instance.setState({ vari: 11 });
            instance.setState({ backClick: 1 });
            instance.back();
        });
        it('calls for the back function', () => {
            let node = document.createElement('div');
            let back = jest.genMockFn();
            const render = (comp, el) => ReactDOM.render(comp, el);
            instance = ReactDOM.render(<AnyQuestions {...props} />, node);
            instance.setState({ length: 1 });
            instance.setState({ vari: 11 });
            instance.setState({ backClick: 0 });
            instance.back();
        });
    });
    describe('To check forward Function', () => {
        let instance;
        let props = {
            forward: jest.genMockFn(),
            content: {
            },
            window: {
                history: {
                    go: "+1"
                }
            }
        };

        it('calls for the rowClick1 function', () => {
            let node = document.createElement('div');
            let forward = jest.genMockFn();
            const render = (comp, el) => ReactDOM.render(comp, el);
            instance = ReactDOM.render(<AnyQuestions {...props} />, node);
            instance.setState({ backClick: 10 })
            instance.forward();
        });
        it('calls for the rowClick2 function', () => {
            let node = document.createElement('div');
            let forward = jest.genMockFn();
            const render = (comp, el) => ReactDOM.render(comp, el);
            instance = ReactDOM.render(<AnyQuestions {...props} />, node);
            instance.setState({ backClick: 0 })
            instance.forward();
        });
    });


 describe('To check refresh Function', () => {
        let instance;

        let vari = {
            window: {
                history: {
                    length: "11"
                }
            }
        }

        let props = {
            back: jest.genMockFn(),
            content: {

            },
            window: {
                history: {
                    length: "10"
                }
            }
        };

         it('calls for the back function name = load', () => {
            let node = document.createElement('div');
            let back = jest.genMockFn();
            const render = (comp, el) => ReactDOM.render(comp, el);
            instance = ReactDOM.render(<AnyQuestions {...props} />, node);
            instance.setState({ name: 'load' });
            instance.refresh();
        });

         it('calls for the back function where name != load', () => {
            let node = document.createElement('div');
            let back = jest.genMockFn();
            const render = (comp, el) => ReactDOM.render(comp, el);
            instance = ReactDOM.render(<AnyQuestions {...props} />, node);
            instance.setState({ name: '' });
            instance.refresh();
        });

        it('calls for the back function', () => {
            let node = document.createElement('div');
            let back = jest.genMockFn();
            const render = (comp, el) => ReactDOM.render(comp, el);
            instance = ReactDOM.render(<AnyQuestions {...props} />, node);
            instance.setState({ length: 10 });
            instance.setState({ vari: 10 });
            instance.setState({ backClick: 1 });
            instance.back();
        });
        it('calls for the back function', () => {
            let node = document.createElement('div');
            let back = jest.genMockFn();
            const render = (comp, el) => ReactDOM.render(comp, el);
            instance = ReactDOM.render(<AnyQuestions {...props} />, node);
            instance.setState({ length: 10 });
            instance.setState({ vari: 11 });
            instance.setState({ backClick: 1 });
            instance.back();
        });
        it('calls for the back function', () => {
            let node = document.createElement('div');
            let back = jest.genMockFn();
            const render = (comp, el) => ReactDOM.render(comp, el);
            instance = ReactDOM.render(<AnyQuestions {...props} />, node);
            instance.setState({ length: 1 });
            instance.setState({ vari: 11 });
            instance.setState({ backClick: 0 });
            instance.back();
        });
    });




















    
//  it('calls for the loadNewPayee BrowserUtils if  function', () => {
//         BrowserUtils.isMobileView.mockReturnValue(true);
//         instance.setState({ isOpen: false });
//         let node = document.createElement('div');
//         instance.loadNewPayee();
//     });













});
