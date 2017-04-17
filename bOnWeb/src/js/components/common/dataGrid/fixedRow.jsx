
const React = require('react');
const deep = require('./deep.js');
const isFunction = require('lodash/isFunction');
const zipObject = require('lodash/zipObject');
const assign = require('lodash/assign');
const defaults = require('lodash/defaults');
const toPairs = require('lodash/toPairs');
const without = require('lodash/without');
const { PropTypes } = React;

const FixedRow = React.createClass({
    propTypes: {

        data: PropTypes.object.isRequired,
        content: PropTypes.object,
        onRowClick: PropTypes.func,
        toggleChildren: PropTypes.func,
        hasChildren: PropTypes.bool,
        useGriddleStyles: PropTypes.bool,
        parentRowCollapsedClassName: PropTypes.string,
        parentRowExpandedClassName: PropTypes.string,
        multipleSelectionSettings: PropTypes.string,
        columnSettings: PropTypes.string,
        parentRowCollapsedComponent: PropTypes.string,
        parentRowExpandedComponent: PropTypes.string,
        paddingHeight: PropTypes.number,
        rowHeight: PropTypes.number,
        showChildren: PropTypes.bool,
        useGriddleIcons: PropTypes.bool,
        isChildRow: PropTypes.bool,
    },

    getDefaultProps() {
        return {
            'isChildRow': false,
            'showChildren': false,
            'data': {},
            'columnSettings': null,
            'rowSettings': null,
            'hasChildren': false,
            'useGriddleStyles': true,
            'useGriddleIcons': true,
            'isSubGriddle': false,
            'paddingHeight': null,
            'rowHeight': null,
            'parentRowCollapsedClassName': 'parent-row',
            'parentRowExpandedClassName': 'parent-row expanded',
            'parentRowCollapsedComponent': '▶',
            'parentRowExpandedComponent': '▼',
            'onRowClick': null,
            'multipleSelectionSettings': null,
            'rowClickIndex': -1,
            'rowCustomClass': null,
        };
    },
    handleClick(e) {
        // if (this.props.rowExpnader)
        //   this.setState({ colStyle: this.EcolumnStyle() });

        if (this.props.onRowClick !== null && isFunction(this.props.onRowClick)) {
            this.props.onRowClick(this, e);
        } else if (this.props.hasChildren) {
            this.props.toggleChildren();
        }
    },
    handleSelectionChange() {
        // hack to get around warning that's not super useful in this case
        return;
    },
    handleSelectClick(e) {
        if (this.props.multipleSelectionSettings.isMultipleSelection) {
            if (e.target.type === 'checkbox') {
                this.props.multipleSelectionSettings.toggleSelectRow(this.props.data, this.refs.selected.checked);
            } else {
                this.props.multipleSelectionSettings.toggleSelectRow(this.props.data, !this.refs.selected.checked);
            }
        }
    },
    verifyProps() {
        if (this.props.columnSettings === null) {
            console.error("gridRow: The columnSettings prop is null and it shouldn't be");
        }
    },
    formatData(data) {
        if (typeof data === 'boolean') {
            return String(data);
        }
        return data;
    },
    render() {
        // this.verifyProps();
        const that = this;
        let columnStyles = null;

        if (this.props.useGriddleStyles) {
            columnStyles = {
                margin: '0px',
                padding: this.props.paddingHeight + 'px 5px ' + this.props.paddingHeight + 'px 5px',
                height: this.props.rowHeight ? this.props.rowHeight - this.props.paddingHeight * 2 + 'px' : null,
            };
        }

        const columns = this.props.columnSettings.getColumns();

        // make sure that all the columns we need have default empty values
        // otherwise they will get clipped
        const defaultValues = zipObject(columns, []);

        // creates a 'view' on top the data so we will not alter the original data but will allow us to add default values to missing columns
        const dataView = assign({}, this.props.data);

        defaults(dataView, defaultValues);
        const data = toPairs(deep.pick(dataView, without(columns, 'children')));

        const nodes = data.map((col, index) => {
            let returnValue = null;
            const meta = this.props.columnSettings.getColumnMetadataByName(col[0]);

            // todo: Make this not as ridiculous looking
            const firstColAppend = index === 0 && this.props.hasChildren && this.props.showChildren === false && this.props.useGriddleIcons ?
                <span style={this.props.useGriddleStyles ? { fontSize: '10px', marginRight: '5px' } : null}>{this.props.parentRowCollapsedComponent}</span> :
                index === 0 && this.props.hasChildren && this.props.showChildren && this.props.useGriddleIcons ?
                    <span style={this.props.useGriddleStyles ? { fontSize: '10px' } : null}>{this.props.parentRowExpandedComponent}</span> : '';

            if (index === 0 && this.props.isChildRow && this.props.useGriddleStyles) {
                columnStyles = assign(columnStyles, { paddingLeft: 10 });
            }
            if (this.props.columnSettings.hasColumnMetadata() && typeof meta !== 'undefined' && meta !== null) {
                if (typeof meta.customComponent !== 'undefined' && meta.customComponent !== null) {
                    let customComponent = <meta.customComponent data={col[1]} rowData={dataView} metadata={meta} content={this.props.content} customClick={that.props.customClick}/>;
                    // remove click event for custom rcomponent
                    returnValue = <td className={meta.cssClassName} key={index} style={columnStyles}>{customComponent}</td>;
                } else {
                    returnValue = (<td onClick={this.handleClick} className={meta.cssClassName} key={index} style={columnStyles}>
                        {firstColAppend}{this.formatData(col[1]) }
                    </td>);
                }
            }

            return returnValue || (<td onClick={this.handleClick} key={index} style={columnStyles}>
                {firstColAppend}{this.formatData(col[1]) } </td>);
        });

        if (nodes && this.props.multipleSelectionSettings && this.props.multipleSelectionSettings.isMultipleSelection) {
            nodes.unshift(
                <th key="selection" style={columnStyles}>
                    <input
                        type="checkbox"
                        checked={this.props.multipleSelectionSettings.getIsRowChecked(dataView) }
                        onChange={this.handleSelectionChange}
                        ref="selected"
                    />
                </th>
            );
        }

        // Get the row from the row settings.
        // <EllipsisText text={this.formatData(col[1]) } length={12}  tooltip={true} />
        let className = that.props.rowSettings && that.props.rowSettings.getBodyRowMetadataClass(that.props.data) || 'standard-row';

        if (that.props.isChildRow) {
            className = 'child-row';
        } else if (that.props.hasChildren) {
            className = that.props.showChildren ? this.props.parentRowExpandedClassName : this.props.parentRowCollapsedClassName;
        }


        return (<tr onClick={this.props.multipleSelectionSettings && this.props.multipleSelectionSettings.isMultipleSelection ? this.handleSelectClick : null} className={className}>{nodes}</tr>);
    },
});

module.exports = FixedRow;
