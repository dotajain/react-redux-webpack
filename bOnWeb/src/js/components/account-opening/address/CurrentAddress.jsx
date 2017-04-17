/**
 * @module CurrentAddress
 */

const React = require('react');
const { PropTypes } = React;
const config = require('../../../config');

const AddressContainer = require('./AddressContainer');
const DomesticAddress = require('./DomesticAddress');
const DatePickerQuestion = require('../../common/questionsets/DatePickerQuestion');
const DropdownQuestion = require('../../common/questionsets/DropdownQuestion');

// TODO: Remove AccountOpeningActions coupling
const AccountOpeningActions = require('../../../actions/AccountOpeningActions');

const currentAddressArrayIndex = 0;

const CurrentAddress = React.createClass({
	propTypes: {
		addressId: PropTypes.number.isRequired,
		group: PropTypes.string.isRequired,
		isExistingCustomer: PropTypes.bool,
		arrayName: PropTypes.string.isRequired,
		arrayIndex: PropTypes.number.isRequired,
		name: PropTypes.string,
		data: PropTypes.object.isRequired,
		content: PropTypes.object.isRequired,
		residentialStatus: PropTypes.string,
		validateAfterDate: PropTypes.string,
	},

	componentWillMount() {
		AccountOpeningActions.updateFormValue('addressType', 'domestic', this.props.arrayName, currentAddressArrayIndex);
	},

	/**
	 * Responsible for performing postcode search.
	 *
	 * Checks to see if the postcode has change, if not, it clears the currently selected address
	 */
	onSearch() {
		const index = 0;
		AccountOpeningActions.resetAddress([index]);
	},

	render() {
		const showAddressData = (this.props.data && this.props.data.id) || this.props.isExistingCustomer;
		const { updateFormValue } = AccountOpeningActions;
		const { formOptionsResidentialStatus } = config;

		return (<AddressContainer addressId={this.props.addressId}>
					<DomesticAddress
							onSearch={this.onSearch}
							isReadOnly={this.props.isExistingCustomer}
							maskPostcode={this.props.isExistingCustomer}
							{...this.props}
					/>

				{showAddressData &&
					<div>
						<DropdownQuestion
							name="residentialStatus"
							inputClassName="status"
							group={this.props.group}
							defaultValue={this.props.residentialStatus}
							dataAnchor="residential-status"
							data={formOptionsResidentialStatus}
							onChange={updateFormValue}
							required
						>
							{this.props.content.residentialStatusQuestion}
						</DropdownQuestion>
						<DatePickerQuestion
							name={`dateMoved_${this.props.addressId}`}
							group={this.props.group}
							defaultValue={this.props.data.dateMoved}
							dataAnchor={`date-moved-${this.props.addressId}`}
							onChange={(key, value) => updateFormValue('dateMoved', value, this.props.arrayName, currentAddressArrayIndex)}
							validateBeforeToday
							validateAfterDate={this.props.validateAfterDate}
							required
						>
							{this.props.content.dateMovedQuestion}
						</DatePickerQuestion>
					</div>}
			</AddressContainer>);
	},
});

module.exports = CurrentAddress;
