/**
 * @module EditDDPayment
 */
const React = require('react');
const PaymentsActionCreator = require('../../../actions/PaymentsActionCreator');
const PaymentsStore = require('../../../stores/PaymentsStore');
const { PropTypes } = React;
const BasicModal = require('../../common/modals/ModalB');
const DateUtils = require('../../../utils/DateUtils');
const moment = require('moment');
const config = require('../../../config');
const EditPaymentStore = require('../../../stores/EditPaymentStore');
const ErrorPopUpComponent = require('../../common/ErrorPopUpComponent');
const EditDDPayment = React.createClass({
  propTypes: {
    contents: PropTypes.object,
    closed: PropTypes.bool,
    id: PropTypes.string,
    accountId: PropTypes.string,
    isMobileView: PropTypes.bool,
    showView: PropTypes.bool,
    onClick: PropTypes.func,
    fromData:PropTypes.string,
  },
  getInitialState() {
    return {
      paymentData: {},
      isEnable: false,
      showView: this.props.showView,
      isConfirm: false,
      showAnimation: true,
      showError: false,
    };
  },
  componentWillMount() {
    this.setState({
      paymentData: PaymentsStore.getDirectDebitDataById(this.props.id, this.props.accountId),
    });
    EditPaymentStore.addChangeListener(this.onStoreChange);
  },
  componentWillUnmount() {
    EditPaymentStore.removeChangeListener(this.onStoreChange);
  },
  onStoreChange() {
    const response = EditPaymentStore.getEditPaymentResponse();
    switch (response.code) {
      case 201:
        if (response.type === this.props.contents.DELETE_PAYMENT_TYPE) {
          this.setState({
            showAnimation: true,
            isEnable: true,
          });
        }
        break;
      case 422:
        this.handleError();
        break;
    }
  },
  // to set view mode on cancel click
  setshowView() {
    if (this.props.isMobileView && this.state.showView) {
      this.props.onClick(false);
    }
    this.setState({ showView: true });
    // this.props.onClick(false);
  },
  // To set isConfirm state
  setCancel() {
    this.setState({ isConfirm: true });
  },
  // To set showView state
  hideViewPayee() {
    this.setState({ showView: false });
  },
  handleError() {
    this.setState({ showError: true });
  },
  closeErrorPopup() {
    this.setState({ showError: false });
  },
  errorPopup() {
    const response = EditPaymentStore.getEditPaymentResponse();
    return (<ErrorPopUpComponent error={response.error}
      closeErrorPopup={this.closeErrorPopup} content={this.props.contents}
    />);
  },
  // sets the state to enable modal for delete payment
  deletePayment() {
    const deletePaymentRequest = {
      accountId: this.props.accountId,
      type: this.props.contents.mandateTypeDD,
      mandateId: this.state.paymentData.id,
    };
    this.setState({ showAnimation: false });
    PaymentsActionCreator.sendDeletePayment(deletePaymentRequest);
  },
  // sets the state to close the Delete Modal
  closeDeleteModal() {
    this.setState({
      isEnable: false,
    });
    PaymentsActionCreator.isEditPaymentExit(false);
  },
  repeatOption() {
    return this.renderTableRow(this.props.contents.repeatPayment, this.props.contents.Yes);
  },
  renderStatus() {
    return this.renderTableRow(this.props.contents.status, this.state.paymentData.is_active ? this.props.contents.active : this.props.contents.inactive);
  },
  // render header buttons for mobile view
  renderButtonForMobileView() {
    return (<div>{this.props.isMobileView ? <a className="page-options opt-green float-left" onClick={this.setshowView}><span className = "icon icon-swipe-left"></span>{this.props.contents.back}</a> : ''}</div>);
  },
  // render Header for edit or view
  renderHeader() {
    const header = (
      <div className = "row no-gutters pay-Header">
        <div className="col-xs-3">
          { this.state.showView ? this.renderButtonForMobileView() :
            <a className="page-options opt-green float-left" onClick={this.setshowView}>{this.props.contents.cancel}</a>}
        </div>
        <div className="col-xs-6 text-center">
          <h6 className="ModelHeader">{this.props.contents.managePayment}</h6>
        </div>
        <div className="col-xs-3 text-right">
          { this.state.showView ? <a className="page-options opt-green" onClick={this.hideViewPayee}>{this.props.contents.edit}</a>

            : <a className="page-options opt-green" onClick={this.editedDataPopup}>{this.props.contents.done}</a>
          }
        </div>
      </div>);
    return header;
  },
  // renders animated image
  renderLoadingImage() {
    return (<div className="chicken-loading"> </div>);
  },
  renderTableRow(name, value) {
    let css = name === this.props.contents.lastAmount ? 'amount-data' : '';
    if (name === this.props.contents.accountName || name === this.props.contents.accountLabel) {
      return (<li className = "first-part">
        <section>{name}</section>
        <section>{value}</section>
      </li >);
    } else {
      return (<li className = "second-part">
        <section>{name}</section>
        <section className = {css}>{value}</section>
      </li >);
    }
  },
  renderDisplayName() {
    return this.renderTableRow(this.props.contents.accountName, this.state.paymentData.display_name);
  },
  renderAccountName() {
    return this.renderTableRow(this.props.contents.accountLabel, this.props.fromData);
  },
  renderAmount() {
    return this.renderTableRow(this.props.contents.lastAmount, `${'£'}${this.state.paymentData.previous_payment.amount.value}`);
  },
  renderDate() {
    let endDate = DateUtils.getMomentFromDateString(this.state.paymentData.previous_payment.when);
    endDate = moment(endDate).format(config.dateFormatTimeline);
    return this.renderTableRow(this.props.contents.lastPayment, endDate);
  },
  renderReference() {
    return this.renderTableRow(this.props.contents.lastPaymentReference, this.state.paymentData.previous_payment.reference);
  },
  renderPaymentType() {
    return this.renderTableRow(this.props.contents.type, this.props.contents.paymentLink);
  },
  // render the button to cancel or confirmCancel
  renderButton() {
    return (<div className="col-xs-12 text-center padding-top padding-bottom">{this.state.isConfirm ? <a className="payeeOverlayBtn" onClick={ this.deletePayment }>{this.props.contents.confirmCancel}</a> : this.renderCancelButton() }</div>);
  },
  // render cancel payment/Transfer button
  renderCancelButton() {
    return (<div>{ PaymentsStore.getPaymentType() ? <a className="payeeOverlayBtn" onClick={ this.setCancel }>{this.props.contents.cancelThisTransfer}</a> : <a className="page-options payeeOverlayBtn" onClick={ this.setCancel }>{this.props.contents.cancelThisPayment}</a>}</div>);
  },
  render() {
    return (
      <div className = "main-container from-top" >
        { this.state.showAnimation === false && this.renderLoadingImage() }
        {this.state.isEnable && <BasicModal>
          <div className="modal_content">
            <p>{this.props.contents.deletePaymentText}</p>
          </div>
          <div className="modal_footer">
            <button onClick={this.closeDeleteModal}>{this.props.contents.ok}</button>
          </div>
        </BasicModal>
        }
        {this.renderHeader() }
        < div className = "scroll-wrapper" >
          <div className = "edit-table payment-table">
            <ul>
              {this.renderDisplayName() }
              {this.renderAccountName() }
              {this.renderAmount() }
              {this.renderDate() }
              {this.renderReference() }
              {this.repeatOption() }
            </ul>
          </div>

          {!this.state.showView &&
            <div className = "row">
              {this.renderButton() }
            </div>
          }
        </div >
        { this.state.showError ? this.errorPopup() : null }
      </div >

    );
  },


});

module.exports = EditDDPayment;
