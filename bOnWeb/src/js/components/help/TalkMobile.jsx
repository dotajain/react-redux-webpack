/**
 * @module TalkMobile Screen
 */
const React = require('react');
const { PropTypes } = React;
const TalkMobile = React.createClass({
    propTypes: {
        content: PropTypes.object,
        closed: PropTypes.func,
    },
    data() {
        return {
            __html: this.props.content.TalkMobileData,
        };
    },
    data1() {
        return {
            __html: this.props.content.TalkMobileData1,
        };
    },
    render() {
        return (
            <div className="b container-fluid-full">
                <div className="help mobile-view">

                    <div className="mobile-nav">
                        <a className="icon float-left" onClick={ this.props.closed}>Back</a>
                    </div>

                    <div className="mobile-content">
                        <h3 className="bold"><div className="padding-bottom">{this.props.content.TalkHead}</div></h3>
                        <p dangerouslySetInnerHTML={this.data() }></p>
                        <p dangerouslySetInnerHTML={this.data1() }></p>
                    </div>
                </div>
            </div>
        );
    },
});
module.exports = TalkMobile;
