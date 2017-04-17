/**
 * @module ContentStore
 */

const assign = require('object-assign');
const EventEmitter = require('events').EventEmitter;

const config = require('../../static/config');
const _fields = config.content;

const ContentStore = assign({}, EventEmitter.prototype, {

	emitChange() {
		this.emit('change');
	},

	/**
	 * Allow views to specify functions to run when this store changes.
	 *
	 * @param {function} callback		Function to run on change.
	*/
	addChangeListener(callback) {
		this.on('change', callback);
	},

	/**
	 * Allow views to unbind listeners before dismounting.
	 *
	 * @param  {Function} callback 		Function to unbind.
	 */
	removeChangeListener(callback) {
		this.removeListener('change', callback);
	},

	get(id) {
		return _fields[id];
	},

	getAll() {
		return _fields;
	},

	/**
	 * Get the validation message (if any) for a given input field.
	 *
	 * @param  {String} key 	Name of the input field.
	 * @return {String}     	Message to show in an error scenario.
	 */
	getValidationMessage(key) {
		return this.get(`${key}ValidationMessage`);
	},

	/**
	 * Get the help message (if any) for a given input field.
	 *
	 * @param  {String} key 	Name of the input field.
	 * @return {String}     	Message to show when user asks for help.
	 */
	getHelpMessage(key) {
		return this.get(`${key}HelpMessage`);
	},

});

module.exports = ContentStore;
