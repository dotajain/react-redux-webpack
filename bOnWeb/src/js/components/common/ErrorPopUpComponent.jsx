
const React = require('react');
const PropTypes = React.PropTypes;
const BasicModal = require('./modals/ModalB');

const ErrorPopUpComponent = React.createClass({
    propTypes: {
        content: PropTypes.object,
        error: PropTypes.object,
        closeErrorPopup:PropTypes.func,
	},
    render() {
        return (
          <BasicModal>
            <div className="modal_content error-popup">
              <p><strong>{this.props.error.message}</strong></p>
              <p>When contacting support,<br />please quote ID:<br />
                {this.props.error.quoteId}</p>
            </div>
            <div className="modal_footer">
              <button onClick={this.props.closeErrorPopup}>{this.props.content.ok}</button>
            </div>
          </BasicModal>
        );
	},
});
ErrorPopUpComponent.defaultProps = {
 content: { ok:'OK' },
 error :{
     message:'Something went wrong',
     quoteId:'',
 },

};
module.exports = ErrorPopUpComponent;
