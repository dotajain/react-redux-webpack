/**
 * @module PaymentsActionsCreator
 */

const PaymentsConstants = require('../constants/PaymentsConstants');
const AppDispatcher = require('../dispatcher/AppDispatcher');
const AppConstants = require('../constants/AppConstants');
const DateUtils = require('../utils/DateUtils');
const moment = require('moment');
const StringConstant = require('../constants/StringConstants');

const PaymentsActionCreator = {
	/*
		To raise view action to update the store and view
		 @param {String} actionType		action type.
		@param {object} data		data passed to action type.
	*/
	raise(actionType, data) {
		AppDispatcher.handleViewAction({
			actionType,
			data,
		});
	},

	/*
		To raise servcer action to call API and update the view and store
		@param {String} actionType		action type.
		@param {object} data		data passed to action type.
	*/
	raiseServerAction(actionType, data) {
		AppDispatcher.handleServerAction({
			actionType,
			data,
		});
	},

	/*
		Navigate To WebTask base on taskId
		@param {String} taskId		navigation task Id
	*/
	navigateToWebTask(taskId) {
		PaymentsActionCreator.raise(AppConstants.NAVIGATE_TO_WEB_TASK, { taskId });
	},

	/*
		get account list for From list
	*/
	getFromAccountList() {
		AppDispatcher.handleViewAction({
			actionType: PaymentsConstants.GET_FROM_ACCOUNTS,
		});
	},

	/*
		handle account list success response
		@param {Object} response		account list response
	*/
    handleAccountsListSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: PaymentsConstants.GET_FROM_ACCOUNTS_SUCCESS,
			data: response,
		});

		// call account details service to get the account detail
		response.accounts.map(account => {
			PaymentsActionCreator.getAccountDetails(account.id);
			return false;
		});
	},

	/*
		get payee list for To list
	*/
	getFromPayeeList() {
		AppDispatcher.handleViewAction({
			actionType: PaymentsConstants.GET_FROM_PAYEES,
		});
	},

	/*
		handle payee list success response
		@param {Object} response		payee list response
	*/
    handlePayeesListSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: PaymentsConstants.GET_FROM_PAYEES_SUCCESS,
			data: response,
		});
	},
	handlePayeeListError(response) {
			AppDispatcher.handleServerAction({
			actionType: PaymentsConstants.GET_FROM_PAYEES_FAILURE,
			data: response,
		});
	},

	/*
		get pot list for saving account
	*/
	getFromPotList() {
		AppDispatcher.handleViewAction({
			actionType: PaymentsConstants.GET_FROM_POTS,
		});
	},

	updateEditForm(name, value) {
		this.raiseServerAction(PaymentsConstants.UPDATE_EDIT_PAYMENT_FORM, { name, value });
	},
	/*
		handle saving pot list success response
		@param {Object} response		saving pot list response
	*/
    handlePotListSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: PaymentsConstants.GET_FROM_POTS_SUCCESS,
			data: response,
		});
	},

	/*
		set From selected account in store
		@param {Object} account		selected account
	*/
	putSelectedAccount(account) {
		PaymentsActionCreator.raise(PaymentsConstants.PUT_SELECTED_ACCOUNT, account);
	},

	/*
		set selected payee in store
		@param {Object} payee		selected payee
	*/
	putSelectedPayee(payee) {
		PaymentsActionCreator.raise(PaymentsConstants.SELECT_PAYEE, payee);
	},

	/*
		set selected payment type in store i.e. payment or transfer
		@param {Object} payee		selected payee
	*/
	selectedPaymentType(type) {
		PaymentsActionCreator.raise(PaymentsConstants.SELECT_PAYMENT_TYPE, type);
	},

	/**
	 * getAllpaymentList will dispatch two action for getting SO list and Direct Debit list
	 */
	getAllpaymentList() {
		// Dispatching SO List action
		PaymentsActionCreator.raise(PaymentsConstants.GET_STANDING_ORDERS_PAYMENT_LIST, {});
		// Dispatching DD List action
		PaymentsActionCreator.raise(PaymentsConstants.GET_DIRECT_DEBITS_PAYMENT_LIST, {});
	},

	/*
		handle SO payment success response
		@param {Object} successRespnse		SO payment response
	*/
	getPaymentSuccess(successRespnse) {
		PaymentsActionCreator.raise(PaymentsConstants.GET_STANDING_ORDER_LIST_SUCCESS, successRespnse);
	},

	/*
		get error response for SO payment list and handle
		@param {Object} errorResponse		error SO list Response
	*/
	getPaymentError(errorResponse) {
		PaymentsActionCreator.raise(PaymentsConstants.GET_STANDING_ORDER_LIST_ERROR, errorResponse);
	},

	/*
		handle Direct Debit payment success response
		@param {Object} successRespnse		DD payment response
	*/
	getDDPaymentSuccess(successRespnse) {
		PaymentsActionCreator.raise(PaymentsConstants.GET_DIRECT_DEBIT_LIST_SUCCESS, successRespnse);
	},

	/*
		handle Direct Debit payment error response
		@param {Object} errorResponse		DD payment response
	*/
	getDDPaymentFailure(errorResponse) {
		PaymentsActionCreator.raise(PaymentsConstants.GET_DIRECT_DEBIT_LIST_ERROR, errorResponse);
	},

	/*
			call service to create transfer for selected account
			@param {Object} fromSelectedAccount		From selected account
			@param {Object} toSelectedAccount		To selected account
			@param {Object} fromSelectedPot		From selected Pot
			@param {Object} toSelectedPot		To selected Pot
			@param {Object} paymentRequestPacket	request packet
	*/
	makeTransfer(fromSelectedAccount, toSelectedAccount, fromSelectedPot, toSelectedPot, paymentRequestPacket) {
		const selectedAccountId = fromSelectedAccount.id;
		const toSelectedAccountDetails = toSelectedAccount.number.split('-');
		const toAccountSortCode = toSelectedAccountDetails[0];
		const toAccountNumber = toSelectedAccountDetails[1];
		switch (fromSelectedAccount.type) {
			case StringConstant.savings:
				// Pot Transfer
				if (toSelectedAccount.type === StringConstant.savings) {
					let selectedPotId = fromSelectedPot;
					let toSelectedPotId = toSelectedPot;
					// Inter Saving Pot Transfer
					if (fromSelectedAccount.id === toSelectedAccount.id) {
						if (fromSelectedPot !== undefined) {
							// Not in pot Selected
							if (fromSelectedAccount.id === fromSelectedPot) {
								selectedPotId = StringConstant.unallocated;
								toSelectedPotId = toSelectedPot;
							} else if (toSelectedAccount.id === toSelectedPot) {
								toSelectedPotId = StringConstant.unallocated;
							} else {
								// Pot selected
								selectedPotId = fromSelectedPot;
								toSelectedPotId = toSelectedPot;
							}
							const requestData = this.generateInterPotTransferRequest(toSelectedPotId, paymentRequestPacket.amount);
							this.raise(PaymentsConstants.MAKE_INTER_POT_TRASNFER_SERVICECALL, { requestData, selectedAccountId, selectedPotId });
						}
					} else { // Intra Saving pot Transfer
						const requestData = {
							display_name: toSelectedAccount.product.name,
							reference: paymentRequestPacket.details.reference,
							sort_code: toAccountSortCode,
							account_number: toAccountNumber,
							name: toSelectedAccount.product.name,
							single_use: true,
						};
						this.raise(PaymentsConstants.CREATE_SINGLE_USE_PAYEE_SERVICECALL, { requestData, selectedAccountId, paymentRequestPacket });
					}
				} else {
					const requestData = {
						display_name: toSelectedAccount.product.name,
						reference: paymentRequestPacket.details.reference,
						sort_code: toAccountSortCode,
						account_number: toAccountNumber,
						name: toSelectedAccount.product.name,
						single_use: true,
					};
					this.raise(PaymentsConstants.CREATE_SINGLE_USE_PAYEE_SERVICECALL, { requestData, selectedAccountId, paymentRequestPacket });
				}
				break;
			default:
				const requestData = {
					display_name: toSelectedAccount.product.name,
					reference: paymentRequestPacket.details.reference,
					sort_code: toAccountSortCode,
					account_number: toAccountNumber,
					name: toSelectedAccount.product.name,
					single_use: true,
				};


				this.raise(PaymentsConstants.CREATE_SINGLE_USE_PAYEE_SERVICECALL, { requestData, selectedAccountId, paymentRequestPacket });

		}
	},

	/*
		handle to create payee for single use payment request
		@param {Object} payeeDetails		payee Details
		@param {Object} requestData			reuqest packet
	*/
	handleSingleUsePayee(payeeDetails, requestData) {
		const requestDataValue = requestData;
		requestDataValue.paymentRequestPacket.payeeDetails = {
			reference: payeeDetails.reference,
			account_number: payeeDetails.account_number,
			sort_code: payeeDetails.sort_code,
			display_name: payeeDetails.display_name,
			beneficiary_id: payeeDetails.id,
		};
		this.makePayment(requestDataValue.paymentRequestPacket);
	},

	setUpdateEditFormField(updateFields) {
		this.raiseServerAction(PaymentsConstants.UPDATE_ALL_EDIT_PAYMENT_FORM_VALUES, updateFields);
	},

	/*
			create request packet for inter Pot transfer
			@param {Object} toSelectedPotId		To selected Pot id
			@param {Object} amount		amount
	*/
	generateInterPotTransferRequest(toSelectedPotId, amount) {
		const requestBody =
			{
				transaction: {
					amount: amount,
					target_pot_id: toSelectedPotId,
				},
			};
		return requestBody;
	},

	/*
			create request packet for payment
			@param {Object} requestpacket		payment request packet
	*/
	makePayment(requestpackets) {
		const requestpacket = requestpackets;
		const makePaymentRequest = {};
		const accountId = requestpacket.accountId;
		const bankId = requestpacket.bankId;
		if (requestpacket.details) {
			switch (requestpacket.paymentType) {
				case StringConstant.transferUpper:
					// makePaymentRequest.sort_code=
					makePaymentRequest.reference = requestpacket.payeeDetails.reference;
					makePaymentRequest.account_number = requestpacket.payeeDetails.account_number;
					makePaymentRequest.sort_code = requestpacket.payeeDetails.sort_code;
					makePaymentRequest.display_name = requestpacket.payeeDetails.display_name;

					break;
				case StringConstant.paymentUpper:
					makePaymentRequest.reference = requestpacket.payeeDetails.reference;
					makePaymentRequest.account_number = requestpacket.payeeDetails.account_number;
					makePaymentRequest.sort_code = requestpacket.payeeDetails.sort_code;
					makePaymentRequest.display_name = requestpacket.payeeDetails.display_name;
					break;
			}
			// let requestpacket.pots=pots;
			// check for recursive
			if (requestpacket.details.isRepeat) {
				makePaymentRequest.schedule = this.setRecurrenceData(requestpacket.details);
				makePaymentRequest.schedule.recurrence.amount = requestpacket.amount;
				this.raise(PaymentsConstants.MAKE_SO_PAYMENT_SERVICECALL, { makePaymentRequest, accountId, bankId });
			} else {
				switch (requestpacket.details.when) {
					case StringConstant.Today:
						const makePaymentRequestDD = {};
						makePaymentRequestDD.beneficiary_id = requestpacket.payeeDetails.beneficiary_id;
						makePaymentRequestDD.reference = requestpacket.payeeDetails.reference;
						makePaymentRequestDD.amount = requestpacket.amount;
						// pots.push(makePaymentRequestDD);
						this.raise(PaymentsConstants.MAKE_DD_PAYMENT_SERVICECALL, { makePaymentRequestDD, accountId, bankId });
						break;
					default:
						let when = requestpacket.details.when;
						if (when === StringConstant.Tomorrow) {
							when = moment().add(1, StringConstant.Days).format('YYYY-MM-DD');
						} else {
							when = DateUtils.getAPIDateString(requestpacket.details.when);
						}

						requestpacket.details.when = when;
						makePaymentRequest.single = {
							when: when,
							amount: requestpacket.amount,
						};

						this.raise(PaymentsConstants.MAKE_SO_PAYMENT_SERVICECALL, { makePaymentRequest, accountId, bankId });
				}
			}
		}
    },

	/*
			set recurrence data for payment/transfer request packet
			@param {Object} recursiveDate		recursive option
	*/
	setRecurrenceData(recursiveDate) {
		let startDate;
		if (recursiveDate.dtStart === StringConstant.Tomorrow) {
			const todayDate = moment();
			const tmrw = todayDate.add(1, StringConstant.Days).format('YYYY-MM-DD');
			startDate = tmrw;
		} else {
			startDate = DateUtils.getAPIDateString(recursiveDate.dtStart);
		}

		const schedule = {
			start_condition: {
				when: startDate,
			},
			recurrence: {
				frequency: {},
			},
		};
		if (recursiveDate.oftenText.toUpperCase() === StringConstant.weeklyUpper) {
			schedule.recurrence.frequency.weekly = {
				interval: 1,
			};
		} else {
			const seletedOftenType = recursiveDate.oftenText.split(' ');
			switch (seletedOftenType[1]) {
				case StringConstant.weekly:
					schedule.recurrence.frequency.weekly =
						{
							interval: parseFloat(seletedOftenType[0]),
						};
					break;
				case StringConstant.monthly:
					schedule.recurrence.frequency.monthly =
						{
							interval: parseFloat(seletedOftenType[0]),
						};
					break;
				default:
			}
		}
		switch (recursiveDate.stopitwhenText) {
			case StringConstant.Pickadate:
				let end;
				if (recursiveDate.end === StringConstant.Tomorrow) {
					const todayDate = moment();
					const tmrw = todayDate.add(1, StringConstant.Days).format('YYYY-MM-DD');
					end = tmrw;
				} else {
					end = DateUtils.getAPIDateString(recursiveDate.end);
				}
				schedule.end_condition = {
					when: DateUtils.getAPIDateString(end),
				};
				break;
			case StringConstant.Nooftimes:
				schedule.end_condition = {
					number_of_payments: parseFloat(recursiveDate.end),
				};

				break;
		}

		return schedule;
	},

	/*
		get the direct debit list of payment/transfer
	*/
	getDirectDebitList() {
		AppDispatcher.handleViewAction({
			actionType: PaymentsConstants.GET_DIRECT_DEBIT_LIST,
		});
	},

	/*
		handle to get direct debit list success response
		@param {Object} response		DD list response
	*/
	handleDirectDebitListSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: PaymentsConstants.GET_DIRECT_DEBIT_LIST_SUCCESS,
			data: response,
		});
	},

	/*
		get the SO list of payment/transfer
	*/
	getStandingOrderList() {
		AppDispatcher.handleViewAction({
			actionType: PaymentsConstants.GET_STANDING_ORDER_LIST,
		});
	},

	/*
		handle to get SO payment list success response
		@param {Object} response		SO payment list response
	*/
	handleStandingOrderListSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: PaymentsConstants.GET_STANDING_ORDER_LIST_SUCCESS,
			data: response,
		});
	},

	/*
		handle payment service response
		@param {Object} response		payment success/error response
	*/
    handleMakePaymentServiceCall(response) {
		switch (response.code) {
			case 202:

				this.raiseServerAction(PaymentsConstants.MAKE_PAYMENT_SUCCESS, response);
				break;
			case 422:
				this.raiseServerAction(PaymentsConstants.MAKE_PAYMENT_FAILURE, response);
				break;
			default:

		}
    },

	/*
		set the repeat payment option to store
		@param {Object} result		repeat payment option
	*/
	postRepeatPaymentData(result) {
		AppDispatcher.handleViewAction({
			actionType: PaymentsConstants.POST_TO_STORE,
			data: result,
		});
	},

	/*
		call delete payment service
		@param {Object} data		delete payment request
	*/
	sendDeletePayment(data) {
        AppDispatcher.handleServerAction({
			actionType: PaymentsConstants.DELETE_PAYMENT_DETAILS,
			data: data,
		});
	},
	/*
	+		set whether is edit payee overlay exited
	+		@param {Boolean} isExit		true|false
	+	*/
	isEditPaymentExit(isExit) {
		this.raise(PaymentsConstants.EDIT_PAYMENT_EXIT, isExit);
	},
	/*
		handle deleted payment success response
		@param {Object} response		deleted payment response
   */
	handleDeletePaymentListSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: PaymentsConstants.DELETE_PAYMENT_DETAILS_SUCCESS,
			data: response,
		});
	},

	/*
		set selected account from To list
		@param {Object} account		selected account
   */
	putToSelectedAccount(account) {
		PaymentsActionCreator.raise(PaymentsConstants.PUT_TO_SELECTED_ACCOUNT, account);
	},

	/*
		reset payment/transfer data after payment confirm
	*/
	confrimPayment() {
		AppDispatcher.handleViewAction({
			actionType: PaymentsConstants.CONFIRM_PAYMENT,
		});
	},

	/*
		get the arhived data based on filter criteria
		@param {String} data		filter name
	*/
	getArchivedFilterData(data) {
		AppDispatcher.handleViewAction({
			actionType: PaymentsConstants.GET_ARCHIVED_FILTER,
			data: data,
		});
	},

	/*
		get the payment data based on filter criteria
		@param {String} data		filter name
	*/
	getPaymentFilterData(data) {
		AppDispatcher.handleViewAction({
			actionType: PaymentsConstants.GET_PAYMENT_FILTER,
			data: data,
		});
	},

	/*
		get the all archived data
	*/
	getArchivedData() {
		AppDispatcher.handleViewAction({
			actionType: PaymentsConstants.GET_ARCHIVED_DATA,
		});
	},

	/*
		set the From selected pot data in store
		@param {String} data		selected pot
	*/
	selectedPot(data) {
		PaymentsActionCreator.raise(PaymentsConstants.SELECTED_POT, data);
	},

	/*
		set the To selected pot data in store
		@param {String} data		selected pot
	*/
	selectedToPot(data) {
		PaymentsActionCreator.raise(PaymentsConstants.SELECTED_TO_POT, data);
	},

	/*
		get payment details by payment Id
		@param {String} id		mandate id
	*/
	getPaymentDetailsById(id) {
		AppDispatcher.handleViewAction({
			actionType: PaymentsConstants.GET_PAYMENTDETAILS_BYID,
			data: id,
		});
	},

	/*
		set edited payment data in store
	*/
	editPayment(accountId, editPaymentData) {
		const editPaymentRequest = {};
		const mandateId = editPaymentData.id;
		editPaymentRequest.display_name = editPaymentData.display_name;
		editPaymentRequest.sort_code = editPaymentData.sort_code;
		editPaymentRequest.reference = editPaymentData.reference;
		editPaymentRequest.account_number = editPaymentData.account_number;
		const amount = {
			value: editPaymentData.amount,
			currency: editPaymentData.currency,
		};
		if (editPaymentData.isRepeat) {
			editPaymentRequest.schedule = this.setRecurrenceData(editPaymentData);
			editPaymentRequest.schedule.recurrence.amount = amount;
			this.raise(PaymentsConstants.EDIT_SO_PAYMENT_SERVICECALL, { editPaymentRequest, accountId, mandateId });
		} else {
			editPaymentRequest.single = {
				when: DateUtils.getAPIDateString(editPaymentData.when),
				amount: amount,
			};
			this.raise(PaymentsConstants.EDIT_SO_PAYMENT_SERVICECALL, { editPaymentRequest, accountId, mandateId });
		}
	},
	/*
		set repeat option for edit payment
		@param {Object} data		repeat option
	*/
	assignRepeatData(data) {
		AppDispatcher.handleViewAction({
			actionType: PaymentsConstants.SET_REPEAT_DATA,
			data: data,
		});
	},

	/*
		update the SO payment status
		@param {Object} response		status response
	*/
	updateSOPaymentStatus(response) {
		this.getAllpaymentList();
		AppDispatcher.handleServerAction({
			actionType: PaymentsConstants.UPDATE_PAYMENT_SO_LIST,
			data: response,
		});
	},
	updateEditPaymentStatus(response) {
		AppDispatcher.handleServerAction({
			actionType: PaymentsConstants.EDIT_PAYMENT_SERVICE_MESSAGE,
			data: response,
		});
	},
	handleDeletePaymentSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: PaymentsConstants.DELETE_PAYMENT_SUCCESS,
			data: response,
		});
	},


	/*
		set edited payment data to store
		@param {Object} data		edited payment data
	*/
	postEditeDataToPaymentStore(datas, accountId) {
		const data = datas;
		data.accountId = accountId;
		AppDispatcher.handleServerAction({
			actionType: PaymentsConstants.SET_EDIT_PAYMENT_DATA_FROM_EDITSTORE,
			data: data,
		});
	},

	/*
		set flag whether pot clicked
		@param {Boolean} data		flag data
	*/
	potClicked(data) {
		AppDispatcher.handleViewAction({
			actionType: PaymentsConstants.POT_CLICKED,
			data: data,
		});
	},

	/*
		set edit payment id
		@param {String} data	payment Id
	*/
	setPaymentEditId(data) {
		AppDispatcher.handleViewAction({
			actionType: PaymentsConstants.SET_PAYMENT_ID,
			data: data,
		});
	},

	/*
		get account details base on account id
		@param {String} accountId	account Id
	*/
	getAccountDetails(accountId) {
		AppDispatcher.handleServerAction({
			actionType: PaymentsConstants.REQUEST_ACCOUNT_DETAIL,
			data: accountId,
		});
	},

	/*
		handle account details success response
		@param {Object} response		account details response
	*/
	handleAccountsDetailsSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: PaymentsConstants.REQUEST_ACCOUNT_DETAIL_SUCCESS,
			data: response,
		});
	},

	/*
		get pot details base on account id
		@param {String} accountId	account Id
	*/
	getPotDetails(accoundId) {
		AppDispatcher.handleServerAction({
			actionType: PaymentsConstants.REQUEST_POT_DETAIL,
			data: accoundId,
		});
	},

	/*
		handle get Pot details success response
		@param {Object} response		Pot details response
	*/
	handlePotsDetailsSuccess(response) {
		AppDispatcher.handleServerAction({
			actionType: PaymentsConstants.REQUEST_POT_DETAIL_SUCCESS,
			data: response,
		});
	},

	/*
		set ending option data for repeat payment
		@param {object} data	ending details
	*/
	checkEndData(data) {
		AppDispatcher.handleViewAction({
			actionType: PaymentsConstants.SET_ENDING_DETAILS,
			data: data,
		});
	},

	/*
		set flag and data for repeat payment step from confrim payment
		@param {object} data	payment step data
	*/
	goBackToRepeatPayment(data) {
		AppDispatcher.handleViewAction({
			actionType: PaymentsConstants.GO_BACK_TO_RP,
			data: data,
		});
	},
	/*
	set flag to hide /show keypad on back from confirm click
	@param {object} data	payment step data
*/
	setBackConfirm(data) {
		AppDispatcher.handleViewAction({
			actionType: PaymentsConstants.GO_BACK_HIDE_KEYPAD,
			data: data,
		});
	},

	/*
		set edit payment data in store
		@param {object} data	payment edited data
	*/
	setEditPayment(data) {
		AppDispatcher.handleViewAction({
			actionType: PaymentsConstants.SET_EDIT_PAYMENT_DATA,
			data: data,
		});
	},

	/*
		set payment step in store
		@param {object} data	payment step
	*/
	setPaymentStep(data) {
		AppDispatcher.handleViewAction({
			actionType: PaymentsConstants.SET_TO_RP,
			data: data,

		});
	},

	/*
		set left margin of edit button for overlay in Grid
		@param {int} data	left margin
	*/
	setLeftMarginOverlay(data) {
		AppDispatcher.handleViewAction({
			actionType: PaymentsConstants.SET_LEFT_MARGIN,
			data: data,

		});
	},

	/*
		set flag whether total option clicked in saving account
		@param {Boolean} isClick	flag value
	*/
	savingTotalClick(isClick) {
		AppDispatcher.handleViewAction({
			actionType: PaymentsConstants.SAVING_TOT_CLICK,
			data: isClick,
		});
	},

	/*
		refresh the saving account data
	*/
	refreshSavingComponent() {
		AppDispatcher.handleViewAction({
			actionType: PaymentsConstants.SAVING_REFRESH,
		});
	},

	/*
		clear to list in mobile view while re select the from list
	*/
	clearToList(from) {
		AppDispatcher.handleViewAction({
			actionType: PaymentsConstants.MOBILE_CLEAR_TOLIST,
			data: from,
		});
	},

	/*
		set repeat payment after one off payment done
	*/
	spendingTransferMoney(spending) {
		AppDispatcher.handleViewAction({
			actionType: PaymentsConstants.SPENDING_TRANSFER_MONEY,
			data: spending,
			fromPayment: true,
		});
	},

	/*
		set to list total click event
	*/
	toSavingTotalClick(data) {
		AppDispatcher.handleViewAction({
			actionType: PaymentsConstants.SAVING_TO_TOT_CLICK,
			data: data,
		});
	},

	/*
		set to list total click event
	*/
	setOneOffPayment() {
		AppDispatcher.handleViewAction({
			actionType: PaymentsConstants.SET_ONEOFF_PAYMENT,
		});
	},

	/*
		set to flag when navigate from payments page
	*/
	setTabChanged(data) {
		AppDispatcher.handleViewAction({
			actionType: PaymentsConstants.SET_TAB_CHANGED,
			data: data,
		});
	},

	/*
		clear from list in mobile view while re select the from list
	*/
	clearFromAccount(data) {
		AppDispatcher.handleViewAction({
			actionType: PaymentsConstants.CLEAR_FROM_SELECTED,
			data: data,
		});
	},

	/*
			set left margin of edit button for overlay in archived Grid
			@param {int} data	left margin
	*/
	setLeftMarginArchivedOverlay(data) {
		AppDispatcher.handleViewAction({
			actionType: PaymentsConstants.SET_ARCHIVED_LEFT_MARGIN,
			data: data,

		});
	},

};

module.exports = PaymentsActionCreator;
