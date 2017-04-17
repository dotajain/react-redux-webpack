/**
 * @module ChallengeUtils
 */

const _ = require('lodash');

const ChallengeUtils = session => {
	return {
		/**
		 * Returns if a token exists
		 *
		 * @return {Boolean} if token exists
		 */
		hasToken() {
			return !_.isEmpty(session.token);
		},

		/**
		 * Returns if a challenge exists
		 *
		 * @return {Boolean} if challenge exists
		 */
		hasChallenge() {
			return !_.isEmpty(session.challenge);
		},

		hasBankId() {
			return !_.isEmpty(session.bankId);
		},
	};
};

module.exports = ChallengeUtils;
