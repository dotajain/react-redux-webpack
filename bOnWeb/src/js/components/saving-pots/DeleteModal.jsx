/**
 * @module DeleteModal
 */
const React = require('react');
const { PropTypes } = React;

const BasicModal = require('../common/modals/ModalB');

const DeleteModal = React.createClass({
  propTypes: {
    onHide: PropTypes.func,
    onDelete: PropTypes.func,
    content: PropTypes.object,
    message: PropTypes.object,
  },
  render() {
    const content = this.props.content;
    return (
      <BasicModal>
        <div className="modal_content">
        <h3>{content.savingPotDeleteTitle}</h3>
          {this.props.message}
        </div>
          <div className="modal_footer">
            <button onClick={this.props.onHide}>{content.savingsPotCancelButton}</button>
            <button onClick={this.props.onDelete}><strong>{content.savingsPotYesButton}</strong></button>
        </div>
      </BasicModal>
    );
  },
});

module.exports = DeleteModal;
