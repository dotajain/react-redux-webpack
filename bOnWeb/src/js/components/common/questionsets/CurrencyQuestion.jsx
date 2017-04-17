/**
 * @module CurrencyQuestion
 */

const React = require('react');

const TextQuestion = require('./TextQuestion');

/**
 * CurrencyQuestion is just a convenience class.
 * All of the work is done in TextQuestion, we just pass
 * some extra currency-specific props here.
 */
const CurrencyQuestion = React.createClass({

	getDefaultProps() {
		return {
			minLength: 1,
			maxLength: 15,
		};
	},

	render() {
		return (
			<TextQuestion
				{...this.props}
				inputClassName="currency"
				validateType="currency"
			/>
		);
	},
});

module.exports = CurrencyQuestion;
