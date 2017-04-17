const React = require('react');
const Modal = require('react-bootstrap/lib/Modal');
const { PropTypes } = React;
const ModalComponent = React.createClass({
    propTypes: {
        confirmCancel: PropTypes.bool,
        helpConent: PropTypes.node,
        closed: PropTypes.func,
        bsSize: PropTypes.string,
    },
    render() {
        const customStyles = {
            content: {
                top: '80%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
            },
        };
        
        const className = this.props.style !== '' ? `nobottom ${this.props.style}` : 'nobottom';

        return (
            <Modal
                show={this.props.confirmCancel}
                bsSize= {this.props.bsSize}
                aria-labelledby="contained-modal-title-lg"
                style={customStyles}
                >
                <Modal.Body className={className}>
                    <div> {this.props.helpConent} </div>
                </Modal.Body>
            </Modal>
        );
    },
});

module.exports = ModalComponent;
