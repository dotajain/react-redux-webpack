/**
 * @module ProductBlacklist
 * @requires react
 * @requires react-router
 * @requires lodash
 */
const React = require('react');
const _ = require('lodash');

const AccountOpeningActions = require('../actions/AccountOpeningActions');

const existingCustomerRule = {
    applies: product => !_.isUndefined(product.existingCustomersOnly),
    check: (product, data, pathname, query) => (product.existingCustomersOnly && pathname.indexOf('authentication') < 0 && data.isExistingCustomer !== 'Yes') || (_.isEmpty(query) && data.isExistingCustomer === 'No'),
};

const allowedAltProduct = (product, data) => product.blackListedProduct && data.isAltProduct;

const blackListedProductRule = {
	applies: product => !_.isUndefined(product.blackListedProduct),
	check: (product, data) => !allowedAltProduct(product, data) && product.blackListedProduct,
};

const rules = [existingCustomerRule, blackListedProductRule];

/**
* @function executeRules given a product pass through rule set to determine violations
* @param {object} product	product being applied for
* @param {object}	data application data object
* @param {string}	pathname URL path
* @param {object} query	object representing any URL query
* @return {boolean} returns true if any rule is violated, false otherwise
*/
const executeRules = (product, data, pathname = '', query = {}) => {
	const ruleViolations = _.filter(rules, rule => rule.applies(product, data, pathname, query) && rule.check(product, data, pathname, query));

	return ruleViolations.length > 0;
};

const ProductBlacklist = WrappedComponent => React.createClass({

	componentDidMount() {
		this.redirectIfRequired(this.props);
	},

	componentWillReceiveProps(nextProps) {
		this.redirectIfRequired(nextProps);
	},

	redirectIfRequired(props) {
		if (executeRules(props.data.product, props.data, props.pushState.pathname, props.pushState.query)) {
			AccountOpeningActions.navigateToWebTask('WEB-ERROR');
		}
	},

	render() {
		return (<WrappedComponent {...this.props} />);
	},
});

module.exports = ProductBlacklist;
