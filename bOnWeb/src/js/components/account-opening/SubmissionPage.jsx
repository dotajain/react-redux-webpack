/**
 * @module SubmissionPage
 */

const React = require('react');
const { PropTypes } = React;
const Helmet = require('react-helmet');
const envConfig = require('../../../static/config');


const _ = require('lodash');

// Actions
const AccountOpeningActions = require('../../actions/AccountOpeningActions');
const AnalyticsActionCreator = require('../../actions/AnalyticsActionCreator');

// Components
const ResultSection = require('../common/sections/ResultSection');
const PageHeader = require('../common/PageHeader');
const LoadingSpinner = require('../LoadingSpinner');

// Utils
const BrandUtils = require('../../utils/BrandUtils');
const ProductUtils = require('../../utils/ProductUtils');
const UrlUtils = require('../../utils/UrlUtils');

const SubmissionPage = React.createClass({

	propTypes: {
		data: PropTypes.object,
		validations: PropTypes.object,
		content: PropTypes.object,
		appData: PropTypes.object,
		session: PropTypes.object,
	},

	getInitialState() {
		return {
			nextTaskCheckInterval: envConfig.nextTaskCheckInterval,
		};
	},

	componentDidMount() {
		// Record an analytics user event.
		AnalyticsActionCreator.track({
			path: '/user/experience/view',
			action: 'Appeared',
		}, {
			description: 'PageLoaded',
		});

		// Do we need to fetch data before calling for the next task?
		if (!this.props.data.caseId) {
			this.fetchCaseData();
		} else {
			this.queueGetNextTask();
		}
	},

	componentDidUpdate(prevProps) {
		// Have we just fetched the case info?
		if (this.props.data.caseId && !prevProps.data.caseId) {
			this.queueGetNextTask();
		}
	},

	componentWillUnmount() {
		this.clearTimer();
	},

	/**
	 * Call Get Next Task and start the timer for the next call.
	 */
	getNextTask() {
		// Do not make a call while another API call is still processing.
		if (this.props.appData.isApiCallInProgress || this.props.session.requireStepupAuthentication) {
			this.timeoutId = _.defer(this.getNextTask); // Try again in a short time.
		} else {
			AccountOpeningActions.getNextTask(this.props.data.caseId);
			this.queueGetNextTask();
		}
	},

	/**
	 * Clear any existing API timers.
	 */
	clearTimer() {
		if (this.timeoutId) {
			clearTimeout(this.timeoutId);
		}
	},

	/**
	 * Parse the case ID from the URL and fetch its data.
	 */
	fetchCaseData() {
		// Need to fetch the user's form data first.
		const caseId = UrlUtils.getParam('caseId');
		const type = UrlUtils.getParam('type');

		if (!caseId || !type) {
			!caseId && console.error('No case to load.');
			!type && console.error('No type to load.');
			return;
		}

		AccountOpeningActions.getCase(caseId, type);
	},

	/**
	 * Start a timer for fetching the next task.
	 */
	queueGetNextTask() {
		const currentInterval = this.state.nextTaskCheckInterval;

		this.setState({
			nextTaskCheckInterval: currentInterval * 2,
		}, () => {
			this.timeoutId = _.delay(this.getNextTask, currentInterval);
		});
	},

	render() {
		return (
			<div className="account-opening result-page-wrapper submission-page-wrapper container-fluid">
				<Helmet title={this.props.content.submissionPageHeader} />
				<PageHeader visible={BrandUtils.isAbleToDisplay('result-pages-header')}
							title={this.props.content.landingPageTitle + ProductUtils.getName(this.props.data.productCode)}
							content={this.props.content}
				/>
				<div className="result-page submission-page" role="main">
					<div className="row text-center">
						<div className="col-xs-12">
							<ResultSection
								imgSrc={BrandUtils.getResultImage('submission-page-with-image', 'submission-illustration.png')}
								imgAlt="Loading"
								bodyClassName="text-center"
								title={this.props.content.submissionPageTitle}
							>
								<p>{this.props.content.submissionPageText}</p>
								<LoadingSpinner />
							</ResultSection>
						</div>
					</div>
				</div>
			</div>
		);
	},
});

module.exports = SubmissionPage;
