/**
 * @module EditSOPayment
 */
const React = require('react');
const DateTimeField = require('react-bootstrap-datetimepicker-noicon');
const config = require('../../../config');
const DateUtils = require('../../../utils/DateUtils');
const PaymentsActionCreator = require('../../../actions/PaymentsActionCreator');
const PaymentsStore = require('../../../stores/PaymentsStore');
const BasicModal = require('../../common/modals/ModalB');
const EditPaymentStore = require('../../../stores/EditPaymentStore');
const Select = require('react-select-box');
const moment = require('moment');
const ValidationConfig = require('../../../config/validationConfig');
const { PropTypes } = React;
const StringConstant = require('../../../constants/StringConstants');
const BrowserUtils = require('../../../utils/BrowserUtils');
const ErrorPopUpComponent = require('../../common/ErrorPopUpComponent');
const ReactDOM = require('react-dom');

const EditSOPayment = React.createClass({
  propTypes: {
    contents: PropTypes.object,
    paymentData: PropTypes.object,
    closed: PropTypes.func,
    id: PropTypes.string,
    showView: PropTypes.bool,
    fromData: PropTypes.string,
    accountId: PropTypes.string,
    onClick: PropTypes.func,
    isMobileView: PropTypes.bool,
    type: PropTypes.string,
  },
  getInitialState() {
    return {
      isAmountValid: true,
       referenceValid:true,
      formValid: false,
      paymentData: PaymentsStore.getSOPaymentById(this.props.id, this.props.accountId),
      showEditSuccessPopUp: false,
      showDeleteSuccessPopup: false,
      startMaxDate: null,
      showView: this.props.showView,
      isConfirm: false,
      startMinDate: moment(),
      endMinDate: moment(),
      defaultend: DateUtils.getShortString(),
      showEnd: false,
      showAnimation: true,
      noOfTime: StringConstant.EmptyString,
      showError: false,
      end: StringConstant.EmptyString,
      shakeSet: new Set(),
    };
  },
  componentWillMount() {
    this.setFormField();
    EditPaymentStore.addChangeListener(this.onStoreChange);
  },
   componentDidMount() {
    if (ReactDOM.findDOMNode(this.refs.duedtEnd) !== null) {
      ReactDOM.findDOMNode(this.refs.duedtEnd).children[2].children[0].disabled = true;
    }
      if (ReactDOM.findDOMNode(this.refs.dtEnd) !== null) { 
        ReactDOM.findDOMNode(this.refs.dtEnd).children[2].children[0].disabled = true;
      }
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
            showDeleteSuccessPopup: true,
          });
        } else {
          this.setState({
            showAnimation: true,
            showEditSuccessPopUp: true,
          });
        }
        break;
      case 422:
        this.setState({
          showAnimation: true,
        });
        this.handleError();
        break;
    }
  },
 onNoOfTimesChange(e) {
    const evnt = e;
    // Getting the name and Value of input changed
    const name = e.target.name;
    const value = e.target.value;
    const validationResult = ValidationConfig.validateData(name, value);
    // If validation criteria is matched
    if (validationResult.isValid) {
      PaymentsActionCreator.updateEditForm(StringConstant.end, e.target.value);
      this.setState({
        noOfTime: e.target.value,
      });
      this.state.noOfTime = e.target.value;
      // make the input valid
      evnt.target.className = `${''}`;
      this.checkFormValid();
    } else {
      // If regex fails shake the input box
      if (!validationResult.regexValid) {
        if (value.length === 0) {
          PaymentsActionCreator.updateEditForm(StringConstant.end, e.target.value);
          this.setState({
            noOfTime: e.target.value,
            formValid: false,
          });
           this.state.formValid = false;
          this.state.noOfTime = e.target.value;
        }
        this.checkFormValid();
         this.shakeInput(name);
      } else if (!validationResult.minLengthValid) {
        PaymentsActionCreator.updateEditForm(StringConstant.end, e.target.value);
        this.setState({
          noOfTime: e.target.value,
          formValid: false,
        });
        this.state.formValid = false;
        this.state.noOfTime = e.target.value;
        evnt.target.className = `${' pay'}`;
          this.checkFormValid();
      } else if (!validationResult.maxLengthValid) {
       this.shakeInput(name);
        this.checkFormValid();
      }
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
  // renderAccountNumber() {
  //   return this.renderTableRow(this.props.contents.accountLabel, this.state.paymentData.account_number);
  // },
  // renderSortCode() {
  //   return this.renderTableRow(this.props.contents.sortCode, this.state.paymentData.sort_code);
  // },
  // To set isConfirm state
  setCancel() {
    this.setState({ isConfirm: true });
  },
  setEndText(text) {
    switch (text) {
      case StringConstant.Pickadate:
        this.setState({ endingText: this.props.contents.endDate });
        break;
      case StringConstant.Nooftimes:
        this.setState({ endingText: this.props.contents.howManyTimes });
        break;
      default:
        this.setState({ endingText: StringConstant.EmptyString });
        break;
    }
  },
  // Gets the ending details for ENding Condition
  getEndingDetails() {
    switch (this.state.stopitwhen) {
      case StringConstant.Pickadate: return this.EndDateTimeField();
      case StringConstant.Nooftimes: return this.textField();
    }
  },
  setFormField() {
    const updateFormField = {};
    let amount = null;
    if (this.state.paymentData.hasOwnProperty(this.props.contents.schedule)) {
      this.state.editType = StringConstant.SOText;
      updateFormField.isRepeat = true;
      amount = this.state.paymentData.schedule.recurrence.amount.value;
      updateFormField.currency = this.state.paymentData.schedule.recurrence.amount.currency;
      updateFormField.dtStart = this.state.paymentData.schedule.next_payment.when;
      const howOften = Object.keys(this.state.paymentData.schedule.recurrence.frequency);
      updateFormField.oftenText = `${this.state.paymentData.schedule.recurrence.frequency[howOften[0]].interval}${' '}${howOften[0]}`;
      // for Standing Orders
      if (this.state.paymentData.schedule.hasOwnProperty(this.props.contents.end_condition)) {
        // Getting the end conditon from the json packet
        const endCondition = Object.keys(this.state.paymentData.schedule.end_condition);
        // if end condition is when
        if (endCondition[0] === 'when') {
          let endDate = DateUtils.getMomentFromDateString(this.state.paymentData.schedule.end_condition.when);
          const difference = DateUtils.comapareFromCurrentDate(DateUtils.getDateStringFromAPI(this.state.paymentData.schedule.end_condition.when));
          if (difference > 0) {
            this.setState({ startMaxDate: moment().add(difference + 1, StringConstant.Days) });
          }
          endDate = moment(endDate).format(config.dateFormatTimeline);
          updateFormField.stopitwhenText = StringConstant.Pickadate;
          updateFormField.end = this.state.paymentData.schedule.end_condition.when;
          this.setState(
            {
              stopitwhen: StringConstant.Pickadate,
              showStopitwhen: StringConstant.Pickadate,
              endingText: this.props.contents.endDate,
              showEndingText: this.props.contents.endDate,
              end: DateUtils.getDateStringFromAPI(this.state.paymentData.schedule.end_condition.when),
              showEndContent: endDate,
              defaultEndDate: endDate,
              showEnd: true,

            });
        } else {
          updateFormField.stopitwhenText = StringConstant.Nooftimes;
          updateFormField.end = this.state.paymentData.schedule.end_condition.number_of_payments;
          this.setState(
            {
              stopitwhen: StringConstant.Nooftimes,
              showStopitwhen: StringConstant.Nooftimes,
              showEndingText: this.props.contents.howManyTimes,
              endingText: this.props.contents.howManyTimes,
              noOfTime: this.state.paymentData.schedule.end_condition.number_of_payments,
              showEndContent: this.state.paymentData.schedule.end_condition.number_of_payments,
              showEnd: true,
            });
        }
      } else {
        this.setState(
          {
            stopitwhen: StringConstant.whenicancel,
            showStopitwhen: StringConstant.whenicancel,

          });
        updateFormField.stopitwhenText = StringConstant.whenicancel;
        updateFormField.end = StringConstant.whenCancelText;
      }
      let defaultNext = DateUtils.getMomentFromDateString(this.state.paymentData.schedule.next_payment.when);
      defaultNext = moment(defaultNext).format(config.dateFormatTimeline);
      const endMinDate = this.getNumberOfDays(DateUtils.getDateStringFromAPI(this.state.paymentData.schedule.next_payment.when));
      this.setState(
        {
          oftenText: updateFormField.oftenText,
          showOftenText: updateFormField.oftenText,
          value: DateUtils.getDateStringFromAPI(this.state.paymentData.schedule.next_payment.when),
          showValue: defaultNext,
          defaultNext: defaultNext,
          endMinDate: moment().add(endMinDate + 1, StringConstant.Days),
          amount: amount,
          showAmount: amount,
          isRepeat: true,
        });
    } else {
      this.state.editType = StringConstant.singlePayment;
      updateFormField.isRepeat = false;
      amount = this.state.paymentData.single.amount.value;
      updateFormField.currency = this.state.paymentData.single.amount.currency;
      let when = this.state.paymentData.single.when;
      updateFormField.when = when;
      when = DateUtils.getMomentFromDateString(when);
      when = moment(when).format(config.dateFormatTimeline);
      // updateFormField.when = when;
      this.setState(
        {
          showAmount: amount,
          amount: amount,
          when: DateUtils.getDateStringFromAPI(this.state.paymentData.single.when),
          showWhen: when,
          defaultWhen: when,
          isRepeat: false,
        }
      );
    }
      if (this.state.paymentData.reference.length === 0) {
          this.state.referenceValid = false;
      }
    updateFormField.id = this.state.paymentData.id;
    updateFormField.display_name = this.state.paymentData.display_name;
    updateFormField.reference = this.state.paymentData.reference;

    updateFormField.account_number = this.state.paymentData.account_number;
    updateFormField.sort_code = this.state.paymentData.sort_code;
    updateFormField.amount = amount;
    PaymentsActionCreator.setUpdateEditFormField(updateFormField);
  },
  // Returns the number of days
  getNumberOfDays(date) {
    const oneDay = 24 * 60 * 60 * 1000;
    const currentDate = new Date();
    const part = date.split('-');
    const secondDate = new Date(part[2], part[1] - 1, part[0]);
    if (currentDate.getTime() > secondDate.getTime()) {
      return 0;
    }
    const time = currentDate.getTime() - secondDate.getTime();
    return Math.round(Math.abs(time / oneDay));
  },
   // To set showView state
  hideViewPayment() {
    this.setFormField();
    this.setState({ showView: false, isAmountValid: true });
  },
  // Picks the value from stop it when dropdown
  pickValueForStopItWhen(e) {
    if (e === StringConstant.Pickadate || e === StringConstant.Nooftimes) {
      this.setState({
        showEnd: true,
        stopitwhen: e,
      });
    } else {
      this.setState({
        showEnd: false,
        stopitwhen: e,
      });
    }
    this.state.stopitwhen = e;
    this.setEndText(e);
    this.checkFormValid();
    PaymentsActionCreator.updateEditForm(StringConstant.stopitwhenText, e);
  },
  // Gets the Value For End Date
  endDateChange(e) {
    const difference = DateUtils.comapareFromCurrentDate(e);
    this.setState({
      startMaxDate: moment().add(difference + 1, StringConstant.Days),
    });
    PaymentsActionCreator.updateEditForm(StringConstant.end, DateUtils.getAPIDateString(e));
    this.state.end = e;
    this.checkFormValid();
  },
  // Gets the Value For Due Date
  duedateChange(e) {
    const difference = DateUtils.comapareFromCurrentDate(e);
    this.setState({
      endMinDate: moment().add(difference + 1, StringConstant.Days),
    });
    this.checkFormValid();
    PaymentsActionCreator.updateEditForm(StringConstant.dtStart, DateUtils.getAPIDateString(e));
  },
  updateWhen(e) {
    this.checkFormValid();
    PaymentsActionCreator.updateEditForm(StringConstant.when, DateUtils.getAPIDateString(e));
  },
  // Selects the value for how often
  oftenChange(e) {
    PaymentsActionCreator.updateEditForm(StringConstant.oftenText, e);
    this.setState({
      oftenText: e,
    });
    this.checkFormValid();
  },
  // Returns DateTimeField For Ending Details
  EndDateTimeField() {
    return (
      <DateTimeField ref="dtEnd" defaultText={this.state.defaultEndDate || this.props.contents.chooseDate} minDate={this.state.endMinDate} onChange={this.endDateChange}
        inputFormat={config.dateFormatTimeline}
        dateTime={this.state.end || this.state.defaultend} readonly mode ="date" format={config.dateFormat}
      />
    );
  },
   // Returns Textbox to enter number of times for ending
  textField() {
    return (<input type="text" ref="noOfTimes" name ="noOfTimes" value={this.state.noOfTime} onChange={this.onNoOfTimesChange} autoComplete="off" />);
  },
   // Sets the state to open the modal
  editedDataPopup() {
    this.setState({ showAnimation: false });
    const editPaymentData = EditPaymentStore.getEditPaymentData();
    PaymentsActionCreator.editPayment(this.props.accountId, editPaymentData);
  },
   // deletes the payment record
  deletePayment() {
    const deletePaymentRequest = {
      accountId: this.props.accountId,
      type: this.props.contents.mandateTypeSO,
      mandateId: this.state.paymentData.id,
    };
    this.setState({ showAnimation: false });
    PaymentsActionCreator.sendDeletePayment(deletePaymentRequest);
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
   // Sets the state to close the modal
  editMessageclose() {
    this.setState({ showEditSuccessPopUp: false, showView: true });
  },
  // Sets the state to close the Delete modal
  closeDeleteModal() {
    this.setState({ showDeleteSuccessPopup: false });
    PaymentsActionCreator.isEditPaymentExit(false);
  },
   // Returns the modal for displaying message for editPayment
  editPaymentMessagePopup() {
    if (this.state.showEditSuccessPopUp === true) {
      return (<BasicModal>
        <div className="modal_content edit-payment">
          <p>{this.props.contents.editPaymentText}</p>
        </div>
        <div className="modal_footer">
          <button onClick={this.editMessageclose}>{this.props.contents.ok}</button>
        </div>
      </BasicModal>);
    }
  },
   // Returns the Delete modal
  deletePopup() {
    if (this.state.showDeleteSuccessPopup === true) {
      return (<BasicModal>
        <div className="modal_content delete-payment">
          <p>{this.props.contents.deletePaymentText}</p>
        </div>
        <div className="modal_footer">
          <button onClick={this.closeDeleteModal}>{this.props.contents.ok}</button>
        </div>
      </BasicModal>);
    } else {
      return <span />;
    }
  },
    // to validate the amount
  validateAmount(e) {
    const name = e.target.name;
     let value = null;
     if (e.target.value.startsWith(StringConstant.currencySymbol)) {
        value = e.target.value.replace(StringConstant.currencySymbol, '');
     } else {
      value = e.target.value;
     }
    const validationResult = ValidationConfig.validateData(name, value);
    if (validationResult.isValid) {
      if (value.endsWith('.')) {
        this.setState({
          amount: e.target.value,
        });
        this.state.isAmountValid = false;
      } else if (parseFloat(value) === 0.00) {
          this.setState({
          amount: e.target.value,
        });
        this.state.isAmountValid = false;
      } else {
        this.setState({
          isAmountValid: true,
          amount: e.target.value,
        });
        this.state.isAmountValid = true;
      }
      PaymentsActionCreator.updateEditForm(StringConstant.mpAmount, parseFloat(value));
    } else {
      if (!validationResult.regexValid) {
        const length = value.length;
        if (length === 0) {
          this.setState({
            amount: e.target.value,
              isAmountValid: false,
          });
          this.state.isAmountValid = false;
          PaymentsActionCreator.updateEditForm(StringConstant.mpAmount, parseFloat(value));
        } else if (isNaN(value) && length === 1) {
            this.setState({
              isAmountValid: false,
          });
          this.state.isAmountValid = false;
        } else {
          this.setState({
            isAmountValid: true,
          });
          this.state.isAmountValid = true;
        }
         this.shakeInput(name);
      } else if (!validationResult.minLengthValid) {
        this.setState({
          isAmountValid: false,
        });
        this.state.isAmountValid = false;
      } else if (!validationResult.maxLengthValid) {
        if (parseFloat(value) !== 0.00) {
        this.setState({
          isAmountValid: true,
        });
         this.state.isAmountValid = true;
      }
       this.shakeInput(name);
    }
    }
    this.checkFormValid();
  },
  // To Set The End Text
  checkFormValid() {
    let isValid = true;
     if (!this.state.referenceValid) {
        this.refs['editDone'].classList.add('inactive');
      this.setState({ formValid: false });
      return;
    }
    if (this.state.editType === StringConstant.singlePayment) {
      isValid = true;
    } else {
      const endType = this.state.stopitwhen;
      switch (endType) {
        case StringConstant.Pickadate:
          if (this.state.end !== StringConstant.EmptyString) {
            isValid = true;
          } else {
            isValid = false;
          }
          break;
        case StringConstant.Nooftimes:
          if (this.state.noOfTime !== StringConstant.EmptyString && parseInt(this.state.noOfTime) <= StringConstant.noOfTimesLimit && parseInt(this.state.noOfTime) !== 0) {
            isValid = true;
        } else {
            isValid = false;
          }
          break;
        default:
          isValid = true;
          break;
      }
    }
    if (this.state.isAmountValid && isValid) {
       this.refs['editDone'].classList.remove('inactive');
      this.setState({ formValid: true });
    } else {
    this.refs['editDone'].classList.add('inactive');
      this.setState({ formValid: false });
    }
  },
  appendCurrency(amount) {
    if (amount.toString().search(StringConstant.currencySymbol) < 0) {
      return StringConstant.currencySymbol.concat(amount);
    } else {
      return amount;
    }
  },
   shakeInput(name) {
       this.refs[name].classList.add('animated');
        this.refs[name].classList.add('shake');
                this.state.shakeSet.add(name);
                setTimeout(function () {
                    for (const item of this.state.shakeSet) {
                       this.refs[name].classList.remove('animated');
                       this.refs[name].classList.remove('shake');
                        this.state.shakeSet.delete(item);
                    }
                // this.removeCss();
        }.bind(this), 200);
    },

    handleReference(e) {
       const value = e.target.value;
       if (value.trim().length === 0) {
         this.state.referenceValid = false;
       } else if (value.length > StringConstant.referenceMaxLength) {
         e.target.value = e.target.value.substring(0, e.target.value.length - 1);
         this.shakeInput(e.target.name);
         return;
       } else {
       this.state.referenceValid = true;
      }
      this.checkFormValid();
       PaymentsActionCreator.updateEditForm(StringConstant.reference, value);
  },
   renderEndData() {
    if (this.state.isRepeat) {
      if (this.state.showView) {
        if (this.state.showStopitwhen !== StringConstant.whenicancel && this.state.showEnd === true) {
          return this.renderTableRow(this.state.endingText, this.state.showEndContent);
        } else {
          return null;
        }
      } else {
        if (this.state.stopitwhen !== StringConstant.whenicancel && this.state.showEnd === true) {
          return this.renderTableRow(this.state.endingText, this.getEndingDetails());
        } else {
          return null;
        }
      }
    }
  },
   renderStopItWhen() {
    // let stopItWhen = null;
    let endText = this.props.contents.whenIcancel;
    if (this.state.showStopitwhen !== StringConstant.whenicancel && this.state.showEnd === true) {
      endText = this.state.showStopitwhen === StringConstant.Pickadate ? this.props.contents.pickdate : this.props.contents.noOfTimes;
    }
    if (this.state.isRepeat) {
      const stopItWhen = this.state.showView ?
        <label htmlFor="usr">{endText} </label>
        :
        <Select ref="selStop" value={this.state.stopitwhen} onChange={this.pickValueForStopItWhen} >
          <option value={StringConstant.Pickadate}>{this.props.contents.pickdate}</option>
          <option value={StringConstant.Nooftimes}>{this.props.contents.noOfTimes}</option>
          <option value={StringConstant.whenicancel} >{this.props.contents.whenIcancel}</option>
        </Select>;
      return this.renderTableRow(this.props.contents.stopitWhen, stopItWhen);
    }
  },
  renderHowOften() {
    let oftnText = this.props.contents.Weekly;
    switch (this.state.showOftenText) {
      case 'weekly': oftnText = this.props.contents.Weekly;
        break;
      case '2 weekly': oftnText = this.props.contents.twoWeekly;
        break;
      case '3 weekly': oftnText = this.props.contents.threeWeekly;
        break;
      case '4 weekly': oftnText = this.props.contents.fourWeekly;
        break;
      case '1 monthly': oftnText = this.props.contents.monthly;
        break;
      case '2 monthly': oftnText = this.props.contents.twoMonthly;
        break;
      case '3 monthly': oftnText = this.props.contents.threeMonthly;
        break;
      case '6 monthly': oftnText = this.props.contents.sixMonthly;
        break;
      case '12 monthly': oftnText = this.props.contents.anually;
        break;
      default: oftnText = this.props.contents.Weekly;
        break;
    }
    const howOften = this.state.showView ?
      <label htmlFor="usr">{oftnText} </label>
      :
      <Select ref="selOften" className="accountColor" value={this.state.oftenText} onChange={this.oftenChange}>
        <option value="1 weekly">{this.props.contents.Weekly}</option>
        <option value="2 weekly">{this.props.contents.twoWeekly}</option>
        <option value="3 weekly">{this.props.contents.threeWeekly}</option>
        <option value="4 weekly">{this.props.contents.fourWeekly}</option>
        <option value="1 monthly">{this.props.contents.monthly}</option>
        <option value="2 monthly">{this.props.contents.twoMonthly}</option>
        <option value="3 monthly">{this.props.contents.threeMonthly}</option>
        <option value="6 monthly">{this.props.contents.sixMonthly}</option>
        <option value="12 monthly">{this.props.contents.anually}</option>
      </Select>;
    if (this.state.isRepeat) {
      return this.renderTableRow(this.props.contents.howOften, howOften);
    } else {
      return null;
    }
  },
   renderRepeatPayment() {
    const isRepeat = this.state.isRepeat ? this.props.contents.Yes : this.props.contents.No;
    return this.renderTableRow(this.props.contents.repeatPaymentText, isRepeat);
  },
  renderType() {
    return this.renderTableRow(this.props.contents.type, this.props.type);
  },
 renderReference() {
    let refe = '';
    if (this.state.paymentData.reference === '') {
        refe = <input type="text" ref="reference" name="reference" placeholder={this.props.contents.placeHolderContent} onChange={this.handleReference} autoComplete="off"/>;
    } else refe = <label htmlFor="usr"> {this.state.paymentData.reference} </label>;
    return this.renderTableRow(this.props.contents.reference, refe);
  },
   renderAmount() {
    const amount = this.state.showView ?
      <label htmlFor="usr"> £{this.state.showAmount} </label>
      :
      <input type="text" name="amount" ref="amount" value={this.appendCurrency(this.state.amount) } onChange={this.validateAmount} placeholder={this.props.contents.placeHolderContent} autoComplete="off"/>;
    return this.renderTableRow(this.props.contents.amount, amount);
   },
   renderTableRow(name, value) {
    if (name === this.props.contents.accountName || name === this.props.contents.accountLabel || name === this.props.contents.reference) {
      return (<li className = "first-part">
        <section>{name}</section>
        <section>{value}</section>
      </li >);
    } else if (name === this.props.contents.stopitWhen) {
      return (<li className = "middle-part">
        <section>{name}</section>
        <section>{value}</section>
      </li>);
    } else {
      return (<li className = "second-part">
        <section>{name}</section>
        <section>{value}</section>
      </li >);
    }
  },
    renderFromAccountName() {
    return this.renderTableRow(this.props.contents.accountLabel, this.props.fromData);
  },
   renderAccountName() {
    return this.renderTableRow(this.props.contents.accountName, this.state.paymentData.display_name);
  },
   // renders animated image
  renderLoadingImage() {
    return (<div className="chicken-loading"> </div>);
  },
  // render cancel payment/Transfer button
  renderCancelButton() {
    if (this.props.type === 'Payment') {
      return (<div><a onClick={ this.setCancel } className="payeeOverlayBtn">{this.props.contents.cancelThisPayment}</a></div>);
    } else if (this.props.type === 'Transfer') {
      return (<div><a onClick={ this.setCancel } className="payeeOverlayBtn">{this.props.contents.cancelThisTransfer}</a></div>);
    }
    // return (<div>{ PaymentsStore.getPaymentType() ? <a onClick={ this.setCancel } className="payeeOverlayBtn">{this.props.contents.cancelThisTransfer}</a> : <a onClick={ this.setCancel } className="payeeOverlayBtn">{this.props.contents.cancelThisPayment}</a>}</div>);
  },
  // render the button to cancel or confirmCancel
  renderButton() {
    return (<div className="col-xs-12 text-center padding-top padding-bottom">{this.state.isConfirm ? <a onClick={ this.deletePayment } className="payeeOverlayBtn">{this.props.contents.confirmCancel}</a> : this.renderCancelButton() }</div>);
  },
   // render header buttons for mobile view
  renderButtonForMobileView() {
    return (<div>{this.props.isMobileView ? <a className="page-options opt-green" onClick={this.setshowView}><span className = "icon icon-swipe-left"></span>{this.props.contents.back}</a> : ''}</div>);
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
          <h6 className="ModelHeader">{this.props.contents.managePaymentHeader}</h6>
        </div>
        <div className="col-xs-3 text-right">
          { this.state.showView ? <a className="page-options opt-green" onClick={this.hideViewPayment}>{this.props.contents.edit}</a>

            : <a className="page-options opt-green inactive" ref ="editDone" id="editDone" onClick={this.editedDataPopup}>{this.props.contents.done}</a>
          }
        </div>
      </div>);
    return header;
  },
   renderWhen() {
    if (this.state.isRepeat) {
      return null;
    } else {
      // Please don't delete can be use in future'
      // const when = this.state.showView ?
      //   <label htmlFor="usr"> {this.state.showWhen} </label>
      //   :
      //   <DateTimeField ref="when" className="accountColor" defaultText={this.state.defaultWhen} mode ="date" onChange={this.updateWhen}
      //     dateTime={this.state.when} format={config.dateFormat} inputFormat={config.dateFormatTimeline} minDate={this.state.startMinDate}
      //     />;
      const when = <label htmlFor="usr"> {this.state.showWhen} </label>;
      return this.renderTableRow('when', when);
    }
  },
  renderNextDueDate() {
    const nextDue = this.state.showView ?
      <label htmlFor="usr"> {this.state.showValue} </label>
      :
      <DateTimeField ref="duedtEnd" className="accountColor" defaultText={this.state.defaultNext} mode ="date" onChange={this.duedateChange} readOnly
        dateTime={this.state.value} format={config.dateFormat} inputFormat={config.dateFormatTimeline} minDate={this.state.startMinDate} maxDate={this.state.startMaxDate}
      />;
    if (this.state.isRepeat) {
      if (BrowserUtils.isMobileView()) {
        return this.renderTableRow(this.props.contents.nextDue, nextDue);
      } else return this.renderTableRow('Next due', nextDue);
    } else {
      return null;
    }
  },

  render() {
    return (
      <div className = "main-container from-top">
        { this.state.showAnimation === false && this.renderLoadingImage() }

        {this.editPaymentMessagePopup() }
        {this.deletePopup() }
        {this.renderHeader() }
        <div className = "scroll-wrapper">
          <div className = "edit-table payment-table">
            <ul>
              {this.renderAccountName() }
              {this.renderFromAccountName() }
              {this.renderAmount() }
              {this.renderWhen() }
              {this.renderReference() }
              {this.renderType() }
              {this.renderRepeatPayment() }
              {this.renderHowOften() }
              {this.renderNextDueDate() }
              {this.renderStopItWhen() }
              {this.renderEndData() }
            </ul>
          </div>

          <div className = "row">
            {this.state.showView ? <div className="col-xs-12 text-center padding-top padding-bottom">&nbsp; </div> : this.renderButton()}
          </div>

          {this.state.showError ? this.errorPopup() : null }
        </div>
        </div>
    );
  },
});
module.exports = EditSOPayment;
