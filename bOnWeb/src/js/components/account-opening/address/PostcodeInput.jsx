/**
 * @module PostcodeInput
 */
const React = require('react');
const { PropTypes } = React;

const InputMixin = require('../../../components/common/mixins/InputMixin');
const LoadingSpinner = require('../../LoadingSpinner');

const PostcodeInput = React.createClass({

	propTypes: {
		onManualAddressClick: PropTypes.func,
		supportsManualInput: PropTypes.bool,
		addressId: PropTypes.number.isRequired,
		group: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		onSearch: PropTypes.func.isRequired,
		defaultValue: PropTypes.string,
		isSearching: PropTypes.bool,
		content: PropTypes.object,
		required: PropTypes.bool,
		isManual: PropTypes.bool,
	},

	mixins: [InputMixin],

	getInitialState() {
		return {
			value: this.props.defaultValue,
		};
	},

	/**
	 * Look up the postcode when the 'Find Address' button is clicked.
	 *
	 * @param {Object} event 		The click event
	 */
	_lookupPostcode(event) {
		event.preventDefault();

		if (!this.isValid(this.state.value)) {
			return;
		}

		this.props.onSearch(this.props.name, this.state.value);

		// @ticket DYB-32251: on focus will result in current value in postcode field being resent to store on blur
		this.component.focus();
	},

	/**
	 * The onchange event for postcode entry. Simply uppercases the input postcode and updates the state.
	 *
	 * @param {Object} event 		The click event
	 */
	_onChange(event) {
		const postcode = event.target.value;

		this.setState({ value: postcode.toUpperCase() });
	},

	/**
	 * The onBlur function to fire after a postcode has been entered.
	 * This will save the postcode to the store.
	 *
	 * @param {Object} event 		The click event
	 */
	_onPostcodeChange(event) {
		let postcode = event.currentTarget.value;

		// This is a helpful little bit to automatically format a UK postcode with a space in the correct spot if there isn't one already.
		const postcodeMatch = postcode.match(/^([A-Z]{1,2}\d{1,2}[A-Z]?)\s*(\d[A-Z]{2})$/);
		if (postcodeMatch !== null) {
			postcodeMatch.shift();
			postcode = postcodeMatch.join(' ');
		}

		this.setState({ value: postcode }, () => {
			this.enableValidation();
			this.updateStateValidation();

			this.props.onChange(this.props.name, postcode);
		});
	},

	render() {
		const textInputName = this.props.name;

		const classNames = [
			'postcode-label-container',
			'col-xs-12',
			this.props.supportsManualInput ? 'col-md-3' : 'col-md-4',
		].join(' ');

		return (
			<fieldset className="row">
				<legend>Postcode</legend>
				<div className={classNames}>
					<label htmlFor={textInputName}>{this.props.content.postcodeSearchLegend}</label>
					{this.getHelpIcon()}
				</div>
				<div className={classNames}>
					<input type="text"
						ref={component => this.component = component}
						name={textInputName}
						key={textInputName}
						title="Postcode"
						value={this.state.value}
						className={this.className('postcode-input')}
						onChange={this._onChange}
						onBlur={this._onPostcodeChange}
						data-anchor="postcode-input"
						required={this.props.required}
					/>
				</div>
				<div className={classNames}>
					<button name={`address_${this.props.addressId}_findaddress`}
						onClick={this._lookupPostcode}
						className="btn btn-primary btn-lg btn-postcode-input btn-filled"
						data-anchor="postcode-button"
						role="button"
						disabled={this.props.isSearching}
					>
						{this.props.isSearching ? <LoadingSpinner imgSize={30} /> : this.props.content.postcodeSearchButtonLabel }
					</button>
				</div>

				{(this.props.supportsManualInput && !this.props.isManual) && <div className={`${classNames} manual-postcode`}>
					<button
						onClick={this.props.onManualAddressClick}
						className="btn btn-primary btn-lg btn-postcode-input btn-postcode-manual"
						role="button"
						data-anchor={`manual-address-${this.props.addressId}`}
					>
						Add manually
					</button>
				</div>}

				{this.getErrorElement()}
				{this.getHelpElement()}
			</fieldset>
		);
	},
});

module.exports = PostcodeInput;
