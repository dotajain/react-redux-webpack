/**
 * @module RegistrationPage
 */

const React = require('react');
const { PropTypes } = React;
const Helmet = require('react-helmet');
const config = require('../../config');

const AccountOpeningActions = require('../../actions/AccountOpeningActions');
const AnalyticsActionCreator = require('../../actions/AnalyticsActionCreator');
const CredentialsActions = require('../../actions/CredentialsActions');
const SessionActionCreator = require('../../actions/SessionActionCreator');

const PageHeader = require('../common/PageHeader');
const CheckBoxQuestion = require('../common/questionsets/CheckBoxQuestion');
const SectionFullWidth = require('../common/SectionFullWidth');
const ComponentHeader = require('../common/ComponentHeader');
const BottomNavigationBox = require('../common/BottomNavigationBox');
const TextQuestion = require('../common/questionsets/TextQuestion');
const SecurityQuestions = require('../account-opening/sections/SecurityQuestions');
const ErrorMessage = require('../common/ErrorMessage');
const AlternativeProductsContent = require('../common/AlternativeProductsContent');

const AccountOpeningConstants = require('../../constants/AccountOpeningConstants');

const UserServicesApiUtils = require('../../utils/UserServicesApiUtils');
const ValidationUtils = require('../../utils/ValidationUtils');
const BrandUtils = require('../../utils/BrandUtils');
const PathUtils = require('../../utils/PathUtils');
const group = AccountOpeningConstants.GROUP_REGISTRATION;
const BrowserUtils = require('../../utils/BrowserUtils');

const RegistrationPage = React.createClass({

	propTypes: {
		appData: PropTypes.object,
		data: PropTypes.object,
		validations: PropTypes.object,
		session: PropTypes.object,
		content: PropTypes.object,
		selectContentBasedOnDowngrade: PropTypes.func,
	},

	getInitialState() {
		return {
			requestedSecurityQuestions: false,
		};
	},

	componentWillMount() {
		BrowserUtils.setViewPort(1);
		CredentialsActions.getCredentials();
		AccountOpeningActions.getTermsAndConditions();

		// Record an analytics user event.
		AnalyticsActionCreator.track({
			path: '/user/experience/view',
			action: 'Appeared',
		}, {
				description: 'PageLoaded',
			});
	},

	componentWillReceiveProps(nextProps) {
		if (nextProps.session.challengeMissingDetailsError) {
			AccountOpeningActions.navigateToWebTask('WEB-CONTACT-BANK');
		}
	},

	componentDidUpdate() {
		// Do we need to download security questions?
		if (this.props.data.credentials && !this.state.requestedSecurityQuestions && this.shouldShowRib()) {
			this.setState({
				requestedSecurityQuestions: true,
			}, () => {
				UserServicesApiUtils.requestSecurityQuestions();
			});
		}
	},

	/**
	 * Get and format the error message if the form submit is not successful
	 */
	getCredentialErrorMessage() {
		if (this.props.data.registrationPageErrorCallbackMessage && this.props.data.registrationPageErrorCallbackCredential) {
			return this.props.content.registrationPageErrorMessage
				.replace('{0}', this.props.data.registrationPageErrorCallbackCredential)
				.replace('{1}', this.props.data.registrationPageErrorCallbackMessage);
		}
	},

	/**
	 * Signup form or "Already registered" message as appropriate.
	 */
	getRibSignup() {
		if (!this.shouldShowRib()) {
			return <p>{this.props.content.alreadyRibRegistered}</p>;
		} else {
			return (<ComponentHeader
				title={this.props.content.securityQuestionsTitle}
				subTitle={this.props.content.securityQuestionsSubTitle}
				titleLevel={2}
   >
			<SecurityQuestions
					securityQuestions={this.props.data.securityQuestions || []}
					numQuestions={config.numSecurityQuestions}
					data={this.props.data}
					content={this.props.content}
   />
			</ComponentHeader>);
		}
	},

	/**
	 * Signup form or "Already registered" message as appropriate.
	 */
	getTBSignup() {
		if (!this.shouldShowTB()) {
			return <p>{this.props.content.alreadyTBRegistered}</p>;
		} else {
			return (<ComponentHeader
				title={this.props.content.telephonePinTitle}
				titleLevel={2}
				wrapperClass="form-spacing"
				subTitle={this.props.content.telephonePinSubTitle}
   >
			<TextQuestion
					name="telephonePin"
					inputType="password"
					group={group}
					onChange={AccountOpeningActions.updateFormValue}
					defaultValue={this.props.data.telephonePin}
					minLength={4}
					maxLength={4}
					validateType="telephonePin"
					dataAnchor="telephone-pin1"
					required
   >
					Telephone PIN
				</TextQuestion>
			<TextQuestion
					name="telephonePin2"
					inputType="password"
					group={group}
					onChange={AccountOpeningActions.updateFormValue}
					defaultValue={this.props.data.telephonePin2}
					minLength={4}
					maxLength={4}
					validateType="telephonePin"
					validateEqualTo={this.props.data.telephonePin}
					dataAnchor="telephone-pin2"
					required
   >
					Confirm telephone PIN
				</TextQuestion>
			</ComponentHeader>);
		}
	},

	/**
	 * Show T+Cs if either signup option has been offered.
	 */
	getTermsAndConditions() {
		if (this.shouldShowRib() || this.shouldShowTB() || this.shouldShowPassword()) {
			return (<ComponentHeader
				title={this.props.content.registrationTCsTitle}
				titleLevel={3}
				subTitle=" "
				hasSeparator
   >
				<p className="terms-and-conditions-checkbox">
					<a href={PathUtils.getPath(this.props.content.registrationTsAndCsDocLink) } aria-label={this.props.content.termsAndConditionsDocLinkTitle} title={this.props.content.termsAndConditionsDocLinkTitle} target="_blank">
						{this.props.content.registrationTsAndCsText}
						<span className="screenreader">{this.props.content.newBrowserWindowTitle}</span>
					</a> (Version{this.props.content.registrationTsAndCsDocVersion})
				</p>

				<div className="terms-and-conditions-checkbox">
			<CheckBoxQuestion
						defaultValue={this.props.data.registrationAcceptTCs}
						group={group}
						name="registrationAcceptTCs"
						dataAnchor="registration-terms-and-conditions"
						onChange={AccountOpeningActions.updateFormValue}
						required
   >
						{this.props.content.registrationAcceptTCs}
					</CheckBoxQuestion>
				</div>
			</ComponentHeader>);
		}
	},

	/**
	 * Signup form to set user's password
	 */
	getPasswordSignup() {
		if (this.shouldShowPassword()) {
			return (
			<ComponentHeader
				title={this.props.content.setPasswordTitle}
				titleLevel={2}
				wrapperClass="form-spacing"
   >
			<TextQuestion
					key="password1"
					name="password1"
					defaultValue={this.props.data.password1}
					group={group}
					label="Password"
					inputType="password"
					onChange={AccountOpeningActions.updateFormValue}
					dataAnchor="password"
					validateType="password"
					required
   >
					{this.props.content.password1Question}
				</TextQuestion>
			<TextQuestion
					key="password2"
					name="password2"
					defaultValue={this.props.data.password2}
					group={group}
					label="Password (confirm)"
					inputType="password"
					onChange={AccountOpeningActions.updateFormValue}
					dataAnchor="password-confirm"
					validateEqualTo={this.props.data.password1}
					required
   >
					{this.props.content.password2Question}
				</TextQuestion>
			</ComponentHeader>);
		}
	},
	/**
	 * User attempting to submit the form.
	 * Do we need to trigger an OTP popup?
	 *
	 * @param  {Event} e 	Click event.
	 */
	_onSubmitClick(e) {
		e.preventDefault();

		AnalyticsActionCreator.track({
			path: '/user/experience/activity',
			action: 'Interacted',
		}, {
				description: 'RegistrationSubmitted',
				event: 'created',
			});

		const submitForm = () => (publicKey, publicKeyDateTime) => {
			// Got key, need to send the user's answers now.
			AccountOpeningActions.submitRegistrationPage(publicKey, publicKeyDateTime, 'WEB-TIMELINE');
		};
		// Is this a form submission, or simply navigating?
		if (this.shouldShowRib() || this.shouldShowTB() || this.shouldShowPassword()) {
			const publicKey = this.props.session.genericPublicKey;
			const publicKeyDateTime = this.props.session.genericPublicKeyDatetime;

			// If we don't have a key get one and then submit the form
				if (!publicKey && !publicKeyDateTime) {
					SessionActionCreator.requestPublicKey(submitForm());
				}
			if (publicKey && publicKeyDateTime) {
				// Looks like we have a key so let's go ahead and submit
				submitForm()(publicKey, publicKeyDateTime);
			}
		} else {
			AccountOpeningActions.navigateToWebTask('WEB-TIMELINE');
		}
	},
	/**
	 * Should sign-up for RIB be offered?
	 *
	 * @return {Boolean}
	 */
	shouldShowRib() {
		return !!(this.props.data.credentials && !this.props.data.credentials['security_questions']);
	},

	/**
	 * Should sign-up for telephone banking be offered?
	 *
	 * @return {Boolean}
	 */
	shouldShowTB() {
		return !!(this.props.data.credentials && !this.props.data.credentials.acn);
	},

	/**
	 * Should sign-up for Password?
	 *
	 * @return {Boolean}
	 */
	shouldShowPassword() {
		return !!(this.props.data.credentials && !this.props.data.credentials.password);
	},

	render() {
		const checkedCredentials = !!this.props.data.credentials;
		// Illustration
		const errorMessage = <div role="alert" aria-live="assertive"><ErrorMessage text={this.getCredentialErrorMessage() } extraClasses="error padding-bottom"/></div>;

		return (
			<div className="authentication-page">
				<div className="account-opening container-fluid">
					<Helmet title={this.props.content.registrationPageHeader} />
					<PageHeader
						visible={BrandUtils.isAbleToDisplay('result-pages-header') }
						title={this.props.content.loginPageTitle}
						content={this.props.content}
					/>

					<div className="registration-page container" role="main">
						<div className="white-board">
							<SectionFullWidth>
								{checkedCredentials && this.getPasswordSignup() }
								{checkedCredentials && this.getRibSignup() }
								{checkedCredentials && this.getTBSignup() }
								{checkedCredentials && this.getTermsAndConditions() }
							</SectionFullWidth>

							{errorMessage}

							<BottomNavigationBox
								onClickNext={this._onSubmitClick}
								className="text-center"
								disabled={!ValidationUtils.isGroupValid(this.props.validations, group) || this.props.appData.isApiCallInProgress}
								dataAnchorNext="registration-next"
								nextButtonLabel="Proceed"
							/>
						</div>
					</div>
				</div>
			</div>
		);
	},
});

module.exports = AlternativeProductsContent(RegistrationPage);
