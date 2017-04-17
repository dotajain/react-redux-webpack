
const React = require('react');
const deep = require('./deep.js');
const isFunction = require('lodash/isFunction');
const zipObject = require('lodash/zipObject');
const assign = require('lodash/assign');
const defaults = require('lodash/defaults');
const toPairs = require('lodash/toPairs');
const without = require('lodash/without');
const isEmpty = require('lodash/isEmpty');
const { PropTypes } = React;

const GridRow = React.createClass({
    propTypes: {
        content: PropTypes.object,
        onRowClick: PropTypes.func,
        rowIndex: PropTypes.number,
        hasChildren: PropTypes.bool,
        toggleChildren: PropTypes.func,
        multipleSelectionSettings: PropTypes.object,
        parentRowCollapsedComponent: PropTypes.string,
        parentRowExpandedComponent: PropTypes.string,
        rowCustomClass:PropTypes.string,
        parentRowExpandedClassName:PropTypes.string,
        parentRowCollapsedClassName:PropTypes.string,
        data: PropTypes.object.isRequired,
        columnSettings: PropTypes.object,
        isChildRow: PropTypes.bool,
        useGriddleStyles: PropTypes.bool,
        useGriddleIcons: PropTypes.bool,
        showChildren: PropTypes.bool,
        rowClickIndex:PropTypes.number,
        paddingHeight: PropTypes.number,
        rowHeight: PropTypes.number,
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
                if (this.refs.selected !== undefined) {
                    this.props.multipleSelectionSettings.toggleSelectRow(this.props.data, !this.refs.selected.checked);
                }
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
        this.verifyProps();
        const that = this;
        let columnStyles = null;

        if (this.props.useGriddleStyles) {
            columnStyles = {
                margin: '0px',
                padding: this.props.paddingHeight + 'px 5px ' + this.props.paddingHeight + 'px 5px',
                height: this.props.rowHeight ? this.props.rowHeight - this.props.paddingHeight * 2 + 'px' : null,
            };
        }

        // let freezeFirst = false;
        const columns = this.props.columnSettings.getColumns();

        // make sure that all the columns we need have default empty values
        // otherwise they will get clipped
        const defaultValues = zipObject(columns, []);

        // creates a 'view' on top the data so we will not alter the original data but will allow us to add default values to missing columns
        const dataView = assign({}, this.props.data);

        defaults(dataView, defaultValues);
        const data = toPairs(deep.pick(dataView, without(columns, 'children')));
        let multiOff = false;
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
                    let customComponent = <meta.customComponent data={col[1]} rowData={dataView} metadata={meta} content={this.props.content} customClick={that.props.customClick} rowIndex={that.props.rowIndex}/>;
                    // remove click event for custom rcomponent
                    returnValue = <td className={meta.cssClassName} key={index} style={columnStyles}><div className="table-data">{customComponent}</div></td>;
                } else {
                    returnValue = (<td onClick={this.handleClick} className={meta.cssClassName} key={index} style={columnStyles}>
                        <div className="table-data">{firstColAppend}{this.formatData(col[1])}</div>
                    </td>);
                }
            }

            if (typeof meta.multiOff !== 'undefined' && (isEmpty(col[1]) || col[1] === false)) {
                multiOff = meta.multiOff;
            }

            //  if (typeof meta.freeze !== 'undefined' && meta.freeze === col[1] && this.props.rowIndex === 0)
            //     freezeFirst = true;

            return returnValue || (<td onClick={this.handleClick} key={index} className="selection-column">
                <div className="table-data">{firstColAppend}{this.formatData(col[1])}</div></td>);
        });

        if (nodes && this.props.multipleSelectionSettings && this.props.multipleSelectionSettings.isMultipleSelection) {
            nodes.unshift(
                <td key="selection" className="selection-column">
                    {
                        (multiOff === false)
                            ?
                            <div className="option-select" key="selection">
                                <input type="checkbox" id={`${'chk_'} ${this.props.rowIndex}`} name={`${'chk_'}${this.props.rowIndex}`} checked={this.props.multipleSelectionSettings.getIsRowChecked(dataView) }
                                    onChange={this.handleSelectionChange}
                                    ref="selected"
                                />
                                <label htmlFor={this.props.rowIndex }></label>
                            </div>
                            :
                            <span/>
                    }
                </td>
            );
        }

        // Get the row from the row settings.
        // <EllipsisText text={this.formatData(col[1]) } length={12}  tooltip={true} />
        let rowClass = '';
        if (typeof this.props.rowCustomClass !== 'undefined' && this.props.rowCustomClass !== null) {
            rowClass = 'row-close';
            if (this.props.rowClickIndex === this.props.rowIndex) {
                rowClass = this.props.rowCustomClass;
            }
        }
        let className = that.props.rowSettings && that.props.rowSettings.getBodyRowMetadataClass(that.props.data) || `standard-row ${rowClass}`;

        if (that.props.isChildRow) {
            className = 'child-row';
        } else if (that.props.hasChildren) {
            className = that.props.showChildren ? this.props.parentRowExpandedClassName : this.props.parentRowCollapsedClassName;
        }
        let rowStyle = {};
        // console.log('freezeFirst'+freezeFirst)
        // if (freezeFirst && this.props.rowIndex === 0) {
        //     rowStyle = { backgroundColor: "grey" };
        // }

        return (<tr onClick={this.props.multipleSelectionSettings && this.props.multipleSelectionSettings.isMultipleSelection ? this.handleSelectClick : null} className={className} style={rowStyle}>{nodes}</tr>);
    },
});

module.exports = GridRow;
