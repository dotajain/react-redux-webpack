/**
 * @module LandingPage
 */

const _ = require('lodash');
const React = require('react');
const { PropTypes } = React;

const moment = require('moment');

const CheckBoxQuestion = require('../common/questionsets/CheckBoxQuestion');
const ComponentHeader = require('../common/ComponentHeader');
const BottomNavigationBox = require('../common/BottomNavigationBox');
const RadioQuestion = require('../common/questionsets/RadioQuestion');
const PageHeader = require('../common/PageHeader');
const ProgressBar = require('./ProgressBar');
const SectionFullWidth = require('../common/SectionFullWidth');
const PageColumnWrapper = require('../common/PageColumnWrapper');
const SideBarColumnWrapper = require('../common/SideBarColumnWrapper');
const ContentProductWrapper = require('../common/ContentProductWrapper');

const AccountOpeningActions = require('../../actions/AccountOpeningActions');
const AnalyticsActionCreator = require('../../actions/AnalyticsActionCreator');

const AccountOpeningConstants = require('../../constants/AccountOpeningConstants');

const ValidationStore = require('../../stores/ValidationStore');

const ValidationUtils = require('../../utils/ValidationUtils');
const BrandUtils = require('../../utils/BrandUtils');
const PathUtils = require('../../utils/PathUtils');
const ProductUtils = require('../../utils/ProductUtils');
const ContentUtils = require('../../utils/ContentUtils');

const LandingPage = React.createClass({
	propTypes: {
		appData: PropTypes.object,
		data: PropTypes.object,
		validations: PropTypes.object,
		content: PropTypes.object,
		getProductContent: PropTypes.func.isRequired,
	},

	getInitialState() {
		return {};
	},

	componentDidMount() {
		// Record an analytics user event.
		AnalyticsActionCreator.track({
			path: '/user/experience/view',
			action: 'Appeared',
		}, {
			description: 'PageLoaded',
		});
	},

	onEligibilityTermsSubmit(name, value) {
		AnalyticsActionCreator.track({
			path: '/user/experience/activity',
			action: 'Interacted',
		}, {
			value,
			description: 'UserEligible',
			event: 'created',
		});

		AccountOpeningActions.updateFormValue(name, value);
	},

	/**
	 * User is proceeding to the next page.
	 * Save the eligibility questions they were asked, their answers, and the
	 * version of data protection info they were shown.
	 *
	 * @param  {Event} e
	 */
	onNextButtonClick() {
		// Can navigate immediately.
		AccountOpeningActions.recordTaskComplete('WEB-ELIGIBILITY-PAGE');
		AccountOpeningActions.navigateToWebTask('WEB-PERSONAL-DETAILS');

		const questions = ProductUtils.getEligibilityQuestions(this.props.data.productCode);
		const timestamp = moment().format();

		// Get each question text and its answer.
		const questionsAndAnswers = _.map(questions, q => {
			return {
				question: this.props.content[q],
				answer: this.props.data[q],
				consent: 'Y',
				timestamp,
			};
		});

		// Data protection info.
		const dataProtectionInfo = {
			version: this.props.content.dataProtectionDocVersion,
			consent: 'Y',
			timestamp: moment().format(),
		};

		const data = [
			{ key: 'eligibilityQuestions', value: questionsAndAnswers },
			{ key: 'dataProtection', value: dataProtectionInfo },
		];

		AccountOpeningActions.updateFormValues(data);

		// Eligibility Analytics
		AnalyticsActionCreator.track({
			path: '/user/experience/activity',
			action: 'Interacted',
		}, {
			description: 'UserProgressToNextPage',
			event: 'click',
		});
	},

	/** onClick handler for DownloadDataProtectionPDF. Record an analytics event. */
	ondataProtectionDocLinkClick() {
		AnalyticsActionCreator.track({
			path: '/user/experience/activity',
			action: 'Interacted',
		}, {
			description: 'DownloadDataProtectionPDF',
			event: 'click',
		});
	},

	/**
	 * Get a JSX element for each eligibility question.
	 *
	 * @return {Array} Of JSX elements.
	 */
	getEligibilityQuestionElements() {
		const questions = ProductUtils.getEligibilityQuestions(this.props.data.productCode);

		if (!questions) {
			return;
		}

		if (BrandUtils.isAbleToDisplay('eligibility-device-question') && _.indexOf(questions, 'eligibilityDeviceQuestion') === -1) {
			questions.push('eligibilityDeviceQuestion');
		}

		return _.map(questions, name => {
			return (
					<RadioQuestion
						align={BrandUtils.isAbleToDisplay('initial-questions-radio-buttons-right') ? 'right' : 'left'}
						defaultValue={this.props.data[name]}
						group={AccountOpeningConstants.GROUP_ELIGIBILITY}
						key={name}
						labelText={this.props.content[name]}
						mainColumnSize={BrandUtils.defaultColumnSize() === 12 ? 12 : 6}
						mainColumnSizeMD={BrandUtils.defaultColumnSize() === 12 ? 12 : 6}
						name={name}
						onChange={AccountOpeningActions.updateFormValue}
						options={[{ value: 'No' }, { value: 'Yes' }]}
						required
						validateEqualTo="Yes"
					/>
				);
		});
	},

	/**
	 * Get eligiblity etc. These wont be shown to invalid customers.
	 *
	 * @return {JSX} 		HTML etc. for the form elements.
	 */
	getEligibilityTermsAndSubmit() {
		let downloadPDF;
		let eligibilityTermsClosingText;

		const isEligible = this.isEligible(this.props.validations);
		const acceptedTsAndCs = ValidationUtils.isKeyValid(this.props.validations, AccountOpeningConstants.GROUP_TS_AND_CS, 'acceptTsAndCs');
		const canProceed = isEligible && acceptedTsAndCs && !this.props.appData.isApiCallInProgress;

		if (this.props.content.eligibilityTermsClosingText) {
			eligibilityTermsClosingText = <p>{this.props.content.eligibilityTermsClosingText}</p>;
		}

		if (this.props.content.dataProtectionDocLink) {
			downloadPDF = <p><a href={PathUtils.getPath(this.props.content.dataProtectionDocLink)} onClick={this.ondataProtectionDocLinkClick} className="btn btn-primary btn-lg btn-document-download" role="button" target="_blank" aria-label={this.props.content.dataProtectionDocLinkTitle} title={this.props.content.dataProtectionDocLinkTitle}>{this.props.content.dataProtectionDocDownloadLabel}<span className="screenreader">Download Personal Information Statement PDF. {this.props.content.newBrowserWindowTitle}</span></a></p>;
		}

		// Info to Apply
		const infoToApplyBullets = [];
		let bulletText;
		for (let i = 1; i <= 5; i++) {
			bulletText = this.props.getProductContent(`infoToApply${i}`);

			if (bulletText && bulletText.length > 0) {
				infoToApplyBullets.push(<li key={i}>{bulletText}</li>);
			}
		}

		// Terms and Conditions bullets
		const termsBullets = [];
		for (let j = 1; j <= 10; j++) {
			const termText = this.props.getProductContent(`eligibilityTerms${j}`);

			if (termText && termText.length > 0) {
				termsBullets.push(<li key={j} dangerouslySetInnerHTML={{ __html: termText }} />);
			}
		}

		// Info to apply footer text.
		const infoToApplyFooter = [];
		for (let k = 1; k <= 10; k++) {
			const footerText = this.props.content[`infoToApplyFooter${k}`];

			if (footerText && footerText.length > 0) {
				infoToApplyFooter.push(<p key={k}>{footerText}</p>);
			}
		}

		return (
			<div>
				{/* Eligibility Questions - Only shown when not yet valid. */}
				<SectionFullWidth>
					<ComponentHeader
						wrapperClass="initial-questions"
						titleLevel={2}
						hasSeparator
						title={this.props.content.initialQuestionsTitle}
						subTitle={this.props.content.initialQuestionsSubtitle}
					>
						{ContentUtils.getContentParagraphs('landingPageIntro', this.props.content, '', this.props.data.productCode)}
						{this.getEligibilityQuestionElements()}
						{this.props.getProductContent('landingPageQuestionsNote') && <p>{this.props.getProductContent('landingPageQuestionsNote')}</p>}
					</ComponentHeader>
				</SectionFullWidth>

				{/* Terms and Conditions */}
				<SectionFullWidth className="termsAndConditions">
					<ComponentHeader
						hasSeparator
						title={this.props.content.eligibilityTermsTitle}
						titleLevel={2}
					>
						<ul>
							{termsBullets}
						</ul>
						{eligibilityTermsClosingText}
						{downloadPDF}
						<div className="terms-and-conditions-checkbox">
							<CheckBoxQuestion
								defaultValue={!!this.props.data.acceptTsAndCs}
								group={AccountOpeningConstants.GROUP_TS_AND_CS}
								name="acceptTsAndCs"
								dataAnchor="terms-and-conditions"
								onChange={this.onEligibilityTermsSubmit}
								required
							>
								{this.props.content.acceptTsAndCs}
							</CheckBoxQuestion>
						</div>
					</ComponentHeader>
				</SectionFullWidth>

				{/* Info Needed to Apply */}
				<SectionFullWidth>
					<ComponentHeader title={this.props.content.infoToApplyTitle} hasSeparator titleLevel={2}>
						<p>{this.props.content.infoToApplyIntro}</p>
						<ul>
							{infoToApplyBullets}
						</ul>

						{infoToApplyFooter}
					</ComponentHeader>
				</SectionFullWidth>

				{/* "Next" button */}
				<SectionFullWidth>
					<BottomNavigationBox
						className="col-xs-12 start-application"
						onClickNext={this.onNextButtonClick}
						nextButtonLabel="Continue"
						disabled={!canProceed}
						dataAnchorNext="initial-questions-next"
						hasSeparator
					/>
				</SectionFullWidth>
			</div>
		);
	},

	/**
	 * Existing customers radio input
	 * @return {object} React Element
	 */
	getExistingCustomerQuestion() {
		return (
			<SectionFullWidth>
				<ComponentHeader title={this.props.content.existingCustomerTitle} hasSeparator titleLevel={2}>
					<RadioQuestion
						align={BrandUtils.isAbleToDisplay('initial-questions-radio-buttons-right') ? 'right' : 'left'}
						defaultValue={this.props.data.isExistingCustomer}
						group={AccountOpeningConstants.GROUP_ELIGIBILITY}
						labelText={this.props.content.isExistingCustomer}
						mainColumnSize={BrandUtils.defaultColumnSize() === 12 ? 12 : 5}
						mainColumnSizeMD={BrandUtils.defaultColumnSize() === 12 ? 12 : 6}
						name="isExistingCustomer"
						onChange={AccountOpeningActions.updateFormValue}
						options={[{ anchor: 'existing-customer-no', value: 'No' }, { anchor: 'existing-customer-yes', value: 'Yes' }]}
						required
						validateEqualTo="No"
					/>
				</ComponentHeader>
			</SectionFullWidth>
		);
	},

	/**
	 * Has the user correctly answered all eligibility questions?
	 *
	 * @param  {Object}  validations From the ValidationStore.
	 * @return {Boolean}             True if all valid.
	 */
	isEligible(validations) {
		return ValidationUtils.isGroupValid(validations, AccountOpeningConstants.GROUP_ELIGIBILITY);
	},

	render() {
		const hasExistingCustomerQuestion = Boolean(BrandUtils.isAbleToDisplay('existing-customer-question'));
		const isValidCustomer = ValidationStore.getValidation(AccountOpeningConstants.GROUP_ELIGIBILITY, 'isExistingCustomer');

		return (
			<div className="account-opening landing-page container-fluid">
				<PageHeader title={this.props.content.landingPageTitle + ProductUtils.getName(this.props.data.productCode)} content={this.props.content} />

				<div className="row main-container" content={this.props.content}>
					<PageColumnWrapper content={this.props.content}>
						{/* Progress Bar */}
						<SectionFullWidth>
							<ProgressBar timeRemaining={15} />
						</SectionFullWidth>

						{/* Existing Customer? */}
						{hasExistingCustomerQuestion && this.getExistingCustomerQuestion()}

						{isValidCustomer || !hasExistingCustomerQuestion ? this.getEligibilityTermsAndSubmit() : null}
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

module.exports = ContentProductWrapper(LandingPage);
