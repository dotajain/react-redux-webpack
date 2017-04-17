jest.unmock('../Pagination');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const { buildContent } = require('../../../__helpers__/TestHelpers');
const _ = require('lodash');
const shallowRenderer = TestUtils.createRenderer();

const Pagination = require('../Pagination');
const PaginationDot = require('../PaginationDot');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<Pagination
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};

describe('To run onclick fxn', () => {
    let component;
    let onClickStub;

    beforeEach(() => {
        onClickStub = jest.genMockFn();

        component = TestUtils.renderIntoDocument(
            <Pagination onClick={onClickStub}
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

        beforeEach(() => {
            props = {
                onChangeIndex: jest.fn(),
                dots:11,
                index:2,

            };

        });

        it('should call the onChangeIndex', () => {
            let node = document.createElement('div');
            component = ReactDOM.render(<Pagination {...props} />, node);

            component.handleClick();
             expect(component.props.onChangeIndex.mock.calls.length).toBe(1);

        });
    });

});