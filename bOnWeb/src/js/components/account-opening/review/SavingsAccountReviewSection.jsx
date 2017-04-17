/**
 * @module SavingsAccountReviewSection
 */

const React = require('react');
const { PropTypes } = React;

const ReviewSection = require('./ReviewSection');

const SavingsAccountReviewSection = props => {
	const savingsLeftContent = [
		{ label: props.content.reviewLabelincomeOtherSavingsTypeOptions, value: props.data.incomeOtherSavingsTypeOptions },
		{ label: props.content.reviewLabelincomeOtherSavingsFrequency, value: props.data.incomeOtherSavingsFrequency },
	];

	const savingsRightContent = [
		{ label: props.content.reviewLabelincomeOtherSavingsPurpose, value: props.data.incomeOtherSavingsPurpose },
	];

	return (<div>
				<ReviewSection
					onEditLinkClick={props.onEditLinkClick}
					data={{
						title: props.content.reviewLabelsectionSA,
						leftContent: savingsLeftContent,
						rightContent: savingsRightContent,
						editLinkTaskId: 'WEB-EMPLOYMENT-DETAILS-SAVINGS',
					}}
				/>
			</div>);
};

SavingsAccountReviewSection.propTypes = {
	data: PropTypes.object.isRequired,
	content: PropTypes.shape({
		reviewLabelincomeOtherSavingsTypeOptions: PropTypes.string.isRequired,
		reviewLabelincomeOtherSavingsFrequency: PropTypes.string.isRequired,
		reviewLabelincomeOtherSavingsPurpose: PropTypes.string.isRequired,
		reviewLabelsectionSA: PropTypes.string.isRequired,
	}).isRequired,
	onEditLinkClick: PropTypes.func.isRequired,
};

module.exports = SavingsAccountReviewSection;

