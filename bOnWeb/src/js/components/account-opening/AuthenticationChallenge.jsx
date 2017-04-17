/**
 * @module AuthenticationChallenge
 */

// Packages
const React = require('react');
const { PropTypes } = React;

// Actions
const SessionActionCreator = require('../../actions/SessionActionCreator');

// Components
const ComponentHeader = require('../common/ComponentHeader');
const SectionCentered = require('../common/SectionCentered');
const ChallengeComponent = require('./login/ChallengeComponent');
const BottomNavigationBox = require('../common/BottomNavigationBox');

// Constants
const AccountOpeningConstants = require('../../constants/AccountOpeningConstants');

// Utils
const ValidationUtils = require('../../utils/ValidationUtils');

const AuthenticationChallenge = React.createClass({
	propTypes: {
		data: PropTypes.object,
		content: PropTypes.object,
		session: PropTypes.object,
		appData: PropTypes.object,
		validations: PropTypes.object,
	},

	_onSuccess() {
		SessionActionCreator.requestAccessTokenCreate(this.props.data.username);
	},

	render() {
		if (!this.props.appData.requireStepupAuthentication) {
			return false;
		}

		return (
			<div>
				<div className="otp-authentication-wrapper">
					<div className="container otp-authentication ">
						<SectionCentered centredColumnSize={8} className="text-center full-height">
							<ComponentHeader
								title={this.props.content.authChallengeTitle}
								titleLevel={1}
								bodyClass="text-center"
								subTitle={this.props.content.authChallengeSubtitle}
							>
								<ChallengeComponent {...this.props} group={AccountOpeningConstants.GROUP_STEPUP} />

								<BottomNavigationBox
									onClickNext={this._onSuccess}
									className="col-xs-12 text-center"
									disabled={!ValidationUtils.isGroupValid(this.props.validations, AccountOpeningConstants.GROUP_STEPUP, true)}
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

module.exports = AuthenticationChallenge;
