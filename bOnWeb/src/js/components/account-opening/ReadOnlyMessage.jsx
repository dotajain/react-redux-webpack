/**
 * @module ReadOnlyMessage
 */

const _ = require('lodash');
const React = require('react');
const { PropTypes } = React;

const ReadOnlyMessage = React.createClass({

	propTypes: {
		content: PropTypes.object,
		bulletPoints: PropTypes.array,
	},

	getDefaultProps() {
		return {
			bulletPoints: [],
		};
	},

	render() {
		if (!this.props.bulletPoints.length) {
			return null;
		}

		return (
			<div className="error padding-bottom">
				<p key="missingRequiredFields">{this.props.content.missingRequiredFields}</p>
				<ul>
					{_.map(this.props.bulletPoints, (label, i) => (<li key={i}>{label}</li>))}
				</ul>
			</div>
		);
	},
});

module.exports = ReadOnlyMessage;
