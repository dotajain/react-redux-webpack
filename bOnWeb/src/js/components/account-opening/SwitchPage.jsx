/**
 * @module SwitchPage
 */

const React = require('react');
const { PropTypes } = React;
const Helmet = require('react-helmet');
const _ = require('lodash');
const envConfig = require('../../../static/config');

const AccountOpeningActions = require('../../actions/AccountOpeningActions');
const AnalyticsActionCreator = require('../../actions/AnalyticsActionCreator');

const BottomNavigationBox = require('../common/BottomNavigationBox');
const CheckBoxQuestion = require('../common/questionsets/CheckBoxQuestion');
const ComponentHeader = require('../common/ComponentHeader');
const DatePickerQuestion = require('../common/questionsets/DatePickerQuestion');
const ErrorMessage = require('../common/ErrorMessage');
const RadioQuestion = require('../common/questionsets/RadioQuestion');
const ResultSection = require('../common/sections/ResultSection');
const TextQuestion = require('../common/questionsets/TextQuestion');
const PageHeader = require('../common/PageHeader');
const AlternativeProductsContent = require('../common/AlternativeProductsContent');

const AccountOpeningConstants = require('../../constants/AccountOpeningConstants');

const ValidationUtils = require('../../utils/ValidationUtils');
const ScreenshotUtils = require('../../utils/ScreenshotUtils');
const BrandUtils = require('../../utils/BrandUtils');
const PathUtils = require('../../utils/PathUtils');

const _fullSwitch = 'Full switch';
const _paymentsSwitch = 'Payment transfer';

const SwitchPage = React.createClass({

	propTypes: {
		appData: PropTypes.object,
		data: PropTypes.object,
		validations: PropTypes.object,
		content: PropTypes.object,
		selectContentBasedOnDowngrade: PropTypes.func,
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

	componentDidUpdate() {
		// Has a switch API call been successful?
		if (this.props.data.isSwitchApplicationSuccessful) {
			AccountOpeningActions.navigateToWebTask('WEB-ACCOUNT-OPENED');
		}
	},

	/**
	 * User has submitted a switching application.
	 *
	 * @param  {Event} e
	 */
	onSubmitPage(e) {
		// Don't go anywhere until we've taken a screen shot.
		e.preventDefault();

		// Do they want to switch?
		if (this.props.data.wantsToSwitch === 'Yes') {
			// Take a screen shot
			ScreenshotUtils.takeScreenshot(() => {
				AccountOpeningActions.submitSwitchingApplication();
			}, this.props.data.caseId);
		} else {
			AccountOpeningActions.navigateToWebTask('WEB-ACCOUNT-OPENED');
		}

		// Register submission with analytics
		AnalyticsActionCreator.track({
			path: '/user/experience/activity',
			action: 'Interacted',
		}, {
			value: this.props.data.wantsToSwitch,
			description: 'SwitchOption',
			event: 'created',
		});
	},

	/**
	 * Input fields common to any switch type.
	 *
	 * @return {JSX} JSX elements.
	 */
	getCommonSwitchFields() {
		return (
			<ComponentHeader
				title={this.props.selectContentBasedOnDowngrade('switchDetailsTitle')}
				titleLevel={3}
				hasSeparator
			>
				<TextQuestion
					name="switchAccountName"
					group={AccountOpeningConstants.GROUP_SWITCH}
					onChange={AccountOpeningActions.updateFormValue}
					defaultValue={this.props.data.switchAccountName}
					minLength={1}
					maxLength={18}
					dataAnchor="switch-account-name"
					validateType="accountName"
					required
				>
					Account Name
				</TextQuestion>

				<TextQuestion
					name="switchAccountNumber"
					group={AccountOpeningConstants.GROUP_SWITCH}
					onChange={AccountOpeningActions.updateFormValue}
					defaultValue={this.props.data.switchAccountNumber}
					minLength={8}
					maxLength={8}
					dataAnchor="switch-account-number"
					validateType="number"
					required
				>
					Account Number
				</TextQuestion>

				<TextQuestion
					name="switchSortCode"
					group={AccountOpeningConstants.GROUP_SWITCH}
					onChange={AccountOpeningActions.updateFormValue}
					defaultValue={this.props.data.switchSortCode}
					minLength={6}
					maxLength={6}
					dataAnchor="switch-sort-code"
					validateType="number"
					required
				>
					Sort Code
				</TextQuestion>

				<RadioQuestion
					defaultValue={this.props.data.switchHasDebitCard}
					group={AccountOpeningConstants.GROUP_SWITCH}
					labelText="Do you have a debit card on this account?"
					name="switchHasDebitCard"
					onChange={AccountOpeningActions.updateFormValue}
					options={[{
						anchor: 'switch-has-debit-card-no',
						value: 'No',
					}, {
						anchor: 'switch-has-debit-card-yes',
						value: 'Yes',
					}]}
					required
				/>

				{this.props.data.switchHasDebitCard === 'Yes' ? this.getDebitCardFields() : undefined}
			</ComponentHeader>
		);
	},

	/**
	 * Input fields for debit card info.
	 *
	 * @return {Array} JSX elements.
	 */
	getDebitCardFields() {
		const result = [];

		result.push(<TextQuestion
			name="switchDebitCardPan"
			key="switchDebitCardPan"
			group={AccountOpeningConstants.GROUP_SWITCH}
			onChange={AccountOpeningActions.updateFormValue}
			defaultValue={this.props.data.switchDebitCardPan}
			minLength={16}
			maxLength={19}
			dataAnchor="switch-debit-pan"
			validateType="debitCardPan"
			maskValueOnBlur
			required
		>
			{this.props.selectContentBasedOnDowngrade('switchDebitCardPanLabel')}
		</TextQuestion>);

		result.push(<TextQuestion
			name="switchDebitCardExpiration"
			key="switchDebitCardExpiration"
			group={AccountOpeningConstants.GROUP_SWITCH}
			onChange={AccountOpeningActions.updateFormValue}
			defaultValue={this.props.data.switchDebitCardExpiration}
			minLength={4}
			maxLength={4}
			dataAnchor="switch-debit-expiration"
			validateType="expirationDate"
			validateExpirationDate
			required
		>
			Expiration Date (mmyy)
		</TextQuestion>);

		return result;
	},

	/**
	 * Get the user-friendly error message corresponding to a particular switch status code.
	 *
	 * @param  {String} statusCode 		Code from API.
	 * @return {String}            		Falls back to a default if no specific code was found.
	 */
	getErrorMessage(statusCode) {
		return this.props.content[`switchCode${statusCode}`] || this.props.content.switchCodeDefault;
	},

	/**
	 * Input fields for a full switch.
	 */
	getFullSwitchFields() {
		return (
			<div>
				{this.getCommonSwitchFields()}

				<DatePickerQuestion
					name="switchDate"
					key="switchDate"
					group={AccountOpeningConstants.GROUP_SWITCH}
					onChange={this._onDatePickerChange}
					defaultValue={this.props.data.switchDate}
					dataAnchor="switch-date"
					viewMode="days"
					validateWorkingDaysFromToday="7-90"
					required
				>
					Switch Date
				</DatePickerQuestion>

				<p className="padding-bottom">{this.props.content.switchDateGuidance}</p>

				<div className="terms-and-conditions-checkbox" key="switchCloseOldAccountParagraph">
					<CheckBoxQuestion
						defaultValue={this.props.data.switchCloseOldAccount}
						group={AccountOpeningConstants.GROUP_SWITCH}
						name="switchCloseOldAccount"
						dataAnchor="switch-close-old-account"
						onChange={AccountOpeningActions.updateFormValue}
						required
					>
						{this.props.content.switchCloseOldAccount}
					</CheckBoxQuestion>
				</div>

				<p className="terms-and-conditions-checkbox" key="termsDocLink">
					<a href={PathUtils.getPath(this.props.content.switchFullTsAndCsDocLink)} aria-label={this.props.content.switchFullTsAndCsDocLinkTitle} target="_blank" title={this.props.content.switchFullTsAndCsDocLinkTitle}>{this.props.content.switchFullTsAndCsText} <span className="screenreader">{this.props.content.newBrowserWindowTitle}</span></a> (Version {this.props.content.switchFullTsAndCsDocVersion})
				</p>

				<div className="terms-and-conditions-checkbox" key="switchAcceptFullTCsDiv">
					<CheckBoxQuestion
						defaultValue={this.props.data.switchAcceptFullTCs}
						group={AccountOpeningConstants.GROUP_SWITCH}
						name="switchAcceptFullTCs"
						dataAnchor="switch-accept-full-tcs"
						onChange={AccountOpeningActions.updateFormValue}
						required
					>
						{this.props.content.switchAcceptFullTCs}
					</CheckBoxQuestion>
				</div>
			</div>
		);
	},

	/**
	 * Input fields for a payments-only switch.
	 */
	getPaymentSwitchFields() {
		return (
			<div>
				{this.getCommonSwitchFields()}

				<p className="terms-and-conditions-checkbox" key="termsDocLink">
					<a href={PathUtils.getPath(this.props.content.switchPaymentsTsAndCsDocLink)} aria-label={this.props.content.switchPaymentsTsAndCsDocLinkTitle} target="_blank" title={this.props.content.switchPaymentsTsAndCsDocLinkTitle}>{this.props.content.switchPaymentsTsAndCsText} <span className="screenreader">{this.props.content.newBrowserWindowTitle}</span></a> (Version {this.props.content.switchPaymentsTsAndCsDocVersion})
				</p>

				<div className="terms-and-conditions-checkbox" key="switchAcceptPaymentsTCsDiv">
					<CheckBoxQuestion
						defaultValue={this.props.data.switchAcceptPaymentsTCs}
						group={AccountOpeningConstants.GROUP_SWITCH}
						name="switchAcceptPaymentsTCs"
						dataAnchor="switch-accept-payments-tcs"
						onChange={AccountOpeningActions.updateFormValue}
						required
					>
						{this.props.content.switchAcceptPaymentsTCs}
					</CheckBoxQuestion>
				</div>
			</div>
		);
	},

	/**
	 * Input fields specific to the type of switch.
	 *
	 * @return {JSX} JSX elements.
	 */
	getSwitchTypeFields() {
		return (
			<ComponentHeader
				title={this.props.selectContentBasedOnDowngrade('switchTypeTitle')}
				titleLevel={3}
				hasSeparator
				wrapperClass="switch-type-section"
			>
				<p>{this.props.selectContentBasedOnDowngrade('switchTypeFullSwitch')}</p>
				<p>{this.props.selectContentBasedOnDowngrade('switchTypePaymentSwitch')}</p>

				<RadioQuestion
					align="center"
					defaultValue={this.props.data.switchType}
					group={AccountOpeningConstants.GROUP_SWITCH}
					labelText={this.props.selectContentBasedOnDowngrade('switchTypeTitle')}
					name="switchType"
					onChange={AccountOpeningActions.updateFormValue}
					options={[{
						anchor: 'switch-type-full',
						value: _fullSwitch,
					}, {
						anchor: 'switch-type-payment',
						value: _paymentsSwitch,
					}]}
					required
				/>

				{this.props.data.switchType === _fullSwitch && this.getFullSwitchFields()}
				{this.props.data.switchType === _paymentsSwitch && this.getPaymentSwitchFields()}
			</ComponentHeader>
		);
	},

	/**
	 * method for error message after invalid date entered for switch account
	 * and remove error message when date onChange occurs
	 * @param  {String} key   Changed key
	 * @param  {String} value Changed value
	 */
	_onDatePickerChange(key, value) {
		AccountOpeningActions.updateFormValues([
			{ key: 'switchApplicationErrorCode', value: undefined },
			{ key, value },
		]);
	},

	render() {
		// Is there an API error to show?
		let switchStatusErrorMessage;
		if (!_.isUndefined(this.props.data.switchApplicationErrorCode)) {
			switchStatusErrorMessage = <div role="alert" className="row" aria-live="assertive"><ErrorMessage text={this.getErrorMessage(this.props.data.switchApplicationErrorCode)} /></div>;
		}

		const bankId = this.props.data.isAltProduct ? this.props.data.bankID : envConfig.bankId;
		const bankNameRegexConfig = {
			regex: /{bankName}/,
			text: this.props.content.bankNames[bankId],
		};

		return (
		<div className="account-opening result-page-wrapper switch-page-wrapper container-fluid">
			<Helmet title={this.props.content.switchPageHeader} />
			<PageHeader visible={BrandUtils.isAbleToDisplay('result-pages-header')}
						title={this.props.selectContentBasedOnDowngrade('switchPageTitle')}
						content={this.props.content}
			/>
			<div className="result-page switch-page white-board" role="main">
				<ResultSection
					imgSrc={BrandUtils.getResultImage('switch-page-with-image', 'switch-illustration.png')}
					imgAlt="Switch your Current Account"
					title={this.props.selectContentBasedOnDowngrade('switchPageTitle')}
					titleLevel={1}
					titleClass="h2-style"
				>

					<div className="switch-content">
						{this.props.content.switchPageHeadingOptional1 && !this.props.data.isAltProduct ? <h2 className="h3-style">{this.props.content.switchPageHeadingOptional1}</h2> : false}
						<div className="switch-guarantee-logo-container">
							<img className="switch-guarantee-logo" src={PathUtils.getPath('images/common/switch-guarantee-logo.png')} alt="Current account switch guarantee" title="Current account switch guarantee" />
						</div>
						{this.props.selectContentBasedOnDowngrade('switchPageText1') && <p dangerouslySetInnerHTML={{ __html: this.props.selectContentBasedOnDowngrade('switchPageText1') }} />}
						{this.props.content.switchPageHeadingOptional2 && !this.props.data.isAltProduct ? <h2 className="h3-style">{this.props.content.switchPageHeadingOptional2}</h2> : false}
						{this.props.selectContentBasedOnDowngrade('switchPageText2') && <p dangerouslySetInnerHTML={{ __html: this.props.selectContentBasedOnDowngrade('switchPageText2') }} />}
						{this.props.content.switchPageHeadingOptional3 && !this.props.data.isAltProduct ? <h2 className="h3-style">{this.props.content.switchPageHeadingOptional3}</h2> : false}
						{this.props.selectContentBasedOnDowngrade('switchPageText3') && <p dangerouslySetInnerHTML={{ __html: this.props.selectContentBasedOnDowngrade('switchPageText3', bankNameRegexConfig) }} />}
						{this.props.content.switchPageHeadingOptional4 && !this.props.data.isAltProduct ? <h2 className="h3-style">{this.props.content.switchPageHeadingOptional4}</h2> : false}
						{this.props.selectContentBasedOnDowngrade('switchPageText4') && <p dangerouslySetInnerHTML={{ __html: this.props.selectContentBasedOnDowngrade('switchPageText4') }} />}
						{this.props.selectContentBasedOnDowngrade('switchPageText5') && <p dangerouslySetInnerHTML={{ __html: this.props.selectContentBasedOnDowngrade('switchPageText5') }} />}
					</div>
				</ResultSection>

				<RadioQuestion
					align="center"
					defaultValue={this.props.data.wantsToSwitch}
					group={AccountOpeningConstants.GROUP_SWITCH}
					labelText={this.props.selectContentBasedOnDowngrade('wantsToSwitch')}
					name="wantsToSwitch"
					onChange={AccountOpeningActions.updateFormValue}
					options={[{
						anchor: 'wants-to-switch-no',
						value: 'No',
					}, {
						anchor: 'wants-to-switch-yes',
						value: 'Yes',
					}]}
					required
				/>

				{this.props.data.wantsToSwitch === 'Yes' ? this.getSwitchTypeFields() : undefined}

				{switchStatusErrorMessage}

				<BottomNavigationBox
					className="text-center margin-bottom"
					onClickNext={this.onSubmitPage}
					disabled={!ValidationUtils.isGroupValid(this.props.validations, AccountOpeningConstants.GROUP_SWITCH) || this.props.appData.isApiCallInProgress}
					dataAnchorNext="switch-next"
					nextButtonLabel="Proceed"
				/>
			</div>
		</div>
		);
	},
});

module.exports = AlternativeProductsContent(SwitchPage);
