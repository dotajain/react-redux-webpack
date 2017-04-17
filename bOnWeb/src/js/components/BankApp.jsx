/**
 * @module BankApp
 */

const React = require('react');
const { PropTypes } = React;
const ReactRouter = require('react-router');
const RouteHandler = ReactRouter.RouteHandler;
const Navigation = ReactRouter.Navigation;

const config = require('../config');

const AppStore = require('../stores/AppStore');

const AnalyticsActionCreator = require('../actions/AnalyticsActionCreator');

function getStateFromStores() {
	return {
		appData: AppStore.getAll(),
	};
}

const BankApp = React.createClass({

	propTypes: {
		pushState: PropTypes.object,
	},

	mixins: [Navigation],

	getInitialState() {
		return getStateFromStores();
	},

	componentWillMount() {
		// The analytics dispatch loop is set to start when the application is about to load.
		AnalyticsActionCreator.requestCheckLoopStart();
	},

	componentDidMount() {
		AppStore.addChangeListener(this._onStoreChange);

		AnalyticsActionCreator.track({
			path: '/user/experience/lifecycle',
			action: 'Started',
		});
	},

	/**
	 * Triggered on a state change.
	 * Has the task ID changed? If so, navigate the user.
	 * API Task IDs are separate to web task IDs so that we can reliably detect intentional changes.
	 *
	 * @param  {Object} prevProps
	 * @param  {Object} prevState
	 */
	componentDidUpdate(prevProps, prevState) {
		let newUrl;
		const prev = prevState.appData;
		const current = this.state.appData;

		if (prev.apiTaskId !== current.apiTaskId) {
			newUrl = current.apiTaskId;
		} else if (prev.webTaskId !== current.webTaskId) {
			newUrl = current.webTaskId;
		}

		if (newUrl) {
			this.transitionTo(config.taskUrls[newUrl]);
		}
	},

	componentWillUnmount() {
		AppStore.removeChangeListener(this._onStoreChange);
	},

	/**
	 * Store has been updated.
	 *
	 * @param  {Event} e
	 */
	_onStoreChange() {
		this.setState(getStateFromStores());
	},

	render() {
		return (
			<div>
				<RouteHandler
					{...this.props}
					{...this.state}
				/>
			</div>
		);
	},
});

module.exports = BankApp;
