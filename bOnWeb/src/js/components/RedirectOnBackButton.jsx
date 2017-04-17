/**
 * @module RedirectOnBackButton
 */

const React = require('react');
const { PropTypes } = React;

const AccountOpeningActions = require('../actions/AccountOpeningActions');

const RedirectOnBackButton = WrappedComponent => React.createClass({
	propTypes: {
		pushState: PropTypes.object,
	},

	getInitialState() {
		return {
			isRedirecting: false,
		};
	},

	componentDidUpdate() {
		if (this.isRedirectRequired()) {
			this.setState({
				isRedirecting: true,
			}, () => {
				AccountOpeningActions.navigateToWebTask('WEB-SUBMIT-FORM');
			});
		} else if (!this.isBackButtonPressed() && this.state.isRedirecting) {
			this.setState({
				isRedirecting: false,
			});
		}
	},

	isBackButtonPressed() {
		const action = this.props.pushState && this.props.pushState.action;
		return action === 'pop';
	},

	isRedirectRequired() {
		return !this.state.isRedirecting && this.isBackButtonPressed();
	},

	render() {
		return (<WrappedComponent {...this.props} />);
	},
});

module.exports = RedirectOnBackButton;
