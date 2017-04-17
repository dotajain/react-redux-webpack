/**
 * @module MyTags
 */
jest.unmock('../MyTags');
//jest.mock('../../../../stores/FinancialStoriesStore');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const ReactDOM = require('react-dom');
const { buildContent } = require('../../../../__helpers__/TestHelpers');

const TagItem = require('../TagItem');
const MyTags = require('../MyTags');
const FinancialStoriesStore = require('../../../../stores/FinancialStoriesStore');

const container = document.createElement('div');

const shallowRenderer = TestUtils.createRenderer();

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<MyTags
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};

describe('My Tags', () => {
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
        FinancialStoriesStore.getTagLoadStatus.mockReturnValue(true);
        expect(instance).toEqualJSX(
            <div className="loader-sidebar" />
        );
    });

});

describe('when a user clicked on content Panel', () => {

    const contentaddNewTagModal = buildContent(['addNewTagModal']);

    let instance;
    const content = {
        addNewTagModal: 'PropTypes.string.isRequired',
    };

    beforeEach(() => {
        let props = {
            data: 'data',
            styles: {
                sidebar: '12121',
            }
        }
        instance = TestUtils.renderIntoDocument(
            <MyTags
                content={content}
                />
        );
    });
    it('Contact Details of Bank will be open with with heading', () => {
        expect(contentaddNewTagModal.addNewTagModal.length).toBe(14);
    });
    it('should cover componentWillReceiveProps fxn', () => {
        instance.componentWillReceiveProps();
    });

    it('should cover componentWillReceiveProps fxn', () => {
        let props = {
            flagForAddTag: false,
            flagForEditTag: false,
            handleChangeOfTag: 'content',
            assignTag: 'content',
            deleteTag: 'content',
            getClass: 'content',
            content: 'content',
            data: [{ d: 1 },{d:2},],
        }
        let component = TestUtils.renderIntoDocument(
            <MyTags
                content={content} {...props}
                />
        );
        component.contentMyTags();
    });

    it('should cover render fxn', () => {
        let props = {
            flagForAddTag: 'content',
            flagForEditTag: false,
            handleChangeOfTag: 'content',
            assignTag: 'content',
            deleteTag: 'content',
            getClass: 'content',
            content: 'content',
            data: [{ d: 1 },{d:2},],
        }
        let component = TestUtils.renderIntoDocument(
            <MyTags
                content={content} {...props}
                />
        );
        component.contentMyTags();
    });

});

