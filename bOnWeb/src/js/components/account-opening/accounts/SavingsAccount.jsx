const React = require('react');
const { PropTypes } = React;

const config = require('../../../config');

const AccountOpeningActions = require('../../../actions/AccountOpeningActions');

const SectionFullWidth = require('../../common/SectionFullWidth.jsx');
const SavingsAccountPaymentInfoSection = require('./SavingsAccountPaymentInfoSection');

const { DropdownQuestion, CurrencyQuestion } = require('../../common/questionsets');

const SavingsAccount = React.createClass({

	propTypes: {
		data: PropTypes.object.isRequired,
		content: PropTypes.object.isRequired,
		group: PropTypes.string.isRequired,
	},

	render() {
		return (
				<SectionFullWidth id="savings-account-details">
					<hr />
					<SavingsAccountPaymentInfoSection
						{...this.props}
					/>
					<DropdownQuestion
						name="incomeOtherSavingsTypeOptions"
						group={this.props.group}
						data={config.formOptionsIncomeOtherPaymentType}
						onChange={AccountOpeningActions.updateFormValue}
						defaultValue={this.props.data.incomeOtherSavingsTypeOptions}
						dataAnchor="income-other-savings-type"
						required
					>
						{this.props.content.incomeOtherSavingsTypeOptions}
					</DropdownQuestion>
					<CurrencyQuestion
						name="incomeOtherSavingsAmount"
						group={this.props.group}
						onChange={AccountOpeningActions.updateFormValue}
						defaultValue={this.props.data.incomeOtherSavingsAmount}
						dataAnchor="income-other-savings-amount"
						required
					>
						{this.props.content.incomeOtherSavingsAmount}
					</CurrencyQuestion>
					<DropdownQuestion
						name="incomeOtherSavingsFrequency"
						group={this.props.group}
						data={config.formOptionsSavingsFrequency}
						onChange={AccountOpeningActions.updateFormValue}
						defaultValue={this.props.data.incomeOtherSavingsFrequency}
						dataAnchor="income-other-savings-frequency"
						required
					>
						{this.props.content.incomeOtherSavingsFrequency}
					</DropdownQuestion>
					<DropdownQuestion
						name="incomeOtherSavingsPurpose"
						group={this.props.group}
						data={config.formOptionsSavingsAccountPurpose}
						onChange={AccountOpeningActions.updateFormValue}
						defaultValue={this.props.data.incomeOtherSavingsPurpose}
						dataAnchor="income-other-savings-purpose"
						required
					>
						{this.props.content.incomeOtherSavingsPurpose}
					</DropdownQuestion>
				</SectionFullWidth>
			);
	},
});

module.exports = SavingsAccount;
