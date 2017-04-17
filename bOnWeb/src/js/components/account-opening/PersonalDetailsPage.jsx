/**
 * @module PersonalDetailsPage
 */

const _ = require('lodash');
const React = require('react');
const { PropTypes } = React;
const Helmet = require('react-helmet');
const config = require('../../config');
const envConfig = require('../../../static/config');

// Actions
const AccountOpeningActions = require('../../actions/AccountOpeningActions');
const AnalyticsActionCreator = require('../../actions/AnalyticsActionCreator');
const CredentialsActions = require('../../actions/CredentialsActions');
const SessionActionCreator = require('../../actions/SessionActionCreator');

// Constants
const AccountOpeningConstants = require('../../constants/AccountOpeningConstants');

// Utils
const ArrayUtils = require('../../utils/ArrayUtils');
const EncryptionUtils = require('../../utils/EncryptionUtils');
const BrandUtils = require('../../utils/BrandUtils');
const PathUtils = require('../../utils/PathUtils');
const RegexUtils = require('../../utils/RegexUtils');
const ValidationUtils = require('../../utils/ValidationUtils');
const ContentUtils = require('../../utils/ContentUtils');

// Components
const AddressSection = require('../account-opening/sections/AddressSection');
const MaritalStatus = require('../account-opening/sections/MaritalStatus');
const BottomNavigationBox = require('../common/BottomNavigationBox');
const ComponentHeader = require('../common/ComponentHeader');
const DropdownQuestion = require('../common/questionsets/DropdownQuestion');
const ErrorMessage = require('../common/ErrorMessage');
const ProgressBar = require('./ProgressBar');
const PageHeader = require('../common/PageHeader');
const RadioQuestion = require('../common/questionsets/RadioQuestion');
const ReadOnlyQuestion = require('../common/questionsets/ReadOnlyQuestion');
const ReadOnlyMessage = require('./ReadOnlyMessage');
const StaticParagraphQuestion = require('../common/questionsets/StaticParagraphQuestion');
const SectionFullWidth = require('../common/SectionFullWidth.jsx');
const TextQuestion = require('../common/questionsets/TextQuestion');
const {
	Title,
	FirstName,
	LastName,
	MiddleName,
	DateOfBirth,
	PhoneNumber,
	EmailAddress,
	Gender,
} = require('./personalDetails');


const PersonalDetailsFoundError = require('./findDetails/PersonalDetailsFoundError');

const PageColumnWrapper = require('../common/PageColumnWrapper');
const SideBarColumnWrapper = require('../common/SideBarColumnWrapper');

function getReadOnlyErrors(props, existingCustomerReadOnlyFields) {
	if (!props.validations) {
		return [];
	}

	return _(props.validations.GROUP_PAGE_1)
		.pick(existingCustomerReadOnlyFields)
		.pickBy(x => !x.isValid)
		.keys()
		.map(key => props.content[`${key}Question`] || key)
		.value();
}

const PersonalDetailsPage = React.createClass({
	propTypes: {
		appData: PropTypes.object,
		content: PropTypes.object.isRequired,
		data: PropTypes.object.isRequired,
		postcodeData: PropTypes.object,
		session: PropTypes.object,
		validations: PropTypes.object,
	},

	getInitialState() {
		return {
			isLoadingCredentials: false,
		};
	},
	/**
	 * Does the user need to set a password on this page?
	 */
	componentWillMount() {
		if (this.props.session && this.props.session.accessToken && this.props.data.bankID) {
			this.setState({
				isLoadingCredentials: true,
			});
				// State callbacks in componentWillMount do not run - https://github.com/facebook/react/issues/1740
			CredentialsActions.getCredentials();
		}
	},

	componentDidMount() {
		// Record an analytics user event.
		AnalyticsActionCreator.track({
			path: '/user/experience/view',
			action: 'Appeared',
		}, {
			description: 'PageLoaded',
		});

		// Is the user resuming a case? Save their work as they go.
		if (this.props.data.caseId) {
			AccountOpeningActions.startAutosaveTimer();
		}
	},

	/**
	 * Stores have changed. Is the user waiting on a submission to complete?
	 *
	 * @param  {Object} nextProps
	 */
	componentWillReceiveProps(nextProps) {
			// Have we fetched credentials now?
		if (this.state.isLoadingCredentials && !_.isUndefined(nextProps.data.credentials)) {
			this.setState({
				isLoadingCredentials: false,
			});
		}

			// Has the user just created a case successfully? Navigate them on.
		if (nextProps.data.caseId && !this.props.data.caseId) {
			AccountOpeningActions.navigateToWebTask('WEB-EMPLOYMENT-DETAILS');
		}

			// Has user just created an account? Log them in.
		if (!this.props.data.caseId && nextProps.data.caseId && nextProps.data.username && !this.props.session.authenticated) {
			setTimeout(() => {
				SessionActionCreator.logUserIn(nextProps.data.username, nextProps.data.password1);
			}, envConfig.autoLoginTimeout);
		}
	},

	onChange(name, value) {
		AccountOpeningActions.updateFormValue(name, value);
	},

	onDOBChange(name, value) {
		AnalyticsActionCreator.track({
			path: '/user/experience/activity',
			action: 'Interacted',
		}, {
			value,
			description: 'DOBSelected',
			event: (this.props.data[name] ? 'updated' : 'created'),
		});
		AccountOpeningActions.updateFormValue(name, value);
	},

	onEmailChange(name, value) {
		AnalyticsActionCreator.track({
			path: '/user/experience/activity',
			action: 'Interacted',
		}, {
			value,
			description: 'EmailAddressEntered',
			event: (this.props.data[name] ? 'updated' : 'created'),
		});
		AccountOpeningActions.updateFormValue(name, value);
	},

	onGenderChange(name, value) {
		if (!this.props.data.title) {
			return;
		}
		const isTitleGenderValid = this.isTitleGenderValid(this.props.data.title, value);

		AccountOpeningActions.updateValidation(AccountOpeningConstants.GROUP_PAGE_1, 'gender', isTitleGenderValid);
		isTitleGenderValid && AccountOpeningActions.updateFormValue(name, value);
	},

	/**
	 * Set the appropriate dependents number value
	 * (undefined if No, default 1 if Yes)
	 *
	 * @param  {String} name  Key of the "has dependents?" question
	 * @param  {String} value Yes/No
	 */
	onHasDependantsChange(key, value) {
		AccountOpeningActions.updateFormValues([
			{
				key,
				value,
			}, {
				key: 'dependants',
				value: (value === 'Yes') ? '1' : undefined,
			},
		]);
	},

	onHasMiddleNameChange(name, value) {
		const data = [{ key: name, value }];

		let analyticsEvent;

		// Clear the saved list if user now says they don't have one.
		if (value === 'No') {
			data.push({ key: 'middleName', value: undefined });
			analyticsEvent = 'deleted';
		} else {
			analyticsEvent = 'created';
		}

		AnalyticsActionCreator.track({
			path: '/user/experience/activity',
			action: 'Interacted',
		}, {
			value,
			description: 'MiddleNameSelected',
			event: analyticsEvent,
		});

		AccountOpeningActions.updateFormValues(data);
	},

	/**
	 * Onchange handler for phoneNumber
	 * This function will update the store value.
	 */
	onPhoneNumberChange(name, value) {
		const isValid = RegexUtils.isValid(value, RegexUtils.regexes.phone);
		if (isValid) {
			AnalyticsActionCreator.track({
				path: '/user/experience/activity',
				action: 'Interacted',
			}, {
				type: RegexUtils.isValid(value, RegexUtils.regexes.mobilePhone) ? 'MobilePhone' : 'HomePhone',
				value,
				description: 'PhoneNumberEntered',
				event: (this.props.data[name] ? 'updated' : 'created'),
			});
		}

		AccountOpeningActions.updateFormValue(name, value);
	},

	/**
	 * Onchange handler for preferredContactMethod
	 * This function will record analytics as well as update the store value.
	 */
	onPreferredContactMethodChange(name, value) {
		AnalyticsActionCreator.track({
			path: '/user/experience/activity',
			action: 'Interacted',
		}, {
			type: RegexUtils.isValid(value, RegexUtils.regexes.mobilePhone) ? 'MobilePhone' : 'HomePhone',
			value,
			description: 'ContactMethodsSelected',
			event: 'click',
		});
		AccountOpeningActions.updateFormValue(name, value);
	},

	/**
	 * User has decided to submit the page.
	 *
	 * @param  {Event} e 		Stop user from navigating until we find out if the submission
	 *					 		was successful or not.
	 */
	onSubmitPage(e) {
		e.preventDefault();

		AccountOpeningActions.recordTaskComplete('WEB-PERSONAL-DETAILS');

		if (this.props.data.isReviewing) {
			AccountOpeningActions.navigateToWebTask('WEB-REVIEW-DETAILS');
		} else if (this.props.data.caseId) {
			AccountOpeningActions.navigateToWebTask('WEB-EMPLOYMENT-DETAILS');
		} else {
			SessionActionCreator.requestPublicKey((publicKey, publicKeyDateTime) => {
				this.updateEncryptedPassword(publicKey, publicKeyDateTime);
				AccountOpeningActions.sendFormData();
			});
		}
	},

	onTitleChange(name, value) {
		AccountOpeningActions.updateFormValue(name, value);
		this.selectGenderFromTitle(value, config.validTitles);

		AnalyticsActionCreator.track({
			path: '/user/experience/activity',
			action: 'Interacted',
		}, {
			value,
			description: 'TitleEntered',
			event: (this.props.data[name] ? 'updated' : 'created'),
		});
	},

	/**
	 * show form guidance for existing customers
	 * @return {ReactElement}
	 */
	getGuidanceForExistingCustomers() {
		const readonlyErrors = this.getInvalidFieldLabels();
		if (!readonlyErrors || !readonlyErrors.length) {
			return (
					ContentUtils.getContentParagraphs('personalDetailsGuidance', this.props.content, 'padding-bottom')
				);
		}
	},

	/**
	 * fetch invalid field labels
	 * @return {array} List of invalid field labels
	 */
	getInvalidFieldLabels() {
		return getReadOnlyErrors(this.props, config.existingCustomerReadOnlyFields);
	},

	/**
	 * Middlename input field
	 * @return {ReactElement}
	 */
	getMiddleNameQuestion() {
		if (this.props.data.hasMiddleName === 'Yes') {
			return (
				<MiddleName
					group={AccountOpeningConstants.GROUP_PAGE_1}
					onChange={AccountOpeningActions.updateFormValue}
					defaultValue={this.props.data.middleName}
					label={this.props.content.middleNameQuestion}
					readOnly={this.props.data.isExistingCustomer}
					required
				/>
			);
		}
	},

	/**
	 * Label for the action button
	 * @return {String} Button label
	 */
	getNextButtonLabel() {
		const labelText = (this.props.data.isReviewing) ? 'Review' : 'Continue';
		return (this.props.appData.isApiCallInProgress) ? 'Submitting...' : labelText;
	},

	/**
	 * Dependants dropdown
	 * @return {ReactElement}
	 */
	getNumberOfDependantsQuestion() {
		if (this.props.data.hasDependants === 'Yes') {
			let data = _.map(ArrayUtils.getRange(1, 9), num => {
				return `${num}`;
			});

			return (
				<DropdownQuestion
					name="dependants"
					data={data}
					group={AccountOpeningConstants.GROUP_PAGE_1}
					onChange={AccountOpeningActions.updateFormValue}
					defaultValue={this.props.data.dependants}
					minLength={1}
					maxLength={1}
					dataAnchor="dependants"
				>
					Number of dependants
				</DropdownQuestion>
			);
		}
	},

	/**
	 * Password input field
	 * @return {ReactElement}
	 */
	getPasswordQuestion() {
		// If loading credentials, we don't know what fields to display yet.
		if (this.state.isLoadingCredentials) {
			return;
		}

		const passwordFields = [];
		const passwordAlreadySetLabel = 'Password';
		const isExistingCustomer = (this.props.data.isExistingCustomer === 'Yes') ? true : false;
		const isExistingRibCustomer = isExistingCustomer && this.props.data.isRibCustomer;

		if (!this.canEditPassword(isExistingCustomer, isExistingRibCustomer)) {
			passwordFields.push(
				<StaticParagraphQuestion
					key="passwordSet"
					label={passwordAlreadySetLabel}
					name="passwordAlreadySet"
					defaultValue="*******"
					className="credentials-disabled"
					required
				/>
			);
		} else {
			passwordFields.push(
				<TextQuestion
					key="password1"
					name="password1"
					defaultValue={this.props.data.password1}
					group={AccountOpeningConstants.GROUP_PAGE_1}
					label={passwordAlreadySetLabel}
					inputType="password"
					onChange={AccountOpeningActions.updateFormValue}
					dataAnchor="password"
					validateType="password"
					required
				>
					{this.props.content.password1Question}
				</TextQuestion>
			);

			passwordFields.push(
				<TextQuestion
					key="password2"
					name="password2"
					defaultValue={this.props.data.password2}
					group={AccountOpeningConstants.GROUP_PAGE_1}
					label="Password (confirm)"
					inputType="password"
					onChange={AccountOpeningActions.updateFormValue}
					dataAnchor="password-confirm"
					validateEqualTo={this.props.data.password1}
					required
				>
					{this.props.content.password2Question}
				</TextQuestion>
			);
		}

		if (isExistingCustomer) {
			passwordFields.push(
				<p key="passwordDisclaimer">{this.props.content.passwordDisclaimer}</p>
			);
		}

		return passwordFields;
	},

	/**
	 * Error is displayed when user details have been found
	 * @return {ReactElement} Error message
	 */
	getPersonaDetailsFoundError() {
		return (
			<PersonalDetailsFoundError
			{...this.props}
			/>
		);
	},

	/**
	 * Bank selection question
	 * @return {ReactElement}
	 */
	getSelectYourBankQuestion() {
		if (BrandUtils.isAbleToDisplay('select-your-bank-section')) {
			return (
				<SectionFullWidth>
					<ComponentHeader
						title={this.props.content.selectBankTitle}
						titleLevel={2}
						hasSeparator
						id="bank-question-title"
					>

						<p className="intro-paragraph">{this.props.content.selectBankSubtitle}
						</p>

						<p>
							<a href={this.props.content.selectBankHelpLinkCb} target="_blank" title={this.props.content.selectBankHelpLinkCbTitle}>{this.props.content.selectBankHelpLinkCbText} <span className="screenreader">{this.props.content.newBrowserWindowTitle}</span></a><br />
							<a href={this.props.content.selectBankHelpLinkYb} target="_blank" title={this.props.content.selectBankHelpLinkYbTitle}>{this.props.content.selectBankHelpLinkYbText} <span className="screenreader">{this.props.content.newBrowserWindowTitle}</span></a>
						</p>

						<RadioQuestion
							defaultValue={this.props.data.bankID}
							group={AccountOpeningConstants.GROUP_PAGE_1}
							name="bankID"
							labelText={this.props.content.selectBankQuestion}
							labelledBy="bank-question-title"
							helpText={this.props.content.selectBankHelpText}
							onChange={this.onChange}
							options={[{
								anchor: 'select-bank-cb',
								checkedImage: PathUtils.getPath('images/cb/bank-logo.png'),
								label: 'Clydesdale Bank',
								image: PathUtils.getPath('images/cb/bank-logo-grey.png'),
								value: 'CB',
							}, {
								anchor: 'select-bank-yb',
								checkedImage: PathUtils.getPath('images/yb/bank-logo.png'),
								label: 'Yorkshire Bank',
								image: PathUtils.getPath('images/yb/bank-logo-grey.png'),
								value: 'YB',
							}]}
							required
						/>
					</ComponentHeader>
				</SectionFullWidth>
			);
		}
	},

	/**
	 * Error is displayed when username is taken
	 * @return {ReactElement} Error message
	 */
	getUsernameIsTakenError() {
		if (this.props.data.usernameAlreadyInUse) {
			return <ErrorMessage text={this.props.content.usernameAlreadyInUseValidationMessage} extraClasses="taken-username help" />;
		}
	},

	/**
	 * username input field
	 *
	 * @return {ReactElement}
	 */
	getUsernameQuestion() {
		let usernameField;
		const usernameFieldLabel = 'Username';
		const isExistingCustomer = (this.props.data.isExistingCustomer === 'Yes') ? true : false;

		if (!this.canEditUsername(isExistingCustomer)) {
			usernameField = (<StaticParagraphQuestion
				label={usernameFieldLabel}
				name="username"
				defaultValue={this.props.data.username || '*****'}
				className="credentials-disabled"
				required
			/>);
		} else {
			usernameField = [<p key="username-intro" className="intro-paragraph">{this.props.content.usernameInfo}</p>];

			if (this.props.content.additionalUsernameInfo) {
				usernameField.push(<p key="username-intro-additional" className="intro-paragraph">{this.props.content.additionalUsernameInfo}</p>);
			}

			usernameField.push(<TextQuestion
				key="unsavedUsername"
				name="unsavedUsername"
				group={AccountOpeningConstants.GROUP_PAGE_1}
				onChange={AccountOpeningActions.updateFormValue}
				minLength={6}
				maxLength={16}
				dataAnchor="unsaved-username"
				validateType="ntbusername"
				required
			>
				{usernameFieldLabel}
			</TextQuestion>);
		}

		return usernameField;
	},

	/**
	 * Responsible for deciding it the password can be editd
	 *
	 * @param {Boolean} isExistingCustomer Define if we are working with an existing customer
	 * @param {Boolean} isExistingRibCustomer Define if we are working with an existing RIB customer
	 *
	 * @return {Boolean} True if password can be edited
	 */
	canEditPassword(isExistingCustomer, isExistingRibCustomer) {
		return !((this.props.data.credentials && this.props.data.credentials.password) || (isExistingCustomer && isExistingRibCustomer));
	},
	/**
	 * Responsible for deciding it the username can be editd
	 *
	 * @param {Boolean} isExistingCustomer Define if we are working with an existing customer
	 *
	 * @return {Boolean} True if username can be edited
	 */
	canEditUsername(isExistingCustomer) {
		return !(this.props.data.username || this.props.data.caseId || isExistingCustomer);
	},

	isTitleGenderValid(title, gender) {
		if (!title || !gender) {
			return true;
		}
		return _.findKey(config.validTitles, l => {
			return l.label.toUpperCase() === title.toUpperCase() && (l.gender === gender || l.gender === null);
		}) ? true : false;
	},

	selectGenderFromTitle(value, data) {
		const gender = _.result(_.find(data, { value }), 'gender');
		AccountOpeningActions.updateFormValue('gender', gender);
	},

	/**
	 * Take the current plaintext password and store the encrypted (and formatted) variant.
	 */
	updateEncryptedPassword(publicKey, datetime) {
		const formattedPassword = `${datetime}:${this.props.data.password1}`;
		const encPassword = EncryptionUtils.encrypt(publicKey, formattedPassword);
		AccountOpeningActions.updateFormValue('encryptedPassword', encPassword);
	},

	// Track when the user is ready to submit, but we needed to wait for a
	waitingToSendEncryptedData: false,

	render() {
		const isValid = ValidationUtils.isGroupValid(this.props.validations, AccountOpeningConstants.GROUP_PAGE_1);

		const isExistingCustomer = (this.props.data.isExistingCustomer === 'Yes') ? true : false;

		return (
			<div className="account-opening personal-details-page container-fluid">
				<Helmet title={this.props.content.personalDetailsPageHeader} />

				<PageHeader title={this.props.content.personalDetailsPageHeader} content={this.props.content} />

				<div className="row main-container">
					<PageColumnWrapper step={1} content={this.props.content}>
						{/* Progress Bar */}
						<SectionFullWidth>
							<ProgressBar step={0} timeRemaining={10} />
						</SectionFullWidth>

						{/* Personal Details */}
						<SectionFullWidth id="personal-details">
							<ComponentHeader
								title={this.props.content.personalDetailsTitle}
								titleLevel={2}
								subTitle={this.props.content.personalDetailsSubtitle}
								hasSeparator
							>

								{isExistingCustomer && this.getGuidanceForExistingCustomers()}

								{isExistingCustomer && <ReadOnlyMessage
									content={this.props.content}
									bulletPoints={this.getInvalidFieldLabels()}
									group={AccountOpeningConstants.GROUP_PAGE_1}
								/>}

								<Title
									name="title"
									group={AccountOpeningConstants.GROUP_PAGE_1}
									onChange={this.onTitleChange}
									dataAnchor="title"
									defaultValue={this.props.data.title}
									label={this.props.content.titleQuestion}
									data={config.validTitles}
									readOnly={this.props.data.isExistingCustomer}
									required
								/>

								<FirstName
									group={AccountOpeningConstants.GROUP_PAGE_1}
									onChange={this.onChange}
									defaultValue={this.props.data.firstName}
									label={this.props.content.firstNameQuestion}
									readOnly={this.props.data.isExistingCustomer}
									required
								/>

								<ReadOnlyQuestion readOnly={this.props.data.isExistingCustomer}>
									<RadioQuestion
										defaultValue={this.props.data.hasMiddleName}
										group={AccountOpeningConstants.GROUP_PAGE_1}
										labelText={this.props.content.hasMiddleNameQuestion}
										name="hasMiddleName"
										onChange={this.onHasMiddleNameChange}
										options={[{
											anchor: 'middle-name-no',
											value: 'No',
										}, {
											anchor: 'middle-name-yes',
											value: 'Yes',
										}]}
										required
										visible={!this.props.data.isExistingCustomer}
									/>
								</ReadOnlyQuestion>

								{this.getMiddleNameQuestion()}

								<LastName
									group={AccountOpeningConstants.GROUP_PAGE_1}
									onChange={this.onChange}
									defaultValue={this.props.data.lastName}
									label={this.props.content.lastNameQuestion}
									readOnly={this.props.data.isExistingCustomer}
									required
								/>

								<DateOfBirth
									group={AccountOpeningConstants.GROUP_PAGE_1}
									onChange={this.onDOBChange}
									defaultValue={this.props.data.dateOfBirth}
									label={this.props.content.dateOfBirthQuestion}
									readOnly={this.props.data.isExistingCustomer}
									required
									{...this.props}
								/>

								<Gender
									name="gender"
									group={AccountOpeningConstants.GROUP_PAGE_1}
									onChange={this.onGenderChange}
									dataAnchor="gender"
									defaultValue={this.props.data.gender}
									label={this.props.content.genderQuestion}
									data={['Male', 'Female']}
									readOnly={this.props.data.isExistingCustomer}
									required
								/>

								<MaritalStatus
									data={this.props.data}
									content={this.props.content}
								/>

								<RadioQuestion
									defaultValue={this.props.data.hasDependants}
									group={AccountOpeningConstants.GROUP_PAGE_1}
									labelText={this.props.content.hasDependantsQuestion}
									name="hasDependants"
									onChange={this.onHasDependantsChange}
									options={[{
										anchor: 'dependents-no',
										value: 'No',
									}, {
										anchor: 'dependents-yes',
										value: 'Yes',
									}]}
									required
								/>

								{this.getNumberOfDependantsQuestion()}

							</ComponentHeader>
						</SectionFullWidth>

						{/* Current Address */}
						<SectionFullWidth>
								<AddressSection
									appData={this.props.appData}
									name="addresses"
									arrayName={'addresses'}
									group={AccountOpeningConstants.GROUP_PAGE_1}
									content={this.props.content}
									addressList={this.props.data.addresses}
									residentialStatus={this.props.data.residentialStatus}
									postcodeData={this.props.postcodeData}
									validations={this.props.validations}
									isExistingCustomer={this.props.data.isExistingCustomer === 'Yes'}
									validateAfterDate={this.props.data.dateOfBirth}
								/>
						</SectionFullWidth>

						{/* Contact Details */}
						<SectionFullWidth id="contact-details">
							<ComponentHeader
								title={this.props.content.contactDetailsTitle}
								titleLevel={2}
								hasSeparator
							>

								<p className="intro-paragraph">{this.props.content.contactDetailsIntro}</p>

								<PhoneNumber
									group={AccountOpeningConstants.GROUP_PAGE_1}
									onChange={this.onPhoneNumberChange}
									defaultValue={this.props.data.phoneNumber}
									label={this.props.content.phoneNumberQuestion}
									readOnly={this.props.data.isExistingCustomer}
									required
								/>

								<EmailAddress
									group={AccountOpeningConstants.GROUP_PAGE_1}
									onChange={this.onEmailChange}
									defaultValue={this.props.data.emailAddress}
									label={this.props.content.emailAddressQuestion}
									readOnly={this.props.data.isExistingCustomer}
									required
								/>

								<EmailAddress
									name="emailAddressConfirmation"
									group={AccountOpeningConstants.GROUP_PAGE_1}
									onChange={this.onChange}
									defaultValue={this.props.data.emailAddressConfirmation}
									label={this.props.content.emailAddressConfirmationQuestion}
									readOnly={this.props.data.isExistingCustomer}
									dataAnchor="confirm-email-address"
									required
								/>

							</ComponentHeader>
						</SectionFullWidth>

						{/* Preferred Contact Method */}
						<SectionFullWidth>
							<ComponentHeader
								title={this.props.content.contactMethodTitle}
								titleLevel={2}
								hasSeparator
							>

								<p className="intro-paragraph">{this.props.content.contactMethodIntro}</p>

								<DropdownQuestion
									name="preferredContactMethod"
									group={AccountOpeningConstants.GROUP_PAGE_1}
									data={config.formOptionsPreferredContactMethod}
									onChange={this.onPreferredContactMethodChange}
									defaultValue={this.props.data.preferredContactMethod}
									dataAnchor="preferred-contact-method"
									required
								>
									{this.props.content.preferredContactMethodQuestion}
								</DropdownQuestion>
							</ComponentHeader>
						</SectionFullWidth>

					{/* Select Your Bank */}
					{!isExistingCustomer && this.getSelectYourBankQuestion()}

						{/* Username + Password section */}
						<SectionFullWidth>
							<ComponentHeader
								title={this.props.content.setPasswordTitle}
								titleLevel={2}
								hasSeparator
							>

								{this.getUsernameQuestion()}
								<div className="row" role="alert" aria-live="assertive">
									{this.getUsernameIsTakenError()}
								</div>

								{this.getPasswordQuestion()}

								{this.props.content.passwordLastWarning ? <p className="security-info">{this.props.content.passwordLastWarning}</p> : false}

							</ComponentHeader>
						</SectionFullWidth>

						{this.getPersonaDetailsFoundError()}

						{/* Continue Application */}
						<SectionFullWidth>
							<BottomNavigationBox
								onClickNext={this.onSubmitPage}
								disabled={!isValid || this.props.appData.isApiCallInProgress}
								nextButtonLabel={this.getNextButtonLabel()}
								backTaskId="WEB-ELIGIBILITY-PAGE"
								dataAnchorNext="personal-details-next"
							/>
						</SectionFullWidth>
					</PageColumnWrapper>

					<SideBarColumnWrapper
						appData={this.props.appData}
						content={this.props.content}
					/>
				</div>
			</div>
		);
	},
});

module.exports = PersonalDetailsPage;
