/**
 * @module AccountLockedPage
 */

const React = require('react');
const { PropTypes } = React;
const Helmet = require('react-helmet');

const ResultSection = require('../common/sections/ResultSection');
const PageHeader = require('../common/PageHeader');
const BottomNavigationBox = require('../common/BottomNavigationBox');

const BrandUtils = require('../../utils/BrandUtils');
const ProductUtils = require('../../utils/ProductUtils');
const BrowserUtils = require('../../utils/BrowserUtils');

const SessionStore = require('../../stores/SessionStore');

const AccountLockedPage = React.createClass({
	propTypes: {
		data: PropTypes.object,
		validations: PropTypes.object,
		content: PropTypes.object,
	},
	getInitialState() {
		return {
			errorQuoteId: SessionStore.getAccountLockedQuoteID(),
		};
	},
	componentWillMount() {
		BrowserUtils.setViewPort(1);
    },
	onSubmitHandler () {
		let passwordUrl = `${this.props.content.bankWebsite}/bpassword`;
		window.open(passwordUrl, '_blank');
	},
	render() {
		let explanation4 = this.props.content.accountLockedPageExplanation4;
		explanation4 = explanation4.replace('{quote_id}', this.state.errorQuoteId);
		return (
			<div className="account-opening result-page-wrapper contact-bank-page-wrapper-bapp container-fluid">
				<Helmet title={this.props.content.accountLockedPageHeader} />
				<PageHeader
					visible={BrandUtils.isAbleToDisplay('result-pages-header')}
					title={this.props.content.landingPageTitle}
					content={this.props.content}
				/>

				<div className="result-page white-board contact-bank-page" role="main">
					<div className="row text-center">
						<div className="col-xs-12">
							<ResultSection
								imgSrc={BrandUtils.getResultImage('account-opened-page-with-image', 'sorry-illustration.png')}
								imgAlt="Contact Bank"
								title={this.props.content.accountLockedPageHeader}
							>
								<p >{this.props.content.accountLockedPageExplanation1}</p>
								<p>{this.props.content.accountLockedPageExplanation2}</p>
								<p><BottomNavigationBox
									onClickNext={this.onSubmitHandler}
									className="col-xs-12 text-center"
									nextButtonLabel={this.props.content.accountLockedPageResetPasswordButtonLabel}
								/></p>
								<p dangerouslySetInnerHTML= {{__html: this.props.content.accountLockedPageExplanation3}}></p>
								<p dangerouslySetInnerHTML= {{__html: explanation4}}></p>
							</ResultSection>
						</div>
					</div>
				</div>
			</div>
		);
	},
});

module.exports = AccountLockedPage;
