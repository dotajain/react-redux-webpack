/**
 * @module SideProgressBar
 */

const React = require('react');
const { PropTypes } = React;

const SideProgressBar = React.createClass({

	propTypes: {
		content: PropTypes.object.isRequired,
		step: PropTypes.number,
	},

	render() {
		const navItems = this.props.step > 0 ?
			<ol>
				<li className={`progress-personal-details${this.props.step === 1 ? ' active' : ''}`}><span className="progress-icon" />{this.props.content.sidebarStep1}</li>
				<li className={`progress-employment-details${this.props.step === 2 ? ' active' : ''}`}><span className="progress-icon" />{this.props.content.sidebarStep2}</li>
				<li className={`progress-review${this.props.step === 3 ? ' active' : ''}`}><span className="progress-icon" />{this.props.content.sidebarStep3}</li>
			</ol> : false;

		return (
			<div className="col-lg-3 visible-lg side-progress-bar">
				{navItems}
			</div>
			);
	},
});

module.exports = SideProgressBar;
