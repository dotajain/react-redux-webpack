/**
 * @module ResetTasksOnBackButton
 */

const React = require('react');
const { PropTypes } = React;

const AccountOpeningActions = require('../actions/AccountOpeningActions');

const ResetTasksOnBackButton = WrappedComponent => React.createClass({
	propTypes: {
		appData: PropTypes.object.isRequired,
		pushState: PropTypes.object,
	},

	getInitialState() {
		return {
			isClearingTasks: false,
		};
	},

	componentDidUpdate() {
		if (this.hasTasksOnBackButton()) {
			this.setState({
				isClearingTasks: true,
			}, () => {
				// web tasks is cleared in order to make it possible
				// to proceed to the next step
				AccountOpeningActions.clearWebTask();
			});
		} else if (!this.isBackButtonPressed() && this.state.isClearingTasks) {
			this.setState({
				isClearingTasks: false,
			});
		}
	},

	/**
	 * Check if webTaskId is set when back button is pressed
	 * @return {Boolean}
	 */
	hasTasksOnBackButton() {
		return !this.state.isClearingTasks && this.isBackButtonPressed() && !!this.props.appData.webTaskId;
	},

	isBackButtonPressed() {
		const action = this.props.pushState && this.props.pushState.action;
		return action === 'pop';
	},

	render() {
		return (<WrappedComponent {...this.props} />);
	},
});

module.exports = ResetTasksOnBackButton;
