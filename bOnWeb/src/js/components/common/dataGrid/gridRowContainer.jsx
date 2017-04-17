
const React = require('react');
const pick = require('lodash/pick');
const { PropTypes } = React;

const GridRowContainer = React.createClass({
  propTypes: {
    content: PropTypes.object,
    rowSettings: PropTypes.object,
    customClick: PropTypes.func,
    columnSettings: PropTypes.object,
    data: PropTypes.object.isRequired,
    useGriddleStyles: PropTypes.bool,
    isSubGriddle: PropTypes.bool,
    parentRowExpandedClassName: PropTypes.string,
    parentRowCollapsedClassName: PropTypes.string,
    parentRowExpandedComponent: PropTypes.string,
    parentRowCollapsedComponent: PropTypes.string,
    multipleSelectionSettings: PropTypes.object,
    rowIndex: PropTypes.number,

  },
  getDefaultProps() {
    return {
      'useGriddleStyles': true,
      'useGriddleIcons': true,
      'isSubGriddle': false,
      'columnSettings': null,
      'rowSettings': null,
      'paddingHeight': null,
      'rowHeight': null,
      'parentRowCollapsedClassName': 'parent-row',
      'parentRowExpandedClassName': 'parent-row expanded',
      'parentRowCollapsedComponent': '▶',
      'parentRowExpandedComponent': '▼',
      'onRowClick': null,
      'multipleSelectionSettings': null,
      'rowClickIndex': -1,
    };
  },
  getInitialState() {
    return {
      'data': {
      },
      'showChildren': false,
    };
  },
  componentWillReceiveProps() {
    this.setShowChildren(false);
  },

  setShowChildren(visible) {
    this.setState({
      showChildren: visible,
    });
  },
  toggleChildren() {
    this.setShowChildren(this.state.showChildren === false);
  },
  verifyProps() {
    if (this.props.columnSettings === null) {
      console.error("gridRowContainer: The columnSettings prop is null and it shouldn't be");
    }
  },
  render() {
    this.verifyProps();
    const that = this;
    if (typeof this.props.data === 'undefined') { return (<tbody></tbody>); }
    const arr = [];

    const columns = this.props.columnSettings.getColumns();

    arr.push(
      <this.props.rowSettings.rowComponent
        useGriddleStyles={this.props.useGriddleStyles}
        isSubGriddle={this.props.isSubGriddle}
        data={this.props.rowSettings.isCustom ? pick(this.props.data, columns) : this.props.data}
        rowData={this.props.rowSettings.isCustom ? this.props.data : null }
        columnSettings={this.props.columnSettings}
        rowSettings={this.props.rowSettings}
        hasChildren={that.props.hasChildren}
        toggleChildren={that.toggleChildren}
        showChildren={that.state.showChildren}
        key={`${that.props.uniqueId}${'_base_row'}`}
        useGriddleIcons={that.props.useGriddleIcons}
        parentRowExpandedClassName={this.props.parentRowExpandedClassName}
        parentRowCollapsedClassName={this.props.parentRowCollapsedClassName}
        parentRowExpandedComponent={this.props.parentRowExpandedComponent}
        parentRowCollapsedComponent={this.props.parentRowCollapsedComponent}
        paddingHeight={that.props.paddingHeight}
        rowHeight={that.props.rowHeight}
        onRowClick={that.props.onRowClick}
        multipleSelectionSettings={this.props.multipleSelectionSettings}
        rowIndex={this.props.rowIndex}
        content={this.props.content}
        customClick={this.props.customClick}
        rowClickIndex={that.props.rowClickIndex}
        rowCustomClass={that.props.rowCustomClass}
      />
    );

    let children = null;

    if (that.state.showChildren) {
      children = that.props.hasChildren && this.props.data['children'].map((row, index) => {
        const key = that.props.rowSettings.getRowKey(row, index);

        if (typeof row['children'] !== 'undefined') {
          const Griddle = that.constructor.Griddle;
          return (
            <tr key={key} style={{ paddingLeft: 5 }}>
              <td colSpan={that.props.columnSettings.getVisibleColumnCount() } className="griddle-parent" style={that.props.useGriddleStyles ? { border: 'none', 'padding': '0 0 0 5px' } : null}>
                <Griddle
                  rowMetadata={{ key: 'id' }}
                  isSubGriddle
                  results={[row]}
                  columns={that.props.columnSettings.getColumns() }
                  tableClassName={that.props.tableClassName}
                  parentRowExpandedClassName={that.props.parentRowExpandedClassName}
                  parentRowCollapsedClassName={that.props.parentRowCollapsedClassName}
                  showTableHeading={false}
                  showPager={false}
                  columnMetadata={that.props.columnSettings.columnMetadata}
                  parentRowExpandedComponent={that.props.parentRowExpandedComponent}
                  parentRowCollapsedComponent={that.props.parentRowCollapsedComponent}
                  paddingHeight={that.props.paddingHeight}
                  rowHeight={that.props.rowHeight}
                  content={this.props.content}
                />
              </td>
            </tr>
          );
        }

        return (
          <that.props.rowSettings.rowComponent
            useGriddleStyles={that.props.useGriddleStyles}
            isSubGriddle={that.props.isSubGriddle}
            data={row}
            columnSettings={that.props.columnSettings}
            isChildRow
            columnMetadata={that.props.columnSettings.columnMetadata}
            key={key}
            content={this.props.content}
          />
        );
      });
    }

    return that.props.hasChildren === false ? arr[0] : <tbody>{that.state.showChildren ? arr.concat(children) : arr}</tbody>;
  },
});

module.exports = GridRowContainer;
