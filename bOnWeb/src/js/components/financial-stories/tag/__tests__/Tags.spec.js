/**
 * @module Tags
 */

jest.unmock('../Tags');


const React = require('react');
const TestUtils = require('react-addons-test-utils');
const ReactDOM = require('react-dom');
const { buildContent } = require('../../../../__helpers__/TestHelpers');

const Tags = require('../Tags');
const container = document.createElement('div');

const shallowRenderer = TestUtils.createRenderer();

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<Tags
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};

describe('Tags', () => {
    let instance;
    let props;

    beforeEach(() => {
        props = {
            content: {

            },
            data: [],
        };
        instance = shallowRender(props);
    });

    it('render a standard modal with child elements', () => {
        instance = shallowRender(props);
        expect(instance).toEqualJSX(
            <div className="tag-list ">
                <span className="icon icon-information float-right" onClick={undefined}></span>
                <ul />
            </div>
        );
    });

});

describe('Tags Test Cases check', () => {

    let props = {
        getClass: jest.fn(),
        assignTag: jest.fn(),
        data: [
            {
                value: true,
            }
        ],
    };

    let component = TestUtils.renderIntoDocument(<Tags  {...props} />);

    it('should cover assignTag', () => {
        let tag = 'tag';
        component.assignTag(tag);
        expect(component.assignTag).toBeDefined;
    });

    it('should cover contentTags', () => {

        component.contentTags();
    });

    it('should cover assignTag when value is false', () => {

        let props = {
            getClass: jest.fn(),
            assignTag: jest.fn(),
            data: [
                {
                    value: false,
                }
            ],
        };

        let component = TestUtils.renderIntoDocument(<Tags  {...props} />);
        component.contentTags();
    });

    it('should cover assignTag when props.data is false', () => {

        let props = {
            getClass: jest.fn(),
            assignTag: jest.fn(),
            data: undefined
        };

        let component = TestUtils.renderIntoDocument(<Tags  {...props} />);
        component.contentTags();
    });
});