/**
 * @module TagItem
 */

jest.unmock('../TagItem');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const ReactDOM = require('react-dom');

const container = document.createElement('div');
const shallowRenderer = TestUtils.createRenderer();
const TagItem = require('../TagItem');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<TagItem
        {...props}
        />);

    return shallowRenderer.getRenderOutput();
};

describe('To check TagItem Function', () => {
    let instance;
    let props = {
        getClass: jest.genMockFn(),
        flagForEditTag: true,
        flagForAddTag: true,
        handleChangeOfTag: jest.genMockFn(),

        mytag: {
            value: '1212121',
            id: "05985dae-d2de-4ebc-ab0a-79093081bde5",
        },
        content: {

        },
        data: [

        ],
    };

    instance = shallowRender(props);
    it('render a standard modal with child elements', () => {
        instance = shallowRender(props);
        expect(instance).toEqualJSX(
            <div className="edit-tag">
                <div className="input-tag">
                    <span className="icon icon-tag undefined" />
                    <input
                        ref="userTag"
                        className="undefined"
                        defaultValue="1212121"
                        disabled={false}
                        id="05985dae-d2de-4ebc-ab0a-79093081bde5"
                        maxLength={16}
                        onChange={function noRefCheck() { } }
                        onKeyPress={function noRefCheck() {}}onKeyUp={function noRefCheck() {}}
                        pattern="^[a-zA-Z0-9 ]{1,16}$"
                        style={{ border: 'none' }}
                        type="text"
                        />
                    <a
                        className="float-right"
                        onClick={function noRefCheck() { } }
                        />
                </div>
            </div>);
    });
});
describe('To check assignTag Function', () => {
    let instance;
    let event = {
        key : 'Enter',
        preventDefault: jest.fn(),
    }
    let props = {
        assignTag: jest.genMockFn(),
        mytag: {
            value: '1212121',
            id: "05985dae-d2de-4ebc-ab0a-79093081bde5",
        },
        getClass: jest.genMockFn(),
        handleChangeOfTag: jest.fn(),
    };
    let node = document.createElement('div');
    let assignTag = jest.genMockFn();
    const render = (comp, el) => ReactDOM.render(comp, el);
    instance = ReactDOM.render(<TagItem {...props} />, node);
    it('on key press', () => {
        instance.onKeyPress(event);
        instance.assignTag();
    });
    
});
describe('To check assignTag Function', () => {
    let instance;
    let props = {
        deleteTag: jest.genMockFn(),
        mytag: {
            value: '1212121',
            id: "05985dae-d2de-4ebc-ab0a-79093081bde5",
        },
        getClass: jest.genMockFn(),
    };
    let node = document.createElement('div');
    let deleteTag = jest.genMockFn();
    const render = (comp, el) => ReactDOM.render(comp, el);
    instance = ReactDOM.render(<TagItem {...props} />, node);
    instance.deleteTag();
});
