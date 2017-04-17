/**
 * @module PostcodeList
 */

const _ = require('lodash');
const React = require('react');

const MultiSelectQuestion = require('../../common/questionsets/MultiSelectQuestion');
const ErrorMessage = require('../../common/ErrorMessage');
const { PropTypes } = React;

const PostcodeList = React.createClass({

	propTypes: {
		appData: PropTypes.object,
		content: PropTypes.object.isRequired,
		group: PropTypes.string.isRequired,
		data: PropTypes.array.isRequired,
		onItemSelected: PropTypes.func.isRequired,
		hasError: PropTypes.bool,
		addressId: PropTypes.number,
	},

	getInitialState() {
		return { isSearching: false };
	},

	componentWillReceiveProps(nextProps) {
		if (!this.state.isSearching) {
			return;
		}

		if (_.isEqual(nextProps.data, this.props.data)) {
			return;
		}

		this.setState({ isSearching: false });
	},

	onItemSelected(key, value) {
		this.setState({ isSearching: true });
		this.props.onItemSelected(key, value);
	},

	/**
	 * Build array of data to represent the search results.
	 * @return {Array}
	 */
	getPotentialAddresses() {
		return _.map(this.props.data, (item, index) => {
			return {
				index,
				value: item.id,
				text: item['potential_address'],
				dataAnchor: `returned-address-${index + 1}`,
			};
		});
	},

	render() {
		return (
			<div className={`postcode-address-${this.props.addressId}`}>
				<MultiSelectQuestion
					autoFocus
					appData={this.props.appData}
					data={this.getPotentialAddresses()}
					onItemSelected={this.onItemSelected}
					placeholder={this.props.content.selectAddressPlaceholder}
					dataAnchor="postcode"
					name="address-lookup"
					labelText={this.props.content.selectAddressLabel}
					isLoading={this.state.isSearching}
					buttonDislabled={this.props.hasError}
					selectButtonText={this.props.content.selectAddressSelectButtonText}
				/>
				<ErrorMessage text={this.props.content.addressNoExactMatch} />
			</div>
		);
	},
});

module.exports = PostcodeList;
