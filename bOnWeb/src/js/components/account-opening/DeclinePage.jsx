const React = require('react');
const { PropTypes } = React;
const _ = require('lodash');

const BrandUtils = require('../../utils/BrandUtils');

const ResultSection = require('../common/sections/ResultSection');
const PageHeader = require('../common/PageHeader');

const ContentUtils = require('../../utils/ContentUtils');
const ProductUtils = require('../../utils/ProductUtils');

const DeclinePage = React.createClass({
	propTypes: {
		data: PropTypes.object,
		validations: PropTypes.object,
		content: PropTypes.object,
	},

	/**
	 * Return an array of strings
	 *
	 * @param  {String} key			the JSON key without the number suffix
	 * @param  {Array}  content 	the JSON items to be filtered through
	 * @return {Array}  Of strings.
	 */
	getContent(key, content) {
		return _.map(_.filter(_.keys(content), contentKey => _.startsWith(contentKey, key)), i => content[i]);
	},

	/**
	 * Return an array of JSX elements formatted as li tags
	 *
	 * @param  {String} key				the JSON key without the number suffix
	 * @param  {Array}  content 		the JSON items to be filtered through
	 * @return {Array}  Of JSX elements.
	 */
	getLinks(key, content) {
		return _.map(this.getContent(key, content), i => i && <li dangerouslySetInnerHTML={{ __html: i }} />);
	},

	/**
	 * Return an array of JSX elements formatted as paragraphs
	 *
	 * @param  {String} key				the JSON key without the number suffix
	 * @param  {Array}  content 		the JSON items to be filtered through
	 * @return {Array}  Of JSX elements.
	 */
	getParagraphs(key, content) {
		return _.map(ContentUtils.getContent(key, content, this.props.data.productCode), i => i && <p key={i}>{i}</p>);
	},

	render() {
		const title = this.props.content.declinePageTitle && this.props.content.declinePageTitle.replace('{productName}', ProductUtils.getName(this.props.data.productCode));

		return (
		<div className="account-opening result-page-wrapper decline-page-wrapper container-fluid">
			<PageHeader
				visible={BrandUtils.isAbleToDisplay('result-pages-header')}
				content={this.props.content}
				title={title}
			/>
			<div className="result-page decline-page" role="main">
				<div className="row text-center">
					<div className="col-xs-12">
						<ResultSection
							imgSrc={BrandUtils.getResultImage('decline-page-with-image', 'decline-illustration.png')}
							imgAlt="Decline Result"
							title={title}
						>
							<div className="decline-content white-board">
								{this.getParagraphs('declinePageParagraph', this.props.content)}
								<ul>
								{this.getLinks('declinePageLink', this.props.content)}
								</ul>
							</div>
						</ResultSection>
					</div>
				</div>
			</div>
		</div>
		);
	},
});

module.exports = DeclinePage;
