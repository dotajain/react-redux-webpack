/**
 * @module LoginComponent
 * @tutorial authentication
 */
const envConfig = require('../../../../static/config');

const React = require('react');
const { PropTypes } = React;
const update = require('react-addons-update');

const _ = require('lodash');
const cx = require('classnames');

const ChallengeComponent = require('./ChallengeComponent');
const TextQuestion = require('../../common/questionsets/TextQuestion');
const StaticParagraphQuestion = require('../../common/questionsets/StaticParagraphQuestion');
const BottomNavigationBox = require('../../common/BottomNavigationBox');

const SessionActionCreator = require('../../../actions/SessionActionCreator');
const AccountOpeningActions = require('../../../actions/AccountOpeningActions');
const AnalyticsActionCreator = require('../../../actions/AnalyticsActionCreator');

const AccountOpeningConstants = require('../../../constants/AccountOpeningConstants');

const SessionStore = require('../../../stores/SessionStore');

const ValidationUtils = require('../../../utils/ValidationUtils');
const ChallengeUtils = require('../../../utils/ChallengeUtils');

function getStateFromStores() {
	return {
		token: SessionStore.getToken(),
		challenge: SessionStore.getChallenge(),
		authentication: SessionStore.getAuthentication(),
		allowRetry: SessionStore.getAllowRetry(),
	};
}

const LoginComponent = React.createClass({

	propTypes: {
		appData: PropTypes.object,
		targetScope: PropTypes.number.isRequired,
		session: PropTypes.object.isRequired,
		data: PropTypes.object.isRequired,
		validations: PropTypes.object,
		content: PropTypes.object,
		isNotAbleToShowUsername: PropTypes.bool,
		errorMessage: PropTypes.string,
		onSuccess: PropTypes.func,
	},

	/**
	 * Get values from store as well as set the first question.
	 * @return {object} initial state
	 */
	getInitialState() {
		return {
			...getStateFromStores(),
			isResettingToken: false,
		};
	},

	/**
	 *  Reset token on mount
	 *  @ticket DYB-15537
	 */
	componentWillMount() {
		// delete token only locally for DYB: DYB-15537
		const resetToken = _.flow(
			_.negate(this._canDeleteRemoteToken),
			this._resetUsername
		);

		if (!envConfig) { return; }

		if (this.props.session.challenge) {
			resetToken(envConfig.apiBankId, envConfig.bankId);
			this.setState({
				isResettingToken: true,
			});
		}
	},

	/**
	 * Add store listener on mount.
	 */
	componentDidMount() {
		SessionStore.addChangeListener(this._onStoreChange);

			// Record an analytics user event.
		AnalyticsActionCreator.track({
			path: '/user/experience/view',
			action: 'Appeared',
		}, {
			description: 'PageLoaded',
		});

		this._isMounted = true; // @ticket DGW2-697
	},

	componentWillReceiveProps(nextProps) {
		let state = _.assign({}, this.state);

		if (ChallengeUtils(nextProps.session).hasToken()) {
			if (nextProps.session.token.error && this.state.requiresReset) {
				state = update(state, {
					requiresReset: { $set: false },
				});
			}

			if (nextProps.session.token.error && this.state.isReadyForToken) {
				state = update(state, {
					isLoading: { $set: false },
					isReadyForToken: { $set: false },
					requiresReset: { $set: true },
				});
			}

			if (!nextProps.session.token.error &&
				this.state.isReadyForToken) {
				state = update(state, { isLoading: { $set: false } });
			}
		}

		if (ChallengeUtils(nextProps.session).hasChallenge() &&
				this.state.isLoading &&
				!this.state.isReadyForToken) {
			state = update(state, { isLoading: { $set: false } });
		}

		if (!ChallengeUtils(nextProps.session).hasToken() && this.state.isResettingToken) {
			state = update(state, {
				isResettingToken: { $set: false },
			});
		}

		this.setState(state);
	},

	/**
	* Don't update LoginComponent if a stepup authentication is in progress
	*/
	shouldComponentUpdate() {
		return !this.props.session.requireStepupAuthentication &&
				!this.props.session.isPreparingStepupAuthentication;
	},

	/**
	 * Should the token call have returned successful then navigate to the portal page
	 * @param  {object} nextProps The next Props
	 * @param  {object} nextState The next State
	 */
	componentWillUpdate(nextProps, nextState) {
		if (ChallengeUtils(nextProps.session).hasToken()) {
			if (nextState.requiresReset) {
				SessionActionCreator.requestAccessChallengeReset();
			}

			if (nextProps.session.token['access_token'] && nextProps.data.bankID && !nextState.isResettingToken) {
				this.props.onSuccess();
			}
		}
	},

	/**
	 * Remove the listener on unmount.
	 */
	componentWillUnmount() {
		SessionStore.removeChangeListener(this._onStoreChange);
		this._isMounted = false;
	},

	onSubmitHandler(e) {
		e.preventDefault();

		const challengeUtils = new ChallengeUtils(this.props.session);

		let state = _.assign({}, this.state, {
			isReadyForToken: false,
			isLoading: true,
		});

		if (!challengeUtils.hasChallenge()) {
			const callback = () => {
				SessionActionCreator.requestAccessChallengeCreate(this.props.data.username, this.props.targetScope);
				SessionActionCreator.requestAccessTokenReset();
			};

			if (!challengeUtils.hasBankId()) {
				SessionActionCreator.requestBankId(this.props.data.username, callback);
			} else {
				callback();
			}
		} else if (!challengeUtils.hasToken()) {
			state = update(state, {
				isReadyForToken: { $set: true },
			});

			SessionActionCreator.requestAccessTokenCreate(this.props.data.username);
		}

		this.setState(state);

		// Has the user clicked login? Then record analytics.
		AnalyticsActionCreator.track({
			path: '/user/experience/activity',
			action: 'Interacted',
		}, {
			description: 'Login',
			event: 'click',
		});
	},

	_canDeleteRemoteToken(apiBankId, bankId) {
		return this._hasApiBankId(apiBankId) || this._hasRealBankId(bankId) || false;
	},

	_hasApiBankId(apiBankId) {
		return !!apiBankId;
	},

	_hasRealBankId(bankId) {
		return (bankId === 'CB' || bankId === 'YB');
	},

	/**
	 * Store has been updated.
	 */
	_onStoreChange() {
		if (this._isMounted) {
			this.setState(getStateFromStores());
		}
	},

	/**
	 * Clear the api call responses from the store to reset to the begining.
	 * @param  {Boolean} isLocalOnly Removes token only locally (no api call)
	 * @return {void}
	 */
	_resetUsername(isLocalOnly) {
		SessionActionCreator.requestAccessTokenReset(!!isLocalOnly);
		SessionActionCreator.requestAccessChallengeReset();
	},

	isSubmitDisabled() {
		return !ValidationUtils.isGroupValid(this.props.validations, AccountOpeningConstants.GROUP_LOGIN, true) || this.props.session.isPreparingStepupAuthentication;
	},

	render() {
		let errorBox;
		if (!this.props.session.allowRetry) {
			errorBox = (<div className="api-error-message">
				{this.props.content.tooManyRetries}
			</div>);
		} else if (ChallengeUtils(this.props.session).hasToken()) {
			if (this.props.session.token.error) {
				errorBox = (<div className="api-error-message">
					{this.props.errorMessage || this.props.content.goneWrongMessage}
				</div>);
			}
		}

		let usernameQuestion = (
			<TextQuestion
				name="username"
				group={AccountOpeningConstants.GROUP_LOGIN}
				dataAnchor="username"
				defaultValue={this.props.data.username}
				onChange={AccountOpeningActions.updateFormValue}
				mainColumnSize={12}
				mainColumnSizeMD={12}
				validateType="username"
				required
			>
				{this.props.content.usernameLabel}
			</TextQuestion>
		);

		if (ChallengeUtils(this.props.session).hasChallenge() && !this.props.session.token.error) {
			if (this.props.session.challenge.error) {
				usernameQuestion = false;
			} else if (this.props.isNotAbleToShowUsername) {
				usernameQuestion = false;
			} else {
				usernameQuestion =
					(<StaticParagraphQuestion
						mainColumnSize={12}
						className="username-question"
						name="username"
						label={this.props.data.username}
						required
					/>);
			}
		}
		let forgotPasswordLink = '';
		const challenges = (_.head(this.props.session.challenge['auth_schemes']) || {}).challenges || {};
		if (challenges['partial_password']) {
			let passwordUrl = `${this.props.content.bankWebsite}/bpassword`;
			forgotPasswordLink = (<div className="forgot-password-link">
					<div className="col-xs-12 text-center">
						<a href={passwordUrl}
							aria-label={passwordUrl}
							target="_blank"
						>{this.props.content.forgotPassword}
							<span className="screenreader">{passwordUrl}</span>
						</a>
					</div>
				</div>);
		}

		return (
			<div>
				<div role="alert" aria-live="assertive">
					{errorBox}
				</div>
				{usernameQuestion}

				<div
					className={cx({ hidden: this.props.session.authenticated })}
					aria-hidden={this.props.session.authenticated}
				>
					<ChallengeComponent {...this.props} />
				</div>

				<BottomNavigationBox
					onClickNext={this.onSubmitHandler}
					className="col-xs-12 text-center"
					disabled={this.isSubmitDisabled()}
					dataAnchorNext={!ChallengeUtils(this.props.session).hasChallenge() ? 'username-next' : 'portal-next'}
					nextButtonLabel={!ChallengeUtils(this.props.session).hasChallenge() ? 'Next' : this.props.content.loginPageNextButtonLabel}
					isLoading={this.state.isLoading || this.props.appData.isApiCallInProgress}
				/>
				{forgotPasswordLink}

			</div>
		);
	},
});

module.exports = LoginComponent;
