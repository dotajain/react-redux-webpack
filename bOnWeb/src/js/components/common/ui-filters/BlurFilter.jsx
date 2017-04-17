/**
 * @module BlurFilter
 */

const React = require('react');
const { PropTypes } = React;

const BlurFilter = React.createClass({
	propTypes: {
		enabled: PropTypes.bool,
		className: PropTypes.string,
		children: PropTypes.node,
	},

	getDefaultProps() {
		return {
			enabled: false,
		};
	},

	render() {
		let className;
		if (this.props.enabled) {
			className = 'blur';
		}
		if (this.props.className) {
			className += this.props.className;
		}
		return (
			<div className={className}>
				{this.props.children}
			</div>
		);
	},
});

module.exports = BlurFilter;
