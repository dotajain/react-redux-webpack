/**
 * @module DomesticAddress
 */

const React = require('react');
const { PropTypes } = React;

const PostcodeSearch = require('./PostcodeSearch');

const NonEditableAddress = require('./NonEditableAddress');
const ErrorMessage = require('../../common/ErrorMessage');
const EditableDomesticAddress = require('./EditableDomesticAddress');

const AccountOpeningActions = require('../../../actions/AccountOpeningActions');

const get = (parent, get, d) => parent ? get(parent) : d;

const DomesticAddress = React.createClass({

	propTypes: {
		arrayName: PropTypes.string.isRequired,
		arrayIndex: PropTypes.number.isRequired,
		data: PropTypes.object.isRequired,
		onSearch: PropTypes.func.isRequired,
		onManualAddressClick: PropTypes.func,
		editable: PropTypes.bool,
		isReadOnly: PropTypes.bool,
		supportsManualInput: PropTypes.bool,
		addressId: PropTypes.number.isRequired,
		postcodeData: PropTypes.array,
		hasError: PropTypes.bool,
		content: PropTypes.object.isRequired,
		group: PropTypes.string,
		name: PropTypes.string,
	},

	getDefaultProps() {
		return {
			onChange: () => {},
			onSearch: () => {},
			onManualAddressClick: () => {},
		};
	},

	componentDidMount() {
		AccountOpeningActions.enableValidation(this.props.group, this.props.name);
	},

	componentDidUpdate() {
		const showAddressData = this.props.editable && get(this.props.data, d => d.id || d.isManual);
		const showReadonlyAddressData = this.props.isReadOnly || (!this.props.editable && get(this.props.data, d => d.id));
		AccountOpeningActions.updateValidation(this.props.group, this.props.name, !!(showAddressData || showReadonlyAddressData));
	},

	componentWillUnmount() {
		AccountOpeningActions.removeValidation(this.props.group, this.props.name);
	},
	onManualAddressClick() {
		this.props.onManualAddressClick();
	},

	/**
	 * Responsible for performing postcode search.
	 *
	 * Checks to see if the postcode has change, if not, it clears the currently selected address
	 */
    onSearch(key, value) {
		if (get(this.props.data, data => data.postcode) === value) {
			AccountOpeningActions.resetAddress(this.props.arrayIndex);
		}

		this.props.onSearch(key, value);
	},

	render() {
		const showAddressData = this.props.editable && get(this.props.data, d => d.id || d.isManual);
		const showReadonlyAddressData = this.props.isReadOnly || (!this.props.editable && get(this.props.data, d => d.id));

		const addressIndex = this.props.arrayIndex;
		const { updateFormValue } = AccountOpeningActions;

		return (<div>
				{!this.props.isReadOnly && <PostcodeSearch
					postcode={get(this.props.data, d => d.postcode)}
					isManual={get(this.props.data, d => d.isManual)}
					supportsManualInput={this.props.supportsManualInput}
					onSearch={this.onSearch}
					onManualAddressClick={this.onManualAddressClick}
					onChange={(key, value) => updateFormValue('postcode', value, this.props.arrayName, addressIndex)}
					name={`postcode_${this.props.addressId}`}
					labelText={this.props.content.postcodeQuestion}
					group={this.props.group}
					data={this.props.data}
					postcodeData={this.props.postcodeData}
					hasError={this.props.hasError}
					section={this.props.name}
					addressId={this.props.addressId}
					content={this.props.content}
					required
				/>}

				{this.props.hasError &&
					<div role="alert" aria-live="assertive"><ErrorMessage text={this.props.content.addressLookupError} /></div>
				}

				{showAddressData && <EditableDomesticAddress {...this.props} />}

				{showReadonlyAddressData && <NonEditableAddress {...this.props} />}
			</div>);
	},
});

module.exports = DomesticAddress;
module.exports.EditableDomesticAddress = EditableDomesticAddress;
