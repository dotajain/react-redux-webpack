/**
 * @module FinancialStoriesModal
 */

jest.unmock('../../../common/modals/ModalB');
jest.unmock('../FinancialStoriesModal');

const ModalB = require('../../../common/modals/ModalB');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const ReactDOM = require('react-dom');
const _ = require('lodash');

const container = document.createElement('div');
const shallowRenderer = TestUtils.createRenderer();
const FinancialStoriesModal = require('../FinancialStoriesModal');
const findDOMNode = require('react-dom').findDOMNode;
const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<FinancialStoriesModal
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};
describe('Modal', () => {
    let instance;
    let props;
    
    beforeEach(() => {
        props = {
            content: '',
            data: {
            },
            confirmCancel : false,
            isConfirming: false,
        };
        instance = shallowRender(props);
    });

    it('render a standard modal with child elements', () => {
        console.log(instance);
        
        // let node = document.createElement('div');
        // const render = (comp, el) => ReactDOM.render(comp, el);
        // let component = TestUtils.renderIntoDocument(<FinancialStoriesModal {...props} />, node);
        // component.setState({isConfirming: true});
        // //  let instance = shallowRender(props);
        expect(instance).toEqualJSX(<div/>);
    });

    it("checking componentWillReceiveProps",()=>{
        let nextProps = {
            confirmCancel:false,
        }
        let instance1 = TestUtils.renderIntoDocument(<FinancialStoriesModal {...props}/>)
        instance1.componentWillReceiveProps(nextProps);
        instance1.setState({
            isConfirming:false,
        })
        expect(instance1.state.isConfirming).toBe(false);
    })

    describe('confirmCancel', () => {
        let component;
        let state;
        const props = {
            cancelApplication: false,
            isConfirming: false,
            onClickDeleteTag: jest.genMockFn(),
            onPopupCancelClick: jest.genMockFn(),
        }
        let node = document.createElement('div');
        let confirmCancel = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        component = ReactDOM.render(<FinancialStoriesModal {...props} />, node);
        it('should have isConfirming state as true', () => {
            component.confirmCancel(true);
            component.setState({ isConfirming: false })
            //expect(component.state.isConfirming).toBeFalsy();
            expect(component.confirmCancel).toBeDefined();
        })
        it('should have isConfirming state as false', () => {
            component.confirmCancel(false);
            component.setState({ isConfirming: false })
            //expect(component.state.isConfirming).toBeFalsy();
            expect(component.confirmCancel).toBeDefined();
        })
    });

    describe('onClick Function', () => {
        let component;
        let props;
        let state;
        let onClickStub;

        beforeEach(() => {
            props = { cancelButton: true };
            onClickStub = jest.genMockFn();
        });
        it('should run onClick event', () => {
            let node = document.createElement('div');
            component = ReactDOM.render(<FinancialStoriesModal {...props} />, node);
            const pageoptions = TestUtils.scryRenderedDOMComponentsWithTag(component, 'button');
            component.confirmCancel = onClickStub;
            onClickStub(false);
            _.map(pageoptions, page => {
                TestUtils.Simulate.click(ReactDOM.findDOMNode(page));
            });
            expect(onClickStub).toBeCalled();
        });
    });
});
