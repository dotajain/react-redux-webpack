/**
 * @module Toggle
 */

const React = require('react');
const ReactBootstrapToggle = require('react-bootstrap-toggle');
const Toggle = React.createClass({

	onChange(value) {
		alert('Hey It\'s Working');
	},


	render() {
		return (
			<ReactBootstrapToggle
                on={on}
                off={off}
                active={false}
                onChange={onChange}
			/>
		);
	},
});

module.exports = Toggle;
