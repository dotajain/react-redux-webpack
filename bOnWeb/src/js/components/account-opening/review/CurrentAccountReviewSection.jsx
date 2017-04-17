/**
 * @module CurrentAccountReviewSection
 */

const React = require('react');
const { PropTypes } = React;

const config = require('../../../config');

const BrandUtils = require('../../../utils/BrandUtils');
const ArrayUtils = require('../../../utils/ArrayUtils');

const ReviewSection = require('./ReviewSection');

const CurrentAccountReviewSection = props => {
	let income1;
	let income2;
	let reviewSubSectionsCa;
	let reviewSubSectionsSa;

	if (BrandUtils.isAbleToDisplay('contains-additional-savings-account-payment-info')) {
		income1 = [
			{ label: props.content.reviewLabelgrossAnnualIncome, value: props.data.grossAnnualIncome },
			{ label: props.content.reviewLabelnetMonthlyIncome, value: props.data.netMonthlyIncome },
		];

		income2 = [
			{ label: props.content.reviewLabelincomeOtherAmount, value: (props.data.incomeOtherAmount) ? `${props.data.incomeOtherAmount} - ${ArrayUtils.getDropdownLabelFromValue(props.data.incomeOtherFrequencyOptions, config.formOptionsOtherIncomeFrequency)}` : '0' },
		];

		const incomeCA1 = [
			{ label: props.content.reviewLabelincomeOtherAccountPurpose, value: ArrayUtils.getDropdownLabelFromValue(props.data.incomeOtherAccountPurpose, config.formOptionsAccountPurpose) },
			{ label: props.content.reviewLabelincomeOtherPaymentTypeOptions, value: ArrayUtils.getDropdownLabelFromValue(props.data.incomeOtherPaymentTypeOptions, config.formOptionsIncomeOtherPaymentType) },
		];

		const incomeCA2 = [
			{ label: props.content.reviewLabelincomeOtherPaymentAmount, value: props.data.incomeOtherPaymentAmount },
		];

		const incomeSA1 = [
			{ label: props.content.reviewLabelincomeOtherSavingsAmount, value: props.data.incomeOtherSavingsAmount },
		];

		const incomeSA2 = [
			{ label: props.content.reviewLabelincomeOtherSavingsFrequency, value: ArrayUtils.getDropdownLabelFromValue(props.data.incomeOtherSavingsFrequency, config.formOptionsSavingsFrequency) },
		];

		reviewSubSectionsCa = (
			<ReviewSection
				onEditLinkClick={props.onEditLinkClick}
				data={{
					title: props.content.reviewLabelsectionCA,
					isSubSection: true,
					leftContent: incomeCA1,
					rightContent: incomeCA2,
				}}
			/>
		);
		reviewSubSectionsSa = (
			<ReviewSection
				onEditLinkClick={props.onEditLinkClick}
				data={{
					title: props.content.reviewLabelsectionSA,
					isSubSection: true,
					leftContent: incomeSA1,
					rightContent: incomeSA2,
				}}
			/>
		);
	} else {
		income1 = [
			{ label: props.content.reviewLabelgrossAnnualIncome, value: props.data.grossAnnualIncome },
			{ label: props.content.reviewLabelnetMonthlyIncome, value: props.data.netMonthlyIncome },
			{ label: props.content.reviewLabelincomeOtherAccountPurpose, value: ArrayUtils.getDropdownLabelFromValue(props.data.incomeOtherAccountPurpose, config.formOptionsAccountPurpose) },
			{ label: props.content.reviewLabelincomeOtherPaymentTypeOptions, value: ArrayUtils.getDropdownLabelFromValue(props.data.incomeOtherPaymentTypeOptions, config.formOptionsIncomeOtherPaymentType) },
		];

		income2 = [
			{ label: props.content.reviewLabelincomeOtherAmount, value: (props.data.incomeOtherAmount) ? `${props.data.incomeOtherAmount} - ${ArrayUtils.getDropdownLabelFromValue(props.data.incomeOtherFrequencyOptions, config.formOptionsOtherIncomeFrequency)}` : '0' },
			{ label: props.content.reviewLabelincomeOtherPaymentAmount, value: props.data.incomeOtherPaymentAmount },
		];
	}

	const outgoings1 = [
		{ label: props.content.reviewLabelmortgageOrRentExpenditure, value: props.data.mortgageOrRentExpenditure },
	];

	const outgoings2 = [
		{ label: props.content.reviewLabelexpenditureOther, value: props.data.expenditureOther },
	];

	return (
		<div>
			<ReviewSection
				onEditLinkClick={props.onEditLinkClick}
				data={{
					title: props.content.reviewLabelsectionIncome,
					leftContent: income1,
					rightContent: income2,
					editLinkTaskId: 'WEB-EMPLOYMENT-DETAILS-INCOME',
				}}
			/>

			{reviewSubSectionsCa}

			{reviewSubSectionsSa}

			<ReviewSection
				onEditLinkClick={props.onEditLinkClick}
				data={{
					title: props.content.reviewLabelsectionOutgoings,
					leftContent: outgoings1,
					rightContent: outgoings2,
					editLinkTaskId: 'WEB-EMPLOYMENT-DETAILS-OUTGOINGS',
				}}
			/>
		</div>);
};

CurrentAccountReviewSection.propTypes = {
	data: PropTypes.object.isRequired,
	content: PropTypes.object.isRequired,
	onEditLinkClick: PropTypes.func.isRequired,
};

module.exports = CurrentAccountReviewSection;
