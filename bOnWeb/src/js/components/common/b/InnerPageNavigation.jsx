/**
 * @module InnerPageNavigation
 */

// Packages
const React = require('react');
const InnerPageNavigation = React.createClass({
	render() {
			return (
				<header role="navigation">
					<div className="row">
					<div className="navigation inner">
						<a className="back" />
					</div>
					</div>
				</header>
			);
	},
});

module.exports = InnerPageNavigation;
