/**
 * @module Modal
 */

const React = require('react');
const { PropTypes } = React;

const ComponentHeader = require('../ComponentHeader');
const SectionCentered = require('../SectionCentered');

const Modal = props => {
	return (
		<div>
			<div className="modal-wrapper">
				<div className="modal-wrapper__container">
					<SectionCentered centredColumnSize={props.centredColumnSize}>
						<ComponentHeader
							title={props.title}
							titleLevel={props.titleLevel}
							wrapperClass={props.wrapperClass}
						>
							{props.children}
						</ComponentHeader>
					</SectionCentered>
				</div>
			</div>
		</div>
	);
};

Modal.propTypes = {
	title: PropTypes.string.isRequired,
	titleLevel: PropTypes.number,
	centredColumnSize: PropTypes.number,
	wrapperClass: PropTypes.string,
	children: PropTypes.object,
};

Modal.defaultProps = {
	titleLevel: 3,
	centredColumnSize: 8,
	wrapperClass:'modal-wrapper__header',
};

module.exports = Modal;
