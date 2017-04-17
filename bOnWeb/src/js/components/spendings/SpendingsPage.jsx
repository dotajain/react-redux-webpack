/**
 * @module SpendingsPage
 */

const React = require('react');
const { PropTypes } = React;
const Helmet = require('react-helmet');
const HeaderComponent = require('../common/HeaderComponent');

const SpendingsStore = require('../../stores/SpendingsStore');
const SpendingsActionCreator = require('../../actions/SpendingsActionCreator');
const AnalyticsActionCreator = require('../../actions/AnalyticsActionCreator');
const BasicModal = require('../common/modals/ModalB');

const SpendingsLandingScreen = require('./SpendingsLandingScreen');
const NoSpendDataError = require('./NoSpendDataError');
const RequiresAuthenticatedUser = require('../RequiresAuthenticatedUser');
const BrowserUtils = require('../../utils/BrowserUtils');
const AnyQuestions = require('../help/AnyQuestions');

const getStateFromStores = () => {
  return {
    accountsList: SpendingsStore.getAll(),
    getBudgetPreferencesData: SpendingsStore.getBudgetPreferencesConnectionData(),
    hasBudgetPreferencesError: SpendingsStore.hasBudgetPreferencesError(),
    getAllAccountIds: SpendingsStore.updatedAccountIds(),
    transactionsTagName: SpendingsStore.transactionsTagName(),

    isError: SpendingsStore.isError(),
    isAccountModal: SpendingsStore.isAccountModal(),
    isBudgetSuccess: SpendingsStore.isBudgetSuccess(),
    spendingPageToLoad: SpendingsStore.spendingPageToLoad(),
    isLoadPage: SpendingsStore.isLoadPage(),
    isCreateBudgetPage: SpendingsStore.isCreateBudgetPage(),
    isEarningPage: SpendingsStore.isEarningPage(),
    isTransactionPage: SpendingsStore.isTransactionPage(),
    transactionPageSize: SpendingsStore.transactionPageSize(),
    isNetworkError: SpendingsStore.isNetworkError(),
    isInterNalServerError: SpendingsStore.isInterNalServerError(),
    faqFlag: false,
  };
};

const SpendingsPage = React.createClass({
  propTypes: {
    content: PropTypes.object,
  },

  getInitialState() {
    return {
      storeChanged: false,
      accountsList: SpendingsStore.getAll(),

      getBudgetPreferencesData: SpendingsStore.getBudgetPreferencesConnectionData(),
      hasBudgetPreferencesError: SpendingsStore.hasBudgetPreferencesError(),
      getAllAccountIds: SpendingsStore.updatedAccountIds(),
      transactionsTagName: SpendingsStore.transactionsTagName(),

      isError: SpendingsStore.isError(),
      isAccountModal: SpendingsStore.isAccountModal(),
      isBudgetSuccess: SpendingsStore.isBudgetSuccess(),
      spendingPageToLoad: SpendingsStore.spendingPageToLoad(),
      isLoadPage: SpendingsStore.isLoadPage(),
      isCreateBudgetPage: SpendingsStore.isCreateBudgetPage(),
      isEarningPage: SpendingsStore.isEarningPage(),
      isTransactionPage: SpendingsStore.isTransactionPage(),
      transactionPageSize: SpendingsStore.transactionPageSize(),
      isNetworkError: SpendingsStore.isNetworkError(),
      isInterNalServerError: SpendingsStore.isInterNalServerError(),
    };
  },

  componentWillMount() {
    BrowserUtils.setViewPort(0);
    this._loadSpendingAction();
  },
  componentDidMount() {
    SpendingsStore.addChangeListener(this._onStoreChange);
    // Record an analytics user event.
    AnalyticsActionCreator.track({
      path: '/user/experience/view',
      action: 'Appeared',
      }, {
      description: 'PageLoaded',
    });
  },

  componentWillUnmount() {
    SpendingsStore.removeChangeListener(this._onStoreChange);
  },

  _loadSpendingAction() {
    // Get Account List
    SpendingsActionCreator.getAccountsList();
    SpendingsActionCreator.getBudgetConnection();
    SpendingsActionCreator.getTagListConnection();
    SpendingsActionCreator.getBudgetPreferencesConnection();
  },
  // Callback
  _onStoreChange() {
    this.setState(getStateFromStores());
    this.setState({ storeChanged: true });
  },
  _reload() {
    this._loadSpendingAction();
  },
   openFaq() {
        this.setState({ faqFlag: true });
    },
    closeFaq() {
        this.setState({ faqFlag: false });
    },
  render() {
    let spendingPage;
    const content = this.props.content;
    const earnings = this.state.getBudgetPreferencesData;
    const isCreateBudgetPage = this.state.isCreateBudgetPage;
    const getAllAccountIds = this.state.getAllAccountIds;
    const transactionsTagName = this.state.transactionsTagName;
    const isTransactionPage = this.state.isTransactionPage;
    const isSpendingPage = this.state.isLoadPage;
    const isError = this.state.isError;
    const isAccountModal = this.state.isAccountModal;
    const isBudgetSuccess = this.state.isBudgetSuccess;
    const isEarningPage = this.state.isEarningPage;
    const spendingPageToLoad = this.state.spendingPageToLoad;
    const transactionPageSize = this.state.transactionPageSize;
    const earningsError = this.state.hasBudgetPreferencesError;
    const storeChanged = this.state.storeChanged;
    const isNetworkError = this.state.isNetworkError;
    const isInterNalServerError = this.state.isInterNalServerError;
    if (storeChanged) {
      if (isSpendingPage) {
        spendingPage = (<SpendingsLandingScreen
                          {...this.props}
                          spendingAccountList={this.state.accountsList.accounts}
                          content={content}
                          loadSpendingPage={spendingPageToLoad}
                          earnings={earnings}
                          earningsError={earningsError}
                          isCreateBudgetPage={isCreateBudgetPage}
                          isTransactionPage={isTransactionPage}
                          hasBudgetData={isBudgetSuccess}
                          isEarningPage={isEarningPage}
                          showAccountModal={isAccountModal}
                          getAllAccountIds={getAllAccountIds}
                          transactionsTagName={transactionsTagName}
                          transactionPageSize={transactionPageSize}
                          openFaq={this.openFaq}
        />);
      } else if (isError || isNetworkError) {
        spendingPage = <NoSpendDataError content={content} reload={this._reload}/>;
      } else if (isInterNalServerError) {
        spendingPage = (<div>
                          <HeaderComponent selectedTab="spending" {...this.props}/>
                          <div className="main-container">
                            <BasicModal>
                              <div className="modal_content">
                                <h3>{this.props.content.internalServerError}</h3>
                                <p>
                                  {this.props.content.potSupportMessage1}<br/>
                                  {this.props.content.potSupportMessage2}<br/>
                                  B/2de1bb
                                </p>
                              </div>
                                <div className="modal_footer">
                                  <button onClick={this._reload}>{this.props.content.ok}</button>
                              </div>
                            </BasicModal>
                          </div>
                        </div>);
      } else {
        spendingPage = (<div>
          <HeaderComponent selectedTab="spending" {...this.props} openFaq={this.openFaq}/>
          <div className="main-container"><div className="chicken-loading fade in"></div></div>
        </div>);
      }
    } else {
      spendingPage = (<div>
        <HeaderComponent selectedTab="spending" {...this.props} openFaq={this.openFaq}/>
        <div className="main-container"><div className="chicken-loading fade in"></div></div>
      </div>);
    }

    return (
       this.state.faqFlag ? <AnyQuestions {...this.props} closed = {this.closeFaq}/>
				:
      <div className="b container-fluid-full">
        <Helmet title="Spending" />
        {spendingPage}
      </div>
    );
  },
});

module.exports = RequiresAuthenticatedUser(SpendingsPage);
