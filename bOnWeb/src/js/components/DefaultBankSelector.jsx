/**
 * @module DefaultBankSelector
 * HOC: responsible for setting the default bank ID (if only one option available)
 */
const React = require('react');
const { PropTypes } = React;

const AccountOpeningActions = require('../actions/AccountOpeningActions');

function isCYB(bankId) {
	return bankId !== 'DYB' ? bankId : undefined;
}

const DefaultBankSelector = WrappedComponent => React.createClass({

	propTypes: {
		envConfig: PropTypes.object,
	},

	componentWillMount() {
		const bankId = this.props.envConfig.bankId;

		if (isCYB(bankId)) {
			AccountOpeningActions.setBankId(bankId);
		}
	},

	render() {
		return (<WrappedComponent { ...this.props } />);
	},
});

module.exports = DefaultBankSelector;
