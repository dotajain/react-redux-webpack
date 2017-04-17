/**
 * @module ResetTasksOnBackButton
 */

const React = require('react');
const { PropTypes } = React;

const _ = require('lodash');

const AccountOpeningActions = require('../actions/AccountOpeningActions');

const isValidProduct = product => product && !_.isEmpty(product) && product.productType.name !== 'empty';

const RequiresProductCode = WrappedComponent => React.createClass({
	propTypes: {
		data: PropTypes.object.isRequired,
		query: PropTypes.object,
	},

	componentWillMount() {
		if (!this.props.data.productCode) {
			let productCode = this.props.query && this.props.query.applyFor;

			if (!productCode && process.env.NODE_ENV === 'development') {
				productCode = localStorage.getItem('productCode');
			}

			if (!productCode) {
				AccountOpeningActions.navigateToWebTask('WEB-ERROR');
				return;
			}

			AccountOpeningActions.setProductCode(productCode);
		}

		if (this.props.data.productCode && !isValidProduct(this.props.data.product)) {
			AccountOpeningActions.navigateToWebTask('WEB-ERROR');
		}
	},

	componentWillReceiveProps(nextProps) {
		if (nextProps.data.productCode && _.isEmpty(nextProps.data.product)) {
			AccountOpeningActions.navigateToWebTask('WEB-ERROR');
		}
	},

	render() {
		return isValidProduct(this.props.data.product) ? (<WrappedComponent {...this.props} />) : null;
	},
});

module.exports = RequiresProductCode;
