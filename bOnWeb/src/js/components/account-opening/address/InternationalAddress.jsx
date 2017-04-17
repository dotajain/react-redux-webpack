/**
 * @module InternationalAddress
 */

const React = require('react');
const { PropTypes } = React;
const CountryUtils = require('../../../utils/CountryUtils');

const { AddressLine, Country } = require('./AddressParts');

const get = (parent, get, d) => parent ? get(parent) : d;

const InternationalAddress = React.createClass({
	propTypes: {
		data: PropTypes.shape({
			addressLine1: PropTypes.string,
			addressLine2: PropTypes.string,
			addressLine3: PropTypes.string,
			addressLine4: PropTypes.string,
			country: PropTypes.string,
		}),
	},

	render() {
		return (<div>
			<AddressLine
				index={1}
				key="addressLine1"
				validateType="addressLine1"
				addressLine={get(this.props.data, d => d.addressLine1)}
				{...this.props}
			>
				Address Line 1
			</AddressLine>
			<AddressLine
				index={2}
				key="addressLine2"
				addressLine={get(this.props.data, d => d.addressLine2)}
				{...this.props}
			>
				Address Line 2
			</AddressLine>
			<AddressLine
				index={3}
				key="addressLine3"
				addressLine={get(this.props.data, d => d.addressLine3)}
				{...this.props}
			>
				Address Line 3
			</AddressLine>
			<AddressLine
				index={4}
				key="addressLine4"
				addressLine={get(this.props.data, d => d.addressLine4)}
				{...this.props}
			>
				Address Line 4
			</AddressLine>
			<Country
				editable
				key="country"
				countries={CountryUtils.withCountryNames(data => data.code !== 'GB')}
				{...this.props.data}
				{...this.props}
			>
				Country
			</Country>
		</div>);
	},
});

module.exports = InternationalAddress;

