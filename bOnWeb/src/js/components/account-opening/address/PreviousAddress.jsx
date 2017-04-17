/**
 * @module PreviousAddress
 */
const React = require('react');
const { PropTypes } = React;
const _ = require('lodash');

// Components
const AddressContainer = require('./AddressContainer');
const DomesticAddress = require('./DomesticAddress');
const InternationalAddress = require('./InternationalAddress');
const AddressTypeSelector = require('./AddressTypeSelector');
const DatePickerQuestion = require('../../common/questionsets/DatePickerQuestion');

const AccountOpeningActions = require('../../../actions/AccountOpeningActions');

const get = (parent, get, d) => parent ? get(parent) : d;

// TODO: Replace with stateless component when merged with React update
const PreviousAddressHeader = props => {
	return (<div>
				<h2 className="component-title">{props.previousAddressTitle}</h2>
				<div className="component-header-subtitle">{props.previousAddressSubtitle}</div>
			</div>);
};

PreviousAddressHeader.propTypes = {
	previousAddressTitle: PropTypes.string.isRequired,
	previousAddressSubtitle: PropTypes.string.isRequired,
};

const domestic = 'domestic';
const international = 'international';
const matrix = {};
matrix[domestic] = 'Yes';
matrix[international] = 'No';
// TODO: Replace with const matrix = {[domestic]: 'Yes', [international]: 'No'}

const PreviousAddress = React.createClass({
	propTypes: {
		addressId: PropTypes.number.isRequired,
		arrayName: PropTypes.string.isRequired,
		arrayIndex: PropTypes.number.isRequired,
		content: PropTypes.object.isRequired,
		data: PropTypes.object.isRequired,
		isManual: PropTypes.bool,
		canRemove: PropTypes.bool,
		group: PropTypes.string,
		validateBeforeDate: PropTypes.string,
		validateAfterDate: PropTypes.string,
		onRemove: PropTypes.func,
	},

	onAddressTypeChange(isDomestic) {
		const addressType = _.invert(matrix)[isDomestic];
		AccountOpeningActions.resetAddress(this.props.arrayIndex);
		this.update('addressType', addressType);
	},

	onChange(key, value) {
		const realKey = key.split('_')[0];
		this.update(realKey, value);
	},

	onManualAddressClick() {
		if (!this.props.isManual) {
			this.update('isManual', true);
		}
	},

	onSearch() {
		if (this.props.isManual) {
			this.update('isManual', false);
		}
	},

	shouldShowRemoveButton() {
		return this.props.canRemove && (get(this.props.data, d => d.id || this.props.data.isManual));
	},

	update(key, value) {
		AccountOpeningActions.updateFormValue(key, value, this.props.arrayName, this.props.arrayIndex);
	},

	render() {
		const shouldShowTypeSelector = true; // !get(this.props.data, d => d.addressType);
		const accessibleAddressNumber = this.props.arrayIndex;
		const isDomestic = get(this.props.data, d => d.addressType === domestic);
		const isInternational = get(this.props.data, d => d.addressType === international);
		const shouldAskForMovedDate = get(this.props.data, d => d.addressType === international || d.id || d.isManual);

		const addressTypeValue = matrix[get(this.props.data, d => d.addressType)];

		return (<AddressContainer addressId={this.props.addressId}>
					<PreviousAddressHeader
						previousAddressTitle={`${accessibleAddressNumber}. ${this.props.content.previousAddressTitle}`}
						previousAddressSubtitle={this.props.content.previousAddressSubtitle}
					/>

					{shouldShowTypeSelector &&
						<AddressTypeSelector
							defaultValue={addressTypeValue}
							onChange={this.onAddressTypeChange}
							{...this.props}
						/>}

					{isDomestic &&
						<DomesticAddress
							supportsManualInput
							editable={get(this.props.data, d => d.isManual)}
							onManualAddressClick={this.onManualAddressClick}
							onSearch={this.onSearch}
							onChange={this.onChange}
							{...this.props}
						/>}

					{isInternational &&
						<InternationalAddress
							onChange={this.onChange}
							{...this.props}
						/>}

					{shouldAskForMovedDate && <DatePickerQuestion
							name={`dateMoved_${this.props.addressId}`}
							group={this.props.group}
							defaultValue={this.props.data.dateMoved}
							dataAnchor={`date-moved-${this.props.addressId}`}
							onChange={(key, value) => this.update('dateMoved', value)}
							validateBeforeDate={this.props.validateBeforeDate}
							validateAfterDate={this.props.validateAfterDate}
							required
					>
							{this.props.content.dateMovedQuestion}
						</DatePickerQuestion>}

					{isDomestic && this.shouldShowRemoveButton() &&
						<button
							className="btn btn-primary btn-lg btn-postcode-remove-input btn-filled"
							onClick={() => this.props.onRemove(this.props.addressId)}
						>
						{this.props.content.removeAddressButtonLabel}
					</button>}
				</AddressContainer>);
	},
});

module.exports = PreviousAddress;
module.exports.PreviousAddressHeader = PreviousAddressHeader;
