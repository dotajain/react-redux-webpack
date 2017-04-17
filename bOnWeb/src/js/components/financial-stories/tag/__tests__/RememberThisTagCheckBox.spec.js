/**
 * @module RememberThisTagCheckBox
 */

jest.unmock('../RememberThisTagCheckBox');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const ReactDOM = require('react-dom');
const Toggle = require('../../../common/Toggle');

const container = document.createElement('div');
const shallowRenderer = TestUtils.createRenderer();
const RememberThisTagCheckBox = require('../RememberThisTagCheckBox');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<RememberThisTagCheckBox
        {...props}
        />);

    return shallowRenderer.getRenderOutput();
};

describe('To check RememberThisTagCheckBox Function', () => {
    let instance;
    let props;
    beforeEach(() => {
        props = {
            content: {

            },
            data: {
            },
        };
        instance = shallowRender(props);
    });

    it('render a standard modal with child elements', () => {
        instance = shallowRender(props);
        expect(instance).toEqualJSX(
            <div className="remember-this">
                <div
                    className="page-options float-left"
                    onClick={undefined}
                    >
                    <span className="icon icon-information" />
                </div>
                <div className="toggle float-right">
                    <Toggle
                        aria-label="No label tag"
                        defaultChecked={false}
                        onChange={undefined}
                        />
                </div>
            </div>
        );
    });
});
