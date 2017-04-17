/**
 * @module SorryPage
 */

const React = require('react');
const { PropTypes } = React;
const Helmet = require('react-helmet');
const _ = require('lodash');

const BrandUtils = require('../../utils/BrandUtils');

const ResultSection = require('../common/sections/ResultSection');
const PageHeader = require('../common/PageHeader');

const ProductUtils = require('../../utils/ProductUtils');
const ContentUtils = require('../../utils/ContentUtils');

const SorryPage = React.createClass({
	propTypes: {
		data: PropTypes.object,
		validations: PropTypes.object,
		content: PropTypes.object,
	},

	/**
	 * Get the content key SorryPageExplanation2
	 * If productCode is not allowed to have 'find out more' text then don't add it. Otherwise do.
	 *
	 * @return {String} Return SorryPageExplanation2 with declinedFindOutMore if allowed.
	 */
	getSorryPageExplanation2() {
		const explanation = ContentUtils.getProductContent('sorryPageExplanation2', this.props.content, this.props.data.productCode);
		const cannotFindOutMoreProductCodes = ['IM800'];
		const string = explanation && explanation.replace('{findOutMore}', ((_.indexOf(cannotFindOutMoreProductCodes, this.props.data.productCode) >= 0) ? '' : ` ${this.props.content.sorryFindOutMore}`));

		if (!string.length) {
			return;
		}

		return <p>{string}</p>;
	},

	render() {
		return (
		<div className="account-opening result-page-wrapper declined-page-wrapper container-fluid">
			<Helmet title={this.props.content.sorryPageHeader} />
			<PageHeader visible={BrandUtils.isAbleToDisplay('result-pages-header')}
						title={this.props.content.landingPageTitle + ProductUtils.getName(this.props.data.productCode)}
						content={this.props.content}
			/>
			<div className="result-page white-board declined-page" role="main">
				<div className="row text-center">
					<div className="col-xs-12">
						<ResultSection
							imgSrc={BrandUtils.getResultImage('declined-page-with-image', 'sorry-illustration.png')}
							imgAlt="Declined Result"
							title={this.props.content.sorryPageTitle}
						>
							<p>{ContentUtils.getProductContent('sorryPageExplanation1', this.props.content, this.props.data.productCode)}</p>
							{this.getSorryPageExplanation2()}
							{this.props.content.sorryPageExplanation3 ? <p>{this.props.content.sorryPageExplanation3}</p> : false}
							{this.props.content.sorryPageExplanation3DYB ? <p>{this.props.content.sorryPageExplanation3DYB}</p> : false}
							{this.props.content.sorryPageExplanation4DYB ? <p>{this.props.content.sorryPageExplanation4DYB}</p> : false}
							<p><a href={this.props.content.sorryPageFormLink} target="_blank" title={this.props.content.sorryPageFormLinkTitle}>{this.props.content.sorryPageFormLinkText}</a></p>
							<p><a href={this.props.content.sorryPageFormLink2} target="_blank" title={this.props.content.sorryPageFormLinkTitle2}>{this.props.content.sorryPageFormLinkText2}</a></p>
						</ResultSection>
					</div>
				</div>
			</div>
		</div>
		);
	},
});

module.exports = SorryPage;
