/**
 * @module ChallengeComponent
 * @tutorial authentication
 */

const React = require('react');
const { PropTypes } = React;

const _ = require('lodash');

const SessionActionCreator = require('../../../actions/SessionActionCreator');
const AccountOpeningActions = require('../../../actions/AccountOpeningActions');

const ChallengeUtils = require('../../../utils/ChallengeUtils');
const EncryptionUtils = require('../../../utils/EncryptionUtils');

const {
	PartialPasswordChallenge,
	SecurityQuestionsChallenge,
	AccessSortCodeAccountChallenge,
	DebitCardChallenge,
	OTPChallenge,
	ChallengeError,
	DateOfBirthChallenge,
} = require('./challenges');

const IsWebChallenge = require('./IsWebChallenge');

function encryptAnswer(value) {
	const sessionId = this.session.challenge['auth_session_id'];
	const publicKey = this.session.challenge['public_key'];
	return EncryptionUtils.encrypt(publicKey, `${sessionId}:${value}`);
}

function requestAuthenticationUpdate(update) {
	SessionActionCreator.requestAuthenticationUpdate(update);
}

const ChallengeComponent = React.createClass({

	propTypes: {
		data: PropTypes.object.isRequired,
		content: PropTypes.object.isRequired,
		session: PropTypes.object.isRequired,
		group: PropTypes.string,
	},
	// mixins: [InputMixin],
	getDefaultProps() {
		return {
			encryptAnswer,
			requestAuthenticationUpdate,
		};
	},

	getInitialState() {
		return {
			fetchingUserDetails: false,
		};
	},

	componentDidMount() {
		this.setCustomerType();
	},

	componentWillReceiveProps(nextProps) {
		const challenges = nextProps.session.challenge['auth_schemes'] ? nextProps.session.challenge['auth_schemes'][0].challenges : {};
		if (!this.state.fetchingUserDetails && challenges.otp && !nextProps.session.isStepupAuthenticationComplete && !nextProps.session.isRequestingOtp) {
			this.setState({
				fetchingUserDetails: true,
			}, () => {
				SessionActionCreator.requestCurrentUserPhoneNumber();
				SessionActionCreator.requestOTPAuthentication(nextProps.data.username);
			});
		}
	},

	componentDidUpdate() {
		this.setCustomerType();
	},

	getChallengesOrDefault() {
		return (_.head(this.props.session.challenge['auth_schemes']) || {}).challenges || {};
	},

	/**
	 * Updates customer data based on what kind of custoemr they are
	 */
	setCustomerType() {
		if (!this.props.session.challenge['auth_schemes'] || (!_.isString(this.props.session.challenge['auth_schemes']) && !_.isArray(this.props.session.challenge['auth_schemes']))) {
			return;
		}

		const challenges = _.head(this.props.session.challenge['auth_schemes']).challenges;

		if (!challenges) {
			return;
		}

		const rules = [
			{ key: 'isRibCustomer', predicate: challenges => !!challenges['security_questions'] },
			{ key: 'isTbCustomer', predicate: challenges => !!challenges.acn },
		];

		const customerType = _.find(rules, item => item.predicate(challenges));
		if (!customerType) {
			return;
		}

		AccountOpeningActions.updateFormValue(customerType.key, true);
	},

	render() {
		if (!ChallengeUtils(this.props.session).hasChallenge()) {
			return null;
		}
		const challenges = this.getChallengesOrDefault();
		if (challenges['partial_password']) {
			AccountOpeningActions.updateFormValue('isExistingBAppUser', 'Yes');
		}
		return (
			<div>
				{this.props.session.challenge.error && <ChallengeError type="cannotBeLoggedIn" {...this.props} />}
				{this.props.session.token.error && <ChallengeError type="goneWrongMessage" {...this.props} />}
				{challenges['partial_password'] && <PartialPasswordChallenge {...this.props} />}
				{challenges['security_questions'] && <SecurityQuestionsChallenge {...this.props} />}
				{challenges['date_of_birth'] && <DateOfBirthChallenge {...this.props} />}
				{challenges.acn && <AccessSortCodeAccountChallenge {...this.props} />}
				{challenges['debit_card'] && <DebitCardChallenge {...this.props} />}
				{challenges.otp && !this.props.session.isStepupAuthenticationComplete && <OTPChallenge {...this.props} />}
			</div>

		);
	},
});

module.exports = IsWebChallenge(ChallengeComponent);
