/**
 * @module NonEditableAddress
 */

const React = require('react');
const { PropTypes } = React;
const _ = require('lodash');
const envConfig = require('../../../../static/config');

const StaticParagraphQuestion = require('../../common/questionsets/StaticParagraphQuestion');
const CountryUtils = require('../../../utils/CountryUtils');

const NonEditableAddress = React.createClass({

	propTypes: {
		data: PropTypes.object.isRequired,
		group: PropTypes.string.isRequired,
		maskPostcode: PropTypes.bool,
		name: PropTypes.string.isRequired,
		addressId: PropTypes.number.isRequired,
	},

	render() {
		const mainColumnSize = _.includes(['CB', 'YB'], envConfig.bankId) ? 4 : 12;

		return (
			<div>
				<StaticParagraphQuestion
					label="Chosen Address"
					isInputField
					name={`shortAddress_${this.props.addressId}`}
					group={this.props.group}
					defaultValue={CountryUtils.getAddressString(this.props.data, this.props.maskPostcode)}
					dataAnchor="postcode-chosen-address"
					mainColumnSize={mainColumnSize}
					required
				/>
			</div>
		);
	},
});

module.exports = NonEditableAddress;
