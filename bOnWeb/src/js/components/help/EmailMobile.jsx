/**
 * @module Email Screen
 */
const React = require('react');
const { PropTypes } = React;
const EmailMobile = React.createClass({
    propTypes: {

        content: PropTypes.object,
        closed: PropTypes.func,
    },

    emailContent() {
        return {
            __html: this.props.content.EmailBody1,
        };
    },

    render() {
        return (
             <div className="b container-fluid-full">
                <div className="help mobile-view">

                <div className="row no-gutters mobile-nav">
                    <a className="icon float-left" onClick={ this.props.closed}>Back</a>
                </div>

                <div className="mobile-content">
                       <h3 className="bold"><div>{this.props.content.EmailHead}</div></h3>
                        <p>{this.props.content.HelpEmailHead} </p>
                        <p dangerouslySetInnerHTML={this.emailContent() }></p>
                  <a className="action-button" data-anchor="confirm-cancel-button" href= {`mailto:${this.props.content.FeedbackEmail}?subject=${this.props.content.EmailSubjectLine}`} bsSize="large" role="button" block target="_top">
                    Send email
                  </a>
                </div>
            </div>
          </div>
        );
    },
});

module.exports = EmailMobile;
