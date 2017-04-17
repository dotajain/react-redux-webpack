/**
 * @module AddressSection
 */
const React = require('react');
const { PropTypes } = React;
const moment = require('moment');
const _ = require('lodash');

const AccountOpeningActions = require('../../../actions/AccountOpeningActions');
const PostcodeActions = require('../../../actions/PostcodeActions');

const AccountOpeningConstants = require('../../../constants/AccountOpeningConstants');

const ComponentHeader = require('../../common/ComponentHeader');
const PreviousAddress = require('../address/PreviousAddress');
const CurrentAddress = require('../address/CurrentAddress');
const config = require('../../../config');

const ValidationUtils = require('../../../Utils/ValidationUtils');

const AddressSection = React.createClass({

	propTypes: {
		appData: PropTypes.object,
		content: PropTypes.object.isRequired,
		name: PropTypes.string.isRequired,
		group: PropTypes.string.isRequired,
		addressList: PropTypes.array,
		postcodeData: PropTypes.object,
		residentialStatus: PropTypes.string,
		isExistingCustomer: PropTypes.bool.isRequired,
		validations: PropTypes.object.isRequired,
		arrayName: PropTypes.string,
		validateAfterDate: PropTypes.string,
	},

	componentDidMount() {
		if (!this.isValidExistingPostcode(this.props.addressList, this.props.isExistingCustomer)) {
			this.forceValidationFail();
		}
	},

	componentWillReceiveProps(nextProps) {
		this._removeInvalidAddresses(nextProps.addressList);
	},

	/**
	 * How many address sections should be shown to a user?
	 * We need addresses for at least the past 3 years.
	 *
	 * @return {Number} Sections to show.
	 */
	getNumberOfAddressSections() {
		const list = this.props.addressList;

		// Min
		if (!list || list.length === 0) {
			return 1;
		}

		// Max
		if (list.length >= config.maxNumberOfAddresses) {
			return config.maxNumberOfAddresses;
		}

		const dates = _.uniq(_.map(list, 'dateMoved')); // @ticket DYB-32249
		if (dates.length !== list.length || !ValidationUtils.isKeyValid(this.props.validations, this.props.group, `dateMoved_${list.length}`)) {
			return list.length;
		}

		// Cover the past 3 years
		const oldestDateMoved = _.last(list).dateMoved;
		const threeYearsAgo = moment().startOf('days').subtract(3, 'years');

		if (moment(oldestDateMoved, 'DD-MM-YYYY').isAfter(threeYearsAgo)) {
			return list.length + 1;
		}

		return list.length;
	},

	/**
	 * Raises the clearAddress action with the supplied
	 * addressIndexes
	 *
	 * @param {Array} 	Array containing list of address indexes
	 * to be removed
	 */
	_clearAddress(addressIndexes) {
		AccountOpeningActions.clearAddress(addressIndexes);
	},

	/**
	 * Get list of all necessary address sections.
	 *
	 * @return {Array} Of AddressSection or AddressSectionReadOnly elements.
	 */
	_getAddressSectionList() {
		const addressList = (this.props.addressList || []).slice();
		const postcodeData = this.props.postcodeData || {};
		const numberOfAddresses = this.getNumberOfAddressSections();
		const currentAddressSeed = 1;
		const previousAddressSeed = currentAddressSeed + 1;
		const previousAddressRangeMax = numberOfAddresses + currentAddressSeed;

		let previousAddress;
		const nextAddress = curr => {
			previousAddress = curr;
			return addressList.shift() || {};
		};

		const getPostcodeData = (index, filter) => {
			const filterValue = filter || (() => true);
			const current = postcodeData[index] || { error: false };
			return filterValue(current) ? current : undefined;
		};

		let currentAddress = nextAddress({});

		return [
			<CurrentAddress
				addressId={currentAddressSeed}
				appData={this.props.appData}
				arrayName={this.props.arrayName}
				arrayIndex={0}
				content={this.props.content}
				data={currentAddress}
				isCurrentAddress
				isExistingCustomer={this.props.isExistingCustomer}
				key="current-address"
				group={this.props.group}
				name="address_1_section"
				hasError={getPostcodeData(currentAddressSeed).error}
				postcodeData={getPostcodeData(currentAddressSeed, _.isArray)}
				residentialStatus={this.props.residentialStatus}
				validateAfterDate={this.props.validateAfterDate}
			/>]
			.concat(_.range(previousAddressSeed, previousAddressRangeMax).map(addressId => {
				currentAddress = nextAddress(currentAddress);
				const previousDateMoved = previousAddress.dateMoved;
				const addressIndex = addressId - currentAddressSeed;

				return (<PreviousAddress
					addressId={addressId}
					appData={this.props.appData}
					arrayIndex={addressIndex}
					arrayName={this.props.arrayName}
					canRemove={addressId === numberOfAddresses}
					content={this.props.content}
					data={currentAddress}
					isCurrentAddress={false}
					isExistingCustomer={this.props.isExistingCustomer}
					key={`previous-address-${addressId}`}
					group={this.props.group}
					name={`address_${addressId}_section`}
					onRemove={() => AccountOpeningActions.resetAddress(addressIndex)}
					hasError={getPostcodeData(addressId).error}
					postcodeData={getPostcodeData(addressId, _.isArray)}
					residentialStatus={this.props.residentialStatus}
					validateBeforeDate={previousDateMoved}
					validateAfterDate={this.props.validateAfterDate}
				/>);
			}));
	},

	/**
	 * Responsible for automatically removing any addresses after
	 * any address that fufils the 3 previous years requirement
	 *
	 * @param {Array} addressList   Array containing current addresses
	 */
	_removeInvalidAddresses(addressList) {
		if (!addressList || addressList.length < 2) {
			return;
		}

		const nextCount = addressList.length;
		const threeYearsAgo = moment().startOf('days').subtract(3, 'years');
		const dateIsValid = addr => addr.dateMoved && moment(addr.dateMoved, 'DD-MM-YYYY').isValid();
		const dateIsBefore = addr => moment(addr.dateMoved, 'DD-MM-YYYY').isBefore(threeYearsAgo);

		const validIndex = _.findIndex(addressList, addr => dateIsValid(addr) && dateIsBefore(addr));

		const normalizedCount = validIndex + 1;

		if (validIndex === -1 || normalizedCount === nextCount) {
			return;
		}

		const range = _.range(normalizedCount, nextCount);

		this._clearAddress(range);
		PostcodeActions.clearLoadedAddressList(range.map(i => i + 1));
	},

	/**
	 * Need to force fail validation on readonly and first
	 * postcode field when we strip out invalid addresses
	 *
	 * @ticket DYB-21942
	 */
	forceValidationFail() {
		AccountOpeningActions.updateValidation(AccountOpeningConstants.GROUP_PAGE_1, 'addresses', false);
	},

	/**
	 * Is the address invalid for an existing customer?
	 *
	 * @param {Array} addressList 				Array of addresses
	 * @param {Boolean} isExistingCustomer 		is existing customer
	 * @return {Boolean} has an invalid address for an existing customer
	 */
	isValidExistingPostcode(addressList, isExistingCustomer) {
		return !isExistingCustomer || !!(_.isArray(addressList) && isExistingCustomer);
	},

	render() {
		if (!this.isValidExistingPostcode(this.props.addressList, this.props.isExistingCustomer)) {
			return (
				<p className="error padding-top">{this.props.content.addressInvalidMessage}</p>
			);
		}

		return (
			<ComponentHeader
				title={this.props.content.addressTitle}
				bodyClass=""
				titleLevel={2}
				hasSeparator
				subTitle={this.props.content.addressSubtitle}
			>
				{this._getAddressSectionList()}
			</ComponentHeader>
		);
	},
});

module.exports = AddressSection;
