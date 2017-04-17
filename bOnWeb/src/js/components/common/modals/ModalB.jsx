/**
 * @module Modal
 */

const React = require('react');
const { PropTypes } = React;

const ModalB = React.createClass({
	propTypes: {
		// title: PropTypes.string.isRequired,
		titleLevel: PropTypes.number,
		centredColumnSize: PropTypes.number,
		wrapperClass: PropTypes.string,
		children: PropTypes.any.isRequired,
	},
	getDefaultProps() {
		return {
			titleLevel: 3,
			centredColumnSize: 8,
			wrapperClass: 'modal-wrapper__header',
		};
	},
	render() {
		return (
			<div >
				<div className="modal-wrapper">
					<div className="modal-wrapper__container">
						{this.props.children}
					</div>
				</div>
			</div >
		);
	},
});


module.exports = ModalB;
