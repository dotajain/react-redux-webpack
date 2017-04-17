const React = require('react');
const { PropTypes } = React;
const AlertsnSweepsError = React.createClass({
    propTypes: {
        reload: PropTypes.func,
        content: PropTypes.object,
	},

    getDeafultProps: {

        width: 10,
        height: 10,
    },

	render() {
        const content = this.props.content;
		return (
            <div className=" alertsnSweepsError content-wrapper">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                        <div className="errorBlock">
                            <h4>{this.props.content.alertsSweepsHead}</h4>
                            <h1>{content.errorHeader}</h1>
                            <p>{content.errorMessage}</p>
                            <a className="page-options border col ">
                            <span onClick={this.props.reload}>{content.triggerDashboardViewController_NoEligibleAccounts_ButtonTitle}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
		);
	},
});

module.exports = AlertsnSweepsError;
