/**
 * @module RequiresAuthenticatedUser
 */

const React = require('react');
const { PropTypes } = React;


const AccountOpeningActions = require('../actions/AccountOpeningActions');

const RequiresAuthenticatedUser = WrappedComponent => React.createClass({
	propTypes: {
		session: PropTypes.shape({
			authenticated: PropTypes.bool,
		}),
	},

	componentWillMount() {
		if (!this.props.session.authenticated) {
			AccountOpeningActions.navigateToWebTask('WEB-AUTHENTICATION');
			return;
		}
		if (this.requiresRedirect()) {
			AccountOpeningActions.clearWebTask();
			AccountOpeningActions.navigateToWebTask('WEB-AUTHENTICATION');
		}
	},
	
	requiresRedirect() {
		return this.props.pushState.action === 'pop';
	},
	render() {
		if (!this.props.session.authenticated) {
			return null;
		}

		return (
			<WrappedComponent {...this.props} />
		);
	},
});

module.exports = RequiresAuthenticatedUser;
