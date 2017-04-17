/**
 * @module ManagePayment
 */
const React = require('react');
const Helmet = require('react-helmet');
const PaymentsStore = require('../../../stores/PaymentsStore');
const PaymentsActionCreator = require('../../../actions/PaymentsActionCreator');
const AnalyticsActionCreator = require('../../../actions/AnalyticsActionCreator');
const Nav = require('react-bootstrap/lib/Nav');
const NavItem = require('react-bootstrap/lib/NavItem');
const BDataGrid = require('../../common/datagrid/BDataGrid');
const EditComponentPayment = require('./EditComponentPayment');
const BrowserUtils = require('../../../utils/BrowserUtils');
const MobileViewPaymentGrid = require('./MobileViewPaymentGrid');
const { PropTypes } = React;
const EditPayment = require('./EditPayment');
const StringConstant = require('../../../constants/StringConstants');
const RequiresAuthenticatedUser = require('../../RequiresAuthenticatedUser');
const ErrorPopUpComponent = require('../../common/ErrorPopUpComponent');

const columnMeta = [
	{
		'columnName': 'fromAccId',
		'order': 1,
		'locked': false,
		'visible': false,
		'displayName': '',
		'sortable': false,
	},
	{
		'columnName': 'id',
		'order': 2,
		'locked': false,
		'visible': false,
		'displayName': '',
		'sortable': false,
	},
	{
		'columnName': 'from',
		'order': 3,
		'locked': false,
		'visible': true,
		'displayName': 'From',
		'sortable': true,
		'sortDirectionCycle': ['desc', 'asc'],
		'customComponent': EditComponentPayment,
		'cssClassName': 'column-from',
	},
	{
		'columnName': 'to',
		'order': 4,
		'locked': false,
		'visible': true,
		'displayName': 'To',
		'sortable': true,
		'customComponent': EditComponentPayment,
		'cssClassName': 'column-to',
	},
	{
		'columnName': 'amount',
		'order': 5,
		'locked': false,
		'visible': true,
		'displayName': 'Amount',
		'sortable': true,
		'customComponent': EditComponentPayment,
		'cssClassName': 'column-amount',
	},
	{
		'columnName': 'when',
		'order': 6,
		'locked': false,
		'visible': true,
		'displayName': 'Date',
		'sortable': true,
		'customComponent': EditComponentPayment,
		'cssClassName': 'column-when',
	},
	{
		'columnName': 'reference',
		'order': 7,
		'locked': false,
		'visible': true,
		'displayName': 'Reference',
		'sortable': true,
		'customComponent': EditComponentPayment,
		'cssClassName': 'column-reference',
	},
	{
		'columnName': 'type',
		'order': 8,
		'locked': false,
		'visible': true,
		'displayName': 'Type',
		'sortable': true,
		'customComponent': EditComponentPayment,
		'cssClassName': 'column-type',
	},
	{
		'columnName': 'edit',
		'order': 9,
		'locked': false,
		'visible': true,
		'displayName': ' ',
		'sortable': false,
		'customComponent': EditComponentPayment,
		'cssClassName': 'column-edit',
	},
	{
		'columnName': 'accNumber',
		'order': 10,
		'locked': false,
		'visible': true,
		'displayName': ' ',
	},
];
const ManagePayment = React.createClass({
	propTypes: {
		data: PropTypes.object,
        content: PropTypes.object,
		selectedTab: PropTypes.string,
        isArrow: PropTypes.bool,
    },

	getInitialState() {
		return {
			confirmCancel: false,
			paymentData: '',
			pageSize: 2,
			activeKey: 'all',
			custGrid: false,
			rowData: {},
			showEditPayment: false,
			showError: false,
			_mergeList: PaymentsActionCreator.getAllpaymentList(),
			load: false,
			showMore: true,
			isArrow: false,
		};
	},

	componentWillMount() {
		if (!PaymentsStore.isPaymentExit()) {
			if (BrowserUtils.isMobileView()) {
				this.setState({ custGrid: true });
			}
		}
		PaymentsStore.addChangeListener(this.onStoreChange);
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
		return !PaymentsStore.isPaymentExit();
    },
	componentWillUnmount() {
		PaymentsStore.removeChangeListener(this.onStoreChange);
	},
	onStoreChange() {
		const paymentList = PaymentsStore.getMergeData();
		if (paymentList.length === 0) {
			if (PaymentsStore.getManagePaymentError() !== undefined) {		
						this.handleError();
			}
		} 
		this.setState({ _mergeList: paymentList, load: true });
	},
	handleError() {
        this.setState({ showError: true });
    },
    // close the error popup and make user input empty
    closeErrorPopup() {
		PaymentsStore.setManagePaymentError();
        this.setState({ showError: false });
    },
    // Error Popup Show the error message coming from the services
    errorPopup() {
        // Getting error response from the store
        const response = PaymentsStore.getManagePaymentError() ;
        return (<ErrorPopUpComponent error={response.error}
            closeErrorPopup={this.closeErrorPopup} content={this.props.content}
        />);	
    },
  
	// handles onClick for mobile view
	onClick(e) {
		this.setState({ showEditPayment: e });
	},
	// Navigate back to payment
	back() {
		PaymentsActionCreator.navigateToWebTask('WEB-PAYMENT-BACK');
		PaymentsActionCreator.refreshSavingComponent();
	},
	// Navigate to archieved payment
	archieved() {
		PaymentsActionCreator.navigateToWebTask('WEB-ARCHIEVED-PAYMENT');
	},
	// Selects the name from managePaymentTitle
	filterData(event) {
		PaymentsActionCreator.getPaymentFilterData(event.target.name);
	},
	// sends the data to PaymentsActionCreator
	editClick(payment) {
		PaymentsActionCreator.setPaymentEditId(payment.id);
		this.setState({
			confirmCancel: true,
			paymentData: payment.category,
		});
	},
	// Set the state to close
	closed() {
		this.setState({
			confirmCancel: false,
			showEditPayment: false,
			paymentData: '',
		});
	},
	// Set the state when selected
	handleSelect(selectedKey) {
		this.setState({ activeKey: selectedKey });
		PaymentsActionCreator.getPaymentFilterData(selectedKey);
	},
	// handles row click for mobile view
	rowClick(e) {
		this.setState({ rowData: e, showEditPayment: true });
	},
	showMore() {
		this.setState({ showMore: false });
		PaymentsActionCreator.isEditPaymentExit(false);
	},
	loadGrid() {
		let loader = <div className="chicken-loading" ></div>;
		let height = 400;
		const showPager = ((this.state._mergeList !== undefined && this.state._mergeList.length <= StringConstant.maxRow) || !this.state.showMore) ? false : true;


		if (PaymentsStore.getPaymentDataLoad()) {
			loader = <span/>;
			height = 0;
		}

		if (this.state.custGrid) {
			return PaymentsStore.getPaymentDataLoad() ?
				<MobileViewPaymentGrid data={this.state._mergeList} content={this.props.content} rowClick={this.rowClick}/>
				:
				loader;
		} else {
			if (this.state._mergeList !== undefined) {
				return (<BDataGrid results={this.state._mergeList} columns={['from', 'to', 'amount', 'when', 'reference', 'type', 'edit']}
					columnMetadata={columnMeta} useCustomPagerComponent="true"
					initialSortAscending={false}
					initialSort="from"
					enableInfiniteScroll useFixedHeader minHeigth = {height}
					content={this.props.content} rowExpnader
					customNoDataComponent={loader}
					showPager={showPager}
					next={this.showMore}
					resultsPerPage={StringConstant.maxRow}
					noDataClassName = "grid-loader"
				/>);
			}
		}
	},
	// render grid for desktop view or mobile view
	renderGrid() {
		const showPager = ((this.state._mergeList !== undefined && this.state._mergeList.length <= StringConstant.maxRow) || !this.state.showMore) ? false : true;

		return (<div className = "full-height"><Helmet title="Payments" />

			<div className="main-container payments payment-data noheader">

				<header role="navigation">
					<div className="navigation no-head row no-gutters repeating">
						<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
							<a className="page-options opt-green float-left" onClick={this.back}>
								{this.props.content.done}
							</a>
						</div>
						<div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 text-center">
							<div className="row bottom-line">
								<span className="icon icon-your-payments imageDisplay"></span>
								<h5 className="paymentLbl">{this.props.content.managePaymentTitle}</h5>
							</div>
							<div className="row mob-payment-nav">
								<div className="panel-content text-center">
									<Nav className="nav manage-nav nav-justified" activeKey={this.state.activeKey} onSelect={this.handleSelect}>
										<NavItem eventKey="all">{this.props.content.archivedPaymentAll}</NavItem>
										<NavItem eventKey="payment">{this.props.content.payments}</NavItem>
										<NavItem eventKey="transfer">{this.props.content.transfers}</NavItem>
										<NavItem eventKey="dd">{this.props.content.directDebits}</NavItem>
									</Nav>
								</div>
							</div>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
							<a className="page-options opt-green float-right" onClick={this.archieved}>
								{this.props.content.archived}
							</a>
						</div>
					</div>
				</header>

				<div className="payment-grid">
					<div className = "row details-row">
						<h6 className = "title-repeat">Repeating</h6>
						{this.loadGrid() }
					</div>
					<div className="row">
						<div className="col-xs-12 text-center finishing-line">
							<p>{!showPager && this.props.content.managePaymentFooter}</p>
						</div>
					</div>
				</div>
			</div>
			{this.state.showError ? this.errorPopup() : null }
		</div>);
	},
	render() {
		const classname = this.state.showEditPayment ? 'payeeOverlay' : '';
		return (<div className={`b container-fluid-full ${classname}`}>
			{this.state.showEditPayment ? <EditPayment showView type={this.state.rowData.payType} paymentData={this.state.rowData.category} fromData={this.state.rowData.from} id={this.state.rowData.id} accountId={this.state.rowData.fromAccId} contents={this.props.content} closed={this.closed} onClick={this.onClick} isMobileView={this.state.custGrid}/>
				: this.renderGrid() }
		</div>

		);
	},
});


module.exports = RequiresAuthenticatedUser(ManagePayment);
