'use strict';

jest.unmock('../NewPayeeComponent');

const NewPayeeComponent = require('../NewPayeeComponent');
const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<NewPayeeComponent
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};

describe('NewPayeeComponent Test Cases', () => {
    let props = {
        contents: {
            'newPayeeLink': 'newPayeeLink',
        },
    };
    beforeEach(() => {
        let instance = TestUtils.renderIntoDocument(<NewPayeeComponent {...props}/>);
    });
    it('should call handleNewPayee', () => {
        let instance = TestUtils.renderIntoDocument(<NewPayeeComponent {...props}/>);
        instance.handleNewPayee();
        expect(instance.handleNewPayee).toBeDefined();
    });
    it('should return button jsx', () => {
        let component = shallowRender(props);
        expect(component).toEqualJSX(
            <div
                className="account undefined open one-line"
                onClick={function noRefCheck() { } }
                >
                <h3>
                    newPayeeLink
                </h3>
            </div>
        );


    });



});