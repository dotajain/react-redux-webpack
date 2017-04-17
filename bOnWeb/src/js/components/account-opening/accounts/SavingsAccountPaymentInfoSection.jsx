/**
 * @module SavingsAccountPaymentInfoSection
 */

const React = require('react');
const { PropTypes } = React;

const ComponentHeader = require('../../common/ComponentHeader');

const SavingsAccountPaymentInfoSection = props => (
		<ComponentHeader
			title={props.content.incomeSectionSavingsAccountSubtitle}
			titleLevel={2}
		>

			{props.content.incomeSectionSavingsAccountIntro && <p>{props.content.incomeSectionSavingsAccountIntro}</p>}

			{props.children}
		</ComponentHeader>
);

SavingsAccountPaymentInfoSection.propTypes = {
	content: PropTypes.object.isRequired,
	children: PropTypes.node,
};

module.exports = SavingsAccountPaymentInfoSection;
