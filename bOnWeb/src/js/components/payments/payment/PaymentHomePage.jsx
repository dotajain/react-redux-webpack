/**
 * @module PaymentHomePage
 */
const React = require('react');
const ReactDOM = require('react-dom');
const AccountListComponent = require('./AccountListComponent');
const KeypadComponent = require('./KeypadComponent');
const PayeeComponent = require('../payee/PayeeComponent');
const RepeatPayment = require('./RepeatPayment');
const PaymentsActionCreator = require('../../../actions/PaymentsActionCreator');
const AccountOpeningActions = require('../../../actions/AccountOpeningActions');
const PaymentsStore = require('../../../stores/PaymentsStore');
const NewPayeeComponent = require('../payee/NewPayeeComponent');
const NumberUtils = require('../../../utils/NumberUtils');
const BrowserUtils = require('../../../utils/BrowserUtils');
const RegexUtils = require('../../../utils/RegexUtils');
const { PropTypes } = React;
const BasicModal = require('../../common/modals/ModalB');
const StringConstant = require('../../../constants/StringConstants');
const ValidationConfig = require('../../../config/validationConfig');
// string constant
const EmptyString = '';

const PaymentHomePage = React.createClass({
	propTypes: {
        contents: PropTypes.object,
		payeeList: PropTypes.array,
		accountList: PropTypes.array,
		tabChange: PropTypes.bool,
    },
	getInitialState() {
		return {
			amountInValid: true,
			stepText: this.props.contents.payFrom,
			nextStep: StringConstant.From,
			enableKeypad: BrowserUtils.isMobileView() ? false : false,
			pageLoad: false,
			confirmCancel: false,
			nextClickValue: EmptyString,
			selectedClass: 'col-lg-offset-2 col-md-offset-2',
			selectedToClass: 'col-lg-offset-0 col-lg-4 col-md-offset-0 col-md-4 col-sm-offset-2 col-sm-8 col-xs-12 padding-right-left',
			amtCss: 'value',
			enableNext: false,
			enableRP: false,
			amount: PaymentsStore.getDefaultAmt(),
			showAmountError: false,
			availBalnace: null,
			referenceData: EmptyString,
			isOpen: false,
			showNextSteps: BrowserUtils.isMobileView() ? false : true,
			repeatAccountValid: EmptyString,
			showWhen: EmptyString,
			showTo: BrowserUtils.isMobileView() ? false : true,
			shakeSet: new Set(),
		};
	},
	componentWillMount() {
		PaymentsStore.addChangeListener(this.onStoreChange);

		if (PaymentsStore.getConfirmBack()) {
			this.setState({ enableKeypad: false });
		}
		if (this.props.tabChange && PaymentsStore.getNextTask() !== StringConstant.From) {
			this.setState({ showTo: true, showNextSteps: true, isOpen: false, amount: PaymentsStore.getRepeatAmount(), enableNext: PaymentsStore.isMakePayment() });
		}
		if (PaymentsStore.isFromOtherPage() && PaymentsStore.getNextTask() !== StringConstant.From) {
			this.setState({ showTo: true, showNextSteps: true, isOpen: PaymentsStore.getSelectedPayee() !== StringConstant.EmptyString ? true : false });
		}

		PaymentsActionCreator.refreshSavingComponent();
		// this.setStepState();
	},
	componentWillUnmount() {
		PaymentsStore.removeChangeListener(this.onStoreChange);
	},
	onStoreChange() {
		if (this.isMounted()) {
			this.setState({ nextStep: PaymentsStore.getNextTask(), pageLoad: true });
			if (PaymentsStore.getNextTask() === StringConstant.To) {
				this.setState({ stepText: this.props.contents.payingTo });
			}
			if (PaymentsStore.getNextTask() === StringConstant.KP) {
				this.setState({
					stepText: this.props.contents.howMuchTitle, selectedClass: 'col-lg-offset-0 col-md-offset-0',
					selectedToClass: 'col-lg-offset-0 col-lg-4 col-lg-push-4 col-md-offset-0 col-md-4 col-md-push-4 col-sm-offset-2 col-sm-8 col-xs-12 padding-right-left',
				});
			}

			if (PaymentsStore.getNextTask() === StringConstant.RP) {
				this.setState({
					stepText: this.props.contents.whenHappen, selectedClass: 'col-lg-offset-0 col-md-offset-0', amtCss: 'value confirm-value',
					selectedToClass: 'col-lg-push-4 col-md-push-4 ', enableRP: true, enableKeypad: false,
					enableNext: PaymentsStore.isMakePayment(), amount: PaymentsStore.getRepeatAmount(),
				});
			}
			if (PaymentsStore.getEndingDetails() !== EmptyString) {
				this.setState({ referenceData: PaymentsStore.getEndingDetails().reference });
			}
			if (PaymentsStore.getRepeatAmount() > 0) {
				this.setState({ amtCss: 'value confirm-value', amountInValid: false, enableKeypad: false });
			}

			if (PaymentsStore.getSelectedPayee() === StringConstant.EmptyString) {
				this.setState({ amtCss: 'value' });
			}
			this.setState({ repeatAccountValid: PaymentsStore.repeatPaymentShow(), showWhen: PaymentsStore.getWhenEnable() });

			if (BrowserUtils.isMobileView()) {
				// to set the state when back from confrim payment
				if (PaymentsStore.getConfirmBack()) {
					this.setState({ showTo: true, showNextSteps: true, isOpen: true });
				}
				// focus textbox after selecting in to list
				if (PaymentsStore.getNextTask() === StringConstant.KP && ReactDOM.findDOMNode(this.refs.txtAmt) !== null) {
					ReactDOM.findDOMNode(this.refs.txtAmt).focus();
				}
			}
		}
	},

	// handle from list click event
    fromHandleChange(e, counter, compClick) {
		if (BrowserUtils.isMobileView()) {
			if (!counter && compClick) {
				this.setState({ showTo: !counter, isOpen: false });
			}
			if (counter) {
				this.setState({ showTo: false, showNextSteps: false });
				PaymentsActionCreator.clearToList(StringConstant.From);
				PaymentsActionCreator.clearFromAccount(StringConstant.EmptyString);
			} else {
				this.setState({ showNextSteps: true });
				PaymentsActionCreator.putSelectedAccount(e);
			}
		} else {
			PaymentsActionCreator.putSelectedAccount(e);
		}
	},
    // handle to list click event
	toHandleChange(e) {
		if (PaymentsStore.getNextTask() === StringConstant.KP) {
			this.setState({ selectedToClass: 'col-lg-push-4 col-md-push-4 ' });
		}
		this.setState({ isOpen: !this.state.isOpen });
		if (BrowserUtils.isMobileView()) {
			if (this.state.isOpen) {
				this.setState({ showNextSteps: false });
			} else {
				this.setState({ showNextSteps: true });
				PaymentsActionCreator.putToSelectedAccount(e);
			}
		} else {
			PaymentsActionCreator.putToSelectedAccount(e);
		}
	},
	// Add Payeee navigation
	AddPayee() {
		PaymentsActionCreator.setTabChanged(true);
		PaymentsActionCreator.navigateToWebTask('WEB-ADD-PAYEE');
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
		}
	},
	// condition for balance validation
	checkAmount(amt) {
		let error = false;
		if (PaymentsStore.getSelectedPotData() !== undefined && PaymentsStore.getSelectedPotData().balance !== undefined) {
			if (amt > PaymentsStore.getSelectedPotData().balance.value) {
				error = true;
			}
		}

		return error;
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

	// Sets the state to close the modal
	closeModal() {
		this.setState({ showAmountError: false });
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
		this.setState({ showAmountError: this.checkAmount(this.state.amount) });
		const isValid = RegexUtils.isValid(this.state.amount, RegexUtils.regexes.decimalNumber);
		this.refs.txtAmt.className = this.state.amtCss;

		if (e !== StringConstant.amt && (!isValid || this.refs.txtAmt.value === PaymentsStore.getDefaultAmt())) {
			this.shakeInput('txtAmt');
			this.refs.txtAmt.classList.remove('confirm-value');
		} else {
			if (!this.checkAmount(this.state.amount)) {
				this.setState({
					enableKeypad: false,
					nextStep: StringConstant.RP,
					stepText: this.props.contents.whenHappen,
					enableRP: parseFloat(this.state.amount) > 0.00 ? true : false,
					enableNext: PaymentsStore.isMakePayment(),
					amtCss: parseFloat(this.state.amount) > 0.00 ? 'value confirm-value' : 'value',
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
						if (PaymentsStore.getSelectedPayee() !== EmptyString) {
							return this.showAmountText();
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
	showRPOption() {
		const toAccount = PaymentsStore.getSelectedPayee();
		const fromAccount = PaymentsStore.getSelectedAccount();
		let toRepeat = false;
		let fromRepeat = false;

		if (toAccount !== StringConstant.EmptyString) {
			toRepeat = true;
		}
		if (fromAccount !== StringConstant.EmptyString) {
			if (fromAccount.type !== StringConstant.savings || (fromAccount.type === StringConstant.savings && (PaymentsStore.getSelectedPot() !== StringConstant.EmptyString || PaymentsStore.checkPotEmpty(fromAccount.id))) || PaymentsStore.isSavingTotClicked()) {
				fromRepeat = true;
			}
		}

		if (toRepeat && fromRepeat && this.state.amount > 0) {
			return true;
		} else {
			return false;
		}
	},
	// When Next Clicked Navigates To the Confirm Page
	nextClicked() {
		if (this.state.amount > 0) {
			if (PaymentsStore.getCreditPopUp() === true) {
				this.setState({
					confirmCancel: true,

				});
			} else {
				PaymentsActionCreator.postRepeatPaymentData();
				AccountOpeningActions.navigateToWebTask('WEB-PAYMENT-CONFIRM');
			}
		}
	},
	// Checks state to return Keypad Component
	enableKeypadOrRepeat() {
		if (this.state.enableKeypad) {
			return this.showKeypad();
		} else if (this.state.enableRP) {
			return this.showRepeatPayment();
		}
	},

	// Returns the  Keypad Component
	showKeypad() {
		return (
			<KeypadComponent enableKeypad={this.state.enableKeypad} doneDisable={this.state.amountInValid} onClick={this.handleClicks} deleteClick={this.deleteClick} goToNext={this.goToNext}/>);
	},
	// handles amount textbox click
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
	// for mobile view change on amount textbox
	amtChange(evnt) {
		const e = evnt;
		if (BrowserUtils.isMobileView()) {
			const name = e.target.name;
			if (e.target.value.endsWith(StringConstant.currencySymbol) && e.target.value.length >= 2) {
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
	// for displaying next button in mobile view
	showNextButton() {
		if (BrowserUtils.isMobileView() && this.state.amount > 0 && this.state.nextStep === StringConstant.KP && this.state.showNextSteps && PaymentsStore.getSelectedPayee() !== EmptyString) {
			return <button className="pay-btn-success" onClick={this.goToNext}>Next</button>;
		}
	},
	// show RP next
	showRPNext() {
		if (this.state.enableRP && this.state.enableNext && this.state.showNextSteps && !this.checkAmount(this.state.amount) && this.showRPOption()) {
			return <button className="pay-btn-success" onClick={this.nextClicked}>{this.props.contents.NextButton}</button>;
		}
	},

	// Returns the  Textbox for Amount
	showAmountText() {
		let readonly = BrowserUtils.isMobileView() ? false : true;

		let amt = PaymentsStore.getRepeatAmount();
		if (amt === PaymentsStore.getDefaultAmt()) {
			amt = PaymentsStore.getDefaultAmt();
		} else {
			amt = BrowserUtils.isMobileView() ? amt : NumberUtils.decimalFormat(amt, 3, false);
		}
		amt = BrowserUtils.isMobileView() ? this.appendCurrency(amt) : amt;
		return (
			<div className="keypad" >
				<label className="amount-title">{this.props.contents.amount}</label>
				<input type="text" ref="txtAmt" name ="amount" className={this.state.amtCss} defaultValue={amt} readOnly={readonly}
					onClick={this.amtClick} onChange={this.amtChange}
				/>
				{this.enableKeypadOrRepeat() }

			</div>
		);
	},
	// for displaying payee
	checkRenderView() {
		if (this.props.payeeList !== undefined) {
			return this.props.payeeList.map((account, index) => {
				if (BrowserUtils.isMobileView()) {
					const checked = PaymentsStore.IsPayeeSame(account.id);
					if (this.state.isOpen === false || (this.state.isOpen && checked)) {
						return this.loadPayee(account, index, this.state.isOpen);
					}
				} else {
					return this.loadPayee(account, index, false);
				}
				return false;
			});
		} else {
			return <div></div>;
		}
	},

	// for laoding payee
	loadPayee(account, index, display) {
		return <PayeeComponent name={StringConstant.toList} key={index} data={account} onClick={this.toHandleChange} display={display} />;
	},
	// for loading new payee
	loadNewPayee() {
		if (this.state.nextStep !== StringConstant.From) {
			if (BrowserUtils.isMobileView() && !this.state.isOpen) {
				return <NewPayeeComponent contents={this.props.contents}/>;
			} else if (!BrowserUtils.isMobileView()) {
				return <NewPayeeComponent contents={this.props.contents}/>;
			}
		}
	},
	// show the Payee list
	showToList() {
		if (this.state.showTo) {
			return (
				<div className={`${this.state.selectedToClass} col-lg-offset-0 col-lg-4 col-md-offset-0 col-md-4 col-sm-offset-2 col-sm-8  col-xs-12 padding-right-left`}>
					<p className="title">{this.props.contents.toTitle} {
						this.state.nextStep !== StringConstant.From && <a className="page-options add-payee opt-green float-right" onClick={this.AddPayee}><span className="icon icon-add"></span>
							<span>{this.props.contents.someoneNewText}</span></a>
					}
					</p>
					{this.checkRenderView()
					}
					{
						this.loadNewPayee()
					}
				</div>
			);
		}
	},
	// Sets the state for confirmCancel on cancel click
	closed() {
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
					<button onClick={ this.closed } className="btn btn-primary" data-anchor="confirm-cancel-button" role="button">Cancel</button>
				</div>
				<div className="col-xs-6">
					<button	onClick={ this.creditokClick } className="btn btn-primary" data-anch or="confirm-cancel-button" role="button">OK</button>
				</div>
			</div>
		</div>);
	},
	render() {
		return (
			<div className="full-width">

				{this.state.confirmCancel &&
					<BasicModal>
						<div className="modal_content credit-modal">
							<h3>{this.props.contents.creditPopUpHeader}</h3>
							<p>{this.props.contents.creditPopUpBody}</p>
						</div>
						<div className="modal_footer">
							<button onClick={ this.closed }>Cancel</button>
							<button	onClick={ this.creditokClick }><strong>{this.props.contents.ok}</strong></button>
						</div>
					</BasicModal>
				}

				<h4 className="text-center next-step">{this.state.stepText}</h4>

				<div className="row tab-content  mobile-margin">
					<div className={`${this.state.selectedClass} col-lg-4 col-md-4 col-sm-offset-2 col-sm-8 col-xs-12 padding-right-left`}>
						<p className="title">{this.props.contents.fromTitle}</p>
						<AccountListComponent name={StringConstant.fromList} accountList={this.props.accountList} accountClick={this.fromHandleChange} contents={this.props.contents}
							tabChange={this.props.tabChange}
						/>
					</div>

					{this.showToList() }
					<div className = "col-lg-offset-0 col-lg-4 col-md-offset-0 col-lg-pull-4 col-md-4 col-md-pull-4 col-sm-offset-2 col-sm-8 col-xs-12">
						<form id="repeat-payment">
							{this.paymentSteps() }
						</form>
					</div>
					{this.showNextButton() }
					{this.showRPNext() }
				</div>
				{this.amountCheckPopup() }
			</div>

		);
	},
});


module.exports = PaymentHomePage;
