/**
 * @module RedirectErrorOnBack
 */
const React = require('react');
const { PropTypes } = React;
const AccountOpeningActions = require('../actions/AccountOpeningActions');

const _ = require('lodash');

const RedirectErrorOnBack = WrappedComponent => React.createClass({
	propTypes: {
		pushState: PropTypes.object,
		session: PropTypes.shape({
			authenticated: PropTypes.boolean,
		}),
		customer: PropTypes.shape({
			customerNumber: PropTypes.string,
		}),
	},

	componentWillMount() {
		if (this.requiresRedirect() && !this.props.session.authenticated && !_.isEmpty(this.props.customer.customerNumber)) {
			AccountOpeningActions.clearWebTask();
			AccountOpeningActions.navigateToWebTask('WEB-ERROR');
		}
	},

	requiresRedirect() {
		return this.props.pushState.action === 'pop';
	},

	render() {
		return (<WrappedComponent {...this.props} />);
	},
});

module.exports = RedirectErrorOnBack;
