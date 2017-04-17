/**
 * @module GenericGrid
 */
/* https://www.npmjs.com/package/react-bootstrap-table
   http://allenfang.github.io/react-bootstrap-table/docs.html
/*
data - Array of grid data
gridColumn- Array of grid Columns
selectRow - If grid needs to have functionality as select All Row,need to pass as parameter.
            e.g.selectRow = {
                                mode: "checkbox",
                                clickToSelect: true,
                                bgColor: "rgb(238, 193, 213)",
                                onSelect: onRowSelect,
                                onSelectAll: onSelectAll
                              };
trClassName- Extra Class for table Row
search - IF want to have the search [offline i.e. search within the current data present on the grid]
 */
const React = require('react');
const { PropTypes } = React;
const BootstrapTable = require('../../pagination/lib/BootstrapTable');
const TableHeaderColumn = require('../../pagination/lib/TableHeaderColumn');

const GenericGrid = React.createClass({

  propTypes: {
    data: PropTypes.array.isRequired,
    gridColumns: PropTypes.array.isRequired,
    selectRow: PropTypes.object,
    striped: PropTypes.bool,
    trClassName : PropTypes.string,
    search : PropTypes.bool,
    hover : PropTypes.bool,
    condensed : PropTypes.bool,
    sizePerPage: PropTypes.bool,
    dataSize: PropTypes.number,
  },

getMoreRecords (currPage, sizePerPage) {
   this.props.onPageChange(currPage, sizePerPage);
     
  },
 fetchedSortedRecords (sortName, sort ) {
  //  var that = this;
  // that.refs.table.handleDeleteAll();
  this.props.onSortChange(sortName , sort); 

  },

getDefaultProps() {
    return {
     striped : false,
      search : false,
      hover : false,
      condensed : false,
      order : 'desc',
    };
},

render() {
  const options = {
      onPageChange: this.getMoreRecords,
      hideSizePerPage:true,
      nextPage: 'Load More',
      prePage: 'Load More2',
      dataSize:  this.props.dataSize,
      sizePerPage: this.props.sizePerPage,
      paginationShowsTotal :false,
      onSortChange : this.fetchedSortedRecords,
    };

    const columns = this.props.gridColumns.map((item, key) => {
      return (<TableHeaderColumn key={key} {...item} > { item.name } </TableHeaderColumn>);
    });
   return (
      <div>
          <BootstrapTable {...this.props} options ={options}>
             {columns}
          </BootstrapTable>
    </div>
    );
  },
});

module.exports = GenericGrid;
