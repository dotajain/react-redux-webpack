/**
 * @module NBAComponent
 */
const React = require('react');
const { PropTypes } = React;

const CustomeSelectDate = React.createClass({

	propTypes: {
			onClick: React.PropTypes.func,
			customTextToDisplay: PropTypes.string,
	},

	render() {
		return (
			<div >
				<a onClick={this.props.onClick}> {this.props.customTextToDisplay}</a>
			</div>
		);
	},
});

module.exports = CustomeSelectDate;
