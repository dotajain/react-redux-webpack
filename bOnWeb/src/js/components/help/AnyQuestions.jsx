/**
* @module AnyQuestions Screen
*/
const React = require('react');
const { PropTypes } = React;
const AnyQuestions = React.createClass({
    propTypes: {
        content: PropTypes.object,
        iframe: PropTypes.string,
        closed: PropTypes.func,
    },
    getInitialState() {
        return {
            iframe: '<embed width="auto" style="border: none; width: 100vw; height: calc(100vh - 66px);" src="https://help.cybonline.co.uk/system/selfservice.controller?CONFIGURATION=1171&PARTITION_ID=1&CMD=STARTPAGE&USERTYPE=1&isSecure=true&isSecure=true&LANGUAGE=en&COUNTRY=us" height="auto" cellspacing="5" id="iframe"></embed  >',
            length: window.history.length,
            backClick: 0,
            name: 'load',
        };
    },
    // iframe renders.
    iframe() {
        return {
            __html: this.state.iframe,
        };
    },

    // OnClick Refresh the iframe.
    refresh() {
        if (this.state.name === 'load') {
            this.setState({ iframe: '<embed  width="auto" style="border: none; width: 100vw; height: calc(100vh - 66px);" src="https://help.cybonline.co.uk/system/selfservice.controller?CONFIGURATION=1171&PARTITION_ID=1&CMD=STARTPAGE&USERTYPE=1&isSecure=true&isSecure=true&LANGUAGE=en&COUNTRY=us" height="auto" id="refresh"></embed> ', name: 'refresh' });
        }
        else {
            this.setState({ iframe: '<embed  width="auto" style="border: none;  width: 100vw; height: calc(100vh - 66px);" src="https://help.cybonline.co.uk/system/selfservice.controller?CONFIGURATION=1171&PARTITION_ID=1&CMD=STARTPAGE&USERTYPE=1&isSecure=true&isSecure=true&LANGUAGE=en&COUNTRY=us" height="auto" id="load"></embed> ', name: 'load' });
            }
    },
    back() {
        if (this.state.length !== (window.history.length - this.state.backClick)) {
            window.history.go(-1);
            this.setState({ backClick: this.state.backClick + 1 });
        }
    },
    forward() {
        window.history.forward();
        if (this.state.backClick > 0) {
            this.setState({ backClick: this.state.backClick - 1 });
        }
    },
    render() {
        return (

            <div className="b container-fluid-full">
                <div className="help any-question mobile-view">
                    <div className="mobile-nav">
                        <a className="icon icon-swipe-left float-left" onClick={this.back} onLoad={this.load}> </a>
                        <a className="icon icon-swipe-right float-left" onClick={this.forward} > </a>
                        <a className="refresh-btn" onClick={this.refresh}><img className="icon icon-refresh" style={{ 'height': '33px' }}src="../images/b/icons/icon_refresh.svg" ></img></a>
                        <a className="icon icon-right float-right" onClick={ this.props.closed}>{this.props.content.FaqDone}</a>
                    </div>
                    <div className="row no-gutters mobile-content full">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="full-height" dangerouslySetInnerHTML={ this.iframe() } />
                        </div></div>
                </div></div>
        );
    },
});

module.exports = AnyQuestions;
