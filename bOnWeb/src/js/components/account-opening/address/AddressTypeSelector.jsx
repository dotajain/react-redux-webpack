/**
 * @module AddressTypeSelector
 */

const React = require('react');
const { PropTypes } = React;

const RadioQuestion = require('../../common/questionsets/RadioQuestion');

const AddressTypeSelector = React.createClass({
	propTypes: {
		group: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		defaultValue: PropTypes.string,
		content: PropTypes.object,
	},

	onChange(key, value) {
		this.props.onChange(value);
	},

	render() {
		return (<div className="postcode-label-container address-type">
			<RadioQuestion
				defaultValue={this.props.defaultValue}
				name="addressType"
				labelText={this.props.content.addressTypeQuestion}
				options={[
					{ value: 'No' }, { value: 'Yes' },
				]}
				group={this.props.group}
				onChange={this.onChange}
				required
				dataAnchor="addressType"
			/>
		</div>);
	},
});

module.exports = AddressTypeSelector;

