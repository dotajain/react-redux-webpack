/* eslint no-console: 0*/
/**
 * @class StorageUtils
 */

const StorageUtils = {

	/**
	 * Safely set a value to session storage.
	 *
	 * @param {String} key 		Name to store against.
	 * @param {Any} val 		Value to store (as a string).
	 */
	set(key, val) {
		if (!window.sessionStorage) {
			return;
		}

		try {
			sessionStorage.setItem(key, val);
		} catch (e) {
			console.warn('Session storage not supported.');
		}
	},

	/**
	 * Retrieve a value from session storage.
	 *
	 * @param  {String} key 	Name of the value.
	 * @return {String}     	Stored value. null if not found.
	 */
	get(key) {
		if (!window.sessionStorage) {
			return null;
		}

		return sessionStorage.getItem(key);
	},

	/**
	 * Delete a value from the session store.
	 *
	 * @param  {String} key 	Name of the value.
	 */
	remove(key) {
		if (!window.sessionStorage) {
			return null;
		}

		return sessionStorage.removeItem(key);
	},

};

module.exports = StorageUtils;
