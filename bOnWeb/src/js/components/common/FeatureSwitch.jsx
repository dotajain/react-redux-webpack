/**
 * @module FeatureSwitch
 */

const React = require('react');
const { PropTypes } = React;

const FeatureSwitch = React.createClass({
	propTypes: {
		enabled: PropTypes.bool,
		children: PropTypes.node,
	},

	shouldComponentUpdate() {
		return !!this.props.enabled;
	},

	render() {
		return this.props.enabled && this.props.children || <noscript />;
	},
});

module.exports = FeatureSwitch;

