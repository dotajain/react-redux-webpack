/**
 * @class EncryptionUtils
 */

// Packages
const JSEncrypt = require('jsencrypt');
const _ = require('lodash');

const EncryptionUtils = {

	/**
	 * Encrypt a given value using a public key.
	 *
	 * @param  {String} value Data to be encrypted.
	 * @return {String} Encrypted value.
	 */
	encrypt(publicKey, value) {
		if (!_.isString(value) && !_.isNumber(value)) {
			return undefined;
		}

		const encrypt = new JSEncrypt();
		encrypt.setPublicKey(publicKey);
		return encrypt.encrypt(value);
	},
};

module.exports = EncryptionUtils;
