'use strict';

jest.unmock('../HelpDemoComponent');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const BrowserUtils = require('../../../utils/BrowserUtils');
const { buildContent } = require('../../../__helpers__/TestHelpers');
const _ = require('lodash');
const shallowRenderer = TestUtils.createRenderer();

const HelpDemoComponent = require('../HelpDemoComponent');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<HelpDemoComponent
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};

describe('To run clickable fxn', () => {
    let component;
    let onClickStub;
    let props = {
        content: {
            DemoSkipButton: 'DemoSkipButton',
        },
    }

    beforeEach(() => {
        onClickStub = jest.genMockFn();

        component = TestUtils.renderIntoDocument(
            <HelpDemoComponent onClick={onClickStub} {...props}
                />
        )
        component.setState({ Go: true });
        component.setState({ index: 10 });
    });

    it('onClick fxn on click of div tag', () => {
        const pageoptions = TestUtils.scryRenderedDOMComponentsWithTag(component, 'div');
        component.onClick = onClickStub;

        onClickStub();
        _.map(pageoptions, page => {

            TestUtils.Simulate.click(page);
        });

        expect(onClickStub).toBeCalled();
    });


    it('closed fxn on click of div tag', () => {
        const pageoptions = TestUtils.scryRenderedDOMComponentsWithTag(component, 'div');
        component.closed = onClickStub;

        onClickStub();
        _.map(pageoptions, page => {

            TestUtils.Simulate.click(page);
        });

        expect(onClickStub).toBeCalled();
    });

    it('swipeLeft fxn covering if condition', () => {

        component.setState({ index: 10 });
        component.swipeLeft();
        expect(component.state.index).toBe(9);
    });


    it('swipeLeft fxn covering else condition', () => {

        component.swipeLeft();
        expect(component.state.index).toBe(9);
    });
    it('swipeLeft fxn covering else condition', () => {
        component.setState({ index: 0 });
        component.swipeLeft();
        expect(component.state.index).toBe(0);
    });

    it('swipeRight fxn covering if condition', () => {

        component.swipeRight();
        expect(component.state.Go).toBe(true);
    });

    it('swipeRight fxn covering else condition', () => {

        component.setState({ index: 0 });
        component.swipeRight();
        expect(component.state.index).toBe(1);
    });
    it('swipeRight fxn covering if condition mobile view', () => {

        component.setState({ index: 6 });
        BrowserUtils.getScreenSize.mockReturnValue({ x: 375, y: 450 });
        component.swipeRight();
        expect(component.state.Go).toBe(true);
    });

    xit('handleChangeIndex', () => {
        let index = 0;
        component.setState({ index: 10 });
        component.handleChangeIndex(index);

    });

    xit('handleChangeIndex', () => {
        let index = 10;
        component.setState({ index: 0 });
        component.handleChangeIndex(index);

    });


    xit('handleChangeMobileIndex', () => {
        let index = 0;
        component.setState({ index: 6 });
        component.handleChangeMobileIndex(index);

    });

    xit('handleChangeMobileIndex', () => {
        let index = 6;
        component.setState({ index: 0 });
        component.handleChangeMobileIndex(index);

    });



    describe('handleClick', () => {
        let component;
        let props;

        beforeEach(() => {
            props = {
                content: {
                    DemoSkipButton: 'DemoSkipButton',
                },
            };
        });

        it('should call the onClick', () => {
            BrowserUtils.getScreenSize.mockReturnValue({ x: 1024, y: 450 });
            let node = document.createElement('div');
            component = ReactDOM.render(<HelpDemoComponent {...props} />, node);
            component.setState({ index: 10 });

            component.demoText();
            component.closed();
            component.handleChangeIndex();


        });
        it('should call the onClick for mobile', () => {
            let node = document.createElement('div');
            component = ReactDOM.render(<HelpDemoComponent {...props} />, node);
            component.setState({ index: 10 });
            BrowserUtils.getScreenSize.mockReturnValue({ x: 375, y: 450 });
            component.demoText();

        });
    });

 describe('handleChangeMobileIndex', () => {
        let component;
        let props;

        beforeEach(() => {
            props = {
                content: {
                    DemoSkipButton: 'DemoSkipButton',
                },
            };
        });

        it('should call the onClick', () => {
            BrowserUtils.getScreenSize.mockReturnValue({ x: 1024, y: 450 });
            let node = document.createElement('div');
            component = ReactDOM.render(<HelpDemoComponent {...props} />, node);
            component.setState({ index: 6 });

            component.demoText();
            component.closed();
            component.handleChangeMobileIndex();


        });
        it('should call the onClick for mobile', () => {
            let node = document.createElement('div');
            component = ReactDOM.render(<HelpDemoComponent {...props} />, node);
            component.setState({ index: 6 });
            BrowserUtils.getScreenSize.mockReturnValue({ x: 375, y: 450 });
            component.demoText();

        });
    });

////////////////////////////////////////////////////////////////////////////////////
    describe('To cover remaining branch', () => {
        let component;
        let onClickStub;
        let props = {
            content: {
                DemoSkipButton: 'DemoSkipButton',
            },
        }

        beforeEach(() => {
            onClickStub = jest.genMockFn();

            component = TestUtils.renderIntoDocument(
                <HelpDemoComponent onClick={onClickStub} {...props}
                    />
            )
            component.setState({ Go: true });
        });

        it('onClick fxn on click of div tag', () => {
            const pageoptions = TestUtils.scryRenderedDOMComponentsWithTag(component, 'div');
            component.onClick = onClickStub;

            onClickStub();
            _.map(pageoptions, page => {

                TestUtils.Simulate.click(page);
            });

            expect(onClickStub).toBeCalled();
        });


        it('closed fxn on click of div tag', () => {
            const pageoptions = TestUtils.scryRenderedDOMComponentsWithTag(component, 'div');
            component.closed = onClickStub;

            onClickStub();
            _.map(pageoptions, page => {

                TestUtils.Simulate.click(page);
            });

            expect(onClickStub).toBeCalled();
        });
    });

});
