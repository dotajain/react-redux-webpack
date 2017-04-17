/**
 * @module AccountOpenedPage
 */

const React = require('react');
const { PropTypes } = React;
const Helmet = require('react-helmet');
const _ = require('lodash');

const AnalyticsActionCreator = require('../../actions/AnalyticsActionCreator');

const ResultSection = require('../common/sections/ResultSection');
const PageHeader = require('../common/PageHeader');
const AppLinks = require('../common/links/AppLinks');
const AlternativeProductsContent = require('../common/AlternativeProductsContent');
const Link = require('react-router').Link;

const BrandUtils = require('../../utils/BrandUtils');

const AccountOpenedPage = React.createClass({
	propTypes: {
		data: PropTypes.object,
		validations: PropTypes.object,
		content: PropTypes.object,
		selectContentBasedOnDowngrade: PropTypes.func,
	},

	componentDidMount() {
		AnalyticsActionCreator.track({
			path: '/user/experience/view',
			action: 'Appeared',
		}, {
			description: 'PageLoaded',
		});
	},

	/**
	 * Get all bullet sections and return a JSX element.
	 *
	 * @param {Array} sections 		array of section config content keys.
	 * @return {Array} Of JSX elements.
	 */
	getBulletSections(sections) {
		return _.map(sections, (item, index) => {
			return (
				<div key={index}>
					<h3>{this.props.selectContentBasedOnDowngrade(`accountOpenedSection${item.header}Title`)}</h3>
					<ul>
						{this.getNotEmptyBullets(item.bullets)}
					</ul>
				</div>
			);
		});
	},

	/**
	 * Get a JSX element for each bullet point item.
	 *
	 * @param {Array} bullets 	array of content keys.
	 * @return {Array} Of JSX elements.
	 */
	getNotEmptyBullets(bullets) {
		return _.chain(bullets)
			.map(value => {
				const items = value.split('.');
				const key = `accountOpenedSection${items[0]}Bullet${items[1]}`;
				const text = this.props.selectContentBasedOnDowngrade(key);
				return text && (
					<li
						key={value}
						dangerouslySetInnerHTML={{ __html: text }}
					/>
				);
			})
			.filter(value => {
				return _.isObject(value);
			})
			.value();
	},

	render() {
		let accountOpenedMoreInformation;
		const sections = this.props.data.product.accountOpenedSections;

		if (BrandUtils.isAbleToDisplay('account-opened-page-button')) {
			accountOpenedMoreInformation =
				(<div>
					<p>
						<Link
							to="/account-opening/somewhere"
							className="btn btn-lg btn-primary btn-next"
							onClick={this.onClickOpenAccount}
						>
							{this.props.content.accountOpenedAccessAccountText}
						</Link>
					</p>
					<p>
						<Link
							to="/account-opening/somewhere"
						>
							{this.props.content.accountOpenedHelpAndSupportText}
						</Link>
					</p>
				</div>);
		}

		return (

			<div className="account-opening result-page-wrapper account-opened-page-wrapper container-fluid">
				<Helmet title={this.props.content.accountOpenedPageHeader} />
				<PageHeader
					visible={BrandUtils.isAbleToDisplay('result-pages-header')}
					title={this.props.content.landingPageTitle + this.props.data.product.name}
					content={this.props.content}
				/>
				<div className="result-page account-opened-page white-board" role="main">
					<div className="row text-center">
						<div className="col-xs-12">
							<ResultSection
								imgSrc={BrandUtils.getResultImage('account-opened-page-with-image', 'sorry-illustration.png')}
								imgAlt="Account Opened"
								title={this.props.selectContentBasedOnDowngrade('accountOpenedPageTitle')}
							>
								<h4 className="text-center">{this.props.selectContentBasedOnDowngrade('accountOpenedAppDownloadTitle')}</h4>
								{!this.props.data.isAltProduct && <AppLinks feature="app-links" {...this.props} />}
								{this.getBulletSections(sections)}
								{accountOpenedMoreInformation}
							</ResultSection>
						</div>
					</div>
				</div>
			</div>
		);
	},
});

module.exports = AlternativeProductsContent(AccountOpenedPage);
