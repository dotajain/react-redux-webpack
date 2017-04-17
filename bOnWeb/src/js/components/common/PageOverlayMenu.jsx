/**
 * @module PageOverlayMenu
 */

// Packages
const React = require('react');
const SessionActionCreator = require('../../actions/SessionActionCreator');
const AnyQuestions =require('../help/AnyQuestions');

const PageOverlayMenu = React.createClass({
    getInitialState() {
        return {
            faqFlag: false,
        };
    },
    logout() {
        SessionActionCreator.requestAccessTokenReset();
    },
    openFaq() {
       // this.setState({ faqFlag: true });
    },
    closeFaq() {
        this.setState({ faqFlag: false });
    },
	render() {
		return (
            this.state.faqFlag ? <AnyQuestions {...this.props} closed = {this.closeFaq}/> :
            <div className="menu-overlay">
                <input type="checkbox" id="menuOverlay-landing"></input>
                <div className="lower">
                    <label className="user-options" htmlFor="menuOverlay-landing" title="User Options">
                        <span className="icon icon-item-dots"></span>
                    </label>
                </div>
                <div className="overlay overlay-hugeinc">
                    <nav>
                        <label htmlFor="menuOverlay-landing"></label>
                        <ul>
                            <li><a href="#" onClick={this.openFaq}>Faq <span className="icon icon-help-questions"></span></a></li>
                            <li><a href="#" onClick={this.logout}>Logout <span className="icon icon-logou"></span></a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
	},
});

module.exports = PageOverlayMenu;