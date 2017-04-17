/**
 * @module Modal
 */

const React = require('react');
const { PropTypes } = React;
const ComponentHeader = require('../ComponentHeader');
const BasicModal = props => {
	return (
		<div>
			<div className="basic-modal-wrapper">
				<div className="basic-modal-wrapper__container">
						<ComponentHeader
							title={props.title}
							titleLevel={props.titleLevel}
							wrapperClass={props.wrapperClass}
						>
							{props.children}
						</ComponentHeader>
				</div>
			</div>
		</div>
	);
};

BasicModal.propTypes = {
	title: PropTypes.string.isRequired,
	titleLevel: PropTypes.number,
	centredColumnSize: PropTypes.number,
	wrapperClass: PropTypes.string,
	children: PropTypes.object,
};

BasicModal.defaultProps = {
	titleLevel: 3,
	wrapperClass:'basic-modal-wrapper__header',
	centredColumnSize: 4,
};

module.exports = BasicModal;
