const BasicModal = require('../common/modals/ModalB');
const React = require('react');
const { PropTypes } = React;

const AlertSweepModal = React.createClass({
    propTypes: {
        content: PropTypes.object,
        confirmCancel: PropTypes.bool,
        name: PropTypes.string,
        closed: PropTypes.func,
        id: PropTypes.string,
        deleteData: PropTypes.func,
        closePopup: PropTypes.func,
        errorResponse: PropTypes.string,
    },

    getInitialState() {
        return {
            isConfirming: this.props.confirmCancel,
            nextModal: false,
        };
    },

    componentWillMount() {
    },

    componentWillReceiveProps(nextProps) {
        this.setState({
            isConfirming: nextProps.confirmCancel,
        });
    },

    confirmCancel() {
        this.setState({
            isConfirming: false,
        });
        this.props.closePopup && this.props.closePopup();
    },

    sendDeleteData() {
        this.props.deleteData();
    },

    popUps() {
        let divCtrl = '';
        switch (this.props.name) {
            case 'info':
                divCtrl = (<div>
                    <div className="modal_content infoPopup">
                        <h3>{this.props.content.infoPopupHeader}</h3>
                        <p>{this.props.content.infoPopupContent} </p>
                    </div>
                    <div className="modal_footer">
                        <button
                            onClick={ this.confirmCancel }
                            className="btn btn-primary"
                            data-anchor="confirm-cancel-button"
                            role="button"
                        >
                            {this.props.content.infoPopupButton} </button>
                    </div></div>);

                break;

            case 'createSweep':
                divCtrl = (
                    <div className="popupRect col">
                        <div className="doneIconStyle">
                            <span className="icon icon-done doneIconStyle"/>
                        </div>

                        <p>{this.props.content.sweepCreationPopup}</p></div>);
                break;

            case 'createAlert':
                divCtrl = (<div className="popupRect col">
                    <div className="doneIconStyle">
                        <span className="icon icon-done doneIconStyle"/>
                    </div><p>
                        {this.props.content.alertCreationPopup}</p></div>);
                break;

            case 'editSweep':
                divCtrl = (<div className="popupRect col">
                    <div className="doneIconStyle">
                        <span className="icon icon-done doneIconStyle"/>
                    </div><p>{this.props.content.sweepUpdatePopup}</p></div>);
                break;

            case 'editAlert':
                divCtrl = (<div className="popupRect col">
                    <div className="doneIconStyle">
                        <span className="icon icon-done doneIconStyle"/>
                    </div><p>{this.props.content.alertUpdatePopup}</p></div>);
                break;

            case 'deleteSweep':
                divCtrl = (<div className="popupRect col">
                    <div className="doneIconStyle">
                        <span className="icon icon-done doneIconStyle"/>
                    </div><p>{this.props.content.sweepDeletePopup}</p></div>);
                break;

            case 'delete':
                divCtrl = (<div>
                    <div className="modal_content deletePopup">
                        <h3>{this.props.content.deletePopupHeader}</h3>
                        <p>{this.props.content.deletePopupContent} </p>
                    </div>
                    <div className="modal_footer">
                        <button onClick={this.confirmCancel}>{this.props.content.cancelButton}</button><button onClick={this.sendDeleteData}>{this.props.content.Yes}</button>
                    </div>
                </div>
                );
                break;

            case 'notDeleted':
                divCtrl = (<p>Sweep not deleted</p>);
                break;

            case 'sweepModal':
                divCtrl = (
                    <div>
                        <div className="modal_content sweepsPopup">
                            <h3>{this.props.content.maxSweepPopupHeader}</h3>
                            <p>{this.props.content.maxSweepPopupData}</p>
                        </div>
                        <div className="modal_footer">
                            <button onClick={this.confirmCancel}>{this.props.content.ok}</button>
                        </div></div>

                );
                break;

            case 'alertModal':
                divCtrl = (
                    <div>
                        <div className="modal_content sweepsPopup">
                            <h3>{this.props.content.maxAlertPopupHeader}</h3>
                            <p>{this.props.content.maxAlertPopupData}</p>
                        </div>
                        <div className="modal_footer">
                            <button onClick={this.confirmCancel}>{this.props.content.ok}</button>
                        </div></div>

                );
                break;

            case 'cnfrmDel':
                divCtrl = (<p>Sweep deleted</p>);
                break;

            case 'someTechnicalError':
                let message = 'Something went wrong';
                let quoteId = '123456';
                if (this.props.errorResponse) {
                    message = this.props.errorResponse.error.message;
                    quoteId = this.props.errorResponse.error.quoteId;
                }
                divCtrl = (
                    <div>
                        <div className="modal_content sweepsPopup">
                            <h3>{message}</h3>
                            <p>When contacting support, <br />please quote ID: <br />
                                {quoteId}</p>
                        </div>
                        <div className="modal_footer">
                            <button onClick={this.confirmCancel}>{this.props.content.ok}</button>
                        </div></div>
                );
                break;
        }

        return (<BasicModal >

            {divCtrl}


        </BasicModal>);
    },

    render() {
        return (<div>{this.state.isConfirming &&
            this.popUps()
        }
        </div>);
    },
});

module.exports = AlertSweepModal;
