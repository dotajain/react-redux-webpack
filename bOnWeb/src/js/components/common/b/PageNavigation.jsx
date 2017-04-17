/**
 * @module PageHeader
 */

// Packages
const React = require('react');
const PageOverlayMenu = require('./PageOverlayMenu');
const PageNavigation = React.createClass({
	render() {
		return (
			<header role="navigation">

				<ul className="navigation main">
					<li role="presentation" className="active">
						<a href="http://localhost:3000/bapp/timeline"><span className="icon icon-icon-you"></span>You</a>
					</li>
					<li role="presentation">
						<a href="http://localhost:3000/bapp/payments"><span className="icon icon-icon-payments"></span>Payments</a>
					</li>
					<li role="presentation">
						<a href="http://localhost:3000/bapp/spendings"><span className="icon icon-icon-spending"></span>Spending</a>
					</li>
					<li role="presentation">
						<a href="http://localhost:3000/bapp/savingpots"><span className="icon icon-icon-goals"></span>Saving Pots</a>
					</li>
					<li role="presentation">
						<a href="http://localhost:3000/bapp/alertsnsweeps"><span className="icon icon-icon-alerts"></span>Alert</a>
					</li>
					<li role="presentation">
						<a href="http://localhost:3000/bapp/help"><span className="icon icon-icon-helps"></span>Help</a>
					</li>
					<PageOverlayMenu />
				</ul>
			</header>
		);
	},
});

module.exports = PageNavigation;
