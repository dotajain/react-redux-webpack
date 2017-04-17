/**
 * @module CurrentAccountPaymentInfoSection
 */

const React = require('react');
const { PropTypes } = React;

const CurrentAccountPaymentInfo = require('./CurrentAccountPaymentInfo');
const ComponentHeader = require('../../common/ComponentHeader');


const CurrentAccountPaymentInfoSection = props => (
	<div>
		<ComponentHeader
			title={props.content.incomeSectionCurrentAccountSubtitle}
			titleLevel={2}
		>
			<CurrentAccountPaymentInfo {...props} />
		</ComponentHeader>
	</div>
);

CurrentAccountPaymentInfoSection.propTypes = {
	group: PropTypes.string.isRequired,
	content: PropTypes.object.isRequired,
	data: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
};

module.exports = CurrentAccountPaymentInfoSection;
