/**
 * @module PostcodeSearch
 */
const React = require('react');
const { PropTypes } = React;

// Components
const PostcodeInput = require('../address/PostcodeInput');
const PostcodeList = require('../address/PostcodeList');

const PostcodeActions = require('../../../actions/PostcodeActions');

const PostcodeSearch = React.createClass({
	propTypes: {
		postcode: PropTypes.string,
		supportsManualInput: PropTypes.bool,
		isManual: PropTypes.bool,
		name: PropTypes.string,
		labelText: PropTypes.string,
		group: PropTypes.string,
		data: PropTypes.object,
		postcodeData: PropTypes.array,
		hasError: PropTypes.bool,
		addressId: PropTypes.number,
		onChange: PropTypes.func,
		onSearch: PropTypes.func,
		content: PropTypes.object,
		onManualAddressClick: PropTypes.func,
		appData: PropTypes.object,
	},

	getInitialState() {
		return {
			isSearching: false,
		};
	},

	componentWillMount() {
		PostcodeActions.clearLoadedAddressList([this.props.addressId]);
	},

	/**
	 * Currently delegates to _updateIsSearching to update the isSearching state
	 */
	componentWillReceiveProps(nextProps) {
		this._updateIsSearching(nextProps);
	},

	/**
	 * The onClick function for clicking (choosing) a PostcodeList
	 *
	 * @param {String} label 		The label of the postcode input field. Not used.
	 * @param {String} value 		The value of the postcode input field.
	 */
	onItemSelected(label, value) {
		PostcodeActions.requestFullAddress(this.props.addressId, value, label);
	},

	_hasErrorToDisplay(currentProps, nextProps) {
		return currentProps.hasError || nextProps.hasError;
	},

	_hasResults(currentData, nextData, nextId) {
		return nextData && currentData !== nextData || nextId;
	},

	/**
	 * Responsible for performing postcode search.
	 *
	 * Checks to see if we have data already, if we do, checks to see if the postcode has changed
	 * if so, it will clear the laoded address list for so the search is sent to the API.  If not, we simply
	 * clear the currently selected one, so we can reuse the previous results
	 */
	_onSearch(key, value) {
		if (!value) {
			return;
		}

		this.props.onSearch(key, value);

		PostcodeActions.clearLoadedAddressList([this.props.addressId]);
		PostcodeActions.requestPostcodeAddresses(this.props.addressId, value);

		this.setState({
			isSearching: true,
			previousPostcode: this.props.postcode,
		});
	},

	/**
	 * Show the multi-select box if we have results, but not yet picked one.
	 *
	 * @return {Boolean}
	 */
	_shouldShowPostcodeList() {
		return !this.props.isManual && !this.state.isSearching && this.props.postcodeData && (!this.props.data || !this.props.data.id);
	},

	/**
	 * Responsible for setting the state isSearching property.
	 * Checks to see if we are searching, and if the result is different
	 * and if it is, sets isSearching state to false
	 * @param  {object} nextProps Next props that will be used to re-render the
	 * component
	 */
	_updateIsSearching(nextProps) {
		if (!this.state.isSearching) {
			return;
		}

		const postcodeLookupResults = this.props.postcodeData;
		const nextPostcodeLookupResults = nextProps.postcodeData;
		const nextId = nextProps.data.id;

		if (this._hasResults(postcodeLookupResults, nextPostcodeLookupResults, nextId) || this._hasErrorToDisplay(this.props, nextProps)) {
			this.setState({
				isSearching: false,
			});
		}
	},

	render() {
		return (
			<div>
				<PostcodeInput
					name={`postcode_${this.props.addressId}`}
					labelText={this.props.content.postcodeQuestion}
					group={this.props.group}
					section={this.props.name}
					defaultValue={this.props.postcode}
					addressId={this.props.addressId}
					onChange={this.props.onChange}
					onSearch={this._onSearch}
					isSearching={this.state.isSearching && !this.props.hasError}
					content={this.props.content}
					data={this.props.data}
					postcodeData={this.props.postcodeData}
					supportsManualInput={this.props.supportsManualInput}
					onManualAddressClick={this.props.onManualAddressClick}
					isManual={this.props.isManual}
					validateType="postcode"
					required
				/>

				{this._shouldShowPostcodeList() && <PostcodeList
					appData={this.props.appData}
					group={this.props.group}
					content={this.props.content}
					section={this.props.name}
					addressId={this.props.addressId}
					onItemSelected={this.onItemSelected}
					data={this.props.postcodeData}
				/>
				}
			</div>
		);
	},
});

module.exports = PostcodeSearch;
