'use strict';

jest.unmock('../AccountDetailsMoreInformation');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');


const AccountDetailsMoreInformation = require('../AccountDetailsMoreInformation');
const Panel = require('react-bootstrap/lib/Panel');

const _ = require('lodash');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<AccountDetailsMoreInformation
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};

describe('Account Details MoreInformation page', () => {


    it('should compare jsx', () => {
        let props = {
            accountInformation: {
                amount: 100,
                value: 100.29,
            }
        };
        let instance = shallowRender(props);
        expect(instance).toEqualJSX(
            <li>
                <span className="float-left" />
                <span className="float-right">
                    <div dangerouslySetInnerHTML={{__html: '<b>100</b>.<sub>29</sub>'}} />
                    <span className="pence-s" />
                </span>
            </li>
        )
    });

    it('should compare jsx after decimal', () => {
        let props = {
           accountInformation: {
                amount: 100,
                value: 100,
            }
        };
        let instance = shallowRender(props);
        expect(instance).toEqualJSX(
            <li>
                <span className="float-left" />
                <span className="float-right">
                    <div dangerouslySetInnerHTML={{__html: '<b>100</b>.<sub>00</sub>'}} />
                    <span className="pence-s" />
                </span>
            </li>
        )
    });

    it('should compare jsx passing 0 value for amount', () => {
        let props = {
            accountInformation: {
                amount: 0,
            }
        };
        let instance = shallowRender(props);
        expect(instance).toEqualJSX(
            <li>
                <span className="float-left" />
                <span className="float-right">
                    <span className="pence-s" />
                </span>
            </li>
        )
    });
});
