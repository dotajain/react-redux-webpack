/**
 * @module InputHolder
 */

const React = require('react');
const PropTypes = React.PropTypes;

const InputHolder = React.createClass({

	propTypes: {
		label: PropTypes.string,
		children: PropTypes.node,
	},

	render() {
		return (
			<div className="row input-holder">
				<div className="col-xs-4">
					{this.props.label}
				</div>

				<div className="col-xs-8">
					{this.props.children}
				</div>
			</div>
		);
	},
});

module.exports = InputHolder;
