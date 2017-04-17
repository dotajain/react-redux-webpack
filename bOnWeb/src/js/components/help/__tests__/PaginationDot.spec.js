'use strict';

jest.unmock('../PaginationDot');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const { buildContent } = require('../../../__helpers__/TestHelpers');
const _ = require('lodash');
const shallowRenderer = TestUtils.createRenderer();

const PaginationDot = require('../PaginationDot');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<PaginationDot
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
            <PaginationDot onClick={onClickStub}
                />
        )
    });

    it('to run onclick fxn', () => {
        // const pageoptions = TestUtils.scryRenderedDOMComponentsWithTag(component, 'PaginationDot');
        const pageoptions = TestUtils.findRenderedDOMComponentWithClass(component, 'paginationSwipe');
        component.onClick = onClickStub;

        onClickStub();
        _.map(pageoptions, page => {

            TestUtils.Simulate.click(page);
        });

        expect(onClickStub).toBeCalled();
    });

    // xit('should compare the jsx', () => {
    //     console.log(styles.root)
    //     expect(component).toEqualJSX(<div style={styles.root}>

    //     </div>
    //     )
    // });
    

    describe('handleClick', () => {
        let event= 'event';
        let component;
        let props;

        beforeEach(() => {
            props = {
                onClick: jest.fn(),
                dots:11,
                index:2,
                active:'active',

            };

        });

        it('should call the onClick', () => {
            let node = document.createElement('div');
            component = ReactDOM.render(<PaginationDot {...props} />, node);

            component.handleClick(event);
             expect(component.props.onClick.mock.calls.length).toBe(1);

        });
    });

});

//  {children}