/**
 * @module AlertsStore
 */

const AppDispatcher = require('../dispatcher/AppDispatcher');
const assign = require('object-assign');
const EventEmitter = require('events').EventEmitter;
const ProjectionsConstants = require('../constants/ProjectionsConstants');
const ProjectionsApiUtils = require('../utils/ProjectionsApiUtils');
const AlertsNSweepsStore = require('./AlertsNSweepsStore');
const AlertsNSweepsConstant = require('../constants/AlertsNSweepsConstant');
const CHANGE_EVENT = 'change';
let _editProjectionsData = false;
let _isToggleProjection = false;

const editProjectionData = function (toggleProjection, accountID) {
	// const accountID = AlertsNSweepsStore.getAccountID();
	const _editProjection = AlertsNSweepsStore.getEditProjectionAlertData(accountID);
	const projectionObject = {
		'thresholds':
		{
			'lower':
			{
				'amount':
				{
					'currency': 'GBP',
					'value': parseFloat(_editProjection.alert[0].amount),
				},
			},
		},
		'external_notification': toggleProjection === null ? _editProjection.alert[0].enabled : toggleProjection,
	};
	ProjectionsApiUtils.editProjectionData(projectionObject, accountID);
};

const ProjectionsStore = assign({}, EventEmitter.prototype, {

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

	isUpdateProjection() {
		return _editProjectionsData;
	},

	isToggleProjection() {
		return _isToggleProjection;
	},

});

ProjectionsStore.dispatchToken = AppDispatcher.register(payload => {
	const action = payload.action;

	switch (action.actionType) {

		case ProjectionsConstants.UPDATE_PROJECTION_DETAILS:
			_editProjectionsData = false;
			_isToggleProjection = action.toggleProjection;
			editProjectionData(action.toggleProjection, action.accountId);
			break;

		case ProjectionsConstants.UPDATE_PROJECTION_DETAILS_SUCCESS:
            _editProjectionsData = true;
			AlertsNSweepsStore.setProjectionAlertData(action.data);
			ProjectionsStore.emitChange();
			break;
		case ProjectionsConstants.RESET_UPDATION_FLAG:
			_editProjectionsData = false;
			break;
		case AlertsNSweepsConstant.RESET_FLAG:
			if (action.data) {
				_editProjectionsData = false;
			}
			break;

		default:
	}
});

module.exports = ProjectionsStore;
