/**
 * @module Talk Screen
 */
const React = require('react');
const { PropTypes } = React;
const Talk = React.createClass({
    propTypes: {
        content: PropTypes.object,
        closed: PropTypes.func,
    },

    render() {
        return (
             <div className="b container-fluid talk">
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <h3 className="bold padding-top"><div className="padding-bottom">{this.props.content.TalkHead}</div></h3>
                        <p>{this.props.content.TalkData}</p>
                        <p>{this.props.content.TalkData1}</p>

                        <div className="col-lg-12 panel help_btn_panel">
                            <button
                                onClick={ this.props.closed}
                                className="help_btn"
                                data-anchor="confirm-cancel-button"
                                bsSize="large"
                                role="button"
                                bsSize="large" block
                            >{this.props.content.TalkButton}</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
});
module.exports = Talk;
