/**
 * @module PaymentsPage
 */
const React = require('react');
const Helmet = require('react-helmet');
const PaymentsStore = require('../../stores/PaymentsStore');
const PaymentsActionCreator = require('../../actions/PaymentsActionCreator');
const AnalyticsActionCreator = require('../../actions/AnalyticsActionCreator');
const PaymentHomePage = require('./payment/PaymentHomePage');
const TransferHomePage = require('./transfer/TransferHomePage');
const HeaderComponent = require('../common/HeaderComponent');
const Nav = require('react-bootstrap/lib/Nav');
const NavItem = require('react-bootstrap/lib/NavItem');
const { PropTypes } = React;
const StringConstant = require('../../constants/StringConstants');
const BasicModal = require('../common/modals/ModalB');
const BrowserUtils = require('../../utils/BrowserUtils');
const RequiresAuthenticatedUser = require('../RequiresAuthenticatedUser');
const MobileOverlay = require('../common/MobileOverlay');
const AnyQuestions = require('../help/AnyQuestions');
require('babel-polyfill');

const PaymentsPage = React.createClass({
	propTypes: {
        content: PropTypes.object,
		payeeList: PropTypes.array,
    },
	getInitialState() {
		return {
			accountsList: PaymentsStore.getFromAccounts(),
			payeesList: this.getPayeeList(),
			nextStep: StringConstant.From,
			accountsToList: PaymentsStore.getToAccounts(),
			transfer: PaymentsStore.getPaymentType(),
			isEdit: true,
			pageLoad: false,
			payActive: StringConstant.active,
			trActive: StringConstant.EmptyString,
			activeKey: 1,
			showAnimation: true,
			tabChange: PaymentsStore.getTabChanged(),
			showPayee: false,
			faqFlag:false,
			headerClass: null,
		};
	},
	componentWillMount() {
		BrowserUtils.setViewPort(1);
		if (PaymentsStore.getFromAccounts().accounts === undefined || PaymentsStore.getFromAccounts().accounts.length === 0) {
			PaymentsActionCreator.getFromAccountList();
		}
		PaymentsStore.setMaxListeners(100);
		PaymentsStore.addChangeListener(this.onStoreChange);
		// emitter
		PaymentsActionCreator.refreshSavingComponent();
	},
	componentDidMount() {
		AnalyticsActionCreator.track({
            path: '/user/experience/view',
            action: 'Appeared',
        }, {
                description: 'PageLoaded',
        });
	},

	componentWillUnmount() {
		PaymentsStore.removeChangeListener(this.onStoreChange);
	},

	onStoreChange() {
		this.setState({
			accountsList: PaymentsStore.getFromAccounts(),
			payeesList: PaymentsStore.getAllPayees(),
			accountsToList: PaymentsStore.getToAccounts(),
			nextStep: StringConstant.From,
			transfer: PaymentsStore.getPaymentType(),
			pageLoad: true,
		});
		if (PaymentsStore.getNextTask() !== StringConstant.From) {
			this.setState({ tabChange: PaymentsStore.getTabChanged() });
		}
		PaymentsStore.getPaymentType() ? this.setState({ activeKey: 2 }) : this.setState({ activeKey: 1 });
	},
	getPayeeList() {
		const payeeList = PaymentsStore.getAllPayees();
		if (payeeList === undefined || payeeList.beneficiaries === undefined) {
			PaymentsActionCreator.getFromPayeeList();
		}

		return payeeList;
	},
	// Navigate to MANAGE-PAYEE page when clicked
	managePayeeClick() {
		PaymentsActionCreator.navigateToWebTask('WEB-MANAGE-PAYEE');
	},
	// Navigate to MANAGE-PAYMENT page when clicked
	managePaymentClick() {
		PaymentsStore.getReadMandateAccount();
		this.setState({ showAnimation: false });
		PaymentsActionCreator.navigateToWebTask('WEB-MANAGE-PAYMENT');
	},
    // Maintaining active on nav bar
    handleSelect(selectedKey) {
		if (this.state.activeKey !== selectedKey) {
			this.setState({ activeKey: selectedKey });
		}
		if (PaymentsStore.getNextTask() !== StringConstant.From) {
			this.setState({ tabChange: true });
			PaymentsActionCreator.setTabChanged(true);
		}
		PaymentsActionCreator.selectedPaymentType(selectedKey === 2 ? true : false);
	},
	// Returns HomePage based on condition
	loadPaymentType() {
		if (this.state.pageLoad) {
			return (this.state.transfer ?
				<TransferHomePage accountList={this.state.accountsList.accounts} accountToList={this.state.accountsToList.accounts} contents={this.props.content} tabChange={this.state.tabChange} />
				:
				<PaymentHomePage accountList={this.state.accountsList.accounts} payeeList={this.state.payeesList.beneficiaries} contents={this.props.content} tabChange={this.state.tabChange} />);
		} else {
			return <div></div>;
		}
	},
	// redirect to savings pot page for one off payment
	backToSavingsPot() {
		PaymentsActionCreator.navigateToWebTask('WEB-OPEN-SAVING-POTS');
	},
	closeModal() {
		this.setState({ showPayee: false });
	},
	showPayeePopUp() {
		if (this.state.showPayee) {
			return (<BasicModal>
				<div className="modal_content">
					<p>{this.props.content.noPayeeMsg}</p>
				</div>
				<div className="modal_footer">
					<button onClick={this.closeModal}>{this.props.content.ok}</button>
				</div>
			</BasicModal>);
		}
	},
	getHeaderClass(e) {
		this.setState({ headerClass: e });
	},
	openFaq() {
        this.setState({ faqFlag: true });
    },
    closeFaq() {
        this.setState({ faqFlag: false });
    },
	renderPageLinks() {
		if (!PaymentsStore.isOneOffPayment()) {
			return (<div className="row  line-seperator">
				<div className="col-lg-4 col-md-4 col-sm-0 col-xs-0">
					<a className="page-options opt-green float-left" onClick={this.managePaymentClick}>
						<span className="icon icon-your-payments"></span>{this.props.content.managePayments}</a>
				</div>

				<div className="col-lg-4 col-lg-offset-0 col-md-4 col-md-offset-0 col-sm-6 col-sm-offset-3 col-xs-12  col-xs-offset-0 text-center">
					<Nav justified activeKey={this.state.activeKey} onSelect={this.handleSelect}>
						<NavItem eventKey={1} href="#payment">{this.props.content.paymentLink}</NavItem>
						<NavItem eventKey={2} href="#transfer">{this.props.content.transferLink}</NavItem>
					</Nav>
				</div>

				<div className="col-lg-4 col-md-4 col-sm-0 col-xs-0 text-right">
					<a className="page-options opt-green float-right" onClick={this.managePayeeClick}>
						<span className="icon icon-payees"></span>{this.props.content.managePayeeLink}</a>
				</div>
			</div>);
		} else {
			return (<div className="row  line-seperator">
				<div className="col-lg-12 col-md-4 col-sm-4 col-xs-6">
					<a className="page-options opt-green float-left" onClick={this.backToSavingsPot}>
						<span className=""></span>{this.props.content.cancelButton}</a>
				</div>
			</div >);
		}
	},
	render() {
		let oneOffCSS = '';
		if (PaymentsStore.isOneOffPayment()) {
			oneOffCSS = 'one-off';
		}
		return (
			this.state.faqFlag ? <AnyQuestions {...this.props} closed = {this.closeFaq}/>
				:
				<div className="b container-fluid-full">
					<Helmet title="Payments" />
					{ !PaymentsStore.isOneOffPayment() && <HeaderComponent selectedTab="payments" {...this.props} openFaq={this.openFaq}/> }
					<div className={`main-container ${oneOffCSS} ${this.state.headerClass}`}>
						<div className="scroll-wrapper">
							<div className="payments content-wrapper">
								{this.renderPageLinks() }
								<MobileOverlay getHeaderClass={this.getHeaderClass} selectedTab="payments" content={this.props.content} managePaymentClick={this.managePaymentClick} managePayeeClick={this.managePayeeClick} openFaq={this.openFaq}/>
								{this.loadPaymentType() }
								{this.showPayeePopUp() }

							</div>
						</div>
					</div>
				</div>
		);
	},
});
module.exports = RequiresAuthenticatedUser(PaymentsPage);

