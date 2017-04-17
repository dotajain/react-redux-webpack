/**
 * @module ValidationStore
 */

const _ = require('lodash');

const AppDispatcher = require('../dispatcher/AppDispatcher');
const assign = require('object-assign');
const EventEmitter = require('events').EventEmitter;
const AccountOpeningConstants = require('../constants/AccountOpeningConstants');

// Private vars
const CHANGE_EVENT = 'change';
const debug = false;
// Validation errors/passes are stored here. Grouped by the containing form.
//
// True = value
// False = invalid
const _validations = {};

const ValidationStore = assign({}, EventEmitter.prototype, {

	/**
	 * Alert listeners that the Store has changed.
	 */
	emitChange() {
		this.emit(CHANGE_EVENT);
	},

	/**
	 * Allow views to specify functions to run when this store changes.
	 *
	 * @param {function} callback		Function to run on change.
	*/
	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	/**
	 * Allow views to unbind listeners before dismounting.
	 *
	 * @param  {Function} callback 		Function to unbind.
	 */
	removeChangeListener(callback) {
		this.removeListener('change', callback);
	},

	/**
	 * Get all stored data.
	 *
	 * @return {Object} All stored validation keys + results.
	 */
	getAll() {
		return _.cloneDeep(_validations); // Ensures that components never edit the _validations object in this store directly.
	},

	/**
	 * Ensure that object exist to access the given group/key.
	 *
	 * @param {String}  group   	Group it belongs to.
	 * @param {String}  key     	Name of the field
	 */
	initiateField(group, key) {
		if (_.isUndefined(_validations[group])) {
			_validations[group] = {};
		}

		if (_.isUndefined(_validations[group][key])) {
			_validations[group][key] = {};
		}
	},

	/**
	 * What value (if any) is stored for the given group and key combination?
	 *
	 * @param  {String} group 		What group is the value from?
	 * @param  {String} key 		Key of the value to get.
	 * @return {Boolean}    		True/False/Undefined
	 */
	getValidation(group, key) {
		if (_.isUndefined(_validations[group]) || _.isUndefined(_validations[group][key])) {
			return undefined;
		}

		return _validations[group][key].isValid;
	},

	/**
	 * Store a new validation result.
	 *
	 * @param {String}  group   	Group it belongs to.
	 * @param {String}  key     	Name of the field.
	 * @param {Boolean} isValid 	Is the new value valid?
	 * @return {Boolean} 			Is the new value different to the old one?
	 */
	setValidation(group, key, isValid) {
		// Don't set any undefined validations
		if (_.isUndefined(key)) {
			return false;
		}

		this.initiateField(group, key);

		const currentValue = this.getValidation(group, key);

		if (currentValue === isValid) {
			return false;
		}

		_validations[group][key].isValid = isValid;

		return true;
	},

	/**
	 * Remove validation key alltogether.
	 *
	 * @param {String}  group   	Group it belongs to.
	 * @param {String}  key     	Name of the field.
	 * @return {Boolean} 			Has the validation been removed?
	 */
	removeValidation(group, key) {
		if (_.isUndefined(_validations[group])) {
			return false;
		}

		if (_.isUndefined(_validations[group][key])) {
			return false;
		}

		delete _validations[group][key];

		return true;
	},

	/**
	 * Enable validaton for a given field (i.e. visible error display)
	 *
	 * @param {String}  group   	Group it belongs to.
	 * @param {String}  key     	Name of the field
	 * @return {Boolean} 			Did a change occur?
	 */
	enableValidation(group, key) {
		if (this.isEnabled(group, key)) {
			return false;
		} else {
			this.initiateField(group, key);
			_validations[group][key].isEnabled = true;
			return true;
		}
	},

	/**
	 * Is the given field enabled for visible validation messages?
	 *
	 * @param {String}  group   	Group it belongs to.
	 * @param {String}  key     	Name of the field.
	 * @return {Boolean} 			True if visible error messages should be shown for this field.
	 */
	isEnabled(group, key) {
		return _validations[group] && _validations[group][key] && _validations[group][key].isEnabled === true;
	},

	/**
	 * Is the given field invalid?
	 * (Negative check because a field must be enabled AND invalid for an error to show)
	 *
	 * @param {String}  group   	Group it belongs to.
	 * @param {String}  key     	Name of the field.
	 * @return {Boolean} 			True if enabled and not valid.
	 */
	isInvalid(group, key) {
		return this.isEnabled(group, key) && this.getValidation(group, key) !== true;
	},
});

/**
 * Listen for dispatcher events.
 *
 * @param  {Object} payload 		Data attached to a dispatcher action.
 */
ValidationStore.dispatchToken = AppDispatcher.register(payload => {
	let changeOccurred;

	const action = payload.action;
	const data = action.data;

	switch (action.actionType) {
	case AccountOpeningConstants.UPDATE_VALIDATION:
		changeOccurred = ValidationStore.setValidation(data.group, data.key, data.isValid);

		debug && console.log('update validation', data.key, 'isValid', data.isValid, 'changeOccurred', changeOccurred);

			// Only emit changes if the validation status has changed.
		if (changeOccurred) {
			debug && console.log('ValidationStore - Status changed - emitChange');
			ValidationStore.emitChange();
		}
		break;

	case AccountOpeningConstants.REMOVE_VALIDATION:
		changeOccurred = ValidationStore.removeValidation(data.group, data.key);

		debug && console.log('update validation', data.key, 'isValid', data.isValid, 'changeOccurred', changeOccurred);

			// Only emit changes if the validation status has changed.
		if (changeOccurred) {
			debug && console.log('ValidationStore - Status changed - emitChange');
			ValidationStore.emitChange();
		}
		break;

	case AccountOpeningConstants.ENABLE_VALIDATION:
		changeOccurred = ValidationStore.enableValidation(data.group, data.key);

		if (changeOccurred) {
			debug && console.log('ValidationStore - Field enabled - emitChange', _validations);
			ValidationStore.emitChange();
		}
		break;

	default:
		// Do nothing.
	}
});

module.exports = ValidationStore;
