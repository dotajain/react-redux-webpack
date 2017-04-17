/**
 * @module ConfirmPayment
 */
const React = require('react');
const moment = require('moment');
const config = require('../../config');
const Helmet = require('react-helmet');
const HeaderInnerComponent = require('../common/HeaderInnerComponent');
const NumberUtils = require('../../utils/NumberUtils');
const AnalyticsActionCreator = require('../../actions/AnalyticsActionCreator');
const AccountComponent = require('./payment/AccountComponent');
const PayeeComponent = require('./payee/PayeeComponent');
const SavingComponent = require('./payment/SavingComponent');
const PaymentsStore = require('../../stores/PaymentsStore');
const PaymentsActionCreator = require('../../actions/PaymentsActionCreator');
const DateUtils = require('../../utils/DateUtils');
const StringConstant = require('../../constants/StringConstants');
const ErrorPopUpComponent = require('../common/ErrorPopUpComponent');
const RequiresAuthenticatedUser = require('../RequiresAuthenticatedUser');
const BrowserUtils = require('../../utils/BrowserUtils');

const { PropTypes } = React;

const ConfirmPayment = React.createClass({
	propTypes: {
		content: PropTypes.object,
		onClick: PropTypes.func,
		confirmCancel: PropTypes.bool,
		paymentData: PropTypes.object,
		closed: PropTypes.bool,
	},
	getInitialState() {
		return {
			Acntdata: PaymentsStore.getSelectedAccount(),
			ToAcntdata: PaymentsStore.getSelectedToAccount(),
			Payeedata: PaymentsStore.getSelectedPayee(),
			keypaddata: PaymentsStore.getEndingDetails(),
			paymentType: PaymentsStore.getPaymentType(),
			isRepeat: PaymentsStore.isRepeatOn(),
			open: true,
			potData: PaymentsStore.getSelectedPot(),
			potToData: PaymentsStore.getSelectedToPot(),
			end: '',
			showError: false,
			showThankYou: true,


		};
	},
	componentWillMount() {
		PaymentsStore.addChangeListener(this.onStoreChange);
	},
	componentWillUnmount() {
		PaymentsStore.removeChangeListener(this.onStoreChange);
	},

	onStoreChange() {
		const makePaymentResponse = PaymentsStore.getMakePaymentResponse();
		if (makePaymentResponse !== undefined) {
			this.setState({ showThankYou: true });
			if (makePaymentResponse.code === 202) {
				PaymentsActionCreator.navigateToWebTask('WEB-PAYMENT-THANKYOU');
			} else if (makePaymentResponse.code === 422) {
				if (parseInt(makePaymentResponse.error.code) === 401) {
					this.setState({ showThankYou: true });
				} else {
					this.handleError(makePaymentResponse.error);
				}
			}
		}
	},
	// returns either saving or account based on conditions
	getAccount() {
		if (this.state.ToAcntdata.type === StringConstant.savings) {
			// let show=PaymentsStore.checkSavingUnallocatedAmount(this.state.ToAcntdata.id)
			return (
				<SavingComponent
					name="toList" data={this.state.ToAcntdata}
					open={this.state.open} contents={this.props.content} onChange={this.accountClick}
					display="true"
				/>);
		} else {
			return (<AccountComponent
				name="toList" data={this.state.ToAcntdata} contents={this.props.content}
				disabled="true"
			/>);
		}
	},
	// Returns the button according to payType
	getButton() {
		return <button type="button" className="pay-btn-success" onClick={this.handleDoneClick}>{PaymentsStore.getPaymentType() === true ? this.props.content.makeTransfer : this.props.content.makePayment}</button>;
	},
	// handles error
	handleError() {
		this.setState({ showError: true });
	},
	// function for closing popup
	closeErrorPopup() {
		this.setState({ showError: false });
		PaymentsStore.setMakePaymentResponse();
		this.handleBackClick();
	},
	// Error Popup Show the error message coming from the services
	errorPopup() {
		// Getting error response from the store
		const response = PaymentsStore.getMakePaymentResponse();
		return (<ErrorPopUpComponent error={response.error}
			closeErrorPopup={this.closeErrorPopup} content={this.props.content}
		/>);
	},
	// Handles done button click
	handleDoneClick() {
		this.setState({ showThankYou: false });
		if (PaymentsStore.getPaymentType() === true) {
			const fromSelectedAccount = PaymentsStore.getSelectedAccount();
			const toSelectedAccount = PaymentsStore.getSelectedToAccount();
			const fromSelectedPot = PaymentsStore.getSelectedPot();
			const toSelectedPot = PaymentsStore.getSelectedToPot();
			const paymentRequestPacket = PaymentsStore.getPaymentDetails();

			// Calling Action to make the transfer
			PaymentsActionCreator.makeTransfer(fromSelectedAccount, toSelectedAccount, fromSelectedPot, toSelectedPot, paymentRequestPacket);
			AnalyticsActionCreator.track({
				path: '/user/experience/activity',
				action: 'Interacted',
			}, {
					description: config.analytics.analytics_name_transfers,
					event: 'click',
				});
		} else {
			const paymentRequestPacket = PaymentsStore.getPaymentDetails();
			PaymentsActionCreator.makePayment(paymentRequestPacket);
			AnalyticsActionCreator.track({
				path: '/user/experience/activity',
				action: 'Interacted',
			}, {
					description: config.analytics.analytics_name_payments_confirmation,
					event: 'click',
				});
		}
	},
	// Handles back button click
	handleBackClick() {
		PaymentsActionCreator.goBackToRepeatPayment('RP');
		PaymentsActionCreator.navigateToWebTask('WEB-PAYMENT-BACK');
	},
	renderLoadingImage() {
		return (<div>
				<Helmet title="Payments" />
				<div className="chicken-loading" />
			</div>);
	},
	// renderOften text
	renderOftenText() {
		let oftnText = 'weekly';

		switch (this.state.keypaddata.oftenText) {
			case 'weekly': oftnText = this.props.content.Weekly;
				break;
			case '2 weekly': oftnText = this.props.content.twoWeekly;
				break;
			case '3 weekly': oftnText = this.props.content.threeWeekly;
				break;
			case '4 weekly': oftnText = this.props.content.fourWeekly;
				break;
			case '1 monthly': oftnText = this.props.content.monthly;
				break;
			case '2 monthly': oftnText = this.props.content.twoMonthly;
				break;
			case '3 monthly': oftnText = this.props.content.threeMonthly;
				break;
			case '6 monthly': oftnText = this.props.content.sixMonthly;
				break;
			case '12 monthly': oftnText = this.props.content.anually;
				break;
			default: oftnText = this.props.content.Weekly;
				break;
		}
		return oftnText;
	},
	render() {
		let showPound = false;
		if (BrowserUtils.isMobileView()) {
			showPound = true;
		}
		let startDate = this.state.keypaddata.dtStart;

		if (startDate !== StringConstant.chooseDate && startDate !== StringConstant.Tomorrow) {
			startDate = DateUtils.getMomentFromDateString(startDate);
			startDate = moment(startDate).format(config.dateFormatTimeline);
		}

		let endDate = this.state.keypaddata.end;

		if (this.state.keypaddata.stopitwhenText === StringConstant.Pickadate) {
			if (endDate !== StringConstant.Tomorrow) {
				endDate = DateUtils.getMomentFromDateString(endDate);
				endDate = moment(endDate).format(config.dateFormatTimeline);
			}
		} else if (this.state.keypaddata.stopitwhenText === StringConstant.Nooftimes) {
			endDate = parseInt(endDate);
		}


		let whenDate = this.state.keypaddata.when;

		if (whenDate !== StringConstant.Today && whenDate !== StringConstant.Tomorrow) {
			whenDate = DateUtils.getMomentFromDateString(whenDate);
			whenDate = moment(whenDate).format(config.dateFormatTimeline);
		}

		const backText = PaymentsStore.isOneOffPayment() ? this.props.content.back : this.props.content.cancelTitle;

		const isArrow = PaymentsStore.isOneOffPayment() ? true : false;


		let endText = '';
		let endField = '';
		let endCss = '';
		switch (this.state.keypaddata.stopitwhenText) {
			case StringConstant.Pickadate: endText = this.props.content.pickdate;
				endField = this.props.content.endDate;
				break;
			case StringConstant.Nooftimes: endText = this.props.content.noOfTimes;
				endField = this.props.content.howManyTimes;
				endCss = 'stop-when';
				break;
			default: endText = this.props.content.whenIcancel;
		}

		return (
			this.state.showThankYou === false ? this.renderLoadingImage()
				:
				<div className="b container-fluid-full">
					<Helmet title="Payments" />
					<HeaderInnerComponent cancelTitle={backText} title={this.props.content.sureTitle} cancelClick={this.handleBackClick} isArrow={isArrow}/>
					<div className="main-container inner">
						<div className="scroll-wrapper">
							<div className="payments content-wrapper">
								<div className="row tab-content confirm-payment">

									<div className="col-lg-offset-0 col-lg-4 col-md-offset-0 col-md-4 col-sm-offset-2 col-sm-8 col-xs-offset-0 col-xs-12 padding-right-left">
										<p className="title text-center">{this.props.content.fromTitle}</p>
										{(this.state.Acntdata.type === StringConstant.savings) ?
											<SavingComponent name="fromList" data={this.state.Acntdata} open={this.state.open} contents={this.props.content} onChange={this.accountClick} nextStep={this.state.nextStep} display />
											: <AccountComponent name="fromList" data={this.state.Acntdata} contents={this.props.content} nextStep={this.state.nextStep}/>
										}
									</div>

									<div className="col-lg-offset-0 col-lg-4 col-md-offset-0 col-md-4 col-md-push-4 col-sm-offset-2 col-sm-8 col-xs-offset-0 col-xs-12 padding-right-left">
										<p className="title text-right">{this.props.content.toTitle}</p>
										{this.state.paymentType ?
											<div> {this.getAccount() }</div>
											: <PayeeComponent data={this.state.Payeedata.data} contents={this.props.content} disabled nextStep={this.state.nextStep}/>
										}

									</div>
									<div className="col-lg-offset-0 col-lg-4 col-md-offset-0 col-lg-pull-4 col-md-4 col-md-pull-4 col-sm-offset-2 col-sm-8 col-xs-offset-0 col-xs-12">
										<form id="repeat-payment">

											<div className="keypad">
												<label className="amount-title">{this.props.content.amount}</label>
												<input type="text" className="value confirm-value" defaultValue={NumberUtils.decimalFormat(this.state.keypaddata.amount, 3, showPound) } readOnly/>

												{!PaymentsStore.isSameSavingSelectedPots() ?
													<ul className="form-wrapper">

														{PaymentsStore.getReferenceFlag() === true &&
															<li className = "ref-field">
																<section>{this.props.content.reference}</section>
																<section>{PaymentsStore.getEndingDetails().reference}</section>
															</li>}

														{ this.state.keypaddata.isRepeat === false &&
															<li>
																<section>{this.props.content.when}</section>
																<section>{whenDate}</section>
															</li>
														}
														<li>
															<section>Repeat this payment</section>
															<section >{this.state.keypaddata.isRepeat ? this.props.content.Yes : this.props.content.No}</section>
														</li>
														{this.state.keypaddata.isRepeat &&
															<div>
																<li className="how-often">
																	<section>{this.props.content.howOften}</section>
																	<section>{this.renderOftenText() } </section>
																</li>
																<li>
																	<section>{this.props.content.startDate}</section>
																	<section>{startDate}</section>
																</li>
																<li className={endCss}>
																	<section>{this.props.content.stopitWhen}</section>
																	<section>{endText}</section>
																</li>
																{this.state.keypaddata.stopitwhenText !== StringConstant.whenicancel ?
																	<li >
																		<section>{endField}</section>
																		<section>{endDate}</section>
																	</li> : ''}
															</div>
														}
													</ul> : '' }

											</div>
											{this.getButton() }
										</form>

									</div>
									{this.state.showError && this.errorPopup() }
								</div>

							</div>
						</div>
					</div>

				</div>

		);
	},
});

module.exports = RequiresAuthenticatedUser(ConfirmPayment);
