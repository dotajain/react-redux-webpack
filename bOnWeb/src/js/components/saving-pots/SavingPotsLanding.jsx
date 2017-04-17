/**
 * @module SavingPotsLanding
 */
const React = require('react');
const { PropTypes } = React;
const _ = require('lodash');


const SavingPots = require('./SavingPots');
const SavingPotsRejig = require('./SavingPotsRejig');
const CreateSavingsPot = require('./CreateSavingsPot');
const SavingPotDetail = require('./SavingPotDetail');
const ReducePot = require('./ReducePot');
const SavingPotConfirmation = require('./SavingPotConfirmation');
const AccountsStore = require('../../stores/AccountsStore');
const HeaderComponent = require('../common/HeaderComponent');
const BasicModal = require('../common/modals/ModalB');
const SavingPotsActionCreator = require('../../actions/SavingPotsActionCreator');
const AnyQuestions = require('../help/AnyQuestions');
let svaingsPotContent;

const SavingPotsLanding = React.createClass({
  propTypes: {
    accountList: PropTypes.object,
    pots: PropTypes.any.isRequired,
    potDetailsData: PropTypes.object,
    createSavingPotFlag: PropTypes.any.isRequired,
    getPotConfirmation: PropTypes.any.isRequired,
    createSavingPotHandleClick: PropTypes.func,
    getPotPageHandleClick: PropTypes.func,
    potDetailFlag: PropTypes.any.isRequired,
    reducePotData: PropTypes.array,
    content: PropTypes.object,
    getSelectedAccountID: PropTypes.string,
    accountIndex: PropTypes.number,
    editError: PropTypes.object,
    potError: PropTypes.object,
    interPotError: PropTypes.object,
    unavailableCheck: PropTypes.any.isRequired,
  },
  getInitialState() {
    return {
      potErrorModal: false,
      faqFlag: false,
    };
  },
  componentWillMount() {
    if (!_.isEmpty(this.props.potError)) {
      this.setState({ potErrorModal: true });
    }
  },
  _closeAlertModal() {
    this.setState({ potErrorModal: false });
    SavingPotsActionCreator.closetErrorModal();
  },
  _alertPotErrorModal() {
    if (this.state.potErrorModal) {
      return (<BasicModal>
        <div className="modal_content">
          <h3>{this.props.potError.error.message}</h3>
          <p>
            {this.props.content.potSupportMessage1}<br/>
            {this.props.content.potSupportMessage2}<br/>
            {this.props.potError.error.quoteId}
          </p>
        </div>
        <div className="modal_footer">
          <button onClick={this._closeAlertModal}>{this.props.content.ok}</button>
        </div>
      </BasicModal>);
    } else {
      return false;
    }
  },
   openFaq() {
      this.setState({ faqFlag: true });
  },
  closeFaq() {
    this.setState({ faqFlag: false });
  },
  _getCreateSavingPot() {
    SavingPotsActionCreator.getCreateSavingPotPage();
  },
  render() {
    let content = this.props.content;
    const pots = this.props.pots.pots;
    const reducePotData = this.props.reducePotData;
    const accountClass = `account-${this.props.accountIndex}`;
    const accDetails = AccountsStore.getAccountDetail(this.props.getSelectedAccountID);
    const potError = this.props.potError;
    let spContent;
    let unallocatedAmount;

    if (pots) {
      unallocatedAmount = this.props.pots.unallocated_amount.value || 0;
    }
    if (this.props.getPotConfirmation) {
      svaingsPotContent = <SavingPotConfirmation accountClass={accountClass} getSelectedAccountID={this.props.getSelectedAccountID} getPotPageHandleClick={this.props.getPotPageHandleClick} content={content} />;
    } else if (reducePotData.length > 0) {
      svaingsPotContent = (<ReducePot
              interPotError={this.props.interPotError}
              accountClass={accountClass}
              getSelectedAccountID={this.props.getSelectedAccountID}
              content={content}
              pots={reducePotData}
              getFull={this.props.pots}
              getPotPageHandleClick={this.props.getPotPageHandleClick}
              accDetails={accDetails}
      />);
    } else if (this.props.potDetailFlag) {
      svaingsPotContent = <SavingPotDetail accountClass={accountClass} getSelectedAccountID={this.props.getSelectedAccountID} content={content} potDetailsData={this.props.potDetailsData} getPotPageHandleClick={this.props.getPotPageHandleClick}/>;
    } else if (this.props.createSavingPotFlag) {
      svaingsPotContent = <CreateSavingsPot editError={this.props.editError} accountClass={accountClass} getSelectedAccountID={this.props.getSelectedAccountID} pots={pots} content={content} potDetailsData={this.props.potDetailsData} getPotPageHandleClick={this.props.getPotPageHandleClick} />;
    } else {
      if (this.props.unavailableCheck) {
                spContent = (<div className="saving_pot_list__wrapper">
                                  <div className="create_savingspot">
                                    <button type="button" className="page-options opt-green btn btn-link" onClick={this._getCreateSavingPot}>
                                      <span className="icon icon-add"></span>
                                      {content.SavingLinkPot}
                                    </button>
                                  </div>
                                  <div className="saving_pot_list">
                                    <div className="valign-center">
                                      {content.savingpotscurrentlyunavailable1}<br/>
                                      {content.savingpotscurrentlyunavailable2}
                                    </div>
                                  </div>
                                </div>
                  );
    } else if (pots) {
        if (unallocatedAmount < 0) {
          spContent = <SavingPotsRejig getSelectedAccountID={this.props.getSelectedAccountID} content={content} pots={pots} unallocatedAmount={unallocatedAmount} />;
        } else {
          spContent = <SavingPots pots={pots} unallocatedAmount={unallocatedAmount} content={content} getSelectedAccountID={this.props.getSelectedAccountID} />;
        }
      } else if (!_.isEmpty(potError)) {
        spContent = '';
      } else {
        spContent = <div className="chicken-loading fade in"></div>;
      }

      svaingsPotContent = (<div className="full-height">
        <HeaderComponent selectedTab="savingpots" {...this.props} openFaq={this.openFaq}/>
        <div className="main-container">
          <div className="scroll-wrapper">
            <div className="row saving-pots content-wrapper">
              <div className={`potPage sp ${accountClass}`}>
                <div className="col-xs-4">
                  <h3 className="panel-title">{content.savingpotAccountTitle}</h3>
                  <div className="account--list">
                    { this.props.accountList }
                  </div>
                </div>
                <div className="col-xs-8">
                  <div className="savingPotsRight">
                    <h3 className="panel-title">{content.savingpotTitle}</h3>
                    {spContent}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>);
    }
    return (
       this.state.faqFlag ? <AnyQuestions {...this.props} closed = {this.closeFaq}/>
				:
      <div className="b container-fluid-full">
        {this._alertPotErrorModal() }
        {svaingsPotContent}
      </div>
    );
  },
});

module.exports = SavingPotsLanding;
