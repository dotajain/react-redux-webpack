/**
 * @module Toggle
 */
const React = require('react');
const Toggle = React.createClass({
	render() {
		return (
			<div>
				<input id="e" type="checkbox" />
				<label htmlFor="e">
					<div className="can-toggle__switch" data-checked="Y" data-unchecked="N"></div>
				</label>
			</div>
		);
	},
});

module.exports = Toggle;
