/**
 * @module TransactionScreen
*/

const React = require('react');
const { PropTypes } = React;
const BasicModal = require('../common/modals/ModalB');

const SpendingsActionCreator = require('../../actions/SpendingsActionCreator');
const TransactionScreenDataGrid = require('./TransactionScreenDataGrid');

const TransactionScreen = React.createClass({
    propTypes: {
        content: PropTypes.object,
        transactionsTagName: PropTypes.string,
        transactionPageSize: PropTypes.number,
        loadSpendingPage: PropTypes.number,
    },
    getInitialState() {
        return {
            isModal: false,
        };
    },
    _loadSpendingAction(key) {
        // Get Account List
        SpendingsActionCreator.getAccountsList();
        SpendingsActionCreator.getBudgetConnection();
        SpendingsActionCreator.getTagListConnection();
        SpendingsActionCreator.getBudgetPreferencesConnection();
        SpendingsActionCreator.getSpendingPageWithKey(key);
    },
    _goBack() {
        this._loadSpendingAction(this.props.loadSpendingPage);
    },
    _onRowClick() {
        this.setState({ isModal: true });
    },
    _onHide() {
        this.setState({ isModal: false });
    },
    render() {
        const content = this.props.content;
        const transactionsTagName = this.props.transactionsTagName;
        let inProgressModal;

        if (this.state.isModal) {
            inProgressModal = (<BasicModal keyboard={false} backdrop="static">
                <div className="modal_content">
                    <h3>{content.spendingTransitionInProgressHeaderText}</h3>
                    <p>{content.spendingTransitionInProgressMessage}</p>
                </div>
                <div className="modal_footer">
                    <button className="btn btn-link" onClick={this._onHide}>{content.spendingOkButtonText}</button>
                </div>
            </BasicModal>);
        }

        return (
            <div className = "main-container edit-transaction">
                <div className="row no-gutters header-row">
                    <div className="header-content">
                        <div className="col-xs-2 text-left">
                            <a className="page-options" onClick={this._goBack}>{content.spendingDoneButtonText}</a>
                        </div>
                        <div className="col-xs-8 text-center">
                            <h3>{content.spendingTransitionHeaderText1} {transactionsTagName} {content.spendingTransitionHeaderText2}</h3>
                        </div>
                        <div className="col-xs-2 text-right">
                        </div>
                    </div>
                </div>
                <div className="spendings-list">
                    <TransactionScreenDataGrid
                        content={this.props.content}
                        onRowClick={this._onRowClick}
                    />
                </div>
                {inProgressModal}
            </div>
        );
    },
});

module.exports = TransactionScreen;
