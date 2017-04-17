'use strict';

jest.unmock('../ProjectionDemoGo');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');


const ProjectionDemoGo = require('../ProjectionDemoGo');
const Panel = require('react-bootstrap/lib/Panel');

const _ = require('lodash');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<ProjectionDemoGo
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};

describe('customer registration page', () => {
    let props;
    

    it('should compare jsx', () => {
        let instance = shallowRender(props);
        expect(instance).toEqualJSX(
            <div className="go">
                <div className="row">
                    <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1 padding-top text-center">
                        <h1>
                            Ready? Go
                        </h1>
                        <a
                            className="help_btn"
                            onClick={undefined}
                            >
                            Done
                        </a>
                    </div>
                </div>
            </div>
        )
    });
});