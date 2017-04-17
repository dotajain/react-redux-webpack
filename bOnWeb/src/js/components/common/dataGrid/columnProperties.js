const map = require('lodash/map');
const filter = require('lodash/filter');
const find = require('lodash/find');
const sortBy = require('lodash/sortBy');
const difference = require('lodash/difference');

class ColumnProperties {
  constructor (allColumns = [], filteredColumns = [], childrenColumnName = 'children', columnMetadata = [], metadataColumns = []) {
    this.allColumns = allColumns;
    this.filteredColumns = filteredColumns;
    this.childrenColumnName = childrenColumnName;
    this.columnMetadata = columnMetadata;
    this.metadataColumns = metadataColumns;
  }

  getMetadataColumns() {
    const meta = map(filter(this.columnMetadata, { visible: false }), item => { return item.columnName;});
      if (meta.indexOf(this.childrenColumnName) < 0) {
         meta.push(this.childrenColumnName);
      }
      return meta.concat(this.metadataColumns);
  }

  getVisibleColumnCount() {
    return this.getColumns().length;
  }

  getColumnMetadataByName(name) {
    return find(this.columnMetadata, { columnName: name });
  }

  hasColumnMetadata() {
   return this.columnMetadata !== null && this.columnMetadata.length > 0;
  }

  getMetadataColumnProperty(columnName, propertyName, defaultValue) {
    const meta = this.getColumnMetadataByName(columnName);

    // send back the default value if meta isn't there
    if (typeof meta === 'undefined' || meta === null) {
        return defaultValue;
      }

    return meta.hasOwnProperty(propertyName) ? meta[propertyName] : defaultValue;
  }

  orderColumns(cols) {
    const ORDER_MAX = 100;

    const orderedColumns = sortBy(cols, item => {
        const metaItem = find(this.columnMetadata, { columnName: item });

        if (typeof metaItem === 'undefined' || metaItem === null || isNaN(metaItem.order)) {
            return ORDER_MAX;
        }

        return metaItem.order;
    });

    return orderedColumns;
  }

  getColumns() {
    // if we didn't set default or filter
    let filteredColumns = this.filteredColumns.length === 0 ? this.allColumns : this.filteredColumns;

    filteredColumns = difference(filteredColumns, this.metadataColumns);

    filteredColumns = this.orderColumns(filteredColumns);

    return filteredColumns;
  }
}

module.exports = ColumnProperties;
