/**
 * @module Expenditure
 */

const React = require('react');
const { PropTypes } = React;

const ComponentHeader = require('../../common/ComponentHeader');
const { CurrencyQuestion } = require('../../common/questionsets');

const Expenditure = props => (
	<div>
		<ComponentHeader
			title={props.content.expenditureSectionTitle}
			titleLevel={2}
		>

			<CurrencyQuestion
				name="mortgageOrRentExpenditure"
				group={props.group}
				onChange={props.onChange}
				defaultValue={props.data.mortgageOrRentExpenditure}
				dataAnchor="expenditure-housing"
				required
			>
				{props.content.mortgageOrRentExpenditure}
			</CurrencyQuestion>
			<CurrencyQuestion
				name="expenditureOther"
				group={props.group}
				onChange={props.onChange}
				defaultValue={props.data.expenditureOther}
				dataAnchor="expenditure-other"
				required
			>
				{props.content.expenditureOther}
			</CurrencyQuestion>

		</ComponentHeader>
	</div>
);

Expenditure.propTypes = {
	group: PropTypes.string.isRequired,
	content: PropTypes.object.isRequired,
	data: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
};

module.exports = Expenditure;
