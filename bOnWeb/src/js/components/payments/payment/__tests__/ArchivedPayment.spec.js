/**
 * @module ArchivedPayment
 */
jest.unmock('../ArchivedPayment');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const { buildContent } = require('../../../../__helpers__/TestHelpers');

const PaymentsStore = require('../../../../stores/PaymentsStore');
const PaymentsActionCreator = require('../../../../actions/PaymentsActionCreator');
const Helmet = require('react-helmet');
const BDataGrid = require('../../../common/datagrid/BDataGrid');
const Nav = require('react-bootstrap/lib/Nav');
const NavItem = require('react-bootstrap/lib/NavItem');
const MobileViewArchievedGrid = require('../MobileViewArchievedGrid');
const ArchivedDateCustomComponent = require('../ArchivedDateCustomComponent');
const HeaderWithoutTitleComponent = require('../../../common/HeaderWithoutTitleComponent');
const BrowserUtils = require('../../../../utils/BrowserUtils');
const EditComponentArchive = require('../EditComponentArchive');
const ViewArchiveComponent = require('../ViewArchiveComponent');
const ArchivedPayment = require('../ArchivedPayment');

const shallowRender = props => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<ArchivedPayment
        {...props}
        />);
    return shallowRenderer.getRenderOutput();
};

describe('customer Archived Payment page', () => {
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
    xit('render a standard modal with child elements', () => {
        instance = shallowRender(props);
        expect(instance).toEqualJSX(<div className="b container-fluid-full ">
            <div className="full-height">
                <Helmet title="Payments" />
                <HeaderWithoutTitleComponent
                    backClick={function noRefCheck() { } }
                    backTitle={undefined}
                    />
                <div className="main-container noheader">
                    <div className="scroll-wrapper">
                        <div className="payments payment-header content-wrapper">
                            <div className="row line-seperator">
                                <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1 text-center top-Margin">
                                    <span className="icon icon-your-payments imageDisplay" />
                                    <h5 className="paymentLbl" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="panel-content text-center">
                                        <Nav
                                            activeKey="all"
                                            bsClass="nav"
                                            className="nav manage-nav nav-justified"
                                            justified={false}
                                            onSelect={function noRefCheck() { } }
                                            pullLeft={false}
                                            pullRight={false}
                                            stacked={false}
                                            >
                                            <NavItem
                                                active={false}
                                                disabled={false}
                                                eventKey="all"
                                                />
                                            <NavItem
                                                active={false}
                                                disabled={false}
                                                eventKey="payment"
                                                />
                                            <NavItem
                                                active={false}
                                                disabled={false}
                                                eventKey="transfer"
                                                />
                                            <NavItem
                                                active={false}
                                                disabled={false}
                                                eventKey="dd"
                                                />
                                        </Nav>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <BDataGrid
                                    allowEmptyGrid={false}
                                    bodyHeight={400}
                                    childrenColumnName="children"
                                    columnMetadata={[{ columnName: 'id', displayName: 'ID', locked: false, order: 1, sortable: true, visible: true }, { columnName: 'from', cssClassName: 'column-from', customComponent: function noRefCheck() { }, displayName: 'From', locked: false, order: 2, sortDirectionCycle: ['desc', 'asc'], sortable: true, visible: true }, { columnName: 'to', cssClassName: 'column-to', customComponent: function noRefCheck() { }, displayName: 'To', locked: false, order: 3, sortable: true, visible: true }, { columnName: 'amount', cssClassName: 'column-amount', customComponent: function noRefCheck() { }, displayName: 'Amount', locked: false, order: 4, sortable: true, visible: true }, { columnName: 'when', cssClassName: 'column-when', customComponent: function noRefCheck() { }, displayName: 'Date', locked: false, order: 5, sortable: true, visible: true }, { columnName: 'reference', cssClassName: 'column-reference', customComponent: function noRefCheck() { }, displayName: 'Reference', locked: false, order: 6, sortable: true, visible: true }, { columnName: 'type', cssClassName: 'column-type', customComponent: function noRefCheck() { }, displayName: 'Type ', locked: false, order: 7, visible: true }]}
                                    columns={['from', 'to', 'amount', 'when', 'reference', 'type']}
                                    content={{}}
                                    customFilterComponent={null}
                                    customFilterer={null}
                                    customGridComponent={function noRefCheck() { } }
                                    customNoDataComponent={null}
                                    customPagerComponent={function noRefCheck() { } }
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
                                    headerStyles={'[object Object]'}
                                    infiniteScrollLoadTreshold={50}
                                    initialSort="from"
                                    initialSortAscending={false}
                                    isMultipleSelection={false}
                                    isSubGriddle={false}
                                    maxRowsText="Rows per page"
                                    metadataColumns={[]}
                                    next={undefined}
                                    nextClassName="griddle-next"
                                    nextIconComponent=""
                                    nextText="Next"
                                    noDataClassName="griddle-nodata"
                                    noDataMessage=""
                                    onRowClick={null}
                                    onSort={undefined}
                                    paddingHeight={5}
                                    parentRowCollapsedClassName="parent-row"
                                    parentRowCollapsedComponent="▶"
                                    parentRowExpandedClassName="parent-row expanded"
                                    parentRowExpandedComponent="▼"
                                    previousClassName="griddle-previous"
                                    previousIconComponent=""
                                    previousText="Previous"
                                    results={[]}
                                    resultsPerPage={0}
                                    rowExpnader={true}
                                    rowHeight={25}
                                    rowMetadata={null}
                                    selectedRowIds={[]}
                                    settingsIconComponent=""
                                    settingsText="Settings"
                                    settingsToggleClassName="settings"
                                    showFilter={false}
                                    showPager={true}
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
                            <div className="row">
                                <div className="col-lg-2  col-md-2 col-sm-2  col-xs-2" />
                                <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12 text-center">
                                    <p className="padding-top-max" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
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
        instance = ReactDOM.render(<ArchivedPayment {...props} />, node);
        instance.rowClick(1);
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
        instance = ReactDOM.render(<ArchivedPayment {...props} />, node);
        instance.onClick(1);
        //expect(PaymentsActionCreator.navigateToWebTask.mock.calls.length).toBe(2);
    });
});
describe('To check filterData Function', () => {
    let instance;
    let event = {
        target: {
            name: 'loan'
        }
    }
    let props = {
        filterData: jest.genMockFn(),
        event: {
            target: {
                name: 'loan'
            }
        },
        content: {
        },
    };
    it('calls for the filterData function', () => {
        let node = document.createElement('div');
        let filterData = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<ArchivedPayment {...props} />, node);
        instance.filterData(event);
    });
});
describe('WHEN NAVIGATE BACK TO PAYMENT', () => {
    let instance;
    let props = {
        back: jest.genMockFn(),
        content: {
        },
    };
    it('should navigate to web-task', () => {
        let node = document.createElement('div');
        let back = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<ArchivedPayment {...props} />, node);
        instance.back();
        expect(PaymentsActionCreator.navigateToWebTask.mock.calls.length).toBe(1);
    });
});
describe('To check onStoreChange Function', () => {
    let instance;
    let props = {
        onStoreChange: jest.genMockFn(),
        e: '1',
        content: {
        },
    };
    it('calls for the onStoreChange function', () => {
        let node = document.createElement('div');
        let onStoreChange = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<ArchivedPayment {...props} />, node);
        instance.onStoreChange();
        //expect(PaymentsActionCreator.navigateToWebTask.mock.calls.length).toBe(2);
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
        component = ReactDOM.render(<ArchivedPayment {...props} />, node);
        React.unmountComponentAtNode(node);
        expect(PaymentsStore.removeChangeListener.mock.calls.length).toBe(1);
    });
});
describe('To check componentWillMount Function', () => {
    let component;
    beforeEach(() => {
        let props = {
            _mergeList: 'undefined',
            content: {
                back: 'abcd'
            }
        };

        component = TestUtils.renderIntoDocument(
            <ArchivedPayment {...props}/>
        );

    });
    it('calls for the componentWillMount', () => {
        BrowserUtils.isMobileView.mockReturnValue(true);
        component.setState({ custGrid: true });
        let node = document.createElement('div');
        component.componentWillMount();
    });
});
describe('To check showMore Function', () => {
    let instance;
    let props = {
        showMore:false,
        content: {
        },
    };
    it('calls for the showMore function', () => {
        let node = document.createElement('div');
        let showMore = jest.genMockFn();
        const render = (comp, el) => ReactDOM.render(comp, el);
        instance = ReactDOM.render(<ArchivedPayment {...props} />, node);
        instance.showMore();
    });
});
