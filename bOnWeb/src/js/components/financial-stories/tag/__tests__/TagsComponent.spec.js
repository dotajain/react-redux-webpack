/**
 * @module TagsComponent
 */

jest.unmock('../TagsComponent');

const React = require('react');
const TestUtils = require('react-addons-test-utils');
const ReactDOM = require('react-dom');

const Tabs = require('react-bootstrap/lib/Tabs');
const Tab = require('react-bootstrap/lib/Tab');
const Tags = require('../Tags');
const MyTags = require('../MyTags');
const _ = require('lodash');
const RememberThisTagCheckBox = require('../RememberThisTagCheckBox');

const container = document.createElement('div');
const shallowRenderer = TestUtils.createRenderer();
const TagsComponent = require('../TagsComponent');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<TagsComponent
        {...props}
        />);

    return shallowRenderer.getRenderOutput();
};

describe(' To Check TagsComponent function', () => {
    let instance;
    let props;
    beforeEach(() => {
        props = {
            onRemeberThisInfoClick: jest.genMockFn(),
            toggleCheckBox: jest.genMockFn(),
            assignTag: jest.genMockFn(),
            getClass: jest.genMockFn(),
            onTagInfoClick: jest.genMockFn(),
            handleKeyPress: jest.genMockFn(),
            handleChangeOfTag: jest.genMockFn(),
            handleAddTagButton: jest.genMockFn(),
            flagForAddTag: true,
            deleteTag: jest.genMockFn(),
            flagForEditTag: true,

            content: {

            },
            data: [

            ]
        };
        instance = shallowRender(props);
    });

    it('render a standard modal with child elements', () => {
        instance = shallowRender(props);
        console.log(instance);
        expect(instance).toEqualJSX(
            <div
                className="col-xs-12"
                style={{ height: '100%' }}
                >
                <Tabs
                    activeKey={undefined}
                    bsStyle="pills"
                    id="controlled-tab-example"
                    onSelect={function noRefCheck() { } }
                    >
                    <RememberThisTagCheckBox
                        content={{}}
                        onRemeberThisInfoClick={function noRefCheck() { } }
                        toggleCheckBox={function noRefCheck() { } }
                        />
                    <Tab
                        eventKey={1}
                        title={undefined}
                        >
                        <Tags
                            assignTag={function noRefCheck() { } }
                            content={{}}
                            data={undefined}
                            getClass={function noRefCheck() { } }
                            noTagSelection={undefined}
                            onTagInfoClick={function noRefCheck() { } }
                            />
                    </Tab>
                    <Tab
                        eventKey={2}
                        title={undefined}
                        />
                </Tabs>
            </div>


        );
    });
});


describe('To check handleSelect Function', () => {
    let instance;
    let props = {
        handleSelect: jest.genMockFn(),
        tabKey: 1,
        content: {

        },
    };
    let node = document.createElement('div');
    let handleSelect = jest.genMockFn();
    const render = (comp, el) => ReactDOM.render(comp, el);
    instance = ReactDOM.render(<TagsComponent {...props} />, node);
    instance.handleSelect();
});
describe('To check handleSelect Function', () => {
    let instance;
    let props = {
        getClass: jest.genMockFn(),
        tabKey: 1,
        content: {

        },
        unTagSelected:true,
    };
    let node = document.createElement('div');
    let getClass = jest.genMockFn();
    const render = (comp, el) => ReactDOM.render(comp, el);
    instance = ReactDOM.render(<TagsComponent {...props} />, node);
    instance.getClass('12121');
});
describe('To check handleSelect Function', () => {
    let instance;
    let props = {
        getClass: jest.genMockFn(),
        tabKey: 1,
        content: {

        },
        unTagSelected:false,
        transactionTagData:[{tag:'tag1'}],
    };
    let node = document.createElement('div');
    let getClass = jest.genMockFn();
    const render = (comp, el) => ReactDOM.render(comp, el);
    instance = ReactDOM.render(<TagsComponent {...props} />, node);
    instance.getClass('tag1');
});

describe('To check handleSelect Function', () => {
    let instance;
    let props = {
        getClass: jest.genMockFn(),
        tabKey: 1,
        content: {

        },
        unTagSelected:false,
        transactionTagData:[],
    };
    let node = document.createElement('div');
    let getClass = jest.genMockFn();
    const render = (comp, el) => ReactDOM.render(comp, el);
    instance = ReactDOM.render(<TagsComponent {...props} />, node);
    instance.getClass('11');
});