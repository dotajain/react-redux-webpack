/**
 * @module LoginPage
 * @desc Top Level Component for Login functionality
 * @requires react
 * @requires AccountOpeningActions
 * @requires PageHeader
 * @requires LoginComponent
 * @requires PageColumnWrapper
 * @requires SectionCentered
 * @requires SideBarColumnWrapper
 * @requires BrandUtils
 * @tutorial authentication
 */

// React
const React = require('react');
const { PropTypes } = React;
const Helmet = require('react-helmet');
const envConfig = require('../../../static/config');

// Actions
const AccountOpeningActions = require('../../actions/AccountOpeningActions');

// Components
const PageHeader = require('../common/PageHeader');
const LoginComponent = require('./login/LoginComponent');
const PageColumnWrapper = require('../common/PageColumnWrapper');
const SideBarColumnWrapper = require('../common/SideBarColumnWrapper');
const SectionCentered = require('../common/SectionCentered');

// Utils
const BrandUtils = require('../../utils/BrandUtils');
const BrowserUtils = require('../../utils/BrowserUtils');

const LoginPage = React.createClass({
	/**
	 * @type {Object}
	 */
	propTypes: {
		appData: PropTypes.object,
		data: PropTypes.object,
		validations: PropTypes.object,
		content: PropTypes.object,
	},
	componentWillMount() {
		BrowserUtils.setViewPort(1);
    },
	render() {
		const loginPageTitleH2 = BrandUtils.isAbleToDisplay('login-page-title') ? <h2>{this.props.content.loginPageTitle}</h2> : false;

		const onSuccess = () => {
			AccountOpeningActions.navigateToWebTask('WEB-TIMELINE');
		};

		return (
			<div className="account-opening login-page container-fluid">
				<Helmet title={this.props.content.loginPageHeader} />
				<PageHeader title={this.props.content.loginPageTitle} content={this.props.content} />

				<div className="row main-container">
					<PageColumnWrapper content={this.props.content}>
						{loginPageTitleH2}

						<SectionCentered centredColumnSize={BrandUtils.isAbleToDisplay('login-page-full-width') ? 12 : 6}>

						<LoginComponent
							appData={this.props.appData}
							targetScope={envConfig.targetScope.login}
							{...this.props}
							onSuccess={onSuccess}
						/>

						</SectionCentered>
					</PageColumnWrapper>

				<SideBarColumnWrapper
					appData={this.props.appData}
					content={this.props.content}
				/>
				</div>
			</div>
		);
	},
});

module.exports = LoginPage;
