/**
 * @module Email Screen
 */
const React = require('react');
const { PropTypes } = React;
const Email = React.createClass({
    propTypes: {

        content: PropTypes.object,
        closed: PropTypes.func,
    },
    render() {
        return (
            <div className="b container-fluid email">
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <h3 className="bold padding-top"><div className="padding-bottom">{this.props.content.EmailHead}</div></h3>
                        <p>{this.props.content.HelpEmailHead} </p>
                        <p dangerouslySetInnerHTML={{ __html: this.props.content.EmailBody }}></p>
                    </div>

                    <div className="col-lg-6 col-xs-6 col-md-6 col-sm-6 panel help_btn_panel">
                        <button className="help_btn" onClick={ this.props.closed} data-anchor="confirm-cancel-button" bsSize="large" role="button" bsSize="large" block>
                            {this.props.content.EmailButton1}
                          </button>
                    </div>

                    <div className="col-lg-6 col-xs-6 col-md-6 col-sm-6 panel help_btn_panel">
                        <a className="help_btn" data-anchor="confirm-cancel-button" href= {`mailto:${this.props.content.FeedbackEmail}?subject=${this.props.content.EmailSubjectLine}`} bsSize="large" role="button" bsSize="large" block target="_top">
                          {this.props.content.EmailButton2}
                        </a>
                    </div>
                </div>
            </div>
        );
    },
});

module.exports = Email;
