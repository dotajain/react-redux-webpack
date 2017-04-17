/**
 * @module DeferredPage
 */

const React = require('react');
const { PropTypes } = React;
const Helmet = require('react-helmet');

// Components
const ResultSection = require('../common/sections/ResultSection');
const PageHeader = require('../common/PageHeader');

// Utils
const BrandUtils = require('../../utils/BrandUtils');
const ProductUtils = require('../../utils/ProductUtils');

const DeferredPage = React.createClass({
	propTypes: {
		data: PropTypes.object,
		validations: PropTypes.object,
		content: PropTypes.object,

	},

	render() {
		return (
			<div className="account-opening result-page-wrapper deferred-page-wrapper container-fluid">
				<Helmet title={this.props.content.deferredPageHeader} />
				<PageHeader visible={BrandUtils.isAbleToDisplay('result-pages-header')}
							title={this.props.content.landingPageTitle + ProductUtils.getName(this.props.data.productCode)}
							content={this.props.content}
				/>
				<div className="result-page white-board deferred-page" role="main">
					<div className="row text-center">
						<div className="col-xs-12">
							<ResultSection
								imgSrc={BrandUtils.getResultImage('deferred-page-with-image', 'time-illustration.png')}
								imgAlt="Deferred Result"
								title={this.props.content.deferredPageTitle}
							>
								<p>{this.props.content.deferredPageExplanation}</p>
							</ResultSection>
						</div>
					</div>
				</div>
			</div>
		);
	},
});

module.exports = DeferredPage;
