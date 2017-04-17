'use strict';

jest.unmock('../AccountDetailsDotPattern');

const React = require('react');
const { PropTypes } = React;
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');


const AccountDetailsDotPattern = require('../AccountDetailsDotPattern');

const _ = require('lodash');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<AccountDetailsDotPattern
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};

describe('customer registration page', () => {
    let component;
    let props = {
        activeClassIndex: '',
        accountClick: jest.fn(),
        index: '',
        data : {
            id : '',
            type : '',
        },

    };
    beforeEach(() => {
        component = TestUtils.renderIntoDocument(
            <AccountDetailsDotPattern 	{...props}
                />
        );
    });

    it('should cover account click fxn', () => {

		component.accountClick();
		// expect(component.state.cancelFlag).toBe(false);
	});




    it('should compare jsx', () => {
        let props = {
            activeClassIndex: 'hello',
            accountClick: '',
            index: ''

        };
        let instance = shallowRender(props);
        expect(instance).toEqualJSX(
            <li
                className=""
                onClick={function noRefCheck() { } }
                />
        );
    });

    it('should compare jsx', () => {
        let instance = shallowRender(props);
        expect(instance).toEqualJSX(
            <li
                className="active"
                onClick={function noRefCheck() { } }
                />
        );
    });
});
