/**
 * @module ManagePayee
 */
const React = require('react');
const Helmet = require('react-helmet');
const PaymentsStore = require('../../../stores/PaymentsStore');
const PayeeStore = require('../../../stores/PayeeStore');
const PaymentsActionCreator = require('../../../actions/PaymentsActionCreator');
const AnalyticsActionCreator = require('../../../actions/AnalyticsActionCreator');
const PayeeActionCreator = require('../../../actions/PayeeActionCreator');
const { PropTypes } = React;
const BDataGrid = require('../../common/datagrid/BDataGrid');
const BrowserUtils = require('../../../utils/BrowserUtils');
const MobileViewPayeeGrid = require('./MobileViewPayeeGrid');
const EditComponentPayee = require('./EditComponentPayee');
const EditPayee = require('./EditPayee');
const StringConstant = require('../../../constants/StringConstants');
const RequiresAuthenticatedUser = require('../../RequiresAuthenticatedUser');
const ErrorPopUpComponent = require('../../common/ErrorPopUpComponent');

const columnMeta = [

    {
        'columnName': 'display_name',
        'order': 1,
        'locked': false,
        'visible': true,
        'displayName': 'Nick Name',
        'sortable': true,
        'sortDirectionCycle': ['desc', 'asc'],
        'customComponent': EditComponentPayee,
        'cssClassName': 'column-name',
    },
    {
        'columnName': 'to_account.sort_code',
        'order': 2,
        'locked': false,
        'visible': true,
        'displayName': 'Sort Code',
        'sortable': true,
        'customComponent': EditComponentPayee,
        'cssClassName': 'column-code',
    },
    {
        'columnName': 'to_account.account_number',
        'order': 3,
        'locked': false,
        'visible': true,
        'displayName': 'Account Number',
        'sortable': true,
        'customComponent': EditComponentPayee,
        'cssClassName': 'column-account',
    },
    {
        'columnName': 'reference',
        'order': 4,
        'locked': false,
        'visible': true,
        'displayName': 'Reference',
        'sortable': true,
        'customComponent': EditComponentPayee,
        'cssClassName': 'column-ref-payee',
    },
    {
        'columnName': 'edit',
        'order': 5,
        'locked': false,
        'visible': true,
        'displayName': ' ',
        'sortable': false,
        'customComponent': EditComponentPayee,
        'cssClassName': 'column-edit-payee',
    },
];

const ManagePayee = React.createClass({
    propTypes: {
        content: PropTypes.object,

    },
    getInitialState() {
        return {
            payeeList: PaymentsStore.getAllPayees(),
            showEdit: false,
            showView: false,
            rowData: {},
            showEditPayee: false,
            showMore: true,
            showError: false,

        };
    },
    componentWillMount() {
        if (BrowserUtils.isMobileView()) {
            this.setState({ custGrid: true });
        }
        if (this.state.payeeList.length === 0) {
            PaymentsActionCreator.getFromPayeeList();
        }
        PaymentsStore.addChangeListener(this.onPaymentStoreChange);
        PayeeStore.addChangeListener(this.onPaymentStoreChange);
        if (this.state.payeeList.beneficiaries && this.state.payeeList.beneficiaries.length === 0) {
            const error = PaymentsStore.getPayeeError();
            if (error !== undefined) {
                this.setState({ showError: true });
            }
        }
    },

    componentDidMount() {
        AnalyticsActionCreator.track({
            path: '/user/experience/view',
            action: 'Appeared',
        }, {
                description: 'PageLoaded',
            });
    },
    shouldComponentUpdate() {
        return (this.state.custGrid || this.state.showError) ? true : PayeeStore.isPayeeExit();
    },
    componentWillUnmount() {
        PayeeStore.removeChangeListener(this.onPaymentStoreChange);
        PaymentsStore.removeChangeListener(this.onPaymentStoreChange);
    },
    onPaymentStoreChange() {
        this.setState(
            {
                payeeList: PaymentsStore.getAllPayees(),

            });
    },
    // handles onClick for mobile view
    onClick(e) {
        this.setState({ showEditPayee: e });
    },
    // close the error popup and make user input empty
    closeErrorPopup() {
        this.setState({ showError: false });
    },
    // Error Popup Show the error message coming from the services
    errorPopup() {
        // Getting error response from the store
        const response = PaymentsStore.getPayeeError();
        return (<ErrorPopUpComponent error={response.error.error}
            closeErrorPopup={this.closeErrorPopup} content={this.props.content}
            />);
    },
    // To set the showComponent for editPayee
    editPayee() {
        return this.setState({
            showComponent: true,
        });
    },
    // To set the  showEdit,showView for showEditPayee
    showEditPayee() {
        this.setState({
            showEdit: true,
            showView: false,
        });
    },
    // To set the showView payee
    showViewPayee() {
        this.setState({ showView: true });
    },
    // To set the showEdit to hideEditPayee
    hideEditPayee() {
        this.setState({
            showEdit: false,
        });
    },
    // To set showView,showEdit to hideViewPayee
    hideViewPayee() {
        this.setState({
            showView: false,
            showEdit: true,
        });
    },
    // To navigateToWebTask
    back() {
        PaymentsActionCreator.navigateToWebTask('WEB-PAYMENT-BACK');
        PaymentsActionCreator.refreshSavingComponent();
    },
    // handles row click for mobile view
    rowClick(e) {
        this.setState({ rowData: e, showEditPayee: true });
    },
    showMore() {
        this.setState({ showMore: false });
        PayeeActionCreator.isEditPayeeExit(true);
    },
    noDataText() {
        return (<div className="col-lg-8 col-md-8 col-sm-8 col-xs-12 text-center">
            <p className="padding-top-max">{this.props.content.noPayeeMsgFirstLine}</p>
            <p>{this.props.content.noPayeeMsgSecondLine}</p>
        </div>);
    },
    renderGrid() {
        if (this.state.payeeList.beneficiaries === undefined) {
            this.state.payeeList.beneficiaries = [];
        }
        const showPager = ((this.state.payeeList.beneficiaries !== undefined && this.state.payeeList.beneficiaries.length <= StringConstant.maxRow) || !this.state.showMore) ? false : true;
        const loader = this.noDataText();

        return (<div className="full-height">
            <Helmet title="Payments" />
            <div className="main-container payments payment-data payee noheader">
                <header role="navigation">
                    <div className="navigation no-head row no-gutters line-seperator">
                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                            <a className="page-options opt-green float-left" onClick={this.back}>
                                {this.props.content.done}
                            </a>
                        </div>
                        <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 text-center">
                            <div className="row">
                                <span className="icon icon-payees imageDisplay"></span>
                                <h5 className="paymentLbl-payee">{this.props.content.paymentContactTitle}</h5>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                        </div>
                    </div>
                </header>
                <div className="payment-grid">
                    <div className="row">
                        {this.state.custGrid ?
                            <MobileViewPayeeGrid data={this.state.payeeList.beneficiaries} content={this.props.content} rowClick={this.rowClick}/>
                            :
                            <BDataGrid results={this.state.payeeList.beneficiaries}
                                columns={['display_name', 'to_account.sort_code', 'to_account.account_number', 'reference', 'edit']}
                                columnMetadata={columnMeta}
                                useCustomPagerComponent="true"
                                initialSortAscending={false}
                                initialSort="display_name"
                                enableInfiniteScroll useFixedHeader bodyHeight={400}
                                content={this.props.content}
                                rowExpnader
                                next={this.showMore}
                                showPager={showPager}
                                customNoDataComponent={loader}
                                resultsPerPage={StringConstant.maxRow}
                                />}
                    </div>
                </div>
            </div>
            {this.state.showError ? this.errorPopup() : null }
        </div>);
    },
    render() {
        const classname = this.state.showEditPayee ? 'payeeOverlay' : '';

        return (
            <div className={`b container-fluid-full ${classname}`}>
                {
                    this.state.showEditPayee ?
                        <EditPayee showView={this.state.showEditPayee} isMobileView={this.state.custGrid} payeeData={this.state.rowData} id={this.state.rowData.id} contents={this.props.content} onClick={this.onClick}/>
                        : this.renderGrid()
                }
            </div>
        );
    },
});

module.exports = RequiresAuthenticatedUser(ManagePayee);

