jest.unmock('../AlertSweepModal');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const ReactDOM = require('react-dom');
const Modal = require('../../common/modals/Modal');
const BasicModal = require('../../common/modals/ModalB');
const { PropTypes } = React;
const AlertSweepModal = require('../AlertSweepModal');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<AlertSweepModal
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};

describe('AlertSweepModal Test Cases check', () => {
    let instance;
    let props;
    beforeEach(() => {
        props = {

            content: {

            },
            data: {
            },
        }
        instance = shallowRender(props);
    });

    it('render a standard modal with child elements', () => {
        instance = shallowRender(props);
        expect(instance).toEqualJSX(
            <div></div>
        )
    });

    describe('To check confirmCancel Function', () => {
        let instance;
        let props = {
            confirmCancel: jest.genMockFn(),
            closePopup: jest.fn(),
            isConfirming: false,
            content: {

            },
        };
        it('calls for the confirmCancel function', () => {
            let node = document.createElement('div');
            let confirmCancel = jest.genMockFn();
            const render = (comp, el) => ReactDOM.render(comp, el);
            instance = ReactDOM.render(<AlertSweepModal {...props} />, node);
            instance.setState({ isConfirming: false })
            instance.confirmCancel();
        });
    });

    describe('To check sendDeleteData Function', () => {
        let instance;
        let props = {
            sendDeleteData: jest.genMockFn(),
            deleteData: jest.fn(),
            content: {

            },
        };
        it('calls for the sendDeleteData function', () => {
            let node = document.createElement('div');
            let sendDeleteData = jest.genMockFn();
            const render = (comp, el) => ReactDOM.render(comp, el);
            instance = ReactDOM.render(<AlertSweepModal {...props} />, node);
            instance.sendDeleteData();
        });
    });

    describe('To check componentWillReceiveProps Function', () => {
        let instance;
        let props = {
            componentWillReceiveProps: jest.genMockFn(),
            isConfirming: jest.fn(),
            content: {

            },
        };
        it('calls for the componentWillReceiveProps function', () => {
            let node = document.createElement('div');
            let componentWillReceiveNextProps = jest.genMockFn();
            const render = (comp, el) => ReactDOM.render(comp, el);
            instance = ReactDOM.render(<AlertSweepModal {...props} />, node);
            instance.componentWillReceiveProps(true);
        });
    });

    describe('To check popups Function', () => {
        let instance;
        let props = {
            name: 'info',
            componentWillReceiveProps: jest.genMockFn(),
            isConfirming: jest.fn(),
            content: {

            },
        };
        it('calls for the componentWillReceiveProps function', () => {
            let node = document.createElement('div');
            let popUps = jest.genMockFn();
            const render = (comp, el) => ReactDOM.render(comp, el);
            instance = ReactDOM.render(<AlertSweepModal {...props} />, node);
            instance.popUps();
        });
    });

    describe('To check popups Function', () => {
        let instance;
        let props = {
            name: 'createSweep',
            componentWillReceiveProps: jest.genMockFn(),
            isConfirming: jest.fn(),
            content: {

            },
        };
        it('calls for the componentWillReceiveProps function', () => {
            let node = document.createElement('div');
            let popUps = jest.genMockFn();
            const render = (comp, el) => ReactDOM.render(comp, el);
            instance = ReactDOM.render(<AlertSweepModal {...props} />, node);
            instance.popUps();
        });
    });

    describe('To check popups Function', () => {
        let instance;
        let props = {
            name: 'createAlert',
            componentWillReceiveProps: jest.genMockFn(),
            isConfirming: jest.fn(),
            content: {

            },
        };
        it('calls for the componentWillReceiveProps function', () => {
            let node = document.createElement('div');
            let popUps = jest.genMockFn();
            const render = (comp, el) => ReactDOM.render(comp, el);
            instance = ReactDOM.render(<AlertSweepModal {...props} />, node);
            instance.popUps();
        });
    });

    describe('To check popups Function', () => {
        let instance;
        let props = {
            name: 'editSweep',
            componentWillReceiveProps: jest.genMockFn(),
            isConfirming: jest.fn(),
            content: {

            },
        };
        it('calls for the componentWillReceiveProps function', () => {
            let node = document.createElement('div');
            let popUps = jest.genMockFn();
            const render = (comp, el) => ReactDOM.render(comp, el);
            instance = ReactDOM.render(<AlertSweepModal {...props} />, node);
            instance.popUps();
        });
    });

    describe('To check popups Function', () => {
        let instance;
        let props = {
            name: 'editAlert',
            componentWillReceiveProps: jest.genMockFn(),
            isConfirming: jest.fn(),
            content: {

            },
        };
        it('calls for the componentWillReceiveProps function', () => {
            let node = document.createElement('div');
            let popUps = jest.genMockFn();
            const render = (comp, el) => ReactDOM.render(comp, el);
            instance = ReactDOM.render(<AlertSweepModal {...props} />, node);
            instance.popUps();
        });
    });

    describe('To check popups Function', () => {
        let instance;
        let props = {
            name: 'deleteSweep',
            componentWillReceiveProps: jest.genMockFn(),
            isConfirming: jest.fn(),
            content: {

            },
        };
        it('calls for the componentWillReceiveProps function', () => {
            let node = document.createElement('div');
            let popUps = jest.genMockFn();
            const render = (comp, el) => ReactDOM.render(comp, el);
            instance = ReactDOM.render(<AlertSweepModal {...props} />, node);
            instance.popUps();
        });
    });

    describe('To check popups Function', () => {
        let instance;
        let props = {
            name: 'delete',
            componentWillReceiveProps: jest.genMockFn(),
            isConfirming: jest.fn(),
            content: {

            },
        };
        it('calls for the componentWillReceiveProps function', () => {
            let node = document.createElement('div');
            let popUps = jest.genMockFn();
            const render = (comp, el) => ReactDOM.render(comp, el);
            instance = ReactDOM.render(<AlertSweepModal {...props} />, node);
            instance.popUps();
        });
    });

    describe('To check popups Function', () => {
        let instance;
        let props = {
            name: 'notDeleted',
            componentWillReceiveProps: jest.genMockFn(),
            isConfirming: jest.fn(),
            content: {

            },
        };
        it('calls for the componentWillReceiveProps function', () => {
            let node = document.createElement('div');
            let popUps = jest.genMockFn();
            const render = (comp, el) => ReactDOM.render(comp, el);
            instance = ReactDOM.render(<AlertSweepModal {...props} />, node);
            instance.popUps();
        });
    });
    describe('To check popups Function', () => {
        let instance;
        let props = {
            name: 'sweepModal',
            componentWillReceiveProps: jest.genMockFn(),
            isConfirming: jest.fn(),
            content: {

            },
        };
        it('calls for the componentWillReceiveProps function', () => {
            let node = document.createElement('div');
            let popUps = jest.genMockFn();
            const render = (comp, el) => ReactDOM.render(comp, el);
            instance = ReactDOM.render(<AlertSweepModal {...props} />, node);
            instance.popUps();
        });
    });

    describe('To check popups Function', () => {
        let instance;
        let props = {
            name: 'alertModal',
            componentWillReceiveProps: jest.genMockFn(),
            isConfirming: jest.fn(),
            content: {

            },
        };
        it('calls for the componentWillReceiveProps function', () => {
            let node = document.createElement('div');
            let popUps = jest.genMockFn();
            const render = (comp, el) => ReactDOM.render(comp, el);
            instance = ReactDOM.render(<AlertSweepModal {...props} />, node);
            instance.popUps();
        });
    });

    describe('To check popups Function', () => {
        let instance;
        let props = {
            name: 'cnfrmDel',
            componentWillReceiveProps: jest.genMockFn(),
            isConfirming: jest.fn(),
            content: {

            },
        };
        it('calls for the componentWillReceiveProps function', () => {
            let node = document.createElement('div');
            let popUps = jest.genMockFn();
            const render = (comp, el) => ReactDOM.render(comp, el);
            instance = ReactDOM.render(<AlertSweepModal {...props} />, node);
            instance.popUps();
        });
    });

    describe('To check popups Function', () => {
        let instance;
        let props = {
            name: 'someTechnicalError',
            message: 'true',
            quoteID: '1234',
            errorResponse: {
                error: {
                    message: 'sssss',
                    quoteID: 'sdwwdwd'

                }
            },
            componentWillReceiveProps: jest.genMockFn(),
            isConfirming: jest.fn(),
            content: {

            },
        };
        it('calls for the componentWillReceiveProps function', () => {
            let node = document.createElement('div');
            let popUps = jest.genMockFn();
            const render = (comp, el) => ReactDOM.render(comp, el);
            instance = ReactDOM.render(<AlertSweepModal {...props} />, node);
            instance.popUps();
        });
    describe('To check popups Function', () => {
            let instance;
            let props = {
                name: 'someTechnicalError',
                message: 'true',
                quoteID: '1234',
                errorResponse:false,
                componentWillReceiveProps: jest.genMockFn(),
                isConfirming: jest.fn(),
                content: {

                },
            };
            it('calls for the componentWillReceiveProps function', () => {
                let node = document.createElement('div');
                let popUps = jest.genMockFn();
                const render = (comp, el) => ReactDOM.render(comp, el);
                instance = ReactDOM.render(<AlertSweepModal {...props} />, node);
                instance.popUps();
            });

        });

    });
});
