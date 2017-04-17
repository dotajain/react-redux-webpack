/**
 * @module MobileOverlay
 */
const React = require('react');
// const ReactDOM = require('react-dom');
// const Popover = require('react-bootstrap/lib/Popover');
// const Overlay = require('react-bootstrap/lib/OverlayTrigger');
const SessionActionCreator = require('../../actions/SessionActionCreator');
// const Measure = require('react-measure');
const { PropTypes } = React;

const MobileOverlay = React.createClass({
    propTypes: {
        content: PropTypes.object,
        selectedTab: PropTypes.string,
        managePaymentClick: PropTypes.func,
        managePayeeClick: PropTypes.func,
        createSweep: PropTypes.func,
        createAlert: PropTypes.func,
        openFaq: PropTypes.func,
        getHeaderClass: PropTypes.func,
    },
    getInitialState() {
        return {
            faqFlag: false,
            left:0,
            isOpen: false,
        };
    },
    createAlertClick() {
        this.closeNav();
        this.props.createAlert();
    },
    createSweepClick() {
        this.closeNav();
        this.props.createSweep;
    },
    logout() {
        SessionActionCreator.requestAccessTokenReset();
        window.location.reload();
    },
    moduleOptions() {
        switch (this.props.selectedTab) {
            case 'payments':
                return (<ul>
                    <li> <a className="" onClick={this.props.managePaymentClick}>
                        <span className = "title">{this.props.content.managePayments}</span><span className="icon icon-your-payments"></span>
                    </a></li>
                    <li><a className="" onClick={this.props.managePayeeClick}>
                        <span className = "title">{this.props.content.managePayeeLink}</span><span className="icon icon-payees"></span>
                    </a></li>
                    <li>
                        <a className="" onClick={this.props.openFaq}>
                            <span className = "title">FAQ</span><span className="icon icon-help-questions"></span>
                        </a></li>
                    <li>
                        <a className="" onClick={this.logout}>
                            <span className = "title">Logout</span><span className = "icon icon-logout"></span>
                        </a></li>
                </ul>);

            case 'alerts':
                return (<ul>
                    <li><a className="" onClick={this.createAlertClick}><span className = "title">Create Alerts</span><span className="icon icon-alerts"></span></a></li>
                    <li><a className="" onClick={this.props.createSweep}><span className = "title">Create Sweeps</span><span className="icon icon-pound"></span></a></li>
                    <li><a className="" onClick={this.props.openFaq}><span className = "title">FAQ</span><span className="icon icon-help-questions"></span></a></li>
                    <li><a className="" onClick={this.logout}><span className = "title">Logout</span><span className="icon icon-logout"></span></a></li>
                </ul>);
            default:
                return (<ul>
                    <li><a className="" onClick={this.props.openFaq}><span className = "title">FAQ</span><span className="icon icon-help-questions"></span></a></li>
                    <li><a className="" onClick={this.logout}><span className = "title">Logout</span><span className="icon icon-logout"></span></a></li>
                </ul>);
        }
    },
    optionClick() {
        this.setState({ isOpen: true });
        this.props.getHeaderClass('isPopOverOpen');
    },
    closeNav() {
        this.setState({ isOpen: false });
        this.props.getHeaderClass('');
    },
    mobileOption() {
        return (
                <div className="overlay overlay-hugeinc">
                    <nav>
                        <button className="arrow" onClick={this.closeNav}></button>
                        {this.moduleOptions() }
                    </nav>
                </div>
        );
    },
    

    render() {
        let navigation;
        let backdrop;
        if (this.state.isOpen) {
            navigation = this.mobileOption();
            backdrop = <button className="backdrop" onClick={this.closeNav}></button>;
        }
        return (
            <div className="meta-navigation">
                <a className="user-options" title="User Options" ref="useroption" onClick={this.optionClick}>
                    <span className="icon icon-item-dots icon-dot"></span>
                </a>
                {backdrop}
                {navigation}
            </div>
        );
    },
});

module.exports = MobileOverlay;
