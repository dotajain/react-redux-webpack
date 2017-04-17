/**
 * @module ModalTooltip
 */
const React = require('react');
const { PropTypes } = React;

const Modal = require('react-bootstrap/lib/Modal');

const ModalTooltip = React.createClass({
  propTypes: {
    onHide: PropTypes.func,
    message: PropTypes.string,
  },
  render() {
    return (
     <Modal {...this.props} bsSize="small" aria-labelledby="contained-modal-title-sm" className="modalTooltip" keyboard={false} backdrop="static">
        <Modal.Body>
          {this.props.message}
        </Modal.Body>
      </Modal>
    );
  },
});

module.exports = ModalTooltip;
