/**
 * @module AlertsNSweepsStore
 */

const AppDispatcher = require('../dispatcher/AppDispatcher');
const assign = require('object-assign');
const EventEmitter = require('events').EventEmitter;
const AlertsNSweepsConstant = require('../constants/AlertsNSweepsConstant');
const AlertsNSweepsApiUtils = require('../utils/AlertsNSweepsApiUtils');
const AccountsStore = require('./AccountsStore');
const _ = require('lodash');
const CHANGE_EVENT = 'change';
const CURRENT = 'current';
const ALERT = 'alert';
const SWEEP = 'sweep';
const PROJECTION = 'projection';
const PROJECTION_LABEL = 'Projection balance alert';
const SWEEP_LABEL = 'Sweep Alert';
const UPPER_ALERT_LABEL = 'High balance alert';
const LOWER_ALERT_LABEL = 'Low balance alert';
let _sweepsData = [];
let _alertsData = [];
let _projectionAlertsData = [];
let alertFlag = '';
let sweepFlag = '';
let _editSweep = {};
let _showHeader = true;
let _editAlert = {};
let _editProjection = {};
let _accountId = [];
let _accountList = {};
let _accountDetails = {};
// let _editToggleSweepData = [];
let _flagForAlert;
let _errorFound = false;
 let _load = false;
let isAlertsLoaded = false;
let isSweepsLoaded = false;
let isProjectionsLoaded = false;
let _errorResponse = '';
let _compName = 'default';
let _isNetworkError = false;

const _createSweep = {
	counter: 0,
	id: 0,
	account_id: 0,
	other_account_id: 0,
	alert: [{ amount: 50, amount1: 150 }],
};
const _createAlert = {
	counter: 0,
	id: 0,
	account_id: 0,
	alert: [{ lessmore: 'less', amount: 0 }],
};

// TO DO FOR PROJECTIONS

const AlertsNSweepsStore = assign({}, EventEmitter.prototype, {

	emitChange() {
		this.emit(CHANGE_EVENT);
	},

	/**
	* @param {function} callback;
	*/
	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	/**
	 * Allow views to unbind listeners before dismounting.
	 *
	 * @param  {Function} callback Function to unbind.
	 */
	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	getToggleFlag(flag) {
		_flagForAlert = flag;
	},

	getSweepsList() {
		return _sweepsData || [];
	},
	getAlertsList() {
		return _alertsData || [];
	},

	getProjectionAlertsList() {
		return _projectionAlertsData || [];
	},

	getAccountColour(accountId) {
		return AccountsStore.getAccountType(accountId);
	},

	customizeAlertDetails(accountAlerts) {
		const alertList = [];
		if (accountAlerts !== null) {
			const accAlerts = accountAlerts.account_alerts;
			if (accAlerts === undefined) {
				return this.createAlertObject(accountAlerts, 0);
			} else {
				for (let i = 0; i < accAlerts.length; i++) {
					alertList.push(this.createAlertObject(accAlerts[i], i));
				}
			}
		}
		return alertList;
	},
	customizeAlert(alerts) {
		const alertList = [];
		for (let j = 0; j < alerts.length; j++) {
			if (alerts[j].lower_threshold) {
				alertList.push({
					'label': LOWER_ALERT_LABEL,
					'lessMore': 'less',
					'amount': alerts[j].lower_threshold.amount.value,
					'enabled': alerts[j].lower_threshold.enabled,
				}
				);
			} else if (alerts[j].upper_threshold) {
				alertList.push({
					'label': UPPER_ALERT_LABEL,
					'lessMore': 'more',
					'amount': alerts[j].upper_threshold.amount.value,
					'enabled': alerts[j].upper_threshold.enabled,
				}
				);
			}
		}
		return alertList;
	},
	createAlertObject(alertObject, i) {
		const accountId = alertObject.account_id;
		return ({
			counter: i,
			id: accountId,
			account_id: accountId,
			name: this.getAccountName(accountId),
			type: ALERT,
			alert: this.customizeAlert(alertObject.alerts),

		});
	},

	customizeProjectionDetails(accountProjections) {
		const alertList = [];
		if (accountProjections !== null) {
			if (accountProjections.external_notifications === undefined) {
				alertList.push(this.createProjectionObject(accountProjections, 0));
			} else {
				for (let i = 0; i < accountProjections.external_notifications.length; i++) {
					alertList.push(this.createProjectionObject(accountProjections.external_notifications[i], i));
				}
			}
		}
		return alertList;
	},

	createProjectionObject(projectionObject, i) {
		return ({
			counter: i,
			id: projectionObject.account.id,
			account_id: projectionObject.account.id,
			type: PROJECTION,
			name: this.getAccountName(projectionObject.account.id),
			alert: this.customizeProjection(projectionObject, projectionObject.external_notification),

		});
	},

	getAccountName(accountId) {
		const accountName = _(_accountList.accounts).filter(c => c.id === accountId).map(c => c.product.name).value()[0];
		return accountName;
	},

	customizeSweep(accountSweeps) {
		const alertList = [];
		alertList.push({
			label: SWEEP_LABEL,
			lessMore: 'less',
			amount: accountSweeps.threshold.value,
			amount1: accountSweeps.target.value,
			enabled: accountSweeps.enabled,
		});
		return alertList;
	},

	customizeProjection(accountProjections, notification) {
		const alertList = [];
		alertList.push({
			label: PROJECTION_LABEL,
			lessMore: 'less',
			amount: accountProjections.thresholds.lower.amount.value,
			enabled: notification,
		});
		return alertList;
	},

	customizeSweepDetails(accountSweeps) {
		let alertList = {};
		if (accountSweeps !== null) {
			if (accountSweeps.sweeps === undefined) {
				// alertList.push(this.createSweepObject(accountSweeps, 0));
				alertList = this.createSweepObject(accountSweeps, 0);
			} else {
				for (let i = 0; i < accountSweeps.sweeps.length; i++) {
					// alertList.push(this.createSweepObject(accountSweeps.sweeps[i], i));
					alertList = this.createSweepObject(accountSweeps.sweeps[i], i);
				}
			}
		}
		return alertList;
	},
	createSweepObject(sweepObject, i) {
		return ({
			counter: i,
			id: sweepObject.account_id,
			sweepId: sweepObject.id,
			type: SWEEP,
			account_id: sweepObject.account_id,
			fromAccountId: sweepObject.other_account_id,
			name: this.getAccountName(sweepObject.account_id),
			otherAccountId: this.getAccountName(sweepObject.other_account_id),
			alert: AlertsNSweepsStore.customizeSweep(sweepObject),

		});
	},

	showSweepPage() {
		let result = true;
		let bCount = 0;
		const accounts = AlertsNSweepsStore.getAlertAccountName();
		accounts.forEach(account => {
			const tempAccount = _(_sweepsData).filter(c => c.id === account.id).value()[0];
			if (tempAccount && tempAccount.alert.length === 1) {
				bCount++;
			}
		}
		);
		if (bCount === accounts.length) {
			result = false;
		} else {
			this.showHeader(false);
		}
		return result;
	},

	showAlertPage() {
		let result = true;
		let bCount = 0;
		const accounts = AlertsNSweepsStore.getAlertAccountName();
		accounts.forEach(account => {
			const tempAccount = _(_alertsData).filter(c => c.id === account.id).value()[0];
			if (tempAccount && tempAccount.alert.length === 2) {
				bCount++;
			}
		}
		);
		if (bCount === accounts.length) {
			result = false;
		} else {
			this.showHeader(false);
		}
		return result;
	},

	getSweepToAccountName() {
		const dropDownList1 = [];
		_accountList.accounts.map(account => {
			if (account.actions_available['/account/sweeps'] === true) {
				dropDownList1.push({ 'id': account.id, 'name': account.product.name, 'number': account.number });
			}
			return false;
		});
		return dropDownList1;
	},

	getSweepFromAccountName() {
		const dropDownList2 = [];
		_accountList.accounts.map(account => {
			if (account.actions_available['/account/sweeps/transfer/out'] === true) {
				dropDownList2.push({ 'id': account.id, 'name': account.product.name, 'number': account.number });
			}
			return false;
		});
		return dropDownList2;
	},

	getEditSweepData(id) {
		_editSweep = _.find(_sweepsData, { id: id });
		return _editSweep || (_editSweep = _createSweep);
	},

	getCreateSweepData() {
		return _createSweep;
	},

	getSweepData() {
		return _editSweep || _createSweep;
	},

	getAlertData() {
		return _editAlert;
	},

	getProjectionData() {
		return _editProjection;
	},

	getEditAlertData(id) {
		_editAlert = _.find(_alertsData, { id: id });
		return _editAlert || (_editAlert = _createAlert);
	},

	getEditProjectionAlertData(id) {
		_editProjection = _.find(_projectionAlertsData, { id: id });
		return _editProjection;
	},

	getAlertFlag() {
		_accountList.accounts.map(account => {
			if (account.actions_available['/account/alerts'] === true) {
				alertFlag = true;
			}
			return false;
		});
		return alertFlag;
	},

	getSweepFlag() {
		_accountList.accounts.map(account => {
			if (account.actions_available['/account/sweeps'] === true) {
				sweepFlag = true;
			}
			return false;
		});
		return sweepFlag;
	},

	getAlertAccountName() {
		const dropDownList2 = [];
		_accountList.accounts.map(account => {
			// resctricted only for B current account  (account.product.code==='136')
			if (account.actions_available['/account/alerts'] === true && (account.product.code === '136')) {
				dropDownList2.push({ 'id': account.id, 'name': account.product.name, 'number': account.number });
			}
			return false;
		});

		return dropDownList2;
	},

	getProjectionAccountName() {
		const dropDownList2 = [];
		_accountList.accounts.map(account => {
			if (account.actions_available['/account/projections'] === true) {
				dropDownList2.push({ 'id': account.id, 'name': account.product.name, 'number': account.number });
			}
			return false;
		});

		return dropDownList2;
	},

	getAlertLessMoreValue() {
		const dropDownList2 = [];
		dropDownList2.push({ 'id': 'less', 'name': 'Less' });
		dropDownList2.push({ 'id': 'more', 'name': 'More' });

		return dropDownList2;
	},

	showHeader(val) {
		if (val !== undefined) {
			_showHeader = val;
		}
		return _showHeader;
	},

	showErrorMessage() {
		return _errorFound;
	},

	getErrorMessage() {
		return _errorResponse;
	},

	isJointAccount() {
		return _accountDetails.owners.length > 1;
	},

	setAccountList() {
		_accountList = AccountsStore.getAll();
	},

	getAccountList() {
		return AccountsStore.getAll();
	},

	getAccountDetails() {
		const accountId = (_accountList.accounts).filter(c => c.type === CURRENT).map(c => c.id)[0];
		AlertsNSweepsApiUtils.getAccountDetails(accountId);
	},

	getAccountID() {
		return AccountsStore.getAll().accounts.filter(c => c.type === CURRENT).map(c => c.id)[0];
	},

	// getCurrentAccountID() {
	// 	_accountId = AccountsStore.getAll().accounts.filter(c => c.type === CURRENT).map(c => c.id);
	// },

	// id is an account id.
	clearSweepData(id) {
		_.remove(_sweepsData, {
			id: id,
		});
		// _sweepsData = [];
		_editSweep = {};
	},

	addSweep(data) {
		_sweepsData.push(this.customizeSweepDetails(data));
	},

	updateSweep(data) {
		const customizedData = this.customizeSweepDetails(data);
		// Find item index using indexOf+find
		const index = _.indexOf(_sweepsData, _.find(_sweepsData, { id: data.account_id }));
		// Replace item at index using native splice
		_sweepsData.splice(index, 1, customizedData);
	},

	setProjectionAlertData(data) {
		const customizedData = this.customizeProjectionDetails(data);
		// Find item index using indexOf+find
		const index = _.indexOf(_projectionAlertsData, _.find(_projectionAlertsData, { id: data.account.id }));
		// Replace item at index using native splice
		_projectionAlertsData.splice(index, 1, customizedData[0]);
	},

	setAlertData(data, accountId) {
		const newData = data;
		newData.account_id = accountId;
		const customizedData = this.customizeAlertDetails(newData);
		// Find item index using indexOf+find
		const index = _.indexOf(_alertsData, _.find(_alertsData, { id: data.account_id }));
		// Replace item at index using native splice
		_alertsData.splice(index, 1, customizedData);
		// _.remove(_alertsData, {
		// 	id: alertAccountId,
		// });
		// _alertsData.push(this.customizeAlertDetails(newData));
	},
	getLoadStatus() {
		if (isAlertsLoaded && isSweepsLoaded && isProjectionsLoaded) {
			return true;
		}
		return false;
	},
	getCompName() {
		return _compName;
	},

	isNetworkError() {
		return _isNetworkError;
	},
});

const getCurrentAccountID = function () {
	_accountId = AccountsStore.getAll().accounts.filter(c => c.type === CURRENT).map(c => c.id);
};

AlertsNSweepsStore.dispatchToken = AppDispatcher.register(payload => {
	const action = payload.action;

	switch (action.actionType) {

		case AlertsNSweepsConstant.ALERT_SWEEPS_ACCOUNT_DETAILS:
			_accountDetails = action.data;
			break;

		case AlertsNSweepsConstant.ALERT_SWEEPS_ACCOUNT_DETAILS_ERROR:
			if (!action.data) {
                _isNetworkError = true;
            } else {
                _isNetworkError = false;
            }
			AlertsNSweepsStore.emitChange();
			break;

		case AlertsNSweepsConstant.REQUEST_SWEEPS_DETAILS:
			isSweepsLoaded = false;
			_sweepsData = [];
			getCurrentAccountID();
			for (let i = 0; i < _accountId.length; i++) {
				AlertsNSweepsApiUtils.getSweepsData(_accountId[i]);
			}
			break;

		case AlertsNSweepsConstant.REQUEST_SWEEPS_DETAILS_SUCCESS:
			_sweepsData.push(AlertsNSweepsStore.customizeSweepDetails(action.data));
			_editSweep = {};
			isSweepsLoaded = true;
			// AlertsNSweepsStore.emitChange();
			break;

		case AlertsNSweepsConstant.ALERTS_SWEEPS_FAILURE:
			if (!action.data) {
                _isNetworkError = true;
            } else {
                _isNetworkError = false;
				_errorResponse = action.data;
				_errorFound = action.response;
            }

			AlertsNSweepsStore.emitChange();
			break;

		case AlertsNSweepsConstant.ALERT_SWEEP_PROJECTION_LIST_FAILURE:
			// _load = true;
			if (!action.data) {
                _isNetworkError = true;
            } else {
                _isNetworkError = false;
				isAlertsLoaded = true;
            }
			AlertsNSweepsStore.emitChange();
			break;

		case AlertsNSweepsConstant.REQUEST_ALERTS_DETAILS:
			// _load = false;
			isAlertsLoaded = false;
			AlertsNSweepsApiUtils.getAlertsData(false);
			break;

		case AlertsNSweepsConstant.REQUEST_ALERTS_DETAILS_SUCCESS:
			_alertsData = AlertsNSweepsStore.customizeAlertDetails(action.data);
			isAlertsLoaded = true;
			_editAlert = {};
			action.refreshList && AlertsNSweepsStore.emitChange();
			break;

		case AlertsNSweepsConstant.REQUEST_PROJECTION_ALERTS_DETAILS:
			isProjectionsLoaded = false;
			AlertsNSweepsApiUtils.getProjectionAlertsData();
			break;

		case AlertsNSweepsConstant.REQUEST_PROJECTION_ALERTS_DETAILS_SUCCESS:
			_projectionAlertsData = AlertsNSweepsStore.customizeProjectionDetails(action.data);
			isProjectionsLoaded = true;
			_editProjection = {};
			// _load = true;
			AlertsNSweepsStore.emitChange();
			break;

		case AlertsNSweepsConstant.ALERTS_LIST_FAILURE:
			if (!action.data) {
                _isNetworkError = true;
            } else {
                _isNetworkError = false;
				isAlertsLoaded = true;
            }
			AlertsNSweepsStore.emitChange();
			break;

		case AlertsNSweepsConstant.SWEEPS_LIST_FAILURE:
			if (!action.data) {
                _isNetworkError = true;
            } else {
                _isNetworkError = false;
				isSweepsLoaded = true;
            }
			AlertsNSweepsStore.emitChange();
			break;

		case AlertsNSweepsConstant.PROJECTIONS_LIST_FAILURE:
			if (!action.data) {
                _isNetworkError = true;
            } else {
                _isNetworkError = false;
				isProjectionsLoaded = true;
            }
			AlertsNSweepsStore.emitChange();
			break;

		case AlertsNSweepsConstant.SET_IN_MY_ACCOUNT:
			_editSweep.account_id = action.data;
			break;

		case AlertsNSweepsConstant.SET_OUT_MY_ACCOUNT:
			_editSweep.other_account_id = action.data;
			break;

		case AlertsNSweepsConstant.SET_ALERT_ACCOUNT:
			_editAlert.account_id = action.data;
			break;

		case AlertsNSweepsConstant.SET_ALERT_LESS_MORE_VALUE:
			_editAlert.alert[0].lessmore = action.data;
			break;

		case AlertsNSweepsConstant.REQUEST_SWEEP_TARGET_MONEY:
			_editSweep.alert[0].amount1 = action.data;
			break;

		case AlertsNSweepsConstant.REQUEST_SWEEP_THRESHOLD_MONEY:
			_editSweep.alert[0].amount = action.data;
			break;

		case AlertsNSweepsConstant.ALERT_TARGET_MONEY:
			_editAlert.alert[0].amount = action.data;
			break;

		case AlertsNSweepsConstant.PROJECTION_ALERT_TARGET_MONEY:
			_editProjection.alert[0].amount = action.data;
			break;

		case AlertsNSweepsConstant.SET_PROJECTION_ALERT_ACCOUNT:
			_editProjection.account_id = action.data;
			break;

		case AlertsNSweepsConstant.HIDE_HEADER_COMPONENT:
			_showHeader = action.data;
			if (_showHeader) {
				_compName = 'default';
			}
			AlertsNSweepsStore.emitChange();
			break;

		case AlertsNSweepsConstant.SET_COMP_NAME:
			_compName = action.data;
			if (_compName !== 'default') {
				_showHeader = false;
			}
			AlertsNSweepsStore.emitChange();
			break;
		default:
	}
});

module.exports = AlertsNSweepsStore;
