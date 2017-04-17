/**
 * @module CallValidate3D
 */

const React = require('react');
const { PropTypes } = React;
const _ = require('lodash');
const envConfig = require('../../../static/config');

// Components
const ComponentHeader = require('../common/ComponentHeader');
const BottomNavigationBox = require('../common/BottomNavigationBox');
const RadioQuestion = require('../common/questionsets/RadioQuestion');
const TimerSection = require('../common/sections/TimerSection');
const PageHeader = require('../common/PageHeader');

// Actions
const CallValidate3DActionCreator = require('../../actions/CallValidate3DActionCreator');
const AnalyticsActionCreator = require('../../actions/AnalyticsActionCreator');

// Constants
const AccountOpeningConstants = require('../../constants/AccountOpeningConstants');

// Utils
const ValidationUtils = require('../../utils/ValidationUtils');
const ScreenshotUtils = require('../../utils/ScreenshotUtils');
const BrandUtils = require('../../utils/BrandUtils');

// Local vars
const _submittedQuestions = [];

const CallValidate3D = React.createClass({

	propTypes: {
		appData: PropTypes.object,
		call3d: PropTypes.array.isRequired,
		data: PropTypes.object,
		validations: PropTypes.object,
		content: PropTypes.object,
	},

	/**
	 * Get values from store as well as set the first question.
	 * @return {object} initial state
	 */
	getInitialState() {
		return {
			currentQuestionNumber: 1,
			showTimer: false,
			answersSubmitted: false,
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

		// API call to initialise questions
		CallValidate3DActionCreator.requestCallValidate3DQuestions(this.props.data.caseId);
	},

	componentWillReceiveProps(nextProps) {
		// Have we got questions now? Start the timer.
		if (nextProps.call3d.length > 0 && this.props.call3d.length === 0) {
			this.setState({
				showTimer: true,
			});
		}
	},

	_getCurrentQuestion(questionNumber) {
		return this.props.call3d[questionNumber - 1] ? this.props.call3d[questionNumber - 1] : {};
	},

	_getLoadingScreen(answersSubmitted) {
		return (
			<p>{(answersSubmitted) ? this.props.content.securityPageSubmissionMessage : this.props.content.securityPageLoadingMessage}</p>
		);
	},

	_getQuestionsAvailable() {
		const currentQuestion = this._getCurrentQuestion(this.state.currentQuestionNumber);
		let answers = currentQuestion.answers ? currentQuestion.answers : [];

		// Map values and labels
		answers = _.map(answers, answer => {
			return {
				anchor: answer.id,
				label: answer.answer,
				value: answer.id,
			};
		});

		let questionNumber;
		let questionOutOf;

		if (BrandUtils.isAbleToDisplay('security-page-with-descriptive-question-number')) {
			questionNumber = `Question ${this.state.currentQuestionNumber} `;
			questionOutOf = `out of ${this.props.call3d.length}`;
		} else {
			questionOutOf = `${this.state.currentQuestionNumber} / ${this.props.call3d.length}`;
		}

		const isValid = ValidationUtils.isKeyValid(this.props.validations, AccountOpeningConstants.GROUP_CALLVALIDATE_3D, currentQuestion.id);

		return (
					<span>
						<span className="question-number">
							{questionNumber}
							<span className="question-total-count">{questionOutOf}</span>
						</span>

						<RadioQuestion
							key={currentQuestion.id}
							blockList
							classNameLabelDiv="u-font-medium"
							group={AccountOpeningConstants.GROUP_CALLVALIDATE_3D}
							labelText={currentQuestion.question}
							mainColumnSize={12}
							mainColumnSizeMD={12}
							name={currentQuestion.id}
							onChange={CallValidate3DActionCreator.requestCallValidate3DQuestionUpdate}
							options={answers}
							dataAnchor="3d-question"
							required
						/>

						<BottomNavigationBox
							className="col-xs-12 text-center"
							onClickNext={this._onNextClick}
							disabled={!isValid || this.props.appData.isApiCallInProgress}
							dataAnchorNext="cv-continue"
							nextButtonLabel="Continue"
						/>
					</span>
			);
	},

	/**
	 * Increments the currentQuestionNumber in the state.
	 */
	_incrementQuestionNumber() {
		this.setState({
			currentQuestionNumber: this.state.currentQuestionNumber + 1,
		});
	},

	/**
	 * Is it possible to go to the next question? if yes then increment and return true, otherwise,
	 * make an api call and continue to next page.
	 * This function will be passed down to the LINK component.
	 * @param  {object}  e 									onClickEvent
	 * @return {boolean} !_shouldIncrement	false if should not procceed(next page), true it should
	 */
	_onNextClick(e) {
			// Don't go anywhere until we've taken a screen shot.
		e.preventDefault();

			// Prevent double-clicks from going anywhere (inc. during screenshot processing)
		if (_submittedQuestions.indexOf(this.state.currentQuestionNumber) >= 0) {
			return;
		} else {
			_submittedQuestions.push(this.state.currentQuestionNumber);
		}

			// Take a screen shot
		ScreenshotUtils.takeScreenshot(() => {
				// Now carry on
			const _shouldIncrement = (this.state.currentQuestionNumber < this.props.call3d.length);

			if (_shouldIncrement) {
				this._incrementQuestionNumber();
			} else {
				this._submitAnswers();
			}
		}, this.props.data.caseId, true); // Do not block the user from proceeding while these are sent.
	},

	/**
	 * Creates an action that will make an API call to submit the user's answers.
	 */
	_submitAnswers() {
		this.setState({
			showTimer: false,
			answersSubmitted: true,
		}, () => {
			CallValidate3DActionCreator.requestCallValidate3DAuthentication(this.props.data.caseId);
		});
	},

	render() {
		let timerSection;
		if (this.state.showTimer) {
			timerSection =
				(<TimerSection
					initialTimeRemaining={envConfig.callValidate3DTimelimit}
					timerSectionTitle={this.props.content.timerSectionTitle}
					timerSectionTimeUnitDescription={this.props.content.timerSectionTimeUnitDescription}
					completeCallback={this._submitAnswers}
				/>);
		}

		return (
		<div className="account-opening result-page-wrapper call-validate-3d-page-wrapper container-fluid">
			<PageHeader title="" visible={BrandUtils.isAbleToDisplay('result-pages-header')} content={this.props.content} />
			<div className="result-page call-validate-3d-page white-board" role="main">
				<div className="row text-center">
				<div className="col-xs-12">
						<ComponentHeader
							wrapperClass="vertical-center"
							bodyClass="text-left"
							titleLevel={1}
							hasSubtitleSeparator
							title={this.props.content.securityPageTitle}
						>

							{timerSection}

							{/* Checks to see if questions loaded, displays loading screen until ready */}
							{ !this.state.answersSubmitted && this.props.call3d.length ?
								this._getQuestionsAvailable() :
								this._getLoadingScreen(this.state.answersSubmitted)
								}
						</ComponentHeader>
					</div>
				</div>
			</div>
		</div>
		);
	},
});

module.exports = CallValidate3D;
