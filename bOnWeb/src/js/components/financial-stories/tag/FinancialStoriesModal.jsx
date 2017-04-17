/**
 * @module FinancialStoriesModal
 */

const ModalB = require('../../common/modals/ModalB');
const React = require('react');
const { PropTypes } = React;

const FinancialStoriesModal = React.createClass({
    propTypes: {
        confirmCancel: PropTypes.bool,
        onClickDeleteTag: PropTypes.func,
        header: PropTypes.string,
        content: PropTypes.string,
        cancelButton: PropTypes.bool,
        cancelText: PropTypes.string,
        yesButton: PropTypes.bool,
        yesText: PropTypes.string,
        onPopupCancelClick:PropTypes.func,
    },
    getInitialState() {
        return { isConfirming: this.props.confirmCancel };
    },

    componentWillReceiveProps(nextProps) {
        this.setState({

            isConfirming: nextProps.confirmCancel,

        });
    },

    confirmCancel(cancelApplication) {
        this.setState({
            isConfirming: false,
        });

        if (cancelApplication) {
            this.props.onClickDeleteTag();
        } else {
            this.props.onPopupCancelClick && this.props.onPopupCancelClick();
        }
    },

    render() {
        return (
            <div>
                {this.state.isConfirming &&

                    <ModalB title="" >
                        <div className="modal_content">
                            <h3>{this.props.header}</h3>
                            <p>{this.props.content}</p>
                        </div>
                        <div className="modal_footer">
                            {this.props.cancelButton &&
                                <button
                                    onClick={() => { this.confirmCancel(false); } }
                                    className="btn btn-confirm"
                                    data-anchor="confirm-cancel-button"
                                    role="button"
                                > {this.props.cancelText}
                                </button>}
                            {this.props.yesButton &&
                                <button
                                    onClick={() => { this.confirmCancel(true); } }
                                    className="btn btn-confirm"
                                    data-anchor="confirm-cancel-button"
                                    role="button"
                                > <b>{this.props.yesText}</b>
                                </button>}
                            </div>
                    </ModalB>
                }
            </div>
        );
    },

});
module.exports = FinancialStoriesModal;
