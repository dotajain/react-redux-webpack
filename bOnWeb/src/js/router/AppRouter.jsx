/**
 * @class AppRouter
 */

const modernizr = require('modernizr');
const React = require('react');
const ReactDOM = require('react-dom');
const _ = require('lodash');
const envConfig = require('../../static/config');
const { brandConfig } = require('../config/BrandConfig');

const Router = require('react-router');
const Redirect = Router.Redirect;
const Route = Router.Route;

// Account Opening Pages
const AccountOpenedPage = require('../components/account-opening/AccountOpenedPage');
const AccountOpening = require('../components/account-opening/AccountOpening');
const AuthenticationPage = require('../components/account-opening/AuthenticationPage');
const BankApp = require('../components/BankApp');
const SorryPage = require('../components/account-opening/SorryPage');
const DeclinePage = require('../components/account-opening/DeclinePage');
const DeferredPage = require('../components/account-opening/DeferredPage');
const EmploymentDetailsPage = require('../components/account-opening/EmploymentDetailsPage');
const ErrorPage = require('../components/account-opening/ErrorPage');
const IdDeferredPage = require('../components/account-opening/IdDeferredPage');
const LandingPage = require('../components/account-opening/LandingPage');
const ContactBankPage = require('../components/account-opening/ContactBankPage');
const AccountLockedPage = require('../components/account-opening/AccountLockedPage');
const OfferPage = require('../components/account-opening/OfferPage');
const PersonalDetailsPage = require('../components/account-opening/PersonalDetailsPage');
const PortalPage = require('../components/account-opening/PortalPage');
const RedirectOnBackButton = require('../components/RedirectOnBackButton');
const RedirectErrorOnBack = require('../components/RedirectErrorOnBack');
const ResetTasksOnBackButton = require('../components/ResetTasksOnBackButton');
const RegistrationPage = require('../components/account-opening/RegistrationPage');
const ReviewPage = require('../components/account-opening/ReviewPage');
const SubmissionPage = require('../components/account-opening/SubmissionPage');
const CallValidate3D = require('../components/account-opening/CallValidate3D');
const LoginPage = require('../components/account-opening/LoginPage');
const SwitchPage = require('../components/account-opening/SwitchPage');
const SetupInProgressPage = require('../components/account-opening/SetupInProgressPage');
const DefaultBankSelector = require('../components/DefaultBankSelector');
const RequiresGlobalEnvConfig = require('../components/RequiresGlobalEnvConfig');
const RequiresProductCode = require('../components/RequiresProductCode');
const RetrieveCurrentUser = require('../components/RetrieveCurrentUser');
const ScrollToHash = require('../components/ScrollToHash');
const ProductBlacklist = require('../components/ProductBlacklist');

// B Web App Pages
const TimelinePage = require('../components/timeline/TimelinePage');
const FinancialStoriesPage = require('../components/financial-stories/FinancialStoriesPage');
/* Payment router start*/
const PaymentsPage = require('../components/payments/PaymentsPage');
const ConfirmPayment = require('../components/payments/ConfirmPayment');
const ThankYouPage = require('../components/payments/ThankYouPage');
const ManagePayment = require('../components/payments/payment/ManagePayment');
const ManagePayee = require('../components/payments/payee/ManagePayee');
const ArchivedPayment = require('../components/payments/payment/ArchivedPayment');
const AddPayee = require('../components/payments/payee/AddPayee');

/* Payment router end*/
const SpendingsPage = require('../components/spendings/SpendingsPage');
const SavingPotsPage = require('../components/saving-pots/SavingPotsPage');
const AlertsSweepsPage = require('../components/alertsnsweeps/AlertsSweepsPage');
const HelpPage = require('../components/help/HelpPage');
const LogoutPage = require('../components/logout/LogoutPage');

const UiElements = require('../components/HTML/UiElements');

const BrowserUtils = require('../utils/BrowserUtils');
const UrlUtils = require('../utils/UrlUtils');

const AccountOpeningContentStore = require('../stores/AccountOpeningContentStore');

/*
* Get first product code name from the current brand
*/
const getQuery = () => {
	const products = brandConfig.getProductsFor(envConfig.bankId);
	return { applyFor: _.head(_.keys(products)) };
};

const BaseHOC = routeHandler => ResetTasksOnBackButton(RequiresProductCode(ProductBlacklist(routeHandler)));
const WithRedirectGuard = routeHandler => RedirectOnBackButton(BaseHOC(routeHandler));

const getPageUrl = segment => {
	return `${envConfig.websiteBaseDirectory}bapp${segment !== undefined ? `/${segment}` : ''}`;
};

const AppRouter = {
	/**
	 * Define all possible routes, including nesting.
	 * https://github.com/rackt/react-router/blob/master/docs/guides/overview.md
	 */
	routes: (
		<Route name="app" path={envConfig.websiteBaseDirectory} handler={RequiresGlobalEnvConfig(DefaultBankSelector(ScrollToHash(BankApp)))}>
			<Route name="bapp" handler={AccountOpening}>
				<Route path={getPageUrl()} handler={BaseHOC(RetrieveCurrentUser(RedirectErrorOnBack(LandingPage)))}/>
				<Route path={getPageUrl('')} handler={BaseHOC(RetrieveCurrentUser(RedirectErrorOnBack(LandingPage)))}/>
				<Route name="step-1" path={getPageUrl('step-1')} handler={BaseHOC(PersonalDetailsPage)}/>
				<Route name="step-2" path={getPageUrl('step-2')} handler={BaseHOC(EmploymentDetailsPage)}/>
				<Route name="authentication" path={getPageUrl('authentication')} handler={BaseHOC(AuthenticationPage)}/>

				<Route name="review" path={getPageUrl('review')} handler={WithRedirectGuard(ReviewPage)}/>
				<Route name="offer" path={getPageUrl('offer')} handler={WithRedirectGuard(OfferPage)}/>
				<Route name="security" path={getPageUrl('security')} handler={WithRedirectGuard(CallValidate3D)}/>
				<Route name="registration" path={getPageUrl('registration')} handler={WithRedirectGuard(RegistrationPage)}/>
				<Route name="switch" path={getPageUrl('switch')} handler={WithRedirectGuard(SwitchPage)}/>

				<Route name="submission" path={getPageUrl('submission')} handler={SubmissionPage} />

				<Route name="portal" path={getPageUrl('portal')} handler={RetrieveCurrentUser(RedirectOnBackButton(PortalPage))} />
				<Route name="timeline" path={getPageUrl('timeline')} handler={TimelinePage}/>
				<Route name="financialstories" path={getPageUrl('financialStories')} handler={FinancialStoriesPage}/>
				<Route name="spendings" path={getPageUrl('spendings')} handler={SpendingsPage}/>
				<Route name="payments" path={getPageUrl('payments')} handler={PaymentsPage}/>
				<Route name="confirmpayment" handler={ConfirmPayment}/>
				<Route name="finalpayment" handler={ThankYouPage}/>
				<Route name="managepayment" handler={ManagePayment}/>
				<Route name="managepayee" handler={ManagePayee}/>
				<Route name="archivedpayment" handler={ArchivedPayment}/>
				<Route name="addPayee" handler={AddPayee}/>
				<Route name="savingpots" path={getPageUrl('savingpots')} handler={SavingPotsPage}/>
				<Route name="alertsnsweeps" path={getPageUrl('alertsnsweeps')} handler={AlertsSweepsPage}/>
				<Route name="help" path={getPageUrl('help')} handler={HelpPage}/>
				<Route name="logout" path={getPageUrl('logout')} handler={LogoutPage}/>
				<Route name="uiElements" path={getPageUrl('uiElements')} handler={UiElements}/>

				<Route name="login" path={getPageUrl('login')} handler={ResetTasksOnBackButton(LoginPage)}/>
				<Route name="id-deferred" handler={IdDeferredPage}/>
				<Route name="deferred" handler={DeferredPage}/>
				<Route name="sorry" handler={SorryPage}/>
				<Route name="decline" handler={DeclinePage}/>
				<Route name="account-opened" handler={RequiresProductCode(AccountOpenedPage)}/>
				<Route name="error" handler={ErrorPage}/>
				<Route name="contact-bank" handler={ContactBankPage} />
				<Route name="account-locked" handler={AccountLockedPage} />
				<Route name="setup-in-progress" handler={SetupInProgressPage}/>
				<Route name="not-found" handler={ErrorPage} />
				<Redirect from="*" to="not-found" query={{}}/>
			</Route>
			<Redirect from="/" to="authentication" query={ getQuery() } />
		</Route>
	),
	/**
	 * Kick off route handling.
	 */
	init() {
		const reactElement = document.getElementById('react');

		if (!BrowserUtils.isCompatible()) {
			reactElement.innerHTML = AccountOpeningContentStore.get('upgradeBrowserMessage');
			return false;
		}

		if (process.env.NODE_ENV === 'development') {
			const StubUtils = require('../utils/StubUtils');
			StubUtils.applyStub(UrlUtils.getParam('applyFor'));
		}

		const handlerCallback = (Handler, pushState) => {
			ReactDOM.render(<Handler pushState={pushState} />, reactElement);
		};

		// Use pushState for browsers that support it.
		if (modernizr.history) {
			Router.run(this.routes, Router.HistoryLocation, handlerCallback);
		} else {
			Router.run(this.routes, handlerCallback);
		}
	},
	getQuery,
};

module.exports = AppRouter;
