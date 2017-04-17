/**
 * @module ContactBankPage
 */

const React = require('react');
const { PropTypes } = React;
const Helmet = require('react-helmet');

const ResultSection = require('../common/sections/ResultSection');
const PageHeader = require('../common/PageHeader');

const BrandUtils = require('../../utils/BrandUtils');
const ProductUtils = require('../../utils/ProductUtils');
const BrowserUtils = require('../../utils/BrowserUtils');

const ContactBankPage = React.createClass({
	propTypes: {
		data: PropTypes.object,
		validations: PropTypes.object,
		content: PropTypes.object,
	},
	componentWillMount() {
		BrowserUtils.setViewPort(1);
    },
	render() {
		return (
			<div className="account-opening result-page-wrapper contact-bank-page-wrapper container-fluid">
				<Helmet title={this.props.content.contactBankPageHeader} />
				<PageHeader
					visible={BrandUtils.isAbleToDisplay('result-pages-header')}
					title={this.props.content.landingPageTitle + ProductUtils.getName(this.props.data.productCode)}
					content={this.props.content}
				/>

				<div className="result-page white-board contact-bank-page" role="main">
					<div className="row text-center">
						<div className="col-xs-12">
							<ResultSection
								imgSrc={BrandUtils.getResultImage('contact-bank-page-with-image', 'bank-illustration.png')}
								imgAlt="Contact Bank"
								title={this.props.content.contactBankPageTitle}
							>
								<p>{this.props.content.contactBankPageExplanation}</p>
							</ResultSection>
						</div>
					</div>
				</div>
			</div>
		);
	},
});

module.exports = ContactBankPage;
