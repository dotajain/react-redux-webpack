/**
 * @module CaseItem
 */

const React = require('react');
const _ = require('lodash');
const { PropTypes } = React;
const Link = require('react-router').Link;
const envConfig = require('../../../../static/config');

const AccountOpeningActions = require('../../../actions/AccountOpeningActions');

const DateUtils = require('../../../utils/DateUtils');
const BrandUtils = require('../../../utils/BrandUtils');
const ProductUtils = require('../../../utils/ProductUtils');
const TaskUtils = require('../../../utils/TaskUtils');
const config = require('../../../config');


const ComponentHeader = require('../../common/ComponentHeader');

const resumeCase = (caseId, product) => [
			envConfig.websiteBaseDirectory,
			'account-opening/submission?caseId=',
			caseId,
			'&type=',
			product.productType.urlPart,
		].join('');

const UIUrls = {
	resumeCase,
};

const CaseItem = React.createClass({

	propTypes: {
		data: PropTypes.object.isRequired,
		caseItem: PropTypes.object.isRequired,
		caseIndex: PropTypes.number.isRequired,
	},

	/**
	 * Can the current case be resumed online?
	 *
	 * @return {Boolean}
	 */
	_canResumeCase() {
		const caseUriItems = this._parseCaseUri();
		return caseUriItems.caseType === 'csap';
	},

	/**
	 * Get list of applicants and their details
	 * @param  {array} list  list of applicants
	 */
	_getApplicants(list) {
		return _.map(list, (applicant, index) => {
			return (
				<div className="applicant-details" key={`applicant-${index}`}>
					Name: {applicant.name['first_name']} {applicant.name['last_name']} ({this.props.data.username}) <br />Customer Number: {applicant['customer_number']}
				</div>
			);
		});
	},

	/**
	 * User has selected to resume a case. Save the relevant info.
	 *
	 */
	_onSelectCase() {
		const caseItems = this._parseCaseUri();
		caseItems.username = this.props.data.username;

		// transform caseItems object into array with key/values and update
		AccountOpeningActions.updateFormValues(_.map(caseItems, (value, key) => {
			return { key, value };
		}));

		AccountOpeningActions.clearTasks(); // Clear default task IDs before we restart this case.
	},

	/**
	 * Parse the case uri if it exists.
	 *
	 * @return {Object} 	An object of the case uri items or an empty object.
	 */
	_parseCaseUri() {
		const uri = this.props.caseItem.uri;
		let caseUriItems = {};
		const caseUriObj = TaskUtils.parseUri(uri);

		if (uri && caseUriObj) {
			caseUriItems = {
				caseType: caseUriObj.caseType,
				isExistingCustomer: caseUriObj.caseSubType === 'existing' ? 'Yes' : 'No',
				caseId: caseUriObj.caseId,
			};
		}

		return caseUriItems;
	},

	render() {
		let resumeButton;
		const productFromApi = _.first(this.props.caseItem.context.accounts).product;
		const product = ProductUtils.getProduct(`IM${productFromApi.code}`);

		if (_.isEmpty(product)) {
			if (process.env.NODE_ENV === 'development') {
				console.log('No valid product for this case item');
			}
			return null;
		}

		if (this._canResumeCase()) {
			const url = UIUrls.resumeCase(this.props.caseItem.id, product);

			resumeButton = url && (
				<Link
					onClick={this._onSelectCase}
					className="btn btn-primary btn-lg btn-open"
					to={url}
					data-anchor={`resume-case-${this.props.caseIndex}`}
				>
					Resume
				</Link>
			);
		}

		const classNames = ['col-xs-12'];

		if (BrandUtils.isAbleToDisplay('portal-page-multiple-columns')) {
			classNames.push('col-sm-6');
			classNames.push('col-md-12');
			classNames.push('col-lg-6');
		}

		let caseColumnClass = 'col-xs-12';
		if (BrandUtils.isAbleToDisplay('portal-page-case-columns')) {
			caseColumnClass = 'col-xs-6';
		}

		return (
			<div className={classNames.join(' ')}>
				<article className="case-item">
					<ComponentHeader
						title={this.props.caseItem.description}
						titleLevel={2}
					>
						<div className="row">
							<div className={caseColumnClass}>
								<div className="case-item-details">
									<b>Details</b><br />
										Case ID: {this.props.caseItem.id}<br />
										Started on: {DateUtils.getMomentFromTimestamp(this.props.caseItem['created_at']).format(config.dateFormat)} <br />
										<b>Applicants:</b><br />
										{this._getApplicants(this.props.caseItem.context.customers)}
								</div>
							</div>
							<div className={`${caseColumnClass} resume-button-container`}>
								{resumeButton}
							</div>
						</div>
					</ComponentHeader>
				</article>
			</div>
		);
	},
});

module.exports = CaseItem;
