/**
 * @module AlertsStore
 */

const AppDispatcher = require('../dispatcher/AppDispatcher');
const assign = require('object-assign');
const EventEmitter = require('events').EventEmitter;
const AlertsConstants = require('../constants/AlertsConstants');
const AlertsApiUtils = require('../utils/AlertsApiUtils');
const AlertsNSweepsApiUtils = require('../utils/AlertsNSweepsApiUtils');
const AlertsNSweepsStore = require('./AlertsNSweepsStore');
const AlertsNSweepsConstant = require('../constants/AlertsNSweepsConstant');
const CHANGE_EVENT = 'change';
let _alertsData = false;
let _editalertsData = false;
let alertAccountId = '';
let _isToggleAlert = null;
const AlertsStore = assign({}, EventEmitter.prototype, {

	emitChange() {
		this.emit(CHANGE_EVENT);
	},

	/**
	* @param {function} callback
	*/
	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	/**
	 * Allow views to unbind listeners before dismounting.
	 *
	 * @param  {Function} callback    Function to unbind.
	 */
	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	isAlert() {
		return _alertsData;
	},

	isUpdateAlert() {
		return _editalertsData;
	},

	isToggleAlert() {
		return _isToggleAlert;
	},

});

const createAlertData = function () {
	const _createAlert = AlertsNSweepsStore.getAlertData();
	const alertObject = {
		'alerts': [],
	};
	const tObject = {
		'enabled': true,
		'amount': {
			'value': parseFloat(_createAlert.alert[0].amount),
			'currency': 'GBP',
		},
	};
	if (_createAlert.alert[0].lessmore === 'more') {
		alertObject.alerts.push({ 'upper_threshold': tObject });
	} else {
		alertObject.alerts.push({ 'lower_threshold': tObject });
	}

	return alertObject;
};

const editAlertData = function (amount, lessMore, toggleAlert) {
	// const _editAlert = AlertsNSweepsStore.getEditAlertData(id);
	// const actualAlert = _(_editAlert.alert).filter(c => c.threshold === lessMore).value()[0];
	const alertObject = {
		'alerts': [],
	};
	const tObject = {
		'enabled': toggleAlert,
		'amount': {
			'value': parseFloat(amount),
			'currency': 'GBP',
		},
	};
	// alert.lessmore = alert.lessmore === undefined ? alert.lessMore : alert.lessmore;
	if (lessMore === 'more') {
		alertObject.alerts.push({ 'upper_threshold': tObject });
	} else {
		alertObject.alerts.push({ 'lower_threshold': tObject });
	}

	return alertObject;
};

AlertsStore.dispatchToken = AppDispatcher.register(payload => {
	const action = payload.action;

	switch (action.actionType) {

		case AlertsConstants.CREATE_ALERT_DETAILS:
			_alertsData = false;
			_editalertsData = false;
			AlertsApiUtils.sendAlertData(createAlertData(), AlertsNSweepsStore.getAlertData().account_id);
			break;
		case AlertsConstants.CREATE_ALERT_DETAILS_SUCCESS:
            _alertsData = true;
			AlertsNSweepsApiUtils.getAlertsData(true);
			// AlertsStore.emitChange();
			break;

		case AlertsNSweepsConstant.REQUEST_ALERTS_DETAILS:
			_alertsData = false;
			AlertsStore.emitChange();
			break;

		case AlertsNSweepsConstant.REQUEST_ALERTS_DETAILS_SUCCESS:
			_alertsData = true;
			AlertsStore.emitChange();
			break;

		case AlertsNSweepsConstant.ALERTS_SWEEPS_FAILURE:
			_alertsData = false;
			_editalertsData = false;
			AlertsStore.emitChange();
		break;

		case AlertsConstants.UPDATE_ALERT_DETAILS:
			_editalertsData = false;
			_alertsData = false;
			_isToggleAlert = action.fromToggle;
			AlertsApiUtils.sendEditAlertData(editAlertData(action.amount, action.lessMore, action.toggleAlert), action.accountId);
			alertAccountId = action.accountId;
			break;

		case AlertsConstants.UPDATE_ALERT_DETAILS_SUCCESS:
			_editalertsData = true;
			AlertsNSweepsStore.setAlertData(action.data, alertAccountId);
			AlertsStore.emitChange();
			break;
		case AlertsNSweepsConstant.RESET_FLAG:
			if (action.data) {
				_alertsData = false;
				_editalertsData = false;
			}
			break;

		default:
	}
});

module.exports = AlertsStore;
