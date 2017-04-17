/**
 * @module ErrorPage
 */

const React = require('react');
const { PropTypes } = React;
const Helmet = require('react-helmet');

// Components
const ResultSection = require('../common/sections/ResultSection');
const PageHeader = require('../common/PageHeader');

// Utils
const BrandUtils = require('../../utils/BrandUtils');
const PathUtils = require('../../utils/PathUtils');
const BrowserUtils = require('../../utils/BrowserUtils');

const ErrorPage = React.createClass({

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
				<div className="account-opening error-page-container container-fluid">
				<Helmet title={this.props.content.errorPageHeader} />
					<PageHeader
						visible={BrandUtils.isAbleToDisplay('result-pages-header')}
						content={this.props.content}
						title={this.props.content.errorPageHeader}
					/>
					<div className="result-page error-page white-board" role="main">
						<div className="row text-center">
							<div className="col-xs-12">
								<ResultSection
									imgSrc={PathUtils.getPath('images/common/error-illustration.png')}
									imgAlt="Error"
									title={this.props.content.errorPageTitle}
								>
									<p className="padding-bottom error-text">{this.props.content.errorPageText1}</p>
									<p className="padding-bottom error-text">{this.props.content.errorPageText2}</p>
								</ResultSection>
							</div>
						</div>
					</div>
				</div>
		);
	},
});

module.exports = ErrorPage;
