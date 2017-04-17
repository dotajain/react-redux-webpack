/**
 * @module HeaderWithoutTitleComponent
 */

const React = require('react');
const { PropTypes } = React;
const LableWithIconComponent = require('./LableWithIconComponent');
const AccountOpeningActions = require('../../actions/AccountOpeningActions');

const HeaderWithoutTitleComponent = React.createClass({
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
        console.log(this.props.content);
    },
    /**
	 * return action for header navigation
	 */

    render() {
        return (
            <header role="navigation">
                <div className="navigation no-head row no-gutters">
                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                        <a className="page-options opt-green float-left" onClick={this.props.backClick}>
                            {this.props.isArrow && <span className = "icon icon-swipe-left"></span> }
                            {this.props.backTitle}
                        </a>

                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 ">
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                        <a className="page-options opt-green float-right" onClick={this.props.archivedClick}>
                            {this.props.archivedTitle}
                        </a>

                    </div>
                </div>
            </header>
        );
    },
});

module.exports = HeaderWithoutTitleComponent;
