
const React = require('react');
const assign = require('lodash/assign');
const { PropTypes } = React;

const DefaultHeaderComponent = React.createClass({
        propTypes: {
        displayName: PropTypes.string,
    },
    render() {
        return (<span>{this.props.displayName}</span>);
    },
});

const GridTitle = React.createClass({
    propTypes: {
        multipleSelectionSettings: PropTypes.object,
        columnSettings: PropTypes.object,
        sortSettings:PropTypes.object,
        headerStyles:PropTypes.object,
    },
    getDefaultProps() {
        return {
            'columnSettings': null,
            'filterByColumn'() {
            },
            'rowSettings': null,
            'sortSettings': null,
            'multipleSelectionSettings': null,
            'headerStyle': null,
            'useGriddleStyles': true,
            'useGriddleIcons': true,
            'headerStyles': {},
        };
    },
    componentWillMount() {
        this.verifyProps();
    },
    sort(column) {
        const that = this;
        return () => {
            that.props.sortSettings.changeSort(column);
        };
    },
    toggleSelectAll() {
        this.props.multipleSelectionSettings.toggleSelectAll();
    },
    handleSelectionChange() {
        // hack to get around warning message that's not helpful in this case
        return;
    },
    verifyProps() {
        if (this.props.columnSettings === null) {
            console.error("gridTitle: The columnSettings prop is null and it shouldn't be");
        }

        if (this.props.sortSettings === null) {
            console.error("gridTitle: The sortSettings prop is null and it shouldn't be");
        }
    },
    render() {
        this.verifyProps();
        const that = this;
        let titleStyles = {};

        const nodes = this.props.columnSettings.getColumns().map(col => {
            let defaultTitleStyles = {};
            let columnSort = '';
            const columnIsSortable = that.props.columnSettings.getMetadataColumnProperty(col, 'sortable', true);
            let sortComponent = columnIsSortable ? that.props.sortSettings.sortDefaultComponent : null;

            if (that.props.sortSettings.sortColumn === col && that.props.sortSettings.sortDirection === 'asc') {
                columnSort = that.props.sortSettings.sortAscendingClassName;
                sortComponent = that.props.useGriddleIcons && that.props.sortSettings.sortAscendingComponent;
            } else if (that.props.sortSettings.sortColumn === col && that.props.sortSettings.sortDirection === 'desc') {
                columnSort += that.props.sortSettings.sortDescendingClassName;
                sortComponent = that.props.useGriddleIcons && that.props.sortSettings.sortDescendingComponent;
            }

            const meta = that.props.columnSettings.getColumnMetadataByName(col);
            const displayName = that.props.columnSettings.getMetadataColumnProperty(col, 'displayName', col);
            const HeaderComponent = that.props.columnSettings.getMetadataColumnProperty(col, 'customHeaderComponent', DefaultHeaderComponent);

            columnSort = meta == null ? columnSort : (columnSort && (columnSort + ' ') || columnSort) + that.props.columnSettings.getMetadataColumnProperty(col, 'cssClassName', '');

            if (that.props.useGriddleStyles) {
                defaultTitleStyles = {
                    backgroundColor: '#EDEDEF',
                    border: '0px',
                    borderBottom: '1px solid #DDD',
                    color: '#222',
                    padding: '5px',
                    cursor: columnIsSortable ? 'pointer' : 'default',
                };
            }
            titleStyles = meta && meta.titleStyles ? assign({}, defaultTitleStyles, meta.titleStyles) : assign({}, defaultTitleStyles);

            const ComponentClass = displayName ? 'th' : 'td';
            return (
                <ComponentClass onClick={columnIsSortable ? that.sort(col) : null} data-title={col} className={columnSort} key={col}
                    style={titleStyles}
                >
                    <HeaderComponent columnName={col} displayName={displayName}
                        filterByColumn={that.props.filterByColumn}
                    />
                    {sortComponent}
                </ComponentClass>);
        });

        if (nodes && this.props.multipleSelectionSettings.isMultipleSelection) {
            nodes.unshift(<th key="selection" onClick={this.toggleSelectAll} className="selection-column">

                <div className="option-select" key="selection">
                    <input type="checkbox" id="chk1" name="checkbox" checked={this.props.multipleSelectionSettings.getIsSelectAllChecked() }
                        onChange={this.handleSelectionChange}
                    />
                    <label htmlFor="1" ></label>
                </div>
            </th>);
        }

        // Get the row from the row settings.
        const className = that.props.rowSettings && that.props.rowSettings.getHeaderRowMetadataClass() || null;

        return (
            <thead>
                <tr
                    className={className}
                    style={this.props.headerStyles}
                >
                    {nodes}
                </tr>
            </thead>
        );
    },
});

module.exports = GridTitle;
