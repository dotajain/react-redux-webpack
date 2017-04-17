const React = require('react');
const { PropTypes } = React;

const config = require('../../../config');

const AccountOpeningActions = require('../../../actions/AccountOpeningActions');

const BrandUtils = require('../../../utils/BrandUtils');

const SectionFullWidth = require('../../common/SectionFullWidth.jsx');
const IncomeDetails = require('./IncomeDetails');
const Expenditure = require('./Expenditure');
const CurrentAccountPaymentInfoSection = require('./CurrentAccountPaymentInfoSection');
const SavingsAccountPaymentInfoSection = require('./SavingsAccountPaymentInfoSection');

const { DropdownQuestion, CurrencyQuestion } = require('../../common/questionsets');

const BundledAccount = props => {
	return (
		<div>
			<SectionFullWidth id="current-account-details">
				<CurrentAccountPaymentInfoSection
					group={props.group}
					onChange={props.onChange}
					{...props}
				/>
			</SectionFullWidth>

			<SectionFullWidth id="savings-account-details">
				<SavingsAccountPaymentInfoSection
					{...props}
				/>
					<CurrencyQuestion
						name="incomeOtherSavingsAmount"
						group={props.group}
						onChange={props.onChange}
						defaultValue={props.data.incomeOtherSavingsAmount}
						dataAnchor="income-other-savings-amount"
						required
					>
						{props.content.incomeOtherSavingsAmount}
					</CurrencyQuestion>
					<DropdownQuestion
						name="incomeOtherSavingsFrequency"
						group={props.group}
						data={config.formOptionsSavingsFrequency}
						onChange={props.onChange}
						defaultValue={props.data.incomeOtherSavingsFrequency}
						dataAnchor="income-other-savings-frequency"
						required
					>
						{props.content.incomeOtherSavingsFrequency}
					</DropdownQuestion>
			</SectionFullWidth>
		</div>
	);
};

BundledAccount.propTypes = {
	data: PropTypes.object.isRequired,
	content: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
	group: PropTypes.string.isRequired,
};

const CurrentAccount = React.createClass({

	propTypes: {
		data: PropTypes.object.isRequired,
		group: PropTypes.string.isRequired,
	},

	/**
	 * On change handler for has additional income question. Is the answer yes? If so then
	 * render in the additional income questions.
	 * @param  {string} name  the name of question
	 * @param  {string} value the value selected
	 */
	onHasAdditionalIncome(name, value) {
		const data = [{ key: name, value }];

		// Clear the saved list if user now says they don't have one.
		if (value === 'No') {
			data.push({ key: 'incomeOtherAmount', value: undefined });
			data.push({ key: 'incomeOtherFrequencyOptions', value: undefined });
		}

		AccountOpeningActions.updateFormValues(data);
	},

	onIncomeDetailsSectionChange(key, value) {
		const dispatchMap = {
			hasAdditionalIncome: this.onHasAdditionalIncome,
			grossAnnualIncome: this.updateGrossAnnualIncome,
		};

		const dispatch = dispatchMap[key] || AccountOpeningActions.updateFormValue;

		dispatch(key, value);
	},

	/**
	 * method is required to update grossAnnualIncome
	 * and triger validation on netMonthlyIncome when grossAnnualIncome changes
	 * @param  {String} key   Changed key
	 * @param  {String} value Changed value
	 */
	updateGrossAnnualIncome(key, value) {
		const { netMonthlyIncome } = this.props.data;
		AccountOpeningActions.updateFormValue('netMonthlyIncome', ''); // @ticket DYB-21349
		AccountOpeningActions.updateFormValues([
				{ key, value },
				{ key: 'netMonthlyIncome', value: netMonthlyIncome },
		]);
	},

	render() {
		// NOTE: This can become a product based switch
		const supportsBundled = BrandUtils.isAbleToDisplay('contains-additional-savings-account-payment-info');

		return (<div>
				<SectionFullWidth id="income-details">
					<IncomeDetails
						onChange={this.onIncomeDetailsSectionChange}
						showCurrentAccountPaymentInfo={!supportsBundled}
						{...this.props}
					/>
				</SectionFullWidth>

				<SectionFullWidth id="outgoings-details">
					<Expenditure
						onChange={AccountOpeningActions.updateFormValue}
						{...this.props}
					/>
				</SectionFullWidth>

				{supportsBundled && <BundledAccount
					onChange={AccountOpeningActions.updateFormValue}
					{...this.props}
				/>}
			</div>
			);
	},
});

module.exports = CurrentAccount;
module.exports.BundledAccount = BundledAccount;
