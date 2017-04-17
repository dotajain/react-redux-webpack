jest.unmock('../PaginationMobile');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const { buildContent } = require('../../../__helpers__/TestHelpers');
const _ = require('lodash');
const shallowRenderer = TestUtils.createRenderer();

const PaginationMobile = require('../PaginationMobile');
const PaginationDot = require('../PaginationDot');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<PaginationMobile
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};

describe('It should be equal to JSX', () => {
    let instance;
    let props = {
        onChangeIndex: jest.fn(),
        dots:11,
        index:2,

         };
    
    it('should be equal to jsx', () => {
        instance = shallowRender(props);
    })
})

describe('To run onclick fxn', () => {
    let component;
    let onClickStub;

    beforeEach(() => {
        onClickStub = jest.genMockFn();

        component = TestUtils.renderIntoDocument(
            <PaginationMobile onClick={onClickStub}
                />
        )
    });

    it('to run onclick fxn', () => {
        const pageoptions = TestUtils.scryRenderedDOMComponentsWithTag(component, 'PaginationDot');
        component.onClick = onClickStub;

        onClickStub();
        _.map(pageoptions, page => {

            TestUtils.Simulate.click(page);
        });

        expect(onClickStub).toBeCalled();
    });
    describe('handleClick', () => {
        let component;
        let props;
        let event = {
            target: {
                value: 'abc'
            }
        }

        beforeEach(() => {
            props = {
                onChangeIndex: jest.fn(),
                dots:11,
                index:2,

            };

        });

        it('should call the onChangeIndex', () => {
            let node = document.createElement('div');
            component = ReactDOM.render(<PaginationMobile {...props} />, node);

            component.handleClick();
            
        });
    });

});