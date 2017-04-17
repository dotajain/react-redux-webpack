/**
 * @module Modal
 */

const React = require('react');
const { PropTypes } = React;

const OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');
const Popover = require('react-bootstrap/lib/Popover');

const OverlayPopup = React.createClass({
	propTypes: {
		overlayId: PropTypes.any.isRequired,
		overlayMessage: PropTypes.any.isRequired,
		placement: PropTypes.any.isRequired,
		children: PropTypes.any.isRequired,
	},

	render() {
		const popoverContent = (
			<Popover id={this.props.overlayId}>
				<div className="text-center">{this.props.overlayMessage}</div>
			</Popover>
		);
		return (
			<OverlayTrigger container={this} trigger="click" rootClose placement={this.props.placement} overlay={popoverContent}>
				{this.props.children}
			</OverlayTrigger>
		);
	},
});


module.exports = OverlayPopup;
