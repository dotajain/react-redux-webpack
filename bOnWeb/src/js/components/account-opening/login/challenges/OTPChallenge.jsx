/**
 * @module OTPChallenge
 * @tutorial authentication
 */

const React = require('react');
const { PropTypes } = React;
const _ = require('lodash');

const MaskingUtils = require('../../../../utils/MaskingUtils');
const SessionActionCreator = require('../../../../actions/SessionActionCreator');
const AccountOpeningConstants = require('../../../../constants/AccountOpeningConstants');

const TextQuestion = require('../../../common/questionsets/TextQuestion');
const LoadingSpinner = require('../../../LoadingSpinner');

/**
 * Get the help text for otp message, adding the masked phone number
 *
 * @param {String} content 		Content to be used if a telephone number is available to the front end
 * @param {String} altContent 	Alternative content to be used if no telephone number is available to the front end
 * @return {String} 		The help text with masked phone number
 */
function maskPartialPhoneNumber(content, altContent, props) {
	if (!content || !altContent) {
		return;
	}

	if (!props.data.phoneNumber && !_.isString(props.session.currentUserPhoneNumber)) {
		return altContent;
	}

	const phoneNumber = props.data.phoneNumber || props.session.currentUserPhoneNumber;
	const mobileNumberMaskStartPos = 0;
	const mobileNumberMaskEndPos = phoneNumber.length - 4;
	const maskedPhonenumber = MaskingUtils.applyMask(phoneNumber, mobileNumberMaskStartPos, mobileNumberMaskEndPos, '*');

	return content.replace('{partial-phone-number}', maskedPhonenumber);
}


/**
 * Requests update to auth header
 *
 * @param {String} name of auth field within challenge
 * @param {String} value of auth field within challenge
 * @param {Object} props containing action of take onChange
 *
 */
function onChange(name, value, props) {
	props.requestAuthenticationUpdate({
		authType: 'otp',
		authData: props.encryptAnswer(value),
		authIndex: name,
	});
}

/**
 * Resend the otp if the user requests
 */
function resendOTP(props) {
	SessionActionCreator.handleOTPAuthenticationReset();
	SessionActionCreator.requestOTPAuthentication(props.data.username);
}

const OTPChallenge = props => {
	const labelSpan = (
		<div className="otp-resend-button-container">
			<button
				onClick={() => resendOTP(props)}
				className="otp-text-question-resend-button"
				data-anchor="auth-challenge-otp-resend"
			>
				Resend
			</button>
		</div>
	);

	return (
		<div>
			{ props.session.isMakingOtpRequest ? <LoadingSpinner imgSize={30} /> : <TextQuestion
				name="otp"
				key="otp"
				labelSpan={labelSpan}
				containerClassName="otp-text-question-container"
				labelContainerClassName="otp-text-question-label-container"
				labelClassName="otp-text-question-label"
				group={props.group}
				mainColumnSize={12}
				mainColumnSizeMD={12}
				minLength={10}
				maxLength={10}
				validateType="number"
				onChange={(name, value) => onChange(name, value, props)}
				helpText={maskPartialPhoneNumber(props.content.OTPAuthenticationSubTitle, props.content.OTPAuthenticationAltSubTitle, props)}
				dataAnchor="auth-challenge-otp-input"
				required
			>
			{maskPartialPhoneNumber(props.content.OTPAuthenticationTitle, props.content.OTPAuthenticationAltTitle, props)}
		</TextQuestion> }
		</div>
	);
};

OTPChallenge.defaultProps = {
	group: AccountOpeningConstants.GROUP_LOGIN,
};

OTPChallenge.propTypes = {
	session: PropTypes.object.isRequired,
	content: PropTypes.object.isRequired,
	group: PropTypes.string.isRequired,
	encryptAnswer: PropTypes.func.isRequired,
	requestAuthenticationUpdate: PropTypes.func.isRequired,
};

module.exports = OTPChallenge;
