/**
 * @module ReviewPage
 */

const _ = require('lodash');
const React = require('react');
const { PropTypes } = React;
const Helmet = require('react-helmet');
const moment = require('moment');

const config = require('../../config');

const AccountOpeningActions = require('../../actions/AccountOpeningActions');
const AnalyticsActionCreator = require('../../actions/AnalyticsActionCreator');

const AccountOpeningConstants = require('../../constants/AccountOpeningConstants');

const PageColumnWrapper = require('../common/PageColumnWrapper');
const SideBarColumnWrapper = require('../common/SideBarColumnWrapper');
const BottomNavigationBox = require('../common/BottomNavigationBox');
const CheckBoxQuestion = require('../common/questionsets/CheckBoxQuestion');
const MultiCheckBoxQuestion = require('../common/questionsets/MultiCheckBoxQuestion');
const PageHeader = require('../common/PageHeader');
const NewWindowLink = require('../common/links/NewWindowLink');

const ArrayUtils = require('../../utils/ArrayUtils');
const ScreenshotUtils = require('../../utils/ScreenshotUtils');
const NumberUtils = require('../../utils/NumberUtils');
const BrandUtils = require('../../utils/BrandUtils');
const CountryUtils = require('../../utils/CountryUtils');
const MaskingUtils = require('../../utils/MaskingUtils');

const ReviewSection = require('./review/ReviewSection');

const PersonalDetailsFoundError = require('./findDetails/PersonalDetailsFoundError');
const CurrentAccountReviewSection = require('./review/CurrentAccountReviewSection');
const SavingsAccountReviewSection = require('./review/SavingsAccountReviewSection');

const accountToUiMap = {
	'current': CurrentAccountReviewSection,
	'savings': SavingsAccountReviewSection,
};

const ReviewPage = React.createClass({
	propTypes: {
		appData: PropTypes.object.isRequired,
		data: PropTypes.object.isRequired,
		content: PropTypes.object.isRequired,
	},
	/**
	 * Track that user has visited Review page. Future edits to earlier pages should then
	 * revert the user straight back to Review.
	 */
	componentDidMount() {
		AccountOpeningActions.updateFormValue('isReviewing', true);

		// Record an analytics user event.
		AnalyticsActionCreator.track({
			path: '/user/experience/view',
			action: 'Appeared',
		}, {
			description: 'PageLoaded',
		});
	},

	/**
	 * Triggered each time contact prefs are updated.
	 *
	 * @param  {String} name  Which pref was changed?
	 * @param  {String} value Is it checked or not?
	 */
	onContactMethodsChange(name, value) {
		AnalyticsActionCreator.track({
			path: '/user/experience/activity',
			action: 'Interacted',
		}, {
			value,
			description: 'ContactMethodsSelected',
			event: (this.props.data[name] ? 'updated' : 'created'),
		});
		AccountOpeningActions.updateFormValue(name, value);
	},

	/**
	 * User has clicked an "Edit" link. Take them to the right part of that section.
	 *
	 * @param  {Event} e 		Click event.
	 */
	onEditLinkClick(e) {
		e.preventDefault();
		AccountOpeningActions.navigateToWebTask(e.target.dataset.taskId);
	},

	/** onClick handler for productTermsPDF. Record an analytics event. */
	onProductTermsPDFClick() {
		AnalyticsActionCreator.track({
			path: '/user/experience/activity',
			action: 'Interacted',
		}, {
			description: 'DownloadProductTermsPDF',
			event: 'click',
		});
	},

	onReviewAcceptTCs(name, value) {
		AnalyticsActionCreator.track({
			path: '/user/experience/activity',
			action: 'Interacted',
		}, {
			value,
			description: 'ReviewAcceptTCs',
			event: 'click',
		});
		AccountOpeningActions.updateFormValue(name, value);
	},

	onSubmitPage(e) {
		// Don't go anywhere until we've taken a screen shot.
		e.preventDefault();

		// User has now seen updated legal docs.
		this.updateDocumentAuditInfo();

		// Take a screen shot
		ScreenshotUtils.takeScreenshot(() => {
			// Now carry on
			AccountOpeningActions.sendFormData(true);

			AnalyticsActionCreator.track({
				path: '/user/experience/activity',
				action: 'Interacted',
			}, {
				description: 'ApplicationSubmit',
				event: 'click',
			});

			AccountOpeningActions.recordTaskComplete('WEB-REVIEW-DETAILS');
			AccountOpeningActions.navigateToWebTask('WEB-SUBMIT-FORM');
		}, this.props.data.caseId);
	},

	/**
	 * Retrieve the additional documents for the selected account.
	 * @return {array} array of JSX elements.
	 */
	getAdditionalDocumentItems() {
		const docs = this.props.data.product.additionalDocumentItems;
		const productType = this.props.data.product.productType;

		return _.flow(
			docs => _.filter(docs, key => this.props.content[`${key}DocLinkText`]),
			filtered => _.map(filtered, (additionalDocumentItem, index) => {
				let onClick = () => {};
				if (additionalDocumentItem === 'termsAndConditions') {
					// not sure why we only track this document @ticket DGW2-946 will investigate
					onClick = this.onProductTermsPDFClick;
				}

				return (
					<li key={index}>
						<NewWindowLink
							href={productType && BrandUtils.appendBrand(this.props.content[`${additionalDocumentItem}DocLink`]).replace('{type}', productType.name)}
							title={this.props.content[`${additionalDocumentItem}DocLinkTitle`]}
							text={this.props.content[`${additionalDocumentItem}DocLinkText`]}
							onClick={onClick}
							{...this.props}
						/>
					</li>
				);
			})
		)(docs);
	},

	/**
	 * Required document link section
	 *
	 */
	getDocumentSection() {
		const productType = this.props.data.product.productType;

		return productType && (
			<ul>
				{this.getAdditionalDocumentItems()}
			</ul>
		);
	},

	/**
	 * Retrieve the key features for the selected account.
	 * @param {object} productData Product object
	 * @return {array} array of JSX elements.
	 */
	getKeyFeatureItems(productData) {
		return _.map(productData.keyFeatureItems, (feature, index) => {
			let content = this.props.content[feature];

			if (feature === 'monthlyFee') {
				content = NumberUtils.appendCurrency(content, productData.monthlyFee);
			}

			return (<li key={index} dangerouslySetInnerHTML={{ __html: content }} />);
		});
	},

	/**
	 * Return an array of JSX elements formatted as bullet points
	 *
	 * @param  {String} key				the JSON key without the number suffix
	 * @param  {Array}  content 		the JSON items to be filtered through
	 * @return {Array}  Of JSX elements.
	 */
	getMandateBulletPoints(content) {
		const items = this.props.data.product.mandateItems;

		return _.flow(
			bullets => _.filter(bullets, item => content[item]),
			filtered => _.map(filtered, item => <li key={item}>{content[item]}</li>)
		)(items);
	},

	/**
	 * Get a JSX element for each offer restriction item.
	 * @param  {Array} offerRestrictions	Offers restriction array content mapper
	 * @param  {string} title 				section  title object
	 * @return {Array} Of JSX elements.
	 */
	getOfferRestrictions(offerRestrictions, title) {
		if (_.isEmpty(offerRestrictions)) {
			return null;
		}

		const items = _.map(offerRestrictions, (contentKey, index) => (<li key={index}>{this.props.content[contentKey]}</li>));

		return (
				<div>
					<h4>{this.props.content[title]}</h4>
					<ul>
						{items}
					</ul>
				</div>
			);
	},

	/**
	 * Build a repeatable review section
	 *
	 * @param  {Object} data 	Specifics to put into this section.
	 * @return {JSX}
	 */
	getReviewSection(data) {
		return (
				<ReviewSection
					onEditLinkClick={this.onEditLinkClick}
					data={data}
				/>
		);
	},

	/**
	 * Return a string containing the Tax Obligations
	 *
	 * @param  {String} noObligations	'Yes' if there are no Tax Obligations to be listed.
	 * @param  {Array}  list 			the Tax Obligation JSON items
	 * @return {String} 				Either comma seperated Tax Obligations or 'No'.
	 */
	getTaxObligations(noObligations, list) {
		if (noObligations === 'Yes') {
			return 'No';
		}

		return ArrayUtils.getCommaString(_.map(list, item => `${item.taxCountry} ${(item.taxNumber) ? `(${item.taxNumber})` : ''}`));
	},

	/**
	 * Formats telephone number, based on if the the user is an existing customer.
	 * Number is masked for an existing user
	 *
	 * @param {String} phoneNumber Phone number to be formatted
	 *
	 * @returns {String} Masked telephone number if customer is exisitng, unmasked otherwise
	 *
	 */
	formatPhoneNumber(phoneNumber) {
		if (this.props.data.isExistingCustomer !== 'Yes') {
			return phoneNumber;
		}

		const mask = config.masks.phoneNumber;

		return MaskingUtils.applyMask(phoneNumber, mask.startPosition, mask.numberOfMasks);
	},

	isSubmitDisabled() {
		return !this.props.data.reviewAcceptTsAndCs || this.props.appData.isApiCallInProgress || this.props.data.personalDetailsFound;
	},

	/**
	 * Stores the current version of each legal document, along with the current time.
	 */
	updateDocumentAuditInfo() {
		const productDocs = this.props.data.product.additionalDocumentItems;

		const timestamp = moment().format();

		const data = _.map(productDocs, docName => {
			return {
				key: docName,
				value: {
					version: this.props.content[`${docName}DocVersion`],
					consent: 'Y',
					timestamp,
				},
			};
		});

		AccountOpeningActions.updateFormValues(data);
	},

	render() {
		const productData = this.props.data.product;
		const productName = this.props.data.product.name;
		const productTypeName = productData.productType && productData.productType.name;
		const applyingFor = this.props.data.product.productLink && (
			<NewWindowLink
				href={this.props.content[this.props.data.product.productLink]}
				title="Product Link. This link will open in a new browser window"
				text={productName}
				{...this.props}
			/>
		);

		const AccountTypeReview = accountToUiMap[productTypeName] || (() => (<noscript />));

		const personalDetails1 = [
			{ label: this.props.content.reviewLabeltitle, value: this.props.data.title, formatting: 'capitalize' },
			{ label: this.props.content.reviewLabelfirstName, value: this.props.data.firstName, formatting: 'capitalize' },
			{ label: this.props.content.reviewLabelmiddleName, value: this.props.data.middleName, formatting: 'capitalize', hidden: this.props.data.hasMiddleName === 'No' },
			{ label: this.props.content.reviewLabellastName, value: this.props.data.lastName, formatting: 'capitalize' },
			{ label: this.props.content.reviewLabeldateOfBirth, value: this.props.data.dateOfBirth },
			{ label: this.props.content.reviewLabelgender, value: this.props.data.gender, formatting: 'capitalize' },
			{ label: this.props.content.reviewLabelmaritalStatus, value: ArrayUtils.getDropdownLabelFromValue(this.props.data.maritalStatus, config.formOptionsMaritalStatus) },
			{ label: this.props.content.reviewLabeldependants, value: (this.props.data.dependants) ? this.props.data.dependants : '0' },
		];

		const personalDetails2 = [
			{ label: this.props.content.reviewLabeladdresses, value: this.props.data.addresses ? CountryUtils.getAddressString(this.props.data.addresses[0]) : '' },
			{ label: this.props.content.reviewLabelresidentialStatus, value: this.props.data.addresses ? ArrayUtils.getDropdownLabelFromValue(this.props.data.residentialStatus, config.formOptionsResidentialStatus) : '' },
			{ label: this.props.content.reviewLabeldateMoved, value: this.props.data.addresses ? this.props.data.addresses[0].dateMoved : '' },
		];

		_.transform(_.tail(this.props.data.addresses), (result, address) => {
			result.push(
				{ label: this.props.content.reviewLabelPreviousaddresses, value: CountryUtils.getAddressString(address) },
				{ label: this.props.content.reviewLabeldateMoved, value: address.dateMoved }
			);
		}, personalDetails2);

		const contactDetails1 = [
			{ label: this.props.content.reviewLabelemailAddress, value: this.props.data.emailAddress, formatting: 'lowercase' },
			{ label: this.props.content.reviewLabelpreferredContactMethod, value: ArrayUtils.getDropdownLabelFromValue(this.props.data.preferredContactMethod, config.formOptionsPreferredContactMethod) },
		];

		const contactDetails2 = [
			{ label: this.props.content.reviewLabelphoneNumber, value: this.formatPhoneNumber(this.props.data.phoneNumber) },
		];

		const nationality1 = [
			{ label: this.props.content.reviewLabelnationality, value: CountryUtils.getNationalityFromName(this.props.data.nationality), formatting: 'capitalize' },
			{ label: this.props.content.reviewLabelcountryBorn, value: this.props.data.countryBorn, formatting: 'capitalize' },
			{ label: this.props.content.reviewLabelcityBorn, value: this.props.data.cityBorn, formatting: 'capitalize' },
			{ label: this.props.content.reviewLabelukCitizen, value: this.props.data.ukCitizen, formatting: 'capitalize' },
		];

		const citizenships = (this.props.data.citizenshipList && this.props.data.citizenshipList.length) ? ArrayUtils.getCommaString(this.props.data.citizenshipList) : 'No';

		const nationality2 = [
			{ label: this.props.content.reviewLabelcitizenshipList, value: citizenships, formatting: 'capitalize' },
			{ label: this.props.content.reviewLabeltaxObligations, value: this.getTaxObligations(this.props.data.hasNoTaxOligations, this.props.data.taxObligationList), formatting: 'capitalize' },
			{ label: this.props.content.reviewLabelallTaxObligationsListed, value: 'Yes' },
		];

		const employment1 = [
			{ label: this.props.content.reviewLabelemploymentStatus, value: ArrayUtils.getDropdownLabelFromValue(this.props.data.employmentStatus, config.formOptionsEmploymentStatus) },
			{ label: this.props.content.reviewLabelemploymentOccupation, value: ArrayUtils.getDropdownLabelFromValue(this.props.data.employmentOccupation, config.formOptionsOccupation) },
		];

		const employment2 = [
			{ label: this.props.content.reviewLabelemployerName, value: this.props.data.employerName, formatting: 'capitalize' },
			{ label: this.props.content.reviewLabelemploymentStartDate, value: this.props.data.employmentStartDate },
		];

		return (
			<div className="account-opening review-page container-fluid">
				<Helmet title={this.props.content.reviewPageHeader} />
				<PageHeader title={this.props.content.reviewPageTitle} content={this.props.content} />

				<div className="row main-container">
					<PageColumnWrapper step={3} content={this.props.content}>
					{/* Personal Details section */}
					<div className="paper margin-bottom">

						<PersonalDetailsFoundError
							content={this.props.content}
							data={this.props.data}
						/>

						<div className="review-top-section">
							<h1 className="icon-header product-details h2-style">{this.props.content.reviewTopTitle}</h1>
							<p className="h3-style">{this.props.content.reviewTopSubtitle}</p>
							<p>You are applying for a {applyingFor}</p>
							<p>{this.props.content.reviewTopParagraph}</p>
							{this.props.content.reviewTopTermsParagraph &&
								<p>{this.props.content.reviewTopTermsParagraph}</p>
							}
						</div>

						<h2 className="icon-header personal-details">Personal details</h2>
						{this.getReviewSection({
							title: this.props.content.reviewLabelsectionPersonalDetails,
							leftContent: personalDetails1,
							rightContent: personalDetails2,
							editLinkTaskId: 'WEB-PERSONAL-DETAILS-PERSONAL',
						})}

						{this.getReviewSection({
							title: this.props.content.reviewLabelsectionContactDetails,
							leftContent: contactDetails1,
							rightContent: contactDetails2,
							editLinkTaskId: 'WEB-PERSONAL-DETAILS-CONTACT',
						})}

						{this.getReviewSection({
							title: this.props.content.reviewLabelsectionNationality,
							leftContent: nationality1,
							rightContent: nationality2,
							editLinkTaskId: 'WEB-EMPLOYMENT-DETAILS-NATIONALITY',
						})}

						{/* Employment Details section */}
						<h2 className="icon-header employment-details">Employment details</h2>

						{this.getReviewSection({
							title: this.props.content.reviewLabelsectionEmployment,
							leftContent: employment1,
							rightContent: employment2,
							editLinkTaskId: 'WEB-EMPLOYMENT-DETAILS-EMPLOYMENT',
						})}

						<AccountTypeReview
							onEditLinkClick={this.onEditLinkClick}
							{...this.props}
						/>
					</div>
					<div className="review-product-summary white-board">
						<div className="review-section">
							<h2 className="icon-header important-information padding-bottom">{this.props.content.reviewImportantInformationTitle}</h2>
							<div className="key-features-section padding-bottom">
								<h3 className="sub-heading h4-style">{this.props.content.reviewKeyFeaturesTitle} {applyingFor}</h3>

								{this.props.data.product.description &&
									<p>{this.props.data.product.description}</p>
								}

								<ul>
									{this.getKeyFeatureItems(productData)}
								</ul>
								{this.getOfferRestrictions(productData.offerRestrictions, 'reviewOfferRestrictionsTitle')}

							</div>

							<h4>{this.props.content.reviewTermsDocumentsTitle}</h4>

							{this.getDocumentSection()}

							<div className="review-accept-ts-and-cs">
								<p>
									<CheckBoxQuestion
										defaultValue={!!this.props.data.reviewAcceptTsAndCs}
										group={AccountOpeningConstants.GROUP_REVIEW}
										name="reviewAcceptTsAndCs"
										dataAnchor="review-terms-and-conditions"
										onChange={this.onReviewAcceptTCs}
										required
									>
										{this.props.content.reviewAcceptTsAndCs}
									</CheckBoxQuestion>
								</p>

								<ul>
									{this.getMandateBulletPoints(this.props.content)}
								</ul>

								<p>{this.props.content.reviewTermsDocumentsParagraph} {applyingFor}.</p>
							</div>

							<h4>{this.props.content.marketingPrefsTitle}</h4>

							<p>{this.props.content.marketingPrefsText}</p>

							<MultiCheckBoxQuestion
								name="contactMethods"
								group={AccountOpeningConstants.GROUP_REVIEW}
								data={[
									{ value: 'EMAIL', label: 'Email', anchor: 'contact-email' },
									{ value: 'SMS', label: 'SMS', anchor: 'contact-sms' },
									{ value: 'PHONE', label: 'Phone', anchor: 'contact-phone' },
									{ value: 'MAIL', label: 'Post', anchor: 'contact-post' },
								]}
								defaultValue={this.props.data.contactMethods}
								onChange={this.onContactMethodsChange}
							/>

							{this.props.content.marketingPrefsSmsDYB ? <p>{this.props.content.marketingPrefsSmsDYB}</p> : false}

							<BottomNavigationBox
								onClickNext={this.onSubmitPage}
								disabled={this.isSubmitDisabled()}
								nextButtonLabel="Submit"
								backTaskId="WEB-EMPLOYMENT-DETAILS"
								dataAnchorNext={'complete-application'}
							/>
						</div>
					</div>
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

module.exports = ReviewPage;
