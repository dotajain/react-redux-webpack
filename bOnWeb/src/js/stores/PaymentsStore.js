/**
 * @module PaymentsStore
 */

const AppDispatcher = require('../dispatcher/AppDispatcher');
const assign = require('object-assign');
const EventEmitter = require('events').EventEmitter;
const PaymentsConstants = require('../constants/PaymentsConstants');
const AppConstants = require('../constants/AppConstants');
const PaymentApiUtils = require('../utils/PaymentApiUtils');
const _ = require('lodash');
const StringConstant = require('../constants/StringConstants');
const moment = require('moment');

const CHANGE_EVENT = 'change';
const NotInPot = 'Not in Pot';
let _accountList = [];
let _toSelectedAccount = StringConstant.EmptyString;
let _selectedAccount = StringConstant.EmptyString;
let _selectedPayee = StringConstant.EmptyString;
let _repeatPaymentData = null;
let _nextStep = StringConstant.From;
let _isTransfer = false;
let _payeeList = [];
let _potList = [];
let _directDebitList = {
    mandates: [],
};
let mandateError = undefined;
let _standingStoreList = {
    mandates: [],
};
let _mergeData = [];
let _response = [];
const _deletePaymentList = [];
const _addPayeeResponse = [];
let _archData = [];
let _filterPayment = [];
let _editedData = {};
let _selectedPot = StringConstant.EmptyString;
let _selectedToPot = StringConstant.EmptyString;
const _isRepeat = false;
let _isPotClick = false;
let _editPaymentId = StringConstant.EmptyString;
let _accountDetails = [];
const _potDetails = [];
// let _deletePayeeList = {};
let _updatePaymentResponse = {};
let _accountId = StringConstant.EmptyString;
let _standingOrderIterator = 0;
let _directDebitIterator = 0;
let _directDebitErrorIterator = 0;
let _standOrderErrorIterator = 0;
let payeeListError = undefined;
const readTransferAccount = {
    accounts: [],
};
const _archiveData = [];
const _endingDetails = {
    dtStart: StringConstant.chooseDate,
    dtEndText: StringConstant.chooseDate,
    oftenText: StringConstant.chooseValue,
    stopitwhenText: StringConstant.whenicancel,
    when: StringConstant.Today,
    end: StringConstant.whenCancelText,
    isRepeat: false,
    endingText: StringConstant.EmptyString,
    reference: StringConstant.EmptyString,
    amount: StringConstant.EmptyString,
};
const _accountColorMap = [{ accId: StringConstant.EmptyString, color: StringConstant.EmptyString }];
let toTransfer = true;
let _left = 0;
let _isSavingTotClicked = false;
let isFromSpending = false;
let _spendingData = StringConstant.EmptyString;
let _backConfirm = false;
let _isTabChanged = false;
let _isWhenEnable = false;
let _isPaymentExit = false;
let _isToSavingTotClicked = false;
let _resetToOneOff = false;
let _fromOtherPage = false;
let _leftAP = 0;
let _moveMoney = StringConstant.EmptyString;


const PaymentsStore = assign({}, EventEmitter.prototype, {

    emitChange() {
        this.emit(CHANGE_EVENT);
    },

	/**
	* @param {function} callback
	*/
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    // Allow views to unbind listeners before dismounting.
    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
    // returns _accountlist
    getAll() {
        return _accountList || [];
    },
    getReadMandateAccount() {
        readTransferAccount.accounts = [];
        if (_accountList.accounts === undefined) {
            return {};
        }
        _accountList.accounts.map(account => {
            if (account.actions_available['/account/mandates/so/read'] === true) {
                readTransferAccount.accounts.push(account);
            }
            // );
            // return readTransferAccount;

            return false;
        }
        );
        return readTransferAccount;
    },
    // returns _fromAccountList
    getFromAccounts() {
        const _fromAccountList = { accounts: [] };
        if (_accountList.accounts === undefined) {
            return _fromAccountList;
        }
        if (_isTransfer === false) {
            _accountList.accounts.map(account => {
                if (account.actions_available['/account/payments/uk/default/out'] === true) {
                    _fromAccountList.accounts.push(account);
                }
                return false;
            }
            );
        } else {
            _accountList.accounts.map(account => {
                if (account.actions_available['/account/payments/transfer/out'] === true) {
                    _fromAccountList.accounts.push(account);
                } return false;
            }
            );
        }
        return _fromAccountList;
    },
    // returns _toAccountList
    getToAccounts() {
        const _toAccountList = { accounts: [] };

        if (_accountList.accounts === undefined) {
            return _toAccountList;
        }
        if (_isTransfer === true) {
            _accountList.accounts.map(account => {
                if (account.actions_available['/account/payments/transfer/in'] === true) {
                    _toAccountList.accounts.push(account);
                }
                return false;
            }
            );
        }
        return _toAccountList;
    },
    // returns true or StringConstant.EmptyString to show repeat payment
    repeatPaymentShow(account) {
        const selAccount = (account === undefined ? _selectedAccount : account);
        if (selAccount !== StringConstant.EmptyString) {
            if (selAccount.actions_available['/account/mandates/so/write'] === true) {
                return true;
            } else {
                return false;
            }
        }
    },


    // Uses this function to get pop up for credit card
    getCreditPopUp() {
        if (_selectedAccount.type === StringConstant.credit_card) {
            return true;
        }
    },
    // returns _addPayeeResponse
    getAddPayeeResponse() {
        return _addPayeeResponse || {};
    },
    // returns _payeeList
    getAllPayees() {
        return _payeeList || [];
    },
    // returns _potList
    getAllPots() {
        return _potList || [];
    },
    // returns _selectedAccount
    getSelectedAccount() {
        return _selectedAccount;
    },
    // returns _nextStep
    getNextTask() {
        return _nextStep;
    },
    // returns _isTransfer to check payment type
    getPaymentType() {
        return _isTransfer;
    },
    // returns make payment response
    getMakePaymentResponse() {
        return _response;
    },
    // returns _response
    setMakePaymentResponse() {
        return _response = [];
    },
    // returns _repeatPaymentData
    showRepeatPaymentData() {
        return _repeatPaymentData;
    },
    // returns _selectedPayee
    getSelectedPayee() {
        return _selectedPayee;
    },
    // returns _toSelectedAccount
    getSelectedToAccount() {
        return _toSelectedAccount;
    },
    // returns _directDebitList
    getDirectDebitList() {
        return _directDebitList || [];
    },
    // returns _standingStoreList
    getStandingOrderList() {
        return _standingStoreList || [];
    },
    // returns _filterPayment
    getMergeData() {
        return _filterPayment;
    },
    // returns true or false based on id
    IsAccountSame(id) {
        return id === _selectedAccount.id;
    },
    // to compare selected account in to list (mostly on click of cancel in cnfrm payment)
    IsToAccountSame(id) {
        if (_toSelectedAccount !== StringConstant.EmptyString) {
            return id === _toSelectedAccount.id;
        } else {
            return false;
        }
    },
    // update payee list on Add Payee Success
    updatePayeeList(payeeDetail) {
        const payeeDetails = payeeDetail;
        payeeDetails.account = {
            id: _selectedAccount.id,
            sort_code: _selectedAccount.sort_code,
            account_number: _selectedAccount.number,
        };
        _payeeList.beneficiaries.push(payeeDetails);
    },
    // to compare selected payeee in to list in payment
    IsPayeeSame(id) {
        if (_selectedPayee.data !== undefined) {
            return id === _selectedPayee.data.id;
        } else {
            return false;
        }
    },
    // to return archived data
    getArchivedData() {
        _archData = _archiveData;
        return _archiveData;
    },
    getFilteredArchivedData() {
        return _archData;
    },
    // to return edit repeat data
    getEditRepeatData() {
        return _editedData;
    },
    // to return standing order data by id
    getSOPaymentById(id, accountId) {
        if (_standingStoreList !== null) {
            const ddobj = _.find(_standingStoreList.mandates, { id: id, fromAccountId: accountId });
            return ddobj;
        } else {
            return null;
        }
    },
    // to return direct debit data by id
    getDirectDebitDataById(id, accountId) {
        if (_directDebitList !== null) {
            const _editedData = _.find(_directDebitList.mandates, { id: id, fromAccountId: accountId });
            return _editedData;
        } else {
            return null;
        }
    },
    // returns edited data for standing order
    getEditedData() {
        return _editedData;
    },
    // to return delete payment list
    getDeletePaymentList() {
        return _deletePaymentList;
    },
    // to return updated payment list
    getUpdatedPaymentList() {
        //	return _updatedList;
    },
    // to return true or false for selected pot
    getSelectedPot() {
        return _.isEmpty(_selectedPot) ? StringConstant.EmptyString : _selectedPot.id;
    },
    // to return selected pot data
    getSelectedPotData() {
        return _selectedPot;
    },
    // to return true or false for selected to pot
    getSelectedToPot() {
        return _.isEmpty(_selectedToPot) ? StringConstant.EmptyString : _selectedToPot.id;
    },
    // to return selected pot data
    getSelectedToPotData() {
        return _selectedToPot;
    },
    //  to return true or false for in case of same pot
    IsPotSame(id) {
        return id === (_.isEmpty(_selectedPot) ? StringConstant.EmptyString : _selectedPot.id);
    },
    //  to return true or false for in case of same to pot
    isToPotSame(id) {
        return id === (_.isEmpty(_selectedToPot) ? StringConstant.EmptyString : _selectedToPot.id);
    },
    // to return SelectedSavingAccountId
    getSelectedSavingAccountId() {
        return _selectedAccount.id;
    },
    // to return SelectedToSavingAccountId
    getSelectedToSavingAccountId() {
        return _toSelectedAccount.id;
    },
    // to return true or false in case of repeat
    isRepeatOn() {
        return _isRepeat;
    },
    // to return true or false in case of PotClick
    isPotClicked() {
        return _isPotClick;
    },
    // to return true or false in case of SavingTotClicked
    isSavingTotClicked() {
        return _isSavingTotClicked;
    },
    // returns Balances of matched id
    getAccountDetail(id) {
        return _.find(_accountDetails, { id: id });
    },
    // returns potDetails of matched id
    getPotDetails(id) {
        return _.find(_potDetails, { id: id });
    },
    // to return EndingDetails in case of repeat
    getEndingDetails() {
        return _endingDetails;
    },
    // returns amount
    getRepeatAmount() {
        return _endingDetails.amount === StringConstant.EmptyString ? PaymentsStore.getDefaultAmt() : _endingDetails.amount;
    },
    // to return £
    getDefaultAmt() {
        return '£';
    },
    // to return paymentDetails
    getPaymentDetails() {
        const paymentDetails = {};
        paymentDetails.accountId = _selectedAccount.id;
        paymentDetails.bankId = _selectedAccount.bank_id;
        if (_isTransfer) {
            paymentDetails.paymentType = StringConstant.transferUpper;
            const payeeDetails = {
                beneficiary_id: _toSelectedAccount.id,
                display_name: _toSelectedAccount.product.name,
                reference: _toSelectedAccount.reference,
                account_number: _toSelectedAccount.number,
                sort_code: _toSelectedAccount.sort_code,
            };
            paymentDetails.payeeDetails = payeeDetails;
        } else {
            paymentDetails.paymentType = StringConstant.paymentUpper;
            const payeeDetails = {
                beneficiary_id: _selectedPayee.data.id,
                reference: _selectedPayee.data.reference,
                account_number: _selectedPayee.data.to_account.account_number,
                display_name: _selectedPayee.data.display_name,
                sort_code: _selectedPayee.data.to_account.sort_code,
            };
            paymentDetails.payeeDetails = payeeDetails;
        }
        paymentDetails.amount = {
            'value': parseFloat(_endingDetails.amount),
            'currency': 'GBP',
        };

        paymentDetails.details = _endingDetails;
        if (_isTransfer) {
            if (!_.isEmpty(_selectedPot) && _selectedAccount.id !== _selectedPot.id) {
                paymentDetails.details.reference = _selectedPot.reference;
            }
            if (!_.isEmpty(_selectedToPot) && _toSelectedAccount.id !== _selectedToPot.id) {
                paymentDetails.details.reference = _selectedToPot.reference;
            }
        }
        return paymentDetails;
    },
    // returns color of matched id
    getColorFromAccount(id) {
        if (_.find(_accountColorMap, { accId: id }) === undefined) {
            return StringConstant.EmptyString;
        } else {
            return _.find(_accountColorMap, { accId: id }).color;
        }
    },

    // Checking if tranfer/in flag if empty return popup functionality
    checkToTransfer() {
        if (!(_.isEmpty(_accountList))) {
            if (_isTransfer === true) {
                _accountList.accounts.map(account => {
                    if (account.actions_available['/account/payments/transfer/in'] === true) {
                        toTransfer = false;
                    }
                    return false;
                }
                );
            }
            return toTransfer;
        }
    },
    // returns SelectedPayeeStyle
    getSelectedPayeeStyle() {
        if (!_.isUndefined(_selectedAccount)) {
            const acc = _.find(_accountColorMap, { accId: _selectedAccount.id });
            return (acc !== undefined) ? acc.color : 'account-11';
        } else {
            return 'account-11';
        }
    },
    // returns LeftMargin
    getLeftMargin() {
        return _left;
    },
    // to make "To list" empty on click of transfer tab
    emptyToList() {
        _toSelectedAccount = StringConstant.EmptyString;
    },
    // _selectedPayee
    emptyPayeeList() {
        _selectedPayee = StringConstant.EmptyString;
    },
    // _selectedToPot
    emptyToPotList() {
        _selectedToPot = StringConstant.EmptyString;
    },
    // To check if both Pots selected
    checkIfBothPotSelected() {
        if (_selectedPot !== StringConstant.EmptyString && _selectedToPot !== StringConstant.EmptyString) {
            return false;
        } else {
            return true;
        }
    },
    // To return true or false in case of MakePayment
    isMakePayment() {
        let isPayment = true;
        // check from account
        if (_.isEmpty(_selectedAccount)) {
            isPayment = false;
        } else if (_.isEmpty(_toSelectedAccount) && _isTransfer === true) {
            // check to account
            isPayment = false;
        } else if (_selectedAccount.type !== StringConstant.savings && _toSelectedAccount.type === StringConstant.savings
            && _selectedToPot === StringConstant.EmptyString && !_isToSavingTotClicked && !PaymentsStore.checkPotEmpty(_toSelectedAccount.id)) {
            isPayment = false;
        } else if (_.isEmpty(_selectedPayee) && _isTransfer === false) {
            isPayment = false;
        } else if (_selectedAccount.id === _toSelectedAccount.id && _isTransfer === true) {
            isPayment = false;
            if (PaymentsStore.isSameSavingSelectedPots()) {
                isPayment = true;
            }
        } else if (_endingDetails.isRepeat) {
            if (_endingDetails.end === StringConstant.EmptyString || _endingDetails.dtStart === StringConstant.chooseDate || _endingDetails.end === StringConstant.chooseDate
                || _endingDetails.oftenText === StringConstant.chooseValue) {
                isPayment = false;
            }
        } else if (_endingDetails.amount === StringConstant.EmptyString || _endingDetails.amount === this.getDefaultAmt() || (_endingDetails.amount !== undefined && parseFloat(_endingDetails.amount) <= 0)) {
            isPayment = false;
        }
        if (PaymentsStore.getReferenceFlag() && _.isEmpty(_endingDetails.reference.trim())) {
            isPayment = false;
        }
        if (PaymentsStore.isSameSavingSelectedPots()) {
            isPayment = true;
        }

        if (PaymentsStore.isOneOffPayment() && PaymentsStore.getOneOffPayment().isMonthly && !PaymentsStore.repeatPaymentShow(_selectedAccount)) {
            isPayment = false;
        }

        return isPayment;
    },
    // returns amount for matched id
    getBalanceValue(id) {
        let amount = 0;
        const accDetilas = PaymentsStore.getAccountDetail(id);
        if (accDetilas !== undefined) {
            accDetilas.balances.map(balance => {
                if (balance.type === StringConstant.available) {
                    amount = balance.amount.value;
                }

                return false;
            });
        }

        return amount;
    },
    // returns true/false to use as flag when called from spending
    getSpendingFlag() {
        return isFromSpending;
    },
    // returns true/false to use as flag for reference in rp
    getReferenceFlag() {
        let isrefShown = true;
        if (_isTransfer) {
            if ((_selectedPot.id === _selectedAccount.id) || (_toSelectedAccount !== StringConstant.EmptyString && _selectedToPot !== undefined && _selectedToPot.id === _toSelectedAccount.id)) {
                isrefShown = true;
                if ((_selectedPot !== StringConstant.EmptyString && _selectedPot.id !== _selectedAccount.id) || (_selectedToPot !== StringConstant.EmptyString && _selectedToPot.id !== _toSelectedAccount.id)) {
                    isrefShown = false;
                }
            } else {
                if (_selectedPot === StringConstant.EmptyString) {
                    isrefShown = true;
                }

                if (_selectedPot !== StringConstant.EmptyString) {
                    if (PaymentsStore.getSelectedPotData().name === NotInPot && _selectedToPot === StringConstant.EmptyString) {
                        isrefShown = true;
                    } else {
                        isrefShown = false;
                    }
                }
                if (_selectedToPot !== StringConstant.EmptyString && PaymentsStore.getSelectedPotData().name !== NotInPot) {
                    isrefShown = false;
                }
                if (isFromSpending && _moveMoney !== StringConstant.EmptyString && _toSelectedAccount !== undefined) {
                    if (_toSelectedAccount.type === StringConstant.savings && PaymentsStore.checkSavingUnallocatedAmount(_toSelectedAccount.id)) {
                        isrefShown = true;
                    }
                }
            }
        } else {
            if (_selectedPot.id === _selectedAccount.id) {
                isrefShown = true;
            } else if (_selectedPot === StringConstant.EmptyString && _selectedToPot === StringConstant.EmptyString) {
                isrefShown = true;
            }
        }

        return isrefShown;
    },

    // To check if both Pots selected
    isSameSavingSelectedPots() {
        let isSame = false;

        if (_selectedPot !== StringConstant.EmptyString && _selectedToPot !== StringConstant.EmptyString && _selectedAccount.id === _toSelectedAccount.id) {
            isSame = true;
            if (_endingDetails.amount === StringConstant.EmptyString || _endingDetails.amount === this.getDefaultAmt() || (_endingDetails.amount !== undefined && parseFloat(_endingDetails.amount) <= 0)) {
                isSame = false;
            }
        }

        if (PaymentsStore.isOneOffPayment() && !PaymentsStore.getOneOffPayment().isMonthly) {
            isSame = true;
        }

        return isSame;
    },
    // return account id based on account number
    getAccIDByAccNumber(accNumber) {
        let amnt = StringConstant.EmptyString;
        let accid = StringConstant.EmptyString;

        if (accNumber !== undefined) {
            _accountList.accounts.map(account => {
                amnt = _.split(account.number, '-');
                if (amnt[1] === accNumber) {
                    accid = account.id;
                }
                return false;
            });
        }

        return accid;
    },

    // set the flag for cancel click on confirm payment
    getConfirmBack() {
        return _backConfirm;
    },
    // return true/false based on if pot data is empty or not
    checkPotEmpty(id) {
        const data = _.find(_potDetails, { id: id });
        if (data !== undefined) {
            if (data.pots.pots.length !== 0) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    },
    getManagePaymentError() {
        return mandateError;
    },
    updateArchiveStandingList(standingStoreListData, response) {
        const mandateObj = {
            id: standingStoreListData.id,
            from: response.accountName,
            fromAccId: response.accountId,
            to: standingStoreListData.display_name,
            reference: standingStoreListData.reference,
            isActive: standingStoreListData.is_active,
            payType: _.find(_accountList.accounts, { number: standingStoreListData.sort_code + '-' + standingStoreListData.account_number }) !== undefined ? StringConstant.transfer : StringConstant.payment,
            category: standingStoreListData.category,
            accNumber: standingStoreListData.account_number,
            type: StringConstant.SOText,
        };
        if (standingStoreListData.hasOwnProperty('schedule')) {
            mandateObj.when = standingStoreListData.schedule.next_payment.when;
            mandateObj.amount = standingStoreListData.schedule.next_payment.amount.value;
        }
        _archiveData.push(mandateObj);
    },
    updateArchiveDirectList(directStoreListData, response) {
        const mandateObj = {
            id: directStoreListData.id,
            from: response.accountName,
            fromAccId: response.accountId,
            to: directStoreListData.display_name,
            isActive: directStoreListData.is_active,
            category: directStoreListData.category,
            type: StringConstant.DDText,
        };
        if (directStoreListData.hasOwnProperty('previous_payment')) {
            mandateObj.amount = directStoreListData.previous_payment.amount.value;
            mandateObj.when = directStoreListData.previous_payment.when;
            mandateObj.type = StringConstant.DDText;
            mandateObj.reference = directStoreListData.previous_payment.reference;
        } else {
            mandateObj.reference = directStoreListData.reference;
            mandateObj.type = StringConstant.singlePayType;
        }
        _archiveData.push(mandateObj);
    },
    getPayeeError() {
        return payeeListError;
    },
    setPayeeError() {
        payeeListError = undefined;
    },
    setManagePaymentError() {
        mandateError = undefined;
    },
    updateStandingOrderList(standingStoreListData, response) {
        const payType = String(standingStoreListData.sort_code + '-' + standingStoreListData.account_number);
        const mandateObj = {
            id: standingStoreListData.id,
            from: response.accountName,
            fromAccId: response.accountId,
            to: standingStoreListData.display_name,
            reference: standingStoreListData.reference,
            isActive: standingStoreListData.is_active,
            payType: _.find(_accountList.accounts, { number: payType }) !== undefined ? StringConstant.transfer : StringConstant.payment,
            category: StringConstant.SOPayment,
            accNumber: standingStoreListData.account_number,

        };
        if (standingStoreListData.hasOwnProperty('schedule')) {
            mandateObj.when = standingStoreListData.schedule.next_payment.when;
            mandateObj.type = StringConstant.SOText;
            mandateObj.amount = standingStoreListData.schedule.next_payment.amount.value;
        } else {
            mandateObj.when = standingStoreListData.single.when;
            mandateObj.amount = standingStoreListData.single.amount.value;
            if (mandateObj.payType === StringConstant.payment) {
                mandateObj.type = StringConstant.singlePayType;
            } else {
                mandateObj.type = StringConstant.transfer;
            }
        }
        _mergeData.push(mandateObj);
    },

    updateDirectDebitList(directStoreListData, response) {
        const payType = String(directStoreListData.sort_code + '-' + directStoreListData.account_number);
        const directDebitObj = {
            id: directStoreListData.id,
            from: response.accountName,
            fromAccId: response.accountId,
            to: directStoreListData.display_name,
            amount: directStoreListData.previous_payment.amount.value,
            when: directStoreListData.previous_payment.when,
            reference: directStoreListData.reference,
            isActive: directStoreListData.is_active,
            payType: _.find(_accountList.accounts, { number: payType }) !== undefined ? StringConstant.transfer : StringConstant.payment,
            category: StringConstant.DDPayment,
            type: StringConstant.DirectDebit,
        };
        _mergeData.push(directDebitObj);
    },

	/**
	 *  reset payment data payment/transfer done
	 *
	 */
    resetPaymentData() {
        // _isTransfer = false;
        _nextStep = StringConstant.From;
        _selectedPayee = StringConstant.EmptyString;
        _selectedAccount = StringConstant.EmptyString;
        _toSelectedAccount = StringConstant.EmptyString;
        _repeatPaymentData = StringConstant.EmptyString;
        _selectedPot = StringConstant.EmptyString;
        _selectedToPot = StringConstant.EmptyString;
        _editPaymentId = StringConstant.EmptyString;
        _endingDetails.dtStart = StringConstant.chooseDate;
        _endingDetails.oftenText = StringConstant.chooseValue;
        _endingDetails.dtEndText = StringConstant.chooseDate;
        _endingDetails.stopitwhenText = StringConstant.whenicancel;
        _endingDetails.when = StringConstant.Today;
        _endingDetails.end = StringConstant.whenCancelText;
        _endingDetails.isRepeat = false;
        _endingDetails.amount = PaymentsStore.getDefaultAmt();
        _endingDetails.reference = StringConstant.EmptyString;
        _response = StringConstant.EmptyString;
        isFromSpending = false;
        _isPotClick = false;
        _isSavingTotClicked = false;
        _backConfirm = false;
        _isTabChanged = false;
        _spendingData = StringConstant.EmptyString;
        _isToSavingTotClicked = false;
        _resetToOneOff = false;
        _fromOtherPage = false;
        _moveMoney = StringConstant.EmptyString;
    },


	/**
	 * get  the flag on switch from payment to transfer or vice varsa
	 *
	 * @return {Boolean}    	 True|false
	*/
    getTabChanged() {
        return _isTabChanged;
    },


	/**
	 * get the pot visibility for saving account transfer
	 *
	 * @return {Boolean}    	 True|false
	*/
    setPotVisbility(toPot, savingId) {
        const fromPot = PaymentsStore.getSelectedPotData();
        let visible = false;
        if (fromPot !== undefined) {
            if (fromPot === StringConstant.EmptyString) {
                visible = true;
            }
            // visible one SA to same SA other pot
            if (PaymentsStore.getSelectedPot() !== toPot.id && _selectedAccount.id === savingId) {
                visible = true;
            }
            // visible if from is Not in pot and to all pot
            if ((fromPot.name === NotInPot || toPot.name === NotInPot) && _selectedAccount.id !== savingId) {
                visible = true;
            }
            if (_selectedAccount.type !== StringConstant.savings || _isSavingTotClicked) {
                visible = true;
            }
        }

        if (PaymentsStore.isOneOffPayment()) {
            if (_selectedToPot !== undefined) {
                visible = (toPot.id === _selectedToPot.id);
            }
        }

        return visible;
    },

	/**
	 * check whether when option enebled
	 *
	 * @return {Boolean}    	 True|false
	*/
    getWhenEnable() {
        return _isWhenEnable;
    },
	/**
	 * check whether edit payee overlay exited
	 *
	 * @return {Boolean}    	 True|false
	*/
    isPaymentExit() {
        return _isPaymentExit;
    },

	/**
		 * return one-off payment object
		 *
		 * @return {Any}    	The corresponding value
	*/
    getOneOffPayment() {
        return _spendingData;
    },

	/**
		 * check whether payment is one-off payment
		 *
		 * @return {Boolean}    	true|false
	*/
    isOneOffPayment() {
        return _spendingData !== StringConstant.EmptyString;
    },

	/**
		 * check unallocated  amount for saving account
		 *
		 * @return {Boolean}    	true|false
	*/
    checkSavingUnallocatedAmount(id) {
        const selectedPotAcc = _.find(_potDetails, { id: id });
        if (selectedPotAcc !== undefined && selectedPotAcc.pots !== undefined && selectedPotAcc.pots.unallocated_amount.value < 0) {
            return true;
        } else {
            return false;
        }
    },

	/**
		 * check whether to list saving account total click
		 *
		 * @return {Boolean}    	true|false
	*/
    isToSavingTotClicked() {
        return _isToSavingTotClicked;
    },

	/**
		 * check whether payment is one-off payment from repeat payment
		 *
		 * @return {Boolean}    	true|false
	*/
    getResetOneOff() {
        return _resetToOneOff;
    },

	/**
		 * check whether payment home page redirect from payee, payments
		 *
		 * @return {Boolean}    	true|false
	*/
    isFromOtherPage() {
        return _fromOtherPage;
    },

    /**
		 * get left margin of archived payment
		 *
		 * @return {Boolean}    	true|false
	*/
    getArchivedLeftMargin() {
        return _leftAP;
    },

    /**
		 * check if manage payment data load
		 *
		 * @return {Boolean}    	true|false
	*/
    getPaymentDataLoad() {
        if (_standingOrderIterator === readTransferAccount.accounts.length && _directDebitIterator === readTransferAccount.accounts.length) {
            return true;
        } else {
            return false;
        }
    },

    /**
		 * get if move money data assigned from saving pot..
		 *
		 * @return {Boolean}    	true|false
	*/
    getMoveMoney() {
        return _moveMoney;
    },

});


PaymentsStore.dispatchToken = AppDispatcher.register(payload => {
    const action = payload.action;

    switch (action.actionType) {
        case PaymentsConstants.GET_FROM_ACCOUNTS:
            _accountDetails = [];
            PaymentApiUtils.getAccountsList();
            break;
        // in case of payment load directly
        case PaymentsConstants.GET_FROM_ACCOUNTS_SUCCESS:
            _accountList = action.data;
            if (_accountList !== undefined) {
                _accountList.accounts.map((account, index) => {
                    _accountColorMap.push({ accId: account.id, color: `account-${((index % 10) + 1)}` });
                    return false;
                });
            }
            break;
        // in case of payment load directly
        case PaymentsConstants.REQUEST_ACCOUNT_DETAILS_SUCCESS:
            index = _.findIndex(_accountDetails, { 'id': action.data.id });
            if (index >= 0) {
                _accountDetails.splice(index, 1);
            }
            _accountDetails.push(action.data);
            if (_accountDetails.length === _accountList.accounts.length) {
                PaymentsStore.emitChange();
            }
            break;
        case PaymentsConstants.REQUEST_ACCOUNT_DETAILS_ERROR:
            const error = { id: action.id, errCode: action.errCode };
            _accountDetails.push(error);
            if (_accountDetails.length === _accountList.accounts.length) {
                // AccountsStore.emitChange();
            }
            break;
        // case PaymentsConstants.GET_FROM_ACCOUNTS_SUCCESS:
        case PaymentsConstants.REQUEST_ACCOUNTS_LIST_SUCCESS:
            _accountList = action.data;
            _accountList.accounts.map((account, index) => {
                _accountColorMap.push({ accId: account.id, color: `account-${((index % 10) + 1)}` });
                return false;
            });
            // PaymentsStore.emitChange();
            break;
        case PaymentsConstants.REQUEST_ACCOUNT_DETAIL:
            PaymentApiUtils.getAccountDetails(action.data);
            break;
        case PaymentsConstants.REQUEST_ACCOUNT_DETAIL_SUCCESS:
            if (action.data.code === 401) {
                const index = _.findIndex(_accountDetails, { 'id': action.data.id });
                if (index >= 0) {
                    _accountDetails.splice(index, 1);
                }
                _accountDetails.push(action.data);
            } else {
                const error = { id: action.id, errCode: action.errCode };
                _accountDetails.push(error);
            }
            if (_accountDetails.length === _accountList.accounts.length) {
                PaymentsStore.emitChange();
            }
            break;


        case PaymentsConstants.GET_FROM_PAYEES:
            payeeListError = undefined;
            PaymentApiUtils.getPayeeList();
            break;

        case PaymentsConstants.GET_FROM_PAYEES_SUCCESS:
            _payeeList = action.data;
            PaymentsStore.emitChange();
            break;
        case PaymentsConstants.GET_FROM_PAYEES_FAILURE:
            _payeeList = {
                beneficiaries: [],
            };
            payeeListError = {
                error: action.data,
            };
            PaymentsStore.emitChange();
            break;
        case PaymentsConstants.GET_FROM_POTS:
            PaymentApiUtils.getPotList();
            break;

        case PaymentsConstants.GET_FROM_POTS_SUCCESS:
            _potList = action.data;
            PaymentsStore.emitChange();
            break;

        case PaymentsConstants.GET_TO_ACCOUNTS:
            _accountList = action.data;
            break;

        case PaymentsConstants.GET_TO_PAYEES:
            _payeeList = action.data;
            break;
        case PaymentsConstants.PUT_SELECTED_ACCOUNT:
            if (action.data.type !== StringConstant.savings) {
                _selectedPot = StringConstant.EmptyString;
                _isSavingTotClicked = false;
                _isWhenEnable = true;
                if (_nextStep === StringConstant.From) {
                    _nextStep = StringConstant.To;
                }
                if (_isTransfer) {
                    if (action.data.id === _toSelectedAccount.id) {
                        _toSelectedAccount = StringConstant.EmptyString;
                    }
                }
            } else {
                _isWhenEnable = false;
                // _selectedToPot = StringConstant.EmptyString;
                if (_nextStep === StringConstant.From && (_isPotClick || _isSavingTotClicked)) {
                    _nextStep = StringConstant.To;
                }

                if (_selectedAccount.id !== action.data.id) {
                    _isSavingTotClicked = false;
                    _selectedPot = StringConstant.EmptyString;
                }
                if (_nextStep === StringConstant.From && PaymentsStore.checkPotEmpty(action.data.id) === true) {
                    _isSavingTotClicked = true;
                    _nextStep = StringConstant.To;
                }
                if ((_nextStep === StringConstant.RP || _nextStep === StringConstant.From || _nextStep === StringConstant.KP || _nextStep === StringConstant.To) && PaymentsStore.checkPotEmpty(action.data.id) === true) {
                    _isWhenEnable = true;
                }
                if (PaymentsStore.checkPotEmpty(action.data.id) === true) {
                    _isSavingTotClicked = true;
                }

                if (PaymentsStore.getSelectedToPotData() !== undefined && PaymentsStore.getSelectedPotData() !== undefined) {
                    if (PaymentsStore.getSelectedToPotData().name === NotInPot && PaymentsStore.getSelectedPotData().name === NotInPot && _selectedAccount.id === _toSelectedAccount.id
                        || (PaymentsStore.getSelectedPotData() !== StringConstant.EmptyString && PaymentsStore.getSelectedToPotData().id === PaymentsStore.getSelectedPotData().id)) {
                        _selectedToPot = StringConstant.EmptyString;
                    }
                }
            }

            _selectedAccount = action.data;
            if (isFromSpending && _nextStep === StringConstant.To) {
                // _nextStep = StringConstant.KP;
                // if (_spendingData.isMonthly)
                _nextStep = StringConstant.RP;
            }
            PaymentsStore.emitChange();
            break;
        case PaymentsConstants.PUT_TO_SELECTED_ACCOUNT:

            if (_toSelectedAccount !== StringConstant.EmptyString && _toSelectedAccount.id !== action.data.id) {
                _selectedToPot = StringConstant.EmptyString;
                _isToSavingTotClicked = false;
                _isPotClick = false;
            }

            if (_isTransfer) {
                _endingDetails.reference = StringConstant.EmptyString;
            }

            _toSelectedAccount = action.data;
            if (_nextStep === StringConstant.To && _selectedAccount !== StringConstant.EmptyString) {
                if (_toSelectedAccount.type !== StringConstant.savings || _.isEmpty(_selectedToPot) === false) {
                    _nextStep = StringConstant.KP;
                } else if (PaymentsStore.checkPotEmpty(_toSelectedAccount.id) === true) {
                    _nextStep = StringConstant.KP;
                }
            }

            if (_toSelectedAccount.type === StringConstant.savings && _isToSavingTotClicked && _selectedAccount !== StringConstant.EmptyString) {
                // const selectedPotAcc = _.find(_potDetails, { id: _toSelectedAccount.id });
                if (_nextStep === StringConstant.To) {
                    _nextStep = StringConstant.KP;
                }
            }
            PaymentsStore.emitChange();
            break;
        case PaymentsConstants.SELECT_PAYMENT_TYPE:
            _isTransfer = action.data;
            if (_isTransfer) {
                _selectedToPot = StringConstant.EmptyString;
                _toSelectedAccount = StringConstant.EmptyString;
                _endingDetails.reference = StringConstant.EmptyString;
                _isToSavingTotClicked = false;
            } else {
                if (_selectedAccount.type === StringConstant.savings) {
                    _selectedAccount = StringConstant.EmptyString;
                    _selectedPot = StringConstant.EmptyString;
                    _nextStep = StringConstant.From;
                }
                _selectedPayee = StringConstant.EmptyString;
            }

            _endingDetails.reference = StringConstant.EmptyString;
            _selectedToPot = StringConstant.EmptyString;
            _isTabChanged = true;
            _fromOtherPage = false;
            PaymentsStore.emitChange();
            break;
        case PaymentsConstants.SELECT_PAYEE:
            _selectedPayee = action.data;
            _endingDetails.reference = _selectedPayee.data.reference;
            if (_nextStep === StringConstant.To) {
                _nextStep = StringConstant.KP;
            }
            PaymentsStore.emitChange();
            break;
        case PaymentsConstants.MAKE_PAYMENT_SERVICECALL:

            PaymentApiUtils.makePayment(action.data);
            break;
        case PaymentsConstants.MAKE_INTER_POT_TRASNFER_SERVICECALL:
            PaymentApiUtils.makeInterPotTransfer(action.data);
            break;
        case PaymentsConstants.MAKE_SO_PAYMENT_SERVICECALL:
            PaymentApiUtils.makeSOPayment(action.data);
            break;
        case PaymentsConstants.MAKE_DD_PAYMENT_SERVICECALL:
            PaymentApiUtils.makeDDPayment(action.data);
            break;
        case PaymentsConstants.MAKE_PAYMENT_SUCCESS:
            _response = action.data;
            PaymentsStore.emitChange();
            break;

        case PaymentsConstants.MAKE_PAYMENT_FAILURE:
            _response = action.data;
            PaymentsStore.emitChange();
            break;
        case PaymentsConstants.GET_DIRECT_DEBITS_PAYMENT_LIST:
            _directDebitIterator = 0;
            _directDebitErrorIterator = 0;
            _directDebitList = {
                mandates: [],
            };
            readTransferAccount.accounts.map(account => {
                // Calling Api to get Direct Debit Payment list for particular account
                let accountName = '';
                if (account.metadata.display_name !== null) {
                    accountName = account.metadata.display_name;
                } else {
                    accountName = account.product.name;
                }
                PaymentApiUtils.getDirectDebitPaymentList(account.id, accountName, account.type);
                return false;
            });
            break;
        case PaymentsConstants.GET_STANDING_ORDERS_PAYMENT_LIST:
            _mergeData = [];
            _filterPayment = [];
            _standingOrderIterator = 0;
            _standOrderErrorIterator = 0;
            _standingStoreList = {
                mandates: [],
            };
            readTransferAccount.accounts.map(account => {
                let accountName = '';
                if (account.metadata.display_name !== null) {
                    accountName = account.metadata.display_name;
                } else {
                    accountName = account.product.name;
                }
                // Calling Api to get Standing Order Payment list for particular account
                PaymentApiUtils.getStandingOrderPaymentList(account.id, accountName, account.type);
                return false;
            });
            break;
        case PaymentsConstants.POST_TO_STORE:
            // _repeatPaymentData = action.data;
            if (!PaymentsStore.repeatPaymentShow()) {
                _endingDetails.isRepeat = false;
            }

            _nextStep = StringConstant.CNFRM;
            break;
        case PaymentsConstants.CONFIRM_PAYMENT:
            PaymentsStore.resetPaymentData();
            PaymentsStore.emitChange();
            break;
        case PaymentsConstants.GET_DIRECT_DEBIT_LIST_SUCCESS:
            const successRespnse = action.data;
            _directDebitIterator++;
            mandateError = undefined;
            if (!_.isUndefined(successRespnse)) {
                successRespnse.mandates.map(directDebitListDatas => {
                    const directDebitListData = directDebitListDatas;
                    const isActive = directDebitListData.is_active;
                    directDebitListData.fromAccountId = successRespnse.accountId;
                    _directDebitList.mandates.push(directDebitListData);
                    switch (isActive) {
                        case false:
                            directDebitListData.category = StringConstant.DDPayment;
                            directDebitListData.mandateType = StringConstant.DirectDebit;

                            PaymentsStore.updateArchiveDirectList(directDebitListData, successRespnse);
                            break;
                        case true:
                            PaymentsStore.updateDirectDebitList(directDebitListData, successRespnse);
                            break;
                    }
                    return false;
                });
            }
            if (_standingOrderIterator === readTransferAccount.accounts.length && _directDebitIterator === readTransferAccount.accounts.length) {
                _filterPayment = _mergeData;
                PaymentsStore.emitChange();
            }
            break;
        case PaymentsConstants.GET_DIRECT_DEBIT_LIST_ERROR:
            _directDebitIterator++;
            _directDebitErrorIterator++;
            if (_standOrderErrorIterator === readTransferAccount.accounts.length && _directDebitErrorIterator === readTransferAccount.accounts.length) {
                _filterPayment = [];
                _mergeData = [];
                mandateError = action.data;
                PaymentsStore.emitChange();
            } else if (_standingOrderIterator === readTransferAccount.accounts.length && _directDebitIterator === readTransferAccount.accounts.length) {
                PaymentsStore.emitChange();
            }
            break;
        case PaymentsConstants.GET_STANDING_ORDER_LIST_ERROR:
            _standingOrderIterator++;
            _standOrderErrorIterator++;
            if (_standOrderErrorIterator === readTransferAccount.accounts.length && _directDebitErrorIterator === readTransferAccount.accounts.length) {
                _filterPayment = [];
                _mergeData = [];
                mandateError = action.data;
                PaymentsStore.emitChange();
            } else if (_standingOrderIterator === readTransferAccount.accounts.length && _directDebitIterator === readTransferAccount.accounts.length) {
                _filterPayment = _mergeData;
                PaymentsStore.emitChange();
            }
            break;
        case PaymentsConstants.GET_STANDING_ORDER_LIST:
            PaymentApiUtils.getStandingOrderList();
            break;
        case PaymentsConstants.GET_STANDING_ORDER_LIST_SUCCESS:
            _standingOrderIterator++;
            const response = action.data;
            if (!_.isUndefined(response)) {
                response.mandates.map(standingStoreListDatas => {
                    const standingStoreListData = standingStoreListDatas;
                    const isActive = standingStoreListData.is_active;
                    standingStoreListData.fromAccountId = response.accountId;
                    _standingStoreList.mandates.push(standingStoreListData);

                    switch (isActive) {
                        case false:
                            standingStoreListData.category = StringConstant.SOPayment;
                            _standingStoreList.mandateType = StringConstant.SOText;
                            PaymentsStore.updateArchiveStandingList(standingStoreListData, response);
                            break;
                        case true:
                            PaymentsStore.updateStandingOrderList(standingStoreListData, response);
                            break;
                    }
                    return false;
                });
            }
            if (_standingOrderIterator === readTransferAccount.accounts.length && _directDebitIterator === readTransferAccount.accounts.length) {
                _filterPayment = _mergeData;
                PaymentsStore.emitChange();
            }
            break;
        case PaymentsConstants.GET_ARCHIVED_FILTER:
            _archData = [];
            if (action.data === StringConstant.all) {
                _archData = _archiveData;
            } else if (action.data.toUpperCase() === StringConstant.payment.toUpperCase()) {
                _.filter(_archiveData, data => {
                    if (data.payType === StringConstant.payment && data.category !== StringConstant.DDPayment) {
                        _archData.push(data);
                    }
                });
            } else if (action.data.toUpperCase() === StringConstant.transfer.toUpperCase()) {
                _.filter(_archiveData, data => {
                    if (!data.isActive && data.payType === StringConstant.transfer) {
                        _archData.push(data);
                    }
                });
            } else if (action.data.toUpperCase() === StringConstant.ddText.toUpperCase()) {
                _.filter(_archiveData, data => {
                    if (!data.isActive && data.category === StringConstant.DDPayment) {
                        _archData.push(data);
                    }
                });
            }
            PaymentsStore.emitChange();
            break;
        case PaymentsConstants.GET_PAYMENT_FILTER:
            const _mergeList = _mergeData;
            _filterPayment = [];
            if (action.data === StringConstant.all) {
                _filterPayment = _mergeData;
            } else if (action.data.toUpperCase() === StringConstant.payment.toUpperCase()) {
                _.filter(_mergeList, data => {
                    if (data.payType === StringConstant.payment && data.category !== StringConstant.DDPayment) {
                        _filterPayment.push(data);
                    }
                });
            } else if (action.data.toUpperCase() === StringConstant.transfer.toUpperCase()) {
                _.filter(_mergeList, data => {
                    if (data.payType === StringConstant.transfer) {
                        _filterPayment.push(data);
                    }
                });
            } else if (action.data.toUpperCase() === StringConstant.ddText.toUpperCase()) {
                _.filter(_mergeList, data => {
                    if (data.category === StringConstant.DDPayment) {
                        _filterPayment.push(data);
                    }
                });
            }

            PaymentsStore.emitChange();
            break;
        case PaymentsConstants.GET_PAYMENTDETAILS_BYID:
            // PaymentApiUtils.getPaymentDetailsById();
            _accountId = action.data;
            PaymentsStore.emitChange();
            break;
        case PaymentsConstants.UPDATE_PAYMENT_SO_LIST:
            _updatePaymentResponse = action.data;
            //  PaymentApiUtils.getStandingOrderList();
            break;
        case PaymentsConstants.SELECTED_POT:
            _selectedPot = action.data;
            _isSavingTotClicked = false;

            if (_isSavingTotClicked === true) {
                _isSavingTotClicked = false;
            }
            _endingDetails.isRepeat = false;

            break;

        case PaymentsConstants.SELECTED_TO_POT:
            _selectedToPot = action.data;
            if (_isToSavingTotClicked === true) {
                _isToSavingTotClicked = false;
            }
            // _endingDetails.reference = _selectedToPot.reference;
            break;
        case PaymentsConstants.POT_CLICKED:
            _isPotClick = action.data;

            break;
        case PaymentsConstants.SET_PAYMENT_ID:
            _editPaymentId = action.data;
            break;
        case PaymentsConstants.REQUEST_POT_DETAIL:
            PaymentApiUtils.getPotDetails(action.data);
            break;

        case PaymentsConstants.REQUEST_POT_DETAIL_SUCCESS:
            let index = _.findIndex(_potDetails, { id: action.data.id });
            if (index >= 0) {
                _potDetails.splice(index, 1, action.data);
            } else {
                _potDetails.push(action.data);
            }// add not in pot
            const savPot = _.find(_potDetails, { id: action.data.id });
            if (action.data.pots.pots.length !== 0) {
                const pot = {
                    'id': action.data.id,
                    'name': NotInPot,
                    'reference': StringConstant.EmptyString,
                    'balance': {
                        'value': action.data.pots.unallocated_amount.value,
                        'currency': 'GBP',
                    },
                };
                savPot.pots.pots.push(pot);
            }

            // if redirect from spending and pots empty
            if (isFromSpending) {
                if ((_moveMoney !== StringConstant.EmptyString) && _selectedPot === StringConstant.EmptyString) {
                    const selectedPotAcc = _.find(_potDetails, { id: _moveMoney.id });
                    if (selectedPotAcc !== undefined) {
                        _selectedToPot = _.find(selectedPotAcc.pots.pots, { id: _moveMoney.potId });
                    }
                }
                if (_spendingData !== undefined) {
                    const selectedPotAcc = PaymentsStore.getPotDetails(_spendingData.id);
                    if (selectedPotAcc !== undefined) {
                        // set selected pot for account
                        if (selectedPotAcc.pots.pots.length > 0) {
                            _selectedToPot = _.find(selectedPotAcc.pots.pots, { id: _spendingData.potId });
                        }
                    }
                }
            }
            PaymentsStore.emitChange();

            break;
        case PaymentsConstants.SET_ENDING_DETAILS:
            let isEmit = true;
            // _nextStep = StringConstant.RP;
            switch (action.data.type) {
                case StringConstant.stop:
                    _endingDetails.end = StringConstant.EmptyString;
                    _endingDetails.stopitwhenText = StringConstant.EmptyString;
                    _endingDetails.stopitwhenText = action.data.value;
                    if (_endingDetails.stopitwhenText === StringConstant.whenicancel) {
                        _endingDetails.end = StringConstant.whenCancelText;
                    }
                    if (_endingDetails.stopitwhenText === StringConstant.Pickadate) {
                        // _endingDetails.endingText = 'End date';
                        _endingDetails.end = StringConstant.chooseDate;
                    }
                    if (_endingDetails.stopitwhenText === StringConstant.Nooftimes) {
                        // _endingDetails.endingText = 'How many times?';
                    }
                    break;
                case StringConstant.setSelOften:
                    // isEmit = false;
                    _endingDetails.oftenText = action.data.value;
                    break;
                case StringConstant.dtStart:
                    // isEmit = false;
                    _endingDetails.dtStart = action.data.value;
                    break;
                case StringConstant.end:

                    _endingDetails.end = action.data.value;
                    // isEmit = false;
                    break;
                case StringConstant.amt:
                    isEmit = false;
                    _endingDetails.amount = action.data.value;
                    _nextStep = StringConstant.RP;
                    break;
                case StringConstant.isRepeat:
                    _endingDetails.isRepeat = action.data.value;
                    break;
                case StringConstant.noOfTimes:
                    _endingDetails.noOfTimes = action.data.value;
                    break;
                case StringConstant.dtWhen:
                    // isEmit = false;
                    _endingDetails.when = action.data.value;
                    break;
                case StringConstant.reference:
                    _endingDetails.reference = action.data.value;
                    break;
            }
            if (isEmit) {
                PaymentsStore.emitChange();
            }
            break;
        case PaymentsConstants.GO_BACK_TO_RP:
            _nextStep = action.data;
            _backConfirm = true;
            PaymentsStore.emitChange();
            break;
        case PaymentsConstants.SET_EDIT_PAYMENT_DATA_FROM_EDITSTORE:
            _editedData = action.data;
            const mandateId = _editedData.id;
            delete _editedData.schedule['next_payment'];
            delete _editedData['id'];


            PaymentApiUtils.postEditedData(_editedData, mandateId);
            break;
        case PaymentsConstants.SET_TO_RP:
            _nextStep = action.data;
            break;
        case PaymentsConstants.SET_LEFT_MARGIN:
            if (_left === 0) {
                _left = action.data;
            }
            break;
        case PaymentsConstants.SET_ARCHIVED_LEFT_MARGIN:
            if (_leftAP === 0) {
                _leftAP = action.data;
            }
            break;
        case PaymentsConstants.SAVING_TOT_CLICK:
            _selectedPot = StringConstant.EmptyString;
            _isSavingTotClicked = action.data;
            _isPotClick = false;
            if (_isTransfer !== false) {
                _endingDetails.reference = StringConstant.EmptyString;
            }
            PaymentsStore.emitChange();
            break;
        case PaymentsConstants.SAVING_REFRESH:
            PaymentsStore.emitChange();
            break;
        case PaymentsConstants.CREATE_SINGLE_USE_PAYEE_SERVICECALL:
            PaymentApiUtils.makeSingleUsePayee(action.data);
            break;
        case AppConstants.NAVIGATE_TO_WEB_TASK:
            switch (action.data.taskId) {
                case 'WEB-PAYMENT-BACK':
                case 'WEB-MANAGE-PAYEE':
                case 'WEB-ARCHIEVED-PAYMENT':
                case 'WEB-MANAGE-PAYMENT':
                case 'WEB-ADD-PAYEE':
                    _left = 0;
                    _leftAP = 0;
                    isFromSpending = false;
                    _fromOtherPage = true;
                    _isTabChanged = true;
                    if (action.data.taskId === 'WEB-PAYMENT-BACK') {
                        _filterPayment = [];
                    }
                    PaymentsStore.emitChange();
                    break;
                default:
                    if (action.data.taskId.indexOf('PAYMENT') <= 0) {
                        if (!isFromSpending) {
                            _isTransfer = false;
                        }

                        PaymentsStore.resetPaymentData();
                    }

                    break;
            }
            break;
        case PaymentsConstants.FROM_SPENDING:
            isFromSpending = action.data;
            _isTransfer = true;
            PaymentsStore.emitChange();
            break;
        case PaymentsConstants.SPENDING_MOVE_MONEY:
            const spendingData = action.data;
            _moveMoney = spendingData;
            _isTransfer = true;
            isFromSpending = true;

            if (spendingData !== undefined) {
                _toSelectedAccount = _.find(_accountList.accounts, { id: spendingData.id });

                _nextStep = StringConstant.To;
                _isToSavingTotClicked = true;
                _selectedToPot = StringConstant.EmptyString;
                if (spendingData.potId !== undefined) {
                    _isToSavingTotClicked - false;
                    const selectedPotAcc = PaymentsStore.getPotDetails(spendingData.id);

                    if (selectedPotAcc !== undefined) {
                        // set selected pot for account
                        if (selectedPotAcc.pots.pots.length > 0) {
                            _selectedToPot = _.find(selectedPotAcc.pots.pots, { id: spendingData.potId });
                            _isPotClick = true;
                            // set account selected if pot value is negative
                            if (selectedPotAcc.pots.unallocated_amount.value < 0) {
                                _isToSavingTotClicked = true;
                                _isPotClick = false;
                            }
                        } else {
                            _selectedToPot = spendingData.potId;
                        }
                    }
                }
            }

            PaymentsStore.emitChange();
            break;

        case PaymentsConstants.GO_BACK_HIDE_KEYPAD:
            _backConfirm = action.data;
            break;
        case PaymentsConstants.MOBILE_CLEAR_TOLIST:
            if (_isTransfer) {
                if (action.data === StringConstant.From) {
                    _selectedToPot = StringConstant.EmptyString;
                    _toSelectedAccount = StringConstant.EmptyString;
                    _isPotClick = false;
                    _isSavingTotClicked = false;
                    _isToSavingTotClicked = false;
                } else {
                    _selectedToPot = StringConstant.EmptyString;
                    _toSelectedAccount = StringConstant.EmptyString;
                    _isToSavingTotClicked = false;
                    _isPotClick = false;
                }
            } else {
                _selectedPayee = StringConstant.EmptyString;
            }
            PaymentsStore.emitChange();
            break;
        case PaymentsConstants.EDIT_PAYMENT_EXIT:
            _isPaymentExit = action.data;
            if (!_isPaymentExit) {
                PaymentsStore.emitChange();
            }
            break;
        case PaymentsConstants.SPENDING_TRANSFER_MONEY:
            // reset payment data if one-off payment requested from payment thank you page
            if (action.fromPayment !== undefined) {
                PaymentsStore.resetPaymentData();
            }

            _spendingData = action.data;
            _isTransfer = true;
            isFromSpending = true;
            _toSelectedAccount = _.find(_accountList.accounts, { id: _spendingData.id });
            _nextStep = StringConstant.To;

            // check if pot id pass for transfer
            if (_spendingData.potId !== undefined) {
                const selectedPotAcc = PaymentsStore.getPotDetails(_spendingData.id);
                if (selectedPotAcc !== undefined) {
                    // set selected pot for account
                    if (selectedPotAcc.pots.pots.length > 0) {
                        _selectedToPot = _.find(selectedPotAcc.pots.pots, { id: _spendingData.potId });
                        // set account selected if pot value is negative
                        if (selectedPotAcc.pots.unallocated_amount.value < 0) {
                            _isSavingTotClicked = true;
                        }
                    } else {
                        _selectedToPot = _spendingData.id;
                    }
                    _isPotClick = true;
                }
            } else {
                // in case of transfer to saving account
                _isSavingTotClicked = true;
            }
            if (_spendingData.amt > 0) {
                // _nextStep = StringConstant.KP;
                _endingDetails.amount = _spendingData.amt;
            }
            if (_spendingData.isMonthly) {
                // _nextStep = StringConstant.RP;
                _endingDetails.oftenText = StringConstant.oneMonthly;
                _endingDetails.isRepeat = true;
                _endingDetails.stopitwhenText = StringConstant.Nooftimes;

                if (_selectedToPot !== undefined && _selectedToPot.goal !== undefined) {
                    const date = moment(_selectedToPot.goal.when);
                    const from = moment().format('YYYY-MM-DD');
                    const duration = moment.duration(date.diff(from));
                    const sum = (duration.years() * 12) + duration.months() + 2;
                    _endingDetails.end = sum;
                }

                _endingDetails.amount = _spendingData.amt;
                // _endingDetails.endingText = "How many times?";
                _endingDetails.dtStart = StringConstant.Tomorrow;
            }

            PaymentsStore.emitChange();
            break;
        case PaymentsConstants.SAVING_TO_TOT_CLICK:
            _isToSavingTotClicked = action.data;
            _selectedToPot = StringConstant.EmptyString;
            _isPotClick = false;
            if (_isTransfer) {
                _endingDetails.reference = StringConstant.EmptyString;
            }

            PaymentsStore.emitChange();
            break;
        case PaymentsConstants.SET_ONEOFF_PAYMENT:
            _resetToOneOff = true;
            _spendingData.isMonthly = false;
            _endingDetails.oftenText = StringConstant.EmptyString;
            _endingDetails.isRepeat = false;
            _endingDetails.stopitwhenText = StringConstant.EmptyString;
            _endingDetails.end = StringConstant.EmptyString;
            _endingDetails.endingText = StringConstant.EmptyString;
            _endingDetails.dtStart = StringConstant.EmptyString;
            _nextStep = StringConstant.To;
            PaymentsStore.emitChange();
            break;
        case PaymentsConstants.SET_TAB_CHANGED:
            _isTabChanged = action.data;
            PaymentsStore.emitChange();
            break;
        case PaymentsConstants.CLEAR_FROM_SELECTED:
            _selectedAccount = StringConstant.EmptyString;
            _nextStep = 'From';
            PaymentsStore.emitChange();
            break;
        default:
            break;
    }
});

module.exports = PaymentsStore;

