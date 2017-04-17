
const React = require('react');

const { PropTypes } = React;
const BasicModal = require('./modals/ModalB');

const SessionTimeoutPopUpComponent = React.createClass({
    propTypes: {
        data: PropTypes.string,
        closePopup:PropTypes.func,
      },
    render() {
      return (
          <div className="b container-fluid">
            <BasicModal>
              <div>
                  <div className="modal_content">
                    <p><strong>{this.props.data}</strong></p>
                  </div>
                  <div className="modal_footer">
                    <button onClick={this.props.closePopup}>Ok</button>
                  </div>
              </div>
            </BasicModal>
          </div>
        );
      },
});

module.exports = SessionTimeoutPopUpComponent;

