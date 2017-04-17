
const React = require('react');
const GridTitle = require('./gridTitle.jsx');
const GridRowContainer = require('./gridRowContainer.jsx');

const FixedRow = require('./FixedRow');
const deep = require('./deep.js');

const assign = require('lodash/assign');
const toPairs = require('lodash/toPairs');
const without = require('lodash/without');
const GridThatsAll=require('./GridThatsAll');
let freezeFirst = false;
let rowIdx = 0;
const { PropTypes } = React;

const GridTable = React.createClass({
  propTypes: {
    content: PropTypes.object,
    data: PropTypes.array.isRequired,
    minHeigth:PropTypes.number,
    bodyHeight: PropTypes.number,
    rowHeight:PropTypes.number,
    paddingHeight:PropTypes.number,
    useFixedHeader:PropTypes.bool,
    freezeFirst:PropTypes.bool,
    externalIsLoading: PropTypes.bool,
    useGriddleIcons:PropTypes.bool,
    enableInfiniteScroll:PropTypes.bool,
    useGriddleStyles:PropTypes.bool,
    useFixedLayout:PropTypes.bool,
    showNoData: PropTypes.bool,
    columnSettings:PropTypes.object,
    rowSettings:PropTypes.object,
    showPager:PropTypes.bool,
    nextPage:PropTypes.func,
    pagingContent:PropTypes.object,
    multipleSelectionSettings:PropTypes.object,
    rowCustomClass:PropTypes.func,
    className:PropTypes.string,
    showTableHeading:PropTypes.bool,
    infiniteScrollLoadTreshold:PropTypes.number,
    externalLoadingComponent:PropTypes.string,
    noDataSection:PropTypes.object,
    sortSettings:PropTypes.object,
    filterByColumn:PropTypes.func,


  },
  getDefaultProps() {
    return {
      'data': [],
      'columnSettings': null,
      'rowSettings': null,
      'sortSettings': null,
      'multipleSelectionSettings': null,
      'className': '',
      'enableInfiniteScroll': false,
      'nextPage': null,
      'hasMorePages': false,
      'useFixedHeader': false,
      'useFixedLayout': true,
      'paddingHeight': null,
      'rowHeight': null,
      'filterByColumn': null,
      'infiniteScrollLoadTreshold': null,
      'bodyHeight': null,
      'useGriddleStyles': true,
      'useGriddleIcons': true,
      'isSubGriddle': false,
      'parentRowCollapsedClassName': 'parent-row',
      'parentRowExpandedClassName': 'parent-row expanded',
      'parentRowCollapsedComponent': '▶',
      'parentRowExpandedComponent': '▼',
      'externalLoadingComponent': null,
      'externalIsLoading': false,
      'onRowClick': null,
      'rowClickIndex': -1,
      'rowCustomClass': null,
    };
  },
  getInitialState() {
    return {
      scrollTop: 0,
      scrollHeight: this.props.bodyHeight,
      clientHeight: this.props.bodyHeight,
    };
  },
  componentDidMount() {
    // After the initial render, see if we need to load additional pages.
    this.gridScroll();
  },
  componentDidUpdate() {
    // After the subsequent renders, see if we need to load additional pages.
    this.gridScroll();
  },


  getAdjustedRowHeight() {
    return this.props.rowHeight + this.props.paddingHeight * 2; // account for padding.
  },
  getNodeContent() {
    this.verifyProps();
    const that = this;

    // figure out if we need to wrap the group in one tbody or many
    let anyHasChildren = false;

    // If the data is still being loaded, don't build the nodes unless this is an infinite scroll table.
    if (!this.props.externalIsLoading || this.props.enableInfiniteScroll) {
      let nodeData = that.props.data;
      let aboveSpacerRow = null;
      let belowSpacerRow = null;

      // If we have a row height specified, only render what's going to be visible.
      if (this.props.enableInfiniteScroll && this.props.rowHeight !== null && this.refs.scrollable !== undefined) {
        const adjustedHeight = that.getAdjustedRowHeight();
        const visibleRecordCount = Math.ceil(that.state.clientHeight / adjustedHeight);

        // Inspired by : http://jsfiddle.net/vjeux/KbWJ2/9/
        const displayStart = Math.max(0, Math.floor(that.state.scrollTop / adjustedHeight) - visibleRecordCount * 0.25);
        const displayEnd = Math.min(displayStart + visibleRecordCount * 1.25, this.props.data.length - 1);

        // Split the amount of nodes.
        nodeData = nodeData.slice(displayStart, displayEnd + 1);

        // Set the above and below nodes.
        const aboveSpacerRowStyle = { height: (displayStart * adjustedHeight) + 'px' };
        aboveSpacerRow = (<tr key={`${'above-'} ${aboveSpacerRowStyle.height}`} style={aboveSpacerRowStyle}></tr>);
        let belowSpacerRowStyle = { height: ((this.props.data.length - displayEnd) * adjustedHeight) + 'px' };
        belowSpacerRow = (<tr key={`${'below-'}${belowSpacerRowStyle.height}`} style={belowSpacerRowStyle}></tr>);
      }

      const nodes = nodeData.map((row, index) => {
        freezeFirst = false;
        const hasChildren = (typeof row['children'] !== 'undefined') && row['children'].length > 0;
        const uniqueId = that.props.rowSettings.getRowKey(row, index);

        // at least one item in the group has children.
        if (hasChildren) { anyHasChildren = hasChildren; }


        const columns = that.props.columnSettings.getColumns();

        // creates a 'view' on top the data so we will not alter the original data but will allow us to add default values to missing columns
        const dataView = assign({}, row);

        const data = toPairs(deep.pick(dataView, without(columns, 'children')));
        const nodes = data.map(col => {
          const meta = that.props.columnSettings.getColumnMetadataByName(col[0]);
          if (typeof meta.freeze !== 'undefined' && meta.freeze === col[1]) {
            freezeFirst = true;
            rowIdx = index;
          }
           return false;
        });

        if (!freezeFirst) {
          return (
            <GridRowContainer
              useGriddleStyles={that.props.useGriddleStyles}
              isSubGriddle={that.props.isSubGriddle}
              parentRowExpandedClassName={that.props.parentRowExpandedClassName}
              parentRowCollapsedClassName={that.props.parentRowCollapsedClassName}
              parentRowExpandedComponent={that.props.parentRowExpandedComponent}
              parentRowCollapsedComponent={that.props.parentRowCollapsedComponent}
              data={row}
              key={`${uniqueId} ${'-container'}`}
              uniqueId={uniqueId}
              columnSettings={that.props.columnSettings}
              rowSettings={that.props.rowSettings}
              paddingHeight={that.props.paddingHeight}
              multipleSelectionSettings={that.props.multipleSelectionSettings}
              rowHeight={that.props.rowHeight}
              hasChildren={hasChildren}
              tableClassName={that.props.className}
              onRowClick={that.props.onRowClick}
              rowIndex={index}
              content={that.props.content}
              customClick={that.props.customClick}
              rowClickIndex={that.props.rowClickIndex}
              rowCustomClass={that.props.rowCustomClass}
            />
          );
        }
        return false;
      });

      // no data section
      if (this.props.showNoData) {
        const colSpan = this.props.columnSettings.getVisibleColumnCount();
        nodes.push(<tr key="no-data-section"><td colSpan={colSpan}>{this.props.noDataSection}</td></tr>);
      }

      // Add the spacer rows for nodes we're not rendering.
      if (aboveSpacerRow) {
        nodes.unshift(aboveSpacerRow);
      }
      if (belowSpacerRow) {
        nodes.push(belowSpacerRow);
      }

      // Send back the nodes.
      return {
        nodes: nodes,
        anyHasChildren: anyHasChildren,
      };
    } else {
      return null;
    }
  },
  verifyProps() {
    if (this.props.columnSettings === null) {
      console.error("gridTable: The columnSettings prop is null and it shouldn't be");
    }
    if (this.props.rowSettings === null) {
      console.error("gridTable: The rowSettings prop is null and it shouldn't be");
    }
  },
  gridScroll() {
    if (this.props.enableInfiniteScroll && !this.props.externalIsLoading) {
      // If the scroll height is greater than the current amount of rows displayed, update the page.
      const scrollable = this.refs.scrollable;
      const scrollTop = scrollable.scrollTop;
      const scrollHeight = scrollable.scrollHeight;
      const clientHeight = scrollable.clientHeight;

      // If the scroll position changed and the difference is greater than a row height
      if (this.props.rowHeight !== null &&
        this.state.scrollTop !== scrollTop &&
        Math.abs(this.state.scrollTop - scrollTop) >= this.getAdjustedRowHeight()) {
        const newState = {
          scrollTop: scrollTop,
          scrollHeight: scrollHeight,
          clientHeight: clientHeight,
        };

        // Set the state to the new state
        this.setState(newState);
      }

      // Determine the diff by subtracting the amount scrolled by the total height, taking into consideratoin
      // the spacer's height.
      const scrollHeightDiff = scrollHeight - (scrollTop + clientHeight) - this.props.infiniteScrollLoadTreshold;

      // Make sure that we load results a little before reaching the bottom.
      const compareHeight = scrollHeightDiff * 0.6;

      if (compareHeight <= this.props.infiniteScrollLoadTreshold) {
        this.props.nextPage();
      }
    }
  },
  render() {
    const that = this;
    let nodes = [];

    // for if we need to wrap the group in one tbody or many
    let anyHasChildren = false;

    // Grab the nodes to render
    const nodeContent = this.getNodeContent();
    if (nodeContent) {
      nodes = nodeContent.nodes;
      anyHasChildren = nodeContent.anyHasChildren;
    }

    let gridStyle = null;
    let loadingContent = null;
    const tableStyle = {
      width: '100%',
    };

    if (this.props.useFixedLayout) {
      tableStyle.tableLayout = 'fixed';
    }

    // if (this.props.enableInfiniteScroll)
    // require for custom pager
    {
      // If we're enabling infinite scrolling, we'll want to include the max height of the grid body + allow scrolling.
      gridStyle = {
        'position': 'relative',
        // 'overflow': 'hidden',
        'width': '100%',
      };
      if (this.props.minHeigth !== undefined && this.props.minHeigth > 0) {
        gridStyle = {
          'position': 'relative',
          // 'overflow': 'hidden',
          'width': '100%',
          'minHeight': this.props.minHeigth + 'px',
        };
      }
    }

    // If we're currently loading, populate the loading content
    if (this.props.externalIsLoading) {
      let defaultLoadingStyle = null;
      let defaultColSpan = null;

      if (this.props.useGriddleStyles) {
        defaultLoadingStyle = {
          textAlign: 'center',
          paddingBottom: '40px',
        };
      }

      defaultColSpan = this.props.columnSettings.getVisibleColumnCount();

      const loadingComponent = this.props.externalLoadingComponent ?
        (<this.props.externalLoadingComponent/>) :
        (<div>Loading...</div>);

      loadingContent = (<tbody><tr><td style={defaultLoadingStyle} colSpan={defaultColSpan}>{loadingComponent}</td></tr></tbody>);
    }


    // construct the table heading component
    const tableHeading = (this.props.showTableHeading ?
      <GridTitle useGriddleStyles={this.props.useGriddleStyles} useGriddleIcons={this.props.useGriddleIcons}
        sortSettings={this.props.sortSettings}
        multipleSelectionSettings={this.props.multipleSelectionSettings}
        columnSettings={this.props.columnSettings}
        filterByColumn={this.props.filterByColumn}
        rowSettings={this.props.rowSettings}
        content={this.props.content}
      />
      : undefined);

    let firstNode = undefined;
    if (this.props.freezeFirst) {
      firstNode = (<thead>
        <FixedRow useGriddleStyles={that.props.useGriddleStyles}
          isSubGriddle={that.props.isSubGriddle}
          parentRowExpandedClassName={that.props.parentRowExpandedClassName}
          parentRowCollapsedClassName={that.props.parentRowCollapsedClassName}
          parentRowExpandedComponent={that.props.parentRowExpandedComponent}
          parentRowCollapsedComponent={that.props.parentRowCollapsedComponent}
          data={this.props.data[0]}
          key={'fixed-container'}
          uniqueId={'uniqueId'}
          columnSettings={that.props.columnSettings}
          rowSettings={that.props.rowSettings}
          paddingHeight={that.props.paddingHeight}
          multipleSelectionSettings={that.props.multipleSelectionSettings}
          rowHeight={that.props.rowHeight}
          hasChildren={false}
          tableClassName={that.props.className}
          onRowClick={that.props.onRowClick}
          rowIndex={0}
          content={that.props.content}
          customClick={that.props.customClick} rowClickIndex={that.props.rowClickIndex} rowCustomClass={this.props.rowCustomClass}
        />
      </thead>);
      nodes = nodes.slice(1);
    }


    // check to see if any of the rows have children... if they don't wrap everything in a tbody so the browser doesn't auto do this
    if (!anyHasChildren) {
      nodes = <tbody>{nodes}</tbody>;
    }

    let pagingContent = <tbody />;
    if (this.props.showPager) {
      const pagingStyles = this.props.useGriddleStyles ?
        {
          padding: '0px',
          backgroundColor: '#EDEDED',
          border: '0px',
          color: '#222',
          height: this.props.showNoData ? '20px' : null,
        }
        : null;

      pagingContent = (<tbody><tr>
        <td colSpan={this.props.multipleSelectionSettings.isMultipleSelection ? this.props.columnSettings.getVisibleColumnCount() + 1 : this.props.columnSettings.getVisibleColumnCount() } style={pagingStyles} className="footer-container">
          {!this.props.showNoData ? this.props.pagingContent : null}
        </td>
      </tr></tbody>);
    }

    // If we have a fixed header, split into two tables.
    if (this.props.useFixedHeader) {
      if (this.props.useGriddleStyles) {
        tableStyle.tableLayout = 'fixed';
      }


      return (<div>
        <div className="transaction-data-head">
          <div className="transaction-data-head-container">
            <table className={this.props.className} style={(this.props.useGriddleStyles && tableStyle) || null}>
              {tableHeading}
              {
                firstNode !== undefined ?
                  firstNode : null
              }
            </table>
          </div>
        </div>
        <div ref="scrollable" onScroll={this.gridScroll} className="transaction-data-grid" style={gridStyle}>
          <div className="transaction-data-grid-container">
            <table className={this.props.className} style={(this.props.useGriddleStyles && tableStyle) || null}>
              {nodes}
              {loadingContent}
            </table> 
            {this.props.isFooterEnabled &&
              <GridThatsAll />
            }
            <table>
              {pagingContent}
            </table>
          </div>
        </div>
      </div>);
    }

    return (<div ref="scrollable" onScroll={this.gridScroll} style={gridStyle}>
      <table className={this.props.className} style={(this.props.useGriddleStyles && tableStyle) || null}>
        {tableHeading}
        {nodes}
        {loadingContent}
      </table>
      <table>
        {pagingContent}
      </table>
    </div>);
  },
});

module.exports = GridTable;
