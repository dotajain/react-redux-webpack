/**
 * @module TransferHomePage
 */

const React = require('react');
const ReactDOM = require('react-dom');
const AccountListComponent = require('../payment/AccountListComponent');
const KeypadComponent = require('../payment/KeypadComponent');
const RepeatPayment = require('../payment/RepeatPayment');
const PaymentsActionCreator = require('../../../actions/PaymentsActionCreator');
const AccountOpeningActions = require('../../../actions/AccountOpeningActions');
const PaymentsStore = require('../../../stores/PaymentsStore');
const BasicModal = require('../../common/modals/ModalB');
const NumberUtils = require('../../../utils/NumberUtils');
const BrowserUtils = require('../../../utils/BrowserUtils');
const RegexUtils = require('../../../utils/RegexUtils');
const StringConstant = require('../../../constants/StringConstants');
const ValidationConfig = require('../../../config/validationConfig');

const { PropTypes } = React;


const TransferHomePage = React.createClass({
	propTypes: {
        contents: PropTypes.object,
        onClick: PropTypes.func,
        accountList: PropTypes.array,
		accountToList: PropTypes.array,
		tabChange: PropTypes.bool,
    },

	getInitialState() {
		return {
			amountInValid: true,
			stepText: this.props.contents.payFrom,
			nextStep: this.props.contents.From,
			enableKeypad: BrowserUtils.isMobileView() || PaymentsStore.isOneOffPayment() ? false : false,
			amount: PaymentsStore.getDefaultAmt(),
			amtCss: 'value',
			selectedClass: 'col-lg-offset-2 col-md-offset-2',
			selectedToClass: StringConstant.EmptyString,
			checkTransfer: PaymentsStore.checkToTransfer(),
			enableRP: false,
			enableNext: false,
			showAmountError: false,
			referenceData: StringConstant.EmptyString,
			confirmCancel: false,
			nextClickValue: StringConstant.EmptyString,
			repeatAccountValid: StringConstant.EmptyString,
			showWhen: StringConstant.EmptyString,
			showTo: BrowserUtils.isMobileView() ? false : true,
			showNextSteps: BrowserUtils.isMobileView() ? false : true,
			showOnOff: false,
			fromData: {},
			shakeSet: new Set(),

		};
	},
	componentWillMount() {
		PaymentsStore.setMaxListeners(100);
		PaymentsStore.addChangeListener(this.onStoreChange);
		if (PaymentsStore.getConfirmBack()) {
			this.setState({ enableKeypad: false });
		}
		if (this.props.tabChange && PaymentsStore.getNextTask() !== StringConstant.From) {
			this.setState({ showTo: true, showNextSteps: true, amount: PaymentsStore.getRepeatAmount(), enableNext: PaymentsStore.isMakePayment() });
		}


		if (PaymentsStore.isFromOtherPage() && PaymentsStore.getNextTask() !== StringConstant.From) {
			this.setState({ showTo: true, showNextSteps: true });
		}
		// PaymentsActionCreator.refreshSavingComponent();
	},
	componentWillUnmount() {
		PaymentsStore.removeChangeListener(this.onStoreChange);
	},

	onStoreChange() {
		if (this.isMounted()) {
			this.setState({
				nextStep: PaymentsStore.getNextTask(),
			});
			if (PaymentsStore.getNextTask() === StringConstant.To) {
				this.setState({ stepText: this.props.contents.payFrom });
			}
			if (PaymentsStore.getNextTask() === StringConstant.KP) {
				this.setState({ stepText: this.props.contents.howMuchTitle });
			}
			if (PaymentsStore.getNextTask() === StringConstant.KP || PaymentsStore.getNextTask() === StringConstant.RP) {
				this.setState({
					selectedClass: 'col-lg-offset-0 col-md-offset-0',
					selectedToClass: 'col-lg-push-4 col-md-push-4 ',
					amount: PaymentsStore.getRepeatAmount(),
					amtCss: PaymentsStore.isOneOffPayment() ? 'value confirm-value' : 'value',
					enableNext: PaymentsStore.isOneOffPayment() ? PaymentsStore.isMakePayment() : false,
				});
			}
			if (PaymentsStore.getRepeatAmount() > 0) {
				this.setState({ amtCss: 'value confirm-value', amountInValid: false, enableKeypad: false });
			}

			if (PaymentsStore.getNextTask() === StringConstant.RP) {
				const tempText = PaymentsStore.checkIfBothPotSelected() ? this.props.contents.whenHappen : this.props.contents.whenGo;

				this.setState({
					enableKeypad: false, stepText: tempText, amtCss: 'value confirm-value',
					enableRP: true, enableNext: PaymentsStore.isMakePayment(), amount: PaymentsStore.getRepeatAmount(),
				});

				if (PaymentsStore.getMoveMoney() !== StringConstant.EmptyString &&
					(PaymentsStore.getRepeatAmount() === 0 || PaymentsStore.getRepeatAmount() === PaymentsStore.getDefaultAmt())) {
					this.setState({
						enableKeypad: true, amtCss: 'value',
					});
				}
			}
			if (PaymentsStore.getSelectedToAccount() === StringConstant.EmptyString) {
				this.setState({ amtCss: 'value' });
			}
			if (PaymentsStore.getEndingDetails() !== StringConstant.EmptyString) {
				this.setState({ referenceData: PaymentsStore.getEndingDetails().reference });
			}
			this.setState({ repeatAccountValid: PaymentsStore.repeatPaymentShow(), showWhen: PaymentsStore.getWhenEnable() });

			if (BrowserUtils.isMobileView()) {
				// to set the state when back from confrim payment
				if (PaymentsStore.getConfirmBack()) {
					this.setState({ showTo: true, showNextSteps: true });
				}
				// focus textbox after selecting in to list
				if (PaymentsStore.getNextTask() === StringConstant.KP && ReactDOM.findDOMNode(this.refs.txtAmt) !== null) {
					ReactDOM.findDOMNode(this.refs.txtAmt).focus();
				}
			}
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
	// handles keypad button click
	handleClicks(e) {
		let amt = this.state.amount;
		if (PaymentsStore.getDefaultAmt() === this.refs.txtAmt.value) {
			amt = e.target.value;
		} else {
			amt += e.target.value;
		}
		if (amt === '.') {
			amt = '00.';
			this.setState({
				amountInValid: true,
				amount: amt,
			});
			this.refs.txtAmt.value = NumberUtils.decimalFormat(amt, 3, false);
			const data = {
				type: StringConstant.amt,
				value: amt,
			};
			PaymentsActionCreator.checkEndData(data);
			return false;
		} else if (amt === '00.00') {
			this.setState({ amountInValid: true });
			this.shakeInput('txtAmt');
			return;
		}
		const isValid = RegexUtils.isValid(amt, RegexUtils.regexes.decimalNumber);
		this.refs.txtAmt.className = this.state.amtCss;
		if (isValid) {
			if (amt < 0) {
				this.setState({ amountInValid: true });
			} else {
				const amtError = this.checkAmount(amt);
				this.setState({ showAmountError: amtError });
				if (!amtError) {
					if (this.refs.txtAmt.value.length <= 18) {
						let css = 'value confirm-value';
						this.setState({
							enable: true,
							amtCss: css,
							amount: amt,
							stepText: this.props.contents.whenHappen,
							amountInValid: false,
						});
						this.refs.txtAmt.value = NumberUtils.decimalFormat(amt, 3, false);
						const data = {
							type: StringConstant.amt,
							value: amt,
						};
						PaymentsActionCreator.checkEndData(data);
						this.refs.txtAmt.className = css;
						if (css.indexOf('large') > 0) {
							css = css.replace('large-amount', 'large-amount');
						} else {
							css = `${css} large-amount`;
						}
						if (this.refs.txtAmt.value.length > 13) {
							this.setState({
								amtCss: css,
							});
						}
					}
				}
			}
		} else {
			if (amt <= 0) {
				this.setState({ amountInValid: true });
			}
			this.shakeInput('txtAmt');
			//	this.refs.txtAmt.className = `${this.state.amtCss} ${' animated shake'}`;
		}
	},
	// checks amount entered in amount textbox
	checkAmount(amt) {
		let error = false;
		if (PaymentsStore.getSelectedPotData() !== undefined && PaymentsStore.getSelectedPotData().balance !== undefined) {
			if (amt > PaymentsStore.getSelectedPotData().balance.value) {
				error = true;
			}
		} else {
			error = false;
		}

		return error;
	},
	closeModal() {
		this.setState({ showAmountError: false, showOnOff: false });
	},
	// Returns the modal for displaying message for amount error
	amountCheckPopup() {
		if (this.state.showAmountError === true) {
			return (<BasicModal>
				<div className="modal_content">
					<p>{this.props.contents.amountValidationError}</p>
				</div>
				<div className="modal_footer">
					<button onClick={this.closeModal}>{this.props.contents.ok}</button>
				</div>
			</BasicModal>);
		}
	},
	singlePaymentPopUp() {
		if (this.state.showOnOff === true) {
			return (<BasicModal>
				<div className="modal_content">
					<p>{this.props.contents.potMessage}
					</p>
				</div>
				<div className="modal_footer">
					<button onClick={this.closeModal}>{this.props.contents.cancel}</button>
					<button onClick={this.okModal}><strong>{this.props.contents.ok}</strong></button>
				</div>
			</BasicModal>);
		}
	},
	// on ok click
	okModal() {
		PaymentsActionCreator.setOneOffPayment();
		PaymentsActionCreator.putSelectedAccount(this.state.fromData);
		this.setState({ showOnOff: false, enableNext: true });
	},
	// handle keypad delete button click
    deleteClick() {
		const amt = this.state.amount.substring(0, this.state.amount.length - 1);

		if (amt.length === 0) {
			this.refs.txtAmt.value = PaymentsStore.getDefaultAmt();
			this.refs.txtAmt.classList.remove('confirm-value');
			this.setState({ amountInValid: true, stepText: this.props.contents.howMuchTitle, amount: amt });

			const data = {
				type: StringConstant.amt,
				value: amt,
			};
			PaymentsActionCreator.checkEndData(data);
		} else {
			if (PaymentsStore.getDefaultAmt() !== this.refs.txtAmt.value) {
				this.refs.txtAmt.value = NumberUtils.decimalFormat(amt, 3, false);

				if (this.state.amount > 0) {
					this.refs.txtAmt.classList.add('confirm-value');
				}

				if (this.refs.txtAmt.value.length <= 13) {
					this.setState({ amtCss: this.state.amtCss.replace('large-amount', '') });
				}

				this.setState({ amount: amt });
				const data = {
					type: StringConstant.amt,
					value: amt,
				};
				PaymentsActionCreator.checkEndData(data);
			}
		}
    },

	// handle keypad next button click
    goToNext(e) {
		const tempText = PaymentsStore.checkIfBothPotSelected() ? this.props.contents.whenHappen : this.props.contents.whenGo;

		this.setState({ showAmountError: this.checkAmount(this.state.amount) });
		const isValid = RegexUtils.isValid(this.state.amount, RegexUtils.regexes.decimalNumber);
		this.refs.txtAmt.className = this.state.amtCss;

		if (e !== StringConstant.amt && (!isValid || this.refs.txtAmt.value === PaymentsStore.getDefaultAmt())) {
			this.refs.txtAmt.classList.remove('confirm-value');
			this.shakeInput('txtAmt');
		} else {
			if (!this.checkAmount(this.state.amount)) {
				this.setState({
					enableKeypad: false,
					nextStep: StringConstant.RP,
					stepText: tempText,
					enableRP: parseFloat(this.state.amount) > 0.00 ? true : false,
					enableNext: PaymentsStore.isMakePayment(),
					amtCss:  parseFloat(this.state.amount) > 0.00 ? 'value confirm-value' : 'value',
				});
				PaymentsActionCreator.setPaymentStep(StringConstant.RP);
			}
		}
    },
	// step to show hide the payment screens
	paymentSteps() {
		if (this.state.showNextSteps) {
			switch (this.state.nextStep) {
				case StringConstant.KP:
				case StringConstant.RP:
					if (BrowserUtils.isMobileView()) {
						if (PaymentsStore.getSelectedToAccount() !== StringConstant.EmptyString) {
							if (PaymentsStore.getSelectedToAccount().type !== StringConstant.savings
								|| (PaymentsStore.getSelectedToAccount().type === StringConstant.savings
									&& (PaymentsStore.getSelectedToPot() !== StringConstant.EmptyString || PaymentsStore.isToSavingTotClicked()))) {
								return this.showAmountText();
							}
						}
					} else {
						return this.showAmountText();
					}
			}
		}
	},
	// show the repeat payment component
	showRepeatPayment() {
		if (this.showRPOption()) {
			return (
				<RepeatPayment onClick={this.nextClicked} content={this.props.contents} referenceData={this.state.referenceData} repeatAccountValid={this.state.repeatAccountValid} showWhen={this.state.showWhen} />
			);
		}
	},
	showRPNext() {
		if (this.state.enableRP && this.state.enableNext && this.state.showNextSteps && !this.checkAmount(this.state.amount) && this.showRPOption()) {
			return <button className="pay-btn-success" onClick={this.nextClicked}>{this.props.contents.NextButton}</button>;
		}
	},
	showRPOption() {
		const toAccount = PaymentsStore.getSelectedToAccount();
		const fromAccount = PaymentsStore.getSelectedAccount();
		let toRepeat = false;
		let fromRepeat = false;
		if (toAccount !== StringConstant.EmptyString) {
			if (toAccount.type !== StringConstant.savings || (toAccount.type === StringConstant.savings && (PaymentsStore.getSelectedToPot() !== StringConstant.EmptyString || PaymentsStore.checkPotEmpty(toAccount.id))) || PaymentsStore.isToSavingTotClicked()) {
				toRepeat = true;
			}
		}
		if (fromAccount !== StringConstant.EmptyString) {
			if (fromAccount.type !== StringConstant.savings || (fromAccount.type === StringConstant.savings && (PaymentsStore.getSelectedPot() !== StringConstant.EmptyString || PaymentsStore.checkPotEmpty(fromAccount.id))) || PaymentsStore.isSavingTotClicked()) {
				fromRepeat = true;
			}
			// check to not nebale next button in case of same saving account for one-off
			if (PaymentsStore.isOneOffPayment() && fromAccount.type === StringConstant.savings &&
				fromAccount.id === toAccount.id && PaymentsStore.isSavingTotClicked()) {
				fromRepeat = false;
			}
		}
		if (toRepeat && fromRepeat && this.state.amount > 0) {
			return true;
		} else return false;
	},
	// Navigate to the Payment Confirm Page
	nextClicked() {
		// this action using for setting next step
		if (this.state.amount > 0) {
			if (PaymentsStore.getCreditPopUp() === true) {
				this.setState({
					confirmCancel: true,

				});
			} else {
				PaymentsActionCreator.postRepeatPaymentData();
				PaymentsActionCreator.navigateToWebTask('WEB-PAYMENT-CONFIRM');
			}
		}
	},
	// Return Keypad when enableKeypad is true
	enableKeypadorRepeat() {
		if (this.state.enableKeypad) {
			return this.showKeypad();
		} else if (this.state.enableRP) {
			return this.showRepeatPayment();
		}
	},
	// Return Keypad Component
	showKeypad() {
		return (<div><KeypadComponent enableKeypad={this.state.enableKeypad} doneDisable={this.state.amountInValid} onClick={this.handleClicks} deleteClick={this.deleteClick} goToNext={this.goToNext}/></div>);
	},
	// handles onclick of amount textbox
	amtClick() {
		if (!BrowserUtils.isMobileView()) {
			if (this.state.enableKeypad === true) {
				this.setState({ enableKeypad: false, enableNext: PaymentsStore.isMakePayment() });
				if (this.state.amount > 0) {
					this.refs.txtAmt.value = this.refs.txtAmt.value = NumberUtils.decimalFormat(this.state.amount, 3, false);
				}
				this.refs.txtAmt.classList.add('confirm-value');
				this.goToNext(StringConstant.amt);
			} else {
				this.setState({ enableKeypad: true, enableNext: false });
				this.refs.txtAmt.value = PaymentsStore.getDefaultAmt();
				this.refs.txtAmt.classList.remove('confirm-value');

				if (PaymentsStore.getNextTask() === StringConstant.RP) {
					this.setState({ enableRP: false });
				}
			}
		}
	},
	// handles on change in amount textbox
	amtChange(evnt) {
		const e = evnt;
		if (BrowserUtils.isMobileView()) {
			const name = e.target.name;
			if (e.target.value.indexOf(StringConstant.currencySymbol) !== 0 && e.target.value.length >= 2) {
				e.target.value = StringConstant.currencySymbol;
				this.shakeInput('txtAmt');
				return;
			}
			const value = e.target.value.replace(StringConstant.currencySymbol, '');
			const validationResult = ValidationConfig.validateData(name, value);
			if (validationResult.isValid) {
				if (value.endsWith('.')) {
					this.setState({
						amount: 0,
					});
				} else {
					this.setState({
						amount: value,
					});
				}
				const data = {
					type: StringConstant.amt,
					value: value,
				};
				PaymentsActionCreator.checkEndData(data);
			} else {
				if (!validationResult.regexValid) {
					if (value.length === 0) {
						this.setState({
							amount: 0,
						});
						const data = {
							type: StringConstant.amt,
							value: value,
						};
						PaymentsActionCreator.checkEndData(data);
					} else {
						this.setState({
							amount: value,
						});
					}
					this.shakeInput('txtAmt');
					e.target.value = e.target.value.substring(0, e.target.value.length - 1);
				} else if (!validationResult.minLengthValid) {
					this.setState({
						amount: 0,
					});
				} else if (!validationResult.maxLengthValid) {
					this.setState({
						amount: value,
					});
					this.shakeInput('txtAmt');
					e.target.value = e.target.value.substring(0, e.target.value.length - 1);
				}
			}
			e.target.value = this.appendCurrency(e.target.value);
		}
	},
	appendCurrency(amount) {
		if (amount.toString().search(StringConstant.currencySymbol) < 0) {
			return StringConstant.currencySymbol.concat(amount);
		} else {
			return amount;
		}
	},
	// displays next button based on following conditions
	showNextButton() {
		if (BrowserUtils.isMobileView() && this.state.amount > 0 && this.state.nextStep === StringConstant.KP && this.state.showNextSteps && PaymentsStore.getSelectedToAccount() !== StringConstant.EmptyString) {
			if (PaymentsStore.getSelectedToAccount().type !== StringConstant.savings
				|| (PaymentsStore.getSelectedToAccount().type === StringConstant.savings
					&& (PaymentsStore.getSelectedToPot() !== StringConstant.EmptyString || PaymentsStore.isToSavingTotClicked()))) {
				return <button className="pay-btn-success" onClick={this.goToNext}>{this.props.contents.NextButton}</button>;
			}
		}
	},

	// shows Amount Textbox
    showAmountText() {
		let readonly = BrowserUtils.isMobileView() ? false : true;
		let amt = PaymentsStore.getRepeatAmount();

		// if (amt === PaymentsStore.getDefaultAmt()) {
		// 	amt = PaymentsStore.getDefaultAmt();
		// } else
		if (amt !== PaymentsStore.getDefaultAmt()) {
			amt = BrowserUtils.isMobileView() ? amt : NumberUtils.decimalFormat(amt, 3, false);
		} else {
			this.state.amtCss = 'value';
		}

		amt = BrowserUtils.isMobileView() ? this.appendCurrency(amt) : amt;

		return (
			<div className="keypad" >
				<label className="amount-title">Amount</label>
				<input type="text" ref="txtAmt" name="amount" className={this.state.amtCss} defaultValue={amt} readOnly={readonly}
					onClick={this.amtClick} onChange={this.amtChange} onKeyPress={this.keyPress}
				/>
				{this.enableKeypadorRepeat() }

			</div>
		);
	},
	checkOneOffRepeatPermissiom(fromData) {
		let allow = true;
		if (PaymentsStore.isOneOffPayment() && PaymentsStore.getOneOffPayment().isMonthly && !PaymentsStore.repeatPaymentShow(fromData)) {
			allow = false;
			// PaymentsActionCreator.resetFromAccount();
			this.setState({ showOnOff: true, enableNext: false });
		}

		return allow;
	},
	// handle from list click event
	fromHandleChange(e, counter, compClick) {
		this.setState({ fromData: e });
		if (this.checkOneOffRepeatPermissiom(e)) {
			if (BrowserUtils.isMobileView()) {
				if (!counter && compClick) {
					this.setState({ showTo: !counter });
				}
				if (counter) {
					this.setState({ showTo: false, showNextSteps: false });
					PaymentsActionCreator.clearToList(StringConstant.From);
					PaymentsActionCreator.clearFromAccount(StringConstant.EmptyString);
				} else {
					this.setState({ showNextSteps: true });
					PaymentsActionCreator.putSelectedAccount(e);
				}
			} else PaymentsActionCreator.putSelectedAccount(e);
		}
	},
	// handle to list click event
	toHandleChange(e, counter) {
		if (PaymentsStore.getNextTask() === StringConstant.KP) {
			this.setState({ selectedToClass: 'col-lg-push-4 col-md-push-4 ' });
		}
		if (BrowserUtils.isMobileView()) {
			if (counter) {
				this.setState({ showNextSteps: false });
				PaymentsActionCreator.clearToList(StringConstant.To);
			} else {
				this.setState({ showNextSteps: true });
				PaymentsActionCreator.putToSelectedAccount(e);
			}
		} else PaymentsActionCreator.putToSelectedAccount(e);
	},
	// show the Payee list
	showToList() {
		if (this.state.showTo) {
			return (
				<div className={`${this.state.selectedToClass} col-lg-offset-0 col-lg-4 col-md-offset-0 col-md-4 col-sm-offset-2 col-sm-8  col-xs-12 padding-right-left`}>
					<p className="title">{this.props.contents.toTitle} </p>
					<AccountListComponent name={StringConstant.toList} accountList={this.props.accountToList} accountClick={this.toHandleChange} contents={this.props.contents} onClick={this.ToHandleChange}/>
				</div>
			);
		}
	},
	// to pop up if no account with transfer in flag
	msgPopup() {
        if (this.state.checkTransfer === true) {
            return (
				<BasicModal>
					<div className="modal_content">
						<h3>{this.props.contents.errorHeader}</h3>
						<p>{this.props.contents.eligibleErrMsg}</p>
					</div>
					<div className="modal_footer">
						<button onClick={this.closed}>{this.props.contents.errorButton}</button>
					</div>
				</BasicModal>);
        } else {
            return (
				<div>{this.paymentSteps() }</div>
			);
		}
    },
	// sets state to false for check transfer
	closed() {
        this.setState({ checkTransfer: false });
    },
	// handles for closing popup
	closePopUp() {
		this.setState({
			confirmCancel: false,

		});
	},
	// Sets the state for confirmCancel on Ok click
	creditokClick() {
		this.setState({
			confirmCancel: false,

		});
		PaymentsActionCreator.postRepeatPaymentData();
        AccountOpeningActions.navigateToWebTask('WEB-PAYMENT-CONFIRM');
	},
	// Returns the Modal for Credit Details
	creditPopUp() {
		return (<div>{this.props.contents.creditPopUpBody}
			<div className="col-xs-12">
				<div className="col-xs-6">
					<button onClick={ this.closePopUp } className="btn btn-primary" data-anchor="confirm-cancel-button" role="button">{this.props.contents.cancelTitle}</button>
				</div>
				<div className="col-xs-6">
					<button	onClick={ this.creditokClick } className="btn btn-primary" data-anch or="confirm-cancel-button" role="button">{this.props.contents.ok}</button>
				</div>
			</div>
		</div>);
	},
	render() {
		let stepText = this.state.stepText;
		let css = StringConstant.EmptyString;
		if (PaymentsStore.isOneOffPayment()) {
			stepText = this.props.contents.oneOffPaymentText;
			css = 'add-padding';
			if (PaymentsStore.getOneOffPayment().isMonthly || PaymentsStore.getResetOneOff()) {
				stepText = this.props.contents.oneOffReapetPaymentText;
			}
		}
		return (
			<div>
				{this.state.confirmCancel &&
					<BasicModal>
						<div className="modal_content credit-modal">
							<h3>{this.props.contents.creditPopUpHeader}</h3>
							<p>{this.props.contents.creditPopUpBody}</p>
						</div>
						<div className="modal_footer">
							<button onClick={ this.closePopUp } >{this.props.contents.cancelTitle}</button>
							<button	onClick={ this.creditokClick }><strong>{this.props.contents.ok}</strong></button>
						</div>
					</BasicModal>
				}
				<div className="row tab-content mobile-margin" >
					<h4 className = {`text-center next-step ${css}`}>{stepText}</h4>
					<div className={`${this.state.selectedClass} col-lg-4 col-md-4 col-sm-offset-2 col-sm-8  col-xs-12 padding-right-left`}>
						<p className="title">{this.props.contents.fromTitle}</p>
						{PaymentsStore.checkToTransfer() ? StringConstant.EmptyString :
							<AccountListComponent name={StringConstant.fromList} accountList={this.props.accountList} accountClick={this.fromHandleChange} contents={this.props.contents}
								tabChange={this.props.tabChange}
							/>}

					</div>

					{this.showToList() }
					<div className = "col-lg-offset-0 col-lg-4 col-md-offset-0 col-lg-pull-4 col-md-4 col-md-pull-4 col-sm-offset-2 col-sm-8  col-xs-12">
						<form id="repeat-payment">
							{this.msgPopup() }
						</form>
					</div>


					{this.showNextButton() }
					{this.showRPNext() }
				</div>
				{this.amountCheckPopup() }
				{this.singlePaymentPopUp() }
			</div>
		);
	},
});


module.exports = TransferHomePage;
