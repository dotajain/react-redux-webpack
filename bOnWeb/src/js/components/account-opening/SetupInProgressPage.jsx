/**
 * @module SetupInProgressPage
 */

const React = require('react');
const { PropTypes } = React;
const Helmet = require('react-helmet');

const PageHeader = require('../common/PageHeader');
const ResultSection = require('../common/sections/ResultSection');

const BrandUtils = require('../../utils/BrandUtils');
const ProductUtils = require('../../utils/ProductUtils');
const ContentUtils = require('../../utils/ContentUtils');

const SetupInProgressPage = React.createClass({
	propTypes: {
		data: PropTypes.object,
		validations: PropTypes.object,
		content: PropTypes.object,
	},

	render() {
		return (
			<div className="account-opening result-page-wrapper deferred-page-wrapper container-fluid">
				<Helmet title={this.props.content.setupInProgressHeader} />
				<PageHeader visible={BrandUtils.isAbleToDisplay('result-pages-header')}
							title={`${this.props.content.landingPageTitle}${ProductUtils.getName(this.props.data.productCode)}`}
							content={this.props.content}
				/>
				<div className="result-page deferred-page" role="main">
					<div className="row text-center">
						<div className="col-xs-12">
							<ResultSection
								imgSrc={BrandUtils.getResultImage('id-deferred-page-with-image', 'bank-illustration.png')}
								imgAlt="Setup in Progress"
								title={this.props.content.setupInProgressTitle}
							>
								{ContentUtils.getContentParagraphs('setupInProgressText', this.props.content, '')}
							</ResultSection>
						</div>
					</div>
				</div>
			</div>
		);
	},
});

module.exports = SetupInProgressPage;
