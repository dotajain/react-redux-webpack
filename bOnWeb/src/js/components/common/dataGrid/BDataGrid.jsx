
const React = require('react');
const GridTable = require('./gridTable.jsx');
const GridFilter = require('./gridFilter.jsx');
const GridPagination = require('./gridPagination.jsx');
const GridSettings = require('./gridSettings.jsx');
const GridNoData = require('./gridNoData.jsx');
const GridRow = require('./gridRow.jsx');
const GridRowContainer = require('./gridRowContainer.jsx');
const CustomRowComponentContainer = require('./customRowComponentContainer.jsx');
const CustomPaginationContainer = require('./customPaginationContainer.jsx');
const CustomFilterContainer = require('./customFilterContainer.jsx');
const ColumnProperties = require('./columnProperties');
const RowProperties = require('./rowProperties');
const deep = require('./deep');
const showMorePager = require('./showMorePager');

const drop = require('lodash/drop');
const dropRight = require('lodash/dropRight');
const find = require('lodash/find');
const first = require('lodash/take');
const forEach = require('lodash/forEach');
const initial = require('lodash/initial');
const isArray = require('lodash/isArray');
const isEmpty = require('lodash/isEmpty');
const isNull = require('lodash/isNull');
const isUndefined = require('lodash/isUndefined');
const omit = require('lodash/omit');
const map = require('lodash/map');
const extend = require('lodash/assign');
const _filter = require('lodash/filter');
const _without = require('lodash/without');

const _orderBy = require('lodash/orderBy');
const _property = require('lodash/property');
const _get = require('lodash/get');
const assign = require('lodash/assign');
const toPairs = require('lodash/toPairs');
const without = require('lodash/without');
let initialLoad = true;
let node = {};

const { PropTypes } = React;

const BDataGrid = React.createClass({
    propTypes: {
        content: PropTypes.object,
        onSort: PropTypes.object,
        customTableRowComponent: PropTypes.object,
        externalLoadingComponent: PropTypes.object,
        customPagerComponentOptions: PropTypes.object,
        isMultipleSelection: React.PropTypes.bool,
        useCustomFilterer: PropTypes.bool,
        customFilterer: PropTypes.bool,
        useExternal: PropTypes.bool,
        results: PropTypes.array,
        columnMetadata: PropTypes.array,
        columns: PropTypes.array,
        metadataColumns: PropTypes.array,
        externalSetPageSize: PropTypes.number,
        externalMaxPage: PropTypes.number,
        externalSetPage: PropTypes.number,
        externalChangeSort: PropTypes.number,
        resultsPerPage: PropTypes.number,
        externalCurrentPage: PropTypes.number,
        externalSortColumn: PropTypes.number,
        bodyHeight: PropTypes.number,
        paddingHeight: PropTypes.number,
        rowHeight: PropTypes.number,
        infiniteScrollLoadTreshold: PropTypes.number,
        minHeigth: PropTypes.number,
        rowClickIndex: PropTypes.number,
        enableToggleCustom: PropTypes.bool,
        rowExpnader: PropTypes.bool,
        enableInfiniteScroll: PropTypes.bool,
        useCustomRowComponent: PropTypes.bool,
        useCustomGridComponent: PropTypes.bool,
        useCustomPagerComponent: PropTypes.string,
        externalSortAscending: PropTypes.bool,
        useCustomFilterComponent: PropTypes.bool,
        useGriddleStyles: PropTypes.bool,
        showSettings: PropTypes.bool,
        showFilter: PropTypes.bool,
        enableSort: PropTypes.bool,
        showPager: PropTypes.bool,
        isSubGriddle: PropTypes.bool,
        useGriddleIcons: PropTypes.bool,
        useFixedLayout: PropTypes.bool,
        showTableHeading: PropTypes.bool,
        useFixedHeader: PropTypes.bool,
        externalIsLoading: PropTypes.bool,
        useCustomTableRowComponent: PropTypes.bool,
        initialSort: PropTypes.string,
        initialSortOrder: PropTypes.string,
        externalSetFilter: PropTypes.string,
        sortDefaultComponent: PropTypes.string,
        sortDescendingComponent: PropTypes.string,
        sortAscendingComponent: PropTypes.string,
        sortDescendingClassName: PropTypes.string,
        sortAscendingClassName: PropTypes.string,
        customFilterComponent: PropTypes.string,
        nextClassName: PropTypes.string,
        gridMetadata: PropTypes.string,
        customRowComponent: PropTypes.string,
        customPagerComponent: PropTypes.func,
        noDataClassName: PropTypes.string,
        noDataMessage: PropTypes.string,
        allowEmptyGrid: PropTypes.bool,
        globalData: PropTypes.string,
        gridClassName: PropTypes.string,
        customNoDataComponent: PropTypes.object,
        customGridComponent: PropTypes.func,
        rowCustomClass: PropTypes.string,
        parentRowExpandedComponent: PropTypes.string,
        parentRowCollapsedComponent: PropTypes.string,
        parentRowExpandedClassName: PropTypes.string,
        parentRowCollapsedClassName: PropTypes.string,
        tableClassName: PropTypes.string,
        childrenColumnName: PropTypes.string,
        filterPlaceholderText: PropTypes.string,
        settingsToggleClassName: PropTypes.string,
        settingsText: PropTypes.string,
        previousText: PropTypes.string,
        previousIconComponent: PropTypes.string,
        previousClassName: PropTypes.string,
        nextIconComponent: PropTypes.string,
        settingsIconComponent: PropTypes.string,
        maxRowsText: PropTypes.string,
        enableCustomFormatText: PropTypes.string,
        customGridComponentClassName: PropTypes.string,
        customRowComponentClassName: PropTypes.string,
        rowMetadata: PropTypes.string,
        next: PropTypes.func,
        rowAllSelected: PropTypes.func,
        rowSelected: PropTypes.func,
        onRowClick: PropTypes.func,
        customClick: PropTypes.func,
        nextText: PropTypes.string,
        selectedRowIds: React.PropTypes.oneOfType([
            React.PropTypes.arrayOf(React.PropTypes.number),
            React.PropTypes.arrayOf(React.PropTypes.string),
        ]),
        uniqueIdentifier: React.PropTypes.string,
    },
    statics: {
        GridTable: GridTable,
        GridFilter: GridFilter,
        GridPagination: GridPagination,
        GridSettings: GridSettings,
        GridRow: GridRow,
    },


    getDefaultProps() {
        return {
            'columns': [],
            'gridMetadata': null,
            'columnMetadata': [],
            'rowMetadata': null,
            'results': [], // Used if all results are already loaded.
            'initialSort': '',
            'initialSortOrder':'',
            'gridClassName': '',
            'tableClassName': '',
            'customRowComponentClassName': '',
            'settingsText': 'Settings',
            'filterPlaceholderText': 'Filter Results',
            'nextText': 'Next',
            'previousText': 'Previous',
            'maxRowsText': 'Rows per page',
            'enableCustomFormatText': 'Enable Custom Formatting',
            // this column will determine which column holds subgrid data
            // it will be passed through with the data object but will not be rendered
            'childrenColumnName': 'children',
            // Any column in this list will be treated as metadata and will be passed through with the data but won't be rendered
            'metadataColumns': [],
            'showFilter': false,
            'showSettings': false,
            'useCustomRowComponent': false,
            'useCustomGridComponent': false,
            'useCustomPagerComponent': false,
            'useCustomFilterer': false,
            'useCustomFilterComponent': false,
            'useGriddleStyles': false,
            'useGriddleIcons': true,
            'customRowComponent': null,
            'customGridComponent': null,
            'customPagerComponent': showMorePager,
            'customFilterComponent': null,
            'customFilterer': null,
            'globalData': null,
            'enableToggleCustom': false,
            'noDataMessage': '',
            'noDataClassName': 'griddle-nodata',
            'customNoDataComponent': null,
            'allowEmptyGrid': false,
            'showTableHeading': true,
            'showPager': true,
            'useFixedHeader': false,
            'useExternal': false,
            'externalSetPage': null,
            'externalChangeSort': null,
            'externalSetFilter': null,
            'externalSetPageSize': null,
            'externalMaxPage': null,
            'externalCurrentPage': null,
            'externalSortColumn': null,
            'externalSortAscending': true,
            'externalLoadingComponent': null,
            'externalIsLoading': false,
            'enableInfiniteScroll': false,
            'bodyHeight': null,
            'paddingHeight': 5,
            'rowHeight': 25,
            'infiniteScrollLoadTreshold': 50,
            'useFixedLayout': true,
            'isSubGriddle': false,
            'enableSort': true,
            'onRowClick': null,
            /* css class names */
            'sortAscendingClassName': 'sort-ascending',
            'sortDescendingClassName': 'sort-descending',
            'parentRowCollapsedClassName': 'parent-row',
            'parentRowExpandedClassName': 'parent-row expanded',
            'settingsToggleClassName': 'settings',
            'nextClassName': 'griddle-next',
            'previousClassName': 'griddle-previous',
            'headerStyles': {},
            /* icon components */
            'sortAscendingComponent': ' ▲',
            'sortDescendingComponent': ' ▼',
            'sortDefaultComponent': null,
            'parentRowCollapsedComponent': '▶',
            'parentRowExpandedComponent': '▼',
            'settingsIconComponent': '',
            'nextIconComponent': '',
            'previousIconComponent': '',
            'isMultipleSelection': false,
            'selectedRowIds': [],
            'uniqueIdentifier': 'id',
            'rowExpnader': false,
            'rowClickIndex': -1,
            'rowCustomClass': null,
             'isFooterEnabled':false,
        };
    },
    /* if we have a filter display the max page and results accordingly */
    getInitialState() {
        const state = {
            maxPage: 0,
            page: 0,
            filteredResults: null,
            filteredColumns: [],
            filter: '',
            // this sets the individual column filters
            columnFilters: {},
            resultsPerPage: this.props.resultsPerPage || 25,
            showColumnChooser: false,
            isSelectAllChecked: false,
            selectedRowIds: this.props.selectedRowIds,
        };
        return state;
    },
    componentWillMount() {
        node = {};
        initialLoad = true;

        this.verifyExternal();
        this.verifyCustom();

        this.columnSettings = new ColumnProperties(
            this.props.results.length > 0 ? deep.keys(this.props.results[0]) : [],
            this.props.columns,
            this.props.childrenColumnName,
            this.props.columnMetadata,
            this.props.metadataColumns
        );

        this.rowSettings = new RowProperties(
            this.props.rowMetadata,
            (this.props.useCustomTableRowComponent && this.props.customTableRowComponent) ?
                this.props.customTableRowComponent :
                GridRow,
            this.props.useCustomTableRowComponent
        );

        if (this.props.initialSort) {
            // this.changeSort(this.props.initialSort);
            this.initialSort(this.props.initialSort);
        }
        this.setMaxPage();

        // don't like the magic strings
        if (this.shouldUseCustomGridComponent()) {
            this.setState({
                customComponentType: 'grid',
            });
        } else if (this.shouldUseCustomRowComponent()) {
            this.setState({
                customComponentType: 'row',
            });
        } else {
            this.setState({
                filteredColumns: this.columnSettings.filteredColumns,
            });
        }
    },
    componentWillReceiveProps(nextProps) {
        this.setMaxPage(nextProps.results);

        if (nextProps.resultsPerPage !== this.props.resultsPerPage) {
            this.setPageSize(nextProps.resultsPerPage);
            // this.setPageSize(nextProps.resultsPerPage);
        }

        // This will updaet the column Metadata
        this.columnSettings.columnMetadata = nextProps.columnMetadata;
        if (nextProps.results.length > 0) {
            const deepKeys = deep.keys(nextProps.results[0]);

            const is_same = (this.columnSettings.allColumns.length === deepKeys.length) && this.columnSettings.allColumns.every((element, index) => {
                return element === deepKeys[index];
            });

            if (!is_same) {
                this.columnSettings.allColumns = deepKeys;
            }
        } else if (this.columnSettings.allColumns.length > 0) {
            this.columnSettings.allColumns = [];
        }

        if (nextProps.columns !== this.columnSettings.filteredColumns) {
            this.columnSettings.filteredColumns = nextProps.columns;
        }


        if (nextProps.selectedRowIds) {
            const visibleRows = this.getDataForRender(this.getCurrentResults(), this.columnSettings.getColumns(), true);

            this.setState({
                isSelectAllChecked: this._getAreAllRowsChecked(nextProps.selectedRowIds, map(visibleRows, this.props.uniqueIdentifier)),
                selectedRowIds: nextProps.selectedRowIds,
            });
        }
    },

    // todo: clean these verify methods up

    // TODO: Do this with propTypes

    getDataForRender(datas, cols, pageList) {
        let data = datas;
        const that = this;

        if (this.props.onSort !== undefined) {
            return data;
        }
        // get the correct page size
        if (this.state.sortColumn !== '') {
            const column = this.state.sortColumn;
            const sortColumn = _filter(this.props.columnMetadata, { columnName: column });
            let customCompareFn;
            let multiSort = {
                columns: [],
                orders: [],
            };

            if (sortColumn.length > 0) {
                customCompareFn = sortColumn[0].hasOwnProperty('customCompareFn') && sortColumn[0]['customCompareFn'];
                if (sortColumn[0]['multiSort']) {
                    multiSort = sortColumn[0]['multiSort'];
                }
            }

            if (this.state.sortDirection) {
                if (typeof customCompareFn === 'function') {
                    if (customCompareFn.length === 2) {
                        data = data.sort((a, b) => {
                            return customCompareFn(_get(a, column), _get(b, column));
                        });

                        if (this.state.sortDirection === 'desc') {
                            data.reverse();
                        }
                    } else if (customCompareFn.length === 1) {
                        data = _orderBy(data, item => {
                            return customCompareFn(_get(item, column));
                        }, [this.state.sortDirection]);
                    }
                } else {
                    const iteratees = [_property(column)];
                    const orders = [this.state.sortDirection];
                    multiSort.columns.forEach((col, i) => {
                        iteratees.push(_property(col));
                        if (multiSort.orders[i] === 'asc' ||
                            multiSort.orders[i] === 'desc') {
                            orders.push(multiSort.orders[i]);
                        } else {
                            orders.push(this.state.sortDirection);
                        }
                    });

                    data = _orderBy(data, iteratees, orders);
                }
            }
        }

        const currentPage = this.getCurrentPage();

        if (!this.props.useExternal && pageList && (this.state.resultsPerPage * (currentPage + 1) <= this.state.resultsPerPage * this.state.maxPage) && (currentPage >= 0)) {
            if (this.isInfiniteScrollEnabled()) {
                // If we're doing infinite scroll, grab all results up to the current page.
                data = first(data, (currentPage + 1) * this.state.resultsPerPage);
            } else {
                // the 'rest' is grabbing the whole array from index on and the 'initial' is getting the first n results
                const rest = drop(data, currentPage * this.state.resultsPerPage);
                data = (dropRight || initial)(rest, rest.length - this.state.resultsPerPage);
            }
        }
        const transformedData = [];

        for (let i = 0; i < data.length; i++) {
            const mappedData = data[i];

            if (typeof mappedData[that.props.childrenColumnName] !== 'undefined' && mappedData[that.props.childrenColumnName].length > 0) {
                // internally we're going to use children instead of whatever it is so we don't have to pass the custom name around
                mappedData['children'] = that.getDataForRender(mappedData[that.props.childrenColumnName], cols, false);

                if (that.props.childrenColumnName !== 'children') { delete mappedData[that.props.childrenColumnName]; }
            }

            transformedData.push(mappedData);
        }
        return transformedData;
    },
    // this is the current results
    getCurrentResults() {
        return this.state.filteredResults || this.props.results;
    },
    getCurrentPage() {
        return this.props.externalCurrentPage || this.state.page;
    },
    getCurrentSort() {
        return this.props.useExternal ? this.props.externalSortColumn : this.state.sortColumn;
    },
    getCurrentSortAscending() {
        return this.props.useExternal ? this.props.externalSortAscending : this.state.sortDirection === 'asc';
    },
    getCurrentMaxPage() {
        return this.props.useExternal ? this.props.externalMaxPage : this.state.maxPage;
    },
    // This takes the props relating to sort and puts them in one object
    getSortObject() {
        return {
            enableSort: this.props.enableSort,
            changeSort: this.changeSort,
            sortColumn: this.getCurrentSort(),
            sortAscending: this.getCurrentSortAscending(),
            sortDirection: this.state.sortDirection,
            sortAscendingClassName: this.props.sortAscendingClassName,
            sortDescendingClassName: this.props.sortDescendingClassName,
            sortAscendingComponent: this.props.sortAscendingComponent,
            sortDescendingComponent: this.props.sortDescendingComponent,
            sortDefaultComponent: this.props.sortDefaultComponent,
        };
    },

    getSelectedRowIds() {
        return this.state.selectedRowIds;
    },

    // This takes the props relating to multiple selection and puts them in one object
    getMultipleSelectionObject() {
        return {
            isMultipleSelection: find(this.props.results, result => { return 'children' in result; }) ? false : this.props.isMultipleSelection, // does not support subgrids
            toggleSelectAll: this._toggleSelectAll,
            getIsSelectAllChecked: this._getIsSelectAllChecked,

            toggleSelectRow: this._toggleSelectRow,
            getSelectedRowIds: this.getSelectedRowIds,
            getIsRowChecked: this._getIsRowChecked,
        };
    },

    getClearFixStyles() {
        return {
            clear: 'both',
            display: 'table',
            width: '100%',
        };
    },
    getSettingsStyles() {
        return {
            'float': 'left',
            width: '50%',
            textAlign: 'right',
        };
    },
    getFilterStyles() {
        return {
            'float': 'left',
            width: '50%',
            textAlign: 'left',
            color: '#222',
            minHeight: '1px',
        };
    },
    getFilter() {
        return ((this.props.showFilter && this.shouldUseCustomGridComponent() === false) ?
            (this.props.useCustomFilterComponent ?
                <CustomFilterContainer changeFilter={this.setFilter} placeholderText={this.props.filterPlaceholderText} customFilterComponent={this.props.customFilterComponent} results={this.props.results} currentResults={this.getCurrentResults() } /> :
                <GridFilter changeFilter={this.setFilter} placeholderText={this.props.filterPlaceholderText} />) :
            '');
    },
    getSettings() {
        return (this.props.showSettings ?
            <button type="button" className={this.props.settingsToggleClassName} onClick={this.toggleColumnChooser}
                style={this.props.useGriddleStyles ? { background: 'none', border: 'none', padding: 0, margin: 0, fontSize: 14 } : null}
            >
                {this.props.settingsText}{this.props.settingsIconComponent}
            </button> :
            '');
    },
    getTopSection(filter, settings) {
        if (this.props.showFilter === false && this.props.showSettings === false) {
            return '';
        }

        let filterStyles = null;
        let settingsStyles = null;
        let topContainerStyles = null;

        if (this.props.useGriddleStyles) {
            filterStyles = this.getFilterStyles();
            settingsStyles = this.getSettingsStyles();

            topContainerStyles = this.getClearFixStyles();
        }

        return (
            <div className="top-section" style={topContainerStyles}>
                <div className="griddle-filter" style={filterStyles}>
                    {filter}
                </div>
                <div className="griddle-settings-toggle" style={settingsStyles}>
                    {settings}
                </div>
            </div>);
    },
    getPagingSection(currentPage, maxPage) {
        if ((this.props.showPager && !this.isInfiniteScrollEnabled() && !this.shouldUseCustomGridComponent()) === false) {
            return undefined;
        }

        return (
            <div className="griddle-footer">
                {this.props.useCustomPagerComponent ?
                    <CustomPaginationContainer customPagerComponentOptions={this.props.customPagerComponentOptions} next={this.nextPage} previous={this.previousPage} currentPage={currentPage} maxPage={maxPage} setPage={this.setPage} nextText={this.props.nextText} previousText={this.props.previousText} customPagerComponent={this.props.customPagerComponent}/> :
                    <GridPagination useGriddleStyles={this.props.useGriddleStyles} next={this.nextPage} previous={this.previousPage} nextClassName={this.props.nextClassName} nextIconComponent={this.props.nextIconComponent} previousClassName={this.props.previousClassName} previousIconComponent={this.props.previousIconComponent} currentPage={currentPage} maxPage={maxPage} setPage={this.setPage} nextText={this.props.nextText} previousText={this.props.previousText}/>
                }
            </div>
        );
    },
    getColumnSelectorSection(keys, cols) {
        return this.state.showColumnChooser ? (
            <GridSettings columns={keys} selectedColumns={cols} setColumns={this.setColumns} settingsText={this.props.settingsText}
                settingsIconComponent={this.props.settingsIconComponent} maxRowsText={this.props.maxRowsText} setPageSize={this.setPageSize}
                showSetPageSize={!this.shouldUseCustomGridComponent() } resultsPerPage={this.state.resultsPerPage} enableToggleCustom={this.props.enableToggleCustom}
                toggleCustomComponent={this.toggleCustomComponent} useCustomComponent={this.shouldUseCustomRowComponent() || this.shouldUseCustomGridComponent() }
                useGriddleStyles={this.props.useGriddleStyles} enableCustomFormatText={this.props.enableCustomFormatText} columnMetadata={this.props.columnMetadata}
            />
        ) : '';
    },
    getCustomGridSection() {
        return <this.props.customGridComponent data={this.props.results} className={this.props.customGridComponentClassName} {...this.props.gridMetadata} content={this.props.content} rowSelected={this.props.rowSelected} />;
    },
    getCustomRowSection(data, cols, meta, pagingContent, globalData) {
        return (<div><CustomRowComponentContainer data={data} columns={cols} metadataColumns={meta} globalData={globalData}
            className={this.props.customRowComponentClassName} customComponent={this.props.customRowComponent}
            style={this.props.useGriddleStyles ? this.getClearFixStyles() : null}
        />{this.props.showPager && pagingContent}</div>);
    },
    getStandardGridSection(data, cols, meta, pagingContent, hasMorePages) {
        const sortProperties = this.getSortObject();
        const multipleSelectionProperties = this.getMultipleSelectionObject();

        // no data section
        const showNoData = this.shouldShowNoDataSection(data);
        const noDataSection = this.getNoDataSection();

        return (<div className="griddle-body"><GridTable useGriddleStyles={this.props.useGriddleStyles}
            noDataSection={noDataSection}
            showNoData={showNoData}
            columnSettings={this.columnSettings}
            rowSettings = {this.rowSettings}
            sortSettings={sortProperties}
            multipleSelectionSettings={multipleSelectionProperties}
            filterByColumn={this.filterByColumn}
            isSubGriddle={this.props.isSubGriddle}
            useGriddleIcons={this.props.useGriddleIcons}
            useFixedLayout={this.props.useFixedLayout}
            showPager={this.props.showPager}
            pagingContent={pagingContent}
            data={data}
            className={this.props.tableClassName}
            enableInfiniteScroll={this.isInfiniteScrollEnabled() }
            nextPage={this.nextPage}
            showTableHeading={this.props.showTableHeading}
            useFixedHeader={this.props.useFixedHeader}
            parentRowCollapsedClassName={this.props.parentRowCollapsedClassName}
            parentRowExpandedClassName={this.props.parentRowExpandedClassName}
            parentRowCollapsedComponent={this.props.parentRowCollapsedComponent}
            parentRowExpandedComponent={this.props.parentRowExpandedComponent}
            bodyHeight={this.props.bodyHeight}
            paddingHeight={this.props.paddingHeight}
            rowHeight={this.props.rowHeight}
            infiniteScrollLoadTreshold={this.props.infiniteScrollLoadTreshold}
            externalLoadingComponent={this.props.externalLoadingComponent}
            externalIsLoading={this.props.externalIsLoading}
            hasMorePages={hasMorePages}
            onRowClick={this.props.onRowClick}
            content={this.props.content}
            rowExpnader={this.props.rowExpnader}
            freezeFirst={(!isEmpty(node) ? true : false) }
            customClick={this.props.customClick}
            minHeigth={this.props.minHeigth}
            rowClickIndex={this.props.rowClickIndex}
            rowCustomClass={this.props.rowCustomClass}
            isFooterEnabled={this.props.isFooterEnabled}
        /></div>);
    },
    getContentSection(data, cols, meta, pagingContent, hasMorePages, globalData) {
        if (this.shouldUseCustomGridComponent() && this.props.customGridComponent !== null) {
            return this.getCustomGridSection();
        } else if (this.shouldUseCustomRowComponent()) {
            return this.getCustomRowSection(data, cols, meta, pagingContent, globalData);
        } else {
            return this.getStandardGridSection(data, cols, meta, pagingContent, hasMorePages);
        }
    },
    getNoDataSection() {
        if (this.props.customNoDataComponent != null) {
            return (<div className={this.props.noDataClassName}>{this.props.customNoDataComponent}</div>);
        }
        return (<GridNoData noDataMessage={this.props.noDataMessage} />);
    },
    setPageSize(size) {
        if (this.props.useExternal) {
            this.setState({
                resultsPerPage: size,
            });
            this.props.externalSetPageSize(size);
            return;
        }

        // make this better.
        this.state.resultsPerPage = size;

        this.setMaxPage();
    },
    getMaxPage(results, totalResults) {
        if (this.props.useExternal) {
            return this.props.externalMaxPage;
        }

        if (!totalResults) {
            totalResults = (results || this.getCurrentResults()).length;
        }
        const maxPage = Math.ceil(totalResults / this.state.resultsPerPage);
        return maxPage;
    },
    setMaxPage(results) {
        const maxPage = this.getMaxPage(results);
        // re-render if we have new max page value
        if (this.state.maxPage !== maxPage) {
            this.setState({ page: 0, maxPage: maxPage, filteredColumns: this.columnSettings.filteredColumns });
        }
    },
    setPage(number) {
        if (this.props.useExternal) {
            this.props.externalSetPage(number);
            return;
        }

        // check page size and move the filteredResults to pageSize * pageNumber
        if (number * this.state.resultsPerPage <= this.state.resultsPerPage * this.state.maxPage) {
            const that = this;
                const state = {
                    page: number,
                };

            that.setState(state);
        }

        // When infinite scrolling is enabled, uncheck the "select all" checkbox, since more unchecked rows will be appended at the end
        if (this.props.enableInfiniteScroll) {
            this.setState({
                isSelectAllChecked: !this.state.isSelectAllChecked,
            });
        } else { // When the paging is done on the server, the previously selected rows on a certain page might not
            // coincide with the new rows on that exact page page, if moving back and forth. Better reset the selection
            this._resetSelectedRows();
        }
    },
    setColumns(columns) {
        this.columnSettings.filteredColumns = isArray(columns) ? columns : [columns];

        this.setState({
            filteredColumns: this.columnSettings.filteredColumns,
        });
    },

    setFilter(filter) {
        if (this.props.useExternal) {
            this.props.externalSetFilter(filter);
            return;
        }

        const that = this;
         const updatedState = {
                page: 0,
                filter: filter,
            };

        // Obtain the state results.
        updatedState.filteredResults = this.props.useCustomFilterer ?
            this.props.customFilterer(this.props.results, filter) :
            this.defaultFilter(this.props.results, filter);

        // Update the max page.
        updatedState.maxPage = that.getMaxPage(updatedState.filteredResults);

        // if filter is null or undefined reset the filter.
        if (isUndefined(filter) || isNull(filter) || isEmpty(filter)) {
            updatedState.filter = filter;
            updatedState.filteredResults = null;
        }

        // Set the state.
        that.setState(updatedState);

        this._resetSelectedRows();
    },
    getRearrangeData(data) {
        let results = [];

        // let node=[];
        if (initialLoad) {
            const columns = this.columnSettings.getColumns();

            data.map((row, rowIdx) => {
                const dataView = assign({}, row);

                const nodes = toPairs(deep.pick(dataView, without(columns, 'children')));

                nodes.map(col => {
                    const meta = this.columnSettings.getColumnMetadataByName(col[0]);
                    // && rowIdx === 0
                    if (typeof meta.freeze !== 'undefined' && meta.freeze === col[1]) {
                        node = data[rowIdx];
                    }
                    return false;
                });
                return false;
            });
        }

        // check for the freeze column only
        if (!isEmpty(node)) {
            results.push(node);
            const list = _without(data, node);
            list.map(row => {
                results.push(row);
                return false;
            });
        } else {
            results = data;
        }

        return results;
    },
    shouldShowNoDataSection(results) {
        if (this.props.allowEmptyGrid) {
            return false;
        }

        return (this.props.useExternal === false && (typeof results === 'undefined' || results.length === 0)) ||
            (this.props.useExternal === true && this.props.externalIsLoading === false && results.length === 0);
    },
    isInfiniteScrollEnabled() {
        // If a custom pager is included, don't allow for infinite scrolling.
        if (this.props.useCustomPagerComponent) {
            return false;
        }

        // Otherwise, send back the property.
        return this.props.enableInfiniteScroll;
    },
    _resetSelectedRows() {
        this.setState({
            isSelectAllChecked: false,
            selectedRowIds: [],
        });
    },

    _getIsRowChecked(row) {
        return this.state.selectedRowIds.indexOf(row[this.props.uniqueIdentifier]) > -1 ? true : false;
    },
    _getAreAllRowsChecked(selectedRowIds, visibleRowIds) {
        let i;
        let isFound;

        if (selectedRowIds.length !== visibleRowIds.length) {
            return false;
        }

        for (i = 0; i < selectedRowIds.length; i++) {
            isFound = find(visibleRowIds, (visibleRowId) => {
                return selectedRowIds[i] === visibleRowId;
            });

            if (isFound === undefined) {
                return false;
            }
        }

        return true;
    },

    _getIsSelectAllChecked() {
        return this.state.isSelectAllChecked;
    },
    _updateSelectedRowIds(id, selectedRowIds, isChecked) {
        let isFound;

        if (isChecked) {
            isFound = find(selectedRowIds, item => {
                return id === item;
            });

            if (isFound === undefined) {
                selectedRowIds.push(id);
            }
        } else {
            selectedRowIds.splice(selectedRowIds.indexOf(id), 1);
        }
    },
    _toggleSelectRow(row, isChecked) {
        const visibleRows = this.getDataForRender(this.getCurrentResults(), this.columnSettings.getColumns(), true);
         const newSelectedRowIds = JSON.parse(JSON.stringify(this.state.selectedRowIds));

        this._updateSelectedRowIds(row[this.props.uniqueIdentifier], newSelectedRowIds, isChecked);

        this.setState({
            isSelectAllChecked: this._getAreAllRowsChecked(newSelectedRowIds, map(visibleRows, this.props.uniqueIdentifier)),
            selectedRowIds: newSelectedRowIds,
        });

        this.props.rowSelected(row, isChecked);
    },
    _toggleSelectAll() {
        const visibleRows = this.getDataForRender(this.getCurrentResults(), this.columnSettings.getColumns(), true);
          const newIsSelectAllChecked = !this.state.isSelectAllChecked;
        const newSelectedRowIds = JSON.parse(JSON.stringify(this.state.selectedRowIds));

        const self = this;
        forEach(visibleRows, row => {
            self._updateSelectedRowIds(row[self.props.uniqueIdentifier], newSelectedRowIds, newIsSelectAllChecked);
        }, this);

        this.setState({
            isSelectAllChecked: newIsSelectAllChecked,
            selectedRowIds: newSelectedRowIds,
        });

        this.props.rowAllSelected(newSelectedRowIds, newIsSelectAllChecked);
    },
    verifyCustom() {
        if (this.props.useCustomGridComponent === true && this.props.customGridComponent === null) {
            console.error('useCustomGridComponent is set to true but no custom component was specified.');
        }
        if (this.props.useCustomRowComponent === true && this.props.customRowComponent === null) {
            console.error('useCustomRowComponent is set to true but no custom component was specified.');
        }
        if (this.props.useCustomGridComponent === true && this.props.useCustomRowComponent === true) {
            console.error('Cannot currently use both customGridComponent and customRowComponent.');
        }
        if (this.props.useCustomFilterer === true && this.props.customFilterer === null) {
            console.error('useCustomFilterer is set to true but no custom filter function was specified.');
        }
        if (this.props.useCustomFilterComponent === true && this.props.customFilterComponent === null) {
            console.error('useCustomFilterComponent is set to true but no customFilterComponent was specified.');
        }
    },
    verifyExternal() {
        if (this.props.useExternal === true) {
            // hooray for big ugly nested if
            if (this.props.externalSetPage === null) {
                console.error('useExternal is set to true but there is no externalSetPage function specified.');
            }

            if (this.props.externalChangeSort === null) {
                console.error('useExternal is set to true but there is no externalChangeSort function specified.');
            }

            if (this.props.externalSetFilter === null) {
                console.error('useExternal is set to true but there is no externalSetFilter function specified.');
            }

            if (this.props.externalSetPageSize === null) {
                console.error('useExternal is set to true but there is no externalSetPageSize function specified.');
            }

            if (this.props.externalMaxPage === null) {
                console.error('useExternal is set to true but externalMaxPage is not set.');
            }

            if (this.props.externalCurrentPage === null) {
                console.error('useExternal is set to true but externalCurrentPage is not set. Griddle will not page correctly without that property when using external data.');
            }
        }
    },
    changeSort(column) {
        initialLoad = false;

        if (this.props.onSort !== undefined) {
            this.initialSort(column);
            setTimeout(
                () => { this.props.onSort(column, this.state.sortDirection); },
                50
            );
        } else {
            this.initialSort(column);
            // When the sorting is done on the server, the previously selected rows might not correspond with the new ones.
            // Better reset the selection
            this._resetSelectedRows();
        }
    },
    initialSort(column) {
        if (this.props.enableSort === false) { return; }
        if (this.props.useExternal) {
            this.props.externalChangeSort(column, this.props.externalSortColumn === column ? !this.props.externalSortAscending : true);
            return;
        }
        const columnMeta = find(this.props.columnMetadata, { columnName: column }) || {};

        const sortDirectionCycle = columnMeta.sortDirectionCycle ? columnMeta.sortDirectionCycle : ['desc', 'asc'];

        let sortDirection = null;
        // Find the current position in the cycle (or -1).
        let i = sortDirectionCycle.indexOf(this.state.sortDirection && column === this.state.sortColumn ? this.state.sortDirection : null);
        // Proceed to the next position in the cycle (or start at the beginning).
        i = (i + 1) % sortDirectionCycle.length;
        if (sortDirectionCycle[i]) {
            sortDirection = sortDirectionCycle[i];
        } else {
            sortDirection = null;
        }

        if (this.state.sortDirection === undefined && this.state.sortColumn === undefined) {
            if (this.props.initialSortOrder && this.props.initialSortOrder.length > 0) {
                sortDirection = this.props.initialSortOrder;
            }
        }
        const state = {
            page: 0,
            sortColumn: column,
            sortDirection: sortDirection,
        };

        this.setState(state);
    },
    previousPage() {
        const currentPage = this.getCurrentPage();
        if (currentPage > 0) { this.setPage(currentPage - 1); }
    },
    nextPage() {
        if (this.props.useCustomPagerComponent === undefined) {
            const currentPage = this.getCurrentPage();
            if (currentPage < this.getCurrentMaxPage() - 1) { this.setPage(currentPage + 1); }
        } else {
            // this.props.next();
            let currentPage = this.getCurrentPage();
            if (currentPage < this.getCurrentMaxPage() - 1) {
                currentPage = currentPage + 1;
                this.setPage(currentPage);
                this.setPageSize(this.state.resultsPerPage * (currentPage + 1));
            } else {
                if (this.props.next !== undefined) {
                    this.props.next(this.getCurrentMaxPage(), this.state.resultsPerPage);
                }
            }
        }
    },
    toggleCustomComponent() {
        if (this.state.customComponentType === 'grid') {
            this.setState({
                useCustomGridComponent: !this.shouldUseCustomGridComponent(),
            });
        } else if (this.state.customComponentType === 'row') {
            this.setState({
                useCustomRowComponent: !this.shouldUseCustomRowComponent(),
            });
        }
    },
    shouldUseCustomGridComponent() {
        return this.isNullOrUndefined(this.state.useCustomGridComponent) ?
            this.props.useCustomGridComponent :
            this.state.useCustomGridComponent;
    },
    shouldUseCustomRowComponent() {
        return this.isNullOrUndefined(this.state.useCustomRowComponent) ?
            this.props.useCustomRowComponent :
            this.state.useCustomRowComponent;
    },
    isNullOrUndefined(value) {
        return (value === undefined || value === null);
    },
    toggleColumnChooser() {
        this.setState({
            showColumnChooser: !this.state.showColumnChooser,
        });
    },

    filterByColumn(filter, column) {
        let columnFilters = this.state.columnFilters;

        // if filter is "" remove it from the columnFilters object
        if (columnFilters.hasOwnProperty(column) && !filter) {
            columnFilters = omit(columnFilters, column);
        } else {
            const newObject = {};
            newObject[column] = filter;
            columnFilters = extend({}, columnFilters, newObject);
        }

        this.filterByColumnFilters(columnFilters);
    },
    filterByColumnFilters(columnFilters) {
        const filteredResults = Object.keys(columnFilters).reduce((previous, current) => {
            return _filter(
                previous, item => {
                    if (deep.getAt(item, current || '').toString().toLowerCase().indexOf(columnFilters[current].toLowerCase()) >= 0) {
                        return true;
                    }

                    return false;
                }
            );
        }, this.props.results);

        const newState = {
            columnFilters: columnFilters,
        };

        if (columnFilters) {
            newState.filteredResults = filteredResults;
            newState.maxPage = this.getMaxPage(newState.filteredResults);
        } else if (this.state.filter) {
            let filter;
            newState.filteredResults = this.props.useCustomFilterer ?
                this.props.customFilterer(this.props.results, filter) :
                this.defaultFilter(this.props.results, filter);
        } else {
            newState.filteredResults = null;
        }

        this.setState(newState);
    },
    defaultFilter(results, filter) {
        const that = this;
        return _filter(results, item => {
            const arr = deep.keys(item);
            for (let i = 0; i < arr.length; i++) {
                const isFilterable = that.columnSettings.getMetadataColumnProperty(arr[i], 'filterable', true);
                if (isFilterable && (deep.getAt(item, arr[i]) || '').toString().toLowerCase().indexOf(filter.toLowerCase()) >= 0) {
                    return true;
                }
            }
            return false;
        });
    },

    rowSettings: null,
    columnSettings: null,
    render() {
        const results = this.getCurrentResults();  // Attempt to assign to the filtered results, if we have any.

        // figure out if we want to show the filter section
        const filter = this.getFilter();
        const settings = this.getSettings();

        // if we have neither filter or settings don't need to render this stuff
        const topSection = this.getTopSection(filter, settings);

        let keys = [];
        const cols = this.columnSettings.getColumns();
        // figure out which columns are displayed and show only those
        let data = this.getDataForRender(results, cols, true);
        // set first row freeze
        data = this.getRearrangeData(data);

        const meta = this.columnSettings.getMetadataColumns();

        // Grab the column keys from the first results
        keys = deep.keys(omit(results[0], meta));

        // sort keys by order
        keys = this.columnSettings.orderColumns(keys);

        // Grab the current and max page values.
        const currentPage = this.getCurrentPage();
        const maxPage = this.getCurrentMaxPage();

        // Determine if we need to enable infinite scrolling on the table.
        const hasMorePages = (currentPage + 1) < maxPage;

        // Grab the paging content if it's to be displayed
        const pagingContent = this.getPagingSection(currentPage, maxPage);

        let resultContent = this.getContentSection(data, cols, meta, pagingContent, hasMorePages, this.props.globalData);

        let columnSelector = this.getColumnSelectorSection(keys, cols);

        let gridClassName = this.props.gridClassName.length > 0 ? 'griddle ' + this.props.gridClassName : 'griddle';
        // add custom to the class name so we can style it differently
        gridClassName += this.shouldUseCustomRowComponent() ? ' griddle-custom' : '';

        return (
            <div className={gridClassName}>
                {topSection}
                {columnSelector}
                <div className="griddle-container" style={this.props.useGriddleStyles && !this.props.isSubGriddle ? { border: '1px solid #DDD' } : null }>
                    {resultContent}
                </div>
            </div>
        );
    },
});

GridRowContainer.Griddle = module.exports = BDataGrid;
