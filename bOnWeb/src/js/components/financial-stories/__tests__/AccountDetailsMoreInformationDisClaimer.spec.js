'use strict';

jest.unmock('../AccountDetailsMoreInformationDisClaimer');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');


const AccountDetailsMoreInformationDisClaimer = require('../AccountDetailsMoreInformationDisClaimer');
const Panel = require('react-bootstrap/lib/Panel');

const _ = require('lodash');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<AccountDetailsMoreInformationDisClaimer
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};

describe('customer registration page', () => {
    let props;


    it('should compare jsx', () => {
        let instance = shallowRender(props);
        expect(instance).toEqualJSX(
            <div>
                <p>
                <br />
                </p>
            </div>
        )
    });
});
