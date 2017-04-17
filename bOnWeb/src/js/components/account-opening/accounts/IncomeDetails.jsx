/**
 * @module IncomeDetails
 */

const React = require('react');
const { PropTypes } = React;

const config = require('../../../config');

const CurrentAccountPaymentInfo = require('./CurrentAccountPaymentInfo');
const ComponentHeader = require('../../common/ComponentHeader');

const {
	DropdownQuestion,
	RadioQuestion,
	CurrencyQuestion,
} = require('../../common/questionsets');

const AdditionalIncome = props => {
	return (
		<div>
			<CurrencyQuestion
				name="incomeOtherAmount"
				group={props.group}
				onChange={props.onChange}
				defaultValue={props.data.incomeOtherAmount}
				dataAnchor="income-other-received"
				required
			>
				{props.content.incomeOtherAmount}
			</CurrencyQuestion>
			<DropdownQuestion
				name="incomeOtherFrequencyOptions"
				group={props.group}
				data={config.formOptionsOtherIncomeFrequency}
				onChange={props.onChange}
				defaultValue={props.data.incomeOtherFrequencyOptions}
				dataAnchor="income-other-frequency"
				required
			>
				{props.content.incomeOtherFrequency}
			</DropdownQuestion>
		</div>
	);
};

AdditionalIncome.propTypes = {
	group: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
	content: PropTypes.object.isRequired,
};

const IncomeDetails = React.createClass({

	propTypes: {
		group: PropTypes.string.isRequired,
		content: PropTypes.object.isRequired,
		data: PropTypes.object.isRequired,
		showCurrentAccountPaymentInfo: PropTypes.bool,
		onChange: PropTypes.func.isRequired,
	},

	getDefaultProps() {
		return {
			showCurrentAccountPaymentInfo: false,
		};
	},

	/**
	 * Net monthly validation
	 */
	netMonthlyIncomeValidator() {
		const grossAnnualIncome = parseInt(this.props.data.grossAnnualIncome, 10);
		const netMonthlyIncome = parseInt(this.props.data.netMonthlyIncome, 10);

		if (netMonthlyIncome === 0) {
			return true;
		}

		if ((netMonthlyIncome > 0) && (grossAnnualIncome === 0)) {
			return false;
		}

		if (netMonthlyIncome <= (grossAnnualIncome / 12)) {
			return true;
		}

		return false;
	},

	render() {
		return (
			<div>
				<ComponentHeader
					title={this.props.content.incomeSectionTitle}
					titleLevel={2}
					hasSeparator
				>
					<CurrencyQuestion
						name="grossAnnualIncome"
						group={this.props.group}
						onChange={this.props.onChange}
						defaultValue={this.props.data.grossAnnualIncome}
						dataAnchor="income-annual"
						required
					>
						{this.props.content.grossAnnualIncome}
					</CurrencyQuestion>
					<CurrencyQuestion
						name="netMonthlyIncome"
						group={this.props.group}
						onChange={this.props.onChange}
						defaultValue={this.props.data.netMonthlyIncome}
						dataAnchor="income-monthly"
						customValidator={this.netMonthlyIncomeValidator}
						required
					>
						{this.props.content.netMonthlyIncome}
					</CurrencyQuestion>
					<RadioQuestion
						defaultValue={this.props.data.hasAdditionalIncome}
						group={this.props.group}
						labelText={this.props.content.hasAdditionalIncome}
						name="hasAdditionalIncome"
						onChange={this.props.onChange}
						options={[{
							anchor: 'income-other-sources-no',
							value: 'No',
						}, {
							anchor: 'income-other-sources-yes',
							value: 'Yes',
						}]}
						required
					/>

				</ComponentHeader>

				{this.props.data.hasAdditionalIncome === 'Yes' && <AdditionalIncome {...this.props} />}

				{this.props.showCurrentAccountPaymentInfo && <CurrentAccountPaymentInfo
					{...this.props}
				/>}
			</div>

		);
	},
});


module.exports = IncomeDetails;
