/**
 * @module TimelinePage
 */
/* eslint-disable no-nested-ternary */
const React = require('react');
const { PropTypes } = React;
const Helmet = require('react-helmet');

const config = require('../../config');

const NBAComponent = require('../common/NBAComponent');
const AcceptTermsConditions = require('../AcceptTermsConditions');
const HeaderComponent = require('../common/HeaderComponent');

const AccountsStore = require('../../stores/AccountsStore');
const TransactionsStore = require('../../stores/TransactionsStore');
const AccountOpeningActions = require('../../actions/AccountOpeningActions');

const RequiresAuthenticatedUser = require('../RequiresAuthenticatedUser');

const AnalyticsActionCreator = require('../../actions/AnalyticsActionCreator');
const TimelineActionCreator = require('../../actions/TimelineActionCreator');
const AccountsActionCreator = require('../../actions/AccountsActionCreator');
const AccountListComponent = require('../common/AccountListComponent');
const ErrorPopUpComponent = require('../common/ErrorPopUpComponent');
const TimelineTransactions = require('./TimelineTransactions');
const FinancialStoriesStore = require('../../stores/FinancialStoriesStore');
const HelpDemoComponent = require('../help/HelpDemoComponent');
const ModalTC = require('../common/modals/ModalTermsConditions');
const BrowserUtils = require('../../utils/BrowserUtils');
const Nav = require('react-bootstrap/lib/Nav');
const NavItem = require('react-bootstrap/lib/NavItem');
const cx = require('classnames');
const AnyQuestions = require('../help/AnyQuestions');
const MobileOverlay = require('../common/MobileOverlay');
let _suggestData = '';
let scrollClass = '';
let more = false;

const getStateFromStores = () => {
	return {
		accountsList: AccountsStore.getAll(),
		transactionsList: TransactionsStore.getTransactionsList(),
		transactionSearchSuggestion: TransactionsStore.getTransactionSearchSuggestion(),
		searchText: '',
		isPopupOpen: false,
		loadAccountsSuccess: AccountsStore.getLoad(),
		loadTransactionsSuccess: TransactionsStore.getTransactionsLoadSuccess(),
		activeKey: TransactionsStore.getActiveKey(),
		loadTransactions: TransactionsStore.getTransactionLoad(),
		loadSearchTransactions: TransactionsStore.getSearchTransactionLoad(),
		termsAndConditionFlag: AccountsStore.getTermsAndConditions(),
		faqFlag: false,
		showError: AccountsStore.getErrorFlag(),
		headerClass: null,
	};
};

const TimelinePage = React.createClass({
	propTypes: {
        content: PropTypes.object,
        data: PropTypes.object.isRequired,
    },
	getInitialState() {
		return getStateFromStores();
	},

	componentWillMount() {
		BrowserUtils.setViewPort(1);
		AccountsActionCreator.getAccountsList();
	},

	componentDidMount() {
		AccountsStore.addChangeListener(this.onStoreChange);
		TransactionsStore.addChangeListener(this.onStoreChange);
		window.addEventListener('resize', this.onResize);

		// Record an analytics user event.
		AnalyticsActionCreator.track({
			path: '/user/experience/view',
			action: 'Appeared',
		}, {
				description: 'PageLoaded',
		});
	},

	componentWillUnmount() {
		AccountsStore.removeChangeListener(this.onStoreChange);
		TransactionsStore.removeChangeListener(this.onStoreChange);
		window.removeEventListener('resize', this.onResize);
	},

	onResize() {
		this.forceUpdate();
	},

    /**
	 * get state from the stores
	*/
	onStoreChange() {
		this.setState(getStateFromStores());
		this.setState({ searchText: TransactionsStore.getTransactionSearchText(), isPopupOpen: TransactionsStore.getPopupState() });
	},
	/**
	 * returning AccountListComponent based on load state
	*/
	getAccountList() {
		if (AccountsStore.getLoad() && this.state.accountsList && this.state.accountsList.accounts) {
			return (
				<AccountListComponent content={this.props.content} accountList={this.state.accountsList.accounts} stepChange={this.stepChange} accountClick={this.fromHandleChange}/>
			);
		} else {
			return (<div className="loader-account"></div>);
		}
	},

	/**
	 * returning TimelineTransactions based on load state
	*/
	getTransactionsList() {
		if (this.state.loadTransactionsSuccess) {
			return (
				<TimelineTransactions
					content={this.props.content}
					data={this.state.transactionsList}
					searchText = {this.state.searchText}
					isPopupOpen = {this.state.isPopupOpen}
					doTransactionSearch = {this.doTransactionSearch}
					cancelTransactionSearch = {this.cancelTransactionSearch}
					searchSuggestedData = {this.state.transactionSearchSuggestion}
					getSelectedTypeTransactions = {this.getSelectedTypeTransactions}
					closeBtnClick = {this.closeBtnClick}
					loadTransactions = {this.loadTransactions}
					endOfTransactions= {this.endOfTransactions}
				/>);
		} else {
			return (<div className="loader-timeline"></div>);
		}
	},

	// get the selected serach transactions

	getSelectedTypeTransactions(data) {
		_suggestData = data;
		TimelineActionCreator.getTransactionSearchData(data);
		AnalyticsActionCreator.track({
				path: '/user/experience/activity',
				action: 'Interacted',
				}, {
					description: config.analytics.analytics_name_search_timeline,
					event: 'click',
			});
	},

	closeErrorPopup() {
		this.setState({ errorFlag: false });
		AccountsActionCreator.resetErrorFlag();
	},

	errorPopUp() {
		return (<ErrorPopUpComponent error = {AccountsStore.getError()} content = {this.props.content} closeErrorPopup = {this.closeErrorPopup}/>);
	},

	fromHandleChange(index) {
		FinancialStoriesStore.setAccountId(index.currentTarget.id);
		AccountOpeningActions.navigateToWebTask('WEB-OPEN-FINANCIAL_STORIES');
	},

	handleSelect(selectedKey) {
		this.setState({ activeKey: selectedKey });
	},

	doTransactionSearch(searchText) {
		if (this.state.searchText !== searchText) {
			this.setState({ searchText: searchText });
			if (searchText.length > 2) {
				TimelineActionCreator.getSearchTransactionSuggest(searchText);
			} else {
				this.setState({ transactionSearchSuggestion: [] });
			}
			AnalyticsActionCreator.track({
				path: '/user/experience/activity',
				action: 'Interacted',
				}, {
					description: config.analytics.analytics_action_search_timeline_search_transactions,
					event: 'click',
			});
		}
	},

	closeBtnClick() {
		if (this.state.isPopupOpen) {
			TimelineActionCreator.resetSearchInfo({ isSearchTextReset: false, isPopupOpenReset: true, close: false });
		} else {
			TimelineActionCreator.resetSearchInfo({ isSearchTextReset: true, isPopupOpenReset: false, close: false });
		}
	},

	cancelTransactionSearch() {
		// if (this.state.isPopupOpen) {
		// 	TimelineActionCreator.resetSearchInfo({ isSearchTextReset: false, isPopupOpenReset: true, close: false });
		// } else {
			TimelineActionCreator.resetSearchInfo({ isSearchTextReset: true, isPopupOpenReset: false, close: true });
			TimelineActionCreator.getTransactionsList();
		// }
	},

	nbaFlag(nbaData) {
		switch (nbaData) {
			case 'close':
				scrollClass = '';
				this.forceUpdate();
				break;
			case 'more':
				more = true;
				scrollClass = 'extend-further';
				this.forceUpdate();
				break;
			case 'less':
				more = false;
				scrollClass = 'extend';
				this.forceUpdate();
				break;
			default:
				if (!more && nbaData) {
					scrollClass = 'extend';
				}
		}
	},

	// To Load Transactions on scroll end

	loadTransactions() {
		if (this.state.loadTransactions) {
			TimelineActionCreator.getTransactionsList();
		}
		if (this.state.loadSearchTransactions) {
			TimelineActionCreator.getTransactionSearchData(_suggestData);
		}
	},

	endOfTransactions() {
		if (this.state.loadTransactionsSuccess && this.state.transactionsList.length > 0) {
			if (!this.state.loadTransactions && !this.state.loadSearchTransactions) {
				return this.props.content.NoSearchResult;
			}
		}
	},

	closed() {
		AccountOpeningActions.updateFormValue('isExistingBAppUser', 'No');
	},

	openFaq() {
        this.setState({ faqFlag: true });
    },
    closeFaq() {
        this.setState({ faqFlag: false });
    },
	getHeaderClass(e) {
		this.setState({ headerClass: e });
	},

	render() {
		const screenSize = BrowserUtils.getScreenSize();
		const screenWidth = screenSize ? screenSize.x : undefined;
		const isMobileDevice = screenWidth < 768;
		const classnames = cx('scroll-wrapper', scrollClass);
		return (
			this.state.faqFlag ? <AnyQuestions {...this.props} closed = {this.closeFaq}/>
				:
				this.state.termsAndConditionFlag ? <ModalTC><AcceptTermsConditions {...this.props}/> </ModalTC> :
					this.props.data.isExistingBAppUser ?
						<div className="b container-fluid-full">

							<Helmet title="Timeline" />
							<HeaderComponent selectedTab="you" {...this.props} openFaq={this.openFaq}/>
							<div className={`main-container ${this.state.headerClass}`}>
							{this.state.showError ? this.errorPopUp() : ''}
								<NBAComponent
									{...this.props}
									onClick={this.nbaClick}
									nbaFlag={this.nbaFlag}
								/>
								<div className={classnames}>
									<div className="row dashboard content-wrapper">
										<MobileOverlay getHeaderClass={this.getHeaderClass} selectedTab="timeline" content={this.props.content} openFaq={this.openFaq}/>
										<div className="device-small">
											<Nav justified activeKey={this.state.activeKey} onSelect={this.handleSelect}>
												<NavItem eventKey={1} href="#account">{ this.props.content.mobileAccountText }</NavItem>
												<NavItem eventKey={2} title="#timeline">{ this.props.content.mobileTimelineText }</NavItem>
											</Nav>
											<div className="tab-content">
												{
													(!isMobileDevice || isMobileDevice && this.state.activeKey === 1) ?
														<div role="tabpanel" id="accounts" className="tab-pane active col-lg-4 col-lg-offset-0 col-md-4 col-md-offset-0 col-sm-8 col-sm-offset-2 col-xs-12">
															<h4 className="title" id="timeline"> { this.props.content.accountsText } </h4>

															{ this.getAccountList() }
														</div>
														: ''
												}
												{	(!isMobileDevice || isMobileDevice && this.state.activeKey === 2) ?
													<div role="tabpanel" id="timeline" className="tab-pane col-lg-8 col-lg-offset-0 col-md-8 col-md-offset-0 col-sm-12 col-sm-offset-0 col-xs-12 col-sm-offset-0">
														<h4 className="title">{ this.props.content.timelineText }</h4>
														{this.getTransactionsList() }
														<div className="thats-all">{this.endOfTransactions() }</div>
													</div>
													: ''
												}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div> : <HelpDemoComponent {...this.props} closed = {this.closed}/>
		);
	},
});

module.exports = RequiresAuthenticatedUser(TimelinePage);
