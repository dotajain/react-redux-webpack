/**
 * @module MobileViewTransactionHistoryGrid
 */
const React = require('react');
const { PropTypes } = React;
const FinancialStoriesActionCreator = require('../../../actions/FinancialStoriesActionCreator');
const FinancialStoriesModal = require('../tag/FinancialStoriesModal');
const FinancialStoriesStore = require('../../../stores/FinancialStoriesStore');

const _ = require('lodash');

const styles = {
	disableLink: {
		pointerEvents: 'none',
		opacity: 0.3,
	},
	enableLink: {
		pointerEvents: 'auto',
	},
};
const MobileViewTransactionHistoryGrid = React.createClass({
    propTypes: {
        rowSelected: PropTypes.func,
        content: PropTypes.object,
        metadata: PropTypes.object,
        data: PropTypes.array,
        toggle: PropTypes.bool,
        openSideBar:PropTypes.func,
    },
    getDefaultProps() {
        return { 'data': [] };
    },
    getInitialState() {
        return {
            mobileRowSelectCount:0,
            transTag: [],
            rowId:'',
        };
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.resetTranTagSelection) {
            this.setState({
                transTag: [],
                mobileRowSelectCount:0,
            });
        }

        if (!this.props.toggle) {
            this.setState({
                transTag: [],
                mobileRowSelectCount:0,
            });
        }
    },
    onSetOpen(row) {
        FinancialStoriesActionCreator.handleUpdateFSTagAssignment();
        this.onRowSelect(row, true);
    },

    onShowProgressIconClick() {
        this.setState({ transactionProgressClick: true });
    },

    onAddTag() {
      this.props.openSideBar(this.state.transTag, false);
    },

   onRowSelect(row, isSelected) {
        if (!this.props.toggle) {
            if (row) {
                this.handleSelectionChange(row, isSelected);
            }
        }
    },

    onRowClick(cell) {
        const checkBox = cell.currentTarget.getElementsByTagName('input')[0];
        if (checkBox) {
            FinancialStoriesActionCreator.handleUpdateFSTagAssignment();
            const row = {};
            row.id = checkBox.id;
            row.tagId = checkBox.name.indexOf('-') > -1 ? checkBox.name : parseInt(checkBox.name); // checkBox.name === 'false' ? '' : checkBox.name;
            checkBox.checked = !checkBox.checked;
            this.handleSelectionChange(row, checkBox.checked);
            // if (cell.target.tagName.toLowerCase() !== 'label') {
            //     this.handleSelectionChange(row, checkBox.checked);
            // }
        } else {
            if (cell.target.tagName !== 'path' && !cell.target.classList.contains('icon-tag')) {
                if (this.state.rowId === cell.currentTarget.id) {
                    this.setState({ rowClass: this.state.rowClass === 'row-open' ? 'row-close' : 'row-open' });
                } else {
                    this.setState({ rowClass: 'row-open' });
                }
                this.setState({ rowId:cell.currentTarget.id });
            }
        }
    },

    callTransactionTagFun(tag, rowData) {
        let click = this.onSetOpen.bind(this, rowData);
        if (tag) {
            return (tag !== 'Untagged' ? <span className="icon icon-tag" onClick={click}>{tag}</span>
                : <span onClick={click} className="add-tag-grid"><svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 512 512"><path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208c114.9 0 208-93.1 208-208S370.9 48 256 48zM384 265H264v119h-17V265H128v-17h119V128h17v120h120V265z"></path></svg></span>);
        } else {
            return (<span />);
        }
    },
    callTransactionBalanceFun(balance) {
        if (!balance) {
            return (<span onClick={this.onShowProgressIconClick} className="glyphicon glyphicon-time"></span>);
        } else {
            return <span>{balance}</span>;
        }
    },
    handleSelectionChange(row, isSelected) {
        if (isSelected) {
            this.setState({
                transTag: this.state.transTag.concat({ id: row.id, tagId: row.tagId }),
                mobileRowSelectCount:this.state.mobileRowSelectCount + 1,
            });
        } else {
            const filterTranTag = _.filter(this.state.transTag, tag => { return tag.id !== row.id; });
            this.setState({
                transTag: filterTranTag,
                mobileRowSelectCount:this.state.mobileRowSelectCount - 1,
            });
        }
        if (!this.props.toggle) {
            setTimeout(
                () => { this.props.openSideBar(this.state.transTag, false); },
                100
            );
        }
    },
    render() {
         let allowTransactions;
        let noDataText;
        const state = FinancialStoriesStore.getState();
        if (state.accountDetails) {
            allowTransactions = state.accountDetails.canLoadTransactions;
            if (allowTransactions) {
                if (this.props.data.length === 0) {
                    noDataText = this.props.content.noTransactionFound;
                }
            } else {
                noDataText = this.props.content.noTransactionMessage;
            }
        }
        if (FinancialStoriesStore.isTransactionHistoryListError()) {
            noDataText = this.props.content.transactionListViewError;
        }
        let data = this.props.data !== undefined && this.props.data.map((data, key) => {
            let selectedRowClass = 'row-close';
            if (this.state.rowId === data.id) {
                selectedRowClass = this.state.rowClass;
            }
            return (<div key={key} id={data.id} className={`mobile-row ${selectedRowClass}`} onClick={this.onRowClick}>
                <div className="date"><strong>{data.date}</strong></div>
                <div className="details">
                    <section>
                        {this.props.toggle &&
                        <div className="option-select" key="selection">
                            <input type="checkbox" id={data.id} name={data.tagId }
                                ref="mobileSelected"
                            />
                            <label htmlFor={data.id}></label>
                        </div>
                        }
                    </section>

                    <section>
                         <div className="description">{data.description}</div>
                         <div className="tag" >{this.callTransactionTagFun(data.tag, data) }</div>
                    </section>

                    <section>
                        <div className="amount"><strong>{data.amount}</strong></div>
                        <div className="type">{data.type}</div>
                         <div className="city">{data.city}</div>
                    </section>
                </div>
            </div>);
        });
        const disableClass = this.state.mobileRowSelectCount === 0 ? styles.disableLink : styles.enableLink;
        return (

            <div className="griddle-mobile">
                { data }
                {this.props.toggle &&
                    <div className="selection-counts">
                        {this.state.mobileRowSelectCount} {this.props.content.selected}
                        <a className="add-tag" disabled={this.state.mobileRowSelectCount === 0} style={disableClass} className="page-options float-right" onClick={this.onAddTag}>{this.props.content.addTag}</a>
                    </div>
                }
                <div className="accountGridNoTransaction text-center">{noDataText}</div>
                {!FinancialStoriesStore.isTransactionHistoryListError() &&
                    <div className="accountTransactionGridBottomText">{(state.transactionHistoryDataTotal > 0 && state.transactionHistoryDataTotal === this.props.data.length) && this.props.content.transactionGridMobileMessage}</div>
                }
                <FinancialStoriesModal cancelButton yesButton={false} header={this.props.content.accountDetailsInprogressHeader} content={this.props.content.accountDetailsInprogressContent} confirmCancel={this.state.transactionProgressClick} cancelText={this.props.content.okButton} />
            </div>
        );
    },
});
module.exports = MobileViewTransactionHistoryGrid;
