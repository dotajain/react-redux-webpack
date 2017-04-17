/**
 * @class UserIdentityBuilder
 *
 * @classdesc Supports all three definitions defined for USER
 * [Solution Design]{@link https://abouthere.atlassian.net/wiki/pages/viewpage.action?pageId=11867175#UserAuthentication-Identity}
 */


const _ = require('lodash');

const UserIdentityBuilder = {
	/**
	 * Responsible for building the entire userIdentity object.
	 *
	 * @param {string|UUID|object} source source to be mapped
	 *
	 * @return {Object} userIdentity object
	 *
	 * @example // username
	 *
	 * // 'username' => { userIdentity: { userName: 'username' } }
	 *
	 * // Unfortuently, the API doesn't comply to the SD, so we need to mangle our
	 * data and send userName as userId currently
	 *
	 * 'username' => { userIdentity: { userId: 'username' } }
	 *
	 * // UUID
	 *
	 * '8af6473a-42e0-40c3-ab66-7d156fabea93' =>
	  * { userIdentity: { userId: '8af6473a-42e0-40c3-ab66-7d156fabea93' } }
	 *
	 * // User Info
	 *
	 * { firstName: 'firstName', ...} =>
	 * { userIdentity: { userInfo: { firstName: 'firstName', ... } } }
	 *
	 */
	build: source => _.flow(UserIdentityBuilder.buildBody, UserIdentityBuilder.userIdentity)(source),

	/**
	 * Responsble for building the body of the userIdentity object.  Runs conditions
	 * to assert what we are dealing with, and delegates to the appropriate mapper method
	 *
	 * @param {String|UUID|Object} source source to be mapped
	 *
	 * @return {Object} mapped object matches the source
	 *
	 */
	buildBody: source => {
		if (UserIdentityBuilder.isUUID(source)) {
			return UserIdentityBuilder.fromUserId(source);
		}

		if (_.isString(source)) {
			return UserIdentityBuilder.fromUsername(source);
		}

		if (_.isPlainObject(source)) {
			return UserIdentityBuilder.fromUserInfo(source);
		}

		throw new Error(`source invalid source: ${source}`);
	},

	/**
	 * Builds a userName object to later be sent to the UI.  We are using
	 * the paramater name to ensure propery name, so we can send it correctly
	 * to the API.  It will later be translated to user_name based on camelcase -> snakecasing
	 * transformer used within the mapper.
	 *
	 * @param {String} userName username to be user to create the username object
	 *
	 * @return {Object} new userName object
	 *
	 * @example // 'username' => {userName: 'username'}
	 *
	 * 'username' => {userId: 'username'}
	 *
	 * @ticket DYB-19034
	 */
	fromUsername: userName => {
		if (!_.isString(userName)) {
			throw new Error('userName must be a string');
		}

		return { userId: userName };
	},

	/**
	 * Builds the userIdentity object.
	 *
	 * @param {Object} userIdentity userIdentity object to be used to contruct the userIdentity
	 * object required by the API
	 *
	 * @return {Object} Correctly constructed userIdentity
	 *
	 * @example userIdenty => {userIdentity: userIdentity}
	 *
	 */
	userIdentity: userIdentity => ({ userIdentity }),

	/**
	 * Builds the userId object.
	 *
	 * @param {Object} userId userIdentity object to be used to contruct the userId
	 * object required by the API
	 *
	 * @return {Object} Correctly constructed userId
	 *
	 * @example '8af6473a-42e0-40c3-ab66-7d156fabea93' =>
	 * {userId: '8af6473a-42e0-40c3-ab66-7d156fabea93'}
	 *
	 */
	fromUserId: userId => {
		if (!UserIdentityBuilder.isUUID(userId)) {
			throw new Error(`${JSON.stringify(userId)} is not a UUID`);
		}
		return ({ userId });
	},

	/**
	 * Builds the UserInfo object.
	 *
	 * @param {Object} userId userIdentity object to be used to contruct the UserInfo
	 * object required by the API
	 *
	 * @return {Object} Correctly constructed UserInfo
	 *
	 * @example { firstName: 'firstName', ...} => { userInfo: { firstName: 'firstName', ... } }
	 *
	 */
	fromUserInfo: userInfo => ({ userInfo }),

	/**
	 * Helper method for matching UUIDs
	 *
	 * @param {String} source userIdentity object to be used to contruct the fromUserInfo
	 * object required by the API
	 *
	 * @return {Boolean} True if source matches UUID regex, false otherwise
	 */
	isUUID: source => /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/.test(source),
};

module.exports = UserIdentityBuilder;

