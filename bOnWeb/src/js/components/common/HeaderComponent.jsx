/**
 * @module HeaderComponent
 */

const React = require('react');
const { PropTypes } = React;
const LableWithIconComponent = require('./LableWithIconComponent');
const AccountOpeningActions = require('../../actions/AccountOpeningActions');
const PageOverlayMenu = require('./PageOverlayMenu');
const MobileOverlay = require('../common/MobileOverlay');

const HeaderComponent = React.createClass({
    propTypes: {
        data: PropTypes.object,
        content: PropTypes.object,
        selectedTab: PropTypes.string,
    },
    getInitialState () {
        return {
            headerClassOnPopOver: null,
        };
    },
    /**
	 * return action for header navigation
	 */
    headerTab(e) {
        switch (e) {
            case 'You':
                AccountOpeningActions.navigateToWebTask('WEB-TIMELINE');
                break;
            case 'Payments':
                AccountOpeningActions.navigateToWebTask('WEB-OPEN-PAYMENTS');
                break;
            case 'Spending':
                AccountOpeningActions.navigateToWebTask('WEB-OPEN-SPENDINGS');
                break;
            case 'Savings Pots':
                AccountOpeningActions.navigateToWebTask('WEB-OPEN-SAVING-POTS');
                break;
            case 'Alerts':
                AccountOpeningActions.navigateToWebTask('WEB-OPEN-ALERTS');
                break;
            case 'Help':
                AccountOpeningActions.navigateToWebTask('WEB-OPEN-HELP');
                break;
            case 'Logout':
                AccountOpeningActions.navigateToWebTask('WEB-OPEN-LOGOUT');
                break;
        }
    },
    getHeaderClass (e) {
      this.setState({ headerClassOnPopOver: e });
    },
    render() {
        return (
            <header role="navigation" className={this.state.headerClassOnPopOver}>
                <div className="navigation main">
                    <ul className="">
                        <LableWithIconComponent {...this.props}
                            lableName="You"
                            alt="you"
                            onClick={this.headerTab}
                            className = {this.props.selectedTab === 'you' ? 'active' : ''}
                            />

                        <LableWithIconComponent {...this.props}
                            lableName="Payments"
                            alt="payments"
                            onClick={this.headerTab}
                            className = {this.props.selectedTab === 'payments' ? 'active' : ''}

                            />

                        <LableWithIconComponent {...this.props}
                            lableName="Spending"
                            alt="spending"
                            onClick={this.headerTab}
                            className = {this.props.selectedTab === 'spending' ? 'active' : ''}
                            />

                        <LableWithIconComponent {...this.props}
                            lableName="Savings Pots"
                            alt="goals"
                            onClick={this.headerTab}
                            className = {this.props.selectedTab === 'savingpots' ? 'active' : ''}
                            />

                        <LableWithIconComponent {...this.props}
                            lableName="Alerts"
                            alt="alerts"
                            onClick={this.headerTab}
                            className = {this.props.selectedTab === 'alerts' ? 'active' : ''}
                            />

                        <LableWithIconComponent {...this.props}
                            lableName="Help"
                            alt="helps"
                            onClick={this.headerTab}
                            className = {this.props.selectedTab === 'help' ? 'active' : ''}
                            />

                        <MobileOverlay getHeaderClass={this.getHeaderClass} selectedTab ="desktop" content={this.props.content} openFaq={this.props.openFaq}/>
                    </ul>

                </div>
            </header>
        );
    },
});

module.exports = HeaderComponent;
