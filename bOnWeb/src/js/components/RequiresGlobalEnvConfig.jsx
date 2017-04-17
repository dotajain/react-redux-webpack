/**
 * @module RequiresGlobalEnvConfig
 * HOC: responsible for supplying the globalConfig as props to children
 */
const React = require('react');
const { PropTypes } = React;
const globalConfig = require('static/config');

const RequiresGlobalEnvConfig = WrappedComponent => React.createClass({

	propTypes: {
		envConfig: PropTypes.object,
	},

	getDefaultProps() {
		return {
			envConfig: globalConfig,
		};
	},

	render() {
		return (<WrappedComponent {...this.props} />);
	},
});

module.exports = RequiresGlobalEnvConfig;
