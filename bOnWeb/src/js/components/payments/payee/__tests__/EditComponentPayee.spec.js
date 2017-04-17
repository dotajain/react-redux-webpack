'use strict';

jest.unmock('../EditComponentPayee');

const EditComponentPayee = require('../EditComponentPayee');
const React = require('react');
const ReactDOM = require('react-dom');
const EditPaymentStore = require('../../../../stores/EditPaymentStore');
const ValidationConfig = require('../../../../config/validationConfig');
const Button = require('react-bootstrap').Button;
const PaymentsStore = require('../../../../stores/PaymentsStore');
const PaymentsActionCreator = require('../../../../actions/PaymentsActionCreator');
const PayeeActionCreator = require('../../../../actions/PayeeActionCreator');
const { PropTypes } = React;
const Popover = require('react-bootstrap/lib/Popover');
const OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');
const Measure = require('react-measure');
const TestUtils = require('react-addons-test-utils');


const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<EditComponentPayee
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};

describe('Edit Component payee Test Cases', () => {
    let props = {
        data: 'data',
        content: {
            cancel: 'Cancel',
            edit: 'Edit',
        },
        metadata: {
            columnName: 'edit',
        },
        rowData: {
            "id": "4bbcfd9d-c1b4-4a65-a694-b347711612e7",
            "account": {
                "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
                "sort_code": "654321",
                "account_number": "12345678",
            },
            "to_account": {
                "sort_code": "654321",
                "account_number": "43214321",
                "name": "John Black",
            },
            "display_name": "John Black ",
            "reference": "88228822",
            "permissions": {
                "can_edit_reference": true,
                "can_set_date_in_future": true,
                "can_delete": true,
            },
        },
    };

    it('should call EditClick 1 ', () => {
        let e = {
            target: {
                value: '12',
                className: 'dsd',
            },

        };
        let instance = TestUtils.renderIntoDocument(<EditComponentPayee {...props}/>);

        instance.editClick1(e);
        expect(instance.editClick1).toBeDefined();
    });
    it('should call EditClick ', () => {
        let e = {
            target: {
                value: '12',
                className: 'dsd',
            },

        };
        let instance = TestUtils.renderIntoDocument(<EditComponentPayee {...props}/>);

        instance.editClick(e);
        expect(instance.editClick).toBeDefined();
    });
    it('should call cellClick ', () => {
        let e = {
            target: {
                value: '12',
                className: 'dsd',
            },

        };
        let instance = TestUtils.renderIntoDocument(<EditComponentPayee {...props}/>);

        instance.cellClick(e);
        expect(instance.cellClick).toBeDefined();
    });

    it('should call onEnter ', () => {
        let instance = TestUtils.renderIntoDocument(<EditComponentPayee {...props}/>);
        let span = TestUtils.renderIntoDocument(<span>john</span>);

        instance.onEnter(span);
        expect(instance.onEnter).toBeDefined();
    });

    it('should call onExit ', () => {
        let e = {
            target: {
                value: '12',
                className: 'dsd',
            },

        };
        let instance = TestUtils.renderIntoDocument(<EditComponentPayee {...props}/>);
        let span = TestUtils.renderIntoDocument(<span>john</span>);
        instance.onExit(span);
        expect(instance.onExit).toBeDefined();
    });

    it('should call closed fn ', () => {
        let instance = TestUtils.renderIntoDocument(<EditComponentPayee {...props}/>);

        instance.closed();
        expect(instance.closed).toBeDefined();
    });

     it('should call renderCell fn ', () => {
        let props1 = {
        data: 'data',
        content: {
            cancel: 'Cancel',
            edit: 'Edit',
        },
        metadata: {
            columnName: 'to_account.sort_code',
        },
        rowData: {
            "id": "4bbcfd9d-c1b4-4a65-a694-b347711612e7",
            "account": {
                "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
                "sort_code": "654321",
                "account_number": "12345678",
            },
            "to_account": {
                "sort_code": "654321",
                "account_number": "43214321",
                "name": "John Black",
            },
            "display_name": "John Black ",
            "reference": "88228822",
            "permissions": {
                "can_edit_reference": true,
                "can_set_date_in_future": true,
                "can_delete": true,
            },
        },
    };


        let instance = TestUtils.renderIntoDocument(<EditComponentPayee {...props1}/>);

        instance.renderCell();
        expect(instance.renderCell).toBeDefined();
    });

       it('should call renderCell fn ', () => {
        let props1 = {
        data: 'data',
        content: {
            cancel: 'Cancel',
            edit: 'Edit',
        },
        metadata: {
            columnName: 'display_name',
        },
        rowData: {
            "id": "4bbcfd9d-c1b4-4a65-a694-b347711612e7",
            "account": {
                "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
                "sort_code": "654321",
                "account_number": "12345678",
            },
            "to_account": {
                "sort_code": "654321",
                "account_number": "43214321",
                "name": "John Black",
            },
            "display_name": "John Black ",
            "reference": "88228822",
            "permissions": {
                "can_edit_reference": true,
                "can_set_date_in_future": true,
                "can_delete": true,
            },
        },
    };


        let instance = TestUtils.renderIntoDocument(<EditComponentPayee {...props1}/>);

        instance.renderCell();
        expect(instance.renderCell).toBeDefined();
    });


    it('should return EditPayee jsx', () => {
        let component = shallowRender(props);
        expect(component).toEqualJSX(
            <div>

                <Measure
                    blacklist={[]}
                    cloneOptions={{}}
                    onMeasure={function noRefCheck() { } }
                    shouldMeasure={true}
                    useClone={false}
                    whitelist={['width', 'height', 'top', 'right', 'bottom', 'left']}
                    >
                    <OverlayTrigger
                        defaultOverlayShown={false}
                        onEnter={function noRefCheck() { } }
                        onExit={function noRefCheck() { } }
                        overlay={<span id="blank" />}
                        placement="left"
                        rootClose={true}
                        trigger="click"
                        >
                        <Button
                            active={false}
                            block={false}
                            bsClass="btn"
                            bsStyle="link"
                            disabled={false}
                            onClick={function noRefCheck() { } }
                            >
                            Edit
                        </Button>
                    </OverlayTrigger>
                </Measure>
            </div>
        );
    });



});