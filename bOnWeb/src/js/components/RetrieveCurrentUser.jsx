/**
 * @module RetrieveCurrentUser
 */

const React = require('react');
const { PropTypes } = React;

const SessionActionCreator = require('../actions/SessionActionCreator');

const RetrieveCurrentUser = WrappedComponent => React.createClass({
	propTypes: {
		data: PropTypes.object.isRequired,
		session: PropTypes.object.isRequired,
	},

	getInitialState() {
		return { fetching: false };
	},

	componentWillMount() {
		this.checkRetrieved(this.props);
	},

	componentWillReceiveProps(nextProps) {
		this.checkRetrieved(nextProps);

		if (this.state.fetching && nextProps.session.retrievedUser) {
			this.setState({ fetching: false });
		}
	},

	checkRetrieved(props) {
		if (!this.requiredToBeRetrieved(props, this.state)) {
			return;
		}
		this.setState({ fetching: true }, SessionActionCreator.getCurrentUser);
	},

	requiredToBeRetrieved(props, state) {
		return !state.fetching &&
			props.session.authenticated &&
			!props.session.retrievedUser;
	},

	render() {
		return (<WrappedComponent {...this.props} />);
	},
});

module.exports = RetrieveCurrentUser;
