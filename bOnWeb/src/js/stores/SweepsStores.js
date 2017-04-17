/**
 * @module SweepsStore
 */

const AppDispatcher = require('../dispatcher/AppDispatcher');
const assign = require('object-assign');
const EventEmitter = require('events').EventEmitter;
const SweepsConstants = require('../constants/SweepsConstants');
const AlertsNSweepsConstant = require('../constants/AlertsNSweepsConstant');
const SweepsApiUtils = require('../utils/SweepsApiUtils');
const AlertsNSweepsStore = require('./AlertsNSweepsStore');

const CHANGE_EVENT = 'change';
let _sweepsData = [];
let _editSweepList = false;
let _sweepDeleted = false;
let _isSweepData = false;
let sweepAccountId = '';
let _isNetworkError = false;
let _isToggleSweep = null;
const createSweeptData = function () {
	const _createSweep = AlertsNSweepsStore.getSweepData();
	const sweepObject = {
		'other_account_id': _createSweep.other_account_id,
		'enabled': true,
		'direction': 'in',
	};
	const threshold = {
		'value': parseFloat(_createSweep.alert[0].amount),
		'currency': 'GBP',
	};
	const target = {
		'value': parseFloat(_createSweep.alert[0].amount1),
		'currency': 'GBP',
	};
	sweepObject.threshold = threshold;
	sweepObject.target = target;
	return sweepObject;
};

const editSweepData = function (toggleSweep, accountId) {
	// const _editSweep = AlertsNSweepsStore.getEditSweepData(AlertsNSweepsStore.getAccountID());
	const _editSweep = AlertsNSweepsStore.getEditSweepData(accountId);
	const sweepObject = {
		// 'id':_editSweep.sweepId,
		'other_account_id': _editSweep.fromAccountId,
		'enabled': toggleSweep === null ? _editSweep.alert[0].enabled : toggleSweep,
		'direction': 'in',
	};
	const threshold = {
		'value': parseFloat(_editSweep.alert[0].amount),
		'currency': 'GBP',
	};
	const target = {
		'value': parseFloat(_editSweep.alert[0].amount1),
		'currency': 'GBP',
	};
	sweepObject.threshold = threshold;
	sweepObject.target = target;
	SweepsApiUtils.editSweepData(sweepObject, _editSweep.account_id, _editSweep.sweepId);
};

const SweepsStores = assign({}, EventEmitter.prototype, {

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

	isSweep() {
		return _isSweepData;
	},
	isUpdateSweep() {
		return _editSweepList;
	},

	isToggleSweep() {
		return _isToggleSweep;
	},

	getDelId() {
		return _sweepDeleted;
	},

	isNetworkError() {
		return _isNetworkError;
	},

	// getSweepChange()
	// {
	// 	return _sweepChange;
	// }

	// updateSweepData(toggleSweep) {
	// 	editSweepData(toggleSweep);
	// },

});

SweepsStores.dispatchToken = AppDispatcher.register(payload => {
	const action = payload.action;

	switch (action.actionType) {

		case SweepsConstants.CREATE_SWEEP_DETAILS:
			_isNetworkError = false;
			_isSweepData = false;
			_editSweepList = false;
			_sweepDeleted = false;
			const data = createSweeptData();
			SweepsApiUtils.createSweepData(data, AlertsNSweepsStore.getSweepData().account_id);
			break;

		case SweepsConstants.CREATE_SWEEP_DETAILS_SUCCESS:
			_isNetworkError = false;
			_sweepsData = action.data;
			_isSweepData = true;
			AlertsNSweepsStore.addSweep(_sweepsData);
			// AlertsNSweepsApiUtils.getSweepsData(AlertsNSweepsStore.getAccountID());
			SweepsStores.emitChange();
			break;

		case AlertsNSweepsConstant.ALERTS_SWEEPS_FAILURE:
			if (!action.data) {
				_isNetworkError = true;
			} else {
				_isNetworkError = false;
				_isSweepData = false;
				_editSweepList = false;
				_sweepDeleted = false;
			}
			SweepsStores.emitChange();
			break;

        case SweepsConstants.EDIT_SWEEP_REQUEST:
			_isNetworkError = false;
			_editSweepList = false;
			_isSweepData = false;
			_sweepDeleted = false;
			_isToggleSweep = action.toggleSweep;
			editSweepData(action.toggleSweep, action.accountId);
			break;

		case SweepsConstants.EDIT_SWEEP_REQUEST_SUCCESS:
			if (!action.data) {
				_isNetworkError = true;
			} else {
				_isNetworkError = false;
				_editSweepList = true;
				AlertsNSweepsStore.updateSweep(action.data);
			}
			SweepsStores.emitChange();
			break;

		case SweepsConstants.DELETE_SWEEP_DATA:
			_isNetworkError = false;
			_sweepDeleted = false;
			_isSweepData = false;
			_editSweepList = false;
			const _editSweep = AlertsNSweepsStore.getEditSweepData(action.data);
			SweepsApiUtils.deleteSweepData(action.data, _editSweep.sweepId);
			sweepAccountId = action.data;
			break;

		case SweepsConstants.DELETE_SWEEPS_SUCCESS:
			_isNetworkError = false;
			_sweepDeleted = true;
			if (!action.data) {
				_sweepsData = [];
				AlertsNSweepsStore.clearSweepData(sweepAccountId);
			}
			SweepsStores.emitChange();
			break;
		case AlertsNSweepsConstant.RESET_FLAG:
			if (action.data) {
				_sweepDeleted = false;
				_editSweepList = false;
				_isSweepData = false;
			}
			break;

		default:
	}
});

module.exports = SweepsStores;
