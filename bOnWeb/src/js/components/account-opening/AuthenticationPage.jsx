/**
 * @module AuthenticationPage
 */

const React = require('react');
const Helmet = require('react-helmet');
const PropTypes = React.PropTypes;
const envConfig = require('../../../static/config');

const PageHeader = require('../common/PageHeader');
const PageColumnWrapper = require('../common/PageColumnWrapper');
const SideBarColumnWrapper = require('../common/SideBarColumnWrapper');
const RadioQuestion = require('../common/questionsets/RadioQuestion');
const SectionCentered = require('../common/SectionCentered');

const LoginComponent = require('./login/LoginComponent');
const FindDetailsComponent = require('./findDetails/FindDetailsComponent');

const AccountOpeningActions = require('../../actions/AccountOpeningActions');
const CustomerActions = require('../../actions/CustomerActions');

const CustomerStore = require('../../stores/CustomerStore');
const SessionStore = require('../../stores/SessionStore');
const AccountOpeningConstants = require('../../constants/AccountOpeningConstants');
const { GROUP_EXISTING_CUSTOMER: groupExistingCustomer } = AccountOpeningConstants;

const BrandUtils = require('../../utils/BrandUtils');
const ProductUtils = require('../../utils/ProductUtils');
const BrowserUtils = require('../../utils/BrowserUtils');
const getStateFromStores = () => {
	return {
		customer: CustomerStore.getAll(),
		challenge: SessionStore.getChallenge(),
		authentication: SessionStore.getAuthentication(),
	};
};

const HasCustomerNumber = props => {
	return (<RadioQuestion
		defaultValue={props.data.hasCustomerName}
		group={groupExistingCustomer}
		labelText={props.content.hasCustomerName}
		mainColumnSize={BrandUtils.defaultColumnSize() === 12 ? 12 : 6}
		mainColumnSizeMD={BrandUtils.defaultColumnSize() === 12 ? 12 : 6}
		name="hasCustomerName"
		onChange={AccountOpeningActions.updateFormValue}
		options={[{ value: 'No' }, { value: 'Yes' }]}
		required
	/>);
};

HasCustomerNumber.propTypes = {
	data: PropTypes.object,
	content: PropTypes.object,
};

const LoadingMessage = props => {
	return (<p>{props.content.authPageLoadingMessage}</p>);
};

LoadingMessage.propTypes = {
	content: PropTypes.object,
};

const AuthenticationPage = React.createClass({
	propTypes: {
		data: PropTypes.object,
		content: PropTypes.object,
		validations: PropTypes.object,
		appData: PropTypes.object,
		session: PropTypes.object,
	},

	/**
	 * Get values from store as well as set the first question.
	 * @return {object} initial state
	 */
	getInitialState() {
		return getStateFromStores() || {};
	},
	componentWillMount() {
		BrowserUtils.setViewPort(1);
    },
	componentDidMount() {
		if (!BrandUtils.isAbleToDisplay('authentication-page')) {
			AccountOpeningActions.navigateToWebTask('WEB-ERROR');
		}

		CustomerStore.addChangeListener(this._onStoreChange);

		AccountOpeningActions.updateFormValue('isExistingCustomer', 'Yes');
	},

	componentWillReceiveProps(nextProps) {
		if (nextProps.session.challengeMissingDetailsError) {
			AccountOpeningActions.navigateToWebTask('WEB-CONTACT-BANK');
		}
	},

	/**
	* A form for existing customer without a username
	* @return {ReactElement}
	*/
	getAlternateAuthenticationQuestions() {
		return (<div className="padding-bottom">
			<FindDetailsComponent
				{...this.props}
				targetScope={envConfig.targetScope.authentication}
				onSuccess={this.fetchCustomerData}
			/>
			</div>
		);
	},

	/**
	 * switch different forms if customer [has|doesn't have] a username
	 * @return {ReactElement}
	 */
	getCustomerInformation() {
		// ternary is not an option here as there are 3 cases [Yes|No|underfined]
		switch (this.props.data.hasCustomerName) {
			case 'Yes':
				return this.getUsernameQuestion();
			case 'No':
				return this.getAlternateAuthenticationQuestions();
		}
	},

	/**
	 * A form for exisiting customer with a username
	 * @return {ReactElement}
	 */
	getUsernameQuestion() {
		return (<div className="padding-bottom">
			<LoginComponent
				{...this.props}
				targetScope={envConfig.targetScope.authentication}
				isNotAbleToShowUsername
				errorMessage={this.props.content.authCheckDetailsError}
				onSuccess={this.fetchCustomerData}
			/>
			</div>
		);
	},

	_onStoreChange() {
		this.setState(getStateFromStores());
	},

	/**
	 * Fetches customer data and redirects to the next screen on success
	 * On failure redirects to error page
	 */
	fetchCustomerData() {
		if (this.props.data.isExistingBAppUser) {
				AccountOpeningActions.navigateToWebTask('WEB-TIMELINE');
		} else {
			AccountOpeningActions.navigateToWebTask('WEB-REGISTRATION');
		}
		// const customer = this.state.customer;
		// if (customer.error) {
		// 	AccountOpeningActions.navigateToWebTask('WEB-ERROR');
		// 	return;
		// }

		// if (!customer.customerId && !customer.isGetCustomersRequesting) {
		// 	CustomerActions.getCustomers();
		// }

		// if (customer.customerId && !customer.customerNumber && !customer.isGetCustomerByIdRequesting) {
		// 	CustomerActions.getCustomerById();
		// }

		// if (customer.customerNumber) {
		// 	if (this.props.data.isExistingBAppUser) {
		// 		AccountOpeningActions.navigateToWebTask('WEB-TIMELINE');
		// 	} else {
		// 		AccountOpeningActions.navigateToWebTask('WEB-REGISTRATION');
		// 	}
		// }
	},

	shouldShowForm() {
		return !this.props.session.authenticated;
	},

	render() {
		const authPageTitle = BrandUtils.isAbleToDisplay('auth-page-title') ? this.props.content.authPageTitle : this.props.content.landingPageTitle + ProductUtils.getName(this.props.data.productCode);

		if (!BrandUtils.isAbleToDisplay('authentication-page')) {
			return (<div />);
		}

		return (
			<div className="account-opening authentication-page container-fluid">
				<Helmet title={this.props.content.authPageTitle} />
				<PageHeader title={authPageTitle} content={this.props.content} />

				<div className="row main-container">
					<PageColumnWrapper content={this.props.content}>
						<SectionCentered centredColumnSize={12}>
								{this.props.content.authFormTitle && <h2>{this.props.content.authFormTitle}</h2>}
								{this.props.content.authFormSubTitle && <p>{this.props.content.authFormSubTitle}</p>}
								{this.shouldShowForm() && <HasCustomerNumber {...this.props} /> || <LoadingMessage {...this.props} />}

								{this.getCustomerInformation()}
						</SectionCentered>
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

module.exports = AuthenticationPage;
