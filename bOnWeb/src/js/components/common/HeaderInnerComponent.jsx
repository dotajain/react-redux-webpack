/**
 * @module HeaderComponent
 */

const React = require('react');
const { PropTypes } = React;
const LableWithIconComponent = require('./LableWithIconComponent');
const AccountOpeningActions = require('../../actions/AccountOpeningActions');

const HeaderInnerComponent = React.createClass({
    propTypes: {
        data: PropTypes.object,
        content: PropTypes.object,
        selectedTab: PropTypes.string,
        isArrow: PropTypes.bool,
    },
    getDefaultProps() {
        return {
            isArrow: false,
        }
    },

    commponentWillMount() {
    },
    cancelClick() {
        this.props.cancelClick();
    },
    /**
	 * return action for header navigation
	 */

    render() {
        return (
            <header role="navigation">
                <div className="navigation inner row no-gutters">
                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                        <a className="page-options opt-green float-left" onClick={this.cancelClick}>
                            {this.props.isArrow && <span className = "icon icon-swipe-left"></span> }
                            { this.props.cancelTitle}
                        </a>
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 ">
                        <h4 className="text-center">{this.props.title}</h4>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                    </div>
                </div>
            </header>
        );
    },
});

module.exports = HeaderInnerComponent;
