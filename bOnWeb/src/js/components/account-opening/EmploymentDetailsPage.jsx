/**
 * @module EmploymentDetailsPage
 */

const React = require('react');
const { PropTypes } = React;
const Helmet = require('react-helmet');

const AccountOpeningConstants = require('../../constants/AccountOpeningConstants');

const ValidationUtils = require('../../utils/ValidationUtils');

const TaxObligationsComponent = require('./employment/TaxObligationsComponent');
const Nationality = require('./employment/Nationality');
const { SavingsAccount, CurrentAccount } = require('./accounts');
const EmploymentSection = require('../account-opening/sections/EmploymentSection');

const PageHeader = require('../common/PageHeader');
const BottomNavigationBox = require('../common/BottomNavigationBox');
const ProgressBar = require('./ProgressBar');
const AccountOpeningActions = require('../../actions/AccountOpeningActions');
const SectionFullWidth = require('../common/SectionFullWidth.jsx');
const PageColumnWrapper = require('../common/PageColumnWrapper');
const SideBarColumnWrapper = require('../common/SideBarColumnWrapper');

const AnalyticsActionCreator = require('../../actions/AnalyticsActionCreator');

const accountToUiMap = {
	'current': CurrentAccount,
	'savings': SavingsAccount,
};

const EmploymentDetailsPage = React.createClass({
	propTypes: {
		appData: PropTypes.object,
		data: PropTypes.object,
		validations: PropTypes.object,
		content: PropTypes.object,
		session: PropTypes.object,
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

	/**
	 * On change handler for country born question. Analytics purposes.
	 * @param  {string} name  the name of question
	 * @param  {string} value the value selected
	 */
	onCountryBornChange(name, value) {
		// Record an analytics user event.
		AnalyticsActionCreator.track({
			path: '/user/experience/activity',
			action: 'Interacted',
		}, {
			value,
			description: 'CountryBornSelected',
			event: (this.props.data[name] ? 'updated' : 'created'),
		});

		AccountOpeningActions.updateFormValue(name, value);
	},

	/**
	 * On change handler for additional citizenship question. Is the answer yes? If so then
	 * render in the additional citizen ship questions.
	 * @param  {string} name  the name of question
	 * @param  {string} value the value selected
	 */
	onHasAdditionalCitizenshipsChange(name, value) {
		const data = [{ key: name, value }];

		// Clear the saved list if user now says they don't have one.
		if (value === 'No') {
			data.push({ key: 'citizenshipList', value: undefined });
		}

		AccountOpeningActions.updateFormValues(data);
	},


	/**
	 * On change handler for nationality question. Analytics purposes.
	 * @param  {string} name  the name of question
	 * @param  {string} value the value selected
	 */
	onNationalityChange(name, value) {
		// Record an analytics user event.
		if (value !== 'United Kingdom') {
			AnalyticsActionCreator.track({
				path: '/user/experience/activity',
				action: 'Interacted',
			}, {
				value,
				description: 'NonUKNationalitySelected',
				event: (this.props.data[name] ? 'updated' : 'created'),
			});
		}

		AccountOpeningActions.updateFormValue(name, value);
	},

	onNationalitySectionChange(key, value) {
		const dispatchMap = {
			nationality: this.onNationalityChange,
			hasAdditionalCitizenships: this.onHasAdditionalCitizenshipsChange,
			countryBorn: this.onCountryBornChange,
		};

		const dispatch = dispatchMap[key] || AccountOpeningActions.updateFormValue;

		dispatch(key, value);
	},

	/**
	 * User has submitted the page.
	 *
	 */
    onSubmitPage() {
		AccountOpeningActions.recordTaskComplete('WEB-EMPLOYMENT-DETAILS');
		AccountOpeningActions.sendFormData();
		AccountOpeningActions.navigateToWebTask('WEB-REVIEW-DETAILS');
	},

	render() {
		const isLoggedIn = !!(this.props.session && this.props.session.accessToken);
		const isValid = ValidationUtils.isGroupValid(this.props.validations, AccountOpeningConstants.GROUP_PAGE_2);

		const getProductType = () => this.props.data.product && this.props.data.product.productType && this.props.data.product.productType || {};

		const AccountType = accountToUiMap[getProductType().name] || (() => (<noscript />));

		return (
			<div className="account-opening employment-details-page container-fluid">
				<Helmet title={this.props.content.employmentDetailsHeader} />
				<PageHeader title={this.props.content.employmentDetailsTitle} content={this.props.content} />

				<div className="row main-container">
					<PageColumnWrapper step={2} content={this.props.content}>
						<SectionFullWidth>
							<ProgressBar step={1} timeRemaining={5} />
						</SectionFullWidth>

						<SectionFullWidth id="employment-details">
							<EmploymentSection
								group={AccountOpeningConstants.GROUP_PAGE_2}
								{...this.props}
							/>
						</SectionFullWidth>

						<SectionFullWidth id="nationality-details">
							<Nationality
								group={AccountOpeningConstants.GROUP_PAGE_2}
								onChange={this.onNationalitySectionChange}
								{...this.props}
							/>
						</SectionFullWidth>

						<SectionFullWidth id="tax-details">
							<TaxObligationsComponent
								group={AccountOpeningConstants.GROUP_PAGE_2}
								{...this.props}
							/>
						</SectionFullWidth>

						<AccountType
							group={AccountOpeningConstants.GROUP_PAGE_2}
							{...this.props}
						/>

						{/* Back and Review Buttons to continue application */}
						<SectionFullWidth>

							<BottomNavigationBox
								onClickNext={this.onSubmitPage}
								disabled={!isValid || this.props.appData.isApiCallInProgress || !isLoggedIn}
								nextButtonLabel="Review"
								dataAnchorNext="employment-details-next"
								backTaskId="WEB-PERSONAL-DETAILS"
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

module.exports = EmploymentDetailsPage;
