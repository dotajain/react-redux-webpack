/**
 * @module OfferDetails
 */

const React = require('react');
const { PropTypes } = React;

const ResultSection = require('../../common/sections/ResultSection');

const BrandUtils = require('../../../utils/BrandUtils');

const OfferDetails = props => {
	return (
		<ResultSection
			className="offer-result-section"
			imgSrc={BrandUtils.getResultImage('offer-page-with-image', props.headerIllustration)}
			imgAlt="Offer Result"
			title={props.pageTitle}
		>
			<div className="white-board">
				<ResultSection
					className="result-header debitcard-result-section"
					subTitle={props.subTitle}
					hasSubtitleSeparator={false}
				>
					{props.children}
				</ResultSection>
			</div>
		</ResultSection>
	);
};

OfferDetails.propTypes = {
	headerIllustration: PropTypes.string.isRequired,
	validations: PropTypes.object.isRequired,
	content: PropTypes.object.isRequired,
	product: PropTypes.object,
	subTitle: PropTypes.string,
	pageTitle: PropTypes.string.isRequired,
	children: PropTypes.node,
};

module.exports = OfferDetails;
