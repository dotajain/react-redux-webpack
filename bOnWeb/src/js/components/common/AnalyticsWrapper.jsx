/**
 * @module AnalyticsWrapper
 */
const React = require('react');
const { PropTypes } = React;
const AnalyticsActionCreator = require('../../actions/AnalyticsActionCreator');

const AnalyticsWrapper = WrappedComponent => React.createClass({

	propTypes: {
		onChange: PropTypes.func.isRequired,
		defaultValue: PropTypes.string,
	},

	/**
	 * Fires analytics event and passes
	 * name/value to parent onChange handler
	 *
	 * @param  {String} name  Key of the component question
	 * @param  {String} value
	 */

	onChange(name, value) {
		AnalyticsActionCreator.track({
			path: '/user/experience/activity',
			action: 'Interacted',
		}, {
			value,
			description: `${name}Entered`,
			event: (this.props.defaultValue ? 'updated' : 'created'),
		});

		this.props.onChange(name, value);
	},

	render() {
		return (
			<WrappedComponent
				{...this.props}
				onChange={this.onChange}
			/>
		);
	},
});

module.exports = AnalyticsWrapper;
