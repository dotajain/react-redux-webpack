/**
 * @module DeferredPage
 */

// Packages
const React = require('react');
const { PropTypes } = React;
const Helmet = require('react-helmet');
const _ = require('lodash');

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

	/**
	 * Get a JSX element for each deferred item.
	 *
	 * @return {Array} Of JSX elements.
	 */
	getDeferredElements() {
		const deferredElements = this.props.content.deferredPageNextStepsItems;

		return _.map(deferredElements, name => {
			return (
				<li name={name} key={name}>{name}</li>
			);
		});
	},

	render() {
		return (
			<div className="account-opening result-page-wrapper deferred-page-wrapper container-fluid">
				<Helmet title={this.props.content.idDeferredPageHeader} />
				<PageHeader visible={BrandUtils.isAbleToDisplay('result-pages-header')}
							title={this.props.content.landingPageTitle + ProductUtils.getName(this.props.data.productCode)}
							content={this.props.content}
				/>
				<div className="account-opening result-page deferred-page container" role="main">
					<div className="row text-center">
						<div className="col-xs-12">
							<ResultSection
								imgSrc={BrandUtils.getResultImage('id-deferred-page-with-image', 'bank-illustration.png')}
								imgAlt="Deferred Result"
								title={this.props.content.idDeferredPageTitle}
							>
								<p dangerouslySetInnerHTML={{ __html: this.props.content.idDeferredPageExplanation }} />
								<p><a href={this.props.content.idDeferredLinkUrl} aria-label={this.props.content.idDeferredLinkTitle} target="_blank" title={this.props.content.idDeferredLinkTitle}>{this.props.content.idDeferredLinkText} <span className="screenreader">{this.props.content.newBrowserWindowTitle}</span></a></p>
								<ul>
									{this.getDeferredElements()}
								</ul>
							</ResultSection>
						</div>
					</div>
				</div>
			</div>
		);
	},
});

module.exports = DeferredPage;
