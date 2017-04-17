/**
 * @module ArchivedDateCustomComponent
 */

jest.unmock('../ArchivedDateCustomComponent');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const { buildContent } = require('../../../../__helpers__/TestHelpers');

const ArchivedDateCustomComponent = require('../ArchivedDateCustomComponent');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<ArchivedDateCustomComponent
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};

describe('customer Archived Date Custom Component  page', () => {
    let instance;
    let props;
    beforeEach(() => {
        props = {
            content: {
            },
            rowData: {
                "from": 'a',
                "type": "current",
                "to": 'abc',
                "amount": 54.0,
                "when": "2016-03-03",
            },
            metadata: {
                columnName: 'abcd',
            }
        };
        instance = shallowRender(props);
    });
    it('render a standard modal with child elements', () => {

        instance = shallowRender(props);

        expect(instance).toEqualJSX(
            <div>
                <span
                    ref="span"
                    onClick={undefined}
                    />
            </div>
        )
    });
});

describe('To chcek the columnName case', () => {
    let instance;
    let props;
    beforeEach(() => {
        props = {
            content: {
            },
            rowData: {
                "from": 'a',
                "type": "current",
                "to": 'abc',
                "amount": 54.0,
                "when": undefined,
            },
            metadata: {
                columnName: 'when',
            }
        };

    });
    it('check the functionality of switch case', () => {
        //props.rowData.when= undefined;
        instance = TestUtils.renderIntoDocument(
            <ArchivedDateCustomComponent   {...props}	/>
        );
        expect(props.rowData.when).toBe(undefined)
    });
});
describe('To chcek the else comdition of columnName case', () => {
    let instance;
    let props;
    beforeEach(() => {
        props = {
            content: {
            },
            rowData: {
                "from": 'a',
                "type": "current",
                "to": 'abc',
                "amount": 54.0,
                "when": "2016-03-03",
            },
            metadata: {
                columnName: 'when',
            }
        };

    });
    it('check the functionality of switch case', () => {
        //props.rowData.when= undefined;
        instance = TestUtils.renderIntoDocument(
            <ArchivedDateCustomComponent   {...props}	/>
        );
        expect(props.rowData.when).toBe("2016-03-03")
    });
});

describe('To chcek the columnName case for amount', () => {
    let instance;
    let props;
    beforeEach(() => {
        props = {
            content: {
            },
            rowData: {
                "from": 'a',
                "type": "current",
                "to": 'abc',
                "amount": undefined,
                "when": undefined,
            },
            metadata: {
                columnName: 'amount',
            }
        };

    });
    it('check the functionality of switch case amount', () => {
        //props.rowData.when= undefined;
        instance = TestUtils.renderIntoDocument(
            <ArchivedDateCustomComponent   {...props}	/>
        );
        expect(props.rowData.amount).toBe(undefined)
    });
});
describe('To chcek the else comdition of columnName case', () => {
    let instance;
    let props;
    beforeEach(() => {
        props = {
            content: {
            },
            rowData: {
                "from": 'a',
                "type": "current",
                "to": 'abc',
                "amount": 54.0,
                "when": "2016-03-03",
            },
            metadata: {
                columnName: 'amount',
            }
        };

    });
    it('check the functionality of switch case', () => {
        //props.rowData.when= undefined;
        instance = TestUtils.renderIntoDocument(
            <ArchivedDateCustomComponent   {...props}	/>
        );
        expect(props.rowData.amount).toBe(54.0)
    });
});