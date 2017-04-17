/**
 * @module DemoGo Screen
 */
const React = require('react');
const { PropTypes } = React;
const ProjectionDemoGo = React.createClass({
    propTypes: {
        content: PropTypes.object,
        closed: PropTypes.func,
    },
    render() {
        return (
            <div className="go">
                <div className="row">
                    <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1 padding-top text-center">
                        <h1>Ready? Go</h1>
                        <a className="help_btn" onClick={ this.props.closed}>Done</a>
                    </div>
                </div>
            </div>
        );
    },
});

module.exports = ProjectionDemoGo;
