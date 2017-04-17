/**
 * @module ArchivedPayment
 */
const React = require('react');
const PaymentsStore = require('../../../stores/PaymentsStore');
const PaymentsActionCreator = require('../../../actions/PaymentsActionCreator');
const Helmet = require('react-helmet');
const { PropTypes } = React;
const BDataGrid = require('../../common/datagrid/BDataGrid');
const Nav = require('react-bootstrap/lib/Nav');
const NavItem = require('react-bootstrap/lib/NavItem');
const MobileViewArchievedGrid = require('./MobileViewArchievedGrid');
const BrowserUtils = require('../../../utils/BrowserUtils');
const EditComponentArchive = require('./EditComponentArchive');
const ViewArchiveComponent = require('./ViewArchiveComponent');
const RequiresAuthenticatedUser = require('../../RequiresAuthenticatedUser');
const StringConstant = require('../../../constants/StringConstants');

const getStateFromStores = () => {
	return {
		_mergeList: PaymentsStore.getFilteredArchivedData() || [],
	};
};
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
		'visible': true,
		'displayName': 'ID',
		'sortable': true,
	},
	{
		'columnName': 'from',
		'order': 3,
		'locked': false,
		'visible': true,
		'displayName': 'From',
		'sortable': true,
		'customComponent': EditComponentArchive,
		'sortDirectionCycle': ['desc', 'asc'],
		'cssClassName': 'column-from',
	},
	{
		'columnName': 'to',
		'order': 4,
		'locked': false,
		'visible': true,
		'displayName': 'To',
		'customComponent': EditComponentArchive,
		'sortable': true,
		'cssClassName': 'column-to',
	},
	{
		'columnName': 'amount',
		'order': 5,
		'locked': false,
		'visible': true,
		'displayName': 'Amount',
		'sortable': true,
		// 'customComponent': EditComponentArchive,
		'cssClassName': 'column-amount',
		'customComponent': EditComponentArchive,
	},
	{
		'columnName': 'when',
		'order': 6,
		'locked': false,
		'visible': true,
		'displayName': 'Date',
		'sortable': true,
		// 'customComponent': EditComponentArchive,
		'cssClassName': 'column-when',
		'customComponent': EditComponentArchive,
	},
	{
		'columnName': 'reference',
		'order': 7,
		'locked': false,
		'visible': true,
		'displayName': 'Reference',
		'sortable': true,
		'customComponent': EditComponentArchive,
		'cssClassName': 'column-reference',
	},
	{
		'columnName': 'type',
		'order': 8,
		'locked': false,
		'visible': true,
		'displayName': 'Type ',
		'customComponent': EditComponentArchive,
		'cssClassName': 'column-type',
	},
];

const ArchivedPayment = React.createClass({
	propTypes: {
		content: PropTypes.object,
	},

	getInitialState() {
		return {
			_mergeList: PaymentsStore.getArchivedData() || [],
			activeKey: 'all',
			custGrid: false,
			rowData: {},
			showEditPayment: false,
			showMore:true,
		};
	},
	componentWillMount() {
		PaymentsStore.addChangeListener(this.onStoreChange);
		if (BrowserUtils.isMobileView()) {
			this.setState({ custGrid: true });
		}
	},
	componentWillUnmount() {
		PaymentsStore.removeChangeListener(this.onStoreChange);
	},

	onStoreChange() {
		this.setState(getStateFromStores());
	},
	// handles onClick for mobile view
	onClick(e) {
		this.setState({ showEditPayment: e });
	},
	// Navigate Back to payment page
	back() {
		PaymentsActionCreator.navigateToWebTask('WEB-MANAGE-PAYMENT');
	},
	// Gets the seletcted name from archivedPaymentsHead
	filterData(event) {
		this.setState({ activeKey: event });
		PaymentsActionCreator.getArchivedFilterData(event);
	},
	// handles row click for mobile view
	rowClick(e) {
		this.setState({ rowData: e, showEditPayment: true });
	},
	showMore() {
		this.setState({ showMore:  false });
		PaymentsActionCreator.isEditPaymentExit(false);
	},
	// render grid for mobile view or desktop view
	renderGrid() {
		const showPager = ((this.state._mergeList !== undefined && this.state._mergeList.length <= StringConstant.maxRow) || !this.state.showMore) ? false : true;

		return (<div className="full-height">
		<Helmet title="Payments" />
			<div className="main-container payments payment-data archived noheader">
				<header role="navigation">
					<div className="navigation no-head row no-gutters repeating">
						<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
							<a className="page-options opt-green float-left" onClick={this.back}>
								<span className = "icon icon-page-back"></span>{this.props.content.back}
							</a>
						</div>
						<div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 text-center">
							<div className="row bottom-line">
								<span className="icon icon-your-payments imageDisplay"></span>
								<h5 className="paymentLbl">{this.props.content.archivedPaymentsHead}</h5>
							</div>
							<div className="row mob-payment-nav">
								<div className="panel-content text-center">
									<Nav className="nav manage-nav nav-justified" activeKey={this.state.activeKey} onSelect={this.filterData}>
										<NavItem eventKey="all">{this.props.content.archivedPaymentAll}</NavItem>
										<NavItem eventKey="payment">{this.props.content.payments}</NavItem>
										<NavItem eventKey="transfer">{this.props.content.transfers}</NavItem>
										<NavItem eventKey="dd">{this.props.content.directDebits}</NavItem>
									</Nav>
								</div>
							</div>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
						</div>
					</div>
					</header>

					<div className="payment-grid">
						<div className="row">
							{this.state.custGrid ? <MobileViewArchievedGrid data={this.state._mergeList} content={this.props.content} rowClick={this.rowClick}/> :
								<BDataGrid results={this.state._mergeList} columns={['from', 'to', 'amount', 'when', 'reference', 'type']}
									columnMetadata={columnMeta} useCustomPagerComponent="true"
									initialSortAscending={false} next={this.showmore} resultsPerPage={this.state._mergeList.length}
									useCustomGridComponent={this.state.custGrid}
									customGridComponent={MobileViewArchievedGrid}
									onSort={this.onSort} onRowClick={this.onRowClick} initialSort="from"
									enableInfiniteScroll useFixedHeader bodyHeight={400}
									content={this.props.content} rowExpnader
									showPager={showPager}
									next={this.showMore}
									resultsPerPage={StringConstant.maxRow}
								/>
							}
						</div>

						<div className="row">
						<div className="col-xs-12 text-center finishing-line">
							<p>{!showPager && this.props.content.archivedPaymentFooter}</p>
						</div>
					</div>
					</div>
				</div>
			</div>);
	},
	render() {
		const classname = this.state.showEditPayment ? 'payeeOverlay' : '';
		return (<div className={`b container-fluid-full ${classname}`}>
			{this.state.showEditPayment ? <ViewArchiveComponent showView={this.state.showView} archieveData={this.state.rowData} id={this.state.rowData.id} contents={this.props.content} closed={this.closed} onClick={this.onClick} isMobileView={this.state.custGrid}/> : this.renderGrid() }
		</div>
		);
	},
});
 module.exports = RequiresAuthenticatedUser(ArchivedPayment);
