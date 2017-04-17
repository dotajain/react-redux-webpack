/**
 * @module TimerSection
 */

const React = require('react');
const { PropTypes } = React;

const moment = require('moment');

// Components
const ComponentHeader = require('../ComponentHeader');

const TimerSection = React.createClass({

	propTypes: {
		initialTimeRemaining: PropTypes.number.isRequired,
		interval: PropTypes.number,
		tickCallback: PropTypes.func,
		completeCallback: PropTypes.func,
		asTimeUnit: PropTypes.string.isRequired,
		timerSectionTimeUnitDescription: PropTypes.string,
		timerSectionTitle: PropTypes.string,
	},

	getDefaultProps() {
		return {
			interval: 1000,
			formatFunc: undefined,
			tickCallback: undefined,
			completeCallback: undefined,
			asTimeUnit: 'minutes',
			timerSectionTimeUnitDescription: 'min{}',
		};
	},

	getInitialState() {
		return {
			timeRemaining: this.props.initialTimeRemaining,
		};
	},

	componentDidMount() {
		this.tick();
	},

	componentDidUpdate() {
		if ((!this.state.prevTime) && this.state.timeRemaining > 0) {
			this.tick();
		}
	},

	componentWillUnmount() {
		clearTimeout(this.state.timeoutId);
	},

	/**
	 * This function is responsible for returning the time markers displayed
	 * on the timer.
	 * @param  {number} timeRemainingPercentage The current time remaining in percentage
	 * @param  {number} timeSplit               The count of time units (extracted from initialTimeRemaining and asTimeUnit)
	 * @param  {Object} timeDuration            The moment duration object for the initialTimeRemaining
	 * @return {array}  markers                 The li elements representing time markers
	 */
	getTimeMarkers(timeRemainingPercentage, timeSplit, timeDuration, timeRemainingAccessible) {
		const markers = [];
		let markerElement;
		const markerWidthPercentageAdjusted = 100 / (timeSplit + 0.15);
		const markerElementStyles = { width: `${markerWidthPercentageAdjusted}%` };
		let markerElementLabel;

		for (let i = 0; i < timeSplit; i++) {
			const timeString = this.props.timerSectionTimeUnitDescription.replace('{}', (timeSplit - i) === 1 ? '' : 's');
			markerElementLabel = `${timeSplit - i} ${timeString}`;

			const markerLabel = <span className="timer-label">{markerElementLabel}</span>;

			markerElement = (<li key={i} style={markerElementStyles} className={'marker hidden-xs '}>
												{markerLabel}
											</li>);
			markers.push(markerElement);
		}

		markers.push(
			<li key="time-remain" className="marker accessible visible-xs" style={{ width: '100%' }}>
				<span aria-live="assertive" aria-label="Time Remaining">{`${timeRemainingAccessible} minutes remaining`}</span>
			</li>
		);

		return markers;
	},

	/**
	 * Tick on the next clock second. This function takes care of setting timeouts and clearing them for
	 * every clock tick. Also it is responsible for calling the completeCallback on countdown complete.
	 */
	tick() {
		const currentTime = Date.now();
		const dt = currentTime - this.state.prevTime || 0;
		const interval = this.props.interval;

		// correct for small variations in actual timeout time
		const timeRemainingInInterval = (interval - (dt % interval));
		let timeout = timeRemainingInInterval;

		if (timeRemainingInInterval < (interval / 2.0)) {
			timeout += interval;
		}

		const timeRemaining = Math.max(this.state.timeRemaining - dt, 0);
		const countdownComplete = (this.state.prevTime && timeRemaining <= 0);

		this.setState({
			timeoutId: countdownComplete ? undefined : setTimeout(this.tick, timeout),
			prevTime: currentTime,
			timeRemaining,
		});

		if (countdownComplete) {
			if (this.props.completeCallback) {
				this.props.completeCallback();
			}

			return;
		}

		if (this.props.tickCallback) {
			this.props.tickCallback(timeRemaining);
		}
	},

	render() {
		const timeRemaining = this.state.timeRemaining;
		const timeRemainingPercentage = (timeRemaining / this.props.initialTimeRemaining) * 100;
		const elapsedTimeLineStyles = { width: `${timeRemainingPercentage}%` };
		const timeDuration = moment.duration(this.props.initialTimeRemaining);
		const timeSplit = timeDuration.as(this.props.asTimeUnit);
		const timeRemainingAccessible = Math.ceil(moment.duration(timeRemaining, 'milliseconds').asMinutes());

		return (
			<section className="row timer-section" aria-label={this.props.timerSectionTitle}>
				<div className="col-xs-12">
					<ComponentHeader
						wrapperClass="vertical-center"
						bodyClass="text-left padding-right padding-left"
						titleLevel={1}
						title={this.props.timerSectionTitle}
						subTitle=""
					>
						<span className="timeline">
							<span className="screenreader hidden-xs" aria-live="assertive" aria-label="Time Remaining">{`${timeRemainingAccessible} minutes remaining`}</span>

							<span style={elapsedTimeLineStyles} className="timeline elapsed">
							</span>
							<ol>
								{this.getTimeMarkers(timeRemainingPercentage, timeSplit, timeDuration, timeRemainingAccessible)}
							</ol>
						</span>
					</ComponentHeader>
				</div>
			</section>
		);
	},
});

module.exports = TimerSection;
