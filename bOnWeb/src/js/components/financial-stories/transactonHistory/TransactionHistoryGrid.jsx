const React = require('react');
const { PropTypes } = React;
const update = require('react-addons-update');
const _ = require('lodash');
const FinancialStoriesActionCreator = require('../../../actions/FinancialStoriesActionCreator');
const FinancialStoriesStore = require('../../../stores/FinancialStoriesStore');
const BDataGrid = require('../../common/datagrid/BDataGrid');
const BrowserUtils = require('../../../utils/BrowserUtils');
const MobileViewTransactionHistoryGrid = require('./MobileViewTransactionHistoryGrid');

const TransactionHistoryGrid = React.createClass({
    propTypes: {
        data: PropTypes.array,
        onShowProgressIconClick: PropTypes.func,
        onTagInfoClick: PropTypes.func,
        deleteTag: PropTypes.func,
        content: PropTypes.object,
        transactionTagData:PropTypes.array,
        openSideBar:PropTypes.func,
        mobileView:PropTypes.bool,
        resetTranTagSelection:PropTypes.bool,
    },
    getInitialState() {
        return {
            cols: this.createGridColumns(),
            selected: [],
            clickToSelect: false,
            transTag: [],
            rowClickIndex:-1,
            // rowCustomClass:'row-close',
        };
    },

    componentWillMount() {
         if (BrowserUtils.isMobileView()) {
			this.setState({ custGrid: true });
       }
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.openGridCheckBoxColumn) {
            this.setState({ clickToSelect:true });
        }
        if (nextProps.resetTranTagSelection) {
            this.setState({
                selected: [],
                transTag: [],
                clickToSelect:false,
            });
        }
    },
    onSetOpen(row) {
        if (row) {
            FinancialStoriesActionCreator.handleUpdateFSTagAssignment();
            this.onRowSelect(row, true);
        }
    },

    onRowSelect(row, isSelected) {
        if (isSelected) {
            this.setState({
                selected: this.state.selected.concat([row.id]),
                transTag: this.state.transTag.concat({ id: row.id, tagId: row.tagId }),
                noTagSelection: false,
            });
        } else {
            const filterTranTag = _.filter(this.state.transTag, tag => { return tag.id !== row.id; });
            this.setState({
                selected: update(this.state.selected, { $splice: [[this.state.selected.indexOf(row.id), 1]] }),
                transTag: filterTranTag, // _.remove(this.state.transTag, { tranId: row.id }), //update(this.state.transTag, { $splice: [[this.state.transTag.indexOf(row.id), 1]] }),
            });
            if (this.state.selected.length - 1 === 0) {
                this.setState({ noTagSelection: true });
            }
        }
        setTimeout(
            () => { this.props.openSideBar(this.state.transTag, this.state.noTagSelection); },
            100
        );
    },
    onRowSelectAll(currentSelectedAndDisplayData, isSelected) {
        if (isSelected) {
            this.setState({
               selected: currentSelectedAndDisplayData.map(row => row),
                transTag: this.props.data.map(row => _.pick(row, ['id', 'tagId'])),
                noTagSelection: false,
            });
        } else {
            this.setState({
                selected: [],
                transTag: [],
            });
            this.setState({ noTagSelection: true });
        }
        setTimeout(
            () => { this.props.openSideBar(this.state.transTag, this.state.noTagSelection); },
            100
        );
    },
    onPageChange(currPage, sizePerPage) {
        const pageSize = this.refs.TransactionHistoryGrid.props.resultsPerPage + sizePerPage;
        FinancialStoriesActionCreator.getTransactionHistoryPageList(pageSize);
    },
    onSortChange(sortName, sort) {
        const sortOrder = sort; // (sort === this.props.content.asc ? this.props.content.desc : this.props.content.asc);
        let sortField = sortName;
        if (sortName === 'date') {
            sortField = 'details.when';
        } else if (sortName === 'description') {
            sortField = 'details.narrative.medium.raw';
        } else if (sortName === 'type') {
            sortField = 'details.type';
        } else if (sortName === 'amount') {
            sortField = 'details.amount.value';
        }
        const sortData = { order: sortOrder, sortField: sortField };
        FinancialStoriesActionCreator.getTransactionHistorySortList(sortData);
    },

    onRowClick(row, object) {
        if (!this.state.clickToSelect) {
            const index = row instanceof Object ? row.props.rowIndex : row;
        if (this.state.rowClickIndex === index) {
            this.setState({ rowCustomClass: this.state.rowCustomClass === 'row-open' ? '' : 'row-open' });
        } else {
            this.setState({ rowCustomClass: 'row-open' });
        }
        this.setState({ rowClickIndex: index });
        }
    },

    getSortField(fieldName) {
        let column;
        switch (fieldName) {
            case 'details.when':
                column = 'date';
                break;
            case 'details.narrative.medium.raw':
                column = 'description';
                break;
            case 'details.type':
               column = 'type';
                break;
            case 'details.amount.value':
                column = 'amount';
                break;
            default:
                column = 'date';
        }
        return column;
    },

    getGridComponent() {
         return <MobileViewTransactionHistoryGrid />;
    },

    callTransactionBalanceFun(props) {
        if (!props.data) {
            return (<div className="transaction-pending" onClick={this.props.onShowProgressIconClick}>
                <svg enable-background="new 0 0 91 91" height="28px" id="Layer_1" version="1.1" viewBox="0 0 91 91" width="28px" xmlns="http://www.w3.org/2000/svg" ><g><path d="M45.2,18.577c-15.243,0-27.645,12.404-27.645,27.646c0,15.244,12.401,27.646,27.645,27.646   c15.244,0,27.645-12.402,27.645-27.646C72.845,30.981,60.444,18.577,45.2,18.577z M45.2,70.47   c-13.368,0-24.244-10.875-24.244-24.246c0-13.369,10.876-24.246,24.244-24.246c13.369,0,24.245,10.877,24.245,24.246   C69.445,59.595,58.569,70.47,45.2,70.47z"/><polygon points="46.985,26.272 43.585,26.272 43.585,47.925 54.485,47.925 54.485,44.524 46.985,44.524  "/><rect height="4.424" width="3.4" x="43.585" y="61.72"/><rect height="3.4" width="4.36" x="25.229" y="44.524"/><rect height="3.4" width="4.36" x="60.813" y="44.524"/><rect height="3.402" transform="matrix(0.7378 0.6751 -0.6751 0.7378 31.4782 -12.701)" width="4.36" x="29.907" y="32.465"/><rect height="3.401" transform="matrix(-0.738 -0.6748 0.6748 -0.738 62.1598 140.4834)" width="4.356" x="56.174" y="56.474"/><rect height="4.361" transform="matrix(-0.7377 -0.6751 0.6751 -0.7377 17.6811 125.4726)" width="3.399" x="31.514" y="57.121"/><rect height="4.36" transform="matrix(0.7377 0.6751 -0.6751 0.7377 37.3121 -29.9663)" width="3.399" x="55.523" y="30.858"/></g></svg>
            </div>);
        } else {
            const click = this.onRowClick.bind(this, props.rowIndex);
            return <span onClick={click}>{props.data}</span>;
        }
    },
    callTransactionTagFun(props) {
        let click = this.onSetOpen.bind(this, props.rowData);
        if (props.rowData.posted) {
            return (props.data !== 'Untagged' ? <span className="icon icon-tag" onClick={click}>{props.data}</span>
                : <span onClick={click} className="add-tag-grid"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 512 512"><path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208c114.9 0 208-93.1 208-208S370.9 48 256 48zM384 265H264v119h-17V265H128v-17h119V128h17v120h120V265z"></path></svg></span>);
        } else {
        return (<span />);
        }
    },

    descriptionFormatter(props) {
        if (props.data) {
            const click = this.onRowClick.bind(this, props.rowIndex);
            return <span onClick={click}><strong>{props.data}</strong><span className="city">{props.rowData.city}</span></span>;
        }
    },
    amountFormatter(props) {
        const click = this.onRowClick.bind(this, props.rowIndex);
        if (props.data) {
            return <span onClick={click}><strong>{props.data}</strong></span>;
        }
    },

    createGridColumns() {
        const gridColumn =
            [

                {
                    'columnName': 'id',
                    'order': 1,
                    'locked': false,
                    'visible': false,
                    'displayName': 'id',
                },
                {
                    'columnName': 'date',
                    'order': 2,
                    'locked': false,
                    'visible': true,
                    'displayName': 'date',
                    'sortable': true,
                    'sortDirectionCycle': ['desc', 'asc'],
                    'cssClassName': 'date-column',

                },
                {
                    'columnName': 'description',
                    'order': 3,
                    'locked': false,
                    'visible': false,
                    'displayName': 'description',
                    'sortable': true,
                    'customComponent': this.descriptionFormatter,
                    'cssClassName': 'description-column',
                },
                {
                    'columnName': 'type',
                    'order': 4,
                    'locked': false,
                    'visible': false,
                    'displayName': 'type',
                    'sortable': true,
                    'cssClassName': 'type-column',
                },
                {
                    'columnName': 'tag',
                    'order': 5,
                    'locked': false,
                    'visible': false,
                    'displayName': 'tag',
                    'sortable': false,
                    'customComponent': this.callTransactionTagFun,
                    'cssClassName': 'tag-column',

                },

                {
                    'columnName': 'amount',
                    'order': 6,
                    'locked': false,
                    'visible': false,
                    'displayName': 'amount',
                    'sortable': true,
                    'customComponent': this.amountFormatter,
                    'cssClassName': 'amount-column',
                },
                {
                    'columnName': 'balance',
                    'order': 7,
                    'locked': false,
                    'visible': false,
                    'displayName': 'balance',
                    'sortable': false,
                    'customComponent': this.callTransactionBalanceFun,
                    'multiOff':true,
                    'cssClassName': 'balance-column',
                },

            ];
        return gridColumn;
    },

    render() {
        let allowTransactions;
        let noDataText;
        let showPager = true;
        let sortColumn;
        let sortOrder;
        const state = FinancialStoriesStore.getState();
        if (state.accountDetails) {
            allowTransactions = state.accountDetails.canLoadTransactions;
            sortColumn = state.sortData.sortField ? this.getSortField(state.sortData.sortField) : 'date';
            sortOrder = state.sortData.order ? state.sortData.order : 'desc';
            noDataText = (allowTransactions && this.props.data.length === 0) ? this.props.content.noTransactionFound : this.props.content.noTransactionMessage;
            showPager = state.pageSize < state.transactionHistoryDataTotal;
        }
        if (FinancialStoriesStore.isTransactionHistoryListError()) {
            noDataText = this.props.content.transactionListViewError;
        }

        if (FinancialStoriesStore.isInternalServerError()) {
            noDataText = this.props.content.noTransactionFound;
        }

        if (FinancialStoriesStore.getLoadStatus()) {
        return (
            !this.state.custGrid ?
            (<div>
              <BDataGrid ref="TransactionHistoryGrid"
                    results={this.props.data}
                    columns={['date', 'description', 'type', 'tag', 'amount', 'balance']}
                    columnMetadata={this.state.cols} useCustomPagerComponent="true"
                    initialSortAscending={false} next={this.onPageChange} isMultipleSelection={this.state.clickToSelect}
                    rowAllSelected={this.onRowSelectAll} rowSelected={this.onRowSelect}
                    selectedRowIds={this.state.selected}
                    onSort={this.onSortChange} onRowClick={this.onRowClick} initialSort={sortColumn} initialSortOrder={sortOrder}
                    enableInfiniteScroll useFixedHeader bodyHeight={400} resultsPerPage={25}
                    content={this.props.content} rowExpnader showNoData noDataMessage={noDataText}
                    showPager={showPager} rowClickIndex={this.state.rowClickIndex}
                    customGridComponent={MobileViewTransactionHistoryGrid} rowCustomClass={this.state.rowCustomClass}
              />
              {!FinancialStoriesStore.isTransactionHistoryListError() &&
                    <div className="accountTransactionGridBottomText">{(state.transactionHistoryDataTotal > 0 && state.pageSize >= state.transactionHistoryDataTotal) && this.props.content.transactionGridMessage}</div>
              }
            </div>)
            :
                <div>
                    <MobileViewTransactionHistoryGrid resetTranTagSelection={this.props.resetTranTagSelection} openSideBar={this.props.openSideBar} content={this.props.content}
                    data={this.props.data} rowSelected={this.onRowSelect} toggle={this.props.mobileView}
                    />
                </div>
            );
        } else {
			return (<div className="loader-timeline"></div>);
		}
    },

});
module.exports = TransactionHistoryGrid;
