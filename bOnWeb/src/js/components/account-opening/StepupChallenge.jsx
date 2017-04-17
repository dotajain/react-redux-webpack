/**
 * @module StepupChallenge
 */

const React = require('react');
const { PropTypes } = React;

const SessionActionCreator = require('../../actions/SessionActionCreator');

const ComponentHeader = require('../common/ComponentHeader');
const SectionCentered = require('../common/SectionCentered');
const ChallengeComponent = require('./login/ChallengeComponent');
const BottomNavigationBox = require('../common/BottomNavigationBox');

const AccountOpeningConstants = require('../../constants/AccountOpeningConstants');

const AppActions = require('../../actions/AppActions');

const ValidationUtils = require('../../utils/ValidationUtils');

const StepupChallenge = React.createClass({
	propTypes: {
		data: PropTypes.object,
		content: PropTypes.object,
		session: PropTypes.object,
		validations: PropTypes.object,
		appData: PropTypes.object,
	},

	_onSuccess(e) {
		e.preventDefault();

		SessionActionCreator.requestAccessTokenCreate(this.props.data.username, AppActions.callStepupAuthenticationCallback);
	},

	render() {
		if (!this.props.session.requireStepupAuthentication || this.props.session.otpRequestError) {
			return false;
		}

		const modalTitle = (this.props.session.isRequestingOtp) ? this.props.content.OTPTitle : this.props.content.authChallengeTitle;

		return (
			<div>
				<div className="account-opening modal-wrapper">
					<div className="container otp-authentication modal-wrapper__container">
						<SectionCentered centredColumnSize={8} className="text-center full-height">
							<ComponentHeader
								title={modalTitle}
								titleLevel={1}
								bodyClass="text-center otp-component-header"
								subTitle={this.props.content.authChallengeSubtitle}
								wrapperClass="modal-wrapper__header"
								subtitleClass="padding-bottom"
							>
								<ChallengeComponent {...this.props} group={AccountOpeningConstants.GROUP_STEPUP} />

								<BottomNavigationBox
									onClickNext={this._onSuccess}
									className="col-xs-12 text-center"
									disabled={!ValidationUtils.isGroupValid(this.props.validations, AccountOpeningConstants.GROUP_STEPUP, true) || this.props.appData.isApiCallInProgress}
									dataAnchorNext={'auth-challenge-next'}
									nextButtonLabel={'Submit'}
									isLoading={this.isLoading}
								/>
							</ComponentHeader>

						</SectionCentered>
					</div>
				</div>
			</div>
);
	},
});

module.exports = StepupChallenge;
