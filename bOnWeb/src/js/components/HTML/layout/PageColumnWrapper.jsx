/**
 * @module PageColumnWrapper
 */

const React = require('react');
const { PropTypes } = React;

const PageColumnWrapper = React.createClass({

	propTypes: {
		content: PropTypes.object.isRequired,
		children: PropTypes.node,
	},

	render() {
		return (
			<div className="b-app container-fluid">
				{this.props.children}
			</div>
		);
	},
});

module.exports = PageColumnWrapper;
