/**
 * @module ManagePayee
 */

jest.unmock('../ManagePayee');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const { buildContent } = require('../../../../__helpers__/TestHelpers');

const Helmet = require('react-helmet');
const PaymentsStore = require('../../../../stores/PaymentsStore');
const PayeeStore = require('../../../../stores/PayeeStore');
const PaymentsActionCreator = require('../../../../actions/PaymentsActionCreator');
const { PropTypes } = React;
const BDataGrid = require('../../../common/datagrid/BDataGrid');
const BrowserUtils = require('../../../../utils/BrowserUtils');
const MobileViewPayeeGrid = require('../MobileViewPayeeGrid');
const EditComponentPayee = require('../EditComponentPayee');
const HeaderWithoutTitleComponent = require('../../../common/HeaderWithoutTitleComponent');
const EditPayee = require('../EditPayee');
const ManagePayee = require('../ManagePayee');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<ManagePayee
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};

describe('customer Manage Payment page', () => {
    let instance;
    let props;
    let payeeList = {
        "beneficiaries": [
            {
                "id": "4bbcfd9d-c1b4-4a65-a694-b347711612e7",
                "account": {
                    "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
                    "sort_code": "654321",
                    "account_number": "12345678"
                },
                "to_account": {
                    "sort_code": "654321",
                    "account_number": "43214321",
                    "name": "John Black"
                },
                "display_name": "John Black ",
                "reference": "88228822",
                "permissions": {
                    "can_edit_reference": true,
                    "can_set_date_in_future": true,
                    "can_delete": true
                }
            },
            {
                "id": "4cccfd9d-c1b4-4a65-a694-b347711612e7",
                "account": {
                    "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
                    "sort_code": "987654",
                    "account_number": "987634"
                },
                "to_account": {
                    "sort_code": "987654",
                    "account_number": "43214322",
                    "name": "John white"
                },
                "display_name": "John white ",
                "reference": "882423434",
                "permissions": {
                    "can_edit_reference": true,
                    "can_set_date_in_future": true,
                    "can_delete": true
                }
            }
        ]
    }
    beforeEach(() => {
        props = {
            content: {

            },
            data: {
            },
        };

    });
    it('render a standard modal with child elements', () => {
        PaymentsStore.getAllPayees.mockReturnValue(
            {
                "beneficiaries": [
                    {
                        "id": "4bbcfd9d-c1b4-4a65-a694-b347711612e7",
                        "account": {
                            "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
                            "sort_code": "654321",
                            "account_number": "12345678"
                        },
                        "to_account": {
                            "sort_code": "654321",
                            "account_number": "43214321",
                            "name": "John Black"
                        },
                        "display_name": "John Black ",
                        "reference": "88228822",
                        "permissions": {
                            "can_edit_reference": true,
                            "can_set_date_in_future": true,
                            "can_delete": true
                        }
                    },
                    {
                        "id": "4cccfd9d-c1b4-4a65-a694-b347711612e7",
                        "account": {
                            "id": "b80e95a0-6b60-45b2-8b0f-77f2355f3061",
                            "sort_code": "987654",
                            "account_number": "987634"
                        },
                        "to_account": {
                            "sort_code": "987654",
                            "account_number": "43214322",
                            "name": "John white"
                        },
                        "display_name": "John white ",
                        "reference": "882423434",
                        "permissions": {
                            "can_edit_reference": true,
                            "can_set_date_in_future": true,
                            "can_delete": true
                        }
                    }
                ]
            }
        )
        instance = shallowRender(props);
        expect(instance).toEqualJSX(
            <div className="b container-fluid-full ">
                <div className="full-height">
                    <Helmet title="Payments" />
                    <div className="main-container payments payment-data payee noheader">
                        <header role="navigation">
                            <div className="navigation no-head row no-gutters line-seperator">
                                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                    <a
                                        className="page-options opt-green float-left"
                                        onClick={function noRefCheck() { } }
                                        />
                                </div>
                                <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 text-center">
                                    <div className="row">
                                        <span className="icon icon-payees imageDisplay" />
                                        <h5 className="paymentLbl-payee" />
                                    </div>
                                </div>


                          <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2" />
             </div>
          </header>
           <div className="payment-grid">
             <div className="row">
               <BDataGrid
                 allowEmptyGrid={false}
                 bodyHeight={400}
                 childrenColumnName="children"
                
                 columnMetadata={[{columnName: 'display_name', cssClassName: 'column-name', customComponent: function noRefCheck() {}, displayName: 'Nick Name', locked: false, order: 1, sortDirectionCycle: ['desc', 'asc'], sortable: true, visible: true}, {columnName: 'to_account.sort_code', cssClassName: 'column-code', customComponent: function noRefCheck() {}, displayName: 'Sort Code', locked: false, order: 2, sortable: true, visible: true}, {columnName: 'to_account.account_number', cssClassName: 'column-account', customComponent: function noRefCheck() {}, displayName: 'Account Number', locked: false, order: 3, sortable: true, visible: true}, {columnName: 'reference', cssClassName: 'column-ref-payee', customComponent: function noRefCheck() {}, displayName: 'Reference', locked: false, order: 4, sortable: true, visible: true}, {columnName: 'edit', cssClassName: 'column-edit-payee', customComponent: function noRefCheck() {}, displayName: ' ', locked: false, order: 5, sortable: false, visible: true}]}
                 columns={['display_name', 'to_account.sort_code', 'to_account.account_number', 'reference', 'edit']}
                 content={{}}
                 customFilterComponent={null}
                 customFilterer={null}
                 customGridComponent={null}
                 customNoDataComponent={<div className="col-lg-8 col-md-8 col-sm-8 col-xs-12 text-center"><p className="padding-top-max" />
                                            <p /></div>}
                 customPagerComponent={function noRefCheck() {}}
                 customRowComponent={null}
                 customRowComponentClassName=""
                 enableCustomFormatText="Enable Custom Formatting"
                 enableInfiniteScroll={true}
                 enableSort={true}
                 enableToggleCustom={false}
                 externalChangeSort={null}
                 externalCurrentPage={null}
                 externalIsLoading={false}
                 externalLoadingComponent={null}
                 externalMaxPage={null}
                 externalSetFilter={null}
                 externalSetPage={null}
                 externalSetPageSize={null}
                 externalSortAscending={true}
                 externalSortColumn={null}
                 filterPlaceholderText="Filter Results"
                 globalData={null}
                 gridClassName=""
                 gridMetadata={null}
                 infiniteScrollLoadTreshold={50}
                 initialSort="display_name"
                 initialSortAscending={false}
                 isFooterEnabled={false}
                 isMultipleSelection={false}
                 isSubGriddle={false}
                 maxRowsText="Rows per page"
                 metadataColumns={[]}
                 next={function noRefCheck() {}}
                 nextClassName="griddle-next"
                 nextIconComponent=""
                 nextText="Next"
                 noDataClassName="griddle-nodata"
                 noDataMessage=""
                 onRowClick={null}
                 paddingHeight={5}
                 parentRowCollapsedClassName="parent-row"
                 parentRowExpandedClassName="parent-row expanded"
                 parentRowExpandedComponent="▼"
                 previousClassName="griddle-previous"
                 previousIconComponent=""
                 previousText="Previous"
                 results={[{account: {account_number: '12345678', id: 'b80e95a0-6b60-45b2-8b0f-77f2355f3061', sort_code: '654321'}, display_name: 'John Black ', id: '4bbcfd9d-c1b4-4a65-a694-b347711612e7', permissions: {can_delete: true, can_edit_reference: true, can_set_date_in_future: true}, reference: '88228822', to_account: {account_number: '43214321', name: 'John Black', sort_code:'654321'}}, {account: {account_number: '987634', id: 'b80e95a0-6b60-45b2-8b0f-77f2355f3061', sort_code: '987654'}, display_name: 'John white ', id: '4cccfd9d-c1b4-4a65-a694-b347711612e7', permissions: {can_delete: true, can_edit_reference: true, can_set_date_in_future: true}, reference: '882423434', to_account: {account_number: '43214322', name: 'John white', sort_code: '987654'}}]}
                 resultsPerPage={200}
                 rowClickIndex={-1}
                 rowCustomClass={null}
                 rowExpnader={true}
                 rowHeight={25}
                 rowMetadata={null}
                 selectedRowIds={[]}
                 settingsIconComponent=""
                 settingsText="Settings"
                 settingsToggleClassName="settings"
                 showFilter={false}
                 showPager={false}
                 showSettings={false}
                 showTableHeading={true}
                 sortAscendingClassName="sort-ascending"
                 sortAscendingComponent=" ▲"
                 sortDefaultComponent={null}
                 sortDescendingClassName="sort-descending"
                 sortDescendingComponent=" ▼"
                 tableClassName=""
                 uniqueIdentifier="id"
                 useCustomFilterComponent={false}
                 useCustomFilterer={false}
                 useCustomGridComponent={false}
                 useCustomPagerComponent="true"
                 useCustomRowComponent={false}
                 useExternal={false}
                 useFixedHeader={true}
                 useFixedLayout={true}
                 useGriddleIcons={true}
                 useGriddleStyles={false}
               />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    });
});
describe('To check rowClick Function', () => {
    let instance;
    let props = {
        rowClick: jest.genMockFn(),
        e: 1,
        content: {
        },
    };
    it('calls for the rowClick function', () => {
        let node = document.createElement('div');
        let rowClick = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<ManagePayee {...props} />, node);
        instance.rowClick(1);
        expect(instance.rowClick).toBeDefined();
    });
});
describe('To check showMore Function', () => {
    let instance;
    let props = {
        showMore: jest.genMockFn(),
        content: {
        },
    };
    it('calls for the showMore function', () => {
        let node = document.createElement('div');
        let showMore = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<ManagePayee {...props} />, node);
        instance.showMore();
        expect(instance.showMore).toBeDefined();
    });
});
describe('To check back Function', () => {
    let instance;
    let props = {
        back: jest.genMockFn(),
        content: {
        },
    };
    it('calls for the back function', () => {
        let node = document.createElement('div');
        let back = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<ManagePayee {...props} />, node);
        instance.back();
        expect(PaymentsActionCreator.navigateToWebTask.mock.calls.length).toBe(1);
    });
});
describe('To check hideViewPayee Function', () => {
    let instance;
    let props = {
        hideViewPayee: jest.genMockFn(),
        hideEditPayee: jest.genMockFn(),
        showViewPayee: jest.genMockFn(),
        showEditPayee: jest.genMockFn(),
        onPaymentStoreChange: jest.genMockFn(),
        content: {
        },
    };
    it('calls for the hideViewPayee function', () => {
        let node = document.createElement('div');
        let hideViewPayee = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<ManagePayee {...props} />, node);
        instance.hideViewPayee();
        expect(instance.hideViewPayee).toBeDefined();
    });
    it('calls for the hideEditPayee function', () => {
        let node = document.createElement('div');
        let hideEditPayee = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<ManagePayee {...props} />, node);
        instance.hideEditPayee();
        expect(instance.hideEditPayee).toBeDefined();
    });
    it('calls for the showViewPayee function', () => {
        let node = document.createElement('div');
        let showViewPayee = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<ManagePayee {...props} />, node);
        instance.showViewPayee();
        expect(instance.showViewPayee).toBeDefined();
    });
    it('calls for the showEditPayee function', () => {
        let node = document.createElement('div');
        let showEditPayee = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<ManagePayee {...props} />, node);
        instance.showEditPayee();
        expect(instance.showEditPayee).toBeDefined();
    });
    it('calls for the editPayee function', () => {
        let node = document.createElement('div');
        let editPayee = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<ManagePayee {...props} />, node);
        instance.editPayee();
        expect(instance.editPayee).toBeDefined();
    });
    it('calls for the onPaymentStoreChange function', () => {
        let node = document.createElement('div');
        let onPaymentStoreChange = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<ManagePayee {...props} />, node);
        instance.onPaymentStoreChange();
        expect(instance.onPaymentStoreChange).toBeDefined();
    });
    it('calls for the shouldComponentUpdate function', () => {
        let node = document.createElement('div');
        let shouldComponentUpdate = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<ManagePayee {...props} />, node);
        instance.setState({ custGrid: true });
        instance.shouldComponentUpdate();
        expect(instance.shouldComponentUpdate).toBeDefined();
    });
    it('calls for the componentWillMount function', () => {
        // let list = {
        //     payeeList:
        //     [
        //         {

        //         }
        //     ]
        // }
        let node = document.createElement('div');
        BrowserUtils.isMobileView.mockReturnValue(true);
        // PaymentsStore.getAllPayees.mockReturnValue(
        //     {
        //         payeeList:
        //         [
        //             {

        //             }
        //         ]

        //     }
        // )
        let componentWillMount = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<ManagePayee {...props} />, node);
        instance.componentWillMount();
        expect(instance.componentWillMount).toBeDefined();
    });
});

describe('To check onClick Function', () => {
    let instance;
    let props = {
        onClick: jest.genMockFn(),
        e: '1',
        content: {
        },
    };
    it('calls for the onClick function', () => {
        let node = document.createElement('div');
        let onClick = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<ManagePayee {...props} />, node);
        instance.onClick(1);
        expect(instance.onClick).toBeDefined();
    });
});
describe('To check componentWillUnmount Function', () => {
    let component;
    const props = {
        content: {
        },
    };
    it('calls for the removeChangeListener', () => {
        let node = document.createElement('div');
        const render = (comp, el) => ReactDOM.render(comp, el);
        component = ReactDOM.render(<ManagePayee {...props} />, node);
        React.unmountComponentAtNode(node);
        expect(PayeeStore.removeChangeListener.mock.calls.length).toBe(1);
    });
});
describe('To check payeeList beneficiaries as undefined ', () => {
    let instance;
    let props = {
        content: {
        },
    };
    xit('calls for the payeeList beneficiaries as undefined function', () => {
        let node = document.createElement('div');

        PaymentsStore.getAllPayees.mockReturnValue({
            payeeList: {
                "beneficiaries": undefined
            }
        });
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<ManagePayee {...props} />, node);
    });
});
describe('To check componentWillMount as 0 ', () => {
    let instance;
    let props = {
        content: {
        },
    };
    xit('calls for the componentWillMount as 0 function', () => {
        let node = document.createElement('div');
        BrowserUtils.isMobileView.mockReturnValue(true);

        PaymentsStore.getAllPayees.mockReturnValue({
            payeeList: {
                "beneficiaries":[],
            }
        });
        // PaymentsStore.getAllPayees.mockReturnValue([]);
        let componentWillMount = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<ManagePayee {...props} />, node);
        //instance.setState({payeeList:[]})
        instance.componentWillMount();
        expect(instance.componentWillMount).toBeDefined();
    });
});