/**
 * @module PageHeader
 */

const React = require('react');
const PageHeader = React.createClass({

	render() {
			return (
					<nav className="navbar navbar-default navbar-fixed-top">
						<div className="container">
							<div id="navbar" className="navbar-collapse collapse">
								<ul className="nav navbar-nav">
									<li><a href="#">You</a></li>
									<li><a href="#about">Payment</a></li>
									<li><a href="#contact">Spending</a></li>
									<li><a href="#contact">Saving Pots</a></li>
									<li><a href="#contact">Alerts</a></li>
									<li><a href="#contact">Help</a></li>
								</ul>
							</div>
						</div>
					</nav>
			);
	},
});

module.exports = PageHeader;
