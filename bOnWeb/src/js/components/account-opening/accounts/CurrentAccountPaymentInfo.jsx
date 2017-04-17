/**
 * @module CurrentAccountPaymentInfo
 */

const React = require('react');
const { PropTypes } = React;

const config = require('../../../config');
const { DropdownQuestion, CurrencyQuestion } = require('../../common/questionsets');

const CurrentAccountPaymentInfo = props => (
	<div>
		<DropdownQuestion
			name="incomeOtherPaymentTypeOptions"
			group={props.group}
			data={config.formOptionsIncomeOtherPaymentType}
			onChange={props.onChange}
			defaultValue={props.data.incomeOtherPaymentTypeOptions}
			dataAnchor="income-other-payment-type"
			required
		>
			{props.content.incomeOtherPaymentType}
		</DropdownQuestion>

		<CurrencyQuestion
			name="incomeOtherPaymentAmount"
			group={props.group}
			onChange={props.onChange}
			defaultValue={props.data.incomeOtherPaymentAmount}
			dataAnchor="income-other-payment-amount"
			required
		>
			{props.content.incomeOtherPaymentAmount}
		</CurrencyQuestion>
		<DropdownQuestion
			name="incomeOtherAccountPurpose"
			group={props.group}
			data={config.formOptionsAccountPurpose}
			onChange={props.onChange}
			defaultValue={props.data.incomeOtherAccountPurpose}
			dataAnchor="income-other-account-purpose"
			required
		>
			{props.content.incomeOtherAccountPurpose}
		</DropdownQuestion>
	</div>
);

CurrentAccountPaymentInfo.propTypes = {
	group: PropTypes.string.isRequired,
	content: PropTypes.object.isRequired,
	data: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
};

module.exports = CurrentAccountPaymentInfo;
