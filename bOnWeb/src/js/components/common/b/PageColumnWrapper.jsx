/**
 * @module PageColumnWrapper
 */

const React = require('react');
const { PropTypes } = React;

const PageColumnWrapper = React.createClass({
	propTypes: {
		children: PropTypes.node,
	},

	render() {
		return (
			<div>
				<div className="col-xs-12 col-md-10 col-md-offset-1 col-sm-12 col-xs-12 page-column-wrapper" role="main">
					{this.props.children}
				</div>
			</div>
		);
	},
});

module.exports = PageColumnWrapper;
