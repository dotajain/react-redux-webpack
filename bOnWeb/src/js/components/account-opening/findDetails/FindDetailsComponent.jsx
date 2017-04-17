/**
 * @module FindDetailsComponent
 * @ticket DYB-12247
 *
 */

const React = require('react');
const update = require('react-addons-update');
const PropTypes = React.PropTypes;
const _ = require('lodash');
const config = require('../../../config');

const { TextQuestion, DatePickerQuestion, DropdownQuestion, RadioQuestion } = require('../../common/questionsets');
const BottomNavigationBox = require('../../common/BottomNavigationBox');
const ErrorMessage = require('../../common/ErrorMessage');

const ChallengeComponent = require('../login/ChallengeComponent');

const AccountOpeningActions = require('../../../actions/AccountOpeningActions');
const SessionActionCreator = require('../../../actions/SessionActionCreator');

const AccountOpeningConstants = require('../../../constants/AccountOpeningConstants');

const { GROUP_EXISTING_CUSTOMER_WITHOUT_CUSTOMERID: groupExistingCustomer } = AccountOpeningConstants;

const ValidationUtils = require('../../../utils/ValidationUtils');
const ChallengeUtils = require('../../../utils/ChallengeUtils');
const PathUtils = require('../../../utils/PathUtils');
const DateUtils = require('../../../utils/DateUtils');
const ProductUtils = require('../../../utils/ProductUtils');

const userInfoFields = [
	'authFirstName',
	'authLastName',
	'authDateOfBirth',
	'authGender',
	'authHouseNumber',
	'authStreet',
	'authPostcode',
];

const transducer = action => {
	return _.reduce(userInfoFields, (acc, field) => acc || action(field), false);
};

const isUserInfoDirty = props => {
	return transducer(field => !_.isEmpty(props.data[field]));
};

const hasUserInfoChanged = (props, nextProps) => {
	return transducer(field => props.data[field] !== nextProps.data[field]);
};

const FindDetailsComponent = React.createClass({
	propTypes: {
		data: PropTypes.shape({
			hasCustomerName: PropTypes.string,
			bankID: PropTypes.string,
			authFirstName: PropTypes.string,
			authLastName: PropTypes.string,
			authDateOfBith: PropTypes.string,
			authGender: PropTypes.string,
			authHouseNumber: PropTypes.string,
			authStreet: PropTypes.string,
			authPostcode: PropTypes.string,
			username: PropTypes.any,
			authDateOfBirth: PropTypes.string,
			productCode: PropTypes.string,
		}),
		session: PropTypes.object,
		content: PropTypes.shape({
			authBankQuestion: PropTypes.string.isRequired,
			authFirstNameQuestion: PropTypes.string.isRequired,
			authLastNameQuestion: PropTypes.string.isRequired,
			authDateOfBirthQuestion: PropTypes.string.isRequired,
			authGenderQuestion: PropTypes.string.isRequired,
			authHouseNumberQuestion: PropTypes.string.isRequired,
			authStreetQuestion: PropTypes.string.isRequired,
			authPostcodeQuestion: PropTypes.string.isRequired,
			authNextButtonText: PropTypes.string.isRequired,
			authCheckDetailsError: PropTypes.string,
		}),
		validations: PropTypes.object.isRequired,
		appData: PropTypes.object,
		targetScope: PropTypes.number.isRequired,
		onSuccess: PropTypes.func.isRequired,
		envConfig: PropTypes.object.isRequired,
	},

	getInitialState() {
		return { isLoading: false, isResettingBankId: false, isResettingUserInfo: false };
	},

	componentWillMount() {
		const { envConfig } = this.props;

		if (envConfig.bankId === 'DYB' && this.props.data.bankID) {
			this.setState({
				isResettingBankId: true,
			});
			AccountOpeningActions.resetBankId();
		}

		if (!_.isEmpty(this.props.session.token)) {
			SessionActionCreator.requestAccessTokenReset();
		}

		if (!_.isEmpty(this.props.session.challenge)) {
			SessionActionCreator.requestAccessChallengeReset();
		}

		if (!_.isEmpty(this.props.data.username)) {
			AccountOpeningActions.resetUsername();
		}

		if (isUserInfoDirty(this.props)) {
					this.setState({
						isResettingUserInfo: true,
					});
					AccountOpeningActions.resetUserInfo(userInfoFields);
				}
	},

	componentDidMount() {
		const { envConfig } = this.props;

		if (envConfig.bankId !== 'DYB') {
			AccountOpeningActions.updateFormValue('bankID', envConfig.bankId);
		}
	},

	/**
	 * Responsible for controlling the state flow of this component
	 *
	 * If no token or challenge is present, it will do nothing.
	 *
	 * If a challenge is present within the nextProps.session and we are loading and we are not waiting for a token,
	 * we set isLoading to false, as this will tell the rest of the component we have challenges to render
	 * after the intial button click
	 *
	 * if We do have a token, we if we have an error, and waiting for a token, if we do, we reset the state to
	 * the default values, so the rest of the component can react to the error appropriately
	 *
	 */
	componentWillReceiveProps(nextProps) {
		let state = _.assign({}, this.state);

		const challengeUtils = new ChallengeUtils(nextProps.session);

		if (this.props.data.bankID !== nextProps.data.bankID || !nextProps.data.bankID) {
			state = update(state, {
				isResettingBankId: { $set: false },
			});
		}

		if (hasUserInfoChanged(this.props, nextProps)) {
			state = update(state, {
				isResettingUserInfo: { $set: false },
			});
		}

		if (challengeUtils.hasToken()) {
			const reset = state => update(state, {
				isLoading: { $set: false },
				isReadyForToken: { $set: false },
			});

			if (nextProps.session.token.error && this.state.isReadyForToken) {
				state = reset(state);
				state = update(state, {
					hadError: { $set: true },
				});

				SessionActionCreator.requestAccessTokenReset();
				SessionActionCreator.requestAccessChallengeReset();
			}

			if (!nextProps.session.token.error && this.state.isReadyForToken) {
				state = reset(state);
			}
		}

		if (ChallengeUtils(nextProps.session).hasChallenge() &&
					this.state.isLoading &&
					!this.state.isReadyForToken) {
			state = update(state, { isLoading: { $set: false } });
		}

		this.setState(state);
	},

	/**
	 * Responsible for delegating to the supplied props.onSuccess when the nextProps.session has a token
	 *
	 */
	componentWillUpdate(nextProps) {
		if (ChallengeUtils(nextProps.session).hasToken() && !nextProps.session.token.error) {
			this.props.onSuccess();
		}
	},

	/**
	 * Responsible for formatting the value of the Postcode box.  Will split it and make it uppercase:
	 *
	 * @param {String} postcode Unformated postcode
	 * @return {String} Correctly formatted postcode
	 * @example eh75hx => EH7 5HX
	 *
	 */
	_formatPostcode(postcode) {
		const postcodeMatch = postcode.match(/^([A-Z]{1,2}\d{1,2}[A-Z]?)\s*(\d[A-Z]{2})$/);
		if (postcodeMatch !== null) {
			postcodeMatch.shift();
			return postcodeMatch.join(' ').toUpperCase();
		}

		return postcode.toUpperCase();
	},

	_onGenderChange(key, value) {
		const transformValueForEsMatch = _.head(value);
		AccountOpeningActions.updateFormValue(key, transformValueForEsMatch);
	},

	/**
	 * Responsible for handling button clicks.
	 *
	 * - Initial click sets the state to denote it's loading, it will construct the userInfo and fire an access challenge request when no challenge is present
	 * - Second click sets the state to loading also, checks to see if there is a challenge, and no token, and sets the component to ready for token
	 *
	 */
	_onSubmitHandler(e) {
		e.preventDefault();

		const challengeUtils = new ChallengeUtils(this.props.session);

		let state = _.assign({}, this.state, {
			isReadyForToken: false,
			isLoading: true,
			hadError: false,
		});

		const userInfo = {
			firstName: this.props.data.authFirstName,
			lastName: this.props.data.authLastName,
			dateOfBirth: DateUtils.getAPIDateString(this.props.data.authDateOfBirth),
			gender: this.props.data.authGender,
			houseNumber: this.props.data.authHouseNumber,
			street: this.props.data.authStreet,
			postcode: this.props.data.authPostcode,
		};

		const scope = this.props.targetScope;

		if (!challengeUtils.hasChallenge()) {
			SessionActionCreator.requestAccessChallengeCreate(userInfo, scope);
		} else if (!challengeUtils.hasToken()) {
			state = update(state, {
				isReadyForToken: { $set: true },
			});

			SessionActionCreator.requestAccessTokenCreate(userInfo, data => {
				const { userIdentity } = data;
				AccountOpeningActions.updateFormValue('username', userIdentity.userId || userIdentity.username);
			});
		}

		this.setState(state);
	},

	hasChallengeError() {
		return this.props.session && this.props.session.challenge && this.props.session.challenge.error;
	},

	/**
	 * validate the current group
	 * @return {Boolean}
	 */
	isCurrentGroupValid() {
		return ValidationUtils.isGroupValid(this.props.validations, groupExistingCustomer);
	},

	isSubmitDisabled() {
		const submitDisabled = !this.isCurrentGroupValid() || this.state.isLoading || this.hasChallengeError() || this.props.session.isPreparingStepupAuthentication;

		return submitDisabled;
	},

	renderErrors() {
		if ((!this.props.session || !this.props.session.error) && !this.state.hadError) {
			return null;
		}

		return (<div className="row padding-bottom" role="alert" aria-live="assertive">
					<ErrorMessage text={this.props.content.authCheckDetailsError} extraClasses="api-error-message" />
				</div>);
	},

	renderForm() {
		const { envConfig } = this.props;

		if (ChallengeUtils(this.props.session).hasChallenge() && !this.state.hadError) {
			return null;
		}

		const showBankQuestion = envConfig.bankId === 'DYB';
		const isResettingBankId = this.state.isResettingBankId;
		const isResettingUserInfo = this.state.isResettingUserInfo;
		let minAge = ProductUtils.getMinAge(this.props.data.productCode);
		let maxAge = ProductUtils.getMaxAge(this.props.data.productCode);
		minAge = minAge ? minAge : config.minimumAge;
		maxAge = maxAge ? maxAge : config.maximumAge;

		return (<div>
				{showBankQuestion && !isResettingBankId && <RadioQuestion
					defaultValue={this.props.data.bankID}
					group={groupExistingCustomer}
					name="authBankId"
					labelText={this.props.content.authBankQuestion}
					onChange={(key, value) => AccountOpeningActions.updateFormValue('bankID', value)}
					dataAnchor="bank-id"
					options={[{
						anchor: 'select-bank-cb',
						checkedImage: PathUtils.getPath('images/cb/bank-logo.png'),
						label: 'Clydesdale Bank',
						image: PathUtils.getPath('images/cb/bank-logo-grey.png'),
						value: 'CB',
					}, {
						anchor: 'select-bank-yb',
						checkedImage: PathUtils.getPath('images/yb/bank-logo.png'),
						label: 'Yorkshire Bank',
						image: PathUtils.getPath('images/yb/bank-logo-grey.png'),
						value: 'YB',
					}]}
					required
				/>}
				{!isResettingUserInfo && <span> <TextQuestion
					name="authFirstName"
					group={groupExistingCustomer}
					onChange={AccountOpeningActions.updateFormValue}
					minLength={1}
					maxLength={35}
					validateType="alpha"
					dataAnchor="first-name"
					defaultValue={this.props.data.authFirstName}
					required
				>
					{this.props.content.authFirstNameQuestion}
				</TextQuestion>
				<TextQuestion
					name="authLastName"
					group={groupExistingCustomer}
					onChange={AccountOpeningActions.updateFormValue}
					minLength={1}
					maxLength={25}
					validateType="alpha"
					dataAnchor="last-name"
					defaultValue={this.props.data.authLastName}
					required
				>
					{this.props.content.authLastNameQuestion}
				</TextQuestion>
				<DatePickerQuestion
					name="authDateOfBirth"
					group={groupExistingCustomer}
					onChange={AccountOpeningActions.updateFormValue}
					defaultValue={this.props.data.authDateOfBirth}
					dataAnchor="date-of-birth"
					validateMinAge={minAge}
					validateMaxAge={maxAge}
					required
				>
					{this.props.content.authDateOfBirthQuestion}
				</DatePickerQuestion>
				<DropdownQuestion
					name="authGender"
					group={groupExistingCustomer}
					data={['Male', 'Female']}
					onChange={this._onGenderChange}
					dataAnchor="gender"
					defaultValue={this.props.data.authGender}
					required
				>
					{this.props.content.authGenderQuestion}
				</DropdownQuestion>
				<TextQuestion
					name="authHouseNumber"
					group={groupExistingCustomer}
					onChange={AccountOpeningActions.updateFormValue}
					minLength={1}
					maxLength={40}
					defaultValue={this.props.data.authHouseNumber}
					validateType="alphanumeric"
					dataAnchor="house-number"
					required
				>
					{this.props.content.authHouseNumberQuestion}
				</TextQuestion>
				<TextQuestion
					name="authStreet"
					group={groupExistingCustomer}
					onChange={AccountOpeningActions.updateFormValue}
					minLength={1}
					maxLength={40}
					defaultValue={this.props.data.authStreet}
					validateType="alphanumeric"
					dataAnchor="street"
					required
				>
					{this.props.content.authStreetQuestion}
				</TextQuestion>
				<TextQuestion
					name="authPostcode"
					group={groupExistingCustomer}
					onChange={AccountOpeningActions.updateFormValue}
					defaultValue={this.props.data.authPostcode}
					minLength={1}
					maxLength={35}
					validateType="postcode"
					dataAnchor="postcode"
					valueFormatter={this._formatPostcode}
					required
				>
					{this.props.content.authPostcodeQuestion}
				</TextQuestion></span>}
			</div>);
	},

	render() {
		return (<div>
					{this.renderErrors()}

					{this.props.session.challenge && !this.state.hadError && <ChallengeComponent
						group={groupExistingCustomer}
						{...this.props}
					/>}

					{this.renderForm()}

					<BottomNavigationBox
						onClickNext={this._onSubmitHandler}
						className="text-center"
						disabled={this.isSubmitDisabled()}
						dataAnchorNext="authentication-next"
						nextButtonLabel={this.props.content.authNextButtonText}
						isLoading={this.state.isLoading}
					/>
				</div>
			);
	},
});

module.exports = FindDetailsComponent;
