
const React = require('react');
const { PropTypes } = React;
const _ = require('lodash');

const { AddressPrefix, HouseNumber, HouseName, AddressLine, StreetName, County, City } = require('./AddressParts');
const get = (parent, get, d) => parent ? get(parent) : d;

const EditableDomesticAddress = React.createClass({

	propTypes: {
		data: PropTypes.object,
	},

	render() {
		const conventions = {
			addressPrefix: () => (<AddressPrefix
					key="addressPrefix"
					{...this.props.data}
					{...this.props}
			>
					Flat Number
				</AddressPrefix>),
			houseNumber: () => (<HouseNumber
					required={!this.props.data.houseName}
					key="houseNumber"
					{...this.props.data}
					{...this.props}
			>
					Number
				</HouseNumber>),
			houseName: () => (<HouseName
					required={!this.props.data.houseNumber}
					key="houseName"
					{...this.props.data}
					{...this.props}
			>
					House Name
				</HouseName>),
			streetName: () => (<StreetName
					key="streetName"
					{...this.props.data}
					{...this.props}
			>
					Street Name
				</StreetName>),
			addressLine2: () => (<AddressLine
					index={2}
					key="addressLine2"
					addressLine={this.props.data.addressLine2}
					{...this.props}
			>
					Address Line 2
				</AddressLine>),
			city: () => (<City
					editable={!this.props.data.id}
					key="city"
					{...this.props.data}
					{...this.props}
			>
					City
				</City>),
			county: () => (<County
					key="county"
					{...this.props.data}
					{...this.props}
			>
					County
				</County>),
		};

		const dataKeys = _.keys(this.props.data);

		const form = _.transform(conventions, (result, value, key) => {
			if (get(this.props.data, d => d.isManual) || _.includes(dataKeys, key)) {
				result.push(value());
			}
		}, []);

		return (<div>{form}</div>);
	},
});

module.exports = EditableDomesticAddress;
