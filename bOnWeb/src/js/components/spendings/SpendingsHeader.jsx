/**
 * @module SpendingsHeader
 */
const React = require('react');
const { PropTypes } = React;
const moment = require('moment');

const DropdownButton = require('react-bootstrap/lib/DropdownButton');
const MenuItem = require('react-bootstrap/lib/MenuItem');

const SpendingsActionCreator = require('../../actions/SpendingsActionCreator');

const AccountsModal = require('./AccountsModal');

const SpendingsHeader = React.createClass({
  propTypes: {
    content: PropTypes.object,
    spendingAccountList: PropTypes.array,
    isNoBudget: PropTypes.bool,
    showAccountModal: PropTypes.bool,
    lastMonth: PropTypes.string,
    getAllAccountIds: PropTypes.array,
    loadSpendingPage: PropTypes.number,
  },
  getInitialState() {
    return {
      buttonTitle: null,
      lastMonth: moment(this.props.lastMonth).format('MMMM'),
      isCreateMessage: 'show',
      loadSpendingPage: this.props.loadSpendingPage,
    };
  },
  componentWillMount() {
    if (this.props.loadSpendingPage === 2 || !this.props.isNoBudget) {
      this.setState({ buttonTitle: this.state.lastMonth });
    } else {
      this.setState({ buttonTitle: this.props.content.spendingHeaderButtonLabel });
    }
  },
  _loadSpendingAction(key) {
    // Get Account List
    if (key === 4) {
      SpendingsActionCreator.getTagListConnection();
      SpendingsActionCreator.handlePotDataSpendings();
    } if (key === 3) {
      SpendingsActionCreator.handlePotDataSpendings();
      SpendingsActionCreator.getSpendingPageWithKey(key);
    } else {
      SpendingsActionCreator.getTagListConnection();
      SpendingsActionCreator.getBudgetPreferencesConnection();
      SpendingsActionCreator.getAccountsList();
      SpendingsActionCreator.getSpendingPageWithKey(key);
    }
  },
  _onButtonToggle(eventKey, e) {
    const key = parseInt(eventKey);
    this._loadSpendingAction(key);
    this.setState({ buttonTitle: e.target.innerHTML });
  },
  _smClose() {
    SpendingsActionCreator.closeAccountModal();
  },
  _smShow() {
    SpendingsActionCreator.getAllSelectedAccountNumnber();
  },
  _hideCrateMessage(e) {
    e.preventDefault();
    this.setState({ isCreateMessage: 'hide' });
  },
  _handleCreateBudget() {
    this._loadSpendingAction(3);
  },
  _handleEditBudget() {
    this._loadSpendingAction(4);
  },
  render() {
    const showModal = this.props.showAccountModal;
    const content = this.props.content;
    let dropDownMenu;
    let budgetButton;
    let alertMessage;
    let accountModal;
    if (!this.props.isNoBudget) {
      dropDownMenu = (
                    <DropdownButton title={this.state.buttonTitle} noCaret bsStyle="link" id="spendngDropDown" onSelect={this._onButtonToggle}>
                      <MenuItem eventKey="3">{content.spendingHeaderButtonLabel2}</MenuItem>
                      <MenuItem eventKey="2">{this.state.lastMonth}</MenuItem>
                    </DropdownButton>
                    );
      budgetButton = <a className="page-options opt-green" type="button" onClick={this._handleCreateBudget}><span className="icon icon-edit"></span>{content.spendingHeaderButtonLabel2}</a>;
      alertMessage = (<div className={`alert alert-success text-center ${this.state.isCreateMessage}`}>
                        <div className="alert-container text-center" onClick={this._hideCrateMessage}>
                          <a className="page-options icon icon-close"></a>
                          <h6>{content.spendingHeaderNoBudgetWatning}</h6>
                          </div>
                      </div>);
    } else {
      dropDownMenu = (
                    <DropdownButton title={this.state.buttonTitle} noCaret bsStyle="link" id="spendngDropDown" onSelect={this._onButtonToggle}>
                      <MenuItem eventKey="1">{content.spendingHeaderButtonLabel}</MenuItem>
                      <MenuItem eventKey="2">{this.state.lastMonth}</MenuItem>
                    </DropdownButton>
                    );
      budgetButton = <a className="page-options opt-green" type="button" onClick={this._handleEditBudget}><span className="icon icon-edit"></span>{content.spendingHeaderButtonLabel3}</a>;
    }
    if (showModal) {
      accountModal = (<AccountsModal getAllAccountIds={this.props.getAllAccountIds} content={content} onHide={this._smClose} spendingAccountList={this.props.spendingAccountList}/>);
    }
    return (
      <div className="text-left">
        <div className="spendings-header">
          <div className="row no-gutters">
            <div className="col-xs-2 text-left">
              <a className="page-options opt-green" onClick={this._smShow}>{content.spendingAccountButtonLabel}</a>
            </div>
            <div className="col-xs-8 text-center">
              <h5>{content.spendingHeaderTitle} {dropDownMenu}</h5>
            </div>
            <div className="col-xs-2 text-right">
              {budgetButton}
            </div>
          </div>
        </div>
        {alertMessage}
        {accountModal}
      </div>
    );
  },
});

module.exports = SpendingsHeader;
