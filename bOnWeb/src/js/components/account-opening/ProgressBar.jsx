/**
 * @module ProgressBar
 */

const React = require('react');
const { PropTypes } = React;
const _ = require('lodash');

const BrandUtils = require('../../utils/BrandUtils');

const ProgressBar = React.createClass({

	propTypes: {
		step: PropTypes.number,
		timeRemaining: PropTypes.number.isRequired,
	},

	getIcons() {
		const stages = ['Your Details', 'Employment Details', 'Review & Check'];

		return _.map(stages, (item, index) => {
			let className = `progress-bar-item-${index} `;

			if (index === this.props.step) {
				className += 'progress-bar-item-active ';
			}

			return (<li key={`progress-step-${index}`} className={className} title={item}>
				<em>Step {1 + index}</em>
				<span>{item}</span>
			</li>);
		});
	},

	render() {
		if (!BrandUtils.isAbleToDisplay('progress-bar')) {
			return false;
		}

		return (
			<div className="progress-bar" >
				<ol>
					{this.getIcons()}

					<li className="completion-time" title="Time Remaining">
						<em>Time Remaining</em>
						<p>
							{this.props.timeRemaining} minutes
							<small>to complete the rest of the form</small>
						</p>
					</li>
				</ol>
			</div>
		);
	},
});

module.exports = ProgressBar;
