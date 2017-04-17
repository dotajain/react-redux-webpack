/**
 * @module MobileOverlay
 */
const React = require('react');
const ReactDOM = require('react-dom');
const Popover = require('react-bootstrap/lib/Popover');
const Overlay = require('react-bootstrap/lib/OverlayTrigger');
const SessionActionCreator = require('../../actions/SessionActionCreator');
const { PropTypes } = React;


const ScreenOverlay = React.createClass({
    propTypes: {
        content: PropTypes.object,
        selectedTab: PropTypes.string,
        managePaymentClick: PropTypes.func,
        managePayeeClick: PropTypes.func,
        createSweep: PropTypes.func,
        createAlert: PropTypes.func,
        openFaq: PropTypes.func,
    },
    getInitialState() {
        return {
            faqFlag: false,
        };
    },
        componentDidMount() {
        console.log(this.refs.useroption);
        // Print component dimensions to console
        this.refs.useroption.measure( (fx, fy, width, height, px, py) => {
            console.log('Component width is: ' + width)
            console.log('Component height is: ' + height)
            console.log('X offset to frame: ' + fx)
            console.log('Y offset to frame: ' + fy)
            console.log('X offset to page: ' + px)
            console.log('Y offset to page: ' + py)
        })
    },

    // enter event of overlay
    onEnter(e) {
        ReactDOM.findDOMNode(e).parentNode.className = 'logout-option';
        ReactDOM.findDOMNode(e).parentNode.addEventListener('touchend', this.tapOrClick, false);
    },
    // exit event of the overlay
    onExit(e) {
        ReactDOM.findDOMNode(e).parentNode.className = '';
        ReactDOM.findDOMNode(e).parentNode.removeEventListener('touchend', this.tapOrClick, false);
    },
    logout() {
        SessionActionCreator.requestAccessTokenReset();
    },
    tapOrClick() {
        return true;
    },

    moduleOptions() {
        switch (this.props.selectedTab) {
            case 'payments':
                return (<ul>
                    <li> <a className="page-options" onClick={this.props.managePaymentClick}>
                        <span className = "title">{this.props.content.managePayments}</span><span className="icon icon-your-payments"></span>
                    </a></li>
                    <li><a className="page-options" onClick={this.props.managePayeeClick}>
                        <span className = "title">{this.props.content.managePayeeLink}</span><span className="icon icon-payees"></span>
                    </a></li>
                    <li>
                        <a className="page-options" onClick={this.props.openFaq}>
                            <span className = "title">FAQ</span><span className="icon icon-help-questions"></span>
                        </a></li>
                    <li>
                        <a className="page-options" onClick={this.logout}>
                            <span className = "title">Logout</span><span className = "icon icon-logout"></span>
                        </a></li>
                </ul>);

            case 'alerts':
                return (<ul>
                    <li><a className="page-options" onClick={this.props.createAlert}><span className = "title">Create Alerts</span><span className="icon icon-alerts"></span></a></li>
                    <li><a className="page-options" onClick={this.props.createSweep}><span className = "title">Create Sweeps</span><span className="icon icon-pound"></span></a></li>
                    <li><a className="page-options" onClick={this.props.openFaq}><span className = "title">FAQ</span><span className="icon icon-help-questions"></span></a></li>
                    <li><a className="page-options" onClick={this.logout}><span className = "title">Logout</span><span className="icon icon-logout"></span></a></li>
                </ul>);
            default:
                return (<ul>
                    <li><a className="page-options" onClick={this.props.openFaq}><span className = "title">FAQ</span><span className="icon icon-help-questions"></span></a></li>
                    <li><a className="page-options" onClick={this.logout}><span className = "title">Logout</span><span className="icon icon-logout"></span></a></li>
                </ul>);
        }
    },
    mobileOption() {
        return (

            <Popover id= "popover-trigger-click-root-close" ref="useroption">
                <div className="overlay overlay-hugeinc">
                    <nav>
                        {this.moduleOptions() }
                    </nav>
                </div>
            </Popover>
        );
    },

    render() {
        return (
            <Overlay
                rootClose
                trigger="click"
                placement="bottom"
                overlay={this.mobileOption() }
                onExit={this.onExit}
                onEnter={this.onEnter}
                >
                <a className="user-options" ref="useroption" title="User Options" >
                    <span className="icon icon-item-dots icon-dot"></span>
                </a>
            </Overlay>
        );
    },


});

module.exports = ScreenOverlay;
