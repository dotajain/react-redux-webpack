/**
 * @module FeatureWrapper
 */

const React = require('react');
const { PropTypes } = React;
const BrandUtils = require('../../utils/BrandUtils');
const FeatureSwitch = require('./FeatureSwitch');

const FeatureWrapper = WrappedComponent => React.createClass({

	propTypes: {
		feature: PropTypes.string.isRequired,
	},

	shouldComponentUpdate() {
		return BrandUtils.isAbleToDisplay(this.props.feature);
	},

	render() {
		return (<FeatureSwitch enabled={BrandUtils.isAbleToDisplay(this.props.feature)}>
					<WrappedComponent {...this.props} />
			</FeatureSwitch>);
	},
});

module.exports = FeatureWrapper;
