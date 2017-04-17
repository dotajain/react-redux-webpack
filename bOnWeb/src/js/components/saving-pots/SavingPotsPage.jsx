/**
 * @module SavingPotsPage
 */

const React = require('react');
const Helmet = require('react-helmet');
const HeaderComponent = require('../common/HeaderComponent');


const AccountListComponent = require('../common/AccountListComponent');
const SavingPotsLanding = require('./SavingPotsLanding');

const config = require('../../config');

const BasicModal = require('../common/modals/ModalB');

// Stores and Action
const AccountsStore = require('../../stores/AccountsStore');
const AccountsActionCreator = require('../../actions/AccountsActionCreator');

const SavingsPotsStore = require('../../stores/SavingsPotsStore');
const SavingPotsActionCreator = require('../../actions/SavingPotsActionCreator');
const RequiresAuthenticatedUser = require('../RequiresAuthenticatedUser');
const AnalyticsActionCreator = require('../../actions/AnalyticsActionCreator');
const AnyQuestions = require('../help/AnyQuestions');
const BrowserUtils = require('../../utils/BrowserUtils');
const { PropTypes } = React;
let potPage;

const getStateFromStores = () => {
	return {
    accountsList: AccountsStore.getAll(),
    hasAccountList: false,
    checkpotFlag: SavingsPotsStore.checkpotFlag(),
    potData: SavingsPotsStore.getPotData(),
    getClickedAccount: SavingsPotsStore.getClickedAccount(),
    selectedAccountID: SavingsPotsStore.getSelectedAccountID(),
    accountIndex: SavingsPotsStore.getAccountIndex(),
    isCreatePage: SavingsPotsStore.getCreateSavingPotPage(),
    isPotDetailsPage: SavingsPotsStore.getPotDetailsFlag(),
    getPotDetailsData: SavingsPotsStore.getPotDetailsData(),
    getReducePotData: SavingsPotsStore.getReducePotPage(),
    getPotConfirmation: SavingsPotsStore.getPotConfirmationFlag(),
    editError: SavingsPotsStore.editError(),
    potError: SavingsPotsStore.potError(),
    displayLoading: SavingsPotsStore.displayLoading(),
    unavailableCheck: SavingsPotsStore.unavailableCheck(),
    interPotError: SavingsPotsStore.interPotError(),
    isNetworkError: SavingsPotsStore.isNetworkError(),
    faqFlag:false,
	};
};

const SavingPotsPage = React.createClass({
  propTypes: {
    content: PropTypes.object,
  },

	getInitialState() {
		return getStateFromStores();
	},

	componentWillMount() {
    SavingPotsActionCreator.getAccountsList();
    AccountsActionCreator.getAccountsList();
    BrowserUtils.setViewPort(0);
    // Record an analytics user event.
      AnalyticsActionCreator.track({
          path: '/user/experience/activity',
          action: 'Interacted',
          }, {
          description: config.analytics.analytics_name_saving_goal_account_list,
          event: 'click',
      });
	},

  componentDidMount() {
    AccountsStore.addChangeListener(this._onStoreChange);
		SavingsPotsStore.addChangeListener(this._onStoreChange);
    // Record an analytics user event.
    AnalyticsActionCreator.track({
        path: '/user/experience/view',
        action: 'Appeared',
        }, {
        description: 'PageLoaded',
    });
	},

  componentWillUnmount() {
    AccountsStore.removeChangeListener(this._onStoreChange);
		SavingsPotsStore.removeChangeListener(this._onStoreChange);
	},

  // Get Account List
  _getAccountList() {
    return (
      <AccountListComponent
        savingPot
        accountList={this.state.accountsList.accounts}
        stepChange={this.stepChange}
        accountClick={this.fromHandleChange}
        content = {this.props.content}
      />
    );
  },

  // Callback
  _onStoreChange() {
		this.setState(getStateFromStores());
    this.setState({ hasAccountList: true });
	},

  _getPotPage() {
    SavingPotsActionCreator.getPotData();
  },
  _reload () {
    AccountsActionCreator.getAccountsList();
    SavingPotsActionCreator.getAccountsList();
    this.setState({ isNetworkError: false });
    // Record an analytics user event.
      AnalyticsActionCreator.track({
          path: '/user/experience/activity',
          action: 'Interacted',
          }, {
          description: config.analytics.analytics_name_saving_goal_account_list,
          event: 'click',
      });
  },
  openFaq() {
        this.setState({ faqFlag: true });
    },
    closeFaq() {
        this.setState({ faqFlag: false });
    },
  render() {
    const checkpotFlag = this.state.checkpotFlag;
    const content = this.props.content;
    const isNetworkError = this.state.isNetworkError;
    const unavailableCheck = this.state.unavailableCheck;
    if (this.state.hasAccountList && this.state.accountsList && this.state.accountsList.accounts && !this.state.displayLoading && !isNetworkError) {
      if (checkpotFlag || unavailableCheck) {
          let potData = this.state.potData;
          potPage = (<SavingPotsLanding
                        {...this.props}
                        pots={potData}
                        accountList={this._getAccountList()}
                        accountIndex={this.state.accountIndex}
                        createSavingPotFlag={this.state.isCreatePage}
                        getPotPageHandleClick={this._getPotPage}
                        potDetailFlag={this.state.isPotDetailsPage}
                        potDetailsData={this.state.getPotDetailsData}
                        reducePotData={this.state.getReducePotData}
                        getPotConfirmation={this.state.getPotConfirmation}
                        content={content}
                        getSelectedAccountID={this.state.selectedAccountID}
                        editError={this.state.editError}
                        potError={this.state.potError}
                        interPotError={this.state.interPotError}
                        unavailableCheck={this.state.unavailableCheck}
          />);
      }
    } else if (isNetworkError) {
			potPage = (<div>
                  <HeaderComponent selectedTab="savingpots" {...this.props} openFaq={this.openFaq}/>
                  <div className="main-container">
                    <BasicModal>
                      <div className="modal_content">
                        <h3>{this.props.content.networkOfflineMessage}</h3>
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
      potPage = (<div>
                  <HeaderComponent selectedTab="savingpots" {...this.props} openFaq={this.openFaq}/>
                  <div className="main-container"><div className="chicken-loading fade in"></div></div>
                </div>);
    }
		return (
      this.state.faqFlag ? <AnyQuestions {...this.props} closed = {this.closeFaq}/>
				:
			<div className="b container-fluid-full savingpots">
				<Helmet title="Savings Pots" />
        { potPage }
     </div>
		);
	},
});

module.exports = RequiresAuthenticatedUser(SavingPotsPage);
